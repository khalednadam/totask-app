import{u as h,c as t,o as x,h as b,w as e,g as o,k as l,t as n,f as k,e as i}from"./index-b477b231.js";const y={class:"text-xs mt-1"},D={__name:"BlogCard",props:{post:Object},setup(a){const c=h(),_={year:"numeric",month:"numeric",day:"numeric"};return(B,w)=>{const d=t("v-img"),u=t("v-card-title"),m=t("v-card-text"),v=t("v-btn"),p=t("router-link"),f=t("v-card-actions"),g=t("v-card");return x(),b(g,{elevation:"1"},{default:e(()=>[o(d,{src:a.post.cover,cover:"",height:"200"},null,8,["src"]),o(u,null,{default:e(()=>[l(n(a.post.title),1)]),_:1}),o(m,{class:"max-w-full truncate"},{default:e(()=>[k("p",y,n(new Date(a.post.createdAt).toLocaleString("en-GB",_)),1)]),_:1}),o(f,{class:"justify-end"},{default:e(()=>{var s;return[o(p,{to:((s=i(c).user)==null?void 0:s.role)==="admin"?`/admin/blog/${a.post.id}`:`/home/blog/${a.post.id}`},{default:e(()=>[o(v,{variant:"flat",color:"primary"},{default:e(()=>{var r;return[l(n(((r=i(c).user)==null?void 0:r.role)==="admin"?"Edit":"Read"),1)]}),_:1})]),_:1},8,["to"])]}),_:1})]),_:1})}}};export{D as _};
