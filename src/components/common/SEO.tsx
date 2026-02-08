import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import type { SEOConfig } from '@app-types/common';

const BASE_TITLE = 'Web Development & Data Analytics Freelancing Portfolio';
const BASE_URL = 'https://risha-v.github.io/PORTFOLIO';
const SITE_NAME = 'Rishav Portfolio';
const DEFAULT_DESCRIPTION = 'Professional freelance web development and data analytics services for small and medium businesses. Modern MERN stack websites, responsive design, data dashboards, and clear analytics solutions.';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const TWITTER_HANDLE = '@rishavkrraj'; // Update with your actual Twitter handle

interface AppHelmetProviderProps {
  children: React.ReactNode;
}

export const AppHelmetProvider: React.FC<AppHelmetProviderProps> = ({ children }) => (
  <HelmetProvider>{children}</HelmetProvider>
);

export const SEO: React.FC<SEOConfig> = ({ title, description, canonicalPath }) => {
  const fullTitle = title === 'Home' ? BASE_TITLE : `${title} | ${SITE_NAME}`;
  const canonical = canonicalPath ? `${BASE_URL}${canonicalPath}` : BASE_URL;
  const finalDescription = description || DEFAULT_DESCRIPTION;
  const imageUrl = DEFAULT_IMAGE;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={`${title} - ${SITE_NAME}`} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="Rishav - Web Developer & Data Analyst" />
      
      {/* Keywords for better discoverability */}
      <meta name="keywords" content="web development, data analytics, MERN stack, React developer, freelance web developer, data dashboards, business websites, responsive design, MongoDB, Express.js, Node.js, TypeScript, data visualization" />

      {/* Language */}
      <meta httpEquiv="content-language" content="en-US" />

      {/* Geo Tags (update with your location) */}
      <meta name="geo.region" content="IN-JH" />
      <meta name="geo.placename" content="Deoghar" />
      <meta name="geo.position" content="24.4820;86.6946" />
      <meta name="ICBM" content="24.4820, 86.6946" />

      {/* Theme Color for Mobile Browsers */}
      <meta name="theme-color" content="#020617" />
      <meta name="msapplication-navbutton-color" content="#020617" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Structured Data - JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": SITE_NAME,
          "description": finalDescription,
          "url": BASE_URL,
          "logo": `${BASE_URL}/logo.png`,
          "image": imageUrl,
          "sameAs": [
            // Add your social media profiles here
            "https://github.com/Risha-v",
            "https://linkedin.com/in/contactrishavkumar",
            "https://twitter.com/rishavkrraj"
          ],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Patna",
            "addressRegion": "Bihar",
            "addressCountry": "IN"
          },
          "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": "25.5941",
              "longitude": "85.1376"
            },
            "geoRadius": "Global"
          },
          "priceRange": "₹₹",
          "serviceType": [
            "Web Development",
            "Data Analytics",
            "Business Websites",
            "Data Dashboards"
          ]
        })}
      </script>

      {/* Breadcrumb Structured Data */}
      {canonicalPath && canonicalPath !== '/' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": BASE_URL
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": title,
                "item": canonical
              }
            ]
          })}
        </script>
      )}
    </Helmet>
  );
};