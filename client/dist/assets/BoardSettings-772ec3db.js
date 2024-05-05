import{az as I,aA as G,l as r,J as H,K as Q,r as s,o as P,c as W,f as l,d as o,w as a,b as $,N as M,h as X,i as Y,e as b,t as Z,F as ee,I as k,ag as y}from"./index-3de71724.js";import oe from"./DeleteModal-080161f4.js";const le={class:"w-full flex items-center"},te=l("h2",{class:"text-xl text-center w-full"}," Board Settings ",-1),ae={class:"px-4 pt-5"},se=l("p",null,"Background color",-1),ne={class:"w-full"},de=l("div",null,[l("h3",{class:"text-xl font-bold"},"Public"),l("p",null," All members in the workspace can view this board and contribute to it ")],-1),re=l("div",null,[l("h3",{class:"text-xl font-bold"},"Private"),l("p",null," Only members added to the board can view this board and contribute to it ")],-1),ie={class:"flex flex-row justify-end gap-5"},ue={class:"py-2"},ce={class:"flex justify-between items-center"},me=l("h1",{class:"px-5 py-3 text-xl"},"Delete Board?",-1),ve={class:"font-bold text-lg"},pe=l("p",null,"Things to know:",-1),be=l("ul",{class:"decoration-dotted list-disc px-5"},[l("li",{class:"decoration-dotted"}," This is permanent and can't be undone. "),l("li",null," All the data related to this board will be permanently deleted ")],-1),fe=l("p",{class:"pt-5 pb-1"},"Enter the board name to delete it",-1),xe={__name:"BoardSettings",props:I({board:Object,workspaceAllMembers:Array},{modelValue:{},modelModifiers:{}}),emits:I(["success"],["update:modelValue"]),setup(c,{emit:N}){const n=c,j=G(c,"modelValue"),f=N,m=r(!1),_=H(),w=r(n.board.name),x=r(n.board.description),g=r(n.board.backgroundColor),v=r(n.board.isPrivate),h=r(n.board.members),V=r(""),C=Q(),p=r(!1),i=r(!1),S=()=>{i.value=!0,k.put(`/b/${_.params.boardId}`,{workspace:n.board.workspace.id,closed:!0},{withCredentials:!0}).then(d=>{f("success"),y.emit("change-board-info",n.board.id),C.go(`/workspace/${n.board.workspace.id}`)}).catch(d=>{console.log(d)}).finally(()=>{i.value=!1})},T=()=>{i.value=!0,k.put(`/b/${_.params.boardId}`,{name:w.value,description:x.value,backgroundColor:g.value,isPrivate:v.value,members:h.value||[],workspace:n.board.workspace.id},{withCredentials:!0}).then(d=>{f("success"),y.emit("change-board-info",n.board.id)}).catch(d=>{console.log(d)}).finally(()=>{i.value=!1})},z=()=>{i.value=!0,k.delete(`/b/${_.params.boardId}`,{withCredentials:!0}).then(d=>{f("success"),y.emit("change-board-info",n.board.id),C.push("/")}).catch(d=>{console.log(d)}).finally(()=>{i.value=!1})};return(d,e)=>{const u=s("v-btn"),B=s("v-divider"),D=s("v-text-field"),E=s("v-textarea"),O=s("v-color-picker"),U=s("v-radio"),F=s("v-radio-group"),R=s("v-select"),J=s("v-card-text"),K=s("v-col"),L=s("v-row"),q=s("v-card"),A=s("v-dialog");return P(),W(ee,null,[l("div",le,[te,o(u,{variant:"text",class:"justify-self-end",icon:"",size:"35",onClick:e[0]||(e[0]=()=>j.value=!1)},{default:a(()=>[o($(M),{icon:"ph:x"})]),_:1})]),o(B),l("div",ae,[o(D,{modelValue:w.value,"onUpdate:modelValue":e[1]||(e[1]=t=>w.value=t),label:"Board name"},null,8,["modelValue"]),o(E,{modelValue:x.value,"onUpdate:modelValue":e[2]||(e[2]=t=>x.value=t),label:"Board description"},null,8,["modelValue"]),se,l("div",ne,[o(O,{class:"min-w-full",modelValue:g.value,"onUpdate:modelValue":e[3]||(e[3]=t=>g.value=t),"hide-canvas":"",modes:["rgb","hsl","hex"],"show-swatches":""},null,8,["modelValue"])]),o(F,{modelValue:v.value,"onUpdate:modelValue":e[4]||(e[4]=t=>v.value=t)},{default:a(()=>[o(U,{label:"Public",value:!1,class:"py-2"},{label:a(()=>[de]),_:1}),o(U,{label:"Private",value:!0,class:"py-2"},{label:a(()=>[re]),_:1})]),_:1},8,["modelValue"]),v.value?(P(),X(R,{key:0,modelValue:h.value,"onUpdate:modelValue":e[5]||(e[5]=t=>h.value=t),items:c.workspaceAllMembers,multiple:"",label:"members","item-title":"name","item-value":"id"},null,8,["modelValue","items"])):Y("",!0),l("div",ie,[o(u,{color:"primary",onClick:T},{default:a(()=>[b("Update")]),_:1})]),o(B,{class:"py-2"}),l("div",null,[o(u,{color:"error",onClick:e[6]||(e[6]=t=>p.value=!0)},{default:a(()=>[b(" Close board ")]),_:1})]),l("div",ue,[o(u,{color:"error",onClick:e[7]||(e[7]=t=>m.value=!0)},{default:a(()=>[b(" Delete board ")]),_:1})])]),o(A,{modelValue:m.value,"onUpdate:modelValue":e[10]||(e[10]=t=>m.value=t)},{default:a(()=>[o(q,{class:"self-center h-full overflow-hidden",rounded:"lg"},{default:a(()=>[o(L,{class:"max-w-[500px]"},{default:a(()=>[o(K,{cols:"12",lg:"12",class:""},{default:a(()=>[l("div",ce,[me,o(u,{onClick:e[8]||(e[8]=()=>m.value=!1),size:"x-small",class:"right-5",icon:"",variant:"text"},{default:a(()=>[o($(M),{icon:"ph:x",width:"25"})]),_:1})]),o(J,null,{default:a(()=>[l("p",ve,' Enter the board name "'+Z(c.board.name)+'" to delete ',1),pe,be,fe,o(D,{density:"compact",modelValue:V.value,"onUpdate:modelValue":e[9]||(e[9]=t=>V.value=t)},null,8,["modelValue"]),o(u,{class:"w-full",color:"error",disabled:V.value!==c.board.name,variant:"outlined",onClick:z},{default:a(()=>[b("delete")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),o(A,{modelValue:p.value,"onUpdate:modelValue":e[13]||(e[13]=t=>p.value=t),width:"500"},{default:a(()=>[o(oe,{title:"Are you sure you want to close this board?",text:"After closing this board you will not be able to modify it.","action-btn-text":"Close",onDelete:e[11]||(e[11]=()=>S()),onCancel:e[12]||(e[12]=()=>p.value=!1)})]),_:1},8,["modelValue"])],64)}}};export{xe as default};