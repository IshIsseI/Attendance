// api/update/Student/attendanceOn.ts
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
  const { Number, subject } = req.body;

  const sqlSelect = `UPDATE ${subject} SET Status = '1' WHERE Number = ?`;

  db.query(sqlSelect, [Number], (err: Error, result: Category[]) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
}