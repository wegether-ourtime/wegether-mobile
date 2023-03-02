import {Icon, normalize} from '@rneui/themed';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors, font} from '../../common/assets';

interface Props {
  name?: string;
  icon?: any;
  textColor?: string;
  backgroundColor?: string;
}

export const Category: React.FC<Props> = props => {
  const {name, icon, backgroundColor, textColor} = props;
  return (
    <TouchableOpacity>
      <View
        style={[
          styles.main,
          {backgroundColor: backgroundColor ?? colors.white},
        ]}>
        {icon && (
          <View style={styles.icon}>
            <Image source={icon} style={styles.icon} />
          </View>
        )}
        <Text style={[styles.text, {color: textColor ?? colors.primary}]}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
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
    fontFamily: font.medium,
    fontSize: normalize(14),
  },
  icon: {
    paddingRight: normalize(12),
  },
});
