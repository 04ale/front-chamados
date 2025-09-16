import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function PhotoDetail() {
  const [searchParams] = useSearchParams();
  const image = searchParams.get("url");
  const [changeBg, setChangeBg] = useState(false);

  if (!image) {
    return <div>Imagem não encontrada.</div>;
  }

  return (
    <div
      className={`w-screen h-screen flex justify-center items-center ${
        changeBg ? "bg-[#FFFBF5]" : "bg-[#5A2C40]"
      } z-50`}
    >
        <button
          className={`${
            changeBg
              ? "bg-[#5A2C40] text-[#FFFBF5]"
              : "bg-[#FFFBF5] text-[#5A2C40]"
          } rounded-lg p-4 cursor-pointer absolute left-2 top-2 font-semibold max-lg:hidden`}
          onClick={() => setChangeBg(!changeBg)}
        >
          Trocar fundo
        </button>
        <img src={image} className="w-full h-full object-contain" />
    </div>
  );
}

export default PhotoDetail;
