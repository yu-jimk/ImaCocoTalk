"use client";

import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Settings, X } from "lucide-react";
import { useState } from "react";
import { updateStoreAction } from "./actions";

type StoreInfo = {
  id: string;
  name: string;
  genres: string[];
  description: string;
  postalCode: string;
  address: string;
  openHours: { [key: string]: string };
  phone: string;
  otherInfo: string[];
  totalPosts: number;
  totalReports: number;
  monthlyVisitors: number;
  qrCodeValue: string;
};

type SettingsTabProps = {
  storeInfo: StoreInfo;
};

export function SettingsTab({ storeInfo }: SettingsTabProps) {
  const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const [storeData, setStoreData] = useState<StoreInfo>(storeInfo);
  const [newGenre, setNewGenre] = useState("");
  // サーバーアクション用。フィードバックはuseFormState等で拡張可能

  const handleOtherInfoAdd = () => {
    setStoreData((prev) => ({
      ...prev,
      otherInfo: [...prev.otherInfo, ""],
    }));
  };

  const handleOtherInfoRemove = (index: number) => {
    setStoreData((prev) => ({
      ...prev,
      otherInfo: prev.otherInfo.filter((_, i) => i !== index),
    }));
  };

  const handleOtherInfoChange = (index: number, value: string) => {
    setStoreData((prev) => ({
      ...prev,
      otherInfo: prev.otherInfo.map((item, i) => (i === index ? value : item)),
    }));
  };

  return (
    <TabsContent value="settings" className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="h-5 w-5 text-purple-500" />
        <h2 className="font-semibold text-purple-700">店舗プロフィール設定</h2>
      </div>
      <Card className="border-l-4 border-l-purple-500 bg-purple-50/30">
        <CardContent className="p-6 space-y-4">
          {/* サーバーアクション用フィードバックはuseFormState等で拡張可能 */}
          <form action={updateStoreAction} className="space-y-4">
            <input type="hidden" name="id" value={storeData.id} />
            {/* ...existing code... */}
            <div className="space-y-2">
              <Label htmlFor="storeName" className="text-purple-700">
                店舗名
              </Label>
              <Input
                id="storeName"
                name="name"
                value={storeData.name}
                onChange={(e) =>
                  setStoreData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="border-purple-200"
              />
            </div>
            {/* ...existing code... */}
            <div className="space-y-2">
              <Label htmlFor="storeGenres" className="text-purple-700">
                ジャンル（複数選択可）
              </Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {storeData.genres.map((genre: string, index: number) => (
                  <React.Fragment key={index}>
                    <input type="hidden" name="genres" value={genre} />
                    <Badge
                      variant="secondary"
                      className="text-purple-600 border-purple-200"
                    >
                      {genre}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 hover:bg-red-100"
                        onClick={() =>
                          setStoreData((prev) => ({
                            ...prev,
                            genres: prev.genres.filter((_, i) => i !== index),
                          }))
                        }
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  </React.Fragment>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={newGenre}
                  onChange={(e) => setNewGenre(e.target.value)}
                  placeholder="新しいジャンルを入力"
                  className="border-purple-200 flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-300 text-purple-600 bg-transparent"
                  onClick={() => {
                    if (newGenre.trim()) {
                      setStoreData((prev) => ({
                        ...prev,
                        genres: [...prev.genres, newGenre.trim()],
                      }));
                      setNewGenre("");
                    }
                  }}
                  disabled={!newGenre.trim()}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  追加
                </Button>
              </div>
            </div>
            {/* ...existing code... */}
            <div className="space-y-2">
              <Label htmlFor="postalCode" className="text-purple-700">
                郵便番号
              </Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={storeData.postalCode}
                onChange={(e) =>
                  setStoreData((prev) => ({
                    ...prev,
                    postalCode: e.target.value,
                  }))
                }
                className="border-purple-200"
                placeholder="150-0041"
              />
            </div>
            {/* ...existing code... */}
            <div className="space-y-2">
              <Label htmlFor="storeAddress" className="text-purple-700">
                住所
              </Label>
              <Input
                id="storeAddress"
                name="address"
                value={storeData.address}
                onChange={(e) =>
                  setStoreData((prev) => ({ ...prev, address: e.target.value }))
                }
                className="border-purple-200"
              />
            </div>
            {/* ...existing code... */}
            <div className="space-y-2">
              <Label className="text-purple-700">営業時間</Label>
              {daysOfWeek.map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <Label
                    htmlFor={`openHours-${day}`}
                    className="w-12 capitalize text-right"
                  >
                    {day}
                  </Label>
                  <Input
                    id={`openingHours-${day}`}
                    name={`openingHours-${day}`}
                    value={storeData.openHours?.[day] || ""}
                    onChange={(e) =>
                      setStoreData((prev) => ({
                        ...prev,
                        openHours: {
                          ...prev.openHours,
                          [day]: e.target.value,
                        },
                      }))
                    }
                    className="border-purple-200"
                    placeholder="8:00 - 22:00"
                  />
                </div>
              ))}
            </div>
            {/* ...existing code... */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-purple-700">
                電話番号
              </Label>
              <Input
                id="phone"
                name="phone"
                value={storeData.phone}
                onChange={(e) =>
                  setStoreData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="border-purple-200"
                placeholder="03-1234-5678"
              />
            </div>
            {/* ...existing code... */}
            <div className="space-y-2">
              <Label htmlFor="storeDescription" className="text-purple-700">
                店舗説明
              </Label>
              <Textarea
                id="storeDescription"
                name="description"
                value={storeData.description}
                onChange={(e) =>
                  setStoreData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={4}
                className="border-purple-200"
              />
            </div>
            {/* ...existing code... */}
            <div className="space-y-2">
              <Label className="text-purple-700">その他情報</Label>
              <div className="space-y-2">
                {storeData.otherInfo.map((info: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <input type="hidden" name="otherInfo" value={info} />
                    <Input
                      value={info}
                      onChange={(e) =>
                        handleOtherInfoChange(index, e.target.value)
                      }
                      className="border-purple-200"
                      placeholder="WiFi完備、電源あり など"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleOtherInfoRemove(index)}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={handleOtherInfoAdd}
                  className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  項目を追加
                </Button>
              </div>
            </div>
            {/* ...existing code... */}
            <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
              <Settings className="h-4 w-4 mr-2" />
              設定を保存
            </Button>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
