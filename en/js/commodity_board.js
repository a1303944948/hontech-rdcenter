var type = 10000;
function start(){
	Authority(loginUserName.empcode);

	var Head = c('operator_head')[0];
	var Select = c('item_select');
	var headUl = c('headUl');
	//渲染状态下拉框
	for(var i = 0; i < Select.length; i++){
		var ul = creat('ul');
		ul.className = 'headUl';
		ul.setAttribute("data-list", i);
		for(var j = 0; j < DATA[i].length; j++){
			var li = creat('li');
			li.innerHTML = DATA[i][j].text;
			li.setAttribute("data-value", DATA[i][j].value);
			ul.appendChild(li);
		}
		Head.appendChild(ul);

		(function(q){
			Select[q].onmousedown = function(){
				headUl[q].style.display = 'block';
				headUl[q].style.width = Select[q].clientWidth + 'px';
				headUl[q].style.left = Select[q].offsetParent.offsetLeft + 5 + 'px';
				headUl[q].style.top = Select[q].offsetParent.offsetTop + 4 + Select[q].clientHeight + 'px';
			}
		})(i)
	}

	for(var i = 0; i < headUl.length; i++){
		(function(q){
			Select[q].onfocus = function(){
				headUl[q].style.display = 'inline-block';
			}
			Select[q].onblur = function(){
				headUl[q].style.display = 'none';
			}
		})(i)
		for(var j = 0; j < headUl[i].children.length; j++){
			Select[i].value = headUl[i].children[0].innerHTML;
			Select[i].name = headUl[i].children[0].dataset.value;
			headUl[i].children[j].onmousedown = function(){
				Select[this.parentNode.dataset.list].value = this.innerHTML;
				Select[this.parentNode.dataset.list].name = this.dataset.value;
			}
		}
	}

	//为body部分高度布局
	var obody = c('operator_body')[0];
	obody.style.height = window.innerHeight - Head.clientHeight - 119 + 'px';

	//渲染货道规格
	var modelMultiple = d('model_multiple');
	$.ajax({
		type: 'post',
		url: URLS + '/jxzd/goods.json',
		data: {},
		async: false,
		success: function(data){
			console.log(data);
			for(var i = 0; i < data.length; i++){
				var div = creat('div');
				var input = creat('input');
				var span = creat('span');
				div.className = 'model_multiple_div';
				input.type = 'checkbox';
				input.name = data[i].categoryId;
				span.innerHTML = data[i].categoryId;
				div.appendChild(input);
				div.appendChild(span);
				modelMultiple.appendChild(div);
			}
			var divClear = creat('div');
			divClear.className = 'clear';
			modelMultiple.appendChild(divClear);
		}
	});

	//DATAHEAD = listMenu();

	var BottomUl = c('operator_body_right_head_bottom_ul')[0];
	for(var i = 0; i < DATAHEAD.length; i++){
		var li = creat('li');
		li.innerHTML = DATAHEAD[i].textEn;
		li.setAttribute('data-menuid',DATAHEAD[i].menuid);
		BottomUl.appendChild(li);
	}
	var divClear = creat('div');
	divClear.className = 'clear';
	BottomUl.appendChild(divClear);


	//渲染右边table切换
	var footList = c('operator_body_right_foot_list');
	var ulLi = c('operator_body_right_head_bottom_ul')[0].children;

	for(var i = 0; i < DATAHEAD.length; i++){
		(function(q){
			ulLi[q].onclick = function(){
				for(var j = 0; j < footList.length; j++){
					footList[j].style.display = 'none';
				}
				for(var j = 0; j < ulLi.length; j++){
					ulLi[j].style.borderTop = 'none';
					ulLi[j].style.borderLeft = 'none';
					ulLi[j].style.borderRight = 'none';
					ulLi[j].style.marginTop = '0px';
					ulLi[j].style.color = '#428BCA';
					ulLi[j].style.backgroundColor = '#f0f0f0';
				}
				for(var j = 0; j < footList.length; j++){
					if(this.dataset.menuid == footList[j].dataset.menuid){
						footList[j].style.display = 'block';
						this.style.borderTop = '2px #16b904 solid';
						this.style.borderLeft = '1px #e5e5e5 solid';
						this.style.borderRight = '1px #e5e5e5 solid';
						this.style.marginTop = '-1px';
						this.style.color = '#666666';
						this.style.backgroundColor = '#ffffff';
					}
				}
			}
		})(i)
		/*if(DATAHEAD[i].value != 1){
			ulLi[i].style.display = 'none';
		}*/
	}

	var allNone = 0;
	for(var i = 0; i < DATAHEAD.length; i++){
		if(DATAHEAD[i].value == 1){
			for(var j = 0; j < footList.length; j++){
				if(DATAHEAD[i].menuid == footList[j].dataset.menuid){
					footList[j].style.display = 'block';
					ulLi[i].style.borderTop = '2px #16b904 solid';
					ulLi[i].style.borderLeft = '1px #e5e5e5 solid';
					ulLi[i].style.borderRight = '1px #e5e5e5 solid';
					ulLi[i].style.marginTop = '-1px';
					ulLi[i].style.color = '#666666';
					ulLi[i].style.backgroundColor = '#ffffff';
					allNone = 1;
				}else{
					footList[j].style.display = 'none';
				}
			}
			break;
		}
	}
	if(allNone == 0){
		for(var j = 0; j < footList.length; j++){
			footList[j].style.display = 'none';
		}
	}
	//渲染顶部运营方下拉框
	var operatorSelect = c('operator_selects')[0];
	var operatorSelectUl = c('operator_select_uls')[0];
	if(operatorSelectUl != undefined){
		operatorSelectUl.parentNode.removeChild(operatorSelectUl);
	};

	DATALEFT = groupitem(1);
	function operatorSel(){
		var ul = creat('ul');
		ul.className = "operator_select_uls";
		ul.style.minWidth = operatorSelect.clientWidth + 'px';
		for(i = 0; i < DATALEFT.length; i++){
			var li = creat('li');
			li.innerHTML = DATALEFT[i].text;
			li.setAttribute('data-value',DATALEFT[i].operatorID);
			ul.appendChild(li);
		}
		operatorSelect.parentNode.appendChild(ul);
		var operatorSelectUl = c('operator_select_uls')[0];
		operatorSelect.onfocus = function(){
			operatorSelectUl.style.display = "inline";
		}
		operatorSelect.onblur = function(){
			operatorSelectUl.style.display = "none";
		}
		console.log(operatorSelectUl);
		operatorSelect.value = operatorSelectUl.children[0].innerHTML;
		operatorSelect.name = operatorSelectUl.children[0].dataset.value;
		for(var i = 0; i < operatorSelectUl.children.length; i++){
			operatorSelectUl.children[i].onmousedown = function(){
				operatorSelect.value = this.innerHTML;
				operatorSelect.name = this.dataset.value;
			}
		}
	}
	if(loginUserName.operatorID == 1){
		operatorSel();
	}else{
		$.ajax({
			type: 'post',
			url: URLS + '/operate/getOperate.json',
			data: {
				operatorID: loginUserName.operatorID,
			},
			success: function(data){
				console.log(data);

				var ul = creat('ul');
				ul.className = "operator_select_uls";
				ul.style.minWidth = operatorSelect.clientWidth + 'px';
				var li = creat('li');
				li.innerHTML = data.operator;
				li.setAttribute('data-value',data.operatorID);
				ul.appendChild(li);
				operatorSelect.parentNode.appendChild(ul);
				var operatorSelectUl = c('operator_select_uls')[0];
				operatorSelect.onfocus = function(){
					operatorSelectUl.style.display = "inline";
				}
				operatorSelect.onblur = function(){
					operatorSelectUl.style.display = "none";
				}
				console.log(operatorSelectUl);
				operatorSelect.value = operatorSelectUl.children[0].innerHTML;
				operatorSelect.name = operatorSelectUl.children[0].dataset.value;
				for(var i = 0; i < operatorSelectUl.children.length; i++){
					operatorSelectUl.children[i].onmousedown = function(){
						operatorSelect.value = this.innerHTML;
						operatorSelect.name = this.dataset.value;
					}
				}
			}
		})
	}
}

