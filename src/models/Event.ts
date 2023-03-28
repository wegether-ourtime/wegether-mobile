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
  location: any;
}

export interface EventForm {
  eventId: string | null;
  eventName: string;
  eventDetail: string;
  isHost: boolean;
  startDate: Date | null;
  endDate: Date | null;
  location: any | null;
  maxParticipant: number | string;
  userEvents: UserEvent[] | [];
  eventCategories: any[] | [];
}

export const initialEventForm = {
  eventName: '',
  eventDetail: '',
  isHost: false,
  startDate: null,
  endDate: null,
  location: null,
  maxParticipant: 2,
  eventCategories: [],
  userEvents: [],
} as EventForm;
