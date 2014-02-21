// JavaScript Document
var Model = (function(){
	
	//internal
	var instance;
	//internal
	function Singleton(){
		//model
		this.selectedId = null;
		this.employeeData =  null;
		this.selectedComp = null;
	}
	
	
	return {
		getInstance:function(){
			if(instance == null){
				instance = new Singleton();
			}
			
				return instance;
		}
		
	}
	
	
})();