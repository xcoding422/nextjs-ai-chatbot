'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { memo } from 'react';
import { UseChatHelpers } from '@ai-sdk/react';

interface SuggestedActionsProps {
  chatId: string;
  append: UseChatHelpers['append'];
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'Vue.js框架',
      label: '有哪些核心优势？',
      action: 'Vue.js框架有哪些核心优势？',
    },
    {
      title: '用Python实现',
      label: '二叉树遍历算法',
      action: '用Python实现二叉树遍历算法',
    },
    {
      title: '帮我撰写关于',
      label: '人工智能伦理的报告大纲',
      action: '帮我撰写关于人工智能伦理的报告大纲',
    },
    {
      title: '把这句话翻译成',
      label: '英文："可持续发展至关重要"',
      action: '把这句话翻译成英文："可持续发展至关重要"',
    },
    {
      title: '计算直角三角形',
      label: '斜边长度（底边5cm，高12cm）',
      action: '计算直角三角形斜边长度（底边5cm，高12cm）',
    },
    {
      title: '现在纽约',
      label: '当地时间是几点？',
      action: '现在纽约当地时间是几点？',
    },
    {
      title: '分析辛亥革命',
      label: '对中国近代史的影响',
      action: '分析辛亥革命对中国近代史的影响',
    },
    {
      title: '如何自然',
      label: '降低胆固醇水平？',
      action: '如何自然降低胆固醇水平？',
    },
  ];

  return (
    <div
      data-testid="suggested-actions"
      className="grid sm:grid-cols-2 gap-2 w-full"
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              append({
                role: 'user',
                content: suggestedAction.action,
              });
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
