/**
 * ChatService.js
 * Service for handling chat interactions with the AI
 */

class ChatService {
  constructor() {
    this.apiUrl = '/api/chat';
  }

  /**
   * Send a message to the AI and get a response
   * @param {string} message - The user's message
   * @param {string} advisorId - The ID of the advisor to use
   * @param {boolean} thinkMode - Whether to include thinking process
   * @param {function} onChunk - Callback for streaming responses
   * @returns {Promise<Object>} - The AI's response
   */
  async sendMessage(message, advisorId = 'general', thinkMode = false, onChunk = null) {
    try {
      // Prepare the request body
      const body = JSON.stringify({
        message,
        advisorId,
        thinkMode,
      });

      // If we're not streaming, use a regular fetch
      if (!onChunk) {
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
      }

      // For streaming responses
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      // Handle the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let fullText = '';

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        
        if (value) {
          const chunk = decoder.decode(value);
          fullText += chunk;
          
          // Call the onChunk callback with the new chunk
          if (onChunk) {
            onChunk(chunk, fullText);
          }
        }
      }

      // Parse the complete response
      try {
        return JSON.parse(fullText);
      } catch (e) {
        // If it's not valid JSON, return the text as is
        return { content: fullText };
      }
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  /**
   * Generate a unique session ID
   * @returns {string} - A unique session ID
   */
  generateSessionId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}

// Export a singleton instance
const chatService = new ChatService();
export default chatService;
