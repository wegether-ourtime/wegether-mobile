import {Switch} from '@rneui/themed';
import {useEffect, useState} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, font, icons} from '../../common/assets';
import images from '../../common/assets/images';
import {normalize} from '../../common/function/normalize';
import {stylesApp} from '../../common/styles/AppStyle';
import {stylesCentral} from '../../common/styles/StylesCentral';
import {Touchable} from '../../components/Button/Touchable';
import {Filter} from '../../components/Input/Filter';
import CustomHeader from '../../components/Text/CustomHeader';
import EventTapNavigator from '../../navigations/topTabs/EventNavigator';
import {useAuthStore} from '../../stores/authStore';
import {useEventStore} from '../../stores/eventStore';
import {useUserEventStore} from '../../stores/userEventStore';

const EventDetailScreen: React.FC<any> = ({navigation, route}) => {
  const user = useAuthStore(state => state.user);
  const insets = useSafeAreaInsets();
  const {eventId} = route.params;
  const getEvent = () => useEventStore.getState().getEvent(eventId);
  const event = useEventStore(state => state.event);
  const joined = useState(false);

  useEffect(() => {
    getEvent();
  }, []);

  const onPressJoin = () => {
    useUserEventStore.getState().createUserEvent({
      eventId,
      userId: user?.userId,
    });
  };

  const onPressCancel = () => {
    SheetManager.show('CancleEventSheet');
    // useUserEventStore.getState().deleteUserEvent({
    //   eventId,
    //   userId: user?.userId,
    // });
  };

  return (
    <SafeAreaView style={[stylesApp.container]}>
      <CustomHeader
        title={event?.eventName}
        showBackBtn
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            paddingBottom: normalize(130),
          }}>
          <View
            style={[
              styles.input,
              {
                padding: normalize(0),
                height: normalize(200),
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}>
            <Image
              // source={eventImg ?? images.cover}
              source={images.cover}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          {joined ? (
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
              }}>
              <View style={{width: '50%'}}>
                <Touchable
                  label={'Cancel'}
                  color={colors.white}
                  fontColor={colors.primary}
                  style={[styles.button]}
                  onPress={onPressCancel}></Touchable>
              </View>
              <View style={{width: '50%'}}>
                <Touchable
                  label={'Join'}
                  color={colors.primary}
                  fontColor={colors.white}
                  style={[styles.button]}
                  onPress={onPressJoin}></Touchable>
              </View>
            </View>
          ) : (
            <Touchable
              label={'Join'}
              color={colors.primary}
              fontColor={colors.white}
              style={[styles.button, {marginTop: normalize(30)}]}
              onPress={onPressJoin}></Touchable>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default EventDetailScreen;

const styles = StyleSheet.create({
  main: {
    height: '100%',
  },
  button: {
    margin: normalize(20),
    marginHorizontal: normalize(10),
    // marginBottom: normalize(0),
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
