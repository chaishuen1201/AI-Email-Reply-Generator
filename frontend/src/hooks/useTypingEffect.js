import { useEffect, useState } from "react";

export default function useTypingEffect(text, speed = 20) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    setDisplayText("");

    if (!text) return;

    let index = 0;

    const interval = setInterval(() => {
      setDisplayText((prev) => prev + text[index]);

      index++;

      if (index >= text.length) {
        clearInterval(interval);
      }

    }, speed);


    return () => clearInterval(interval);

  }, [text, speed]);


  return displayText;
}