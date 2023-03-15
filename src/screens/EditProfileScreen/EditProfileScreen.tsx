import {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, icons} from '../../common/assets';
import {height, normalize} from '../../common/function/normalize';
import {stylesApp} from '../../common/styles/AppStyle';
import CustomHeader from '../../components/Text/CustomHeader';
import {useAuthStore} from '../../stores/authStore';
import * as RootNavigation from '../../navigations/RootNavigation';
import {launchImageLibrary} from 'react-native-image-picker';
import {useUserStore} from '../../stores/userStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Touchable} from '../../components/Button/Touchable';

const EditProfileScreen: React.FC<any> = ({navigation}) => {
  const form = useUserStore(state => state.userProfileForm);
  const user = useAuthStore(state => state.user);

  const onSubmit = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const user = useUserStore.getState().updateUser(userId ?? '', {
      ...form,
    });

    if (user) {
      navigation.goBack();
    }
  };

  const getUser = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const user = await useUserStore.getState().getUser(userId ?? '');
    console.log(user?.bio)
    useUserStore.getState().setUserProfileForm({
      ...user,
    });
  };

  const onChangeText = (field: string, value: string) =>
    useUserStore.getState().setUserProfileForm({...form, [field]: value});

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={[stylesApp.container]}>
      <CustomHeader
        title="Edit Profile"
        showBackBtn
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={{flex: 1}}
          contentContainerStyle={{
            paddingBottom: normalize(130),
          }}>
          <TextInput
            value={form?.fullName}
            style={styles.input}
            editable={true}
            placeholder={'Full Name'}
            // placeholderTextColor={colors.disable}
            onChangeText={value => onChangeText('fullName', value)}
          />
          <TextInput
            value={form?.bio}
            style={[
              styles.input,
              {
                minHeight: normalize(100),
                paddingTop: normalize(15),
                textAlignVertical: 'top',
              },
            ]}
            // editable={!view ?? true}
            placeholder={'Bio'}
            multiline
            onChangeText={value => onChangeText('bio', value)}
          />
          <Touchable
            label={'Save'}
            // disable={!validateField}
            // color={!validateField ? colors.disable : colors.primary}
            disable={false}
            color={colors.primary}
            fontColor={colors.white}
            style={[styles.button, {marginTop: normalize(30)}]}
            onPress={() => onSubmit()}></Touchable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default EditProfileScreen;

const styles = StyleSheet.create({
  main: {
    // flex: 0,
    // flexDirection: 'column',
    height: '100%',
  },
  button: {
    margin: normalize(20),
    marginBottom: normalize(0),
    padding: normalize(10),
  },
  input: {
    height: normalize(50),
    marginVertical: normalize(10),
    margin: normalize(30),
    padding: normalize(15),
    borderColor: colors.disable,
    borderWidth: 0.5,
    borderRadius: normalize(8),
    color: colors.fontBlack,
  },
});
