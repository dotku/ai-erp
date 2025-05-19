import React, { useState } from 'react';
import { ThinkContent as StyledThinkContent, ThinkToggle } from '../../../styles/components/chat/styles';

/**
 * ThinkContent component for displaying AI thinking process
 * @param {Object} props - Component props
 * @param {string} props.content - The think content
 * @param {string|number} props.messageId - ID of the parent message
 * @param {boolean} props.expandedThink - Whether think content is expanded globally
 * @param {function} props.toggleThinkExpanded - Function to toggle think expansion globally
 */
const ThinkContent = ({ 
  content, 
  messageId, 
  expandedThink, 
  toggleThinkExpanded 
}) => {
  // Use local state as fallback if global state props aren't provided
  const [localExpanded, setLocalExpanded] = useState(false);
  
  if (!content) return null;
  
  // Determine if expanded based on props or local state
  const isExpanded = expandedThink !== undefined ? expandedThink : localExpanded;
  
  // Toggle expanded state using props function or local state
  const handleToggle = () => {
    if (toggleThinkExpanded) {
      toggleThinkExpanded();
    } else {
      setLocalExpanded(prev => !prev);
    }
  };
  
  return (
    <>
      <ThinkToggle onClick={handleToggle}>
        {isExpanded ? "Hide thinking" : "Show thinking"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </ThinkToggle>
      
      {isExpanded && (
        <StyledThinkContent>
          <pre>{content}</pre>
        </StyledThinkContent>
      )}
    </>
  );
};

export default ThinkContent;
