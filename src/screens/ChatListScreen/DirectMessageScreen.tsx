import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAuthStore} from '../../stores/authStore';
import {useChatStore} from '../../stores/chatStore';

const DirectMessageScreen: React.FC<any> = ({navigation}) => {
  const userFriendChats = useChatStore(state => state.userFriendChats);
  const getUserFriendChats = async () => {
    const userId = await AsyncStorage.getItem('userId');
    await useChatStore.getState().getUserFriendChats(userId ?? '');
  };

  useEffect(() => {
    getUserFriendChats();
  }, []);

  return (
    <View>
      <FlatList
        data={userFriendChats}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.container}
            // onPress={item.onSelect}
          >
            {/* <Image source={item.icon} style={{marginTop: normalize(2)}}></Image>
            <Text style={{marginLeft: normalize(16)}}>{item.name}</Text> */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default DirectMessageScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});
