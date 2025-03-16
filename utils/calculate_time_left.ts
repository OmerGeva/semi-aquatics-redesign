interface TimeLeftObj {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export const calculateTimeLeft = (dropDateUTC: Date): TimeLeftObj => {
  // Get current time in Eastern Time from UTC
  const nowUTC = new Date(); // Current UTC time
  
  // Calculate difference between dropDateUTC and current Eastern Time
  // todo: remove
  let difference = 0
  try {
    difference = dropDateUTC.getTime() - nowUTC.getTime();
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
