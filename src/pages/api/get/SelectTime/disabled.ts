// pages/api/get/SelectSubject/[day].ts
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
    const sqlSelect = "SELECT * FROM DisabledData";
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