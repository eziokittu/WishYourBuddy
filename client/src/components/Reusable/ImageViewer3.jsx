import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ImageViewer3 = ({ data, isMobile }) => {
  return (
    <div className="mx-auto w-full sm:w-5/6">
      <div className="relative w-full h-full overflow-hidden">
        <ShuffleGrid data={data} isMobile={isMobile} />
      </div>
    </div>
  );
};

// shuffle method that shuffles all the images randomly BOTH vertically and horizontally
const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

// shuffle method that shuffles all the images randomly ONLY horizontally
// const shuffle = (array) => {
//   const totalImages = array.length;
//   const sqrtTotalImages = Math.ceil(Math.sqrt(totalImages));

//   const newArray = [...array];

//   for (let row = 0; row < sqrtTotalImages; row++) {
//     for (let col = 0; col < sqrtTotalImages; col++) {
//       const currentIdx = row * sqrtTotalImages + col;
//       if (currentIdx < totalImages) {
//         const randomRow = row;
//         const randomCol = Math.floor(Math.random() * sqrtTotalImages);
//         const randomIdx = randomRow * sqrtTotalImages + randomCol;

//         // Swap elements in the same row
//         [newArray[currentIdx], newArray[randomIdx]] = [
//           newArray[randomIdx],
//           newArray[currentIdx],
//         ];
//       }
//     }
//   }

//   return newArray;
// };

const generateSquares = (squareData) => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
    >
      <img
        src={sq.src}
        alt={`Square ${sq.id}`}
        className="w-full h-full object-contain bg-stone-900"
      />
    </motion.div>
  ));
};

const ShuffleGrid = ({ data, isMobile }) => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares(data));

  useEffect(() => {
    const shuffleSquares = () => {
      setSquares(generateSquares(data));
      timeoutRef.current = setTimeout(shuffleSquares, 3500);
    };

    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);

    // Add setSquares to the dependency array
  }, [data]);

  return (
    isMobile ? (
      <div className="grid grid-cols-3 grid-rows-3 gap-1 h-full">
        {squares.map((sq) => sq)}
      </div>
    ) : (
      <div className="grid grid-cols-4 grid-rows-4 gap-1 h-full">
        {squares.map((sq) => sq)}
      </div>
    )
  );
};

export default ImageViewer3;
