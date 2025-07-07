"use client";

import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/StarRating";
import { MapPin, Heart, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckinButton } from "./CheckinButton";
import type { StoreData } from "@/app/types";

export function StoreInfo({ storeData }: { storeData: StoreData }) {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="bg-white p-4 border-b">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-blue-900">{storeData.name}</h2>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {storeData.genres.map((genre, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-blue-600 border-blue-200"
              >
                {genre}
              </Badge>
            ))}
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <StarRating value={storeData.rating} readOnly size="sm" />
              <span>{storeData.rating}</span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart
            className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
          />
        </Button>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <MapPin className="h-4 w-4" />
        <span>
          〒{storeData.postalCode} {storeData.address}
        </span>
        <span>•</span>
        <span>{storeData.distance}</span>
      </div>
      {/* Store Description */}
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <h3 className="font-medium text-blue-800 mb-2">店舗について</h3>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          {storeData.description}
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-blue-500" />
            <span>営業時間: {storeData.openHours}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4 text-blue-500" />
            <span>電話: {storeData.phone}</span>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {storeData.features.map((feature, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs border-blue-300 text-blue-600"
              >
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <CheckinButton isCheckedIn={storeData.isCheckedIn} />
    </div>
  );
}
