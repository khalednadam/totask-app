import{M as p,I as x,r as o,o as g,c as h,d as l,w as m,T as b,b as a,f as n,e as w}from"./index-1c727cdd.js";import{u as S,a as V}from"./vee-validate.esm-94619242.js";const y=n("h1",{class:"text-7xl mb-10 text-primary"},"Forgot Passowrd",-1),C=n("div",null,[n("p",null,"Email")],-1),P={__name:"ForgotPassword",setup(k){const r=p(),{handleSubmit:c,isSubmitting:t}=S({validationSchema:{email(e){return/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(e)?!0:"Please enter a valid email"}}}),s=V("email"),i=c(async()=>{t.value=!0,x.post("/auth/forgot-password",{email:s.value.value},{withCredentials:!0}).then(e=>{r.success("Email was sent"),s.value.value=""}).catch(e=>{console.log(e),r.error(e.message)}).finally(()=>{t.value=!1})});return(e,u)=>{const d=o("v-text-field"),v=o("v-btn"),_=o("v-form");return g(),h("div",null,[y,l(_,{class:"my-auto flex flex-col",onSubmit:b(a(i),["prevent"])},{default:m(()=>[C,l(d,{autofocus:"",modelValue:a(s).value.value,"onUpdate:modelValue":u[0]||(u[0]=f=>a(s).value.value=f),"error-messages":a(s).errorMessage.value},null,8,["modelValue","error-messages"]),l(v,{class:"self-end",onClick:a(i),variant:"tonal",loading:a(t),color:"primary"},{default:m(()=>[w(" Submit ")]),_:1},8,["onClick","loading"])]),_:1},8,["onSubmit"])])}}};export{P as default};