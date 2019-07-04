import React, { FC, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
} from 'react-native';
import { IItem } from './Item';
import { BlurView } from '@react-native-community/blur';
import { Appear } from '../Appear';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const SEEK_BAR_HEIGHT = 4;

interface IProps {
  item: IItem;
  seek: number;
  current: boolean;
}

export const ItemControls: FC<IProps> = props => {
  return (
    <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.9)']}>
      <SafeAreaView>
        <View style={styles.root}>
          <View style={styles.seekBar}>
            <View style={[styles.seekBarFiller, { width: `${props.seek}%` }]}>
              <View style={styles.seekBarKnob} />
            </View>
          </View>

          <View style={styles.titles}>
            <Text style={styles.title}>{props.item.title}</Text>
            <Text style={styles.subtitle}>{props.item.subtitle}</Text>
          </View>

          <View style={styles.stats}>
            <View style={styles.statsLeft}>
              <Text style={styles.statsText}>Views </Text>
              <Text style={styles.statsHighlighted}>{props.item.views}</Text>
              <View style={styles.statsDivider} />
              <Text style={styles.statsText}>Points </Text>
              <Text style={styles.statsHighlighted}>{props.item.points}</Text>
            </View>

            <View style={styles.statsRight}>
              <Text style={styles.statsHighlighted}>By </Text>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(props.item.by.id);
                }}
              >
                <Text style={styles.statsUser}>@{props.item.by.name}</Text>
              </TouchableOpacity>
            </View>
          </View>

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
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    width,
    height: 200,
  },

  blur: {},

  titles: {
    paddingHorizontal: 20,
    paddingTop: 15,
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
    paddingTop: 15,
    marginBottom: 20,
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
    marginTop: 20,
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
