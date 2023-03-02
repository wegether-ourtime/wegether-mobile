import {Switch} from '@rneui/themed';
import {useEffect} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, font, icons} from '../../common/assets';
import {normalize} from '../../common/function/normalize';
import {stylesCentral} from '../../common/styles/StylesCentral';
import {Filter} from '../../components/Input/Filter';
import EventTapNavigator from '../../navigations/topTabs/EventNavigator';

const EventScreen: React.FC<any> = ({navigation}) => {
  const insets = useSafeAreaInsets();

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
      <Filter></Filter>
      <View style={{flex: 10}}>
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
});
