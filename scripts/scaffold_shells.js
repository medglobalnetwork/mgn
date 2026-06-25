const fs = require('fs');
const path = require('path');

const dashDir = path.join(__dirname, '..', 'src', 'app', 'dashboard');

const pages = [
  { 
    dir: 'search', 
    content: `"use client";
import { Search } from "lucide-react";
export default function SearchPage() {
  return (
    <div className="max-w-[1000px] mx-auto pb-10 w-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-[#0B1B3D] mb-4 flex items-center gap-2"><Search className="w-5 h-5"/> Global Search</h2>
        <input type="text" placeholder="Search people, posts, organizations..." className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0052CC]" />
        <div className="mt-8 text-center text-gray-500 text-sm">Search results will appear here.</div>
      </div>
    </div>
  );
}`
  },
  {
    dir: 'notifications',
    content: `"use client";
import { Bell } from "lucide-react";
export default function NotificationsPage() {
  return (
    <div className="max-w-[800px] mx-auto pb-10 w-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-[#0B1B3D] mb-4 flex items-center gap-2"><Bell className="w-5 h-5"/> Notifications</h2>
        <div className="flex flex-col gap-4 mt-6">
          <div className="text-center text-gray-500 text-sm py-10">You have no new notifications.</div>
        </div>
      </div>
    </div>
  );
}`
  },
  {
    dir: 'messages',
    content: `"use client";
import { MessageCircle } from "lucide-react";
export default function MessagesPage() {
  return (
    <div className="max-w-[1000px] mx-auto pb-10 w-full h-[calc(100vh-100px)] flex gap-4">
      <div className="w-1/3 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col">
        <h2 className="text-lg font-bold text-[#0B1B3D] mb-4 flex items-center gap-2"><MessageCircle className="w-5 h-5"/> Messages</h2>
        <input type="text" placeholder="Search messages..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0052CC] mb-4" />
        <div className="flex-1 flex items-center justify-center text-sm text-gray-500">No recent chats</div>
      </div>
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center justify-center">
        <MessageCircle className="w-12 h-12 text-gray-200 mb-2" />
        <p className="text-gray-500 text-sm">Select a conversation to start messaging</p>
      </div>
    </div>
  );
}`
  }
];

for (const p of pages) {
  const dirPath = path.join(dashDir, p.dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), p.content);
}

console.log("Scaffolded shells");
