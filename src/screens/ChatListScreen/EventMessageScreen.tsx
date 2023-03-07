import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {normalize} from '../../common/function/normalize';
import {useAuthStore} from '../../stores/authStore';
import {useChatStore} from '../../stores/chatStore';

const EventMessageScreen: React.FC<any> = ({navigation}) => {
  const eventChats = useChatStore(state => state.eventChats);
  const getUserFriendChats = async () => {
    const userId = await AsyncStorage.getItem('userId');
    await useChatStore.getState().getEventChats(userId ?? '');
  };

  useEffect(() => {
    getUserFriendChats();
  }, []);

  return (
    <View>
      <FlatList
        data={eventChats}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <TouchableOpacity
          // style={styles.option}
          // onPress={item.onSelect}
          >
            {/* <Image source={item.icon} style={{marginTop: normalize(2)}}></Image> */}
            <Text style={{marginLeft: normalize(16)}}>{item.eventName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default EventMessageScreen;
