import { Smile, Heart, Sparkles, Cloud, Sun, Moon, Coffee, Music } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string) => void;
}

const moods = [
  { id: 'happy', emoji: '😊', label: 'Happy', icon: Sun, color: 'from-yellow-400 to-orange-400' },
  { id: 'calm', emoji: '😌', label: 'Calm', icon: Cloud, color: 'from-blue-300 to-cyan-300' },
  { id: 'romantic', emoji: '💖', label: 'Romantic', icon: Heart, color: 'from-pink-400 to-rose-400' },
  { id: 'energetic', emoji: '⚡', label: 'Energetic', icon: Sparkles, color: 'from-purple-400 to-fuchsia-400' },
  { id: 'cozy', emoji: '☕', label: 'Cozy', icon: Coffee, color: 'from-amber-600 to-orange-700' },
  { id: 'dreamy', emoji: '🌙', label: 'Dreamy', icon: Moon, color: 'from-indigo-400 to-purple-500' },
  { id: 'vibrant', emoji: '🎨', label: 'Vibrant', icon: Music, color: 'from-emerald-400 to-teal-400' },
  { id: 'peaceful', emoji: '🌸', label: 'Peaceful', icon: Smile, color: 'from-rose-300 to-pink-300' },
];

export function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <motion.div 
      className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200 h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="mb-4 text-slate-700">Today's Mood</h2>
      <div className="grid grid-cols-2 gap-3">
        {moods.map((mood, index) => {
          const Icon = mood.icon;
          return (
            <motion.div
              key={mood.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Button
                onClick={() => onMoodSelect(mood.id)}
                variant={selectedMood === mood.id ? "default" : "outline"}
                className={`w-full h-auto py-4 flex flex-col items-center gap-2 transition-all hover:scale-105 ${
                  selectedMood === mood.id 
                    ? `bg-gradient-to-br ${mood.color} border-none text-white` 
                    : 'bg-white hover:bg-slate-50'
                }`}
              >
                <motion.span 
                  className="text-2xl"
                  animate={selectedMood === mood.id ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {mood.emoji}
                </motion.span>
                <span className="text-xs">{mood.label}</span>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}