function startbody(){
	console.log(loginUserName);
	//获取运营方下拉框数据
	DATALEFT = groupitem(1);
	//获取商品数据
	$.ajax({
		type: 'post',
		url: URLZ + '/jf/bg/basic/gdsm/getParam.json',
		data: {
			operatorID: loginUserName.operatorID,
		},
		success: function(data){
			//body左边部分渲染
			console.log(data);
			var commmodityLeft = data.obj;
			startbodyleft(commmodityLeft);
		}
	})
}

function startbodyleft(commmodityLeft){
	var obodyLeft = c('operator_body_left')[0];
	var OperatorBodyLeftUl = c('operator_body_left_ul')[0];
	if(OperatorBodyLeftUl != undefined){
		obodyLeft.removeChild(OperatorBodyLeftUl);
	}
	var ul = creat('ul');
	ul.className = 'operator_body_left_ul';
	for(var i = 0; i < commmodityLeft.length; i++){
		var divList = creat('li');
		divList.className = 'operator_body_left_list';
		divList.innerHTML = '<img src="image/spgl.png" /><span>' + commmodityLeft[i].waresName + '</span><div class="clear"></div>';
		divList.setAttribute('data-value',commmodityLeft[i].waresId);
		ul.appendChild(divList);
	}
	obodyLeft.appendChild(ul);

	var BodyLeftList = c('operator_body_left_list');
	//点击渲染右边数据
	for(var i = 0; i < BodyLeftList.length; i++){
		BodyLeftList[i].style.width = BodyLeftList[i].children[0].clientWidth + BodyLeftList[i].children[1].clientWidth + 10 + 'px';
		(function(q){
			BodyLeftList[q].onclick = function(){
				type = 0;
				for(var j = 0; j < BodyLeftList.length; j++){
					BodyLeftList[j].style.backgroundColor = "rgba(0,0,0,0)";
				}
				BodyLeftList[q].style.backgroundColor = "#e5e5e5";
				var thatName = this.dataset.value;
				var orightFootItem = c('operator_body_right_foot_item');
				for(var j = 0; j < orightFootItem.length; j++){
					orightFootItem[j].style.display = 'block';
				}
				//渲染运营方下拉框
				var operatorSelect = c('operator_select')[0];
				var operatorSelectUl = c('operator_select_ul')[0];
				if(operatorSelectUl != undefined){
					operatorSelectUl.parentNode.removeChild(operatorSelectUl);
				};
				function operatorSel(){
					var ul = creat('ul');
					ul.className = "operator_select_ul";
					ul.style.minWidth = operatorSelect.clientWidth + 'px';
					for(j = 0; j < DATALEFT.length; j++){
						var li = creat('li');
						li.innerHTML = DATALEFT[j].text;
						li.setAttribute('data-value',DATALEFT[j].operatorID);
						ul.appendChild(li);
					}
					operatorSelect.parentNode.appendChild(ul);
					var operatorSelectUl = c('operator_select_ul')[0];
					operatorSelect.onfocus = function(){
						operatorSelectUl.style.display = "inline";
					}
					operatorSelect.onblur = function(){
						operatorSelectUl.style.display = "none";
					}
					operatorSelect.value = operatorSelectUl.children[0].innerHTML;
					operatorSelect.name = operatorSelectUl.children[0].dataset.value;
					for(var j = 0; j < operatorSelectUl.children.length; j++){
						operatorSelectUl.children[j].onmousedown = function(){
							operatorSelect.value = this.innerHTML;
							operatorSelect.name = this.dataset.value;
						}
					}
				}
				if(loginUserName.operatorID == 1){
					operatorSel();
				}else{
					$.ajax({
						type: 'post',
						url: URLS + '/operate/getOperate.json',
						data: {
							operatorID: loginUserName.operatorID,
						},
						success: function(data){
							console.log(data);

							var ul = creat('ul');
							ul.className = "operator_select_ul";
							ul.style.minWidth = operatorSelect.clientWidth + 'px';
							var li = creat('li');
							li.innerHTML = data.operator;
							li.setAttribute('data-value',data.operatorID);
							ul.appendChild(li);
							operatorSelect.parentNode.appendChild(ul);
							var operatorSelectUl = c('operator_select_ul')[0];
							operatorSelect.onfocus = function(){
								operatorSelectUl.style.display = "inline";
							}
							operatorSelect.onblur = function(){
								operatorSelectUl.style.display = "none";
							}
							console.log(operatorSelectUl);
							operatorSelect.value = operatorSelectUl.children[0].innerHTML;
							operatorSelect.name = operatorSelectUl.children[0].dataset.value;
							for(var i = 0; i < operatorSelectUl.children.length; i++){
								operatorSelectUl.children[i].onmousedown = function(){
									operatorSelect.value = this.innerHTML;
									operatorSelect.name = this.dataset.value;
								}
							}
						}
					})
				}
				//详细信息内容渲染
				var detailedOperatorId = d('commodity_operator');							//运营方
				var detailedOperatorNumbering = d('commodity_num');							//商品编号
				var detailedOperatorCompanyname = d('commodity_name');						//商品名称
				var detailedOperatorCompanyaddress = d('commodity_price');					//标准价格
				var commodityShelf = d('commodity_shelf');									//保质期
				var detailedOperatorPrincipal = c('model_multiple_div');					//货道规格
				var detailedOperatorPhone = c('detailed_operator_star');					//推荐星值
				var commodityCode = d('commodity_code');									//条码编号
				var detailedOperatorSparephone = d('commodity_Infrared');					//红外加热
				var detailedOperatorEmail = d('commodity_microwave');						//微波加热
				var commodityCooking = d('commodity_cooking');								//烹饪温度
				var commoditySupplier = d('commodity_supplier');							//供应商
				var detailedOperatorPickimg = c('detailed_operator_pickimg')[0];			//选餐图片
				var detailedOperatorOrderimg = c('detailed_operator_orderimg')[0];			//下单图片
				var detailedOperatorIngredientimg = c('detailed_operator_ingredientimg')[0];//商品介绍
				var commodityRemark = d('commodity_remark');								//备注
				var detailedOperatorStop = d('detailed_operator_stop');						//停用
				console.log(commmodityLeft[q]);
				detailedOperatorId.value = commmodityLeft[q].operParty;
				detailedOperatorId.name = commmodityLeft[q].operatorID;
				detailedOperatorNumbering.value = commmodityLeft[q].waresId;
				detailedOperatorCompanyname.value = commmodityLeft[q].waresName;
				detailedOperatorCompanyaddress.value = commmodityLeft[q].waresPrice;
				commodityShelf.value = commmodityLeft[q].quaGuaPeriod;
				//detailedOperatorPrincipal.value = commmodityLeft[q].principal;
				//detailedOperatorPhone.value = commmodityLeft[q].phone1;
				var theGoodsModel = commmodityLeft[q].theGoodsModel.split(',');
				console.log(theGoodsModel);
				for(var j = 0; j < detailedOperatorPrincipal.length; j++){
					detailedOperatorPrincipal[j].children[0].checked = false;
				}
				for(var j = 0; j < detailedOperatorPrincipal.length; j++){
					for(var k = 0; k < theGoodsModel.length; k++){
						if(detailedOperatorPrincipal[j].children[0].name == theGoodsModel[k]){
							detailedOperatorPrincipal[j].children[0].checked = 'checked';
						}
					}
				}
				for(var j = 0; j < detailedOperatorPhone.length; j++){
					detailedOperatorPhone[j].children[0].src = "image/dxs.png";
				}
				for(var j = 0; j < commmodityLeft[q].starValue; j++){
					detailedOperatorPhone[j].children[0].src = "image/dx.png";
				}
				commodityCode.value = commmodityLeft[q].barCodeNo;
				detailedOperatorSparephone.value = commmodityLeft[q].infraredheating;
				detailedOperatorEmail.value = commmodityLeft[q].microwaveheating;
				commodityCooking.value = commmodityLeft[q].cooking;
				commoditySupplier.value = commmodityLeft[q].supplier;
				detailedOperatorPickimg.innerHTML = commmodityLeft[q].waresImage1;
				detailedOperatorOrderimg.innerHTML = commmodityLeft[q].waresImage2;
				if(commmodityLeft[q].waresImage3 !== undefined){
					detailedOperatorIngredientimg.innerHTML = commmodityLeft[q].waresImage3;
				}else{
					detailedOperatorIngredientimg.innerHTML = "";
				}
				commodityRemark.value = commmodityLeft[q].remark;
				if(commmodityLeft[q].dltflag == '0'){
					detailedOperatorStop.checked = "checked";
				}else{
					detailedOperatorStop.checked = false;
				}
			}
		})(i)
	}
}

