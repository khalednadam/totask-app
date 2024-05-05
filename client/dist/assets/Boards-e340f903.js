import{A as T,_ as I}from"./AddNewBoardButton-9b9cf8a4.js";import{u as W,a as z,r,o,c as n,b as s,d as e,w as a,e as b,t as j,f as S,g as M,h as u,i as N,F as p,j as w,R,_ as U,k as D,l as F,s as q,m as E,n as O,p as G,q as H}from"./index-3de71724.js";import{u as J}from"./favoriteBoards-3880324a.js";const K={class:"font-normal"},P={__name:"WorkspaceSummary",props:{workspace:Object,favoriteBoards:Array},setup(t){const l=t,g=W(),{boards:d,isLoading:m}=z(l.workspace.id,"updatedAt:desc",4);return(C,h)=>{const A=r("v-avatar"),c=r("v-col"),B=r("v-skeleton-loader"),x=r("v-card-text"),v=r("v-card"),f=r("v-row");return o(),n(p,null,[(o(),n("div",{class:"flex items-center py-5 space-x-2",key:s(d)},[e(A,{color:"primary",rounded:"lg",size:"large",class:"w-full"},{default:a(()=>[b(j(t.workspace.name[0].toUpperCase()),1)]),_:1}),S("h4",K,j(t.workspace.name),1)])),e(f,null,{default:a(()=>{var k;return[s(M)(t.workspace,(k=s(g).user)==null?void 0:k.id)||t.workspace.canMemberAddBoards?(o(),u(c,{key:0,cols:"12",md:"3"},{default:a(()=>[e(T,{workspace:t.workspace.id,onClick:()=>{},members:t.workspace.members,boards:s(d)},null,8,["workspace","members","boards"])]),_:1})):N("",!0),s(m)?(o(),n(p,{key:1},w(3,_=>e(c,{cols:"12",md:"3",key:_},{default:a(()=>[e(B,{class:"h-[125px] overflow-hidden rounded-lg",rounded:"lg",type:"card"})]),_:2},1024)),64)):(o(!0),n(p,{key:2},w(s(d),_=>(o(),u(c,{cols:"12",md:"3",key:_.id},{default:a(()=>[(o(),u(I,{key:_.id,board:_},null,8,["board"]))]),_:2},1024))),128)),e(c,{cols:"12",md:"3"},{default:a(()=>[e(s(R),{to:`/w/${t.workspace.id}`},{default:a(()=>[e(v,{height:"120",class:"!bg-primary dark:!bg-primary/50 cursor-pointer"},{default:a(()=>[e(x,{class:"flex justify-center items-center flex-col h-full opacity-100"},{default:a(()=>[b(" See All ")]),_:1})]),_:1})]),_:1},8,["to"])]),_:1})]}),_:1})],64)}}};const L=t=>(G("data-v-8f8b7627"),t=t(),H(),t),Q={key:0,class:"flex flex-col justify-center items-center gap-5 h-[95vh]"},X={key:1},Y=L(()=>S("h2",{class:"text-2xl"},"Favorite Boards",-1)),Z={key:2,class:"flex flex-col justify-center items-center gap-5 h-[95vh]"},ee=L(()=>S("h2",null," There are no workspaces ",-1)),oe={__name:"Boards",setup(t){const l=J(),g=D(),d=F(!1),{recentWorkspaces:m,isLoading:C}=q(g),h=F([]);return E(async()=>{await l.getFavoriteBoards(),h.value=l.favoriteBoards}),(A,c)=>{var V,$;const B=r("v-progress-circular"),x=r("v-divider"),v=r("v-col"),f=r("v-row"),k=r("v-btn"),_=r("v-dialog");return s(C)?(o(),n("div",Q,[e(B,{color:"primary",indeterminate:"disable-shrink",size:"50",width:"5"})])):(o(),n("div",X,[((V=s(l).favoriteBoards)==null?void 0:V.length)>0?(o(),u(f,{key:0},{default:a(()=>[e(v,{cols:"12"},{default:a(()=>[Y,e(x),e(f,{class:"mt-2"},{default:a(()=>{var i;return[(o(!0),n(p,null,w((i=s(l))==null?void 0:i.favoriteBoards,y=>(o(),u(v,{cols:"12",md:"3"},{default:a(()=>[e(I,{board:y},null,8,["board"])]),_:2},1024))),256))]}),_:1})]),_:1})]),_:1})):N("",!0),(($=s(m))==null?void 0:$.length)>0&&s(m)?(o(!0),n(p,{key:1},w(s(m),i=>{var y;return o(),n("div",{class:"w-full",key:i},[(o(),u(P,{key:h.value||s(l),workspace:i,favoriteBoards:(y=s(l))==null?void 0:y.favoriteBoards},null,8,["workspace","favoriteBoards"]))])}),128)):(o(),n("div",Z,[ee,e(k,{size:"large",variant:"flat",color:"primary",onClick:c[0]||(c[0]=i=>d.value=!0)},{default:a(()=>[b(" Create workspace ")]),_:1}),e(_,{modelValue:d.value,"onUpdate:modelValue":c[2]||(c[2]=i=>d.value=i)},{default:a(()=>[e(O,{onToggleModal:c[1]||(c[1]=()=>d.value=!1)})]),_:1},8,["modelValue"])]))]))}}},re=U(oe,[["__scopeId","data-v-8f8b7627"]]);export{re as default};
