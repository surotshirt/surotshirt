(function ($) {
	$.fn.customTShirtEditor= function (options, more = false) {
		let text = {
						type: "text",
						top: 300, // 0-1000
						left: 500, //0-1000
						transform: {
							rotateX: 0, // -90 - 90
							rotateY: 0 // -90 - 90
							},
						child: {
							html: "Your text",
							borderBottom: false,
							textAlign: `center`,
							letterSpacing: 0, //-20-200
							lineHeight: 100, // 50-300
							opacity: 1, // 0-1 point 0.x
							font: {
								size: 50, // 0-500
								source: `https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap`,
								family: `Roboto`,
								weight: "normal",
								style: "none"
								},
							
							backgroundImage: {
								type: 1,// 0 - 4
								url: "",
								color: ["#000000"],
								natural: {
									exist: true,
									width: 100,
									height: 100,
									},
								linear: {
									pos: 0, // -180 - 180
									},
								radial: {
									posX: 0, // 0 - 100
									posY: 0, // 0 - 100
									}
								
								},
							backgroundSize: {
								width: 100, // 0-100
								height: 100, // 0-100
								},
							transform: {
								rotate: 0, // -180 - 180
								skew: 0, // -88 - 88
								scaleX: 1, // -1 and 1
								scaleY: 1, // -1 and 1
								},
							filter: {
								main: "",
								color: {
									exist: false,
									main: "#000000"
									},
								stroke: {
									width: 0, // 0-35
									color: "#000000"
									},
								outline: {
									width: 0, // 0-35
									color: "#000000"
									},
								depth: {
									type: 0, // 0-7
									width: 0, // 0-15
									color: "#000000"
									},
								shadow: {
									blur: 0, // 0-15
									color: "#000000",
									posX: 0, // -350-350
									posY: 0 // -350-350
									},
								},
							curve: {
								type: 0, // 0-5
								round: 10, // 0-80
								degree: 60 // 0-180
								}
							}
						};
		let image = {
						type: "image",
						top: 450, // 0-1000
						left: 490, //0-1000
						transform: {
							rotateX: 0, // -90 - 90
							rotateY: 0 // -90 - 90
							},
						child: {
							width: 250, // 0-1000
							height: 250, // 0-1000
							opacity: 1, // 0-1 point 0.x
							backgroundImage: {
								type: 0,// 0 - 4
								url: "https://cdn.jsdelivr.net/gh/surotshirt/surotshirt@v1.0.6/images/icons/logo-st.png",
								color: ["#ff0000", "#0000ff"],
								natural: {
									exist: true,
									width: 500,
									height: 500,
									},
								linear: {
									pos: 20, // -180 - 180
									},
								radial: {
									posX: 20, // 0 - 100
									posY: 20, // 0 - 100
									}
									
								},
							transform: {
								rotate: 0, // -180 - 180
								skew: 0, // -88 - 88
								scaleX: 1, // -1 and 1
								scaleY: 1, // -1 and 1
								},
							filter: {
								main: "",
								color: {
									exist: false,
									main: "#000000"
									},
								stroke: {
									width: 0, // 0-35
									color: "#000000"
									},
								outline: {
									width: 0, // 0-35
									color: "#000000"
									},
								depth: {
									type: 0, // 0-7
									width: 0, // 0-15
									color: "#000000"
									},
								shadow: {
									blur: 0, // 0-15
									color: "#000000",
									posX: 0, // -350-350
									posY: 0 // -350-350
									},
								},
							borderRadius: {
								posW: 0, // 0 - 100
								posX: 0, // 0 - 100
								posY: 0, // 0 - 100
								posZ: 0, // 0 - 100
								},
							}
						};
					
		let customTShirt = undefined;
		let Editor = (function (){
			function Editor(original){
				this.$original = $(original);
				customTShirt = $(original).customTShirt({editor: true});
				customTShirt.settings = $.extend(customTShirt.settings, options);
				customTShirt.render();
				this.$main = customTShirt.$main;
				this.initialize();
				this.event();
				this.unredo.store(customTShirt.settings.data);
				this.render();
				
				};
			Editor.prototype ={
				unredo: {
                    key: -1,
                    data: [],
                    store: function (data) {
                        this.data.splice(this.key + 1, this.data.length - (this.key + 1));
                        if (JSON.stringify(data) != JSON.stringify(this.data[this.data.length - 1])) {
                            this.key += 1;
                            this.data.push(JSON.parse(`${JSON.stringify(data)}`));
                        }
                    },
                    hasUndo: function () {
                        if (this.key == 0) {
                            return false;
                        }
                        return true;
                    },
                    hasRedo: function () {
                        if (this.key == this.data.length - 1) {
                            return false;
                        }
                        return true;
                    },
                    undo: function () {
                        if (this.hasUndo()) {
                            this.key -= 1;
                            customTShirt.settings.data = JSON.parse(`${JSON.stringify(this.data[this.key])}`);
                        }
                    },
                    redo: function () {
                        if (this.hasRedo()) {
                            this.key += 1;
                            customTShirt.settings.data = JSON.parse(`${JSON.stringify(this.data[this.key])}`);
                        }
                    },
                 },
				initialize: function (){
					$(`<link />`).attr({rel: `stylesheet`, href:`https://cdn.jsdelivr.net/npm/remixicon@3.0.0/fonts/remixicon.css`}).appendTo($(`head`));
					
					this.$main.append(`
					
					<div class="cte-back"></div>
					<div class="cte-bg cte-top">
					<input type="color" class="cte-none cti-color cte-color cte-float-left" />
					<button class="cti-import cte-icon cte-float-left"><i class="ri-folder-open-line"></i></button>
					<button class="cte-none cti-mockup cte-icon cte-float-left"><i class="ri-t-shirt-line"></i></button>
					<select class="cti-key cte-select cte-float-left"></select>
					<button class="cti-view cte-icon cte-float-right"><i class="ri-eye-line"></i></button>
					<button class="cte-none cti-save cte-icon cte-float-right"><i class="ri-save-3-line"></i></button>
					<button class="cti-redo cte-icon cte-float-right"><i class="ri-corner-up-right-line"></i></button>
					<button class="cti-undo cte-icon cte-float-right"><i class="ri-corner-up-left-line"></i></button>
					</div>
					<div class="cte-bg cte-bottom">
					<select class="cti-layer cte-select cte-float-left"></select>
					<button class="cti-add cte-icon cte-float-left"><i class="ri-add-line"></i></button>
					
					<button class="cti-delete cte-icon cte-float-right"><i class="ri-delete-bin-line"></i></button>
					<button class="cti-copy cte-icon cte-float-right"><i class="ri-file-copy-line"></i></button>
					<button class="cti-down cte-icon cte-float-right"><i class="ri-arrow-down-line"></i></button>
					<button class="cti-up cte-icon cte-float-right"><i class="ri-arrow-up-line"></i></button>
					</div>
					<div class="cte-bg cte-left">
					<button class="cte-icon"><i class="ri-image-line"></i></button>
					<button class="cte-icon"><i class="ri-text"></i></button>
					<button class="cte-icon"><i class="ri-drag-move-line"></i></button>
					<button class="cte-icon"><i class="ri-paint-fill"></i></button>
					<button class="cte-icon"><i class="ri-crop-line"></i></button>
					<button class="cte-icon"><i class="ri-artboard-2-line"></i></button>
					</div>
					<div class="cte-bg cte-right cte-none">
					<button class="cte-icon" data-target="0"><i class="ri-gallery-fill"></i></button>
					<button class="cte-icon" data-target="1"><i class="ri-rounded-corner"></i></button>
					</div>
					<div class="cte-bg cte-right cte-none">
					<button class="cte-icon" data-target="2"><i class="ri-font-size"></i></button>
					<button class="cte-icon" data-target="3"><i class="ri-text-spacing"></i></button>
					<button class="cte-icon" data-target="4"><i class="ri-gallery-fill"></i></button>
					<button class="cte-icon" data-target="5"><i class="ri-donut-chart-line"></i></button>
					</div>
					<div class="cte-bg cte-right cte-none">
					<button class="cte-icon" data-target="6"><i class="ri-drag-move-fill"></i></button>
					</div>
					<div class="cte-bg cte-right cte-none">
					<button class="cte-icon" data-target="7"><i class="ri-contrast-drop-line"></i></button>
					<button class="cte-icon" data-target="8"><i class="ri-contrast-2-line"></i></button>
					</div>
					<div class="cte-bg cte-right cte-none">
					<button class="cte-icon" data-target="9"><i class="ri-drag-drop-line"></i></button>
					<button class="cte-icon" data-target="10"><i class="ri-clockwise-line"></i></button>
					</div>
					<div class="cte-bg cte-right cte-none">
					<button class="cte-icon" data-target="11"><i class="ri-checkbox-blank-line"></i></button>
					<button class="cte-icon" data-target="12"><i class="ri-checkbox-blank-circle-line"></i></button>
					<button class="cte-icon" data-target="13"><i class="ri-checkbox-multiple-blank-fill"></i></button>
					<button class="cte-icon" data-target="14"><i class="ri-box-2-fill"></i></button>
					</div>
					
					<div class="cte-bg cte-action cte-none">
					<div class="cte-wrap cte-clear">
					<input class="cti-backgroundImage-url cte-90 cte-input cte-float-left" type="button"/>
					<button class="cti-backgroundImage-url-delete cte-icon cte-float-right"><i class="ri-delete-bin-line"></i></button>
					</div>
					<div class="cte-wrap cte-clear">
					<button class="cti-backgroundImage-natural cte-icon cte-float-right"><i class="ri-toggle-line"></i></button>
					<span class="cte-span cte-float-right">Natural size</span>
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-image-width cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-image-width cte-20 cte-input cte-float-right" type="number" />
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-image-height cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-image-height cte-20 cte-input cte-float-right" type="number" />
					</div>
					</div>
					
					<div class="cte-bg cte-action cte-none">
					<div class="cte-wrap cte-clear">
					<input class="cti-image-borderRadius-posW cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-image-borderRadius-posW cte-20 cte-input cte-float-right" type="number" />
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-image-borderRadius-posX cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-image-borderRadius-posX cte-20 cte-input cte-float-right" type="number" />
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-image-borderRadius-posY cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-image-borderRadius-posY cte-20 cte-input cte-float-right" type="number" />
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-image-borderRadius-posZ cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-image-borderRadius-posZ cte-20 cte-input cte-float-right" type="number" />
					</div>
					</div>
					
					<div class="cte-bg cte-action cte-none">
					<div class="cte-wrap cte-clear">
					<input class="cti-text-fontfamily cte-90 cte-input cte-float-left" type="button"/>
					<button class="cti-text-fontdelete cte-icon cte-float-right"><i class="ri-delete-bin-line"></i></button>
					</div>
					<div class="cte-wrap cte-clear" style="height: 70px">
					<textarea class="cti-text-html cte-70 cte-textarea cte-float-left"></textarea>
					<select class="cti-text-align cte-select cte-float-right"></select>
					<button class="cti-text-borderbottom cte-icon cte-float-right"><i class="ri-underline"></i></button>
					<button class="cti-text-fontstyle cte-icon cte-float-right"><i class="ri-italic"></i></button>
					<button class="cti-text-fontweight cte-icon cte-float-right"><i class="ri-bold"></i></button>
					</div>
					</div>
					
					<div class="cte-bg cte-action cte-none">
					<div class="cte-wrap cte-clear">
					<input class="cti-text-fontsize cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-text-fontsize cte-20 cte-input cte-float-right" type="number" />
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-text-letterspacing cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-text-letterspacing cte-20 cte-input cte-float-right" type="number" />
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-text-lineheight cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-text-lineheight cte-20 cte-input cte-float-right" type="number" />
					</div>
					</div>
					
					<div class="cte-bg cte-action cte-none">
					<div class="cte-wrap cte-clear">
					<input class="cti-backgroundImage-url cte-90 cte-input cte-float-left" type="button"/>
					<button class="cti-backgroundImage-url-delete cte-icon cte-float-right"><i class="ri-delete-bin-line"></i></button>
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-text-backgroundSizeWidth cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-text-backgroundSizeWidth cte-20 cte-input cte-float-right" type="number" />
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-text-backgroundSizeHeight cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-text-backgroundSizeHeight cte-20 cte-input cte-float-right" type="number" />
					</div>
					</div>
					
					<div class="cte-bg cte-action cte-none">
					<div class="cte-wrap cte-clear">
					<select class="cti-text-curvetype cte-100 cte-select cte-float-left"></select>
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-text-curveround cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-text-curveround cte-20 cte-input cte-float-right" type="number" />
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-text-curvedegree cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-text-curvedegree cte-20 cte-input cte-float-right" type="number" />
					</div>
					</div>
					
					
					<div class="cte-bg cte-action cte-none">
					<div class="cte-wrap cte-clear">
					<input class="cti-top cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-top cte-20 cte-input cte-float-right" type="number" />
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-left cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-left cte-20 cte-input cte-float-right" type="number" />
					</div>
					</div>
					
					<div class="cte-bg cte-action cte-none">
					<div class="cte-wrap cte-clear">
					<select class="cti-colortype cte-80 cte-select cte-float-left"></select>
					<button class="cti-coloradd cte-icon cte-float-right"><i class="ri-add-line"></i></button>
					<input type="color" class="cti-colormain cte-color cte-float-right" />
					</div>
					<div class="cte-wrap cte-clear">
					<select class="cti-filter cte-80 cte-select cte-float-left"></select>
					<button class="cti-filtercolorexist cte-icon cte-float-right"><i class="ri-toggle-line"></i></button>
					<input type="color" class="cti-filtercolormain cte-color cte-float-right" />
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-opacity cte-80 cte-input cte-float-left" step="0.1" type="range" />
					<input class="cti-opacity cte-20 cte-input cte-float-right" step="0.1" type="number" />
					</div>
					</div>
					
					<div class="cte-bg cte-action cte-none">
					<div class="cte-wrap cte-clear">
					<input class="cti-linear cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-linear cte-20 cte-input cte-float-right" type="number" />
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-radialx cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-radialx cte-20 cte-input cte-float-right" type="number" />
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-radialy cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-radialy cte-20 cte-input cte-float-right" type="number" />
					</div>
					</div>
					
					<div class="cte-bg cte-action cte-none">
					<div class="cte-wrap cte-clear">
					<input class="cti-rotatex cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-rotatex cte-20 cte-input cte-float-right" type="number" />
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-rotatey cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-rotatey cte-20 cte-input cte-float-right" type="number" />
					</div>
					</div>
					
					
					<div class="cte-bg cte-action cte-none">
					<div class="cte-wrap cte-clear">
					<span class="cte-span cte-float-left">Flip vertical</span>
					<button class="cti-scalex cte-icon cte-float-left"><i class="ri-toggle-line"></i></button>
					<button class="cti-scaley cte-icon cte-float-right"><i class="ri-toggle-line"></i></button>
					<span class="cte-span cte-float-right">Flip horizontal</span>
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-rotate cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-rotate cte-20 cte-input cte-float-right" type="number" />
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-skew cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-skew cte-20 cte-input cte-float-right" type="number" />
					</div>
					</div>
					
					<div class="cte-bg cte-action cte-none">
					<div class="cte-wrap cte-clear">
					<span class="cte-span cte-float-left">stroke color</span>
					<input type="color" class="cti-strokecolor cte-color cte-float-left" />
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-strokewidth cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-strokewidth cte-20 cte-input cte-float-right" type="number" />
					</div>
					</div>
					
					<div class="cte-bg cte-action cte-none">
					<div class="cte-wrap cte-clear">
					<span class="cte-span cte-float-left">outline color</span>
					<input type="color" class="cti-outlinecolor cte-color cte-float-left" />
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-outlinewidth cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-outlinewidth cte-20 cte-input cte-float-right" type="number" />
					</div>
					</div>
					
					<div class="cte-bg cte-action cte-none">
					<div class="cte-wrap cte-clear">
					<span class="cte-span cte-float-left">shadow color</span>
					<input type="color" class="cti-shadowcolor cte-color cte-float-left" />
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-shadowblur cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-shadowblur cte-20 cte-input cte-float-right" type="number" />
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-shadowposx cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-shadowposx cte-20 cte-input cte-float-right" type="number" />
					</div>
					<div class="cte-wrap cte-clear">
					<input class="cti-shadowposy cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-shadowposy cte-20 cte-input cte-float-right" type="number" />
					</div>
					</div>
					
					<div class="cte-bg cte-action cte-none">
					<div class="cte-wrap cte-clear">
					<span class="cte-span cte-float-left">depth type</span>
					<select class="cti-depthtype cte-select cte-float-left"></select>
					<input type="color" class="cti-depthcolor cte-color cte-float-right" />
					<span class="cte-span cte-float-right">depth color</span>
					</div>
					
					<div class="cte-wrap cte-clear">
					<input class="cti-depthwidth cte-80 cte-input cte-float-left" type="range" />
					<input class="cti-depthwidth cte-20 cte-input cte-float-right" type="number" />
					</div>
					</div>
					
					<div class="cte-wrap-add cte-bg cte-none">
					<input class="cti-add-text cte-input" type="button" value="add text"/>
					<input class="cti-add-image cte-input" type="button" value="add image"/>
					<input class="cti-import-design cte-input" type="button" value="import design"/>
					</div>
					</div>
					`);
					$(`.cte-100`).css({width: `100%`});
					$(`.cte-90`).css({width: `${this.$original.width()-60}px`});
					$(`.cte-80`).css({width: `${this.$original.width()-90}px`});
					$(`.cte-70`).css({width: `${this.$original.width()-130}px`});
					$(`.cte-20`).css({width: `50px`});
					
					},
				event: function (){
					let editor = this;
					this.$main.find(".cti-color").on("input", function (){
						customTShirt.settings.data.color = this.value;
						customTShirt.color();
						}).on("change", function (){
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-key").on("change", function (){
						customTShirt.settings.data.key = Number(this.value);
						customTShirt.render();
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-mockup").on("click", function (){
						if(customTShirt.settings.data.mockup){
							customTShirt.settings.data.mockup = false;
							}
						else{
							customTShirt.settings.data.mockup = true;
							}
						customTShirt.mockup();
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-save").on("click", function (){
						customTShirt.settings.onSave(customTShirt.settings.data);
						});
					this.$main.find(".cti-import").on("click", function (){
						$(`<input />`).attr({type: `file`, accept: `application/json`}).on("change", function (){
							const files = this.files;
							if (files.length <= 0) {return false;}
							const fr = new FileReader();
							fr.onload = function (e) {
								const r = e.target.result;
								try {
									customTShirt.settings.data = JSON.parse(r);
									customTShirt.render();
									editor.unredo.store(customTShirt.settings.data);
									editor.render();
									}
								catch (e) {
									customTShirt.settings.data = JSON.parse(`${JSON.stringify(editor.unredo.data[editor.unredo.data.length-1])}`);
									customTShirt.render();
									editor.render();
									alert(e);
									}
								};
							fr.readAsText(files.item(0));
							this.value = null;
							}).click();
						});
					this.$main.find(".cti-undo").on("click", function (){
						editor.unredo.undo();
						customTShirt.render();
						editor.render();
						});
					this.$main.find(".cti-redo").on("click", function (){
						editor.unredo.redo();
						customTShirt.render();
						editor.render();
						});
					this.$main.find(".cti-layer").on("change", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].key = Number(this.value);
						customTShirt.render();
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-add").on("click", function (){
						if(editor.$main.find(".cte-wrap-add").is(`:visible`)){
							editor.$main.find(".cte-wrap-add").addClass("cte-none");
							}
						else{
							editor.$main.find(".cte-wrap-add").removeClass("cte-none");
							}
						});
					this.$main.find(".cti-add-text").on("click", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer.push(JSON.parse(`${JSON.stringify(text)}`));
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].key = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer.length-1;
						customTShirt.render();
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						editor.$main.find(".cte-wrap-add").addClass("cte-none");
						});
					this.$main.find(".cti-add-image").on("click", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer.push(JSON.parse(`${JSON.stringify(image)}`));
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].key = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer.length-1;
						customTShirt.render();
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						editor.$main.find(".cte-wrap-add").addClass("cte-none");
						});
					this.$main.find(".cti-import-design").on("click", function (){
						$(`<input />`).attr({type: `file`, accept: `application/json`}).on("change", function (){
							const files = this.files;
							if (files.length <= 0) {return false;}
							const fr = new FileReader();
							fr.onload = function (e) {
								const r = e.target.result;
								try {
									$.each(JSON.parse(r), function (i, v){
										customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer.push(JSON.parse(`${JSON.stringify(v)}`));
										});
									customTShirt.settings.data.canvas[customTShirt.settings.data.key].key = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer.length-1;
									customTShirt.render();
									editor.unredo.store(customTShirt.settings.data);
									editor.render();
									}
								catch (e) {
									customTShirt.settings.data = JSON.parse(`${JSON.stringify(editor.unredo.data[editor.unredo.data.length-1])}`);
									customTShirt.render();
									editor.render();
									alert(e);
									}
								};
							fr.readAsText(files.item(0));
							this.value = null;
							editor.$main.find(".cte-wrap-add").addClass("cte-none");
							}).click();
						});
					this.$main.find(".cti-up").on("click", function (){
						let data = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key];
                        customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer.splice(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key, 1);
                        customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer.splice(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key + 1, 0, JSON.parse(`${JSON.stringify(data)}`));
                        customTShirt.settings.data.canvas[customTShirt.settings.data.key].key += 1;
						customTShirt.render();
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-down").on("click", function (){
						let data = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key];
                        customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer.splice(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key, 1);
                        customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer.splice(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key - 1, 0, JSON.parse(`${JSON.stringify(data)}`));
                        customTShirt.settings.data.canvas[customTShirt.settings.data.key].key -= 1;
						customTShirt.render();
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-copy").on("click", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer.push(JSON.parse(`${JSON.stringify(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key])}`));
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].key = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer.length-1;
						customTShirt.render();
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-delete").on("click", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer.splice(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key, 1);
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].key = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer.length-1;
						customTShirt.render();
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cte-back").on("click", function (){
						editor.$main.find(".cte-action").addClass("cte-none");
						editor.$main.find(".cte-wrap-add").addClass("cte-none");
						editor.$main.find(".cte-top").removeClass("cte-none");
						editor.$main.find(".cte-bottom").removeClass("cte-none");
						if(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key] != undefined){
							editor.$main.find(".cte-left").removeClass("cte-none");
							}
						});
					this.$main.find(".cti-view").on("click", function (){
						editor.$main.find(".cte-action").addClass("cte-none");
						editor.$main.find(".cte-wrap-add").addClass("cte-none");
						editor.$main.find(".cte-top").addClass("cte-none");
						editor.$main.find(".cte-bottom").addClass("cte-none");
						editor.$main.find(".cte-left").addClass("cte-none");
						editor.$main.find(".cte-right").addClass("cte-none");
						});
					this.$main.find(".cte-bottom").on("click", function (){
						editor.$main.find(".cte-action").addClass("cte-none");
						});
					this.$main.find(".cte-left").children().on("click", function (){
						editor.$main.find(".cte-action").addClass("cte-none");
						editor.$main.find(".cte-right").addClass("cte-none");
						editor.$main.find(".cte-right").eq($(this).index()).removeClass("cte-none");
						
						});
					this.$main.find(".cte-right").children().on("click", function (){
						editor.$main.find(".cte-action").addClass("cte-none");
						editor.$main.find(".cte-action").eq(Number($(this).attr("data-target"))).removeClass("cte-none");
						});
					$.getScript(`https://cdn.jsdelivr.net/gh/shwijoyo/jquery-imagepicker@v1.1.1/jquery.imagepicker.js`).done(function (){
						editor.$main.find(".cti-backgroundImage-url").imagepicker('a0d496c243d8376fd1f97de237d1f911', function (data){
							customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.url = data.url;
							customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.natural.width = data.width;
							customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.natural.height = data.height;
							customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
						});
					this.$main.find(".cti-backgroundImage-url-delete").on("click", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.url = ``;
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.natural.width = 300;
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.natural.height = 300;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-backgroundImage-natural").on("click", function (){
						
						if(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.natural.exist){
							customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.natural.exist = false;
							}
						else{
							customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.natural.exist = true;
							}
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-image-width").attr({min: 0, max: 1000}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.width = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-image-width").css({backgroundSize: `${(value/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-image-height").attr({min: 0, max: 1000}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.height = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-image-height").css({backgroundSize: `${(value/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-image-borderRadius-posW").attr({min: 0, max: 100}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.borderRadius.posW = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-image-borderRadius-posW").css({backgroundSize: `${(value/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-image-borderRadius-posX").attr({min: 0, max: 100}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.borderRadius.posX = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-image-borderRadius-posX").css({backgroundSize: `${(value/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-image-borderRadius-posY").attr({min: 0, max: 100}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.borderRadius.posY = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-image-borderRadius-posY").css({backgroundSize: `${(value/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-image-borderRadius-posZ").attr({min: 0, max: 100}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.borderRadius.posZ = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-image-borderRadius-posZ").css({backgroundSize: `${(value/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					$.getScript(`https://cdn.jsdelivr.net/gh/shwijoyo/jquery-googlefontpicker@v1.1.0/jquery.googlefontpicker.js`).done(function (){
						editor.$main.find(".cti-text-fontfamily").googlefontpicker(function (data){
							customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.font.family = data.family;
							customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.font.source = data.src;
							customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							
							
							});
						});
					this.$main.find(".cti-text-fontdelete").on("click", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.font.family = "";
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.font.source = "";
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-text-html").on("input", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.html = this.value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-text-align").on("change", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.textAlign = this.value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-text-borderbottom").on("click", function (){
						
						if(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.borderBottom){
							customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.borderBottom = false;
							}
						else{
							customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.borderBottom = true;
							}
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-text-fontstyle").on("click", function (){
						
						if(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.font.style == "none"){
							customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.font.style = "italic";
							}
						else{
							customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.font.style = "none";
							}
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-text-fontweight").on("click", function (){
						
						if(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.font.weight == "normal"){
							customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.font.weight = "bold";
							}
						else{
							customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.font.weight = "normal";
							}
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-text-fontsize").attr({min: 0, max: 500}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.font.size = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-text-fontsize").css({backgroundSize: `${(value/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-text-letterspacing").attr({min: -20, max: 200}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.letterSpacing = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-text-letterspacing").css({backgroundSize: `${((value+20)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-text-lineheight").attr({min: 50, max: 300}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.lineHeight = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-text-lineheight").css({backgroundSize: `${((value-50)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-text-backgroundSizeWidth").attr({min: 0, max: 100}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundSize.width = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-text-backgroundSizeWidth").css({backgroundSize: `${((value)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-text-backgroundSizeHeight").attr({min: 0, max: 100}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundSize.height = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-text-backgroundSizeHeight").css({backgroundSize: `${((value)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-text-curvetype").on("change", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.curve.type = Number(this.value);
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-text-curvedegree").attr({min: 0, max: 180}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.curve.degree = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-text-curvedegree").css({backgroundSize: `${((value)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-text-curveround").attr({min: 0, max: 80}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.curve.round = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-text-curveround").css({backgroundSize: `${((value)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-top").attr({min: 0, max: 1000}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].top = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-top").css({backgroundSize: `${((value)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-left").attr({min: 0, max: 1000}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].left = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-left").css({backgroundSize: `${((value)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-filter").on("change", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.main = this.value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-colortype").on("change", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.type = Number(this.value);
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-colormain").on("input", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.color[customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.color.length-1] = this.value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						}).on("change", function (){
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					let invertColor = (hexTripletColor)=>{
						var color = hexTripletColor;
						color = color.substring(1); // remove #
						color = parseInt(color, 16); // convert to integer>
						color = 0xFFFFFF ^ color; // invert three bytes>
						color = color.toString(16); // convert to hex>
						color = ("000000" + color).slice(-6); // pad with leading zeros>
						color = "#" + color; // prepend #
						return color;
						}
					this.$main.find(".cti-coloradd").on("click", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.color.push(invertColor(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.color[customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.color.length-1]));
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-filtercolorexist").on("click", function (){
						
						if(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.color.exist){
							customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.color.exist = false;
							}
						else{
							customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.color.exist = true;
							}
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-filtercolormain").on("input", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.color.main = this.value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						}).on("change", function (){
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-opacity").attr({min: 0, max: 1}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.opacity = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-opacity").css({backgroundSize: `${((value)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-linear").attr({min: -180, max: 180}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.linear.pos = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-linear").css({backgroundSize: `${((value+180)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-radialx").attr({min: 0, max: 100}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.radial.posX = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-radialx").css({backgroundSize: `${((value)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-radialy").attr({min: 0, max: 100}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.radial.posY = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-radialy").css({backgroundSize: `${((value)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-rotatex").attr({min: -90, max: 90}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].transform.rotateX = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-rotatex").css({backgroundSize: `${((value+90)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-rotatey").attr({min: -90, max: 90}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].transform.rotateY = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-rotatey").css({backgroundSize: `${((value+90)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-scalex").on("click", function (){
						
						if(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.transform.scaleX == 1){
							customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.transform.scaleX = -1;
							}
						else{
							customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.transform.scaleX = 1;
							}
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-scaley").on("click", function (){
						
						if(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.transform.scaleY == 1){
							customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.transform.scaleY = -1;
							}
						else{
							customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.transform.scaleY = 1;
							}
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					this.$main.find(".cti-rotate").attr({min: -180, max: 180}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.transform.rotate = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-rotate").css({backgroundSize: `${((value+180)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-skew").attr({min: -88, max: 88}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.transform.skew = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-skew").css({backgroundSize: `${((value+88)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-strokecolor").on("input", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.stroke.color = this.value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						}).on("change", function (){
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-strokewidth").attr({min: 0, max: 35}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.stroke.width = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-strokewidth").css({backgroundSize: `${((value)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-outlinecolor").on("input", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.outline.color = this.value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						}).on("change", function (){
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-outlinewidth").attr({min: 0, max: 35}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.outline.width = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-outlinewidth").css({backgroundSize: `${((value)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-shadowcolor").on("input", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.shadow.color = this.value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						}).on("change", function (){
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-shadowblur").attr({min: 0, max: 15}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.shadow.blur = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-shadowblur").css({backgroundSize: `${((value)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-shadowposx").attr({min: -350, max: 350}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.shadow.posX = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-shadowposx").css({backgroundSize: `${((value+350)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-shadowposy").attr({min: -350, max: 350}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.shadow.posY = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-shadowposy").css({backgroundSize: `${((value+350)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-depthcolor").on("input", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.depth.color = this.value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						}).on("change", function (){
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-depthwidth").attr({min: 0, max: 15}).on("input", function (){
						let value = Number(this.value);
						let min = Number(this.min);
						let max = Number(this.max);
						if(value <= min){
							value = min;
							}
						if(value >= max){
							value = max;
							}
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.depth.width = value;
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.$main.find(".cti-depthwidth").css({backgroundSize: `${((value)/(max-min))*100}% 100%`}).val(value);
						}).on("change", function (){
							customTShirt.render();
							editor.unredo.store(customTShirt.settings.data);
							editor.render();
							});
					this.$main.find(".cti-depthtype").on("change", function (){
						customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.depth.type = Number(this.value);
						customTShirt.layer(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key);
						editor.unredo.store(customTShirt.settings.data);
						editor.render();
						});
					},
				
				render: function() {
					
					let editor = this;
					this.$main.find(".cti-color").val(customTShirt.settings.data.color);
					this.$main.find(".cti-key").empty();
					(customTShirt.settings.data.mockup)?this.$main.find(".cti-mockup").children("i").removeClass(`ri-t-shirt-fill`).addClass(`ri-t-shirt-line`):this.$main.find(".cti-mockup").children("i").removeClass(`ri-t-shirt-line`).addClass(`ri-t-shirt-fill`);
					$.each(customTShirt.settings.data.canvas, function (i, v){
						editor.$original.find(".cti-key").append(`<option value="${i}" ${(customTShirt.settings.data.key == i)?`selected disabled`:``}>${v.name}</option>`);
						});
					(this.unredo.hasUndo())?this.$main.find(".cti-undo").removeAttr("disabled"):this.$main.find(".cti-undo").attr({disabled: true});
					(this.unredo.hasRedo())?this.$main.find(".cti-redo").removeAttr("disabled"):this.$main.find(".cti-redo").attr({disabled: true});
					editor.$main.find(".cti-layer").empty();
					this.$main.find(".cti-copy-design").remove();
					
					$.each(customTShirt.settings.data.canvas, function (i, v){
						if(v.layer.length != 0 && i != customTShirt.settings.data.key){
							let copyDesign = $(`<input />`).attr({type: `button`, value: `copy from ${v.name}`}).addClass(`cti-copy-design cte-input`).on("click", function (){
								$.each(v.layer, function (j, w){
									customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer.push(JSON.parse(`${JSON.stringify(w)}`));
									customTShirt.settings.data.canvas[customTShirt.settings.data.key].key = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer.length-1;
									customTShirt.render();
									editor.unredo.store(customTShirt.settings.data);
									editor.render();
									editor.$main.find(".cte-wrap-add").addClass("cte-none");
									});
								});
							editor.$main.find(".cte-wrap-add").append(copyDesign);
							}
						});
					if(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key] == undefined){
						this.$main.find(".cte-left").addClass("cte-none");
						this.$main.find(".cte-right").addClass("cte-none");
						this.$main.find(".cti-layer").prepend(`<option value="-1" selected disabled>no layer selected</option>`);
						this.$main.find(".cti-up").attr({disabled: true});
						this.$main.find(".cti-down").attr({disabled: true});
						this.$main.find(".cti-copy").attr({disabled: true});
						this.$main.find(".cti-delete").attr({disabled: true});
						
						}
					else{
						this.$main.find(".cte-left").removeClass("cte-none");
						$.each(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer, function (i, v){
							let name = "";
                            if (v.type == "image") {
                                name = String(v.child.backgroundImage.url).replace(/^.*[\\\/]/, "");
                                if(name == ""){
									name = "No image";
									}
                            } else {
                                name = v.child.html;
                                if(name == ""){
									name = "No text";
									}
                            }
							editor.$main.find(".cti-layer").prepend(`<option value="${i}" ${(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key == i)?"selected disabled":""}>${name}</option>`);
							});
							(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key == customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer.length-1)?this.$main.find(".cti-up").attr({disabled: true}):this.$main.find(".cti-up").removeAttr("disabled");
							(customTShirt.settings.data.canvas[customTShirt.settings.data.key].key == 0)?this.$main.find(".cti-down").attr({disabled: true}):this.$main.find(".cti-down").removeAttr("disabled");
							this.$main.find(".cti-copy").removeAttr("disabled");
							this.$main.find(".cti-delete").removeAttr("disabled");
							let name = String(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.url).replace(/^.*[\\\/]/, "");
								if(name == ""){
									name = "No image";
									}
							this.$main.find(".cti-backgroundImage-url").val(name);
							let ctiTop = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].top;
							this.$main.find(".cti-top").css({backgroundSize: `${((ctiTop)/1000)*100}% 100%`}).val(ctiTop);
							let ctiLeft = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].left;
							this.$main.find(".cti-left").css({backgroundSize: `${((ctiLeft)/1000)*100}% 100%`}).val(ctiLeft);
							let ctiFilter = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.main;
							ctiFilter = (ctiFilter == "")?"no-filter":ctiFilter;
							this.$main.find(".cti-filter").empty();
								$.each(["no-filter","blur(0.05em)","brightness(200%)", "contrast(200%)", "grayscale(100%)", "hue-rotate(90deg)", "hue-rotate(180deg)", "invert(100%)", "saturate(8)", "sepia(100%)", "contrast(200%) brightness(150%)"], function (i, v){
									editor.$main.find(".cti-filter").append(`<option value="${(v=="no-filter")?"":v}" ${(v==ctiFilter)?"selected disabled":""}>${v}</option>`);
									});
							let colortype = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.type;
								this.$main.find(".cti-colortype").empty();
								$.each(["transparent","normal","linear-gradient", "radial-gradient", "same-parent"], function (i, v){
									editor.$main.find(".cti-colortype ").append(`<option value="${i}" ${(i==colortype)?"selected disabled":""}>${v}</option>`);
									});
							let colormain = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.color[customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.color.length-1];
							this.$main.find(".cti-colormain").val(colormain);
							(colortype == 2 || colortype == 3)?this.$main.find(".cti-coloradd").addClass("cte-icon").removeClass("cte-icon-disabled"):this.$main.find(".cti-coloradd").addClass("cte-icon-disabled").removeClass("cte-icon");
							(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.color.exist)?this.$main.find(".cti-filtercolorexist").children().addClass("ri-toggle-fill").removeClass("ri-toggle-line"):this.$main.find(".cti-filtercolorexist").children().addClass("ri-toggle-line").removeClass("ri-toggle-fill");
							let filtercolormain = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.color.main;
							this.$main.find(".cti-filtercolormain").val(filtercolormain);
							let ctiOpacity = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.opacity;
							(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.transform.scaleX == -1)?this.$main.find(".cti-scalex").children().addClass("ri-toggle-fill").removeClass("ri-toggle-line"):this.$main.find(".cti-scalex").children().addClass("ri-toggle-line").removeClass("ri-toggle-fill");
							(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.transform.scaleY == -1)?this.$main.find(".cti-scaley").children().addClass("ri-toggle-fill").removeClass("ri-toggle-line"):this.$main.find(".cti-scaley").children().addClass("ri-toggle-line").removeClass("ri-toggle-fill");
							this.$main.find(".cti-opacity").css({backgroundSize: `${(ctiOpacity)*100}% 100%`}).val(ctiOpacity);
							this.$main.find(".cti-linear, .cti-radialx, .cti-radialy").attr({disabled: true})
							if(colortype == 2 ){
								this.$main.find(".cti-linear").removeAttr("disabled")
								}
							if(colortype == 3){
								this.$main.find(".cti-radialx").removeAttr("disabled")
								this.$main.find(".cti-radialy").removeAttr("disabled")
								}
							let ctiLinear = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.linear.pos;
							this.$main.find(".cti-linear").css({backgroundSize: `${((ctiLinear+180)/360)*100}% 100%`}).val(ctiLinear);
							let ctiRadialX = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.radial.posX;
							this.$main.find(".cti-radialx").css({backgroundSize: `${((ctiRadialX)/100)*100}% 100%`}).val(ctiRadialX);
							let ctiRadialY = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.radial.posY;
							this.$main.find(".cti-radialy").css({backgroundSize: `${((ctiRadialY)/100)*100}% 100%`}).val(ctiRadialY);
							let ctiRotateX = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].transform.rotateX;
							this.$main.find(".cti-rotatex").css({backgroundSize: `${((ctiRotateX+90)/180)*100}% 100%`}).val(ctiRotateX);
							let ctiRotateY = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].transform.rotateY;
							this.$main.find(".cti-rotatey").css({backgroundSize: `${((ctiRotateY+90)/180)*100}% 100%`}).val(ctiRotateY);
							let ctiRotate = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.transform.rotate;
							this.$main.find(".cti-rotate").css({backgroundSize: `${((ctiRotate+180)/360)*100}% 100%`}).val(ctiRotate);
							let ctiSkew = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.transform.skew;
							this.$main.find(".cti-skew").css({backgroundSize: `${((ctiSkew+88)/176)*100}% 100%`}).val(ctiSkew);
							this.$main.find(".cti-strokecolor").val(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.stroke.color);
							let ctiStrokeWidth = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.stroke.width;
							this.$main.find(".cti-strokewidth").css({backgroundSize: `${((ctiStrokeWidth)/35)*100}% 100%`}).val(ctiStrokeWidth);
							this.$main.find(".cti-outlinecolor").val(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.outline.color);
							let ctiOutlineWidth = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.outline.width;
							this.$main.find(".cti-outlinewidth").css({backgroundSize: `${((ctiOutlineWidth)/35)*100}% 100%`}).val(ctiOutlineWidth);
							this.$main.find(".cti-shadowcolor").val(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.shadow.color);
							let ctiShadowBlur = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.shadow.blur;
							this.$main.find(".cti-shadowblur").css({backgroundSize: `${((ctiShadowBlur)/15)*100}% 100%`}).val(ctiShadowBlur);
							let ctiShadowPosX= customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.shadow.posX;
							this.$main.find(".cti-shadowposx").css({backgroundSize: `${((ctiShadowPosX+350)/700)*100}% 100%`}).val(ctiShadowPosX);
							let ctiShadowPosY= customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.shadow.posY;
							this.$main.find(".cti-shadowposy").css({backgroundSize: `${((ctiShadowPosY+350)/700)*100}% 100%`}).val(ctiShadowPosY);
							this.$main.find(".cti-depthcolor").val(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.depth.color);
							let ctiDepthWidth = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.depth.width;
							this.$main.find(".cti-depthwidth").css({backgroundSize: `${((ctiDepthWidth)/15)*100}% 100%`}).val(ctiDepthWidth);
							this.$main.find(".cti-depthtype").empty();
							let ctiDepthType = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.filter.depth.type;
								$.each(["Top-Left","Top","Top-Right", "Right", "Bottom-Right", "Bottom", "Bottom-Left", "Left"], function (i, v){
									editor.$main.find(".cti-depthtype").append(`<option value="${i}" ${(i==ctiDepthType)?"selected disabled":""}>${v}</option>`);
									});
							if(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].type == "text"){
								this.$main.find(".cte-left").children().eq(0).addClass("cte-none");
								this.$main.find(".cte-left").children().eq(1).removeClass("cte-none");
								this.$main.find(".cte-right").eq(0).addClass("cte-none");
								let family = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.font.family;
								name = ( family != "")?family:"initial";
								this.$main.find(".cti-text-fontfamily").css({fontFamily: name}).val(name);
								this.$main.find(".cti-text-html").css({fontFamily: name}).html(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.html);
								let align = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.textAlign;
								this.$main.find(".cti-text-align").empty();
								$.each(["left","center","right"], function (i, v){
									editor.$main.find(".cti-text-align").append(`<option value="${v}" ${(v==align)?"selected disabled":""}>${v}</option>`);
									});
								let curvetype = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.curve.type;
								this.$main.find(".cti-text-curvetype").empty();
								$.each(["none","sad","smile", "sad-unrotate", "smile-unrotate"], function (i, v){
									editor.$main.find(".cti-text-curvetype ").append(`<option value="${i}" ${(i==curvetype)?"selected disabled":""}>${v}</option>`);
									});
								
								(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.borderBottom)?this.$main.find(".cti-text-borderbottom").addClass("cte-icon").removeClass("cte-icon-disabled"):this.$main.find(".cti-text-borderbottom").addClass("cte-icon-disabled").removeClass("cte-icon");
								(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.font.style != "none")?this.$main.find(".cti-text-fontstyle").addClass("cte-icon").removeClass("cte-icon-disabled"):this.$main.find(".cti-text-fontstyle").addClass("cte-icon-disabled").removeClass("cte-icon");
								(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.font.weight != "normal")?this.$main.find(".cti-text-fontweight").addClass("cte-icon").removeClass("cte-icon-disabled"):this.$main.find(".cti-text-fontweight").addClass("cte-icon-disabled").removeClass("cte-icon");
								let ctiTextFontsize = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.font.size;
								this.$main.find(".cti-text-fontsize").css({backgroundSize: `${(ctiTextFontsize/500)*100}% 100%`}).val(ctiTextFontsize);
								let ctiTextLetterspacing = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.letterSpacing;
								this.$main.find(".cti-text-letterspacing").css({backgroundSize: `${((ctiTextLetterspacing+20)/220)*100}% 100%`}).val(ctiTextLetterspacing);
								let ctiTextLineheight = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.lineHeight;
								this.$main.find(".cti-text-lineheight").css({backgroundSize: `${((ctiTextLineheight-50)/250)*100}% 100%`}).val(ctiTextLineheight);
								let ctiTextBackgroundSizeWidth = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundSize.width;
								this.$main.find(".cti-text-backgroundSizeWidth").css({backgroundSize: `${((ctiTextBackgroundSizeWidth)/100)*100}% 100%`}).val(ctiTextBackgroundSizeWidth);
								let ctiTextBackgroundSizeHeight = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundSize.height;
								this.$main.find(".cti-text-backgroundSizeHeight").css({backgroundSize: `${((ctiTextBackgroundSizeHeight)/100)*100}% 100%`}).val(ctiTextBackgroundSizeHeight);
								let ctiTextCurveDegree = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.curve.degree;
								this.$main.find(".cti-text-curvedegree").css({backgroundSize: `${((ctiTextCurveDegree)/180)*100}% 100%`}).val(ctiTextCurveDegree);
								let ctiTextCurveRound = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.curve.round;
								this.$main.find(".cti-text-curveround").css({backgroundSize: `${((ctiTextCurveRound)/80)*100}% 100%`}).val(ctiTextCurveRound);
								}
							else if(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].type == "image"){
								this.$main.find(".cte-left").children().eq(1).addClass("cte-none");
								this.$main.find(".cte-left").children().eq(0).removeClass("cte-none");
								this.$main.find(".cte-right").eq(1).addClass("cte-none");
								(customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.backgroundImage.natural.exist)?this.$main.find(".cti-backgroundImage-natural").children().addClass("ri-toggle-fill").removeClass("ri-toggle-line"):this.$main.find(".cti-backgroundImage-natural").children().addClass("ri-toggle-line").removeClass("ri-toggle-fill");
								let ctiImageWidth = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.width;
								this.$main.find(".cti-image-width").css({backgroundSize: `${(ctiImageWidth/1000)*100}%  100%`}).val(ctiImageWidth);
								let ctiImageHeight = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.height;
								this.$main.find(".cti-image-height").css({backgroundSize: `${(ctiImageHeight/1000)*100}% 100%`}).val(ctiImageHeight);
								let ctiImageBorderPosW = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.borderRadius.posW;
								this.$main.find(".cti-image-borderRadius-posW").css({backgroundSize: `${(ctiImageBorderPosW/100)*100}% 100%`}).val(ctiImageBorderPosW);
								let ctiImageBorderposX = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.borderRadius.posX;
								this.$main.find(".cti-image-borderRadius-posX").css({backgroundSize: `${(ctiImageBorderposX/100)*100}% 100%`}).val(ctiImageBorderposX);
								let ctiImageBorderposY = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.borderRadius.posY;
								this.$main.find(".cti-image-borderRadius-posY").css({backgroundSize: `${(ctiImageBorderposY/100)*100}% 100%`}).val(ctiImageBorderposY);
								let ctiImageBorderposZ = customTShirt.settings.data.canvas[customTShirt.settings.data.key].layer[customTShirt.settings.data.canvas[customTShirt.settings.data.key].key].child.borderRadius.posZ;
								this.$main.find(".cti-image-borderRadius-posZ").css({backgroundSize: `${(ctiImageBorderposZ/100)*100}% 100%`}).val(ctiImageBorderposZ);
								}
					
						}
					
					}
					
				};
			return Editor;
			})();
			if(more){
				let editor = new Editor(this);
				editor["customTShirt"] = customTShirt;
				return editor;
				}
			else{
				return this.each(function(){
			        new Editor(this);
			       });
				}
		
		}
	})(jQuery);
	
	
	