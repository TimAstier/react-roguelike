import './shake.css';

import React from 'react';

import { ANIMATIONS_DURATION } from '../../constants/config';

interface Props {
  shake: boolean;
  round: number;
}

export const ShakeLayer: React.FC<Props> = (props) => {
  const [shakeClass, setShakeClass] = React.useState('');

  React.useEffect(() => {
    if (props.shake) {
      setShakeClass('shake');
      const timer = setTimeout(() => setShakeClass(''), ANIMATIONS_DURATION);
      return () => {
        clearTimeout(timer);
      };
    }
    setShakeClass('');
  }, [props.shake, props.round]);

  return <div className={shakeClass}>{props.children}</div>;
};
