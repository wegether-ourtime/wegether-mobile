import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {onChange} from 'react-native-reanimated';
import {colors} from '../../common/assets';
import {normalize} from '../../common/function/normalize';
import {useEventStore} from '../../stores/eventStore';

export const Couter: React.FC<any> = props => {
  const [amount, setAmount] = useState<number>(2);
  const form = useEventStore(state => state.form);
  const onPressPlus = () => {
    setAmount(amount + 1);
  };
  const onPressMinus = () => {
    setAmount(amount - 1);
  };
  const onChange = (value: string) => {
    useEventStore.getState().setForm({
      ...form,
      maxParticipant: parseInt(value) >= 1 ? parseInt(value) : '',
    });
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onPressMinus}
          disabled={amount <= 2 ? true : false}>
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
