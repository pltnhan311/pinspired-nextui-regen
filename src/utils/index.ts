import { get } from 'lodash';

export const UNKNOWN_ERROR = 'Đã có lỗi xảy ra!';

export const getError = (error: Error, options?: { message: string }) => {
  return get(error, 'message') || get(options, 'message', UNKNOWN_ERROR);
};
