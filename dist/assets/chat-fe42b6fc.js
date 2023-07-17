import{_ as e,a as t,l as a,P as s,N as l,O as n,u as o,o as r,b as i,e as u,t as c,d,w as m,n as h,a2 as g,s as p,r as v,L as f,M as y,F as k,Q as b,T as S,j as _,a3 as w,x,h as j,p as O,f as T,i as $}from"./all-7fb1665d.js";import{m as C}from"./header-93f915ff.js";import{_ as H}from"./contextMenu-e95d3f2a.js";import{_ as I}from"./markdownShower-23abf85c.js";import{m as N}from"./markDownEditor-f49b7113.js";const R={key:0,class:"message"},E={class:"info"},J={key:1,class:"recalled"},L=e({__name:"history",props:{data:{type:Object,default:{},required:!0},right:{type:Boolean,default:!1,required:!1}},emits:["recall"],setup(e,{emit:v}){const f=e;let y=t(!0),k=t();function b(e){"copy-markdown"===e?(g(f.data.message),p("复制成功")):"copy-html"===e?(g(k.value.makeHtml(f.data.message)),p("复制成功")):"delete"===e?y.value=!1:"recall"===e&&v("recall")}let S=a("username",t,sessionStorage,"",!1),_=a("userrights",t,sessionStorage,"",!1),w=s((()=>{let e={title:"消息",menu:[{title:"复制",sub:{title:!1,menu:[{title:"MarkDown",event:"copy-markdown"},{title:"HTML",event:"copy-html"}]}},{title:"删除消息",event:"delete"}]};return S.value===f.data.user&&(e.menu=e.menu.concat([{title:"撤回消息",event:"recall"}])),"1"===_.value&&(e.menu=e.menu.concat([{title:"管理员",sub:{title:!1,menu:[{title:"撤回消息",event:"recall"}]}}])),e})),x=s((()=>f.data.user===f.data.message?`${f.data.user} 撤回了一条消息`:`${f.data.message} 撤回了一条 ${f.data.user} 的消息`));return(t,a)=>l((r(),i("div",{class:h(["message-box",{right:o(f).right&&0===o(f).data.statue,normal:!(o(f).right&&0===o(f).data.statue)}])},[0===e.data.statue?(r(),i("div",R,[u("p",E,c(o(f).right?`${e.data.time}`:`${e.data.time} · ${e.data.user}`),1),d(H,{onChoice:b,data:o(w)},{default:m((()=>[d(I,{class:"content",content:e.data.message,ref_key:"messageShower",ref:k,"header-level-start":2},null,8,["content"])])),_:1},8,["data"])])):(r(),i("p",J,c(o(x)),1))],2)),[[n,o(y)]])}},[["__scopeId","data-v-fdbabbe9"]]);class M extends v{constructor(e,t,a,s,l){super({}),this.id=e,this.user=t,this.statue=a,this.message=s,this.time=l}}let B=v([]),q=t(2);const D=20;let A,F,K=!1,P=t(0);function Q(){1===q.value&&p("没有更多啦"),q.value=2,A.send(JSON.stringify({check:localStorage.getItem("check"),type:"history",from:B.length,to:B.length+D}))}function U(e){A.send(JSON.stringify({type:"recall",id:e,check:localStorage.getItem("check")}))}function W(e){let t=JSON.parse(e.data);if("history"===t.type){if(0==t.data.length)return void(q.value=1);q.value=0;for(let e=0;e<t.data.length;e++)B.unshift(new M(t.data[e].id,t.data[e].user,t.data[e].statue,t.data[e].message,t.data[e].time));B.length===t.data.length&&F&&setTimeout(F)}if("message"===t.type&&(B.push(new M(t.id,t.user,t.statue,t.message,t.time)),P.value++),"recall"===t.type)for(let a=0;a<B.length;a++)if(B[a].id==t.id)return B[a].statue=1,void(B[a].message=t.user);"ERROR"===t.type&&location.reload()}const z={class:"main"},G={class:"history-list"},V={class:"input-box"},X=(e=>(O("data-v-82a96390"),e=e(),T(),e))((()=>u("span",{class:"demo-icon"},"",-1)));$(e({__name:"App",setup(e){f((()=>{K||(A=new WebSocket("wss://kuankuan.site/chat/ws"),A.onmessage=W,A.onopen=Q,K=!0),y((()=>{P.value,v.value.scrollHeight-v.value.clientHeight-v.value.scrollTop<300&&setTimeout(O,0)}))}));let g=s((()=>w.height/4)),v=t();function O(){v.value.scrollTop=v.value.scrollHeight,P.value=0}F=()=>{v.value.scrollTop=v.value.scrollHeight};let T=a("username",t,sessionStorage,"",!1),$=t(),H=s((()=>0===q.value?"加载更多":1===q.value?"没有更多啦":2===q.value?"加载中":"出错啦"));function I(e){e.ctrlKey&&R()}function R(){var e;$.refresh&&$.refresh(),e=$.value,(/^\s*$/.test(e)?(p("消息为空哦"),0):(A.send(JSON.stringify({check:localStorage.getItem("check"),message:e,type:"send"})),1))&&($.value="")}function E(e){"send"===e&&R()}return(e,t)=>(r(),i(k,null,[d(C,{title:"聊天室","need-rights":!0,toLogin:!0}),u("div",z,[u("div",{class:"history-box",ref_key:"historyBox",ref:v},[u("div",G,[u("button",{class:h(["get-more",{disabled:0!=o(q)}]),onClick:t[0]||(t[0]=(...e)=>o(Q)&&o(Q)(...e))},[u("span",null,c(o(H)),1)],2),(r(!0),i(k,null,b(o(B),(e=>(r(),x(L,{onRecall:t=>o(U)(e.id),data:e,key:e.id,right:e.user===o(T)},null,8,["onRecall","data","right"])))),128))])],512),u("div",V,[d(S,{name:"to-botton"},{default:m((()=>[l(u("button",{onClick:O,class:"to-bottom"},[u("span",null,[j(c(o(P))+" ",1),X])],512),[[n,o(P)>0]])])),_:1}),d(N,{"place-holder":"按下Ctrl+Enter以发送",onSpicalEnter:I,"other-buttons":[{event:"send",inner:'发送<span class="demo-icon"><span>'}],headerLevelStart:2,"max-editor-height":o(g),content:o($),"onUpdate:content":t[1]||(t[1]=e=>_($)?$.value=e.target.value:$=e.target.value),onCustomButtomClick:E},null,8,["other-buttons","max-editor-height","content"])])])],64))}},[["__scopeId","data-v-82a96390"]])).mount("#app");
