"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle } from "lucide-react";

// 通報理由の選択肢
const reportReasons = [
  { id: "inappropriate", label: "不適切な内容" },
  { id: "spam", label: "スパム・宣伝" },
  { id: "harassment", label: "誹謗中傷・嫌がらせ" },
  { id: "false_info", label: "虚偽の情報" },
  { id: "copyright", label: "著作権侵害" },
  { id: "other", label: "その他" },
];

type ReportDialogProps = {
  postId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ReportDialog({
  postId,
  open,
  onOpenChange,
}: ReportDialogProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [reportComment, setReportComment] = useState("");
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  const handleReasonChange = (reasonId: string, checked: boolean) => {
    setSelectedReasons((prev) =>
      checked ? [...prev, reasonId] : prev.filter((id) => id !== reasonId)
    );
  };

  const handleSubmitReport = async () => {
    if (selectedReasons.length === 0) return;

    setIsSubmittingReport(true);

    setTimeout(() => {
      console.log("Report submitted:", {
        postId,
        reasons: selectedReasons,
        comment: reportComment,
      });

      setIsSubmittingReport(false);
      onOpenChange(false);
      setSelectedReasons([]);
      setReportComment("");

      alert("通報を受け付けました。内容を確認いたします。");
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            投稿を通報
          </DialogTitle>
          <DialogDescription>
            不適切な投稿を通報してください。内容を確認後、適切な対応を行います。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              通報理由（複数選択可）
            </Label>
            <div className="space-y-2">
              {reportReasons.map((reason) => (
                <div key={reason.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={reason.id}
                    checked={selectedReasons.includes(reason.id)}
                    onCheckedChange={(checked) =>
                      handleReasonChange(reason.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={reason.id}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {reason.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label
              htmlFor="reportComment"
              className="text-sm font-medium text-gray-700"
            >
              詳細（任意）
            </Label>
            <Textarea
              id="reportComment"
              placeholder="通報理由の詳細があれば入力してください..."
              value={reportComment}
              onChange={(e) => setReportComment(e.target.value)}
              rows={3}
              className="mt-1"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmittingReport}
          >
            キャンセル
          </Button>
          <Button
            onClick={handleSubmitReport}
            disabled={selectedReasons.length === 0 || isSubmittingReport}
            className="bg-red-600 hover:bg-red-700"
          >
            {isSubmittingReport ? "送信中..." : "通報する"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
