export type ServiceResponseType =
'success' | 'created' | 'unauthorized' | 'notFound' | 'invalidData';

export type ServiceResponse<T> = {
  status: ServiceResponseType,
  data: T | { message: string },
};
