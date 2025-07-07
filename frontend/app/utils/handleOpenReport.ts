import { Dispatch, SetStateAction } from "react";

export function handleOpenReport(
  id: number,
  setTargetPostId: Dispatch<SetStateAction<number | null>>,
  setReportDialogOpen: Dispatch<SetStateAction<boolean>>
) {
  setTargetPostId(id);
  setReportDialogOpen(true);
}
