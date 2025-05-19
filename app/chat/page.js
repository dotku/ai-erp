"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/common/Header";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);
  padding: 20px;
  background-color: #f8f9fa;
  overflow-y: auto;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px 12px;
    height: calc(100vh - 60px);
    justify-content: flex-start;
    padding-bottom: 40px; /* Add more padding at the bottom for mobile */
  }

  @media (max-width: 480px) {
    padding: 12px 10px;
    padding-bottom: 30px;
  }

  @media (max-width: 320px) {
    padding: 10px 8px;
    padding-bottom: 24px;
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 32px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 24px 16px;
    margin-top: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    max-width: 100%;
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 20px 14px;
    margin-top: 8px;
    border-radius: 6px;
  }

  @media (max-width: 320px) {
    padding: 16px 12px;
    width: 100%;
    border-radius: 4px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 16px;
  color: #343541;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 12px;
  }

  @media (max-width: 320px) {
    font-size: 20px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  color: #6e6e80;
  margin-bottom: 32px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 24px;
    line-height: 1.5;
  }

  @media (max-width: 320px) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const AdvisorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  width: 100%;
  margin-top: 24px;
  box-sizing: border-box;
  max-width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 14px;
    margin-top: 20px;
    width: 100%;
    padding: 0;
  }

  @media (max-width: 480px) {
    gap: 12px;
    margin-top: 16px;
  }

  @media (max-width: 320px) {
    gap: 10px;
    margin-top: 14px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const AdvisorCard = styled.div`
  background-color: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    border-color: #10a37f;
  }

  &:active {
    transform: translateY(0);
    background-color: #f9f9f9;
  }

  @media (max-width: 768px) {
    padding: 16px;
    flex-direction: row;
    align-items: center;
    text-align: left;
    width: 100%;

    &:hover {
      transform: translateY(-2px);
    }
  }

  @media (max-width: 480px) {
    padding: 14px 12px;
    border-radius: 6px;
  }

  @media (max-width: 320px) {
    padding: 12px 10px;
    border-radius: 4px;
  }
`;

const AdvisorIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 0;
    margin-right: 16px;
  }

  @media (max-width: 320px) {
    font-size: 24px;
    margin-right: 12px;
    flex-shrink: 0;
  }
`;

const AdvisorName = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
  color: #343541;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 4px;
  }
`;

const AdvisorDescription = styled.p`
  font-size: 14px;
  color: #6e6e80;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 13px;
    text-align: left;
    margin-top: 4px;
    line-height: 1.4;
  }

  @media (max-width: 480px) {
    font-size: 12.5px;
    line-height: 1.35;
    margin-top: 3px;
  }

  @media (max-width: 320px) {
    font-size: 12px;
    line-height: 1.3;
    /* Allow text to wrap better on very small screens */
    max-width: calc(100% - 36px);
  }
`;

export default function ChatPage() {
  const router = useRouter();

  const advisors = [
    {
      id: 'general',
      name: 'General Assistant',
      description: 'ChatERP - General can be used for general purpose inquiries and business assistance.',
      icon: '🌐'
    },
    {
      id: 'document-analyzer',
      name: 'Document Analyzer',
      description: 'Helps analyze long and complex documents to save you time.',
      icon: '📄'
    },
    {
      id: 'ask-controllers',
      name: 'Ask Controllers',
      description: 'Specialized assistant for accounting and financial control questions.',
      icon: '💼'
    },
    {
      id: 'personalize',
      name: 'Personalized Assistant',
      description: 'Adapts to your specific needs and remembers your preferences.',
      icon: '👤'
    }
  ];

  const handleAdvisorSelect = (advisorId) => {
    router.push(`/chat/${advisorId}`);
  };

  return (
    <>
      <Header />
      <Container>
        <Card>
          <Title>Choose Your Assistant</Title>
          <Description>
            Select the specialized assistant that best fits your current needs.
            Each assistant is optimized for different types of tasks.
          </Description>

          <AdvisorGrid>
            {advisors.map((advisor) => (
              <AdvisorCard
                key={advisor.id}
                onClick={() => handleAdvisorSelect(advisor.id)}
                role="button"
                aria-label={`Select ${advisor.name} assistant`}
              >
                <AdvisorIcon>{advisor.icon}</AdvisorIcon>
                <div>
                  <AdvisorName>{advisor.name}</AdvisorName>
                  <AdvisorDescription>{advisor.description}</AdvisorDescription>
                </div>
              </AdvisorCard>
            ))}
          </AdvisorGrid>
        </Card>
      </Container>
    </>
  );
}
