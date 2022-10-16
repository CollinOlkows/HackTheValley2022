import bottle
import csv
import os
import requests
import json

userdata=[]
usrnum=[-5]

#updates the usernumber to the current user so it uses that data


def loaduser(filename):
  with open(filename,'r') as fp:
    reader=csv.reader(fp)
    for line in reader:
      userdata.append(line)
      
def cleardata(filename):
  with open(filename,'w') as fp:
    fp.writerow("")

def changedata(filename):
  with open(filename, 'w') as fp:
    for line in userdata:
      for element in line:
        fp.write(element)
        fp.write(',')
      fp.write("\n")
      
def changedata2(filename):
  with open(filename, 'w') as fp:
    writer=csv.writer(fp)
    for lines in userdata:
      writer.writerow(lines)

loaduser('users.csv')
@bottle.route("/")
def index():
    return bottle.static_file("index.html", root='.')
@bottle.route("/scripts.js")
def scripts():
    return bottle.static_file("scripts.js", root='.')
@bottle.route("/login")
def login():
    return bottle.static_file("login.html", root='.')
@bottle.route("/reg")
def reg():
    return bottle.static_file("registration.html", root='.')
@bottle.route("/gen")
def gen():
    return bottle.static_file("playlistgen.html", root=".")
@bottle.route("/style.css")
def style():
    return bottle.static_file("style.css", root=".")
@bottle.route("/user")
def user():
    return bottle.static_file("userdata.html", root=".")
@bottle.post("/log")
def log():
  stateInput = bottle.request.body.read().decode()
  state = json.loads(stateInput)
  x=0
  for set in userdata:
    if set[0] == state[0] and set[1]==state[1]:
      usrnum[0]=x
      print(usrnum[0])
      with open('currentuser.csv', 'w')as fp:
        writer=csv.writer(fp)
        writer.writerow(userdata[usrnum[0]])
      return json.dumps(0)
    x+=1
  return json.dumps(1)



  
@bottle.post("/register")
def register():
  stateInput = bottle.request.body.read().decode()
  print(stateInput)
  state = json.loads(stateInput)
  for line in userdata:
    for element in userdata:
      if element == state[3]:
        Out = json.dumps(1)
        return Out
  userdata.append(state)
  changedata2('users.csv')
  output=json.dumps(0)
  return output

@bottle.route("/yemtns.jpeg")
def yemtns():
    return bottle.static_file("yemtns.jpeg", root='.')
@bottle.route("/about")
def about():
    return bottle.static_file("about.html", root='.')
@bottle.route("/userdata")
def userdat():
    return bottle.static_file("userdata.html", root='.')

@bottle.post("/usersData")
def datauserthing():
  stateInput = bottle.request.body.read().decode()
  state = json.loads(stateInput)
  userdata[usrnum[0]][5].append(state)
  with open("currentuser.csv",'w') as fp:
    for element in userdata[usrnum[0]]:
      fp.write(element)
    fp.write('\n')
    
  return 0
  
  #do the data saving to the file and updating everything

bottle.run(host="0.0.0.0", port=8080, debug=True)