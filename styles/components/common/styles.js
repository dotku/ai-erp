import styled from "styled-components";
import { colors, media, typography } from "../../theme";

/**
 * Styled components for common UI elements
 */

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  background-color: ${colors.background.paper};
  border-bottom: 1px solid ${colors.border.light};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
  
  img {
    height: 32px;
    margin-right: 10px;
  }
  
  ${media.md} {
    font-size: ${typography.fontSize.lg};
    
    img {
      height: 28px;
    }
  }
`;

export const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
`;

export const NavLink = styled.a`
  color: ${colors.text.secondary};
  font-size: ${typography.fontSize.sm};
  margin-left: 24px;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: ${colors.secondary.main};
  }
  
  &.active {
    color: ${colors.secondary.main};
    font-weight: ${typography.fontWeight.medium};
  }
  
  ${media.md} {
    margin-left: 16px;
    font-size: ${typography.fontSize.xs};
  }
`;

export const HeaderButton = styled.button`
  background: none;
  border: none;
  color: ${colors.text.secondary};
  font-size: ${typography.fontSize.sm};
  margin-left: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${colors.background.light};
    color: ${colors.text.primary};
  }
  
  svg {
    margin-right: 6px;
  }
  
  ${media.md} {
    padding: 6px;
    margin-left: 12px;
    
    span {
      display: none;
    }
    
    svg {
      margin-right: 0;
    }
  }
`;

export const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${colors.primary.main};
  color: ${colors.common.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${typography.fontWeight.bold};
  font-size: ${typography.fontSize.sm};
  cursor: pointer;
`;

export const UserMenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: ${colors.background.paper};
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 200px;
  z-index: 101;
  overflow: hidden;
  display: ${props => props.open ? 'block' : 'none'};
`;

export const UserMenuHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${colors.border.light};
  
  h4 {
    margin: 0 0 4px;
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.medium};
    color: ${colors.text.primary};
  }
  
  p {
    margin: 0;
    font-size: ${typography.fontSize.xs};
    color: ${colors.text.secondary};
  }
`;

export const UserMenuItem = styled.a`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: ${colors.text.primary};
  font-size: ${typography.fontSize.sm};
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${colors.background.light};
  }
  
  svg {
    margin-right: 12px;
    color: ${colors.text.secondary};
  }
`;

export const Divider = styled.div`
  height: 1px;
  background-color: ${colors.border.light};
  margin: 4px 0;
`;

// Layout components
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 60px; /* Header height */
`;

export const MainContainer = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  
  ${media.md} {
    padding: 16px;
  }
  
  ${media.sm} {
    padding: 12px;
  }
`;

export const PageTitle = styled.h1`
  font-size: ${typography.fontSize["3xl"]};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
  margin-bottom: 24px;
  
  ${media.md} {
    font-size: ${typography.fontSize["2xl"]};
    margin-bottom: 16px;
  }
`;

export const PageDescription = styled.p`
  font-size: ${typography.fontSize.md};
  color: ${colors.text.secondary};
  margin-bottom: 32px;
  max-width: 800px;
  line-height: ${typography.lineHeight.relaxed};
  
  ${media.md} {
    font-size: ${typography.fontSize.sm};
    margin-bottom: 24px;
  }
`;

export const Card = styled.div`
  background-color: ${colors.background.paper};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 24px;
  margin-bottom: 24px;
  
  ${media.md} {
    padding: 16px;
    margin-bottom: 16px;
  }
`;

export const CardTitle = styled.h2`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.semiBold};
  color: ${colors.text.primary};
  margin-bottom: 16px;
  
  ${media.md} {
    font-size: ${typography.fontSize.lg};
    margin-bottom: 12px;
  }
`;

export const CardContent = styled.div`
  color: ${colors.text.primary};
  font-size: ${typography.fontSize.md};
  line-height: ${typography.lineHeight.normal};
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  background-color: ${props => props.secondary ? colors.background.light : colors.secondary.main};
  color: ${props => props.secondary ? colors.text.primary : colors.common.white};
  border: ${props => props.secondary ? `1px solid ${colors.border.main}` : 'none'};
  border-radius: 6px;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.secondary ? colors.border.light : colors.secondary.dark};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  svg {
    margin-right: 8px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  
  ${media.sm} {
    flex-direction: ${props => props.vertical ? 'column' : 'row'};
    gap: 8px;
  }
`;

export const Footer = styled.footer`
  padding: 24px;
  background-color: ${colors.background.default};
  border-top: 1px solid ${colors.border.light};
  text-align: center;
  
  p {
    margin: 0;
    font-size: ${typography.fontSize.sm};
    color: ${colors.text.secondary};
  }
  
  a {
    color: ${colors.secondary.main};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;
