// pages/api/update/Setting/Todo/[Text].ts
import { NextApiRequest, NextApiResponse } from "next";
import db from '../../../db';

interface Category {
    ID: number;
    Text: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
        const { Text } = req.query;

        const sqlInsert = `INSERT INTO Todo (Text) VALUES (?)`;
        db.query(sqlInsert, [Text], (err: Error, result: Category[]) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            console.log(result);
            return res.status(200).json(result);
        });
}
