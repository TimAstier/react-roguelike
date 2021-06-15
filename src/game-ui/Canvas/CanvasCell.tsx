import Konva from 'konva';
import React from 'react';
import { Circle, Group, Image, Rect, Text } from 'react-konva';

import { CELL_WIDTH_IN_PIXELS } from '../../constants/config';
import { ANIMATIONS_DURATION } from '../../constants/config';
import { CREATURES } from '../../constants/creatures';
import { getItem } from '../../constants/items';
import {
  DEFAULT_FONT_COLOR,
  getTile,
  NON_REVEALED_BACKGROUND_COLOR,
  TileType,
} from '../../constants/tiles';
import { GameAction, gameActions } from '../../game-logic/game';
import { HoverCellPayload } from '../../game-logic/reduceHoverCell';
import { CellContent, CreatureData } from '../../typings/cell';
import { Hit } from '../../typings/hit';
import { Position } from '../../typings/position';
import { Visibility } from '../../typings/visibility';
import { Flame } from './Flame';

export interface CellProps {
  content: CellContent;
  tileType: TileType;
  visibility: Visibility;
  revealed: boolean;
  dispatch: React.Dispatch<GameAction>;
  position: Position;
  itemsImage: HTMLImageElement | undefined;
  flameImage: HTMLImageElement | undefined;
  creaturesImage: HTMLImageElement | undefined;
  burning: boolean;
  creature?: CreatureData;
  hitsLastRound: Hit[];
  round: number;
  creatureDiedThisRound: boolean;
  highlighted: boolean;
}

