import {registerSheet} from 'react-native-actions-sheet';
import {CancelEventSheet} from '../components/Event/CancelEvent';
import {FilterEventSheet} from '../components/Event/FilterEvent';
import {CalendarSheet} from '../components/Input/Calendar';
import {PickerSheet} from '../components/Input/Picker';
import {TimeSheet} from '../components/Input/Time';

/**
 * Registering the sheets here because otherwise sheet closes on
 * hot reload during development.
 */
registerSheet('CalendarInputSheet', CalendarSheet);
registerSheet('TimeInputSheet', TimeSheet);
registerSheet('FilterEventSheet', FilterEventSheet);
registerSheet('CancelEventSheet', CancelEventSheet);
registerSheet('PickerSheet', PickerSheet);

export {};
