// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { updateDailyRecord } from "@datastore";
import dayjs from "dayjs";
import { RecordMetadata, SuccessResponse, ErrorResponse } from "@types";

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

function getDateMetadata(fullDate: string): RecordMetadata {
  const dateInstance = dayjs(fullDate, "MM.DD.YYYY");
  const date = dateInstance.date();
  const dayIndex = dateInstance.day();
  const day = dayNames[dayIndex];
  const monthIndex = dateInstance.month() + 1;
  const month = monthNames[monthIndex];
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
    res.status(500).json({ success: false, msg: JSON.stringify(error) });
  }
}
