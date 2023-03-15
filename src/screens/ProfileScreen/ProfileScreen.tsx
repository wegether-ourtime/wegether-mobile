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
import icons from '../../common/assets/icons';
import images from '../../common/assets/images';
import {FileResource} from '../../common/enums/fileResource';
import {normalize} from '../../common/function/normalize';
import {stylesApp} from '../../common/styles/AppStyle';
import {stylesCentral} from '../../common/styles/StylesCentral';
import {ProfileOption} from '../../components/Option/ProfileOption';
import MyEventNavigator from '../../navigations/topTabs/MyEventNavigator';
import {useAuthStore} from '../../stores/authStore';
import {useUserStore} from '../../stores/userStore';

const ProfileScreen: React.FC<any> = ({navigation}) => {
  const user = useUserStore(state => state.user);
  const loading = useUserStore(state => state.loading);
  const [coverImg, setCoverImg] = useState();
  const [profileImg, setProfileImg] = useState();
  const getUser = async () => {
    // useUserStore.getState().setLoading(true)
    const userId = await AsyncStorage.getItem('userId');
    await useUserStore.getState().getUser(userId ?? '');
    setCoverImg(
      user?.files?.find((f: any) => f.resource == FileResource.USER_COVER)
        ?.path,
    );
    setProfileImg(
      user?.files?.find((f: any) => f.resource == FileResource.USER_PROFILE)
        ?.path,
    );
    // useUserStore.getState().setLoading(false)
  };
  const [toggleOption, setToggleOption] = useState<boolean>(false);

  useEffect(() => {
    getUser();
  }, [!user]);

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [!user]),
  );

  const onPressChangeProfileImg = () => {};

  const onPressChangeCoverImg = () => {};

  const onPressChangeImg = async () => {
    const img = await launchImageLibrary(
      {
        mediaType: 'photo',
      },
      res => {
        // console.log(res);
        // if (!res.didCancel) setEventImg(res);
      },
    );
  };

  return (
    <View style={[stylesCentral.container]}>
      <View style={styles.userDetail}>
        <Image
          style={styles.cover}
          source={coverImg ? {uri: coverImg} : images.cover}></Image>
        {coverImg && (
          <TouchableOpacity>
            <Image
              style={styles.changeCoverImg}
              source={icons.changeImage}></Image>
          </TouchableOpacity>
        )}
        <Avatar
          avatarStyle={styles.profile}
          containerStyle={styles.profileContainer}
          size={normalize(100)}
          rounded
          source={profileImg ? {uri: profileImg} : icons.profileActive}
        />
        {profileImg && (
          <TouchableOpacity>
            <Image
              style={styles.changeProfileImg}
              source={icons.changeImage}></Image>
          </TouchableOpacity>
        )}
        <View style={styles.user}>
          <Text style={[styles.name, {paddingVertical: normalize(1)}]}>
            {user?.fullName}
          </Text>
          <Text style={[{paddingVertical: normalize(2)}]}>{user?.bio}</Text>
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
    height: '40%',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
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
    bottom: normalize(24),
    backgroundColor: colors.white,
  },
  user: {
    position: 'absolute',
    height: normalize(72),
    width: normalize(192),
    left: normalize(128),
    bottom: normalize(0),
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
    zIndex: 1,
    elevation: 1,
  },
  changeCoverImg: {
    position: 'absolute',
    padding: normalize(5),
    left: normalize(16),
    bottom: normalize(24),
  },
  changeProfileImg: {
    position: 'absolute',
    left: normalize(88),
    top: normalize(24),
  },
});
