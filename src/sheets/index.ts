import {registerSheet} from 'react-native-actions-sheet';
import {CalendarSheet} from '../components/Input/Calendar';

/**
 * Registering the sheets here because otherwise sheet closes on
 * hot reload during development.
 */
registerSheet('CalendarInputSheet', CalendarSheet);
// registerSheet('NewTaskSheet', NewTaskModal);

export {};