//搜索商品列表
c('operator_home_head_submit')[0].onclick = function(){
	var orightFootItem = c('operator_body_right_foot_item');
	for(var i = 0; i < orightFootItem.length; i++){
		orightFootItem[i].style.display = 'none';
	}
	var commodityOperators = d('commodity_operators');
	var commodityStatus = d('commodity_status');
	console.log(commodityOperators.name);
	console.log(commodityStatus.name);
	$.ajax({
		type: 'post',
		url: URLZ + '/jf/bg/basic/gdsm/searchObjParam.json',
		data: {
			operatorID: commodityOperators.name,
			status: commodityStatus.name,
		},
		success: function(data){
			console.log(data.obj);
			startbodyleft(data.obj);
		}
	})
}

//初始化渲染布局
window.onresize = function(){
	var Head = c('operator_head')[0];
	var obody = c('operator_body')[0];
	obody.style.height = window.innerHeight - Head.clientHeight - 119 + 'px';
}

var operatorStars = 0;
function submit(){
	var bodyCreat = d('body_creat');
	var bodySubmit = d('body_submit');

	//检测条码编号是否重复
	/*d('commodity_code').onchange = function(){
		var that = this;
		console.log(loginUserName.operatorID);
		console.log(that.value);
		$.ajax({
			type: 'post',
			url: URLZ + '/jf/bg/basic/gdsm/check.json',
			data: {
				opreatorId: loginUserName.operatorID,
				barCodeNo: that.value,
			},
			success: function(data){
				if(data.obj != 0){
					alern('The Bar Code and'+data.obj.waresName+'with the same!');
					that.value = "";
				}
			}
		})
	}*/

	var operatorStar = c('detailed_operator_star');	//推荐星值打星
	for(var i = 0; i < operatorStar.length; i++){
		(function(q){
			operatorStar[q].onclick = function(){
				for(var j = 0; j < operatorStar.length; j++){
					operatorStar[j].children[0].src = 'image/dxs.png';
				}
				for(var j = 0; j < (q+1); j++){
					operatorStar[j].children[0].src = 'image/dx.png';
					operatorStars = j+1;
				}
			}
		})(i)
	}

	d('commodity_Infrared').onchange = function(){
		if(this.value > 600){
			this.value = 0;
			alern('0 <= Infrared Heating Time <= 600');
		}
		if(this.value < 0){
			this.value = 0;
			alern('0 <= Infrared Heating Time <= 600');
		}
		if(this.value == ""){
			this.value = 0;
			alern('Infrared Heating Time Is Null!');
		}
	}
	d('commodity_Infrared').oninput = function(){
		this.value=this.value.replace(/[^0-9]/);
	}

	d('commodity_microwave').onchange = function(){
		if(this.value > 600){
			this.value = 0;
			alern('0 <= Microwave Heating Time <= 600');
		}
		if(this.value < 0){
			this.value = 0;
			alern('0 <= Microwave Heating Time <= 600');
		}
		if(this.value == ""){
			this.value = 0;
			alern('Microwave Heating Time Is Null!');
		}
	}
	d('commodity_microwave').oninput = function(){
		this.value=this.value.replace(/[^0-9]/);
	}

	d('commodity_cooking').onchange = function(){
		if(this.value > 300){
			this.value = 0;
			alern('0 <= Max Temperature <= 300');
		}
		if(this.value < 0){
			this.value = 0;
			alern('0 <= Max Temperature <= 300');
		}
		if(this.value == ""){
			this.value = 0;
			alern('Max Temperature Is Null!');
		}
	}
	d('commodity_cooking').oninput = function(){
		this.value=this.value.replace(/[^0-9]/);
	}

	//标准价格
	d('commodity_price').oninput = function(){
		if(this.value > 10000){
			alern('Can`t exceed 10000 and can only keep two decimals');
			this.value = 10000;
		}
		if(this.value.toString().split(".")[1] != undefined){
			if(this.value.toString().split(".")[1].length > 2){
				alern('Can`t exceed 10000 and can only keep two decimals');
				var that = "";
				console.log(this.value.toString().length);
				console.log(this.value.toString());
				for(var i = 0; i < this.value.toString().length - this.value.toString().split(".")[1].length + 1; i++){
					that += this.value.toString()[i];
				}
				this.value = that;
			}
		}
	}

	//图片上传
	var OperatorPickimg = d('detailed_operator_pickimg');
	var detailedOperatorPickimg = c('detailed_operator_pickimg')[0];
	var OperatorOrderimg = d('detailed_operator_orderimg');
	var detailedOperatorOrderimg = c('detailed_operator_orderimg')[0];
	var OperatorIngredientimg = d('detailed_operator_ingredientimg');
	var detailedOperatorIngredientimg = c('detailed_operator_ingredientimg')[0];
	var operatorPickimgBtn = d('detailed_operator_pickimg_btn');
	var operatorOrderimgBtn = d('detailed_operator_orderimg_btn');
	var operatorIngredientimgBtn = d('detailed_operator_ingredientimg_btn');
	var OperatorPickimgBase = "";
	var OperatorOrderimgBase = "";
	var OperatorIngredientimgBase = "";
	var imageFixed = c('image_fixed')[0];
	OperatorPickimg.onchange = function(e){
		var reader = new FileReader();
		console.log(this.files[0]);
		reader.readAsDataURL(this.files[0]);
		reader.onload=function(oFREvent){
			OperatorPickimgBase = oFREvent.target.result;
		}
		detailedOperatorPickimg.innerHTML = this.value;
	}
	OperatorOrderimg.onchange = function(e){
		var reader = new FileReader();
		reader.readAsDataURL(this.files[0]);
		reader.onload=function(oFREvent){
			OperatorOrderimgBase = oFREvent.target.result;
		}
		detailedOperatorOrderimg.innerHTML = this.value;
	}
	OperatorIngredientimg.onchange = function(e){
		var reader = new FileReader();
		reader.readAsDataURL(this.files[0]);
		reader.onload=function(oFREvent){
			OperatorIngredientimgBase = oFREvent.target.result;
		}
		detailedOperatorIngredientimg.innerHTML = this.value;
	}
	operatorPickimgBtn.onclick = function(){
		if(OperatorPickimgBase == ""){
			if(detailedOperatorPickimg.innerHTML != ""){
				imageFixed.style.display = 'block';
				imageFixed.children[0].src = detailedOperatorPickimg.innerHTML;
				imageFixed.children[0].onload = function(){
					imageFixed.children[0].style.height = 'auto';
					imageFixed.children[0].style.width = 'auto';
					if(imageFixed.clientHeight < imageFixed.children[0].clientHeight){
						imageFixed.children[0].style.height = imageFixed.clientHeight - 50 + 'px';
					}
					if(imageFixed.clientWidth < imageFixed.children[0].clientWidth){
						imageFixed.children[0].style.width = imageFixed.clientWidth - 50 + 'px';
					}
					imageFixed.children[0].style.marginTop = (imageFixed.clientHeight - imageFixed.children[0].clientHeight)/2 + 'px';
				}
			}else{
				alern('Image not found!');
			}
		}else{
			imageFixed.style.display = 'block';
			imageFixed.children[0].src = OperatorPickimgBase;
			imageFixed.children[0].onload = function(){
				imageFixed.children[0].style.height = 'auto';
				imageFixed.children[0].style.width = 'auto';
				if(imageFixed.clientHeight < imageFixed.children[0].clientHeight){
					imageFixed.children[0].style.height = imageFixed.clientHeight - 50 + 'px';
				}
				if(imageFixed.clientWidth < imageFixed.children[0].clientWidth){
					imageFixed.children[0].style.width = imageFixed.clientWidth - 50 + 'px';
				}
				imageFixed.children[0].style.marginTop = (imageFixed.clientHeight - imageFixed.children[0].clientHeight)/2 + 'px';
			}
		}
	}
	operatorOrderimgBtn.onclick = function(){
		if(OperatorOrderimgBase == ""){
			if(detailedOperatorOrderimg.innerHTML != ""){
				imageFixed.style.display = 'block';
				imageFixed.children[0].src = detailedOperatorOrderimg.innerHTML;
				imageFixed.children[0].onload = function(){
					imageFixed.children[0].style.height = 'auto';
					imageFixed.children[0].style.width = 'auto';
					if(imageFixed.clientHeight < imageFixed.children[0].clientHeight){
						imageFixed.children[0].style.height = imageFixed.clientHeight - 50 + 'px';
					}
					if(imageFixed.clientWidth < imageFixed.children[0].clientWidth){
						imageFixed.children[0].style.width = imageFixed.clientWidth - 50 + 'px';
					}
					imageFixed.children[0].style.marginTop = (imageFixed.clientHeight - imageFixed.children[0].clientHeight)/2 + 'px';
				}
			}else{
				alern('Image not found!');
			}
		}else{
			imageFixed.style.display = 'block';
			imageFixed.children[0].src = OperatorOrderimgBase;
			imageFixed.children[0].onload = function(){
				imageFixed.children[0].style.height = 'auto';
				imageFixed.children[0].style.width = 'auto';
				if(imageFixed.clientHeight < imageFixed.children[0].clientHeight){
					imageFixed.children[0].style.height = imageFixed.clientHeight - 50 + 'px';
				}
				if(imageFixed.clientWidth < imageFixed.children[0].clientWidth){
					imageFixed.children[0].style.width = imageFixed.clientWidth - 50 + 'px';
				}
				imageFixed.children[0].style.marginTop = (imageFixed.clientHeight - imageFixed.children[0].clientHeight)/2 + 'px';
			}
		}
	}
	operatorIngredientimgBtn.onclick = function(){
		if(OperatorIngredientimgBase == ""){
			if(detailedOperatorIngredientimg.innerHTML != ""){
				imageFixed.style.display = 'block';
				imageFixed.children[0].src = detailedOperatorIngredientimg.innerHTML;
				imageFixed.children[0].onload = function(){
					imageFixed.children[0].style.height = 'auto';
					imageFixed.children[0].style.width = 'auto';
					if(imageFixed.clientHeight < imageFixed.children[0].clientHeight){
						imageFixed.children[0].style.height = imageFixed.clientHeight - 50 + 'px';
					}
					if(imageFixed.clientWidth < imageFixed.children[0].clientWidth){
						imageFixed.children[0].style.width = imageFixed.clientWidth - 50 + 'px';
					}
					imageFixed.children[0].style.marginTop = (imageFixed.clientHeight - imageFixed.children[0].clientHeight)/2 + 'px';
				}
			}else{
				alern('Image not found!');
			}
		}else{
			imageFixed.style.display = 'block';
			imageFixed.children[0].src = OperatorIngredientimgBase;
			imageFixed.children[0].onload = function(){
				imageFixed.children[0].style.height = 'auto';
				imageFixed.children[0].style.width = 'auto';
				if(imageFixed.clientHeight < imageFixed.children[0].clientHeight){
					imageFixed.children[0].style.height = imageFixed.clientHeight - 50 + 'px';
				}
				if(imageFixed.clientWidth < imageFixed.children[0].clientWidth){
					imageFixed.children[0].style.width = imageFixed.clientWidth - 50 + 'px';
				}
				imageFixed.children[0].style.marginTop = (imageFixed.clientHeight - imageFixed.children[0].clientHeight)/2 + 'px';
			}
		}
	}
	imageFixed.onclick = function(){
		this.style.display = 'none';
	}

	bodyCreat.onclick = function(){
		type = 1;
		var orightFootItem = c('operator_body_right_foot_item');
		for(var i = 0; i < orightFootItem.length; i++){
			orightFootItem[i].style.display = 'block';
		}
		d('commodity_operator').value = "";									//运营方
		d('commodity_operator').name = "";									//运营方
		d('commodity_num').value = "";										//商品编号
		d('commodity_name').value = "";										//商品名称
		d('commodity_price').value = "";									//标准价格
		for(var i = 0; i < d('model_multiple').children.length-1; i++){		//货道规格
			d('model_multiple').children[i].checked = false;
		}
		for(var i = 0; i < c('detailed_operator_star').length; i++){		//推荐星值
			c('detailed_operator_star')[i].children[0].src = "image/dxs.png";
		}
		operatorStars = 0;
		d('commodity_shelf').value = "";									//保质期
		d('commodity_code').value = "";										//条形编码
		d('commodity_Infrared').value = "0";									//红外加热
		d('commodity_microwave').value = "0";								//微博加热
		d('commodity_cooking').value = "0";									//烹饪温度
		d('commodity_supplier').value = "";									//供应商
		c('detailed_operator_pickimg')[0].innerHTML = "";					//选餐图片
		d('detailed_operator_pickimg').value = "";					
		c('detailed_operator_orderimg')[0].innerHTML = "";					//下单图片
		d('detailed_operator_orderimg').value = "";
		c('detailed_operator_ingredientimg')[0].innerHTML = "";				//商品介绍
		d('detailed_operator_ingredientimg').value = "";
		d('commodity_remark').value = "";									//备注
		d('detailed_operator_stop').checked = false;						//停用启用
		
		var BodyLeftList = c('operator_body_left_list');
		for(var j = 0; j < BodyLeftList.length; j++){
			BodyLeftList[j].style.backgroundColor = "rgba(0,0,0,0)";
		}

		//渲染运营方下拉框
		var operatorSelect = c('operator_select')[0];
		var operatorSelectUl = c('operator_select_ul')[0];
		if(operatorSelectUl != undefined){
			operatorSelectUl.parentNode.removeChild(operatorSelectUl);
		};
		function operatorSel(){
			var ul = creat('ul');
			ul.className = "operator_select_ul";
			ul.style.minWidth = operatorSelect.clientWidth + 'px';
			for(i = 0; i < DATALEFT.length; i++){
				var li = creat('li');
				li.innerHTML = DATALEFT[i].text;
				li.setAttribute('data-value',DATALEFT[i].operatorID);
				ul.appendChild(li);
			}
			operatorSelect.parentNode.appendChild(ul);
			var operatorSelectUl = c('operator_select_ul')[0];
			operatorSelect.onfocus = function(){
				operatorSelectUl.style.display = "inline";
			}
			operatorSelect.onblur = function(){
				operatorSelectUl.style.display = "none";
			}
			operatorSelect.value = operatorSelectUl.children[0].innerHTML;
			operatorSelect.name = operatorSelectUl.children[0].dataset.value;
			for(var i = 0; i < operatorSelectUl.children.length; i++){
				operatorSelectUl.children[i].onmousedown = function(){
					operatorSelect.value = this.innerHTML;
					operatorSelect.name = this.dataset.value;
				}
			}
		}
		if(loginUserName.operatorID == 1){
			operatorSel();
		}else{
			$.ajax({
				type: 'post',
				url: URLS + '/operate/getOperate.json',
				data: {
					operatorID: loginUserName.operatorID,
				},
				success: function(data){
					console.log(data);

					var ul = creat('ul');
					ul.className = "operator_select_ul";
					ul.style.minWidth = operatorSelect.clientWidth + 'px';
					var li = creat('li');
					li.innerHTML = data.operator;
					li.setAttribute('data-value',data.operatorID);
					ul.appendChild(li);
					operatorSelect.parentNode.appendChild(ul);
					var operatorSelectUl = c('operator_select_ul')[0];
					operatorSelect.onfocus = function(){
						operatorSelectUl.style.display = "inline";
					}
					operatorSelect.onblur = function(){
						operatorSelectUl.style.display = "none";
					}
					console.log(operatorSelectUl);
					operatorSelect.value = operatorSelectUl.children[0].innerHTML;
					operatorSelect.name = operatorSelectUl.children[0].dataset.value;
					for(var i = 0; i < operatorSelectUl.children.length; i++){
						operatorSelectUl.children[i].onmousedown = function(){
							operatorSelect.value = this.innerHTML;
							operatorSelect.name = this.dataset.value;
						}
					}
				}
			})
		}
	}
	bodySubmit.onclick = function(){
		//详细信息提交
		var commodityOperator = d('commodity_operator').name;			//运营方ID
		var commodityOperatorV = d('commodity_operator').value;			//运营方名称
		var commodityNum = d('commodity_num').value;					//商品编号
		var commodityName = d('commodity_name').value;					//商品名称
		var commodityShelf = d('commodity_shelf').value;				//保质期
		var commodityPrice = d('commodity_price').value;				//标准价格
		var modelMultipleDiv = "";										//货道规格
		for(var i = 0; i < c('model_multiple_div').length; i++){
			if(c('model_multiple_div')[i].children[0].checked){
				modelMultipleDiv += c('model_multiple_div')[i].children[0].name + ",";
			}
		}
		var modelMultipleDivs = "";
		for(var i = 0; i < modelMultipleDiv.length-1; i++){
			modelMultipleDivs += modelMultipleDiv[i];
		}
		console.log(modelMultipleDivs);
		console.log(operatorStars);										//推荐星值
		var commodityShelf = d('commodity_shelf').value;				//保质期
		var commodityCode = d('commodity_code').value;					//条形编码
		var commodityInfrared = d('commodity_Infrared').value;			//红外加热
		var commodityMicrowave = d('commodity_microwave').value;		//微博加热
		var commodityCooking = d('commodity_cooking').value;			//烹饪温度
		var commoditySupplier = d('commodity_supplier').value;			//供应商
		console.log(OperatorPickimgBase)								//选餐图片
		console.log(OperatorOrderimgBase)								//下单图片
		console.log(OperatorOrderimgBase)								//商品介绍
		var OperatorPickimgBases = c('detailed_operator_pickimg')[0].innerHTML;				//选餐图片
		var OperatorOrderimgBases = c('detailed_operator_orderimg')[0].innerHTML;			//下单图片
		var OperatorIngredientimgBases = c('detailed_operator_ingredientimg')[0].innerHTML;	//商品介绍
		var commodityRemark = d('commodity_remark').value;				//备注
	 	if(d('detailed_operator_stop').checked){						//停用启用
	 		var detailedOperatorStop = 0;
	 	}else{
	 		var detailedOperatorStop = 1;
	 	}

	 	var commodityError = "";

		if(d('commodity_operator').value == ""||d('commodity_operator').name== ""){
			commodityError += 'Operator Is Null<br/>';
		}
		if(d('commodity_name').value == ""){
			commodityError += 'Commodity Is Null<br/>';
		}
		if(d('commodity_shelf').value == ""){
			commodityError += 'Shelf Life Is Null<br/>';
		}
		if(d('commodity_price').value == ""){
			commodityError += 'Standard Price Is Null<br/>';
		}
		if(modelMultipleDivs == ""){
			commodityError += 'Cargo Track Is Null<br/>';
		}
		if(commodityError != ""){
			alern(commodityError);
			return false;
		}

		//检测条码编号是否重复
		$.ajax({
			type: 'post',
			url: URLZ + '/jf/bg/basic/gdsm/check.json',
			data: {
				opreatorId: d('commodity_operator').name,
				barCodeNo: d('commodity_code').value,
			},
			async: false,
			success: function(data){
				console.log(data);
				if(data.obj != 0){
					if(data.obj.waresId != commodityNum){
						alern('The Bar Code and'+data.obj.waresName+'with the same!');
						d('commodity_code').value = "";
						return false;
					}
				}
				var commodityobj = new Object();
				commodityobj.operatorID = commodityOperator;
				commodityobj.operParty = commodityOperatorV;
				commodityobj.waresId = commodityNum;
				commodityobj.waresName = commodityName;
				commodityobj.waresPrice = commodityPrice;
				commodityobj.quaGuaPeriod =  commodityShelf;
				commodityobj.theGoodsModel = modelMultipleDivs;
				commodityobj.starValue = operatorStars;
				commodityobj.barCodeNo = commodityCode;
				commodityobj.infraredheating = commodityInfrared;
				commodityobj.microwaveheating = commodityMicrowave;
				commodityobj.cooking = commodityCooking;
				commodityobj.supplier = commoditySupplier;
				commodityobj.remark = commodityRemark;
				commodityobj.dltflag = detailedOperatorStop;
				commodityobj.updateBy = loginUserName.empcode;
				console.log(JSON.stringify(commodityobj));
				if(type == 1){
					$.ajax({
						type: 'post',
						url: URLZ + '/jf/bg/basic/gdsm/add.json',
						data: {
							obj: JSON.stringify(commodityobj),
							picture1: OperatorPickimgBase,
							picture2: OperatorOrderimgBase,
							picture3: OperatorIngredientimgBase,
						},
						success: function(data){
							alert('Success');
							startbody();
							c('operator_home_head_submit')[0].click();
						}
					})
				}else if(type == 0){
					if(OperatorPickimgBase != ""){
						OperatorPickimgBases = OperatorPickimgBase;
					}
					if(OperatorOrderimgBase != ""){
						OperatorOrderimgBases = OperatorOrderimgBase;
					}
					if(OperatorIngredientimgBase != ""){
						OperatorIngredientimgBases = OperatorIngredientimgBase;
					}
					console.log(OperatorPickimgBases);
					console.log(OperatorOrderimgBases);
					$.ajax({
						type: 'post',
						url: URLZ + '/jf/bg/basic/gdsm/update.json',
						data: {
							obj: JSON.stringify(commodityobj),
							picture1: OperatorPickimgBases,
							picture2: OperatorOrderimgBases,
							picture3: OperatorIngredientimgBases,
						},
						success: function(data){
							alert('Success');
							startbody();
							c('operator_home_head_submit')[0].click();
						}
					})
				}
			}
		})
	}
}

start();
startbody()

submit();