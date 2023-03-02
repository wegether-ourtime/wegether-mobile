import {registerSheet} from 'react-native-actions-sheet';
import { CancleEventSheet } from '../components/Event/CancleEvent';
import { FilterEventSheet } from '../components/Event/FilterEvent';
import {CalendarSheet} from '../components/Input/Calendar';
import {TimeSheet} from '../components/Input/Time';

/**
 * Registering the sheets here because otherwise sheet closes on
 * hot reload during development.
 */
registerSheet('CalendarInputSheet', CalendarSheet);
registerSheet('TimeInputSheet', TimeSheet);
registerSheet('FilterEventSheet', FilterEventSheet);
registerSheet('CancleEventSheet', CancleEventSheet);

export {};
