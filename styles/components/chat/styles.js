import styled from "styled-components";
import { colors, media, typography, shadows } from "../../theme";

/**
 * Styled components for the Chat Interface
 */

// Main container for the chat interface
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 60px);
  background-color: ${colors.background.default};
  overflow: hidden;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const MainContent = styled.div`
  flex: 1;
  margin-left: ${(props) => (props.sidebarVisible ? "280px" : "0")};
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: margin-left 0.3s ease, width 0.3s ease;
  overflow-x: hidden;
  position: relative;
  width: ${(props) => (props.sidebarVisible ? "calc(100% - 280px)" : "100%")};
  right: 0;
  background-color: ${colors.background.paper};
  border-radius: 8px 0 0 0;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.05);

  ${media.md} {
    margin-left: 0;
    width: 100%;
    border-radius: 0;
    transition: none;
  }
`;

// Overlay for mobile when sidebar is visible
export const SidebarOverlay = styled.div`
  display: none;

  ${media.md} {
    display: ${(props) => (props.visible ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 90;
  }
`;

// Close button for sidebar on mobile
export const SidebarCloseButton = styled.button`
  display: none;

  ${media.md} {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: ${colors.text.secondary};
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;

    &:hover {
      background-color: ${colors.background.light};
      color: ${colors.text.primary};
    }
  }
`;

export const MessageListContainer = styled.div`
  flex: 1;
  padding: 0 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  margin: 20px auto;
  position: relative;
  height: calc(100% - 180px);
  padding-bottom: 100px; /* Increased from 40px to 100px for more bottom padding */
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  ${media.md} {
    padding: 0 12px;
    height: calc(100% - 140px);
    padding-bottom: 80px;
  }

  ${media.sm} {
    padding: 0 8px;
    height: calc(100% - 120px);
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

// Keeping ChatMessages for backward compatibility
export const ChatMessages = MessageListContainer;

export const WelcomeMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 600px;
  margin: 4rem auto 2rem;
  padding: 2rem;

  ${media.md} {
    margin: 2rem auto 1.5rem;
    padding: 1rem;
  }

  h1 {
    font-size: ${typography.fontSize["4xl"]};
    margin-bottom: 24px;
    color: ${colors.text.primary};
    font-weight: ${typography.fontWeight.semiBold};

    ${media.md} {
      font-size: ${typography.fontSize["2xl"]};
      margin-bottom: 16px;
    }
  }

  h2 {
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.text.primary};
    font-weight: ${typography.fontWeight.semiBold};
    position: relative;

    ${media.md} {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    /* Remove the default emoji since we're adding them in the component */
    &:before {
      content: "";
    }
  }

  p {
    font-size: ${typography.fontSize.md};
    color: ${colors.text.secondary};
    max-width: 600px;
    margin-top: 1rem;
    line-height: ${typography.lineHeight.relaxed};

    ${media.md} {
      font-size: ${typography.fontSize.sm};
      margin-top: 0.75rem;
      padding: 0 0.5rem;
    }
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.border.light};
  background-color: ${colors.background.default};
`;

export const Tab = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: ${typography.fontSize.sm};
  color: ${(props) =>
    props.active ? colors.secondary.main : colors.text.secondary};
  border-bottom: 2px solid
    ${(props) => (props.active ? colors.secondary.main : "transparent")};
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }

  ${media.md} {
    padding: 10px 12px;
    font-size: ${typography.fontSize.xs};
  }
`;

export const FooterInfo = styled.div`
  text-align: center;
  padding: 8px 0 8px;
  font-size: ${typography.fontSize.xs};
  color: ${colors.text.secondary};
  margin-top: 8px;

  a {
    color: ${colors.secondary.main};
    text-decoration: none;
    margin: 0 4px;
  }
`;

export const ThinkModeToggle = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 0 16px;
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.secondary};
`;

export const InfoTooltip = styled.span`
  position: relative;
  display: inline-block;
  margin-left: 8px;
  cursor: help;

  &:before {
    content: "?";
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    background-color: ${colors.text.secondary};
    border-radius: 50%;
    color: ${colors.common.white};
    font-size: ${typography.fontSize.xs};
    font-weight: ${typography.fontWeight.bold};
  }

  &:hover:after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${colors.text.primary};
    color: ${colors.common.white};
    padding: 6px 10px;
    border-radius: 4px;
    font-size: ${typography.fontSize.xs};
    white-space: nowrap;
    z-index: 100;
    margin-bottom: 5px;
    width: max-content;
    max-width: 250px;
  }
`;

