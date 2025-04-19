"use client";
import { useUISettings } from "@/app/store/useUISettings";
import { Card } from "@/components/ui/card";
import UserSettingsForm from "@/components/forms/userSettingsForm";
import CommunitySettingsForm from "@/components/forms/communitySettingsForm";
import { useCurrentSession } from "@/lib/hooks/useCurrentSession";

export default function SettingsPage() {
  const { bg, blur, setBg, setBlur } = useUISettings();
  const { session } = useCurrentSession();

  return (
    <div className="flex justify-center px-4 py-10">
      <Card className={`w-96 p-5 mx-5 `}>
        <div className="text-3xl font-bold text-white">User section</div>
        <UserSettingsForm />
      </Card>
      <Card className={`w-full max-w-xl p-8 space-y-6`}>
        <div className="text-3xl font-bold text-white">GnuF Settings</div>

        <div className="space-y-4 text-white">
          <div className="flex items-center justify-between">
            <label htmlFor="blur-toggle" className="text-lg">
              Enable Frosted Glass Effect
            </label>
            <input
              id="blur-toggle"
              type="checkbox"
              className="w-5 h-5"
              checked={blur}
              onChange={() => setBlur(!blur)}
            />
          </div>
          {/*make this an image selector*/}
          <div className="flex items-center justify-between">
            <label htmlFor="bg-toggle" className="text-lg">
              Enable Background Image
            </label>
            <input
              id="bg-toggle"
              type="checkbox"
              className="w-5 h-5"
              checked={bg === 1}
              onChange={() => setBg(bg === 1 ? 0 : 1)}
            />
          </div>
        </div>
      </Card>
      {/*{session?.user.role === "Admin" && (*/}
      {session?.user.role === "Admin" && (
        <Card className={`mx-5 w-96 `}>
          <div className="text-3xl font-bold text-white">Community section</div>
          <CommunitySettingsForm />
        </Card>
      )}
    </div>
  );
}
