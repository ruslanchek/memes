import React, { FC, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { IItem } from './Item';
import LinearGradient from 'react-native-linear-gradient';
import { Appear } from './Appear';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');
const SEEK_BAR_HEIGHT = 4;

export enum EItemControlsShow {
  Full,
  Crop,
  Off,
}

interface IProps {
  item: IItem;
  seek: number;
  muted: boolean;
  current: boolean;
  show: EItemControlsShow;
  onMutePress: () => void;
}

interface IState {
  infoAnimated: Animated.Value;
  controlsVisible: boolean;
}

export class ItemControls extends React.Component<IProps, IState> {
  state = {
    infoAnimated: new Animated.Value(0.35),
    controlsVisible: false,
  };

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.show !== this.props.show) {
      let infoAnimatedToValue = null;
      let controlsVisible = false;

      switch (nextProps.show) {
        case EItemControlsShow.Crop: {
          infoAnimatedToValue = 0.35;
          controlsVisible = false;
          break;
        }

        case EItemControlsShow.Full: {
          infoAnimatedToValue = 0.9;
          controlsVisible = true;
          break;
        }

        case EItemControlsShow.Off:
        default: {
          infoAnimatedToValue = 0;
          controlsVisible = false;
          break;
        }
      }

      Animated.spring(this.state.infoAnimated, {
        toValue: infoAnimatedToValue,
        tension: 120,
        friction: 20,
        useNativeDriver: true,
      }).start();

      this.setState({ controlsVisible });
    }
  }

  render() {
    const { item, seek, show, muted, onMutePress } = this.props;
    const { infoAnimated, controlsVisible } = this.state;

    return (
      <Animated.View
        style={[
          styles.controls,
          {
            // opacity: infoAnimated,
            transform: [
              {
                translateY: infoAnimated.interpolate({
                  inputRange: [0, 1],
                  outputRange: [200, 0],
                }),
              },
            ],
          },
        ]}
      >
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.9)']}>
          <View style={styles.mute}>
            <Icon name='volume' size={30} color='#fff' />
          </View>

          <SafeAreaView>
            <View style={styles.root}>
              <View style={styles.seekBar}>
                <View style={[styles.seekBarFiller, { width: `${seek}%` }]}>
                  <View style={styles.seekBarKnob} />
                </View>
              </View>

              <View style={styles.titles}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>

              <Appear type='fade' delay={0} show={controlsVisible} customStyles={styles.stats}>
                <View style={styles.statsLeft}>
                  <Text style={styles.statsText}>Views </Text>
                  <Text style={styles.statsHighlighted}>{item.views}</Text>
                  <View style={styles.statsDivider} />
                  <Text style={styles.statsText}>Points </Text>
                  <Text style={styles.statsHighlighted}>{item.points}</Text>
                </View>

                <View style={styles.statsRight}>
                  <Text style={styles.statsHighlighted}>By </Text>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(item.by.id);
                    }}
                  >
                    <Text style={styles.statsUser}>@{item.by.name}</Text>
                  </TouchableOpacity>
                </View>
              </Appear>

              <Appear type='fade' delay={100} show={controlsVisible}>
                <ScrollView
                  contentContainerStyle={styles.categoriesScrollViewContainer}
                  horizontal
                  onMoveShouldSetResponder={() => true}
                >
                  <TouchableOpacity>
                    <View style={styles.category}>
                      <Text style={styles.categoryIcon}>😀</Text>
                      <Text style={styles.categoryName}>Memes</Text>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.category}>
                    <Text style={styles.categoryIcon}>💅</Text>
                    <Text style={styles.categoryName}>Beauty</Text>
                  </View>

                  <View style={styles.category}>
                    <Text style={styles.categoryIcon}>🐈</Text>
                    <Text style={styles.categoryName}>Animals</Text>
                  </View>

                  <View style={styles.category}>
                    <Text style={styles.categoryIcon}>🚀</Text>
                    <Text style={styles.categoryName}>Space</Text>
                  </View>

                  <View style={styles.category}>
                    <Text style={styles.categoryIcon}>🥳</Text>
                    <Text style={styles.categoryName}>Parties</Text>
                  </View>

                  <View style={styles.category}>
                    <Text style={styles.categoryIcon}>❤️</Text>
                    <Text style={styles.categoryName}>Love</Text>
                  </View>

                  <View style={styles.category}>
                    <Text style={styles.categoryIcon}>🚘</Text>
                    <Text style={styles.categoryName}>Cars</Text>
                  </View>
                </ScrollView>
              </Appear>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    width,
    height: 220,
  },

  blur: {},

  mute: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, .1)',
    top: -30,
    left: 0,
  },

  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 300,
  },

  titles: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },

  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },

  stats: {
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'row',
  },

  statsLeft: {
    flexGrow: 1,
    flexDirection: 'row',
  },

  statsRight: {
    flexDirection: 'row',
  },

  statsUser: {
    color: '#00C8FF',
  },

  statsText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },

  statsHighlighted: {
    color: '#fff',
  },

  statsDivider: {
    width: 15,
  },

  seekBar: {
    height: SEEK_BAR_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, .2)',
    borderRadius: SEEK_BAR_HEIGHT / 2,
    marginHorizontal: 20,
    marginTop: 15,
  },

  seekBarFiller: {
    width: '25%',
    backgroundColor: '#005BFF',
    borderRadius: SEEK_BAR_HEIGHT / 2,
    height: SEEK_BAR_HEIGHT,
    position: 'relative',
  },

  seekBarKnob: {
    width: 20,
    height: SEEK_BAR_HEIGHT + 2,
    position: 'absolute',
    right: 0,
    top: -1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    backgroundColor: '#fff',
    borderRadius: SEEK_BAR_HEIGHT,
  },

  categoriesScrollViewContainer: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 10,
  },

  category: {
    width: 77,
    height: 59,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  categoryIcon: {
    fontSize: 26,
    marginBottom: 2,
  },

  categoryName: {
    color: '#fff',
  },
});
