// import {Button} from '@rneui/themed';
import {Avatar} from '@rneui/base';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {colors, font, icons, image} from '../../common/assets';
import fonts from '../../common/assets/fonts';
import images from '../../common/assets/images';
import {normalize} from '../../common/function/normalize';
import {getStatusToText, numberWithCommas} from '../../common/function/utility';
import * as RootNavigation from '../../navigations/RootNavigation';

export const Event: React.FC<any> = props => {
  return (
    <View style={styles.main}>
      <Image source={images.cover} style={styles.eventImage} />
      <View style={styles.eventDetail}>
        <View style={styles.eventHost}>
          <Avatar
            avatarStyle={styles.profile}
            containerStyle={styles.profileContainer}
            size={normalize(40)}
            rounded
            source={images.profile}
          />
        </View>
        <Text style={styles.evetnName}>{props.name}</Text>
        <Text style={[]}>{props.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: normalize(200),
    backgroundColor: colors.disable,
    padding: normalize(15),
    marginVertical: normalize(5),
    borderRadius: normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventImage: {
    height: '90%',
    width: '50%',
    borderRadius: normalize(8),
  },
  eventDetail: {
    marginLeft: normalize(10),
    height: '90%',
    width: '50%',
    // backgroundColor: 'red',
    borderRadius: normalize(8),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  evetnName: {
    fontFamily: font.medium,
    fontSize: normalize(16),
  },
  eventHost: {
    height: '40%',
    width: '100%',
    // backgroundColor: 'green',
    alignItems: 'flex-end',
  },
  profile: {
    borderRadius: normalize(2),
    borderColor: colors.white,
  },
  profileContainer: {
    padding: normalize(5),
  },
});
