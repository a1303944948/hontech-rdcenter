//ID选择器
function d(id){
	return document.getElementById(id);
}

//class选择器
function c(cls){
	return document.getElementsByClassName(cls);
}

//元素选择器
function n(name){
	return document.getElementsByTagName(name);
}

//创建元素器
function creat(object){
	return document.createElement(object);
}

//弹窗
function alern(text,name,btn,btns){
	if(text == undefined){
		text = '';
	}
	if(name == undefined||name == ''){
		name = '温馨提醒';
	}
	if(btn == undefined||btn == ''){
		btn = '确定';
	}
	if(btns == ''){
		btns = '取消';
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
		fixed.parentNode.removeChild(fixed);
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
		fixed.parentNode.removeChild(fixed);
		divbtn.style.backgroundColor = '#0E76C6';
		document.onkeydown = false;
	}
	document.onkeydown = function(e){
		if(e.keyCode == 13){
		fixed.parentNode.removeChild(fixed);
			document.onkeydown = false;
		}
		if(e.keyCode == 32){
		fixed.parentNode.removeChild(fixed);
			document.onkeydown = false;
			return false;
		}
	}
}


//如果引用该加载效果需先在全局css文件中加入以下样式
/*
.body_load_div_image{
	animation: loadDiv 0.8s linear 0s infinite;
}
@keyframes loadDiv{
	0%{
		transform: rotate(0deg);
	}
	100%{
		transform: rotate(360deg);
	}
}*/

//加载动画
var loadingTimore;
function loading(text){
	if(text == undefined){
		text = "加载中";
	}
	var body = n('body')[0];
	var load = creat('div');
	load.className = "body_load";
	load.style.width = "100%";
	load.style.height = "100%";
	load.style.position = 'fixed';
	load.style.left = '0px';
	load.style.top = '0px';
	load.style.backgroundColor = "rgba(0,0,0,0.7)";
	load.style.zIndex = '9999999';
	var loadDiv = creat('div');
	loadDiv.style.width = '160px';
	loadDiv.style.height = '160px';
	loadDiv.style.position = 'absolute';
	loadDiv.style.top = '50%';
	loadDiv.style.left = '50%';
	loadDiv.style.marginTop = '-80px';
	loadDiv.style.marginLeft = '-80px';
	var loadDivItem = creat('div');
	loadDivItem.style.width = '160px';
	loadDivItem.style.height = '160px';
	loadDivItem.style.position = 'absolute';
	loadDivItem.style.top = '0px';
	loadDivItem.style.left = '0px';
	loadDivItem.style.textAlign = 'center';
	loadDivItem.style.fontSize = '12px';
	loadDivItem.style.lineHeight = '160px';
	loadDivItem.style.color = '#ffffff';
	loadDiv.appendChild(loadDivItem);
	loadDivItem.innerHTML = text;
	var loadCount = 0;
	loadingTimore = setInterval(function(){
		loadCount++;
		if(loadCount == 1){
			loadDivItem.innerHTML = text + '●';
		}
		if(loadCount == 2){
			loadDivItem.innerHTML = text + '●●';
		}
		if(loadCount == 3){
			loadDivItem.innerHTML = text + '●●●';
			loadCount = 0;
		}
	},300);
	var loadDivImg = new Image();
	loadDivImg.src = 'image/loading.png';
	loadDivImg.className = 'body_load_div_image';
	loadDivImg.style.width = '100%';
	loadDivImg.style.height = '100%';
	loadDivImg.style.position = 'absolute';
	loadDivImg.style.top = '0px';
	loadDivImg.style.left = '0px';
	loadDiv.appendChild(loadDivImg);
	load.appendChild(loadDiv);
	if(body != undefined){
		body.appendChild(load);
	}
}
//关闭加载动画
function loadingClear(){
	clearInterval(loadingTimore);
	var body = n('body')[0];
	var load = c('body_load')[0];
	if(load){
		body.removeChild(load);
	};
}

//ajax请求
function ajax(type,url,data,succ,error,json,async){
	var xhr = new XMLHttpRequest ();
	if(async != true&&async != false){
		async = true;
	}
	xhr.open(type,url,async);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send(data);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200){
				if(json == 'json'){
					succ(JSON.parse(xhr.responseText));
				}else{
					succ(xhr.responseText);
				}
			}else{
				error(xhr.status);
			}
		}
	}
}

//js中批量给元素添加innerHTML方法封装
function setHTML(domArr,objArr){	//domArr为dom数组集合 objArr为被添加的字符串组成的数组
	for(var i = 0; i < domArr.length; i++){
		domArr[i].innerHTML = objArr[i];
	}
}
//js中批量修改样式的方法封装
function setStyle(dom,json){	//dom为元素 json为要更改的样式键值对
	for(var i in json){
		if(!json.hasOwnProperty(i)) continue;
		dom.style[i] = json[i];
	}
}
//js中批量设置className方法封装
function setClass(domArr,objArr){
	for(var i = 0; i < domArr.length; i++){
		domArr[i].className = objArr[i];
	}
}
//批量append目标
function setAppend(dom,arr){
	for(var i = 0; i < arr.length; i++){
		dom.appendChild(arr[i]);
	}
}
//js中批量修改样式的方法封装(主要用于页面准备样式添加)
function setStyleX(text){
	var wmHead = n('head')[0];
	if(c('wmStyle')[0] === undefined){
		var wmStyle = creat('style');
		wmStyle.type = 'text/css';
		wmStyle.className = 'wmStyle';
		wmHead.appendChild(wmStyle);
	}
	c('wmStyle')[0].innerHTML = c('wmStyle')[0].innerHTML + text;
}

