import React, { FC, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import { IItem } from './Item';
import { BlurView } from '@react-native-community/blur';

const { width, height } = Dimensions.get('window');
const HEIGHT = 200;

interface IProps {
  item: IItem;
}

export const ItemControls: FC<IProps> = props => {
  return (
    <View style={styles.root}>
      <View style={styles.seekBar}>
        <View style={styles.seekBarFiller}>
          <View style={styles.seekBarKnob} />
        </View>
      </View>

      <View style={styles.titles}>
        <Text style={styles.title}>{props.item.title}</Text>
        <Text style={styles.subtitle}>{props.item.subtitle}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.categoriesScrollViewContainer} horizontal>
        <View style={styles.category}>
          <Text style={styles.categoryIcon}>😀</Text>
          <Text style={styles.categoryName}>Memes</Text>
        </View>

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

      <BlurView style={styles.blur} blurType='light' blurAmount={10} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width,
    height: HEIGHT,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },

  blur: {},

  titles: {
    padding: 20,
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

  seekBar: {},

  seekBarFiller: {},

  seekBarKnob: {},

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
