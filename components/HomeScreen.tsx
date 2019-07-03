import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Item, IItem, EItemType } from './Item';

interface IProps {}

interface IState {
  currentItemIndex: number;
  offset: number;
}

const DATA: IItem[] = [
  {
    id: 1,
    source: 'https://i.imgur.com/SsCrymL.mp4',
    type: EItemType.Video,
    title: 'Strange Rain',
    subtitle: 'Strange rain on the road in China',
    liked: false,
    by: {
      name: 'kbowser',
      id: '14432dsd3409dfsj3lk24n1k29098cx82',
    },
    views: 4503,
    points: 48,
  },

  {
    id: 2,
    source: 'https://i.imgur.com/uB8oZY7.mp4',
    type: EItemType.Video,
    title: 'Strange Rain',
    subtitle: 'Strange rain on the road in China',
    liked: false,
    by: {
      name: 'kbowser',
      id: '14432dsd3409dfsj3lk24n1k29098cx82',
    },
    views: 4503,
    points: 48,
  },

  {
    id: 3,
    source: 'https://i.imgur.com/JjMay6m.mp4',
    type: EItemType.Video,
    title: 'Strange Rain',
    subtitle: 'Strange rain on the road in China',
    liked: false,
    by: {
      name: 'kbowser',
      id: '14432dsd3409dfsj3lk24n1k29098cx82',
    },
    views: 4503,
    points: 48,
  },

  {
    id: 4,
    source: 'https://i.imgur.com/6MQLdNB.mp4',
    type: EItemType.Video,
    title: 'Strange Rain',
    subtitle: 'Strange rain on the road in China',
    liked: false,
    by: {
      name: 'kbowser',
      id: '14432dsd3409dfsj3lk24n1k29098cx82',
    },
    views: 4503,
    points: 48,
  },

  {
    id: 5,
    source: 'https://i.imgur.com/SsCrymL.mp4',
    type: EItemType.Video,
    title: 'Strange Rain',
    subtitle: 'Strange rain on the road in China',
    liked: false,
    by: {
      name: 'kbowser',
      id: '14432dsd3409dfsj3lk24n1k29098cx82',
    },
    views: 4503,
    points: 48,
  },

  {
    id: 6,
    source: 'https://i.imgur.com/JjMay6m.mp4',
    type: EItemType.Video,
    title: 'Strange Rain',
    subtitle: 'Strange rain on the road in China',
    liked: false,
    by: {
      name: 'kbowser',
      id: '14432dsd3409dfsj3lk24n1k29098cx82',
    },
    views: 4503,
    points: 48,
  },
];

const viewabilityConfig = {
  itemVisiblePercentThreshold: 100,
  minimumViewTime: 0,
  waitForInteraction: false,
};

export class HomeScreen extends Component<IProps, IState> {
  state = {
    currentItemIndex: 0,
    offset: 0,
  };

  list: FlatList<IItem> | null = null;

  handleViewableItemsChanged = (info: any) => {
    const currentItem = info.viewableItems[0];

    if (currentItem && currentItem.index >= 0) {
      this.setState({
        currentItemIndex: currentItem.index,
      });
    }
  };

  loadMoreData() {}

  render() {
    const { currentItemIndex } = this.state;

    return (
      <View style={styles.root}>
        <View style={styles.footer}>
          <Text>Current item {currentItemIndex}</Text>
        </View>

        <FlatList<IItem>
          ref={ref => (this.list = ref)}
          data={DATA}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={3}
          horizontal
          pagingEnabled
          initialScrollIndex={currentItemIndex}
          style={styles.flatList}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          onEndReached={this.loadMoreData}
          onEndReachedThreshold={0.1}
          keyExtractor={item => {
            return item.id.toString();
          }}
          renderItem={data => {
            return <Item item={data.item} index={data.index} />;
          }}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={this.handleViewableItemsChanged}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  flatList: {},

  content: {},

  footer: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
    width: '100%',
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, .20)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
