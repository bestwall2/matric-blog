import { Suspense } from "react";
import { LoginForm } from "@/components/admin/login-form";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-neutral-400">
          جارٍ التحميل...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
