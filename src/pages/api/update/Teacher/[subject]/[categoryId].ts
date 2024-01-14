// api/update/Teacher/[subject]/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db";

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
  const { subject, categoryId } = req.query;
  const { newStatus } = req.body;

  const sqlSelect = `UPDATE ${subject} SET Status = ? WHERE id = ?`;

  db.query(sqlSelect, [newStatus, categoryId], (err: Error, result: Category[]) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
}