import { StoreHeader } from "./StoreHeader";
import { StoreInfo } from "./StoreInfo";

import { AllPosts } from "./AllPosts";
import type { Post, StoreData } from "@/app/types";

const storeData: StoreData = {
  id: 1,
  name: "カフェ・ド・パリ",
  genres: ["カフェ", "フレンチ", "デザート"],
  address: "東京都渋谷区神南1-1-1",
  postalCode: "150-0041",
  distance: "50m",
  rating: 4.5,
  isCheckedIn: false,
  description:
    "パリの雰囲気を楽しめる本格的なカフェです。厳選されたコーヒー豆を使用し、熟練のバリスタが一杯一杯丁寧に淹れています。WiFi完備で電源も利用可能なため、リモートワークにも最適です。落ち着いた店内では、ゆったりとした時間をお過ごしいただけます。",
  openHours: "8:00 - 22:00",
  phone: "03-1234-5678",
  features: ["WiFi完備", "電源あり", "禁煙", "テイクアウト可"],
};

const allPosts: Post[] = [
  {
    id: 1,
    user: { name: "田中太郎", avatar: "/placeholder-user.jpg" },
    content:
      "コーヒーがとても美味しかったです！雰囲気も良くて、仕事にも集中できました。",
    timestamp: "2時間前",
    likes: 12,
    comments: 3,
    isLiked: false,
    rating: 4.5, // 0.5単位
  },
  {
    id: 2,
    user: { name: "佐藤花子", avatar: "/placeholder-user.jpg" },
    content: "パンケーキが絶品でした🥞 また来たいと思います！",
    timestamp: "5時間前",
    likes: 8,
    comments: 1,
    isLiked: true,
    rating: 4.0,
  },
  {
    id: 3,
    user: { name: "山田次郎", avatar: "/placeholder-user.jpg" },
    content: "WiFiも快適で、電源もあるのでノマドワークにおすすめです。",
    timestamp: "1日前",
    likes: 15,
    comments: 5,
    isLiked: false,
    rating: 3.5,
  },
  {
    id: 4,
    user: { name: "鈴木美咲", avatar: "/placeholder-user.jpg" },
    content: "店員さんがとても親切でした。コーヒーも美味しくて満足です。",
    timestamp: "2日前",
    likes: 6,
    comments: 2,
    isLiked: false,
    rating: 5.0,
  },
  {
    id: 5,
    user: { name: "高橋健太", avatar: "/placeholder-user.jpg" },
    content: "落ち着いた雰囲気で読書にも最適です。",
    timestamp: "3日前",
    likes: 4,
    comments: 1,
    isLiked: false,
    rating: 4.0,
  },
];

export default function StoreDetailPage({}: { params: { id: number } }) {
  return (
    <div className="min-h-screen bg-blue-50">
      <StoreHeader />
      <StoreInfo storeData={storeData} />
      <AllPosts posts={allPosts} />
    </div>
  );
}
