// pages/api/get/SelectSubject/[day].ts
import { NextApiRequest, NextApiResponse } from "next";
import db from '../../db';

interface Category {
    SubjectName: string;
    SubjectName2: string;
    ID: number;
    Format: string;
    Unit: number;
    Start: number;
    Time: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { day } = req.query;
    const sqlSelect = `SELECT * FROM ${day}`;
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