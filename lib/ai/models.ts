export const DEFAULT_CHAT_MODEL: string = 'chat-model';

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model',
    name: 'Deepseek V3',
    description: '普通Deepseek V3大模型',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Deepseek R1',
    description: '深度思考Deepseek R1大模型',
  },
];
