(function(){
	/*	
	//plugin version 1.0
	  author: 
	  
	  used as a DOM Helper
	  get:
	  loadScript:
	
	*/
	
	var plugin = {
		get:function(id){
			return document.getElementById(id);
		},
		ajax:function(obj){
			var url;
			var method = "GET";
			var type = "xml";
			var dev = true;
			
			if(obj instanceof Object){
				if(obj.url != null){
					url = obj.url;
					if(obj.method != null){
						method = obj.method;
					}
					if(obj.type != null){
						type = obj.type;
					}
					if(obj.dev != null){
						dev = obj.dev;
						if(dev == true){
							url = url+"?id="+new Date().getTime();
						}
					}
					
					
					
			var xhr = new XMLHttpRequest();
			xhr.open(method,url,true);
			xhr.send();
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(type == "xml"){
						if(obj.success != null && obj.success instanceof Function){
						obj.success(xhr.responseXML);
						}
					}else if(type == "html"){
					if(obj.success != null && obj.success instanceof Function){
						obj.success(xhr.responseText);
						}
					}else if(type == "json"){
						if(obj.success != null && obj.success instanceof Function){
					
							if(xhr.responseText.toString().indexOf("404")>0){
								throw new Error("Request file not Found");
							}else{
						obj.success(xhr.responseText);
							}
						}
					}
				}
			}
			
				}else{
					throw new Error("Please specify url");
				}
			}else{
				throw new Error("Please specify Object as param");
			}
		},
		loadScript:function(scripts,development,callback){
			if(scripts instanceof Array){
				if(scripts.length >0){
					var counter=0;
					var prefix;
					if(development == true){
						prefix = "?id="+new Date().getTime().toString();
					}else{
						prefix = "";
					}
				for(var i=0;i<scripts.length;i++){
				var src = scripts[i].split(".").join("/")+".js"+prefix;
				var script = document.createElement("script");
				script.src = src;
				document.getElementsByTagName("head")[0].appendChild(script);
				script.addEventListener("load",function(){
					counter++;
					if(counter == scripts.length){
						callback();
					}
				});
				
				}
		
				}else{
					throw new Error("the length should be >0");
				}
				
			}else{
				throw new Error("the param should be array");
			}
			
		},
		
	}
	
	window.p = window.plugin = plugin;
})();
