export interface SubscriberParams<T> {
  event: string;
  fn(params?: T): void;
}

export interface Subscriber<T> {
  subscribe: (params: SubscriberParams<T>) => void;
}
