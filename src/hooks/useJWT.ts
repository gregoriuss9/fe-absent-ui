import { useState, useEffect } from "react";
import { decodeJWT } from "../utils/jwt";
import { useAuthStore } from "../store/authStore";
export const useJWT = (token: string | null) => {
  const [error, setError] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const { setUserProfile } = useAuthStore();

  useEffect(() => {
    if (!token) {
      setError(null);
      setIsExpired(false);
      return;
    }

    try {
      const decoded = decodeJWT(token);
      if (!decoded) {
        setError("Invalid token");
        setIsExpired(true);
        return;
      }

      setUserProfile({
        id: decoded.userId,
        name: decoded.userName,
        username: decoded.userUsername,
        role: decoded.userRole,
        department: decoded.userDepartment,
        employeeNo: decoded.userEmployeeNo,
      });

      // check if token is expired
      const now = Date.now();
      const isTokenExpired = decoded.exp * 1000 < now;
      setIsExpired(isTokenExpired);

      if (isTokenExpired) {
        setError("Token expired");
        return;
      }

      setError(null);
    } catch (error) {
      console.error("Error decoding JWT:", error);
      setError("Failed to decode JWT");
    }
  }, [token, setUserProfile]);

  return { error, isExpired };
};
