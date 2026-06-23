import { MetadataRoute } from 'next';
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  
  const routes = [
    '',
    '/about-us',
    '/features',
    '/auth/login',
    '/auth/signup',
    '/how-it-works',
    '/pricing',
    '/professionals',
    '/students',
    '/organizations',
    '/privacy-policy',
    '/terms-and-conditions',
    // Solutions
    '/solutions/networking-platform',
    '/solutions/recruitment-solutions',
    '/solutions/learning-solutions',
    '/solutions/marketplace',
    '/solutions/procurement',
    '/solutions/equipment-rental',
    '/solutions/hms-software',
    '/solutions/clinic-management',
    '/solutions/telemedicine',
    // Professionals
    '/professionals/professional-network',
    '/professionals/jobs-opportunities',
    '/professionals/learning-hub',
    '/professionals/certifications',
    '/professionals/events-webinars',
    '/professionals/marketplace',
    '/professionals/professional-verification',
    '/professionals/mentorship',
    '/professionals/research-collaboration',
    '/professionals/career-services',
    // Organizations
    '/organizations/hospitals',
    '/organizations/colleges-universities',
    '/organizations/recruiters',
    '/organizations/pharma-companies',
    '/organizations/healthcare-businesses',
    '/organizations/training-institutes',
    '/organizations/post-opportunities',
    '/organizations/bulk-procurement',
    '/organizations/equipment-rental',
    '/organizations/partnership-program',
    '/organizations/enterprise-solutions',
    // Resources
    '/resources/blog',
    '/resources/career-guides',
    '/resources/industry-insights',
    '/resources/success-stories',
    '/resources/help-center',
    '/resources/faqs',
    '/resources/contact-us',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
