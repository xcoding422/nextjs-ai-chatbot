import { Artifact } from '@/components/create-artifact';
import {
  CopyIcon,
  LineChartIcon,
  RedoIcon,
  SparklesIcon,
  UndoIcon,
} from '@/components/icons';
import { SpreadsheetEditor } from '@/components/sheet-editor';
import { parse, unparse } from 'papaparse';
import { toast } from 'sonner';

type Metadata = any;

export const sheetArtifact = new Artifact<'sheet', Metadata>({
  kind: 'sheet',
  description: '适用于处理电子表格',
  initialize: async () => {},
  onStreamPart: ({ setArtifact, streamPart }) => {
    if (streamPart.type === 'sheet-delta') {
      setArtifact((draftArtifact) => ({
        ...draftArtifact,
        content: streamPart.content as string,
        isVisible: true,
        status: 'streaming',
      }));
    }
  },
  content: ({
    content,
    currentVersionIndex,
    isCurrentVersion,
    onSaveContent,
    status,
  }) => {
    return (
      <SpreadsheetEditor
        content={content}
        currentVersionIndex={currentVersionIndex}
        isCurrentVersion={isCurrentVersion}
        saveContent={onSaveContent}
        status={status}
      />
    );
  },
  actions: [
    {
      icon: <UndoIcon size={18} />,
      description: '查看上一版本',
      onClick: ({ handleVersionChange }) => {
        handleVersionChange('prev');
      },
      isDisabled: ({ currentVersionIndex }) => {
        if (currentVersionIndex === 0) {
          return true;
        }

        return false;
      },
    },
    {
      icon: <RedoIcon size={18} />,
      description: '查看下一版本',
      onClick: ({ handleVersionChange }) => {
        handleVersionChange('next');
      },
      isDisabled: ({ isCurrentVersion }) => {
        if (isCurrentVersion) {
          return true;
        }

        return false;
      },
    },
    {
      icon: <CopyIcon />,
      description: '复制为 .csv',
      onClick: ({ content }) => {
        const parsed = parse<string[]>(content, { skipEmptyLines: true });

        const nonEmptyRows = parsed.data.filter((row) =>
          row.some((cell) => cell.trim() !== ''),
        );

        const cleanedCsv = unparse(nonEmptyRows);

        navigator.clipboard.writeText(cleanedCsv);
        toast.success('已将 csv 复制到剪贴板！');
      },
    },
  ],
  toolbar: [
    {
      description: '格式化并清理数据',
      icon: <SparklesIcon />,
      onClick: ({ appendMessage }) => {
        appendMessage({
          role: 'user',
          content: '请帮我格式化并清理数据好吗？',
        });
      },
    },
    {
      description: '分析和可视化数据',
      icon: <LineChartIcon />,
      onClick: ({ appendMessage }) => {
        appendMessage({
          role: 'user',
          content:
            '请帮我分析和可视化数据，并用 Python 创建一段新的代码。',
        });
      },
    },
  ],
});
