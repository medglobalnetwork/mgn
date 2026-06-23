const fs = require('fs');
const path = require('path');

const pages = [
  {
    routes: ['/professionals/mentorship', '/professionals/career-services', '/professionals/certifications', '/professionals/events-webinars'],
    badge: 'Early Access Program',
    title: "We're preparing this feature for launch.",
    description: "Join the early access list and be among the first healthcare professionals to experience it.",
    buttonText: 'Request Early Access'
  },
  {
    routes: ['/professionals/research-collaboration', '/organizations/training-institutes', '/organizations/partnership-program', '/solutions/learning-solutions', '/solutions/networking-platform', '/solutions/recruitment-solutions'],
    badge: 'Feature In Development',
    title: "Our team is actively building this solution.",
    description: "We're working closely with healthcare professionals and organizations to deliver the best experience.",
    buttonText: 'Notify Me'
  },
  {
    routes: ['/professionals/marketplace', '/organizations/healthcare-businesses', '/organizations/pharma-companies', '/solutions/marketplace'],
    badge: 'Launching Soon',
    title: "A dedicated healthcare marketplace is on the way.",
    description: "Discover products, services, equipment and business opportunities built for the healthcare ecosystem.",
    buttonText: 'Join Waitlist'
  },
  {
    routes: ['/organizations/enterprise-solutions', '/solutions/clinic-management', '/solutions/hms-software'],
    badge: 'Enterprise Preview',
    title: "Enterprise-grade solutions are currently being finalized.",
    description: "Schedule a consultation to learn more.",
    buttonText: 'Book a Demo'
  },
  {
    routes: ['/solutions/telemedicine'],
    badge: 'Private Beta',
    title: "This solution is currently available to selected partners and organizations.",
    description: "Request access to join the beta program.",
    buttonText: 'Request Access'
  },
  {
    routes: ['/organizations/post-opportunities'],
    badge: 'Expanding Soon',
    title: "Opportunity management tools are being added to MGN.",
    description: "Post jobs, internships, fellowships and healthcare opportunities from one place.",
    buttonText: 'Get Updates'
  },
  {
    routes: ['/organizations/bulk-procurement', '/organizations/equipment-rental', '/solutions/procurement', '/solutions/equipment-rental'],
    badge: 'Vendor Network Expansion',
    title: "We're building a trusted procurement and equipment ecosystem for healthcare organizations.",
    description: "Join our partner network today.",
    buttonText: 'Become a Partner'
  },
  {
    routes: ['/resources/career-guides', '/resources/industry-insights'],
    badge: 'Content Library Growing',
    title: "New healthcare guides, industry reports and expert insights are being added regularly.",
    description: "Subscribe to stay informed.",
    buttonText: 'Subscribe'
  },
  {
    routes: ['/resources/success-stories'],
    badge: 'Success Stories Coming Soon',
    title: "We're collecting inspiring stories from healthcare professionals, organizations and students across the MGN ecosystem.",
    description: "Share your story with us.",
    buttonText: 'Share Your Story'
  }
];

const basePath = path.join(process.cwd(), 'src', 'app');

pages.forEach(category => {
  category.routes.forEach(route => {
    const dirPath = path.join(basePath, route);
    const filePath = path.join(dirPath, 'page.tsx');
    
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const content = `import StatusPage from "@/components/StatusPage";

export default function Page() {
  return (
    <StatusPage 
      badge="${category.badge}"
      title="${category.title.replace(/"/g, '\\"')}"
      description="${category.description.replace(/"/g, '\\"')}"
      buttonText="${category.buttonText}"
    />
  );
}
`;
    fs.writeFileSync(filePath, content);
    console.log('Created/Updated:', route);
  });
});
