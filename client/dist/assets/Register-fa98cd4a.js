import{S as I,u as N,r as h,l as P,n as A,c as _,o as c,d as E,f as l,g as r,w as i,e as a,I as p,h as y,k}from"./index-bb5a7992.js";import{u as j,a as v}from"./vee-validate.esm-6308885f.js";const F={class:"flex flex-col gap-5"},L=l("div",null,[l("h1",{class:"text-7xl mb-10 text-primary"},"Register")],-1),$=l("div",null,[l("p",null,"Name")],-1),q=l("div",null,[l("p",null,"Username")],-1),D=l("div",null,[l("p",null,"Email")],-1),O=l("div",{class:"w-full flex justify-between"},[l("p",null,"Password")],-1),T=l("div",{class:"w-full flex justify-between"},[l("p",null,"Confirm password")],-1),G={class:"underline cursor-pointer"},X={__name:"Register",setup(H){const V=I(),z=N(),b=[e=>!!e||"Required.",e=>e&&e.length>=8||"Min 8 characters",e=>/\d/.test(e)&&/[a-zA-Z]/.test(e)||"Password must contain at least one letter and one number"],{handleSubmit:U,handleReset:J,isSubmitting:K}=j({validationSchema:{name(e){return(e==null?void 0:e.length)>=2?!0:"Please enter your full name"},username(e){return(e==null?void 0:e.length)>=2&&/^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{0,28}[a-zA-Z0-9]$/i.test(e)?!0:"Please enter a valid username"},password(e){return(e==null?void 0:e.length)>=2?!0:"Please enter a valid password"},confirmPassword(e){return e===t.value.value||(e==null?void 0:e.length)<2?!0:"Passwords doesn't match"},email(e){return/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(e)?!0:"Please enter a valid email"}}}),Z=h(),d=v("email"),f=v("name"),g=v("username"),t=v("password"),x=v("confirmPassword"),n=h(!1),u=h(!1),w=h(!1),M=()=>V.go(-1),R=U(async()=>{if(t!==t)return"password not match";w.value=!0,P.post("/auth/register",{name:f.value.value,username:g.value.value,email:d.value.value,password:t.value.value},{headers:{"Access-Control-Allow-Origin":"https://totask-server.onrender.com"}}).then(e=>{P.post("/auth/login",{email:d.value.value,password:t.value.value},{withCredentials:!0}).then(s=>{Z.value=s.session,z.getUser(),V.push("/")}).catch(s=>{A(s)})}).catch(e=>{A(e)}).finally(()=>{w.value=!1})});return(e,s)=>{const C=_("v-btn"),m=_("v-text-field"),S=_("router-link"),B=_("v-form");return c(),E("div",null,[l("div",F,[r(C,{onClick:M,icon:"",variant:"tonal",size:"small",color:"primary",class:""},{default:i(()=>[r(a(p),{icon:"ph:caret-left",class:"text-primary",width:"25"})]),_:1}),L]),r(B,{class:"my-auto flex flex-col"},{default:i(()=>[$,r(m,{autofocus:"",modelValue:a(f).value.value,"onUpdate:modelValue":s[0]||(s[0]=o=>a(f).value.value=o),"error-messages":a(f).errorMessage.value},null,8,["modelValue","error-messages"]),q,r(m,{modelValue:a(g).value.value,"onUpdate:modelValue":s[1]||(s[1]=o=>a(g).value.value=o),"error-messages":a(g).errorMessage.value,prefix:"@"},null,8,["modelValue","error-messages"]),D,r(m,{modelValue:a(d).value.value,"onUpdate:modelValue":s[2]||(s[2]=o=>a(d).value.value=o),"error-messages":a(d).errorMessage.value},null,8,["modelValue","error-messages"]),O,r(m,{rules:b,modelValue:a(t).value.value,"onUpdate:modelValue":s[5]||(s[5]=o=>a(t).value.value=o),"error-messages":a(t).errorMessage.value,type:n.value?"text":"password"},{"append-inner":i(()=>[n.value?(c(),y(a(p),{key:0,onClick:s[3]||(s[3]=()=>n.value=!n.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(c(),y(a(p),{key:1,onClick:s[4]||(s[4]=()=>n.value=!n.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["modelValue","error-messages","type"]),T,r(m,{rules:b,modelValue:a(x).value.value,"onUpdate:modelValue":s[8]||(s[8]=o=>a(x).value.value=o),"error-messages":a(x).errorMessage.value,type:u.value?"text":"password"},{"append-inner":i(()=>[u.value?(c(),y(a(p),{key:0,onClick:s[6]||(s[6]=()=>u.value=!u.value),icon:"ph:eye-closed-bold",width:"30",class:"cursor-pointer"})):(c(),y(a(p),{key:1,onClick:s[7]||(s[7]=()=>u.value=!u.value),icon:"ph:eye-bold",width:"30",class:"cursor-pointer"}))]),_:1},8,["modelValue","error-messages","type"]),l("div",null,[l("p",null,[k(" Already have an account? "),l("span",G,[r(S,{to:"/login"},{default:i(()=>[k(" Login ")]),_:1})])])]),r(C,{class:"self-end",onClick:a(R),variant:"tonal",color:"primary",loading:w.value,disabled:w.value},{default:i(()=>[k(" Register ")]),_:1},8,["onClick","loading","disabled"])]),_:1})])}}};export{X as default};
