import {Icon, normalize} from '@rneui/themed';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface Props {
  name?: string;
  icon?: any;
}

export const Category: React.FC<Props> = props => {
  const {name, icon} = props;
  return (
    <View style={styles.category}>
      <Text>{name}</Text>
      {/* <Image source={icon} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    // width: '300',
    padding: normalize(10),
    backgroundColor: '#3E51FF',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',

    // flex: none;
    // order: 0;
    // flex-grow: 0;
  },
});
