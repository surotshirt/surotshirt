let $dom = {
	selectType: $('.selectType'),
	selectColor: $('.selectColor'),
	selectColorList: $('.selectColorList'),
	selectSize: $('.selectSize'),
	selectCountry: $('.selectCountry'),
	selectMarketplace: $('.selectMarketplace'),
	inputName: $('.inputName'),
	inputEmail: $('.inputEmail'),
	inputKeyword: $('.inputKeyword'),
	inputQuantity: $('.inputQuantity'),
	htmlName: $('.htmlName'),
	htmlEmail: $('.htmlEmail'),
	htmlType: $('.htmlType'),
	htmlTypeList: $('.htmlTypeList'),
	htmlPrice: $('.htmlPrice'),
	htmlPriceTotal: $('.htmlPriceTotal'),
	htmlDescriptionType: $('.htmlDescriptionType'),
	htmlDescriptionSize: $('.htmlDescriptionSize'),
	htmlCartList: $('.htmlCartList'),
	htmlModal: $('.htmlModal'),
	htmlOrder: $('.htmlOrder'),
	htmlOrderID: $('.htmlOrderID'),
	htmlCountry: $('.htmlCountry'),
	htmlMarketplace: $('.htmlMarketplace'),
	htmlStatus: $('.htmlStatus'),
	htmlStatusDescription: $('.htmlStatusDescription'),
	htmlColorList: $('.htmlColorList'),
	htmlProductList: $('.htmlProductList'),
	htmlPageList: $('.htmlPageList'),
	buttonFilter: $('.buttonFilter'),
	buttonColor: $('.buttonColor'),
	modalImg: $('.modalImg'),
	modalImgA: $('.modalImgA'),
	aProduct: $('.aProduct'),
	editor: $("#custom-tshirt-editor"),
	submit: $(".submit")
	}
let printsize = (data)=>{
	let dimension1 = {
						t1:[],
						l1:[],
						t2:[],
						l2:[]
						}
					let dimension2 = {
						t1:[],
						l1:[],
						t2:[],
						l2:[]
						}
					$.each(data.canvas[0].layer, (i, v)=>{
						if(v.type == "text"){
							let t1 = v.top-(v.child.font.size/2);
							let t2 = t1+v.child.font.size;
							let l1 = v.left-((v.child.font.size*(v.child.html.length/2))/2);
							let l2 = l1+(v.child.font.size*(v.child.html.length/2));
							dimension1.t1.push(t1);
							dimension1.t2.push(t2);
							dimension1.l1.push(l1);
							dimension1.l2.push(l2);
							}
						if(v.type == "image"){
							let t1 = v.top-(v.child.height/2);
							let t2 = t1+v.child.height;
							let l1 = v.left-(v.child.width/2);
							let l2 = l1+v.child.width;
							dimension1.t1.push(t1);
							dimension1.t2.push(t2);
							dimension1.l1.push(l1);
							dimension1.l2.push(l2);
							}
						
						});
						
					$.each(data.canvas[1].layer, (i, v)=>{
						if(v.type == "text"){
							let t1 = v.top-(v.child.font.size/2);
							let t2 = t1+v.child.font.size;
							let l1 = v.left-((v.child.font.size*(v.child.html.length/2))/2);
							let l2 = l1+(v.child.font.size*(v.child.html.length/2));
							dimension2.t1.push(t1);
							dimension2.t2.push(t2);
							dimension2.l1.push(l1);
							dimension2.l2.push(l2);
							}
						if(v.type == "image"){
							let t1 = v.top-(v.child.height/2);
							let t2 = t1+v.child.height;
							let l1 = v.left-(v.child.width/2);
							let l2 = l1+v.child.width;
							dimension2.t1.push(t1);
							dimension2.t2.push(t2);
							dimension2.l1.push(l1);
							dimension2.l2.push(l2);
							}
						
						});
					dimension1.t1.sort(function(a, b){return a-b});
					dimension1.l1.sort(function(a, b){return a-b});
					dimension1.t2.sort(function(a, b){return b-a});
					dimension1.l2.sort(function(a, b){return b-a});
					dimension2.t1.sort(function(a, b){return a-b});
					dimension2.l1.sort(function(a, b){return a-b});
					dimension2.t2.sort(function(a, b){return b-a});
					dimension2.l2.sort(function(a, b){return b-a});
					let print1 = (dimension1.t2[0]-dimension1.t1[0])*(dimension1.l2[0]-dimension1.l1[0]);
					print1 = (isNaN(print1))?0:print1;
					let print2 = (dimension2.t2[0]-dimension2.t1[0])*(dimension2.l2[0]-dimension2.l1[0]);
					print2 = (isNaN(print2))?0:print2;
					res = print1+print2;
					return res;
	}

