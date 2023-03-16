import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, font} from '../../common/assets';
import {normalize} from '../../common/function/normalize';
import {stylesCentral} from '../../common/styles/StylesCentral';
import CustomHeader from '../../components/Text/CustomHeader';
import ChatListNavigator from '../../navigations/topTabs/ChatListNavigator';
import {useChatStore} from '../../stores/chatStore';

const ChatListScreen: React.FC<any> = ({navigation}) => {
  const loading = useChatStore(state => state.loading);
  const insets = useSafeAreaInsets();

  return (
    <View style={[stylesCentral.container, {paddingTop: insets.top}]}>
      <CustomHeader
        title={'Message'}
        showBackBtn
        onPressBack={() => navigation.goBack()}
      />
      <View style={{flex: 10}}>
        <ChatListNavigator />
      </View>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
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
