import{c as r,o as v,h as y,w as i,g as l,f as e,N as U,t as m,O as $,r as _,v as k,G as f,P as C,d as h,l as N,e as S,I as j,F as I,j as L}from"./index-b477b231.js";const P={class:"flex items-center gap-2"},A={class:"opacity-60 text-xs"},D={__name:"UserCard",props:{user:Object},setup(n){return(g,t)=>{const d=r("v-card-text"),u=r("v-card");return v(),y(u,null,{default:i(()=>[l(d,null,{default:i(()=>[e("div",P,[l(U,{user:n.user},null,8,["user"]),e("div",null,[e("h2",null,m(n.user.name),1),e("p",A," @"+m(n.user.username),1)])]),e("div",null,[e("p",null," email: "+m(n.user.email),1),e("p",null," registerd on: "+m(new Date(n.user.createdAt).toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric"})),1)])]),_:1})]),_:1})}}},F={class:"flex justify-between items-center"},G=e("h1",{class:"my-5"}," Users ",-1),O={class:"w-1/2"},E={__name:"Users",setup(n){const g=$(),t=_(null),d=_(!1),u=_({}),c=_(Number(g.query.page)||1),p=async()=>{d.value=!0;try{const a=await N.get("/users/",{params:{limit:9,page:c.value,username:t.value,sortBy:"createdAt:desc"},withCredentials:!0});u.value=a.data}catch(a){console.log(a)}finally{d.value=!1}};k(async()=>{await p()});const w=()=>{window.history.replaceState(null,"",`?page=${c.value}`)};return f(c,()=>{p()},{deep:!0,immediate:!0}),f(t,C(async()=>{var a;((a=t.value)==null?void 0:a.trim().length)===0&&typeof t.value=="string"&&(t.value=null),await p()},500)),(a,o)=>{const x=r("v-text-field"),V=r("v-col"),b=r("v-row"),B=r("v-pagination");return v(),h("div",null,[e("div",F,[G,e("div",O,[l(x,{clearable:"","hide-details":"",label:"Search",modelValue:t.value,"onUpdate:modelValue":o[0]||(o[0]=s=>t.value=s)},{"append-inner":i(()=>[l(S(j),{icon:"ph:magnifying-glass",width:"25"})]),_:1},8,["modelValue"])])]),e("div",null,[l(b,{class:"h-full"},{default:i(()=>[(v(!0),h(I,null,L(u.value.results,s=>(v(),y(V,{cols:"12",md:"4",key:s._id},{default:i(()=>[l(D,{user:s},null,8,["user"])]),_:2},1024))),128))]),_:1})]),l(B,{modelValue:c.value,"onUpdate:modelValue":[o[1]||(o[1]=s=>c.value=s),o[2]||(o[2]=s=>w())],class:"mt-32",color:"primary",length:u.value.totalPages,rounded:"large"},null,8,["modelValue","length"])])}}};export{E as default};
