import{_ as x}from"./BlogCard-389d6f56.js";import{O as V,Q as N,r as i,S as P,G as C,c as t,o as r,d,f as g,g as e,w as s,k as j,F as m,j as v,h as E,l as F}from"./index-1b3ad5a7.js";const L={class:"mt-3 flex justify-between"},R=g("h1",null," Blog ",-1),A={__name:"BlogPosts",setup(S){const f=V();N();const c=i(!1),u=i([]),o=i(Number(f.query.page)||1),_=async()=>{c.value=!0;try{const l=await F.get("/blog/posts",{params:{limit:9,page:o.value},withCredentials:!0});u.value=l.data}catch(l){console.log(l)}finally{c.value=!1}};P(async()=>{await _()});const w=()=>{window.history.replaceState(null,"",`?page=${o.value}`)};return C(o,()=>{_()},{deep:!0,immediate:!0}),(l,n)=>{const y=t("v-btn"),k=t("router-link"),h=t("v-skeleton-loader"),p=t("v-col"),B=t("v-row"),b=t("v-pagination");return r(),d("div",null,[g("div",L,[R,e(k,{to:"/admin/blog/create"},{default:s(()=>[e(y,{color:"primary",variant:"flat"},{default:s(()=>[j(" Add new post ")]),_:1})]),_:1})]),e(B,{class:"mt-5"},{default:s(()=>[c.value?(r(),d(m,{key:0},v(12,a=>e(p,{cols:"12",md:"3"},{default:s(()=>[e(h,{type:"card"})]),_:1})),64)):(r(!0),d(m,{key:1},v(u.value.results,a=>(r(),E(p,{cols:"12",md:"3"},{default:s(()=>[e(x,{post:a},null,8,["post"])]),_:2},1024))),256))]),_:1}),e(b,{modelValue:o.value,"onUpdate:modelValue":[n[0]||(n[0]=a=>o.value=a),n[1]||(n[1]=a=>w())],color:"primary",length:u.value.totalPages,rounded:"large"},null,8,["modelValue","length"])])}}};export{A as default};