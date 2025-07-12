import Layout from "../../../layout";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { mainService } from "../../../services/main.service";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Select from "../../../components/Select";
import Input from "../../../components/Input";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const locArray: string[] = location.pathname.split("/");
  const id: string = locArray[locArray.length - 1];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    department: "",
  });
  const [isEdit, setIsEdit] = useState(false); // false for read, true for edit

  const { data: employeeDetail } = useQuery({
    queryKey: ["employeeDetail", id],
    queryFn: () => mainService.getEmployeeById(id),
  });

  const { data: departmentsList } = useQuery({
    queryKey: ["departments"],
    queryFn: () => mainService.getAllDepartments(),
  });

  const {
    mutate: updateSingleEmployeeMutation,
    isPending: updateSingleEmployeeLoading,
  } = useMutation({
    mutationFn: () => mainService.updateSingleEmployee(id, formData),
    onSuccess: () => {
      navigate("/pengguna");
    },
    onError: (error) => {
      console.error("Error on update", error);
      alert("Update failed");
    },
  });

  useEffect(() => {
    if (employeeDetail) {
      setFormData({
        name: employeeDetail.name,
        email: employeeDetail.email,
        department: employeeDetail.department,
      });
    }
  }, [employeeDetail]);

  const validate = () => {
    const errors = {
      name: "",
      email: "",
      department: "",
    };

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
      updateSingleEmployeeMutation();
    } else {
      return;
    }
  };

  return (
    <Layout>
      <h1 className="mb-3 text-gray-600">
        Manajemen Pengguna &gt; Edit Pengguna
      </h1>

      <div className="bg-white border border-gray-300/80 rounded-lg p-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Masukkan nama lengkap"
            value={formData.name}
            errorMessage={errorMessage.name}
            disabled={!isEdit}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Masukkan email"
            type="email"
            value={formData.email}
            errorMessage={errorMessage.email}
            disabled={!isEdit}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <Select
            label="Pilih departemen"
            options={departmentsList}
            value={formData.department}
            errorMessage={errorMessage.department}
            disabled={!isEdit}
            onChange={(e) => setFormData({ ...formData, department: e })}
          />
        </div>
        <div className="flex flex-row justify-between mt-3 gap-2">
          <Button
            label="Kembali"
            type="primaryOutline"
            width="w-1/4"
            onClick={() => navigate("/pengguna")}
          />
          <div className="flex flex-row justify-end gap-2 w-full">
            {isEdit ? (
              <>
                <Button
                  label="Batal"
                  type="dangerOutline"
                  width="w-1/4"
                  onClick={() => setIsEdit(false)}
                />
                <Button
                  label="Simpan"
                  type="primarySolid"
                  width="w-1/4"
                  onClick={handleSubmit}
                  loading={updateSingleEmployeeLoading}
                />
              </>
            ) : (
              <Button
                label="Ubah"
                type="successSolid"
                width="w-1/4"
                onClick={() => setIsEdit(true)}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditUser;
