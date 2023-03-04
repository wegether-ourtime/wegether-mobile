import {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, icons} from '../../common/assets';
import images from '../../common/assets/images';
import {height, normalize} from '../../common/function/normalize';
import {stylesApp} from '../../common/styles/AppStyle';
import {stylesCentral} from '../../common/styles/StylesCentral';
import {Touchable} from '../../components/Button/Touchable';
import {CalendarInput} from '../../components/Input/Calendar';
import TextInputArea from '../../components/Input/TextArea';
import TimeInput from '../../components/Input/Time';
import CustomHeader from '../../components/Text/CustomHeader';
import {useAuthStore} from '../../stores/authStore';
import {useEventStore} from '../../stores/eventStore';
import * as RootNavigation from '../../navigations/RootNavigation';
import {launchImageLibrary} from 'react-native-image-picker';

const CreateEventScreen: React.FC<any> = ({navigation}) => {
  const form = useEventStore(state => state.form);
  const user = useAuthStore(state => state.user);
  // const [time, setTime] = useState<Date | undefined>(undefined);
  const [toggleModalUpload, setToggleModalUpload] = useState<boolean>(false);
  const [eventImg, setEventImg] = useState<any>();
  const validateField = form
    ? !Object.values(form).some(x => x === null || x === '')
    : null;

  const onSubmit = () => {
    useEventStore.getState().createEvent({
      ...form,
      userEvents: [{userId: user?.userId, isHost: true}],
    });
  };

  const onChangeText = (field: string, value: string) =>
    useEventStore.getState().setForm({...form, [field]: value});

  return (
    <SafeAreaView style={[stylesApp.container]}>
      <CustomHeader
        title="Create Event"
        showBackBtn
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <ScrollView
          keyboardShouldPersistTaps="always"
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
                justifyContent: 'center',
              },
            ]}>
            {eventImg ? (
              <Image
                source={eventImg}
                style={{
                  height: '100%',
                  width: '100%',
                }}
              />
            ) : (
              <TouchableOpacity
                containerStyle={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={async () => {
                  const img = await launchImageLibrary(
                    {
                      mediaType: 'photo',
                    },
                    res => {
                      setEventImg(res.assets?.[0]);
                    },
                  );
                }}>
                <Image
                  source={icons.addButton}
                  style={{
                    height: normalize(25),
                    width: normalize(25),
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
          <TextInput
            value={form?.eventName}
            style={styles.input}
            editable={true}
            placeholder={'Event Name'}
            // placeholderTextColor={colors.disable}
            onChangeText={value => onChangeText('eventName', value)}
          />
          <CalendarInput></CalendarInput>
          <TimeInput></TimeInput>
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              RootNavigation.navigate('Main', {
                screen: 'LocationScreen',
              });
            }}>
            {form?.location ? (
              <Text style={{color: colors.fontBlack}}>
                {form.location.name}
              </Text>
            ) : (
              <Text style={{color: colors.grayPlaceholder}}>Location</Text>
            )}
          </TouchableOpacity>
          <TextInput
            value={form?.eventDetail}
            style={[
              styles.input,
              {
                minHeight: normalize(100),
                paddingTop: normalize(15),
                textAlignVertical: 'top',
              },
            ]}
            editable={true}
            placeholder={'รายละเอียดเพิ่มเติม'}
            multiline
            onChangeText={value => onChangeText('eventDetail', value)}
          />
          <Touchable
            label={'Post'}
            disable={validateField}
            color={!validateField ? colors.disable : colors.primary}
            fontColor={colors.white}
            style={[styles.button, {marginTop: normalize(30)}]}
            onPress={() => onSubmit()}></Touchable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default CreateEventScreen;

const styles = StyleSheet.create({
  main: {
    // flex: 0,
    // flexDirection: 'column',
    height: '100%',
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
