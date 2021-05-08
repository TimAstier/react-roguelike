import FontFaceObserver from 'fontfaceobserver';
import React from 'react';

export const useAreFontLoaded = (): boolean => {
  const [areFontsLoaded, setAreFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    const font = new FontFaceObserver('UglyTerminal');

    Promise.all([font.load()]).then(function () {
      setAreFontsLoaded(true);
    });
  }, []);

  return areFontsLoaded;
};
