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
  weight: number;
};

// Deliberate mix of vertical + horizontal cards for a more organic feed.
const aspectPatterns: AspectPattern[] = [
  { className: "aspect-[4/5]", weight: 1.25 },
  { className: "aspect-[4/3]", weight: 0.75 },
  { className: "aspect-[3/4]", weight: 1.33 },
  { className: "aspect-[5/4]", weight: 0.8 },
  { className: "aspect-[1/1]", weight: 1.0 },
  { className: "aspect-[4/5]", weight: 1.25 },
  { className: "aspect-[4/3]", weight: 0.75 },
  { className: "aspect-[3/4]", weight: 1.33 },
];

const toLocationCards = (): LocationCard[] => {
  return locations.map((location, i) => {
    const pattern = aspectPatterns[(i * 3 + location.slug.length) % aspectPatterns.length];
    return {
      slug: location.slug,
      city: location.city,
      country: location.country,
      imageSrc: location.images[0]?.src,
      aspectClass: pattern.className,
      weight: pattern.weight,
    };
  });
};

// Greedy column balancing by estimated card height.
const buildBalancedColumns = (cards: LocationCard[], columnCount: number): LocationCard[][] => {
  const columns: LocationCard[][] = Array.from({ length: columnCount }, () => []);
  const columnWeights = Array.from({ length: columnCount }, () => 0);

  cards.forEach((card) => {
    let lightestColumnIndex = 0;
    for (let i = 1; i < columnCount; i++) {
      if (columnWeights[i] < columnWeights[lightestColumnIndex]) {
        lightestColumnIndex = i;
      }
    }
    columns[lightestColumnIndex].push(card);
    columnWeights[lightestColumnIndex] += card.weight;
  });

  return columns;
};

const Index = () => {
  const cards = toLocationCards();
  const balancedColumns = buildBalancedColumns(cards, 4);

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
          {balancedColumns.map((column, colIndex) => (
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
