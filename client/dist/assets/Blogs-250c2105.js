import{_ as B}from"./BlogCard-f18d143e.js";import{I as h,J as V,k as c,K as x,r as l,o as n,c as p,d as t,w as _,b as C,f as b,F as i,j as m,h as q,H as E}from"./index-3ee1bcb6.js";const F=b("h1",null," Blog ",-1),P={__name:"Blogs",setup(I){const v=h(),g=V(),r=c(!1),u=c([]),a=c(v.query.page||1),f=async()=>{r.value=!0;try{const o=await E.get("/blog/posts",{params:{limit:12,page:a.value},withCredentials:!0});u.value=o.data}catch(o){console.log(o)}finally{r.value=!1}};return x(async()=>{await f()}),(o,s)=>{const y=l("v-skeleton-loader"),d=l("v-col"),k=l("v-row"),w=l("v-pagination");return n(),p("div",null,[F,t(k,{class:"mt-5"},{default:_(()=>[r.value?(n(),p(i,{key:0},m(12,e=>t(d,{cols:"12",md:"3"},{default:_(()=>[t(y,{type:"card"})]),_:1})),64)):(n(!0),p(i,{key:1},m(u.value.results,e=>(n(),q(d,{cols:"12",md:"3"},{default:_(()=>[t(B,{post:e},null,8,["post"])]),_:2},1024))),256))]),_:1}),t(w,{modelValue:a.value,"onUpdate:modelValue":[s[0]||(s[0]=e=>a.value=e),s[1]||(s[1]=e=>C(g).replace({query:{page:a.value}}))],color:"primary",length:u.value.totalPages,rounded:"large"},null,8,["modelValue","length"])])}}};export{P as default};
