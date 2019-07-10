import React from 'react';
import { Animated, StyleSheet } from 'react-native';

interface IProps {
  show: boolean;
  type: 'spring' | 'fade' | 'drop' | 'soarUp';
  customStyles?: any;
  isReverse?: boolean;
  delay?: number;
}

interface IState {
  animated: Animated.Value;
  dismount: boolean;
}

export class Appear extends React.Component<IProps, IState> {
  state = {
    animated: new Animated.Value(0),
    dismount: this.props.show,
  };

  componentDidMount() {
    if (this.props.show) {
      this.in();
    }
  }

  shouldComponentUpdate(nexProps: IProps, nextState: IState): boolean {
    return nexProps.show !== this.props.show;
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
    this.setMounted();

    switch (this.props.type) {
      case 'fade': {
        Animated.timing(this.state.animated, {
          toValue: 1,
          delay: this.delay,
          duration: 180,
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
          duration: 180,
          useNativeDriver: true,
        }).start(this.setUnmounted);
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
        }).start(this.setUnmounted);
        break;
      }

      case 'spring':
      case 'drop':
      default: {
        Animated.spring(this.state.animated, {
          toValue: 0,
          tension: 92,
          useNativeDriver: true,
        }).start(this.setUnmounted);
        break;
      }
    }
  }

  setMounted = () => {
    this.setState({
      dismount: false,
    });
  };

  setUnmounted = () => {
    this.setState({
      dismount: true,
    });
  };

  get transform() {
    switch (this.props.type) {
      case 'drop': {
        return {
          translateY: this.state.animated.interpolate({
            inputRange: [0, 1],
            outputRange: [-10, 0],
          }),
        };
      }

      case 'soarUp': {
        return [
          {
            translateY: this.state.animated.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          },
        ];
      }

      default: {
        return [
          {
            scale: this.state.animated.interpolate({
              inputRange: [0, 1],
              outputRange: [0.95, 1],
            }),
          },
        ];
      }
    }
  }

  render() {
    const { animated, dismount } = this.state;
    const { customStyles, children, type } = this.props;

    if (dismount) {
      return null;
    }

    return (
      <Animated.View
        style={[
          styles.container,
          customStyles,
          {
            opacity: animated,
            transform: this.transform,
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
