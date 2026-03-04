import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import WorldMap from "@/components/WorldMap";
import { LocationData } from "@/data/locations";

const About = () => {
  const navigate = useNavigate();

  const handleLocationClick = (location: LocationData) => {
    navigate(`/gallery/${location.slug}`);
  };

  return (
    <Layout>
      <div className="p-6 md:p-10 lg:p-12 max-w-5xl mx-auto">
        {/* Bio section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 mb-20"
        >
          <div className="photo-placeholder aspect-[3/4]">
            <span className="mono-caption text-xs">Portrait</span>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-base md:text-lg leading-relaxed text-foreground mb-5">
              Hi! I'm Aithy Ngoc Nguyen, a Management Engineering student at the University of Waterloo.
              I travel with vintage digital cameras and disposable film, capturing the places I go and the people I meet.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-5">
              My parents restored their old digital cameras and gifted them to me, the same cameras that once captured
              my childhood memories.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-5">
              There's something special about shooting with an older camera that I really enjoy :)
            </p>
          </div>
        </motion.div>

        {/* World Map */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="font-mono text-lg mb-2">Places I've Been</h2>
          <p className="text-sm text-muted-foreground mb-6">Click a pin to explore photos from that location.</p>
          <WorldMap onLocationClick={handleLocationClick} />
        </motion.div>

        {/* CV Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading mb-12">CV</h2>

          <div className="cv-section-title">Education</div>
          <div className="space-y-3 mb-8">
            <div className="flex gap-6">
              <span className="cv-year">2022</span>
              <span className="cv-entry">BASc Management Engineering, University of Waterloo, ON, Canada</span>
            </div>
          </div>

          <div className="cv-section-title">Experience</div>
          <div className="space-y-3 mb-8">
            <div className="flex gap-6">
              <span className="cv-year">2026</span>
              <span className="cv-entry">Agile Developer Intern @ Randox</span>
            </div>
            <div className="flex gap-6">
              <span className="cv-year">2024</span>
              <span className="cv-entry">Project Management Intern @ Toronto Transit Commission</span>
            </div>
            <div className="flex gap-6">
              <span className="cv-year">2024</span>
              <span className="cv-entry">Project and Release Management Intern @ Blackberry QNX</span>
            </div>
            <div className="flex gap-6">
              <span className="cv-year">2023</span>
              <span className="cv-entry">Systems Management Intern @ Concord Adex</span>
            </div>
          </div>

          <div className="cv-section-title">Projects</div>
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-6">
              <span className="cv-year">2026</span>
              <div className="cv-entry">
                <div>PushPin</div>
                <div>AI social-to-map engine built with React, Node.js, Express, Mapbox API, Llama 3/Mistral and sentence-transformer embeddings</div>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <span className="cv-year">2025</span>
              <div className="cv-entry">
                <div>EcoCAR EV Challenge - Cadillac LYRIQ Systems Integration</div>
                <div>Led cabin wiring integration with Siemens NX CAD and ACDelco TDS for OEM-grade routing and cross-team execution</div>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <span className="cv-year">2025</span>
              <div className="cv-entry">
                <div>SkillSwap</div>
                <div>Full-stack peer-to-peer skill exchange platform built with React, JavaScript, Node.js, Express.js, SQL and Firebase Authentication</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 pt-10 border-t border-border"
        >
          <a
            href="mailto:aithy.nguyen@uwaterloo.ca"
            className="inline-flex items-center gap-3 mono-caption text-muted-foreground hover:text-foreground transition-colors"
          >
            Get in Touch
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </Layout>
  );
};

export default About;
