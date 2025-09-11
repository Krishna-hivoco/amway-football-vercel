"use client";

import { useEffect, useState } from "react";

interface ProgressItem {
  percentage: number;
  title: string;
  subtitle: string;
  color: string;
  colorClass: string;
}

const ProgressIndicators: React.FC = () => {
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);

    // Stagger the fade-in animations
    const fadeTimers: NodeJS.Timeout[] = [
      setTimeout(() => setIsVisible((prev) => [true, prev[1], prev[2]]), 100),
      setTimeout(() => setIsVisible((prev) => [prev[0], true, prev[2]]), 200),
      setTimeout(() => setIsVisible((prev) => [prev[0], prev[1], true]), 300),
    ];

    return () => {
      clearTimeout(timer);
      fadeTimers.forEach((t) => clearTimeout(t));
    };
  }, []);

  const progressData: ProgressItem[] = [
    {
      percentage: 20,
      title: "ABSORB",
      subtitle: "with D3",
      color: "#4A90E2",
      colorClass: "stroke-blue-500",
    },
    {
      percentage: 25,
      title: "PROTECT",
      subtitle: "with Boron",
      color: "#7ED321",
      colorClass: "stroke-green-500",
    },
    {
      percentage: 100,
      title: "LOCK",
      subtitle: "with K2",
      color: "#F5A623",
      colorClass: "stroke-orange-500",
    },
  ];

  const circumference: number = 2 * Math.PI * 36; // 226

  return (
    <div className=" w-full ">
      {progressData.map((item: ProgressItem, index: number) => (
        <div
          key={index}
          className={`
              flex items-center  relative
              transition-all  duration-500 ease-out -ml-10 
              ${
                isVisible[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }
            `}
        >
          <div className="relative  py-3">
            <svg className="w-[160px] h-[160px] rotate-90" viewBox="0 0 80 45">
              <path
                className="fill-none stroke-neutral-700 "
                d="M 10 40 A 30 30 0 0 1 70 40"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                className={`fill-none ${item.colorClass} transition-all duration-1000 ease-in-out`}
                d="M 10 40 A 30 30 0 0 1 70 40"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={
                  isAnimated
                    ? circumference - (circumference * item.percentage) / 100
                    : circumference
                }
                style={{
                  stroke: item.color,
                }}
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-lg font-semibold">
              {item.percentage}%
            </div>
          </div>
          <div className="flex-1 -ml-8 ">
            <div className="text-white text-base font-semibold tracking-wide mb-1 quantico-bold text-lg">
              {item.title}
            </div>
            <div className="text-white text-sm font-normal ">
              {item.subtitle}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicators;
