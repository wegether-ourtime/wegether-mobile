import {useAuthStore} from '../../stores/authStore';
import {useChatStore} from '../../stores/chatStore';

const DirectMessageScreen: React.FC<any> = ({navigation}) => {
  const user = useAuthStore(state => state.user);
  // get all chat list(history) by user id
  // const getChatList = () => useChatStore.getState().get(eventId);
  // const chat = useChatStore(state => state.event);

  return null;
};
export default DirectMessageScreen;
