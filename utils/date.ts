import { DateMetadata } from "@types";
import dayjs from "dayjs";

export const DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const MONTHS = [
  "",
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const getDate = (fullDate: string) => {
  return dayjs(fullDate, "MM.DD.YYYY");
};

export const getDateMetadata = (fullDate: string): DateMetadata => {
  const dateInstance = getDate(fullDate);
  const date = dateInstance.date();
  const dayIndex = dateInstance.day();
  const day = DAYS[dayIndex];
  const monthIndex = dateInstance.month() + 1;
  const month = MONTHS[monthIndex];
  const year = dateInstance.year();

  return {
    fullDate,
    date,
    day,
    dayIndex,
    month,
    monthIndex,
    year,
  };
};
