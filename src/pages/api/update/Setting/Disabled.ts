// pages/api/update/Setting/Disabled.ts
import { NextApiRequest, NextApiResponse } from "next";
import db from '../../db';

interface Category {
    Week: number;
    Monday: boolean;
    Tuesday: boolean;
    Wednesday: boolean;
    Thursday: boolean;
    Friday: boolean;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const sqlSelect = `UPDATE DisabledData SET Monday = 0, Tuesday = 0, Wednesday = 0, Thursday = 0, Friday = 0`;
    db.query(sqlSelect,(err: Error, result: Category[]) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
}