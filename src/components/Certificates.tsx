'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Download, X, ZoomIn } from 'lucide-react';
import { certificatesData, certificateCategories } from '@/data/certificates';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function Certificates() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredCertificates =
    selectedCategory === 'All'
      ? certificatesData
      : certificatesData.filter((cert) => cert.category === selectedCategory);

  const slides = filteredCertificates.map((cert) => ({
    src: `/certificates/${cert.filename}`,
    alt: cert.title,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const downloadAllCertificates = () => {
    filteredCertificates.forEach((cert) => {
      const link = document.createElement('a');
      link.href = `/certificates/${cert.filename}`;
      link.download = cert.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <section id="certificates" className="section-padding bg-dark-surface/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Certificates & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Professional certifications and achievements from hackathons, courses, and challenges.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {certificateCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`glass-button px-6 py-2 text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'border-accent-primary bg-accent-primary/20 text-accent-primary'
                  : 'text-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Download All Button */}
        <div className="mb-8 text-center">
          <button
            onClick={downloadAllCertificates}
            className="glass-button inline-flex items-center gap-2 px-6 py-3 font-semibold transition-colors hover:border-accent-secondary"
          >
            <Download className="h-5 w-5" />
            Download All Certificates
          </button>
        </div>

        {/* Certificates Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredCertificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="glass-card group relative cursor-pointer overflow-hidden p-4"
              onClick={() => openLightbox(index)}
            >
              {/* Certificate Image */}
              <div className="relative mb-3 aspect-video overflow-hidden rounded-lg bg-dark-border">
                <img
                  src={`/certificates/${cert.filename}`}
                  alt={cert.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <ZoomIn className="h-12 w-12 text-white" />
                </div>
              </div>

              {/* Certificate Info */}
              <h3 className="mb-1 font-semibold">{cert.title}</h3>
              {cert.description && (
                <p className="mb-2 text-sm text-gray-400">{cert.description}</p>
              )}

              {/* Category Badge */}
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs ${
                  cert.category === 'AI'
                    ? 'bg-accent-primary/10 text-accent-primary'
                    : cert.category === 'Cloud'
                      ? 'bg-accent-secondary/10 text-accent-secondary'
                      : cert.category === 'Hackathon'
                        ? 'bg-accent-tertiary/10 text-accent-tertiary'
                        : 'bg-gray-700 text-gray-300'
                }`}
              >
                {cert.category}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={slides}
        />
      </div>
    </section>
  );
}
