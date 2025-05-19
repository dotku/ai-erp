import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import ThinkContent from "./ThinkContent";
import {
  MessageContainer,
  MessageHeader,
  MessageAvatar,
  MessageSender,
  MessageTime,
  MessageContent,
} from "../../../styles/components/chat/styles";

/**
 * Message component for displaying user and AI messages
 * @param {Object} props - Component props
 * @param {Object} props.message - The message object
 * @param {boolean} props.thinkMode - Whether think mode is enabled
 * @param {boolean} props.expandedThink - Whether think content is expanded
 * @param {function} props.toggleThinkExpanded - Function to toggle think expansion
 * @param {function} props.parseThinkContent - Function to parse think content
 * @param {boolean} props.isLoading - Whether the system is processing a response
 */
const Message = ({
  message,
  thinkMode,
  expandedThink,
  toggleThinkExpanded,
  parseThinkContent,
  isLoading,
}) => {
  if (!message) return null;

  // Process content safely - simplified approach to avoid infinite loops
  let content = "";

  // Use a try-catch to handle any potential errors
  try {
    // If message content is a string, use it directly
    if (typeof message.content === "string") {
      content = message.content;
    }
    // If it's an object with a content property, use that
    else if (message.content && typeof message.content.content === "string") {
      content = message.content.content;
    }
    // Otherwise, convert to string or use empty string
    else {
      content = String(message.content || "");
    }
  } catch (error) {
    // Fallback in case of any errors
    content = String(message.content || "");
    console.error("Error processing message content:", error);
  }

  try {
    content = JSON.parse(content).content;
  } catch (error) {
    console.warn("format need update", error);
  }

  console.log("content", content);

  // Format the timestamp
  const formattedTime = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <MessageContainer>
      <MessageHeader>
        <MessageAvatar isUser={message.isUser}>
          {message.isUser ? "U" : "AI"}
        </MessageAvatar>
        <MessageSender>{message.isUser ? "You" : "ChatERP"}</MessageSender>
        <MessageTime>{formattedTime}</MessageTime>
      </MessageHeader>

      {/* Think content display removed */}

      {/* Display the main message content with markdown support */}
      <MessageContent isUser={message.isUser}>
        {message.isUser ? (
          content
        ) : (
          <>
            <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]}>
              {content}
            </ReactMarkdown>
            {isLoading && message.id === "loading" && (
              <div
                style={{
                  marginTop: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  className="loading-indicator"
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#007bff",
                    marginRight: "4px",
                    animation: "pulse 1.5s infinite",
                  }}
                ></div>
                <style jsx>{`
                  @keyframes pulse {
                    0% {
                      opacity: 0.3;
                    }
                    50% {
                      opacity: 1;
                    }
                    100% {
                      opacity: 0.3;
                    }
                  }
                `}</style>
                <span>Thinking...</span>
              </div>
            )}
          </>
        )}
      </MessageContent>
    </MessageContainer>
  );
};

export default Message;
