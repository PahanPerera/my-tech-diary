// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { RecordMetadata, updateDailyRecord } from "@datastore";
import dayjs from "dayjs";

const dayNames = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const monthNames = [
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

type SuccessResponse = {
  success: boolean;
};

type ErrorResponse = {
  msg: string;
};

function getDateMetadata(date: string): RecordMetadata {
  const dateInstance = dayjs(date, "MM.DD.YYYY");
  const dayIndex = dateInstance.day();
  const day = dayNames[dayIndex];
  const monthIndex = dateInstance.month() + 1;
  const month = monthNames[monthIndex];
  const year = dateInstance.year();

  return {
    date,
    day,
    dayIndex,
    month,
    monthIndex,
    year,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  const { body } = req;
  try {
    const metadata = getDateMetadata(body.date);
    await updateDailyRecord(body.date, {
      metadata,
      tasks: body.tasks,
    });
    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ msg: JSON.stringify(error) });
  }
}
