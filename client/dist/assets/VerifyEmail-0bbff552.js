import{I as c,J as i,k as o,m as u,o as f,c as p,f as t,t as m,H as _}from"./index-912b191a.js";const y={class:"w-full flex h-[100vh] flex-col justify-center items-center"},h=t("h1",{class:"text-primary"}," Verifying email ",-1),d=t("p",null," You are being redirected to home page... ",-1),x={__name:"VerifyEmail",setup(v){const n=c(),r=i(),s=o(!1),a=o(n.query.token),l=async()=>{s.value=!0;try{const e=await _.post("/auth/verify-email",null,{params:{token:a.value}});r.push("/")}catch(e){console.log(e)}finally{s.value=!1}};return u(async()=>{await l()}),(e,g)=>(f(),p("div",y,[h,d,t("p",null,m(a.value),1)]))}};export{x as default};
