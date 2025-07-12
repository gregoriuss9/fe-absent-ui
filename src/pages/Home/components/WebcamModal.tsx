import { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import Button from "../../../components/Button";

type WebcamModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setImageFile: (image: File) => void;
  setImage: (image: string) => void;
};

const WebcamModal = ({
  isOpen,
  onClose,
  setImageFile,
  setImage,
}: WebcamModalProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let localStream: MediaStream | null = null;

    const startWebcam = async () => {
      if (!isOpen || !navigator.mediaDevices?.getUserMedia) return;

      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        localStream = mediaStream;

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          await videoRef.current.play();
        }
      } catch (err) {
        // if(err in)
        console.error("Webcam access error:", err);
        if (err instanceof DOMException && err.name === "NotAllowedError") {
          setErrorMessage(
            "Izin akses kamera ditolak. Silakan izinkan penggunaan kamera."
          );
        } else {
          setErrorMessage("Gagal mengakses kamera. Terjadi kesalahan.");
        }
      }
    };

    startWebcam();

    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
    };
  }, [isOpen]);

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    const base64Data = canvas.toDataURL("image/jpeg");
    // ✅ Convert base64 to File
    const byteString = atob(base64Data.split(",")[1]);
    const mimeType =
      base64Data.split(",")[0].match(/:(.*?);/)?.[1] || "image/jpeg";

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const file = new File([ab], `webcam-${Date.now()}.jpg`, { type: mimeType });

    setImage(base64Data);
    setImageFile(file);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      title="Gunakan Kamera"
    >
      <div className="flex flex-col items-center">
        {errorMessage ? (
          <div className="text-red-500 text-lg h-80 flex flex-col justify-center text-center">
            {errorMessage}
          </div>
        ) : (
          <video
            ref={videoRef}
            className="w-full max-w-full rounded"
            autoPlay
            muted
          />
        )}
        <div className="flex justify-end w-full mt-4 gap-2">
          <Button onClick={onClose} label="Batal" type="dangerOutline" />
          <Button
            label="Ambil Foto"
            type="primarySolid"
            onClick={handleCapture}
          />
        </div>
      </div>
    </Modal>
  );
};

export default WebcamModal;
