import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { locations, friendsGallery } from "@/data/locations";

type AspectPattern = {
  className: string;
  weight: number;
};

type LocationCard = {
  slug: string;
  city: string;
  country: string;
  imageSrc?: string;
  aspectClass: string;
};

type CardOrientation = "horizontal" | "vertical";

// Per request: horizontal -> 3:4, vertical -> 4:3.
const orientationToAspect: Record<CardOrientation, AspectPattern> = {
  horizontal: { className: "aspect-[3/4]", weight: 1.33 },
  vertical: { className: "aspect-[4/3]", weight: 0.75 },
};

const orientationOverrides: Record<string, CardOrientation> = {
  berlin: "horizontal",
  dublin: "horizontal",
  "nha-trang": "vertical",
  stockholm: "vertical",
  "big-sur": "horizontal",
  "san-francisco": "horizontal",
  "santa-monica": "horizontal",
};

const countryOrientationOverrides: Record<string, CardOrientation> = {
  Germany: "horizontal",
  Sweden: "vertical",
};

const toLocationCards = (): LocationCard[] => {
  return [...locations]
    .sort((a, b) => {
      const countryCmp = a.country.localeCompare(b.country, "en", { sensitivity: "base" });
      if (countryCmp !== 0) return countryCmp;
      return a.city.localeCompare(b.city, "en", { sensitivity: "base" });
    })
    .map((location, i) => {
    const countryOrientation = countryOrientationOverrides[location.country];
    const orientation =
      orientationOverrides[location.slug] ??
      countryOrientation ??
      (location.images[0]?.src ? "horizontal" : i % 2 === 0 ? "horizontal" : "vertical");
    const pattern = orientationToAspect[orientation];
    return {
      slug: location.slug,
      city: location.city,
      country: location.country,
      imageSrc: location.images[0]?.src,
      aspectClass: pattern.className,
    };
    });
};

// Column-major split so each column reads top-to-bottom in sorted order.
const buildOrderedColumns = (cards: LocationCard[], columnCount: number): LocationCard[][] => {
  const columns: LocationCard[][] = Array.from({ length: columnCount }, () => []);
  const baseSize = Math.floor(cards.length / columnCount);
  const remainder = cards.length % columnCount;

  let cursor = 0;
  for (let i = 0; i < columnCount; i++) {
    const thisColumnSize = baseSize + (i < remainder ? 1 : 0);
    columns[i] = cards.slice(cursor, cursor + thisColumnSize);
    cursor += thisColumnSize;
  }

  return columns;
};

const Index = () => {
  const cards = toLocationCards();
  const orderedColumns = buildOrderedColumns(cards, 4);

  const renderCard = (card: LocationCard, animationIndex: number) => (
    <motion.div
      key={card.slug}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationIndex * 0.08, duration: 0.5, ease: "easeOut" }}
      className="break-inside-avoid"
    >
      <Link to={`/gallery/${card.slug}`} className="group block relative overflow-hidden">
        <div
          className={`photo-placeholder ${card.aspectClass} group-hover:scale-[1.03] transition-transform duration-700`}
        >
          {card.imageSrc ? (
            <img src={card.imageSrc} alt={card.city} className="w-full h-full object-cover" />
          ) : (
            <span className="mono-caption text-xs">Photo</span>
          )}
        </div>
        <div className="city-label mt-2 mb-1">
          {card.city}, {card.country}
        </div>
      </Link>
    </motion.div>
  );

  return (
    <Layout>
      <div className="p-4 md:p-8 lg:p-12">
        {/* Mobile/tablet feed */}
        <div className="xl:hidden columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {cards.map((card, i) => renderCard(card, i))}
        </div>

        {/* Desktop: 4 balanced columns */}
        <div className="hidden xl:grid xl:grid-cols-4 gap-4">
          {orderedColumns.map((column, colIndex) => (
            <div key={colIndex} className="space-y-4">
              {column.map((card, rowIndex) => renderCard(card, colIndex + rowIndex))}
            </div>
          ))}
        </div>

        {/* An Ode to My Friends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 pt-12 border-t border-border"
        >
          <Link to="/gallery/ode-to-my-friends" className="group">
            <h2 className="font-mono text-lg mb-2 group-hover:text-muted-foreground transition-colors">
              {friendsGallery.title}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              To creating endless memories.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {friendsGallery.images.map((img, i) => (
                <div
                  key={i}
                  className="photo-placeholder aspect-square group-hover:scale-[1.02] transition-transform duration-500"
                >
                  {img.src ? (
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  ) : (
                    <span className="mono-caption text-[9px]">Photo</span>
                  )}
                </div>
              ))}
            </div>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Index;
