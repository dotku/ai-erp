import React, { useRef, useEffect } from 'react';
import {
  InputContainer,
  TextAreaWrapper,
  StyledTextArea,
  SendButton
} from '../../../styles/components/chat/styles';

/**
 * InputArea component for chat message input
 * @param {Object} props - Component props
 * @param {string} props.input - Current input value
 * @param {function} props.setInput - Function to update input value
 * @param {function} props.handleSendMessage - Function to handle sending messages
 * @param {function} props.handleKeyDown - Function to handle key press events
 * @param {Object} props.textAreaRef - Ref for the textarea element
 * @param {boolean} props.isLoading - Whether a message is currently being sent
 */
const InputArea = ({ 
  input, 
  setInput, 
  handleSendMessage, 
  handleKeyDown, 
  textAreaRef, 
  isLoading 
}) => {
  // Create a ref if one wasn't provided
  const localTextAreaRef = useRef(null);
  const textAreaRefToUse = textAreaRef || localTextAreaRef;
  
  // Adjust textarea height based on content
  useEffect(() => {
    if (textAreaRefToUse.current) {
      textAreaRefToUse.current.style.height = 'auto';
      textAreaRefToUse.current.style.height = `${textAreaRefToUse.current.scrollHeight}px`;
    }
  }, [input, textAreaRefToUse]);
  
  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  
  // Handle send button click
  const handleSendClick = () => {
    if (input.trim() && !isLoading) {
      handleSendMessage();
    }
  };
  
  return (
    <InputContainer>
      <TextAreaWrapper>
        <StyledTextArea
          ref={textAreaRefToUse}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          disabled={isLoading}
          rows={1}
        />
        <SendButton 
          onClick={handleSendClick}
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
        >
          {isLoading ? (
            // Loading spinner icon
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                fill="currentColor"
                opacity="0.3"
              />
              <path
                d="M12 4V2C6.48 2 2 6.48 2 12h2c0-4.41 3.59-8 8-8z"
                fill="currentColor"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 12 12"
                  to="360 12 12"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          ) : (
            // Send icon
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                fill="currentColor"
              />
            </svg>
          )}
        </SendButton>
      </TextAreaWrapper>
    </InputContainer>
  );
};

export default InputArea;
