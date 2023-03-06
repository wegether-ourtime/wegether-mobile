import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {onChange} from 'react-native-reanimated';
import {colors} from '../../common/assets';
import {normalize} from '../../common/function/normalize';
import {useEventStore} from '../../stores/eventStore';

export const Couter: React.FC<any> = props => {
  const form = useEventStore(state => state.form);
  const onPressPlus = () => {
    if (typeof form?.maxParticipant !== 'number') {
      useEventStore.getState().setForm({
        ...form,
        maxParticipant: 2,
      });
    } else {
      useEventStore.getState().setForm({
        ...form,
        maxParticipant: form?.maxParticipant + 1,
      });
    }
  };
  const onPressMinus = () => {
    if (typeof form?.maxParticipant !== 'number') {
      useEventStore.getState().setForm({
        ...form,
        maxParticipant: 2,
      });
    } else {
      if (form?.maxParticipant > 2) {
        useEventStore.getState().setForm({
          ...form,
          maxParticipant: form?.maxParticipant - 1,
        });
      }
    }
  };
  const onChange = (value: string) => {
    useEventStore.getState().setForm({
      ...form,
      maxParticipant: parseInt(value) >= 2 ? parseInt(value) : 2,
    });
  };
  const disabledMinus = () => {
    if (typeof form?.maxParticipant !== 'number' || form?.maxParticipant <= 2) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPressMinus} disabled={disabledMinus()}>
          <Text style={{color: colors.primary}}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TextInput
          keyboardType="number-pad"
          value={form?.maxParticipant?.toString() ?? ''}
          onChangeText={value => onChange(value)}></TextInput>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPressPlus}>
          <Text style={{color: colors.primary}}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    borderColor: colors.disable,
    borderWidth: 0.5,
    borderRadius: normalize(8),
    color: colors.fontBlack,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  headerSafeArea: {
    backgroundColor: colors.background,
  },
  headerWraper: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: normalize(75),
  },
  container: {
    margin: normalize(5),
    padding: normalize(5),
    paddingHorizontal: normalize(8),
  },
});
