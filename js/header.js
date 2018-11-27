document.writeln("	<header>");
document.writeln("		<div class=\'header_right\'>");
document.writeln("			<div class=\'header_right_top\'>");
document.writeln("				<div class=\'header_logo\'>");
document.writeln("					<a href=\'index.html\'>");
document.writeln("						<img src=\'image/logo.jpg\'/>");
document.writeln("					</a>");
document.writeln("				</div>");
document.writeln("				<div class=\'header_title\'>");
document.writeln("					鸿丰智能售货系统");
document.writeln("				</div>");
document.writeln("			</div>");
document.writeln("			<div class=\'header_right_bottom\'>");
document.writeln("				<div class=\'header_nav\'>");
document.writeln("				</div>");
document.writeln("				<div class=\'header_user\'>");
document.writeln("					欢迎，"+loginUserName.name+"<b></b>");
document.writeln("					<div class=\'header_user_slip\'>");
document.writeln("						<span id='edit_pass'><img src=\'image/zhgl.png\'>修改密码</span>");
//document.writeln("						<span><img src=\'image/qh.png\'>切换账号</span>");
document.writeln("						<span id='exit_login'><img src=\'image/tc.png\'>退出登录</span>");
document.writeln("					</div>");
document.writeln("				</div>");
document.writeln("			</div>");
document.writeln("			<div class=\'clear\'></div>");
document.writeln("		</div>");
document.writeln("		<div class=\'clear\'></div>");
document.writeln("	</header>");
document.writeln("	<div class=\'header\'></div>");

//顶部渲染
function head(obj){
	//顶部导航渲染
	var head_nav = c('header_nav')[0];	//承载体盒子
	for(var i = 0; i < obj.length; i++){
		if(obj[i][0].value == 1){
			var list = creat('div');
			var list_div = creat('div');
			var count = i + 1;
			list.className = 'header_nav_list';
			list.setAttribute('data-id',obj[i][0].menuid);
			(function(q){
				list.onclick  = function(){
					if(obj[q][0].src != 'javascript:void(0)'){
						window.location.href = obj[q][0].src + '?menuid=' + obj[q][0].menuid;
					}else{
						window.location.href =obj[q][0].src;
					}
				}
			})(i)
			if(obj[i][1].length != 0){
				list.innerHTML = '<img src="'+ obj[i][0].icon +'"/>' + obj[i][0].text + '<b></b>';
			}else{
				list.innerHTML = '<img src="'+ obj[i][0].icon +'"/>' + obj[i][0].text + '<b style="display: none"></b>';
			}
			list_div.className = 'header_nav_list_item';
			for(var j = 0; j < obj[i][1].length; j++){
				if(obj[i][1][j].value == 1){
					var a = creat('a');
					if(obj[i][1][j].src != 'javascript:void(0)'){
						a.href = obj[i][1][j].src + '?menuid=' + obj[i][1][j].menuid;
					}else{
						a.href = obj[i][1][j].src;
					}
					a.setAttribute('data-id',obj[i][1][j].menuid);
					a.setAttribute('data-joint',obj[i][0].menuid);
					a.innerHTML = '<img src="'+obj[i][1][j].icon+'"/>'+obj[i][1][j].text;
					list_div.appendChild(a);
				}
			}
			list.appendChild(list_div);
			head_nav.appendChild(list);
		};
	}
	//顶部显示当前页面一级标签标识
	for(var i = 0; i < obj.length; i++){
		if(obj[i][0].menuid == GetQueryString('menuid')){
			document.title = obj[i][0].text;
			break;
		}
		//顶部显示当前页面二级标签标识
		for(var j = 0; j < obj[i][1].length; j++){
			if(obj[i][1][j].menuid == GetQueryString('menuid')){
				/*var list = creat('div');
				list.className = 'header_nav_list_status';
				list.innerHTML = '>' + obj[i][1][j].text;
				list.style.fontStyle = 'oblique';
				list.style.fontSize = '12px';
				list.style.color = '#00EA00';
				head_nav.appendChild(list);*/
				document.title = obj[i][1][j].text;
				break;
			}
		}
	}
	//鼠标移上导航显示下拉菜单
	var header_nav_list = c('header_nav_list');
	var header_nav_list_item = c('header_nav_list_item');
	for(var i = 0; i < header_nav_list.length; i++){
		(function(q){
			header_nav_list[q].onmouseover = function(){
				header_nav_list_item[q].style.display = 'block';
			}
			header_nav_list[q].onmouseout = function(){
				header_nav_list_item[q].style.display = 'none';
			}
		})(i)
	}

	//右边账号切换与退出登录滑动脚本
	var header_user = c('header_user')[0];
	var header_user_slip = c('header_user_slip')[0];
	header_user.onmouseover = function(){
		header_user_slip.style.top = '50px';
	}
	header_user.onmouseout = function(){
		header_user_slip.style.top = '-70px';
	}

	

	//保留页面上选中的状态
	function headSelect(){
		var navList = c('header_nav_list');
		var navItem = c('header_nav_list_item');
		var menuid = GetQueryString('menuid');

		if(menuid == null){
			navList[0].style.backgroundColor = '#3A485E';
		}

		for(var i = 0; i < navList.length; i++){
			if(navList[i].dataset.id == menuid){
				navList[i].style.backgroundColor = '#3A485E';
			}
		};

		for(var i = 0; i < navItem.length; i++){
			for(var j = 0; j < navItem[i].children.length; j++){
				if(menuid == navItem[i].children[j].dataset.id){
					for(var k = 0; k < navList.length; k++){
						if(navItem[i].children[j].dataset.joint == navList[k].dataset.id){
							navList[k].style.backgroundColor = '#3A485E';
						}
					};
					navItem[i].children[j].href = "javascript:void(0)";
					navItem[i].children[j].style.backgroundColor = '#3A485E';
				}
			}
		}
	}
	headSelect();
}

