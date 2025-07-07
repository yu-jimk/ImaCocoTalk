import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QRCode } from "@/components/qr-code";
import { QrCode } from "lucide-react";
import type { FC } from "react";

interface QrCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  size?: number;
}

export const QrCodeDialog: FC<QrCodeDialogProps> = ({
  open,
  onOpenChange,
  value,
  size = 240,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="flex flex-col items-center">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-lg">
          <QrCode className="h-6 w-6" /> 店舗QRコード
        </DialogTitle>
      </DialogHeader>
      <QRCode value={value} size={size} />
      <p className="text-base text-gray-600 mt-4 text-center">
        このQRコードを店内に設置してください
      </p>
      <p className="text-sm text-gray-500 mt-2 text-center">
        お客様がスキャンするとチェックインできます
      </p>
    </DialogContent>
  </Dialog>
);
