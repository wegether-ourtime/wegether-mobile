import {Avatar, Icon} from '@rneui/themed';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors, icons} from '../../common/assets';
import images from '../../common/assets/images';
import {FileResource} from '../../common/enums/fileResource';
import {normalize} from '../../common/function/normalize';
import {stylesApp} from '../../common/styles/AppStyle';
import CustomHeader from '../../components/Text/CustomHeader';
import {useChatStore} from '../../stores/chatStore';
import {useCallback, useEffect, useState} from 'react';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fonts from '../../common/assets/fonts';
import * as RootNavigation from '../../navigations/RootNavigation';
import {useFocusEffect} from '@react-navigation/native';
import {socket} from '../../common/function/utility';
import {SheetManager} from 'react-native-actions-sheet';

const ChatScreen: React.FC<any> = ({navigation, route}) => {
  const [userFriendId] = useState(route?.params?.userFriendId);
  const [eventId] = useState(route?.params?.eventId);
  const [chatName] = useState(route?.params?.chatName);
  const [userFriend, setUserFriend] = useState<any>({});
  const [userId, setUserId] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [imgMessage, setImgMessage] = useState<any>();
  const [messages, setMessages] = useState();
  const chats = useChatStore(state => state.chats);
  const getChats = async () => {
    const userId = (await AsyncStorage.getItem('userId')) ?? '';
    setUserId(userId);
    if (userFriendId) {
      const chats = await useChatStore.getState().getDirectChats(userFriendId);
      setMessages(
        chats.map((chat: any) => {
          const isMyMessage = chat?.senderId === userId;

          return {
            _id: chat.chatId,
            text: chat.text,
            createdAt: new Date(chat.createdAt),
            user: {
              _id: chat.senderId,
              name: isMyMessage
                ? chat?.userFriend?.user?.fullName
                : chat?.userFriend?.friend?.fullName,
              avatar: isMyMessage
                ? chat?.userFriend?.user?.imgProfileUrl
                : chat?.userFriend?.friend?.imgProfileUrl,
            },
          };
        }),
      );
    } else if (eventId) {
      const chats = await useChatStore.getState().getEventChats(eventId);
      setMessages(
        chats.map((chat: any) => {
          const user = chat?.event?.userEvents?.find(
            (userEvent: any) => userEvent?.userId === chat?.senderId,
          ).user;

          return {
            _id: chat.chatId,
            text: chat.text,
            createdAt: new Date(chat.createdAt),
            user: {
              _id: chat.senderId,
              name: user?.fullName,
              avatar: user?.imgProfileUrl,
            },
          };
        }),
      );
    }
  };

  // useEffect(() => {
  //   getChats();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      getChats();
      useChatStore.getState().socket().receiveMessage({userFriendId, eventId});
      return () =>
        useChatStore.getState().socket().disconnect({userFriendId, eventId});
    }, []),
  );

  const onSend = async () => {
    const userId = (await AsyncStorage.getItem('userId')) ?? '';
    useChatStore
      .getState()
      .socket()
      .sendMessage({userId, userFriendId, eventId, userFriend, message});
    await getChats();
    setMessage('');
  };

  const onChangeMessage = (text: string) => setMessage(text);

  return (
    <SafeAreaView style={[stylesApp.container]}>
      <CustomHeader
        title={chatName}
        showBackBtn
        onPressBack={() => navigation.goBack()}
        headerRight={() => {
          if (eventId) {
            return (
              <View
                style={{
                  paddingVertical: 16,
                  paddingHorizontal: 10,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{marginHorizontal: 8}}
                  onPress={() => {
                    SheetManager.show('ParticipantSheet', {
                      payload: {
                        eventId,
                      },
                    });
                  }}>
                  <Image
                    source={icons.peoples}
                    style={{width: normalize(20), height: normalize(20)}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginHorizontal: 8}}
                  onPress={() => {
                    RootNavigation.navigate('Main', {
                      screen: 'EventDetailScreen',
                      params: {eventId},
                    });
                  }}>
                  <Image
                    source={icons.calendar}
                    style={{width: normalize(20), height: normalize(20)}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            );
          }
          return <></>;
        }}
      />
      <GiftedChat
        alignTop={false}
        wrapInSafeArea={false}
        listViewProps={{
          contentContainerStyle: {flexGrow: 1, justifyContent: 'flex-end'},
        }}
        // quickReplyTextStyle={{backgroundColor: 'bue'}}
        // bottomOffset={Platform.OS === 'ios' ? 10 : 0}
        messagesContainerStyle={styles.container}
        bottomOffset={33}
        // renderInputToolbar={}
        onInputTextChanged={value => {
          onChangeMessage(value);
        }}
        // renderInputToolbar={props => customtInputToolbar(props)}
        onPressAvatar={user => {
          RootNavigation.navigate('Profile', {
            screen: 'FriendProfileScreen',
            params: {
              friendId: user._id,
            },
          });
        }}
        messages={messages}
        onSend={() => onSend()}
        user={{
          _id: userId,
        }}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D6DDFF',
  },
  img: {
    borderRadius: normalize(2),
    borderColor: colors.white,
  },
  imgContainer: {
    // alignSelf: 'center',
    // padding: normalize(5),
  },
  chatContainer: {
    margin: normalize(8),
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#D6DDFF',
  },
  messageContainer: {
    // width: '50%',
    // height: '50%',
    padding: normalize(8),
    marginHorizontal: normalize(8),
    backgroundColor: colors.white,
    borderRadius: normalize(8),
  },
  message: {
    fontFamily: fonts.medium,
    fontSize: normalize(12),
  },
  bottom: {},
  inputTools: {
    height: normalize(80),
    backgroundColor: colors.white,
    flexDirection: 'row',
  },
  textInput: {
    height: normalize(40),
    width: normalize(256),
    paddingHorizontal: normalize(8),
    marginHorizontal: normalize(16),
    backgroundColor: colors.white,
    fontFamily: fonts.medium,
    fontSize: normalize(16),
    borderRadius: normalize(8),
  },
  sendButton: {
    height: normalize(20),
    marginHorizontal: normalize(8),
    backgroundColor: 'red',
    justifyContent: 'center',
  },
});
