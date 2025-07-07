"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface QRCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  size?: number;
  level?: "L" | "M" | "Q" | "H";
}

export function QRCode({ size = 200, className, ...props }: QRCodeProps) {
  // QRコードの枠線のみ表示
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-white border-2 border-gray-300 rounded-lg",
        className
      )}
      style={{ width: size, height: size }}
      {...props}
    >
      <div className="text-xs text-gray-400">QRコード枠</div>
    </div>
  );
}
