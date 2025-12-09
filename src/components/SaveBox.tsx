import { Download, Camera, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';

export function SaveBox() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // 전체 앱 캡처
      const element = document.body;
      
      const canvas = await html2canvas(element, {
        backgroundColor: '#f8fafc',
        scale: 2, // 고화질
        logging: false,
        useCORS: true,
        allowTaint: true,
        ignoreElements: (el) => {
          // Skip elements that might cause issues
          return false;
        },
        onclone: (clonedDoc) => {
          // oklch 색상을 지원되는 포맷으로 변환
          const style = clonedDoc.createElement('style');
          style.textContent = `
            :root {
              --foreground: #252525;
              --card-foreground: #252525;
              --popover: #ffffff;
              --popover-foreground: #252525;
              --primary-foreground: #ffffff;
              --secondary: #f3f3f5;
              --ring: #b5b5b5;
              --chart-1: #f97316;
              --chart-2: #3b82f6;
              --chart-3: #1e40af;
              --chart-4: #fde047;
              --chart-5: #facc15;
              --sidebar: #fafafa;
              --sidebar-foreground: #252525;
              --sidebar-primary-foreground: #fafafa;
              --sidebar-accent: #f5f5f5;
              --sidebar-accent-foreground: #333333;
              --sidebar-border: #e5e5e5;
              --sidebar-ring: #b5b5b5;
            }
            .dark {
              --background: #252525;
              --foreground: #fafafa;
              --card: #252525;
              --card-foreground: #fafafa;
              --popover: #252525;
              --popover-foreground: #fafafa;
              --primary: #fafafa;
              --primary-foreground: #333333;
              --secondary: #454545;
              --secondary-foreground: #fafafa;
              --muted: #454545;
              --muted-foreground: #b5b5b5;
              --accent: #454545;
              --accent-foreground: #fafafa;
              --ring: #707070;
              --sidebar: #333333;
              --sidebar-foreground: #fafafa;
              --sidebar-accent: #454545;
              --sidebar-accent-foreground: #fafafa;
              --sidebar-border: #454545;
              --sidebar-ring: #707070;
            }
          `;
          clonedDoc.head.appendChild(style);
        }
      });

      // Canvas를 이미지로 변환
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          const date = new Date().toISOString().split('T')[0];
          link.download = `mood-palette-${date}.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
          
          setSaved(true);
          toast.success('Mood Palette saved!');
          
          setTimeout(() => setSaved(false), 3000);
        }
      }, 'image/png');
      
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 shadow-lg border border-green-200 h-full flex flex-col justify-between cursor-pointer hover:shadow-xl transition-all"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleSave}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-green-600" />
          <h3 className="text-slate-700">Save Palette</h3>
        </div>
        <AnimatePresence mode="wait">
          {saved ? (
            <motion.div
              key="check"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
            >
              <Check className="h-5 w-5 text-green-600" />
            </motion.div>
          ) : (
            <motion.div
              key="download"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
            >
              <Download className="h-5 w-5 text-green-600" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 py-4">
        <motion.div
          animate={isSaving ? { 
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          } : {}}
          transition={{ 
            duration: 1,
            repeat: isSaving ? Infinity : 0 
          }}
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
            disabled={isSaving}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full h-16 w-16 p-0 shadow-lg disabled:opacity-50"
          >
            <AnimatePresence mode="wait">
              {isSaving ? (
                <motion.div
                  key="saving"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  exit={{ scale: 0 }}
                  transition={{ rotate: { duration: 1, repeat: Infinity, ease: 'linear' } }}
                >
                  <Camera className="h-7 w-7" />
                </motion.div>
              ) : saved ? (
                <motion.div
                  key="saved"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="h-7 w-7" />
                </motion.div>
              ) : (
                <motion.div
                  key="download"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Download className="h-7 w-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>

      <p className="text-center text-sm text-green-700/60">
        {isSaving ? 'Capturing...' : saved ? 'Saved successfully!' : 'Click to save as image'}
      </p>
    </motion.div>
  );
}
