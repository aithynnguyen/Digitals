import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import { getLocationBySlug, friendsGallery, type GalleryImage } from "@/data/locations";
import { imageDimensionsBySrc } from "@/data/image-dimensions.generated";

const INITIAL_BATCH_SIZE = 10;
const BATCH_SIZE = 8;

const getImageAspectRatio = (image: GalleryImage) => {
  if (image.width && image.height) return image.width / image.height;
  if (!image.src) return 4 / 3;
  const localPath = image.src.replace(/^\/Digitals\//, "/");
  const dimensions = imageDimensionsBySrc[localPath];
  if (!dimensions) return 4 / 3;
  return dimensions.width / dimensions.height;
};

const LazyImage = ({
  image,
  eager,
  onClick,
}: {
  image: GalleryImage;
  eager: boolean;
  onClick: () => void;
}) => {
  const [inView, setInView] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(() => getImageAspectRatio(image));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (eager) {
      setInView(true);
      return;
    }
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
      className="overflow-hidden hover:scale-[1.01] transition-transform duration-500 cursor-pointer"
      onClick={onClick}
      style={{ aspectRatio: `${aspectRatio}` }}
    >
      {inView ? (
        <div className="w-full h-full">
          <img
            src={image.src}
            alt={image.alt}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
            decoding="async"
            onLoad={(event) => {
              const { naturalWidth, naturalHeight } = event.currentTarget;
              if (!naturalWidth || !naturalHeight) return;
              setAspectRatio(naturalWidth / naturalHeight);
            }}
            className="w-full h-full object-cover object-center"
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
  const useMasonryColumns = slug === "san-francisco";

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

  const splitIndex = Math.ceil(galleryImages.length / 2);
  const rightColumnTotal = galleryImages.length - splitIndex;
  const leftColumnVisibleCount = Math.min(splitIndex, Math.ceil(visibleCount / 2));
  const rightColumnVisibleCount = Math.min(rightColumnTotal, Math.floor(visibleCount / 2));
  const leftColumn = galleryImages
    .slice(0, leftColumnVisibleCount)
    .map((image, index) => ({ image, index }));
  const rightColumn = galleryImages
    .slice(splitIndex, splitIndex + rightColumnVisibleCount)
    .map((image, index) => ({ image, index: index + splitIndex }));
  const visibleImages = galleryImages.slice(0, visibleCount);

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

        {useMasonryColumns ? (
          <div className="mt-12 max-w-4xl mx-auto columns-1 sm:columns-2 gap-4 space-y-4">
            {visibleImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 0.4 }}
                className="mb-4 break-inside-avoid"
              >
                {image.src ? (
                  <LazyImage
                    image={image}
                    eager={index < 4}
                    onClick={() => openLightbox(index)}
                  />
                ) : (
                  <div className="photo-placeholder aspect-[4/3]">
                    <span className="mono-caption text-xs">{image.alt}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            {[leftColumn, rightColumn].map((column, columnIndex) => (
              <div key={columnIndex} className="space-y-4">
                {column.map(({ image, index }, imageIndex) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "100px" }}
                    transition={{ duration: 0.4 }}
                  >
                    {image.src ? (
                      <LazyImage
                        image={image}
                        eager={imageIndex < 2}
                        onClick={() => openLightbox(index)}
                      />
                    ) : (
                      <div className="photo-placeholder aspect-[4/3]">
                        <span className="mono-caption text-xs">{image.alt}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        )}
        {visibleCount < galleryImages.length ? <div ref={loadMoreRef} className="h-8 w-full" /> : null}
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
