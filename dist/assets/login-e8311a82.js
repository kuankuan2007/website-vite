import{_ as a,a as e,o as t,b as l,d as r,e as s,u,j as o,F as n,l as f,p as i,f as v,s as p,x as m,i as d}from"./all-b9340eea.js";import{m as g}from"./header-795b47a1.js";import{i as b}from"./text-0fe24a9a.js";import{i as c}from"./button-8505e708.js";const h={class:"main"},j=(a=>(i("data-v-2bbf27a6"),a=a(),v(),a))((()=>s("h1",{class:"title"},"登录",-1))),_={class:"bottom-button"},w=["href"],x=["href"];d(a({__name:"App",setup(a){let i=e(""),v=e(""),d=e(null),k=e(null),y=[d,k];function I(){for(let a of y){if(-1==a.value.wrong)return void p(`请填写${a.value.title}字段`);if(0!=a.value.wrong)return void p(a.value.reminder[a.value.wrong-1])}m(i.value,v.value).then((a=>{!0===a&&(location.href=f("from","/")),p("账号或密码错误")}))}return(a,e)=>(t(),l(n,null,[r(g,{title:"登录",jump:"/user/"}),s("div",h,[j,r(b,{ref_key:"flagInput",ref:d,class:"input-box",type:"text",title:"用户名/邮箱",value:u(i),"onUpdate:value":e[0]||(e[0]=a=>o(i)?i.value=a.target.value:i=a.target.value)},null,8,["value"]),r(b,{ref_key:"passwordInput",ref:k,class:"input-box",type:"password",title:"密码",value:u(v),"onUpdate:value":e[1]||(e[1]=a=>o(v)?v.value=a.target.value:v=a.target.value)},null,8,["value"]),r(c,{value:"确认",onClick:I}),s("div",_,[s("p",null,[s("a",{href:`/login/reset/?from=${u(f)("from","/")}`},"忘记密码",8,w)]),s("p",null,[s("a",{href:`/signup/?from=${u(f)("from","/")}`},"注册",8,x)])])])],64))}},[["__scopeId","data-v-2bbf27a6"]])).mount("#app");
