export type NavItem = {
  name: string;
  href: string;
  badge?: string;
  badgeColor?: string;
};

export type NavSubGroup = {
  title: string;
  items: NavItem[];
};

export type NavGroup = {
  title: string;
  columns: NavSubGroup[];
};

export const MAIN_NAV: NavGroup[] = [
  {
    title: "Professionals",
    columns: [
      {
        title: "Explore",
        items: [
          { name: "Professional Network", href: "/professionals/professional-network" },
          { name: "Jobs & Opportunities", href: "/professionals/jobs-opportunities" },
          { name: "Learning Hub", href: "/professionals/learning-hub" },
          { name: "Mentorship", href: "/professionals/mentorship", badge: "Early Access", badgeColor: "bg-blue-100 text-blue-700" },
          { name: "Research Collaboration", href: "/professionals/research-collaboration", badge: "In Dev", badgeColor: "bg-gray-100 text-gray-600" },
        ],
      },
      {
        title: "Career Growth",
        items: [
          { name: "Career Services", href: "/professionals/career-services", badge: "Early Access", badgeColor: "bg-blue-100 text-blue-700" },
          { name: "Certifications", href: "/professionals/certifications", badge: "Early Access", badgeColor: "bg-blue-100 text-blue-700" },
          { name: "Events & Webinars", href: "/professionals/events-webinars", badge: "Early Access", badgeColor: "bg-blue-100 text-blue-700" },
          { name: "Professional Verification", href: "/professionals/professional-verification" },
        ],
      },
      {
        title: "Commerce",
        items: [
          { name: "Marketplace", href: "/professionals/marketplace", badge: "Launching Soon", badgeColor: "bg-emerald-100 text-emerald-700" },
        ],
      },
    ],
  },
  {
    title: "Organizations",
    columns: [
      {
        title: "Healthcare Organizations",
        items: [
          { name: "Hospitals", href: "/organizations/hospitals" },
          { name: "Recruiters", href: "/organizations/recruiters" },
          { name: "Colleges & Universities", href: "/organizations/colleges-universities" },
          { name: "Training Institutes", href: "/organizations/training-institutes", badge: "In Dev", badgeColor: "bg-gray-100 text-gray-600" },
          { name: "Healthcare Businesses", href: "/organizations/healthcare-businesses", badge: "Launching Soon", badgeColor: "bg-emerald-100 text-emerald-700" },
          { name: "Pharma Companies", href: "/organizations/pharma-companies", badge: "Launching Soon", badgeColor: "bg-emerald-100 text-emerald-700" },
        ],
      },
      {
        title: "Business Services",
        items: [
          { name: "Post Opportunities", href: "/organizations/post-opportunities", badge: "Expanding", badgeColor: "bg-purple-100 text-purple-700" },
          { name: "Partnership Program", href: "/organizations/partnership-program", badge: "In Dev", badgeColor: "bg-gray-100 text-gray-600" },
        ],
      },
      {
        title: "Procurement",
        items: [
          { name: "Bulk Procurement", href: "/organizations/bulk-procurement", badge: "Expanding", badgeColor: "bg-purple-100 text-purple-700" },
          { name: "Equipment Rental", href: "/organizations/equipment-rental", badge: "Expanding", badgeColor: "bg-purple-100 text-purple-700" },
          { name: "Enterprise Solutions", href: "/organizations/enterprise-solutions", badge: "Enterprise Preview", badgeColor: "bg-amber-100 text-amber-700" },
        ],
      },
    ],
  },
  {
    title: "Solutions",
    columns: [
      {
        title: "Workforce",
        items: [
          { name: "Networking Platform", href: "/solutions/networking-platform", badge: "In Dev", badgeColor: "bg-gray-100 text-gray-600" },
          { name: "Recruitment Solutions", href: "/solutions/recruitment-solutions", badge: "In Dev", badgeColor: "bg-gray-100 text-gray-600" },
          { name: "Learning Solutions", href: "/solutions/learning-solutions", badge: "In Dev", badgeColor: "bg-gray-100 text-gray-600" },
        ],
      },
      {
        title: "Operations",
        items: [
          { name: "Clinic Management", href: "/solutions/clinic-management", badge: "Enterprise Preview", badgeColor: "bg-amber-100 text-amber-700" },
          { name: "HMS Software", href: "/solutions/hms-software", badge: "Enterprise Preview", badgeColor: "bg-amber-100 text-amber-700" },
          { name: "Telemedicine", href: "/solutions/telemedicine", badge: "Private Beta", badgeColor: "bg-indigo-100 text-indigo-700" },
        ],
      },
      {
        title: "Commerce",
        items: [
          { name: "Marketplace", href: "/solutions/marketplace", badge: "Launching Soon", badgeColor: "bg-emerald-100 text-emerald-700" },
          { name: "Procurement", href: "/solutions/procurement", badge: "Expanding", badgeColor: "bg-purple-100 text-purple-700" },
          { name: "Equipment Rental", href: "/solutions/equipment-rental", badge: "Expanding", badgeColor: "bg-purple-100 text-purple-700" },
        ],
      },
    ],
  },
  {
    title: "Resources",
    columns: [
      {
        title: "Learn",
        items: [
          { name: "Blog", href: "/resources/blog" },
          { name: "Career Guides", href: "/resources/career-guides" },
          { name: "Industry Insights", href: "/resources/industry-insights" },
          { name: "Success Stories", href: "/resources/success-stories", badge: "Coming Soon", badgeColor: "bg-gray-100 text-gray-600" },
        ],
      },
      {
        title: "Support",
        items: [
          { name: "Help Center", href: "/resources/help-center" },
          { name: "FAQs", href: "/resources/faqs" },
          { name: "Contact Us", href: "/resources/contact-us" },
        ],
      },
    ],
  },
];

export const FOOTER_NAV = [
  {
    title: "Platform",
    items: [
      { name: "About Us", href: "/about-us" },
      { name: "Features", href: "/features" },
      { name: "How it Works", href: "/how-it-works" },
      { name: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "For Users",
    items: [
      { name: "For Professionals", href: "/professionals" },
      { name: "For Students", href: "/students" },
      { name: "For Organizations", href: "/organizations" },
      { name: "Marketplace", href: "/solutions/marketplace" },
    ],
  },
  {
    title: "Resources",
    items: [
      { name: "Blog", href: "/resources/blog" },
      { name: "Help Center", href: "/resources/help-center" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
  },
];
