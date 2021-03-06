//input下拉框渲染
function start(){
	//BOM获取

	var sales_head = c('sales_head')[0];
	var selects = c('sales_head_selects');	//第一种类input下拉框(不携带value值的下拉框)
	var selects_ul = c('sales_head_selects_ul');


	group();
	groupanalysis(KIT,"",['0','1','2','4']);

	BOMAll(KIT,loginUserName.scopeofauthority);
	groupitemlevel(4,KITEXTR);
	LISTGROUP = [];		//每次点击时清空内容
	for(var i = 0; i < KITASSIGN.length; i++){
		LISTGROUP.push(KITASSIGN[i].devicecode);
	}

	//区域选择下拉框
	var Groupingz = c('device_head_groupingz')[0];
	var ul = creat('ul');
	ul.className = "device_head_ul";
	var li = "";
	for(var j = 0; j < KITANALYSIS.length; j++){
		li += (KITANALYSIS[j]);
	}
	ul.innerHTML = li;
	ul.style.minWidth = Groupingz.clientWidth + 'px';
	sales_head.appendChild(ul);

	var headUlz = c('device_head_ul');
	Groupingz.onfocus = function(){
		headUlz[0].style.display = "inline-block";
		headUlz[0].style.left = this.offsetParent.offsetLeft + 5 + 'px';
		headUlz[0].style.top = this.offsetParent.offsetTop + this.clientHeight + 5 + 'px';
		headUlz[0].style.maxHeight = window.innerHeight - Groupingz.offsetParent.offsetTop - 200 + 'px';
	}
	Groupingz.onblur = function(){
		headUlz[0].style.display = "none";
	}

	for(var j = 0; j < headUlz[0].children.length; j++){
		headUlz[0].children[j].children[1].onmousedown = function(){
			Groupingz.value = this.innerHTML;
			Groupingz.name = this.dataset.id;
			BOMAll(KIT,this.dataset.id);
			groupitemlevel(4,KITEXTR);
			LISTGROUP = [];
			for(var i = 0; i < KITASSIGN.length; i++){
				LISTGROUP.push(KITASSIGN[i].devicecode);
			}
			console.log(LISTGROUP);
		}
	}

	//第一种类渲染
	//给下拉框元素创建下拉内容
	LIST = [
		['By Device','By Goods'],
		['Today','Yesterday','This Week','The Last 10 Days','Last Week','This Month','The Last 30 Days','Last Month','This Year','Last Year','Custom Time'],
	]
	for(var i = 0; i < selects.length; i++){
		var ul = creat('ul');
		ul.className = 'sales_head_selects_ul';
		ul.setAttribute('data-list',i);
		console.log(LIST);
		for(var j = 0; j < LIST[i].length; j++){
			var li = creat('li');
			var br = creat('br');
			li.innerHTML = LIST[i][j];
			ul.appendChild(li);
			ul.appendChild(br);
		}
		sales_head.appendChild(ul);
	}

	//渲染点击事件
	for(var i = 0; i < selects.length; i++){
		selects_ul[i].style.left = selects[i].offsetParent.offsetLeft + 5 + 'px';
		selects_ul[i].style.top = selects[i].offsetParent.offsetTop + selects[i].offsetParent.clientHeight - 4 + 'px';
		(function(q){
			//点击input框时的显示隐藏
			selects[q].onfocus = function(){
				selects_ul[q].style.display = 'inline-block';
			}
			selects[q].onblur = function(){
				selects_ul[q].style.display = 'none';
			}
			//点击ul时的显示隐藏
			selects[q].parentNode.children[1].onfocus = function(){
				selects_ul[q].style.display = 'inline-block';
			}
			selects[q].parentNode.children[1].onblur = function(){
				selects_ul[q].style.display = 'none';
			}
		})(i)
		//将ul中选中的数据渲染到input框中
		for(var j = 0; j < selects_ul[i].children.length; j++){
			if(j%2 == 0){
				selects_ul[i].children[j].onmousedown = function(){
					selects[this.offsetParent.dataset.list].value = this.innerHTML;
				}
			};
		}

		//给下拉框元素默认选中第一个值
		selects[i].value = selects_ul[i].children[0].innerHTML;
	}



	//第二种类渲染
	var selectz = c('sales_head_selectz');	//第二种类input下拉框(携带value值的下拉框)
	var selects_ulz = c('sales_head_selects_ulz');

	for(var i = 0; i < selectz.length; i++){
		var ul = creat('ul');
		ul.className = 'sales_head_selects_ulz';
		ul.setAttribute('data-list',i);
		console.log(LISTS);
		for(var j = 0; j < LISTS[i].length; j++){
			var li = creat('li');
			var br = creat('br');
			li.setAttribute("data-value", LISTS[i][j].value)
			li.innerHTML = LISTS[i][j].text;
			ul.appendChild(li);
			ul.appendChild(br);
		}
		sales_head.appendChild(ul);
	}


	//渲染点击事件
	for(var i = 0; i < selectz.length; i++){

		//给下拉框元素默认选中第一个值
		var avoid = [0];	//此数组可以避免被执行默认选中
		var avoids = 0;
		for(var j = 0; j < avoid.length; j++){
			if(avoid[j] == i){
				avoids = 1;
			}
		}
		if(avoids != 1){
				selectz[i].value = selects_ulz[i].children[0].innerHTML;
				selectz[i].name = selects_ulz[i].children[0].dataset.value;
		}else{
			var br = creat('br');
			var newItem = creat('li');
			newItem.innerHTML = 'Select...';
			newItem.style.color = '#666666';
			newItem.setAttribute("data-value", '');
			selects_ulz[i].insertBefore(br,selects_ulz[i].childNodes[0]);
			selects_ulz[i].insertBefore(newItem,selects_ulz[i].childNodes[0]);
		}

		selects_ulz[i].style.left = selectz[i].offsetParent.offsetLeft + 5 + 'px';
		selects_ulz[i].style.top = selectz[i].offsetParent.offsetTop + selectz[i].offsetParent.clientHeight - 4 + 'px';
		(function(q){
			//点击input框时的显示隐藏
			selectz[q].onfocus = function(){
						selects_ulz[q].style.display = 'inline-block';
			}
			selectz[q].onblur = function(){
						selects_ulz[q].style.display = 'none';
			}
			//点击ul时的显示隐藏
			selectz[q].parentNode.children[1].onfocus = function(){
				selects_ulz[q].style.display = 'inline-block';
			}
			selectz[q].parentNode.children[1].onblur = function(){
				selects_ulz[q].style.display = 'none';
			}
		})(i)
		//将ul中选中的数据渲染到input框中
		for(var j = 0; j < selects_ulz[i].children.length; j++){
			if(j%2 == 0){
				selects_ulz[i].children[j].onmousedown = function(){
					selectz[this.offsetParent.dataset.list].value = this.innerHTML;
					selectz[this.offsetParent.dataset.list].name = this.dataset.value;
				}
			};
		}
	}

	//点击页面任意处关闭下拉框
	/*document.onclick = function(){
		for(var j = 0; j < selects_ul.length; j++){
			selects_ul[j].style.display = 'none';
		}
		for(var j = 0; j < selects_ulz.length; j++){
			selects_ulz[j].style.display = 'none';
		}
	}*/
}


