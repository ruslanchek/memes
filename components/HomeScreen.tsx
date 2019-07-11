import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, ViewToken } from 'react-native';
import { Item, IItem, EItemType } from './Item';
import { ItemControls, EItemControlsShow } from './ItemControls';
import { DoubleTap } from './DoubleTap';

interface IProps {}

interface IState {
  currentItemIndex: number;
  offset: number;
  isScrolling: boolean;
  isLoading: boolean;
  isMuted: boolean;
  currentItemData: IItem | null;
  currentSeek: number;
  infoShow: EItemControlsShow;
}

const DATA: IItem[] = [
  {
    id: 1,
    source: 'https://xsnapp-cdn.fra1.cdn.digitaloceanspaces.com/tmp/1/1.mp4',
    poster: 'https://xsnapp-cdn.fra1.cdn.digitaloceanspaces.com/tmp/1/1.jpg',
    type: EItemType.Video,
    title: 'Nework and a Road',
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

export interface IVideoContext {
  isLoading: boolean;
  isMuted: boolean;
  isScrolling: boolean;
  currentItemData: IItem | null;
  currentSeek: number;
  currentItemIndex: number;
  setLoading: (value: boolean) => void;
  setMuted: (value: boolean) => void;
  setCurrentSeek: (percent: number) => void;
  onNextSlide: () => void;
}

export const VideoContext = React.createContext<IVideoContext>({
  isLoading: true,
  isMuted: true,
  currentItemData: null,
  currentSeek: 0,
  currentItemIndex: 0,
  isScrolling: false,
  setLoading: () => {},
  setMuted: () => {},
  setCurrentSeek: () => {},
  onNextSlide: () => {},
});

export class HomeScreen extends Component<IProps, IState> {
  state = {
    currentItemIndex: 0,
    offset: 0,
    isScrolling: false,
    isLoading: true,
    isMuted: true,
    currentItemData: null,
    currentSeek: 0,
    infoShow: EItemControlsShow.Crop,
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
        currentItemData: DATA[currentItem.index!],
        isScrolling: currentItem.isViewable! ? true : false,
      });
    }
  };

  loadMoreData() {}

  handleNextSlide = () => {
    if (this.list) {
      this.list.scrollToIndex({
        index: this.state.currentItemIndex + 1,
        animated: true,
      });
    }
  };

  handleSetMuted = () => {
    this.setState({ isMuted: !this.state.isMuted });
  };

  handleDoublePress = () => {
    this.setAllControlsVisible();
  };

  setAllControlsVisible = () => {
    if (this.state.infoShow === EItemControlsShow.Crop) {
      this.setState({ infoShow: EItemControlsShow.Full });
    } else {
      this.setState({ infoShow: EItemControlsShow.Crop });
    }
  };

  handleSetLoading = (value: boolean) => {
    this.setState({ isLoading: value });
  };

  handleSetCurrentSeek = (percent: number) => {
    this.setState({ currentSeek: percent });
  };

  render() {
    const {
      currentItemIndex,
      currentSeek,
      isMuted,
      isLoading,
      isScrolling,
      infoShow,
      currentItemData,
    } = this.state;

    return (
      <VideoContext.Provider
        value={{
          isLoading,
          isMuted,
          isScrolling,
          currentItemData,
          currentSeek,
          currentItemIndex,
          setLoading: this.handleSetLoading,
          setMuted: this.handleSetMuted,
          setCurrentSeek: this.handleSetCurrentSeek,
          onNextSlide: this.handleNextSlide,
        }}
      >
        {/* <DoubleTap onDoubleTap={this.setAllControlsVisible}> */}
        <View style={styles.root}>
          <FlatList<IItem>
            ref={ref => (this.list = ref)}
            data={DATA}
            initialNumToRender={3}
            maxToRenderPerBatch={1}
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
            onScrollToIndexFailed={() => {}}
            renderItem={data => {
              return <Item item={data.item} index={data.index} />;
            }}
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={this.handleViewableItemsChanged}
          />

          <ItemControls
            show={infoShow}
            seek={this.state.currentSeek}
            item={this.state.currentItemData}
            muted={this.state.isMuted}
            onMutePress={this.handleSetMuted}
          />
        </View>
        {/* </DoubleTap> */}
      </VideoContext.Provider>
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
