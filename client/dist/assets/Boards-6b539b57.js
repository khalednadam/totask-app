import{A as J,_ as G}from"./AddNewBoardButton-c3d8736b.js";import{u as K,r as S,a as Q,b as N,c as r,o as s,d as c,e as o,f as _,g as e,w as t,I as k,t as T,h as i,i as B,m as W,R as D,F as h,j as b,k as w,_ as P,l as X,n as Y,p as Z,s as ee,q as te,v as se,x as oe,y as ae}from"./index-b1980d93.js";import{u as le}from"./favoriteBoards-44c469aa.js";const re={class:"flex mb-10 flex-col"},ne={class:"flex items-center pb-3 space-x-2"},ce={class:"font-normal"},ie={class:"flex items-center gap-2"},de=_("p",null," Get premium ",-1),ue={class:"flex justify-between items-center"},me={key:1},_e=_("p",{class:"text-sm opacity-75 font-bold"}," Get the most out of totask! ",-1),fe={class:"list-disc flex flex-col items-start mx-auto w-max justify-end"},ve={__name:"WorkspaceSummary",props:{workspace:Object,favoriteBoards:Array},setup(l){const u=l,C=K(),f=S(!1),{boards:g,isLoading:j}=Q(u.workspace.id,"updatedAt:desc",7),{isAdmin:$}=N(u.workspace,C.user.id),y=S(!1),m=S(!1),I=["Unlimited boards","Unlimited members","List colors","And more coming soon.."],q=async()=>{m.value=!0;try{await X.post("/premium-request/create",{workspace:u.workspace.id,user:C.user.id}),u.workspace.premiumRequested=!0}catch(V){console.log(V)}finally{m.value=!1,y.value=!1}};return(V,n)=>{const M=r("v-avatar"),v=r("v-btn"),A=r("v-tooltip"),z=r("v-skeleton-loader"),x=r("v-col"),d=r("v-card-text"),p=r("v-card"),O=r("v-row"),R=r("v-card-title"),F=r("v-list-subheader"),U=r("v-list"),L=r("v-dialog"),H=r("v-img");return s(),c("div",re,[(s(),c("div",{class:"flex items-center space-x-2 justify-between",key:o(g)},[_("div",ne,[e(M,{color:"grey",rounded:"lg",size:"large",class:"w-full"},{default:t(()=>[e(o(k),{icon:"ph:building-office",width:"30"})]),_:1}),_("h4",ce,T(l.workspace.name),1),l.workspace.isPremium?(s(),i(o(k),{key:0,icon:"ph:crown-simple-fill",width:"20",color:"gold"})):B("",!0)]),_("div",ie,[o($)||l.workspace.canMemberAddBoards?(s(),i(J,{key:0,"is-card":!1,workspace:l.workspace.id,onClick:()=>{},members:l.workspace.members,boards:o(g)},null,8,["workspace","members","boards"])):B("",!0),o($)?(s(),i(o(D),{key:1,to:`/w/settings/${l.workspace.id}`},{default:t(()=>[e(A,{text:"Settings"},{activator:t(({props:a})=>[o(N)(l.workspace,o(C).user.id)?(s(),i(v,W({key:0},a,{icon:"",variant:"tonal",size:"small"}),{default:t(()=>[e(o(k),{icon:"ph:gear",width:"20"})]),_:2},1040)):B("",!0)]),_:1})]),_:1},8,["to"])):B("",!0),e(A,{text:"Members"},{activator:t(({props:a})=>[e(v,W(a,{icon:"",variant:"tonal",size:"small",onClick:n[0]||(n[0]=()=>f.value=!0)}),{default:t(()=>[e(o(k),{icon:"ph:user",width:"20"})]),_:2},1040)]),_:1}),l.workspace.isPremium?B("",!0):(s(),i(v,{key:2,disabled:l.workspace.premiumRequested,onClick:n[1]||(n[1]=a=>y.value=!0),variant:"tonal",class:"!h-10"},{default:t(()=>[e(o(k),{icon:"ph:crown-simple",width:"20"}),de]),_:1},8,["disabled"]))])])),e(O,null,{default:t(()=>[o(j)?(s(),c(h,{key:0},b(3,a=>e(x,{cols:"12",md:"3",key:a},{default:t(()=>[e(z,{class:"h-[125px] overflow-hidden rounded-lg",rounded:"lg",type:"card"})]),_:2},1024)),64)):(s(!0),c(h,{key:1},b(o(g),a=>(s(),i(x,{cols:"12",md:"3",key:a.id},{default:t(()=>[(s(),i(G,{key:a.id,board:a},null,8,["board"]))]),_:2},1024))),128)),e(x,{cols:"12",md:"3"},{default:t(()=>[e(o(D),{to:`/w/${l.workspace.id}`},{default:t(()=>[e(p,{height:"120",class:"cursor-pointer",variant:"tonal"},{default:t(()=>[e(d,{class:"flex justify-center items-center flex-col h-full opacity-100"},{default:t(()=>[w(" See All ")]),_:1})]),_:1})]),_:1},8,["to"])]),_:1})]),_:1}),e(L,{class:"max-w-[500px]",modelValue:f.value,"onUpdate:modelValue":n[3]||(n[3]=a=>f.value=a)},{default:t(()=>[e(p,null,{default:t(()=>[e(d,{class:"relative"},{default:t(()=>[_("div",ue,[e(R,null,{default:t(()=>[w(" Workspace Members ")]),_:1}),e(v,{onClick:n[2]||(n[2]=()=>f.value=!1),size:"x-small",class:"absolute right-0 bottom-0",icon:"",variant:"text"},{default:t(()=>[e(o(k),{icon:"ph:x",width:"25"})]),_:1})]),e(U,{class:"space-y-3"},{default:t(()=>[e(F,null,{default:t(()=>[w(" Admins ")]),_:1}),(s(!0),c(h,null,b(l.workspace.admins,a=>(s(),i(P,{key:a.id,member:a},null,8,["member"]))),128))]),_:1}),l.workspace.members.length>0?(s(),i(U,{key:0,class:"space-y-3"},{default:t(()=>[e(F,null,{default:t(()=>[w(" Members ")]),_:1}),(s(!0),c(h,null,b(l.workspace.members,a=>(s(),i(P,{key:a.id,member:a},null,8,["member"]))),128))]),_:1})):(s(),c("p",me,"There are no members in this workspace"))]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(L,{modelValue:y.value,"onUpdate:modelValue":n[6]||(n[6]=a=>y.value=a),class:"md:max-w-[30vw] w-full"},{default:t(()=>[e(p,null,{default:t(()=>[e(v,{variant:"text",class:"!absolute right-1 top-1 z-50",icon:"",size:"35",onClick:n[4]||(n[4]=()=>y.value=!1)},{default:t(()=>[e(o(k),{icon:"ph:x"})]),_:1}),e(H,{class:"align-end text-white",height:"120",src:"/premiumbg.png",cover:""}),e(R,{class:"text-center"},{default:t(()=>[w(" Get totask premium "),_e]),_:1}),e(d,null,{default:t(()=>[_("ul",fe,[(s(),c(h,null,b(I,a=>_("li",null,T(a),1)),64))]),e(v,{onClick:q,loading:m.value,disabled:m.value||l.workspace.premiumRequested,color:"primary",class:"w-full mt-5",flat:""},{default:t(()=>[w(" Request totask premium ")]),_:1},8,["loading","disabled"]),e(v,{color:"primary",class:"w-full",variant:"text",flat:"",onClick:n[5]||(n[5]=()=>y.value=!1)},{default:t(()=>[w(" Cancel ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])])}}};const E=l=>(oe("data-v-563045dd"),l=l(),ae(),l),pe={key:0,class:"flex flex-col justify-center items-center gap-5 h-[95vh]"},ke={key:1},we={class:"flex items-center pb-3 space-x-2"},ge=E(()=>_("h4",{class:"font-normal"},"Favorite Boards",-1)),ye={key:2,class:"flex flex-col justify-center items-center gap-5 h-[95vh]"},he=E(()=>_("h2",null," There are no workspaces ",-1)),be={__name:"Boards",setup(l){const u=le(),C=Z(),f=S(!1),{recentWorkspaces:g,isLoading:j}=ee(C),$=S([]);return te(async()=>{await u.getFavoriteBoards(),$.value=u.favoriteBoards}),(y,m)=>{const I=r("v-progress-circular"),q=r("v-avatar"),V=r("v-col"),n=r("v-row"),M=r("v-btn"),v=r("v-dialog"),A=r("v-container");return o(j)?(s(),c("div",pe,[e(I,{color:"primary",indeterminate:"disable-shrink",size:"50",width:"5"})])):(s(),c("div",ke,[e(A,null,{default:t(()=>{var z,x;return[((z=o(u).favoriteBoards)==null?void 0:z.length)>0?(s(),i(n,{key:0,class:"mb-3"},{default:t(()=>[e(V,{cols:"12"},{default:t(()=>[_("div",we,[e(q,{color:"grey",rounded:"lg",size:"large",class:"w-full"},{default:t(()=>[e(o(k),{icon:"ph:star-fill",width:"30"})]),_:1}),ge]),e(n,{class:""},{default:t(()=>{var d;return[(s(!0),c(h,null,b((d=o(u))==null?void 0:d.favoriteBoards,p=>(s(),i(V,{cols:"12",md:"3"},{default:t(()=>[e(G,{board:p},null,8,["board"])]),_:2},1024))),256))]}),_:1})]),_:1})]),_:1})):B("",!0),((x=o(g))==null?void 0:x.length)>0&&o(g)?(s(!0),c(h,{key:1},b(o(g),d=>{var p;return s(),c("div",{class:"w-full",key:d},[(s(),i(ve,{key:$.value||o(u),workspace:d,favoriteBoards:(p=o(u))==null?void 0:p.favoriteBoards},null,8,["workspace","favoriteBoards"]))])}),128)):(s(),c("div",ye,[he,e(M,{size:"large",variant:"flat",color:"primary",onClick:m[0]||(m[0]=d=>f.value=!0)},{default:t(()=>[w(" Create workspace ")]),_:1}),e(v,{modelValue:f.value,"onUpdate:modelValue":m[2]||(m[2]=d=>f.value=d)},{default:t(()=>[e(se,{onToggleModal:m[1]||(m[1]=()=>f.value=!1)})]),_:1},8,["modelValue"])]))]}),_:1})]))}}},$e=Y(be,[["__scopeId","data-v-563045dd"]]);export{$e as default};