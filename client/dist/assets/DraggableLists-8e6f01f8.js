import{r as C,M as I,P,aC as V,c as B,e as n,o as r,d as f,j as g,f as D,g as U,F as x,h as _,w as A,X as E,ax as R,ay as S,aD as j,L as h}from"./index-d2e924b6.js";import{t as F}from"./vue-draggable-plus-9cd305ad.js";const W={__name:"DraggableLists",props:{isWorkspacePremium:Boolean},async setup(v){let l,u;const L=R(()=>S(()=>import("./List-ab2670c2.js"),["assets/List-ab2670c2.js","assets/index-d2e924b6.js","assets/index-7b084d9b.css","assets/vue-draggable-plus-9cd305ad.js","assets/List-13345cbb.css"])),d=C(!1),k=I(),w=P(),{lists:o,isLoading:c}=([l,u]=V(()=>j(k.params.boardId)),l=await l,u(),l),p=(a,s)=>{h.put(`/list/${a}`,{position:s},{withCredentials:!0}).then(()=>{}).catch(t=>{console.log(t)})},y=a=>{let s=a.newIndex,t=o.value[s-1],e=o.value[s+1],i=o.value[s].position;t&&e?i=(t.position+e.position)/2:t?i=t.position+t.position/2:e&&(i=e.position/2),p(a.item.id,i)},b=a=>{d.value=!0,h.delete(`/list/${a}`,{withCredentials:!0}).then(()=>{w.success("List was deleted")}).catch(s=>{console.log(s)}).finally(()=>{d.value=!1})};return(a,s)=>{const t=B("v-progress-circular");return n(c)?(r(),f(x,{key:0},g(4,e=>D("div",{key:e,class:"px-5"},[U(t,{color:"primary",indeterminate:"disable-shrink",size:"50",width:"5"})])),64)):(r(),_(n(F),{key:1,ref:"el",group:"lists",handle:".header",modelValue:n(o),"onUpdate:modelValue":s[1]||(s[1]=e=>E(o)?o.value=e:null),animation:150,ghostClass:"ghost",class:"flex flex-shrink h-[70%] max-h-[70%] justify-between mx-3 gap-3 mb-3",scroll:"",scrollSensitivity:300,onUpdate:y,bubbleScroll:""},{default:A(()=>[(r(!0),f(x,null,g(n(o),(e,m)=>(r(),_(n(L),{key:e.id,"is-workspace-premium":v.isWorkspacePremium,"is-delete-loading":d.value,"is-list-loading":n(c),id:e.id.toString(),list:e,onDeleteList:s[0]||(s[0]=i=>b(i)),index:m,onUpdateIndex:i=>p(e.id,i)},null,8,["is-workspace-premium","is-delete-loading","is-list-loading","id","list","index","onUpdateIndex"]))),128))]),_:1},8,["modelValue"]))}}};export{W as default};
