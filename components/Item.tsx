import React from 'react';
import { View, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';
import Video, { OnProgressData, OnLoadData, LoadError, OnSeekData } from 'react-native-video';
import { VideoContext, IVideoContext } from './HomeScreen';

export enum EItemType {
  Video,
  Picture,
}

export interface IItem {
  id: number;
  source: string;
  poster: string;
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
}

interface IState {
  loading: boolean;
  paused: boolean;
}

const { width, height } = Dimensions.get('window');

export class Item extends React.Component<IProps, IState> {
  state = {
    loading: true,
    paused: false,
  };

  player: Video | null = null;
  videoContext: IVideoContext | null = null;

  componentDidMount() {
    this.replay();
  }

  replay = () => {
    if (this.player) {
      this.player.seek(0);
    }
  };

  handleReadyForDisplay = () => {
    this.replay();
  };

  handleOnSeek = (e: OnSeekData) => {};

  handleOnProgress = (e: OnProgressData) => {
    this.setState({ loading: false });

    if (this.videoContext) {
      this.videoContext.setCurrentSeek(Math.round((e.currentTime / e.seekableDuration) * 100));
    }
  };

  handleEnd = () => {
    this.replay();

    if (this.videoContext) {
      this.videoContext.onNextSlide();
    }
  };

  handleOnLoad = (e: OnLoadData) => {};

  handlePressIn = () => {
    this.setState({ paused: true });
  };

  handlePressOut = () => {
    this.setState({ paused: false });
  };

  handleOnError = (e: LoadError) => {};

  render() {
    const { item, index } = this.props;
    const { loading, paused } = this.state;

    return (
      <View style={styles.root}>
        <VideoContext.Consumer>
          {videoContext => {
            if (!this.videoContext) {
              this.videoContext = videoContext;
            }

            const current = index === videoContext.currentItemIndex;

            if (current || (videoContext.isScrolling && !current)) {
              return (
                <View style={styles.root}>
                  {loading && (
                    <View style={styles.loading}>
                      <ActivityIndicator color={'#fff'} size='large' />
                    </View>
                  )}

                  <Video
                    muted={videoContext.isMuted}
                    poster={item.poster}
                    paused={paused || !current}
                    source={{ uri: item.source }}
                    playInBackground={false}
                    resizeMode='cover'
                    posterResizeMode='cover'
                    onReadyForDisplay={this.handleReadyForDisplay}
                    onProgress={this.handleOnProgress}
                    ref={ref => (this.player = ref)}
                    onEnd={this.handleEnd}
                    onSeek={this.handleOnSeek}
                    onLoad={this.handleOnLoad}
                    onError={this.handleOnError}
                    style={styles.backgroundVideo}
                  />
                </View>
              );
            } else {
              return null;
            }
          }}
        </VideoContext.Consumer>
      </View>
    );
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
