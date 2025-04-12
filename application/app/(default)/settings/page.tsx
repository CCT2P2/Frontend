"use client";
import { useUISettings } from "@/app/store/useUISettings";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  const { bg, blur, setBg, setBlur } = useUISettings();

  return (
    <div className="flex justify-center px-4 py-10">
      <Card
        className={`${blur ? "bg-stone-800/20" : "bg-black"} ${blur ? "backdrop-blur-md" : ""} w-96 p-5 mx-5 `}
      >
        User section
      </Card>
      <Card
        className={`w-full max-w-xl p-8 ${blur ? "bg-stone-800/20" : "bg-black"} ${blur ? "backdrop-blur-md" : ""} space-y-6`}
      >
        <h1 className="text-3xl font-bold text-white">GnuF Settings</h1>

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
      <Card
        className={`mx-5 w-96 ${blur ? "bg-stone-800/20" : "bg-black"} ${blur ? "backdrop-blur-md" : ""} `}
      >
        Community section
      </Card>
    </div>
  );
}
