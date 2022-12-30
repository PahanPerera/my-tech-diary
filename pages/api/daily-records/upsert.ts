// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { updateDailyRecord } from "@datastore";
import { SuccessResponse, ErrorResponse } from "@types";
import { getDateMetadata } from "@utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  const { body } = req;
  try {
    const metadata = getDateMetadata(body.date);
    await updateDailyRecord(body.date, {
      date: body.date,
      metadata,
      tasks: body.tasks,
    });
    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: JSON.stringify(error) });
  }
}
