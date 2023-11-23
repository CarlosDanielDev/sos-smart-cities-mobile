import {Publisher, PublisherParams, Subscriber, SubscriberParams} from '../../../data/protocols';

export class PubSubEventAdapter<T = any> implements Subscriber<T>, Publisher {
  constructor(private readonly List: Map<string, any>) {}

  subscribe(params: SubscriberParams<T>) {
    this.List.set(params.event, params.fn);
  }

  publish(params: PublisherParams): void {
    const event = this.List.get(params.event);
    if (!event) return;
    event.apply(null, params.data)();
  }
}
