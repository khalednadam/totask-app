import{a7 as w,N as F,r as e,o as s,h as p,w as t,d as r,b as n,M as S,a8 as C,O as N,f,t as y,a as $,c as u,e as z,F as T,j as V}from"./index-dfe76824.js";import{u as L}from"./favoriteBoards-1c496e06.js";const P={class:"max-w-[95%] truncate"},W={__name:"SidebarWorkspaceBoardItem",props:{boardName:String,boardId:String,boardBackgroundColor:String},setup(o){const d=L(),c=o,{favoriteBoards:i}=w(d),{addToFavorite:m,removeFromFavorite:v,getFavoriteBoards:_}=d,a=F(()=>i.value.some(l=>l.id===c.boardId));return(l,b)=>{const k=e("v-avatar"),g=e("router-link"),B=e("v-tooltip"),h=e("v-btn"),I=e("v-list-item");return s(),p(I,{active:l.$route.fullPath===`/b/${o.boardId}`},{prepend:t(()=>[r(k,{size:"small",color:o.boardBackgroundColor,rounded:"lg"},null,8,["color"])]),append:t(()=>[r(h,{onClick:b[0]||(b[0]=()=>a.value?n(v)(o.boardId):n(m)(o.boardId)),icon:"",variant:"text",size:"x-small",class:"ml-3 group/fav z-50",ripple:!1},{default:t(()=>[r(n(S),{icon:a.value?"ph:star-fill":"ph:star",width:"20",class:C(["",a.value?"text-yellow-400":""])},null,8,["icon","class"])]),_:1})]),default:t(()=>[r(B,{text:o.boardName},{activator:t(({props:x})=>[r(g,N(x,{to:`/b/${o.boardId}`}),{default:t(()=>[f("p",P,y(o.boardName),1)]),_:2},1040,["to"])]),_:1},8,["text"])]),_:1},8,["active"])}}},j={key:0},D={key:1},E={class:"mt-2 space-y-2"},R={__name:"InBoardWorkspaceBoards",props:{workspaceId:String},setup(o){const d=o,{boards:c,isLoading:i}=$(d.workspaceId);return(m,v)=>{const _=e("v-list-item-subtitle");return n(i)?(s(),u("div",j," loading... ")):(s(),u("div",D,[r(_,{class:""},{default:t(()=>[z(" This workspace's boards ")]),_:1}),f("div",E,[(s(!0),u(T,null,V(n(c),a=>(s(),p(W,{"board-id":a.id,"board-background-color":a.backgroundColor,"board-name":a.name},null,8,["board-id","board-background-color","board-name"]))),256))])]))}}};export{R as default};
