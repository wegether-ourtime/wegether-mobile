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
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import VirtualKeyboard from '../../components/VirtualKeyboard/Virtualkeyboard';
import {normalize} from '../../common/function/normalize';
import {colors, font} from '../../common/assets';
import {stylesCentral} from '../../common/styles/StylesCentral';

const CodeScreen: React.FC<any> = ({navigation}) => {
  const [value, setValue] = useState<string>('');

  return (
    <SafeAreaView style={stylesCentral.container}>
      {/* <View style={styles.code}>
        <Text>{value}</Text>
      </View>
      <View style={styles.input}>
        <VirtualKeyboard value={value} onChange={setValue} />
      </View> */}
    </SafeAreaView>
  );
};
export default CodeScreen;

const styles = StyleSheet.create({
  inner: {
    paddingHorizontal: normalize(17),
    flex: 1,
    // justifyContent: 'space-around',
  },
  headText: {
    fontFamily: font.bold,
    fontSize: normalize(20),
    marginBottom: normalize(24),
  },
  label: {
    fontFamily: font.light,
    fontSize: normalize(14),
    color: colors.gray,
    marginTop: normalize(24),
  },
  containerTopCard: {
    flex: 1,
  },
  input: {
    padding: normalize(16),
    // backgroundColor: 'red',
  },
  code: {
    height: normalize(200)
  }
});
