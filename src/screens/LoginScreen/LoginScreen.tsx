import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {stylesApp} from '../../common/styles/AppStyle';

const LoginScreen: React.FC<any> = ({navigation}) => {
  const [value, setValue] = useState<string>('');
  const [isError, setIsError] = React.useState(false);
  const [errMessage, setErrMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = React.useState<string>('');
  // const login = () => {
  //   setLoading(true);
  //   Authentication.generateOtp(value)
  //     .then(result => {
  //       const telNumber = value;
  //       setValue('');
  //       setLoading(false);
  //       navigation.navigate('OtpScreen', {
  //         telNumber: telNumber,
  //         token: result.result.token,
  //         refCode: result.result.refCode,
  //         isRegisterScreen: false,
  //       });
  //     })
  //     .catch(err => {
  //       setLoading(false);
  //       if (err.response.data.statusCode === 409) {
  //         setErrMessage('เบอร์นี้ถูกลงทะเบียนเรียบร้อยแล้ว');
  //       } else if (err.response.data.statusCode === 400) {
  //         setErrMessage('ไม่พบเบอร์โทรนี้ในระบบโปรดลงทะเบียนอีกครั้ง');
  //       } else if (err) {
  //         Toast.show({
  //           type: 'error',
  //           text1: 'ระบบเครือขายมีปัญหา กรุณาลองใหม่อีกครั้งในภายหลัง',
  //         });
  //       }
  //     });
  // };
  return (
    <SafeAreaView style={stylesApp.container}>
      <Text>hey</Text>
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  //   inner: {
  //     paddingHorizontal: normalize(17),
  //     flex: 1,
  //     justifyContent: 'space-around',
  //   },
  //   headText: {
  //     fontFamily: font.bold,
  //     fontSize: normalize(20),
  //     marginBottom: normalize(24),
  //     color: colors.fontBlack,
  //   },
  //   label: {
  //     fontFamily: font.light,
  //     fontSize: normalize(14),
  //     color: colors.gray,
  //     marginTop: normalize(24),
  //   },
  //   containerTopCard: {
  //     flex: 1,
  //     paddingTop: normalize(70),
  //   },
});
