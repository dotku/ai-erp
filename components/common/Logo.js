import React from 'react';
import styled from 'styled-components';
import { colors, typography } from '../../styles/theme';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${typography.fontWeight.bold};
  font-size: ${props => props.size === 'large' ? '28px' : '20px'};
  color: white;
  cursor: pointer;
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

const LogoText = styled.span`
  color: white;
  font-weight: ${typography.fontWeight.bold};
  
  /* Apply different styling based on context */
  ${props => props.inHeader ? `
    color: white;
  ` : `
    background: linear-gradient(90deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `}
`;

const Logo = ({ size = 'default', onClick, inHeader = false }) => {
  return (
    <LogoContainer size={size} onClick={onClick}>
      <LogoIcon>
        <svg 
          width={size === 'large' ? '32' : '24'} 
          height={size === 'large' ? '32' : '24'} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {inHeader ? (
            // Light version for dark header background
            <>
              <path 
                d="M21 15C21 16.1046 20.1046 17 19 17H7L3 21V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15Z" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M9 10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10C7 9.44772 7.44772 9 8 9C8.55228 9 9 9.44772 9 10Z" 
                fill="white" 
              />
              <path 
                d="M13 10C13 10.5523 12.5523 11 12 11C11.4477 11 11 10.5523 11 10C11 9.44772 11.4477 9 12 9C12.5523 9 13 9.44772 13 10Z" 
                fill="white" 
              />
              <path 
                d="M17 10C17 10.5523 16.5523 11 16 11C15.4477 11 15 10.5523 15 10C15 9.44772 15.4477 9 16 9C16.5523 9 17 9.44772 17 10Z" 
                fill="white" 
              />
            </>
          ) : (
            // Gradient version for light backgrounds
            <>
              <path 
                d="M21 15C21 16.1046 20.1046 17 19 17H7L3 21V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15Z" 
                stroke="url(#paint0_linear)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M9 10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10C7 9.44772 7.44772 9 8 9C8.55228 9 9 9.44772 9 10Z" 
                fill="url(#paint1_linear)" 
              />
              <path 
                d="M13 10C13 10.5523 12.5523 11 12 11C11.4477 11 11 10.5523 11 10C11 9.44772 11.4477 9 12 9C12.5523 9 13 9.44772 13 10Z" 
                fill="url(#paint2_linear)" 
              />
              <path 
                d="M17 10C17 10.5523 16.5523 11 16 11C15.4477 11 15 10.5523 15 10C15 9.44772 15.4477 9 16 9C16.5523 9 17 9.44772 17 10Z" 
                fill="url(#paint3_linear)" 
              />
              <defs>
                <linearGradient id="paint0_linear" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor={colors.primary.main} />
                  <stop offset="1" stopColor={colors.secondary.main} />
                </linearGradient>
                <linearGradient id="paint1_linear" x1="7" y1="9" x2="9" y2="11" gradientUnits="userSpaceOnUse">
                  <stop stopColor={colors.primary.main} />
                  <stop offset="1" stopColor={colors.secondary.main} />
                </linearGradient>
                <linearGradient id="paint2_linear" x1="11" y1="9" x2="13" y2="11" gradientUnits="userSpaceOnUse">
                  <stop stopColor={colors.primary.main} />
                  <stop offset="1" stopColor={colors.secondary.main} />
                </linearGradient>
                <linearGradient id="paint3_linear" x1="15" y1="9" x2="17" y2="11" gradientUnits="userSpaceOnUse">
                  <stop stopColor={colors.primary.main} />
                  <stop offset="1" stopColor={colors.secondary.main} />
                </linearGradient>
              </defs>
            </>
          )}
        </svg>
      </LogoIcon>
      <LogoText inHeader={inHeader}>ChatERP</LogoText>
    </LogoContainer>
  );
};

export default Logo;
