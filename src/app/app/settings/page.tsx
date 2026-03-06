import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function SettingsPage() {
  return <div><PageHeader title="Settings" description="Profile, preferences, and account controls." /><div className="space-y-3"><Card><p className="font-medium">Profile</p><p className="text-sm text-muted-foreground">Alex · demo@snapfit.ai</p></Card><Card><p className="font-medium">Theme</p><div className="mt-2"><ThemeToggle /></div></Card><Card><p className="font-medium">Units + account</p><p className="text-sm text-muted-foreground">Metric units · Password reset available from login.</p></Card></div></div>;
}
