$(function(){


function createClass(methods,SuperClass){
    var SubClass=function(){
        this._init.apply(this, arguments);
    }
    var agencyInstance;
    if ( SuperClass == null ) {
        agencyInstance = methods;
    } else {
        var AgencyClass = function() {};
        AgencyClass.prototype = SuperClass.prototype;
        agencyInstance = new AgencyClass();
        for ( var item in methods ) {
            agencyInstance[item] = methods[item];
        }
    }
    SubClass.prototype = agencyInstance;
    return SubClass;
}
window.Selection={
    getRange:function(){
        var selObj = window.getSelection();  
        var range  = selObj.getRangeAt(0);
        return range;
    },
    selectStart:function(node){
        var sel = window.getSelection();
        sel.removeAllRanges();
        var range = document.createRange();
        var dest=node.childNodes[0];
        
        range.setStart(dest,dest.length);
        range.setEnd(dest,dest.length);
        sel.addRange(range);
    },
    selectEnd:function(node){
        var sel = window.getSelection();
        sel.removeAllRanges();
        var range = document.createRange();
        var dest=node.childNodes[0];
        
        range.setStart(dest,dest.length);
        range.setEnd(dest,dest.length);
        sel.addRange(range);
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
            start=0;
            end=start;
        }
        range.setStart(dest,start);
        range.setEnd(dest,end);
        sel.addRange(range);
    }
}
var Exp=createClass({
    _init:function(parent){
        var type;
        this.parent=parent
        this.children=[];
        this.ele=$('<span class="exp" index="'+Exp.count+'"></span>');
        this.height=0;
        this.baseline=0;
        //this.ctrl=new ExpController(this);
        this.index=Exp.count;
        Exp.instances[Exp.count++]=this;
    }
});
Exp.count=0;
Exp.instances=[];
var ExpCtrl=createClass({
    _init:function(exp){
        this.exp=exp;
        var ele=exp.ele[0];
        //不可以使用jquery.bind,在重新渲染的时候会被刷掉
        if(ele.addEventListener){
            ele.addEventListener("mouseover",this.mouseover);
            ele.addEventListener("mouseout",this.mouseout);
            ele.addEventListener("keydown",this.keydown);
            //ele[0].addEventListener("input",this.oninput);
        }else{
            ele.attachEvent("onmouseover",this.mouseover);
            ele.attachEvent("onmouseout",this.mouseout);
            ele.attachEvent("onkeydown",this.keydown);
            //this.ele[0].childNodes[0].attachEvent("onpropertychange",function(){oninput.call(_this);});
        }
    },
    removeChild:function(child){
        var childIndex=this.index(child);
        if(childIndex!=-1){
            child.remove();
            this.exp.children.splice(childIndex,1);
        }
    },
    remove:function(){
        Exp.instances[this.exp.index]=null;
        while(child=this.child(0)){
            this.removeChild(child);
        }
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
                Selection.selectEnd(this.exp.ele[0]);
        }
    },
    mouseover:function(e){
        var ele=$(this);
        e.stopPropagation();
        ele.addClass("hover");
    },
    mouseout:function(e){
        var ele=$(this);
        e.stopPropagation();
        ele.removeClass("hover")
    },
    keydown:function(e){
        var ele=$(this);
        var _this=Exp.instances[ele.attr("index")].ctrl;
        e.stopPropagation();
        e.preventDefault();
        if(e.keyCode==KEY.up){
            _this.child(-1).select(0);
        }else if(e.keyCode==KEY.down){
            _this.child(0).select();
        }else if(e.keyCode==KEY.left){
            var dest=_this.prev();
            if(dest){
                dest.select(-1);
            }else{
                
            }
        }else if(e.keyCode==KEY.right){
            var dest=_this.next();
            if(dest){
                dest.select(0);
            }else{
            }
        }else if(e.keyCode==KEY.del){
            _this.parent().removeChild(_this);
        }else if(e.keyCode==KEY.back){
        }
    },
    focus:function(e){
        e.stopPropagation();
        var ele=$(this);
        ele.addClass("focus");
    },
    blur:function(e){
        e.stopPropagation();
        var ele=$(this);
        ele.removeClass("focus");
    },
    oninput:function(){
        //var ele=$(this);
        //var _this=Exp.instances[ele.attr("index")].ctrl;
        //alert(1);
    }
});
/////////text////////////////////////////////////////////////////////////////////////////
var TextExp=createClass({
    _init:function(parent,value){
        Exp.prototype._init.call(this,parent);
        this.ctrl=new TextExpCtrl(this);
        this.value=value||"";
        this.ele.addClass("text");
    },
    render:function(){
        this.ele.empty();
        this.ele.text(this.value);
        $("#TEST").html(this.ele);
        this.height=this.ele.height();
        this.baseline=this.height/2;
        return this.ele;
    }
},Exp);
var TextExpCtrl=createClass({
    _init:function(exp){
        ExpCtrl.prototype._init.call(this,exp);
        var ele=exp.ele;
        if(ele[0].addEventListener){
            ele[0].addEventListener("focus",this.focus);
            ele[0].addEventListener("blur",this.blur);
        }else{
            ele[0].attachEvent("onfocus",this.focus);
            ele[0].attachEvent("onblur",this.blur);
        }
        ele.attr("spellcheck","false");
        ele.attr("contenteditable","true");
    },
    keydown:function(e){
        var ele=$(this);
        e.stopPropagation();
        var range=Selection.getRange(0);
        var value=ele.text();
        if(e.keyCode==KEY.del || e.keyCode==KEY.back){
            return;
        }
        if(e.keyCode==KEY.left && !(range.startOffset==range.endOffset && range.endOffset==0))
            return;
        if(e.keyCode==KEY.right && !(range.startOffset==range.endOffset && range.endOffset==value.length))
            return;
        if(e.keyCode==KEY.left || e.keyCode==KEY.right || e.keyCode==KEY.up || e.keyCode==KEY.down)
            ExpCtrl.prototype.keydown.call(this,e);
    }
},ExpCtrl);
///////////liner////////////////////////////////////////////////////////////////////////////
var LinerExp=createClass({
    _init:function(parent,value){
        Exp.prototype._init.call(this,parent);
        this.ctrl=new LinerExpCtrl(this);
        this.ele.addClass("liner");
    },
    render:function(){
        this.ele.empty();
        var maxBaseline=0;
        for(var i=this.children.length-1;i>=0;i--){
            this.ele.prepend(this.children[i].render());
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
var LinerExpCtrl=createClass({
    _init:function(exp){
        ExpCtrl.prototype._init.call(this,exp);
    },
    removeChild:function(child){
        var childIndex=this.index(child);
        if(!child)
            return;
        if(child instanceof TextExp)
            this.exp.children[childIndex]=new TextExp();
            
        var l=this.exp.children[childIndex-1].value.length;
        this.exp.children[childIndex-1].value+=this.exp.children[childIndex+1].value;
        this.exp.children.splice(childIndex,2);
        $("#EXP").html(root.render());
        this.exp.children[childIndex-1].ctrl.select();
        Selection.select(this.exp.children[childIndex-1].ele[0],l,l);
    },
    remove:function(){
        while(child=this.child(0)){
            child.remove(true);
            this.exp.children.shift();
        }
        this.exp.children=[new TextExp(this.exp,"")];
    }
},ExpCtrl);
//////fraction////////////////////////////////////////////////////////////////////////////
var FractionExp=createClass({
    _init:function(parent,value){
        Exp.prototype._init.call(this,parent);
        this.ctrl=new FractionExpCtrl(this);
        this.ele.addClass("fraction");
    },
    render:function(){
        this.ele.empty();
        this.ele.append(this.children[FractionExp.UPPER].render().addClass("upper"));
        this.ele.append('<div class="hr"></div>');
        this.ele.append(this.children[FractionExp.LOWER].render().addClass("lower"));
        $("#TEST").html(this.ele);
        this.height=this.ele.height();
        this.baseline=this.children[FractionExp.LOWER].height;
        return this.ele;
    }
},Exp);
var FractionExpCtrl=createClass({
    _init:function(exp){
        ExpCtrl.prototype._init.call(this,exp);
    },
    removeChild:function(child){
        var childIndex=this.index(child);
        child.remove();
        this.exp.children[childIndex]=new LinerExp(this);
        this.exp.children[childIndex].children[0]=new TextExp(this.exp.children[childIndex],"");
        $("#EXP").html(root.render());
        this.exp.children[childIndex].children[0].ctrl.select();
    }
},ExpCtrl);
FractionExp.UPPER=1;
FractionExp.LOWER=0;
//////bracket////////////////////////////////////////////////////////////////////////////
var BracketExp=createClass({
    _init:function(parent,value){
        Exp.prototype._init.call(this,parent);
        this.ctrl=new BracketExpCtrl(this);
        this.ele.addClass("bracket");
    },
    render:function(){
        this.ele.html('<span class="symbol"></span><span class="block"></span>');
        var block=this.ele.find(".block");
        for(var i=this.children.length-1;i>=0;i--){
            block.prepend(this.children[i].render().addClass("item"));
        }
        $("#TEST").html(this.ele);
        this.ele.find(".symbol").html(getSymbol("brackets",this.ele.find(".block").height()));
        this.height=this.ele.height();
        this.baseline=this.height/2;
        return this.ele;
    }
});
var BracketExpCtrl=createClass({
    _init:function(exp){
        ExpCtrl.prototype._init.call(this,exp);
    },
    removeChild:function(child){
        var childIndex=this.index(child);
        child.remove();
        this.exp.children[childIndex]=new LinerExp(this);
        this.exp.children[childIndex].children[0]=new TextExp(this.exp.children[childIndex],"");
        $("#EXP").html(root.render());
        this.exp.children[childIndex].children[0].ctrl.select();
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
    enter:13
}
var Agent={
    delegater:null,
    delegate:function(ctrl){
        $("#AGENT").blur();
        this.delegater=ctrl;
        $("#AGENT").focus();
    },
    agentKeyDown:function(e){
        Agent.delegater.keydown.call(Agent.delegater.exp.ele,e);
    },
    agentFocus:function(e){
        if(Agent.delegater)
            Agent.delegater.focus.call(Agent.delegater.exp.ele,e);
    },
    agentBlur:function(e){
        if(Agent.delegater)
            Agent.delegater.blur.call(Agent.delegater.exp.ele,e);
    }
}
$("#AGENT").keydown(Agent.agentKeyDown).blur(Agent.agentBlur).focus(Agent.agentFocus);
////////////////////////////////////////////////////////////////////////////
var ExpType={
    text:0,
    liner:1,
    fraction:2,
    bracket:3
}
var module=
{type:3,children:[
    {type:1,children:[
        {type:0,value:"123 + "},
        {type:2,
            upper:{type:1,children:[
                {type:0,value:"123 + "},
                {type:2,
                    upper:{type:1,children:[{type:0,value:"dx"}]},
                    lower:{type:1,children:[{type:0,value:"dy"}]}
                },
                {type:0,value:"x"}
            ]},
            lower:{type:1,children:[
                {type:0,value:"123"}
            ]}
        },
        {type:0,value:" - 456"} 
    ]},
    {type:1,children:[
        {type:0,value:"x^7+3x-5    (x>0)"}
    ]},
    {type:1,children:[
        {type:0,value:"123+ (impossible)"}
    ]}
]};

function moduleReader(parent,src){
    if(src.type==ExpType.text){
        return new TextExp(parent,src.value);
    }else if(src.type==ExpType.liner){
        var exp=new LinerExp(parent);
        for(var j=src.children.length-1;j>=0;j--){
            exp.children.unshift(moduleReader(exp,src.children[j]));
        }
        return exp;
    }else if(src.type==ExpType.fraction){
        var exp=new FractionExp(parent);
        exp.children[FractionExp.UPPER]=moduleReader(exp,src.upper);
        exp.children[FractionExp.LOWER]=moduleReader(exp,src.lower);
        return exp;
    }else if(src.type==ExpType.bracket){
        var exp=new BracketExp(parent);
        for(var j=src.children.length-1;j>=0;j--){
            exp.children.unshift(moduleReader(exp,src.children[j]));
        }
        return exp;
    }
}
window.root=moduleReader(null,module);
$("#EXP").html(root.render());
//$("#EXP").html(getSymbol("brackets",90));
});
window.w3c=!$.browser.msie || $.browser.version>8;
if(w3c)
    window.getSymbol=createSymbol;
else
    window.getSymbol=createSymbolIE;
function createSymbolIE(type,size){
    if(type=="radical"){
        return 1;
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