export const SidebarToggle = styled.button`
  background: none;
  border: none;
  color: ${colors.text.secondary};
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typography.fontSize.sm};
  border-radius: 4px;

  &:hover {
    background-color: ${colors.background.light};
    color: ${colors.text.primary};
  }

  svg {
    width: 24px;
    height: 24px;
  }

  ${media.md} {
    padding: 6px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

// Menu toggle for mobile
export const MobileMenuToggle = styled.button`
  background: none;
  border: none;
  color: ${colors.text.secondary};
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  font-size: ${typography.fontSize.sm};

  svg {
    margin-right: 8px;
  }

  &:hover {
    color: ${colors.secondary.main};
  }

  ${media.md} {
    padding: 12px;
    background-color: rgba(13, 110, 253, 0.08);
    border-radius: 4px;
    margin-right: 4px;

    /* Show only the icon on mobile */
    span {
      display: none;
    }

    svg {
      margin-right: 0;
    }
  }
`;

// Message components
export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  max-width: 100%;
`;

export const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 0 4px;

  ${media.md} {
    padding: 0 2px;
  }
`;

export const MessageAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isUser ? colors.background.light : colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  color: ${(props) =>
    props.isUser ? colors.text.primary : colors.common.white};
  font-weight: ${typography.fontWeight.bold};
  font-size: ${typography.fontSize.sm};
  flex-shrink: 0;

  ${media.md} {
    width: 24px;
    height: 24px;
    font-size: ${typography.fontSize.xs};
  }
`;

export const MessageSender = styled.div`
  font-weight: ${typography.fontWeight.medium};
  font-size: ${typography.fontSize.md};
  color: ${colors.text.primary};
  padding: 0 4px;

  ${media.md} {
    font-size: ${typography.fontSize.sm};
  }
`;

export const MessageTime = styled.div`
  font-size: ${typography.fontSize.xs};
  color: ${colors.text.secondary};
  margin-left: auto;
`;

export const MessageContent = styled.div`
  background-color: ${(props) =>
    props.isUser ? colors.background.light : colors.background.paper};
  border: 1px solid
    ${(props) => (props.isUser ? colors.border.light : colors.primary.light)};
  border-radius: 8px;
  padding: 16px;
  color: ${colors.text.primary};
  font-size: ${typography.fontSize.md};
  line-height: ${typography.lineHeight.relaxed};
  max-width: 100%;
  overflow-wrap: break-word;
  margin-top: 4px;

  ${media.md} {
    padding: 12px;
    font-size: ${typography.fontSize.sm};
  }

  p {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  pre {
    background-color: ${colors.background.light};
    padding: 12px;
    border-radius: 4px;
    overflow-x: auto;
    font-family: ${typography.fontFamily.mono};
    font-size: ${typography.fontSize.sm};
    margin: 16px 0;
  }

  code {
    font-family: ${typography.fontFamily.mono};
    font-size: 0.9em;
    background-color: ${colors.background.light};
    padding: 2px 4px;
    border-radius: 3px;
  }
`;

export const ThinkContent = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.secondary};
  position: relative;
  white-space: pre-wrap;

  ${(props) =>
    !props.expanded &&
    `
    max-height: 150px;
    overflow: hidden;
    mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  `}
`;

export const ThinkToggle = styled.button`
  background: none;
  border: none;
  color: ${colors.secondary.main};
  cursor: pointer;
  font-size: ${typography.fontSize.xs};
  padding: 4px 8px;
  margin-top: 4px;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

// Input area components
export const InputContainer = styled.div`
  position: relative;
  padding: 16px;
  background-color: ${colors.background.paper};
  border-top: 1px solid ${colors.border.light};
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  ${media.md} {
    padding: 12px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  }

  ${media.sm} {
    padding: 8px;
  }
`;

