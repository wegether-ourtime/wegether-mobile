// import {Button} from '@rneui/themed';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {colors, font, icons} from '../../common/assets';
import fonts from '../../common/assets/fonts';
import {normalize} from '../../common/function/normalize';
import {getStatusToText, numberWithCommas} from '../../common/function/utility';
import * as RootNavigation from '../../navigations/RootNavigation';

export const Event: React.FC<any> = props => {
  return <View style={styles.taskMenu}></View>;
};

const styles = StyleSheet.create({
  taskMenu: {
    backgroundColor: '#13ef45',
    padding: normalize(15),
    marginVertical: normalize(5),
  },
  listTile: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  borderReview: {
    height: normalize(48),
    borderWidth: 1,
    borderColor: colors.greyWhite,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: normalize(10),
    paddingHorizontal: normalize(20),
    flexDirection: 'row',
  },
});