//添加页面需要的样式
setStyleX('/*分页样式渲染*/.wm_pagemark{border: 1px #e5e5e5 solid;border-radius: 5px;background-color: #ffffff;margin-left: auto;margin-right: auto; position: relative;opacity: 0; margin-top: 10px;}.wm_pagemark_body{width: 100%;height: 100%;text-align: center;}.wm_pagemark_body>button{height: 30px; line-height:30px; background-color: #3498Db;color: #ffffff;border: none; border-radius: 5px; padding-left: 10px; padding-right: 10px; margin-right: 15px;}.wm_pagemark_body>button:hover{background-color: #258BCF;}.wm_pagemark_body>button:active{background-color: #3498DB;}.wm_pagemark_body>button:last-child{margin-right: 0;}.wm_pagemark_body>span>input{width: 34px; height: 30px; text-align: center; margin-left:5px; margin-right: 5px;border: 1px #e5e5e5 solid; padding: 5px; box-sizing: border-box; border-radius: 3px; background-color: #ffffff;}.wm_pagemark_body>span{font-size: 12px;display: inline-block;vertical-align: bottom;text-align: center;padding-right: 15px;color: #a4a4a4;}');

//分页实现
function WmPageMark(){
	var wmPageMark = c('wm_pagemark');
	if(c('wm_pagemark_body').length > 0){
		for(var i = c('wm_pagemark_body').length;i > 0; i--){
			c('wm_pagemark_body')[i-1].parentNode.removeChild(c('wm_pagemark_body')[i-1]);
		}
	}
	for(var i = 0; i < wmPageMark.length; i++){
		var datasetLength = JSON.parse(wmPageMark[i].dataset.length);
		var datasetType = Number(wmPageMark[i].dataset.pagetype);
		var Width,Height;
		!wmPageMark[i].dataset.width?Width = 480:Width = wmPageMark[i].dataset.width;
		!wmPageMark[i].dataset.height?Height = 40:Height = wmPageMark[i].dataset.height;
		wmPageMark[i].style.height = Height + 'px';
		wmPageMark[i].style.width = Width + 'px';
		wmPageMark[i].style.opacity = 1;
		var wmPageMarkBody = creat('div');
		setClass([wmPageMarkBody],['wm_pagemark_body']);
		setHTML([wmPageMarkBody],['<button onclick="WmPageMarkItem(this,1,'+datasetType+')" style="margin-top:'+(Height-30)/2+'px;">首页</button><button onclick="WmPageMarkItem(this,2,'+datasetType+')" style="margin-top:'+(Height-30)/2+'px;">上一页</button><span>共'+Math.ceil(datasetLength[0]/datasetLength[2])+'页，到第<input type="number" style="margin-top:'+(Height-30)/2+'px;" value="'+datasetLength[1]+'"/>页</span><button onclick="WmPageMarkItem(this,3,'+datasetType+')" style="margin-top:'+(Height-30)/2+'px;">Go</button><button onclick="WmPageMarkItem(this,4,'+datasetType+')" style="margin-top:'+(Height-30)/2+'px;">下一页</button><button onclick="WmPageMarkItem(this,5,'+datasetType+')" style="margin-top:'+(Height-30)/2+'px;">尾页</button>']);
		setAppend(wmPageMark[i],[wmPageMarkBody]);
	}
}
//分页的按钮触发事件
function WmPageMarkItem(that,num,type){
	var datasetLength = JSON.parse(that.parentNode.parentNode.dataset.length);
	switch(num){
		case 1:
			if(Number(that.parentNode.children[2].children[0].value) !== 1){
				that.parentNode.children[2].children[0].value = 1;
				WmPageMarkItemGo();
			}
			break;
		case 2:
			that.parentNode.children[2].children[0].value = Number(that.parentNode.children[2].children[0].value)-1;
			WmPageMarkItemGo();
			break;
		case 3:
			WmPageMarkItemGo();
			break;
		case 4:
			that.parentNode.children[2].children[0].value = Number(that.parentNode.children[2].children[0].value)+1;
			WmPageMarkItemGo();
			break;
		case 5:
			if(Number(that.parentNode.children[2].children[0].value) !== Math.ceil(datasetLength[0]/datasetLength[2])){
				that.parentNode.children[2].children[0].value = Math.ceil(datasetLength[0]/datasetLength[2]);
				WmPageMarkItemGo();
			}
			break;
		default:
			break;
	}
	function WmPageMarkItemGo(){
		if(Number(that.parentNode.children[2].children[0].value) <= Math.ceil(datasetLength[0]/datasetLength[2])&&Number(that.parentNode.children[2].children[0].value)>0){
			datasetLength[1] = Number(that.parentNode.children[2].children[0].value);
			that.parentNode.parentNode.setAttribute('data-length',JSON.stringify(datasetLength));
			console.log(JSON.parse(that.parentNode.parentNode.dataset.length)[1],type);
			WmPageMarkStart(JSON.parse(that.parentNode.parentNode.dataset.length)[1],type);
		}else{
			if(Number(that.parentNode.children[2].children[0].value)>0){
				that.parentNode.children[2].children[0].value = Math.ceil(datasetLength[0]/datasetLength[2]);
			}else{
				that.parentNode.children[2].children[0].value = 1;
			}
		}
	}
}