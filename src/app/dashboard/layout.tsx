import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardBottomNav from "@/components/dashboard/DashboardBottomNav";
import { DashboardProvider } from "@/contexts/DashboardContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <div className="h-screen w-full bg-[#F9FAFB] flex font-sans overflow-hidden">
      {/* Left Full-Height Sidebar */}
      <DashboardSidebar />
      
      {/* Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Navbar */}
        <DashboardNavbar />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-20 md:p-6 md:pb-6 lg:p-8">
          <div className="max-w-[1400px] mx-auto w-full">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <DashboardBottomNav />
      </div>
    </div>
    </DashboardProvider>
  );
}
