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

  // Set cookies with form data
  cookieStore.set("firstName", String(firstName), { path: "/" });
  cookieStore.set("lastName", String(lastName), { path: "/" });
  cookieStore.set("email", String(email), { path: "/" });
  cookieStore.set("password", String(password), { path: "/", secure: true }); // Secure for sensitive data
  cookieStore.set("receiveEmails", receiveEmails.toString(), { path: "/" });

  // Basic server-side validation
  if (!firstName || !lastName || !email || !password) {
    redirect("/sign-up?error=Missing required fields");
  }

  // Simulate user creation (replace with actual backend logic)
  const userCreated = true; // Placeholder

  if (!userCreated) {
    redirect("/sign-up?error=Failed to create user");
  }

  // On success, redirect to dashboard
  redirect("/dashboard");
}
