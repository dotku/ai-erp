import React from 'react';
import styled from 'styled-components';
import { colors, media, typography } from '../../styles/theme';
import { advisorThemes } from '../../app/utils/advisorThemes';

const ThemeSwitcherContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SwitcherButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: ${colors.text.secondary};
  cursor: pointer;
  padding: 8px;
  font-size: ${typography.fontSize.sm};
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${colors.background.hover};
    color: ${colors.text.primary};
  }
  
  svg {
    margin-right: 6px;
    width: 16px;
    height: 16px;
  }
`;

const ThemeDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  min-width: 220px;
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
  overflow: hidden;
  border: 1px solid ${colors.border.light};
  margin-top: 4px;
`;

const ThemeOption = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${colors.background.hover};
  }
  
  svg {
    margin-right: 10px;
    width: 16px;
    height: 16px;
  }
`;

const ThemeIcon = ({ themeId }) => {
  switch (themeId) {
    case 'general':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'document-analyzer':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 3v4a1 1 0 001 1h4M17 21h-10a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'ask-controllers':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zM3 12h1m17 0h1M5.6 5.6l.7.7m12.1-.7l-.7.7M12 3v1" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'askcba':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 7h6m-6 4h6m-6 4h6m-3-8v8M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'business-risk':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'askp&p':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
  }
};

const ThemeSwitcher = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
  
  const currentThemeInfo = advisorThemes.find(theme => theme.id === currentTheme) || advisorThemes[0];
  
  return (
    <ThemeSwitcherContainer ref={dropdownRef}>
      <SwitcherButton onClick={() => setIsOpen(!isOpen)}>
        <ThemeIcon themeId={currentTheme} />
        {currentThemeInfo.name}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginLeft: '4px', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <polyline points="6 9 12 15 18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></polyline>
        </svg>
      </SwitcherButton>
      
      <ThemeDropdown isOpen={isOpen}>
        {advisorThemes.map(theme => (
          <ThemeOption 
            key={theme.id} 
            onClick={() => {
              onThemeChange(theme.id);
              setIsOpen(false);
            }}
          >
            <ThemeIcon themeId={theme.id} />
            {theme.name}
          </ThemeOption>
        ))}
      </ThemeDropdown>
    </ThemeSwitcherContainer>
  );
};

export default ThemeSwitcher;
