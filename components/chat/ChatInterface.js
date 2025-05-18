import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

// Import components
import ChatHeader from "./interface/ChatHeader";
import MessageList from "./interface/MessageList";
import InputArea from "./interface/InputArea";
import Sidebar from "./interface/Sidebar";
import SuggestedPrompts from "./interface/SuggestedPrompts";
import Logo from "../common/Logo";

// Import hooks and utilities
import useChat from "../../hooks/useChat";
import useMediaQuery from "../../hooks/useMediaQuery";

// Import styles
import {
  Container,
  MainContent,
  WelcomeMessage,
  SidebarOverlay,
} from "../../styles/components/chat/styles";

const ChatInterface = ({ advisor }) => {
  const router = useRouter();
  const textAreaRef = useRef(null);

  // State
  const [input, setInput] = useState("");
  
  // Check if the device is mobile
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Set sidebar visibility - hidden by default on mobile
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  // Use the custom chat hook
  const {
    messages,
    isLoading,
    sessionId,
    chatHistory,
    streamingMessage,
    thinkMode,
    expandedThink,
    setThinkMode,
    sendMessage,
    startNewSession,
    clearConversation,
    loadSession,
    deleteSession,
    toggleThinkExpanded,
    parseThinkContent,
  } = useChat(advisor?.id || "general");

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
  // Update sidebar visibility when screen size changes
  useEffect(() => {
    if (isMobile) {
      setShowSidebar(false);
    }
  }, [isMobile]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (!input.trim() || isLoading) return;

    // Send the message and clear input
    sendMessage(input);
    setInput("");
    
    // Scroll to bottom after sending message
    setTimeout(() => {
      const chatContainer = document.querySelector(".message-list");
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  };

  // Handle key press in the input area
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Effect to save session when messages change
  useEffect(() => {
    // Removed unused code
  }, [messages, thinkMode]);

  return (
    <>
      {/* Overlay for mobile when sidebar is visible */}
      {isMobile && <SidebarOverlay visible={showSidebar} onClick={toggleSidebar} />}
      
      {/* Chat interface container */}
      <Container>
        {/* Sidebar for chat history */}
        <Sidebar
          chatHistory={chatHistory}
          currentSessionId={sessionId}
          startNewSession={startNewSession}
          clearConversation={clearConversation}
          loadSession={loadSession}
          deleteSession={deleteSession}
          showSidebar={showSidebar}
          toggleSidebar={toggleSidebar}
        />

        {/* Main content area */}
        <MainContent sidebarVisible={showSidebar}>
          {/* Chat header with advisor info and controls */}
          <ChatHeader
            advisor={advisor}
            thinkMode={thinkMode}
            setThinkMode={setThinkMode}
            toggleSidebar={toggleSidebar}
            showSidebar={showSidebar}
            startNewSession={startNewSession}
            clearConversation={clearConversation}
            sessionId={sessionId}
          />

          {/* Message display area */}
          {messages.length === 0 ? (
            <>
              <WelcomeMessage>
                <Logo size="large" />
                <p>
                  {advisor
                    ? advisor.description
                    : "Ask me anything about your business data or general questions. I'm here to help with financial analysis, inventory management, and more."}
                </p>
              </WelcomeMessage>
              <SuggestedPrompts 
                advisorId={advisor?.id || "general"}
                onPromptClick={(prompt) => {
                  setInput(prompt);
                  textAreaRef.current?.focus();
                }}
              />
            </>
          ) : (
            <MessageList
              messages={messages}
              streamingMessage={streamingMessage}
              thinkMode={thinkMode}
              expandedThink={expandedThink}
              toggleThinkExpanded={toggleThinkExpanded}
              parseThinkContent={parseThinkContent}
            />
          )}

          {/* Input area for user messages */}
          <InputArea
            input={input}
            setInput={setInput}
            handleSendMessage={handleSendMessage}
            handleKeyDown={handleKeyDown}
            textAreaRef={textAreaRef}
            isLoading={isLoading}
          />
        </MainContent>
      </Container>
    </>
  );
};

export default ChatInterface;
