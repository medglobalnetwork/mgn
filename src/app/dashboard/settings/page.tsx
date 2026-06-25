"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState, useTransition } from "react";
import { getUserProfile, updateProfileInfo, addExperience, deleteExperience, addEducation, deleteEducation, FullProfile } from "@/app/actions/profile";
import { User, Shield, Bell, Briefcase, GraduationCap, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [isPending, startTransition] = useTransition();
  const [successMsg, setSuccessMsg] = useState("");

  // Form states
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const fetchProfile = async () => {
    if (!user) return;
    try {
      const data = await getUserProfile(user.id);
      if (data) {
        setProfile(data);
        setHeadline(data.headline || "");
        setBio(data.bio || "");
        setCity(data.city || "");
        setCountry(data.country || "");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    startTransition(async () => {
      try {
        await updateProfileInfo(user.id, { headline, bio, city, country });
        setSuccessMsg("Profile updated successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      } catch (error) {
        console.error(error);
      }
    });
  };

  const handleAddExperience = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      company_name: formData.get("company_name") as string,
      location: formData.get("location") as string,
      start_date: formData.get("start_date") as string || null,
      end_date: formData.get("end_date") as string || null,
      is_current: formData.get("is_current") === "on",
      description: formData.get("description") as string,
    };

    startTransition(async () => {
      try {
        await addExperience(user.id, data);
        await fetchProfile(); // Refresh list
        (e.target as HTMLFormElement).reset();
      } catch (error) {
        console.error(error);
      }
    });
  };

  const handleDeleteExperience = (expId: string) => {
    if (!user) return;
    startTransition(async () => {
      try {
        await deleteExperience(expId);
        await fetchProfile();
      } catch (error) {
        console.error(error);
      }
    });
  };

  const handleAddEducation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const formData = new FormData(e.currentTarget);
    const data = {
      institution_name: formData.get("institution_name") as string,
      degree: formData.get("degree") as string,
      field_of_study: formData.get("field_of_study") as string,
      start_date: formData.get("start_date") as string || null,
      end_date: formData.get("end_date") as string || null,
      is_current: formData.get("is_current") === "on"
    };

    startTransition(async () => {
      try {
        await addEducation(user.id, data);
        await fetchProfile(); // Refresh list
        (e.target as HTMLFormElement).reset();
      } catch (error) {
        console.error(error);
      }
    });
  };

  const handleDeleteEducation = (eduId: string) => {
    if (!user) return;
    startTransition(async () => {
      try {
        await deleteEducation(eduId);
        await fetchProfile();
      } catch (error) {
        console.error(error);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-[#0052CC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto pb-10 w-full flex flex-col md:flex-row gap-8">
      {/* Sidebar Settings Tabs */}
      <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
        <h2 className="text-xl font-bold text-[#0B1B3D] mb-4 px-3">Settings</h2>
        <button 
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-medium transition-colors text-left ${activeTab === "profile" ? "bg-blue-50 text-[#0052CC]" : "text-gray-600 hover:bg-gray-50"}`}
        >
          <User className="w-4 h-4" /> Edit Profile
        </button>
        <button 
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-medium transition-colors text-left ${activeTab === "security" ? "bg-blue-50 text-[#0052CC]" : "text-gray-600 hover:bg-gray-50"}`}
        >
          <Shield className="w-4 h-4" /> Security & Login
        </button>
        <button 
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-medium transition-colors text-left ${activeTab === "notifications" ? "bg-blue-50 text-[#0052CC]" : "text-gray-600 hover:bg-gray-50"}`}
        >
          <Bell className="w-4 h-4" /> Notifications
        </button>
        <button 
          onClick={() => setActiveTab("privacy")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-medium transition-colors text-left ${activeTab === "privacy" ? "bg-blue-50 text-[#0052CC]" : "text-gray-600 hover:bg-gray-50"}`}
        >
          <Shield className="w-4 h-4" /> Privacy Settings
        </button>
      </div>

      {/* Main Settings Content */}
      <div className="flex-1 flex flex-col gap-6">
        {activeTab === "profile" && (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-[#0B1B3D] mb-4">Basic Information</h3>
              {successMsg && (
                <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm font-medium">
                  {successMsg}
                </div>
              )}
              <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Headline</label>
                  <input 
                    type="text" 
                    value={headline} 
                    onChange={e => setHeadline(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0052CC]" 
                    placeholder="e.g. Chief Medical Officer at Apollo Hospitals"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
                    <input 
                      type="text" 
                      value={city} 
                      onChange={e => setCity(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0052CC]" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Country</label>
                    <input 
                      type="text" 
                      value={country} 
                      onChange={e => setCountry(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0052CC]" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">About / Bio</label>
                  <textarea 
                    value={bio} 
                    onChange={e => setBio(e.target.value)}
                    rows={4}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0052CC] resize-none" 
                    placeholder="Write a brief summary about your professional background..."
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <button 
                    disabled={isPending}
                    type="submit" 
                    className="bg-[#0052CC] hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-50"
                  >
                    {isPending ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>

            {/* Experience Manager */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-[#0B1B3D]" />
                <h3 className="text-lg font-bold text-[#0B1B3D]">Experience</h3>
              </div>

              {/* List Existing Experience */}
              <div className="flex flex-col gap-4 mb-6">
                {profile?.experience?.map((exp: any) => (
                  <div key={exp.id} className="border border-gray-100 rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-[#0B1B3D] text-sm">{exp.title}</h4>
                      <p className="text-sm text-gray-600">{exp.company_name}</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors"
                      title="Delete experience"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Experience */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-sm font-bold text-gray-700 mb-4">Add New Experience</h4>
                <form onSubmit={handleAddExperience} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Title</label>
                      <input required name="title" type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0052CC]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Company Name</label>
                      <input required name="company_name" type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0052CC]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Start Date</label>
                      <input name="start_date" type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0052CC]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">End Date</label>
                      <input name="end_date" type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0052CC]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Location</label>
                    <input name="location" type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0052CC]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="is_current_exp" name="is_current" className="rounded border-gray-300" />
                    <label htmlFor="is_current_exp" className="text-sm text-gray-700">I currently work here</label>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                    <textarea name="description" rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0052CC] resize-none" />
                  </div>
                  <div className="flex justify-end">
                    <button 
                      disabled={isPending}
                      type="submit" 
                      className="border border-[#0052CC] text-[#0052CC] hover:bg-blue-50 px-6 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-50"
                    >
                      Add Experience
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Education Manager */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-[#0B1B3D]" />
                <h3 className="text-lg font-bold text-[#0B1B3D]">Education</h3>
              </div>

              {/* List Existing Education */}
              <div className="flex flex-col gap-4 mb-6">
                {profile?.education?.map((edu: any) => (
                  <div key={edu.id} className="border border-gray-100 rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-[#0B1B3D] text-sm">{edu.institution_name}</h4>
                      <p className="text-sm text-gray-600">{edu.degree}</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteEducation(edu.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors"
                      title="Delete education"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Education */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-sm font-bold text-gray-700 mb-4">Add New Education</h4>
                <form onSubmit={handleAddEducation} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Institution Name</label>
                    <input required name="institution_name" type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0052CC]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Degree</label>
                      <input name="degree" type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0052CC]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Field of Study</label>
                      <input name="field_of_study" type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0052CC]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Start Date</label>
                      <input name="start_date" type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0052CC]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">End Date</label>
                      <input name="end_date" type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0052CC]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="is_current_edu" name="is_current" className="rounded border-gray-300" />
                    <label htmlFor="is_current_edu" className="text-sm text-gray-700">I currently study here</label>
                  </div>
                  <div className="flex justify-end">
                    <button 
                      disabled={isPending}
                      type="submit" 
                      className="border border-[#0052CC] text-[#0052CC] hover:bg-blue-50 px-6 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-50"
                    >
                      Add Education
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}

        {activeTab === "security" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-[#0B1B3D]" />
              <h3 className="text-lg font-bold text-[#0B1B3D]">Security & Login</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-2">Change Password</h4>
                <div className="flex flex-col gap-3">
                  <input type="password" placeholder="Current Password" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0052CC]" />
                  <input type="password" placeholder="New Password" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0052CC]" />
                  <input type="password" placeholder="Confirm New Password" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0052CC]" />
                  <button className="bg-[#0B1B3D] text-white px-4 py-2 rounded-lg text-sm w-fit mt-2">Update Password</button>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-sm font-bold text-gray-700 mb-2">Two-Factor Authentication</h4>
                <p className="text-xs text-gray-500 mb-4">Add an extra layer of security to your account.</p>
                <button className="border border-[#0052CC] text-[#0052CC] px-4 py-2 rounded-lg text-sm font-bold">Enable 2FA</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-[#0B1B3D]" />
              <h3 className="text-lg font-bold text-[#0B1B3D]">Notification Preferences</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div>
                  <h4 className="text-sm font-bold text-[#0B1B3D]">Email Notifications</h4>
                  <p className="text-xs text-gray-500">Receive updates about your network via email</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#0052CC]" />
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div>
                  <h4 className="text-sm font-bold text-[#0B1B3D]">Push Notifications</h4>
                  <p className="text-xs text-gray-500">Receive real-time alerts on your device</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#0052CC]" />
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div>
                  <h4 className="text-sm font-bold text-[#0B1B3D]">Marketing Emails</h4>
                  <p className="text-xs text-gray-500">Receive offers and promotions from MGN</p>
                </div>
                <input type="checkbox" className="w-4 h-4 rounded text-[#0052CC]" />
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "privacy" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-[#0B1B3D]" />
              <h3 className="text-lg font-bold text-[#0B1B3D]">Privacy Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#0B1B3D] mb-1">Profile Visibility</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                  <option>Public (Everyone)</option>
                  <option>Network Only</option>
                  <option>Private</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-[#0B1B3D] mb-1">Who can message you?</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                  <option>Everyone</option>
                  <option>Connections Only</option>
                  <option>No one</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