export const TextAreaWrapper = styled.div`
  position: relative;
  border: 1px solid ${colors.border.main};
  border-radius: 8px;
  background-color: ${colors.background.paper};
  transition: border-color 0.2s;

  ${media.md} {
    border-radius: 20px;
  }

  &:focus-within {
    border-color: ${colors.secondary.main};
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 56px;
  max-height: 200px;
  padding: 16px 60px 16px 16px;
  border: none;
  border-radius: 8px;
  resize: none;
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize.md};
  line-height: ${typography.lineHeight.normal};
  color: ${colors.text.primary};
  background-color: transparent;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: ${colors.text.disabled};
  }

  ${media.md} {
    padding: 12px 50px 12px 12px;
    font-size: ${typography.fontSize.sm};
  }
`;

export const SendButton = styled.button`
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${colors.secondary.main};
  color: ${colors.common.white};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  ${media.md} {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    right: 6px;
    bottom: 6px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.secondary.dark};
  }

  &:disabled {
    background-color: ${colors.border.main};
    cursor: not-allowed;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  ${media.md} {
    width: 36px;
    height: 36px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

// Sidebar components
export const SidebarContainer = styled.div`
  width: 280px;
  height: calc(100vh - 60px);
  background-color: ${colors.background.paper};
  border-right: 1px solid ${colors.border.light};
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 60px;
  left: ${(props) => (props.visible ? "0" : "-280px")};
  transition: left 0.3s ease;
  z-index: 100; /* Increased z-index to ensure sidebar appears above other content */
  overflow: hidden;
  box-shadow: ${(props) =>
    props.visible ? "2px 0 10px rgba(0, 0, 0, 0.05)" : "none"};

  ${media.md} {
    width: 100%; /* Full width on mobile */
    max-width: 280px;
    left: ${(props) => (props.visible ? "0" : "-100%")};
    box-shadow: ${(props) =>
      props.visible ? "0 0 15px rgba(0, 0, 0, 0.2)" : "none"};
  }
`;

export const SidebarHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${colors.border.light};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SidebarTitle = styled.h2`
  font-size: ${typography.fontSize.lg};
  color: ${colors.text.primary};
  margin: 0;
  font-weight: ${typography.fontWeight.medium};
`;

export const NewChatButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  background-color: ${colors.secondary.main};
  color: ${colors.common.white};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  margin: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.secondary.dark};
  }

  svg {
    margin-right: 8px;
  }
`;

export const SidebarList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

export const SidebarItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.active ? colors.text.primary : colors.text.secondary};
  background-color: ${(props) =>
    props.active ? colors.background.light : "transparent"};
  border-left: 3px solid
    ${(props) => (props.active ? colors.secondary.main : "transparent")};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.background.light};
  }
`;

export const SidebarItemTitle = styled.div`
  font-size: ${typography.fontSize.sm};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

export const SidebarItemActions = styled.div`
  display: flex;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s;

  ${SidebarItem}:hover & {
    opacity: 1;
  }
`;

export const SidebarItemAction = styled.button`
  background: none;
  border: none;
  color: ${colors.text.secondary};
  cursor: pointer;
  padding: 4px;
  margin-left: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: ${colors.text.primary};
  }
`;

export const SidebarFooter = styled.div`
  padding: 12px 16px;
  border-top: 1px solid ${colors.border.light};
  font-size: ${typography.fontSize.xs};
  color: ${colors.text.secondary};
  text-align: center;
`;

// Chat Header Components
// ChatHeader-related styles have been removed as they're no longer needed

export const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.text.secondary};
  padding: 8px;
  border-radius: 4px;

  &:hover {
    background-color: ${colors.background.light};
    color: ${colors.text.primary};
  }

  ${media.md} {
    padding: 6px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

// Dropdown menu styles
export const MenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 220px;
  background-color: ${colors.background.paper};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
  margin-top: 8px;

  ${media.md} {
    right: -8px;
  }
`;

export const MenuItem = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  color: ${colors.text.primary};
  cursor: pointer;
  font-size: ${typography.fontSize.sm};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.background.light};
  }
`;

export const MenuDivider = styled.div`
  height: 1px;
  background-color: ${colors.border.light};
  margin: 4px 0;
`;

export const MenuIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: ${colors.text.secondary};
  width: 20px;
  height: 20px;
`;
