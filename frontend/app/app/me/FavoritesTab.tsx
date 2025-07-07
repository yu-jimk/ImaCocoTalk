import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Heart } from "lucide-react";
import Link from "next/link";

const favoriteStores = [
  {
    id: 1,
    name: "カフェ・ド・パリ",
    genre: "カフェ",
    visits: 5,
    isFavorite: true,
  },
  {
    id: 2,
    name: "らーめん太郎",
    genre: "ラーメン",
    visits: 3,
    isFavorite: true,
  },
  {
    id: 3,
    name: "バー・ムーンライト",
    genre: "バー",
    visits: 2,
    isFavorite: true,
  },
  {
    id: 4,
    name: "イタリアン・ベラ",
    genre: "イタリアン",
    visits: 4,
    isFavorite: true,
  },
];

export function FavoritesTab() {
  return (
    <TabsContent value="favorites" className="space-y-3">
      {favoriteStores.map((store) => (
        <Link href={`/stores/${store.id}`} key={store.id} className="block">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-medium hover:text-blue-600">
                    {store.name}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {store.genre}
                  </Badge>
                </div>
                <div className="text-right">
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
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
      {favoriteStores.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">お気に入りの店舗がありません</p>
            <p className="text-sm text-gray-400 mt-1">
              店舗詳細ページでハートボタンを押してお気に入りに追加しましょう
            </p>
          </CardContent>
        </Card>
      )}
    </TabsContent>
  );
}
