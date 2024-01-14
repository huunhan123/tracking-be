import { APIResponse } from '../api-response/api-response.type';

export type View<T, U> = Pick<APIResponse<T, U>, 'data' | 'metadata'>;
