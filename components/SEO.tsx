import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = "construction company nepal, house builders kathmandu, civil engineer nepal, janak builders, cost estimate nepal", 
  image = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3" 
}) => {
  const location = useLocation();
  const siteUrl = window.location.origin;
  const fullTitle = `${title} | Janak Builders Nepal`;

  useEffect(() => {
    // Update Title
    document.title = fullTitle;

    // Helper to update meta tags
    const updateMeta = (name: string, content: string, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard SEO
    updateMeta('description', description);
    updateMeta('keywords', keywords);

    // Open Graph / Facebook
    updateMeta('og:type', 'website', 'property');
    updateMeta('og:url', siteUrl + location.pathname, 'property');
    updateMeta('og:title', fullTitle, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:image', image, 'property');

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

  }, [fullTitle, description, keywords, image, location.pathname, siteUrl]);

  return null;
};

export default SEO;