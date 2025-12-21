"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession } from "@/lib/api/clientApi";
import Loading from "@/app/loading";

interface AuthProviderProps {
  children: ReactNode;
}

const privateRoutes = ["/profile", "/notes"];

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const isPrivate = privateRoutes.some((route) =>
        pathname.startsWith(route)
      );

      if (isPrivate) {
        const user = await checkSession();

        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();
          router.replace("/sign-in");
        }
      }

      setLoading(false);
    };

    verifySession();
  }, [pathname, setUser, clearIsAuthenticated, router]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthProvider;
