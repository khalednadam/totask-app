import{c as r,o as _,h,w as c,g as l,f as e,M as U,t as m,N as $,r as v,q as b,E as B,O as k,d as f,l as C,e as j,I as q,F as I,j as L}from"./index-76ec2bad.js";const N={class:"flex items-center gap-2"},S={class:"opacity-60 text-xs"},D={__name:"UserCard",props:{user:Object},setup(n){return(p,a)=>{const i=r("v-card-text"),u=r("v-card");return _(),h(u,null,{default:c(()=>[l(i,null,{default:c(()=>[e("div",N,[l(U,{user:n.user},null,8,["user"]),e("div",null,[e("h2",null,m(n.user.name),1),e("p",S," @"+m(n.user.username),1)])]),e("div",null,[e("p",null," email: "+m(n.user.email),1),e("p",null," registerd on: "+m(new Date(n.user.createdAt).toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric"})),1)])]),_:1})]),_:1})}}},E={class:"flex justify-between items-center"},F=e("h1",{class:"my-5"}," Users ",-1),M={class:"w-1/2"},A={__name:"Users",setup(n){const p=$(),a=v(null),i=v(!1),u=v({}),d=v(p.query.page||1),g=async()=>{i.value=!0,console.log(a.value||"hello");try{const t=await C.get("/users/",{params:{limit:12,page:d.value,username:a.value},withCredentials:!0});u.value=t.data}catch(t){console.log(t)}finally{i.value=!1}};return b(async()=>{await g()}),B(a,k(async()=>{var t;((t=a.value)==null?void 0:t.trim().length)===0&&typeof a.value=="string"&&(a.value=null),await g()},500)),(t,o)=>{const y=r("v-text-field"),w=r("v-col"),x=r("v-row"),V=r("v-pagination");return _(),f("div",null,[e("div",E,[F,e("div",M,[l(y,{clearable:"","hide-details":"",label:"Search",modelValue:a.value,"onUpdate:modelValue":o[0]||(o[0]=s=>a.value=s)},{"append-inner":c(()=>[l(j(q),{icon:"ph:magnifying-glass",width:"25"})]),_:1},8,["modelValue"])])]),e("div",null,[l(x,null,{default:c(()=>[(_(!0),f(I,null,L(u.value.results,s=>(_(),h(w,{cols:"4",key:s._id},{default:c(()=>[l(D,{user:s},null,8,["user"])]),_:2},1024))),128))]),_:1})]),l(V,{modelValue:d.value,"onUpdate:modelValue":[o[1]||(o[1]=s=>d.value=s),o[2]||(o[2]=s=>t.$router.replace({query:{page:d.value}}))],color:"primary",length:u.value.totalPages,rounded:"large"},null,8,["modelValue","length"])])}}};export{A as default};
