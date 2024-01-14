//api/Python/SendMail.ts
import { execSync } from "child_process";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { to, subject, body } = req.body;

  try {
    // ここでPythonスクリプトのパスを指定して実行
    execSync(`python3 /Users/ishiiissei/dev/attendance-ne/src/pages/api/Python/SendMailScript.py "${to}" "${subject}" "${body}"`);
    res.json({ result: "Mail sent successfully" });
  } catch (error: any) {
    console.error("Error executing Python script:", error.message);
    res.status(500).json({ error: error.message });
  }
}
