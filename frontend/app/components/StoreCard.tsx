import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Heart } from "lucide-react";
import type { StoreMyPage } from "@/app/types";
import { FavoriteButton } from "./FavoriteButton";

type StoreCardProps = {
  store: StoreMyPage;
  showCheckins?: boolean;
  showFavorites?: boolean;
};

export function StoreCard({
  store,
  showCheckins = false,
  showFavorites = false,
}: StoreCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <Link
              href={`/stores/${store.store_id}`}
              className="block hover:text-blue-600"
            >
              <h3 className="font-medium">{store.name}</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {Array.isArray(store.genre) ? (
                  store.genre.map((genre) => (
                    <Badge key={genre} variant="outline" className="text-xs">
                      {genre}
                    </Badge>
                  ))
                ) : (
                  <Badge variant="outline" className="text-xs">
                    {store.genre}
                  </Badge>
                )}
              </div>
            </Link>
          </div>
          <div className="text-right space-y-1">
            {showCheckins && (
              <div className="text-sm text-gray-600">{store.date}</div>
            )}
            {showFavorites && store.isFavorite && (
              <>
                <div className="text-sm text-gray-600">
                  {store.visits}回訪問
                </div>
                <FavoriteButton
                  storeId={store.id}
                  initialFavorited={store.isFavorite}
                />
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
