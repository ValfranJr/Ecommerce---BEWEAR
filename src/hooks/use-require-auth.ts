"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export const useRequireAuth = () => {
  const { data: session } = authClient.useSession();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const requireAuth = (callback: () => void) => {
    if (!session?.user) {
      setShowLoginPopup(true);
      return false;
    }
    callback();
    return true;
  };

  return {
    session,
    showLoginPopup,
    setShowLoginPopup,
    requireAuth,
    isAuthenticated: !!session?.user,
  };
};
