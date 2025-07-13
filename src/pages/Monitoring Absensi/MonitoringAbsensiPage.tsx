import Layout from "../../layout";
import { useQuery } from "@tanstack/react-query";
import { mainService } from "../../services/main.service";
import Card from "../../components/Card";
import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import TableCustom from "../../components/TableCustom";
import Button from "../../components/Button";
dayjs.extend(utc);
dayjs.extend(timezone);

interface AttendancesEmployeeToday {
  id: number;
  user_id: number;
  time_in: string | null;
  time_out: string | null;
  updated_at: string | null;
  created_at: string | null;
  photo_url: string;
  no_employee: string;
  name: string;
  department: string;
}

const MonitoringAbsensiPage = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const { data: allAttendances, isPending: allAttendancesPending } = useQuery({
    queryKey: ["allAttendances", pagination.current, pagination.pageSize],
    queryFn: () =>
      mainService.getAllAttendances(pagination.current, pagination.pageSize),
  });

  const { data: attendancesEmployeeToday } = useQuery({
    queryKey: ["attendancesEmployeeToday"],
    queryFn: mainService.getAttendancesToday,
  });

  const handlePageChange = (newPage: number, newPageSize: number) => {
    setPagination({
      current: newPage,
      pageSize: newPageSize,
    });
  };

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
      title: "Tanggal Masuk",
      dataIndex: "time_in",
      key: "date_in",
      render: (text: string) => (
        <p className="capitalize">{dayjs(text).format("D MMM YYYY ")}</p>
      ),
    },
    {
      title: "Jam Masuk",
      dataIndex: "time_in",
      key: "time_in",
      render: (text: string) => (
        <p className="capitalize">{dayjs(text).format("HH:mm:ss")}</p>
      ),
    },
    {
      title: "Tanggal Keluar",
      dataIndex: "time_out",
      key: "date_out",
      render: (text: string) => (
        <p className="capitalize">
          {text ? dayjs(text).format("D MMM YYYY ") : "-"}
        </p>
      ),
    },
    {
      title: "Jam Keluar",
      dataIndex: "time_out",
      key: "time_out",
      render: (text: string) => (
        <p className="capitalize">
          {text ? dayjs(text).format("HH:mm:ss") : "-"}
        </p>
      ),
    },
    {
      title: "Total Waktu",
      key: "total_time",
      render: (record: AttendancesEmployeeToday) => {
        const timeIn = dayjs(record.time_in);
        const timeOut = dayjs(record.time_out);
        const duration = timeOut.diff(timeIn, "seconds");
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = duration % 60;
        return (
          <p className="capitalize">
            {record.time_out ? `${hours}j ${minutes}m ${seconds}d` : "-"}
          </p>
        );
      },
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (record: AttendancesEmployeeToday) => (
        <Button
          label="Lihat Bukti"
          type="secondaryOutline"
          onClick={() => {
            window.open(`${record.photo_url}`, "_blank");
          }}
        />
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-gray-600">Monitoring Absensi</h1>
      <div className="my-3 grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card
          title="Jumlah Karyawan"
          desc={attendancesEmployeeToday?.data?.countOfEmployee}
        />
        <Card
          title="Jumlah Clock In Hari Ini"
          desc={attendancesEmployeeToday?.data?.countOfClockInToday}
        />
        <Card
          title="Jumlah Belum Clock In Hari Ini"
          desc={attendancesEmployeeToday?.data?.countOfNotYetClockInToday}
        />
        <Card
          title="Jumlah Clock Out Hari Ini"
          desc={attendancesEmployeeToday?.data?.countOfClockOutToday}
        />
        <Card
          title="Jumlah Belum Clock Out Hari Ini"
          desc={attendancesEmployeeToday?.data?.countOfNotYetClockOutToday}
        />
      </div>

      <div className="my-3 bg-white rounded-lg p-4">
        <p className="mb-2 text-2xl font-bold">Rekap Absensi</p>
        <TableCustom
          columns={columns}
          data={allAttendances?.data}
          loading={allAttendancesPending}
          rowKey="id"
          scroll={{ x: "auto" }}
          totalData={allAttendances?.meta?.total}
          current={pagination.current}
          pageSize={pagination.pageSize}
          handlePageChange={handlePageChange}
        />
      </div>
    </Layout>
  );
};

export default MonitoringAbsensiPage;
