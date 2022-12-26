// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { updateDailyRecord } from "../../../datastore";

type SuccessResponse = {
  success: boolean;
};

type ErrorResponse = {
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  const { body } = req;
  try {
    await updateDailyRecord(body.date, body.data);
    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ msg: JSON.stringify(error) });
  }
}
