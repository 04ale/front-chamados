import { useSearchParams } from "react-router-dom";

function PhotoDetail() {
  const [searchParams] = useSearchParams();
  const image = searchParams.get("url");

  if (!image) {
    return <div>Imagem não encontrada.</div>;
  }

  return (
    <div
      className="w-screen h-screen flex justify-center items-center z-50 bg-white"
    >
        <img src={image} className="w-full h-full object-contain" />
    </div>
  );
}

export default PhotoDetail;
