import { checkUser } from "./common/script/connection"
import './style.css'
import './common/style/all.css'
function getMap(start,end,startValue,endValue) {
    return function(num){
        if (num<=start){
            return startValue
        }else if (num>=end){
            return endValue
        }
        return startValue + (num-start)/(end-start)*(endValue-startValue)
    }
}

function randNumber(min,max){
    return Math.random()*(max+1-min)+min
}
class ColorBlock{
    constructor(h=window.innerHeight,w=window.innerWidth){
        this.size = randNumber(0,Math.min(h,w)/6)
        this.color = {r:randNumber(0,255),g:randNumber(0,255),b:randNumber(0,255)}
        this.left = randNumber(-this.size/2,w/2.5)+Math.floor(Math.random()*2)*w*0.6
        this.top = randNumber(-this.size/2,h/2.5)+Math.floor(Math.random()*2)*h*0.6
        // this.rotate=randNumber(0,360)
        // this.rotateX=randNumber(-60,60)
        // this.rotateY=randNumber(-60,60)
        this.rotate=0
        this.rotateX=0
        this.rotateY=0
        this.ele=document.createElement("div")
        this.root=document.createElement("div")
        this.root.appendChild(this.ele)
        this.ele.style.opacity = "0.7"
        this.ele.classList.add("colorblock")
        this.root.classList.add("colorblockRoot")
        this.z=randNumber(0.5,1.5)
        this.refresh()
    }
    refresh(){
        this.ele.style.left = this.left + "px"
        this.ele.style.top = this.top + "px"
        this.ele.style.width = this.size + "px"
        this.ele.style.height = this.size + "px"
        this.ele.style.backgroundColor = `rgb(${this.color.r},${this.color.g},${this.color.b})`
        this.ele.style.transform = `rotate(${this.rotate}deg) rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg)`
    }
    scroll(num){
        // this.root.style.transform = `translateY(${-num*this.z}px)`
    }
}
class ColorBlockStart extends ColorBlock{
    constructor(){
        super()
        document.getElementById("startBG").appendChild(this.root)
        this.startIn()
    }
    startIn(){
        this.ele.style.transform = `translate(${window.innerWidth/2 - this.left}px,${window.innerHeight /2 - this.top}px) scale(0) rotate(${this.rotate+randNumber(-50,50)}deg) rotateX(${this.rotateX+randNumber(-50,50)}deg) rotateY(${this.rotateY+randNumber(-50,50)}deg)`
        this.ele.style.opacity = "0.3"
        setTimeout(()=>{
            this._startOut()
        },0)
    }
    _startOut(){
        this.ele.style.transform = `translate(0px,0px) scale(1) rotate(${this.rotate}deg) rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg)`
        this.ele.style.opacity = "0.7"
    }
}
class ColorBlockEles extends ColorBlock{
    constructor(h=window.innerHeight,w=window.innerWidth){
        super(h,w)
        document.getElementById("eleBG").appendChild(this.root)
        this.refreshAnimation()
    }
    refreshAnimation(){
        this.animation=new ScrollAnimation([this.ele],{transform:"translate({0}px,{1}px)"},window.innerHeight,window.innerHeight*2,[[0,1/(window.innerWidth/2-this.left)*-30*window.innerWidth],[0,1/(window.innerHeight/2-this.top)*-30*window.innerHeight]])
    }
}
class ColorBlockElse extends ColorBlock{
    constructor(pageNum,h=window.innerHeight,w=window.innerWidth){
        super(h,w)
        this.pageNum=pageNum
        this.refresh()
        document.getElementById("colorBlocks").appendChild(this.root)
    }
    refresh(){
        this.ele.style.left = this.left + "px"
        this.ele.style.top = (this.top+(this.pageNum+3)*window.innerHeight) + "px"
        this.ele.style.width = this.size + "px"
        this.ele.style.height = this.size + "px"
        this.ele.style.backgroundColor = `rgb(${this.color.r},${this.color.g},${this.color.b})`
        this.ele.style.transform = `rotate(${this.rotate}deg) rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg)`
    }
}
var lastSizeX
var lastSizeY
var sign= "如果说，青春如烟，仅此一场，放肆冲动，我会将什么故事写在过去散在风中。即便此刻两手空空，即便隐隐作痛，要记得时而抬起头，仰望星空，拥抱彩虹。"
var blockList={
    start:[],
    eles:[],
    ends:[],
}
Object.defineProperty(blockList,"all",{
    get:()=>{
        var li = blockList.start.concat(blockList.eles);
        for (var i=0; i<blockList.ends.length; i++){
            li = li.concat(blockList.ends[i]);
        }
        return li;
    }
})
function pointInsert(s){
    if (s.length==0){
        setTimeout(()=>{document.getElementById("sign").classList.add("finish")},1000.)
        return
    }
    document.getElementById("sign").innerText=document.getElementById("sign").innerText+s.slice(0,1)
    setTimeout(pointInsert,80,s.slice(1,s.length))
}
var lastSroll=0
class ScrollAnimation{
    constructor(targets,styles,start,end,values){
        this.targets=targets
        this.styles=styles
        this.getValue=[]
        for (var i=0;i<values.length;i++){
            this.getValue.push(getMap(start,end,values[i][0],values[i][1]))
        }
    }
    change(num){
        var values=[]
        for (var i=0;i<this.getValue.length;i++){
            values.push(this.getValue[i](num))
        }
        for (i in this.styles){
            var value=this.styles[i]
            for (var j=0;j<values.length;j++){
                value=value.replace(`{${j}}`,values[j]+"")
            }
            for (var j=0;j<this.targets.length;j++){
                this.targets[j].style[i]=value
            }
        }
    }
}
var animations=[]

