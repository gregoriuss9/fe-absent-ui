/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mainService } from "../../../services/main.service";

type ModalClockInProps = {
  isShowModal: boolean;
  setIsShowModal: (value: boolean) => void;
};

const ModalClockIn = ({ isShowModal, setIsShowModal }: ModalClockInProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { mutate: clockInMutation, isPending: clockInLoading } = useMutation({
    mutationFn: (payload: FormData) => mainService.checkIn(payload),
    onSuccess: () => {
      setIsShowModal(false);
      queryClient.invalidateQueries({ queryKey: ["ownPresences"] });
      queryClient.invalidateQueries({ queryKey: ["isPresenceToday"] });
      setImage(null);
    },
    onError: (error: any) => {
      console.error("Error on clock in", error.response.data);
      alert(error.response.data.message || "Clock in failed");
    },
  });

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleGalleryClick = () => {
    galleryInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string); // base64 string
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleSubmit = () => {
    if (!imageFile) {
      alert("Foto belum diunggah!");
      return;
    }
    const formData = new FormData();
    formData.append("photo", imageFile!);
    clockInMutation(formData);
  };

  return (
    <Modal
      title="Absen Masuk"
      open={isShowModal}
      onOk={handleSubmit}
      okButtonProps={{ loading: clockInLoading }}
      onCancel={() => {
        setIsShowModal(false);
        setImage(null);
      }}
    >
      <div className="grid grid-cols-1 gap-2 md:h-[100px]">
        <div
          className="w-80 p-3 flex md:hidden justify-center items-center text-bold text-white bg-indigo-300 rounded-lg mx-auto"
          onClick={handleCameraClick}
        >
          <p>Gunakan Kamera</p>
        </div>
        <div
          className="w-80 p-3 flex justify-center items-center text-bold text-white bg-blue-300 rounded-lg mx-auto"
          onClick={handleGalleryClick}
        >
          <p>Pilih dari Galeri</p>
        </div>
      </div>
      {image && (
        <img
          src={image}
          alt="preview"
          className="mt-2 w-full max-w-xs rounded shadow mx-auto"
        />
      )}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </Modal>
  );
};

export default ModalClockIn;
