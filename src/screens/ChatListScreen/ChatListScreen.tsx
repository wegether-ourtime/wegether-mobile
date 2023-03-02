import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, font} from '../../common/assets';
import {normalize} from '../../common/function/normalize';
import {stylesCentral} from '../../common/styles/StylesCentral';
import ChatListNavigator from '../../navigations/topTabs/ChatListNavigator';
import {useAuthStore} from '../../stores/authStore';
import {useChatStore} from '../../stores/chatStore';

const ChatListScreen: React.FC<any> = ({navigation}) => {
  const user = useAuthStore(state => state.user);
  const insets = useSafeAreaInsets();
  // get all chat list(history) by user id
  // const getChatList = () => useChatStore.getState().get(eventId);
  // const chat = useChatStore(state => state.event);

  return (
    <View style={[stylesCentral.container, {paddingTop: insets.top}]}>
      <View style={{flex: 10}}>
        <ChatListNavigator />
      </View>
    </View>
  );
};
export default ChatListScreen;

const styles = StyleSheet.create({
  headCard: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(5),
  },
  activeFont: {
    fontFamily: font.medium,
    fontSize: normalize(25),
    marginLeft: normalize(18),
    color: colors.fontBlack,
  },
  font: {
    fontFamily: font.medium,
    fontSize: normalize(16),
    color: colors.white,
  },
});
