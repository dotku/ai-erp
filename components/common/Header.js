import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { advisorThemes } from '../../app/utils/advisorThemes';
import Logo from './Logo';

// Ensure advisorThemes is defined
const themes = advisorThemes || [];

// Function to get the appropriate icon for each theme
const getThemeIcon = (themeId) => {
  switch(themeId) {
    case 'general':
      return (
        <>
          {/* Chat bubble with question mark for General Assistant */}
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
            fill="currentColor"
          />
        </>
      );
    case 'document-analyzer':
      return (
        <>
          {/* Document with magnifying glass for Document Analyzer */}
          <path
            d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z"
            fill="currentColor"
          />
          <circle cx="13.5" cy="14.5" r="2.5" fill="currentColor" />
          <path d="M15 16l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case 'financial-controller':
    case 'ask-controllers':
      return (
        <>
          {/* Financial chart icon for Financial Controller */}
          <path
            d="M3 13h2v7H3v-7zm4-7h2v14H7V6zm4 3h2v11h-2V9zm4 4h2v7h-2v-7zm4-8h2v15h-2V5z"
            fill="currentColor"
          />
          <path
            d="M19 3H5c-1.1 0-2 .9-2 2v3h2V5h14v14h-6v2h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
            fill="currentColor"
          />
        </>
      );
    case 'budget-admin':
    case 'askcba':
      return (
        <>
          {/* Building/office icon for Budget & Admin */}
          <path
            d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"
            fill="currentColor"
          />
        </>
      );
    case 'blended-finance':
      return (
        <>
          {/* Pie chart for Blended Finance */}
          <path
            d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2 0v8.99h8.99c-.47-4.66-4.22-8.42-8.99-8.99zm0 11.01V22c4.77-.57 8.52-4.33 8.99-8.99H13z"
            fill="currentColor"
          />
        </>
      );
    case 'business-risk':
      return (
        <>
          {/* Shield with exclamation mark for Business Risk */}
          <path
            d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
            fill="currentColor"
          />
          <path
            d="M11 7h2v5h-2zm0 6h2v2h-2z"
            fill="currentColor"
          />
        </>
      );
    default:
      return (
        <path
          d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0"
          stroke="currentColor"
          strokeWidth="2"
        />
      );
  }
};

const HeaderContainer = styled.header`
  background-color: #0a3977;
  color: white;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #062c5e;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;



const AdvisorButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 12px;
  font-size: 14px;
  transition: background-color 0.2s;
  position: relative;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  svg {
    margin-right: 8px;
  }
`;

const ThemeSwitcher = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  cursor: pointer;
  margin-right: 12px;
  font-size: 14px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  svg {
    margin-right: 8px;
  }
`;

const ThemeDropdown = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$isOpen',
})`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1000;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  overflow: hidden;
  border: 1px solid #f0f0f0;
`;

const ThemeItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;
  color: #495057;
  transition: background-color 0.2s;
  background-color: ${(props) => (props.active ? "#f0f7ff" : "transparent")};
  
  &:hover {
    background-color: ${(props) => (props.active ? "#f0f7ff" : "#f8f9fa")};
  }
  
  svg {
    margin-right: 8px;
    color: #0a3977;
  }
`;

const MenuButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const DropdownMenu = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$isOpen' && prop !== '$active',
})`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  min-width: 220px;
  z-index: 1000;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  max-height: calc(100vh - 70px);
  overflow-y: auto;
  overflow: hidden;
  border: 1px solid #f0f0f0;
`;

const MenuItem = styled.a`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: #343a40;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;

  &:hover {
    background-color: #f8f9fa;
  }

  svg {
    margin-right: 10px;
    width: 16px;
    height: 16px;
    opacity: 0.7;
  }
`;

const MenuDivider = styled.div`
  height: 1px;
  background-color: #e9ecef;
  margin: 4px 0;
`;

