import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, icons} from '../../common/assets';
import {normalize} from '../../common/function/normalize';
import {color} from '@rneui/themed/dist/config';
import {useAuthStore} from '../../stores/authStore';
import * as RootNavigation from '../../navigations/RootNavigation';
import {useState} from 'react';

export const ProfileOption: React.FC<any> = props => {
  const [toggleOption, setToggleOption] = useState<boolean>(false);
  const {style} = props;
  const logout = async () => {
    useAuthStore.getState().logout();
    RootNavigation.navigate('Auth', {
      screen: 'HomeScreen',
    });
  };
  const data = [
    {
      id: 1,
      name: 'Edit Interests',
      icon: icons.movie,
      onSelect: () => {
        RootNavigation.navigate('Auth', {
          screen: 'InterestScreen',
        });
      },
    },
    {
      id: 2,
      name: 'Edit Profile',
      icon: icons.editProfile,
      onSelect: () => {
        RootNavigation.navigate('Main', {
          screen: 'EditProfileScreen',
        });
      },
    },
    {
      id: 3,
      name: 'Log out',
      icon: icons.logout,
      onSelect: () => logout(),
    },
  ];

  return (
    <View style={[styles.main, style]}>
      <TouchableOpacity
        onPress={() => {
          setToggleOption(!toggleOption);
        }}>
        <Image source={icons.option}></Image>
      </TouchableOpacity>
      {toggleOption && (
        <View style={styles.options}>
          <FlatList
            data={data}
            keyExtractor={item => item.name}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity style={styles.option} onPress={item.onSelect}>
                  <Image
                    source={item.icon}
                    style={{marginTop: normalize(2)}}></Image>
                  <Text style={{marginLeft: normalize(16)}}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}

      {/* <MenuProvider style={styles.container}>
        <Menu style={{}}>
          <MenuTrigger>
            <Image source={icons.option}></Image>
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.options}>
            <Text>Menu</Text>
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
      </MenuProvider> */}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'flex-end',
  },
  // container: {
  //   top: 0,
  //   right: 0,
  //   alignItems: 'flex-end',
  //   marginTop: normalize(225),
  //   marginRight: normalize(10),
  // },
  options: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    padding: normalize(16),
    borderRadius: normalize(18),
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
  option: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginVertical: normalize(5),
  },
});
