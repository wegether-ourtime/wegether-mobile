import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {Switch} from '@rneui/themed';
import {useCallback, useEffect, useState} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, font, icons} from '../../common/assets';
import images from '../../common/assets/images';
import {FileResource} from '../../common/enums/fileResource';
import {normalize} from '../../common/function/normalize';
import {stylesApp} from '../../common/styles/AppStyle';
import {stylesCentral} from '../../common/styles/StylesCentral';
import {Touchable} from '../../components/Button/Touchable';
import {Filter} from '../../components/Input/Filter';
import CustomHeader from '../../components/Text/CustomHeader';
import UserEvent from '../../models/UserEvent';
import EventTapNavigator from '../../navigations/topTabs/EventNavigator';
import {useAuthStore} from '../../stores/authStore';
import {useEventStore} from '../../stores/eventStore';
import {useUserEventStore} from '../../stores/userEventStore';
import * as RootNavigation from '../../navigations/RootNavigation';

const EventDetailScreen: React.FC<any> = ({navigation, route}) => {
  const user = useAuthStore(state => state.user);
  const insets = useSafeAreaInsets();
  const {eventId} = route.params;
  const event = useEventStore(state => state.event);
  const [joined, setJoined] = useState<boolean | undefined>(undefined);
  const [isHost, setIsHost] = useState<boolean | undefined>(undefined);
  const [eventImgUri, setEventImgUri] = useState<string | undefined>(undefined);

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

  const getEvent = async () => {
    const event = await useEventStore.getState().getEvent(eventId);
    const userEvent = await event.userEvents.find(async (ue: UserEvent) => {
      const userId = await AsyncStorage.getItem('userId');
      return ue.userId == userId;
    });

    const eventImg = event?.files?.find(
      (f: any) => f.resource == FileResource.EVENT,
    );
    if (eventImg) {
      setEventImgUri(eventImg.path);
    }

    if (userEvent) {
      setJoined(true);
      userEvent.isHost && setIsHost(true);
    }
  };

  useEffect(() => {
    getEvent();
  }, [!event]);

  useFocusEffect(
    useCallback(() => {
      getEvent();
    }, [!event]),
  );

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
              source={eventImgUri ? {uri: eventImgUri} : images.cover}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          {isHost ? (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
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
                  label={'Chat'}
                  color={colors.primary}
                  fontColor={colors.white}
                  style={[styles.button]}
                  onPress={() => {
                    RootNavigation.navigate('Main', {
                      screen: 'ChatScreen',
                      params: {chatId: ''},
                    });
                  }}></Touchable>
              </View>
              <View style={{width: '100%'}}>
                <Touchable
                  label={'Edit'}
                  color={colors.primary}
                  fontColor={colors.white}
                  style={[styles.button]}
                  onPress={() => {
                    RootNavigation.navigate('Main', {
                      screen: 'CreateEventScreen',
                      params: {isEdit: true, eventId},
                    });
                  }}></Touchable>
              </View>
            </View>
          ) : (
            <>
              {joined ? (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'center',
                    }}>
                    <View style={{width: '50%'}}>
                      <Touchable
                        label={'Cancel Join'}
                        color={colors.white}
                        fontColor={colors.primary}
                        style={[styles.button]}
                        onPress={onPressCancel}></Touchable>
                    </View>
                    <View style={{width: '50%'}}>
                      <Touchable
                        label={'Chat'}
                        color={colors.primary}
                        fontColor={colors.white}
                        style={[styles.button]}
                        onPress={() => {}}></Touchable>
                    </View>
                  </View>
                </>
              ) : (
                <Touchable
                  label={'Join'}
                  color={colors.primary}
                  fontColor={colors.white}
                  style={[styles.button, {marginTop: normalize(30)}]}
                  onPress={onPressJoin}></Touchable>
              )}
            </>
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
  buttonContainer: {
    backgroundColor: 'red',
    // flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
