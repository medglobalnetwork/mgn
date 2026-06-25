const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, '..', 'src', 'app', 'admin');
const pocPages = [
    { dir: 'users', title: 'User Management' },
    { dir: 'moderation', title: 'Content Moderation Center' },
    { dir: 'trust', title: 'Trust Review Queue' },
    { dir: 'reports', title: 'Reports & Appeals' },
    { dir: 'audit', title: 'Audit Center' },
    { dir: 'analytics', title: 'Platform Analytics' },
    { dir: 'system', title: 'System Health & Configuration' },
];

const pageTemplate = (title) => `"use client";

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">${title}</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6 text-gray-500">
        This module is under construction as part of the Enterprise Platform Operations Center.
      </div>
    </div>
  );
}
`;

for (const page of pocPages) {
    const dir = path.join(adminDir, page.dir);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path.join(dir, 'page.tsx'), pageTemplate(page.title));
}

// Write the layout for POC
const layoutContent = `"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Shield, Flag, Activity, Settings, Database, FileText, CheckSquare } from "lucide-react";

export default function POCLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Operations Dashboard", href: "/admin", icon: Activity },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Content Moderation", href: "/admin/moderation", icon: FileText },
    { name: "Trust Review Queue", href: "/admin/trust", icon: CheckSquare },
    { name: "Reports & Appeals", href: "/admin/reports", icon: Flag },
    { name: "Audit Center", href: "/admin/audit", icon: Database },
    { name: "Platform Analytics", href: "/admin/analytics", icon: Activity },
    { name: "System Health & Config", href: "/admin/system", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-[#0B1B3D] text-white flex flex-col">
        <div className="p-4 border-b border-white/10">
          <h1 className="font-bold text-lg">Platform Operations</h1>
          <p className="text-xs text-blue-300">MGN Enterprise</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className={\`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors \${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-white/10'}\`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(adminDir, 'layout.tsx'), layoutContent);
console.log("POC scaffolded successfully");