let Initialize = (function (){
	function Initialize(){
		this.selectType();
		this.selectSize();
		this.selectColor();
		this.selectCountry();
		this.selectMarketplace();
		}
	Initialize.prototype = {
		region: $("html").attr("data-region"),
		capitalize: function (str){
			return str.charAt(0).toUpperCase() + str.slice(1);
			},
		selectType: function (){
			$dom.selectType.html(`<option disabled selected>Choose an option</option>`);
			$.each(type, (i, v)=>{
				$dom.selectType.append(`<option value="${i}">${String(this.capitalize(i)).replace(/\-/g, " ")}</option>`);
				});
			},
		selectSize: function (){
			$dom.selectSize.html(`<option disabled selected>Choose an option</option>`);
			$.each(size, (i, v)=>{
				$dom.selectSize.append(`<option value="${i}">${String(this.capitalize(i)).replace(/\-/g, " ")}</option>`);
				});
			},
		selectColor: function (){
			$dom.selectColorList.empty();
			$.each(color, (i, v)=>{
				$dom.selectColorList.append(`<button class="selectColor fs-25 lh-12 m-r-6" style="color: ${v};" value="${v}"><i class="zmdi zmdi-circle" style="text-shadow: 0px 0px 1px #000000"></i></button>`);
				});
			},
		selectCountry: function (){
			$dom.selectCountry.html(`<option disabled selected>Choose country</option>`);
			$.each(local.region[this.region].country, (i, v)=>{
				$dom.selectCountry.append(`<option value="${v}">${String(this.capitalize(v)).replace(/\-/g, " ")}</option>`);
				});
			},
		selectMarketplace: function (){
			$dom.selectMarketplace.html(`<option disabled selected>Choose marketplace</option>`);
			$.each(local.region[this.region].marketplace, (i, v)=>{
				$dom.selectMarketplace.append(`<option value="${v}">${String(this.capitalize(v)).replace(/\-/g, " ")}</option>`);
				});
			},
		}
	return Initialize;
	})();

let Imgbb = (function (){
	function Imgbb(apikey){
		this.key = apikey
		}
	Imgbb.prototype = {
		key: "",
		uploadBase64: function (base64, callback){
			var settings = {
				"url": `https://api.imgbb.com/1/upload?key=${this.key}`,
				"method": "POST",
				"timeout": 0,
				"data": {
					"image":base64
					}
				};
			$.ajax(settings).done(function (response) {
				callback(response.data.url);
				});
			}
		}
	return Imgbb;
	})();

let Screenshot = (function (){
	function Screenshot(){
		
		}
	Screenshot.prototype = {
		webpage: function (url, callback){
			let req = new XMLHttpRequest();
			req.onreadystatechange = () => {
				if (req.readyState == XMLHttpRequest.DONE) {
					let res = JSON.parse(req.responseText);
					callback(res.lighthouseResult.fullPageScreenshot.screenshot.data);
					}
				};
			req.open("GET", `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}`, true);
			req.send();
			},
		uploadImgbb(imgbb, url, callback){
			this.webpage(url, (image)=>{
				imgbb.uploadBase64(String(image).replace(/data\:image\/webp\;base64\,/g, ""), (url)=>{
					callback(url);
					});
				});
			}
		}
	return Screenshot;
	})();
	
let JSONBin = (function (){
	function JSONBin(apikey){
		this.mkey = apikey.mkey;
		this.akey = apikey.akey;
		}
	JSONBin.prototype = {
		mkey: "",
		akey: "",
		create: function (data, callback, name = "data", collectionid=null){
			let req = new XMLHttpRequest();
			req.onreadystatechange = () => {
				if (req.readyState == XMLHttpRequest.DONE) {
					let res = JSON.parse(req.responseText);
					callback(res.metadata.id);
					}
				};
			req.open("POST", "https://api.jsonbin.io/v3/b", true);
			req.setRequestHeader("Content-Type", "application/json");
			req.setRequestHeader("X-Master-Key", this.mkey);
			req.setRequestHeader("X-Access-Key", this.akey);
			req.setRequestHeader("X-Bin-Private", false);
			req.setRequestHeader("X-Bin-Name", name);
			if(collectionid != null){
				req.setRequestHeader("X-Collection-Id", collectionid);
				}
			req.send(JSON.stringify(data));
			},
		read: function (binid, callback){
			let req = new XMLHttpRequest();
			req.onreadystatechange = () => {
				if (req.readyState == XMLHttpRequest.DONE) {
					let res = JSON.parse(req.responseText);
					callback(res);
					}
				};
			req.open("GET", `https://api.jsonbin.io/v3/b/${binid}/latest`, true);
			req.setRequestHeader("X-Master-Key", this.mkey);
			req.setRequestHeader("X-Access-Key", this.akey);
			req.setRequestHeader("X-Bin-Meta", false);
			req.send();
			}
		}
	return JSONBin;
	})();

