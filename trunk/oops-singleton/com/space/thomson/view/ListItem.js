// JavaScript Document
function ListItem(){
//private members
var container;
var leftContainer;
var rightContainer;
var title;
var text;
var buttonContainer;
var viewButton;
var editButton;
var _rendered= false;
var _parent;
var preloader;
var selected=null;
var me = this;


//private settables
var _image ="images/default.jpg";
var _title = "Sample Title";
var _text = "Some Text Here";
var _id;

//component lifecycle
//private
function create(){
	container = document.createElement("div");
	leftContainer = document.createElement("div");
	rightContainer = document.createElement("div");
	title = document.createElement("h1");
	text = document.createElement("p");
	buttonContainer = document.createElement("div");
	preloader = document.createElement("img");
	preloader.src = "icons/pre2.gif";
	preloader.style.display = "none";
	leftContainer.appendChild(preloader);
	
	viewButton = new Button();
	editButton = new Button();
	
	editButton.setTitle("Edit");
	viewButton.setTitle("View");
	viewButton.setIcon(["icons/bb.png"]);
		editButton.setIcon(["icons/bb.png"]);
	viewButton.setStyle("float:right");
	editButton.setStyle("float:right");
	
	viewButton.render(buttonContainer);
	editButton.render(buttonContainer);
	
	rightContainer.appendChild(title);
	rightContainer.appendChild(text);
	rightContainer.appendChild(buttonContainer);
	
	container.appendChild(leftContainer);
	container.appendChild(rightContainer);
	
	container.addEventListener("btnclick",ff1);
	window.addEventListener("resize",onResize);
	
	
	
	
}

function ff1(event){

	if(selected != null){
		selected.normal();
	}
	
	
selected = event.component;

if(selected.getTitle() == "Edit"){
	event.currentTarget.style.backgroundColor = "#09F";
	title.style.color = "#FFF";
	text.style.color = "#FFF";
	
}else if(selected.getTitle() == "View"){
	
event.currentTarget.style.backgroundColor = "#9c0";
	title.style.color = "#FFF";
	text.style.color = "#FFF";
	Model.getInstance().selectedId = _id;
	Model.getInstance().selectedComp = me;
	
}



}


function update(){
	title.innerHTML = _title;
		text.innerHTML = _text;
		
}
function style(){
	container.className = "app-1-list-item";
	leftContainer.className = "app-1-list-item-left";
	rightContainer.className = "app-1-list-item-right";
	buttonContainer.className = "app-1-list-item-right-bc";
}

function init(){
	create();
	update();
	style();
}

init();



this.normal = function(){
	container.style.backgroundColor = "#FFF";
	title.style.color = "#333";
	text.style.color = "#666";
	selected.normal();
}

this.addClass = function(){
		container.className = "app-1-list-item1";
	leftContainer.className = "app-1-list-item-left1";
	rightContainer.className = "app-1-list-item-right1";
	buttonContainer.className = "app-1-list-item-right-bc1";
	viewButton.setStyle("float:left");
	editButton.setStyle("float:left");
}


this.removeClass = function(){
		container.className = "app-1-list-item";
	leftContainer.className = "app-1-list-item-left";
	rightContainer.className = "app-1-list-item-right";
	buttonContainer.className = "app-1-list-item-right-bc";
	viewButton.setStyle("float:right");
	editButton.setStyle("float:right");
}

//private methods
function resize(){
	rightContainer.style.width =(_parent.clientWidth-152)+"px";
}


//public methods

this.render = function(k){
	k.appendChild(container);
	//after render
	_rendered = true;
	_parent = k;
	resize();
}

//setters

this.setTitle= function(k){
	_title = k;
	update();
}

this.setTitle1= function(k){
_title= document.getElementById(k).innerHTML;
update();
}

this.setText= function(k){
	_text = k;
		update();
	
}
this.setID = function(k){
	_id= k;
}

this.setImage = function(k){

	if(k != _image){
		_image = k;
		leftContainer.style.backgroundImage = "none";
		preloader.style.display = "block";
		var img = document.createElement("img");
		img.src = _image;
		
		img.addEventListener("load",function(){
			leftContainer.style.backgroundImage = "url("+_image+")";
				preloader.style.display = "none";
				delete img;
		});
		img.addEventListener("error",function(){
			alert("sorry");
		});
		
	}
}


//getters

//events

function onResize(event){
	if(_rendered == true){
	resize();
	}
}


	
}
