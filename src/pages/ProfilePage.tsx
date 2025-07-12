/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Layout from "../layout";
import { useAuthStore } from "../store/authStore";
import { authService } from "../services/auth.service";
import { useMutation } from "@tanstack/react-query";
import type { ChangeCredential } from "../types/auth";

type FormData = {
  username: string;
  passwordLama: string;
  passwordBaru: string;
  konfirmasiPasswordBaru: string;
};
const ProfilePage = () => {
  const userProfile = useAuthStore((state) => state.userProfile);

  const [formData, setFormData] = useState<FormData>({
    username: "",
    passwordLama: "",
    passwordBaru: "",
    konfirmasiPasswordBaru: "",
  });

  const [errorMessage, setErrorMessage] = useState<FormData>({
    username: "",
    passwordLama: "",
    passwordBaru: "",
    konfirmasiPasswordBaru: "",
  });

  const {
    mutate: changeCredentialMutation,
    isPending: changeCredentialLoading,
  } = useMutation({
    mutationFn: (payload: ChangeCredential) =>
      authService.changeCredential(payload),
    onSuccess: () => {
      setFormData((prev) => ({
        ...prev,
        passwordLama: "",
        passwordBaru: "",
        konfirmasiPasswordBaru: "",
      }));
      authService.logout();
      window.location.href = "/login";
    },
    onError: (error: any) => {
      console.error(
        "Error on change credential",
        error?.response?.data?.message
      );
      alert(error?.response?.data?.message || "Change credential failed");
    },
  });

  useEffect(() => {
    if (userProfile) {
      setFormData((prev) => ({
        ...prev,
        username: userProfile?.username || "",
      }));
    }
  }, [userProfile]);

  const validate = () => {
    const errors = {
      username: "",
      passwordLama: "",
      passwordBaru: "",
      konfirmasiPasswordBaru: "",
    };

    // username: not empty and no whitespace
    if (!formData.username.trim()) {
      errors.username = "Username tidak boleh kosong";
    } else if (/\s/.test(formData.username)) {
      errors.username = "Username tidak boleh mengandung spasi";
    }

    // oldPassword: not empty
    if (!formData.passwordLama.trim()) {
      errors.passwordLama = "Password tidak boleh kosong";
    }

    // newPassword: not empty and not same with oldPassword
    if (!formData.passwordBaru.trim()) {
      errors.passwordBaru = "Password tidak boleh kosong";
    } else if (formData.passwordBaru === formData.passwordLama) {
      errors.passwordBaru = "Password tidak boleh sama dengan password lama";
    }

    // confirmPassword: not empty and same with newPassword
    if (!formData.konfirmasiPasswordBaru.trim()) {
      errors.konfirmasiPasswordBaru = "Password tidak boleh kosong";
    } else if (formData.konfirmasiPasswordBaru !== formData.passwordBaru) {
      errors.konfirmasiPasswordBaru =
        "Password tidak sama dengan password baru";
    }

    setErrorMessage(errors);

    // Return whether the form is valid
    return Object.values(errors).every((err) => err === "");
  };

  const handleSubmit = () => {
    const valid = validate();
    if (valid) {
      changeCredentialMutation({
        newUsername: formData.username,
        oldPassword: formData.passwordLama,
        newPassword: formData.passwordBaru,
      });
    } else {
      return;
    }
  };

  return (
    <Layout>
      <h1 className="text-gray-600">Profil</h1>
      <div className="my-3 bg-white p-3 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Username"
            value={formData?.username}
            errorMessage={errorMessage?.username}
            onChange={(e) =>
              setFormData({
                ...formData,
                username: e.target.value,
              })
            }
          />
          <Input
            label="Password Lama"
            isPassword
            value={formData?.passwordLama}
            errorMessage={errorMessage?.passwordLama}
            onChange={(e) =>
              setFormData({ ...formData, passwordLama: e.target.value })
            }
          />
          <Input
            label="Password Baru"
            isPassword
            value={formData?.passwordBaru}
            errorMessage={errorMessage?.passwordBaru}
            onChange={(e) =>
              setFormData({ ...formData, passwordBaru: e.target.value })
            }
          />
          <Input
            label="Konfirmasi Password Baru"
            isPassword
            value={formData?.konfirmasiPasswordBaru}
            errorMessage={errorMessage?.konfirmasiPasswordBaru}
            onChange={(e) =>
              setFormData({
                ...formData,
                konfirmasiPasswordBaru: e.target.value,
              })
            }
          />
        </div>
        <div className="mt-3 flex justify-end">
          <Button
            label="Simpan"
            type="primarySolid"
            width="w-1/3"
            loading={changeCredentialLoading}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
