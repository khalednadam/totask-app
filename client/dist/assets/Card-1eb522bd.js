import{n as ee,s as te,S as ae,r as g,T as _,q as se,c as o,o as t,d as r,f as c,h as d,w as s,i as v,g as l,F as C,j as A,ag as le,m as b,t as m,e as h,I as f,k as T,M as ne,l as oe,ai as re}from"./index-28cae69c.js";import ce from"./DeleteModal-9c9b40c1.js";import{u as ie}from"./Board-3d0f3578.js";import"./favoriteBoards-d0f35b99.js";const ue={class:"relative"},de={key:0,class:"flex gap-2 items-center flex-wrap"},ve={class:"flex justify-between items-center"},pe={key:1,class:"!text-md max-w-[88%] truncate"},_e={class:"flex items-center gap-2"},me={key:1,class:"flex items-center gap-1"},he={key:2,class:"inline-flex items-center gap-1"},fe={class:"flex justify-between items-center"},ge={key:0,class:"flex pt-3 p-1 -space-x-2 overflow-hidden"},ye={class:"flex gap-3 items-center"},De={key:0,class:"inline-flex items-center gap-1"},xe={class:"text-xs"},ke={class:"bg-card"},we={__name:"Card",props:{card:Object,listName:String,members:Array},emits:["deleteCard"],setup($,{emit:Ce}){const a=$,z=ie(),{isActive:L,cardId:M}=te(z),F=ae(),O={year:"numeric",month:"short",day:"numeric"},q=g(),y=g(!1),e=g(a.card),I=g(null),k=g(null),E=_(()=>new Date(e.value.endDate)-new Date),w=_(()=>E.value/(1e3*60*60)),p=_(()=>new Date>new Date(e.value.endDate)&&!e.value.isComplete),V=_(()=>w.value<24&&w.value>0&&!e.value.isComplete),D=_(()=>w.value<-24&&!e.value.isComplete),S=_(()=>e.value.isComplete?"success":p.value&&D.value?"error":p.value&&!D.value?"error1":!p.value&&V.value?"alert2":""),G=_(()=>e.value.isComplete?"This card is complete":p.value&&D.value?"This card is past due":p.value&&!D.value?"This card is recently overdue":!p.value&&V.value?"This card is due in less than twenty-four hours":"This card is due later");se(()=>{a.card.startDate===null&&(k.value=new Date),a.card.endDate===null&&(I.value=new Date),q.value=[I.value,k.value]});const P=()=>{M.value=e.value.id,L.value=!0},R=()=>{oe.post("/card/create",{board:a.card.board,list:a.card.list.id,description:a.card.description,startDate:a.card.startDate,endDate:a.card.endDate,isComplete:a.card.isComplete,labels:a.card.labels.map(i=>i.id),assignees:a.card.assignees.map(i=>i.id),title:a.card.title,cover:a.card.cover,attachments:a.card.attachments},{withCredentials:!0}).then(i=>{re.emit("update-cards",e.value.board,[a.card.list.id]),F.success("card copied")}).catch(i=>{console.log(i)})};return(i,u)=>{const U=o("v-img"),B=o("v-tooltip"),H=o("v-card-title"),J=o("v-chip"),K=o("v-card-text"),Q=o("v-card"),W=o("v-btn"),N=o("v-list-item"),X=o("v-list"),Y=o("v-menu"),Z=o("v-dialog");return t(),r(C,null,[c("div",ue,[(t(),d(Q,{class:"my-1",onClick:P,ripple:!1,key:a.worksapceMembers},{default:s(()=>[e.value.cover?(t(),d(U,{key:0,src:e.value.cover,class:"",cover:"",height:"90"},null,8,["src"])):v("",!0),l(H,null,{default:s(()=>[e.value.labels&&e.value.labels.length>=1?(t(),r("div",de,[(t(!0),r(C,null,A(e.value.labels,n=>(t(),r("div",{class:"h-2 w-10 rounded",style:le({backgroundColor:n.color})},null,4))),256))])):v("",!0),c("div",ve,[e.value.title.length>10?(t(),d(B,{key:0,text:e.value.title},{activator:s(({props:n})=>[c("p",b(n,{class:"!text-md max-w-[88%] truncate"}),m(e.value.title),17)]),_:1},8,["text"])):(t(),r("p",pe,m(e.value.title),1))])]),_:1}),(t(),d(K,{key:e.value},{default:s(()=>{var n;return[c("div",_e,[e.value.description?(t(),d(h(f),{key:0,icon:"ph:text-align-left",width:"20"})):v("",!0),e.value.comments.length>0?(t(),r("div",me,[l(h(f),{icon:"ph:chat",width:"20"}),T(" "+m(e.value.comments.length),1)])):v("",!0),e.value.checklist?(t(),r("div",he,[l(h(f),{icon:"ph:list-checks",width:"20"}),c("p",null,m(e.value.checklist.checkedItemsCount)+" / "+m(((n=e.value.checklist.checklistItems)==null?void 0:n.length)||0),1)])):v("",!0)]),c("div",fe,[e.value.assignees.length>0?(t(),r("div",ge,[(t(!0),r(C,null,A(e.value.assignees,x=>(t(),d(ne,{key:x.id,user:x},null,8,["user"]))),128))])):v("",!0),c("div",ye,[e.value.attachments.length>0?(t(),r("div",De,[l(h(f),{icon:"ph:paperclip",width:"20"}),c("p",null,m(e.value.attachments.length),1)])):v("",!0)]),e.value.endDate?(t(),r("div",{key:k.value},[(t(),d(B,{text:G.value,key:S.value},{activator:s(({props:x})=>[(t(),d(J,b({key:p.value||e.value.endDate},x,{size:"small",color:S.value,rounded:"lg"}),{default:s(()=>{var j;return[c("p",xe,m(((j=new Date(e.value.endDate))==null?void 0:j.toLocaleString("en-GB",O))||null),1)]}),_:2},1040,["color"]))]),_:1},8,["text"]))])):v("",!0)])]}),_:1}))]),_:1})),c("div",ke,[l(Y,{rounded:"lg"},{activator:s(({props:n})=>[l(W,b(n,{icon:"",size:"35",class:"!absolute right-2 top-2",onClick:()=>{},variant:"text"}),{default:s(()=>[l(h(f),{icon:"ph:dots-three-outline-fill",width:"20"})]),_:2},1040)]),default:s(()=>[l(X,null,{default:s(()=>[l(N,{onClick:R},{prepend:s(()=>[l(h(f),{icon:"ph:copy",width:"20"})]),default:s(()=>[T(" Copy card ")]),_:1}),l(N,{"base-color":"error",onClick:u[0]||(u[0]=n=>y.value=!0)},{prepend:s(()=>[l(h(f),{icon:"ph:trash",width:"20"})]),default:s(()=>[T(" Delete card ")]),_:1})]),_:1})]),_:1})])]),l(Z,{width:"500",modelValue:y.value,"onUpdate:modelValue":u[3]||(u[3]=n=>y.value=n)},{default:s(()=>[l(ce,{title:"Are you sure you want to delete this card?","action-btn-text":"Delete",text:"All progress and information in this card will be deleted",onCancel:u[1]||(u[1]=()=>y.value=!1),onDelete:u[2]||(u[2]=()=>i.$emit("deleteCard",e.value.id))})]),_:1},8,["modelValue"])],64)}}},Se=ee(we,[["__scopeId","data-v-2ca6acba"]]);export{Se as default};
