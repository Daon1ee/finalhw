import { Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

interface ColorBoxProps {
  color: string;
  index: number;
}

export function ColorBox({ color, index }: ColorBoxProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    toast.success(`${color} copied!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="rounded-3xl shadow-lg border-2 border-white h-full min-h-[180px] flex flex-col overflow-hidden cursor-pointer group"
      style={{ backgroundColor: color }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
      onClick={copyToClipboard}
    >
      <div className="flex-1" />
      <motion.div 
        className="bg-white/90 backdrop-blur-sm p-4 flex items-center justify-between"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.05 + 0.2 }}
      >
        <span className="font-mono text-slate-700">{color}</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            copyToClipboard();
          }}
          className="h-8 w-8 p-0 hover:bg-slate-100"
        >
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <Check className="h-4 w-4 text-green-500" />
            </motion.div>
          ) : (
            <Copy className="h-4 w-4 text-slate-600" />
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}