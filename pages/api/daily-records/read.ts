// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { readDailyRecords } from "../../../datastore";

type SuccessResponseWithDate = {
  success: boolean;
  data: any;
};

type ErrorResponse = {
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponseWithDate | ErrorResponse>
) {
  const { body } = req;
  try {
    const records = await readDailyRecords();
    res.status(200).json({ success: true, data: records });
  } catch (error: any) {
    res.status(500).json({ msg: JSON.stringify(error) });
  }
}
