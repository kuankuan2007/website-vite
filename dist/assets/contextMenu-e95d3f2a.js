import{_ as e,a as t,L as a,M as n,a3 as o,o as i,b as s,d as u,w as l,a4 as d,u as r,e as c,t as h,v as y,F as p,Q as m,h as x,x as f,a5 as v,T as b,$ as w}from"./all-7fb1665d.js";const _={class:"menu"},g={key:0,class:"title"},k={class:"choice-list"},q=["onClick"],E=e({__name:"menu",props:{data:{type:Object,required:!0},x:{type:Number,required:!0},y:{type:Number,required:!0},show:{type:Boolean,required:!0},parentWidth:{type:Number,default:0,required:!1}},emits:["choice"],setup(e,{expose:w,emit:B}){const C=e;let L=t();a((()=>{n((()=>{C.x,C.y,P()}))}));let M=t(0),S=t(0),j=t(0),N=document.querySelector("body>#contextBox");function T(e){B("choice",e)}N||(N=document.createElement("div"),N.id="contextBox",document.body.appendChild(N));let W=0,F=0;function O(e){e.style.height=0}function P(){o.height-C.y<W+10?j.value=o.height-W-10-C.y:j.value=0,o.width-C.x<F+10?S.value=-F-C.parentWidth:S.value=0}function $(e){e.style.height="auto",W=e.clientHeight,F=e.clientWidth,P(),e.style.height="0",requestAnimationFrame((()=>{e.style.height=W+"px"}))}function A(e){e.style.top=C.y+W+"px",e.style.height=0}let D=t(),H=t(),I=t(void 0);return n((()=>{C.show||(I.value=void 0)})),w({menuBox:H}),(t,a)=>(i(),s("div",{class:"menu-box",ref_key:"menuBox",ref:H},[u(b,{duration:300,onBeforeEnter:O,onLeave:A,onEnter:$},{default:l((()=>[e.show?(i(),s("div",{key:0,class:"menu-fixd",ref_key:"menuEle",ref:D,style:d({"--x":r(C).x+r(S)+"px","--y":r(C).y+r(j)+"px"})},[c("div",_,[r(C).data.title?(i(),s("p",g,h(r(C).data.title),1)):y("",!0),c("ul",k,[(i(!0),s(p,null,m(e.data.menu,((e,t)=>(i(),s("li",{class:"choice",onClick:a=>function(e,t,a){e.sub?(I.value=t,M=a.target.offsetTop):e.event&&T(e.event)}(e,t,a),key:t},[x(h(e.title)+" ",1),(i(),f(v,{ref_for:!0,ref_key:"nowSubMenuTP",ref:L,to:r(N)},[e.sub?(i(),f(E,{key:0,ref_for:!0,ref:"nowSubMenu",show:r(I)===t,y:r(C).y+r(j)+r(M),x:r(C).x+r(S)+r(F),onChoice:a[0]||(a[0]=e=>T(e)),data:e.sub,"parent-width":r(F)},null,8,["show","y","x","data","parent-width"])):y("",!0)],8,["to"]))],8,q)))),128))])])],4)):y("",!0)])),_:1})],512))}},[["__scopeId","data-v-a05d4bb4"]]),B={__name:"contextMenu",props:{data:{type:Object,required:!0}},emits:["choice"],setup(e,{emit:n}){const o=e;let l=document.querySelector("body>#contextBox");function d(e){x.value=!1,n("choice",e)}l||(l=document.createElement("div"),l.id="contextBox",document.body.appendChild(l));let h=t(),y=t(0),m=t(0),x=t(!1),b=t();return a((()=>{b.value.addEventListener("contextmenu",(e=>{e.preventDefault(),e.stopPropagation(),y.value=e.pageX,m.value=e.pageY,x.value=!0})),window.addEventListener("click",(e=>{l.contains(e.target)||(x.value=!1)}),!0),window.addEventListener("contextmenu",(e=>{b.value.contains(e.target)||(x.value=!1)}),!0)})),(e,t)=>(i(),s(p,null,[c("div",{ref_key:"mainEle",ref:b},[w(e.$slots,"default")],512),(i(),f(v,{to:r(l)},[u(E,{onChoice:d,ref_key:"nowMenu",ref:h,show:r(x),data:r(o).data,x:r(y),y:r(m)},null,8,["show","data","x","y"])],8,["to"]))],64))}};export{B as _};