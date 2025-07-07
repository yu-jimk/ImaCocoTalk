import { Dispatch, SetStateAction } from "react";

export function handleOpenReport(
  setReportDialogOpen: Dispatch<SetStateAction<boolean>>
) {
  setReportDialogOpen(true);
}
