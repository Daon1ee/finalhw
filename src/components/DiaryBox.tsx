import { BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export function DiaryBox() {
  const [diaryEntry, setDiaryEntry] = useState('');
  const [savedEntry, setSavedEntry] = useState('');
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    setSavedEntry(diaryEntry);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div 
          className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 shadow-lg border border-amber-200 h-full flex flex-col cursor-pointer hover:shadow-xl transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-600" />
              <h3 className="text-slate-700">Daily Journal</h3>
            </div>
          </div>
          <div className="flex items-center justify-center flex-1 overflow-hidden">
            {savedEntry ? (
              <div className="w-full h-full flex flex-col">
                <p className="text-sm text-amber-900/80 line-clamp-3 text-left overflow-hidden">
                  {savedEntry}
                </p>
              </div>
            ) : (
              <p className="text-sm text-amber-700/60 text-center">
                Click to write your journal
              </p>
            )}
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-amber-600" />
            Daily Journal
          </DialogTitle>
          <DialogDescription>
            Write down your thoughts and feelings for today
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          <Textarea
            placeholder="How was your day? Write down your feelings..."
            value={diaryEntry}
            onChange={(e) => setDiaryEntry(e.target.value)}
            className="min-h-[300px] bg-amber-50/50 border-amber-200 resize-none"
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500">
              {diaryEntry.length} characters
            </span>
            <Button
              size="sm"
              className="bg-amber-500 hover:bg-amber-600"
              onClick={handleSave}
            >
              Save & Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}