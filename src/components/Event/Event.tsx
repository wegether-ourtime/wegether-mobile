// import {Button} from '@rneui/themed';
import {Avatar} from '@rneui/base';
import React from 'react';
import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors, font, icons, image} from '../../common/assets';
import fonts from '../../common/assets/fonts';
import images from '../../common/assets/images';
import {normalize} from '../../common/function/normalize';
import {getStatusToText, numberWithCommas} from '../../common/function/utility';
import * as RootNavigation from '../../navigations/RootNavigation';
import {useAuthStore} from '../../stores/authStore';
import {useUserEventStore} from '../../stores/userEventStore';
import {Touchable} from '../Button/Touchable';

export const Event: React.FC<any> = props => {
  const user = useAuthStore(state => state.user);
  const {eventId, eventName, eventDetail, isHost, startDate, endDate} = props;
  const date = `${new Date(startDate).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })} - ${new Date(endDate).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })}`;

  const time = `${new Date(startDate).toLocaleTimeString('th-TH', {
    hour: 'numeric',
    minute: 'numeric',
  })} - ${new Date(endDate).toLocaleTimeString('th-TH', {
    hour: 'numeric',
    minute: 'numeric',
  })}`;

  const onPressJoin = () => {
    useUserEventStore.getState().createUserEvent({
      eventId,
      userId: user?.userId,
    });
  };

  return (
    <TouchableOpacity
      onPress={() =>
        RootNavigation.navigate('Main', {
          screen: 'EventDetailScreen',
          params: {eventId},
        })
      }>
      <View style={styles.main}>
        <Image source={images.cover} style={styles.eventImage} />
        <View style={styles.eventDetail}>
          <View style={styles.eventHost}>
            <View style={{width: '60%'}}>
              <Avatar
                avatarStyle={styles.profile}
                containerStyle={styles.profileContainer}
                size={normalize(40)}
                rounded
                source={images.profile}
              />
            </View>
            <View style={{width: '40%', alignItems: 'flex-end'}}>
              {!isHost && (
                <TouchableOpacity
                  style={{marginTop: normalize(5)}}
                  onPress={onPressJoin}>
                  <View style={styles.joinButton}>
                    <Text
                      style={{
                        color: colors.white,
                        fontFamily: font.medium,
                        fontSize: normalize(14),
                      }}>
                      Join
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Text style={styles.eventName}>{eventName}</Text>
          <Text style={[styles.eventDatetime]}>{date}</Text>
          <Text style={[styles.eventDatetime]}>{time}</Text>
          <Text style={[styles.eventDescription]}>{eventDetail}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    height: normalize(200),
    backgroundColor: colors.white,
    padding: normalize(8),
    marginVertical: normalize(5),
    borderRadius: normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  top: {
    // width: '100%',
    height: '20%',
  },
  eventImage: {
    height: '90%',
    width: '50%',
    borderRadius: normalize(8),
  },
  eventDetail: {
    paddingVertical: normalize(2),
    paddingLeft: normalize(10),
    height: '90%',
    width: '50%',
    // backgroundColor: 'red',
    borderRadius: normalize(8),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  eventHost: {
    width: '100%',
    flexDirection: 'row',
    // justifyContent: 'flex-end',
  },
  profile: {
    borderRadius: normalize(2),
    borderColor: colors.white,
  },
  profileContainer: {
    padding: normalize(5),
  },
  eventName: {
    width: '100%',
    fontFamily: font.medium,
    fontSize: normalize(16),
  },
  eventDescription: {
    width: '100%',
    fontFamily: font.medium,
    fontSize: normalize(12),
  },
  eventDatetime: {
    width: '100%',
    fontFamily: font.medium,
    fontSize: normalize(12),
  },
  joinButton: {
    height: normalize(30),
    width: normalize(60),
    backgroundColor: colors.primary,
    borderRadius: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
