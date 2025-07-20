"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.get("user_jwt")?.value;

  await fetch(`http://backend:3000/api/auth/logout`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `user_jwt=${cookieHeader}`,
    },
  });

  cookieStore.delete("user_jwt");

  redirect("/auth/login");
}
