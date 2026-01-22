"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CountdownBlocksProps = {
  /** ISO string recommended: "2026-03-01T00:00:00+08:00" */
  targetDate: string | Date;
  className?: string;
  onComplete?: () => void;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function CountdownBlocks({
  targetDate,
  className,
  onComplete,
}: CountdownBlocksProps) {
  const target = useMemo(() => new Date(targetDate), [targetDate]);
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      const next = getTimeLeft(target);
      setTime(next);
      if (!next && onComplete) onComplete();
    }, 1000);

    return () => clearInterval(id);
  }, [target, onComplete]);

  return (
    <div className={cn("w-full rounded-xl", className)}>
      <div className="mx-auto flex w-full items-center justify-center gap-1 sm:gap-2 md:max-w-xl md:gap-4">
        <Block value={time ? String(time.days) : "00"} label="days" />
        <Block value={time ? pad2(time.hours) : "00"} label="hours" />
        <Block value={time ? pad2(time.minutes) : "00"} label="min" />
        <Block value={time ? pad2(time.seconds) : "00"} label="sec" />
      </div>
    </div>
  );
}

function Block({ value, label }: { value: string; label: string }) {
  return (
    <Card className="w-[75px] border-0 bg-black p-4 shadow-sm md:w-[100px]">
      <CardContent className="flex flex-col items-center justify-center md:gap-2">
        <div className="leading-none font-bold tracking-tight text-white md:text-5xl">
          {value}
        </div>
        <div className="font-medium text-white/90 md:text-xl">{label}</div>
      </CardContent>
    </Card>
  );
}
