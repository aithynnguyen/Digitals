import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import { getLocationBySlug, friendsGallery } from "@/data/locations";

const LazyImage = ({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="overflow-hidden hover:scale-[1.02] transition-transform duration-500 cursor-pointer"
      onClick={onClick}
    >
      {inView ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-cover"
        />
      ) : (
        <div className="w-full aspect-[4/3]" />
      )}
    </div>
  );
};

const GalleryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const isFriends = slug === "ode-to-my-friends";
  const location = isFriends ? null : getLocationBySlug(slug || "");

  const galleryTitle = isFriends ? friendsGallery.title : location?.city;
  const gallerySubtitle = isFriends ? "To creating endless memories" : location?.country;
  const galleryImages = isFriends ? friendsGallery.images : location?.images;

  if (!galleryImages) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="section-heading mb-4">Location not found</h1>
            <Link to="/" className="mono-caption text-muted-foreground hover:text-foreground transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <Layout>
      <div className="p-6 md:p-10 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 mono-caption text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back
          </Link>

          <h1 className="section-heading mb-2">{galleryTitle}</h1>
          <p className="mono-caption text-muted-foreground">{gallerySubtitle}</p>
        </motion.div>

        <div className="mt-12 columns-1 sm:columns-2 gap-4 max-w-4xl mx-auto space-y-4">
          {galleryImages.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.4 }}
              className="break-inside-avoid"
            >
              {image.src ? (
                <LazyImage src={image.src} alt={image.alt} onClick={() => openLightbox(i)} />
              ) : (
                <div className="photo-placeholder aspect-[4/3]">
                  <span className="mono-caption text-xs">{image.alt}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        images={galleryImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </Layout>
  );
};

export default GalleryPage;
