import {Avatar} from '@rneui/themed';
import {
  FlatList,
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

const customtInputToolbar = (props: any) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: 'white',
        borderTopColor: '#E8E8E8',
        borderTopWidth: 1,
      }}
    />
  );
};

const ChatScreen: React.FC<any> = ({navigation, route}) => {
  const [userFriendId] = useState(route?.params?.userFriendId);
  const [eventId] = useState(route?.params?.eventId);
  const chats = useChatStore(state => state.chats);
  const getChats = async () => {
    const userId = await AsyncStorage.getItem('userId');
    await useChatStore.getState().getChats({userId});
  };

  // test
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    getChats();
    setMessages(
      chats.map((c: any) => ({
        _id: c.chatId,
        text: c.text,
        createdAt: c.createdAt,
        user: {
          _id: c.user.id,
          name: c.user.fullName,
        },
      })),
    );
    setMessages([
      {
        chatId: 'asd',
        text: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
        createdAt: new Date(),
        user: {
          _id: 'a',
          name: 'AAA',
        },
      },
      {
        chatId: 'ttt',
        text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
        createdAt: new Date(),
        user: {
          _id: 'b',
          name: 'BBB',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages: any) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <SafeAreaView style={[stylesApp.container]}>
      <CustomHeader
        title={'Chat name ??'}
        showBackBtn
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.main}>
        {/* <FlatList
          data={chats}
          keyExtractor={item => item.chatId}
          renderItem={({item}) => {
            const userImg = item?.userFriend?.user?.files?.find(
              (f: any) => f.resource === FileResource.USER_PROFILE,
            );

            return (
              <TouchableOpacity
                style={styles.chatContainer}
                onPress={() => {
                  // RootNavigation.navigate('Main', {
                  //   screen: 'ChatScreen',
                  //   params: {eventId: item.eventId},
                  // });
                }}>
                <Avatar
                  avatarStyle={styles.img}
                  containerStyle={styles.imgContainer}
                  size={normalize(56)}
                  rounded
                  source={userImg ? {uri: userImg.path} : images.profile}
                />
              </TouchableOpacity>
            );
          }}
        /> */}
      </View>
      <GiftedChat
        alignTop={false}
        wrapInSafeArea={false}
        listViewProps={{
          contentContainerStyle: {flexGrow: 1, justifyContent: 'flex-end'},
        }}
        // quickReplyTextStyle={{backgroundColor: 'bue'}}
        // bottomOffset={Platform.OS === 'ios' ? 10 : 0}
        messagesContainerStyle={{}}
        bottomOffset={33}
        // renderInputToolbar={}
        onInputTextChanged={value => {
          console.log(value);
        }}
        renderInputToolbar={props => customtInputToolbar(props)}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 'c',
          name: 'CCC',
        }}
      />
    </SafeAreaView>
    // <Channel channel={userFriendId ?? eventId}>
    //   <MessageList />
    //   <MessageInput />
    // </Channel>
  );
};

export default ChatScreen;
const styles = StyleSheet.create({
  main: {
    // height: '100%',
    backgroundColor: '#D6DDFF',
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
});
