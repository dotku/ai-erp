import React, { useRef, useEffect } from "react";
import Message from "./Message";
import { MessageListContainer } from "../../../styles/components/chat/styles";

/**
 * MessageList component for displaying chat messages
 * @param {Object} props - Component props
 * @param {Array} props.messages - Array of message objects
 * @param {Object} props.streamingMessage - Current streaming message, if any
 * @param {boolean} props.thinkMode - Whether think mode is enabled
 * @param {boolean} props.expandedThink - Whether think content is expanded
 * @param {function} props.toggleThinkExpanded - Function to toggle think expansion
 * @param {function} props.parseThinkContent - Function to parse think content
 * @param {boolean} props.isLoading - Whether the system is processing a response
 */
const MessageList = ({
  messages,
  streamingMessage,
  thinkMode,
  expandedThink,
  toggleThinkExpanded,
  parseThinkContent,
  isLoading,
}) => {
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, streamingMessage]);

  return (
    <MessageListContainer className="message-list">
      {/* Display existing messages */}
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          thinkMode={thinkMode}
          expandedThink={expandedThink}
          toggleThinkExpanded={toggleThinkExpanded}
          parseThinkContent={parseThinkContent}
          isLoading={isLoading}
        />
      ))}

      {/* Display streaming message if available */}
      {streamingMessage && (
        <Message
          message={streamingMessage}
          thinkMode={thinkMode}
          expandedThink={expandedThink}
          toggleThinkExpanded={toggleThinkExpanded}
          parseThinkContent={parseThinkContent}
          isLoading={isLoading}
        />
      )}
      <div ref={messagesEndRef} />
    </MessageListContainer>
  );
};

export default MessageList;
