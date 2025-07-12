import { useState } from "react";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Layout from "../../../layout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { mainService } from "../../../services/main.service";
import Button from "../../../components/Button";
import { generatePassword } from "../../../utils/common";
import { useNavigate } from "react-router-dom";

const roleOptions = [
  {
    value: "hrd",
    label: "HRD (Admin)",
  },
  {
    value: "employee",
    label: "Karyawan (User)",
  },
];
const AddUserPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    role: "",
    department: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    role: "",
    department: "",
  });

  const { data: departmentsList } = useQuery({
    queryKey: ["departments"],
    queryFn: () => mainService.getAllDepartments(),
  });

  const {
    mutate: createSingleEmployeeMutation,
    isPending: createSingleEmployeeLoading,
  } = useMutation({
    mutationFn: () => mainService.createSingleEmployee(formData),
    onSuccess: () => {
      setFormData({
        username: "",
        password: "",
        name: "",
        email: "",
        role: "",
        department: "",
      });
      navigate("/pengguna");
    },
    onError: (error) => {
      console.error("Error on add user", error);
      alert("Gagal menambahkan pengguna");
    },
  });

  const validate = () => {
    const errors = {
      username: "",
      password: "",
      name: "",
      email: "",
      role: "",
      department: "",
    };

    // username: not empty and no whitespace
    if (!formData.username.trim()) {
      errors.username = "Username tidak boleh kosong";
    } else if (/\s/.test(formData.username)) {
      errors.username = "Username tidak boleh mengandung spasi";
    }

    // password: not empty
    if (!formData.password.trim()) {
      errors.password = "Password tidak boleh kosong";
    }

    // name: not empty
    if (!formData.name.trim()) {
      errors.name = "Nama lengkap tidak boleh kosong";
    }

    // email: must contain @
    if (!formData.email.trim()) {
      errors.email = "Email tidak boleh kosong";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email tidak valid";
    }

    // role: must not be empty
    if (!formData.role.trim()) {
      errors.role = "Role harus dipilih";
    }

    // department: must not be empty
    if (!formData.department.trim()) {
      errors.department = "Departemen harus dipilih";
    }

    setErrorMessage(errors);

    // Return whether the form is valid
    return Object.values(errors).every((err) => err === "");
  };

  const handleSubmit = () => {
    const valid = validate();
    if (valid) {
      createSingleEmployeeMutation();
    } else {
      return;
    }
  };

  return (
    <Layout>
      <h1 className="mb-3 text-gray-600">
        Manajemen Pengguna &gt; Tambah Pengguna
      </h1>

      <div className="bg-white border border-gray-300/80 rounded-lg p-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Masukkan nama pengguna"
            value={formData.username}
            errorMessage={errorMessage.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <Input
            isPassword
            label="Masukkan password"
            value={formData.password}
            errorMessage={errorMessage.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Input
            label="Masukkan nama lengkap"
            value={formData.name}
            errorMessage={errorMessage.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Masukkan email"
            type="email"
            value={formData.email}
            errorMessage={errorMessage.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Select
            label="Pilih role"
            options={roleOptions}
            value={formData.role}
            errorMessage={errorMessage.role}
            onChange={(e) => setFormData({ ...formData, role: e })}
          />
          <Select
            label="Pilih departemen"
            options={departmentsList}
            value={formData.department}
            errorMessage={errorMessage.department}
            onChange={(e) => setFormData({ ...formData, department: e })}
          />
        </div>
        <div className="flex flex-row justify-end mt-3 gap-2">
          <Button
            label="Buat Password"
            type="primaryOutline"
            width="w-1/4"
            onClick={() =>
              setFormData({ ...formData, password: generatePassword() })
            }
          />
          <Button
            label="Simpan"
            type="primarySolid"
            width="w-1/4"
            loading={createSingleEmployeeLoading}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AddUserPage;
