import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, Eye, Clock } from "lucide-react";
import { StarRating } from "@/components/StarRating";
import { deleteReportedPostAction, approveReportedPostAction } from "./actions";

type ReportedPost = {
  id: string;
  user: { name: string; avatar: string };
  content: string;
  timestamp: string;
  reports: number;
  reportReasons: string[];
  rating: number;
};

type ReportsTabProps = {
  reportedPosts: ReportedPost[];
};

const reportReasons = [
  { id: "inappropriate", label: "不適切な内容" },
  { id: "spam", label: "スパム・宣伝" },
  { id: "harassment", label: "誹謗中傷・嫌がらせ" },
  { id: "false_info", label: "虚偽の情報" },
  { id: "copyright", label: "著作権侵害" },
  { id: "other", label: "その他" },
];

export async function ReportsTab({ reportedPosts }: ReportsTabProps) {
  const reasonLabelMap = Object.fromEntries(
    reportReasons.map((r) => [r.id, r.label])
  );

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
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                <AvatarImage src={post.user.avatar || ""} />
                <AvatarFallback>{post.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{post.user.name}</span>
                  <Badge variant="destructive" className="text-xs">
                    {post.reports}件の報告
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 mb-2">
                  <StarRating value={post.rating} readOnly size="sm" />
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {post.timestamp}
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 mb-2">
                  {post.content}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.reportReasons.map((reasonId, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs border-red-300 text-red-600"
                    >
                      {reasonLabelMap[reasonId] || reasonId}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <form action={deleteReportedPostAction.bind(null, post.id)}>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="bg-red-500 hover:bg-red-600"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      削除
                    </Button>
                  </form>
                  <form action={approveReportedPostAction.bind(null, post.id)}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-500 text-green-600 hover:bg-green-50"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      承認
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </TabsContent>
  );
}
