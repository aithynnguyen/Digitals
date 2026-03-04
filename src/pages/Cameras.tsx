import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";

interface Camera {
  name: string;
  category: string;
  description: string;
  images: { src: string; alt: string }[];
}

const withPagesBase = (src: string): string => {
  if (src.startsWith("/images/")) {
    return `${import.meta.env.BASE_URL}${src.slice(1)}`;
  }

  return src;
};

const cameras: Camera[] = [
  {
    name: "Sony Cyber-Shot DSC-T99",
    category: "Digital",
    description: "My first real camera - restored and gifted by my parents. A sleek ultra-compact camera that reflects the stylish design era of the late-2000s point-and-shoot photography.",
    images: [
      { src: "/images/cameras/cam1-front.png", alt: "Sony T99 — Front" },
      { src: "/images/cameras/cam1-back.png", alt: "Sony T99 — Back" },
      { src: "/images/cameras/cam1-inside.png", alt: "Sony T99 — Inside" },
    ],
  },
  {
    name: "Disposable Film",
    category: "Film",
    description: "The charm of single-use film cameras — Fujifilm Quicksnap, Ilford Ilfocolor Rapid, and Kodak Fun Saver. Each roll tells its own story.",
    images: [
      { src: "/images/cameras/cam3-fujifilm.png", alt: "Fujifilm Quicksnap" },
      { src: "/images/cameras/cam3-ilford.png", alt: "Ilford Ilfocolor Rapid" },
      { src: "/images/cameras/cam3-kodak.png", alt: "Kodak Fun Saver" },
    ],
  },
  {
    name: "Panasonic Lumix DMC-LZ7",
    category: "Digital",
    description: "Another gem restored and gifted by my parents — a compact digital camera released in the mid-2000s, built for simplicity, reliability, and everyday photography.",
    images: [
      { src: "/images/cameras/cam2-front.png", alt: "Lumix — Front" },
      { src: "/images/cameras/cam2-back.png", alt: "Lumix — Back" },
      { src: "/images/cameras/cam2-detail.png", alt: "Lumix — Detail" },
    ],
  },
];

const Cameras = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<{ src: string; alt: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (camera: Camera, imageIndex: number) => {
    setLightboxImages(
      camera.images.map((image) => ({
        ...image,
        src: withPagesBase(image.src),
      })),
    );
    setLightboxIndex(imageIndex);
    setLightboxOpen(true);
  };

  return (
    <Layout>
      <div className="p-6 md:p-10 lg:p-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="section-heading mb-3">Cameras</h1>
          <p className="text-muted-foreground text-base md:text-lg mb-16 max-w-lg">
            The tools behind the memories — restored vintage cameras and beloved disposables.
          </p>
        </motion.div>

        <div className="space-y-24">
          {cameras.map((camera, i) => (
            <motion.div
              key={camera.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14"
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <span className="mono-caption text-muted-foreground text-[10px]">{camera.category}</span>
                <h2 className="font-mono text-xl md:text-2xl mt-2 mb-4">{camera.name}</h2>
                <p className="text-muted-foreground leading-relaxed">{camera.description}</p>
              </div>
              <div className={`flex items-center justify-center gap-2 md:gap-4 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                {camera.images.map((img, j) => (
                  <div
                    key={j}
                    className="w-40 h-28 md:w-48 md:h-32 cursor-pointer transition-transform duration-300 hover:scale-[1.02] flex items-center justify-center"
                    onClick={() => openLightbox(camera, j)}
                  >
                    {img.src ? (
                      <img src={withPagesBase(img.src)} alt={img.alt} className="w-full h-full object-contain" />
                    ) : (
                      <span className="mono-caption text-[9px]">{img.alt}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </Layout>
  );
};

export default Cameras;

