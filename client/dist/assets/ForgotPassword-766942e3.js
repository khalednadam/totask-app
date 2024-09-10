import{Q as g,T as h,l as w,n as b,c as n,o as k,d as y,f as o,g as s,w as r,W as C,e,I as S,k as V}from"./index-b477b231.js";import{u as E,a as z}from"./vee-validate.esm-d7f37fde.js";const F={class:"flex flex-col gap-5"},P=o("div",null,[o("h1",{class:"text-7xl mb-10 text-primary"},"Forgot Password")],-1),A=o("div",null,[o("p",null,"Email")],-1),T={__name:"ForgotPassword",setup(B){const m=g(),d=h(),{handleSubmit:v,isSubmitting:l}=E({validationSchema:{email(t){return/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(t)?!0:"Please enter a valid email"}}}),a=z("email"),_=()=>m.go(-1),i=v(async()=>{l.value=!0,w.post("/auth/forgot-password",{email:a.value.value},{withCredentials:!0}).then(t=>{d.success("Email was sent"),a.value.value=""}).catch(t=>{b(t)}).finally(()=>{l.value=!1})});return(t,c)=>{const u=n("v-btn"),f=n("v-text-field"),p=n("v-form");return k(),y("div",null,[o("div",F,[s(u,{onClick:_,icon:"",variant:"tonal",size:"small",color:"primary",class:""},{default:r(()=>[s(e(S),{icon:"ph:caret-left",class:"text-primary",width:"25"})]),_:1}),P]),s(p,{class:"my-auto flex flex-col",onSubmit:C(e(i),["prevent"])},{default:r(()=>[A,s(f,{autofocus:"",modelValue:e(a).value.value,"onUpdate:modelValue":c[0]||(c[0]=x=>e(a).value.value=x),"error-messages":e(a).errorMessage.value},null,8,["modelValue","error-messages"]),s(u,{class:"self-end",onClick:e(i),variant:"tonal",loading:e(l),color:"primary"},{default:r(()=>[V(" Submit ")]),_:1},8,["onClick","loading"])]),_:1},8,["onSubmit"])])}}};export{T as default};
