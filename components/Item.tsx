import React from 'react';
import { View, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';
import Video, { OnProgressData, OnLoadData, LoadError, OnSeekData } from 'react-native-video';
import { ItemControls, EItemControlsShow } from './ItemControls';
import { DoubleTap } from './DoubleTap';

export enum EItemType {
  Video,
  Picture,
}

export interface IItem {
  id: number;
  source: string;
  type: EItemType;
  title: string;
  subtitle: string;
  liked: boolean;
  by: {
    name: string;
    id: string;
  };
  views: number;
  points: number;
}

interface IProps {
  index: number;
  item: IItem;
  current: boolean;
  scrolling: boolean;
  onNextSlide: () => void;
}

interface IState {
  loading: boolean;
  paused: boolean;
  seek: number;
  muted: boolean;
  infoShow: EItemControlsShow;
}

const { width, height } = Dimensions.get('window');

export class Item extends React.Component<IProps, IState> {
  state = {
    loading: true,
    paused: false,
    seek: 0,
    muted: true,
    infoShow: EItemControlsShow.Crop,
  };

  player: Video | null = null;

  componentDidMount() {
    if (this.player) {
      this.player.seek(0);
    }
  }

  replay = () => {};

  handleReadyForDisplay = () => {
    this.replay();
  };

  handleOnSeek = (e: OnSeekData) => {};

  handleOnProgress = (e: OnProgressData) => {
    this.setState({ loading: false });
    this.setState({ seek: Math.round((e.currentTime / e.seekableDuration) * 100) });
  };

  handleEnd = () => {
    this.setState({ paused: false });
    this.replay();
    this.props.onNextSlide();
  };

  handleOnLoad = (e: OnLoadData) => {};

  setAllControlsVisible = () => {
    if (this.state.infoShow === EItemControlsShow.Crop) {
      this.setState({ infoShow: EItemControlsShow.Full });
    } else {
      this.setState({ infoShow: EItemControlsShow.Crop });
    }
  };

  handleDoublePress = () => {
    this.setAllControlsVisible();
  };

  handlePressIn = () => {
    this.setState({ paused: true });
  };

  handlePressOut = () => {
    this.setState({ paused: false });
  };

  handleOnError = (e: LoadError) => {};

  render() {
    const { current, scrolling, item } = this.props;
    const { loading, paused, muted, seek, infoShow } = this.state;

    if (current || (scrolling && !current)) {
      return (
        <View style={styles.root}>
          {loading && (
            <View style={styles.loading}>
              <ActivityIndicator color={'#fff'} size='large' />
            </View>
          )}

          {muted && (
            <View style={styles.loading}>
              <Text>Muted</Text>
            </View>
          )}

          <DoubleTap
            onDoubleTap={this.handleDoublePress}
            handlePressIn={this.handlePressIn}
            handlePressOut={this.handlePressOut}
          >
            <Video
              muted={muted}
              paused={paused || !current}
              source={{ uri: item.source }}
              playInBackground={false}
              resizeMode='contain'
              onReadyForDisplay={this.handleReadyForDisplay}
              onProgress={this.handleOnProgress}
              ref={ref => (this.player = ref)}
              onEnd={this.handleEnd}
              onSeek={this.handleOnSeek}
              onLoad={this.handleOnLoad}
              onError={this.handleOnError}
              style={styles.backgroundVideo}
            />
          </DoubleTap>

          <ItemControls show={infoShow} current={current} seek={seek} item={item} />
        </View>
      );
    } else {
      return <View style={styles.root} />;
    }
  }
}

const styles = StyleSheet.create({
  root: {
    width,
    height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'black',
  },

  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [
      {
        translateX: -25,
      },
      {
        translateY: -25,
      },
    ],
    zIndex: 200,
  },

  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
  },
});
