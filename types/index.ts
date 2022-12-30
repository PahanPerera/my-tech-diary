export type DailyRecordTask = {
  name: string;
  size: number;
  comment: string;
};
export type DateMetadata = {
  fullDate: string;
  date: number;
  day: string;
  dayIndex: number;
  month: string;
  monthIndex: number;
  year: number;
};
export type DailyRecord = {
  date: string;
  metadata: DateMetadata;
  tasks: DailyRecordTask[];
};

export type DailyRecordAsMap = {
  [date: string]: DailyRecord;
};

export type DailyRecordWithId = {
  id: number;
} & DailyRecord;

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
