import { ImagePlus, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

// 무드별 실제 Unsplash 이미지 URL 세트
const moodImageSets: Record<string, string[][]> = {
  happy: [
    [
      'https://images.unsplash.com/photo-1648765465456-d91d818b068d?w=400',
      'https://images.unsplash.com/photo-1502301103665-0b95cc738daf?w=400',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400',
    ],
    [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      'https://images.unsplash.com/photo-1477763858572-cda7deaa9bc5?w=400',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400',
    ],
  ],
  calm: [
    [
      'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?w=400',
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
      'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400',
    ],
    [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
      'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=400',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400',
      'https://images.unsplash.com/photo-1484821582734-6c6c9f99a672?w=400',
    ],
  ],
  romantic: [
    [
      'https://images.unsplash.com/photo-1712677927853-4481a1c078bc?w=400',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400',
      'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400',
      'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=400',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      'https://images.unsplash.com/photo-1502301103665-0b95cc738daf?w=400',
    ],
    [
      'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400',
      'https://images.unsplash.com/photo-1471931452361-f5ff1faa15ad?w=400',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400',
      'https://images.unsplash.com/photo-1429277096327-11ee3b761c93?w=400',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400',
      'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400',
    ],
  ],
  energetic: [
    [
      'https://images.unsplash.com/photo-1763740341759-c6b54c0552ea?w=400',
      'https://images.unsplash.com/photo-1483086431886-3590a88317fe?w=400',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400',
      'https://images.unsplash.com/photo-1520085601670-ee14aa5fa3e8?w=400',
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400',
    ],
    [
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400',
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400',
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400',
      'https://images.unsplash.com/photo-1515041219749-89347f83291a?w=400',
      'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400',
      'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=400',
    ],
  ],
  cozy: [
    [
      'https://images.unsplash.com/photo-1550523303-e9e27624ed35?w=400',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400',
    ],
    [
      'https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=400',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400',
      'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=400',
      'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=400',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400',
    ],
  ],
  dreamy: [
    [
      'https://images.unsplash.com/photo-1728062819705-2f9ee5b6df2b?w=400',
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400',
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
    ],
    [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      'https://images.unsplash.com/photo-1477763858572-cda7deaa9bc5?w=400',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400',
      'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400',
      'https://images.unsplash.com/photo-1484821582734-6c6c9f99a672?w=400',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400',
    ],
  ],
  vibrant: [
    [
      'https://images.unsplash.com/photo-1692079539095-ce4a5bc6c7ed?w=400',
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
      'https://images.unsplash.com/photo-1502301103665-0b95cc738daf?w=400',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400',
      'https://images.unsplash.com/photo-1483086431886-3590a88317fe?w=400',
    ],
    [
      'https://images.unsplash.com/photo-1515041219749-89347f83291a?w=400',
      'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400',
      'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=400',
      'https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?w=400',
      'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400',
      'https://images.unsplash.com/photo-1520085601670-ee14aa5fa3e8?w=400',
    ],
  ],
  peaceful: [
    [
      'https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?w=400',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    ],
    [
      'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400',
      'https://images.unsplash.com/photo-1484821582734-6c6c9f99a672?w=400',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
    ],
  ],
};

interface PhotoBoxProps {
  selectedMood: string | null;
}

export function PhotoBox({ selectedMood }: PhotoBoxProps) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadPhotos = () => {
    setIsRefreshing(true);
    
    if (selectedMood && moodImageSets[selectedMood]) {
      const imageSets = moodImageSets[selectedMood];
      const newPhotos = imageSets[currentSetIndex % imageSets.length];
      setPhotos(newPhotos);
    } else {
      // 기본 이미지 (무드 선택 안됨)
      const defaultImages = [
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400',
      ];
      setPhotos(defaultImages);
    }
    
    setTimeout(() => setIsRefreshing(false), 500);
  };

  useEffect(() => {
    setCurrentSetIndex(0);
    loadPhotos();
  }, [selectedMood]);

  const handleRefresh = () => {
    setCurrentSetIndex(prev => prev + 1);
    setTimeout(() => loadPhotos(), 0);
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 shadow-lg border border-purple-200 h-full flex flex-col min-h-[200px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ImagePlus className="h-5 w-5 text-purple-600" />
          <h3 className="text-slate-700">Mood Photos</h3>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleRefresh}
          className="h-8 w-8 p-0"
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 text-purple-600 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-x-1.5 gap-y-1.5 overflow-hidden">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="aspect-[3/4] rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
          >
            <img
              src={photo}
              alt={`Mood inspiration ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-3 text-center">
        <p className="text-xs text-purple-700/60">
          {selectedMood ? `${selectedMood} mood inspiration` : 'Select a mood to see photos'}
        </p>
      </div>
    </motion.div>
  );
}