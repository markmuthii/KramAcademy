"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const createUserSession = async (response?: NextResponse) => {
  (await cookies()).set("session", "1234", {});
};
