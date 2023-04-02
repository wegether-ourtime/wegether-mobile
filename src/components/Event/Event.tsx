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
import {StatusBar} from './StatusBar';
import FastImage from 'react-native-fast-image'

export const Event: React.FC<any> = props => {
  // const user = useAuthStore(state => state.user);
  const {
    eventId,
    eventName,
    eventDetail,
    isHost,
    startDate,
    endDate,
    eventImg,
    maxParticipant,
    location,
    userId,
    joined,
    userEvents,
    onPressJoin,
    suggestionTab,
    status,
  } = props;
  let a = 1;
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

  // const onPressJoin = () => {
  //   useUserEventStore.getState().createUserEvent({
  //     eventId,
  //     userId,
  //   });
  // };

  const host = userEvents.find((ue: any) => ue.isHost)?.user;
  return (
    <TouchableOpacity
      onPress={() =>
        RootNavigation.navigate('Main', {
          screen: 'EventDetailScreen',
          params: {eventId},
        })
      }>
      <View style={styles.main}>
        <FastImage
          source={{uri: eventImg}}
          style={styles.eventImage}
        />
        <View style={styles.eventDetail}>
          <View style={styles.eventHost}>
            <View
              style={{
                width: '40%',
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Avatar
                avatarStyle={styles.profile}
                containerStyle={styles.profileContainer}
                size={normalize(40)}
                rounded
                source={{uri: host.imgProfileUrl}}
              />
            </View>
            <View
              style={{
                width: '60%',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              {!isHost && !joined && (
                <TouchableOpacity
                  containerStyle={styles.joinButton}
                  onPress={() => onPressJoin(eventId, userId)}>
                  <Text
                    style={{
                      color: colors.white,
                      fontFamily: font.medium,
                      fontSize: normalize(14),
                    }}>
                    Join
                  </Text>
                </TouchableOpacity>
              )}
              {!suggestionTab && (
                <StatusBar
                  status={status}
                  startDate={startDate}
                  endDate={endDate}
                />
              )}
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.eventName}>{eventName}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Image
              source={icons.calendar}
              style={styles.detailIcon}
              resizeMode="contain"
            />
            <Text style={[styles.eventDescription]}>{date}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Image
              source={icons.time}
              style={styles.detailIcon}
              resizeMode="contain"
            />
            <Text style={[styles.eventDescription]}>{time}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Image
              source={icons.location}
              style={styles.detailIcon}
              resizeMode="contain"
            />
            <Text style={[styles.eventDescription]}>
              {location?.name?.length < 20
                ? `${location?.name}`
                : `${location?.name.substring(0, 20)}...`}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Image
              source={icons.peoples}
              style={styles.detailIcon}
              resizeMode="contain"
            />
            <Text style={[styles.eventDescription]}>
              {maxParticipant} peoples ({userEvents.length} joined)
            </Text>
          </View>
          {/* <View style={styles.rowContainer}>
            <Text style={[styles.eventDescription]}>{eventDetail}</Text>
          </View> */}
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
    marginLeft: normalize(8),
  },
  joinButton: {
    height: normalize(32),
    width: '90%',
    backgroundColor: colors.primary,
    borderRadius: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: normalize(4),
  },
  detailIcon: {
    width: normalize(16),
    height: normalize(16),
  },
});
