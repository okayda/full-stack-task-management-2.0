"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

interface CustomSliderProps {
  defaultValue?: number;
  steps: number[];
  className?: string;
  onValueChange?: (value: number) => void;
}

export default function CustomSlider({
  defaultValue,
  steps,
  className,
  onValueChange,
}: CustomSliderProps) {
  const initialIndex = defaultValue ? steps.indexOf(defaultValue) : 0;

  const [index, setIndex] = React.useState(
    initialIndex >= 0 ? initialIndex : 0,
  );

  const handleValueChange = function (value: number[]) {
    setIndex(value[0]);
    if (onValueChange) {
      onValueChange(steps[value[0]]);
    }
  };

  return (
    <div className="relative w-full py-4">
      <SliderPrimitive.Root
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className,
        )}
        value={[index]}
        onValueChange={handleValueChange}
        max={steps.length - 1}
        step={1}
        defaultValue={[index]}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-gray-300">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-neutral-900" />
        </SliderPrimitive.Track>

        <div className="absolute w-full">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
              style={{
                left: `${Math.min((idx / (steps.length - 1)) * 96.7)}%`,
                backgroundColor: index >= idx ? "#171717" : "#9CA3AF",
              }}
            />
          ))}
        </div>

        <SliderPrimitive.Thumb className="block h-2 w-2 rounded-full border-2 border-neutral-900 bg-neutral-900 ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
    </div>
  );
}
