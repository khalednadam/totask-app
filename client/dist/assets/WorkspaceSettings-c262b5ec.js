import{$ as ce,M as ie,u as ve,N as me,P as pe,r as d,a1 as fe,O as _e,D as Q,p as ke,c as u,o as r,d as y,h as f,w as a,g as l,i as g,L as h,f as o,k as c,t as K,m as we,e as w,I as V,a2 as be,a3 as xe,F as X,j as Z,a4 as ye,b as ge,a5 as he,_ as Ve}from"./index-d2e924b6.js";import Ce from"./DeleteModal-851eb824.js";const Ae={class:"flex items-center py-5 space-x-2"},Me=o("h2",{class:"text-2xl py-2"},"Workspace Settings",-1),$e={class:"py-5 space-y-1"},Be=o("h3",{class:"text-xl"},"Who can add boards to the workspace?",-1),We={class:"flex items-center gap-2"},Ue={class:"flex items-center gap-2"},De={class:"py-5"},Te=o("h3",{class:"text-xl"},"workspace admins",-1),Ie={class:"py-5"},Ee=o("h3",{class:"text-xl"},"workspace members",-1),Re={class:"flex justify-between items-center"},Pe=o("h1",{class:"px-5 py-3 text-xl"},"Delete Workspace?",-1),Se={class:"font-bold text-lg"},je=o("p",null,"Things to know:",-1),Ne=o("ul",{class:"decoration-dotted list-disc px-5"},[o("li",{class:"decoration-dotted"}," This is permanent and can't be undone. "),o("li",null," All the data related to this workspace will be permanently deleted ")],-1),ze=o("p",{class:"pt-5 pb-1"},"Enter the workspace name to delete it",-1),Oe={class:"flex justify-between items-center"},Fe=o("h1",{class:"px-5 py-3 text-xl"},"Edit Workspace",-1),Le={class:"flex justify-end gap-5"},Ge={__name:"WorkspaceSettings",setup(Ke){const ee=ce("WORKSPACETYPES"),E=ie(),le=ve(),C=me(),R=pe(),Y=d(!1),_=d(E.params.workspaceId),s=d(),A=d(),M=d(),$=d(),B=d(""),b=d(!1),v=d(!1),P=d([]),W=d([]),k=d(!1),q=d(!1),U=d(s.canMemberAddBoards),D=d(null),m=d(!1),{isUserAdmin:S}=fe(E.params.workspaceId),j=n=>{h.get(`/w/${n}`,{withCredentials:!0}).then(e=>{s.value=e.data}).catch(e=>{console.log(e)})},ae=()=>{B.value===s.value.name&&h.delete(`/w/${_.value.toString()}`,{withCredentials:!0}).then(n=>{console.log("Deleted successfully"),R.success("Deleted successfully"),C.push("/")}).catch(n=>{console.log(n)})},te=async()=>{console.log(s.value),h.put(`/w/${s.value._id.toString()}`,null,{withCredentials:!0,params:{body:{name:A.value,type:$.value,description:M.value}}}).then(async n=>{v.value=!1,s.value=j(_.value)}).catch(n=>{console.log(n)})},G=n=>{h.put(`/w/changeAccess/${_.value}`,{canMemberAddBoards:n},{withCredentials:!0}).then(e=>{s.value=j(_.value),U.value=e.data.canMemberAddBoards}).catch(e=>{console.log(e)})},se=n=>{m.value=!0,D.value=n},oe=()=>{h.put(`/w/removeUserFrom/${_.value}`,{userEmail:D.value.email},{withCredentials:!0}).then(n=>{W.value=W.value.filter(e=>e.id!==n.data.id),m.value=!1,R.success("User was removed successfully")}).catch(n=>{console.log(n),R.error(n.statusText)})};return _e(()=>{var n;s.value&&(P.value=s.value.admins,W.value=s.value.members.filter(e=>!P.value.some(N=>N.id===e.id)),A.value=s.value.name,$.value=s.value.type,M.value=s.value.description,q.value=ge(s==null?void 0:s.value,(n=le.user)==null?void 0:n.id),q||C.push("/"))}),Q(m.value,()=>{m.value||(D.value=null)}),ke(()=>{j(E.params.workspaceId),S.value||C.push("/")}),Q(S,()=>{S.value||C.push("/")}),(n,e)=>{const N=u("v-avatar"),i=u("v-btn"),ne=u("v-tooltip"),p=u("v-col"),x=u("v-row"),T=u("v-divider"),z=u("v-list-item"),O=u("v-list"),F=u("v-card"),de=u("v-menu"),I=u("v-dialog"),H=u("v-text-field"),J=u("v-card-text"),ue=u("v-select"),re=u("v-textarea");return s.value?(r(),y("div",{key:n.$route.fullPath},[(r(),f(x,{class:"items-center",key:_.value},{default:a(()=>[l(p,{cols:"6",md:"6"},{default:a(()=>[o("div",Ae,[l(N,{color:"primary",rounded:"lg",size:"large",class:"w-full"},{default:a(()=>[c(K(s.value.name[0].toUpperCase()),1)]),_:1}),o("h2",null,K(s.value.name),1),l(ne,{text:"More info","open-delay":1e3},{activator:a(({props:t})=>[l(i,we({variant:"text"},t,{icon:"",size:"x-small",onClick:e[0]||(e[0]=L=>v.value=!v.value)}),{default:a(()=>[l(w(V),{icon:"ph:pencil-simple-line",width:"20"})]),_:2},1040)]),_:1})])]),_:1}),l(p,{cols:"6",md:"6",class:"justify-end flex"},{default:a(()=>[l(i,{color:"primary",onClick:e[1]||(e[1]=t=>k.value=!k.value)},{default:a(()=>[c(" Add members ")]),_:1})]),_:1})]),_:1})),l(T),(r(),f(x,{key:s.value.canMemberAddBoards},{default:a(()=>[l(p,{cols:"12"},{default:a(()=>[Me,o("div",$e,[Be,l(T),l(x,null,{default:a(()=>[l(p,{cols:"12",md:"6"},{default:a(()=>{var t,L;return[o("p",null,[(t=s.value)!=null&&t.canMemberAddBoards?(r(),y("span",{key:U.value,class:"font-bold"}," Members and admins ")):g("",!0),(L=s.value)!=null&&L.canMemberAddBoards?g("",!0):(r(),y("span",{class:"font-bold",key:U.value}," Only admins ")),c(" can add boards to this workspace ")])]}),_:1}),l(p,{cols:"12",md:"6",class:"flex flex-col items-end"},{default:a(()=>[(r(),f(de,{modelValue:Y.value,"onUpdate:modelValue":e[4]||(e[4]=t=>Y.value=t),key:U.value},{activator:a(({props:t})=>[l(i,be(xe(t)),{default:a(()=>[c("Change")]),_:2},1040)]),default:a(()=>[l(F,null,{default:a(()=>[l(O,null,{default:a(()=>[l(z,{onClick:e[2]||(e[2]=t=>G(!1)),disabled:s.value.canMemberAddBoards==!1},{default:a(()=>[o("p",We,[s.value.canMemberAddBoards?g("",!0):(r(),f(w(V),{key:0,icon:"ph:check",width:"20"})),c(" Only admins ")])]),_:1},8,["disabled"]),l(z,{onClick:e[3]||(e[3]=t=>G(!0)),disabled:s.value.canMemberAddBoards==!0},{default:a(()=>[o("p",Ue,[s.value.canMemberAddBoards?(r(),f(w(V),{key:0,icon:"ph:check",width:"20"})):g("",!0),c(" Members and admins ")])]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["modelValue"]))]),_:1})]),_:1})]),o("div",De,[Te,l(T),l(O,{"bg-color":"transparent"},{default:a(()=>[(r(!0),y(X,null,Z(P.value,t=>(r(),f(z,{key:t.id,title:t.name,subtitle:"@"+t.username},{prepend:a(()=>[l(he,{user:t},null,8,["user"])]),_:2},1032,["title","subtitle"]))),128))]),_:1})]),o("div",Ie,[Ee,l(T),l(O,{"bg-color":"transparent"},{default:a(()=>[(r(!0),y(X,null,Z(W.value,t=>(r(),f(Ve,{key:t.id,member:t},{default:a(()=>[l(i,{color:"error",onClick:()=>se(t)},{default:a(()=>[c(" Remove from workspace ")]),_:2},1032,["onClick"])]),_:2},1032,["member"]))),128))]),_:1})]),l(i,{variant:"text",color:"error",onClick:e[5]||(e[5]=t=>b.value=!b.value)},{default:a(()=>[c(" Delete this workspace ")]),_:1})]),_:1})]),_:1})),l(I,{modelValue:k.value,"onUpdate:modelValue":e[7]||(e[7]=t=>k.value=t)},{default:a(()=>[l(ye,{workspaceInfo:s.value,onToggleModal:e[6]||(e[6]=()=>k.value=!k.value)},null,8,["workspaceInfo"])]),_:1},8,["modelValue"]),l(I,{modelValue:b.value,"onUpdate:modelValue":e[10]||(e[10]=t=>b.value=t)},{default:a(()=>[l(F,{class:"self-center h-full overflow-hidden",rounded:"lg"},{default:a(()=>[l(x,{class:"max-w-[500px]"},{default:a(()=>[l(p,{cols:"12",lg:"12",class:""},{default:a(()=>[o("div",Re,[Pe,l(i,{onClick:e[8]||(e[8]=()=>b.value=!1),size:"x-small",class:"right-5",icon:"",variant:"text"},{default:a(()=>[l(w(V),{icon:"ph:x",width:"25"})]),_:1})]),l(J,null,{default:a(()=>[o("p",Se,' Enter the workspace name "'+K(s.value.name)+'" to delete ',1),je,Ne,ze,l(H,{density:"compact",modelValue:B.value,"onUpdate:modelValue":e[9]||(e[9]=t=>B.value=t)},null,8,["modelValue"]),l(i,{class:"w-full",color:"error",disabled:B.value!==s.value.name,variant:"outlined",onClick:ae},{default:a(()=>[c("delete")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(I,{modelValue:v.value,"onUpdate:modelValue":e[17]||(e[17]=t=>v.value=t),class:"md:w-[40vw] w-full"},{default:a(()=>[l(F,{class:"self-center h-full overflow-hidden w-full",rounded:"lg"},{default:a(()=>[l(x,{class:""},{default:a(()=>[l(p,{cols:"12",lg:"12",class:""},{default:a(()=>[o("div",Oe,[Fe,l(i,{onClick:e[11]||(e[11]=()=>v.value=!1),size:"x-small",class:"right-5",icon:"",variant:"text"},{default:a(()=>[l(w(V),{icon:"ph:x",width:"25"})]),_:1})]),l(J,null,{default:a(()=>[l(H,{label:"workspace name",modelValue:A.value,"onUpdate:modelValue":e[12]||(e[12]=t=>A.value=t),density:"compact"},null,8,["modelValue"]),l(ue,{density:"compact",label:"Workspace type",items:w(ee),modelValue:$.value,"onUpdate:modelValue":e[13]||(e[13]=t=>$.value=t)},null,8,["items","modelValue"]),l(re,{label:"workspace description",modelValue:M.value,"onUpdate:modelValue":e[14]||(e[14]=t=>M.value=t),density:"compact"},null,8,["modelValue"]),o("div",Le,[l(i,{onClick:e[15]||(e[15]=t=>v.value=!1),variant:"outlined",color:"primary"},{default:a(()=>[c("cancel")]),_:1}),l(i,{variant:"flat",color:"primary",onClick:e[16]||(e[16]=()=>te())},{default:a(()=>[c("save")]),_:1})])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(I,{modelValue:m.value,"onUpdate:modelValue":e[20]||(e[20]=t=>m.value=t),width:"500"},{default:a(()=>[l(Ce,{title:"Are you sure you want to remove this member?",text:D.value.name,"action-btn-text":"Remove",onDelete:e[18]||(e[18]=()=>oe()),onCancel:e[19]||(e[19]=()=>m.value=!1)},null,8,["text"])]),_:1},8,["modelValue"])])):g("",!0)}}};export{Ge as default};
