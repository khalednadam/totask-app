import{ag as x,c as o,o as f,d as p,g as t,w as e,k as a,e as k,h as C,f as s,i as j,r as g,F as z,j as V,t as w}from"./index-bb5a7992.js";const A=s("div",{class:"flex gap-1 items-center my-5"},[s("h1",{class:"text-primary"}," Join totask for "),s("h1",{class:"font-black w-max bg-secondary px-3 transform rotate-6"},"free")],-1),$=s("p",{class:"my-2 mb-5"}," Discover the simplicity of efficient task management with totask. Organize your projects effortlessly and boost collaboration with our intuitive platform. Join for free today and experience a new level of productivity. ",-1),D={class:"px-5 bg-primary/60 rounded-lg absolute mt-20 ml-40"},F={__name:"Join",setup(y){const{mdAndUp:l}=x();return(_,u)=>{const c=o("v-btn"),n=o("v-card-text"),i=o("v-col"),r=o("v-img"),d=o("v-row"),m=o("v-card");return f(),p("div",null,[t(d,{class:"min-h-[400px]"},{default:e(()=>[t(i,{cols:"12",class:"min-h-full"},{default:e(()=>[t(m,{color:"primaryTransparent",variant:"flat",class:"overflow-hidden h-full"},{default:e(()=>[t(d,{class:"h-full"},{default:e(()=>[t(i,{cols:"12",md:"6",class:"flex flex-col justify-center min-h-full"},{default:e(()=>[t(n,{class:"my-2 flex flex-col justify-center"},{default:e(()=>[A,$,t(c,{to:"/register",color:"primary",variant:"flat",size:"x-large",class:"w-max"},{default:e(()=>[a(" Join ")]),_:1})]),_:1})]),_:1}),k(l)?(f(),C(i,{key:0,cols:"12",md:"6",class:"relative"},{default:e(()=>[s("div",D,[t(r,{src:"/in-app.webp",height:"370",width:"532"})])]),_:1})):j("",!0)]),_:1})]),_:1})]),_:1})]),_:1})])}}},S={class:"h-full flex flex-col justify-center"},T={class:"md:w-2/3"},B={class:"w-full flex items-end justify-end"},J={__name:"FeatureTabs",setup(y){const l=g(0),_=[{title:"Labels",description:"Create labels with colors and titles and add it to cards to visually categorize cards",img:"/labels.svg"},{title:"Checklists",description:"Create checklists to divide tasks into smaller parts and follow the progress of each task.",img:"/checklists.svg"},{title:"Comments",description:"Add comments to discuss a certin card and ask questions about it.",img:"/comments.svg"},{title:"Assingees",description:"Add assignees to cards to organize tasks and split the tasks between the team",img:"/assignees.svg"},{title:"Due dates",description:"Add dates to cards to organize your tasks and catch them before the deadline.",img:"/due-dates.svg"}];return(u,c)=>{const n=o("v-tab"),i=o("v-tabs"),r=o("v-col"),d=o("v-img"),m=o("v-row"),h=o("v-tabs-window-item"),b=o("v-tabs-window");return f(),p("div",null,[t(i,{modelValue:l.value,"onUpdate:modelValue":c[0]||(c[0]=v=>l.value=v),"align-tabs":"center",color:"primary"},{default:e(()=>[t(n,{value:0},{default:e(()=>[a("Labels")]),_:1}),t(n,{value:1},{default:e(()=>[a("Checklists")]),_:1}),t(n,{value:2},{default:e(()=>[a("Comments")]),_:1}),t(n,{value:3},{default:e(()=>[a("Assingees")]),_:1}),t(n,{value:4},{default:e(()=>[a("Due Dates")]),_:1})]),_:1},8,["modelValue"]),t(b,{modelValue:l.value,"onUpdate:modelValue":c[1]||(c[1]=v=>l.value=v)},{default:e(()=>[(f(),p(z,null,V(_,v=>t(h,null,{default:e(()=>[t(m,{class:"mt-10"},{default:e(()=>[t(r,{cols:"12",md:"6"},{default:e(()=>[s("div",S,[s("h1",null,w(_[l.value].title),1),s("p",T,w(_[l.value].description),1)])]),_:1}),t(r,{cols:"12",md:"6"},{default:e(()=>[s("div",B,[t(d,{height:"250",width:"205",src:_[l.value].img},null,8,["src"])])]),_:1})]),_:1})]),_:1})),64))]),_:1},8,["modelValue"])])}}},N={class:"flex justify-center items-center"},E={class:"w-full h-[60vh] my-20 flex md:flex-row justify-center items-center"},L={class:"w-full flex items-center gap-5 justify-center flex-col z-50"},U=s("h1",{class:"text-5xl md:max-w-[90%] font-light text-center"},[a(" Streamline your "),s("span",{class:"text-primary font-semibold"}," workflow "),a(" and collaborate "),s("span",{class:"text-primary font-semibold"}," seamlessly "),a(" with your team. ")],-1),q=s("p",{class:"text-center text-2xl"},"Keep everthing under one roof.",-1),G={class:"mt-3"},K={class:"relative group"},O=s("div",{class:"bg-gradient-to-r from-darkPrimary via-primary to-[#FFEA00] blur-md absolute -inset-0.5 rounded-lg group-hover:blur-sm group-hover:inset-0 transition-all duration-1000 animate-tilt"},null,-1),P=s("p",{class:"text-black"},"Get started",-1),H={class:"my-20"},I=s("h1",null,"Streamline Task Chaos.",-1),M=s("h1",null,"Attach Files, Clear Tasks.",-1),Q={class:"my-20"},W={__name:"index",setup(y){return x(),g(null),g(!1),(l,_)=>{const u=o("v-img"),c=o("v-btn"),n=o("router-link"),i=o("v-card-title"),r=o("v-card-text"),d=o("v-card"),m=o("v-col"),h=o("v-row");return f(),p("div",null,[s("div",N,[t(u,{src:"/logo-glass.svg",class:"!absolute z-0 opacity-15 left-0 right-0 justify-self-center -mt-20",height:"600",width:"1900"}),s("div",E,[s("div",L,[U,q,s("div",G,[t(n,{to:"/register"},{default:e(()=>[s("div",K,[O,t(c,{color:"white",variant:"text",class:"bg-white black",flat:"",size:"x-large"},{default:e(()=>[P]),_:1})])]),_:1})])])])]),s("div",H,[t(h,null,{default:e(()=>[t(m,{cols:"12",md:"6"},{default:e(()=>[t(d,{color:"primary",variant:"flat"},{default:e(()=>[t(u,{src:"/tasks.svg",height:"200",class:"m-10"}),t(i,null,{default:e(()=>[I]),_:1}),t(r,{class:"md:w-2/3"},{default:e(()=>[a(" Effortlessly organize and prioritize tasks, avoiding the clutter and confusion with totask. Stay focused, productive, and in control of your workflow. ")]),_:1})]),_:1})]),_:1}),t(m,{cols:"12",md:"6"},{default:e(()=>[t(d,{color:"secondary",variant:"flat"},{default:e(()=>[t(i,null,{default:e(()=>[M]),_:1}),t(r,{class:"md:w-2/3"},{default:e(()=>[a(" Seamlessly attach relevant documents, images, or other files directly to tasks for easy reference and collaboration. ")]),_:1}),t(u,{src:"/attachments.svg",height:"200",class:"m-10"})]),_:1})]),_:1})]),_:1})]),s("div",null,[t(J)]),s("div",Q,[t(F)])])}}};export{W as default};
