import{P as h,S as p,r as a,x as v,c as n,o as r,d as i,i as y,f as e,g as o,w as c,F as g,l as x,e as k,I as w,k as V}from"./index-bb5a7992.js";const E={key:0,class:"w-full flex h-[100vh] flex-col justify-center items-center"},N=e("h1",{class:"text-primary"}," Verifying email ",-1),b=e("p",null," You are being redirected to home page... ",-1),B=[N,b],C={class:"w-full flex h-[100vh] flex-col justify-center items-center gap-5"},I=e("h1",{class:"text-error"}," Email verification failed ",-1),T=e("p",null," This can heppen if the verification token is timed out. Try re-sending the verification email from settings. ",-1),S={__name:"VerifyEmail",setup(j){const l=h(),u=p(),t=a(!1),f=a(l.query.token),_=async()=>{t.value=!0;try{await x.post("/auth/verify-email",{},{params:{token:f.value}}),u.push("/")}catch(s){console.log(s)}finally{t.value=!1}};return v(async()=>{await _()}),(s,F)=>{const m=n("v-btn"),d=n("router-link");return r(),i(g,null,[t.value?(r(),i("div",E,B)):y("",!0),e("div",C,[I,T,o(d,{to:"/settings"},{default:c(()=>[o(m,{flat:"",color:"primary"},{default:c(()=>[o(k(w),{icon:"ph:gear"}),V(" Settings ")]),_:1})]),_:1})])],64)}}};export{S as default};
