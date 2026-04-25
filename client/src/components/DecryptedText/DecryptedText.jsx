import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

const DecryptedText = ({ 
  text, 
  speed = 50, 
  maxIterations = 10, 
  className = "",
  animateOn="view", // view | mount
  ...props
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText((prev) => {
        return text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (letter === " ") return " ";
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("");
      });

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }

      iteration += 1 / (maxIterations / (text.length || 1));
    }, speed);
  };

  useEffect(() => {
    if (animateOn === "mount") {
      startAnimation();
    }
  }, [animateOn]);

  useEffect(() => {
    if (animateOn !== "view") return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      });
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [animateOn, startAnimation]);

  return (
    <motion.span
      ref={containerRef}
      className={className}
      {...props}
    >
      {displayText === text && !isAnimating ? text : displayText}
    </motion.span>
  );
};

export default DecryptedText;
