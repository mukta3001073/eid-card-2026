import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarIcon, Check } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface CountdownTimerProps {
  targetDate: Date;
  onDateChange?: (date: Date) => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate, onDateChange }: CountdownTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeRemaining.days },
    { label: "Hours", value: timeRemaining.hours },
    { label: "Minutes", value: timeRemaining.minutes },
    { label: "Seconds", value: timeRemaining.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex items-center justify-center gap-3 md:gap-6"
      >
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex flex-col items-center">
            <motion.div
              className="relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
            >
              <div
                className="w-14 h-14 md:w-20 md:h-20 rounded-lg flex items-center justify-center relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)) 100%)",
                  border: "1px solid hsl(var(--primary) / 0.3)",
                  boxShadow: "0 0 20px hsl(var(--primary) / 0.2), inset 0 0 20px hsl(var(--primary) / 0.05)",
                }}
              >
                <div className="absolute inset-0 geometric-pattern opacity-50" />
                <span className="font-display text-2xl md:text-4xl text-primary glow-gold relative z-10">
                  {unit.value.toString().padStart(2, "0")}
                </span>
              </div>
            </motion.div>
            <p className="font-body text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
              {unit.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Date customization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="flex items-center gap-2"
      >
        <p className="font-body text-xs text-muted-foreground">
          Counting down to {format(targetDate, "MMMM d, yyyy")}
        </p>
        {onDateChange && (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <motion.button
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-body text-primary/80 hover:text-primary border border-primary/20 hover:border-primary/40 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CalendarIcon className="w-3 h-3" />
                Change
              </motion.button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-card border-primary/20" align="center" style={{ zIndex: 50 }}>
              <Calendar
                mode="single"
                selected={targetDate}
                onSelect={(date) => {
                  if (date) {
                    onDateChange(date);
                    setIsOpen(false);
                  }
                }}
                disabled={(date) => date < new Date()}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        )}
      </motion.div>
    </div>
  );
};

export default CountdownTimer;
