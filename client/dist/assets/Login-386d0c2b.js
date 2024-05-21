import{P as A,u as B,S as F,r as d,l as K,c,o as m,d as L,g as r,w as n,f as t,U as y,e as o,h,I as x,k as v}from"./index-ece10bf1.js";import{u as Z,a as k}from"./vee-validate.esm-162a5404.js";const M=t("h1",{class:"text-7xl mb-10 text-primary"},"Login",-1),N=t("div",null,[t("p",null,"Email")],-1),D={class:"w-full flex justify-between"},E=t("p",null,"Password",-1),R=t("p",{class:"cursor-pointer"},"forgot your passowrd?",-1),T={class:"underline cursor-pointer"},H={__name:"Login",setup(j){const b=A(),V=B(),C=F(),P=[e=>!!e||"Required.",e=>e&&e.length>=8||"Min 8 characters",e=>/\d/.test(e)&&/[a-zA-Z]/.test(e)||"Password must contain at least one letter and one number"],{handleSubmit:I,isSubmitting:q}=Z({validationSchema:{password(e){return(e==null?void 0:e.length)>=2?!0:"Please enter a valid password"},email(e){return/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(e)?!0:"Please enter a valid email"}}}),l=k("email"),u=k("password"),f=d(),a=d(!1),S=d(),i=d(!1),_=I(async()=>{i.value=!0,K.post("/auth/login",{email:l.value.value,password:u.value.value}).then(e=>{S.value=e.session,V.getUser(),b.push("/")}).catch(e=>{C.error("Incorrect email address and/or password.")}).finally(()=>{i.value=!1})});return(e,s)=>{const w=c("v-text-field"),g=c("router-link"),U=c("v-btn"),z=c("v-form");return m(),L("div",null,[M,r(z,{class:"my-auto flex flex-col"},{default:n(()=>[N,r(w,{autofocus:"",onKeydown:s[0]||(s[0]=y(()=>f.value.focus(),["enter"])),modelValue:o(l).value.value,"onUpdate:modelValue":s[1]||(s[1]=p=>o(l).value.value=p),"error-messages":o(l).errorMessage.value},null,8,["modelValue","error-messages"]),t("div",D,[E,r(g,{to:"/forgot-password"},{default:n(()=>[R]),_:1})]),r(w,{rules:P,onKeydown:y(o(_),["enter"]),ref_key:"passwordField",ref:f,"error-messages":o(u).errorMessage.value,modelValue:o(u).value.value,"onUpdate:modelValue":s[4]||(s[4]=p=>o(u).value.value=p),type:a.value?"text":"password"},{"append-inner":n(()=>[a.value?(m(),h(o(x),{key:0,onClick:s[2]||(s[2]=()=>a.value=!a.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(m(),h(o(x),{key:1,onClick:s[3]||(s[3]=()=>a.value=!a.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["onKeydown","error-messages","modelValue","type"]),t("div",null,[t("p",null,[v(" Don't have an account? "),t("span",T,[r(g,{to:"/register"},{default:n(()=>[v(" Create one ")]),_:1})])])]),r(U,{class:"self-end",onClick:s[5]||(s[5]=()=>o(_)()),variant:"tonal",color:"primary",loading:i.value,disabled:i.value},{default:n(()=>[v(" Login ")]),_:1},8,["loading","disabled"])]),_:1})])}}};export{H as default};