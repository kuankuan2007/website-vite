import{_ as e,a,o as l,b as t,d as u,e as s,u as r,q as n,j as i,v as o,F as v,B as p,s as f,C as m,l as d,p as c,f as y,i as g}from"./all-b9340eea.js";import{m as k}from"./header-795b47a1.js";import{i as b}from"./text-0fe24a9a.js";import{i as h,a as x}from"./emailCode-824413c3.js";import{i as _}from"./button-8505e708.js";const j={class:"main"},w=(e=>(c("data-v-9f7ee265"),e=e(),y(),e))((()=>s("h1",{class:"title"},"重置密码",-1))),I={class:"bottom-button"},$=["href"],C=["href"];g(e({__name:"App",setup(e){let c=a(""),y=a(""),g=a(""),A=a(null),U=a(null),z=a(null),Z=a(0),q=a(""),B=a(""),F=a(null),R=a(null),D=[F,R];function E(){if(0===Z.value)p(c.value).then((e=>{y.value=e.name,g.value=e.email,Z.value=1}),(e=>{f("用户不存在")}));else if(1==Z.value)U.value.check().then((()=>{Z.value=2}));else if(2==Z.value)z.value.check().then((()=>{Z.value=3}));else if(3==Z.value){for(let e of D){if(-1==e.value.wrong)return void f(`请填写${e.value.title}字段`);if(0!=e.value.wrong)return void f(e.value.reminder[e.value.wrong-1])}m(c.value,q.value)}}return(e,a)=>(l(),t(v,null,[u(k,{title:"登录",jump:"/user/"}),s("div",j,[w,0===r(Z)?(l(),n(b,{key:0,ref_key:"flagInput",ref:A,class:"input-box",type:"text",title:"用户名/邮箱",value:r(c),"onUpdate:value":a[0]||(a[0]=e=>i(c)?c.value=e.target.value:c=e.target.value)},null,8,["value"])):o("",!0),1===r(Z)?(l(),n(b,{key:1,class:"input-box",type:"text",title:"用户名",value:r(y),disabled:!0},null,8,["value"])):o("",!0),1===r(Z)?(l(),n(h,{key:2,class:"input-box",ref_key:"imageCodeInput",ref:U},null,512)):o("",!0),2===r(Z)?(l(),n(b,{key:3,class:"input-box",type:"email",title:"邮箱",value:r(g),disabled:!0},null,8,["value"])):o("",!0),2===r(Z)?(l(),n(x,{key:4,class:"input-box",ref_key:"emailCodeInput",ref:z},null,512)):o("",!0),3==r(Z)?(l(),n(b,{key:5,ref_key:"passwordInput",ref:F,class:"input-box",type:"password",title:"密码",value:r(q),"onUpdate:value":a[1]||(a[1]=e=>i(q)?q.value=e.target.value:q=e.target.value),reminder:["密码太短","密码太长","密码需要包含数字","密码需要包含字母","密码不能包含特殊字符"],tester:e=>(r(R).refreshReminder(r(B),e),e.length<6?1:e.length>32?2:/^(?=.*[0-9]).{6,32}$/.test(e)?/^(?=.*[a-zA-Z]).{6,32}$/.test(e)?/^[a-zA-Z0-9]{6,32}$/.test(e)?0:5:4:3)},null,8,["value","tester"])):o("",!0),3==r(Z)?(l(),n(b,{key:6,ref_key:"passwordInput2",ref:R,class:"input-box",type:"password",title:"确认密码",value:r(B),disabled:!1,"onUpdate:value":a[2]||(a[2]=e=>i(B)?B.value=e.target.value:B=e.target.value),reminder:["密码不匹配"],tester:(e,a=r(q))=>e===a?0:1},null,8,["value","tester"])):o("",!0),u(_,{value:3!=r(Z)?"下一步":"确认",onClick:E},null,8,["value"]),s("div",I,[s("p",null,[s("a",{href:`/login/?from=${r(d)("from","/")}`},"登录",8,$)]),s("p",null,[s("a",{href:`/signup/?from=${r(d)("from","/")}`},"注册",8,C)])])])],64))}},[["__scopeId","data-v-9f7ee265"]])).mount("#app");
