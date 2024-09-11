import{P as $,U as B,r as w,c as k,ao as E,o as m,d as y,h,w as v,g as d,e as r,as as V,ap as N,f as A,k as j,W as U,l as I,au as K,az as R,F as D,j as S,$ as T,al as W,am as z,af as P}from"./index-ed4259d6.js";import{t as F}from"./vue-draggable-plus-06c3f14a.js";const O={class:"min-w-[350px]"},q={class:"px-2 py-2"},G={class:"space-x-2 mt-3"},H={__name:"AddList",setup(C){const u=$(),f=B(),n=w(!1),o=w(""),i=w(!1),_=()=>{i.value=!0,I.post("/list/create",{board:u.params.boardId,name:o.value},{withCredentials:!0}).then(()=>{o.value="",f.success("List created")}).catch(a=>{console.log(a)}).finally(()=>{i.value=!1})};return(a,t)=>{const c=k("v-btn"),L=k("v-text-field"),b=k("v-card"),l=E("click-outside");return m(),y("div",O,[n.value?N((m(),h(b,{key:1,color:"list",rounded:"lg",class:"w-[272px]",onKeypress:t[4]||(t[4]=U(e=>_(),["enter"])),onKeydown:t[5]||(t[5]=U(e=>n.value=!1,["esc"]))},{default:v(()=>[A("div",q,[d(L,{autofocus:"",placeholder:"List name","hide-details":"",modelValue:o.value,"onUpdate:modelValue":t[1]||(t[1]=e=>o.value=e)},null,8,["modelValue"]),A("div",G,[d(c,{color:"primary",class:"",disabled:o.value.length===0||i.value,loading:i.value,onClick:t[2]||(t[2]=()=>_())},{default:v(()=>[j(" Add list ")]),_:1},8,["disabled","loading"]),d(c,{variant:"text",class:"",icon:"",size:"35",onClick:t[3]||(t[3]=()=>n.value=!1)},{default:v(()=>[d(r(V.Icon),{icon:"ph:x"})]),_:1})])])]),_:1})),[[l,()=>n.value=!1]]):(m(),h(c,{key:0,text:"Add a new list",color:"list",class:"flex w-[272px] font-bold justify-start text-start rounded",height:"60",rounded:"lg",onClick:t[0]||(t[0]=()=>n.value=!0),variant:"flat",elevation:"1"},{prepend:v(()=>[d(r(V.Icon),{icon:"ph:plus",class:""})]),_:1}))])}}},Q={__name:"DraggableLists",props:{isWorkspacePremium:Boolean},async setup(C){let u,f;const n=W(()=>z(()=>import("./List-29b034ed.js"),["assets/List-29b034ed.js","assets/index-ed4259d6.js","assets/index-57317e22.css","assets/vue-draggable-plus-06c3f14a.js","assets/List-21719728.css"])),o=w(!1),i=$(),_=B(),{lists:a,isLoading:t}=([u,f]=K(()=>R(i.params.boardId)),u=await u,f(),u),c=(l,e)=>{I.put(`/list/${l}`,{position:e},{withCredentials:!0}).then(()=>{P.emit("update-lists",{boardId:i.params.boardId})}).catch(s=>{console.log(s)})},L=l=>{let e=l.newIndex,s=a.value[e-1],p=a.value[e+1],g=a.value[e].position;s&&p?g=(s.position+p.position)/2:s?g=s.position+s.position/2:p&&(g=p.position/2),c(l.item.id,g)},b=l=>{o.value=!0,I.delete(`/list/${l}`,{withCredentials:!0}).then(()=>{_.success("List was deleted"),P.emit("update-lists",{boardId:i.params.boardId})}).catch(e=>{console.log(e)}).finally(()=>{o.value=!1})};return(l,e)=>(m(),y(D,null,[d(r(F),{ref:"el",group:"lists",handle:".header",modelValue:r(a),"onUpdate:modelValue":e[1]||(e[1]=s=>T(a)?a.value=s:null),animation:150,ghostClass:"ghost",class:"justify-between mx-3 max-h-[90%] flex flex-1 gap-3",scroll:"",scrollSensitivity:300,onUpdate:L,bubbleScroll:""},{default:v(()=>[(m(!0),y(D,null,S(r(a),(s,p)=>(m(),h(r(n),{key:s.id,"is-workspace-premium":C.isWorkspacePremium,"is-delete-loading":o.value,"is-list-loading":r(t),id:s.id.toString(),list:s,onDeleteList:e[0]||(e[0]=x=>b(x)),index:p,onUpdateIndex:x=>c(s.id,x)},null,8,["is-workspace-premium","is-delete-loading","is-list-loading","id","list","index","onUpdateIndex"]))),128))]),_:1},8,["modelValue"]),d(H)],64))}};export{Q as default};