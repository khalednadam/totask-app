import{r as C,N as I,S as V,aE as B,c as P,e as n,o as r,d as f,j as g,f as U,g as A,F as _,h as v,w as D,Z as E,az as S,aA as F,aF as N,l as x}from"./index-47941ccd.js";import{t as R}from"./vue-draggable-plus-873a481b.js";const T={__name:"DraggableLists",props:{isWorkspacePremium:Boolean},async setup(h){let l,u;const L=S(()=>F(()=>import("./List-8cf2e04c.js"),["assets/List-8cf2e04c.js","assets/index-47941ccd.js","assets/index-21614b54.css","assets/vue-draggable-plus-873a481b.js","assets/List-149bcd82.css"])),d=C(!1),k=I(),w=V(),{lists:o,isLoading:c}=([l,u]=B(()=>N(k.params.boardId)),l=await l,u(),l),p=(a,s)=>{x.put(`/list/${a}`,{position:s},{withCredentials:!0}).then(()=>{}).catch(t=>{console.log(t)})},y=a=>{let s=a.newIndex,t=o.value[s-1],e=o.value[s+1],i=o.value[s].position;t&&e?i=(t.position+e.position)/2:t?i=t.position+t.position/2:e&&(i=e.position/2),p(a.item.id,i)},b=a=>{d.value=!0,x.delete(`/list/${a}`,{withCredentials:!0}).then(()=>{w.success("List was deleted")}).catch(s=>{console.log(s)}).finally(()=>{d.value=!1})};return(a,s)=>{const t=P("v-progress-circular");return n(c)?(r(),f(_,{key:0},g(4,e=>U("div",{key:e,class:"px-5"},[A(t,{color:"primary",indeterminate:"disable-shrink",size:"50",width:"5"})])),64)):(r(),v(n(R),{key:1,ref:"el",group:"lists",handle:".header",modelValue:n(o),"onUpdate:modelValue":s[1]||(s[1]=e=>E(o)?o.value=e:null),animation:150,ghostClass:"ghost",class:"max-h-[90vh] inline-flex justify-between mx-3 gap-3",scroll:"",scrollSensitivity:300,onUpdate:y,bubbleScroll:""},{default:D(()=>[(r(!0),f(_,null,g(n(o),(e,m)=>(r(),v(n(L),{key:e.id,"is-workspace-premium":h.isWorkspacePremium,"is-delete-loading":d.value,"is-list-loading":n(c),id:e.id.toString(),list:e,onDeleteList:s[0]||(s[0]=i=>b(i)),index:m,onUpdateIndex:i=>p(e.id,i)},null,8,["is-workspace-premium","is-delete-loading","is-list-loading","id","list","index","onUpdateIndex"]))),128))]),_:1},8,["modelValue"]))}}};export{T as default};
