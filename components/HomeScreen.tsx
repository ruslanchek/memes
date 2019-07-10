import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, ViewToken } from 'react-native';
import { Item, IItem, EItemType } from './Item';

interface IProps {}

interface IState {
  currentItemIndex: number;
  offset: number;
  scrolling: boolean;
}

const DATA: IItem[] = [
  {
    id: 1,
    source: 'https://xsnapp-cdn.fra1.cdn.digitaloceanspaces.com/tmp/1/1.mp4',
    poster: 'https://xsnapp-cdn.fra1.cdn.digitaloceanspaces.com/tmp/1/1.jpg',
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
    source: 'https://xsnapp-cdn.fra1.cdn.digitaloceanspaces.com/tmp/2/2.mp4',
    poster: 'https://xsnapp-cdn.fra1.cdn.digitaloceanspaces.com/tmp/2/2.jpg',
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
    source: 'https://xsnapp-cdn.fra1.cdn.digitaloceanspaces.com/tmp/3/3.mp4',
    poster: 'https://xsnapp-cdn.fra1.cdn.digitaloceanspaces.com/tmp/3/3.jpg',
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
    source: 'https://xsnapp-cdn.fra1.cdn.digitaloceanspaces.com/tmp/4/4.mp4',
    poster: 'https://xsnapp-cdn.fra1.cdn.digitaloceanspaces.com/tmp/4/4.jpg',
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
    source: 'https://xsnapp-cdn.fra1.cdn.digitaloceanspaces.com/tmp/5/5.mp4',
    poster: 'https://xsnapp-cdn.fra1.cdn.digitaloceanspaces.com/tmp/5/5.jpg',
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
    source: 'https://xsnapp-cdn.fra1.cdn.digitaloceanspaces.com/tmp/6/6.mp4',
    poster: 'https://xsnapp-cdn.fra1.cdn.digitaloceanspaces.com/tmp/6/6.jpg',
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
    id: 7,
    source: 'https://xsnapp-cdn.fra1.cdn.digitaloceanspaces.com/tmp/7/7.mp4',
    poster: 'https://xsnapp-cdn.fra1.cdn.digitaloceanspaces.com/tmp/7/7.jpg',
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
    id: 8,
    source: 'https://xsnapp-cdn.fra1.cdn.digitaloceanspaces.com/tmp/8/8.mp4',
    poster: 'https://xsnapp-cdn.fra1.cdn.digitaloceanspaces.com/tmp/8/8.jpg',
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
    scrolling: false,
  };

  list: FlatList<IItem> | null = null;

  handleViewableItemsChanged = (info: {
    viewableItems: Array<ViewToken>;
    changed: Array<ViewToken>;
  }) => {
    const currentItem = info.viewableItems[0];

    if (currentItem && currentItem.index! >= 0) {
      this.setState({
        currentItemIndex: currentItem.index!,
        scrolling: currentItem.isViewable! ? true : false,
      });
    }
  };

  loadMoreData() {}

  handleNextSlide = () => {
    this.setState({
      currentItemIndex: this.state.currentItemIndex + 1,
    });
  };

  render() {
    const { currentItemIndex, scrolling } = this.state;

    return (
      <View style={styles.root}>
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
          keyExtractor={(item, index) => {
            return item.id.toString();
          }}
          renderItem={data => {
            return (
              <Item
                onNextSlide={this.handleNextSlide}
                current={data.index === currentItemIndex}
                scrolling={scrolling}
                item={data.item}
                index={data.index}
              />
            );
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
    backgroundColor: '#000',
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
