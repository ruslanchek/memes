import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';

const DOUBLE_PRESS_DELAY = 300;

interface IProps {
  onDoubleTap: () => void;
  handlePressOut: () => void;
  handlePressIn: () => void;
}

export const DoubleTap: React.FC<IProps> = props => {
  let [lastTap, setLastTap] = useState(Date.now());

  const handleDoubleTap = () => {
    const now = Date.now();

    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      props.onDoubleTap();
    } else {
      setLastTap(now);
      props.handlePressIn();
    }
  };

  return (
    <TouchableWithoutFeedback onPressOut={props.handlePressOut} onPressIn={handleDoubleTap}>
      {props.children}
    </TouchableWithoutFeedback>
  );
};