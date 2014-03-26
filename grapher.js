/*

	grapher.js
	By Roland Rytz
	
	https://github.com/RolandR/Grapher


*/



function Grapher(args){
	/*
	*
	*	args:
	*	A JSON object.
	*	
	*	parent:	parent HTML element
	*	width:	width of canvas
	*	height:	height of canvas
	*	colors: {object}
	*		bg:		Background
	*		fg:		Graph color
	*		text:	Label color
	*	resolution: data points per step
	*
	*/
	
	var canvas;
	var context;
	
	var Logger = new function(){
		function log(message){
			if(console.log){
				if(typeof(message) == "string"){
					message = "Grapher: "+message;
				}
				console.log(message);
			}
		}
		function warn(message){
			if(console.warn){
				if(typeof(message) == "string"){
					message = "Grapher: "+message;
				}
				console.warn(message);
			}
		}
		function error(message){
			if(console.error){
				if(typeof(message) == "string"){
					message = "Grapher: "+message;
				}
				console.error(message);
			}
		}
		return{
			 log: log
			,warn: warn
			,error: error
		};
	}
	
	function checkArguments(){
		if(!args){
			args = {};
		}
		if(!args.parent){
			args.parent = document.getElementsByTagName('body')[0];
		}
		if(!args.width){
			args.width = 400;
		}
		if(!args.height){
			args.height = 200;
		}
		if(!args.colors){
			args.colors = {};
		}
		if(!args.colors.bg){
			args.colors.bg = "rgba(0, 0, 0, 0)";
		}
		if(!args.colors.fg){
			args.colors.fg = "#FF0000";
		}
		if(!args.colors.text){
			args.colors.text = "#000000";
		}
		if(!args.pointAmountDisplayed){
			args.pointAmountDisplayed = args.width;
		}
	}
	
	var data = {
		 displayedDataPoints: []
		,currentMax: 0
		,allTimeMax: 0
		,unloggedPoints: []
		,findCurrentMax: function(){
			var i = displayedDataPoints.length;
			var maxPoint = 0;
			while(i--){
				if(displayedDataPoints[i] > maxPoint){
					maxPoint = displayedDataPoints[i];
				}
			}
			return maxPoint;
		}
	}
	
	init();
	
	function init(){
		checkArguments();		
		
		canvas = document.createElement("canvas");
		canvas.className = "grapherCanvas";
		args.parent.appendChild(canvas);
		context = canvas.getContext("2d");
		
		canvas.width = args.width;
		canvas.height = args.height;
		
		context.fillStyle = args.colors.bg;
		context.fillRect(0, 0, args.width, args.height);
	}
	
	
	function push(dataPoint){
		if(dataPoint > data.allTimeMax){
			data.allTimeMax = dataPoint;
		}
		
		if(dataPoint > data.currentMax){
			data.currentMax = dataPoint;
		}
		
		data.displayedDataPoints.unshift(dataPoint);
		
		if(data.length > args.pointAmountDisplayed){
			var removedPoint = data.pop()
			
			if(removedPoint >= currentMax){
				data.currentMax = data.findCurrentMax();
			}
		}
		render();
	}
	
	function render(){
		context.fillStyle = args.colors.bg;
		context.clearRect(0, 0, args.width, args.height);
		context.fillRect(0, 0, args.width, args.height);
		context.strokeStyle = args.colors.fg;
		context.beginPath();
		context.moveTo(args.width, args.height - (data.displayedDataPoints[0]/data.currentMax) * args.height);
		
		var i = 0;
		while(i < data.displayedDataPoints.length){
			context.lineTo(args.width - (i/args.pointAmountDisplayed)*args.width, args.height - (data.displayedDataPoints[i]/data.currentMax) * args.height);
			i++;
		}
		context.stroke();
	}
	
	return{
		push: push
	}
}














