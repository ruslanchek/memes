import React, { FC } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Video from 'react-native-video';

export interface IItem {
  id: number;
  source: string;
  backgroundColor: string;
}

interface IProps {
  index: number;
  item: IItem;
}

const { width, height } = Dimensions.get('window');

export const Item: FC<IProps> = props => {
  let player: Video | null = null;

  return (
    <View
      style={[styles.root, { backgroundColor: props.item.backgroundColor }]}
      onTouchStart={() => {
        console.log('x');
      }}
    >
      <Text style={styles.text}>{props.index}</Text>
      <Video
        source={{ uri: props.item.source }}
        ref={ref => {
          player = ref;
        }}
        onBuffer={() => {
          console.log('onBuffer');
        }}
        onError={() => {
          console.log('onError');
        }}
        style={styles.backgroundVideo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width,
    height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 100,
  },

  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
