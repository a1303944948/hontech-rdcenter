function d(id){
	return document.getElementById(id);
}
function c(cls){
	return document.getElementsByClassName(cls);
}
function n(name){
	return document.getElementsByTagName(name);
}
function creat(object){
	return document.createElement(object);
}
function alern(text,name,btn,btns){
	if(text == undefined){
		text = '';
	}
	if(name == undefined||name == ''){
		name = 'Warning';
	}
	if(btn == undefined||btn == ''){
		btn = 'OK';
	}
	if(btns == ''){
		btns = 'Cancel';
	}
	var body = document.getElementsByTagName('body')[0];
	var fixed = document.createElement('div');
	if(c('fixed').length > 0){
		c('fixed')[0].parentNode.removeChild(c('fixed')[0]);
	}
	var div = document.createElement('div');
	fixed.className = 'fixed';
	fixed.style.width = "100%";
	fixed.style.height = "100%";
	fixed.style.position = "fixed";
	fixed.style.top = '0px';
	fixed.style.left = '0px';
	fixed.style.zIndex = '9999999';
	fixed.style.backgroundColor = 'rgba(0,0,0,0.7)';
	div.className = 'fixed_body';
	div.style.display = 'inline-block';
	div.style.width = 'auto';
	div.style.height = 'auto';
	div.style.minWidth = '300px';
	div.style.maxWidth = '500px';
	div.style.minHeight = '200px';
	div.style.position = 'absolute';
	div.style.top =  '50%';
	div.style.left = '50%';
	div.style.backgroundColor = "#ffffff";
	div.style.boxShadow = '0px 0px 3px #a4a4a4';
	var divHead = document.createElement('p');
	var divbody = document.createElement('div');
	var divbtn = document.createElement('button');
	var divbtns = document.createElement('button');
	divHead.innerHTML = name;
	divHead.style.width = "97%";
	divHead.style.height = '39px';
	divHead.style.lineHeight = '39px';
	divHead.style.paddingLeft = "3%";
	divHead.style.borderBottom = '1px #e5e5e5 solid';
	divbody.innerHTML = text;
	divbody.style.width = "90%";
	divbody.style.height = "auto";
	divbody.style.minHeight = "60px";
	divbody.style.maxHeight = window.innerHeight - 400 + 'px';
	divbody.style.overflowY = 'auto';
	divbody.style.marginLeft = "5%";
	divbody.style.marginTop = "20px";
	divbody.style.marginBottom = "20px";
	divbody.style.fontSize = "15px";
	divbtn.innerHTML = btn;
	divbtn.style.width = "100px";
	divbtn.style.height = "40px";
	divbtn.style.textAlign = 'center';
	divbtn.style.lineHeight = '40px';
	divbtn.style.backgroundColor = '#0D6FB8';
	divbtn.style.color = "#ffffff";
	divbtn.style.border = "none";
	divbtn.style.outline = 'none';
	divbtn.style.cursor = 'pointer';
	divbtn.style.float = 'right';
	divbtn.style.marginBottom = "20px";
	divbtn.style.marginRight = '20px';
	divbtn.style.borderRadius = '5px';
	divbtns.innerHTML = btns;
	divbtns.style.width = "100px";
	divbtns.style.height = "40px";
	divbtns.style.textAlign = 'center';
	divbtns.style.lineHeight = '40px';
	divbtns.style.backgroundColor = '#0D6FB8';
	divbtns.style.color = "#ffffff";
	divbtns.style.border = "none";
	divbtns.style.outline = 'none';
	divbtns.style.cursor = 'pointer';
	divbtns.style.float = 'right';
	divbtns.style.marginBottom = "20px";
	divbtns.style.marginRight = '20px';
	divbtns.style.borderRadius = '5px';
	div.appendChild(divHead);
	div.appendChild(divbody);
	div.appendChild(divbtns);
	div.appendChild(divbtn);
	if(btns == undefined){
		divbtns.style.display = 'none';
	}
	fixed.appendChild(div);
	body.appendChild(fixed);
	div.style.marginTop = -div.clientHeight/2 + 'px';
	div.style.marginLeft = -div.clientWidth/2 + 'px';
	divbtn.onmouseover = function(){
		divbtn.style.backgroundColor = '#0E76C6';
	}
	divbtn.onmouseout = function(){
		divbtn.style.backgroundColor = '#0D6FB8';
	}
	divbtn.onmousedown = function(){
		divbtn.style.backgroundColor = '#0D6FB8';
	}
	divbtn.onmouseup = function(){
		fixed.style.display = "none";
		divbtn.style.backgroundColor = '#0E76C6';
		document.onkeydown = false;
	}
	divbtns.onmouseover = function(){
		divbtn.style.backgroundColor = '#0E76C6';
	}
	divbtns.onmouseout = function(){
		divbtn.style.backgroundColor = '#0D6FB8';
	}
	divbtns.onmousedown = function(){
		divbtn.style.backgroundColor = '#0D6FB8';
	}
	divbtns.onmouseup = function(){
		fixed.style.display = "none";
		divbtn.style.backgroundColor = '#0E76C6';
		document.onkeydown = false;
	}
	document.onkeydown = function(e){
		if(e.keyCode == 13){
			fixed.style.display = "none";
			document.onkeydown = false;
		}
		if(e.keyCode == 32){
			fixed.style.display = "none";
			document.onkeydown = false;
			return false;
		}
	}
}
function loading(text){
	if(text == undefined){
		text = "loading";
	}
	var body = document.getElementsByTagName('body')[0];
	var loading = creat('div');
	loading.style.width = "100%";
	loading.style.height = "100%";
	loading.style.position = 'fixed';
	loading.style.left = '0px';
	loading.style.top = '0px';
	loading.style.backgroundColor = "rgba(0,0,0,0.7)";
	loading.zIndex = '9999999';
	//body.appendChild(loading);
}
$(function(){
	loading();
})