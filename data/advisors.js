/**
 * Advisor data for the ChatERP application
 * This file contains all the advisor information used across the application
 */

export const advisors = [
  {
    id: "general",
    name: "General Assistant",
    description:
      "ChatERP - General doesn't generate IFC information and can be used for general purpose only. It protects IFC and client information.",
    icon: "🌐",
  },
  {
    id: "document-analyzer",
    name: "Document Analyzer",
    description:
      "The Document Analyzer can help you save significant time by automatically analyzing long and complex documents for you.",
    icon: "📄",
  },
  {
    id: "ask-controllers",
    name: "Ask Controllers",
    description:
      "This advisor helps to understand the general impact of transactions/products on IFC's audited financial statements under generally accepted accounting principles (US GAAP).",
    icon: "🔍",
  },
  {
    id: "askcba",
    name: "AskCBA",
    description:
      '"AskCBA" is CBA\'s knowledge-based Chatbot, which will assist you with queries related to Budget, Administration, Procurement and Real Estate policies, procedures, and systems.',
    icon: "💼",
  },
  {
    id: "blended-finance",
    name: "Blended Finance",
    description:
      "This advisor helps to understand the world of blended finance. Blended finance combines public and private funds to support development projects with high impact.",
    icon: "💰",
  },
  {
    id: "business-risk",
    name: "Business Risk Compliance Manual",
    description:
      "Try the Compliance Manual to quickly and easily search and browse Business Risk and Compliance (BRC) policies and procedures.",
    icon: "📊",
  },
  {
    id: "personalize",
    name: "Personalized Assistant",
    description: "Adapts to your specific needs and remembers your preferences.",
    icon: "👤",
  }
];

// Simplified version of advisors for the home page
export const homePageAdvisors = [
  {
    id: "general",
    name: "General Assistant",
    description: "ChatERP - General can be used for general purpose inquiries and business assistance.",
    icon: "🌐"
  },
  {
    id: "document-analyzer",
    name: "Document Analyzer",
    description: "Helps analyze long and complex documents to save you time.",
    icon: "📄"
  },
  {
    id: "ask-controllers",
    name: "Ask Controllers",
    description: "Specialized assistant for accounting and financial control questions.",
    icon: "💼"
  },
  {
    id: "personalize",
    name: "Personalized Assistant",
    description: "Adapts to your specific needs and remembers your preferences.",
    icon: "👤"
  }
];

// Function to get advisor by ID
export const getAdvisorById = (id) => {
  return advisors.find(advisor => advisor.id === id) || advisors[0];
};
