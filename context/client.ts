import { createContext } from "react";

export interface IClientResponse {
  isSuccess: number;
  data?: {
    status: string;
    message: string;
    data?: any;
  };
}

export interface IClientPayload extends RequestInit {
  withAuthorization?: boolean;
  delay?: number;
}

export interface IClientContext {
  apiURL: string;
  callAPI: (endpoint: string, init?: IClientPayload) => Promise<IClientResponse>;
}

export const ClientContext = createContext<IClientContext | null>(null);