var startDate;	//开始时间
var endDate;	//结束时间

//日期渲染	如果input框发生改变时要跟着改变
function datepicke(){

	var date_select = c('sales_head_selects')[1];	//日期input
	var date_selectUl = c('sales_head_selects_ul')[1];	//日期input
	var date_selectList = date_selectUl.children;			//日期input下拉框
	var headStart = c('sales_head_date_start');
	var headEnd = c('sales_head_date_end');
	var date = new Date();
	var nian;
	var yue;
	var ri;

	//页面加载时获取默认时间
	startDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	endDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1);

	var zhou = date.getDay();
	if(date.getDay() == 0){
		zhou = 7;
	}
	var hao = date.getDate()-1;
	var tian = 86400000;
	dateNone();
	for(var i = 0; i < date_selectList.length; i++){
		(function(q){
			date_selectList[q].onmousedown = function(){
				date_select.value = this.innerHTML;
				if(this.innerHTML == 'Today'){
					nian = date.getFullYear();
					yue = date.getMonth() + 1;
					ri = date.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
					dateNone();
				}else if(this.innerHTML == 'Yesterday'){
					var dates = new Date(new Date - tian);
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
					dateNone();
				}else if(this.innerHTML == 'This Week'){
					var dates = new Date(new Date - tian*(zhou));
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
					nian = date.getFullYear();
					yue = date.getMonth() + 1;
					ri = date.getDate();
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
					dateNone();
				}else if(this.innerHTML == 'The Last 10 Days'){
					var dates = new Date(new Date - tian*9);
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					nian = date.getFullYear();
					yue = date.getMonth() + 1;
					ri = date.getDate();
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
					dateNone();
				}else if(this.innerHTML == 'Last Week'){
					var dates = new Date(new Date - tian*(zhou-1+7));
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					dates = new Date(new Date - tian*(zhou));
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
					dateNone();
				}else if(this.innerHTML == 'This Month'){
					var dates = new Date(new Date - tian*hao);
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					nian = date.getFullYear();
					yue = date.getMonth() + 1;
					ri = date.getDate();
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
					dateNone();
				}else if(this.innerHTML == 'The Last 30 Days'){
					var dates = new Date(new Date - tian*29);
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					nian = date.getFullYear();
					yue = date.getMonth() + 1;
					ri = date.getDate();
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
					dateNone();
				}else if(this.innerHTML == 'Last Month'){
					var dates = new Date(new Date - tian*(hao+1));
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
          			endDate = String(nian) + '-' + String(yue+1) + '-' + String(1);
					dates = new Date(new Date - tian*(hao+ri));
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1;
					ri = dates.getDate();
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					dateNone();
				}else if(this.innerHTML == 'This Year'){
					var dateArr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
					var dates = new Date();
					nian = dates.getFullYear();
					yue = dates.getMonth(); //getMonth()是从0开始
					ri = dates.getDate();
					var result = 0;
					for ( var i = 0; i < yue - 1; i++) {
						result += dateArr[i];
					}
					result += ri;
					//判断是否闰年
					if (yue > 1 && (nian % 4 == 0 && nian % 100 != 0) || nian % 400 == 0) {
						result += 1;
					}
					dates = new Date(new Date - tian*(result-1));
					nian = dates.getFullYear();
					yue = 1; //getMonth()是从0开始
					ri = 1;
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					nian = date.getFullYear();
					yue = date.getMonth() + 1;
					ri = date.getDate();
					endDate = String(nian) + '-' + String(yue) + '-' + String(ri+1);
					dateNone();
				}else if(this.innerHTML == 'Last Year'){
					var dateArr = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
					var dates = new Date();
					nian = dates.getFullYear();
					yue = dates.getMonth(); //getMonth()是从0开始
					ri = dates.getDate();
					var result = 0;
					for ( var i = 0; i < yue; i++) {
						result += dateArr[i];
					}
					result += ri - 1;
					//判断是否闰年
					if (yue > 1 && (nian % 4 == 0 && nian % 100 != 0) || nian % 400 == 0) {
						result += 1;
					}
					dates = new Date(new Date - tian*(result));
					nian = dates.getFullYear();
					yue = dates.getMonth() + 1; //getMonth()是从0开始
					ri = dates.getDate();
					endDate = String(nian) + '-' + String(yue) + '-' + String(1);
					nian = nian-1;
					yue = 1;
					ri = 1;
					startDate = String(nian) + '-' + String(yue) + '-' + String(ri);
					dateNone();
				}else if(this.innerHTML == 'Custom Time'){
					headStart[0].style.display = 'table-cell';
					headStart[1].style.display = 'table-cell';
					headEnd[0].style.display = 'table-cell';
					headEnd[1].style.display = 'table-cell';
					startDate = undefined;
					endDate = undefined;
					controller(nianStart,yueStart,riStart);
					tabDate();
					onclicks(yueStart);
				}
			}
		})(i)
	}
	function dateNone(){
		headStart[0].style.display = 'none';
		headStart[1].style.display = 'none';
		headEnd[0].style.display = 'none';
		headEnd[1].style.display = 'none';
	}
}

