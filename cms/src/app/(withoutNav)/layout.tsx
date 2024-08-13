import { AuroraBackground } from "@/components/ui/aurora-background";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <main className="flex-grow">{children}</main>
     
      </>
    );
  }
  