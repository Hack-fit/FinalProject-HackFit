import Navbar from "@/components/Navbar";
import { SideBar } from "@/components/SideBar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
        <div className="flex min-h-screen h-full">
          <SideBar />

          <div className="flex-1 flex flex-col overflow-y-auto"> {/* Adjust ml-64 based on Sidebar width */}
            {/* <Navbar /> */}

            {/* Main Content */}
            <main className="p-4">
              {children}
            </main>
          </div>
        </div>
      
  );
}
