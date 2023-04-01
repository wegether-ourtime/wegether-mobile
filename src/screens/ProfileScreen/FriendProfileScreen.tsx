import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {Avatar} from '@rneui/base';
import {useCallback, useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {font} from '../../common/assets';
import colors from '../../common/assets/colors/colors';
import fonts from '../../common/assets/fonts';
import icons from '../../common/assets/icons';
import images from '../../common/assets/images';
import {FileResource} from '../../common/enums/fileResource';
import {normalize} from '../../common/function/normalize';
import {stylesApp} from '../../common/styles/AppStyle';
import {stylesCentral} from '../../common/styles/StylesCentral';
import {ProfileOption} from '../../components/Option/ProfileOption';
import MyEventNavigator from '../../navigations/topTabs/MyEventNavigator';
import {useAuthStore} from '../../stores/authStore';
import {useFileStore} from '../../stores/fileStore';
import {useUserFriendStore} from '../../stores/userFriendStore';
import {useUserStore} from '../../stores/userStore';

const FriendProfileScreen: React.FC<any> = ({navigation, route}) => {
  const [friendId] = useState(route?.params?.friendId);
  const user = useUserStore(state => state.user);
  const userFriend = useUserFriendStore(state => state.userFriend);
  const loading = useUserStore(state => state.loading);
  const [coverImg, setCoverImg] = useState();
  const [profileImg, setProfileImg] = useState();
  const getUser = async () => {
    const friend = await useUserStore.getState().getUser(friendId ?? '');
    setCoverImg(friend?.imgCoverUrl);
    setProfileImg(friend?.imgProfileUrl);
    // useUserStore.getState().setLoading(false)

    await getRelations();
  };

  const getRelations = async () => {
    const userId = await AsyncStorage.getItem('userId');
    await useUserFriendStore.getState().getRelations(userId ?? '', friendId);
  };

  const updateRalation = async (
    action: 'addFriend' | 'acceptFriend' | 'deleteFriend',
  ) => {
    const userId = await AsyncStorage.getItem('userId');

    if (action == 'addFriend') {
      await useUserFriendStore.getState().createUserFriend({
        userId,
        friendId,
      });
    } else if (action == 'acceptFriend') {
      await useUserFriendStore
        .getState()
        .updateUserFriend(userFriend?.userFriendId ?? '', {
          userFriendId: userFriend?.userFriendId,
          status: 'SUCCESS',
        });
    } else if (action == 'deleteFriend') {
      await useUserFriendStore
        .getState()
        .deleteUserFriend(userFriend?.userFriendId);
    }

    await getRelations();
  };

  useEffect(() => {
    getUser();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, []),
  );

  return (
    <View style={[stylesCentral.container]}>
      <View style={styles.userDetail}>
        <Image
          style={styles.cover}
          source={coverImg ? {uri: coverImg} : images.cover}></Image>
        {/* <TouchableOpacity
          containerStyle={styles.changeCoverImg}
          onPress={() => onPressChangeImg('cover')}>
          <Image source={icons.changeImage}></Image>
        </TouchableOpacity> */}
        <Avatar
          avatarStyle={styles.profile}
          containerStyle={styles.profileContainer}
          size={normalize(100)}
          rounded
          source={profileImg ? {uri: profileImg} : icons.profileActive}
        />
        {/* <TouchableOpacity
          containerStyle={styles.changeProfileImg}
          onPress={() => onPressChangeImg('profile')}>
          <Image source={icons.changeImage}></Image>
        </TouchableOpacity> */}
        <View style={styles.user}>
          <Text style={[styles.name, {paddingVertical: normalize(1)}]}>
            {user?.fullName}
          </Text>
          <Text style={[{paddingVertical: normalize(2)}]}>
            {user?.livingPlace?.name}
          </Text>
        </View>
        <View style={styles.bio}>
          <View
            style={{
              width: '60%',
              paddingHorizontal: normalize(24),
            }}>
            <Text style={styles.bioText}>{user?.gender}</Text>
            <Text style={styles.bioText}>{user?.bio}</Text>
          </View>
          <View
            style={{
              width: '40%',
              justifyContent: 'center',
            }}>
            {!userFriend && (
              <TouchableOpacity
                onPress={async () => updateRalation('addFriend')}
                style={styles.input}>
                <Text style={styles.inputText}>Add Friend</Text>
              </TouchableOpacity>
            )}
            {userFriend?.status === 'PENDING' && (
              <>
                {userFriend.friendId == friendId ? (
                  <TouchableOpacity
                    onPress={async () => updateRalation('deleteFriend')}
                    style={styles.input}>
                    <Text style={styles.inputText}>Cancel Request</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={async () => updateRalation('acceptFriend')}
                    style={styles.input}>
                    <Text style={styles.inputText}>Accept Request</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
            {userFriend?.status === 'SUCCESS' && (
              <TouchableOpacity
                // onPress={async () => {
                //   await getFriendRequest();
                //   setToggleNotification(!toggleNotification);
                // }}
                style={styles.input}>
                <Text style={styles.inputText}>Friend</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View style={{flex: 10}}>
        <MyEventNavigator />
      </View>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
    </View>
  );
};
export default FriendProfileScreen;

const styles = StyleSheet.create({
  userDetail: {
    height: '45%',
  },
  cover: {
    height: normalize(200),
    width: '100%',
  },
  profile: {
    borderRadius: normalize(2),
  },
  profileContainer: {
    padding: normalize(5),
    position: 'absolute',
    left: normalize(16),
    bottom: normalize(56),
    backgroundColor: colors.white,
  },
  user: {
    position: 'absolute',
    height: normalize(48),
    width: normalize(192),
    left: normalize(136),
    bottom: normalize(60),
    // backgroundColor: 'red',
  },
  name: {
    fontFamily: font.medium,
    fontSize: normalize(18),
    // backgroundColor: 'red'
  },
  option: {
    position: 'absolute',
    right: normalize(8),
    top: normalize(216),
  },
  changeCoverImg: {
    position: 'absolute',
    right: normalize(8),
    bottom: normalize(128),
    zIndex: 1,
  },
  changeProfileImg: {
    position: 'absolute',
    left: normalize(88),
    bottom: normalize(64),
    zIndex: 1,
  },
  bio: {
    position: 'absolute',
    width: '100%',
    paddingVertical: normalize(0),
    height: normalize(50),
    left: normalize(0),
    bottom: normalize(0),
    flexDirection: 'row',
  },
  bioText: {
    color: '#969696',
    fontFamily: fonts.bold,
    fontSize: normalize(14),
    paddingVertical: normalize(1),
  },
  input: {
    height: normalize(40),
    margin: normalize(8),
    // padding: normalize(15),
    borderColor: colors.primary,
    borderWidth: 0.5,
    borderRadius: normalize(8),
    color: colors.fontBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    color: colors.primary,
    fontFamily: font.medium,
    fontSize: normalize(14),
    // backgroundColor: 'red'
  },
});
