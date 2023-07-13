import {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
} from '@config';
import { ConnectOptions } from 'mongoose';

export const dbConnection = {
  _url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  get url() {
    return this._url;
  },
  set url(value) {
    this._url = value;
  },
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    directConnection: true,
    tls: false,
    tlsInsecure: false,
    retryWrites: false
  } as ConnectOptions
};
