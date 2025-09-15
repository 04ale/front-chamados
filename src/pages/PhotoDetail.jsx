import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function PhotoDetail() {
  const [searchParams] = useSearchParams();
  const image = searchParams.get('url');

  const [showMagnifier, setShowMagnifier] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [magnifier, setMagnifier] = useState(false)
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  const magnifierSize = 250;
  const zoom = 1.5;

  const handleMouseMove = (e) => {
    const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
    setImgSize({ width, height });

    const x = e.clientX - left;
    const y = e.clientY - top;
    setMousePosition({ x, y });
  };

  if (!image) {
    return <div>Imagem não encontrada.</div>;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#FFFBF5] absolute z-50 p-5">
      <div
        className="relative flex justify-center items-center w-full h-full"
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
        onMouseMove={handleMouseMove}
      >
        <button className="absolute left-1 top-1 rounded-lg p-4 font-semibold text-[#FFFBF5] bg-[#5A2C40] cursor-pointer max-lg:hidden" onClick={()=> setMagnifier(!magnifier)}>
          Ativar lupa
        </button>
        <img
          src={image}
          alt="Imagem em detalhe"
          className="w-full h-full object-contain"
        />

        {(showMagnifier && magnifier) && (
          <div
            style={{
              position: 'absolute',
              left: `${Math.min(Math.max(0, mousePosition.x - magnifierSize / 2), imgSize.width - magnifierSize)}px`,
              top: `${Math.min(Math.max(0, mousePosition.y - magnifierSize / 2), imgSize.height - magnifierSize)}px`,
              height: `${magnifierSize}px`,
              width: `${magnifierSize}px`,
              border: '2px solid white',
              borderRadius: '50%',
              boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
              backgroundImage: `url(${image})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: `-${mousePosition.x * zoom - magnifierSize / 2}px -${mousePosition.y * zoom - magnifierSize / 2}px`,
              backgroundSize: `${imgSize.width * zoom}px ${imgSize.height * zoom}px`,
              cursor: 'none',
              pointerEvents: 'none', 
            }}
          />
        )}
      </div>
    </div>
  );
}

export default PhotoDetail;