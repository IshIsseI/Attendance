// api/put/Teacher/[id].ts
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
  const { id } = req.query;
  const { Number, Name} = req.body;

  const sqlSelect = `INSERT INTO ${id} (Number, Name, Status) VALUES (?, ?, 0)`;

  db.query(sqlSelect, [Number, Name],(err: Error, result: Category[]) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
}