import React from 'react';
import { Helmet } from 'react-helmet-async';

const SchemaData = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Navarro Benjamin",
    "url": "https://navart.dev",
    "jobTitle": "Développeur Web",
    "image": "https://navart.dev/photo.jpg",
    "sameAs": [
      "https://github.com/benji-devw",
      "https://linkedin.com/in/navart"
    ],
    "knowsAbout": ["React", "JavaScript", "CSS", "Node.js", "Design Responsive", "Testeur QA", "Infographie", "3D"],
    "worksFor": {
      "@type": "Organization",
      "name": "Navart"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://navart.dev"
    }
  };

  const portfolioData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Portfolio de Navarro Benjamin",
    "url": "https://navart.dev",
    "description": "Portfolio de Navarro Benjamin - Spécialiste en dévelopement web, React, Node.js, Testeur QA, design responsive, infographie, 3D",
    "author": {
      "@type": "Person",
      "name": "Navarro Benjamin"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(portfolioData)}
      </script>
    </Helmet>
  );
};

export default SchemaData; 