//退出登录
var exitLogin = d('exit_login');
exitLogin.onclick = function(){
	sessionStorage.removeItem("loginUserName");
	window.location.href = 'login.html';
}

//请求头部面包屑导航及权限控制数据
$.ajax({
	url: URLZ + 'bg-uc/jf/bg/basic/cfc/searchClassifiMenu.json',
	type: 'post',
	data: {
		empcode: loginUserName.empcode,
	},
	dataType: 'json',
	success: function(data){
		var obj = data.obj;
		$.ajax({
			url: URLY + 'bg-uc/jf/bg/basic/menunew.json',
			type: 'post',
			data: {},
			dataType: 'json',
			success: function(data){
				var objs = JSON.parse(data.menusData);
				var objects = [];
				for(var i = 0; i < objs.length; i++){
					objects.push(objs[i][0]);
					for(var j = 0; j < objs[i].length; j++){
						for(var k = 0; k < objs[i][j].length; k++){
							objects.push(objs[i][j][k]);
						}
					}
				}
				for(var i = 0; i <　objects.length; i++){
					　for(var j = 0; j < obj.length; j++){
						if(objects[i].menuid == obj[j].menuid){
							objects[i].value = 1;
						}
					}
				}
				function sonsTree(arr,id){
				    var temp = [],lev=0;
				    var forFn = function(arr, id,lev){
				        for (var i = 0; i < arr.length; i++) {
				            var item = arr[i];
				            if(item.perent==id) {
				                item.lev=lev + 1;
				                temp.push(item);
				                forFn(arr,item.menuid,lev+1);
				            }
				        }
				    };
				    forFn(arr, id,lev);
				    objects = temp;
				    return temp;
				}
				var tree = sonsTree(objects,undefined);
				var objectshead = [];
				for(var i = 0; i < objects.length; i++){
					if(objects[i].perent == undefined){
						var objectsheads = [];
						objectsheads.push(objects[i])
						objectshead.push(objectsheads);
					}
				}
				for(var i = 0; i < objectshead.length; i++){
					var objectsbody = [];
					for(var j = 0; j < objects.length; j++){
						if(objectshead[i][0].menuid == objects[j].perent){
							objectsbody.push(objects[j]);
						}
					}
					objectshead[i].push(objectsbody);
				}
				head(objectshead);
			}
		})
	}
})
//获取网页参数方法
function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}

//页面分页数据处理
function listMenu(){
	function GetQueryString(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return  unescape(r[2]); return null;
    }
    var temp;
	for(var i = 0; i < nav.length; i++){
		for(var j = 0; j < nav[i][1].length; j++){
				if(nav[i][1][j][0].menuid == GetQueryString('menuid')){
					temp = nav[i][1][j][1];
				};
		}
	}
	return temp;
}
//过滤网页url参数方法
function strSplit(obje){
	var urlHeader =  window.location.origin;
	var urlBody = window.location.pathname;
	var urlFooter = window.location.search;
	var urlObject = [];
	var urlObjects = [];
	var urlbox = urlHeader + urlBody;
	urlObject = urlFooter.split('&');
	urlObjects = urlFooter.split('&');
	for(var urli = urlObject.length-1; urli > 0; urli--){
		if(urlObject[urli].split('=')[0] == obje){
			urlObjects.splice(urli,1);
		};
	}
	for(var urlj = 0; urlj < urlObjects.length;urlj++){
		if(urlj != 0){
			urlbox += '&' + urlObjects[urlj];
		}else{
			urlbox += urlObjects[urlj];
		}
	}
	return urlbox;
}

