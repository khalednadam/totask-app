import{s as w,U as F,c as e,o as s,h as b,w as t,g as r,e as n,I as S,a9 as C,m as N,f as k,t as y,a as $,d as m,k as z,F as T,j as V}from"./index-b477b231.js";import{u as L}from"./favoriteBoards-962c6a92.js";const P={class:"max-w-[95%] truncate"},W={__name:"SidebarWorkspaceBoardItem",props:{boardName:String,boardId:String,boardBackgroundColor:String},setup(o){const d=L(),c=o,{favoriteBoards:i}=w(d),{addToFavorite:u,removeFromFavorite:v,getFavoriteBoards:_}=d,a=F(()=>i.value.some(l=>l.id===c.boardId));return(l,p)=>{const f=e("v-avatar"),g=e("router-link"),B=e("v-tooltip"),I=e("v-btn"),h=e("v-list-item");return s(),b(h,{active:l.$route.fullPath===`/b/${o.boardId}`},{prepend:t(()=>[r(f,{size:"small",color:o.boardBackgroundColor,rounded:"lg"},null,8,["color"])]),append:t(()=>[r(I,{onClick:p[0]||(p[0]=()=>a.value?n(v)(o.boardId):n(u)(o.boardId)),icon:"",variant:"text",size:"x-small",class:"ml-3 group/fav z-50",ripple:!1},{default:t(()=>[r(n(S),{icon:a.value?"ph:star-fill":"ph:star",width:"20",class:C(["",a.value?"text-yellow-400":""])},null,8,["icon","class"])]),_:1})]),default:t(()=>[r(B,{text:o.boardName},{activator:t(({props:x})=>[r(g,N(x,{to:`/b/${o.boardId}`}),{default:t(()=>[k("p",P,y(o.boardName),1)]),_:2},1040,["to"])]),_:1},8,["text"])]),_:1},8,["active"])}}},j={key:0},D={key:1},E={class:"mt-2 space-y-2"},q={__name:"InBoardWorkspaceBoards",props:{workspaceId:String},setup(o){const d=o,{boards:c,isLoading:i}=$(d.workspaceId);return(u,v)=>{const _=e("v-list-item-subtitle");return n(i)?(s(),m("div",j," loading... ")):(s(),m("div",D,[r(_,{class:""},{default:t(()=>[z(" This workspace's boards ")]),_:1}),k("div",E,[(s(!0),m(T,null,V(n(c),a=>(s(),b(W,{"board-id":a.id,"board-background-color":a.backgroundColor,"board-name":a.name},null,8,["board-id","board-background-color","board-name"]))),256))])]))}}};export{q as default};
