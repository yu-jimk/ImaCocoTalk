import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import Link from "next/link";

export function CheckinButton({ isCheckedIn }: { isCheckedIn: boolean }) {
  return (
    <Link href="/checkin">
      <Button
        className="w-full mb-2 bg-blue-600 hover:bg-blue-700"
        disabled={isCheckedIn}
        variant={isCheckedIn ? "secondary" : "default"}
      >
        <QrCode className="h-4 w-4 mr-2" />
        {isCheckedIn ? "チェックイン済み" : "チェックインして投稿"}
      </Button>
    </Link>
  );
}
