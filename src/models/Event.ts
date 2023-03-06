import UserEvent from './UserEvent';

export default interface Event {
  eventId: string;
  eventName: string;
  eventDetail: string;
  startDate: string;
  endDate: string;
  eventCategories: any;
  userEvents: UserEvent[];
  files: any[];
}

export interface EventForm {
  eventId: string | null;
  eventName: string;
  eventDetail: string;
  startDate: Date | null;
  endDate: Date | null;
  eventCategories: any | null;
  location: any | null;
  maxParticipant: number | string;
}

export const initialEventForm = {
  eventName: '',
  eventDetail: '',
  startDate: null,
  endDate: null,
  eventCategories: null,
  location: null,
  maxParticipant: 2,
} as EventForm;
