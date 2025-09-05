export enum EventsType {
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
  PAYMENT_CONFIRMED = "PAYMENT_CONFIRMED",
}

export interface WebhookValueObject {
  name: string;
  url: string;
  email: string;
  enabled: boolean;
  interrupted: boolean;
  apiVersion: number;
  authToken: string;
  sendType: string;
  events: EventsType[];
}
