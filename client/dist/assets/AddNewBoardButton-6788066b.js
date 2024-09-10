import{r as k,q as N,v as $,V as h,c as l,o as c,d as _,g as t,w as s,aa as g,k as w,t as F,f as T,h as B,e as v,I as x,i as z,ab as M,p as S,ac as p,m as j}from"./index-bb5a7992.js";const I={class:"transition-all duration-200 hover:opacity-100 absolute bottom-0 rounded-b-lg w-full flex justify-end group-hover:bg-gradient-to-t group-hover:from-black/20 group-hover:via-black/10 group-hover:to-transparent"},q={__name:"BoardCard",props:{board:Object},setup(e){const r=e,d=k(!1),o=N(),{favoriteBoards:m}=$(o),{addToFavorite:u,removeFromFavorite:b}=o,n=h(()=>m.value.some(i=>i.id===r.board.id));return(i,a)=>{const f=l("v-card-title"),y=l("v-card"),C=l("router-link"),V=l("v-btn");return c(),_("div",{class:"relative group",onMouseover:a[1]||(a[1]=A=>d.value=!0),onMouseleave:a[2]||(a[2]=A=>d.value=!1)},[t(C,{to:{path:`/b/${e.board.id}`},class:"group"},{default:s(()=>[t(y,{class:g(["cursor-pointer",e.board.backgroundColor=="default"?"!bg-gray-300 dark:!bg-darkPrimary cursor-pointer":""]),"min-height":"120",color:e.board.backgroundColor==="default"?"":e.board.backgroundColor},{default:s(()=>[t(f,null,{default:s(()=>[w(F(e.board.name),1)]),_:1})]),_:1},8,["class","color"])]),_:1},8,["to"]),T("div",I,[t(M,{name:"slide-fade"},{default:s(()=>[d.value?(c(),B(V,{key:0,onClick:a[0]||(a[0]=()=>n.value?v(b)(e.board.id):v(u)(e.board.id)),icon:"",variant:"text",size:"x-small",class:"mr-2 mb-2 right-0 group/fav z-50 absolute block",ripple:!1},{default:s(()=>[t(v(x),{icon:n.value?"ph:star-fill":"ph:star",width:"15",class:g(["group-hover/fav:scale-150 transition-all",n.value?"text-yellow-400":"text-white"])},null,8,["icon","class"])]),_:1})):z("",!0)]),_:1})])],32)}}};const D={key:1},P={__name:"AddNewBoardButton",props:{workspace:String,members:Array,boards:Array,isCard:Boolean},setup(e){const r=k(!1);return(d,o)=>{const m=l("v-card-text"),u=l("v-dialog"),b=l("v-card"),n=l("v-btn"),i=l("v-tooltip");return e.isCard?(c(),B(b,{key:0,height:"120",variant:"tonal",class:"cursor-pointer",onClick:o[3]||(o[3]=a=>r.value=!r.value)},{default:s(()=>[t(m,{class:"flex justify-center items-center flex-col h-full opacity-100"},{default:s(()=>[w(" Add a new board ")]),_:1}),t(u,{modelValue:r.value,"onUpdate:modelValue":o[2]||(o[2]=a=>r.value=a)},{default:s(()=>[t(p,{members:e.members,workspace:e.workspace,boards:e.boards,onToggleModal:o[0]||(o[0]=()=>r.value=!1),onAddBoard:o[1]||(o[1]=a=>e.boards.unshift(a))},null,8,["members","workspace","boards"])]),_:1},8,["modelValue"])]),_:1})):(c(),_("div",D,[t(i,{text:"Add a board"},{activator:s(({props:a})=>[t(n,j(a,{icon:"",variant:"tonal",size:"small",onClick:o[4]||(o[4]=f=>r.value=!r.value)}),{default:s(()=>[t(v(x),{icon:"ph:plus",width:"20"})]),_:2},1040)]),_:1}),t(u,{scrollable:"",modelValue:r.value,"onUpdate:modelValue":o[7]||(o[7]=a=>r.value=a)},{default:s(()=>[t(p,{members:e.members,workspace:e.workspace,boards:e.boards,onToggleModal:o[5]||(o[5]=()=>r.value=!1),onAddBoard:o[6]||(o[6]=a=>e.boards.unshift(a))},null,8,["members","workspace","boards"])]),_:1},8,["modelValue"])]))}}},E=S(P,[["__scopeId","data-v-dc7b407d"]]);export{E as A,q as _};
