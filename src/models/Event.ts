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
  eventId: string;
  eventName: string;
  eventDetail: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  eventCategories: any;
  location: any;
}
