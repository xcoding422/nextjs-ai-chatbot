import { motion } from 'framer-motion';
import Link from 'next/link';

import { MessageIcon, VercelIcon } from './icons';

export const Overview = () => {
  return (
    <motion.div>
      <p><center><h1>我是 DeepSeek, 很高兴见到你!</h1></center></p>
      <p><center>我可以帮你写代码/读文件/写作各种创意内容, 请把你的任务交给我吧~</center></p>
    </motion.div>
  );
};
