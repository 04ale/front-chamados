import React, { useState } from 'react';

function SeeMore({ children, chunkSize = 256 }) {
  const [visibleChunks, setVisibleChunks] = useState(1);

  if (typeof children !== 'string' || children.length <= chunkSize) {
    return <p className="text-lg break-words" style={{ color: "#5A2C40" }}>{children}</p>;
  }

  const currentLength = visibleChunks * chunkSize;
  
  const isShowingAll = currentLength >= children.length;

  const textToShow = isShowingAll ? children : `${children.slice(0, currentLength)}...`;

  const handleSeeMore = () => {
    setVisibleChunks(prevChunks => prevChunks + 1);
  };

  const handleSeeLess = () => {
    setVisibleChunks(1);
  };

  return (
    <div className="flex flex-col gap-1 items-start">
      <p className="text-lg break-words" style={{ color: "#5A2C40" }}>
        {textToShow}
      </p>
      
      <div className="flex gap-4">
        {!isShowingAll && (
          <button 
            onClick={handleSeeMore} 
            className="text-sm font-semibold cursor-pointer text-blue-600 hover:underline"
          >
            Ver mais
          </button>
        )}

        {visibleChunks > 1 && (
           <button 
            onClick={handleSeeLess} 
            className="text-sm font-semibold cursor-pointer text-gray-500 hover:underline"
          >
            Ver menos
          </button>
        )}
      </div>
    </div>
  );
}

export default SeeMore;