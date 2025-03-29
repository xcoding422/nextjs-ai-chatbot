import { motion } from 'framer-motion';
import Link from 'next/link';

import { MessageIcon, VercelIcon } from './icons';

export const Overview = () => {
  return (
    <motion.div>
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <p>
          我是Deepseek, 快来与我聊天吧! 得吃王6666新作
        </p>
      </div>
    </motion.div>
  );
};
