import React from 'react';

// Since Chrome disables auto play until user has interacted with window,
// we can only load music only after user has clicked or pressed a key

export const useDetectUserInput = () => {
  const [didUserInput, setDidUserInput] = React.useState(false);

  const handleKeyPress = () => {
    setDidUserInput(true);
    window.removeEventListener('mousedown', handleKeyPress);
    window.removeEventListener('keydown', handleKeyPress);
  };

  React.useEffect(() => {
    window.addEventListener('mousedown', handleKeyPress);
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('mousedown', handleKeyPress);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return didUserInput;
};
