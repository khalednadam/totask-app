import{_ as k}from"./BlogCard-e2952738.js";import{P as B,S as V,r as c,T as x,H as P,c as l,o as n,d as p,g as a,w as i,f as C,F as _,j as g,h as N,l as b}from"./index-ed4259d6.js";import"./FullDate-8096fc35.js";const E=C("h1",null," Blog ",-1),$={__name:"Blogs",setup(F){const v=B();V();const r=c(!1),u=c([]),e=c(Number(v.query.page)||1),d=async()=>{r.value=!0;try{const o=await b.get("/blog/posts",{params:{limit:9,page:e.value},withCredentials:!0});u.value=o.data}catch(o){console.log(o)}finally{r.value=!1}};x(async()=>{await d()});const f=()=>{window.history.replaceState(null,"",`?page=${e.value}`)};return P(e,()=>{d()},{deep:!0,immediate:!0}),(o,s)=>{const w=l("v-skeleton-loader"),m=l("v-col"),y=l("v-row"),h=l("v-pagination");return n(),p("div",null,[E,a(y,{class:"mt-5"},{default:i(()=>[r.value?(n(),p(_,{key:0},g(12,t=>a(m,{cols:"12",md:"3"},{default:i(()=>[a(w,{type:"card"})]),_:1})),64)):(n(!0),p(_,{key:1},g(u.value.results,t=>(n(),N(m,{cols:"12",md:"3"},{default:i(()=>[a(k,{post:t},null,8,["post"])]),_:2},1024))),256))]),_:1}),a(h,{modelValue:e.value,"onUpdate:modelValue":[s[0]||(s[0]=t=>e.value=t),s[1]||(s[1]=t=>f())],color:"primary",length:u.value.totalPages,rounded:"large"},null,8,["modelValue","length"])])}}};export{$ as default};