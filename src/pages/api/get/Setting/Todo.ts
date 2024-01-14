// pages/api/get/TimeTable.ts
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../db';

  interface Category {
    ID: number;
    Text: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sqlSelect = 'SELECT * FROM Todo';

  db.query(sqlSelect, (err : Error, result : Category[]) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
}