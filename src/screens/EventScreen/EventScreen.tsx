import {Switch} from '@rneui/themed';
import {useEffect} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, font, icons} from '../../common/assets';
import {normalize} from '../../common/function/Normalize';
import {stylesCentral} from '../../common/styles/StylesCentral';
import {Map} from '../../components/Map/Map';
import EventTapNavigator from '../../navigations/topTabs/EventNavigator';
import {useEventStore} from '../../stores/eventStore';

const EventScreen: React.FC<any> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const events = useEventStore(state => state.events);
  const getEvents = () => useEventStore.getState().getEvents({});

  useEffect(() => {
    getEvents();
  }, [!events]);
  
  return (
    <View style={[stylesCentral.container, {paddingTop: insets.top}]}>
      <Map></Map>
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
              <Text style={styles.activeFont}>Join with Wegether</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{flex: 4}}>
        <EventTapNavigator />
      </View>
    </View>
  );
};
export default EventScreen;

const styles = StyleSheet.create({
  headCard: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(23),
    paddingTop: normalize(5),
  },
  activeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grayBg,
    padding: normalize(5),
    borderRadius: normalize(12),
    marginTop: normalize(10),
  },
  activeFont: {
    fontFamily: font.medium,
    fontSize: normalize(14),
    marginLeft: normalize(18),
    color: colors.fontBlack,
  },
  font: {
    fontFamily: font.medium,
    fontSize: normalize(16),
    color: colors.white,
  },
  iconsTask: {
    width: normalize(20),
    height: normalize(20),
    marginRight: normalize(5),
  },
});
