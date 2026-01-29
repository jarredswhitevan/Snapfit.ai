import { Card } from "@/components/ui/Card";
import { AuthForm } from "@/components/AuthForm";

export default function AuthPage() {
  return (
    <div className="container flex justify-center">
      <Card className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Welcome to SnapFIT</h1>
          <p className="text-sm text-slate-600">
            Sign up or sign in to build your AI fitness plan.
          </p>
        </div>
        <AuthForm />
      </Card>
    </div>
  );
}
