import{u as x,c as t,o as g,h,w as o,g as e,k as r,t as l,e as _}from"./index-ed4259d6.js";import{_ as b}from"./FullDate-8096fc35.js";const B={__name:"BlogCard",props:{post:Object},setup(a){const n=x();return(k,C)=>{const d=t("v-img"),i=t("v-card-title"),m=t("v-card-text"),u=t("v-btn"),v=t("router-link"),f=t("v-card-actions"),p=t("v-card");return g(),h(p,{elevation:"1"},{default:o(()=>[e(d,{src:a.post.cover,cover:"",height:"200"},null,8,["src"]),e(i,null,{default:o(()=>[r(l(a.post.title),1)]),_:1}),e(m,{class:"max-w-full truncate"},{default:o(()=>[e(b,{date:a.post.createdAt,"include-time":!1,class:"text-xs mt-1"},null,8,["date"])]),_:1}),e(f,{class:"justify-end"},{default:o(()=>{var c;return[e(v,{to:((c=_(n).user)==null?void 0:c.role)==="admin"?`/admin/blog/${a.post.id}`:`/home/blog/${a.post.id}`},{default:o(()=>[e(u,{variant:"flat",color:"primary"},{default:o(()=>{var s;return[r(l(((s=_(n).user)==null?void 0:s.role)==="admin"?"Edit":"Read"),1)]}),_:1})]),_:1},8,["to"])]}),_:1})]),_:1})}}};export{B as _};