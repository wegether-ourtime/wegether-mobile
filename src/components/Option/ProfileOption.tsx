import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {colors, icons} from '../../common/assets';
import {normalize} from '../../common/function/normalize';
import {color} from '@rneui/themed/dist/config';
import {useAuthStore} from '../../stores/authStore';
import * as RootNavigation from '../../navigations/RootNavigation';

export const ProfileOption: React.FC<any> = props => {
  const {style} = props;
  const logout = async () => {
    useAuthStore.getState().logout();
    RootNavigation.navigate('Auth', {});
  };
  const data = [
    {
      id: 1,
      name: 'Edit Profile',
      icon: icons.editProfile,
    },
    {
      id: 2,
      name: 'Log out',
      icon: icons.logout,
      onSelect: () => logout(),
    },
  ];

  return (
    <View style={[styles.main, style]}>
      <MenuProvider style={styles.container}>
        <Menu style={{}}>
          <MenuTrigger>
            <Image source={icons.option}></Image>
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.options}>
            {/* <Text>Menu</Text> */}
            <FlatList
              data={data}
              keyExtractor={item => item.name}
              renderItem={({item}) => (
                <MenuOption style={styles.option} onSelect={item.onSelect}>
                  <Image
                    source={item.icon}
                    style={{marginTop: normalize(2)}}></Image>
                  <Text style={{marginLeft: normalize(20)}}>{item.name}</Text>
                </MenuOption>
              )}
            />
          </MenuOptions>
        </Menu>
      </MenuProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    // alignItems: 'flex-end',
    // backgroundColor: 'red',
  },
  container: {
    top: 0,
    right: 0,
    alignItems: 'flex-end',
    marginTop: normalize(225),
    marginRight: normalize(10),
  },
  options: {
    marginTop: normalize(20),
    height: 'auto',
    padding: normalize(20),
    borderRadius: normalize(26),
    backgroundColor: colors.white,

    // Shadow only works on iOS.
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 15,
  },
  option: {
    flexDirection: 'row',
    marginVertical: normalize(5),
  },
});
