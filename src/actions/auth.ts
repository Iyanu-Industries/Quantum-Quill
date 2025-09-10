"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers"; // Added for cookie handling

export async function signUp(formData: FormData) {
  const cookieStore = await cookies();
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const receiveEmails = formData.get("receiveEmails") === "on";

  cookieStore.set("firstName", String(firstName), { path: "/" });
  cookieStore.set("lastName", String(lastName), { path: "/" });
  cookieStore.set("email", String(email), { path: "/" });
  cookieStore.set("password", String(password), { path: "/", secure: true });
  cookieStore.set("receiveEmails", receiveEmails.toString(), { path: "/" });

  if (!firstName || !lastName || !email || !password) {
    redirect("/sign-up?error=Missing required fields");
  }

  const userCreated = true;

  if (!userCreated) {
    redirect("/sign-up?error=Failed to create user");
  }

  redirect("/dashboard");
}

export async function login(formData: FormData) {
  const cookieStore = await cookies();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    redirect("/login?error=Missing required fields");
  }

  const isAuthenticated = true;

  if (!isAuthenticated) {
    redirect("/login?error=Invalid credentials");
  }

  cookieStore.set("email", String(email), { path: "/" });

  redirect("/application/dashboard");
}
