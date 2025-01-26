import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Ensure the publishable key is loaded from environment variables
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.error(
      "Clerk publishableKey is missing. Make sure to add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env.local file."
    );
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
        <h1>Application Configuration Error</h1>
        <p>
          Clerk publishableKey is missing. Please set it in your environment
          variables.
        </p>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  );
}
