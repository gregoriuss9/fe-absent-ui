interface JWTPayload {
  userId: number;
  userRole: string;
  userEmployeeNo: string;
  userUsername: string;
  userName: string;
  userDepartment: string;
  exp: number;
}

export const decodeJWT = (token: string): JWTPayload | null => {
  if (!token) {
    return null;
  }

  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const result = JSON.parse(jsonPayload);

    return {
      userId: result.id,
      userRole: result.role,
      userEmployeeNo: result.no_employee,
      userUsername: result.username,
      userDepartment: result.department,
      userName: result.name,
      exp: result.exp,
    };
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};
