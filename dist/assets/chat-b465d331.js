import{_ as e,M as t,o as a,b as s,e as l,t as o,u as n,d as r,n as i,r as u,a as d,s as c,I as h,J as m,O as g,a0 as p,F as v,N as f,w as y,T as k,j as b,a1 as _,q as w,K as S,L as x,h as $,p as j,f as O,i as T}from"./all-f2977786.js";import{m as I}from"./header-ace7efb4.js";import{_ as C}from"./markdownShower-af1dad78.js";import{m as H}from"./markDownEditor-d84b4cc0.js";const J={key:0,class:"message"},N={class:"info"},q={key:1,class:"recalled"},B=e({__name:"history",props:{data:{type:Object,default:{},required:!0},right:{type:Boolean,default:!1,required:!1}},setup(e){const u=e;let d=t((()=>u.data.user===u.data.message?`${u.data.user} 撤回了一条消息`:`${u.data.user} 撤回了一条 ${u.data.message} 消息`));return(t,c)=>(a(),s("div",{class:i(["message-box",{right:n(u).right&&0===n(u).data.statue,normal:!(n(u).right&&0===n(u).data.statue)}])},[0===e.data.statue?(a(),s("div",J,[l("p",N,o(n(u).right?`${e.data.time}`:`${e.data.time} · ${e.data.user}`),1),r(C,{class:"content",content:e.data.message,"header-level-start":2},null,8,["content"])])):(a(),s("p",q,o(n(d)),1))],2))}},[["__scopeId","data-v-8d84c724"]]);class L extends u{constructor(e,t,a,s,l){super({}),this.id=e,this.user=t,this.statue=a,this.message=s,this.time=l}}let R=u([]),E=d(2);const A=20;let D,F,K=!1,M=d(0);function U(){1===E.value&&c("没有更多啦"),E.value=2,D.send(JSON.stringify({check:localStorage.getItem("check"),type:"history",from:R.length,to:R.length+A}))}function W(e){let t=JSON.parse(e.data);if("history"===t.type){if(0==t.data.length)return void(E.value=1);E.value=0;for(let e=0;e<t.data.length;e++)R.unshift(new L(t.data[e].id,t.data[e].user,t.data[e].statue,t.data[e].message,t.data[e].time));R.length===t.data.length&&F&&setTimeout(F)}if("message"===t.type&&(R.push(new L(t.id,t.user,t.statue,t.message,t.time)),M.value++),"recall"===t.type)for(let a=0;a<R.length;a++)if(R[a].id==t.id)return R[a].statue=1,void(R[a].message=t.user);"ERROR"===t.type&&location.reload()}const z={class:"main"},G={class:"history-list"},P={class:"input-box"},Q=(e=>(j("data-v-d712e2a6"),e=e(),O(),e))((()=>l("span",{class:"demo-icon"},"",-1)));T(e({__name:"App",setup(e){h((()=>{K||(D=new WebSocket("wss://kuankuan.site/chat/ws"),D.onmessage=W,D.onopen=U,K=!0),m((()=>{M.value,j.value.scrollHeight-j.value.clientHeight-j.value.scrollTop<300&&setTimeout(O,0)}))}));let u=t((()=>_.height/4)),j=d();function O(){j.value.scrollTop=j.value.scrollHeight,M.value=0}F=()=>{j.value.scrollTop=j.value.scrollHeight};let T=g("username",d,sessionStorage,"",!1),C=p("",100),J=t((()=>0===E.value?"加载更多":1===E.value?"没有更多啦":2===E.value?"加载中":"出错啦"));function N(e){var t;"send"===e&&(C.refresh&&C.refresh(),t=C.value,/^\s*$/.test(t)?c("消息为空哦"):D.send(JSON.stringify({check:localStorage.getItem("check"),message:t,type:"send"})),C.value="")}return(e,t)=>(a(),s(v,null,[r(I,{title:"聊天室",toLogin:!0}),l("div",z,[l("div",{class:"history-box",ref_key:"historyBox",ref:j},[l("div",G,[l("button",{class:i(["get-more",{disabled:0!=n(E)}]),onClick:t[0]||(t[0]=(...e)=>n(U)&&n(U)(...e))},[l("span",null,o(n(J)),1)],2),(a(!0),s(v,null,f(n(R),(e=>(a(),w(B,{data:e,key:e.id,right:e.user===n(T)},null,8,["data","right"])))),128))])],512),l("div",P,[r(k,{name:"to-botton"},{default:y((()=>[S(l("button",{onClick:O,class:"to-bottom"},[l("span",null,[$(o(n(M))+" ",1),Q])],512),[[x,n(M)>0]])])),_:1}),r(H,{"other-buttons":[{event:"send",inner:'发送<span class="demo-icon"><span>'}],headerLevelStart:2,"max-editor-height":n(u),content:n(C),"onUpdate:content":t[1]||(t[1]=e=>b(C)?C.value=e.target.value:C=e.target.value),onCustomButtomClick:N},null,8,["other-buttons","max-editor-height","content"])])])],64))}},[["__scopeId","data-v-d712e2a6"]])).mount("#app");