//获取BOM结构方法
function group(){
	$.ajax({
		type: 'post',
		url: URLZ + 'bg-uc/jf/bg/basic/cfc/searchClassifi.json',
		async: false,
		data: {
			id: loginUserName.scopeofauthority,
			by: "",
			stop: 1,
		},
		success: function(data){
			KIT = data.obj;
			KITSEARCH = data.obj;
		}
	})
	/*$.ajax({
		type: 'post',
		url: URLZ + 'bg-uc/jf/bg/basic/cfc/getClassifi.json',
		data: {},
		async: false,
		dataType: 'json',
		success: function(data){
			KIT = data.obj;
		}
	})*/
}
//解析BOM结构方法		参数1为BOM数据(必传) 参数2为最上级ID(选传) 参数3为要显示的类型集合(选传)
function groupanalysis(kit,qid,array){
	function sonsTree(arr,id){
	    var temp = [],lev=0;
	    var forFn = function(arr, id,lev){
	        for (var i = 0; i < arr.length; i++) {
	            var item = arr[i];
	            if (item.parent_id==id) {
	                item.lev=lev;
	                temp.push(item);
	                forFn(arr,item.id,lev+1);
	            }
	        }
	    };
	    forFn(arr, id,lev);
	    return temp;
	}
	var count = [];
	if(qid != undefined&&qid != ""){
		count.push(qid);
	}else{
		for(var i = 0; i < kit.length; i++){
			count.push(kit[i].parent_id);
		}
	}
	var tree = sonsTree(kit,Math.min.apply(Math,count));
	var temp = [];
	var itemBreak = null;
	for(var i=0;i<tree.length;i++){
	    var item = tree[i],u = "";
	    for(var j = 0; j < array.length; j++){
	    	if(array[j] == item.icon){
		    	if(item.icon == 0){
			   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/001.png"/><a data-id="'+item.id+'">'+item.text+'</a></li>');
			    }else if(item.icon == 1){
			   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/002.png"/><a data-id="'+item.id+'">'+item.text+'</a></li>');
			    }else if(item.icon == 2){
			   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/003.png"/><a data-id="'+item.id+'">'+item.text+'</a></li>');
			    }else if(item.icon == 3){
			   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/004.png"/><a data-id="'+item.id+'">'+item.text+'</a></li>');
			    }else if(item.icon == 4){
			   		temp.push('<li><img class="item'+item['lev']+'" src="image/grouping/005.png"/><a data-id="'+item.id+'" data-mach="'+item.devicecode+'">'+item.text+'</a></li>');
			    }
	    	}
	    }
	}
	KITANALYSIS = temp;
}
//获取BOM结构中指定目标方法 传入：0为工厂，1为运营方，2为组别，3为人员，4为设备；//处理好所有页面后可弃用
function groupitem(num){
	var groupobj;
	var groupobject = [];
	$.ajax({
		type: 'post',
		url: URLZ + 'bg-uc/jf/bg/basic/cfc/searchClassifi.json',
		async: false,
		data: {
			id: loginUserName.scopeofauthority,
			by: "",
			stop: "",
		},
		success: function(data){
			groupobj = data.obj;
		}
	})
	/*$.ajax({
		type: 'post',
		url: URLZ + 'bg-uc/jf/bg/basic/cfc/getClassifi.json',
		data: {},
		async: false,
		dataType: 'json',
		success: function(data){
			groupobj = data.obj;
		}
	})*/
	for(var groupi = 0; groupi < groupobj.length; groupi++){
		if(groupobj[groupi].icon == num){
			groupobject.push(groupobj[groupi]);
		}
	}
	return groupobject;
}

//获取BOM结构中指定目标方法 传入：0为工厂，1为运营方，2为组别，3为人员，4为设备；//上面方法的升级版
function groupitemlevel(num,bom){
	var groupobject = [];
	for(var groupi = 0; groupi < bom.length; groupi++){
		if(bom[groupi].icon == num){
			groupobject.push(bom[groupi]);
		}
	}
	KITASSIGN = groupobject;
}


//获取售货机的所有资料接口
function machineAll(machCode){
	$.ajax({
		type: 'post',
		url: URLX + 'bg-uc/jf/com/util/web/mach.json',
		data: {
			machCode: machCode,
		},
		async: false,
		dataType: 'json',
		success: function(data){
			MACHOBJECT = data.device;
		}
	})
}

