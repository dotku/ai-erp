import React from 'react';
import {
  SidebarContainer,
  SidebarHeader,
  SidebarTitle,
  NewChatButton,
  SidebarList,
  SidebarItem,
  SidebarItemTitle,
  SidebarItemActions,
  SidebarItemAction,
  SidebarFooter,
  SidebarCloseButton
} from '../../../styles/components/chat/styles';

/**
 * Sidebar component for chat history and navigation
 * @param {Object} props - Component props
 * @param {Array} props.chatHistory - Array of chat sessions
 * @param {string} props.currentSessionId - ID of the current session
 * @param {function} props.startNewSession - Function to start a new session
 * @param {function} props.clearConversation - Function to clear the current conversation
 * @param {function} props.loadSession - Function to load a session
 * @param {function} props.deleteSession - Function to delete a session
 * @param {boolean} props.showSidebar - Whether the sidebar is visible
 */
const Sidebar = ({
  chatHistory,
  currentSessionId,
  startNewSession,
  clearConversation,
  loadSession,
  deleteSession,
  showSidebar,
  toggleSidebar
}) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <SidebarContainer visible={showSidebar}>
      <SidebarHeader>
        <SidebarTitle>Chat History</SidebarTitle>
        <SidebarCloseButton onClick={toggleSidebar} aria-label="Close sidebar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor" />
          </svg>
        </SidebarCloseButton>
      </SidebarHeader>
      
      <NewChatButton onClick={startNewSession}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
        </svg>
        New Chat
      </NewChatButton>
      
      <SidebarList>
        {chatHistory.length === 0 ? (
          <SidebarItem>
            <SidebarItemTitle>No chat history</SidebarItemTitle>
          </SidebarItem>
        ) : (
          chatHistory.map((session) => (
            <SidebarItem
              key={session.sessionId}
              active={session.sessionId === currentSessionId}
              onClick={() => loadSession(session.sessionId)}
            >
              <SidebarItemTitle>
                {session.title || 'Untitled Chat'}
              </SidebarItemTitle>
              <SidebarItemActions>
                <SidebarItemAction
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSession(session.sessionId);
                  }}
                  aria-label="Delete chat"
                  title="Delete chat"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor" />
                  </svg>
                </SidebarItemAction>
              </SidebarItemActions>
            </SidebarItem>
          ))
        )}
      </SidebarList>
      
      {/* Clear Chat button removed as requested */}
      
      <SidebarFooter>
        ChatERP © {new Date().getFullYear()}
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
