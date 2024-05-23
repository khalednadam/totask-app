import{u as Q,P as fe,S as pe,r,T as W,q as _e,l as h,U as I,c as i,o as m,d as X,f as n,g as l,w as a,e as o,F as we,h as p,t as ye,m as ge,k as u,i as Ce,I as y}from"./index-c4a9d61a.js";import{u as xe,a as Y}from"./vee-validate.esm-ac0c5f4b.js";import Ve from"./DeleteModal-fd26e8a6.js";const ke=n("h1",{class:"text-3xl mt-3"},"Settings",-1),be=n("p",{class:"mt-5 text-xl"},"Account info",-1),Pe={class:"mt-5"},he=n("p",{class:"text-xl"},"Profile picture",-1),Ue={class:"flex gap-10 items-center"},$e={key:0,class:"text-4xl"},De={class:"flex flex-col justify-between items-center gap-2"},Ae=n("p",{class:"text-xl"},"Full name",-1),Se=n("p",{class:"text-xl"},"username",-1),ze=n("p",{class:"text-xl"},"Email",-1),Fe={class:"flex justify-end gap-3"},Te=n("p",{class:"text-xl"},"Change password",-1),Ze=n("p",{class:"text-xl text-error mt-5"},"Delete account",-1),Me=n("p",null,"Current Password",-1),Ne=n("p",null,"New Password",-1),Be=n("p",null,"New Password Confirmation",-1),Ee={class:"flex justify-end gap-2"},Ge={__name:"Settings",setup(je){var H;const f=Q(),G=fe(),g=pe(),U=r(!1),ee=Q(),d=r({}),$=r(""),F=r(""),T=r(""),le=W(()=>$.value===F.value),x=r(!1),w=r(),V=r(!1),D=r(!1),c=r(!1),A=r(!1),Z=r(""),M=r(!1),ae=W(()=>$.value.length>7&&F.value.length>7&&T.value.length>7),R=[t=>!!t||"Required.",t=>t&&t.length>=8||"Min 8 characters",t=>/\d/.test(t)&&/[a-zA-Z]/.test(t)||"Password must contain at least one letter and one number"],te=()=>{h.post("/auth/change-password",{email:S.value.value,password:T.value,newPassword:$.value},{withCredentials:!0}).then(t=>{g.success("Password was changed successfully"),U.value=!1}).catch(t=>{I(t)})},{handleSubmit:N,resetForm:se,handleReset:Ie,isSubmitting:Re,values:qe}=xe({validationSchema:{name(t){return(t==null?void 0:t.length)>=2?!0:"Please enter your full name"},username(t){return(t==null?void 0:t.length)>=2&&/^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{0,28}[a-zA-Z0-9]$/i.test(t)?!0:"Please enter a valid username"},email(t){return/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(t)?!0:"Please enter a valid email"}},initialValues:{name:(H=f.user)==null?void 0:H.name,email:d.value.email,username:d.value.username}}),oe=()=>{c.value=!0,h.post(`/users/${d.value.id}`,{password:Z.value},{withCredentials:!0}).then(t=>{A.value=!1,f.$reset(),G.push("/login")}).catch(t=>{g.error("failed - check your password and try again!")}).finally(()=>{c.value=!1})},S=Y("email"),B=Y("name"),E=Y("username"),k=r(!1),b=r(!1),P=r(!1);_e(async()=>{await ee.getUser(),d.value={...f.user},se({values:{name:d.value.name,username:d.value.username,email:d.value.email}})});const ne=N(()=>{c.value=!0,h.put(`/users/deleteProfilePic/${d.value.id}`,{file:null},{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then(t=>{g.success("user updated successfully"),f.assignUser(t.data),f.user=t.data,D.value=!1,w.value=null}).catch(t=>{I(t)}).finally(()=>{c.value=!1})}),ue=N(()=>{c.value=!0,h.put(`/users/${d.value.id}`,{file:w.value[0]?w.value[0]:null},{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then(t=>{g.success("user updated successfully"),f.assignUser(t.data),f.user=t.data,V.value=!1,w.value=null}).catch(t=>{I(t)}).finally(()=>{c.value=!1})}),re=N(()=>{c.value=!0,h.put(`/users/${d.value.id}`,{name:B.value.value,username:E.value.value,email:S.value.value},{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then(t=>{g.success("user updated successfully"),f.assignUser(t.data),f.user=t.data,V.value=!1,w.value=null}).catch(t=>{I(t)}).finally(()=>{c.value=!1})}),de=async()=>{M.value=!0;try{await h.post("/auth/send-verification-email"),g.success("Verification email was sent")}catch{g.error("Something went wrong!")}finally{M.value=!1}};return(t,e)=>{const _=i("v-col"),ie=i("v-img"),ce=i("v-avatar"),v=i("v-btn"),z=i("v-row"),C=i("v-text-field"),ve=i("v-form"),J=i("v-divider"),q=i("v-card-title"),L=i("v-card-text"),O=i("v-card"),j=i("v-dialog"),me=i("v-file-input"),K=i("v-card-actions");return m(),X(we,null,[ke,be,n("div",Pe,[l(ve,{onSubmit:o(N)},{default:a(()=>[l(z,{class:"border-t border-b items-center"},{default:a(()=>[l(_,{md:"4",cols:"12"},{default:a(()=>[he]),_:1}),(m(),p(_,{md:"5",cols:"12",key:d.value},{default:a(()=>[n("div",Ue,[l(ce,{color:"primary",class:"",size:80},{default:a(()=>{var s;return[!d.value.profilePhotoUrl&&d.value.name?(m(),X("p",$e,ye(d.value.name[0].toUpperCase()),1)):(m(),p(ie,{key:1,src:(s=o(f).user)==null?void 0:s.profilePhotoUrl},null,8,["src"]))]}),_:1}),n("div",De,[l(v,ge(t.props,{color:"primary",onClick:e[0]||(e[0]=s=>V.value=!0)}),{default:a(()=>[u("Change")]),_:1},16),l(v,{color:"error",onClick:e[1]||(e[1]=s=>D.value=!0),disabled:!d.value.profilePhotoUrl},{default:a(()=>[u("Delete")]),_:1},8,["disabled"])])])]),_:1}))]),_:1}),l(z,{class:"items-center"},{default:a(()=>[l(_,{md:"4",cols:"12"},{default:a(()=>[Ae]),_:1}),l(_,{md:"8",cols:"12"},{default:a(()=>[l(C,{name:"name",modelValue:o(B).value.value,"onUpdate:modelValue":e[2]||(e[2]=s=>o(B).value.value=s),"error-messages":o(B).errorMessage.value},null,8,["modelValue","error-messages"])]),_:1})]),_:1}),l(z,{class:"items-center"},{default:a(()=>[l(_,{md:"4",cols:"12"},{default:a(()=>[Se]),_:1}),l(_,{md:"8",cols:"12"},{default:a(()=>[l(C,{modelValue:o(E).value.value,"onUpdate:modelValue":e[3]||(e[3]=s=>o(E).value.value=s),"error-messages":o(E).errorMessage.value,prefix:"@"},null,8,["modelValue","error-messages"])]),_:1})]),_:1}),l(z,{class:"items-center"},{default:a(()=>[l(_,{md:"4",cols:"12"},{default:a(()=>[ze]),_:1}),l(_,{md:"8",cols:"12"},{default:a(()=>[l(C,{modelValue:o(S).value.value,"onUpdate:modelValue":e[4]||(e[4]=s=>o(S).value.value=s),"error-messages":o(S).errorMessage.value},null,8,["modelValue","error-messages"]),o(f).user.isEmailVerified?Ce("",!0):(m(),p(v,{key:0,disabled:M.value,loading:M.value,onClick:de,color:"primary",variant:"flat"},{default:a(()=>[u(" Verify ")]),_:1},8,["disabled","loading"]))]),_:1})]),_:1}),l(z,{class:"items-center"},{default:a(()=>[l(_,{cols:"12",class:"flex flex-col justify-end"},{default:a(()=>[n("div",Fe,[l(v,{color:"primary",onClick:e[5]||(e[5]=()=>o(G).go(-1)),variant:"outlined"},{default:a(()=>[u("Cancel")]),_:1}),l(v,{color:"primary",onClick:o(re)},{default:a(()=>[u("Save")]),_:1},8,["onClick"])])]),_:1})]),_:1})]),_:1},8,["onSubmit"]),Te,l(J,{class:"mt-2 border-2 border-black dark:border-white"}),l(v,{onClick:e[6]||(e[6]=s=>U.value=!0),class:"mt-2"},{default:a(()=>[u(" Change password ")]),_:1}),Ze,l(J,{class:"mt-2 border-2 border-black dark:border-white"}),l(v,{class:"mt-2",color:"error",onClick:e[7]||(e[7]=s=>A.value=!0)},{default:a(()=>[u(" Delete account ")]),_:1})]),l(j,{modelValue:U.value,"onUpdate:modelValue":e[18]||(e[18]=s=>U.value=s),class:"md:max-w-[40vw] w-full"},{default:a(()=>[l(O,null,{default:a(()=>[l(q,null,{default:a(()=>[u(" Change password ")]),_:1}),l(L,{class:"space-y-4 flex flex-col"},{default:a(()=>[n("div",null,[Me,l(C,{rules:R,modelValue:T.value,"onUpdate:modelValue":e[10]||(e[10]=s=>T.value=s),type:x.value?"text":"password"},{"append-inner":a(()=>[x.value?(m(),p(o(y),{key:0,onClick:e[8]||(e[8]=()=>x.value=!x.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(m(),p(o(y),{key:1,onClick:e[9]||(e[9]=()=>x.value=!x.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["modelValue","type"])]),n("div",null,[Ne,l(C,{rules:R,modelValue:$.value,"onUpdate:modelValue":e[13]||(e[13]=s=>$.value=s),type:k.value?"text":"password"},{"append-inner":a(()=>[k.value?(m(),p(o(y),{key:0,onClick:e[11]||(e[11]=()=>k.value=!k.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(m(),p(o(y),{key:1,onClick:e[12]||(e[12]=()=>k.value=!k.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["modelValue","type"])]),n("div",null,[Be,l(C,{rules:R,modelValue:F.value,"onUpdate:modelValue":e[16]||(e[16]=s=>F.value=s),type:b.value?"text":"password"},{"append-inner":a(()=>[b.value?(m(),p(o(y),{key:0,onClick:e[14]||(e[14]=()=>b.value=!b.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(m(),p(o(y),{key:1,onClick:e[15]||(e[15]=()=>b.value=!b.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["modelValue","type"])]),n("div",Ee,[l(v,{variant:"outlined",color:"primary",onClick:e[17]||(e[17]=s=>U.value=!1)},{default:a(()=>[u(" Cancel ")]),_:1}),l(v,{color:"primary",onClick:te,disabled:!le.value||!ae.value},{default:a(()=>[u(" Change ")]),_:1},8,["disabled"])])]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(j,{modelValue:D.value,"onUpdate:modelValue":e[21]||(e[21]=s=>D.value=s),class:"md:max-w-[50vw] w-full"},{default:a(()=>[l(Ve,{"is-loading":c.value,title:"Delete Profile Picture",actionBtnText:"Delete",text:"Your profile picture will be deleted",onCancel:e[19]||(e[19]=s=>D.value=!1),onDelete:e[20]||(e[20]=()=>{w.value=null,o(ne)()})},null,8,["is-loading"])]),_:1},8,["modelValue"]),l(j,{modelValue:V.value,"onUpdate:modelValue":e[24]||(e[24]=s=>V.value=s),class:"md:max-w-[50vw] w-full"},{default:a(()=>[l(O,null,{default:a(()=>[l(q,null,{default:a(()=>[u(" Change your profile picture ")]),_:1}),l(L,null,{default:a(()=>[l(me,{modelValue:w.value,"onUpdate:modelValue":e[22]||(e[22]=s=>w.value=s),accept:"image/*",label:"Profile Picture",variant:"solo-filled"},null,8,["modelValue"])]),_:1}),l(K,{class:"self-end"},{default:a(()=>[l(v,{variant:"outlined",color:"primary",onClick:e[23]||(e[23]=s=>V.value=!1)},{default:a(()=>[u(" Cancel ")]),_:1}),l(v,{onClick:o(ue),disabled:c.value,loading:c.value,variant:"flat",color:"primary"},{default:a(()=>[u(" Update ")]),_:1},8,["onClick","disabled","loading"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(j,{modelValue:A.value,"onUpdate:modelValue":e[29]||(e[29]=s=>A.value=s),class:"md:max-w-[50vw] w-full"},{default:a(()=>[l(O,null,{default:a(()=>[l(q,null,{default:a(()=>[u(" Delete your account? ")]),_:1}),l(L,null,{default:a(()=>[u(" Are you sure you want to delete you account? "),l(C,{type:P.value?"text":"password",class:"mt-2",modelValue:Z.value,"onUpdate:modelValue":e[27]||(e[27]=s=>Z.value=s),label:"password"},{"append-inner":a(()=>[P.value?(m(),p(o(y),{key:0,onClick:e[25]||(e[25]=()=>P.value=!P.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(m(),p(o(y),{key:1,onClick:e[26]||(e[26]=()=>P.value=!P.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["type","modelValue"])]),_:1}),l(K,{class:"self-end"},{default:a(()=>[l(v,{variant:"outlined",color:"primary",onClick:e[28]||(e[28]=s=>A.value=!1)},{default:a(()=>[u(" Cancel ")]),_:1}),l(v,{onClick:oe,disabled:c.value||Z.value.length<1,loading:c.value,variant:"flat",color:"error"},{default:a(()=>[u(" Delete ")]),_:1},8,["disabled","loading"])]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}}};export{Ge as default};
