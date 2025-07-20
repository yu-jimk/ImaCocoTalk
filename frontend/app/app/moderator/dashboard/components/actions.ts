"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deleteReportedPostAction(postId: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.get("moderator_jwt")?.value;

  const res = await fetch(
    `http://backend:3000/api/moderator/reports/${postId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `moderator_jwt=${cookieHeader}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("削除に失敗しました");
  }

  revalidatePath("/moderator/dashboard");
}

export async function approveReportedPostAction(postId: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.get("moderator_jwt")?.value;

  const res = await fetch(
    `http://backend:3000/api/moderator/reports/${postId}/approve`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `moderator_jwt=${cookieHeader}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("承認に失敗しました");
  }

  revalidatePath("/moderator/dashboard");
}
