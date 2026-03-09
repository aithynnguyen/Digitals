import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import { getLocationBySlug, friendsGallery, type GalleryImage } from "@/data/locations";

const INITIAL_BATCH_SIZE = 10;
const BATCH_SIZE = 8;

const getAspectClass = (image: GalleryImage): string => {
  const w = image.width || 0;
  const h = image.height || 0;
  if (!w || !h) return "aspect-square";
  if (w > h * 1.05) return "aspect-[4/3]";
  if (h > w * 1.05) return "aspect-[3/4]";
  return "aspect-square";
};

const LazyImage = ({ image, index, onClick }: { image: GalleryImage; index: number; onClick: () => void }) => {
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const previewWidth = image.width ? Math.min(960, image.width) : 960;
  const srcSet =
    image.previewSrc && image.width
      ? `${image.previewSrc} ${previewWidth}w, ${image.src} ${image.width}w`
      : undefined;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "80px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${getAspectClass(image)} overflow-hidden hover:scale-[1.02] transition-transform duration-500 cursor-pointer`}
      onClick={onClick}
    >
      {inView ? (
        <div className="relative w-full h-full">
          {image.thumbSrc ? (
            <img
              src={image.thumbSrc}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 w-full h-full object-cover blur-sm scale-105 transition-opacity duration-300 ${loaded ? "opacity-0" : "opacity-45"}`}
            />
          ) : null}
          <img
            src={image.src}
            srcSet={srcSet}
            alt={image.alt}
            loading={index < 2 ? "eager" : "lazy"}
            fetchPriority={index < 2 ? "high" : "auto"}
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      ) : (
        <div className="w-full h-full bg-muted/40" />
      )}
    </div>
  );
};

const GalleryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH_SIZE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const isFriends = slug === "ode-to-my-friends";
  const location = isFriends ? null : getLocationBySlug(slug || "");

  const galleryTitle = isFriends ? friendsGallery.title : location?.city;
  const gallerySubtitle = isFriends ? "To creating endless memories" : location?.country;
  const galleryImages = isFriends ? friendsGallery.images : location?.images;

  useEffect(() => {
    setVisibleCount(INITIAL_BATCH_SIZE);
  }, [slug]);

  useEffect(() => {
    if (!galleryImages?.length) return;
    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, galleryImages.length));
      },
      { rootMargin: "600px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [galleryImages?.length]);

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
          {galleryImages.slice(0, visibleCount).map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.4 }}
              className="break-inside-avoid"
            >
              {image.src ? (
                <LazyImage image={image} index={i} onClick={() => openLightbox(i)} />
              ) : (
                <div className="photo-placeholder aspect-[4/3]">
                  <span className="mono-caption text-xs">{image.alt}</span>
                </div>
              )}
            </motion.div>
          ))}
          {visibleCount < galleryImages.length ? <div ref={loadMoreRef} className="h-8 w-full" /> : null}
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
