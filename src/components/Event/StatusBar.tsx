// import {Button} from '@rneui/themed';
import {Avatar} from '@rneui/base';
import React from 'react';
import {FlatList, Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors, font, icons, image} from '../../common/assets';
import fonts from '../../common/assets/fonts';
import images from '../../common/assets/images';
import {FileResource} from '../../common/enums/fileResource';
import {normalize} from '../../common/function/normalize';
import * as RootNavigation from '../../navigations/RootNavigation';
import {useAuthStore} from '../../stores/authStore';
import {useUserEventStore} from '../../stores/userEventStore';
import {Touchable} from '../Button/Touchable';

export const Event: React.FC<any> = props => {
  // const user = useAuthStore(state => state.user);
  const {status} = props;

  return (
    <View style={styles.main}>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: normalize(100),
    backgroundColor: colors.white,
    padding: normalize(8),
    marginVertical: normalize(5),
    borderRadius: normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
