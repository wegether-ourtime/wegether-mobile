import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {stylesApp} from '../../common/styles/AppStyle';
import {normalize} from '../../common/function/normalize';
import {MainButton} from '../../components/Button/MainButton';
import {colors, font, image} from '../../common/assets';
import * as RootNavigation from '../../navigations/RootNavigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Touchable} from '../../components/Button/Touchable';
import CustomHeader from '../../components/Text/CustomHeader';
import {useAuthStore} from '../../stores/authStore';
import {validateEmail} from '../../common/function/validate';

const LoginScreen: React.FC<any> = ({navigation}) => {
  const [form, setForm] = useState<any>({
    email: null,
    password: null,
  });
  const [validate, setValidate] = useState<any>({
    email: null,
    password: null,
  });

  const login = async () => {
    // validateInput()
    await useAuthStore.getState().login({...form});
    const user = useAuthStore.getState().user;
    if (user) {
      RootNavigation.navigate('Main', {
        screen: 'MainScreen',
      });
    } else {
    }
  };

  const onChangeText = (field: string, value: string) =>
    setForm({...form, [field]: value});

  const validateInput = () => {
    if (!validateEmail(form.email)) {
    }
  };

  // const screen = Dimensions.get('window');
  // const imageHeight = Math.round((screen.width * 9) / 50);
  // const imageWidth = screen.width;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={stylesApp.container}>
          <CustomHeader
            title="Login with E-mail"
            showBackBtn
            onPressBack={() => navigation.goBack()}
          />
          <View style={[{height: '100%'}, styles.main]}>
            {/* <View style={[]}>
                  <Image
                    source={image.wegether}
                    style={{height: imageHeight, width: imageWidth}}
                    resizeMode={'contain'}
                  />
                </View> */}
            <View style={[{paddingTop: '50%'}]}>
              <TextInput
                value={form.email}
                style={styles.input}
                editable={true}
                placeholder={'Email'}
                autoCapitalize="none"
                // autoFocus={autoFocus}
                // placeholderTextColor={colors.disable}
                onChangeText={value => onChangeText('email', value)}
              />
              <TextInput
                value={form.password}
                secureTextEntry={true}
                style={styles.input}
                editable={true}
                placeholder={'Password'}
                maxLength={12}
                // placeholderTextColor={colors.disable}
                onChangeText={value => onChangeText('password', value)}
              />
            </View>
            <Touchable
              label={'Login'}
              color={colors.primary}
              fontColor={colors.white}
              style={styles.button}
              onPress={() => login()}></Touchable>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
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
