import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Layout from "@/components/Layout";

const Contact = () => {
  return (
    <Layout>
      <div className="p-6 md:p-10 lg:p-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="section-heading mb-6">Contact</h1>
          <p className="text-muted-foreground text-base md:text-lg mb-12 leading-relaxed">
            Feel free to shoot me a message — whether it's about photography, project ideas, or just to say hi. I'm always happy to connect and collaborate!
          </p>

          <a
            href="mailto:aithy.nguyen@uwaterloo.ca"
            className="inline-flex items-center gap-3 font-mono text-sm border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-all duration-400"
          >
            <Mail size={15} />
            aithy.nguyen@uwaterloo.ca
          </a>

          <div className="mt-16 pt-8 border-t border-border space-y-3">
            <a
              href="https://www.instagram.com/aithynnguyen.cam/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mono-caption text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram <ArrowRight size={12} />
            </a>
            <a
              href="https://www.linkedin.com/in/aithy-nguyen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mono-caption text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn <ArrowRight size={12} />
            </a>
            <a
              href="https://github.com/aithynnguyen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mono-caption text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub <ArrowRight size={12} />
            </a>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Contact;
