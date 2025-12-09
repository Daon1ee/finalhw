import { Smile, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface EmojiBoxProps {
  selectedMood: string | null;
}

const moodEmojis: Record<string, { emojis: string[]; label: string; color: string }> = {
  happy: {
    emojis: ['😊', '🌞', '🌈', '⭐', '🎉', '🎈', '🌻', '🦋', '💛', '🍋', '✨', '🌟'],
    label: 'Happy Vibes',
    color: 'from-yellow-50 to-orange-50'
  },
  calm: {
    emojis: ['😌', '🌊', '🍃', '🌙', '☁️', '🕊️', '💙', '🧘', '🌸', '🫧', '🪷', '💆'],
    label: 'Calm Energy',
    color: 'from-blue-50 to-cyan-50'
  },
  romantic: {
    emojis: ['💕', '💖', '💗', '💝', '🌹', '💐', '🦢', '🎀', '💌', '🫶', '💏', '🌺'],
    label: 'Romantic Mood',
    color: 'from-pink-50 to-rose-50'
  },
  energetic: {
    emojis: ['⚡', '🔥', '💥', '🚀', '⭐', '💪', '🎯', '🏃', '💜', '🎵', '🌟', '🔆'],
    label: 'Energetic Flow',
    color: 'from-purple-50 to-fuchsia-50'
  },
  cozy: {
    emojis: ['☕', '🕯️', '🧸', '🛋️', '📖', '🧶', '🍂', '🏠', '🫖', '🧦', '🪵', '🍪'],
    label: 'Cozy Feels',
    color: 'from-amber-50 to-orange-50'
  },
  dreamy: {
    emojis: ['🌙', '✨', '🌟', '💫', '🔮', '🦄', '🪐', '🌌', '🧚', '🎐', '🫧', '💭'],
    label: 'Dreamy Space',
    color: 'from-indigo-50 to-purple-50'
  },
  vibrant: {
    emojis: ['🎨', '🌈', '🎪', '🎭', '🎯', '🦜', '🎡', '🎢', '🎊', '🪩', '💃', '🕺'],
    label: 'Vibrant Life',
    color: 'from-cyan-50 to-blue-50'
  },
  peaceful: {
    emojis: ['🕊️', '🌿', '🍀', '🌾', '🌸', '🦋', '🌺', '🧘‍♀️', '🕉️', '🪷', '🌼', '🌱'],
    label: 'Peaceful Mind',
    color: 'from-pink-50 to-purple-50'
  },
};

export function EmojiBox({ selectedMood }: EmojiBoxProps) {
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);
  
  const moodData = selectedMood ? moodEmojis[selectedMood] : null;
  const emojis = moodData?.emojis || ['😊', '🎨', '🌈', '⭐', '💖', '🌸', '🎵', '✨', '🌟', '💫', '🦋', '🌺'];

  const copyEmoji = async (emoji: string) => {
    let success = false;

    // Fallback method using execCommand (more reliable in iframes)
    try {
      const textArea = document.createElement('textarea');
      textArea.value = emoji;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);
      
      textArea.select();
      textArea.setSelectionRange(0, emoji.length);
      
      success = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (success) {
        setCopiedEmoji(emoji);
        toast.success(`${emoji} copied!`);
        setTimeout(() => setCopiedEmoji(null), 1000);
        return;
      }
    } catch (err) {
      console.error('execCommand copy failed:', err);
    }

    // If fallback failed, try modern clipboard API
    if (!success) {
      try {
        await navigator.clipboard.writeText(emoji);
        setCopiedEmoji(emoji);
        toast.success(`${emoji} copied!`);
        setTimeout(() => setCopiedEmoji(null), 1000);
      } catch (err) {
        console.error('Clipboard API failed:', err);
        // Show the emoji in a toast so user can manually copy
        toast.error(`Copy blocked. Emoji: ${emoji}`);
      }
    }
  };

  return (
    <motion.div
      className={`bg-gradient-to-br ${moodData?.color || 'from-slate-50 to-slate-100'} rounded-3xl p-6 shadow-lg border ${
        selectedMood ? 'border-slate-200' : 'border-slate-200'
      } h-full flex flex-col transition-all duration-500`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className={`h-5 w-5 ${
            selectedMood ? 'text-slate-600' : 'text-slate-400'
          }`} />
          <h3 className="text-slate-700">
            {selectedMood ? moodData?.label : 'Mood Stickers'}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Smile className={`h-5 w-5 ${
            selectedMood ? 'text-slate-600' : 'text-slate-400'
          }`} />
        </motion.div>
      </div>

      <div className="flex-1 grid grid-cols-4 md:grid-cols-6 gap-2">
        {emojis.map((emoji, index) => (
          <motion.button
            key={`${emoji}-${index}`}
            onClick={() => copyEmoji(emoji)}
            className="aspect-square bg-white/60 hover:bg-white rounded-2xl flex items-center justify-center text-3xl cursor-pointer transition-all shadow-sm hover:shadow-md relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03, duration: 0.2 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{emoji}</span>
            
            <AnimatePresence>
              {copiedEmoji === emoji && (
                <motion.div
                  className="absolute inset-0 bg-green-400/30 backdrop-blur-sm flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    className="text-xs text-green-700"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                  >
                    ✓
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      <p className="text-center text-sm text-slate-500 mt-3">
        {selectedMood ? 'Click to copy emoji' : 'Select a mood to see themed stickers'}
      </p>
    </motion.div>
  );
}
