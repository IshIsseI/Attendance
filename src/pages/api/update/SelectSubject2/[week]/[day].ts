// pages/api/update/SelectSubject/[week]/[day].ts
import { NextApiRequest, NextApiResponse } from "next";
import db from '../../../db';

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
    const { week, day } = req.query;
    const sqlSelect = `UPDATE DisabledData SET ${day} = 1 WHERE Week = ?`;
    db.query(sqlSelect, [week],(err: Error, result: Category[]) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
}