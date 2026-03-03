import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { locations, friendsGallery } from "@/data/locations";

// Masonry-style aspect ratios for visual variety
const aspectClasses = [
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[1/1]",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[4/5]",
];

const Index = () => {
  return (
    <Layout>
      <div className="p-4 md:p-8 lg:p-12">
        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {locations.map((location, i) => (
            <motion.div
              key={location.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              className="break-inside-avoid"
            >
              <Link
                to={`/gallery/${location.slug}`}
                className="group block relative overflow-hidden"
              >
                <div
                  className={`photo-placeholder ${aspectClasses[i % aspectClasses.length]} group-hover:scale-[1.03] transition-transform duration-700`}
                >
                  {location.images[0]?.src ? (
                    <img
                      src={location.images[0].src}
                      alt={location.city}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="mono-caption text-xs">Photo</span>
                  )}
                </div>
                <div className="city-label mt-2 mb-1">
                  {location.city}, {location.country}
                </div>
              </Link>
            </motion.div>
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
