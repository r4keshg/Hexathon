import JSConfetti from 'js-confetti';

// Create a reusable confetti instance
let jsConfetti: JSConfetti | null = null;

// Initialize confetti on first use
const getConfetti = () => {
  if (!jsConfetti) {
    jsConfetti = new JSConfetti();
  }
  return jsConfetti;
};

// Helper: Continuous confetti burst over a duration
const continuousBurst = (
  confetti: JSConfetti,
  duration: number,
  baseOptions: Omit<Parameters<JSConfetti['addConfetti']>[0], 'confettiNumber'>,
  maxParticles: number,
  onComplete?: () => void
) => {
  const animationEnd = Date.now() + duration;
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      clearInterval(interval);
      if (onComplete) onComplete();
      return;
    }
    // Particle count decreases as time progresses
    const particleCount = Math.floor(maxParticles * (timeLeft / duration));
    confetti.addConfetti({
      ...baseOptions,
      confettiNumber: particleCount,
    });
  }, 250);
};

// Trigger confetti for course completion
export const triggerCourseCompletionConfetti = () => {
  const confetti = getConfetti();
  continuousBurst(
    confetti,
    3000,
    {
      confettiColors: ['#FF5757', '#FFC857', '#70D6FF', '#5CE1E6', '#FF9E7A', '#A3E048'],
      confettiRadius: 6,
    },
    200
  );
};

// Trigger confetti for clan or blog creation
export const triggerCreationConfetti = () => {
  const confetti = getConfetti();
  continuousBurst(
    confetti,
    2000,
    {
      confettiColors: ['#22c55e', '#7c3aed', '#06b6d4', '#F97316', '#8b5cf6'],
      confettiRadius: 5,
    },
    100
  );
};

// Trigger confetti for achievements
export const triggerAchievementConfetti = () => {
  const confetti = getConfetti();
  continuousBurst(
    confetti,
    2000,
    {
      confettiColors: ['#FF66B2', '#FFCC00', '#66FF66', '#66CCFF', '#CC66FF'],
      confettiRadius: 5,
    },
    40
  );
};

// Trigger confetti for login
export const triggerLoginConfetti = () => {
  const confetti = getConfetti();
  continuousBurst(
    confetti,
    2000,
    {
      confettiColors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
      confettiRadius: 4,
    },
    80
  );
};

// Trigger confetti for odyssey page
export const triggerOdysseyConfetti = () => {
  const confetti = getConfetti();
  continuousBurst(
    confetti,
    3000,
    {
      confettiColors: ['#FF3E00', '#FFDD00', '#1AB394', '#1E90FF', '#8A2BE2'],
      confettiRadius: 6,
    },
    35
  );
};
