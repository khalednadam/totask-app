import{I,J as U,L as N,k as a,m as q,r as u,o as c,c as d,d as s,b as E,f as y,w as _,H as f,e as g}from"./index-3ee1bcb6.js";import{Q as L}from"./vue-quill.esm-bundler-05e21cb1.js";const Q={class:"my-5"},R=y("h1",{class:"my-5"}," Update a blog post ",-1),$={key:0},j={key:1},z={class:"mt-5 gap-2 flex justify-end"},A={__name:"BlogPost",setup(H){const x=I(),p=U(),b=N(),v=a(x.params.blogPostId),t=a(!1),e=a(),i=a([]),h=a("");a("");const n=a(e.text),k=()=>{},C=async()=>{t.value=!0;try{const o=await f.get(`/blog/${v.value}`,{withCredentials:!0});e.value=o.data,n.value=e.value.text}catch(o){console.log(o)}finally{t.value=!1}},w=()=>p.go(-1);q(async()=>{await C(),e.text=n.value});const V=async()=>{t.value=!0;try{const o=await f.put(`/blog/${v.value}`,{title:e.value.title,text:n.value,file:i.value[0]},{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0});b.success("Post updated"),p.go(-1)}catch(o){console.log(o)}finally{t.value=!1}};return(o,l)=>{const T=u("v-progress-circular"),B=u("v-text-field"),P=u("v-file-input"),m=u("v-btn");return c(),d("div",Q,[R,t.value||!e.value?(c(),d("p",$,[s(T,{color:"primary",indeterminate:"disable-shrink",size:"16",width:"2"})])):(c(),d("div",j,[s(B,{modelValue:e.value.title,"onUpdate:modelValue":l[0]||(l[0]=r=>e.value.title=r),label:"Title"},null,8,["modelValue"]),s(P,{variant:"outlined",label:"Cover",density:"compact",modelValue:i.value,"onUpdate:modelValue":l[1]||(l[1]=r=>i.value=r)},null,8,["modelValue"]),s(E(L),{ref_key:"quill",ref:h,toolbar:"essential",content:n.value,"onUpdate:content":l[2]||(l[2]=r=>n.value=r),onTextChange:k,contentType:"html",theme:"snow"},null,8,["content"]),y("div",z,[s(m,{variant:"outlined",color:"primary",onClick:w},{default:_(()=>[g(" Cancel ")]),_:1}),s(m,{onClick:V,flat:"",color:"primary",disabled:t.value,loading:t.value},{default:_(()=>[g(" Update ")]),_:1},8,["disabled","loading"])])]))])}}};export{A as default};
