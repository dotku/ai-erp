/**
 * Storage utilities for chat history
 * Handles saving and loading chat sessions from localStorage
 */

const STORAGE_KEY = 'chatERP-history';

/**
 * Save chat history to localStorage
 * @param {Array} sessions - Array of chat sessions
 */
export const saveChatHistory = (sessions) => {
  try {
    const historyData = {
      sessions,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(historyData));
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
};

/**
 * Load chat history from localStorage
 * @returns {Array} - Array of chat sessions
 */
export const loadChatHistory = () => {
  try {
    const historyData = localStorage.getItem(STORAGE_KEY);
    if (!historyData) {
      return { sessions: [] };
    }
    return JSON.parse(historyData);
  } catch (error) {
    console.error('Error loading chat history:', error);
    return { sessions: [] };
  }
};

/**
 * Save a specific chat session
 * @param {Object} session - The session to save
 * @param {Array} existingSessions - Existing sessions array
 * @returns {Array} - Updated sessions array
 */
export const saveSession = (session, existingSessions = []) => {
  try {
    // Filter out the session if it already exists
    const filteredSessions = existingSessions.filter(
      (s) => s.sessionId !== session.sessionId
    );
    
    // Add the new/updated session at the beginning
    const updatedSessions = [session, ...filteredSessions];
    
    // Save to localStorage
    saveChatHistory(updatedSessions);
    
    return updatedSessions;
  } catch (error) {
    console.error('Error saving session:', error);
    return existingSessions;
  }
};

/**
 * Delete a chat session
 * @param {string} sessionId - ID of the session to delete
 * @param {Array} existingSessions - Existing sessions array
 * @returns {Array} - Updated sessions array
 */
export const deleteSession = (sessionId, existingSessions = []) => {
  try {
    // Filter out the session to delete
    const updatedSessions = existingSessions.filter(
      (s) => s.sessionId !== sessionId
    );
    
    // Save to localStorage
    saveChatHistory(updatedSessions);
    
    return updatedSessions;
  } catch (error) {
    console.error('Error deleting session:', error);
    return existingSessions;
  }
};

/**
 * Generate a unique session ID
 * @returns {string} - A unique session ID
 */
export const generateSessionId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Create a new empty session
 * @param {string} advisorId - ID of the advisor
 * @returns {Object} - New session object
 */
export const createNewSession = (advisorId = 'general') => {
  return {
    sessionId: generateSessionId(),
    advisorId,
    title: `New Chat ${new Date().toLocaleDateString()}`,
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
