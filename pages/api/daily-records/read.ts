// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { readDailyRecords, readDailyRecordsMock } from "@datastore";
import {
  SuccessResponseWithData,
  ErrorResponse,
  DailyRecordAsMap,
} from "@types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    SuccessResponseWithData<DailyRecordAsMap> | ErrorResponse
  >
) {
  try {
    // const records = await readDailyRecords();
    const records = await readDailyRecordsMock();
    res.status(200).json({ success: true, data: records });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: JSON.stringify(error) });
  }
}
