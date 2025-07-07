import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, Eye } from "lucide-react";
import { StarRating } from "@/components/star-rating";
import React, { useState } from "react";

type ReportedPost = {
  id: number;
  user: { name: string; avatar: string };
  content: string;
  timestamp: string;
  reports: number;
  reportReasons: string[];
  status: string;
  rating: number;
};

type ReportsTabProps = {
  reportedPosts: ReportedPost[];
};

export function ReportsTab({
  reportedPosts: initialReportedPosts,
}: ReportsTabProps) {
  const [reportedPosts, setReportedPosts] = useState(initialReportedPosts);

  const handleDeletePost = (postId: number) => {
    setReportedPosts((prev) => prev.filter((post) => post.id !== postId));
    // API連携等はここで
  };

  const handleApprovePost = (postId: number) => {
    setReportedPosts((prev) => prev.filter((post) => post.id !== postId));
    // API連携等はここで
  };

  return (
    <TabsContent value="reports" className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-red-500" />
        <h2 className="font-semibold text-red-700">違反報告された投稿</h2>
        <Badge variant="destructive">{reportedPosts.length}</Badge>
      </div>
      {reportedPosts.map((post) => (
        <Card
          key={post.id}
          className="border-l-4 border-l-red-500 bg-red-50/50"
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{post.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{post.user.name}</span>
                  <StarRating value={post.rating} readOnly size="sm" />
                  <span className="text-xs text-gray-500">
                    {post.timestamp}
                  </span>
                  <Badge variant="destructive" className="text-xs">
                    {post.reports}件の報告
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mb-2">{post.content}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.reportReasons.map((reason, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs border-red-300 text-red-600"
                    >
                      {reason}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeletePost(post.id)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    削除
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleApprovePost(post.id)}
                    className="border-green-500 text-green-600 hover:bg-green-50"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    承認
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </TabsContent>
  );
}
