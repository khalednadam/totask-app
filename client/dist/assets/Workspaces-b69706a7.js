import{r as m,c as r,o as i,d as p,g as o,w as v,f as u,t as y,l as k,N as b,q as x,E as B,O as P,e as $,I as C,F as W,j,h as q}from"./index-33d3f48a.js";const I={key:0},L={key:1},N={__name:"WorkspaceCard",props:{workspace:Object},setup(s){const f=s,e=m(!1),_=async c=>{e.value=!0;try{await k.put(`/w/${f.workspace.id}`,{isPremium:c},{})}catch(a){console.log(a)}finally{e.value=!1}};return(c,a)=>{const g=r("v-switch"),l=r("v-card-text"),t=r("v-card");return i(),p("div",null,[o(t,null,{default:v(()=>[o(l,null,{default:v(()=>{var w;return[u("div",null,[u("h3",null,y(s.workspace.name),1)]),u("div",null,[s.workspace.createdBy?(i(),p("p",I," Created by: @"+y((w=s.workspace.createdBy)==null?void 0:w.username),1)):(i(),p("p",L)),o(g,{inset:"",loading:e.value,disabled:e.value,"onUpdate:modelValue":[a[0]||(a[0]=d=>_(d)),a[1]||(a[1]=d=>s.workspace.isPremium=d)],label:"Premium",color:"primary",modelValue:s.workspace.isPremium},null,8,["loading","disabled","modelValue"])])]}),_:1})]),_:1})])}}},U={class:"flex justify-between items-center"},E=u("h1",{class:"my-5"}," Workspaces ",-1),F={class:"w-1/2"},S={__name:"Workspaces",setup(s){const f=b(),e=m(null),_=m(!1),c=m({}),a=m(f.query.page||1),g=async()=>{_.value=!0,console.log(e.value||"hello");try{const l=await k.get("/w/",{params:{limit:12,page:a.value,username:e.value},withCredentials:!0});c.value=l.data}catch(l){console.log(l)}finally{_.value=!1}};return x(async()=>{await g()}),B(e,P(async()=>{var l;((l=e.value)==null?void 0:l.trim().length)===0&&typeof e.value=="string"&&(e.value=null),await g()},500)),(l,t)=>{const w=r("v-text-field"),d=r("v-col"),h=r("v-row"),V=r("v-pagination");return i(),p("div",null,[u("div",U,[E,u("div",F,[o(w,{clearable:"","hide-details":"",label:"Search",modelValue:e.value,"onUpdate:modelValue":t[0]||(t[0]=n=>e.value=n)},{"append-inner":v(()=>[o($(C),{icon:"ph:magnifying-glass",width:"25"})]),_:1},8,["modelValue"])])]),u("div",null,[o(h,null,{default:v(()=>[(i(!0),p(W,null,j(c.value.results,n=>(i(),q(d,{cols:"4",key:n._id},{default:v(()=>[o(N,{workspace:n},null,8,["workspace"])]),_:2},1024))),128))]),_:1})]),o(V,{modelValue:a.value,"onUpdate:modelValue":[t[1]||(t[1]=n=>a.value=n),t[2]||(t[2]=n=>l.$router.replace({query:{page:a.value}}))],color:"primary",length:c.value.totalPages,rounded:"large"},null,8,["modelValue","length"])])}}};export{S as default};
