import {Switch} from '@rneui/themed';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, font, icons} from '../../common/assets';
import {normalize} from '../../common/function/Normalize';
import {stylesCentral} from '../../common/styles/StylesCentral';
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
              }}>
              {/* สวัสดี, {profile.name} */}
            </Text>
            <View style={styles.activeContainer}>
              <Text style={styles.activeFont}>Join with Wegether</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProfileScreen', {
                  navbar: false,
                });
              }}>
              <View
                style={{
                  width: normalize(50),
                  height: normalize(65),
                  position: 'relative',
                }}>
                {/* <Avatar
                  size={normalize(50)}
                  rounded
                  source={
                    profile.image != '' ? {uri: profile.image} : icons.account
                  }
                /> */}
                <View
                  style={{
                    width: normalize(50),
                    height: normalize(16),
                    borderRadius: normalize(8),
                    position: 'absolute',
                    left: normalize(0),
                    top: normalize(43),
                    backgroundColor: colors.fontBlack,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* <Text
                    style={{
                      fontFamily: font.medium,
                      fontSize: normalize(12),
                      color: colors.white,
                      paddingRight: normalize(2),
                    }}>{`${profile.ratingAvg}`}</Text> */}
                  <Image
                    source={icons.review}
                    style={{
                      width: normalize(12),
                      height: normalize(12),
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{height: normalize(95)}}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: colors.orange,
                  marginHorizontal: 5,
                  paddingHorizontal: 10,
                  paddingVertical: normalize(10),
                  justifyContent: 'space-between',
                  width: 160,
                  height: 75,
                  borderRadius: 16,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image source={icons.income} style={styles.iconsTask} />
                  <Text style={styles.font}>รายได้วันนี้</Text>
                </View>
                {/* <Text style={styles.font}>{`฿${numberWithCommas(
                  profile.totalRevenueToday,
                )}`}</Text> */}
              </View>
              <View
                style={{
                  backgroundColor: '#6B7580',
                  marginHorizontal: 5,
                  paddingHorizontal: 10,
                  paddingVertical: normalize(10),
                  justifyContent: 'space-between',
                  width: 160,
                  height: 75,
                  borderRadius: 16,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image source={icons.income} style={styles.iconsTask} />
                  <Text style={styles.font}>รายได้ทั้งหมด</Text>
                </View>
                {/* <Text style={styles.font}>{`฿${numberWithCommas(
                  profile.totalRevenue,
                )}`}</Text> */}
              </View>
              <View
                style={{
                  backgroundColor: '#37ABFF',
                  marginHorizontal: 5,
                  paddingHorizontal: 10,
                  paddingVertical: normalize(10),
                  justifyContent: 'space-between',
                  width: 160,
                  height: 75,
                  borderRadius: 16,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image source={icons.farm} style={styles.iconsTask} />
                  <Text style={styles.font}>ไร่สะสม</Text>
                </View>
                {/* <Text style={styles.font}>{`${profile.totalArea} ไร่`}</Text> */}
              </View>
              <View
                style={{
                  backgroundColor: '#3EBD93',
                  marginHorizontal: 5,
                  paddingHorizontal: 10,
                  paddingVertical: normalize(10),
                  justifyContent: 'space-between',
                  width: 160,
                  height: 75,
                  borderRadius: 16,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image source={icons.dronejob} style={styles.iconsTask} />
                  <Text style={styles.font}>งานที่บินเสร็จ</Text>
                </View>
                {/* <Text style={styles.font}>{`${profile.totalTask} งาน`}</Text> */}
              </View>
            </ScrollView>
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
