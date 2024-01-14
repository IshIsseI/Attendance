// pages/api/update/Setting/Todo/Delete/[Text].ts
import { NextApiRequest, NextApiResponse } from "next";
import db from '../../../../db';

interface Category {
    ID: number;
    Text: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
        const { Text } = req.query;

        // データベースから該当の項目を削除するクエリ
        const sqlDelete = `DELETE FROM Todo WHERE Text = ?`;

        db.query(sqlDelete, [Text], (err: Error, result: Category[]) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
            } else {
                console.log(result);
                res.status(200).json(result);
            }
        });
}