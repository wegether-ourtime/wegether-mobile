import {Avatar} from '@rneui/themed';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../common/assets';
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

const ChatScreen: React.FC<any> = ({navigation, route}) => {
  const [userFriendId] = useState(route?.params?.userFriendId);
  const [eventId] = useState(route?.params?.eventId);
  const [chatName] = useState(route?.params?.chatName);
  const [userFriend, setUserFriend] = useState<any>({});
  const [userId, setUserId] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [imgMessage, setImgMessage] = useState<any>();
  const chats = useChatStore(state => state.chats);
  const getChats = async () => {
    const userId = (await AsyncStorage.getItem('userId')) ?? '';
    setUserId(userId);
    if (userFriendId) {
      await useChatStore.getState().getDirectChats(userFriendId);
    } else if (eventId) {
      await useChatStore.getState().getEventChats(eventId);
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

  const onSend = async ({message, img}: {message?: string; img?: any}) => {
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
      />
      <KeyboardAvoidingView
        behavior="height"
        style={{height: '100%', backgroundColor: 'red'}}
        enabled
        keyboardVerticalOffset={100}>
        <View style={[styles.container]}>
          <FlatList
            // inverted
            data={chats}
            keyExtractor={item => item.chatId}
            renderItem={({item}) => {
              return (
                <View
                  style={[
                    styles.chatContainer,
                    {
                      justifyContent:
                        item.senderId === userId ? 'flex-end' : 'flex-start',
                    },
                  ]}>
                  <TouchableOpacity
                    // style={styles.chatContainer}
                    onPress={() => {
                      // navigation.navigate('FriendProfileScreen')
                      RootNavigation.navigate('Profile', {
                        screen: 'FriendProfileScreen',
                        params: {userId: item.senderId},
                      });
                    }}>
                    {!(item.senderId === userId) && (
                      <Avatar
                        avatarStyle={styles.img}
                        containerStyle={styles.imgContainer}
                        size={normalize(40)}
                        rounded
                        source={
                          item.senderImg
                            ? {uri: item.senderImg}
                            : images.wegether
                        }
                      />
                    )}
                  </TouchableOpacity>
                  <View style={styles.messageContainer}>
                    <Text style={styles.message}>{item.text}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.bottom}>
          <View style={styles.inputTools}>
            <TextInput
              style={styles.textInput}
              // underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholder="type"
              onChangeText={text => onChangeMessage(text)}
              value={message}
            />
            <TouchableOpacity
              containerStyle={styles.sendButton}
              onPress={() => {
                onSend({message, img: imgMessage});
              }}>
              <Text>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
const styles = StyleSheet.create({
  main: {
    height: '100%',
    backgroundColor: '#D6DDFF',
  },
  container: {
    height: '85%',
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
