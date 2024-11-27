"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface CustomSliderProps {
  value: number;
  viewPortSteps: number[];
  viewPortLabels?: string[];
  className?: string;
  onValueChange?: (index: number, value: number, label: string) => void;
}

export default function CustomSlider({
  value,
  viewPortSteps,
  viewPortLabels = [],
  className,
  onValueChange,
}: CustomSliderProps) {
  const handleValueChange = (valueArray: number[]) => {
    const newIndex = valueArray[0];
    const newValue = viewPortSteps[newIndex];
    const newLabel = viewPortLabels[newIndex];

    localStorage.setItem("viewportWidth", newValue.toString());
    localStorage.setItem("viewportLabel", newLabel);

    if (onValueChange) {
      onValueChange(newIndex, newValue, newLabel);
    }
  };

  return (
    <div className="relative w-full py-4">
      <SliderPrimitive.Root
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className,
        )}
        value={[value]}
        onValueChange={handleValueChange}
        max={viewPortSteps.length - 1}
        step={1}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-gray-300">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-neutral-900" />
        </SliderPrimitive.Track>

        <div className="absolute w-full">
          {viewPortSteps.map((_, idx) => (
            <div
              key={idx}
              className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
              style={{
                left: `${(idx / (viewPortSteps.length - 1)) * 100}%`,
                transform: "translateX(-50%) translateY(-50%)",
                backgroundColor: value >= idx ? "#171717" : "#9CA3AF",
              }}
            />
          ))}
        </div>

        <SliderPrimitive.Thumb className="block h-2 w-2 rounded-full border-2 border-neutral-900 bg-neutral-900 outline-none ring-2 ring-neutral-900 ring-offset-2 ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
    </div>
  );
}
