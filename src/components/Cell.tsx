import React from 'react';
import styled from 'styled-components';

import roguelikeitems from '../assets/images/roguelikeitems.png';
import { Sprite } from '../components/Sprite';
import { getTile } from '../constants/tiles';
import { GameAction, gameActions, HoverCellPayload } from '../reducers/game';
import { CellContent } from '../typings/cell';
import { MoveDirection } from '../typings/moveDirection';
import { TileType } from '../typings/tileType';
import { Visibility } from '../typings/visibility';
import { Player } from './Player';

const NON_REVEALED_BACKGROUND_COLOR = 'rgb(0,0,0,1)';

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
  tile: TileType;
  shouldPlayerAnimate: boolean;
  visibility: Visibility;
  cellWidth: number;
  inViewport: boolean;
  handleClick?: () => void;
  revealed: boolean;
  dispatch?: React.Dispatch<GameAction>;
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
  dispatch,
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
      if (visibility !== 'dark' || revealed) {
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
      if (visibility !== 'dark' || revealed) {
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
      return NON_REVEALED_BACKGROUND_COLOR;
    }
    if (visibility === 'clear') {
      return getTile(tile)?.clearBackgroundColor || NON_REVEALED_BACKGROUND_COLOR;
    }
    if (visibility === 'dim' || revealed) {
      return getTile(tile)?.dimBackgroundColor || NON_REVEALED_BACKGROUND_COLOR;
    }
    return NON_REVEALED_BACKGROUND_COLOR;
  };

  const getFontColor = () => {
    if (tile === '#') {
      return 'black';
    }
    if (visibility === 'dim' || revealed) {
      return '#555564';
    }
    return '#5C606A';
  };

  const handleMouseEnter = (payload: HoverCellPayload) => {
    if (dispatch !== undefined) {
      return dispatch(gameActions.hoverCell(payload));
    }
  };

  const handleMouseLeave = () => {
    if (dispatch !== undefined) {
      return dispatch(gameActions.hoverAwayFromCell());
    }
  };

  return (
    <Wrapper
      onMouseEnter={() => handleMouseEnter({ tileType: tile, visibility, revealed, content })}
      onMouseLeave={() => handleMouseLeave()}
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
