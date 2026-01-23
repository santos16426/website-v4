"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Image as ImageType } from "../../utils/interface";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectGalleryProps {
  images: ImageType[];
  projectName: string;
}

export function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const openImage = (index: number) => {
    setSelectedImage(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const navigateImage = (newDirection: "prev" | "next") => {
    if (selectedImage === null) return;

    setDirection(newDirection === "next" ? 1 : -1);

    if (newDirection === "prev") {
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1);
    } else {
      setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <>
      <div className="flex flex-row gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {images.map((img, index) => (
          <motion.button
            key={index}
            onClick={() => openImage(index)}
            className="group relative shrink-0 w-full md:w-[500px] h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-white/10 hover:border-emerald-400/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            aria-label={img.description || `View ${projectName} image ${index + 1} in full screen`}
          >
            <Image
              src={img.url}
              alt={img.description || `${projectName} - Image ${index + 1}`}
              fill
              className="object-cover"
            />
            {img.description && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-white text-sm md:text-base p-6 w-full leading-relaxed">
                  {img.description}
                </p>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Full Screen Image Viewer */}
      <AnimatePresence mode="wait" custom={direction}>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative max-w-7xl w-full h-full flex flex-col">
              {/* Close Button */}
              <motion.button
                onClick={closeImage}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close image viewer"
              >
                <X className="size-5 text-white" aria-hidden="true" />
              </motion.button>

              {/* Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage("prev");
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors duration-300 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-6" aria-hidden="true" />
                  </motion.button>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage("next");
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors duration-300 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-6" aria-hidden="true" />
                  </motion.button>
                </>
              )}

              {/* Image with Slide Animation */}
              <div
                className="flex-1 flex items-center justify-center relative"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={selectedImage}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className="relative w-full h-full max-h-[80vh]"
                  >
                    <Image
                      src={images[selectedImage].url}
                      alt={images[selectedImage].description || `${projectName} - Image ${selectedImage + 1}`}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Description */}
              <AnimatePresence mode="wait">
                {images[selectedImage].description && (
                  <motion.div
                    key={`desc-${selectedImage}`}
                    className="mt-4 p-4 bg-white/5 border-t border-white/10"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-white text-center text-base leading-relaxed">
                      {images[selectedImage].description}
                    </p>
                    <p className="text-foreground/50 text-center text-sm mt-2">
                      {selectedImage + 1} of {images.length}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
