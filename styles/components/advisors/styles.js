import styled from "styled-components";
import { colors, media, typography, breakpoints } from "../../theme";

/**
 * Styled components for the Advisor Selection UI
 */

export const AdvisorSelectionContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

export const Title = styled.h1`
  font-size: ${typography.fontSize.xl};
  margin-bottom: 10px;
  color: ${colors.text.primary};
  font-weight: ${typography.fontWeight.semiBold};

  ${media.md} {
    font-size: ${typography.fontSize.lg};
  }
`;

export const Description = styled.p`
  color: ${colors.text.secondary};
  margin-bottom: 30px;
  line-height: ${typography.lineHeight.relaxed};
  font-size: ${typography.fontSize.md};

  ${media.md} {
    font-size: ${typography.fontSize.sm};
    margin-bottom: 24px;
  }
`;

export const AdvisorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 20px;
  margin-top: 20px;

  ${media.md} {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  ${media.sm} {
    gap: 12px;
  }
`;

export const AdvisorCard = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background-color: ${colors.background.paper};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    background-color: ${colors.background.light};
  }

  ${media.md} {
    padding: 16px;
  }

  ${media.sm} {
    padding: 14px 12px;
    border-radius: 6px;
  }

  ${media.xs} {
    padding: 12px 10px;
    border-radius: 4px;
  }
`;

export const AdvisorIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: ${colors.background.light};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  color: ${colors.secondary.main};
  font-size: 24px;
  flex-shrink: 0;

  ${media.md} {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  ${media.xs} {
    width: 36px;
    height: 36px;
    font-size: 18px;
    margin-right: 12px;
  }
`;

export const AdvisorInfo = styled.div`
  flex: 1;
`;

export const AdvisorName = styled.h3`
  font-size: ${typography.fontSize.lg};
  margin-bottom: 8px;
  color: ${colors.text.primary};
  font-weight: ${typography.fontWeight.semiBold};

  ${media.md} {
    font-size: ${typography.fontSize.md};
    margin-bottom: 4px;
  }

  ${media.xs} {
    font-size: ${typography.fontSize.sm};
  }
`;

export const AdvisorDescription = styled.p`
  color: ${colors.text.secondary};
  font-size: ${typography.fontSize.sm};
  line-height: ${typography.lineHeight.normal};

  ${media.md} {
    font-size: ${typography.fontSize.xs};
    line-height: 1.4;
  }

  ${media.xs} {
    line-height: 1.3;
  }
`;

// Home page specific advisor components
export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);
  padding: 20px;
  background-color: ${colors.background.default};
  overflow-y: auto;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  
  ${media.md} {
    padding: 16px 12px;
    height: calc(100vh - 60px);
    justify-content: flex-start;
    padding-bottom: 40px;
  }
  
  ${media.sm} {
    padding: 12px 10px;
    padding-bottom: 30px;
  }
  
  ${media.xs} {
    padding: 10px 8px;
    padding-bottom: 24px;
  }
`;

export const HomeCard = styled.div`
  background-color: ${colors.background.paper};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 32px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;
  
  ${media.md} {
    padding: 24px 16px;
    margin-top: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    max-width: 100%;
    width: 100%;
  }
  
  ${media.sm} {
    padding: 20px 14px;
    margin-top: 8px;
    border-radius: 6px;
  }
  
  ${media.xs} {
    padding: 16px 12px;
    width: 100%;
    border-radius: 4px;
  }
`;

export const HomeAdvisorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  width: 100%;
  margin-top: 24px;
  box-sizing: border-box;
  max-width: 100%;
  
  ${media.md} {
    grid-template-columns: 1fr;
    gap: 14px;
    margin-top: 20px;
    width: 100%;
    padding: 0;
  }
  
  ${media.sm} {
    gap: 12px;
    margin-top: 16px;
  }
  
  ${media.xs} {
    gap: 10px;
    margin-top: 14px;
  }
  
  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const HomeAdvisorCard = styled.div`
  background-color: ${colors.background.paper};
  border: 1px solid ${colors.border.light};
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    border-color: ${colors.primary.main};
  }
  
  &:active {
    transform: translateY(0);
    background-color: ${colors.background.light};
  }
  
  ${media.md} {
    padding: 16px;
    flex-direction: row;
    align-items: center;
    text-align: left;
    width: 100%;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  ${media.sm} {
    padding: 14px 12px;
    border-radius: 6px;
  }
  
  ${media.xs} {
    padding: 12px 10px;
    border-radius: 4px;
  }
`;

export const HomeAdvisorIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
  
  ${media.md} {
    font-size: 28px;
    margin-bottom: 0;
    margin-right: 16px;
  }
  
  ${media.xs} {
    font-size: 24px;
    margin-right: 12px;
    flex-shrink: 0;
  }
`;

export const HomeAdvisorName = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
  color: ${colors.text.primary};
  
  ${media.md} {
    font-size: 16px;
    margin-bottom: 4px;
  }
`;

export const HomeAdvisorDescription = styled.p`
  font-size: 14px;
  color: ${colors.text.secondary};
  text-align: center;
  
  ${media.md} {
    font-size: 13px;
    text-align: left;
    margin-top: 4px;
    line-height: 1.4;
  }
  
  ${media.sm} {
    font-size: 12.5px;
    line-height: 1.35;
    margin-top: 3px;
  }
  
  ${media.xs} {
    font-size: 12px;
    line-height: 1.3;
    max-width: calc(100% - 36px);
  }
`;
