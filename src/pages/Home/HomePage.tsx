import Layout from "../../layout";
import { useAuthStore } from "../../store/authStore";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { mapDay, mapMonth } from "../../utils/common";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mainService } from "../../services/main.service";
import TableCustom from "../../components/TableCustom";
import AbsenceStatus from "./components/AbsenceStatus";
import ModalClockIn from "./components/ModalClockIn";
import Card from "../../components/Card";
dayjs.extend(utc);
dayjs.extend(timezone);

interface OwnPresences {
  id: number;
  photo_url: string;
  time_in: string;
  time_out: string | null;
  updated_at: string | null;
  created_at: string;
  user_id: number;
}

const HomePage = () => {
  const userProfile = useAuthStore((state) => state.userProfile);

  const [now, setNow] = useState(dayjs().tz("Asia/Jakarta"));
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [isShowModal, setIsShowModal] = useState(false);

  const queryClient = useQueryClient();

  const hari = mapDay(now.format("dddd"));
  const tanggal = now.format("DD");
  const bulan = mapMonth(now.format("MMMM"));
  const tahun = now.format("YYYY");
  const jam = now.format("HH:mm:ss");

  const { data: isPresenceToday } = useQuery({
    queryKey: ["isPresenceToday"],
    queryFn: () => mainService.isPresenceToday(),
  });

  const { data: ownPresences, isPending: ownPresencesPending } = useQuery({
    queryKey: ["ownPresences", pagination.current, pagination.pageSize],
    queryFn: () =>
      mainService.getOwnPresences(pagination.current, pagination.pageSize),
  });

  const { mutate: checkOutMutation, isPending: checkOutLoading } = useMutation({
    mutationFn: (id: string) => mainService.checkOut(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ownPresences"] });
      queryClient.invalidateQueries({ queryKey: ["isPresenceToday"] });
    },
    onError: (error) => {
      console.error("Error on clock out", error);
      alert("Clock out failed");
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs().tz("Asia/Jakarta"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckOut = () => {
    const id = isPresenceToday?.idAttendance.toString() || "";
    checkOutMutation(id);
  };

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
      render: (record: OwnPresences) => {
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
  ];

  return (
    <Layout>
      <h1 className="text-gray-600">Beranda</h1>
      <div className="my-3 grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card title="Nama" desc={userProfile?.name} />
        <Card title="No Karyawan" desc={userProfile?.employeeNo} />
        <Card
          title="Departemen"
          desc={userProfile?.department}
          descCapitalize
        />
      </div>

      <div className="my-3 bg-white rounded-lg p-4">
        <p className="text-2xl font-bold">Borang Absensi</p>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="flex flex-row md:flex-col gap-2">
            <p className="text-xl ">{hari},</p>
            <p className="text-xl md:text-2xl font-semibold">
              {tanggal} {bulan} {tahun}
            </p>
            <p className="text-xl md:text-2xl">{jam}</p>
          </div>
          <AbsenceStatus
            checker={isPresenceToday?.isSubmitClockIn}
            textPositive="Anda sudah absen masuk hari ini"
            textNegative="Anda belum absen masuk hari ini"
          />
          <AbsenceStatus
            checker={isPresenceToday?.isSubmitClockOut}
            textPositive="Anda sudah absen keluar hari ini"
            textNegative="Anda belum absen keluar hari ini"
          />
          <div className="grid grid-cols-1 gap-2">
            <Button
              label="Absen Masuk"
              width="w-full"
              type="primarySolid"
              onClick={() => setIsShowModal(true)}
            />
            <Button
              label="Absen Keluar"
              width="w-full"
              type="dangerOutline"
              onClick={handleCheckOut}
              loading={checkOutLoading}
            />
          </div>
        </div>
      </div>

      <ModalClockIn isShowModal={isShowModal} setIsShowModal={setIsShowModal} />

      <div className="my-3 bg-white rounded-lg p-4">
        <p className="mb-2 text-2xl font-bold">Riwayat Absensi</p>
        <TableCustom
          columns={columns}
          data={ownPresences?.data}
          loading={ownPresencesPending}
          rowKey="id"
          totalData={ownPresences?.meta?.total}
          current={pagination.current}
          pageSize={pagination.pageSize}
          handlePageChange={handlePageChange}
        />
      </div>
    </Layout>
  );
};

export default HomePage;
