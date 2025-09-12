import { X } from "lucide-react";

function PhotoDetail({onClose, image}) {


  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#FFFBF5] absolute z-50">
      <img src={image} className="h-[800px] " />
      <X
      onClick={onClose}
        className="absolute top-0 right-0 bg-[#FFFBF5] text-black rounded-lg mt-5 mr-5 font-bold cursor-pointer max-md:mt-17"
        size={40}
      />
    </div>
  );
}

export default PhotoDetail;
