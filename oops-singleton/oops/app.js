// JavaScript Document

var employeeGrid;
var employeeGroupGrid;
var employeeData = [];
var cscreen= "";

window.addEventListener("load",onLoad);

function onCheck(e){
	document.title = "checking";
	
}

function onDown(e){
	document.title = "down";
}
function onProgress(e){
		document.title = "progress";
}
function onUpdate(e){
	
		if(window.applicationCache.status == window.applicationCache.UPDATEREADY){
		window.applicationCache.swapCache();
		}
}


function onLoad(event){

if(window.applicationCache){
	window.applicationCache.addEventListener("checking",onCheck);
	window.applicationCache.addEventListener("downloading",onDown);
	window.applicationCache.addEventListener("progress",onProgress);
	window.applicationCache.addEventListener("updateready",onUpdate);
}



p.loadScript([
"com.space.thomson.view.List",
"com.space.thomson.view.Button",
"com.space.thomson.view.ListItem",
"com.space.thomson.model.Model",
"com.space.thomson.plugins.Jquery"],true,onAppStart);

}

function onGetData(event){
	if(event.component.getTitle() == "View"){
	if(window.navigator.onLine == true){
	$.ajax({
		url:"data/getEmpData.php",
		type:"POST",
		data:{empid:Model.getInstance().selectedId},
		dataType:"text",
		success:function(data){
			employeeGroupGrid.removeAll();
			
			var arr= [];
			arr.push(JSON.parse(data));
			employeeGroupGrid.setData(arr);
			animateScreen("employeegroup");
			window.location.hash = "type:employeegroup,"+Model.getInstance().selectedId;
		}
	});
	
	}else{
		alert("No Internet Connection");
	}
	
	}
	
	

}

function animateScreen(k){
	
	p.get(cscreen).style.webkitTransition = "all 0.5s ease-in";
	p.get(cscreen).style.webkitTransform = "translateX(-100%)";
	p.get(k).style.webkitTransition = "all 0.5s ease-out";
	p.get(k).style.webkitTransform = "translateX(0%)";
	cscreen = k;

}

function onAppStart(){
if(window.location.hash != ""){
	var s= window.location.hash.split(":");
	var s1 = s[1].split(",");
	if(s1[0] == "employeegroup"){
		p.get("employees").style.webkitTransform = "translateX(-100%)";
		p.get("employeegroup").style.webkitTransform = "translateX(0%)";
		if(s1[1] != ""){
				$.ajax({
		url:"data/getEmpData.php",
		type:"POST",
		data:{empid:s1[1]},
		dataType:"text",
		success:function(data){
			employeeGroupGrid.removeAll();
			
			var arr= [];
			arr.push(JSON.parse(data));
			employeeGroupGrid.setData(arr);
		}
	});
		}
		cscreen = "employeegroup";
	}
	
	
}else{
cscreen = "employees";
}


	employeeGrid = new List();
	employeeGrid.setTitle("Employee Information");
	employeeGrid.render(p.get("employees"));
	
	employeeGroupGrid = new List();
	employeeGroupGrid.setTitle("Selected Employee Information");
			employeeGroupGrid.render(p.get("employeegroup"));
	
	if(window.navigator.onLine == true){
loadData();
	}else{
		var d = JSON.parse(window.localStorage.getItem("empdata")).employees;
		employeeGrid.setData(d);
	
	}
	//event reciening
p.get("employeegroup").addEventListener("btnclick",ff2);
p.get("employees").addEventListener("webkitTransitionEnd",onEnd);
p.get("employeegroup").addEventListener("webkitTransitionEnd",onEnd);
p.get("employees").addEventListener("btnclick",onGetData);
window.addEventListener("hashchange",onHash);
}

function onHash(event){
	if(window.location.hash == ""){
			p.get(cscreen).style.webkitTransition = "all 0.5s ease-in-out";
		p.get(cscreen).style.webkitTransform = "translateX(100%)";
		p.get("employees").style.webkitTransition = "all 0.5s ease-in-out";
		p.get("employees").style.webkitTransform = "translateX(0%)";
		cscreen = "employees";
	}
	
}


function onEnd(event){
	event.currentTarget.style.webkitTransition = "none";
}


function ff2(event){
	if(event.component.getTitle() == "View"){
		p.get(cscreen).style.webkitTransition = "all 1s ease-in-out";
		p.get(cscreen).style.webkitTransform = "translateX(100%)";
		p.get("employees").style.webkitTransition = "all 1s ease-in-out";
		p.get("employees").style.webkitTransform = "translateX(0%)";
		window.location.hash = "";
		cscreen = "employees";
		
	}
	
}



function loadData(){
	//p.ajax({url:"data/employeesJSON.php",type:"json",success:onSuccess});
	//p.ajax({url:"data/employees.php",type:"xml",success:onSuccess});
$.ajax({
	url:"data/employeesJSON.php",
	dataType:"text",
	success:function(data){
	Model.getInstance().employeeData = JSON.parse(data).employees;
	window.localStorage.setItem("empdata",data);
     employeeGrid.setData(Model.getInstance().employeeData);
	}
});

}









