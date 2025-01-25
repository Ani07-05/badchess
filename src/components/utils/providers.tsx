import { ClerkProvider } from "@clerk/nextjs";
export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider>
          {children}
      </ClerkProvider>
  );
}
