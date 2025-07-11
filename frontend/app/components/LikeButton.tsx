import { useState, useEffect, useRef } from "react";
import { ThumbsUp } from "lucide-react";

export function LikeButton({
  postId,
  initialLiked = false,
  initialCount = 0,
  disabled = false,
}: {
  postId: number;
  initialLiked: boolean;
  initialCount: number;
  disabled?: boolean;
}) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const isLikedRef = useRef(isLiked);
  const initialLikedRef = useRef(initialLiked);

  useEffect(() => {
    const initialValue = initialLikedRef.current;
    return () => {
      if (isLikedRef.current !== initialValue) {
        fetch(`/api/posts/${postId}/like`, {
          method: "POST",
          body: JSON.stringify({
            isLiked: isLikedRef.current,
          }),
          headers: { "Content-Type": "application/json" },
        }).catch((e) => {
          console.error("いいね保存失敗", e);
        });
      }
    };
  }, [postId]);

  useEffect(() => {
    isLikedRef.current = isLiked;
  }, [isLiked]);

  const handleClick = () => {
    if (disabled) return;
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setCount((prev) => prev + (newLiked ? 1 : -1));
  };

  return (
    <button
      type="button"
      className={`flex items-center gap-1 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleClick}
      aria-pressed={isLiked}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <ThumbsUp
        className={`h-3 w-3 sm:h-4 sm:w-4 transition-colors duration-150 ${
          isLiked ? "fill-blue-500 text-blue-500" : ""
        }`}
      />
      <span>{count}</span>
    </button>
  );
}
