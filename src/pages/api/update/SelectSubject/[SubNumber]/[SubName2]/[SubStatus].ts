import { NextApiRequest, NextApiResponse } from "next";
import db from '../../../../db';

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
    const { SubNumber, SubName2, SubStatus } = req.query;
    const sqlSelect = `UPDATE \`${SubNumber}\` SET \`AttendanceNum\` = \`AttendanceNum\` + ?, \`NowNum\` =  \`NowNum\` + 1 WHERE \`Subject\` = \'${SubName2}\'`;
    db.query(sqlSelect, [SubStatus, SubName2], (err: Error, result: Category[]) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
}
