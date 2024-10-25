import React, { useState, useEffect } from "react";

const AnimatedWord = ({ word, className, show }) => {
  return (
    <span
      className={`
        inline-block 
        transition-all 
        duration-500 
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
        ${className}
      `}
    >
      {word}
    </span>
  );
};

const AnimatedText = ({ text, className }) => {
  const [displayedWordCount, setDisplayedWordCount] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    let currentWordIndex = 0;

    const timer = setInterval(() => {
      if (currentWordIndex < words.length) {
        setDisplayedWordCount(currentWordIndex + 1);
        currentWordIndex++;
      } else {
        clearInterval(timer);
      }
    }, 200); // Adjust timing between words here

    return () => clearInterval(timer);
  }, [text]);

  return (
    <div className={className}>
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <AnimatedWord
            word={word}
            show={index < displayedWordCount}
            className="mr-0"
          />
          {/* Add space between words */}
          {index < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </div>
  );
};
export default AnimatedText;
