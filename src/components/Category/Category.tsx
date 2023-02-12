import {Icon, normalize} from '@rneui/themed';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors, font} from '../../common/assets';

interface Props {
  name?: string;
  icon?: any;
}

export const Category: React.FC<Props> = props => {
  const {name, icon} = props;
  return (
    <View style={styles.main}>
      <Image source={icon} />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.white,
    padding: normalize(12),
    margin: normalize(6),
    alignSelf: 'flex-start',
    borderRadius: normalize(24),
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.primary,
    paddingLeft: normalize(12),
    fontFamily: font.medium,
    fontSize: normalize(14),
  },
});