let Production = (function (){
	function Production(){
		this.init();
		this.input();
		this.render();
		}
	Production.prototype = {
		reedit: false,
		cart: {},
		id: "64b7dee69d312622a381aa03",
		data: {
			name: "",
			type:"tshirt",
			size:"medium",
			print: 0,
			color: "white",
			image: ["",""],
			keyword: "",
			quantity: 1
			},
		region: $("html").attr("data-region"),
		editor: undefined,
		init: function (){
			const par = new URLSearchParams(window.location.search);
			this.reedit = (par.get("reedit") != null)?((par.get("reedit") == "true")?true:false):this.reedit;
			this.id = (par.get("id") != null)?par.get("id"):this.id;
			this.data = (product[this.id] != null)?product[this.id]:this.data;
			this.cart = (window.localStorage.getItem(`cart@${window.location.hostname}`) != null)?JSON.parse(window.localStorage.getItem(`cart@${window.location.hostname}`)):this.cart;
			if(this.reedit){
				this.data = this.cart[this.id];
				}
			jsonbin.read(this.id, (data)=>{
				this.editor = $dom.editor.customTShirtEditor({data:data, onRender: ()=>{
					this.data.print = printsize(data);
					this.render();
				  }}, true);
				});
			
			},
		input: function (){
			let $this = this;
			$('.selectType').on("change", function (){
				$this.data.type = this.value;
				$this.editor.customTShirt.settings.data.canvas[0].image = type[this.value]["image"]["front"];
				$this.editor.customTShirt.settings.data.canvas[1].image = type[this.value]["image"]["back"];
				$this.editor.customTShirt.render();
				$this.render();
				});
			$('.selectColor').on("click", function (){
				$.each(color, (i, v)=>{
					if(this.value == v){
						$this.data.color = i;
						}
					});
				$this.editor.customTShirt.settings.data.color = this.value;
				$this.editor.customTShirt.render();
				$this.render();
				});
			$('.selectSize').on("change", function (){
				$this.data.size = this.value;
				$this.render();
				});
			$('.minQuantity').on("click", function (){
				$this.data.quantity = ($this.data.quantity > 0)?$this.data.quantity-1:0;
				$this.render();
				});
			$('.inputQuantity').on("click", function (){
				$this.data.quantity = (Number(this.value) >= 0)?Number(this.value):0;
				$this.render();
				});
			$('.plusQuantity').on("click", function (){
				$this.data.quantity = $this.data.quantity+1;
				$this.render();
				});
			$dom.inputName.on("input", function (){
				$this.data.name = this.value;
				$this.render();
				});
			$dom.inputKeyword.on("input", function (){
				$this.data.keyword = this.value;
				$this.render();
				});
			$dom.submit.on("click", function (){
				if($this.data.name == "" || $this.data.type == "" || $this.data.color == ""|| $this.data.size == ""){
					alert("cannot be blank");
					return false;
					}
				$(this).html(`Waiting<span class="submit-loader"></span>`).attr("disabled", true);
				let loader = setInterval(()=>{
					$('.submit-loader').append('.');
					if(String($('.submit-loader').html()).length == 4){
						$('.submit-loader').empty();
						}
					}, 600);
				$this.save((data)=>{
					let cart = Object.assign($this.cart, data);
					window.localStorage.setItem(`cart@${window.location.hostname}`, JSON.stringify(cart));
					clearInterval(loader);
					swal($this.data.name, "is added to cart !", "success");
					$(this).html("Add to cart").removeAttr("disabled");
					});
				});
			},
		save: function (callback){
			jsonbin.create(this.editor.customTShirt.settings.data, (binid)=>{
					this.data.image = ["",""];
					let data = {};
					screenshot.uploadImgbb(imgbb, `https://capture.surotshirt.com/?par={"id":"${binid}","key":${(this.editor.customTShirt.settings.data.key == 0)?0:1},"mockup":1}`, (url)=>{
						this.data.image[0] = url;
						if(this.data.image[1].length != 0){
							data[binid] = this.data;
							callback(data);
							}
						});
					screenshot.uploadImgbb(imgbb, `https://capture.surotshirt.com/?par={"id":"${binid}","key":${(this.editor.customTShirt.settings.data.key == 0)?1:0},"mockup":1}`, (url)=>{
						this.data.image[1] = url;
						if(this.data.image[0].length != 0){
							data[binid] = this.data;
							callback(data);
							}
						});
					}, this.data.name);
			},
		render: function (){
			$dom.htmlName.html(this.data.name);
			$dom.htmlPrice.html(price.region[this.region].currency(type[this.data.type].region[this.region].price+size[this.data.size].region[this.region].price+(this.data.print*print.region[this.region].price)));
			$dom.htmlDescriptionType.html(type[this.data.type].region[this.region].description);
			$dom.htmlDescriptionSize.html(size[this.data.size].region[this.region].description);
			$('.selectType').val(this.data.type);
			$('.selectSize').val(this.data.size);
			$('.inputName').val(this.data.name);
			$('.inputKeyword').val(this.data.keyword);
			$('.inputQuantity').val(this.data.quantity);
			}
		}
	return Production;
	})();
	
