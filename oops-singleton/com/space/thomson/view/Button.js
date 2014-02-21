// JavaScript Document
function Button(){
	//private members
	var container;
	var title;
	var icon;
	
	//declare self
	var me = this;
	
	//private settables;
	var _title = "Button";
	var _icon = ["icons/default.png"];
	var _bgColor = "#fc0";
	var _color = "#333";
	
	
	//private methods
	function create(){
		container = document.createElement("div");
		title =  document.createElement("h1");
		icon = document.createElement("img");
		icon.setAttribute("width",24);
		icon.setAttribute("height",24);
		
		container.appendChild(icon);
		container.appendChild(title);
		
		if(window.navigator.platform.toLowerCase() == "win32"){
		container.addEventListener("mouseover",onOver);
		container.addEventListener("mouseout",onOut);
		container.addEventListener("click",onClick);
		}else{
				container.addEventListener("touchstart",onOver);
		container.addEventListener("touchend",onOut1);
		
		}
		
		
	}
	
	
	
	
	function update(){
		icon.src = _icon[0];
		title.innerHTML = _title;
		container.style.backgroundColor = _bgColor;
		title.style.color = _color;
	}
	
	function style(){
		container.className= "app-1-button";
		icon.className= "app-1-button-icon";
		title.className= "app-1-button-title";
	}
	
	function init(){
	create();
	style();
	update();
	}
	
	//initialization code
	init();
	
	
	
	//public methods
	this.setTitle = function(k){
		_title = k;
		update();
	}
	this.getTitle = function(){
		return _title;
	}
	
	this.setIcon = function(k){
		_icon = k;
		update();
	}
	this.setBgColor = function(k){
		_bgColor = k;
		update();
	}
	this.setStyle = function(k){
		container.setAttribute("style",k);
	}
	
	this.setClass = function(k){
		title.classList.add(k);
	}
	 
	this.normal = function(){
		container.addEventListener("mouseover",onOver);
		container.addEventListener("mouseout",onOut);
		container.addEventListener("click",onClick);
		container.className = "app-1-button";
	}
	
	
		this.setColor = function(k){
		_color = k;
		update();
	}
	
	this.render = function(k){
		k.appendChild(container);
	}
	
	//event responses
	
	function onOver(event){
		me.setColor("#fff");
		if(_icon.length >1){
			icon.src = _icon[1];
		}
	event.currentTarget.className = "app-1-button-over";

	}
	function onOut(event){
		me.setColor("#333");
	event.currentTarget.className = "app-1-button";
		if(_icon.length >1){
			icon.src = _icon[0];
		}
	}
	
		function onOut1(event){
	
		
		container.removeEventListener("touchstart",onOver);
		container.removeEventListener("touchend",onOut1);
	
		var evt = document.createEvent("Event");
		evt.component  = me;
evt.initEvent("btnclick",true,true);
container.dispatchEvent(evt);


	}
	function onClick(event){
			container.removeEventListener("mouseover",onOver);
		container.removeEventListener("mouseout",onOut);
		container.removeEventListener("click",onClick);
//container.parentNode.parentNode.parentNode.style.backgroundColor = "#f00";
//loosely coupled 
//custom events
var evt = document.createEvent("Event");
evt.initEvent("btnclick",true,true);
//custom data
evt.component  = me;
container.dispatchEvent(evt);

	}

	
	
}
