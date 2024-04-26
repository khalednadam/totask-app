import{u as Y,J as ie,L as ce,k as d,N as G,m as ve,H as S,r as i,o as f,c as K,f as u,d as l,w as a,b as o,F as me,h as g,t as fe,O as pe,e as n,M as b}from"./index-3ee1bcb6.js";import{u as _e,a as L}from"./vee-validate.esm-6967ed8d.js";import we from"./DeleteModal-cea1b5d4.js";const ge=u("h1",{class:"text-3xl mt-3"}," Settings ",-1),ye=u("p",{class:"mt-5 text-xl"}," Account info ",-1),xe={class:"mt-5"},Ce=u("p",{class:"text-xl"}," Profile picture ",-1),Ve={class:"flex gap-10 items-center"},ke={key:0,class:"text-4xl"},be={class:"flex flex-col justify-between items-center gap-2"},Pe=u("p",{class:"text-xl"}," Full name ",-1),he=u("p",{class:"text-xl"}," username ",-1),Ue=u("p",{class:"text-xl"}," Email ",-1),$e={class:"flex justify-end gap-3"},De=u("p",{class:"text-xl"}," Change password ",-1),Ae=u("p",{class:"text-xl text-error mt-5"}," Delete account ",-1),Se=u("p",null," Current Password ",-1),ze=u("p",null," New Password ",-1),Fe=u("p",null," New Password Confirmation ",-1),Me={class:"flex justify-end gap-2"},Ie={__name:"Settings",setup(Ze){var q;const m=Y(),O=ie(),p=ce(),P=d(!1),Q=Y(),r=d({}),h=d(""),z=d(""),F=d(""),W=G(()=>h.value===z.value),x=d(!1),w=d(),C=d(!1),U=d(!1),c=d(!1),$=d(!1),M=d(""),X=G(()=>h.value.length>7&&z.value.length>7&&F.value.length>7),j=[t=>!!t||"Required.",t=>t&&t.length>=8||"Min 8 characters",t=>/\d/.test(t)&&/[a-zA-Z]/.test(t)||"Password must contain at least one letter and one number"],ee=()=>{S.post("/auth/change-password",{email:D.value.value,password:F.value,newPassword:h.value},{withCredentials:!0}).then(t=>{p.success("Password was changed successfully"),P.value=!1}).catch(t=>{console.log(t),p.error("failed - check your current password and try again!")})},{handleSubmit:Z,resetForm:le,handleReset:Ne,isSubmitting:Te,values:Be}=_e({validationSchema:{name(t){return(t==null?void 0:t.length)>=2?!0:"Please enter your full name"},username(t){return(t==null?void 0:t.length)>=2&&/^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{0,28}[a-zA-Z0-9]$/i.test(t)?!0:"Please enter a valid username"},email(t){return/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(t)?!0:"Please enter a valid email"}},initialValues:{name:(q=m.user)==null?void 0:q.name,email:r.value.email,username:r.value.username}}),ae=()=>{c.value=!0,S.post(`/users/${r.value.id}`,{password:M.value},{withCredentials:!0}).then(t=>{$.value=!1,m.$reset(),O.push("/login")}).catch(t=>{console.log(t),p.error("failed - check your password and try again!")}).finally(()=>{c.value=!1})},D=L("email"),N=L("name"),T=L("username"),V=d(!1),k=d(!1);ve(async()=>{await Q.getUser(),r.value={...m.user},le({values:{name:r.value.name,username:r.value.username,email:r.value.email}})});const te=Z(()=>{c.value=!0,S.put(`/users/deleteProfilePic/${r.value.id}`,{file:null},{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then(t=>{p.success("user updated successfully"),m.assignUser(t.data),m.user=t.data,U.value=!1,w.value=null}).catch(t=>{p.error("failed"),console.log(t)}).finally(()=>{c.value=!1})}),se=Z(()=>{c.value=!0,S.put(`/users/${r.value.id}`,{file:w.value[0]?w.value[0]:null},{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then(t=>{p.success("user updated successfully"),m.assignUser(t.data),m.user=t.data,C.value=!1,w.value=null}).catch(t=>{p.error("failed"),console.log(t)}).finally(()=>{c.value=!1})}),oe=Z(()=>{c.value=!0,S.put(`/users/${r.value.id}`,{name:N.value.value,username:T.value.value,email:D.value.value},{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then(t=>{p.success("user updated successfully"),m.assignUser(t.data),m.user=t.data,C.value=!1,w.value=null}).catch(t=>{p.error("failed"),console.log(t)}).finally(()=>{c.value=!1})});return(t,e)=>{const _=i("v-col"),ue=i("v-img"),ne=i("v-avatar"),v=i("v-btn"),A=i("v-row"),y=i("v-text-field"),re=i("v-form"),H=i("v-divider"),R=i("v-card-title"),E=i("v-card-text"),I=i("v-card"),B=i("v-dialog"),de=i("v-file-input"),J=i("v-card-actions");return f(),K(me,null,[ge,ye,u("div",xe,[l(re,{onSubmit:o(Z)},{default:a(()=>[l(A,{class:"border-t border-b items-center"},{default:a(()=>[l(_,{md:"4",cols:"12"},{default:a(()=>[Ce]),_:1}),(f(),g(_,{md:"5",cols:"12",key:r.value},{default:a(()=>[u("div",Ve,[l(ne,{color:"primary",class:"",size:80},{default:a(()=>{var s;return[!r.value.profilePhotoUrl&&r.value.name?(f(),K("p",ke,fe(r.value.name[0].toUpperCase()),1)):(f(),g(ue,{key:1,src:(s=o(m).user)==null?void 0:s.profilePhotoUrl},null,8,["src"]))]}),_:1}),u("div",be,[l(v,pe(t.props,{onClick:e[0]||(e[0]=s=>C.value=!0)}),{default:a(()=>[n("Change")]),_:1},16),l(v,{color:"error",onClick:e[1]||(e[1]=s=>U.value=!0),disabled:!r.value.profilePhotoUrl},{default:a(()=>[n("Delete")]),_:1},8,["disabled"])])])]),_:1}))]),_:1}),l(A,{class:"items-center"},{default:a(()=>[l(_,{md:"4",cols:"12"},{default:a(()=>[Pe]),_:1}),l(_,{md:"8",cols:"12"},{default:a(()=>[l(y,{name:"name",modelValue:o(N).value.value,"onUpdate:modelValue":e[2]||(e[2]=s=>o(N).value.value=s),"error-messages":o(N).errorMessage.value},null,8,["modelValue","error-messages"])]),_:1})]),_:1}),l(A,{class:"items-center"},{default:a(()=>[l(_,{md:"4",cols:"12"},{default:a(()=>[he]),_:1}),l(_,{md:"8",cols:"12"},{default:a(()=>[l(y,{modelValue:o(T).value.value,"onUpdate:modelValue":e[3]||(e[3]=s=>o(T).value.value=s),"error-messages":o(T).errorMessage.value,prefix:"@"},null,8,["modelValue","error-messages"])]),_:1})]),_:1}),l(A,{class:"items-center"},{default:a(()=>[l(_,{md:"4",cols:"12"},{default:a(()=>[Ue]),_:1}),l(_,{md:"8",cols:"12"},{default:a(()=>[l(y,{modelValue:o(D).value.value,"onUpdate:modelValue":e[4]||(e[4]=s=>o(D).value.value=s),"error-messages":o(D).errorMessage.value},null,8,["modelValue","error-messages"])]),_:1})]),_:1}),l(A,{class:"items-center"},{default:a(()=>[l(_,{cols:"12",class:"flex flex-col justify-end"},{default:a(()=>[u("div",$e,[l(v,{color:"primary",onClick:e[5]||(e[5]=()=>o(O).go(-1)),variant:"outlined"},{default:a(()=>[n("Cancel")]),_:1}),l(v,{color:"primary",onClick:o(oe)},{default:a(()=>[n("Save")]),_:1},8,["onClick"])])]),_:1})]),_:1})]),_:1},8,["onSubmit"]),De,l(H,{class:"mt-2 border-2 border-black dark:border-white"}),l(v,{onClick:e[6]||(e[6]=s=>P.value=!0),class:"mt-2"},{default:a(()=>[n(" Change password ")]),_:1}),Ae,l(H,{class:"mt-2 border-2 border-black dark:border-white"}),l(v,{class:"mt-2",color:"error",onClick:e[7]||(e[7]=s=>$.value=!0)},{default:a(()=>[n(" Delete account ")]),_:1})]),l(B,{modelValue:P.value,"onUpdate:modelValue":e[18]||(e[18]=s=>P.value=s),class:"md:max-w-[40vw] w-full"},{default:a(()=>[l(I,null,{default:a(()=>[l(R,null,{default:a(()=>[n(" Change password ")]),_:1}),l(E,{class:"space-y-4 flex flex-col"},{default:a(()=>[u("div",null,[Se,l(y,{rules:j,modelValue:F.value,"onUpdate:modelValue":e[10]||(e[10]=s=>F.value=s),type:x.value?"text":"password"},{"append-inner":a(()=>[x.value?(f(),g(o(b),{key:0,onClick:e[8]||(e[8]=()=>x.value=!x.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(f(),g(o(b),{key:1,onClick:e[9]||(e[9]=()=>x.value=!x.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["modelValue","type"])]),u("div",null,[ze,l(y,{rules:j,modelValue:h.value,"onUpdate:modelValue":e[13]||(e[13]=s=>h.value=s),type:V.value?"text":"password"},{"append-inner":a(()=>[V.value?(f(),g(o(b),{key:0,onClick:e[11]||(e[11]=()=>V.value=!V.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(f(),g(o(b),{key:1,onClick:e[12]||(e[12]=()=>V.value=!V.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["modelValue","type"])]),u("div",null,[Fe,l(y,{rules:j,modelValue:z.value,"onUpdate:modelValue":e[16]||(e[16]=s=>z.value=s),type:k.value?"text":"password"},{"append-inner":a(()=>[k.value?(f(),g(o(b),{key:0,onClick:e[14]||(e[14]=()=>k.value=!k.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(f(),g(o(b),{key:1,onClick:e[15]||(e[15]=()=>k.value=!k.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["modelValue","type"])]),u("div",Me,[l(v,{variant:"outlined",color:"primary",onClick:e[17]||(e[17]=s=>P.value=!1)},{default:a(()=>[n(" Cancel ")]),_:1}),l(v,{color:"primary",onClick:ee,disabled:!W.value||!X.value},{default:a(()=>[n(" Change ")]),_:1},8,["disabled"])])]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(B,{modelValue:U.value,"onUpdate:modelValue":e[21]||(e[21]=s=>U.value=s),class:"md:max-w-[50vw] w-full"},{default:a(()=>[l(we,{"is-loading":c.value,title:"Delete Profile Picture",actionBtnText:"Delete",text:"Your profile picture will be deleted",onCancel:e[19]||(e[19]=s=>U.value=!1),onDelete:e[20]||(e[20]=()=>{w.value=null,o(te)()})},null,8,["is-loading"])]),_:1},8,["modelValue"]),l(B,{modelValue:C.value,"onUpdate:modelValue":e[24]||(e[24]=s=>C.value=s),class:"md:max-w-[50vw] w-full"},{default:a(()=>[l(I,null,{default:a(()=>[l(R,null,{default:a(()=>[n(" Change your profile picture ")]),_:1}),l(E,null,{default:a(()=>[l(de,{modelValue:w.value,"onUpdate:modelValue":e[22]||(e[22]=s=>w.value=s),accept:"image/*",label:"Profile Picture",variant:"solo-filled"},null,8,["modelValue"])]),_:1}),l(J,{class:"self-end"},{default:a(()=>[l(v,{variant:"outlined",color:"primary",onClick:e[23]||(e[23]=s=>C.value=!1)},{default:a(()=>[n(" Cancel ")]),_:1}),l(v,{onClick:o(se),disabled:c.value,loading:c.value,variant:"flat",color:"primary"},{default:a(()=>[n(" Update ")]),_:1},8,["onClick","disabled","loading"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(B,{modelValue:$.value,"onUpdate:modelValue":e[27]||(e[27]=s=>$.value=s),class:"md:max-w-[50vw] w-full"},{default:a(()=>[l(I,null,{default:a(()=>[l(R,null,{default:a(()=>[n(" Delete your account? ")]),_:1}),l(E,null,{default:a(()=>[n(" Are you sure you want to delete you account? "),l(y,{modelValue:M.value,"onUpdate:modelValue":e[25]||(e[25]=s=>M.value=s),label:"password"},null,8,["modelValue"])]),_:1}),l(J,{class:"self-end"},{default:a(()=>[l(v,{variant:"outlined",color:"primary",onClick:e[26]||(e[26]=s=>$.value=!1)},{default:a(()=>[n(" Cancel ")]),_:1}),l(v,{onClick:ae,disabled:c.value||M.value.length<1,loading:c.value,variant:"flat",color:"error"},{default:a(()=>[n(" Delete ")]),_:1},8,["disabled","loading"])]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}}};export{Ie as default};
