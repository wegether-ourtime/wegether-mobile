import {Avatar} from '@rneui/base';
import {useState} from 'react';
import {View, Image, StyleSheet, Text, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {font} from '../../common/assets';
import colors from '../../common/assets/colors/colors';
import icons from '../../common/assets/icons';
import images from '../../common/assets/images';
import {normalize} from '../../common/function/normalize';
import {stylesCentral} from '../../common/styles/StylesCentral';
import {ProfileOption} from '../../components/Option/ProfileOption';
import MyEventNavigator from '../../navigations/topTabs/MyEventNavigator';
import {useAuthStore} from '../../stores/authStore';

const ProfileScreen: React.FC<any> = ({navigation}) => {
  const user = useAuthStore(state => state.user);
  const [toggleOption, setToggleOption] = useState<boolean>(false);

  return (
    <View style={[stylesCentral.container]}>
      <View style={styles.userDetail}>
        <Image style={styles.cover} source={images.cover}></Image>
        <Avatar
          avatarStyle={styles.profile}
          containerStyle={styles.profileContainer}
          size={normalize(100)}
          rounded
          source={images.profile}
        />
        <View style={styles.user}>
          <Text style={styles.name}>Chanwit Saisin</Text>
        </View>
      </View>
      <ProfileOption style={styles.option}></ProfileOption>
      <MyEventNavigator></MyEventNavigator>
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
    zIndex: 3,
    elevation: 3,
    width: '100%',
    height: '100%',
    // backgroundColor: 'red'
  },
});
