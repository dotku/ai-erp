import React from 'react';
import styled from 'styled-components';
import { suggestedPrompts } from '../../../data/suggestedPrompts';
import { colors, typography } from '../../../styles/theme';

const SuggestedPromptsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  width: 100%;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 16px;
  
  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 0 12px;
  }
  
  @media (max-width: 480px) {
    margin-top: 10px;
    padding: 0 8px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: ${colors.text.secondary};
  ${typography.subtitle1};
  position: relative;
  width: 100%;
  justify-content: center;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
    font-size: 14px;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,165,0,0.5) 50%, rgba(255,255,255,0) 100%);
    width: 100%;
    
    @media (max-width: 768px) {
      bottom: -8px;
      height: 1px;
    }
  }
  
  svg {
    margin-right: 8px;
    color: ${colors.primary.main};
    
    @media (max-width: 768px) {
      width: 16px;
      height: 16px;
    }
  }
`;

const PromptsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const PromptCard = styled.button`
  background-color: ${colors.background.paper};
  border: 1px solid ${colors.border.light};
  border-radius: 8px;
  padding: 16px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${colors.text.primary};
  ${typography.body2};
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  line-height: 1.4;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 12px;
    min-height: 60px;
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    min-height: 50px;
  }
  
  &:hover {
    background-color: ${colors.background.hover};
    border-color: ${colors.primary.light};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const SuggestedPrompts = ({ advisorId = 'general', onPromptClick }) => {
  // Map URL advisor IDs to the keys in suggestedPrompts if needed
  const getAdvisorKey = (id) => {
    // Map of URL IDs to suggestedPrompts keys
    const advisorMap = {
      'general': 'general',
      'document-analyzer': 'document-analyzer',
      'ask-controllers': 'financial-controller',
      'financial-controller': 'financial-controller',
      'budget-admin': 'budget-admin',
      'askcba': 'budget-admin',
      'blended-finance': 'blended-finance',
      'business-risk': 'business-risk',
      'askp&p': 'askp&p'
    };
    
    return advisorMap[id] || 'general';
  };
  
  // Get prompts for the current advisor or fall back to general prompts
  const advisorKey = getAdvisorKey(advisorId);
  const promptsToShow = suggestedPrompts[advisorKey] || suggestedPrompts.general;
  
  // Take a different number of prompts based on screen size
  // We'll handle this with CSS grid instead of slicing differently
  const displayPrompts = promptsToShow.slice(0, 6);
  
  return (
    <SuggestedPromptsContainer>
      <Title>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        Suggested Prompts
      </Title>
      <PromptsGrid>
        {displayPrompts.map((prompt, index) => (
          <PromptCard 
            key={index} 
            onClick={() => onPromptClick(prompt)}
          >
            {prompt}
          </PromptCard>
        ))}
      </PromptsGrid>
    </SuggestedPromptsContainer>
  );
};

export default SuggestedPrompts;