function refreshAnimation(){
    animations.splice(0,animations.length);
    animations.push(new ScrollAnimation([document.getElementById("eleLogo")],{transform:"translate(-50%,calc(-50% - {0}px)) scale({1})",opacity:"{2}"},window.innerHeight*0.8,window.innerHeight*1.3,[[0,window.innerHeight/2],[1,2],[1,0]]))
    var li=document.querySelectorAll("#eleCenter .eles")
    var fatherPosition=document.getElementById("elePlay").getBoundingClientRect();
    document.getElementById("eleCenter").style.transform=""
    for (var i = 0; i<li.length;i++){
        li[i].style.transform=""
        var position=li[i].getBoundingClientRect();
        var centerPosition={
            x:position.x+position.width/2,
            y:position.y+position.height/2-fatherPosition.y
        }
        animations.push(new ScrollAnimation([li[i]],{transform:"translate({0}px,{1}px) scale({2})",opacity:"{3}"},window.innerHeight+100+parseInt(li[i].getAttribute("num"))*200,window.innerHeight*1.5+100+parseInt(li[i].getAttribute("num"))*200,[[window.innerWidth/2-centerPosition.x,0],[window.innerHeight/2+100-centerPosition.y,0],[0.2,1],[0,1]]))
    }
    for (i=0;i<blockList.eles.length;i++){
        blockList.eles[i].refreshAnimation()
        animations.push(blockList.eles[i].animation)
    }
    animations.push(new ScrollAnimation([document.getElementById("eleCenter")],{transform:"translate(-50%,calc(-50% + 100px)) scale({0})",opacity:"{1}"},window.innerHeight,window.innerHeight*1.5,[[0,1],[0,1]]))
    animations.push(new ScrollAnimation([document.getElementById("eleTitle")],{transform:"translate(-50%,calc(-50% - 300px)) scale({0})",opacity:"{1}"},window.innerHeight,window.innerHeight*1.5,[[0,1],[0,1]]))
    setTimeout(onscroll,0)
}
window.onresize=(e)=>{
    var nowHeight=window.innerHeight
    var nowWidth=window.innerWidth
    var ky=nowHeight/lastSizeY
    var kx=nowWidth/lastSizeX
    var ks=Math.min(nowHeight,nowWidth)/Math.min(lastSizeX,lastSizeY)
    
    var num=Math.floor(Math.max(nowHeight,nowWidth)/50)
    if (num<blockList.start.length){
        for (var i=num;i<blockList.start.length;i++){
            blockList.start[i].ele.style.opacity="0"
            setTimeout((ele)=>{
                ele.root.remove()
            },300,blockList.start[i])
        }
        blockList.start.splice(num,blockList.start.length-num)
    }else{
        for (var i=blockList.start.length;i<num;i++){
            var now=new ColorBlock(lastSizeY,lastSizeX)
            document.getElementById("colorBlocks").appendChild(now.root)
            now.ele.style.opacity="0"
            setTimeout((now)=>{
                now.ele.style.opacity="1"
            },0,now)
            blockList.start.push(now)
        }
    }
    if (num<blockList.eles.length){
        for (var i=num;i<blockList.eles.length;i++){
            blockList.eles[i].ele.style.opacity="0"
            setTimeout((ele)=>{
                ele.root.remove()
            },300,blockList.eles[i])
        }
        blockList.eles.splice(num,blockList.eles.length-num)
    }else{
        for (var i=blockList.eles.length;i<num;i++){
            var now=new ColorBlockEles(lastSizeY,lastSizeX)
            now.ele.style.opacity="0"
            setTimeout((now)=>{
                now.ele.style.opacity="1"
            },0,now)
            blockList.eles.push(now)
        }
    }
    for (var n=0;n<blockList.ends.length;n++){
        var li=blockList.ends[n]
        if (num<li.length){
            for (var i=num;i<li.length;i++){
                li[i].ele.style.opacity="0"
                setTimeout((ele)=>{
                    ele.root.remove()
                },300,li[i])
            }
            li.splice(num,li.length-num)
        }else{
            for (var i=li.length;i<num;i++){
                var now=new ColorBlockElse(n,lastSizeY,lastSizeX)
                now.ele.style.opacity="0"
                setTimeout((now)=>{
                    now.ele.style.opacity="1"
                },0,now)
                li.push(now)
            }
        }
    }
    setTimeout(()=>{
        var li=blockList.all
        for (var i=0;i<li.length;i++){
            li[i].top*=ky
            li[i].left*=kx
            li[i].size*=ks
            li[i].refresh()
        }
        lastSizeX=nowWidth
        lastSizeY=nowHeight
        setTimeout(refreshAnimation(),0)
    },0)
    
}
function onscroll(e){
    var different=document.getElementById("fixed").scrollTop-lastSroll
    var all=blockList.all
    for (var i=0;i<all.length;i++){
        all[i].scroll(different)
    }
    lastSroll=document.getElementById("fixed").scrollTop
    for (var i=0;i<animations.length;i++){
        animations[i].change(lastSroll)
    }
}
window.onload = function(){
    lastSizeX=window.innerWidth
    lastSizeY=window.innerHeight
    checkUser()
    setTimeout(()=>{document.getElementById("fixed").style.overflowY="scroll"},300)
    for (var i=0;i<Math.max(window.innerHeight,window.innerWidth)/50;i++){
        blockList.start.push(new ColorBlockStart())
    }
    for (var i=0;i<Math.max(window.innerHeight,window.innerWidth)/50;i++){
        blockList.eles.push(new ColorBlockEles())
    }
    document.getElementById("signBox").innerText=sign
    setTimeout(pointInsert,300,sign)
    document.getElementById("fixed").addEventListener("scroll",onscroll)
    var li=document.querySelectorAll(".elesPage .elseBG")
    for(i=0;i<li.length;i++){
        blockList.ends.push([])
        for (var j=0;j<Math.max(window.innerHeight,window.innerWidth)/50;j++){
            blockList.ends[i].push(new ColorBlockElse(i))
        }
    }
    refreshAnimation()
}