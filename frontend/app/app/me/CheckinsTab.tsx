"use client";
import { TabsContent } from "@/components/ui/tabs";
import { StoreCard } from "@/components/StoreCard";
import type { StoreMyPage } from "@/app/types";

export function CheckinsTab({ stores }: { stores: StoreMyPage[] }) {
  return (
    <TabsContent value="checkins" className="space-y-3">
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} showCheckins={true} />
      ))}
    </TabsContent>
  );
}
