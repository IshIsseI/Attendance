// pages/api/get/Setting/Student.ts
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../db';

  interface Category {
    Number: number;
    Name: string;
    Grade: number;
    Class: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sqlSelect = 'SELECT * FROM Students';

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