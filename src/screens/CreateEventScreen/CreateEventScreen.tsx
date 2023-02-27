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
import TextInputArea from '../../components/Input/TextInputArea';
import TimeInput from '../../components/Input/Time';
import CustomHeader from '../../components/Text/CustomHeader';
import {useAuthStore} from '../../stores/authStore';
import {useEventStore} from '../../stores/eventStore';

const CreateEventScreen: React.FC<any> = ({navigation}) => {
  const [form, setForm] = useState<any>({
    eventName: null,
    event: null,
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    location: null,
    eventDetail: null,
  });
  // const [time, setTime] = useState<Date | undefined>(undefined);
  const [toggleModalUpload, setToggleModalUpload] = useState<boolean>(false);
  const [eventImg, setEventImg] = useState(null);

  const onSubmit = () => {
    useEventStore.getState().createEvent({...form});
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
                justifyContent: 'center',
              },
            ]}>
            <Image
              source={eventImg ?? images.cover}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          <TextInput
            value={form.telNo}
            style={styles.input}
            editable={true}
            placeholder={'Event Name'}
            // placeholderTextColor={colors.disable}
            onChangeText={value => onChangeText('eventName', value)}
          />
          <CalendarInput></CalendarInput>
          <TextInput
            value={form.telNo}
            style={styles.input}
            editable={true}
            placeholder={'Time Input'}
            // placeholderTextColor={colors.disable}
            onChangeText={value => onChangeText('telNo', value)}
          />
          <TouchableOpacity style={styles.input} onPress={() => {}}>
            <Text style={{color: colors.grayPlaceholder}}>Location</Text>
          </TouchableOpacity>
          <TextInput
            value={form.idNo}
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
            color={colors.primary}
            fontColor={colors.white}
            style={[styles.button, {marginTop: normalize(30)}]}
            onPress={() => {
              onSubmit();
            }}></Touchable>
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
