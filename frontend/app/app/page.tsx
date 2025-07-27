"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, User, Pin } from "lucide-react";
import Link from "next/link";
import { Tabs } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

type Store = {
  id: number;
  name: string;
  genre: string[];
  distance: string;
  posts: number;
  rating: number;
  lat: number;
  lng: number;
  isNew: boolean;
  pinnedPosts: string[];
};

export default function HomePage() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("すべて");
  const [activeTab, setActiveTab] = useState("0");
  const lat: number = 35.6762;
  const lng: number = 139.6503;
  const radius: number = 5;

  // APIから近隣店舗取得
  useEffect(() => {
    async function fetchNearbyStores() {
      try {
        await fetch(
          `http://localhost:3000/api/stores/nearby?lat=${lat}&lng=${lng}&radius=${radius}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setStores(data.stores || []);
            setGenres(["すべて", ...data.available_genres]);
          });
      } catch (e) {
        console.error(e);
      }
    }
    fetchNearbyStores();
  }, [lat, lng, radius]);

  useEffect(() => {
    if (!selectedStore) return;

    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const next =
          (parseInt(prev, 10) + 1) % selectedStore.pinnedPosts.length;
        return next.toString();
      });
    }, 5000); // 5秒ごとに切り替え

    return () => clearInterval(interval);
  }, [selectedStore]);

  // Filter stores based on genre and search query
  const filteredStores = stores.filter((store) => {
    const matchesGenre =
      selectedGenre === "すべて" || store.genre.includes(selectedGenre);
    const matchesSearch =
      !searchQuery.trim() ||
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.genre.join(",").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search */}
      <div className="bg-blue-50 border-b px-4 py-3">
        <div className="flex items-center justify-between">
          {!showSearch && (
            <h1 className="text-xl font-bold text-blue-600">イマココトーク</h1>
          )}
          {showSearch && (
            <Input
              placeholder="店舗名、ジャンルで検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => setShowSearch(false)}
              className="flex-1 border-blue-200 focus:border-blue-400 bg-white"
              autoFocus
            />
          )}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-600 hover:bg-blue-100"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/me">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        {searchQuery && (
          <div className="mt-2 text-sm text-blue-600">
            &quot;{searchQuery}&quot; の検索結果: {filteredStores.length}件
          </div>
        )}
      </div>

      {/* Genre Filter */}
      <div className="bg-blue-50 border-b px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGenre(genre)}
              className={`whitespace-nowrap ${
                selectedGenre === genre
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "border-blue-300 text-blue-600 hover:bg-blue-100"
              }`}
            >
              {genre}
            </Button>
          ))}
        </div>
      </div>

      {/* Enhanced Map Area */}
      <div
        className="relative bg-gradient-to-br from-blue-100 to-green-100"
        style={{ height: "calc(100vh - 120px)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">地図エリア</p>
            <p className="text-xs text-gray-500">
              {filteredStores.length > 0
                ? `${filteredStores.length}件の店舗を表示中`
                : "該当する店舗がありません"}
            </p>
          </div>
        </div>

        {/* Store Pins - Only show filtered stores */}
        {filteredStores.map((store, index) => (
          <div
            key={store.id}
            className="absolute cursor-pointer hover:scale-110 transition-transform"
            style={{
              left: `${15 + (index % 4) * 20}%`,
              top: `${25 + Math.floor(index / 4) * 25}%`,
            }}
            onClick={() => setSelectedStore(store)}
          >
            <div className="flex flex-col items-center">
              <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white">
                {store.posts}
              </div>
              <div className="mt-1 bg-white px-2 py-1 rounded shadow-sm border text-xs font-medium whitespace-nowrap max-w-20 truncate">
                {store.name}
              </div>
              {store.isNew && (
                <Badge className="bg-red-500 text-white text-xs mt-1 px-1 py-0">
                  NEW
                </Badge>
              )}
            </div>
          </div>
        ))}

        {/* Current Location */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="bg-blue-500 rounded-full w-4 h-4 border-2 border-white shadow-lg"></div>
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>

        {/* No Results Message */}
        {filteredStores.length === 0 &&
          (searchQuery || selectedGenre !== "すべて") && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">
                    該当する店舗が見つかりませんでした
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    検索条件を変更してお試しください
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedGenre("すべて");
                    }}
                  >
                    検索をリセット
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
      </div>

      {/* Enhanced Store Popup with Pinned Post */}
      {selectedStore && (
        <div className="absolute top-1/2 left-0 right-0 z-10 flex justify-center">
          <Card className="shadow-lg bg-white/95 backdrop-blur-sm gap-0 py-6 max-w-md w-full mx-4">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {selectedStore.name}
                    {selectedStore.isNew && (
                      <Badge className="bg-red-500 text-white text-xs">
                        NEW
                      </Badge>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedStore.genre.map((genre) => (
                        <Badge
                          key={genre}
                          variant="secondary"
                          className="text-blue-600 border-blue-200"
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {selectedStore.distance}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedStore(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Pinned Post */}
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full max-w-md"
              >
                <AnimatePresence mode="wait">
                  {selectedStore.pinnedPosts.map((post, idx) =>
                    idx.toString() === activeTab ? (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Pin className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">
                            店舗からのお知らせ
                          </span>
                        </div>
                        <div className="list-disc list-inside space-y-1">
                          <p className="text-sm text-gray-700">{post}</p>
                        </div>
                      </motion.div>
                    ) : null
                  )}
                </AnimatePresence>
              </Tabs>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600">投稿数:</span>
                    <span className="font-medium text-blue-600">
                      {selectedStore.posts}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{selectedStore.rating}</span>
                  </div>
                </div>
                <Link href={`/stores/${selectedStore.id}`}>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    詳細を見る
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
