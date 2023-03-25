import {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../common/assets';
import {normalize} from '../../common/function/normalize';
import {stylesApp} from '../../common/styles/AppStyle';
import {stylesCentral} from '../../common/styles/StylesCentral';
import {Touchable} from '../../components/Button/Touchable';
import CustomHeader from '../../components/Text/CustomHeader';
import {useAuthStore} from '../../stores/authStore';

const TermAndConditionScreen: React.FC<any> = ({navigation}) => {
  return <></>;
};
export default TermAndConditionScreen;

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
