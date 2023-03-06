import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar} from '@rneui/base';
import {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {font} from '../../common/assets';
import colors from '../../common/assets/colors/colors';
import icons from '../../common/assets/icons';
import images from '../../common/assets/images';
import {FileResource} from '../../common/enums/fileResource';
import {normalize} from '../../common/function/normalize';
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
    useUserStore.getState().getUser(userId ?? '');
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

  return (
    <View style={[stylesCentral.container]}>
      <View style={styles.userDetail}>
        <Image
          style={styles.cover}
          source={coverImg ? {uri: coverImg} : images.cover}></Image>
        <Avatar
          avatarStyle={styles.profile}
          containerStyle={styles.profileContainer}
          size={normalize(100)}
          rounded
          source={profileImg ? {uri: profileImg} : icons.profileActive}
        />
        <View style={styles.user}>
          <Text style={styles.name}>{user?.fullName}</Text>
        </View>
      </View>
      <ProfileOption style={styles.option}></ProfileOption>
      <MyEventNavigator></MyEventNavigator>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: normalize(130),
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
    left: normalize(10),
    bottom: normalize(-70),
    backgroundColor: colors.white,
  },
  user: {
    width: '60%',
    height: '100%',
    position: 'absolute',
    left: normalize(140),
    top: normalize(220),
  },
  name: {
    marginRight: normalize(40),
    fontFamily: font.medium,
    fontSize: normalize(18),
  },
  option: {
    zIndex: 1,
    elevation: 1,
    width: '100%',
    height: '100%',
    // backgroundColor: 'red'
  },
});
