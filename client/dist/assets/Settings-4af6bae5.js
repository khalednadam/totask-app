import{u as K,P as me,S as fe,r as u,T as Q,q as pe,l as h,c as i,o as m,d as W,f as r,g as l,w as a,e as o,F as _e,h as _,t as we,m as ye,k as n,i as ge,I as g}from"./index-af3fa15e.js";import{u as Ce,a as O}from"./vee-validate.esm-91a7e89b.js";import xe from"./DeleteModal-aa2be5f5.js";const Ve=r("h1",{class:"text-3xl mt-3"},"Settings",-1),ke=r("p",{class:"mt-5 text-xl"},"Account info",-1),be={class:"mt-5"},Pe=r("p",{class:"text-xl"},"Profile picture",-1),he={class:"flex gap-10 items-center"},Ue={key:0,class:"text-4xl"},Ae={class:"flex flex-col justify-between items-center gap-2"},$e=r("p",{class:"text-xl"},"Full name",-1),De=r("p",{class:"text-xl"},"username",-1),Se=r("p",{class:"text-xl"},"Email",-1),ze={class:"flex justify-end gap-3"},Fe=r("p",{class:"text-xl"},"Change password",-1),Te=r("p",{class:"text-xl text-error mt-5"},"Delete account",-1),Ze=r("p",null,"Current Password",-1),Me=r("p",null,"New Password",-1),Ne=r("p",null,"New Password Confirmation",-1),Be={class:"flex justify-end gap-2"},Ye={__name:"Settings",setup(Ee){var G;const f=K(),Y=me(),p=fe(),U=u(!1),X=K(),d=u({}),A=u(""),F=u(""),T=u(""),ee=Q(()=>A.value===F.value),x=u(!1),y=u(),V=u(!1),$=u(!1),c=u(!1),D=u(!1),Z=u(""),M=u(!1),le=Q(()=>A.value.length>7&&F.value.length>7&&T.value.length>7),I=[t=>!!t||"Required.",t=>t&&t.length>=8||"Min 8 characters",t=>/\d/.test(t)&&/[a-zA-Z]/.test(t)||"Password must contain at least one letter and one number"],ae=()=>{h.post("/auth/change-password",{email:S.value.value,password:T.value,newPassword:A.value},{withCredentials:!0}).then(t=>{p.success("Password was changed successfully"),U.value=!1}).catch(t=>{p.error("An error occurred")})},{handleSubmit:N,resetForm:te,handleReset:je,isSubmitting:Ie,values:Re}=Ce({validationSchema:{name(t){return(t==null?void 0:t.length)>=2?!0:"Please enter your full name"},username(t){return(t==null?void 0:t.length)>=2&&/^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{0,28}[a-zA-Z0-9]$/i.test(t)?!0:"Please enter a valid username"},email(t){return/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(t)?!0:"Please enter a valid email"}},initialValues:{name:(G=f.user)==null?void 0:G.name,email:d.value.email,username:d.value.username}}),se=()=>{c.value=!0,h.post(`/users/${d.value.id}`,{password:Z.value},{withCredentials:!0}).then(t=>{D.value=!1,f.$reset(),Y.push("/login")}).catch(t=>{p.error("failed - check your password and try again!")}).finally(()=>{c.value=!1})},S=O("email"),B=O("name"),E=O("username"),k=u(!1),b=u(!1),P=u(!1);pe(async()=>{await X.getUser(),d.value={...f.user},te({values:{name:d.value.name,username:d.value.username,email:d.value.email}})});const oe=N(()=>{c.value=!0,h.put(`/users/deleteProfilePic/${d.value.id}`,{file:null},{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then(t=>{p.success("user updated successfully"),f.assignUser(t.data),f.user=t.data,$.value=!1,y.value=null}).catch(t=>{p.error("An error occurred")}).finally(()=>{c.value=!1})}),re=N(()=>{c.value=!0,h.put(`/users/${d.value.id}`,{file:y.value[0]?y.value[0]:null},{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then(t=>{p.success("user updated successfully"),f.assignUser(t.data),f.user=t.data,V.value=!1,y.value=null}).catch(t=>{p.error("An error occurred")}).finally(()=>{c.value=!1})}),ne=N(()=>{c.value=!0,h.put(`/users/${d.value.id}`,{name:B.value.value,username:E.value.value,email:S.value.value},{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then(t=>{p.success("user updated successfully"),f.assignUser(t.data),f.user=t.data,V.value=!1,y.value=null}).catch(t=>{p.error("An error occurred")}).finally(()=>{c.value=!1})}),ue=async()=>{M.value=!0;try{await h.post("/auth/send-verification-email"),p.success("Verification email was sent")}catch{p.error("Something went wrong!")}finally{M.value=!1}};return(t,e)=>{const w=i("v-col"),de=i("v-img"),ie=i("v-avatar"),v=i("v-btn"),z=i("v-row"),C=i("v-text-field"),ce=i("v-form"),H=i("v-divider"),R=i("v-card-title"),q=i("v-card-text"),L=i("v-card"),j=i("v-dialog"),ve=i("v-file-input"),J=i("v-card-actions");return m(),W(_e,null,[Ve,ke,r("div",be,[l(ce,{onSubmit:o(N)},{default:a(()=>[l(z,{class:"border-t border-b items-center"},{default:a(()=>[l(w,{md:"4",cols:"12"},{default:a(()=>[Pe]),_:1}),(m(),_(w,{md:"5",cols:"12",key:d.value},{default:a(()=>[r("div",he,[l(ie,{color:"primary",class:"",size:80},{default:a(()=>{var s;return[!d.value.profilePhotoUrl&&d.value.name?(m(),W("p",Ue,we(d.value.name[0].toUpperCase()),1)):(m(),_(de,{key:1,src:(s=o(f).user)==null?void 0:s.profilePhotoUrl},null,8,["src"]))]}),_:1}),r("div",Ae,[l(v,ye(t.props,{onClick:e[0]||(e[0]=s=>V.value=!0)}),{default:a(()=>[n("Change")]),_:1},16),l(v,{color:"error",onClick:e[1]||(e[1]=s=>$.value=!0),disabled:!d.value.profilePhotoUrl},{default:a(()=>[n("Delete")]),_:1},8,["disabled"])])])]),_:1}))]),_:1}),l(z,{class:"items-center"},{default:a(()=>[l(w,{md:"4",cols:"12"},{default:a(()=>[$e]),_:1}),l(w,{md:"8",cols:"12"},{default:a(()=>[l(C,{name:"name",modelValue:o(B).value.value,"onUpdate:modelValue":e[2]||(e[2]=s=>o(B).value.value=s),"error-messages":o(B).errorMessage.value},null,8,["modelValue","error-messages"])]),_:1})]),_:1}),l(z,{class:"items-center"},{default:a(()=>[l(w,{md:"4",cols:"12"},{default:a(()=>[De]),_:1}),l(w,{md:"8",cols:"12"},{default:a(()=>[l(C,{modelValue:o(E).value.value,"onUpdate:modelValue":e[3]||(e[3]=s=>o(E).value.value=s),"error-messages":o(E).errorMessage.value,prefix:"@"},null,8,["modelValue","error-messages"])]),_:1})]),_:1}),l(z,{class:"items-center"},{default:a(()=>[l(w,{md:"4",cols:"12"},{default:a(()=>[Se]),_:1}),l(w,{md:"8",cols:"12"},{default:a(()=>[l(C,{readonly:"",disabled:o(f).user.isEmailVerified,modelValue:o(S).value.value,"onUpdate:modelValue":e[4]||(e[4]=s=>o(S).value.value=s),"error-messages":o(S).errorMessage.value},null,8,["disabled","modelValue","error-messages"]),o(f).user.isEmailVerified?ge("",!0):(m(),_(v,{key:0,disabled:M.value,loading:M.value,onClick:ue,color:"primary",variant:"flat"},{default:a(()=>[n(" Verify ")]),_:1},8,["disabled","loading"]))]),_:1})]),_:1}),l(z,{class:"items-center"},{default:a(()=>[l(w,{cols:"12",class:"flex flex-col justify-end"},{default:a(()=>[r("div",ze,[l(v,{color:"primary",onClick:e[5]||(e[5]=()=>o(Y).go(-1)),variant:"outlined"},{default:a(()=>[n("Cancel")]),_:1}),l(v,{color:"primary",onClick:o(ne)},{default:a(()=>[n("Save")]),_:1},8,["onClick"])])]),_:1})]),_:1})]),_:1},8,["onSubmit"]),Fe,l(H,{class:"mt-2 border-2 border-black dark:border-white"}),l(v,{onClick:e[6]||(e[6]=s=>U.value=!0),class:"mt-2"},{default:a(()=>[n(" Change password ")]),_:1}),Te,l(H,{class:"mt-2 border-2 border-black dark:border-white"}),l(v,{class:"mt-2",color:"error",onClick:e[7]||(e[7]=s=>D.value=!0)},{default:a(()=>[n(" Delete account ")]),_:1})]),l(j,{modelValue:U.value,"onUpdate:modelValue":e[18]||(e[18]=s=>U.value=s),class:"md:max-w-[40vw] w-full"},{default:a(()=>[l(L,null,{default:a(()=>[l(R,null,{default:a(()=>[n(" Change password ")]),_:1}),l(q,{class:"space-y-4 flex flex-col"},{default:a(()=>[r("div",null,[Ze,l(C,{rules:I,modelValue:T.value,"onUpdate:modelValue":e[10]||(e[10]=s=>T.value=s),type:x.value?"text":"password"},{"append-inner":a(()=>[x.value?(m(),_(o(g),{key:0,onClick:e[8]||(e[8]=()=>x.value=!x.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(m(),_(o(g),{key:1,onClick:e[9]||(e[9]=()=>x.value=!x.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["modelValue","type"])]),r("div",null,[Me,l(C,{rules:I,modelValue:A.value,"onUpdate:modelValue":e[13]||(e[13]=s=>A.value=s),type:k.value?"text":"password"},{"append-inner":a(()=>[k.value?(m(),_(o(g),{key:0,onClick:e[11]||(e[11]=()=>k.value=!k.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(m(),_(o(g),{key:1,onClick:e[12]||(e[12]=()=>k.value=!k.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["modelValue","type"])]),r("div",null,[Ne,l(C,{rules:I,modelValue:F.value,"onUpdate:modelValue":e[16]||(e[16]=s=>F.value=s),type:b.value?"text":"password"},{"append-inner":a(()=>[b.value?(m(),_(o(g),{key:0,onClick:e[14]||(e[14]=()=>b.value=!b.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(m(),_(o(g),{key:1,onClick:e[15]||(e[15]=()=>b.value=!b.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["modelValue","type"])]),r("div",Be,[l(v,{variant:"outlined",color:"primary",onClick:e[17]||(e[17]=s=>U.value=!1)},{default:a(()=>[n(" Cancel ")]),_:1}),l(v,{color:"primary",onClick:ae,disabled:!ee.value||!le.value},{default:a(()=>[n(" Change ")]),_:1},8,["disabled"])])]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(j,{modelValue:$.value,"onUpdate:modelValue":e[21]||(e[21]=s=>$.value=s),class:"md:max-w-[50vw] w-full"},{default:a(()=>[l(xe,{"is-loading":c.value,title:"Delete Profile Picture",actionBtnText:"Delete",text:"Your profile picture will be deleted",onCancel:e[19]||(e[19]=s=>$.value=!1),onDelete:e[20]||(e[20]=()=>{y.value=null,o(oe)()})},null,8,["is-loading"])]),_:1},8,["modelValue"]),l(j,{modelValue:V.value,"onUpdate:modelValue":e[24]||(e[24]=s=>V.value=s),class:"md:max-w-[50vw] w-full"},{default:a(()=>[l(L,null,{default:a(()=>[l(R,null,{default:a(()=>[n(" Change your profile picture ")]),_:1}),l(q,null,{default:a(()=>[l(ve,{modelValue:y.value,"onUpdate:modelValue":e[22]||(e[22]=s=>y.value=s),accept:"image/*",label:"Profile Picture",variant:"solo-filled"},null,8,["modelValue"])]),_:1}),l(J,{class:"self-end"},{default:a(()=>[l(v,{variant:"outlined",color:"primary",onClick:e[23]||(e[23]=s=>V.value=!1)},{default:a(()=>[n(" Cancel ")]),_:1}),l(v,{onClick:o(re),disabled:c.value,loading:c.value,variant:"flat",color:"primary"},{default:a(()=>[n(" Update ")]),_:1},8,["onClick","disabled","loading"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(j,{modelValue:D.value,"onUpdate:modelValue":e[29]||(e[29]=s=>D.value=s),class:"md:max-w-[50vw] w-full"},{default:a(()=>[l(L,null,{default:a(()=>[l(R,null,{default:a(()=>[n(" Delete your account? ")]),_:1}),l(q,null,{default:a(()=>[n(" Are you sure you want to delete you account? "),l(C,{type:P.value?"text":"password",class:"mt-2",modelValue:Z.value,"onUpdate:modelValue":e[27]||(e[27]=s=>Z.value=s),label:"password"},{"append-inner":a(()=>[P.value?(m(),_(o(g),{key:0,onClick:e[25]||(e[25]=()=>P.value=!P.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(m(),_(o(g),{key:1,onClick:e[26]||(e[26]=()=>P.value=!P.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["type","modelValue"])]),_:1}),l(J,{class:"self-end"},{default:a(()=>[l(v,{variant:"outlined",color:"primary",onClick:e[28]||(e[28]=s=>D.value=!1)},{default:a(()=>[n(" Cancel ")]),_:1}),l(v,{onClick:se,disabled:c.value||Z.value.length<1,loading:c.value,variant:"flat",color:"error"},{default:a(()=>[n(" Delete ")]),_:1},8,["disabled","loading"])]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}}};export{Ye as default};
