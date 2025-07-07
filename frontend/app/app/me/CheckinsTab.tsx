"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const checkinHistory = [
  {
    id: 1,
    store: "カフェ・ド・パリ",
    genre: "カフェ",
    date: "2024/01/15 14:30",
  },
  { id: 2, store: "らーめん太郎", genre: "ラーメン", date: "2024/01/14 12:15" },
  {
    id: 3,
    store: "バー・ムーンライト",
    genre: "バー",
    date: "2024/01/13 19:45",
  },
  {
    id: 4,
    store: "イタリアン・ベラ",
    genre: "イタリアン",
    date: "2024/01/12 18:30",
  },
];

export function CheckinsTab() {
  return (
    <TabsContent value="checkins" className="space-y-3">
      {checkinHistory.map((checkin) => (
        <Card key={checkin.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{checkin.store}</h3>
                <Badge variant="outline" className="text-xs">
                  {checkin.genre}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">{checkin.date}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </TabsContent>
  );
}
