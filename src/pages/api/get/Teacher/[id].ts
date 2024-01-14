// api/get/Teacher/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../db";

interface Category {
  ID: number;
  Number: number;
  Name: string;
  Status: boolean;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    console.log("ID:", id); // Log the value of id

    const sqlSelect = `SELECT * FROM ${id}`;
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