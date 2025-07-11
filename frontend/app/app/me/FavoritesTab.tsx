import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Heart } from "lucide-react";
import { StoreCard } from "@/components/StoreCard";
import type { StoreMyPage } from "@/app/types";

export function FavoritesTab({ stores }: { stores: StoreMyPage[] }) {
  return (
    <TabsContent value="favorites" className="space-y-3">
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} showFavorites={true} />
      ))}
      {stores.length === 0 && (
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
