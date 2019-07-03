import React, { FC, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
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
}

const { width, height } = Dimensions.get('window');

export const Item: FC<IProps> = props => {
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);

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
  };

  const handleSetRef = (ref: Video) => {
    player = ref;
  };

  const handleEnd = () => {
    replay();
  };

  const handleOnLoad = (e: OnLoadData) => {
    console.log(e);
  };

  const handleViewPressIn = () => {
    setPaused(true);
  };

  const handleViewPressOut = () => {
    setPaused(false);
  };

  const handleOnError = (e: LoadError) => {};

  return (
    <TouchableWithoutFeedback onPressOut={handleViewPressOut} onPressIn={handleViewPressIn}>
      <View style={styles.root}>
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator color={'#fff'} size='large' />
          </View>
        )}

        <Video
          paused={paused}
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
        />

        <View style={styles.controls}>
          <ItemControls item={props.item} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
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