export const CanvasCell: React.FC<CellProps> = ({
  content,
  tileType,
  visibility,
  revealed,
  dispatch,
  position,
  itemsImage,
  flameImage,
  burning,
  creature,
  creaturesImage,
  hitsLastRound,
  round,
  highlighted,
  creatureDiedThisRound,
}) => {
  const [hasBlinked, setHasBlinked] = React.useState(false);
  const imageRef = React.useRef<Konva.Image>(null);
  const item = content !== 0 && content !== 'Player' ? getItem(content) : '';
  const tile = getTile(tileType);

  const wasHitLastRound = hitsLastRound.filter((h) => h.creatureId === creature?.id).length !== 0;
  const shouldBlink = wasHitLastRound && !hasBlinked;

  const getBackgroundColor = () => {
    if (!revealed && visibility === 'dark') {
      return NON_REVEALED_BACKGROUND_COLOR;
    }
    if (visibility === 'clear') {
      return tile?.clearBackgroundColor || NON_REVEALED_BACKGROUND_COLOR;
    }
    if (visibility === 'dim' || revealed) {
      return tile?.dimBackgroundColor || NON_REVEALED_BACKGROUND_COLOR;
    }
    return NON_REVEALED_BACKGROUND_COLOR;
  };

  React.useEffect(() => {
    setHasBlinked(false);
  }, [round]);

  React.useEffect(() => {
    // TODO: UseBlink and use same logic for Player?
    if (imageRef.current) {
      if (creature) {
        if (shouldBlink) {
          const tween = new Konva.Tween({
            node: imageRef.current,
            duration: ANIMATIONS_DURATION / 1000,
            easing: Konva.Easings.BounceEaseInOut,
            fill: getBackgroundColor(),
            onFinish: () => setHasBlinked(true),
          });
          tween.play();
          return () => {
            tween.pause();
          };
        }
      }
    }
  }, [creature, round, shouldBlink]);

  const renderFlame = () => (
    <Flame flameImage={flameImage} position={position} opacity={visibility === 'dim' ? 0.3 : 1} />
  );

  const getFontColor = () => {
    if (burning && visibility !== 'dark') {
      return 'white';
    }
    if (visibility === 'clear') {
      return tile?.clearFontColor || DEFAULT_FONT_COLOR;
    }
    if (visibility === 'dim' || revealed) {
      return tile?.dimFontColor || DEFAULT_FONT_COLOR;
    }
    return DEFAULT_FONT_COLOR;
  };

  const Item = () => {
    // TODO DRY with Creature
    if (content !== 0 && content !== 'Player') {
      if (visibility === 'dark' && !revealed) {
        return null;
      }
      if (visibility === 'dim' && !revealed) {
        return (
          <Circle
            x={position[0] * CELL_WIDTH_IN_PIXELS + CELL_WIDTH_IN_PIXELS / 2}
            y={position[1] * CELL_WIDTH_IN_PIXELS + CELL_WIDTH_IN_PIXELS / 2}
            radius={5}
            fill={DEFAULT_FONT_COLOR}
            opacity={0.3}
          />
        );
      }

      let opacity = 0;
      if (visibility === 'clear') {
        opacity = 1;
      } else if (visibility === 'dim' || revealed) {
        opacity = 0.3;
      }
      return item ? (
        <Image
          x={position[0] * CELL_WIDTH_IN_PIXELS + (CELL_WIDTH_IN_PIXELS - 16) / 2}
          y={position[1] * CELL_WIDTH_IN_PIXELS + (CELL_WIDTH_IN_PIXELS - 16) / 2}
          image={itemsImage}
          width={16}
          height={16}
          opacity={opacity}
          crop={{
            x: item.spritePosition[0] * 16,
            y: item.spritePosition[1] * 16,
            width: 16,
            height: 16,
          }}
        />
      ) : null;
    }
    return null;
  };

  const Creature = () => {
    // TODO DRY with Item
    // Unlike items, we don't "remember" creatures
    if (creature) {
      if (visibility === 'dark') {
        return null;
      }
      if (visibility === 'dim') {
        return (
          <Circle
            x={position[0] * CELL_WIDTH_IN_PIXELS + CELL_WIDTH_IN_PIXELS / 2}
            y={position[1] * CELL_WIDTH_IN_PIXELS + CELL_WIDTH_IN_PIXELS / 2}
            radius={5}
            fill={'orange'}
            opacity={0.3}
          />
        );
      }

      let opacity = 0;
      if (visibility === 'clear') {
        opacity = 1;
      } else if (visibility === 'dim') {
        opacity = 0.3;
      }
      const spritePosition = CREATURES[creature.type].spritePosition;
      return (
        <Image
          ref={imageRef}
          x={position[0] * CELL_WIDTH_IN_PIXELS + 1}
          y={position[1] * CELL_WIDTH_IN_PIXELS + 1}
          image={creaturesImage}
          width={CELL_WIDTH_IN_PIXELS - 3}
          height={CELL_WIDTH_IN_PIXELS - 3}
          opacity={opacity}
          fill={shouldBlink ? 'red' : getBackgroundColor()}
          crop={{
            x: spritePosition[0] * 16,
            y: spritePosition[1] * 16,
            width: 16,
            height: 16,
          }}
        />
      );
    }
    return null;
  };

  const renderTile = () => {
    if (visibility !== 'dark' || revealed) {
      return (
        <Text
          x={position[0] * CELL_WIDTH_IN_PIXELS + 7}
          y={position[1] * CELL_WIDTH_IN_PIXELS + 8}
          text={tileType}
          fontFamily="UglyTerminal"
          fontSize={16}
          fill={getFontColor()}
        />
      );
    }
  };

  const renderDeadCreature = () => {
    let opacity = 0;
    if (visibility === 'clear') {
      opacity = 1;
    } else if (visibility === 'dim') {
      opacity = 0.3;
    }

    return (
      <Image
        ref={imageRef}
        x={position[0] * CELL_WIDTH_IN_PIXELS + 1}
        y={position[1] * CELL_WIDTH_IN_PIXELS + 1}
        image={itemsImage}
        width={CELL_WIDTH_IN_PIXELS - 2}
        height={CELL_WIDTH_IN_PIXELS - 2}
        opacity={opacity}
        fill={wasHitLastRound ? 'red' : getBackgroundColor()}
        crop={{
          x: 12 * 16,
          y: 9 * 16,
          width: 16,
          height: 16,
        }}
      />
    );
  };

  const renderContentOrTile = () => {
    if (creatureDiedThisRound) {
      return renderDeadCreature();
    }

    if (visibility !== 'dark' && creature) {
      return <Creature />;
    }

    if (visibility !== 'dark' && burning) {
      return renderFlame();
    }

    if (content !== 0 && content !== 'Player') {
      return <Item />;
    }
    return renderTile();
  };

  const handleMouseEnter = (payload: HoverCellPayload) => {
    return dispatch(gameActions.hoverCell(payload));
  };

  const handleMouseLeave = () => {
    return dispatch(gameActions.hoverAwayFromCell());
  };

  return (
    <Group
      onMouseEnter={() =>
        handleMouseEnter({
          tileType,
          visibility,
          revealed,
          content,
          burning,
          creature,
          creatureDiedThisRound,
        })
      }
      onMouseLeave={() => handleMouseLeave()}
    >
      <Rect
        width={CELL_WIDTH_IN_PIXELS - 1}
        height={CELL_WIDTH_IN_PIXELS - 1}
        fill={getBackgroundColor()}
        x={position[0] * CELL_WIDTH_IN_PIXELS}
        y={position[1] * CELL_WIDTH_IN_PIXELS}
        stroke={highlighted ? 'white' : 'rgba(0, 0, 0, 0.1)'}
        strokeWidth={2}
      />
      {renderContentOrTile()}
    </Group>
  );
};
