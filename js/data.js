const link = {
	region: {
		www: {
			production: `${window.location.origin}/p/production.html`,
			cart: `${window.location.origin}/p/cart.html`,
			order: `${window.location.origin}/p/order.html`,
			contact: `${window.location.origin}/p/contact.html`,
			}
		}
	}

const local = {
	region: {
		www: {
			country: ["Australia", "Canada", "USA"],
			marketplace: ["Amazon", "Etsy", "Walmart"]
			}
		}
	}

const price = {
	region: {
		www: {
			currency: function(num){
				return currency(num, {separator:',', symbol:'$', precision:2}).format()
				}
			}
		}
	}

const color = JSON.parse(`{
	"white":"#fefefe",
	"mint":"#aaf0d1",
	"heather-grey":"#b8bcbb",
	"carolina-blue":"#90b4e4",
	"neon-orange":"#fc7935",
	"neon-green":"#b0ec7b",
	"hi-light-yellow":"#d0f06b",
	"electric-green":"#16ab6b",
	"lime":"#8dd60b",
	"yellow":"#fff112",
	"gold":"#fbd103",
	"azalea":"#ec78a7",
	"hot-pink":"#d50573",
	"turquoise":"#3a97d2",
	"neon-blue":"#0074cb",
	"royal":"#0a45bb",
	"navy":"#032a47",
	"true-red":"#e23137",
	"cardinal":"#aa0639",
	"maroon":"#6a123c",
	"orange":"#F55203",
	"kelly-green":"#2a8b22",
	"dk-green":"#114632",
	"purple":"#50007d",
	"charcoal":"#55595a",
	"black":"#282f35",
	"indigo-blue":"#677fa5",
	"tropical-blue":"#0095a9"
	}`);

const type = JSON.parse(`{
	"tshirt":{
		"image": {
			"front": {
				"top": "https://cdn.jsdelivr.net/gh/surotshirt/surotshirt@v1.0.0/image/tshirt-dpn-min.png",
				"bottom": "https://cdn.jsdelivr.net/gh/surotshirt/surotshirt@v1.0.2/images/tshirt-dpn-bg.png"
				},
			"back": {
				"top": "https://cdn.jsdelivr.net/gh/surotshirt/surotshirt@v1.0.2/images/tshirt-blk-min.png",
				"bottom": "https://cdn.jsdelivr.net/gh/surotshirt/surotshirt@v1.0.2/images/tshirt-blk-bg.png"
				}
			},
		"region": {
			"www": {
				"price": 12.99,
				"description": "This soft, comfortable, and breathable 100% cotton t-shirt is perfect for everyday wear. With a relaxed fit and a crew neck, it's great for lounging around the house, running errands, or going out with friends. The high-quality print will not fade or crack."
				}
			}
		},
	"tshirt-long-sleeve":{
		"image": {
			"front": {
				"top": "https://cdn.jsdelivr.net/gh/surotshirt/surotshirt@v1.0.2/images/tshirt-long-dpn-min.png",
				"bottom": "https://cdn.jsdelivr.net/gh/surotshirt/surotshirt@v1.0.2/images/tshirt-long-dpn-bg.png"
				},
			"back": {
				"top": "https://cdn.jsdelivr.net/gh/surotshirt/surotshirt@v1.0.2/images/tshirt-long-blk-min.png",
				"bottom": "https://cdn.jsdelivr.net/gh/surotshirt/surotshirt@v1.0.2/images/tshirt-long-blk-bg.png"
				}
			},
		"region": {
			"www": {
				"price": 16.99,
				"description": "This cool graphic t-shirt is made of 100% cotton and features a high-quality print. It is available in a variety of sizes and colors, so you can find the perfect one for you. Whether you're looking for a t-shirt to wear to the beach, to the gym, or just around town, this is a great option."
				}
			}
		},
	"hoodie":{
		"image": {
			"front": {
				"top": "https://cdn.jsdelivr.net/gh/surotshirt/surotshirt@v1.0.2/images/hoodie-dpn-min.png",
				"bottom": "https://cdn.jsdelivr.net/gh/surotshirt/surotshirt@v1.0.2/images/hoodie-dpn-bg.png"
				},
			"back": {
				"top": "https://cdn.jsdelivr.net/gh/surotshirt/surotshirt@v1.0.2/images/hoodie-blk-min.png",
				"bottom": "https://cdn.jsdelivr.net/gh/surotshirt/surotshirt@v1.0.2/images/hoodie-blk-bg.png"
				}
			},
		"region": {
			"www": {
				"price": 23.99,
				"description": "This cool graphic t-shirt is made of 100% cotton and features a high-quality print. It is available in a variety of sizes and colors, so you can find the perfect one for you. Whether you're looking for a t-shirt to wear to the beach, to the gym, or just around town, this is a great option."
				}
			}
		}
	}`);

	
const size = JSON.parse(`{
	"extra-small": {
		"region": {
			"www": {
				"price": 0,
				"description":""
				}
			}
		},
	"small": {
		"region": {
			"www": {
				"price": 3,
				"description":""
				}
			}
		},
	"medium": {
		"region": {
			"www": {
				"price": 3,
				"description":"Details:</li><li><ul></li><li>Size: medium</li><li>Chest size: 38-40 inches</li><li>Waist size: 30-32 inches</li><li>Hip size: 36-38 inches</li><li>Length: 28 inches</li><li>Width: 18 inches</li><li>Weight: 6 ounces</li><li>Print: High-quality print that will not fade or crack</li></ul>"
				}
			}
		},
	"large": {
		"region": {
			"www": {
				"price": 3,
				"description":""
				}
			}
		},
	"extra-large": {
		"region": {
			"www": {
				"price": 3.5,
				"description":""
				}
			}
		},
	"2-extra-large": {
		"region": {
			"www": {
				"price": 4,
				"description":""
				}
			}
		},
	"3-extra-large": {
		"region": {
			"www": {
				"price": 4.5,
				"description":""
				}
			}
		}
	}`);

const print = JSON.parse(`{
	"region":{
		"www": {
			"price": 0.0000046875
			}
		}
	}`);

	
let product = JSON.parse(`{
	"64b7dee69d312622a381aa03":{"name": "White Tshirt","type":"tshirt","size":"medium","print":0,"color":"white","image":["https://i.ibb.co/r79xnLd/53a5e7ae2d41.webp","https://i.ibb.co/k8dd8v6/28c6445b6cab.webp"],"keyword":"plain polos","quantity":1},
	"64b7edd39d312622a381b034":{"name":"Orange Tshirt","type":"tshirt","size":"medium","print":0,"color":"neon-orange","image":["https://i.ibb.co/ZTQS5nD/5e4881bed2d3.webp","https://i.ibb.co/0Xj01hb/ae0c563d139c.webp"],"keyword":"plain polos","quantity":1},
	"64bbba35b89b1e2299c271c8":{"name":"Tshirt cute monster","type":"tshirt","size":"medium","print":94253.88785046729,"color":"mint","image":["https://i.ibb.co/nmwkmwG/a00045a63f3a.webp","https://i.ibb.co/xY4MC6B/c3429f54e09a.webp"],"keyword":"Mint monster cute lucu","quantity":1}
	}`);