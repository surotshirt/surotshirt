(function ($) {
	$.fn.customTShirt = function (options) {
		let settings = $.extend({
			editor: false,
			onSave: function (data){},
			onRender: function (data){},
			data: {
				key: 0,
				mockup: true,
				color: "#ffffff",
				canvas: [
				{
					name: "front",
					key: -1,
					image: {
						bottom: "https://cdn.jsdelivr.net/gh/surotshirt/surotshirt@v1.0.0/image/tshirt-dpn-bg.png",
						top: "https://cdn.jsdelivr.net/gh/surotshirt/surotshirt@v1.0.0/image/tshirt-dpn-min.png"
						},
					layer: [
					
					]
					},
				{
					name: "back",
					key: -1,
					image: {
						bottom: "https://cdn.jsdelivr.net/gh/surotshirt/surotshirt@v1.0.0/image/tshirt-blk-bg.png",
						top: "https://cdn.jsdelivr.net/gh/surotshirt/surotshirt@v1.0.0/image/tshirt-blk-min.png",
						},
					layer: []
					}
				]
				}
			}, options);
		let Canvas = (function (){
			function Canvas(original){
				this.settings = settings;
				this.$original = $(original);
				this.$main = $(`<div />`);
				this.$wrap = $(`<div />`);
				this.$canvas = $(`<div />`);
				this.$color = $(`<div />`);
				this.$layers = $(`<div />`);
				this.$imageBottom = $(`<div />`);
				this.$imageTop = $(`<div />`);
				this.ctf  = new ColorToCSSFilter();
				this.initialize();
				this.render();
				
				}
			Canvas.prototype = {
				initialize: function (){
					this.$main.css({position: `relative`, overflow: `hidden`, width: `${this.$original.width()}px`, height: `${this.$original.width()}px`}).appendTo(this.$original);
					this.$wrap.css({position: `absolute`, fontSize: `1000px`, top: `${Number(this.$original.width() / 1000) <= 1 ? "-" + Number((1 - Number(this.$original.width() / 1000)) / 2) : Number((1 - Number(this.$original.width() / 1000)) / 2) * -1}em`, left: `${Number(this.$original.width() / 1000) <= 1 ? "-" + Number((1 - Number(this.$original.width() / 1000)) / 2) : Number((1 - Number(this.$original.width() / 1000)) / 2) * -1}em`, width: `1000px`, height: `1000px`, transform: `scale(${this.$original.width()/1000})`}).appendTo(this.$main);
					this.$canvas.css({position: `absolute`, fontSize: `1000px`, width: `1000px`, height: `1000px`}).append(this.$imageBottom).append(this.$color).append(this.$layers.css({perspective: `1000px`})).append(this.$imageTop.css({mixBlendMode: `multiply`})).appendTo(this.$wrap).children("div").css({position: `absolute`, top: `0px`, left: `0px`, right: `0px`, bottom: `0px`, backgroundRepeat: `no-repeat`, backgroundPosition: `center center`, backgroundSize: `100% 100%`});
					
					},
				
				mockup: function (){
					if(settings.data.mockup){
						this.$color.show();
						this.$imageBottom.show();
						this.$imageTop.show();
						}
					else{
						this.$color.hide();
						this.$imageBottom.hide();
						this.$imageTop.hide();
						}
					},
				color: function (){
					let canvas = this;
					
					this.$imageBottom.css({filter: `${canvas.ctf.convert(settings.data.color)} drop-shadow(-8px 8px 10px gray) `});
					},
				image: function (){
					this.$imageBottom.css({backgroundImage: `url(${settings.data.canvas[settings.data.key].image.bottom})`});
					this.$imageTop.css({backgroundImage: `url(${settings.data.canvas[settings.data.key].image.top})`});
					},
				layers: function (){
					let canvas = this;
					this.$layers.empty();
					$.each(settings.data.canvas[settings.data.key].layer, function (i, v){
						canvas.$layers.append(`<div><div></div></div>`);
						canvas.layer(i);
						});
					},
				layer: function (n){
					let canvas = this;
					let $layer = this.$layers.children().eq(n);
					let filterLine = function (line){
						let stroke = ``;
						let outline = ``;
                        $.each([{ x: "-", y: "-" },{ x: "", y: "" },{ x: "", y: "-" },{ x: "-", y: "" }], function (i, v){
                        	stroke += `drop-shadow(${v.x}${(settings.data.canvas[settings.data.key].layer[n].child.filter.stroke.width / 1000).toFixed(3)}em ${v.y}${(settings.data.canvas[settings.data.key].layer[n].child.filter.stroke.width / 1000).toFixed(3)}em 0em ${settings.data.canvas[settings.data.key].layer[n].child.filter.stroke.color}) `;
                        outline += `drop-shadow(${v.x}${(settings.data.canvas[settings.data.key].layer[n].child.filter.outline.width / 1000).toFixed(3)}em ${v.y}${(settings.data.canvas[settings.data.key].layer[n].child.filter.outline.width / 1000).toFixed(3)}em 0em ${settings.data.canvas[settings.data.key].layer[n].child.filter.outline.color}) `;
                        });
                        stroke = `${settings.data.canvas[settings.data.key].layer[n].child.filter.stroke.width != 0 ? stroke : ""}`;
                        outline = `${settings.data.canvas[settings.data.key].layer[n].child.filter.outline.width != 0 ? outline : ""}`;
                        return (line=="stroke")?stroke:outline;
						};
					let filterDepth = function (){
						let depth = ``;
						let pointer = [{ x: -1, y: -1 },{ x: 0, y: -1 },{ x: 1, y: -1 },{ x: 1, y: 0 },{ x: 1, y: 1 },{ x: 0, y: 1 },{ x: -1, y: 1 },{ x: -1, y: 0 }];
                        for(let i = 0; i<=settings.data.canvas[settings.data.key].layer[n].child.filter.depth.width;i++){
                        	depth += `drop-shadow(${pointer[settings.data.canvas[settings.data.key].layer[n].child.filter.depth.type].x * i * 0.01}em ${pointer[settings.data.canvas[settings.data.key].layer[n].child.filter.depth.type].y * i * 0.01}em ${i == 0 ? "1px" : "0em"}${settings.data.canvas[settings.data.key].layer[n].child.filter.depth.color})`;
                        };
                        depth = `${settings.data.canvas[settings.data.key].layer[n].child.filter.depth.width != 0 ? depth : ""}`;
                        return depth;
						};
					let filterShadow = function (){
						return `${settings.data.canvas[settings.data.key].layer[n].child.filter.shadow.blur == 0 && settings.data.canvas[settings.data.key].layer[n].child.filter.shadow.posX == 0 && settings.data.canvas[settings.data.key].layer[n].child.filter.shadow.posY == 0? ``: `drop-shadow(${(settings.data.canvas[settings.data.key].layer[n].child.filter.shadow.posX / 100).toFixed(3)}em ${(settings.data.canvas[settings.data.key].layer[n].child.filter.shadow.posY / 100).toFixed(3)}em ${(settings.data.canvas[settings.data.key].layer[n].child.filter.shadow.blur / 100).toFixed(3)}em ${settings.data.canvas[settings.data.key].layer[n].child.filter.shadow.color}`}`;
						};
					let backgroundImageColor = function (){
						let basic = settings.data.canvas[settings.data.key].layer[n].child.backgroundImage.color[settings.data.canvas[settings.data.key].layer[n].child.backgroundImage.color.length - 1];
                        let color = `linear-gradient(0deg, ${basic}, ${basic})`;
                        let gradient = `${basic}, ${basic}`;
                        if (settings.data.canvas[settings.data.key].layer[n].child.backgroundImage.color.length > 1) {
                            gradient = ``;
                            $.each(settings.data.canvas[settings.data.key].layer[n].child.backgroundImage.color, function (i, v){
                            	gradient += `${v},`;
                            	});
                            gradient = gradient.substring(0, gradient.length - 1);
                        }
                        switch (settings.data.canvas[settings.data.key].layer[n].child.backgroundImage.type) {
                            case 0:
                                settings.data.canvas[settings.data.key].layer[n].child.backgroundImage.color = [`${basic}`];
                                color = ``;
                                break;
                            case 1:
                                settings.data.canvas[settings.data.key].layer[n].child.backgroundImage.color = [`${basic}`];
                                color = `, ${color}`;
                                break;
                            case 2:
                                color = `, linear-gradient(${settings.data.canvas[settings.data.key].layer[n].child.backgroundImage.linear.pos}deg, ${gradient})`;
                                break;
                            case 3:
                                color = `, radial-gradient(circle at ${settings.data.canvas[settings.data.key].layer[n].child.backgroundImage.radial.posX}% ${settings.data.canvas[settings.data.key].layer[n].child.backgroundImage.radial.posY}%, ${gradient})`;
                                break;
                            case 4:
                                settings.data.canvas[settings.data.key].layer[n].child.backgroundImage.color = [`${settings.data.color}`];
                                color = `, linear-gradient(0deg, ${settings.data.color}, ${settings.data.color})`;
                                break;
                        }
                        return color;
                    };
                    
						
						
					if(settings.data.canvas[settings.data.key].layer[n].type == "image"){
						if(settings.data.canvas[settings.data.key].layer[n].child.backgroundImage.natural.exist){
							settings.data.canvas[settings.data.key].layer[n].child.height = (settings.data.canvas[settings.data.key].layer[n].child.width*settings.data.canvas[settings.data.key].layer[n].child.backgroundImage.natural.height)/settings.data.canvas[settings.data.key].layer[n].child.backgroundImage.natural.width;
							}
						$layer.attr(`style`, ``).css({
							position: `absolute`, 
							top: `${settings.data.canvas[settings.data.key].layer[n].top}px`, 
							left: `${settings.data.canvas[settings.data.key].layer[n].left}px`, 
							transformStyle: `preserve-3d`,
							width: `0px`,
							height: `0px`,
							transform: `rotateX(${settings.data.canvas[settings.data.key].layer[n].transform.rotateX}deg) rotateY(${settings.data.canvas[settings.data.key].layer[n].transform.rotateY}deg)`
							}).children().attr(`style`, ``).css({
								position: `absolute`,
								backgroundRepeat: `no-repeat`,
								backgroundPosition: `center center`,
								backgroundSize: `100% 100%`,
								opacity: `${settings.data.canvas[settings.data.key].layer[n].child.opacity}`,
								fontSize: `${settings.data.canvas[settings.data.key].layer[n].child.width}px`,
								top: `-${settings.data.canvas[settings.data.key].layer[n].child.height/2}px`, 
								left: `-${settings.data.canvas[settings.data.key].layer[n].child.width/2}px`, 
								width: `${settings.data.canvas[settings.data.key].layer[n].child.width}px`, 
								height: `${settings.data.canvas[settings.data.key].layer[n].child.height}px`,
								backgroundImage: `url('${settings.data.canvas[settings.data.key].layer[n].child.backgroundImage.url}') ${backgroundImageColor()}`,
								transform: `rotate(${settings.data.canvas[settings.data.key].layer[n].child.transform.rotate}deg) skew(${settings.data.canvas[settings.data.key].layer[n].child.transform.skew}deg) scaleX(${settings.data.canvas[settings.data.key].layer[n].child.transform.scaleX}) scaleY(${settings.data.canvas[settings.data.key].layer[n].child.transform.scaleY})`,
								filter: `${settings.data.canvas[settings.data.key].layer[n].child.filter.color.exist? `brightness(0%) ${canvas.ctf.convert(settings.data.canvas[settings.data.key].layer[n].child.filter.color.main)}`:``} ${settings.data.canvas[settings.data.key].layer[n].child.filter.main} ${filterLine('stroke')} ${filterLine('outline')} ${filterDepth()} ${filterShadow()}`,
								borderRadius: `${settings.data.canvas[settings.data.key].layer[n].child.borderRadius.posW}% ${settings.data.canvas[settings.data.key].layer[n].child.borderRadius.posX}% ${settings.data.canvas[settings.data.key].layer[n].child.borderRadius.posY}% ${settings.data.canvas[settings.data.key].layer[n].child.borderRadius.posZ}%`,
								});
						}
					else if(settings.data.canvas[settings.data.key].layer[n].type == "text"){
						$(`<link />`).attr({href:`${settings.data.canvas[settings.data.key].layer[n].child.font.source}`, rel: `stylesheet`}).appendTo($("head"));
						let $children = $layer.attr(`style`, ``).css({
							position: `absolute`, 
							top: `${settings.data.canvas[settings.data.key].layer[n].top}px`, 
							left: `${settings.data.canvas[settings.data.key].layer[n].left}px`, 
							transform: `rotateX(${settings.data.canvas[settings.data.key].layer[n].transform.rotateX}deg) rotateY(${settings.data.canvas[settings.data.key].layer[n].transform.rotateY}deg)`,
							transformStyle: `preserve-3d`,
							width: `0px`,
							height: `0px`,
							}).children().attr(`style`, ``);
						if(settings.data.canvas[settings.data.key].layer[n].child.curve.type == 0){
							$children.css({
								position: `absolute`,
								backgroundRepeat: `repeat`,
								backgroundPosition: `center center`,
								backgroundSize: `${settings.data.canvas[settings.data.key].layer[n].child.backgroundSize.width}% ${settings.data.canvas[settings.data.key].layer[n].child.backgroundSize.height}%`,
								whiteSpace: `nowrap`,
								webkitBackgroundClip: `text`,
								webkitTextFillColor: `transparent`,
								backgroundClip: `text`,
								color: `transparent`,
								padding: `0.26em`,
								opacity: `${settings.data.canvas[settings.data.key].layer[n].child.opacity}`,
								lineHeight: `${(settings.data.canvas[settings.data.key].layer[n].child.lineHeight / 100).toFixed(2)}em`,
								letterSpacing: `${(settings.data.canvas[settings.data.key].layer[n].child.letterSpacing / 100).toFixed(2)}em`,
								backgroundImage: `url('${settings.data.canvas[settings.data.key].layer[n].child.backgroundImage.url}') ${backgroundImageColor()}`,
								fontSize: `${settings.data.canvas[settings.data.key].layer[n].child.font.size}px`,
								fontFamily: `${settings.data.canvas[settings.data.key].layer[n].child.font.family}`,
								fontWeight: `${settings.data.canvas[settings.data.key].layer[n].child.font.weight}`,
								fontStyle: `${settings.data.canvas[settings.data.key].layer[n].child.font.style}`,
								textStroke: `${(settings.data.canvas[settings.data.key].layer[n].child.filter.stroke.width / 1000).toFixed(3)}em ${settings.data.canvas[settings.data.key].layer[n].child.filter.stroke.color}`,
								textAlign: `${settings.data.canvas[settings.data.key].layer[n].child.textAlign}`,
								transform: `rotate(${settings.data.canvas[settings.data.key].layer[n].child.transform.rotate}deg) skew(${settings.data.canvas[settings.data.key].layer[n].child.transform.skew}deg) scaleX(${settings.data.canvas[settings.data.key].layer[n].child.transform.scaleX}) scaleY(${settings.data.canvas[settings.data.key].layer[n].child.transform.scaleY})`,
								filter: `${settings.data.canvas[settings.data.key].layer[n].child.filter.color.exist? `brightness(0%) ${canvas.ctf.convert(settings.data.canvas[settings.data.key].layer[n].child.filter.color.main)}`:``} ${settings.data.canvas[settings.data.key].layer[n].child.filter.main} ${filterLine('outline')} ${filterDepth()} ${filterShadow()}`,
								borderBottom: `${(settings.data.canvas[settings.data.key].layer[n].child.borderBottom)?`0.1em solid ${settings.data.canvas[settings.data.key].layer[n].child.backgroundImage.color[settings.data.canvas[settings.data.key].layer[n].child.backgroundImage.color.length - 1]}`:`none`}`,
								}).html(String(decodeURIComponent(settings.data.canvas[settings.data.key].layer[n].child.html)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br>")).css({top: `-${$layer.children().outerHeight()/2}px`,left: `-${$layer.children().outerWidth()/2}px`,});
							}
							else{
								$children.empty();
								$children.css({
									position: `absolute`,
									width: `${settings.data.canvas[settings.data.key].layer[n].child.font.size}px`,
									height: `${settings.data.canvas[settings.data.key].layer[n].child.font.size}px`,
									transform: `rotate(${settings.data.canvas[settings.data.key].layer[n].child.transform.rotate}deg) skew(${settings.data.canvas[settings.data.key].layer[n].child.transform.skew}deg) scaleX(${settings.data.canvas[settings.data.key].layer[n].child.transform.scaleX}) scaleY(${settings.data.canvas[settings.data.key].layer[n].child.transform.scaleY})`,
									top: `-${settings.data.canvas[settings.data.key].layer[n].child.font.size/2}px`,
									left: `-${settings.data.canvas[settings.data.key].layer[n].child.font.size/2}px`,
									});
								let text = JSON.stringify(decodeURIComponent(settings.data.canvas[settings.data.key].layer[n].child.html).split(""));
								let curve = {
									text: {start: JSON.parse(`${text}`).splice(0, JSON.parse(`${text}`).length % 2 == 1 ? JSON.parse(`${text}`).length / 2 - 0.5 : JSON.parse(`${text}`).length / 2).reverse(),
									middle: JSON.parse(`${text}`).length % 2 == 1 ? JSON.parse(`${text}`)[JSON.parse(`${text}`).length / 2 - 0.5] : "",
									end: JSON.parse(`${text}`).splice(JSON.parse(`${text}`).length % 2 == 1 ? JSON.parse(`${text}`).length / 2 + 0.5 : JSON.parse(`${text}`).length / 2, JSON.parse(`${text}`).length - 1),
									},
									data: {
										type: settings.data.canvas[settings.data.key].layer[n].child.curve.type - 1,
										round: settings.data.canvas[settings.data.key].layer[n].child.curve.round,
										degree: settings.data.canvas[settings.data.key].layer[n].child.curve.degree,
										},
									pointer: [{ rs: "-", re: "", ps: "bottom", pe: "top", rps: "", rpe: "-" },{ rs: "", re: "-", ps: "top", pe: "bottom", rps: "-", rpe: "" },{ rs: "-", re: "", ps: "bottom", pe: "top", rps: "", rpe: "-" },{ rs: "", re: "-", ps: "top", pe: "bottom", rps: "-", rpe: "" }]
									};
								let separator = JSON.parse(`${text}`).length % 2 == 1 ? curve.data.degree / curve.text.start.length : (curve.data.degree * 2) / (curve.text.start.length * 2 - 1);
								let rs = function (i){
									let pointer = curve.pointer[curve.data.type].rs;
									let rotate = JSON.parse(`${text}`).length % 2 == 1 ? (i + 1) * separator : (i + 1) * separator - separator / 2;
									return pointer + rotate;
									};
								let rps = (i) => {
									let pointer = curve.pointer[curve.data.type].rps;
									let rotate = curve.data.type == 2 || curve.data.type == 3 ? (JSON.parse(`${text}`).length % 2 == 1 ? (i + 1) * separator : (i + 1) * separator - separator / 2) : "0";
									return pointer + rotate;
									};
								let re = (i) => {
									let pointer = curve.pointer[curve.data.type].re;
									let rotate = JSON.parse(`${text}`).length % 2 == 1 ? (i + 1) * separator : (i + 1) * separator - separator / 2;
									return pointer + rotate;
									};
								let rpe = (i) => {
									let pointer = curve.pointer[curve.data.type].rpe;
									let rotate = curve.data.type == 2 || curve.data.type == 3 ? (JSON.parse(`${text}`).length % 2 == 1 ? (i + 1) * separator : (i + 1) * separator - separator / 2) : "0";
									return pointer + rotate;
									};
								let el = function (r, rp, v){
									let $div1 = $(`<div />`).css({
										position: `absolute`,
										width: `${settings.data.canvas[settings.data.key].layer[n].child.font.size}px`,
										height: `${settings.data.canvas[settings.data.key].layer[n].child.font.size}px`,
										top: `0px`,
										left: `0px`,
										transform: `rotate(${r}deg)`}).appendTo($children);
									let $div2 = $(`<div />`).css({
										position: `absolute`,
										width: `${settings.data.canvas[settings.data.key].layer[n].child.font.size}px`,
										height: `${Number(curve.data.round / 100).toFixed(3)}em`,
										left: `0px`,
										}).css(curve.pointer[curve.data.type].ps, "0px").appendTo($div1);
										
									let $div3 = $(`<div />`).css({
										all: 'initial',
										position: `absolute`,
										width: `${settings.data.canvas[settings.data.key].layer[n].child.font.size}px`,
										height: `${settings.data.canvas[settings.data.key].layer[n].child.font.size}px`,
										left: `-0.26em`,
										transform: `rotate(${rp}deg)`,
										backgroundRepeat: `repeat`,
										backgroundPosition: `center center`,
										backgroundSize: `${settings.data.canvas[settings.data.key].layer[n].child.backgroundSize.width}% ${settings.data.canvas[settings.data.key].layer[n].child.backgroundSize.height}%`,
										whiteSpace: `nowrap`,
										webkitBackgroundClip: `text`,
										webkitTextFillColor: `transparent`,
										backgroundClip: `text`,
										color: `transparent`,
										padding: `0.26em`,
										opacity: `${settings.data.canvas[settings.data.key].layer[n].child.opacity}`,
										backgroundImage: `url('${settings.data.canvas[settings.data.key].layer[n].child.backgroundImage.url}') ${backgroundImageColor()}`,
										fontSize: `${settings.data.canvas[settings.data.key].layer[n].child.font.size}px`,
										fontFamily: `${settings.data.canvas[settings.data.key].layer[n].child.font.family}`,
										fontWeight: `${settings.data.canvas[settings.data.key].layer[n].child.font.weight}`,
										fontStyle: `${settings.data.canvas[settings.data.key].layer[n].child.font.style}`,
										textStroke: `${(settings.data.canvas[settings.data.key].layer[n].child.filter.stroke.width / 1000).toFixed(3)}em ${settings.data.canvas[settings.data.key].layer[n].child.filter.stroke.color}`,
										textAlign: `${settings.data.canvas[settings.data.key].layer[n].child.textAlign}`,
										filter: `${settings.data.canvas[settings.data.key].layer[n].child.filter.color.exist? `brightness(0%) ${canvas.ctf.convert(settings.data.canvas[settings.data.key].layer[n].child.filter.color.main)}`:``} ${settings.data.canvas[settings.data.key].layer[n].child.filter.main} ${filterLine('outline')} ${filterDepth()} ${filterShadow()}`,
										}).css(curve.pointer[curve.data.type].pe, "-0.26em").html(v).appendTo($div2);
									}
								$.each(curve.text.start, function (i, v) {
									el(rs(i), rps(i), v);
									});
								el(0, 0, curve.text.middle);
								$.each(curve.text.end, function (i, v) {
									el(re(i), rpe(i), v);
									});
								}
						}
					
					},
				render: function (){
					this.mockup();
					this.color();
					this.image();
					this.layers();
					settings.onRender(settings.data);
					}
				}
			return Canvas;
		})();
		if(settings.editor){
			return new Canvas(this);
			}
		else{
			return this.each(function (){
				new Canvas(this);
				});
			}
	
	};
})(jQuery);