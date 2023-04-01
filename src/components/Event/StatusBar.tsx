// import {Button} from '@rneui/themed';
import {Avatar} from '@rneui/base';
import React, {useState} from 'react';
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

export const StatusBar: React.FC<any> = props => {
  const {style, status, startDate, endDate} = props;
  const [now] = useState(new Date().toISOString());
  // const user = useAuthStore(state => state.user);

  return (
    <View
      style={[
        styles.main,
        style,
        {
          ...(status == 'CANCEL'
            ? {backgroundColor: 'red', paddingHorizontal: normalize(18)}
            : {}),
          ...(status == 'OPEN' && (now > startDate || now > endDate)
            ? {
                backgroundColor: colors.grayPlaceholder,
                paddingHorizontal: normalize(18),
              }
            : {}),
        },
      ]}>
      {status == 'OPEN' && (now <= startDate || now <= endDate) && (
        <Text style={styles.text}>Incoming</Text>
      )}
      {status == 'OPEN' && (now > startDate || now > endDate) && (
        <Text style={styles.text}>Done</Text>
      )}
      {status == 'CANCEL' && <Text style={[styles.text]}>Cancel</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.green,
    borderRadius: normalize(8),
    padding: normalize(6),
    paddingHorizontal: normalize(10),
    marginVertical: normalize(5),
    // borderRadius: normalize(8),
  },
  text: {
    color: colors.white,
    fontFamily: font.medium,
    fontSize: normalize(14),
  },
});
