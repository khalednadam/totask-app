import{a1 as he,O as Ve,u as Ce,Q as Ae,T as Me,r as u,a3 as Ue,S as Be,E as ue,q as We,c as i,o as c,d as k,h as p,w as a,g as l,i as f,l as w,f as o,e as m,I as b,t as $,m as Pe,k as r,a4 as Te,a5 as $e,F as X,j as Z,a6 as De,M as ee,b as Re,_ as de}from"./index-93489c20.js";import Ie from"./DeleteModal-684c5805.js";const Ee={class:"flex items-center py-5 space-x-2"},je={key:0,class:"text-sm"},Se=o("h2",{class:"text-2xl py-2"},"Workspace Settings",-1),qe={class:"py-5 space-y-1"},ze=o("h3",{class:"text-xl"},"Who can add boards to the workspace?",-1),Ne={class:"flex items-center gap-2"},Fe={class:"flex items-center gap-2"},Le={class:"py-5"},Oe=o("h3",{class:"text-xl"},"workspace admins",-1),Ge={class:"flex items-center gap-2"},Ke={class:"py-5"},Qe=o("h3",{class:"text-xl"},"workspace members",-1),Ye={class:"flex items-center gap-2"},He={class:"flex flex-col w-max"},Je={class:"flex justify-between items-center"},Xe=o("h1",{class:"px-5 py-3 text-xl"},"Delete Workspace?",-1),Ze={class:"font-bold text-lg"},el=o("p",null,"Things to know:",-1),ll=o("ul",{class:"decoration-dotted list-disc px-5"},[o("li",{class:"decoration-dotted"}," This is permanent and can't be undone. "),o("li",null," All the data related to this workspace will be permanently deleted ")],-1),al=o("p",{class:"pt-5 pb-1"},"Enter the workspace name to delete it",-1),tl={class:"flex justify-between items-center"},sl=o("h1",{class:"px-5 py-3 text-xl"},"Edit Workspace",-1),ol={key:0,class:"flex mx-2 mb-5 justify-between items-center"},nl=o("p",null," Premium workspace ",-1),ul={class:"flex justify-end gap-5"},dl=o("p",{class:"text-sm opacity-75 font-bold"}," Get the most out of totask! ",-1),rl={class:"list-disc flex flex-col items-start mx-auto w-max justify-end"},vl={__name:"WorkspaceSettings",setup(il){const re=he("WORKSPACETYPES"),O=Ve(),D=Ce(),R=Ae(),I=Me(),le=u(!1),v=u(O.params.workspaceId),s=u(),E=u(),j=u(),S=u(),q=u(""),M=u(!1),g=u(!1),U=u([]),h=u([]),V=u(!1),ae=u(!1),z=u(s.canMemberAddBoards),N=u(null),y=u(!1),B=u(s.isPremium),W=u(!1),_=u(!1),{isUserAdmin:G}=Ue(O.params.workspaceId),C=u(!1),A=u(!1),ie=["Unlimited boards","Unlimited members","List colors","And more coming soon.."],ce=async()=>{C.value=!0;try{await w.post("/premium-request/create",{workspace:v.value,user:D.user.id}),s.premiumRequested=!0}catch(n){console.log(n)}finally{C.value=!1,A.value=!1}},K=n=>{w.get(`/w/${n}`,{withCredentials:!0}).then(e=>{s.value=e.data}).catch(e=>{console.log(e)})},me=()=>{q.value===s.value.name&&w.delete(`/w/${v.value.toString()}`,{withCredentials:!0}).then(n=>{console.log("Deleted successfully"),I.success("Deleted successfully"),R.push("/")}).catch(n=>{console.log(n)})},ve=async()=>{console.log(B.value),w.put(`/w/${s.value._id.toString()}`,{name:E.value,type:S.value,description:j.value,isPremium:B.value}).then(async n=>{g.value=!1,s.value=K(v.value)}).catch(n=>{console.log(n)})},te=n=>{w.put(`/w/changeAccess/${v.value}`,{canMemberAddBoards:n},{withCredentials:!0}).then(e=>{s.value=K(v.value),z.value=e.data.canMemberAddBoards}).catch(e=>{console.log(e)})},se=n=>{y.value=!0,N.value=n},pe=()=>{W.value=!0,w.put(`/w/removeUserFrom/${v.value}`,{userEmail:N.value.email},{withCredentials:!0}).then(n=>{h.value=h.value.filter(e=>e.id!==n.data.id),y.value=!1,I.success("User was removed successfully")}).catch(n=>{ee(n)}).finally(()=>{W.value=!1})},fe=async n=>{_.value=!0;try{const e=await w.put("/w/promoteMemberToAdmin",{workspaceId:v.value,member:n});I.success("User has been promoted"),U.value.push(e.data)}catch(e){ee(e)}finally{_.value=!1}},_e=async n=>{_.value=!0;try{const e=await w.put("/w/removeWorkspaceAdmin",{workspaceId:v.value,member:n});I.success("User has been updated")}catch(e){ee(e)}finally{_.value=!1}};return Be(()=>{var n;s.value&&(U.value=s.value.admins,h.value=s.value.members.filter(e=>!U.value.some(Q=>Q.id===e.id)),E.value=s.value.name,S.value=s.value.type,j.value=s.value.description,ae.value=Re(s==null?void 0:s.value,(n=D.user)==null?void 0:n.id),ae||R.push("/"))}),ue(y.value,()=>{y.value||(N.value=null)}),We(()=>{K(O.params.workspaceId),G.value||R.push("/")}),ue(G,()=>{G.value||R.push("/")}),(n,e)=>{const Q=i("v-avatar"),d=i("v-btn"),ke=i("v-tooltip"),x=i("v-col"),P=i("v-row"),F=i("v-divider"),oe=i("v-list-item"),Y=i("v-list"),L=i("v-card"),we=i("v-menu"),T=i("v-dialog"),ne=i("v-text-field"),H=i("v-card-text"),be=i("v-select"),ge=i("v-textarea"),ye=i("v-img"),xe=i("v-card-title");return s.value?(c(),k("div",{key:n.$route.fullPath},[(c(),p(P,{class:"items-center",key:v.value},{default:a(()=>[l(x,{cols:"6",md:"6"},{default:a(()=>[o("div",Ee,[l(Q,{color:"primary",rounded:"lg",size:"large",class:"w-full"},{default:a(()=>[l(m(b),{icon:"ph:building-office",width:"30"})]),_:1}),o("div",null,[o("h2",null,$(s.value.name),1),s.value.isPremium?(c(),k("p",je," premium ")):f("",!0)]),l(ke,{text:"More info","open-delay":1e3},{activator:a(({props:t})=>[l(d,Pe({variant:"text"},t,{icon:"",size:"x-small",onClick:e[0]||(e[0]=J=>g.value=!g.value)}),{default:a(()=>[l(m(b),{icon:"ph:pencil-simple-line",width:"20"})]),_:2},1040)]),_:1})])]),_:1}),l(x,{cols:"6",md:"6",class:"justify-end flex"},{default:a(()=>[l(d,{color:"primary",onClick:e[1]||(e[1]=t=>V.value=!V.value)},{default:a(()=>[r(" Add members ")]),_:1})]),_:1})]),_:1})),l(F),(c(),p(P,{key:s.value.canMemberAddBoards},{default:a(()=>[l(x,{cols:"12"},{default:a(()=>[Se,o("div",qe,[ze,l(F),l(P,null,{default:a(()=>[l(x,{cols:"12",md:"6"},{default:a(()=>{var t,J;return[o("p",null,[(t=s.value)!=null&&t.canMemberAddBoards?(c(),k("span",{key:z.value,class:"font-bold"}," Members and admins ")):f("",!0),(J=s.value)!=null&&J.canMemberAddBoards?f("",!0):(c(),k("span",{class:"font-bold",key:z.value}," Only admins ")),r(" can add boards to this workspace ")])]}),_:1}),l(x,{cols:"12",md:"6",class:"flex flex-col items-end"},{default:a(()=>[(c(),p(we,{modelValue:le.value,"onUpdate:modelValue":e[4]||(e[4]=t=>le.value=t),key:z.value},{activator:a(({props:t})=>[l(d,Te($e(t)),{default:a(()=>[r("Change")]),_:2},1040)]),default:a(()=>[l(L,null,{default:a(()=>[l(Y,null,{default:a(()=>[l(oe,{onClick:e[2]||(e[2]=t=>te(!1)),disabled:s.value.canMemberAddBoards==!1},{default:a(()=>[o("p",Ne,[s.value.canMemberAddBoards?f("",!0):(c(),p(m(b),{key:0,icon:"ph:check",width:"20"})),r(" Only admins ")])]),_:1},8,["disabled"]),l(oe,{onClick:e[3]||(e[3]=t=>te(!0)),disabled:s.value.canMemberAddBoards==!0},{default:a(()=>[o("p",Fe,[s.value.canMemberAddBoards?(c(),p(m(b),{key:0,icon:"ph:check",width:"20"})):f("",!0),r(" Members and admins ")])]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1},8,["modelValue"]))]),_:1})]),_:1})]),o("div",Le,[Oe,l(F),l(Y,{"bg-color":"transparent"},{default:a(()=>[(c(!0),k(X,null,Z(U.value,t=>(c(),p(de,{key:t.id||U.value,member:t},{default:a(()=>[o("div",Ge,[s.value.createdBy!==t.id?(c(),p(d,{key:0,loading:_.value,disabled:_.value,onClick:()=>_e(t.id),variant:"flat",color:"primary"},{default:a(()=>[r(" Normal ")]),_:2},1032,["loading","disabled","onClick"])):f("",!0),l(d,{variant:"flat",color:"error",onClick:()=>se(t),loading:W.value,disabled:W.value||s.value.createdBy==m(D).user.id},{default:a(()=>[r($(m(D).user.id===t.id?"Leave":"Remove from workspace"),1)]),_:2},1032,["onClick","loading","disabled"])])]),_:2},1032,["member"]))),128))]),_:1})]),o("div",Ke,[Qe,l(F),l(Y,{"bg-color":"transparent"},{default:a(()=>[(c(!0),k(X,null,Z(h.value,t=>(c(),p(de,{key:t.id,member:t},{default:a(()=>[o("div",Ye,[l(d,{loading:_.value,disabled:_.value,onClick:()=>fe(t.id),variant:"flat",color:"primary"},{default:a(()=>[r(" Promote to admin ")]),_:2},1032,["loading","disabled","onClick"]),l(d,{variant:"flat",color:"error",onClick:()=>se(t)},{default:a(()=>[r(" Remove from workspace ")]),_:2},1032,["onClick"])])]),_:2},1032,["member"]))),128))]),_:1})]),o("div",He,[s.value.isPremium?(c(),p(d,{key:0,variant:"flat",class:"mt-5",color:"primary",loading:C.value,disabled:C.value||s.value.premiumRequested,onClick:e[5]||(e[5]=()=>A.value=!0)},{default:a(()=>[l(m(b),{icon:"ph:crown-simple-fill",width:"20"}),r(" Get premium ")]),_:1},8,["loading","disabled"])):f("",!0),l(d,{variant:"text",class:"mt-5",color:"error",onClick:e[6]||(e[6]=t=>M.value=!M.value)},{default:a(()=>[r(" Delete this workspace ")]),_:1})])]),_:1})]),_:1})),l(T,{modelValue:V.value,"onUpdate:modelValue":e[9]||(e[9]=t=>V.value=t)},{default:a(()=>[l(De,{modelValue:h.value,"onUpdate:modelValue":e[7]||(e[7]=t=>h.value=t),workspaceInfo:s.value,onToggleModal:e[8]||(e[8]=()=>V.value=!V.value)},null,8,["modelValue","workspaceInfo"])]),_:1},8,["modelValue"]),l(T,{modelValue:M.value,"onUpdate:modelValue":e[12]||(e[12]=t=>M.value=t)},{default:a(()=>[l(L,{class:"self-center h-full overflow-hidden",rounded:"lg"},{default:a(()=>[l(P,{class:"max-w-[500px]"},{default:a(()=>[l(x,{cols:"12",lg:"12",class:""},{default:a(()=>[o("div",Je,[Xe,l(d,{onClick:e[10]||(e[10]=()=>M.value=!1),size:"x-small",class:"right-5",icon:"",variant:"text"},{default:a(()=>[l(m(b),{icon:"ph:x",width:"25"})]),_:1})]),l(H,null,{default:a(()=>[o("p",Ze,' Enter the workspace name "'+$(s.value.name)+'" to delete ',1),el,ll,al,l(ne,{density:"compact",modelValue:q.value,"onUpdate:modelValue":e[11]||(e[11]=t=>q.value=t)},null,8,["modelValue"]),l(d,{class:"w-full",color:"error",disabled:q.value!==s.value.name,variant:"outlined",onClick:me},{default:a(()=>[r("delete")]),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(T,{modelValue:g.value,"onUpdate:modelValue":e[20]||(e[20]=t=>g.value=t),class:"md:w-[40vw] w-full"},{default:a(()=>[l(L,{class:"self-center h-full overflow-hidden w-full",rounded:"lg"},{default:a(()=>[l(P,{class:""},{default:a(()=>[l(x,{cols:"12",lg:"12",class:""},{default:a(()=>[o("div",tl,[sl,l(d,{onClick:e[13]||(e[13]=()=>g.value=!1),size:"x-small",class:"right-5",icon:"",variant:"text"},{default:a(()=>[l(m(b),{icon:"ph:x",width:"25"})]),_:1})]),l(H,null,{default:a(()=>[l(ne,{label:"workspace name",modelValue:E.value,"onUpdate:modelValue":e[14]||(e[14]=t=>E.value=t),density:"compact"},null,8,["modelValue"]),l(be,{density:"compact",label:"Workspace type",items:m(re),modelValue:S.value,"onUpdate:modelValue":e[15]||(e[15]=t=>S.value=t)},null,8,["items","modelValue"]),l(ge,{label:"workspace description",modelValue:j.value,"onUpdate:modelValue":e[16]||(e[16]=t=>j.value=t),density:"compact"},null,8,["modelValue"]),s.value.isPremium?(c(),k("div",ol,[nl,l(d,{color:"error",variant:"flat",onClick:e[17]||(e[17]=()=>B.value=!B.value)},{default:a(()=>[r($(s.value.isPremium&&!B.value?"Remove premium":"Cancel"),1)]),_:1})])):f("",!0),o("div",ul,[l(d,{onClick:e[18]||(e[18]=t=>g.value=!1),variant:"outlined",color:"primary"},{default:a(()=>[r("cancel")]),_:1}),l(d,{variant:"flat",color:"primary",onClick:e[19]||(e[19]=()=>ve())},{default:a(()=>[r("save")]),_:1})])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(T,{modelValue:A.value,"onUpdate:modelValue":e[23]||(e[23]=t=>A.value=t),class:"md:max-w-[30vw] w-full"},{default:a(()=>[l(L,null,{default:a(()=>[l(d,{variant:"text",class:"!absolute right-1 top-1 z-50",icon:"",size:"35",onClick:e[21]||(e[21]=()=>A.value=!1)},{default:a(()=>[l(m(b),{icon:"ph:x"})]),_:1}),l(ye,{class:"align-end text-white",height:"120",src:"/premiumbg.png",cover:""}),l(xe,{class:"text-center"},{default:a(()=>[r(" Get totask premium "),dl]),_:1}),l(H,null,{default:a(()=>[o("ul",rl,[(c(),k(X,null,Z(ie,t=>o("li",null,$(t),1)),64))]),l(d,{onClick:ce,loading:C.value,disabled:C.value||s.value.premiumRequested,color:"primary",class:"w-full mt-5",flat:""},{default:a(()=>[r(" Request totask premium ")]),_:1},8,["loading","disabled"]),l(d,{color:"primary",class:"w-full",variant:"text",flat:"",onClick:e[22]||(e[22]=()=>A.value=!1)},{default:a(()=>[r(" Cancel ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(T,{modelValue:y.value,"onUpdate:modelValue":e[26]||(e[26]=t=>y.value=t),width:"500"},{default:a(()=>[l(Ie,{title:"Are you sure you want to remove this member?",text:N.value.name,"action-btn-text":"Remove",onDelete:e[24]||(e[24]=()=>pe()),onCancel:e[25]||(e[25]=()=>y.value=!1),"is-loading":W.value},null,8,["text","is-loading"])]),_:1},8,["modelValue"])])):f("",!0)}}};export{vl as default};
