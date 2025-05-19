import { useState, useEffect, useCallback } from 'react';
import chatService from '../utils/chat/ChatService';
import { loadChatHistory, saveSession, deleteSession, createNewSession } from '../utils/chat/storage';
import { parseThinkContent, createMessage } from '../utils/chat/messageParser';

/**
 * Custom hook for chat functionality
 * @param {string} advisorId - The ID of the advisor to use
 * @returns {Object} - Chat state and functions
 */
const useChat = (advisorId = 'general') => {
  // State
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [streamingMessage, setStreamingMessage] = useState(null);
  const [thinkMode, setThinkMode] = useState(false);
  const [expandedThink, setExpandedThink] = useState({});

  // Load chat history on mount
  useEffect(() => {
    loadChatHistoryFromStorage();
  }, []);

  // Load chat history from localStorage
  const loadChatHistoryFromStorage = useCallback(() => {
    try {
      const historyData = loadChatHistory();
      if (historyData.sessions && Array.isArray(historyData.sessions)) {
        // Update the chat history state for the sidebar
        setChatHistory(historyData.sessions);

        // If we have sessions in history but no current session,
        // load the most recent one
        if (historyData.sessions.length > 0 && historyData.sessions[0].sessionId) {
          // If we don't have a current session, load the most recent one
          if (!sessionId) {
            const mostRecentSession = historyData.sessions[0];
            setSessionId(mostRecentSession.sessionId);
            setMessages(mostRecentSession.messages || []);
          }
        } else if (!sessionId) {
          // If no sessions exist, create a new one
          startNewSession();
        }
      } else {
        // If no history exists, create a new session
        startNewSession();
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      startNewSession();
    }
  }, [sessionId]);

  // Save chat history to localStorage
  const saveChatHistoryToStorage = useCallback(() => {
    if (!sessionId || !messages.length) return;

    try {
      // Find the current session in the history
      const currentSessionIndex = chatHistory.findIndex(
        (session) => session.sessionId === sessionId
      );

      // Create or update the session object
      const sessionToSave = {
        sessionId,
        advisorId,
        title: messages.length > 0 && messages[0].isUser
          ? messages[0].content.substring(0, 30) + (messages[0].content.length > 30 ? '...' : '')
          : `Chat ${new Date().toLocaleDateString()}`,
        messages,
        updatedAt: new Date().toISOString(),
      };

      // If the session already exists, update it
      if (currentSessionIndex !== -1) {
        const updatedHistory = [...chatHistory];
        updatedHistory[currentSessionIndex] = {
          ...updatedHistory[currentSessionIndex],
          ...sessionToSave,
        };
        setChatHistory(updatedHistory);
        saveSession(sessionToSave, chatHistory);
      } else {
        // If it's a new session, add it to the history
        const newHistory = [
          sessionToSave,
          ...chatHistory,
        ];
        setChatHistory(newHistory);
        saveSession(sessionToSave, chatHistory);
      }
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  }, [sessionId, messages, chatHistory, advisorId]);

  // Effect to save chat history when messages change
  useEffect(() => {
    if (messages.length > 0 && sessionId) {
      saveChatHistoryToStorage();
    }
  }, [messages, sessionId, saveChatHistoryToStorage]);

  // Start a new chat session
  const startNewSession = useCallback(() => {
    const newSession = createNewSession(advisorId);
    setSessionId(newSession.sessionId);
    setMessages([]);
    setChatHistory((prevHistory) => [newSession, ...prevHistory]);
  }, [advisorId]);

  // Clear the current conversation but keep the same session
  const clearConversation = useCallback(() => {
    if (!sessionId) return;

    try {
      // Find the current session in the history
      const currentSessionIndex = chatHistory.findIndex(
        (session) => session.sessionId === sessionId
      );

      if (currentSessionIndex !== -1) {
        // Create an updated session with empty messages
        const clearedSession = {
          ...chatHistory[currentSessionIndex],
          messages: [],
          updatedAt: new Date().toISOString(),
        };

        // Update the history
        const updatedHistory = [...chatHistory];
        updatedHistory[currentSessionIndex] = clearedSession;
        setChatHistory(updatedHistory);
        saveSession(clearedSession, chatHistory);

        // Update the current messages
        setMessages([]);
      }
    } catch (error) {
      console.error('Error clearing conversation:', error);
    }
  }, [sessionId, chatHistory]);

  // Load a specific chat session
  const loadSession = useCallback((id) => {
    if (!id) return;

    try {
      // Find the session in the history
      const sessionToLoad = chatHistory.find(
        (session) => session.sessionId === id
      );

      if (sessionToLoad) {
        setSessionId(sessionToLoad.sessionId);
        setMessages(sessionToLoad.messages || []);
      }
    } catch (error) {
      console.error('Error loading session:', error);
    }
  }, [chatHistory]);

  // Delete a chat session
  const deleteSessionById = useCallback((id) => {
    if (!id) return;

    try {
      // Delete the session from storage
      const updatedHistory = deleteSession(id, chatHistory);
      setChatHistory(updatedHistory);

      // If we're deleting the current session, load another one or start a new one
      if (id === sessionId) {
        if (updatedHistory.length > 0) {
          loadSession(updatedHistory[0].sessionId);
        } else {
          startNewSession();
        }
      }
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  }, [sessionId, chatHistory, loadSession, startNewSession]);

  // Handle sending a message
  const sendMessage = useCallback(async (messageContent) => {
    if (!messageContent.trim() || isLoading) return;

    try {
      setIsLoading(true);

      // Create a new user message
      const userMessage = createMessage(messageContent, true);
      
      // Add the user message to the state
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Prepare for streaming response
      let aiMessageContent = '';
      let streamingMessageObj = null;

      // Create a callback for handling streaming chunks
      const handleStreamingChunk = (chunk, fullContent) => {
        aiMessageContent = fullContent;
        
        if (!streamingMessageObj) {
          // Create a new AI message for streaming
          streamingMessageObj = createMessage(fullContent, false);
          setStreamingMessage(streamingMessageObj);
        } else {
          // Update the streaming message content
          setStreamingMessage({
            ...streamingMessageObj,
            content: fullContent,
          });
        }
      };

      // Send the message to the API
      await chatService.sendMessage(
        messageContent,
        advisorId,
        thinkMode,
        handleStreamingChunk
      );

      // When streaming is complete, add the AI message to the state
      const aiMessage = createMessage(aiMessageContent, false);
      
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setStreamingMessage(null);
      setIsLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add an error message
      const errorMessage = createMessage(
        'Sorry, there was an error processing your request. Please try again.',
        false
      );
      
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      setStreamingMessage(null);
      setIsLoading(false);
    }
  }, [isLoading, advisorId, thinkMode]);

  // Toggle the expanded state of a think section
  const toggleThinkExpanded = useCallback((messageId) => {
    setExpandedThink((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  }, []);

  return {
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
    deleteSession: deleteSessionById,
    toggleThinkExpanded,
    parseThinkContent,
  };
};

export default useChat;
