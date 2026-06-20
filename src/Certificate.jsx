import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { toPng } from "html-to-image";

export default function Certificate() {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name");
  const download = searchParams.get("download");

  const certificateRef = useRef(null);

 const downloadCertificate = async () => {
  const dataUrl = await toPng(certificateRef.current);

  const link = document.createElement("a");
  link.download = `${name}-Certificate.png`;
  link.href = dataUrl;
  link.click();
};


  return (
    <div className="flex justify-center p-10">
      <div
        ref={certificateRef}
        className="relative w-[1100px]"
      >
    <img
  src="/certificate.jpeg"
  alt="Certificate"
  className="w-full"
  onLoad={() => {
    if (download === "true") {
      setTimeout(downloadCertificate, 300);
    }
  }}
/>

        <h1
          className="absolute left-1/2 -translate-x-1/2 text-4xl font-bold text-green-800"
          style={{ top: "340px" }}
        >
          {name}
        </h1>
      </div>
    </div>
  );
}