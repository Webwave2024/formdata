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
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div
    ref={certificateRef}
    className="relative w-full max-w-[1100px] px-4"
  >
    <div className="flex justify-center">
    <img
      src="/certificate.jpeg"
      className="block w-full h-auto mx-auto"
      alt="Certificate"
       onLoad={() => {
    if (download === "true") {
      setTimeout(downloadCertificate, 300);
    }
  }}
    />
    </div>

    <h1
      className="
        absolute
        left-1/2
        -translate-x-1/2
        top-[43%]
        text-[16px]
        sm:text-[22px]
        md:text-[32px]
        lg:text-[42px]
        font-bold
        text-green-800
      "
    >
      {name}
    </h1>
  </div>
</div>
  );
}


