import{u as x,r as t,o as g,h as b,w as e,d as o,e as l,t as n,f as y,b as i}from"./index-4e88b1e2.js";const B={class:"text-xs mt-1"},D={__name:"BlogCard",props:{post:Object},setup(a){const c=x(),_={year:"numeric",month:"numeric",day:"numeric"};return(k,w)=>{const d=t("v-img"),u=t("v-card-title"),m=t("v-card-text"),v=t("v-btn"),p=t("router-link"),f=t("v-card-actions"),h=t("v-card");return g(),b(h,{elevation:"1"},{default:e(()=>[o(d,{src:a.post.cover,cover:"",height:"200"},null,8,["src"]),o(u,null,{default:e(()=>[l(n(a.post.title),1)]),_:1}),o(m,{class:"max-w-full truncate"},{default:e(()=>[y("p",B,n(new Date(a.post.createdAt).toLocaleString("en-GB",_)),1)]),_:1}),o(f,{class:"justify-end"},{default:e(()=>{var r;return[o(p,{to:((r=i(c).user)==null?void 0:r.role)==="admin"?`/admin/blog/${a.post.id}`:`/home/blog/${a.post.id}`},{default:e(()=>[o(v,{variant:"flat",color:"primary"},{default:e(()=>{var s;return[l(n(((s=i(c).user)==null?void 0:s.role)==="admin"?"Edit":"Read"),1)]}),_:1})]),_:1},8,["to"])]}),_:1})]),_:1})}}};export{D as _};