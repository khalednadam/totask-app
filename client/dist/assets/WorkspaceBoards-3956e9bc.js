import{P as z,U as G,a as J,a8 as K,a9 as M,r as _,H as O,c as l,o as d,d as p,f as g,t as Q,e as o,g as a,w as s,F as v,l as D,I,j as L,h as b,i as X,k as B}from"./index-bb5a7992.js";import{A as Y,_ as Z}from"./AddNewBoardButton-6788066b.js";import ee from"./DangerDeleteModal-ce517b2b.js";const ae={class:"flex gap-2 items-center"},oe={class:"pt-2 pb-4"},te={class:"space-x-2"},de={__name:"WorkspaceBoards",setup(se){const f=z(),N=G(),{boards:h,isLoading:k}=J(f.params.workspaceId),{closedBoards:$,closedBoardsLoading:A}=K(f.params.workspaceId),{workspace:n}=M(f.params.workspaceId),i=_(!1),x=_(!1),c=_(!1),T=[{title:"Name",value:"name"},{title:"Actions",key:"actions",sortable:!1}],U=r=>{k.value=!0,D.delete(`/b/${r}`,{withCredentials:!0}).then(t=>{N.success("Deleted"),i.value=!1,c.value=!1}).catch(t=>{console.log(t)}).finally(()=>{k.value=!1})},F=r=>{x.value=!0,D.put(`/b/${r.id}`,{workspace:r.workspace.id,closed:!1},{withCredentials:!0}).then(t=>{i.value=!1}).catch(t=>{console.log(t)}).finally(()=>{x.value=!1})},u=_(null),R=r=>{u.value=r,c.value=!0};return O(c,()=>{c||(u.value=null)}),(r,t)=>{var C,y,V;const m=l("v-btn"),W=l("router-link"),j=l("v-skeleton-loader"),w=l("v-col"),E=l("v-row"),H=l("v-data-table"),P=l("v-card-text"),S=l("v-card"),q=l("v-dialog");return d(),p(v,null,[g("div",ae,[g("h1",oe,Q((C=o(n))==null?void 0:C.name),1),a(W,{to:`/w/settings/${(y=o(n))==null?void 0:y._id}`},{default:s(()=>[a(m,{icon:"",variant:"text"},{default:s(()=>[a(o(I),{icon:"ph:pencil-simple-line",width:"25"})]),_:1})]),_:1},8,["to"])]),a(E,null,{default:s(()=>[o(k)?(d(),p(v,{key:0},L(3,e=>a(w,{cols:"12",md:"3",key:e},{default:s(()=>[a(j,{class:"h-[125px] overflow-hidden rounded-lg",rounded:"lg",type:"card"})]),_:2},1024)),64)):(d(),p(v,{key:1},[o(n)&&o(n).isAdmin?(d(),b(w,{cols:"12",md:"3",key:o(n)},{default:s(()=>{var e;return[(d(),b(Y,{"is-card":!0,workspace:(e=o(n))==null?void 0:e.id,key:o(n),onClick:()=>{},members:o(n).members,boards:o(h)},null,8,["workspace","members","boards"]))]}),_:1})):X("",!0),(d(!0),p(v,null,L(o(h),e=>(d(),b(w,{cols:"12",md:"3",key:e.id},{default:s(()=>[a(Z,{board:e},null,8,["board"])]),_:2},1024))),128))],64))]),_:1}),a(m,{class:"mt-5",onClick:t[0]||(t[0]=e=>i.value=!0)},{default:s(()=>[B(" View closed boards ")]),_:1}),a(q,{width:"500",modelValue:i.value,"onUpdate:modelValue":t[1]||(t[1]=e=>i.value=e)},{default:s(()=>[a(S,null,{default:s(()=>[a(P,null,{default:s(()=>[a(H,{headers:T,items:o($)},{"item.exclusive":s(({item:e})=>[]),"item.actions":s(({item:e})=>[g("div",te,[a(m,{color:"error",variant:"flat",onClick:()=>R(e)},{default:s(()=>[a(o(I),{icon:"ph:x"}),B(" Delete ")]),_:2},1032,["onClick"]),a(m,{onClick:()=>F(e),color:"primary",variant:"flat"},{default:s(()=>[B(" Reopen ")]),_:2},1032,["onClick"])])]),_:1},8,["items"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(ee,{name:(V=u.value)==null?void 0:V.name,isLoading:o(A),modelValue:c.value,"onUpdate:modelValue":t[2]||(t[2]=e=>c.value=e),onDelete:t[3]||(t[3]=()=>U(u.value.id))},null,8,["name","isLoading","modelValue"])],64)}}};export{de as default};
