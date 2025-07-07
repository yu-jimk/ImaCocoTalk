import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import type { StoreMyPage } from "@/app/types";

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
    <Link href={`/stores/${store.id}`} key={store.id} className="block">
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h3 className="font-medium hover:text-blue-600">{store.name}</h3>
              <Badge variant="outline" className="text-xs">
                {store.genre}
              </Badge>
            </div>
            <div className="text-right">
              {showCheckins && (
                <div className="text-sm text-gray-600">{store.date}</div>
              )}
              {showFavorites && (
                <>
                  <div className="text-sm text-gray-600">
                    {store.visits}回訪問
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Heart className="size-4 fill-red-500" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
