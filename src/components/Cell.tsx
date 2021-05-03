import React from 'react';
import styled from 'styled-components';

import roguelikeitems from '../assets/images/roguelikeitems.png';
import { Sprite } from '../components/Sprite';
import { CellContent, CellTile } from '../typings/cell';
import { MoveDirection } from '../typings/moveDirection';
import { Visibility } from '../typings/visibility';
import { Player } from './Player';

interface StylingProps {
  backgroundColor: string;
  cellWidth: number;
  inViewport: boolean;
  color: string;
}

const Wrapper = styled.div<StylingProps>`
  border: solid 1px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: ${(p) => `${p.cellWidth}px`};
  height: ${(p) => `${p.cellWidth}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.backgroundColor};
  font-size: ${(p) => (p.inViewport ? '12px' : '8px')};
  color: ${(p) => p.color};
`;

export interface CellProps {
  content: CellContent;
  moveDirection: MoveDirection;
  tile: CellTile;
  shouldPlayerAnimate: boolean;
  visibility: Visibility;
  cellWidth: number;
  inViewport: boolean;
  handleClick?: () => void;
  revealed: boolean;
}

export const Cell: React.FC<CellProps> = ({
  content,
  moveDirection,
  tile,
  shouldPlayerAnimate,
  visibility,
  cellWidth,
  inViewport,
  handleClick,
  revealed,
}) => {
  const renderPlayer = () => {
    return <Player moveDirection={moveDirection} shouldPlayerAnimate={shouldPlayerAnimate} />;
  };

  const renderContent = () => {
    if (revealed || !inViewport) {
      if (content === 'Sword') {
        return <Sprite imageSrc={roguelikeitems} position={[2, 7]} pixelDimensions={16} />;
      }
      if (content === 'Ruby') {
        return <Sprite imageSrc={roguelikeitems} position={[3, 3]} pixelDimensions={16} />;
      }
      if (content === 'Key') {
        return <Sprite imageSrc={roguelikeitems} position={[11, 3]} pixelDimensions={16} />;
      }
    }
  };

  const renderTile = () => {
    if (tile === '#') {
      if (visibility !== 'dark') {
        return '#';
      }
      return '';
    }
    if (tile === ' ') {
      return '';
    }
    if (tile === '@') {
      return '@';
    }
    if (tile === '.') {
      if (visibility !== 'dark') {
        return '.';
      }
    }
  };

  const renderContentOrTile = () => {
    if (content === 'Player') {
      return renderPlayer();
    }
    if (content !== 0 && (revealed || !inViewport)) {
      return renderContent();
    }
    return renderTile();
  };

  const getBackgroundColor = () => {
    if (!revealed && inViewport) {
      return 'rgb(0,0,0,1)';
    }
    if (tile === '.' || tile === '@') {
      if (visibility === 'clear') {
        return '#131226';
      }
      if (visibility === 'dim') {
        return 'black';
      }
    }
    if (tile === '#') {
      return '#BEB5C4';
    }
    return 'rgb(0,0,0,1)';
  };

  const getFontColor = () => {
    if (tile === '#') {
      return 'black';
    }
    if (visibility === 'dim') {
      return '#555564';
    }
    return 'white';
  };

  return (
    <Wrapper
      onClick={handleClick}
      backgroundColor={getBackgroundColor()}
      cellWidth={cellWidth}
      inViewport={inViewport}
      color={getFontColor()}
    >
      {renderContentOrTile()}
    </Wrapper>
  );
};