let Cart = (function (){
	function Cart(){
		this.init();
		this.input();
		this.render();
		}
	Cart.prototype = {
		region: $("html").attr("data-region"),
		cart: {},
		order: {
			region: $("html").attr("data-region"),
			name: "",
			email: "",
			country: "",
			marketplace: "",
			url: "",
			status: "onprocess",
			pricetotal: 0,
			cart: {}
			},
		orders: {},
		init: function (){
			this.cart = (window.localStorage.getItem(`cart@${window.location.hostname}`) != null)?JSON.parse(window.localStorage.getItem(`cart@${window.location.hostname}`)):this.cart;
			this.orders = (window.localStorage.getItem(`orders@${window.location.hostname}`) != null)?JSON.parse(window.localStorage.getItem(`orders@${window.location.hostname}`)):this.orders;
			console.log(this.orders);
			},
		input: function (){
			let $this = this;
			$(document).on("click", ".showModal", function (){
				let id = $(this).attr("data-id");
				console.log(price.region[$this.region].currency(type[$this.cart[id].type].region[$this.region].price+size[$this.cart[id].size].region[$this.region].price+($this.cart[id].print*print.region[$this.region].price)));
				$dom.modalImg.eq(0).attr("src", $this.cart[id].image[0]);
				$dom.modalImgA.eq(0).attr("href", $this.cart[id].image[0]);
				$dom.modalImg.eq(1).attr("src", $this.cart[id].image[1]);
				$dom.modalImgA.eq(1).attr("href", $this.cart[id].image[1]);
				$dom.htmlName.html($this.cart[id].name);
				$dom.htmlPrice.html(price.region[$this.region].currency(type[$this.cart[id].type].region[$this.region].price+size[$this.cart[id].size].region[$this.region].price+($this.cart[id].print*print.region[$this.region].price)));
				$dom.htmlDescriptionType.html(type[$this.cart[id].type].region[$this.region]. description);
				$dom.aProduct.attr("href", `${link.region[$this.region].production}?id=${id}&reedit=true`);
				$dom.htmlModal.addClass("show-modal1");
				});
			$(document).on("click", ".deleteQuantity", function (){
				let id = $(this).attr("data-id");
				delete $this.cart[id];
				$this.render();
				});
			$(document).on("click", ".minQuantity", function (){
				let id = $(this).attr("data-id");
				$this.cart[id].quantity -= 1;
				$this.render();
				});
				
			$(document).on("input", ".inputQuantity", function (){
				let id = $(this).attr("data-id");
				$this.cart[id].quantity = (Number(this.value) <= 0)?0:Number(this.value);
				setTimeout(()=>{
					$this.render();
					}, 2000);
				});
			$(document).on("click", ".plusQuantity", function (){
				let id = $(this).attr("data-id");
				$this.cart[id].quantity += 1;
				$this.render();
				});
			$dom.inputName.on("input", function (){
				$this.order.name = this.value;
				});
			$dom.inputEmail.on("input", function (){
				$this.order.email = this.value;
				});
			$(".selectCountry").on("change", function (){
				$this.order.country = this.value;
				});
			$(".selectMarketplace").on("change", function (){
				$this.order.marketplace = this.value;
				});
			$dom.submit.on("click", function (){
				if($this.order.name == "" || $this.order.email == "" || $this.order.country == "" || $this.order.marketplace == ""){
					alert("cannot be blank");
					return false;
					}
				$(this).html(`Waiting<span class="submit-loader"></span>`).attr("disabled", true);
				let loader = setInterval(()=>{
					$('.submit-loader').append('.');
					if(String($('.submit-loader').html()).length == 4){
						$('.submit-loader').empty();
						}
					}, 600);
				let cart = {};
				$.each($this.cart, (i, v)=>{
					if(v.quantity != 0){
						cart[i] = v;
						}
					});
				$this.order.cart = cart;
				jsonbin.create($this.order, (binid)=>{
					console.log(binid);
					let order = {};
					order[binid] = {
						name: $this.order.name,
						email: $this.order.email,
						country: $this.order.country,
						marketplace: $this.order.marketplace,
						};
					let orders = Object.assign($this.orders, order);
					window.localStorage.setItem(`orders@${window.location.hostname}`, JSON.stringify(orders));
					clearInterval(loader);
					swal($this.order.name, "is added to orders !", "success");
					$(this).html("Proceed to Checkout").removeAttr("disabled");
					}, $this.order.name, "648095bb8e4aa6225eaaa19f");
				console.log($this.order);
				});
			},
		render: function (){
			$dom.htmlCartList.html(`<tr class="table_head"><th class="column-1">Product</th><th class="column-2"></th><th class="column-3">Price</th><th class="column-4">Quantity</th><th class="column-5">Total</th></tr>`);
			let priceTotal = 0;
			let list = "";
			$.each(this.cart, (i, v)=>{
				priceTotal = priceTotal+((type[v.type].region[this.region].price+size[v.size].region[this.region].price+(v.print*print.region[this.region].price))*v.quantity);
				list = `<tr class="table_row">
									<td class="column-1">
										<div class="showModal how-itemcart1" data-id="${i}">
											<img src="${v.image[0]}" alt="IMG">
										</div>
									</td>
									<td class="column-2">${v.name} <br/><span style="font-style: italic; font-size: 12px">(${v.size})</span></td>
									<td class="column-3">${price.region[this.region].currency(type[v.type].region[this.region].price+size[v.size].region[this.region].price+(v.print*print.region[this.region].price))}</td>
									<td class="column-4">
										<div class="wrap-num-product flex-w m-l-auto m-r-0">
											<div class="${(v.quantity == 0)?"deleteQuantity":"minQuantity"} btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m" data-id="${i}">
												<i class="fs-16 zmdi ${(v.quantity == 0)?"zmdi-delete":"zmdi-minus"}"></i>
											</div>

											<input class="inputQuantity mtext-104 cl3 txt-center num-product" type="number" value="${v.quantity}" data-id="${i}">

											<div class="plusQuantity btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m" data-id="${i}">
												<i class="fs-16 zmdi zmdi-plus"></i>
											</div>
										</div>
									</td>
									<td class="column-5">${price.region[this.region].currency((type[v.type].region[this.region].price+size[v.size].region[this.region].price+(v.print*print.region[this.region].price))*v.quantity)}</td>
								</tr>`+list;
				});
				$dom.htmlCartList.append(list);
				this.order.pricetotal = price.region[this.region].currency(priceTotal);
				$dom.htmlPriceTotal.html(this.order.pricetotal);
				window.localStorage.setItem(`cart@${window.location.hostname}`, JSON.stringify(this.cart));
			}
		}
	return Cart;
	})();
	