var dateStart = new Date();
var nianStart = dateStart.getFullYear();
var yueStart = dateStart.getMonth()+1;
var riStart = dateStart.getDate();

//首次渲染日期控件
function controller(nian,yue,ri){
	var sales_head = c('sales_head')[0];
	var dateController = c('sales_head_date_controller');
	var headStart = c('sales_head_date_start');
	var headEnd = c('sales_head_date_end');
	var Left;
	var Top;
	var Width;

	for(var i = 0; i < dateController.length; i++){
		Left = dateController[i].parentNode.offsetLeft + 5;
		Top = dateController[i].parentNode.offsetTop + dateController[i].parentNode.clientHeight - 3;
		Width = dateController[i].clientWidth - 20;
		var div = creat('div');			//创建日期控件本身
		div.className = 'ui_datapicker';
		div.style.width = Width + 'px';
		div.style.height = 'auto';
		div.style.position = 'absolute';
		div.style.left = Left + 'px';
		div.style.top = Top + 'px';
		div.style.padding = '5px 10px 10px 10px';
		div.style.border = '1px #e5e5e5 solid';
		div.style.backgroundColor = '#ffffff';
		div.style.zIndex = 55;

		function header(){
			var p = creat('p');
			var headerHeight = 30;
			p.className = 'ui_datapicker_head';
			p.style.width = '100%';
			p.style.height = headerHeight + 'px';
			for(var j = 0; j < 4; j++){
				var a = creat('a');
				a.style.display = 'inline-block';
				a.style.height = headerHeight + 'px';
				a.style.lineHeight = headerHeight + 'px';
				a.style.textAlign = 'center';
				a.style.cursor = 'pointer';
				a.style.position = 'relative';
				p.appendChild(a);
				switch(j+1){
					case 1:
						a.innerHTML = '<';
						a.style.width = '20%';
						a.style.fontFamily = 'serif';
						a.style.fontSize = '20px';
						a.style.userSelect = 'none';
						a.style.fontWeight = '700';
						a.className = 'ui_datapicker_head_prev';
						a.onmouseover = function(){
							this.style.backgroundColor = '#e5e5e5';
						}
						a.onmouseout = function(){
							this.style.backgroundColor = '#ffffff';
						}
						break;
					case 2:
						var input = creat('input');
						var span = creat('span');
						input.value = nian;
						a.style.width = '34%';
						input.style.display = 'block';
						input.style.border = 'none';
						input.style.width = '100%';
						input.style.height = headerHeight-4 + 'px';
						input.style.fontSize = '16px';
						input.style.textAlign = 'center';
						input.style.userSelect = 'none';
						input.type = 'number';
						span.style.position = 'absolute';
						span.style.right = '-4px';
						span.style.top = '-4px';
						span.innerHTML = '-';
						a.appendChild(input);
						a.appendChild(span);
						a.className = 'ui_datapicker_head_left';
						break;
					case 3:
						if(parseInt(yue) < 10){
							yue = '0' + parseInt(yue);
						}
						a.style.width = '26%';
						a.innerHTML = yue;
						a.className = 'ui_datapicker_head_right';
						break;
					case 4:
						a.innerHTML = '>';
						a.style.width = '20%';
						a.style.fontFamily = 'serif';
						a.style.fontSize = '20px';
						a.style.userSelect = 'none';
						a.style.fontWeight = '700';
						a.className = 'ui_datapicker_head_next';
						a.onmouseover = function(){
							this.style.backgroundColor = '#e5e5e5';
						}
						a.onmouseout = function(){
							this.style.backgroundColor = '#ffffff';
						}
						break;
				}
			}
			div.appendChild(p);
		}
		header();

		/*日期选择器核心数组*/
		(function (){
			var datepicker = {};

			datepicker.getMonthDate = function(year,month){
				var ret = [];
				if(!year || !month){
					var today = new Date();
					year = today.getFullYear();
					month = today.getMonth() + 1;
				}

				var firstDay = new Date(year,month-1,1);
				var firstDayWeekDay = firstDay.getDay();
				if(firstDayWeekDay === 0){
					firstDayWeekDay = 7;
				}

				var lastDayOfLastMonth = new Date(year,month-1,0).getDate();

				var preMonthDayCount = firstDayWeekDay - 1;
				var lastDay = new Date(year,month,0);
				var lastDate = lastDay.getDate();
				for(var j = 0; j<7*6;j++){
					var date = j + 1 - preMonthDayCount;
					var showDate = date;
					var thisMonth = month;

					if(date <= 0){
						thisMonth = month-1;
						showDate = lastDayOfLastMonth + date;

					}else if(date > lastDate){
						thisMonth = month+1;
						showDate = showDate - lastDate;
					}

					if(thisMonth === 0) thisMonth = 12;
					if(thisMonth === 13) thisMonth = 1;

					ret.push({
						month: thisMonth,
						date: date,
						showDate: showDate
					});
					
				}
				return ret;
			}
			window.datepicker = datepicker;
		})()
		function bodyer(){
			var obj = datepicker.getMonthDate(nian,parseInt(yue));
			var objs = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
			var count = -1;

			var table = creat('table');
			table.width = Width + 'px';
			table.height = 'auto';
			table.className = 'ui_datapicker_body';
			table.style.borderCollapse = 'collapse';
			for(var j = 0; j < 1; j++){
				var tr = creat('tr');
				for(var k = 0; k < 7; k++){
					count++;
					var th = creat('th');
					th.innerHTML = objs[count];
					th.style.height = Width/7 + 'px';
					th.style.lineHeight = Width/7 + 'px';
					th.style.textAlign = 'center';
					th.style.userSelect = 'none';
					th.style.borderRadius = '50%';
					th.style.fontWeight = '500';
					th.style.fontSize = '10px';
					tr.appendChild(th);
				}
				table.appendChild(tr);
			}
			count = -1;
			for(var j = 0; j < 6; j++){
				var tr = creat('tr');
				for(var k = 0; k < 7; k++){
					count++;
					var td = creat('td');
					td.innerHTML = obj[count].showDate;
					td.style.height = Width/7 + 'px';
					td.style.lineHeight = Width/7 + 'px';
					td.style.textAlign = 'center';
					td.style.userSelect = 'none';
					td.style.borderRadius = '50%';
					td.style.fontSize = '14px';
					td.style.cursor = 'pointer';
					if(obj[count].month != yue){
						td.style.color = '#a4a4a4';
						td.style.cursor = 'auto';
					}
					td.setAttribute("data-title",obj[count].month);
					td.onmouseover = function(){
						this.style.backgroundColor = '#e5e5e5';
					}
					td.onmouseout = function(){
						this.style.backgroundColor = '#ffffff';
					}
					tr.appendChild(td);
				}
				table.appendChild(tr);
			}
			count = -1;
			div.appendChild(table);
		}
		bodyer();
		sales_head.appendChild(div);
		(function(q){	//点击展开收起日期控件
			dateController[q].onfocus = function(){
				var ui_datapicker = c('ui_datapicker');
				ui_datapicker[q].style.display = 'block';
			}
			dateController[q].onblur = function(){
				ui_datapicker[q].style.display = 'none';
			}
		})(i)
	}

	//页面加载时关闭所有的日期控件
	var ui_datapicker = c('ui_datapicker');
	for(var i = 0; i < ui_datapicker.length; i++){
		ui_datapicker[i].style.display = 'none';
	}
}

