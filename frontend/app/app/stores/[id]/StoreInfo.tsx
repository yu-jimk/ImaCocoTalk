import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, QrCode } from "lucide-react";
import type { StoreData } from "@/app/types";
import { FavoriteButton } from "@/components/FavoriteButton";

export function StoreInfo({ store }: { store: StoreData }) {
  return (
    <div className="bg-white p-4 border-b">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-blue-900">{store.name}</h2>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {store.genres.map((genre, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-blue-600 border-blue-200"
              >
                {genre}
              </Badge>
            ))}
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <StarRating value={store.rating} readOnly size="sm" />
              <span>{store.rating}</span>
            </div>
          </div>
        </div>
        <FavoriteButton
          storeId={store.id}
          initialFavorited={store.user.isFavorited}
        />
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <MapPin className="h-4 w-4" />
        <span>
          〒{store.postalCode} {store.address}
        </span>
        <span>•</span>
        <span>{store.distance}</span>
      </div>
      {/* Store Description */}
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <h3 className="font-medium text-blue-800 mb-2">店舗について</h3>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          {store.description}
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-blue-500" />
            <span>営業時間: {store.openHours}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4 text-blue-500" />
            <span>電話: {store.phone}</span>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {store.features.map((feature, index) => (
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
      <Link href={`/stores/${store.id}/checkin`}>
        <Button
          className="w-full mb-2 bg-blue-600 hover:bg-blue-700"
          variant="default"
        >
          <QrCode className="h-4 w-4 mr-2" />
          チェックインして投稿
        </Button>
      </Link>
    </div>
  );
}
