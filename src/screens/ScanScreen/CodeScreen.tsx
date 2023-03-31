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
  Animated,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import VirtualKeyboard from '../../components/VirtualKeyboard/Virtualkeyboard';
import {normalize} from '../../common/function/normalize';
import {colors, font} from '../../common/assets';
import {stylesCentral} from '../../common/styles/StylesCentral';
import icons from '../../common/assets/icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const CodeScreen: React.FC<any> = ({navigation}) => {
  const [value, setValue] = useState<string>('');
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState<string>('');

  const onChangeCode = (value: string) => setCode(value);
  const onSubmit = () => {
    Toast.show({
      type: 'fail',
      text1: 'Error',
      text2: `Can't find event with this code.`,
    });
  };

  return (
    <View style={[stylesCentral.container, {paddingTop: insets.top}]}>
      <View style={{flex: 2}}>
        <View style={styles.headCard}>
          <View>
            <Text
              style={{
                fontFamily: font.bold,
                fontSize: normalize(24),
                color: colors.fontBlack,
              }}></Text>
            <View style={styles.activeContainer}>
              <Text style={styles.activeFont}>Join with</Text>
            </View>
            <View style={styles.activeContainer}>
              <Text style={styles.activeFont}>Wegether</Text>
            </View>
          </View>
        </View>
      </View>
      {/* <Filter></Filter> */}
      <View style={{flex: 10, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.inputConatiner}>
          <View style={styles.inputName}>
            <Text style={styles.inputText}>Please enter the event code</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              value={code}
              style={styles.input}
              editable={true}
              placeholder={'Ex. A4QB67'}
              autoCapitalize={'characters'}
              // placeholderTextColor={colors.disable}
              onChangeText={value => onChangeCode(value)}
            />
            <TouchableOpacity
              onPress={onSubmit}
              containerStyle={{
                margin: normalize(16),
                justifyContent: 'center',
              }}>
              <Image source={icons.search} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CodeScreen;

const styles = StyleSheet.create({
  headCard: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(5),
  },
  activeFont: {
    fontFamily: font.medium,
    fontSize: normalize(25),
    marginLeft: normalize(18),
    color: colors.fontBlack,
  },
  font: {
    fontFamily: font.medium,
    fontSize: normalize(16),
    color: colors.white,
  },
  inputConatiner: {
    width: normalize(320),
    marginVertical: normalize(0),
    marginHorizontal: normalize(24),
    top: normalize(-40),
  },
  inputName: {
    flexDirection: 'row',
    marginVertical: normalize(16),
  },
  inputText: {
    paddingHorizontal: normalize(8),
    fontFamily: font.medium,
    fontSize: normalize(16),
  },
  input: {
    height: normalize(48),
    width: normalize(280),
    padding: normalize(16),
    borderColor: colors.disable,
    borderWidth: 1.5,
    borderRadius: normalize(8),
    color: colors.fontBlack,
    backgroundColor: colors.white
  },
});
