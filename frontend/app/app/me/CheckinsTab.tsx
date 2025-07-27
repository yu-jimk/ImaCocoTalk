"use client";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { StoreCard } from "@/components/StoreCard";
import type { StoreMyPage } from "@/app/types";
import { QrCode } from "lucide-react";

export function CheckinsTab({ stores }: { stores: StoreMyPage[] }) {
  return (
    <TabsContent value="checkins" className="space-y-3">
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} showCheckins={true} />
      ))}
      {stores.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <QrCode className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">チェックインした店舗がありません</p>
            <p className="text-sm text-gray-400 mt-1">
              店舗詳細ページでチェックインしてみましょう
            </p>
          </CardContent>
        </Card>
      )}
    </TabsContent>
  );
}