let Order = (function (){
	function Order(){
		this.init();
		this.input();
		}
	Order.prototype = {
		region: $("html").attr("data-region"),
		id: "64c11931b89b1e2299c57516",
		order: {},
		orders: {},
		init: function (){
			this.orders = (window.localStorage.getItem(`orders@${window.location.hostname}`) != null)?JSON.parse(window.localStorage.getItem(`orders@${window.location.hostname}`)):this.orders;
			const par = new URLSearchParams(window.location.search);
			this.id = (par.get("id") != null)?par.get("id"):this.id;
			if(this.id == ""){
				this.render1();
				}
			else{
				jsonbin.read(this.id, (data)=>{
					this.order = data;
					this.render2();
					});
				}
			
			console.log(this.orders);
			},
		input: function (){
			let $this = this;
			$(document).on("click", ".showModal", function (){
				let id = $(this).attr("data-id");
				console.log(price.region[$this.region].currency(type[$this.order.cart[id].type].region[$this.region].price+size[$this.order.cart[id].size].region[$this.region].price+($this.order.cart[id].print*print.region[$this.region].price)));
				$dom.modalImg.eq(0).attr("src", $this.order.cart[id].image[0]);
				$dom.modalImgA.eq(0).attr("href", $this.order.cart[id].image[0]);
				$dom.modalImg.eq(1).attr("src", $this.order.cart[id].image[1]);
				$dom.modalImgA.eq(1).attr("href", $this.order.cart[id].image[1]);
				$dom.htmlName.html($this.order.cart[id].name);
				$dom.htmlPrice.html(price.region[$this.region].currency(type[$this.order.cart[id].type].region[$this.region].price+size[$this.order.cart[id].size].region[$this.region].price+($this.order.cart[id].print*print.region[$this.region].price)));
				$dom.htmlDescriptionType.html(type[$this.order.cart[id].type].region[$this.region]. description);
				$dom.aProduct.attr("href", `${link.region[$this.region].production}?id=${id}&reedit=true`);
				$dom.htmlModal.addClass("show-modal1");
				});
			},
		render1: function (){
			let list = "";
			$dom.htmlCartList.html(`<tr class="table_head"><th class="column-2 p-l-20">Order id</th><th class="column-3">Name</th><th class="column-3">Email</th><th class="column-4">Country</th><th class="column-5">Marketplace</th></tr>`);
			$.each(this.orders, (i, v)=>{
				list = `<tr class="table_row">
									
									<td class="column-2 p-l-20"><a href="">${i}</a></td>
									<td class="column-3">${v.name}</td>
									<td class="column-3">${v.email}</td>
									<td class="column-4">
										${v.country}
									</td>
									<td class="column-5">${v.marketplace}</td>
								</tr>`+list;
				});
				$dom.htmlCartList.append(list);
			
			},
		render2: function (){
			$dom.htmlOrder.removeClass("d-none");
			$dom.htmlOrderID.html(this.id);
			$dom.htmlName.html(this.order.name);
			$dom.htmlEmail.html(this.order.email);
			$dom.htmlCountry.html(this.order.country); 
			$dom.htmlMarketplace.html(this.order.marketplace);
			$dom.htmlStatus.html(this.order.status);
			$dom.htmlCartList.html(`<tr class="table_head"><th class="column-1">Product</th><th class="column-2"></th><th class="column-3">Price</th><th class="column-4">Quantity</th><th class="column-5">Total</th></tr>`);
			let priceTotal = 0;
			let list = "";
			$.each(this.order.cart, (i, v)=>{
				priceTotal = priceTotal+((type[v.type].region[this.region].price+size[v.size].region[this.region].price+(v.print*print.region[this.region].price))*v.quantity);
				list = `<tr class="table_row">
									<td class="column-1">
										<div class="showModal how-itemcart1" data-id="${i}">
											<img src="${v.image[0]}" alt="IMG">
										</div>
									</td>
									<td class="column-2">${v.name} <br/><span style="font-style: italic; font-size: 12px">(${v.size})</span></td>
									<td class="column-3">${price.region[this.region].currency(type[v.type].region[this.region].price+size[v.size].region[this.region].price+(v.print*print.region[this.region].price))}</td>
									<td class="column-4">
										${v.quantity}
									</td>
									<td class="column-5">${price.region[this.region].currency((type[v.type].region[this.region].price+size[v.size].region[this.region].price+(v.print*print.region[this.region].price))*v.quantity)}</td>
								</tr>`+list;
				});
				$dom.htmlCartList.append(list);
				this.order.pricetotal = price.region[this.region].currency(priceTotal);
				$dom.htmlPriceTotal.html(this.order.pricetotal);
				switch (this.order.status){
					case "onprocess":
						$dom.htmlStatus.addClass("text-warning");
						$dom.htmlStatusDescription.eq(0).removeClass("d-none");
						$dom.submit.attr("href", link.region[this.region].contact).html("Contact us");
						break;
					case "available":
						$dom.htmlStatus.addClass("text-info");
						$dom.htmlStatusDescription.eq(0).removeClass("d-none");
						$dom.submit.attr("href", this.order.url).html(`Checkout on ${this.order.marketplace}`);
						break;
					case "clear":
						$dom.htmlStatus.addClass("text-success");
						$dom.htmlStatusDescription.eq(0).removeClass("d-none");
						$dom.submit.attr("href", link.region[this.region].cart).html(`Checkout on ${this.order.marketplace}`);
						break;
					case "abort":
						$dom.htmlStatus.addClass("text-danger");
						$dom.htmlStatusDescription.eq(0).removeClass("d-none");
						$dom.submit.attr("href", link.region[this.region].contact).html(`Checkout on ${this.order.marketplace}`);
						break;
					}
			}
		}
	return Order;
	})();
	
