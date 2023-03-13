import {Icon, normalize} from '@rneui/themed';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors, font} from '../../common/assets';

interface Props {
  onSelect: (categoryId: string) => void;
  disabled?: boolean;
  categoryId?: string;
  name?: string;
  icon?: any;
  textColor?: string;
  backgroundColor?: string;
  selectedTextColor?: string;
  selectedBackgroundColor?: string;
}

export const Category: React.FC<Props> = props => {
  const {
    onSelect,
    disabled,
    categoryId,
    name,
    icon,
    backgroundColor,
    textColor,
    selectedTextColor,
    selectedBackgroundColor,
  } = props;
  const [selected, setSelected] = useState(false);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => {
        onSelect(categoryId ?? '');
        setSelected(!selected);
      }}>
      <View
        style={[
          styles.main,
          {
            backgroundColor: selected
              ? selectedBackgroundColor
              : backgroundColor ?? colors.white,
          },
        ]}>
        {icon && (
          <View style={styles.icon}>
            <Image source={icon} style={styles.icon} />
          </View>
        )}
        <Text
          style={[
            styles.text,
            {color: selected ? selectedTextColor : textColor ?? colors.primary},
          ]}>
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
