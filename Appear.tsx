import React from 'react';
import { Animated, StyleSheet } from 'react-native';

export type TAppearType = 'spring' | 'fade' | 'drop' | 'soarUp';

interface IProps {
  show: boolean;
  type: TAppearType;
  customStyles?: any;
  isReverse?: boolean;
  delay?: number;
}

interface IState {
  animated: Animated.Value;
}

export class Appear extends React.Component<IProps, IState> {
  state = {
    animated: new Animated.Value(0),
  };

  componentDidMount() {
    if (this.props.show) {
      this.in();
    }
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.show !== this.props.show) {
      if (nextProps.show) {
        this.in();
      } else {
        this.out();
      }
    }
  }

  get delay(): number {
    let delay = 0;

    if (this.props.delay && this.props.delay > 0) {
      delay = this.props.delay;
    }

    return delay;
  }

  in() {
    switch (this.props.type) {
      case 'fade': {
        Animated.timing(this.state.animated, {
          toValue: 1,
          delay: this.delay,
          duration: 200,
          useNativeDriver: true,
        }).start();
        break;
      }

      case 'soarUp': {
        Animated.spring(this.state.animated, {
          toValue: 1,
          delay: this.delay,
          mass: 1,
          stiffness: 200,
          damping: 20,
          useNativeDriver: true,
        }).start();
        break;
      }

      case 'spring':
      case 'drop':
      default: {
        Animated.spring(this.state.animated, {
          toValue: 1,
          delay: this.delay,
          tension: 92,
          useNativeDriver: true,
        }).start();
        break;
      }
    }
  }

  out() {
    switch (this.props.type) {
      case 'fade': {
        Animated.timing(this.state.animated, {
          toValue: 0,
          duration: 200,
          delay: this.delay,
          useNativeDriver: true,
        }).start();
        break;
      }

      case 'soarUp': {
        Animated.spring(this.state.animated, {
          toValue: 0,
          delay: this.delay,
          mass: 1,
          stiffness: 200,
          damping: 20,
          useNativeDriver: true,
        }).start();
        break;
      }

      case 'spring':
      case 'drop':
      default: {
        Animated.spring(this.state.animated, {
          toValue: 0,
          tension: 92,
          delay: this.delay,
          useNativeDriver: true,
        }).start();
        break;
      }
    }
  }

  get transformInterpolation() {
    const { animated } = this.state;
    const { type } = this.props;

    switch (type) {
      case 'drop': {
        return [
          {
            translateY: animated.interpolate({
              inputRange: [0, 1],
              outputRange: [-10, 0],
            }),
          },
        ];
      }

      default: {
        return [
          {
            scale: animated.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1],
            }),
          },
        ];
      }
    }
  }

  render() {
    const { animated } = this.state;
    const { customStyles, children, type } = this.props;

    return (
      <Animated.View
        style={[
          styles.container,
          customStyles,
          {
            opacity: animated,
            transform: this.transformInterpolation,
          },
        ]}
      >
        {children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
