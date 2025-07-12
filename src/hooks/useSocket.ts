/* eslint-disable @typescript-eslint/no-explicit-any */
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

const socket = io(import.meta.env.VITE_NOTIF);

export const useSocket = (onMessage: (data: any) => void) => {
  const userProfile = useAuthStore((state) => state.userProfile);
  useEffect(() => {
    if (userProfile?.role !== "hrd") return;
    socket.on("checkin-notification", onMessage);
    return () => {
      socket.off("checkin-notification", onMessage);
    };
  }, [onMessage, userProfile]);
};
