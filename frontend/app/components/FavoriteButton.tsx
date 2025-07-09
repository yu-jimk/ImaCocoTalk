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
  const initialFavoritedRef = useRef(initialFavorited);

  useEffect(() => {
    const initialValue = initialFavoritedRef.current;
    return () => {
      if (isFavoritedRef.current !== initialValue) {
        fetch(`/api/stores/${storeId}/favorite`, {
          method: "POST",
          body: JSON.stringify({
            isFavorited: isFavoritedRef.current,
          }),
          headers: { "Content-Type": "application/json" },
        }).catch((e) => {
          console.error("お気に入り保存失敗", e);
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
