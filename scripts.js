function ajaxGetRequest(path, callback){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            callback(this.response);
        }
    };
    request.open("GET", path);
    request.send();
}

function ajaxPostRequest(path, data, callback){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            callback(this.response);
        }
    };
    request.open("POST", path);
    request.send(data);
}

function loginSubmit(){
  password=(document.getElementById('password'))['value']
  username=(document.getElementById('username'))['value']
  out=[username,password]
  output=JSON.stringify(out)
  ajaxPostRequest("/log",output,loggedIn)
}

function Registration(){
  first=(document.getElementById('fname'))['value']
  last=(document.getElementById('lname'))['value']
  email=(document.getElementById('email'))['value']
  passwordr=(document.getElementById('passwordr'))['value']
  usernamer=(document.getElementById('usernamer'))['value']
  out=[usernamer,passwordr,first,last,email,[]]
  output=JSON.stringify(out)
  ajaxPostRequest("/register",output,Registered)
}

function pieChart(){
  var data = [{
    values: [20,30,50],
    labels: ['Electricity', 'Driving', 'Water Use'],
    type: 'pie'
  }];
var layout = {
  title:'Carbon emission breakdown',
  height: 400,
  width: 500
};

Plotly.newPlot('pie', data, layout);
}

function loggedIn(response){
  input=JSON.parse(response)
  if (input == 0){
    window.location.replace("/userdata")
    return 6
  }else{
    return 6
   //username/pass no exists
  }
}
function Registered(response){
  data=JSON.parse(response)
  if (data ==0){
    window.location.replace("/login")
    return 6
  }else{
     //input the text saying the username already exists
    return 6
  }
}

function lineChart(){
  var you = {
  x: ['Monday', 'Tuesday',  'Wednesday', 'Thursday', 'Friday', 'Satuarday', 'Sunday'],
  y: [60,70,80,50,60,30,20],
  type: 'scatter'  
};

var data = [you];
  var layout = {
  title:'Weekly carbon emissions'
};

Plotly.newPlot('myDiv', data);
}
function avgCO2percaplinechart(){
  var trace1 = {
  x: [1937, 1947, 1957, 1967, 1977, 1987, 1997, 2007, 2017],
  y: [7.68, 12, 10.7, 14.7, 17.4, 17, 17.8, 17.3, 15.3],
  type: 'scatter'
};


var data = [trace1];
  var layout = {
  title:'Carbon emission per captia over the years for Canada',
  height: 400,
  width: 500
};

Plotly.newPlot('myDiv', data);
}
function boxplot() {
  var trace1 = {
  x: [60,70,80,50,60,30,20],
  type: 'box',
  name: 'Set 1'
};
var data = [trace1];

var layout = {
  title: 'Carbon emission box and whisker plot'
};

Plotly.newPlot('myDiv', data, layout);
}
function barchart(){
  var trace1 = {
  x: ['your CO2 emissions'],
  y: [20],
  type: 'bar'
};

var trace2 = {
  x: ['Average canadian CO2 emission per capita'],
  y: [15],
  type: 'bar'
};

var data = [trace1, trace2];

var layout = {barmode: 'group',
             title: 'You vs Average canadian emissions'};

Plotly.newPlot('myDiv', data, layout);
}

function activitySubmit(){
  date=(document.getElementById('Date'))['value']
  activity=(document.getElementById('Activity'))['value']
  catagory=(document.getElementById('Catagory'))['value']
  time=(document.getElementById('Time'))['value']
  out=JSON.stringify([date,activity,time,catagory])
  ajaxPostRequest("/usersData",out,userdatathing)
}



//make the graph using the saved user data stored on the currentuser.csv
//also creates a graph of the current user data and displays all the user data thats been inputed
function userdatathing(response){
  input=JSON.stringify(response);
  
}