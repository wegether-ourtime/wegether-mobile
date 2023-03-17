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
import {useUserStore} from '../../stores/userStore';

const ProfileScreen: React.FC<any> = ({navigation}) => {
  const user = useUserStore(state => state.user);
  const loading = useUserStore(state => state.loading);
  const [coverImg, setCoverImg] = useState();
  const [profileImg, setProfileImg] = useState();
  const [userId, setUserId] = useState<any>();
  const getUserId = async () => setUserId(await AsyncStorage.getItem('userId'));
  const getUser = async () => {
    // // useUserStore.getState().setLoading(true)
    // const userId = await AsyncStorage.getItem('userId');
    const user = await useUserStore.getState().getUser(userId ?? '');
    setCoverImg(
      await user?.files?.find((f: any) => f.resource == FileResource.USER_COVER)
        ?.path,
    );
    setProfileImg(
      await user?.files?.find(
        (f: any) => f.resource == FileResource.USER_PROFILE,
      )?.path,
    );
    // useUserStore.getState().setLoading(false)
  };
  const [toggleOption, setToggleOption] = useState<boolean>(false);

  useEffect(() => {
    getUserId();
    getUser();
  }, [!userId]);

  useFocusEffect(
    useCallback(() => {
      getUserId();
      getUser();
    }, [!userId]),
  );

  const onPressChangeImg = async (imgType: 'profile' | 'cover') => {
    await launchImageLibrary(
      {
        mediaType: 'photo',
      },
      async res => {
        if (!res.didCancel) {
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
          <Text style={[{paddingVertical: normalize(2)}]}>{user?.bio}</Text>
        </View>
        <View style={styles.bio}>
          <Text style={styles.bioText}>{user?.gender}</Text>
          <Text style={styles.bioText}> {user?.bio}</Text>
        </View>
      </View>
      <View style={{flex: 10}}>
        <MyEventNavigator />
      </View>
      <ProfileOption style={[styles.option]}></ProfileOption>
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
    paddingHorizontal: normalize(24),
    height: normalize(50),
    left: normalize(0),
    bottom: normalize(0),
    // backgroundColor: 'blue',
  },
  bioText: {
    color: '#969696',
    fontFamily: fonts.bold,
    fontSize: normalize(14),
    paddingVertical: normalize(1),
  },
});
