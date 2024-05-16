import{n as pe,ad as ve,S as me,r as x,aL as fe,s as _e,E as xe,c as f,ax as ge,o as s,h as _,w as o,g as a,m as O,f as y,d as g,t as ye,ar as K,e as p,I as k,i as b,F as S,j as B,ag as M,k as N,Z as Ce,V as W,az as Z,aA as q,l as L,ai as V,x as ke,y as he}from"./index-c4cb6045.js";import{t as we}from"./vue-draggable-plus-37354cf1.js";const G=d=>(ke("data-v-20cf1e45"),d=d(),he(),d),be={class:"flex justify-between items-center"},Le={key:1,class:"w-full"},Ve=G(()=>y("p",{class:"mb-2"}," Change list color ",-1)),De={class:"flex gap-2"},Ae={class:"flex mt-2 gap-2"},Ee={class:"overflow-y-auto px-2"},Se={key:0},Be={class:"px-2 block z-50 mb-2"},Ne={class:"px-2"},Ie=G(()=>y("div",null,[y("p",{class:"text-start text-md"},"Add a card")],-1)),Fe={class:"gap-2 flex"},ze={__name:"List",props:{list:Object,index:Number,members:Array,isListLoading:Boolean,isDeleteLoading:Boolean,isWorkspacePremium:Boolean},emits:["deleteList","updateIndex"],setup(d,{emit:$e}){var U;const H=Z(()=>q(()=>import("./DeleteModal-f70eee1f.js"),["assets/DeleteModal-f70eee1f.js","assets/index-c4cb6045.js","assets/index-681db4dc.css"])),J=Z(()=>q(()=>import("./Card-679e222d.js"),["assets/Card-679e222d.js","assets/index-c4cb6045.js","assets/index-681db4dc.css","assets/DeleteModal-f70eee1f.js","assets/Board-6c17c58b.js","assets/favoriteBoards-012023f2.js","assets/Board-8e86b755.css","assets/Card-b14bc89d.css"])),r=d,Q=ve(),z=me(),X=x(null),I=x((U=r.list)==null?void 0:U.name),h=x(""),w=x(!1),D=x(!1),{cards:v,isLoading:$}=fe(r.list.id,r.list.board),C=x(!1),A=x("");_e(Q);const E=x(!1),Y=t=>{w.value=!0,h.value=t},P=["#4BCE97","#F5CD47","#FEA362","#9F8FEF","#6CC3E0","#94C748","#E774BB","#579DFF"],ee=()=>{w.value=!1,le(),h.value=""},R=()=>{E.value=!0,L.post("/card/create",{board:r.list.board,list:r.list.id,title:A.value},{withCredentials:!0}).then(t=>{V.emit("update-cards",r.list.board,[r.list.id]),A.value="",v.value.push(t.data),z.success("card added")}).catch(t=>{console.log(t)}).finally(()=>{E.value=!1})},te=t=>{L.delete(`/card/${t}`,{withCredentials:!0}).then(()=>{V.emit("update-cards",r.list.board,[r.list.id]),z.success("card was deleted"),V.emit("delete-card",t)}).catch(e=>{console.log(e)})},le=()=>{L.put(`/list/${r.list.id}`,{name:h.value}).then(t=>{I.value=t.data.name}).catch(t=>{console.log(t)})},T=(t,e,n,l)=>{L.put(`/card/${t}`,{position:l,list:e},{params:{sortBy:"position:asc"},withCredentials:!0}).then(()=>{V.emit("update-cards",r.list.board,[e,n]),V.emit("update-card",t)}).catch(i=>{console.log(i)})},se=t=>{let e=t.newIndex,n=v.value[e-1],l=v.value[e+1],i=v.value[e],c=(i==null?void 0:i.position)||1024;n&&l?c=(n.position+l.position)/2:n?c=n.position+n.position/2:l?c=l.position/2:c=1024,T(i.id,r.list.id,i.list.id,c)},oe=t=>{let e=t.newIndex,n=v.value[e-1],l=v.value[e+1],i=v.value[e],c=(i==null?void 0:i.position)||1024;n&&l?c=(n.position+l.position)/2:n?c=n.position+n.position/2:l?c=l.position/2:c=1024,T(i.id,r.list.id,i.list.id,c)},ae=x(1),F=t=>{L.put(`/list/${r.list.id}`,{color:t}).then(e=>{I.value=e.data.name}).catch(e=>{console.log(e)})};return xe(v,()=>{ae.value=1}),(t,e)=>{const n=f("v-text-field"),l=f("v-btn"),i=f("v-list-item"),c=f("v-list"),ie=f("v-menu"),ne=f("v-card-title"),de=f("v-tooltip"),re=f("v-skeleton-loader"),ue=f("v-dialog"),ce=f("v-card"),j=ge("click-outside");return s(),_(ce,{variant:"elevated",rounded:"lg",color:d.list.color||"list",class:"w-[272px] mt-3 h-max max-h-max mb-5",id:d.list.id.toString()},{default:o(()=>[a(de,{text:d.list.name},{activator:o(({props:u})=>[a(ne,O(u,{class:"flex sticky z-20 flex-row items-center justify-between header"}),{default:o(()=>[y("div",be,[w.value?K((s(),g("div",Le,[a(n,{class:"text-2xl input",modelValue:h.value,"onUpdate:modelValue":e[1]||(e[1]=m=>h.value=m),"hide-details":"",autofocus:""},null,8,["modelValue"])])),[[j,ee]]):(s(),g("div",{key:0,onClick:e[0]||(e[0]=()=>Y(I.value)),class:"w-max max-w-[88%] truncate cursor-pointer text-xl py-2 px-2 m-[0.5px]"},ye(d.list.name),1)),a(ie,{rounded:"lg"},{activator:o(({props:m})=>[w.value?b("",!0):(s(),_(l,O({key:0,icon:"",variant:"text",size:"30",class:"bg-blue-200"},m),{default:o(()=>[a(p(k),{icon:"ph:dots-three-outline-fill"})]),_:2},1040))]),default:o(()=>[a(c,{rounded:"lg"},{default:o(()=>[d.isWorkspacePremium?(s(),_(i,{key:0,rounded:!1},{default:o(()=>[Ve,y("div",De,[(s(!0),g(S,null,B(P.slice(0,4),m=>(s(),_(l,{onClick:()=>F(m),flat:"",style:M({backgroundColor:m}),class:"h-8 cursor-pointer flex w-12 rounded-lg"},null,8,["onClick","style"]))),256))]),y("div",Ae,[(s(!0),g(S,null,B(P.slice(4,8),m=>(s(),_(l,{onClick:()=>F(m),flat:"",style:M({backgroundColor:m}),class:"h-8 cursor-pointer flex w-12 rounded-lg"},null,8,["onClick","style"]))),256))]),a(l,{onClick:e[2]||(e[2]=()=>F(null)),class:"w-full mt-2",variant:"tonal"},{default:o(()=>[N(" Remove list color ")]),_:1})]),_:1})):b("",!0),a(i,{onClick:e[3]||(e[3]=()=>C.value=!0),density:"compact",rounded:!1},{prepend:o(()=>[a(p(k),{icon:"ph:plus-circle",width:"25"})]),default:o(()=>[N(" Add card ")]),_:1}),a(i,{onClick:e[4]||(e[4]=m=>D.value=!0),disabled:d.isDeleteLoading,loading:d.isDeleteLoading,"base-color":"error",density:"compact",rounded:!1},{prepend:o(()=>[a(p(k),{icon:"ph:trash",width:"25"})]),default:o(()=>[N(" Delete this list ")]),_:1},8,["disabled","loading"])]),_:1})]),_:2},1024),w.value?(s(),_(l,{key:2,icon:"",variant:"tonal",color:"primary",size:"35",class:"mx-1"},{default:o(()=>[a(p(k),{icon:"ph:check"})]),_:1})):b("",!0)])]),_:2},1040)]),_:1},8,["text"]),y("div",Ee,[p($)||d.isListLoading?(s(),g("div",Se,[(s(!0),g(S,null,B(Math.floor(Math.random()*3)+1,u=>(s(),_(re,{key:u,class:"my-3",type:"card-avatar"}))),128))])):b("",!0),p($)?b("",!0):(s(),_(p(we),{key:1,ref_key:"el",ref:X,group:"cards",class:"space-y-3",modelValue:p(v),"onUpdate:modelValue":e[6]||(e[6]=u=>Ce(v)?v.value=u:null),animation:150,dragClass:"drag",ghostClass:"ghost",onUpdate:se,scroll:"",scrollSensitivity:300,bubbleScroll:"",onAdd:oe},{default:o(()=>[(s(!0),g(S,null,B(p(v),u=>(s(),_(p(J),{key:u.id,listName:d.list.name,card:u,onDeleteCard:e[5]||(e[5]=m=>te(m))},null,8,["listName","card"]))),128))]),_:1},8,["modelValue"]))]),K((s(),g("div",Be,[C.value?(s(),g("div",{key:1,class:"flex flex-col gap-2 px-1 pt-2 pb-2",onKeypress:e[11]||(e[11]=W(u=>R(),["enter"])),onKeydown:e[12]||(e[12]=W(u=>C.value=!1,["esc"]))},[a(n,{"single-line":"",autofocus:"",modelValue:A.value,"onUpdate:modelValue":e[8]||(e[8]=u=>A.value=u),placeholder:"Enter a title for this card",rows:"2","no-resize":"","hide-details":""},null,8,["modelValue"]),y("div",Fe,[a(l,{color:"primary",loading:E.value,disabled:E.value,onClick:e[9]||(e[9]=()=>R())},{default:o(()=>[N(" Add ")]),_:1},8,["loading","disabled"]),a(l,{variant:"text",icon:"",size:"35",onClick:e[10]||(e[10]=()=>C.value=!1)},{default:o(()=>[a(p(k),{icon:"ph:x",width:"25"})]),_:1})])],32)):(s(),_(l,{key:0,class:"w-full my-1 flex justify-start p-1",height:"40",variant:"text",onClick:e[7]||(e[7]=()=>C.value=!0)},{default:o(()=>[y("div",Ne,[a(p(k),{icon:"ph:plus",width:"20"})]),Ie]),_:1}))])),[[j,()=>C.value=!1]]),a(ue,{width:"500",modelValue:D.value,"onUpdate:modelValue":e[15]||(e[15]=u=>D.value=u)},{default:o(()=>[a(p(H),{title:"Are you sure you want to delete this list?",text:"All cards in this list will be deleted","action-btn-text":"Delete",onCancel:e[13]||(e[13]=()=>D.value=!1),onDelete:e[14]||(e[14]=()=>t.$emit("deleteList",d.list.id))})]),_:1},8,["modelValue"])]),_:1},8,["color","id"])}}},Te=pe(ze,[["__scopeId","data-v-20cf1e45"]]);export{Te as default};