export interface PublisherParams {
  event: string;
  data: any;
}

export interface Publisher {
  publish: (params: PublisherParams) => void;
}

export namespace Publisher {
  export type Params = PublisherParams;
}
