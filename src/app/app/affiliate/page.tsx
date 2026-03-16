"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AffiliatePage() {
  const [username, setUsername] = useState("");

  const affiliateLink = useMemo(() => {
    if (!username.trim()) return "snapfitco.com/?ref=yourusername";
    return `snapfitco.com/?ref=${encodeURIComponent(username.trim())}`;
  }, [username]);

  return (
    <div>
      <PageHeader
        title="Affiliate Program"
        description="Invite your audience and earn 50% of month-one revenue, then 30% monthly until canceled."
      />

      <Card>
        <h2 className="text-lg font-semibold">Creator details</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your info below and your referral link is generated instantly.
        </p>

        <form className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Email</label>
            <Input type="email" placeholder="creator@email.com" required />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Username</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Instagram (optional)</label>
            <Input placeholder="https://instagram.com/yourhandle" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Snapchat (optional)</label>
            <Input placeholder="https://snapchat.com/add/yourhandle" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">YouTube (optional)</label>
            <Input placeholder="https://youtube.com/@yourchannel" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">TikTok (optional)</label>
            <Input placeholder="https://tiktok.com/@yourhandle" />
          </div>

          <div className="md:col-span-2 rounded-lg border bg-muted/30 p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Your affiliate link</p>
            <p className="mt-1 break-all font-medium">{affiliateLink}</p>
          </div>

          <div className="md:col-span-2">
            <Button type="button">Save creator profile</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
