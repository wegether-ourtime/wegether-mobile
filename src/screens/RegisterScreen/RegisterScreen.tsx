import {StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../common/assets';
import {normalize} from '../../common/function/Normalize';
import { stylesApp } from '../../common/styles/AppStyle';
import {stylesCentral} from '../../common/styles/StylesCentral';
import {Touchable} from '../../components/Button/Touchable';
import CustomHeader from '../../components/Text/CustomHeader';

const RegisterScreen: React.FC<any> = ({navigation}) => {
  return (
    <SafeAreaView style={[stylesApp.container]}>
      <CustomHeader
        title="Create Account"
        showBackBtn
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <TextInput
          // value={formState.name}
          style={styles.input}
          editable={true}
          placeholder={'Full Name'}
          // placeholderTextColor={colors.disable}
        />
        <TextInput
          // value={formState.name}
          style={styles.input}
          editable={true}
          placeholder={'Telephone Number'}
          // placeholderTextColor={colors.disable}
        />
        <TextInput
          // value={formState.name}
          style={styles.input}
          editable={true}
          placeholder={'ID Card Number'}
          // placeholderTextColor={colors.disable}
        />
        <TextInput
          // value={formState.name}
          style={styles.input}
          editable={true}
          placeholder={'Email'}
          // placeholderTextColor={colors.disable}
        />
        <TextInput
          // value={formState.name}
          style={styles.input}
          editable={true}
          placeholder={'Password'}
          // placeholderTextColor={colors.disable}
        />
        <TextInput
          // value={formState.name}
          style={styles.input}
          editable={true}
          placeholder={'Confirm Password'}
          // placeholderTextColor={colors.disable}
        />
        <Touchable
          label={'Sign up'}
          color={colors.primary}
          fontColor={colors.white}
          style={[styles.button, { marginTop: normalize(30)}]}
          onPress={() => {
            navigation.navigate('InterestScreen');
          }}></Touchable>
      </View>
    </SafeAreaView>
  );
};
export default RegisterScreen;

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
