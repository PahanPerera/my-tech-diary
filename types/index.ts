export type DailyRecordTask = {
  name: string;
  size: number;
  comment: string;
};
export type RecordMetadata = {
  fullDate: string;
  date: number;
  day: string;
  dayIndex: number;
  month: string;
  monthIndex: number;
  year: number;
};
export type DailyRecord = {
  metadata: RecordMetadata;
  tasks: DailyRecordTask[];
};
export type DailyRecordWithDate = DailyRecord & {
  date: string;
};

export type SuccessResponse = {
  success: boolean;
};

export type SuccessResponseWithData<T> = SuccessResponse & {
  data: T;
};

export type ErrorResponse = {
  success: false;
  msg: string;
};
