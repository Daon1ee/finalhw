import { Share2, Link2, Check, Twitter, Facebook, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';

interface ShareBoxProps {
  selectedMood: string | null;
}

export function ShareBox({ selectedMood }: ShareBoxProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const shareUrl = selectedMood 
    ? `${window.location.origin}${window.location.pathname}?mood=${selectedMood}`
    : window.location.href;

  const copyLink = async () => {
    let success = false;

    // Fallback method using execCommand
    try {
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);
      
      textArea.select();
      textArea.setSelectionRange(0, shareUrl.length);
      
      success = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (success) {
        setCopied(true);
        toast.success('Link copied!');
        setTimeout(() => setCopied(false), 2000);
        return;
      }
    } catch (err) {
      console.error('execCommand copy failed:', err);
    }

    // Try modern clipboard API as fallback
    if (!success) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success('Link copied!');
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Clipboard API failed:', err);
        toast.error('Copy failed. Please copy manually.');
      }
    }
  };

  const shareToTwitter = () => {
    const text = `Check out my ${selectedMood} mood palette! 🎨`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const shareToWhatsApp = () => {
    const text = `Check out my ${selectedMood} mood palette! 🎨`;
    const url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl p-6 shadow-lg border border-violet-200 h-full flex flex-col justify-between"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Share2 className="h-5 w-5 text-violet-600" />
          <h3 className="text-slate-700">Share Palette</h3>
        </div>
        <motion.button
          onClick={() => setShowQR(!showQR)}
          className="text-violet-600 hover:text-violet-700 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {showQR ? (
          <motion.div
            key="qr"
            className="flex-1 flex flex-col items-center justify-center gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white p-3 rounded-2xl shadow-md">
              <QRCodeSVG 
                value={shareUrl} 
                size={120}
                level="M"
                includeMargin={false}
              />
            </div>
            <p className="text-xs text-violet-600 text-center">Scan to share</p>
          </motion.div>
        ) : (
          <motion.div
            key="buttons"
            className="flex-1 flex flex-col gap-3 justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {/* Copy Link Button */}
            <motion.button
              onClick={copyLink}
              className="bg-white/80 hover:bg-white rounded-2xl p-3 flex items-center gap-3 transition-all shadow-sm hover:shadow-md group"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-violet-100 p-2 rounded-xl group-hover:bg-violet-200 transition-colors">
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="link"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                    >
                      <Link2 className="h-4 w-4 text-violet-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span className="text-sm text-slate-700">
                {copied ? 'Copied!' : 'Copy Link'}
              </span>
            </motion.button>

            {/* Social Share Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <motion.button
                onClick={shareToTwitter}
                className="bg-white/80 hover:bg-white rounded-xl p-3 flex items-center justify-center transition-all shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="h-4 w-4 text-sky-500" />
              </motion.button>

              <motion.button
                onClick={shareToFacebook}
                className="bg-white/80 hover:bg-white rounded-xl p-3 flex items-center justify-center transition-all shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="h-4 w-4 text-blue-600" />
              </motion.button>

              <motion.button
                onClick={shareToWhatsApp}
                className="bg-white/80 hover:bg-white rounded-xl p-3 flex items-center justify-center transition-all shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="h-4 w-4 text-green-600" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-sm text-violet-600/60 mt-3">
        {selectedMood ? `Share your ${selectedMood} mood` : 'Select a mood to share'}
      </p>
    </motion.div>
  );
}
