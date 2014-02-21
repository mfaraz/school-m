// JavaScript Document
function List(){
var container;
var header;
var inner;
var title;

var items=[];
var selected;


var _title= "List";
var _data;

var list;
var thumb;

function create(){
	
	container = document.createElement("div");
	header = document.createElement("div");
	inner =  document.createElement("div");
	title = document.createElement("h1");
	header.appendChild(title);
	container.appendChild(header);
	container.appendChild(inner);
	
	list = document.createElement("img");
	list.setAttribute("width",16);
	list.src = "icons/list.png";
	header.appendChild(list);
	
	
		thumb = document.createElement("img");
	thumb.setAttribute("width",16);
	thumb.src = "icons/thumb.png";
	header.appendChild(thumb);
	
	
	
	thumb.addEventListener("click",onThumb);
	container.addEventListener("btnclick",onBtnClick);
	
}



function onBtnClick(event){
	if(selected != null){
		selected.normal();
	}
	selected = Model.getInstance().selectedComp;
}


function onClick(event){
	event.stopPropagation();
	if(event.component.getTitle() == "Thumb"){
	if(items.length>0){
		for(var i=0;i<items.length;i++){
			items[i].addClass();
		}
		
	}
	}else{
			if(items.length>0){
		for(var i=0;i<items.length;i++){
			items[i].removeClass();
		}
		
	}
	}
	
	
}

function update(){
	title.innerHTML = _title;
}
function style(){
	container.className = "app-1-list";
	header.className = "app-1-list-header";
	title.className = "title";
	inner.className = "app-1-list-inner";
}

function init(){
	create();
	update();
	style();
}


function onList(event){
if(items.length>0){
	for(var i=0;i<items.length;i++){
		items[i].removeClass();
	}
	thumb.addEventListener("click",onThumb);
	list.removeEventListener("click",onList);
}

}
function onThumb(event){
	if(items.length>0){
	for(var i=0;i<items.length;i++){
		items[i].addClass();
	}
	thumb.removeEventListener("click",onThumb);
	list.addEventListener("click",onList);
}
}

init();

this.setHeaderItem = function(k){
	var b = new Button();
	b.setTitle(k);
	b.setStyle("float:right");
	b.render(header);
}

this.removeAll = function(){
	inner.innerHTML = "";
}


this.setTitle = function(k){
	title.innerHTML = k;
}

this.setData = function(k){
	_data = k;
	
	if(!(_data instanceof Array)){
		throw new Error("please pass Array Only");
	}else{
		items=[];
		for(var i=0;i<_data.length;i++){
			if(_data[i] instanceof Object){
				var l = new ListItem();
				l.setTitle(_data[i].title);
				l.setText(_data[i].text);
				l.setID(_data[i].id);
				items.push(l);
				if(_data[i].image != null){
				l.setImage(_data[i].image);
				}
				l.render(inner);
			}
		}
		
		
	}
}

this.render = function(k){
	k.appendChild(container);
}



}
