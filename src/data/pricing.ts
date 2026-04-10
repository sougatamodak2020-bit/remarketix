export type Plan = {
  title: string; subtitle: string; icon: string;
  price: { usd: number | string; inr: number | string };
  unit: string; label?: string; details?: string;
  features: string[]; highlight?: boolean;
};
export type ServicePlan = {
  title: string; price: { usd: number | string; inr: number | string };
  unit: string; icon: string; features: string[];
};

export const CORE_PLANS: Plan[] = [
  { title: "Hourly Plan", subtitle: "Flexible & Task-Based", icon: "Zap",
    price: { usd: 4, inr: 360 }, unit: "/ hour", details: "Minimum 4 hours per day",
    features: ["Lead Generation & Data Research","Email Hunting & Verification","CRM Management","Market Research","Campaign Assistance"] },
  { title: "Project-Based", subtitle: "Fixed Deliverables", icon: "Layers",
    price: { usd: 67, inr: 6000 }, unit: "/ project", label: "Starts from",
    details: "Ideal for targeted contact lists", highlight: true,
    features: ["Custom company & contact research","Data cleaning and validation","Verified email delivery","1 Free Revision","Volume-based pricing"] },
  { title: "Monthly Dedicated", subtitle: "Full-Time Resource", icon: "Globe",
    price: { usd: 222, inr: 20000 }, unit: "/ month", details: "Best for agencies & teams",
    features: ["8 hours/day, 5 days/week","Dedicated Specialist","Weekly detailed reports","Flexible work hours","Save 20% vs hourly rates"] },
];

export const PRICING_SERVICES: ServicePlan[] = [
  { title: "Lead Generation",    price:{usd:56,inr:5000},   unit:"/ project",  icon:"Search",   features:["Industry & Location Targeting","Decision-maker contacts","Email Verification","Excel/CSV Delivery","Tools: Apollo, LinkedIn Sales Nav"] },
  { title: "LinkedIn Management",price:{usd:85,inr:7650},   unit:"/ month",    icon:"Linkedin", features:["Profile Optimization","Weekly Content & Posting","Lead Outreach Campaigns","Analytics & Reporting","Tools: Buffer, ChatGPT"] },
  { title: "SEO Optimization",   price:{usd:60,inr:5400},   unit:"/ month",    icon:"BarChart2",features:["Keyword Research","On-Page & Off-Page","Backlink Building","Monthly Ranking Report","Tools: Ahrefs, SEMrush"] },
  { title: "Data Entry Services", price:{usd:56,inr:5000},  unit:"/ project",  icon:"Database", features:["Excel / Google Sheet Entry","CRM Cleanup","Product Listing","PDF to Excel Conversion","Tools: Notion, Airtable"] },
  { title: "LinkedIn Outreach",   price:{usd:75,inr:6750},  unit:"/ campaign", icon:"Send",     features:["Connection requests","Message sequences","Response tracking","1 Free performance report","Ideal for B2B Connections"] },
  { title: "Content Creation",    price:{usd:78,inr:7000},  unit:"/ pack",     icon:"PenTool",  features:["10 Branded Social Posts","SEO Blog Writing","Email Copywriting","Captions & Hashtags","Tools: Canva, Jasper AI"] },
  { title: "UI/UX Design",        price:{usd:300,inr:27000},unit:"/ project",  icon:"Box",      features:["User Research & Personas","Wireframing & Prototyping","High-Fidelity UI","Mobile-First Design","Tools: Figma, Adobe XD"] },
  { title: "Data Collection",     price:{usd:56,inr:5000},  unit:"/ project",  icon:"Layers",   features:["Web & Directory Gathering","Competitor Data","Contact Extraction","Structured Delivery","Tools: Hunter.io, Apollo"] },
  { title: "Company Research",    price:{usd:60,inr:5400},  unit:"/ project",  icon:"Search",   features:["Industry Analysis","Revenue & Growth Data","Funding Rounds","Decision-Maker Contacts","Tools: Crunchbase, ZaubaCorp"] },
  { title: "CGI Product Ads",     price:{usd:240,inr:21600},unit:"/ project",  icon:"Video",    features:["3D Modeling & Visualization","Realistic Rendering","360° View Animations","Scene Integration","Tools: Blender, Cinema 4D"] },
  { title: "Web Development",     price:{usd:"335–$445",inr:"30,000–₹40,000"},unit:"/ project",icon:"Layers",features:["Responsive Website Build","UI/UX Design","Backend Integration","SEO Optimization","Tools: React, Node.js"] },
  { title: "Email Marketing",     price:{usd:56,inr:5000},  unit:"/ campaign", icon:"Mail",     features:["Audience Segmentation","Campaign Copywriting","Template Design","Automation Setup","Tools: Mailchimp, Brevo, HubSpot"] },
];
