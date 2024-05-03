import{u as K,J as me,L as fe,k as r,N as Q,m as pe,H as P,r as i,o as m,c as W,f as n,d as l,w as a,b as o,F as _e,h as _,t as we,O as ge,e as u,i as ye,M as y}from"./index-6fa66300.js";import{u as Ce,a as q}from"./vee-validate.esm-acd87ae3.js";import xe from"./DeleteModal-6448e960.js";const Ve=n("h1",{class:"text-3xl mt-3"}," Settings ",-1),ke=n("p",{class:"mt-5 text-xl"}," Account info ",-1),be={class:"mt-5"},he=n("p",{class:"text-xl"}," Profile picture ",-1),Pe={class:"flex gap-10 items-center"},Ue={key:0,class:"text-4xl"},$e={class:"flex flex-col justify-between items-center gap-2"},De=n("p",{class:"text-xl"}," Full name ",-1),Ae=n("p",{class:"text-xl"}," username ",-1),Se=n("p",{class:"text-xl"}," Email ",-1),ze={class:"flex justify-end gap-3"},Fe=n("p",{class:"text-xl"}," Change password ",-1),Me=n("p",{class:"text-xl text-error mt-5"}," Delete account ",-1),Ne=n("p",null," Current Password ",-1),Ze=n("p",null," New Password ",-1),Te=n("p",null," New Password Confirmation ",-1),Be={class:"flex justify-end gap-2"},He={__name:"Settings",setup(je){var J;const f=K(),H=me(),p=fe(),U=r(!1),X=K(),d=r({}),$=r(""),F=r(""),M=r(""),ee=Q(()=>$.value===F.value),x=r(!1),g=r(),V=r(!1),D=r(!1),c=r(!1),A=r(!1),N=r(""),Z=r(!1),le=Q(()=>$.value.length>7&&F.value.length>7&&M.value.length>7),L=[t=>!!t||"Required.",t=>t&&t.length>=8||"Min 8 characters",t=>/\d/.test(t)&&/[a-zA-Z]/.test(t)||"Password must contain at least one letter and one number"],ae=()=>{P.post("/auth/change-password",{email:S.value.value,password:M.value,newPassword:$.value},{withCredentials:!0}).then(t=>{p.success("Password was changed successfully"),U.value=!1}).catch(t=>{console.log(t),p.error("failed - check your current password and try again!")})},{handleSubmit:T,resetForm:te,handleReset:Ee,isSubmitting:Le,values:Re}=Ce({validationSchema:{name(t){return(t==null?void 0:t.length)>=2?!0:"Please enter your full name"},username(t){return(t==null?void 0:t.length)>=2&&/^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{0,28}[a-zA-Z0-9]$/i.test(t)?!0:"Please enter a valid username"},email(t){return/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(t)?!0:"Please enter a valid email"}},initialValues:{name:(J=f.user)==null?void 0:J.name,email:d.value.email,username:d.value.username}}),se=()=>{c.value=!0,P.post(`/users/${d.value.id}`,{password:N.value},{withCredentials:!0}).then(t=>{A.value=!1,f.$reset(),H.push("/login")}).catch(t=>{console.log(t),p.error("failed - check your password and try again!")}).finally(()=>{c.value=!1})},S=q("email"),B=q("name"),j=q("username"),k=r(!1),b=r(!1),h=r(!1);pe(async()=>{await X.getUser(),d.value={...f.user},te({values:{name:d.value.name,username:d.value.username,email:d.value.email}})});const oe=T(()=>{c.value=!0,P.put(`/users/deleteProfilePic/${d.value.id}`,{file:null},{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then(t=>{p.success("user updated successfully"),f.assignUser(t.data),f.user=t.data,D.value=!1,g.value=null}).catch(t=>{p.error("failed"),console.log(t)}).finally(()=>{c.value=!1})}),ne=T(()=>{c.value=!0,P.put(`/users/${d.value.id}`,{file:g.value[0]?g.value[0]:null},{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then(t=>{p.success("user updated successfully"),f.assignUser(t.data),f.user=t.data,V.value=!1,g.value=null}).catch(t=>{p.error("failed"),console.log(t)}).finally(()=>{c.value=!1})}),ue=T(()=>{c.value=!0,P.put(`/users/${d.value.id}`,{name:B.value.value,username:j.value.value,email:S.value.value},{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then(t=>{p.success("user updated successfully"),f.assignUser(t.data),f.user=t.data,V.value=!1,g.value=null}).catch(t=>{p.error("failed"),console.log(t)}).finally(()=>{c.value=!1})}),re=async()=>{Z.value=!0;try{await P.post("/auth/send-verification-email"),p.success("Verification email was sent")}catch{p.error("something went wrong!")}finally{Z.value=!1}};return(t,e)=>{const w=i("v-col"),de=i("v-img"),ie=i("v-avatar"),v=i("v-btn"),z=i("v-row"),C=i("v-text-field"),ce=i("v-form"),Y=i("v-divider"),R=i("v-card-title"),I=i("v-card-text"),O=i("v-card"),E=i("v-dialog"),ve=i("v-file-input"),G=i("v-card-actions");return m(),W(_e,null,[Ve,ke,n("div",be,[l(ce,{onSubmit:o(T)},{default:a(()=>[l(z,{class:"border-t border-b items-center"},{default:a(()=>[l(w,{md:"4",cols:"12"},{default:a(()=>[he]),_:1}),(m(),_(w,{md:"5",cols:"12",key:d.value},{default:a(()=>[n("div",Pe,[l(ie,{color:"primary",class:"",size:80},{default:a(()=>{var s;return[!d.value.profilePhotoUrl&&d.value.name?(m(),W("p",Ue,we(d.value.name[0].toUpperCase()),1)):(m(),_(de,{key:1,src:(s=o(f).user)==null?void 0:s.profilePhotoUrl},null,8,["src"]))]}),_:1}),n("div",$e,[l(v,ge(t.props,{onClick:e[0]||(e[0]=s=>V.value=!0)}),{default:a(()=>[u("Change")]),_:1},16),l(v,{color:"error",onClick:e[1]||(e[1]=s=>D.value=!0),disabled:!d.value.profilePhotoUrl},{default:a(()=>[u("Delete")]),_:1},8,["disabled"])])])]),_:1}))]),_:1}),l(z,{class:"items-center"},{default:a(()=>[l(w,{md:"4",cols:"12"},{default:a(()=>[De]),_:1}),l(w,{md:"8",cols:"12"},{default:a(()=>[l(C,{name:"name",modelValue:o(B).value.value,"onUpdate:modelValue":e[2]||(e[2]=s=>o(B).value.value=s),"error-messages":o(B).errorMessage.value},null,8,["modelValue","error-messages"])]),_:1})]),_:1}),l(z,{class:"items-center"},{default:a(()=>[l(w,{md:"4",cols:"12"},{default:a(()=>[Ae]),_:1}),l(w,{md:"8",cols:"12"},{default:a(()=>[l(C,{modelValue:o(j).value.value,"onUpdate:modelValue":e[3]||(e[3]=s=>o(j).value.value=s),"error-messages":o(j).errorMessage.value,prefix:"@"},null,8,["modelValue","error-messages"])]),_:1})]),_:1}),l(z,{class:"items-center"},{default:a(()=>[l(w,{md:"4",cols:"12"},{default:a(()=>[Se]),_:1}),l(w,{md:"8",cols:"12"},{default:a(()=>[l(C,{readonly:"",disabled:"",modelValue:o(S).value.value,"onUpdate:modelValue":e[4]||(e[4]=s=>o(S).value.value=s),"error-messages":o(S).errorMessage.value},null,8,["modelValue","error-messages"]),o(f).user.isEmailVerified?ye("",!0):(m(),_(v,{key:0,disabled:Z.value,loading:Z.value,onClick:re,color:"primary",variant:"flat"},{default:a(()=>[u(" Verify ")]),_:1},8,["disabled","loading"]))]),_:1})]),_:1}),l(z,{class:"items-center"},{default:a(()=>[l(w,{cols:"12",class:"flex flex-col justify-end"},{default:a(()=>[n("div",ze,[l(v,{color:"primary",onClick:e[5]||(e[5]=()=>o(H).go(-1)),variant:"outlined"},{default:a(()=>[u("Cancel")]),_:1}),l(v,{color:"primary",onClick:o(ue)},{default:a(()=>[u("Save")]),_:1},8,["onClick"])])]),_:1})]),_:1})]),_:1},8,["onSubmit"]),Fe,l(Y,{class:"mt-2 border-2 border-black dark:border-white"}),l(v,{onClick:e[6]||(e[6]=s=>U.value=!0),class:"mt-2"},{default:a(()=>[u(" Change password ")]),_:1}),Me,l(Y,{class:"mt-2 border-2 border-black dark:border-white"}),l(v,{class:"mt-2",color:"error",onClick:e[7]||(e[7]=s=>A.value=!0)},{default:a(()=>[u(" Delete account ")]),_:1})]),l(E,{modelValue:U.value,"onUpdate:modelValue":e[18]||(e[18]=s=>U.value=s),class:"md:max-w-[40vw] w-full"},{default:a(()=>[l(O,null,{default:a(()=>[l(R,null,{default:a(()=>[u(" Change password ")]),_:1}),l(I,{class:"space-y-4 flex flex-col"},{default:a(()=>[n("div",null,[Ne,l(C,{rules:L,modelValue:M.value,"onUpdate:modelValue":e[10]||(e[10]=s=>M.value=s),type:x.value?"text":"password"},{"append-inner":a(()=>[x.value?(m(),_(o(y),{key:0,onClick:e[8]||(e[8]=()=>x.value=!x.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(m(),_(o(y),{key:1,onClick:e[9]||(e[9]=()=>x.value=!x.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["modelValue","type"])]),n("div",null,[Ze,l(C,{rules:L,modelValue:$.value,"onUpdate:modelValue":e[13]||(e[13]=s=>$.value=s),type:k.value?"text":"password"},{"append-inner":a(()=>[k.value?(m(),_(o(y),{key:0,onClick:e[11]||(e[11]=()=>k.value=!k.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(m(),_(o(y),{key:1,onClick:e[12]||(e[12]=()=>k.value=!k.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["modelValue","type"])]),n("div",null,[Te,l(C,{rules:L,modelValue:F.value,"onUpdate:modelValue":e[16]||(e[16]=s=>F.value=s),type:b.value?"text":"password"},{"append-inner":a(()=>[b.value?(m(),_(o(y),{key:0,onClick:e[14]||(e[14]=()=>b.value=!b.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(m(),_(o(y),{key:1,onClick:e[15]||(e[15]=()=>b.value=!b.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["modelValue","type"])]),n("div",Be,[l(v,{variant:"outlined",color:"primary",onClick:e[17]||(e[17]=s=>U.value=!1)},{default:a(()=>[u(" Cancel ")]),_:1}),l(v,{color:"primary",onClick:ae,disabled:!ee.value||!le.value},{default:a(()=>[u(" Change ")]),_:1},8,["disabled"])])]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(E,{modelValue:D.value,"onUpdate:modelValue":e[21]||(e[21]=s=>D.value=s),class:"md:max-w-[50vw] w-full"},{default:a(()=>[l(xe,{"is-loading":c.value,title:"Delete Profile Picture",actionBtnText:"Delete",text:"Your profile picture will be deleted",onCancel:e[19]||(e[19]=s=>D.value=!1),onDelete:e[20]||(e[20]=()=>{g.value=null,o(oe)()})},null,8,["is-loading"])]),_:1},8,["modelValue"]),l(E,{modelValue:V.value,"onUpdate:modelValue":e[24]||(e[24]=s=>V.value=s),class:"md:max-w-[50vw] w-full"},{default:a(()=>[l(O,null,{default:a(()=>[l(R,null,{default:a(()=>[u(" Change your profile picture ")]),_:1}),l(I,null,{default:a(()=>[l(ve,{modelValue:g.value,"onUpdate:modelValue":e[22]||(e[22]=s=>g.value=s),accept:"image/*",label:"Profile Picture",variant:"solo-filled"},null,8,["modelValue"])]),_:1}),l(G,{class:"self-end"},{default:a(()=>[l(v,{variant:"outlined",color:"primary",onClick:e[23]||(e[23]=s=>V.value=!1)},{default:a(()=>[u(" Cancel ")]),_:1}),l(v,{onClick:o(ne),disabled:c.value,loading:c.value,variant:"flat",color:"primary"},{default:a(()=>[u(" Update ")]),_:1},8,["onClick","disabled","loading"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(E,{modelValue:A.value,"onUpdate:modelValue":e[29]||(e[29]=s=>A.value=s),class:"md:max-w-[50vw] w-full"},{default:a(()=>[l(O,null,{default:a(()=>[l(R,null,{default:a(()=>[u(" Delete your account? ")]),_:1}),l(I,null,{default:a(()=>[u(" Are you sure you want to delete you account? "),l(C,{type:h.value?"text":"password",class:"mt-2",modelValue:N.value,"onUpdate:modelValue":e[27]||(e[27]=s=>N.value=s),label:"password"},{"append-inner":a(()=>[h.value?(m(),_(o(y),{key:0,onClick:e[25]||(e[25]=()=>h.value=!h.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(m(),_(o(y),{key:1,onClick:e[26]||(e[26]=()=>h.value=!h.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["type","modelValue"])]),_:1}),l(G,{class:"self-end"},{default:a(()=>[l(v,{variant:"outlined",color:"primary",onClick:e[28]||(e[28]=s=>A.value=!1)},{default:a(()=>[u(" Cancel ")]),_:1}),l(v,{onClick:se,disabled:c.value||N.value.length<1,loading:c.value,variant:"flat",color:"error"},{default:a(()=>[u(" Delete ")]),_:1},8,["disabled","loading"])]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}}};export{He as default};
