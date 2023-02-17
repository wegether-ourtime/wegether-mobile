import {Avatar} from '@rneui/base';
import {Text} from '@rneui/themed';
import {View, Image, StyleSheet} from 'react-native';
import colors from '../../common/assets/colors/colors';
import icons from '../../common/assets/icons';
import images from '../../common/assets/images';
import {normalize} from '../../common/function/normalize';
import {stylesCentral} from '../../common/styles/StylesCentral';

const ProfileScreen: React.FC<any> = ({navigation}) => {
  return (
    <View style={[stylesCentral.container]}>
      <View style={[]}>
        <Image style={styles.cover} source={images.cover}></Image>
        <Avatar
          avatarStyle={styles.profile}
          containerStyle={styles.profileContainer}
          size={normalize(100)}
          rounded
          source={images.profile}
        />

        {/* <View style={styles.headCard}>
          <View>
            <Text
              style={{
                fontFamily: font.bold,
                fontSize: normalize(24),
                color: colors.fontBlack,
              }}></Text>
            <View style={styles.activeContainer}>
              <Text style={styles.activeFont}>Join with Wegether</Text>
            </View>
          </View>
        </View> */}
      </View>
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  cover: {
    height: normalize(200),
    width: '100%',
  },
  profile: {
    borderRadius: normalize(2),
    borderColor: colors.white,
  },
  profileContainer: {
    padding: normalize(5),
    position: 'absolute',
    left: normalize(50),
    bottom: normalize(-50),
    backgroundColor: colors.white,
  },
});
