import type React from 'react';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Check, Move, Pencil, X } from 'lucide-react';
import NoiseFilter from '../components/noiseFilter';
import { useDispatch, useSelector } from 'react-redux';
import { addSignature, fetchSignatures } from '../services/guestBookSlice';
import { RootState } from '../store';

// Types
type Signature = {
  id: string;
  path: string;
  x: number;
  y: number;
  date: string;
  color: string;
};

function GuestBook() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [isDrawMode, setIsDrawMode] = useState(false);
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [randomShapes, setRandomShapes] = useState<string[]>([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [drawPosition, setDrawPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const colors = ['#00FF88', '#FFD700', '#9400D3', '#FF4500'];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false); // New state to track if a line has been drawn

  const canvasRef = useRef<HTMLDivElement>(null);
  const signatureCanvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const dispatch = useDispatch();
  const signaturesRedux = useSelector(
    (state: RootState) => state.guestBook.signatures
  );

  // Mock shapes similar to the original file
  const shapes = [
    '/placeholder.svg?height=100&width=100',
    '/placeholder.svg?height=100&width=100',
    '/placeholder.svg?height=100&width=100',
    '/placeholder.svg?height=100&width=100',
  ];

  useEffect(() => {
    // Generate random shapes once on mount
    setRandomShapes(
      Array.from(
        { length: 4 },
        () => shapes[Math.floor(Math.random() * shapes.length)]
      )
    );

    // Add some initial signatures
    setSignatures([
      {
        id: '1',
        path: 'M20,30 L30,50 L40,30 L50,50 L60,30 L70,50 L80,30',
        x: 100,
        y: 200,
        date: '4/5/2025',
        color: '#292524',
      },
      {
        id: '2',
        path: 'M20,20 C40,0 60,40 80,20 S100,0 120,20',
        x: 300,
        y: 150,
        date: '4/6/2025',
        color: '#292524',
      },
      {
        id: '3',
        path: 'M10,30 Q30,0 50,30 T90,30',
        x: 500,
        y: 300,
        date: '4/7/2025',
        color: '#292524',
      },
    ]);

    dispatch(fetchSignatures());
  }, [dispatch]);

  useEffect(() => {
    if (!isDrawMode) return;

    const canvas = signatureCanvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions
    canvas.width = 300;
    canvas.height = 150;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = '#292524'; // stone-900
    context.lineWidth = 3;
    contextRef.current = context;
  }, [isDrawMode]);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      // Zoom
      e.preventDefault();
      const newScale = Math.min(Math.max(0.5, scale - e.deltaY * 0.001), 3);
      setScale(newScale);

      // Juster positionen, så indholdet forbliver i boksen
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const newX = Math.min(
          Math.max(position.x, rect.width * (1 - newScale)),
          0
        );
        const newY = Math.min(
          Math.max(position.y, rect.height * (1 - newScale)),
          0
        );
        setPosition({ x: newX, y: newY });
      }
    } else {
      // Pan
      setPosition({
        x: position.x - e.deltaX,
        y: position.y - e.deltaY,
      });
    }
  };

  const startPan = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDrawMode) return;

    setIsPanning(true);
    setIsDragging(false);

    if ('touches' in e) {
      setStartPos({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    } else {
      setStartPos({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const pan = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isPanning || isDrawMode) return;

    setIsDragging(true);

    if ('touches' in e) {
      setPosition({
        x: e.touches[0].clientX - startPos.x,
        y: e.touches[0].clientY - startPos.y,
      });
    } else {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      });
    }
  };

  const endPan = () => {
    setIsPanning(false);
    setIsDragging(false);
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (hasDrawn) return; // Disable drawing if a line has already been drawn
    setIsDrawing((prev) => !prev); // Toggle isDrawing state
    if (!isDrawing) {
      const { offsetX, offsetY } = getCoordinates(e);
      contextRef.current?.beginPath();
      contextRef.current?.moveTo(offsetX, offsetY);
      setCurrentPath([`M${offsetX},${offsetY}`]);
    }
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing || hasDrawn) return; // Disable drawing if a line has already been drawn
    const { offsetX, offsetY } = getCoordinates(e);
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
    setCurrentPath([...currentPath, `L${offsetX},${offsetY}`]);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (currentPath.length > 1) {
      setHasDrawn(true); // Set hasDrawn to true if a line has been drawn
    }
  };

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return { offsetX: 0, offsetY: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      return {
        offsetX: (e.touches[0].clientX - rect.left) * scaleX,
        offsetY: (e.touches[0].clientY - rect.top) * scaleY,
      };
    } else {
      return {
        offsetX: e.nativeEvent.offsetX * scaleX,
        offsetY: e.nativeEvent.offsetY * scaleY,
      };
    }
  };

  const clearCanvas = () => {
    const canvas = signatureCanvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    setCurrentPath([]);
    setHasDrawn(false); // Reset hasDrawn when canvas is cleared
  };

  const saveSignature = () => {
    if (currentPath.length === 0) return;

    const newSignature: Signature = {
      id: Date.now().toString(),
      path: currentPath.join(' '),
      x: drawPosition.x,
      y: drawPosition.y,
      date: new Date().toLocaleDateString(),
      color: selectedColor,
    };

    dispatch(addSignature(newSignature));
    clearCanvas();
    setIsDrawMode(false);
  };

  const cancelDrawing = () => {
    clearCanvas();
    setIsDrawMode(false);
  };

  const startNewSignature = (e: React.MouseEvent) => {
    if (isDrawMode || isDragging) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left - position.x) / scale;
    const y = (e.clientY - rect.top - position.y) / scale;

    setDrawPosition({ x, y });
    setIsDrawMode(true);
  };

  return (
    <div className="flex min-h-screen bg-stone-100 text-stone-900 selection:bg-amber-200 selection:text-stone-900 overflow-hidden">
      {/* Noise Filter Overlay */}
      <NoiseFilter />

      {/* Main Content Area */}
      <main className="flex flex-col w-full h-screen relative">
        {/* Background grain pattern */}
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grain-pattern.svg')] bg-repeat opacity-30"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="p-6 text-center">
            <h1 className="text-4xl font-bold grainy-text">Guest Book</h1>
            <p className="text-stone-600 mt-2">
              Click anywhere on the canvas to sign
            </p>
          </div>

          {/* Canvas Container */}
          <div
            className="flex-1 overflow-hidden relative"
            onWheel={handleWheel}
            onMouseDown={startPan}
            onMouseMove={pan}
            onMouseUp={endPan}
            onMouseLeave={endPan}
            onTouchStart={startPan}
            onTouchMove={pan}
            onTouchEnd={endPan}
          >
            <div
              ref={canvasRef}
              className="absolute w-[3000px] h-[2000px] bg-stone-50 border border-stone-200 shadow-inner"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: '0 0',
                cursor: isPanning
                  ? 'grabbing'
                  : isDrawMode
                  ? 'default'
                  : 'grab',
                overflow: 'visible',
              }}
              onClick={startNewSignature}
            >
              {/* Existing Signatures */}
              {signaturesRedux.map((sig) => (
                <div
                  key={sig.id}
                  className="absolute"
                  style={{ left: `${sig.x}px`, top: `${sig.y}px` }}
                >
                  <svg
                    width="200"
                    height="100"
                    viewBox="0 0 300 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d={sig.path}
                      fill="none"
                      stroke={sig.color}
                      strokeWidth="2"
                    />
                  </svg>
                  <div className="text-xs text-stone-500 text-right mt-0">
                    {sig.date}
                  </div>
                </div>
              ))}

              {/* Grid Pattern */}
              <svg
                width="100%"
                height="100%"
                className="absolute top-0 left-0 opacity-10 pointer-events-none"
              >
                <pattern
                  id="grid"
                  width="50"
                  height="50"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 50 0 L 0 0 0 50"
                    fill="none"
                    stroke="#292524"
                    strokeWidth="0.5"
                  />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Rotating shapes */}
            {randomShapes.map((shape, index) => (
              <motion.div
                key={index}
                className={`absolute ${
                  index === 0
                    ? 'bottom-20 left-20 w-28 h-28'
                    : index === 1
                    ? 'top-40 right-20 w-20 h-20'
                    : index === 2
                    ? 'top-20 left-1/4 w-24 h-24'
                    : 'bottom-40 right-1/4 w-16 h-16'
                } z-10 pointer-events-none`}
                animate={{ rotate: index % 2 === 0 ? -360 : 360 }}
                transition={{
                  duration:
                    index === 0 ? 9 : index === 1 ? 7 : index === 2 ? 11 : 9,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    mask: `url(${shape}) center/contain no-repeat`,
                    WebkitMask: `url(${shape}) center/contain no-repeat`,
                    backgroundColor:
                      index === 0
                        ? selectedColor
                        : ['#A5FFD6', '#FFD700', '#9370DB', '#FFA07A'][index],
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Floating Controls */}
          {!isDrawMode && (
            <div className="fixed bottom-6 right-6 flex gap-2">
              <motion.button
                className="p-4 bg-stone-900 text-white rounded-full shadow-lg flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Pan mode"
              >
                <Move size={24} />
              </motion.button>
            </div>
          )}

          {/* Signature Drawing Modal */}
          {isDrawMode && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <motion.div
                className="bg-white rounded-lg shadow-xl p-6 w-[350px] max-w-[90vw]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Sign Here</h3>
                  <button
                    onClick={cancelDrawing}
                    className="text-stone-500 hover:text-stone-800"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Color Picker */}
                <div className="flex gap-2 mb-4">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`w-6 h-6 rounded-full border-2 ${
                        selectedColor === color
                          ? 'border-stone-900'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>

                <div className="border-2 border-stone-300 rounded-md mb-4 bg-white">
                  <canvas
                    ref={signatureCanvasRef}
                    onClick={startDrawing}
                    onMouseMove={draw}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    className="w-full h-[150px] touch-none"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={clearCanvas}
                    className="px-4 py-2 border border-stone-300 rounded-md hover:bg-stone-100 transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={saveSignature}
                    disabled={currentPath.length === 0}
                    className="px-4 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <Check size={18} />
                    <span>Submit</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Instructions */}
          <div className="fixed top-6 left-6 bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-stone-300 shadow-sm max-w-[250px]">
            <h3 className="font-bold text-sm mb-1">How to use:</h3>
            <ul className="text-xs text-stone-700 space-y-1">
              <li className="flex items-center gap-1">
                <Pencil size={12} /> Click anywhere to sign
              </li>
              <li className="flex items-center gap-1">
                <Move size={12} /> Drag to pan the canvas
              </li>
              <li>Use mouse wheel to scroll</li>
              <li>Ctrl + wheel to zoom in/out</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default GuestBook;
