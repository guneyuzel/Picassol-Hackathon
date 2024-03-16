import { useState, useEffect } from 'react';
import clsx from "clsx";
import { Color, colors } from "../lib/colors";

interface Props {
  selectedColor: Color;
  setSelectedColor: (color: Color) => void;
}

export default function ColorSelector({ selectedColor, setSelectedColor }: Props) {
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const lastClickTime = localStorage.getItem('lastClickTime');
      const now = Date.now();

      if (lastClickTime) {
        const remainingTime = 33 - Math.floor((now - Number(lastClickTime)) / 1000); // Increased cooldown time
        setCooldown(Math.max(remainingTime, 0));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-4 mx-auto lg:mx-auto">
      <div className="flex flex-wrap justify-center">
        {colors.map((color, i) => {
          const isSelected = color === selectedColor;

          return (
            <div
              className={clsx(
                "w-10 h-10 border border-black rounded-full cursor-pointer transition-transform duration-200 ease-in-out m-1",
                !isSelected && "hover:scale-105",
                isSelected && "border-2 scale-125"
              )}
              style={{
                backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
              }}
              onClick={() => setSelectedColor(color)}
              key={i}
            />
          );
        })}
      </div>
      <div className="mt-4">
        <p style={{ color: 'white', fontSize: '1.2rem' }}>Cooldown: {cooldown} seconds</p>
      </div>
    </div>
  );
}