import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {Avatar} from '@rneui/base';
import {useCallback, useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
} from 'react-native';
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
import * as RootNavigation from '../../navigations/RootNavigation';

const ProfileScreen: React.FC<any> = ({navigation}) => {
  const user = useUserStore(state => state.user);
  const userFriends = useUserFriendStore(state => state.userFriends);
  const loading = useUserStore(state => state.loading);
  const [coverImg, setCoverImg] = useState();
  const [profileImg, setProfileImg] = useState();
  const [toggleNotification, setToggleNotification] = useState<boolean>(false);
  // const [userId, setUserId] = useState<any>();
  // const getUserId = async () => setUserId(await AsyncStorage.getItem('userId'));
  const getUser = async () => {
    // // useUserStore.getState().setLoading(true)
    const userId = await AsyncStorage.getItem('userId');
    const user = await useUserStore.getState().getUser(userId ?? '');
    setCoverImg(user?.imgCoverUrl);
    setProfileImg(user?.imgProfileUrl);
    // useUserStore.getState().setLoading(false)
  };
  const [toggleOption, setToggleOption] = useState<boolean>(false);
  const getFriendRequest = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const res = await useUserFriendStore
      .getState()
      .getFriendRequest(userId ?? '');
  };

  useEffect(() => {
    getUser();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, []),
  );

  const onPressChangeImg = async (imgType: 'profile' | 'cover') => {
    await launchImageLibrary(
      {
        mediaType: 'photo',
      },
      async res => {
        if (!res.didCancel) {
          const userId = (await AsyncStorage.getItem('userId')) ?? '';
          const file = await useFileStore
            .getState()
            .uploadFile(
              res,
              imgType === 'profile'
                ? FileResource.USER_PROFILE
                : FileResource.USER_COVER,
              userId,
            );

          if (imgType === 'profile') {
            setProfileImg(file?.path);
          } else {
            setCoverImg(file?.path);
          }
        }
      },
    );
  };

  const onAcceptFriendRequest = async (userFriendId: string) => {
    await useUserFriendStore.getState().updateUserFriend(userFriendId, {
      userFriendId,
      status: 'SUCCESS',
    });
    await getFriendRequest();
  };

  const onRejectFriendRequest = async (userFriendId: string) => {
    await useUserFriendStore.getState().deleteUserFriend(userFriendId);
    await getFriendRequest();
  };

  return (
    <View style={[stylesCentral.container]}>
      <View style={styles.userDetail}>
        <Image
          style={styles.cover}
          source={coverImg ? {uri: coverImg} : images.cover}></Image>
        <TouchableOpacity
          containerStyle={styles.changeCoverImg}
          onPress={() => onPressChangeImg('cover')}>
          <Image source={icons.changeImage}></Image>
        </TouchableOpacity>
        <Avatar
          avatarStyle={styles.profile}
          containerStyle={styles.profileContainer}
          size={normalize(100)}
          rounded
          source={profileImg ? {uri: profileImg} : icons.profileActive}
        />
        <TouchableOpacity
          containerStyle={styles.changeProfileImg}
          onPress={() => onPressChangeImg('profile')}>
          <Image source={icons.changeImage}></Image>
        </TouchableOpacity>
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
            <TouchableOpacity
              onPress={async () => {
                await getFriendRequest();
                setToggleNotification(!toggleNotification);
              }}
              style={styles.input}>
              <Text style={styles.inputText}>Notification</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{flex: 10}}>
        <MyEventNavigator />
      </View>
      <ProfileOption style={[styles.option]}></ProfileOption>
      {toggleNotification && (
        <View style={styles.notification}>
          <FlatList
            data={userFriends}
            keyExtractor={item => item.userFriendId}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={styles.userFriendContainer}
                  onPress={() => {
                    RootNavigation.navigate('Profile', {
                      screen: 'FriendProfileScreen',
                      params: {
                        userId: item.userId,
                      },
                    });
                  }}>
                  <Avatar
                    avatarStyle={styles.img}
                    containerStyle={styles.imgContainer}
                    size={normalize(48)}
                    rounded
                    source={{uri: item?.user?.imgProfileUrl}}
                  />
                  {/* <Image source={item.icon} style={{marginTop: normalize(2)}}></Image> */}
                  <View style={styles.friendDetail}>
                    <Text style={styles.friendName}>
                      {item?.user?.fullName}
                    </Text>
                  </View>
                  <View
                    style={{
                      // width: normalize(120),
                      marginHorizontal: normalize(4),
                      alignSelf: 'center',
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity style={{marginHorizontal: normalize(8)}}>
                      <Image
                        source={icons.tick}
                        style={{width: normalize(20), height: normalize(20)}}
                        // resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        marginHorizontal: normalize(8),
                        marginTop: normalize(2),
                      }}>
                      <Image
                        source={icons.cross}
                        style={{width: normalize(20), height: normalize(20)}}
                        // resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
    </View>
  );
};
export default ProfileScreen;

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
    // paddingHorizontal: normalize(24),
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
  notification: {
    position: 'absolute',
    top: normalize(316),
    left: normalize(3),
    width: '98%',
    // height: normalize(90),
    // alignSelf: 'flex-start',
    // flexDirection: 'row',
    paddingHorizontal: normalize(8),
    borderRadius: normalize(16),
    backgroundColor: colors.white,
    // Shadow only works on iOS.
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 15,
  },
  userFriendContainer: {
    height: normalize(72),
    marginVertical: normalize(1),
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
  friendDetail: {
    width: normalize(172),
    marginHorizontal: normalize(8),
    alignSelf: 'center',
  },
  friendName: {
    fontFamily: fonts.medium,
    fontSize: normalize(16),
  },
});
