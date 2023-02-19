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

const CreateEventScreen: React.FC<any> = ({navigation}) => {
  const [form, setForm] = useState<any>({
    email: null,
    password: null,
    confirmPassword: null,
    fullName: null,
    idNo: null,
    telNo: null,
  });

  const register = () => {
    // if (form.password !== form.confirmPassword) {
    //   console.log('wrong');
    // }
    useAuthStore.getState().register({...form});
  };

  const onChangeText = (field: string, value: string) =>
    setForm({...form, [field]: value});

  return (
    <SafeAreaView style={[stylesApp.container]}>
      <CustomHeader
        title="Create Event"
        showBackBtn
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <TextInput
          value={form.fullname}
          style={styles.input}
          editable={true}
          placeholder={'Full Name'}
          // placeholderTextColor={colors.disable}
          // onTextInput={value => {
          //   console.log(value.)
          // }}
          onChangeText={value => onChangeText('fullName', value)}
        />
        <TextInput
          value={form.telNo}
          style={styles.input}
          editable={true}
          placeholder={'Telephone Number'}
          // placeholderTextColor={colors.disable}
          onChangeText={value => onChangeText('telNo', value)}
        />
        <TextInput
          value={form.idNo}
          style={styles.input}
          editable={true}
          placeholder={'ID Card Number'}
          // placeholderTextColor={colors.disable}
          onChangeText={value => onChangeText('idNo', value)}
        />
        <TextInput
          value={form.email}
          style={styles.input}
          editable={true}
          placeholder={'Email'}
          // placeholderTextColor={colors.disable}
          onChangeText={value => onChangeText('email', value)}
        />
        <TextInput
          value={form.password}
          style={styles.input}
          editable={true}
          secureTextEntry={true}
          maxLength={12}
          placeholder={'Password'}
          // placeholderTextColor={colors.disable}
          onChangeText={value => onChangeText('password', value)}
        />
        <TextInput
          value={form.confirmPassword}
          style={styles.input}
          editable={true}
          secureTextEntry={true}
          maxLength={12}
          placeholder={'Confirm Password'}
          // placeholderTextColor={colors.disable}
          onChangeText={value => onChangeText('confirmPassword', value)}
        />
        <Touchable
          label={'Post'}
          color={colors.primary}
          fontColor={colors.white}
          style={[styles.button, {marginTop: normalize(30)}]}
          onPress={() => {
            register();
            // navigation.navigate('InterestScreen');
          }}></Touchable>
      </View>
    </SafeAreaView>
  );
};
export default CreateEventScreen;

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
