export default interface Event {
  eventId: string;
  eventName: string;
  eventDetail: string;
  startDate: string;
  endDate: string;
  eventCategories: string;
}

export interface EventForm {
  eventId: string;
  eventName: string;
  eventDetail: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  eventCategories: string;
  location: any;
}
