import{u as H,M as me,O as fe,r,P as J,n as pe,K as h,c as i,o as m,d as W,f as n,g as l,w as a,e as o,F as _e,h as _,t as we,Q as ge,k as u,i as ye,I as y}from"./index-3856c7a6.js";import{u as Ce,a as q}from"./vee-validate.esm-09f6e577.js";import xe from"./DeleteModal-f36f1806.js";const Ve=n("h1",{class:"text-3xl mt-3"},"Settings",-1),ke=n("p",{class:"mt-5 text-xl"},"Account info",-1),be={class:"mt-5"},Pe=n("p",{class:"text-xl"},"Profile picture",-1),he={class:"flex gap-10 items-center"},Ue={key:0,class:"text-4xl"},$e={class:"flex flex-col justify-between items-center gap-2"},De=n("p",{class:"text-xl"},"Full name",-1),Ae=n("p",{class:"text-xl"},"username",-1),Se=n("p",{class:"text-xl"},"Email",-1),ze={class:"flex justify-end gap-3"},Fe=n("p",{class:"text-xl"},"Change password",-1),Me=n("p",{class:"text-xl text-error mt-5"},"Delete account",-1),Ze=n("p",null,"Current Password",-1),Ne=n("p",null,"New Password",-1),Te=n("p",null,"New Password Confirmation",-1),Be={class:"flex justify-end gap-2"},Ke={__name:"Settings",setup(Ee){var Q;const f=H(),K=me(),p=fe(),U=r(!1),X=H(),d=r({}),$=r(""),F=r(""),M=r(""),ee=J(()=>$.value===F.value),x=r(!1),g=r(),V=r(!1),D=r(!1),c=r(!1),A=r(!1),Z=r(""),N=r(!1),le=J(()=>$.value.length>7&&F.value.length>7&&M.value.length>7),I=[s=>!!s||"Required.",s=>s&&s.length>=8||"Min 8 characters",s=>/\d/.test(s)&&/[a-zA-Z]/.test(s)||"Password must contain at least one letter and one number"],ae=()=>{h.post("/auth/change-password",{email:S.value.value,password:M.value,newPassword:$.value},{withCredentials:!0}).then(s=>{p.success("Password was changed successfully"),U.value=!1}).catch(s=>{console.log(s),p.error("failed - check your current password and try again!")})},{handleSubmit:T,resetForm:se,handleReset:je,isSubmitting:Ie,values:Re}=Ce({validationSchema:{name(s){return(s==null?void 0:s.length)>=2?!0:"Please enter your full name"},username(s){return(s==null?void 0:s.length)>=2&&/^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{0,28}[a-zA-Z0-9]$/i.test(s)?!0:"Please enter a valid username"},email(s){return/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(s)?!0:"Please enter a valid email"}},initialValues:{name:(Q=f.user)==null?void 0:Q.name,email:d.value.email,username:d.value.username}}),te=()=>{c.value=!0,h.post(`/users/${d.value.id}`,{password:Z.value},{withCredentials:!0}).then(s=>{A.value=!1,f.$reset(),K.push("/login")}).catch(s=>{console.log(s),p.error("failed - check your password and try again!")}).finally(()=>{c.value=!1})},S=q("email"),B=q("name"),E=q("username"),k=r(!1),b=r(!1),P=r(!1);pe(async()=>{await X.getUser(),d.value={...f.user},se({values:{name:d.value.name,username:d.value.username,email:d.value.email}})});const oe=T(()=>{c.value=!0,h.put(`/users/deleteProfilePic/${d.value.id}`,{file:null},{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then(s=>{p.success("user updated successfully"),f.assignUser(s.data),f.user=s.data,D.value=!1,g.value=null}).catch(s=>{p.error("failed"),console.log(s)}).finally(()=>{c.value=!1})}),ne=T(()=>{c.value=!0,h.put(`/users/${d.value.id}`,{file:g.value[0]?g.value[0]:null},{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then(s=>{p.success("user updated successfully"),f.assignUser(s.data),f.user=s.data,V.value=!1,g.value=null}).catch(s=>{p.error("failed"),console.log(s)}).finally(()=>{c.value=!1})}),ue=T(()=>{c.value=!0,h.put(`/users/${d.value.id}`,{name:B.value.value,username:E.value.value,email:S.value.value},{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then(s=>{p.success("user updated successfully"),f.assignUser(s.data),f.user=s.data,V.value=!1,g.value=null}).catch(s=>{p.error("failed"),console.log(s)}).finally(()=>{c.value=!1})}),re=async()=>{N.value=!0;try{await h.post("/auth/send-verification-email"),p.success("Verification email was sent")}catch{p.error("something went wrong!")}finally{N.value=!1}};return(s,e)=>{const w=i("v-col"),de=i("v-img"),ie=i("v-avatar"),v=i("v-btn"),z=i("v-row"),C=i("v-text-field"),ce=i("v-form"),Y=i("v-divider"),R=i("v-card-title"),L=i("v-card-text"),O=i("v-card"),j=i("v-dialog"),ve=i("v-file-input"),G=i("v-card-actions");return m(),W(_e,null,[Ve,ke,n("div",be,[l(ce,{onSubmit:o(T)},{default:a(()=>[l(z,{class:"border-t border-b items-center"},{default:a(()=>[l(w,{md:"4",cols:"12"},{default:a(()=>[Pe]),_:1}),(m(),_(w,{md:"5",cols:"12",key:d.value},{default:a(()=>[n("div",he,[l(ie,{color:"primary",class:"",size:80},{default:a(()=>{var t;return[!d.value.profilePhotoUrl&&d.value.name?(m(),W("p",Ue,we(d.value.name[0].toUpperCase()),1)):(m(),_(de,{key:1,src:(t=o(f).user)==null?void 0:t.profilePhotoUrl},null,8,["src"]))]}),_:1}),n("div",$e,[l(v,ge(s.props,{onClick:e[0]||(e[0]=t=>V.value=!0)}),{default:a(()=>[u("Change")]),_:1},16),l(v,{color:"error",onClick:e[1]||(e[1]=t=>D.value=!0),disabled:!d.value.profilePhotoUrl},{default:a(()=>[u("Delete")]),_:1},8,["disabled"])])])]),_:1}))]),_:1}),l(z,{class:"items-center"},{default:a(()=>[l(w,{md:"4",cols:"12"},{default:a(()=>[De]),_:1}),l(w,{md:"8",cols:"12"},{default:a(()=>[l(C,{name:"name",modelValue:o(B).value.value,"onUpdate:modelValue":e[2]||(e[2]=t=>o(B).value.value=t),"error-messages":o(B).errorMessage.value},null,8,["modelValue","error-messages"])]),_:1})]),_:1}),l(z,{class:"items-center"},{default:a(()=>[l(w,{md:"4",cols:"12"},{default:a(()=>[Ae]),_:1}),l(w,{md:"8",cols:"12"},{default:a(()=>[l(C,{modelValue:o(E).value.value,"onUpdate:modelValue":e[3]||(e[3]=t=>o(E).value.value=t),"error-messages":o(E).errorMessage.value,prefix:"@"},null,8,["modelValue","error-messages"])]),_:1})]),_:1}),l(z,{class:"items-center"},{default:a(()=>[l(w,{md:"4",cols:"12"},{default:a(()=>[Se]),_:1}),l(w,{md:"8",cols:"12"},{default:a(()=>[l(C,{readonly:"",disabled:o(f).user.isEmailVerified,modelValue:o(S).value.value,"onUpdate:modelValue":e[4]||(e[4]=t=>o(S).value.value=t),"error-messages":o(S).errorMessage.value},null,8,["disabled","modelValue","error-messages"]),o(f).user.isEmailVerified?ye("",!0):(m(),_(v,{key:0,disabled:N.value,loading:N.value,onClick:re,color:"primary",variant:"flat"},{default:a(()=>[u(" Verify ")]),_:1},8,["disabled","loading"]))]),_:1})]),_:1}),l(z,{class:"items-center"},{default:a(()=>[l(w,{cols:"12",class:"flex flex-col justify-end"},{default:a(()=>[n("div",ze,[l(v,{color:"primary",onClick:e[5]||(e[5]=()=>o(K).go(-1)),variant:"outlined"},{default:a(()=>[u("Cancel")]),_:1}),l(v,{color:"primary",onClick:o(ue)},{default:a(()=>[u("Save")]),_:1},8,["onClick"])])]),_:1})]),_:1})]),_:1},8,["onSubmit"]),Fe,l(Y,{class:"mt-2 border-2 border-black dark:border-white"}),l(v,{onClick:e[6]||(e[6]=t=>U.value=!0),class:"mt-2"},{default:a(()=>[u(" Change password ")]),_:1}),Me,l(Y,{class:"mt-2 border-2 border-black dark:border-white"}),l(v,{class:"mt-2",color:"error",onClick:e[7]||(e[7]=t=>A.value=!0)},{default:a(()=>[u(" Delete account ")]),_:1})]),l(j,{modelValue:U.value,"onUpdate:modelValue":e[18]||(e[18]=t=>U.value=t),class:"md:max-w-[40vw] w-full"},{default:a(()=>[l(O,null,{default:a(()=>[l(R,null,{default:a(()=>[u(" Change password ")]),_:1}),l(L,{class:"space-y-4 flex flex-col"},{default:a(()=>[n("div",null,[Ze,l(C,{rules:I,modelValue:M.value,"onUpdate:modelValue":e[10]||(e[10]=t=>M.value=t),type:x.value?"text":"password"},{"append-inner":a(()=>[x.value?(m(),_(o(y),{key:0,onClick:e[8]||(e[8]=()=>x.value=!x.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(m(),_(o(y),{key:1,onClick:e[9]||(e[9]=()=>x.value=!x.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["modelValue","type"])]),n("div",null,[Ne,l(C,{rules:I,modelValue:$.value,"onUpdate:modelValue":e[13]||(e[13]=t=>$.value=t),type:k.value?"text":"password"},{"append-inner":a(()=>[k.value?(m(),_(o(y),{key:0,onClick:e[11]||(e[11]=()=>k.value=!k.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(m(),_(o(y),{key:1,onClick:e[12]||(e[12]=()=>k.value=!k.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["modelValue","type"])]),n("div",null,[Te,l(C,{rules:I,modelValue:F.value,"onUpdate:modelValue":e[16]||(e[16]=t=>F.value=t),type:b.value?"text":"password"},{"append-inner":a(()=>[b.value?(m(),_(o(y),{key:0,onClick:e[14]||(e[14]=()=>b.value=!b.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(m(),_(o(y),{key:1,onClick:e[15]||(e[15]=()=>b.value=!b.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["modelValue","type"])]),n("div",Be,[l(v,{variant:"outlined",color:"primary",onClick:e[17]||(e[17]=t=>U.value=!1)},{default:a(()=>[u(" Cancel ")]),_:1}),l(v,{color:"primary",onClick:ae,disabled:!ee.value||!le.value},{default:a(()=>[u(" Change ")]),_:1},8,["disabled"])])]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(j,{modelValue:D.value,"onUpdate:modelValue":e[21]||(e[21]=t=>D.value=t),class:"md:max-w-[50vw] w-full"},{default:a(()=>[l(xe,{"is-loading":c.value,title:"Delete Profile Picture",actionBtnText:"Delete",text:"Your profile picture will be deleted",onCancel:e[19]||(e[19]=t=>D.value=!1),onDelete:e[20]||(e[20]=()=>{g.value=null,o(oe)()})},null,8,["is-loading"])]),_:1},8,["modelValue"]),l(j,{modelValue:V.value,"onUpdate:modelValue":e[24]||(e[24]=t=>V.value=t),class:"md:max-w-[50vw] w-full"},{default:a(()=>[l(O,null,{default:a(()=>[l(R,null,{default:a(()=>[u(" Change your profile picture ")]),_:1}),l(L,null,{default:a(()=>[l(ve,{modelValue:g.value,"onUpdate:modelValue":e[22]||(e[22]=t=>g.value=t),accept:"image/*",label:"Profile Picture",variant:"solo-filled"},null,8,["modelValue"])]),_:1}),l(G,{class:"self-end"},{default:a(()=>[l(v,{variant:"outlined",color:"primary",onClick:e[23]||(e[23]=t=>V.value=!1)},{default:a(()=>[u(" Cancel ")]),_:1}),l(v,{onClick:o(ne),disabled:c.value,loading:c.value,variant:"flat",color:"primary"},{default:a(()=>[u(" Update ")]),_:1},8,["onClick","disabled","loading"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(j,{modelValue:A.value,"onUpdate:modelValue":e[29]||(e[29]=t=>A.value=t),class:"md:max-w-[50vw] w-full"},{default:a(()=>[l(O,null,{default:a(()=>[l(R,null,{default:a(()=>[u(" Delete your account? ")]),_:1}),l(L,null,{default:a(()=>[u(" Are you sure you want to delete you account? "),l(C,{type:P.value?"text":"password",class:"mt-2",modelValue:Z.value,"onUpdate:modelValue":e[27]||(e[27]=t=>Z.value=t),label:"password"},{"append-inner":a(()=>[P.value?(m(),_(o(y),{key:0,onClick:e[25]||(e[25]=()=>P.value=!P.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(m(),_(o(y),{key:1,onClick:e[26]||(e[26]=()=>P.value=!P.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["type","modelValue"])]),_:1}),l(G,{class:"self-end"},{default:a(()=>[l(v,{variant:"outlined",color:"primary",onClick:e[28]||(e[28]=t=>A.value=!1)},{default:a(()=>[u(" Cancel ")]),_:1}),l(v,{onClick:te,disabled:c.value||Z.value.length<1,loading:c.value,variant:"flat",color:"error"},{default:a(()=>[u(" Delete ")]),_:1},8,["disabled","loading"])]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}}};export{Ke as default};
