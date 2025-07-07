"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

const StarRating = React.forwardRef<HTMLDivElement, StarRatingProps>(
  (
    { className, value = 0, onChange, readOnly, size = "md", ...props },
    ref
  ) => {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);

    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    };

    const handleStarClick = (starValue: number, isHalf = false) => {
      if (onChange && !readOnly) {
        const newValue = isHalf ? starValue - 0.5 : starValue;
        onChange(newValue);
      }
    };

    const handleStarHover = (starValue: number, isHalf = false) => {
      if (!readOnly) {
        const newValue = isHalf ? starValue - 0.5 : starValue;
        setHoverValue(newValue);
      }
    };

    const handleStarLeave = () => {
      setHoverValue(null);
    };

    const renderStar = (index: number) => {
      const starNumber = index + 1;
      const currentValue = hoverValue !== null ? hoverValue : value;

      const isFullStar = currentValue >= starNumber;
      const isHalfStar =
        currentValue >= starNumber - 0.5 && currentValue < starNumber;

      return (
        <div key={index} className="relative inline-block mr-1">
          {/* Background star (empty) */}
          <Star
            className={cn(
              sizeClasses[size],
              "text-gray-300 cursor-pointer transition-colors",
              readOnly && "cursor-default"
            )}
          />

          {/* Half star overlay */}
          {isHalfStar && (
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: "50%" }}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  "fill-yellow-400 text-yellow-400 cursor-pointer transition-colors",
                  readOnly && "cursor-default"
                )}
              />
            </div>
          )}

          {/* Full star overlay */}
          {isFullStar && (
            <div className="absolute inset-0">
              <Star
                className={cn(
                  sizeClasses[size],
                  "fill-yellow-400 text-yellow-400 cursor-pointer transition-colors",
                  readOnly && "cursor-default"
                )}
              />
            </div>
          )}

          {/* Click areas for half and full */}
          {!readOnly && (
            <>
              {/* Left half for 0.5 */}
              <div
                className="absolute inset-0 cursor-pointer"
                style={{ width: "50%" }}
                onClick={() => handleStarClick(starNumber, true)}
                onMouseEnter={() => handleStarHover(starNumber, true)}
                onMouseLeave={handleStarLeave}
              />
              {/* Right half for 1.0 */}
              <div
                className="absolute inset-0 cursor-pointer"
                style={{ left: "50%", width: "50%" }}
                onClick={() => handleStarClick(starNumber, false)}
                onMouseEnter={() => handleStarHover(starNumber, false)}
                onMouseLeave={handleStarLeave}
              />
            </>
          )}
        </div>
      );
    };

    return (
      <div className={cn("flex items-center", className)} ref={ref} {...props}>
        {[0, 1, 2, 3, 4].map(renderStar)}
      </div>
    );
  }
);
StarRating.displayName = "StarRating";

export { StarRating };
