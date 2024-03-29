import {registerSheet} from 'react-native-actions-sheet';
import {CancelEventSheet} from '../components/Event/CancelEvent';
import {FilterEventSheet} from '../components/Event/FilterEvent';
import {CalendarSheet} from '../components/Input/Calendar';
import {FilterCalendarSheet} from '../components/Event/FilterCalendar';
import {PickerSheet} from '../components/Input/Picker';
import {TimeSheet} from '../components/Input/Time';
import {FilterTimeSheet} from '../components/Event/FilterTime';
import {ParticipantSheet} from '../components/Event/ParticipantList';
import {EventCodeSheet} from '../components/Event/EventCode';

/**
 * Registering the sheets here because otherwise sheet closes on
 * hot reload during development.
 */
registerSheet('CalendarInputSheet', CalendarSheet);
registerSheet('TimeInputSheet', TimeSheet);
registerSheet('FilterEventSheet', FilterEventSheet);
registerSheet('CancelEventSheet', CancelEventSheet);
registerSheet('PickerSheet', PickerSheet);
registerSheet('FilterCalendarInputSheet', FilterCalendarSheet);
registerSheet('FilterTimeInputSheet', FilterTimeSheet);
registerSheet('ParticipantSheet', ParticipantSheet);
registerSheet('EventCodeSheet', EventCodeSheet);

export {};
