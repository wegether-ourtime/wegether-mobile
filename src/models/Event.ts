import UserEvent from './UserEvent';

export default interface Event {
  eventId: string;
  eventName: string;
  eventDetail: string;
  startDate: string;
  endDate: string;
  eventCategories: any;
  userEvents: UserEvent[];
}

export interface EventForm {
  eventId: string | null;
  eventName: string;
  eventDetail: string;
  startDate: Date | null;
  endDate: Date | null;
  startTime: Date | null;
  endTime: Date | null;
  eventCategories: any | null;
  location: any | null;
}
