#api/Python/SendMailScript.py
import sys
import smtplib
from email.mime.text import MIMEText
from email.utils import formatdate

to_address = sys.argv[1]
subject = sys.argv[2]
body_text = sys.argv[3]

send_address = "st20015is@gm.ibaraki-ct.ac.jp"
password = "cpzb swfy iakc ubls"
from_address = "st20015is@gm.ibaraki-ct.ac.jp"

smtpobj = smtplib.SMTP("smtp.gmail.com", 587)
smtpobj.starttls()
smtpobj.login(send_address, password)

msg = MIMEText(body_text)
msg['Subject'] = subject
msg['From'] = from_address
msg['To'] = to_address
msg['Date'] = formatdate()

smtpobj.send_message(msg)
smtpobj.close()
