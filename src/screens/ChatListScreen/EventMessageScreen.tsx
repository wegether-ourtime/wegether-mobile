import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar} from '@rneui/base';
import {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {colors, font} from '../../common/assets';
import images from '../../common/assets/images';
import {FileResource} from '../../common/enums/fileResource';
import {normalize} from '../../common/function/normalize';
import {useAuthStore} from '../../stores/authStore';
import {useChatStore} from '../../stores/chatStore';
import * as RootNavigation from '../../navigations/RootNavigation';
import {ChannelList} from 'stream-chat-react-native';
import {useFocusEffect} from '@react-navigation/native';

const EventMessageScreen: React.FC<any> = ({navigation}) => {
  const eventChats = useChatStore(state => state.eventList);
  const getUserFriendChats = async () => {
    const userId = await AsyncStorage.getItem('userId');
    await useChatStore.getState().getEventList(userId ?? '');
  };

  useEffect(() => {
    getUserFriendChats();
  }, []);

  useEffect(() => {
    getUserFriendChats();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getUserFriendChats();
    }, []),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={eventChats}
        keyExtractor={item => item.eventId}
        renderItem={({item}) => {
          const eventImg = item?.files?.find(
            (f: any) => f.resource === FileResource.EVENT,
          );

          return (
            <TouchableOpacity
              style={styles.chatContainer}
              onPress={() => {
                RootNavigation.navigate('Main', {
                  screen: 'ChatScreen',
                  params: {eventId: item.eventId, chatName: item.eventName},
                });
              }}>
              <Avatar
                avatarStyle={styles.img}
                containerStyle={styles.imgContainer}
                size={normalize(56)}
                rounded
                source={{uri: eventImg?.path}}
              />
              {/* <FastImage source={item.icon} style={{marginTop: normalize(2)}}></Image> */}
              <View style={styles.chatDetail}>
                <Text style={styles.chatName}>{item.eventName}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
    // <ChannelList />
  );
};
export default EventMessageScreen;

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
    marginHorizontal: normalize(8),
    alignSelf: 'center',
  },
  chatName: {
    fontFamily: font.medium,
    fontSize: normalize(16),
  },
});
