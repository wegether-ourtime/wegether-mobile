import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {Switch} from '@rneui/themed';
import {useCallback, useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
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
import CustomHeader from '../../components/Text/CustomHeader';
import UserEvent from '../../models/UserEvent';
import {useAuthStore} from '../../stores/authStore';
import {useEventStore} from '../../stores/eventStore';
import {useUserEventStore} from '../../stores/userEventStore';
import * as RootNavigation from '../../navigations/RootNavigation';
import {CalendarInput} from '../../components/Input/Calendar';
import TimeInput from '../../components/Input/Time';
import {Couter} from '../../components/Input/Couter';
import {allCategories} from '../../common/function/utility';
import {Category} from '../../components/Category/Category';

const EventDetailScreen: React.FC<any> = ({navigation, route}) => {
  const user = useAuthStore(state => state.user);
  const insets = useSafeAreaInsets();
  const {eventId} = route.params;
  const event = useEventStore(state => state.event);
  const [userId, setUserId] = useState<any>();
  const getUserId = async () => setUserId(await AsyncStorage.getItem('userId'));
  const [joined, setJoined] = useState<boolean | undefined>(undefined);
  const [isHost, setIsHost] = useState<boolean | undefined>(undefined);

  const [eventImgUri, setEventImgUri] = useState<string | undefined>(undefined);

  useEffect(() => {
    getUserId();
    getEvent();
  }, [!userId]);

  const onPressJoin = () => {
    useUserEventStore.getState().createUserEvent({
      eventId,
      userId: user?.userId,
    });
  };

  const onPressCancel = () => {
    SheetManager.show('CancelEventSheet');
  };

  const getEvent = async () => {
    const event = await useEventStore.getState().getEvent(eventId);
    // find joined?
    const userEvent = await event.userEvents.find(
      (ue: UserEvent) => ue.userId == userId,
    );

    useEventStore.getState().setForm({
      ...event,
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
    console.log(event.eventCategories);
  };

  useEffect(() => {
    getEvent();
  }, [!event]);

  useFocusEffect(
    useCallback(() => {
      getEvent();

      return () => {
        useEventStore.getState().clearForm();
      };
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
                marginHorizontal: normalize(24),
                padding: normalize(0),
                height: normalize(200),
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Image
              source={eventImgUri ? {uri: eventImgUri} : images.cover}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          <FlatList
            keyExtractor={item => item.categoryId}
            data={event?.eventCategories}
            style={styles.categories}
            horizontal
            // pagingEnabled={false}
            showsHorizontalScrollIndicator={false}
            // extraData={events}
            renderItem={({index, item}: any) => {
              const category = allCategories.find(
                ac => ac.id == item.categoryId,
              );
              return (
                <Category
                  key={category?.id}
                  categoryId={category?.id}
                  name={category?.name}
                  icon={category?.icon}
                  disabled
                  // selected={
                  //   event?.eventCategories?.find(
                  //     (ec: any) => ec.categoryId === item.id,
                  //   )
                  //     ? true
                  //     : false
                  // }
                />
              );
            }}
          />
          <View style={styles.inputConatiner}>
            <View style={styles.inputName}>
              <Text style={{marginHorizontal: normalize(4)}}>Name</Text>
            </View>
            <TextInput
              value={event?.eventName}
              style={styles.input}
              editable={false}
              placeholder={'Event Name'}
            />
          </View>
          {/* <View
            style={{
              ...styles.inputConatiner,
              // marginHorizontal: normalize(24),
              // marginVertical: normalize(8),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{paddingHorizontal: normalize(10)}}>
              How many People?
            </Text>
            <View style={{paddingHorizontal: normalize(10)}}>
              <Couter disabled={true}></Couter>
            </View>
          </View> */}
          <View style={styles.inputConatiner}>
            <View style={styles.inputName}>
              <Image
                source={icons.calendar}
                style={{marginHorizontal: normalize(4)}}
              />
              <Text style={{marginHorizontal: normalize(4)}}>Days</Text>
            </View>
            <CalendarInput
              style={styles.input}
              disabled={true}
              // disabled={view}
            ></CalendarInput>
          </View>
          <View style={styles.inputConatiner}>
            <View style={styles.inputName}>
              <Image
                source={icons.time}
                style={{marginHorizontal: normalize(4)}}
              />
              <Text style={{marginHorizontal: normalize(4)}}>Times</Text>
            </View>
            <TimeInput
              style={styles.input}
              disabled={true}
              // disabled={view}
            ></TimeInput>
          </View>
          <View style={styles.inputConatiner}>
            <View style={styles.inputName}>
              <Image
                source={icons.location}
                style={{marginHorizontal: normalize(4)}}
              />
              <Text style={{marginHorizontal: normalize(4)}}>Location</Text>
            </View>
            <TouchableOpacity
              style={styles.input}
              disabled={true}
              // disabled={view}
              onPress={() => {
                RootNavigation.navigate('Main', {
                  screen: 'LocationScreen',
                });
              }}>
              {event?.location ? (
                <Text style={{color: colors.fontBlack}}>
                  {event.location.name}
                </Text>
              ) : (
                <Text style={{color: colors.grayPlaceholder}}>Location</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.inputConatiner}>
            <View style={styles.inputName}>
              {/* <Image
                source={icons.calendar}
                style={{marginHorizontal: normalize(4)}}
              /> */}
              <Text style={{marginHorizontal: normalize(4)}}>Detail</Text>
            </View>
            <TextInput
              value={event?.eventDetail}
              style={[
                styles.input,
                {
                  height: normalize(72),
                  paddingTop: normalize(15),
                  textAlignVertical: 'top',
                },
              ]}
              // disable={!view ?? true}
              placeholder={'รายละเอียดเพิ่มเติม'}
              editable={false}
              multiline
              maxLength={133}
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
                      screen: 'EventFormScreen',
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
  buttonContainer: {
    backgroundColor: 'red',
    // flexDirection: 'row',
    flexWrap: 'wrap',
  },
  input: {
    height: normalize(48),
    padding: normalize(15),
    borderColor: colors.disable,
    borderWidth: 0.5,
    borderRadius: normalize(8),
    color: colors.fontBlack,
  },
  inputConatiner: {
    marginVertical: normalize(4),
    marginHorizontal: normalize(24),
  },
  inputName: {
    flexDirection: 'row',
    marginVertical: normalize(12),
  },
  categories: {
    marginTop: normalize(16),
    marginVertical: normalize(4),
    marginHorizontal: normalize(0),
    paddingHorizontal: normalize(16),
    // backgroundColor: colors.disable,
  },
});
