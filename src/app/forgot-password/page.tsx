import { SnapfitLogo } from "@/components/branding/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return <main className="mx-auto max-w-md px-4 py-20"><SnapfitLogo /><h1 className="mt-6 text-2xl font-semibold">Reset password</h1><form className="mt-4 space-y-3"><Input placeholder="Email" /><Button className="w-full">Send reset link</Button></form></main>;
}
