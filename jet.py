from mailjet_rest import Client

import json
import os
from flask import Flask,flash,get_flashed_messages, render_template, redirect, url_for, request
from flask_cors import CORS
import ast

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/go.py', methods=['POST', 'GET', 'OPTIONS'])
def index():
	re = request.form
	author = list(re)[0].split("info")[1].split("author")[1].replace("\"","").replace(":","").replace(",","")
	title = list(re)[0].split("title")[1].split("\"")[2]
	info = list(re)[0].split("title")[1].split("\"")[10]
	if "no pets" in info or "No pets" in info or "No Pets" in info or "no Pets" in info:
		print "no pets " + info
		return "no"
		# email(author, title, info)
	elif info == "":
		print author, title, info
		return "comment"
	else:
		print author, title, info
		return "comment"

		



def email(author, title, info):
	print author, title, info

	api_key = '3cd843aacb6625f1ff62522783ce7976'
	api_secret = '9f1446e1e5abe54507504e7293c2c55f'
	mailjet = Client(auth=(api_key, api_secret))
	data = {
	  'FromEmail': 'andrewcarr06@gmail.com',
	  'FromName': "josh: {}".format(author),
	  'Subject': "{}".format(title),
	  'Text-part': "info: {}".format(info),
	  'Html-part': '<h3>posted by: {} info: {}</h3>'.format(author, info),
	  'Recipients': [
	                {
	                        "Email": "andrewcarr06@gmail.com"
	                }
	        ]
	}
	result = mailjet.send.create(data=data)

if __name__ == "__main__":
	app.run()