const Header = ({ 
  activeTab, 
  setActiveTab,
  showSidebar,
  toggleSidebar,
  thinkMode,
  setThinkMode,
  startNewSession,
  clearConversation,
  sessionId,
  advisor
}) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const themeDropdownRef = useRef(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target)) {
        setThemeDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef, themeDropdownRef]);
  
  // Function to handle starting a new chat
  const handleNewChat = () => {
    setMenuOpen(false);
    if (startNewSession) {
      startNewSession();
    }
  };
  
  // Function to clear conversations
  const handleClearConversations = () => {
    setMenuOpen(false);
    if (clearConversation) {
      clearConversation();
    }
  };
  
  // Function to toggle sidebar
  const handleToggleSidebar = () => {
    setMenuOpen(false);
    if (toggleSidebar) {
      toggleSidebar();
    }
  };
  
  // Function to toggle think mode
  const handleToggleThinkMode = () => {
    setMenuOpen(false);
    if (setThinkMode) {
      setThinkMode(!thinkMode);
    }
  };
  
  return (
    <HeaderContainer>
      <LogoWrapper>
        <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
          <Logo inHeader={true} />
        </Link>
      </LogoWrapper>
      
      {/* Advisor selection */}
      <div style={{ marginLeft: 'auto', marginRight: '20px', position: 'relative' }}>
        {advisor && (
          <AdvisorButton onClick={() => setThemeDropdownOpen(!themeDropdownOpen)} ref={themeDropdownRef}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {getThemeIcon(advisor.id)}
            </svg>
            {advisor.name}
            <svg style={{ marginLeft: '8px' }} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10l5 5 5-5z" fill="currentColor" />
            </svg>
            
            <ThemeDropdown $isOpen={themeDropdownOpen}>
              {themes.map(theme => (
                <ThemeItem 
                  key={theme.id} 
                  active={activeTab === theme.id}
                  onClick={() => { 
                    setActiveTab(theme.id);
                    setThemeDropdownOpen(false);
                    // Start a new chat session with the selected advisor
                    if (startNewSession) {
                      startNewSession();
                    }
                    // Navigate to the new advisor URL
                    window.location.href = `/chat/${theme.id}`;
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {getThemeIcon(theme.id)}
                  </svg>
                  {theme.name}
                </ThemeItem>
              ))}
            </ThemeDropdown>
          </AdvisorButton>
        )}
      </div>
      
      {/* Menu Button */}
      <MenuButtonContainer ref={menuRef}>
        <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12h16M4 6h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </MenuButton>
        
        <DropdownMenu $isOpen={menuOpen}>
          <MenuItem as={Link} href="/">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" fill="currentColor" />
            </svg>
            Home
          </MenuItem>
          
          <MenuItem onClick={handleNewChat}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
            </svg>
            New Chat
          </MenuItem>
          
          <MenuDivider />
          
          {/* Chat-specific controls */}
          {toggleSidebar && (
            <MenuItem onClick={handleToggleSidebar}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" fill="currentColor" />
              </svg>
              {showSidebar ? 'Hide Chat History' : 'Show Chat History'}
            </MenuItem>
          )}
          
          {setThinkMode && (
            <MenuItem onClick={handleToggleThinkMode}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" fill="currentColor" />
              </svg>
              {thinkMode ? 'Hide Thinking Process' : 'Show Thinking Process'}
            </MenuItem>
          )}
          
          {themes && themes.length > 0 && (
            <>
              <MenuDivider />
              
              {/* Theme section */}
              <div style={{ padding: '8px 16px', color: '#666', fontSize: '12px', fontWeight: '500' }}>THEME</div>
              
              {themes.map(theme => (
                <MenuItem 
                  key={theme.id} 
                  onClick={() => { 
                    setActiveTab(theme.id);
                    setMenuOpen(false);
                    // Start a new chat session with the selected advisor
                    if (startNewSession) {
                      startNewSession();
                    }
                    // Navigate to the new advisor URL
                    window.location.href = `/chat/${theme.id}`;
                  }}
                  $active={activeTab === theme.id}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {getThemeIcon(theme.id)}
                  </svg>
                  {theme.name}
                  {activeTab === theme.id && (
                    <svg 
                      style={{ marginLeft: 'auto' }} 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
                    </svg>
                  )}
                </MenuItem>
              ))}
            </>
          )}
          
          <MenuDivider />
          
          {clearConversation && sessionId && (
            <MenuItem onClick={handleClearConversations}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor" />
              </svg>
              Clear Chat
            </MenuItem>
          )}
          
          <MenuItem as={Link} href="/settings">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor" />
            </svg>
            Settings
          </MenuItem>
          
          <MenuItem as="a" href="/help">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" fill="currentColor" />
            </svg>
            Help & FAQ
          </MenuItem>
        </DropdownMenu>
      </MenuButtonContainer>
    </HeaderContainer>
  );
}

export default Header;
