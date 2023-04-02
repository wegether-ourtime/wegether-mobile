import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {normalize} from '../../common/function/normalize';
import {Avatar} from '@rneui/base';
import * as RootNavigation from '../../navigations/RootNavigation';
import images from '../../common/assets/images';
import {colors} from '../../common/assets';
import fonts from '../../common/assets/fonts';
import {useUserEventStore} from '../../stores/userEventStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ParticipantSheet = (props: SheetProps) => {
  const userEvents = useUserEventStore(state => state.userEvents);
  const [userId, setUserId] = useState<string>('');
  const getUserEvents = async () => {
    useUserEventStore.getState().getUserEvents({
      eventId: props?.payload?.eventId,
    });
  };

  const getUserId = async () => {
    const userId = await AsyncStorage.getItem('userId');
    setUserId(userId ?? '');
  };

  useEffect(() => {
    getUserEvents();
    getUserId();
  }, []);

  return (
    <ActionSheet
      containerStyle={{
        height: normalize(110 * userEvents.length),
      }}
      id={props.sheetId}
      useBottomSafeAreaPadding
      gestureEnabled={true}>
      <FlatList
        data={userEvents}
        keyExtractor={item => item.userEventId}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.chatContainer}
              disabled={item.userId === userId}
              onPress={async () => {
                await SheetManager.hide(props.sheetId);
                RootNavigation.navigate('Profile', {
                  screen: 'FriendProfileScreen',
                  params: {
                    friendId: item.userId,
                    previousScreen: 'ChatScreen',
                    eventId: item?.eventId,
                    chatName: item?.event?.eventName,
                  },
                });
              }}>
              <Avatar
                avatarStyle={styles.img}
                containerStyle={styles.imgContainer}
                size={normalize(56)}
                rounded
                source={{uri: item?.user?.imgProfileUrl}}
              />
              {/* <FastImage source={item.icon} style={{marginTop: normalize(2)}}></Image> */}
              <View style={styles.chatDetail}>
                <Text style={styles.chatName}>{item?.user?.fullName}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  chatContainer: {
    height: normalize(72),
    marginVertical: normalize(2),
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  img: {
    borderRadius: normalize(2),
    borderColor: colors.white,
  },
  imgContainer: {
    alignSelf: 'center',
    // padding: normalize(5),
    margin: normalize(16),
  },
  chatDetail: {
    alignSelf: 'center',
  },
  chatName: {
    fontFamily: fonts.medium,
    fontSize: normalize(14),
  },
});
