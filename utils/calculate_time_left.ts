import { toZonedTime } from 'date-fns-tz';

interface TimeLeftObj {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export const calculateTimeLeft = (dropDateUTC: Date): TimeLeftObj => {
  const easternTimeZone = 'America/New_York';

  // Get current time in Eastern Time from UTC
  const nowUTC = new Date(); // Current UTC time
  const nowEastern = toZonedTime(nowUTC, easternTimeZone);

  // Calculate difference between dropDateUTC and current Eastern Time
  // todo: remove
  let difference = 0
  try {
    difference = dropDateUTC.getTime() - nowEastern.getTime();
  } catch {
    
  }
  
  let timeLeft: TimeLeftObj = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference,
    };
  }

  return timeLeft;
};

// Example usage
const dropDate = new Date('2025-03-10T12:00:00Z'); // Example UTC drop date
console.log(calculateTimeLeft(dropDate));