//点击后渲染日期控件
function controllers(nian,yue,ri,num){
	var sales_head = c('sales_head')[0];
	var dateController = c('sales_head_date_controller');
	var headStart = c('sales_head_date_start');
	var headEnd = c('sales_head_date_end');
	var left = c('ui_datapicker_head_left');
	var right = c('ui_datapicker_head_right');
	var box = yue;
	var Width;

	var div = c('ui_datapicker');
	var tbody = c('ui_datapicker_body');

	Width = dateController[num].clientWidth - 20;

	if(box < 10){
		box = '0' + box;
	}
  	left[num].children[0].value = nian;
	right[num].innerHTML = box;

	/*日期选择器核心数组*/
	(function (){
		var datepicker = {};

		datepicker.getMonthDate = function(year,month){
			var ret = [];
			if(!year || !month){
				var today = new Date();
				year = today.getFullYear();
				month = today.getMonth() + 1;
			}

			var firstDay = new Date(year,month-1,1);
			var firstDayWeekDay = firstDay.getDay();
			if(firstDayWeekDay === 0){
				firstDayWeekDay = 7;
			}

			var lastDayOfLastMonth = new Date(year,month-1,0).getDate();

			var preMonthDayCount = firstDayWeekDay - 1;
			var lastDay = new Date(year,month,0);
			var lastDate = lastDay.getDate();
			for(var j = 0; j<7*6;j++){
				var date = j + 1 - preMonthDayCount;
				var showDate = date;
				var thisMonth = month;

				if(date <= 0){
					thisMonth = month-1;
					showDate = lastDayOfLastMonth + date;

				}else if(date > lastDate){
					thisMonth = month+1;
					showDate = showDate - lastDate;
				}

				if(thisMonth === 0) thisMonth = 12;
				if(thisMonth === 13) thisMonth = 1;

				ret.push({
					month: thisMonth,
					date: date,
					showDate: showDate
				});
				
			}
			return ret;
		}
		window.datepicker = datepicker;
	})()
	function bodyer(){
		var tbody = c('ui_datapicker_body');
		var table = creat('table');
		var obj = datepicker.getMonthDate(nian,parseInt(yue));
		var objs = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
		var count = -1;

		var table = creat('table');
		table.width = Width + 'px';
		table.height = 'auto';
		table.className = 'ui_datapicker_body';
		table.style.borderCollapse = 'collapse';

		for(var j = 0; j < 1; j++){
			var tr = creat('tr');
			for(var k = 0; k < 7; k++){
				count++;
				var th = creat('th');
				th.innerHTML = objs[count];
				th.style.height = Width/7 + 'px';
				th.style.lineHeight = Width/7 + 'px';
				th.style.textAlign = 'center';
				th.style.userSelect = 'none';
				th.style.borderRadius = '50%';
				th.style.fontWeight = '500';
				th.style.fontSize = '10px';
				tr.appendChild(th);
			}
			table.appendChild(tr);
		}
		count = -1;
		for(var j = 0; j < 6; j++){
			var tr = creat('tr');
			for(var k = 0; k < 7; k++){
				count++;
				var td = creat('td');
				td.innerHTML = obj[count].showDate;
				td.style.height = Width/7 + 'px';
				td.style.lineHeight = Width/7 + 'px';
				td.style.textAlign = 'center';
				td.style.userSelect = 'none';
				td.style.borderRadius = '50%';
				td.style.fontSize = '14px';
				td.style.cursor = 'pointer';
				if(obj[count].month != yue){
					td.style.color = '#a4a4a4';
					td.style.cursor = 'auto';
				}
				if(obj[count].month == yue){
					if(left[num].children[0].value == nianSelected[num]){
						if(right[num].innerHTML == yueSelected[num]){
							if(riSelected[num] == td.innerHTML){
								td.style.backgroundColor = '#0C64A8';
								td.style.color = '#ffffff';
							}else{
								tdNormal();
							}
						}else{
							tdNormal();
						}
					}else{
						tdNormal();
					}
					function tdNormal(){
						td.setAttribute("data-title",obj[count].month);
						td.onmouseover = function(){
							this.style.backgroundColor = '#e5e5e5';
						}
						td.onmouseout = function(){
							this.style.backgroundColor = '#ffffff';
						}
					}
				}
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		count = -1;
		div[num].removeChild(tbody[num]);
		div[num].appendChild(table);
	}
	bodyer();
	onclicks(yue);
}

var nianNode = [];	//被调用的日期
var yueNode = [];	//被调用的日期
var riNode = [];	//被调用的日期

var nianSelected = [];	//被选中的日期
var yueSelected = [];	//被选中的日期
var riSelected = [];	//被选中的日期

function tabDate(){
	var div = c('ui_datapicker');
	var head = c('ui_datapicker_head');
	var prev = c('ui_datapicker_head_prev');
	var next = c('ui_datapicker_head_next');
	var left = c('ui_datapicker_head_left');
	var right = c('ui_datapicker_head_right');
	var table = c('ui_datapicker_body');
	var dateController = c('sales_head_date_controller');
	for(var i = 0; i < div.length; i++){
		nianNode.push(nianStart);
		yueNode.push(yueStart);
		riNode.push(riStart);
		nianSelected.push('');
		yueSelected.push('');
		riSelected.push('');
		(function(q){
			prev[q].onmousedown = function(e){
				yueNode[q]--;
				if(yueNode[q] < 1){
        			yueNode[q] = 12;
        			nianNode[q] = nianNode[q] - 1;
				}
				controllers(nianNode[q],yueNode[q],riNode[q],q);
				 if ( e && e.preventDefault ) 
		            e.preventDefault(); 
		        //IE阻止默认事件
		        else 
		            window.event.returnValue = false; 
		        return false;
			}
			next[q].onmousedown = function(e){
				yueNode[q]++;
				if(yueNode[q] > 12){
		        	yueNode[q] = 1;
		        	nianNode[q] = nianNode[q] + 1;
				}
				controllers(nianNode[q],yueNode[q],riNode[q],q);
				 if ( e && e.preventDefault ) 
		            e.preventDefault();
		        //IE阻止默认事件
		        else 
		            window.event.returnValue = false; 
		        return false;
			}
			left[q].children[0].onmousedown = function(e){
				setTimeout(function(){
					div[q].style.display = 'block';
					left[q].children[0].focus();
				},10)
			}
			left[q].children[0].onblur = function(){
					div[q].style.display = 'none';
			}
			left[q].children[0].onchange = function(){
				if(parseInt(this.value) < 1900){
					this.value = 1900;
				}
				nianNode[q] = parseInt(this.value);
				controllers(nianNode[q],yueNode[q],riNode[q],q);
			}
		})(i)
	}
}

//选中事件
function onclicks(yue){
	var table = c('ui_datapicker_body');
	var dateController = c('sales_head_date_controller');
	var ui_datapicker = c('ui_datapicker');
	for(var i = 0; i < table.length; i++){
		(function(q){
			for(var j = 0; j < table[q].children.length; j++){
				for(var k = 0; k < table[q].children[j].children.length; k++){
					if(table[q].children[j].children[k].dataset.title == yue){
						table[q].children[j].children[k].onmousedown = function(){
							nianSelected[q] = nianNode[q];
							yueSelected[q] = yueNode[q];
							riSelected[q] = parseInt(this.innerHTML);
							dateController[q].value = String(nianNode[q]) + '-' + String(yueNode[q]) + '-' + String(this.innerHTML) + ' ' + '00:00:00';
							controllers(nianSelected[q],yueSelected[q],riSelected[q],q);
							if(nianSelected[0] != ""){
								startDate = String(nianSelected[0]) + '-' +String(yueSelected[0]) + '-' + String(riSelected[0]);
							}
							if(nianSelected[1] != ""){
								endDate = String(nianSelected[1]) + '-' +String(yueSelected[1]) + '-' + String(riSelected[1]);
							}
							ui_datapicker[q].style.display = 'none';
						}
					};
				}
			}
		})(i)
	}
}
//数据请求
function selesForm(){
	var submit = c('sales_head_tbody_submit')[0];

	submit.onclick = function(){
		var methods = c('statisticalMethods')[0].value;				//统计方式数据
		var salesBody = c('sales_body')[0];							//底部渲染数据部分
		var Start = startDate;
		var End = endDate;

		if(Start == undefined||End == undefined){
			alern('Start Time or Ent Time Is Null');
			return false;
		}
		if(parseInt(startDate.split('-')[0]) > parseInt(endDate.split('-')[0])){
			alern('Start Time Cannot Exceed End Time');
			return false;
		}else if(parseInt(startDate.split('-')[0]) == parseInt(endDate.split('-')[0])&&(parseInt(startDate.split('-')[1]) > parseInt(endDate.split('-')[1]))){
			alern('Start Time Cannot Exceed End Time');
			return false;
		}else if(parseInt(startDate.split('-')[0]) == parseInt(endDate.split('-')[0])&&(parseInt(startDate.split('-')[1]) == parseInt(endDate.split('-')[1]))&&(parseInt(startDate.split('-')[2]) > parseInt(endDate.split('-')[2]))){
			alern('Start Time Cannot Exceed End Time');
			return false;
		};

		if(startDate == undefined){
			alern('Start Time Cannot Null');
			return false;
		}
		if(endDate == undefined){
			alern('End Time Cannot Null');
			return false;
		}
		if(methods == 'By Device'){
			methods = 0;
		}else{
			methods = 1;
		}
		salesBody.style.display = 'block';

		var currentDate = new Date();
		var dateDiffS = new Date(Start + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds());
		var dateDiffE = new Date(End + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds());

		Start = worldDate(dateDiffS.getTime());
		End = worldDate(dateDiffE.getTime());
		
		$.ajax({
			type: 'post',
			url: URLX + '/jf/com/report/forms/report.json',
			data: {
				array: JSON.stringify(LISTGROUP),
				sign: methods,
				starttime: Start,
				endtime: End
			},
			dataType: 'json',
			success: function(data){
				console.log(data);
				tableRendering(methods,data);
			}
		})
	}
}

start();
datepicke();
selesForm();

//底部table渲染
function tableRendering(type,allDate){
	var table = c('sales_body_table_tbody')[0];
	table.innerHTML = '';
	var tr = creat('tr');
	var td1 = creat('td');
	var td2 = creat('td');
	var td3 = creat('td');
	var td4 = creat('td');
	var td5 = creat('td');
	var td6 = creat('td');
	var td7 = creat('td');
	var td8 = creat('td');
	var td9 = creat('td');
	var td10 = creat('td');
	var td11 = creat('td');
	td1.colSpan = 2;
	var td2sum = 0;
	var td3sum = 0;
	var td4sum = 0;
	var td5sum = 0;
	var td6sum = 0;
	var td7sum = 0;
	var td8sum = 0;
	var td9sum = 0;
	var td10sum = 0;
	var td11sum = 0;
	for(var i = 0; i < allDate.listEntity.length; i++){
		td2sum += parseFloat(allDate.listEntity[i].totalCount);
		td3sum += parseFloat(allDate.listEntity[i].total);
		td4sum += parseFloat(allDate.listEntity[i].wechat);
		td5sum += parseFloat(allDate.listEntity[i].alipay);
		td6sum += parseFloat(allDate.listEntity[i].silverMerchant);
		td7sum += parseFloat(allDate.listEntity[i].icbc);
		td8sum += parseFloat(allDate.listEntity[i].cash);
		td9sum += parseFloat(allDate.listEntity[i].card);
		td10sum += parseFloat(allDate.listEntity[i].free);
		td11sum += parseFloat(allDate.listEntity[i].other);
	}
	td1.innerHTML = 'total';
	td2.innerHTML = Number(td2sum.toFixed(2));
	td3.innerHTML = Number(td3sum.toFixed(2));
	td4.innerHTML = Number(td4sum.toFixed(2));
	td5.innerHTML = Number(td5sum.toFixed(2));
	td6.innerHTML = Number(td6sum.toFixed(2));
	td7.innerHTML = Number(td7sum.toFixed(2));
	td8.innerHTML = Number(td8sum.toFixed(2));
	td9.innerHTML = Number(td9sum.toFixed(2));
	td10.innerHTML = Number(td10sum.toFixed(2));
	td11.innerHTML = Number(td11sum.toFixed(2));
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);
	tr.appendChild(td6);
	tr.appendChild(td7);
	tr.appendChild(td8);
	tr.appendChild(td9);
	tr.appendChild(td10);
	tr.appendChild(td11);
	table.appendChild(tr);
	var salesBodyTableTha = d('sales_body_table_tha');
	var salesBodyTableThb = d('sales_body_table_thb');
	if(type == 0){
		salesBodyTableTha.innerHTML = "Machine Name";
		salesBodyTableThb.innerHTML = "Machine ID";
		for(var i = 0; i < allDate.listEntity.length; i++){
			var tr = creat('tr');
			var td1 = creat('td');
			var td2 = creat('td');
			var td3 = creat('td');
			var td4 = creat('td');
			var td5 = creat('td');
			var td6 = creat('td');
			var td7 = creat('td');
			var td8 = creat('td');
			var td9 = creat('td');
			var td10 = creat('td');
			var td11 = creat('td');
			var td12 = creat('td');
			td1.innerHTML = allDate.listEntity[i].machName;
			td2.innerHTML = allDate.listEntity[i].machCode;
			td3.innerHTML = allDate.listEntity[i].totalCount;
			td4.innerHTML = allDate.listEntity[i].total;
			td5.innerHTML = allDate.listEntity[i].wechat;
			td6.innerHTML = allDate.listEntity[i].alipay;
			td7.innerHTML = allDate.listEntity[i].silverMerchant;
			td8.innerHTML = allDate.listEntity[i].icbc;
			td9.innerHTML = allDate.listEntity[i].cash;
			td10.innerHTML = allDate.listEntity[i].card;
			td11.innerHTML = allDate.listEntity[i].free;
			td12.innerHTML = allDate.listEntity[i].other;
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			tr.appendChild(td5);
			tr.appendChild(td6);
			tr.appendChild(td7);
			tr.appendChild(td8);
			tr.appendChild(td9);
			tr.appendChild(td10);
			tr.appendChild(td11);
			tr.appendChild(td12);
			table.appendChild(tr);
		}
	}else if(type == 1){
		salesBodyTableTha.innerHTML = "Commodity";
		salesBodyTableThb.innerHTML = "Commodity ID";
		for(var i = 0; i < allDate.listEntity.length; i++){
			var tr = creat('tr');
			var td1 = creat('td');
			var td2 = creat('td');
			var td3 = creat('td');
			var td4 = creat('td');
			var td5 = creat('td');
			var td6 = creat('td');
			var td7 = creat('td');
			var td8 = creat('td');
			var td9 = creat('td');
			var td10 = creat('td');
			var td11 = creat('td');
			var td12 = creat('td');
			td1.innerHTML = allDate.listEntity[i].goodsName;
			td2.innerHTML = allDate.listEntity[i].goodsId;
			td3.innerHTML = allDate.listEntity[i].totalCount;
			td4.innerHTML = allDate.listEntity[i].total;
			td5.innerHTML = allDate.listEntity[i].wechat;
			td6.innerHTML = allDate.listEntity[i].alipay;
			td7.innerHTML = allDate.listEntity[i].silverMerchant;
			td8.innerHTML = allDate.listEntity[i].icbc;
			td9.innerHTML = allDate.listEntity[i].cash;
			td10.innerHTML = allDate.listEntity[i].card;
			td11.innerHTML = allDate.listEntity[i].free;
			td12.innerHTML = allDate.listEntity[i].other;
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			tr.appendChild(td5);
			tr.appendChild(td6);
			tr.appendChild(td7);
			tr.appendChild(td8);
			tr.appendChild(td9);
			tr.appendChild(td10);
			tr.appendChild(td11);
			tr.appendChild(td12);
			table.appendChild(tr);
		}
	}
	
}

/*function tableName(tableNmaeId,excelTable){
	var idTmr;
	function  getExplorer() {
	    var explorer = window.navigator.userAgent ;
	    //ie
	    if (explorer.indexOf("MSIE") >= 0) {
	        return 'ie';
	    }
	    //firefox
	    else if (explorer.indexOf("Firefox") >= 0) {
	        return 'Firefox';
	    }
	    //Chrome
	    else if(explorer.indexOf("Chrome") >= 0){
	        return 'Chrome';
	    }
	    //Opera
	    else if(explorer.indexOf("Opera") >= 0){
	        return 'Opera';
	    }
	    //Safari
	    else if(explorer.indexOf("Safari") >= 0){
	        return 'Safari';
	    }
	}
	function method1(tableid) {//整个表格拷贝到EXCEL中
	    if(getExplorer()=='ie') {
	        var curTbl = document.getElementById(tableid);
	        var oXL = new ActiveXObject("Excel.Application");

	        //创建AX对象excel
	        var oWB = oXL.Workbooks.Add();
	        //获取workbook对象
	        var xlsheet = oWB.Worksheets(1);
	        //激活当前sheet
	        var sel = document.body.createTextRange();
	        sel.moveToElementText(curTbl);
	        //把表格中的内容移到TextRange中
	        sel.select;
	        //全选TextRange中内容
	        sel.execCommand("Copy");
	        //复制TextRange中内容
	        xlsheet.Paste();
	        //粘贴到活动的EXCEL中
	        oXL.Visible = true;
	        //设置excel可见属性

	        try {
	            var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
	        } catch (e) {
	            print("Nested catch caught " + e);
	        } finally {
	            oWB.SaveAs(fname);

	            oWB.Close(savechanges = false);
	            //xls.visible = false;
	            oXL.Quit();
	            oXL = null;
	            //结束excel进程，退出完成
	            //window.setInterval("Cleanup();",1);
	            idTmr = window.setInterval("Cleanup();", 1);
	        }
	    } else {
	        tableToExcel('ta')
	    }
	}
	function Cleanup() {
	    window.clearInterval(idTmr);
	    CollectGarbage();
	}

	    // template ： 定义文档的类型，相当于html页面中顶部的<!DOCTYPE> 声明。（个人理解，不确定）
	    // encodeURIComponent:解码
	    // unescape() 函数：对通过 escape() 编码的字符串进行解码。
	    // window.btoa(window.encodeURIComponent(str)):支持汉字进行解码。
	    // \w ：匹配包括下划线的任何单词字符。等价于’[A-Za-z0-9_]’
	    // replace()方法：用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
	    // {(\w+)}：匹配所有 {1个或更多字符} 形式的字符串；此处匹配输出内容是 “worksheet”
	    // 正则中的() ：是为了提取匹配的字符串。表达式中有几个()就有几个相应的匹配字符串。
	    // 讲解(/{(\w+)}/g, function(m, p) { return c[p]; } ：
	    //     /{(\w+)}/g 匹配出所有形式为“{worksheet}”的字符串；
	    //     function参数：  m  正则所匹配到的内容，即“worksheet”；
	    //                     p  正则表达式中分组的内容,即“(\w+)”分组中匹配到的内容，为“worksheet”；
	    //     c ：为object，见下图3
	    //     c[p] : 为“worksheet”

	var tableToExcel = (function() {
		var uri = 'data:application/vnd.ms-excel;base64,',
		template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
		base64 = function(s) {
			return window.btoa(unescape(encodeURIComponent(s)))
		},
		// 下面这段函数作用是：将template中的变量替换为页面内容ctx获取到的值
		format = function(s, c) {
				return s.replace(/{(\w+)}/g,
								function(m, p) {
									return c[p];
								}
				)
		};
		return function(table, name) {
			table = document.getElementById(tableNmaeId);
			// 获取表单的名字和表单查询的内容
	 		var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
			// format()函数：通过格式操作使任意类型的数据转换成一个字符串
			// base64()：进行编码
			var link = document.createElement("A");
			link.href = uri + base64(format(template, ctx));
			var excelDate = new Date();

			var names = excelDate.getFullYear() + '-' + (excelDate.getMonth()+1) + '-' + excelDate.getDate();
			link.download = 'Sales Report' + names + '.xls';
			link.target = '_blank';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			//window.location.href = uri + base64(format(template, ctx))
		}
	})()
	method1(excelTable);
}*/
var excelTable = d('sales_body_table');
var excelBtn = c('sales_body_excel_btn')[0];
excelBtn.onclick = function(){
  var tableArray = tableArr(excelTable);
  tableArray.unshift(xlsxUtils.readDataHead(tableArray));
  var blob = xlsxUtils.export({"Sheet1": tableArray});

  var excelDate = new Date();
  var names = excelDate.getFullYear() + '-' + (excelDate.getMonth()+1) + '-' + excelDate.getDate();
  
  saveAs(URL.createObjectURL(blob), "Sales Report"+names+".xlsx");
}

function tableArr(that){
  console.log(that);
  var thatChild = that.children;
  var tableArray = [];
  var tableHeadArr = [];
  for(var i = 0; i < thatChild[0].children[0].children.length; i++){
    tableHeadArr.push(thatChild[0].children[0].children[i].innerText);
  }
  for(var j = 0; j < thatChild[1].children.length; j++){
    var tableObject = {};
    for(var k = 0; k < thatChild[1].children[j].children.length; k++){
      tableObject[tableHeadArr[k]] = thatChild[1].children[j].children[k].innerText;
    }
    tableArray.push(tableObject);
  }
  return tableArray;
}