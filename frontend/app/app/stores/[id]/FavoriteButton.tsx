"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function FavoriteButton({
  storeId,
  initialFavorited,
}: {
  storeId: number;
  initialFavorited: boolean;
}) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const isFavoritedRef = useRef(isFavorited);

  useEffect(() => {
    return () => {
      if (isFavoritedRef.current !== initialFavorited) {
        fetch("/api/stores/favorite", {
          method: "POST",
          body: JSON.stringify({
            storeId: storeId,
            isFavorited: isFavoritedRef.current,
          }),
          headers: { "Content-Type": "application/json" },
        });
      }
    };
  }, [storeId]);

  useEffect(() => {
    isFavoritedRef.current = isFavorited;
  }, [isFavorited]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsFavorited((prev) => !prev)}
    >
      <Heart
        className={`h-5 w-5 ${isFavorited ? "fill-red-500 text-red-500" : ""}`}
      />
    </Button>
  );
}
