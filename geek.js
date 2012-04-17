$(function(){
var FONT_MIN=17;
var w3c=!$.browser.msie || $.browser.version>8;
var keys=[
    {title:"fraction",data:FractionExp,des:"²åÈë·ÖÊ½"},
    {title:"radical",data:RadicalExp,des:"²åÈë¸ùÊ½"},
    {title:"corner",data:CornerExp,des:"²åÈë½Ç±ê"},

    {title:"alpha",data:"¦¡",des:"Ï£À°×ÖÄ¸:°¢¶û·¨"},
    {title:"beta",data:"¦¢",des:"Ï£À°×ÖÄ¸:±´Ëþ"},
    {title:"gamma",data:"¦£",des:"Ï£À°×ÖÄ¸:Ù¤Âí"},
    {title:"delta",data:"¦¤",des:"Ï£À°×ÖÄ¸:µÂ¶ûËþ"},
    {title:"epsilon",data:"¦¥",des:"Ï£À°×ÖÄ¸:ÒÁÆÕÎ÷Áú"},
    {title:"zeta",data:"¦¦",des:"Ï£À°×ÖÄ¸:½ØËþ"},
    {title:"eta",data:"¦§",des:"Ï£À°×ÖÄ¸:°¬Ëþ"},
    {title:"thet",data:"¦¨",des:"Ï£À°×ÖÄ¸:Î÷Ëþ"},
    {title:"iot",data:"¦©",des:"Ï£À°×ÖÄ¸:Ô¼Ëþ"},
    {title:"kappa",data:"¦ª",des:"Ï£À°×ÖÄ¸:¿¨ÅÁ"},
    {title:"lambda",data:"¦«",des:"Ï£À°×ÖÄ¸:À¼²¼´ï"},
    {title:"mu",data:"¦¬",des:"Ï£À°×ÖÄ¸:çÑ"},
    {title:"nu",data:"¦­",des:"Ï£À°×ÖÄ¸:Å¦"},
    {title:"xi",data:"¦®",des:"Ï£À°×ÖÄ¸:¿ËÎ÷"},
    {title:"omicron",data:"¦¯",des:"Ï£À°×ÖÄ¸:°ÂÃÜ¿ËÈÖ"},
    {title:"pi",data:"¦°",des:"Ï£À°×ÖÄ¸:ÅÉ"},
    {title:"rho",data:"¦±",des:"Ï£À°×ÖÄ¸:Èâ"},
    {title:"sigma",data:"¦²",des:"Ï£À°×ÖÄ¸:Î÷¸ñÂí"},
    {title:"tau",data:"¦³",des:"Ï£À°×ÖÄ¸:Ì×"},
    {title:"upsilon",data:"¦´",des:"Ï£À°×ÖÄ¸:ÓîÆÕÎ÷Áú"},
    {title:"phi",data:"¦µ",des:"Ï£À°×ÖÄ¸:·ð°®"},
    {title:"chi",data:"¦¶",des:"Ï£À°×ÖÄ¸:Î÷"},
    {title:"psi",data:"¦·",des:"Ï£À°×ÖÄ¸:ÆÕÎ÷"},
    {title:"omega",data:"¦¸",des:"Ï£À°×ÖÄ¸:Å·Ã×Ù¤"},

    {title:"alpha",data:"¦Á",des:"Ï£À°×ÖÄ¸:°¢¶û·¨"},
    {title:"beta",data:"¦Â",des:"Ï£À°×ÖÄ¸:±´Ëþ"},
    {title:"gamma",data:"¦Ã",des:"Ï£À°×ÖÄ¸:Ù¤Âí"},
    {title:"delta",data:"¦Ä",des:"Ï£À°×ÖÄ¸:µÂ¶ûËþ"},
    {title:"epsilon",data:"¦Å",des:"Ï£À°×ÖÄ¸:ÒÁÆÕÎ÷Áú"},
    {title:"zeta",data:"¦Æ",des:"Ï£À°×ÖÄ¸:½ØËþ"},
    {title:"eta",data:"¦Ç",des:"Ï£À°×ÖÄ¸:°¬Ëþ"},
    {title:"thet",data:"¦È",des:"Ï£À°×ÖÄ¸:Î÷Ëþ"},
    {title:"iot",data:"¦É",des:"Ï£À°×ÖÄ¸:Ô¼Ëþ"},
    {title:"kappa",data:"¦Ê",des:"Ï£À°×ÖÄ¸:¿¨ÅÁ"},
    {title:"lambda",data:"¦Ë",des:"Ï£À°×ÖÄ¸:À¼²¼´ï"},
    {title:"mu",data:"¦Ì",des:"Ï£À°×ÖÄ¸:çÑ"},
    {title:"nu",data:"¦Í",des:"Ï£À°×ÖÄ¸:Å¦"},
    {title:"xi",data:"¦Î",des:"Ï£À°×ÖÄ¸:¿ËÎ÷"},
    {title:"omicron",data:"¦Ï",des:"Ï£À°×ÖÄ¸:°ÂÃÜ¿ËÈÖ"},
    {title:"pi",data:"¦Ð",des:"Ï£À°×ÖÄ¸:ÅÉ"},
    {title:"rho",data:"¦Ñ",des:"Ï£À°×ÖÄ¸:Èâ"},
    {title:"sigma",data:"¦Ò",des:"Ï£À°×ÖÄ¸:Î÷¸ñÂí"},
    {title:"tau",data:"¦Ó",des:"Ï£À°×ÖÄ¸:Ì×"},
    {title:"upsilon",data:"¦Ô",des:"Ï£À°×ÖÄ¸:ÓîÆÕÎ÷Áú"},
    {title:"phi",data:"¦Õ",des:"Ï£À°×ÖÄ¸:·ð°®"},
    {title:"chi",data:"¦Ö",des:"Ï£À°×ÖÄ¸:Î÷"},
    {title:"psi",data:"¦×",des:"Ï£À°×ÖÄ¸:ÆÕÎ÷"},
    {title:"omega",data:"¦Ø",des:"Ï£À°×ÖÄ¸:Å·Ã×Ù¤"}
];
/////////tools////////////////////////////////////////////////////////////////
/**
    ÐÞ¸ÄÒ»¸öÀàµÄÔ­ÐÍÁ´£¬ÊµÏÖÃæÏòÔ­ÐÍµÄ¼Ì³Ð
    @param origClass:ÒªÐÞ¸ÄµÄÀà
    @param protoMethods:ÒªÔÚprotoytpeÉÏÌí¼ÓµÄ·½·¨ºÍÊôÐÔ
    @param protoLink:protoytpeµÄÖ¸Ïò£¨Ò²¾ÍÊÇorigClassµÄ»ùÀà£©,Ä¬ÈÏÎªObject.prototype
*/
function buildProto(origClass,protoObject,protoLink){
    var agencyObject;
    if ( protoLink == null ) {
        agencyObject = protoObject;
    } else {
        var AgencyClass = function() {};
        AgencyClass.prototype = protoLink.prototype;
        agencyObject = new AgencyClass();
        for ( var item in protoObject ) {
            agencyObject[item] = protoObject[item];
        }
    }
    origClass.prototype = agencyObject;
    origClass.prototype.base = protoLink;
    origClass.prototype.constructor = origClass;
}
/**
    Selection ¼òµ¥µÄÑ¡Ôñ¿ØÖÆ
*/
if(w3c){
    var Selection={
        getRange:function(){
            var selObj = window.getSelection();  
            var range  = selObj.getRangeAt(0);
            return range;
        },
        select:function(node,start,end){
            var sel = window.getSelection();
            sel.removeAllRanges();
            var range = document.createRange();
            var dest=node.childNodes[0];
            
            if(typeof start=="undefined"){
                start=0;
                end=0;
            }
            if(start==-1){
                start=dest.length;
            }
            if(typeof end=="undefined"){
                end=start;
            }
            range.setStart(dest,start);
            range.setEnd(dest,end);
            sel.addRange(range);
        }
    }
}else{
    var Selection={
        getRange:function(){
            var range = document.selection.createRange();
            var rangeRuler=range.duplicate();
            var node=range.parentElement();
            rangeRuler.moveToElementText(node);
            rangeRuler.collapse(true);
            
            rangeRuler.setEndPoint('EndToStart', range);
            var startOffset=rangeRuler.text.length;
            rangeRuler.setEndPoint('EndToEnd', range);
            var endOffset=rangeRuler.text.length;
            
            return{
                startOffset:startOffset,
                endOffset:endOffset
            };
        },
        select:function(node,start,end){
            var dest=node.childNodes[0];
            if(typeof start=="undefined"){
                start=0;
                end=0;
            }
            if(start==-1){
                start=dest.length;
            }
            if(typeof end=="undefined"){
                end=start;
            }
            var range  = document.selection.createRange();
            range.moveToElementText(node);
            range.collapse(true);
            range.moveStart('character',start);
            range.moveEnd('character',end-start);
            range.select();
        }
    }
}
////////use VML for ie and SVG for the rest ///////////////////
if(w3c)
    var getSymbol=createSymbol;
else
    var getSymbol=createSymbolIE;
//////////////////////event support//////////////////////
if(!w3c){
    function w3cEvent(e){
        this.event=e;
        this.target=e.srcElement;
        this.keyCode=e.keyCode;
    }
    buildProto(w3cEvent,{
        preventDefault:function(){this.event.returnValue=false;},
        stopPropagation:function(){this.event.cancelBubble=true;}
    });
}
function bindEvent(elem,type,callBack,option){
    option=$.extend({
        refuseBubble:false
    },option||{});
    if(w3c){
        elem.addEventListener(type,function(e){
            if(option.refuseBubble && $(e.target).closest(".exp")[0]!=e.currentTarget)
                return;
            callBack.call(option.scope||elem,e);
        });
    }else{
        elem.attachEvent("on"+type,function(){
            if(option.refuseBubble && $(event.srcElement).closest(".exp")[0]!=elem)
                return;
            callBack.call(option.scope||elem,new w3cEvent(window.event));
        });
    }
}
function removeEvent(elem,type,callBack){
    if(w3c){
        elem.removeEventListener(type,callBack);
    }else{
        elem.detachEvent(type,callBack);
    }
}
//////Fomula////////////////////////////////////////////////
window.Fomula=function(anchor,data){
    this.anchor=anchor;
    this.root=moduleReader(data);
    this.root.parent=this;
    this.focusExp=null;
}
buildProto(Fomula,{
    refresh:function(){
        var size=this.root.getSize();
        $(this.anchor).html(this.root.render(size));
    }
});
/////////////base////////////////////////////////////////////////////
var Exp=function(children){
    this.children=[];
    if(children){
        for(var i=0,il=children.length;i<il;i++){
            var child=children[i];
            if(!child)
                child=new LinerExp([]);
            this.children[i]=child;
            child.parent=this;
        }
    }
    this.ele=$('<span class="exp"></span>');
    this.height=0;
    this.baseline=0;
}
buildProto(Exp,{
    getSize:function(){
        var max=FONT_MIN;
        for(var i=this.children.length-1;i>=0;i--){
            var childSize=this.children[i].getSize();
            if(max<childSize)
                max=childSize;
        }
        return max;
    }
});

var ExpCtrl=function(exp){
    this.exp=exp;
    var ele=exp.ele[0];
    //²»¿ÉÒÔÊ¹ÓÃjquery.bind,ÔÚÖØÐÂäÖÈ¾µÄÊ±ºò»á±»Ë¢µô
    bindEvent(ele,"mouseover",this.mouseover,{refuseBubble:true,scope:this});
    bindEvent(ele,"mouseout",this.mouseout,{refuseBubble:true,scope:this});
    bindEvent(ele,"mousedown",this.mousedown,{refuseBubble:true,scope:this});
    bindEvent(ele,"keydown",this.keydown,{refuseBubble:true,scope:this});
    bindEvent(ele,"keyup",this.keyup,{refuseBubble:true,scope:this});
}
buildProto(ExpCtrl,{
    /**É¾³ýÒ»¸ö×Ó½Úµã£¬Í¨³£½ö½öÊÇ½«ÆäÇå¿Õ**/
    removeChild:function(child){
        var childIndex=this.index(child);
        child.remove();
        var newLiner=new LinerExp([]);
        this.exp.children[childIndex]=newLiner
        newLiner.parent=this.exp;
        this.root().refresh();
        newLiner.children[0].ctrl.select();
    },
    /**É¾³ýµ±Ç°½Úµã¼°Æä×ÓËï½Úµã**/
    remove:function(){
        for(var i=0,il=this.exp.children.length;i<il;i++){
            this.exp.children[i].ctrl.remove();
        }
        this.exp.children=null;
    },
    root:function(){
        var parent=this.exp.parent;
        while(!(parent instanceof Fomula)){
            parent=parent.parent;
        } 
        return parent;
    },
    parent:function(){
        if(this.exp.parent)
            return this.exp.parent.ctrl;
        return null;
    },
    next:function(){// next brother
        var parent=this.parent();
        if(!parent) return null;
        var index=this.index();
        if(index==parent.exp.children.length-1) return null;
        return parent.child(index+1);
    },
    prev:function(){// previous brother
        var parent=this.parent();
        if(!parent) null;
        var index=this.index();
        if(index==0) return null;
        return parent.child(index-1);
    },
    index:function(child){
        // the index of current experssion
        if(arguments.length==0){
            return this.exp.parent?this.parent().index(this):0;
        }
        // the index of a child matchs specific expression
        if(child instanceof ExpCtrl)
            child=child.exp;
        for(var i=this.exp.children.length-1;i>=0;i--){
            if(this.exp.children[i]==child)
                break;
        }
        return i;
    },
    child:function(index){// the nth-child [to be override]
        if(index>=0){
            if(this.exp.children.length>index)
                return this.exp.children[index].ctrl;
            return null;
        }
        if(-index<this.exp.children.length)
            return this.exp.children[this.exp.children.length+index].ctrl;
        return null;
    },
    select:function(cursor){
        if(this.exp.ele.attr("contenteditable")!="true"){
            Agent.delegate(this);
        }else{
            this.exp.ele.focus();
            if(cursor==-1)
                Selection.select(this.exp.ele[0],-1);
        }
    },
    mouseover:function(e){
        this.exp.ele.addClass("hover");
    },
    mouseout:function(e){
        this.exp.ele.removeClass("hover")
    },
    mousedown:function(e){
        this.select();
        //FIXME: without preventDefault the select will lost focus immediately
        if(!(this.exp instanceof TextExp))
            e.preventDefault();
    },
    keydown:function(e){
        var specialKey=true;
        if(e.keyCode==KEY.up){
            var parent=this.parent();
            if(parent)
                parent.select();
        }else if(e.keyCode==KEY.down){
            var child=this.child(0);
            if(child)
                child.select();
        }else if(e.keyCode==KEY.left){
            var dest=this.prev();
            if(dest){
                dest.select(-1);
            }
        }else if(e.keyCode==KEY.right){
            var dest=this.next();
            if(dest){
                dest.select(0);
            }
        }else if(e.keyCode==KEY.del){
            this.parent().removeChild(this);
        }else if(e.keyCode==KEY.back){
        }else if(e.keyCode==KEY.ctrl){
            var right=this.prev();
            var left=this.next();
            //var up=_this.parent();
            //var down=_this.child(0);
            if(right){
                right.exp.ele.addClass("indicate")
            }
            if(left){
                left.exp.ele.addClass("indicate")
            }
            //if(up){
            //    up.exp.ele.addClass("indicate")
            //}
            //if(down){
            //    down.exp.ele.addClass("indicate")
            //}
        }else{
            specialKey=false;
        }if(specialKey){
            e.preventDefault();
        }
    },
    keyup:function(e){
        if(e.keyCode==KEY.ctrl){
            this.root().anchor.find(".indicate").removeClass("indicate");
        }
    },
    focus:function(e){
        this.exp.ele.addClass("focus");
        this.root().focusExp=this;
    },
    blur:function(e){
        this.exp.ele.removeClass("focus");
        this.root().focusExp=null;
    }
});
/////////text////////////////////////////////////////////////////////////////////////////
var TextExp=function(value){
    this.base.call(this,[]);
    this.ctrl=new TextExpCtrl(this);
    this.value=value||"";
    this.ele.addClass("text");
}
buildProto(TextExp,{
    render:function(size){
        this.ele.empty();
		if(!this.value){
			this.ele.html("+").addClass("empty").css("font-size",size);
		}else{
			this.ele.html(this.value.replace(/ /g,"&nbsp;")).css("font-size",size);
        }
		$("#TEST").html(this.ele);
        this.height=this.ele.height();
        this.baseline=this.height*0.5;
        return this.ele;
    }
},Exp);
var TextExpCtrl=function(exp){
    this.base.call(this,exp);
    var ele=exp.ele[0];
    bindEvent(ele,"focus",this.focus,{refuseBubble:true,scope:this});
    bindEvent(ele,"blur",this.blur,{refuseBubble:true,scope:this});
    exp.ele.attr("spellcheck","false");
    exp.ele.attr("contenteditable","true");
}
buildProto(TextExpCtrl,{
    keydown:function(e){
        var ele=this.exp.ele;
        var range=Selection.getRange();
        var value=ele.text();
        if(e.keyCode==KEY.del || e.keyCode==KEY.back){
            return;
        }
        if(e.keyCode==KEY.left && !(range.startOffset==range.endOffset && range.endOffset==0))
            return;
        if(e.keyCode==KEY.right && !(range.startOffset==range.endOffset && range.endOffset==value.length))
            return;
        ExpCtrl.prototype.keydown.call(this,e);
    },
	focus:function(e){
		if(!this.exp.value){
			this.exp.ele.html("").removeClass("empty");
		}
		ExpCtrl.prototype.focus.call(this,e);
	},
    blur:function(e){
        this.exp.value=this.exp.ele.text();
		if(!this.exp.value){
			this.exp.ele.addClass("empty").html("+");
		}
        ExpCtrl.prototype.blur.call(this,e);
    },
    insert:function(type){
        var range=Selection.getRange();
        
        //chrome bug
        this.exp.ele.blur();
        if(type=="fraction")
			var newExp=new FractionExp();
        else if(type=="corner")
			var newExp=new CornerExp();
		else if(type=="radical")
			var newExp=new RadicalExp();
		else if(type=="bracket")
			var newExp=new BracketExp();
		var value1=this.exp.value.substring(0,range.startOffset);
        var value2=this.exp.value.substring(range.endOffset);
        
        newExp.parent=this.exp.parent;
        var newText=new TextExp(value1);
        newText.parent=this.exp.parent;
        this.exp.value=value2;
        var arr=this.exp.parent.children;
        var i=this.index();
        arr.splice(i,0,newText,newExp);
        this.root().refresh();
		newExp.ctrl.select();
    }
},ExpCtrl);
///////////liner////////////////////////////////////////////////////////////////////////////
var LinerExp=function(children){
    children=children||[];
    if(!(children[0] instanceof TextExp))
        children.unshift(new TextExp(""));
    if(!(children[children.length-1] instanceof TextExp))
        children.push(new TextExp(""));
    this.base.call(this,children);
    this.ctrl=new LinerExpCtrl(this);
    this.ele.addClass("liner");
}
buildProto(LinerExp,{
    render:function(size){
        this.ele.empty();
        var maxBaseline=0;
        for(var i=this.children.length-1;i>=0;i--){
            this.ele.prepend(this.children[i].render(size));
            if(this.children[i].baseline>maxBaseline)
                maxBaseline=this.children[i].baseline;
        }
        for(i=this.children.length-1;i>=0;i--){
            this.children[i].ele.css("bottom",maxBaseline-this.children[i].baseline);
        }
        $("#TEST").html(this.ele);
        this.height=this.ele.height();
        this.baseline=maxBaseline;
        return this.ele;
    }
},Exp);
var LinerExpCtrl=function(exp){
    this.base.call(this,exp);
}
buildProto(LinerExpCtrl,{
    removeChild:function(child){
        var childIndex=this.index(child);
        if(!child)
            return;
        if(child instanceof TextExp){
            this.exp.children[childIndex]=new TextExp();
            return;
        }
        var l=this.exp.children[childIndex-1].value.length;
        this.exp.children[childIndex-1].value+=this.exp.children[childIndex+1].value;
        this.exp.children.splice(childIndex,2);
        this.root().refresh();
        this.exp.children[childIndex-1].ctrl.select();
        Selection.select(this.exp.children[childIndex-1].ele[0],l);
    }
},ExpCtrl);
//////fraction////////////////////////////////////////////////////////////////////////////
var FractionExp=function(lower,upper){
    this.base.call(this,[lower,upper]);
    this.ctrl=new FractionExpCtrl(this);
    this.ele.addClass("fraction");
}
buildProto(FractionExp,{
    render:function(size){
        this.ele.empty();
        this.ele.append(this.children[FractionExp.UPPER].render(size).addClass("upper"));
        this.ele.append('<div class="hr"></div>');
        this.ele.append(this.children[FractionExp.LOWER].render(size).addClass("lower"));
        $("#TEST").html(this.ele);
        this.height=this.ele.height();
        this.baseline=this.children[FractionExp.LOWER].height;
        return this.ele;
    }
},Exp);
FractionExp.LOWER=0;
FractionExp.UPPER=1;


var FractionExpCtrl=function(exp){
    this.base.call(this,exp);
}
buildProto(FractionExpCtrl,{},ExpCtrl);
///////corner//////////////////////////////////////////////////////////////////////////
var CornerExp=function(lower,upper){
    this.base.call(this,[lower,upper]);
    this.ctrl=new FractionExpCtrl(this);
    this.ele.addClass("fraction");
}
buildProto(CornerExp,{
    render:function(size){
        this.ele.empty();
        this.ele.append(this.children[CornerExp.UPPER].render(size-5).addClass("upper"));
        this.ele.append(this.children[CornerExp.LOWER].render(size-5).addClass("lower"));
        $("#TEST").html(this.ele);
        this.height=this.ele.height();
        this.baseline=this.children[CornerExp.LOWER].height;
        return this.ele;
    },
    getSize:function(){
        var max=FONT_MIN;
        var upperSize=this.children[RadicalExp.EXPONENT].getSize();
        var lowerSize=this.children[RadicalExp.BASE].getSize();
        if(max<upperSize+5)
            max=upperSize+5;
        if(max<lowerSize+5)
            max=lowerSize+5;
        return max;
    }
},Exp);
CornerExp.LOWER=0;
CornerExp.UPPER=1;

var CornerExpCtrl=function(exp){
    this.base.call(this,exp);
}
buildProto(CornerExpCtrl,{},ExpCtrl);
//////radical////////////////////////////////////////////////////////////////////////////
var RadicalExp=function(exponent,base){
    this.base.call(this,[exponent,base]);
    this.ctrl=new RadicalExpCtrl(this);
    this.ele.addClass("radical");
}
buildProto(RadicalExp,{
    render:function(size){
        this.ele.html('<span class="symbol"></span><span class="block"></span>');
        var block=this.ele.children(".block");
        block.prepend(this.children[RadicalExp.BASE].render(size).addClass("base"));
        $("#TEST").html(this.ele);
        this.ele.children(".symbol").html(getSymbol("radical",block.height())).css("margin-left","-7");
        this.ele.prepend(this.children[RadicalExp.EXPONENT].render(size-5).addClass("exponent"));
        this.height=this.ele.height();
        this.baseline=this.children[RadicalExp.BASE].baseline;
        this.children[RadicalExp.EXPONENT].ele.css("bottom",this.baseline);
        return this.ele;
    },
    getSize:function(){
        var max=FONT_MIN;
        var expSize=this.children[RadicalExp.EXPONENT].getSize();
        var baseSize=this.children[RadicalExp.BASE].getSize();
        if(max<expSize+5)
            max=expSize+5;
        if(max<baseSize)
            max=baseSize;
        return max;
    }
},Exp);
RadicalExp.EXPONENT=0;
RadicalExp.BASE=1;

var RadicalExpCtrl=function(exp){
    this.base.call(this,exp);
}
buildProto(RadicalExpCtrl,{},ExpCtrl);

//////bracket////////////////////////////////////////////////////////////////////////////
var BracketExp=function(children){
    children=children||[];
    if(children.length<0)
        children[0]=new LinerExp();
    if(children.length<1)
        children[1]=new LinerExp();
    this.base.call(this,children);
    this.ctrl=new BracketExpCtrl(this);
    this.ele.addClass("bracket");
}
buildProto(BracketExp,{
    render:function(size){
        this.ele.html('<span class="symbol"></span><span class="block"></span>');
        var block=this.ele.children(".block");
        for(var i=this.children.length-1;i>=0;i--){
            block.prepend(this.children[i].render(size).addClass("item"));
        }
        $("#TEST").html(this.ele);
        this.ele.children(".symbol").html(getSymbol("brackets",block.height()));
        this.height=this.ele.height();
        this.baseline=this.height/2;
        return this.ele;
    }
},Exp);

var BracketExpCtrl=function(exp){
    this.base.call(this,exp);
}
buildProto(BracketExpCtrl,{
    removeChild:function(child){
        var childIndex=this.index(child);
        if(childIndex!=-1){
            child.remove();
            this.exp.children.splice(childIndex,1);
        }
        this.root().refresh();
    }
},ExpCtrl);
////////////////////////////////////////////////////////////////////////////


var KEY={
    up:38,
    down:40,
    left:37,
    right:39,
    back:8,
    del:46,
    enter:13,
    ctrl:17,
    alt:18,
    shift:16
}
var Agent={
    delegater:null,
    delegate:function(ctrl){
        $("#AGENT").blur();
        this.delegater=ctrl;
        $("#AGENT").focus();
    },
    agentKeyDown:function(e){
        Agent.delegater.keydown.call(Agent.delegater,e);
    },
    agentKeyUp:function(e){
        Agent.delegater.keyup.call(Agent.delegater,e);
    },
    agentFocus:function(e){
        if(Agent.delegater)
            Agent.delegater.focus.call(Agent.delegater,e);
    },
    agentBlur:function(e){
        if(Agent.delegater)
            Agent.delegater.blur.call(Agent.delegater,e);
    }
}
$("#AGENT").keydown(Agent.agentKeyDown).keyup(Agent.agentKeyUp).blur(Agent.agentBlur).focus(Agent.agentFocus);
////////////////////////////////////////////////////////////////////////////
var ExpType={
    text:0,
    liner:1,
    bracket:2,
    fraction:3,
    radical:4,
    corner:5
}

function warp(exp){
    if(exp instanceof LinerExp)
        return exp;
    if(exp instanceof TextExp)
        return liner=new LinerExp([exp]);
}
function moduleReader(src){
    if(!src)
        return;
    if(typeof(src)=="string"){
        return new TextExp(src);
    }
    else if(src.type==ExpType.text){
        return new TextExp(src.value);
    }else if(src.type==ExpType.liner){
        var children=[];
        for(var j=src.children.length-1;j>=0;j--){
            children.unshift(moduleReader(src.children[j]));
        }
        return new LinerExp(children);
    }else if(src.type==ExpType.fraction){
        return new FractionExp(warp(moduleReader(src.lower)),warp(moduleReader(src.upper)));
    }else if(src.type==ExpType.bracket){
        var children=[];
        for(var j=src.children.length-1;j>=0;j--){
            children.unshift(moduleReader(src.children[j]));
        }
        return new BracketExp(children);
    }else if(src.type==ExpType.radical){
        return new RadicalExp(warp(moduleReader(src.exponent)),warp(moduleReader(src.base)));
    }else if(src.type==ExpType.corner){
        return new CornerExp(warp(moduleReader(src.lower)),warp(moduleReader(src.upper)));
    }
}


function createSymbolIE(type,size){
    if(type=="radical"){
        var w=size/2;
        return  '<v:group style="position:relative;width:'+w+'px;height:'+size+'px;" coordsize="'+w+','+size+'">'+
                    '<v:PolyLine  fill="false" stroke="black" points="0,'+(size*0.85)+' '+(w*0.1)+','+(size*0.7)+' '+(w*0.4)+','+size+' '+w+',0 '+(w*0.4)+','+size+'"/>'+
                '</v>';
    }else if(type="bracket"){
        var c=size/2;
        var symbol= '<v:group style="position:relative;width:10px;height:'+size+'px;" coordsize="10,'+size+'">'+
                        '<v:curve from="0,'+c+'" control1="5,'+c+'" to="5,'+(c+5)+'"></v:curve>'+
                        '<v:line from="5,'+(c+5)+'" to="5,'+(size-5)+'"></v:line>'+
                        '<v:curve from="5,'+(size-5)+'" control1="5,'+size+'" to="10,'+size+'"></v:curve>'+
                        '<v:curve from="0,'+c+'" control1="5,'+c+'" to="5,'+(c-5)+'"></v:curve>'+
                        '<v:line from="5,'+(c-5)+'" to="5,'+(5)+'"></v:line>'+
                        '<v:curve from="5,'+(5)+'" control1="5,'+(0)+'" to="10,'+(0)+'"></v:curve>'+
                    '</v:group>';
        return symbol;
    }
}
function createSymbol(type,size){
    if(type=="radical"){
        var w=size/2;
        var symbol='<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+size+'">'+
                        '<polyline fill="none" stroke="black" points="0,'+(size*0.85)+' '+(w*0.1)+','+(size*0.7)+' '+(w*0.4)+','+size+' '+w+',0"/>'+
                    '</svg>';
        return symbol;
    }else if(type="bracket"){
        var c=size/2;
        var symbol='<svg xmlns="http://www.w3.org/2000/svg" width="10" height="'+size+'">'+
                        '<path d = "M 0 '+c+' q 5 0 5 5" stroke="black" fill = "none"/>'+
                        '<path d = "M 5 '+(c+5)+' L 5 '+(size-5)+'" stroke="black" fill = "none"/>'+
                        '<path d = "M 5 '+(size-5)+' q 0 5 5 5" stroke="black" fill = "none"/>'+
                        '<path d = "M 0 '+c+' q 5 0 5 -5" stroke="black" fill = "none"/>'+
                        '<path d = "M 5 '+(c-5)+' L 5 5" stroke="black" fill = "none"/>'+
                        '<path d = "M 5 5 q 0 -5 5 -5" stroke="black" fill = "none"/>'+
                    '</svg>';
        return symbol;
    }
}

});