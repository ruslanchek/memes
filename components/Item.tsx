import React, { FC } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Appear } from "./Appear";

export interface IItem {
  id: number;
}

interface IProps {
  index: number;
  item: IItem;
}

const { width, height } = Dimensions.get("window");

export const Item: FC<IProps> = props => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{props.index}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width,
    height,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  text: {
    fontSize: 100
  }
});
