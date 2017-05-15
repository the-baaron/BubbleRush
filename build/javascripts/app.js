var GAME=GAME||{};GAME.helpers={getRunningTime:function(){return Math.round((new Date).getTime()/1e3)-GAME.startedAt},randomFromArray:function(e){return e[Math.floor(Math.random()*e.length)]},getWindowSize:function(){return{width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}},isTouchDevice:function(){return/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)},percentageToValue:function(e,t){return"string"==typeof e?(e=e.replace("%",""))*(t/100):e<=1?(e*=100)*(t/100):e}};var GAME=GAME||{};GAME.draw={bubble:function(e){if(e.layer!==undefined)var t=GAME.layer[e.layer].group();else var t=GAME.layer.bubbles.group();var a=e.fill,l=e.radius/6,i=GAME.stage.gradient("radial",function(e){e.at({offset:0,color:"#ffffff",opacity:.25}),e.at({offset:.3,color:"#ffffff",opacity:0})}),r=GAME.stage.gradient("radial",function(e){e.at({offset:0,color:"#ffffff",opacity:.32252038}),e.at({offset:.4,color:"#bcbcbc",opacity:0}),e.at({offset:1,color:"#000000",opacity:.477779665})}),n=GAME.stage.gradient("radial",function(e){e.at({offset:.6,color:"#ffffff",opacity:.2}),e.at({offset:.8,color:a,opacity:.1}),e.at({offset:1,color:a,opacity:0})});i.from(.24,.24).to(.1,.1),r.from(.2,.2).to(.5,.5),t.circle(e.radius+2*l).attr({fill:n}).x(-l).y(-l).addClass("glow"),t.circle(e.radius).attr({fill:a}),t.circle(e.radius).attr({fill:r}),t.circle(e.radius-2).stroke({color:"#000000",opacity:.1,width:1}).attr({fill:"transparent"}).x(1).y(1),t.circle(e.radius).attr({fill:i}),e.text!==undefined&&(text=t.text(e.text),text.font({family:"comfortaa",anchor:"middle",size:20,fill:"#000",opacity:.4}),text.move(e.radius/2,e.radius/2-10));var s=GAME.helpers.percentageToValue(e.x,GAME.helpers.getWindowSize().width)+l,o=GAME.helpers.percentageToValue(e.y,GAME.helpers.getWindowSize().height)+l;return t.cx(s).cy(o),t},clickEffect:function(e,t,a){var l=500,i=a.radius/183,r=GAME.layer.background.group().addClass("effect"),n=r.group().move(-14,-14).stroke({color:a.fill,opacity:1,width:1}).attr({fill:"transparent"}),s=(r.circle(155).stroke({color:a.fill,opacity:.8,width:3}).attr({fill:"transparent"}),r.group().move(15,15).stroke({color:a.fill,opacity:.5,width:1}).attr({fill:"transparent"}));n.clear(),n.path("M1.21505267,182.492054 M90.9920541,92.7150527 C90.3469947,142.008549 50.5085486,181.846995 1.21505275,182.492054").rotate(90),n.path("M92.7150527,90.9920541 M182.492054,1.21505267 C181.846995,50.5085486 142.008549,90.3469947 92.7150528,90.992054").rotate(-90),s.path("M62.502809,122.055461 M122.055461,62.502809 C121.4141,95.104616 95.104616,121.4141 62.5028093,122.05546"),s.path("M1.21908805,60.7717397 M60.7717397,1.21908805 C60.130379,33.8208951 33.8208951,60.130379 1.21908835,60.7717394").rotate(180);var e=GAME.helpers.percentageToValue(a.x,GAME.helpers.getWindowSize().width),t=GAME.helpers.percentageToValue(a.y,GAME.helpers.getWindowSize().height);r.cx(e).cy(t),n.animate({duration:l,ease:">"}).rotate(180),s.animate({duration:l,ease:">"}).rotate(-180),r.scale(i).animate({duration:l,ease:">"}).scale(i+.4).opacity(0).afterAll(function(){this.stop(),this.off(),this.remove()})},updateScore:function(e){GAME.score=GAME.score+e,GAME.elements.gamescore.text(String(GAME.score))},updateLives:function(){GAME.elements.lives===undefined&&(GAME.elements.lives=GAME.layer["interface"].group());for(var e=0;GAME.elements.lives[e]!==undefined;)e++;GAME.lives<e&&(GAME.elements.lives[e-1].animate().scale(4).opacity(0).afterAll(function(){this.stop(),this.off(),this.remove()}),delete GAME.elements.lives[e-1]);for(var t=0;t<GAME.lives;t++)if(GAME.elements.lives[t]===undefined){var a=17+12*t;GAME.elements.lives[t]=GAME.draw.bubble({x:a,y:17,radius:15,fill:"#d90368",layer:"interface"})}},background:function(){GAME.elements.background=GAME.layer.background.group();var e=GAME.stage.gradient("linear",function(e){e.at(0,"#021E32"),e.at(.136937978,"#02253D"),e.at(.349170918,"#5A0252"),e.at(.625936703,"#8F002B"),e.at(.793785874,"#BF0000"),e.at(1,"#C04300")});e.from(0,0).to(0,1),GAME.elements.background.rect().attr({fill:e,x:0,y:0,width:"100%",height:"1000%"});var t,a,l,i=document.createElement("canvas"),r=i.getContext("2d");i.height=5*GAME.helpers.getWindowSize().height,i.width=GAME.helpers.getWindowSize().width;for(var n=0;n<1600;n++)t=Math.random()*i.width,a=Math.random()*i.height,l=Math.random()*(1.5*(1-a/i.height)),console.log(a,l),r.beginPath(),r.fillStyle="#ffffff",r.globalAlpha=1-a/i.height,r.arc(t,a,l,0,2*Math.PI),r.fill();GAME.elements.background.image(i.toDataURL()).size(i.width,i.height)},message:function(e,t,a){function l(e){e.blend(e.source,e.offset(0,0)["in"](e.sourceAlpha).gaussianBlur(24))}function i(e){e.blend(e.source,e.gaussianBlur(4))}GAME.messageVisible?(e&&GAME.elements.messageTxt1.text(String(e)),t&&GAME.elements.messageTxt2.text(String(t)),a&&GAME.elements.messageTxt3.text(String(a))):(GAME.messageVisible=!0,GAME.elements.message=GAME.layer["interface"].group(),e&&(GAME.elements.messageTxt1=GAME.elements.message.text(String(e)),GAME.elements.messageTxt1.font({family:"comfortaa",anchor:"middle",size:126,fill:"#ffd131"}),GAME.elements.messageTxt1.move("50%",0)),t&&(GAME.elements.messageTxt2=GAME.elements.message.text(String(t)),GAME.elements.messageTxt2.font({family:"comfortaa",anchor:"middle",size:38,fill:"#ffffff"}),GAME.elements.messageTxt2.move("50%",116)),a&&(GAME.elements.messageTxt3=GAME.elements.message.text(String(a)),GAME.elements.messageTxt3.font({family:"comfortaa",anchor:"middle",size:38,fill:"#ffffff"}),GAME.elements.messageTxt3.move("50%",154)),GAME.elements.message.filter(l),GAME.elements.message.filter(i),GAME.elements.message.y(80),GAME.elements.message.scale(.1).animate({duration:200,ease:">"}).scale(1)),clearTimeout(GAME.messageTimer),GAME.messageTimer=setTimeout(function(){GAME.messageVisible=!1,GAME.elements.message.animate({duration:200,ease:"<"}).scale(0)},500)}};var GAME=GAME||{};GAME.controller={bubble:function(e){function t(){a.stop(),a.off(),a.remove(),l||(GAME.controller.dead(),!1!==e.countMe&&GAME.visibleBubbles--),!1!==e.countMe&&0==GAME.visibleBubbles&&(GAME.lives=0,GAME.controller.dead())}var a=GAME.draw.bubble(e);!1!==e.countMe&&GAME.visibleBubbles++;var l=!1;a.animate({duration:e.levelOptions.bubbleTime,ease:"<"}).scale(0).afterAll(t),a.on(GAME.touchEvent,function(i){if(!l){l=!0,e.type!==undefined&&"life"===e.type&&(GAME.lives++,GAME.draw.message("+1","extra life"),GAME.draw.updateLives());var r=e.levelOptions.pointsPerBubble;GAME.doubleCheck.push(i.timeStamp/100),!1!==e.countMe&&(GAME.bubblesHit++,setTimeout(function(){GAME.doubleCheck=[]},50),GAME.doubleCheck.length>=2&&(GAME.streakLength++,GAME.streakLength<5?GAME.draw.message(null,"Double hit",null):GAME.streakLength<20?GAME.draw.message(GAME.streakLength+"x","Double hit","streak"):GAME.streakLength<50?GAME.draw.message(GAME.streakLength+"x","Double hit","super streak"):GAME.streakLength<100?GAME.draw.message(GAME.streakLength+"x","Double hit","mega streak"):GAME.draw.message(GAME.streakLength+"x","Double hit","insane streak"),clearTimeout(GAME.streakTimer),GAME.streakTimer=setTimeout(function(){GAME.streakLength=0},1500)),GAME.streakLength>0&&(r*=GAME.streakLength),GAME.visibleBubbles--),GAME.draw.updateScore(r),GAME.game.newBubble(),a.stop(),t(),GAME.draw.clickEffect(e.x,e.y,e,a)}})},dead:function(){GAME.lives>0?(GAME.lives--,GAME.draw.updateLives()):GAME.gameOver()}};var GAME=GAME||{};GAME.general={init:function(){GAME.helpers.isTouchDevice()?(console.log("touch"),GAME.touchEvent="touchstart"):(console.log("nietTouch"),GAME.touchEvent="click"),GAME.view.menu(),GAME.general.addEventListeners()},addEventListeners:function(){window.addEventListener("resize",GAME.view.resize)}};var GAME=GAME||{};GAME.view=GAME.view||{},GAME.view.menu=function(e){var t="Begin";e!==undefined&&(t="Again"),GAME.elements.startBtn=GAME.draw.bubble({x:"50%",y:"60%",radius:120,fill:"#00FFFB",text:t,layer:"interface"}),GAME.draw.background(),GAME.elements.startBtn.scale(.1).opacity(0).animate({duration:500,ease:">",delay:500}).scale(1).opacity(1),GAME.elements.startBtn.on(GAME.touchEvent,function(){GAME.elements.startBtn.animate({duration:100,ease:">"}).scale(.1).opacity(0).after(function(){this.stop(),this.off(),this.remove()}),GAME.game.init()})};var GAME=GAME||{};GAME.game={options:{levels:{1:{bubbleColor:"#FFA69E",totalBubbles:1,pointsPerBubble:1,bubbleSize:200,bubblesNeeded:10,bubbleTime:5e6,minimumDistance:300},2:{bubbleColor:"#44CCFF",totalBubbles:2,pointsPerBubble:6,bubbleSize:150,bubblesNeeded:50,bubbleTime:5e3,minimumDistance:300},3:{bubbleColor:"#FFD131",totalBubbles:2,pointsPerBubble:7,bubbleSize:125,bubblesNeeded:100,bubbleTime:5e3,minimumDistance:250,extra:["life"]},4:{bubbleColor:"#E62C10",totalBubbles:2,pointsPerBubble:8,bubbleSize:125,bubblesNeeded:200,bubbleTime:2500,minimumDistance:200},5:{bubbleColor:"#36B74A",totalBubbles:2,pointsPerBubble:9,bubbleSize:112,bubblesNeeded:250,bubbleTime:2e3,minimumDistance:150},6:{bubbleColor:"#FFA69E",totalBubbles:2,pointsPerBubble:20,bubbleSize:110,bubblesNeeded:5e4,bubbleTime:2e3,minimumDistance:100}}},init:function(){function e(e){e.blend(e.source,e.gaussianBlur(2))}GAME.layer.bubbles.clear(),GAME.layer["interface"].clear(),GAME.draw.updateLives(),GAME.score=0,GAME.level=1,GAME.lives=3,GAME.startedAt=Math.round((new Date).getTime()/1e3),GAME.game.newBubble(),GAME.elements.gamescore=GAME.layer["interface"].text(String(GAME.score)),GAME.elements.gamescore.font({family:"comfortaa",anchor:"end"}),GAME.elements.gamescore.move(window.innerWidth-20,20),GAME.elements.gamescore.fill("#43E68A"),GAME.elements.gamescore.filter(e)},newBubble:function(){function e(){return{x:20+Math.random()*(GAME.helpers.getWindowSize().width-40),y:20+Math.random()*(GAME.helpers.getWindowSize().height-40)}}var t=GAME.game.options.levels[GAME.level];t.bubblesNeeded<=GAME.bubblesHit&&(GAME.level++,t=GAME.game.options.levels[GAME.level],GAME.bubblesHit=0,GAME.draw.message(null,"Next level!"),GAME.elements.background.animate({duration:1e4,ease:"<>"}).move(0,-window.innerHeight*GAME.level),console.log("You got to level "+GAME.level+"!"),t.extra!==undefined&&GAME.game.addExtra(t.extra,t));var a,l,i,r,n,s;for(t.totalBubbles;GAME.visibleBubbles<t.totalBubbles;){r=GAME.layer.bubbles.node.childNodes,n=[],s=e();for(var o=0;o<r.length;o++)a=r[o].attributes.transform.nodeValue,a=a.replace("matrix(","").replace(")",""),l=new SVG.Matrix(a),i=l.extract(),n.push({x:i.x+t.bubbleSize/2,y:i.y+t.bubbleSize/2});n.shift();for(var o=0;o<n.length;o++)for(tries=0,placed=!1;!placed;)tries++,console.log("TRY: ",tries),Math.abs(n[o].x-s.x)<t.minimumDistance/(.25*tries)&&Math.abs(n[o].y-s.y)<t.minimumDistance/(.25*tries)?s=e():placed=!0;GAME.controller.bubble({x:s.x,y:s.y,radius:t.bubbleSize,fill:t.bubbleColor,levelOptions:t})}},addExtra:function(e,t){setTimeout(function(){for(var a=0;a<e.length;a++)console.log(e[a]+" added"),"life"===e[a]&&GAME.controller.bubble({x:5+90*Math.random()+"%",y:5+90*Math.random()+"%",radius:55,countMe:!1,fill:"#D90368",layer:"interface",levelOptions:t,type:e[a]})},3e3)}};var GAME=GAME||{};GAME.view=GAME.view||{},GAME.gameOver=function(){var e=120;GAME.score<1e4?e=140:GAME.score>99999&&(e=96),clearInterval(GAME.interval),GAME.layer.bubbles.clear(),GAME.layer["interface"].clear(),GAME.elements.scoreTxt=GAME.layer["interface"].text("You scored"),GAME.elements.scoreTxt.font({family:"comfortaa",size:36,anchor:"middle"}),GAME.elements.scoreTxt.move("50%","20%"),GAME.elements.scoreTxt.fill("#fff"),GAME.elements.score=GAME.layer["interface"].text(String(GAME.score)),GAME.elements.score.font({family:"comfortaa",size:e,anchor:"middle"}),GAME.elements.score.move("50%","25%"),GAME.elements.score.fill("#fff"),GAME.view.menu(!0)};var GAME=GAME||{};GAME.stage=SVG("stage"),GAME.elements={},GAME.level=0,GAME.lives=3,GAME.score=0,GAME.visibleBubbles=0,GAME.bubblesHit=0,GAME.messageVisible=!1,GAME.doubleCheck=[],GAME.streakLength=0,GAME.layer={},GAME.layer.background=GAME.stage.group(),GAME.layer.bubbles=GAME.stage.group(),GAME.layer["interface"]=GAME.stage.group(),GAME.layer.background.addClass("background"),GAME.layer.bubbles.addClass("bubbles"),GAME.layer["interface"].addClass("interface"),GAME.colors=["#31E981","#FFD131","#E4572E","#44CCFF","#D90368","#17BEBB","#A2D729"],GAME.general.init();