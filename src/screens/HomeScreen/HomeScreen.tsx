import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {stylesApp} from '../../common/styles/AppStyle';
import {normalize} from '../../common/function/Normalize';
import {MainButton} from '../../components/Input/Button';
import {colors} from '../../common/assets';
// import HomeCarousel from '../../components/Carousel/HomeCarousel';
// import {MainButton} from '../../components/Button/MainButton';
// import {colors, font} from '../../assets';

const HomeScreen: React.FC<any> = ({navigation}) => {
  return (
    <SafeAreaView style={stylesApp.container}>
      <View style={styles.inner}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text>Wegether Logo</Text>
        </View>
        <View>
          <MainButton
            label="Login with Facebook"
            color={colors.orange}
            onPress={() => navigation.navigate('LoginScreen')}
          />

          <MainButton
            label="Login with Google Account"
            color={colors.greyWhite}
            fontColor={'black'}
            onPress={() => {
              // mixpanel.track('Create account');
              navigation.navigate('ConditionScreen');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  btnContainer: {
    width: normalize(343),
    marginVertical: normalize(10),
  },
  inner: {
    paddingHorizontal: normalize(17),
    flex: 1,
    justifyContent: 'space-around',
  },
});
