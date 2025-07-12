import { useEffect, useState } from "react";
import type { LoginCredentials } from "../types/auth";
import Input from "../components/Input";
import Button from "../components/Button";
import { authService } from "../services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const { setToken } = useAuthStore();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });

  const { mutate: loginMutation, isPending: loginLoading } = useMutation({
    mutationFn: (payload: LoginCredentials) => authService.login(payload),
    onSuccess: (response) => {
      setCredentials({ username: "", password: "" });
      navigate("/");
      setToken(response.data.token);
    },
    onError: (error) => {
      console.error("Error on login", error);
      alert("Login failed");
    },
  });

  const handleLogin = () => {
    loginMutation(credentials);
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        <Input
          label="Username"
          placeholder="Your username"
          type="text"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <div className="mt-3" />
        <Input
          isPassword={true}
          label="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />

        <div className="mt-3 grid grid-cols-1 ">
          <Button label="Login" onClick={handleLogin} loading={loginLoading} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
