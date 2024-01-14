// pages/api/update/Setting/Student.ts
import { NextApiRequest, NextApiResponse } from "next";
import db from '../../db';

interface Category {
    Subject: string;
    AttendanceNum: number;
    NowNum: number;
    ID: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { Number } = req.body;
    const sqlSelect = `UPDATE \`${Number}\` SET AttendanceNum = 0, NowNum = 0`;
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