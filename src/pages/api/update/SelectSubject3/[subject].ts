// pages/api/update/SelectSubject/[number]/[name]/[status].ts
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../db";

interface Category {
  ID: number;
  Number: number;
  Name: string;
  Status: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { subject } = req.query;
  const sqlSelect = `UPDATE ${subject} SET Status = '0'`;
  db.query(sqlSelect, (err: Error, result: Category[]) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
}
