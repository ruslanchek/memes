import React, { FC, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import Video, { OnProgressData, OnLoadData, LoadError, OnSeekData } from 'react-native-video';
import { ItemControls } from './ItemControls';

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

const { width, height } = Dimensions.get('window');

export const Item: FC<IProps> = props => {
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [seek, setSeek] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(true);
  const [info, setInfo] = useState(false);
  const [infoAnimated, setInfoAnimated] = useState(new Animated.Value(0));

  let player: Video | null = null;

  useEffect(() => {
    setLoading(true);
  }, []);

  const replay = () => {
    if (player) {
      player.seek(0);
    }
  };

  const handleReadyForDisplay = () => {
    replay();
  };

  const handleOnSeek = (e: OnSeekData) => {};

  const handleOnProgress = (e: OnProgressData) => {
    setLoading(false);

    const seekPercent = Math.round((e.currentTime / e.seekableDuration) * 100);

    setSeek(seekPercent);
  };

  const handleSetRef = (ref: Video) => {
    player = ref;
  };

  const handleEnd = () => {
    setPaused(true);
    replay();
    props.onNextSlide();
  };

  const handleOnLoad = (e: OnLoadData) => {
    setDuration(e.duration);
  };

  const handleViewPressIn = () => {
    setPaused(true);

    Animated.spring(infoAnimated, {
      toValue: 1,
      mass: 0.06,
      damping: 350,
      stiffness: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleViewPressOut = () => {
    setPaused(false);

    Animated.spring(infoAnimated, {
      toValue: 0,
      mass: 0.06,
      damping: 350,
      stiffness: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleViewLongPress = () => {
    // setMuted(!muted);
  };

  const handleOnError = (e: LoadError) => {};

  if (props.current || (props.scrolling && !props.current)) {
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

        <TouchableWithoutFeedback
          onPressOut={handleViewPressOut}
          onPressIn={handleViewPressIn}
          onLongPress={handleViewLongPress}
        >
          <View style={styles.backgroundVideo} />
          {/* <Video
            muted={muted}
            paused={paused || !props.current}
            source={{ uri: props.item.source }}
            playInBackground={false}
            resizeMode='cover'
            onReadyForDisplay={handleReadyForDisplay}
            onProgress={handleOnProgress}
            ref={handleSetRef}
            onEnd={handleEnd}
            onSeek={handleOnSeek}
            onLoad={handleOnLoad}
            onError={handleOnError}
            style={styles.backgroundVideo}
          /> */}
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.controls,
            {
              // opacity: infoAnimated,
              transform: [
                {
                  translateY: infoAnimated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [190, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <ItemControls current={props.current} seek={seek} item={props.item} />
        </Animated.View>
      </View>
    );
  } else {
    return <View style={styles.root} />;
  }
};

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

  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 300,
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
