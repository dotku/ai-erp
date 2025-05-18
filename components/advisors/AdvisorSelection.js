import React from "react";
import { useRouter } from "next/navigation";
import {
  AdvisorSelectionContainer,
  Title,
  Description,
  AdvisorsGrid,
  AdvisorCard,
  AdvisorIcon,
  AdvisorInfo,
  AdvisorName,
  AdvisorDescription,
} from "../../styles/components/advisors/styles";

const advisors = [
  {
    id: "general",
    name: "General",
    description:
      "ChatERP - General doesn't generate IFC information and can be used for general purpose only. It protects IFC and client information.",
    icon: "📋",
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
];

function AdvisorSelection({ onSelectAdvisor }) {
  const router = useRouter();

  const handleAdvisorSelect = (advisor) => {
    if (onSelectAdvisor) {
      onSelectAdvisor(advisor);
    } else {
      router.push(`/chat/${advisor.id}`);
    }
  };
  return (
    <AdvisorSelectionContainer>
      <Title>Choose your ChatERP advisor</Title>
      <Description>
        A suite of ChatERP advisors designed to streamline tasks and enhance
        your digital experience. These advisors can guide you with IFC
        information and knowledge. Select any preferred advisor and set it as
        your default for your next visit.
      </Description>

      <AdvisorsGrid>
        {advisors.map((advisor) => (
          <AdvisorCard
            key={advisor.id}
            onClick={() => handleAdvisorSelect(advisor)}
          >
            <AdvisorIcon>{advisor.icon}</AdvisorIcon>
            <AdvisorInfo>
              <AdvisorName>{advisor.name}</AdvisorName>
              <AdvisorDescription>{advisor.description}</AdvisorDescription>
            </AdvisorInfo>
          </AdvisorCard>
        ))}
      </AdvisorsGrid>
    </AdvisorSelectionContainer>
  );
}

export default AdvisorSelection;
