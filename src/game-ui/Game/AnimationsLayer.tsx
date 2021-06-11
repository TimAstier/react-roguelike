import './animations.css';

import React from 'react';

import { ANIMATIONS_DURATION } from '../../constants/config';

interface Props {
  shake: boolean;
  round: number;
}

export const AnimationsLayer: React.FC<Props> = (props) => {
  const [className, setClassName] = React.useState('');

  React.useEffect(() => {
    if (props.shake) {
      setClassName('shake');
      const timer = setTimeout(() => setClassName(''), ANIMATIONS_DURATION);
      return () => {
        clearTimeout(timer);
      };
    }
    setClassName('');
  }, [props.shake, props.round]);

  return <div className={className}>{props.children}</div>;
};
