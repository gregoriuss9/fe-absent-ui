import { useRef, useState } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import TableCustom from "../../components/TableCustom";
import Layout from "../../layout";
import { mainService } from "../../services/main.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  no_employee: string;
  department: string;
  email?: string;
  id: number;
}

const UserManagementPage = () => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchKey, setSearchKey] = useState({ char: "", input: "" });
  const [department, setDepartment] = useState("");
  const debounceRef = useRef(0);
  const navigate = useNavigate();

  const columns = [
    {
      title: "No",
      key: "no",
      render: (_: number, __: number, index: number) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "No Karyawan",
      dataIndex: "no_employee",
      key: "no_employee",
    },
    {
      title: "Departemen",
      dataIndex: "department",
      key: "department",
      render: (text: string) => <p className="capitalize">{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      width: "12%",
      render: (record: User) => (
        <div className="flex gap-2 ">
          <Button
            label={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="w-[20px] h-[20px] fill-yellow-500"
              >
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
            }
            type="warningOutline"
            onClick={() => navigate(`/pengguna/edit-pengguna/${record.id}`)}
          />
          <Button
            label={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="w-[20px] h-[20px] fill-red-500"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
            }
            type="dangerOutline"
            onClick={() => handleDeleteEmployee(record.id.toString())}
          />
        </div>
      ),
    },
  ];

  const { data: usersList, isPending: userListPending } = useQuery({
    queryKey: [
      "user-list",
      pagination.current,
      pagination.pageSize,
      searchKey.char,
      department,
    ],
    queryFn: () =>
      mainService.getAllEmployeeData(
        pagination.current,
        pagination.pageSize,
        searchKey.char,
        department
      ),
  });

  const { data: departmentsList } = useQuery({
    queryKey: ["departments"],
    queryFn: () => mainService.getAllDepartments(),
  });

  const { mutate: deleteEmployeeMutate } = useMutation({
    mutationFn: (id: string) => mainService.deleteEmployeeById(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user-list"] }),
    onError: (error) => {
      console.error("Error on delete", error);
      alert("Delete failed");
    },
  });

  const handleDeleteEmployee = (id: string) => {
    if (confirm("Apakah anda yakin ingin menghapus data ini?")) {
      deleteEmployeeMutate(id);
    }
  };

  const handlePageChange = (newPage: number, newPageSize: number) => {
    setPagination({
      current: newPage,
      pageSize: newPageSize,
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey((prev) => ({ ...prev, input: e.target.value }));
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setSearchKey((prev) => ({ ...prev, char: e.target.value }));
      setPagination((prev) => ({ ...prev, current: 1 }));
    }, 500);
  };
  return (
    <Layout>
      <h1 className="text-gray-600">Manajemen Pengguna</h1>
      <div className="my-3 flex flex-col md:flex-row gap-2 items-baseline">
        <div className="w-2/3 md:w-1/3">
          <Input
            placeholder="Cari pengguna berdasarkan nama/no karyawan"
            onChange={handleSearch}
          />
        </div>
        <div>
          <Select
            value={department}
            options={departmentsList}
            onChange={setDepartment}
          />
        </div>
        <div className="md:w-1/4 md:ml-auto">
          <Button
            label="Tambah Pengguna"
            type="primarySolid"
            onClick={() => navigate("/pengguna/tambah-pengguna")}
          />
        </div>
      </div>

      <TableCustom
        columns={columns}
        data={usersList?.data}
        loading={userListPending}
        rowKey={"name"}
        scroll={{ x: "max-content" }}
        totalData={usersList?.meta?.total}
        current={pagination.current}
        pageSize={pagination.pageSize}
        handlePageChange={handlePageChange}
      />
    </Layout>
  );
};

export default UserManagementPage;
