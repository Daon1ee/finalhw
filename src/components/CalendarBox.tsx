import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
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

export function CalendarBox() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const dayOfWeek = selectedDate.getDay();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div 
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 shadow-lg border border-blue-200 h-full flex flex-col cursor-pointer hover:shadow-xl transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
              <h3 className="text-slate-700">Today</h3>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center flex-1">
            <motion.div 
              className="text-4xl mb-2"
              key={selectedDate.getDate()}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              {selectedDate.getDate()}
            </motion.div>
            <div className="text-xs text-blue-700/60">
              {dayNames[dayOfWeek]}
            </div>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-600" />
            Today
          </DialogTitle>
          <DialogDescription>
            Select a date from the calendar
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col justify-center items-center gap-6 py-4">
          <div className="text-center">
            <motion.div 
              className="text-6xl mb-3"
              key={selectedDate.getDate()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {selectedDate.getDate()}
            </motion.div>
            <div className="text-lg text-slate-600 mb-1">
              {selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
            </div>
            <div className={`text-sm ${
              dayOfWeek === 0 ? 'text-red-500' : dayOfWeek === 6 ? 'text-blue-500' : 'text-slate-500'
            }`}>
              {dayNames[dayOfWeek]}
            </div>
          </div>

          <div className="flex justify-center w-full">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => changeDate(-1)}
              className="h-9 w-9 p-0 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              size="sm"
              variant="default"
              onClick={() => setSelectedDate(new Date())}
              className="px-6 bg-blue-600 hover:bg-blue-700"
            >
              Today
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => changeDate(1)}
              className="h-9 w-9 p-0 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}