//获取指定区域内数据方法
function BOMAll(bom,qid){
	function sonsTree(arr,id){
	    var temp = [],lev=0;
	    function forFn(arr, id,lev){
	        for(var i = 0; i < arr.length; i++){
	            var item = arr[i];
	            if(item.parent_id==id){
	                item.lev=lev;
	                temp.push(item);
	                forFn(arr,item.id,lev+1);
	            }
	        }
	    };
	    forFn(arr, id,lev);
		if(temp == ""){
			for(var i = 0; i < bom.length; i++){
				if(bom[i].id == qid){
					if(bom[i].icon == 4){
						KITEXTR =[];
						KITEXTR.push(bom[i]);
					}else{
						KITEXTR =[];
					}
				};
			}
		}else{
	    	KITEXTR = temp;
		}
	    return temp;
	}
	/*var count = [];
	for(var i = 0; i < bom.length; i++){
		count.push(bom[i].parent_id);
	}*/
	var tree = sonsTree(bom,qid);
	var temp = [];
}

//权限控制
function Authority(user){
	$.ajax({
		type: 'post',
		url: URLZ + 'bg-uc/jf/bg/basic/sac/searchSubAthor.json',
		async: false,
		data: {
			emplCode: user,
		},
		success: function(data){
			var menuid = GetQueryString('menuid');
			MACHHEAD = [];
			KITHEAD = [];
			USERHEAD = [];
			DATAHEAD = [];
			for(var i = 0; i < data.obj.length; i++){
				if(menuid == data.obj[i].perent){
					MACHHEAD.push(data.obj[i]);
					KITHEAD.push(data.obj[i]);
					USERHEAD.push(data.obj[i]);
					DATAHEAD.push(data.obj[i]);
				}
			}
		}
	})
}

//修改密码
d('edit_pass').onclick = function(){
	passFixed();
}
function passFixed(){
	var body = n('body')[0];
	var div = creat('div');
	div.className = "pass_fixed";
	var divlist = creat('div');
	divlist.className = "pass_fixed_body";
	var p = creat('p');
	var span = creat('span');
	span.className = 'pass_fixed_body_close';
	p.innerHTML = "修改密码";
	span.innerHTML = "×";
	p.appendChild(span);
	var divlisttop = creat('table');
	var divlistbom = creat('table');
	var divlisttoptr = creat('tr');
	var divlisttoptda = creat('td');
	var divlisttoptdb = creat('td');
	var divlistbomtr = creat('tr');
	var divlistbomtda = creat('td');
	var divlistbomtdb = creat('td');
	divlisttoptda.innerHTML = '新密码:';
	divlisttoptdb.innerHTML = '<input id="pass_fixed_body_newPass" type="password"/>';
	divlistbomtda.innerHTML = '确认密码:';
	divlistbomtdb.innerHTML = '<input id="pass_fixed_body_comifPass" type="password"/>';
	var divlistbottom = creat('button');
	divlistbottom.id = 'pass_fixed_body_submit';
	divlistbottom.innerHTML = '确认修改';
	divlisttoptr.appendChild(divlisttoptda);
	divlisttoptr.appendChild(divlisttoptdb);
	divlisttop.appendChild(divlisttoptr);
	divlistbomtr.appendChild(divlistbomtda);
	divlistbomtr.appendChild(divlistbomtdb);
	divlistbom.appendChild(divlistbomtr);
	divlist.appendChild(p);
	divlist.appendChild(divlisttop);
	divlist.appendChild(divlistbom);
	divlist.appendChild(divlistbottom);
	div.appendChild(divlist);
	body.appendChild(div);
	c('pass_fixed_body_close')[0].onclick = function(){
		this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);
	}
	var newPass = d('pass_fixed_body_newPass');
	var comifPass = d('pass_fixed_body_comifPass');
	comifPass.onchange = function(){
		if(comifPass.value != newPass.value){
			comifPass.value = "";
			alern('两次输入的密码不一致!');
		}
	}
	d('pass_fixed_body_submit').onclick = function(){
		if(newPass.value == ""||comifPass.value == ""){
			alern('密码不能为空！');
			return false;
		}
		$.ajax({
			type: 'post',
			url: URLZ + 'bg-uc/jf/bg/basic/new/updatePWD.json',
			data: {
				empcode: loginUserName.empcode,
				password: comifPass.value,
			},
			success: function(data){
				alert('您已经修改了密码，请重新登陆！');
				sessionStorage.removeItem("loginUserName");
				window.location.href = 'login.html';
			}
		})
	}
}
window.onkeydown = function(e) {
  if (e.keyCode === 123) {
    e.preventDefault()
  }
}