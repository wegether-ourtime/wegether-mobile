import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {stylesApp} from '../../common/styles/AppStyle';
import {normalize} from '../../common/function/normalize';
import {MainButton} from '../../components/Button/MainButton';
import {colors, font, image} from '../../common/assets';
import * as RootNavigation from '../../navigations/RootNavigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Touchable} from '../../components/Button/Touchable';

const HomeScreen: React.FC<any> = ({navigation}) => {
  const screen = Dimensions.get('window');
  const imageHeight = Math.round((screen.width * 9) / 16);
  const imageWidth = screen.width;
  return (
    <SafeAreaView style={stylesApp.container}>
      <View style={[{height: '100%'}, styles.main]}>
        <View style={[{paddingTop: '40%'}]}>
          <Image
            source={image.wegether}
            style={{height: imageHeight, width: imageWidth}}
            resizeMode={'contain'}
          />
        </View>
        <Touchable
          label={'Login with Facebook'}
          color={colors.white}
          fontColor={colors.primary}
          style={styles.button}
          onPress={() => {
            RootNavigation.navigate('Main', {
              screen: 'MainScreen',
            });
          }}></Touchable>
        <Touchable
          label={'Login with Email'}
          color={colors.primary}
          fontColor={colors.white}
          style={styles.button}
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}></Touchable>
        <Touchable
          label={'Don’t have any account ? Sign Up'}
          fontColor={'#757575'}
          style={[styles.button, {marginTop: normalize(40)}]}
          fontSize={normalize(16)}
          onPress={() => {
            navigation.navigate('RegisterScreen');
          }}></Touchable>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  button: {
    margin: normalize(20),
    marginBottom: normalize(0),
    padding: normalize(10),
  },
});
