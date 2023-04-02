import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar} from '@rneui/base';
import {useCallback, useEffect, useState} from 'react';
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
import fonts from '../../common/assets/fonts';
import {useFocusEffect} from '@react-navigation/native';

const DirectMessageScreen: React.FC<any> = ({navigation}) => {
  const userFriendChats = useChatStore(state => state.userFriendList);
  const [userId, setUserId] = useState<string>('');
  const getUserFriendChats = async () => {
    const userId = await AsyncStorage.getItem('userId');
    setUserId(userId ?? '')
    await useChatStore.getState().getUserFriendList(userId ?? '');
  };

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
        data={userFriendChats}
        keyExtractor={item => item.userFriendId}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.chatContainer}
              onPress={() => {
                RootNavigation.navigate('Main', {
                  screen: 'ChatScreen',
                  params: {
                    eventId: item.eventId,
                    chatName:
                      userId == item.userId
                        ? item.friend.fullName
                        : item.user.fullName,
                    userFriendId: item.userFriendId,
                  },
                });
              }}>
              <Avatar
                avatarStyle={styles.img}
                containerStyle={styles.imgContainer}
                size={normalize(56)}
                rounded
                source={
                  item?.userId === userId
                    ? item?.friend?.imgProfileUrl
                      ? {uri: item?.friend?.imgProfileUrl}
                      : {}
                    : item?.user?.imgProfileUrl
                    ? {uri: item?.user?.imgProfileUrl}
                    : {}
                }
              />
              {/* FastImage source={item.icon} style={{marginTop: normalize(2)}}></Image> */}
              <View style={styles.chatDetail}>
                <Text style={styles.chatName}>
                  {item?.userId === userId
                    ? item?.friend?.fullName
                    : item?.user?.fullName}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default DirectMessageScreen;

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
