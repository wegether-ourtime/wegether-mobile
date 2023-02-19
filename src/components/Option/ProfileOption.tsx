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

const data = [
  {
    id: 1,
    name: 'Edit Profile',
    // icon: <Entypo name="sound-mute" size={24} color="black" />,
  },
  {
    id: 2,
    name: 'Log out',
    // icon: <Entypo name="block" size={24} color="black" />,
  },
];

export const ProfileOption: React.FC<any> = props => {
  return (
    <View style={[styles.main, props.style]}>
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
                <MenuOption>
                  <Text>{item.name}</Text>
                  {/* <Text>{item.icon}</Text> */}
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
});
