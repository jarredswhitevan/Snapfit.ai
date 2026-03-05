"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

type AuthFormValues = z.infer<typeof authSchema>;

export const AuthForm = () => {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-up");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema)
  });

  const onSubmit = (values: AuthFormValues) => {
    startTransition(async () => {
      setMessage(null);
      const supabase = createSupabaseBrowserClient();
      if (mode === "sign-up") {
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password
        });
        if (error) {
          setMessage(error.message);
          return;
        }
        setMessage("Check your email to confirm your account, then sign in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword(values);
        if (error) {
          setMessage(error.message);
          return;
        }
        window.location.href = "/dashboard";
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Email</label>
        <Input type="email" {...register("email")} />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium">Password</label>
        <Input type="password" {...register("password")} />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>
      {message && <p className="text-sm text-slate-600">{message}</p>}
      <Button type="submit" className="w-full" disabled={isPending}>
        {mode === "sign-up" ? "Create account" : "Sign in"}
      </Button>
      <button
        type="button"
        className="w-full text-sm text-slate-600 hover:text-slate-900"
        onClick={() => setMode(mode === "sign-up" ? "sign-in" : "sign-up")}
      >
        {mode === "sign-up"
          ? "Already have an account? Sign in"
          : "New here? Create an account"}
      </button>
    </form>
  );
};
