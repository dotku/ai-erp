/**
 * Message parsing utilities
 * Handles parsing AI messages, especially for think content
 */

/**
 * Parse think content from a message
 * @param {string} content - The message content
 * @returns {Object} - Object with parsed think content and regular content
 */
export const parseThinkContent = (content) => {
  if (!content) {
    return { thinkContent: null, content: '' };
  }

  // Check if the message contains think content with various possible formats
  // This handles both <think>content</think> and content with \n</think>\n
  // First try to match the format with newlines
  const newlineThinkPattern = /(.+?)\n<\/think>\n(.+)/s;
  const newlineMatch = content.match(newlineThinkPattern);

  if (newlineMatch) {
    // Extract the think content and the regular content
    const thinkContent = newlineMatch[1].trim();
    const regularContent = newlineMatch[2].trim();
    
    return {
      thinkContent,
      content: regularContent,
    };
  }

  // If that doesn't match, try the original pattern
  const thinkPattern = /(.*?)<\/think>\s*(.*)/s;
  const match = content.match(thinkPattern);

  if (match) {
    // Extract the think content and the regular content
    const thinkContent = match[1].trim();
    const regularContent = match[2].trim();
    
    return {
      thinkContent,
      content: regularContent,
    };
  }

  // If no think content is found, return the original content
  return {
    thinkContent: null,
    content,
  };
};

/**
 * Format message content with markdown
 * @param {string} content - The message content
 * @returns {string} - Formatted content
 */
export const formatMessageContent = (content) => {
  if (!content) return '';
  
  // We're now using react-markdown, so we just need to return the raw content
  // No need for manual markdown parsing
  return content;
};

/**
 * Create a new message object
 * @param {string} content - The message content
 * @param {boolean} isUser - Whether the message is from the user
 * @returns {Object} - New message object
 */
export const createMessage = (content, isUser = false) => {
  return {
    id: Date.now(),
    content,
    isUser,
    timestamp: new Date(),
  };
};
