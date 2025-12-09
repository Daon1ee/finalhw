import { Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

interface ColorPaletteProps {
  mood: string | null;
}

const moodPalettes: Record<string, string[]> = {
  happy: ['#FFD93D', '#FFA41B', '#FF6B35', '#F95738', '#FFE5B4'],
  calm: ['#A8E6CF', '#87CEEB', '#B0E0E6', '#E0F4FF', '#C1E1EC'],
  romantic: ['#FFB6C1', '#FF69B4', '#FF1493', '#FFC0CB', '#FFE4E1'],
  energetic: ['#FF00FF', '#9D4EDD', '#7209B7', '#F72585', '#B5179E'],
  cozy: ['#8B4513', '#CD853F', '#DEB887', '#D2691E', '#F4A460'],
  dreamy: ['#6A5ACD', '#9370DB', '#8A2BE2', '#BA55D3', '#DDA0DD'],
  vibrant: ['#00D9FF', '#00B4D8', '#0077B6', '#03045E', '#90E0EF'],
  peaceful: ['#FFB6D9', '#FFC9E0', '#FFE5EC', '#FFEEF4', '#FFF0F5'],
};

export function ColorPalette({ mood }: ColorPaletteProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  
  const palette = mood ? moodPalettes[mood] : ['#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280', '#4B5563'];

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    toast.success(`${color} 복사됨!`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <motion.div 
      className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200 h-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-slate-700">컬러 팔레트</h2>
        <AnimatePresence mode="wait">
          {mood && (
            <motion.span 
              key={mood}
              className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-600"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {mood}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex-1 flex flex-col gap-3">
        <AnimatePresence mode="wait">
          {palette.map((color, index) => (
            <motion.div
              key={`${mood}-${color}-${index}`}
              className="flex items-center gap-3 group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="h-16 flex-1 rounded-2xl shadow-md border-2 border-white"
                style={{ backgroundColor: color }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              <div className="flex items-center gap-2 min-w-[120px]">
                <span className="text-sm text-slate-600 font-mono">{color}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(color)}
                  className="h-8 w-8 p-0"
                >
                  <AnimatePresence mode="wait">
                    {copiedColor === color ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="h-4 w-4 text-green-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Copy className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {!mood && (
        <motion.p 
          className="text-center text-slate-400 text-sm mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          무드를 선택하면 컬러 팔레트가 나타납니다
        </motion.p>
      )}
    </motion.div>
  );
}