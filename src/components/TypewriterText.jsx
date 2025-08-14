import React, { useState, useEffect } from 'react';

const TypewriterText = ({ 
  phrases = ['reflect on your day', 'plan tomorrow', 'let go of stress'],
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  className = ''
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCurrentText(phrases[0]);
      return;
    }

    const currentPhrase = phrases[currentPhraseIndex];
    let timeoutId;

    const typeText = () => {
      if (isPaused) {
        timeoutId = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
        return;
      }

      if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
          timeoutId = setTimeout(typeText, deleteSpeed);
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      } else {
        if (currentText.length < currentPhrase.length) {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
          timeoutId = setTimeout(typeText, speed);
        } else {
          setIsPaused(true);
          timeoutId = setTimeout(typeText, 0);
        }
      }
    };

    timeoutId = setTimeout(typeText, speed);

    return () => clearTimeout(timeoutId);
  }, [currentText, currentPhraseIndex, isDeleting, isPaused, phrases, speed, deleteSpeed, pauseDuration]);

  return (
    <span className={`inline-block ${className}`}>
      {currentText}
      <span className="animate-pulse ml-1 text-accent">|</span>
    </span>
  );
};

export default TypewriterText;
