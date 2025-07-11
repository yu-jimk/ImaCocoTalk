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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";
import Form from "next/form";
import { submitReport } from "./actions";

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
  isReportDialogOpen: boolean;
  setReportDialogOpen: (open: boolean) => void;
};

export function ReportDialog({
  postId,
  isReportDialogOpen,
  setReportDialogOpen,
}: ReportDialogProps) {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReasonChange = (reasonId: string) => {
    setSelectedReason(reasonId);
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await submitReport(formData);
      setReportDialogOpen(false);
      setSelectedReason("");
      alert("通報を受け付けました。内容を確認いたします。");
    } catch (e) {
      alert(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isReportDialogOpen} onOpenChange={setReportDialogOpen}>
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

        <Form action={handleSubmit} className="space-y-4">
          <Input type="hidden" name="postId" value={postId} />

          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            通報理由（1つ選択）
          </Label>
          <RadioGroup
            name="reason"
            value={selectedReason}
            onValueChange={handleReasonChange}
            className="space-y-2"
          >
            {reportReasons.map((reason) => (
              <div key={reason.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  id={reason.id}
                  value={reason.id}
                  checked={selectedReason === reason.id}
                />
                <Label
                  htmlFor={reason.id}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  {reason.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setReportDialogOpen(false)}
              disabled={isSubmitting}
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              disabled={!selectedReason || isSubmitting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? "送信中..." : "通報する"}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
