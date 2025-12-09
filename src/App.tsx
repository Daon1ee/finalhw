import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MoodSelector } from './components/MoodSelector';
import { ColorBox } from './components/ColorBox';
import { DiaryBox } from './components/DiaryBox';
import { CalendarBox } from './components/CalendarBox';
import { PhotoBox } from './components/PhotoBox';
import { MusicMoodBox } from './components/MusicMoodBox';
import { SaveBox } from './components/SaveBox';
import { EmojiBox } from './components/EmojiBox';
import { ShareBox } from './components/ShareBox';

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

export default function App() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleReset = () => {
    setSelectedMood(null);
  };

  const palette = selectedMood ? moodPalettes[selectedMood] : [];
  
  // ��양한 크기 패턴 정의
  const colorBoxSizes = [
    { colSpan: 'col-span-1', rowSpan: 'row-span-2' },
    { colSpan: 'col-span-2', rowSpan: 'row-span-1' },
    { colSpan: 'col-span-1', rowSpan: 'row-span-1' },
    { colSpan: 'col-span-1', rowSpan: 'row-span-1' },
    { colSpan: 'col-span-2', rowSpan: 'row-span-1' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-7xl w-full">
        <motion.header 
          className="mb-16 md:mb-20 cursor-pointer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleReset}
        >
          <h1 className="text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-4xl md:text-5xl hover:opacity-80 transition-opacity">
            Mood Palette
          </h1>
          <p className="text-center text-slate-600 mt-2">
            Discover colors based on your mood
          </p>
        </motion.header>

        <motion.div 
          layout
          className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
        >
          
          {/* Mood Selector Buttons */}
          <motion.div 
            layout
            className="col-span-2 md:col-span-2 lg:col-span-2 row-span-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <MoodSelector 
              selectedMood={selectedMood} 
              onMoodSelect={setSelectedMood}
            />
          </motion.div>

          {/* Color Boxes - 무드 선택 후에만 표시 */}
          <AnimatePresence mode="sync">
            {selectedMood && palette.map((color, index) => (
              <motion.div
                key={`${selectedMood}-${color}`}
                layout
                className={`${colorBoxSizes[index].colSpan} ${colorBoxSizes[index].rowSpan}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ColorBox color={color} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Photo Box */}
          <motion.div 
            layout
            className={`${selectedMood ? 'col-span-2 md:col-span-2 lg:col-span-2 row-span-2' : 'col-span-2 md:col-span-2 lg:col-span-2 row-span-2'}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <PhotoBox selectedMood={selectedMood} />
          </motion.div>

          {/* Emoji/Sticker Box - 무드 선택 후에만 표시 */}
          <AnimatePresence>
            {selectedMood && (
              <motion.div 
                layout
                className="col-span-2 md:col-span-2 lg:col-span-2 row-span-1"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, delay: 0.25 }}
              >
                <EmojiBox selectedMood={selectedMood} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Diary Box */}
          <motion.div 
            layout
            className={`${selectedMood ? 'col-span-2 md:col-span-1' : 'col-span-2 md:col-span-1'}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <DiaryBox />
          </motion.div>

          {/* Calendar Box */}
          <motion.div 
            layout
            className={`${selectedMood ? 'col-span-2 md:col-span-1' : 'col-span-2 md:col-span-1'}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <CalendarBox />
          </motion.div>

          {/* Music Mood Box */}
          <motion.div 
            layout
            className={`${selectedMood ? 'col-span-2 md:col-span-2 lg:col-span-2 row-span-1' : 'col-span-2 md:col-span-2 lg:col-span-2 row-span-1'}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <MusicMoodBox selectedMood={selectedMood} />
          </motion.div>

          {/* Save Box - 무드 선택 후에만 표시 */}
          <AnimatePresence>
            {selectedMood && (
              <motion.div 
                layout
                className="col-span-2 md:col-span-1 lg:col-span-1 row-span-1"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <SaveBox />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Share Box - 무드 선택 후에만 표시 */}
          <AnimatePresence>
            {selectedMood && (
              <motion.div 
                layout
                className="col-span-2 md:col-span-1 lg:col-span-1 row-span-1"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, delay: 0.65 }}
              >
                <ShareBox selectedMood={selectedMood} />
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>

        {!selectedMood && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-slate-400">
              Select a mood to see your color palette
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}