let Index = (function (){
	function Index(){
		this.init();
		this.input();
		this.pagenation(0);
		this.render();
		}
	Index.prototype = {
		region: $("html").attr("data-region"),
		imgwidth: $(".block2-pic").eq(0).width(),
		data: [],
		datatemp: [],
		si: null,
		page: {
			at: 0,
			last: 0
			},
		pagelast: 0,
		filter: {
			sort: "newness",
			color: "all",
			search: "",
			},
		init: function (){
			$.each(product, (i, v)=>{
				v["id"] = i;
				v["price"] = type[v.type].region[this.region].price+size[v.size].region[this.region].price+(v.print*print.region[this.region].price);
				this.data.push(v);
				});
			console.log(this.data);
			$dom.htmlTypeList.append(`<button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1" value="all">All Products</button>`);
			$.each(type, (i, v)=>{
				$dom.htmlTypeList.append(`<button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" value="${i}">${String(initialize.capitalize(i)).replace(/\-/g, " ")}</button>`);
				});
			let j = 0;
			$dom.htmlColorList.eq(0).append(`<li class="p-b-6"><span class="fs-15 lh-12 m-r-6"><i class="zmdi zmdi-circle"></i></span><button class="buttonColor filter-link stext-106 trans-04 filter-link-active" value="all">All color</button></li>`);
			$.each(color, (i, v)=>{
				if(j <= 7){
					$dom.htmlColorList.eq(0).append(`<li class="p-b-6"><span class="fs-15 lh-12 m-r-6" style="color: ${v};"><i class="zmdi zmdi-circle"></i></span><button class="buttonColor filter-link stext-106 trans-04" value="${i}">${String(initialize.capitalize(i)).replace(/\-/g, " ")}</button></li>`);
					}
				else if(j > 7 && j <=17){
					$dom.htmlColorList.eq(1).append(`<li class="p-b-6"><span class="fs-15 lh-12 m-r-6" style="color: ${v};"><i class="zmdi zmdi-circle"></i></span><button class="buttonColor filter-link stext-106 trans-04" value="${i}">${String(initialize.capitalize(i)).replace(/\-/g, " ")}</button></li>`);
					}
				else{
					$dom.htmlColorList.eq(2).append(`<li class="p-b-6"><span class="fs-15 lh-12 m-r-6" style="color: ${v};"><i class="zmdi zmdi-circle"></i></span><button class="buttonColor filter-link stext-106 trans-04" value="${i}">${String(initialize.capitalize(i)).replace(/\-/g, " ")}</button></li>`);
					}
				j += 1;
				});
			},
		pagenation: function (page = 0){
			this.datatemp = JSON.parse(`${JSON.stringify(this.data)}`);
			switch (this.filter.sort){
				case "oldness" :
					this.datatemp.reverse();
					break;
				case "low-to-high" :
					this.datatemp.sort(function(a, b){return a.price - b.price});
					break;
				case "high-to-low" :
					this.datatemp.sort(function(a, b){return b.price - a.price});
					break;
				}
			
			if(this.filter.color != "all"){
				let arr = [];
				$.each(this.datatemp, (i, v)=>{
					if(v.color == this.filter.color){
						arr.push(v);
						}
					});
				this.datatemp = JSON.parse(`${JSON.stringify(arr)}`);
				}
			if(this.filter.search != ""){
				let arr = [];
				$.each(this.datatemp, (i, v)=>{
					if(String(v.keyword).toLowerCase().includes(String(this.filter.search).toLowerCase())){
						arr.push(v);
						}
					});
				this.datatemp = JSON.parse(`${JSON.stringify(arr)}`);
				}
			console.log(this.datatemp);
			let length = this.datatemp.length;
			this.page.at = page;
			this.datatemp = this.datatemp.slice(this.page.at * 24, this.page.at * 24 + 24);
			this.page.last = (length + (24 - (length % 24))) / 24 - 1;
			console.log(this.datatemp);
			},
		input: function (){
			$this = this;
			$(document).on("click", ".buttonPage", function (){
				$this.pagenation(Number(this.value));
				$this.render();
				$('html, body').animate({scrollTop: 80}, 300);
				});
			$(".buttonFilter").on("click", function (){
				$(".buttonFilter").removeClass("filter-link-active");
				$(this).addClass("filter-link-active");
				console.log(this.value);
				$this.filter.sort = this.value;
				$this.pagenation(0);
				$this.render();
				});
			$(".buttonColor").on("click", function (){
				$(".buttonColor").removeClass("filter-link-active");
				$(this).addClass("filter-link-active");
				console.log(this.value);
				$this.filter.color = this.value;
				$this.pagenation(0);
				$this.render();
				});
			$(document).on("click", ".quickView", function (){
				let id = $(this).attr("data-id");
				let v = product [id];
				// console.log(price.region[$this.region].currency(type[$this.order.cart[id].type].region[$this.region].price+size[$this.order.cart[id].size].region[$this.region].price+($this.order.cart[id].print*print.region[$this.region].price)));
				$dom.modalImg.eq(0).attr("src", v.image[0]);
				$dom.modalImgA.eq(0).attr("href", v.image[0]);
				$dom.modalImg.eq(1).attr("src", v.image[1]);
				$dom.modalImgA.eq(1).attr("href", v.image[1]);
				$dom.htmlName.html(v.name);
				$dom.htmlPrice.html(`${price.region[$this.region].currency(type[v.type].region[$this.region].price+size["extra-small"].region[$this.region].price+(v.print*print.region[$this.region].price))} - ${price.region[$this.region].currency(type[v.type].region[$this.region].price+size["3-extra-large"].region[$this.region].price+(v.print*print.region[$this.region].price))}`);
				$dom.htmlDescriptionType.html(type[v.type].region[$this.region].description);
				$dom.aProduct.attr("href", `${link.region[$this.region].production}?id=${id}`);
				$dom.htmlModal.addClass("show-modal1");
				});
			$(".inputSearch").on("input", function (){
				clearTimeout($this.si);
				$this.si = setTimeout(()=>{
					$this.filter.search = this.value;
				    $this.pagenation(0);
				     $this.render();
					}, 2000);
				
				});
			},
		render: function (){
			$dom.htmlProductList.html(``);
			$.each(this.datatemp, (i, v)=>{
				$dom.htmlProductList.append(`
				<div class="col-sm-6 col-md-4 col-lg-3 p-b-35">
					<!-- Block2 -->
					<div class="block2">
						<div class="block2-pic hov-img0">
							<img src="${v.image[0]}" alt="${v.name}" width="${this.imgwidth}" height="${this.imgwidth}">
							<button class="quickView block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04" data-id="${v.id}">
								Quick View
							</button>
						</div>

						<div class="block2-txt flex-w flex-t p-t-14">
							<div class="block2-txt-child1 flex-col-l ">
								<a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
									${v.name}
								</a>

								<span class="stext-105 cl3">
									${price.region[$this.region].currency(type[v.type].region[$this.region].price+size["extra-small"].region[$this.region].price+(v.print*print.region[$this.region].price))} - ${price.region[$this.region].currency(type[v.type].region[$this.region].price+size["3-extra-large"].region[$this.region].price+(v.print*print.region[$this.region].price))}
								</span>
							</div>
						</div>
					</div>
				</div>
				`);
				});
			console.log(this.page.last);
			$dom.htmlPageList.empty();
                if (this.page.last <= 7) {
                    for (var i = 0; i <= this.page.last; i++) {
                        $dom.htmlPageList.append(`<button class="buttonPage flex-c-m how-pagination1 trans-04 m-all-7 ${this.page.at == i ? "active-pagination1" : ""}" ${this.page.at == i ? "disabled" : ""} value="${i}">${i + 1}</button>`);
                    }
                }
                else {
                    if (this.page.at < 7) {
                        for (var i = 0; i < 7; i++) {
                            $dom.htmlPageList.append(`<button class="buttonPage flex-c-m how-pagination1 trans-04 m-all-7 ${this.page.at == i ? "active-pagination1" : ""}" ${this.page.at == i ? "disabled" : ""} value="${i}">${i + 1}</button>`);
                        }
                        $dom.htmlPageList.append(`<span>...</span><button class="buttonPage flex-c-m how-pagination1 trans-04 m-all-7 " value="${this.page.last}">${this.page.last + 1}</button>`);
                    } else if (this.page.at >= this.page.last - 6) {
                        $dom.htmlPageList.append(`<button class="buttonPage flex-c-m how-pagination1 trans-04 m-all-7 " value="0">1</button><span>...</span>`);
                        for (var i = this.page.last - 6; i <= this.page.last; i++) {
                            $dom.htmlPageList.append(`<button class="buttonPage flex-c-m how-pagination1 trans-04 m-all-7 ${this.page.at == i ? "active-pagination1" : ""}" ${this.page.at == i ? "disabled" : ""} value="${i}">${i + 1}</button>`);
                        }
                    } else {
                        $dom.htmlPageList.append(`<button class="buttonPage flex-c-m how-pagination1 trans-04 m-all-7 " value="1">1</button><span>...</span>`);

                        for (var i = this.page.at - 3; i < this.page.at + 4; i++) {
                            $dom.htmlPageList.append(`<button class="buttonPage flex-c-m how-pagination1 trans-04 m-all-7 ${this.page.at == i ? "active-pagination1" : ""}" ${this.page.at == i ? "disabled" : ""} value="${i}">${i + 1}</button>`);
                        }

                        $dom.htmlPageList.append(`<span>...</span><button class="buttonPage flex-c-m how-pagination1 trans-04 m-all-7 " value="${this.page.last}">${this.page.last + 1}</button>`);
                    }
                }

			}
		}
	return Index;
	})();
	
	
	
let initialize = new Initialize();
let imgbb = new Imgbb("9521afb2ee621053417d7b530c6e976a");
let screenshot = new Screenshot();
let jsonbin = new JSONBin({
	mkey: "$2b$10$Raz.mSM.yv4Y8NV7uQV2K.TjtCzTcaIbO2cLfiN3kMp.RiPWIlhd.",
	akey: "$2b$10$JdwyIJzOuYNjoEmWsHPYAOQtJodbRNpc5TilExcP3rMAi6gxosTRK"
	});