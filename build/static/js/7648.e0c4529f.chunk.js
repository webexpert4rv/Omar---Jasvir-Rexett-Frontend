"use strict";(self.webpackChunkrexett=self.webpackChunkrexett||[]).push([[7648],{98394:(e,s,i)=>{i.d(s,{A:()=>l});i(65043);const t=i.p+"static/media/warning-icon.0644361391cc2004555a.gif";var n=i(70579);const l=e=>{let{data:s}=e;return(0,n.jsx)("div",{className:"no-data-container",children:(0,n.jsxs)("div",{className:"no-data",children:[(0,n.jsx)("img",{src:t}),s||"No Data Found"]})})}},39319:(e,s,i)=>{i.d(s,{A:()=>a});i(65043);var t=i(83003),n=(i(33859),i(83666),i(37194),i(27491)),l=i(70579);const a=e=>{let{number:s,setPage:i,page:a}=e;(0,t.wA)();const o=e=>{i(e)};return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(n.A,{className:"pagination flex-wrap",children:[(0,l.jsx)(n.A.Prev,{className:"pagination-arrow custom-pagination-item me-1",onClick:()=>o(a-1),disabled:1===a}),(0,l.jsx)("div",{className:"pages-link flex-wrap",children:(()=>{const e=[];if(s<=6)for(let i=1;i<=s;i++)e.push((0,l.jsx)(n.A.Item,{className:"custom-pagination-item",active:i===a,onClick:()=>o(i),children:i},i));else{e.push((0,l.jsx)(n.A.Item,{className:"custom-pagination-item",active:1===a,onClick:()=>o(1),children:1},1)),a>4&&e.push((0,l.jsx)(n.A.Ellipsis,{disabled:!0},"start-dots"));for(let i=Math.max(2,a-1);i<=Math.min(a+1,s-1);i++)e.push((0,l.jsx)(n.A.Item,{className:"custom-pagination-item",active:i===a,onClick:()=>o(i),children:i},i));a<s-3&&e.push((0,l.jsx)(n.A.Ellipsis,{disabled:!0},"end-dots")),e.push((0,l.jsx)(n.A.Item,{className:"custom-pagination-item",active:s===a,onClick:()=>o(s),children:s},s))}return e})()}),(0,l.jsx)(n.A.Next,{className:"pagination-arrow next-arrow ms-1 custom-pagination-item",onClick:()=>o(a+1),disabled:a===s})]})})}},31202:(e,s,i)=>{i.r(s),i.d(s,{default:()=>b});var t=i(65043),n=i(79422),l=i(5328),a=(i(29212),i(9176),i(83003)),o=i(37194),d=i(4970),r=i(61072),c=i(78602),u=i(35475),v=i(23156),j=i(98394),m=i(82476),p=i(74117),x=i(70579);const h=e=>{let{jobListing:s,jobCategoryList:i,screenLoader:t}=e;const{t:n}=(0,p.Bd)(),l=e=>{let s=i.find((s=>s.id==e));return null===s||void 0===s?void 0:s.title},a=e=>{switch(console.log(e,"status"),e){case"ended":return"status-rejected";case"Initiated":return"status-progress";case"completed":case"published":return"status-finished";case"unpublished":return"status-unpublished";default:return}},o=e=>{if(null!==e&&void 0!==e&&e.length){const s=null===e||void 0===e?void 0:e.find((e=>"How many years of experience do you currently have?"==(null===e||void 0===e?void 0:e.question)));if(s)return null===s||void 0===s?void 0:s.ideal_answer}};return(0,x.jsx)("div",{className:"job-posted-wrapper",children:t?(0,x.jsx)(m.A,{}):(null===s||void 0===s?void 0:s.length)>0?s.map(((e,s)=>{var i,t,d,j;return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)("div",{className:"job-posted-list",children:[(0,x.jsx)("div",{children:(0,x.jsxs)("div",{children:[(0,x.jsx)("h2",{className:"job-title",children:null===e||void 0===e?void 0:e.title}),(0,x.jsx)("h4",{className:"job-category",children:l(e.category)}),(0,x.jsxs)("div",{className:"profile-req",children:[(0,x.jsxs)("p",{className:o(null===e||void 0===e?void 0:e.screening_questions)?"grid-text":"",children:[(null===e||void 0===e?void 0:e.screening_questions)&&o(null===e||void 0===e?void 0:e.screening_questions),o(null===e||void 0===e?void 0:e.screening_questions)&&" years"]}),(0,x.jsx)("p",{className:"grid-text",children:null===e||void 0===e||null===(i=e.contract_type)||void 0===i?void 0:i.split("-").join(" ").replace(/^(.)|\s+(.)/g,(e=>e.toUpperCase()))}),(0,x.jsx)("p",{className:"grid-text",children:null===e||void 0===e?void 0:e.job_type})]}),(0,x.jsx)("p",{className:"job-description",dangerouslySetInnerHTML:{__html:null===e||void 0===e?void 0:e.description}}),(0,x.jsx)(r.A,{children:(0,x.jsx)(c.A,{md:"12",children:(0,x.jsxs)("div",{className:"info-grid",children:[(0,x.jsx)("h4",{className:"grid-heading",children:n("skillsRequired")}),(null===e||void 0===e||null===(t=e.skills)||void 0===t?void 0:t.length)>0?(0,x.jsx)("ul",{className:"need-skill-list",children:null===(j=null===e||void 0===e?void 0:e.skills,d=null===j||void 0===j?void 0:j.split(","))||void 0===d?void 0:d.map((e=>(0,x.jsx)(x.Fragment,{children:(0,x.jsx)("li",{children:e})})))}):"Not Mentioned"]})})})]})}),(0,x.jsxs)("div",{className:"status-wrapper",children:[(0,x.jsx)("div",{children:(0,x.jsx)("p",{className:"".concat(a(null===e||void 0===e?void 0:e.status)),children:(null===e||void 0===e?void 0:e.status.charAt(0).toUpperCase())+(null===e||void 0===e?void 0:e.status.slice(1))})}),(0,x.jsxs)("p",{className:"font-15",children:["Posted Date: ",(0,x.jsx)("strong",{children:e.created_at.slice(0,10)})]}),(0,x.jsx)(u.N_,{to:"/admin/admin-single-job/".concat(null===e||void 0===e?void 0:e.id),className:"px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none",children:(0,x.jsx)(v.Ny1,{})})]})]})})})):(0,x.jsx)("div",{className:"simple-no-data",children:(0,x.jsx)(j.A,{})})})};var g=i(39319);const b=()=>{var e;const[s,i]=(0,t.useState)(1),{t:r}=(0,p.Bd)(),c=(0,a.wA)(),{jobListing:u,screenLoader:v}=(0,a.d4)((e=>e.adminData)),{jobCategoryList:j}=(0,a.d4)((e=>e.clientData));(0,t.useEffect)((()=>{c((0,d.wO)())}),[]),(0,t.useEffect)((()=>{c((0,o.jd)({page:s}))}),[s]);return console.log(u,"jobListing"),(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("section",{className:"job-posted-section",children:(0,x.jsxs)(n.A,{defaultActiveKey:"all",id:"justify-tab-example",className:"mb-3 notification-tabs job-listing-tabs gap-md-0 gap-3",onSelect:e=>{let s={type:e,page:1};c((0,o.jd)(s))},children:[(0,x.jsx)(l.A,{eventKey:"all",title:r("all"),children:(0,x.jsx)(h,{jobListing:null===u||void 0===u?void 0:u.data,jobCategoryList:j,screenLoader:v})}),(0,x.jsx)(l.A,{eventKey:"new",title:r("newJobPosts"),children:(0,x.jsx)(h,{jobListing:null===u||void 0===u?void 0:u.data,jobCategoryList:j})}),(0,x.jsx)(l.A,{eventKey:"in-progress",title:r("inProgress"),children:(0,x.jsx)(h,{jobListing:null===u||void 0===u?void 0:u.data,jobCategoryList:j})}),(0,x.jsx)(l.A,{eventKey:"ended",title:r("endJobs"),children:(0,x.jsx)(h,{jobListing:null===u||void 0===u?void 0:u.data,jobCategoryList:j})})]})}),!v&&(null===u||void 0===u?void 0:u.totalCount)>5?(0,x.jsxs)("div",{className:"d-flex flex-wrap justify-content-between align-items-center mb-4",children:[(0,x.jsxs)("p",{className:"showing-result",children:[r("showing")," ",null===u||void 0===u||null===(e=u.data)||void 0===e?void 0:e.length," ",r("results")]}),(0,x.jsx)(g.A,{number:null===u||void 0===u?void 0:u.totalPages,setPage:i,page:s})]}):""]})}},79422:(e,s,i)=>{i.d(s,{A:()=>x});i(65043);var t=i(97121),n=i(23612),l=i(92843),a=i(64541),o=i(54522),d=i(20706),r=i(86429),c=i(62663),u=i(63599),v=i(70579);function j(e){let s;return(0,c.jJ)(e,(e=>{null==s&&(s=e.props.eventKey)})),s}function m(e){const{title:s,eventKey:i,disabled:t,tabClassName:n,tabAttrs:l,id:d}=e.props;return null==s?null:(0,v.jsx)(o.A,{as:"li",role:"presentation",children:(0,v.jsx)(a.A,{as:"button",type:"button",eventKey:i,disabled:t,id:d,className:n,...l,children:s})})}const p=e=>{const{id:s,onSelect:i,transition:a,mountOnEnter:o=!1,unmountOnExit:p=!1,variant:x="tabs",children:h,activeKey:g=j(h),...b}=(0,t.Zw)(e,{activeKey:"onSelect"});return(0,v.jsxs)(n.A,{id:s,activeKey:g,onSelect:i,transition:(0,u.A)(a),mountOnEnter:o,unmountOnExit:p,children:[(0,v.jsx)(l.A,{id:s,...b,role:"tablist",as:"ul",variant:x,children:(0,c.Tj)(h,m)}),(0,v.jsx)(d.A,{children:(0,c.Tj)(h,(e=>{const s={...e.props};return delete s.title,delete s.disabled,delete s.tabClassName,delete s.tabAttrs,(0,v.jsx)(r.A,{...s})}))})]})};p.displayName="Tabs";const x=p},29212:(e,s,i)=>{e.exports=i.p+"static/media/amazon.1b5b780a2155c1ab6c26.png"},9176:(e,s,i)=>{e.exports=i.p+"static/media/facebook.790642551cd99bb66a7e.png"}}]);
//# sourceMappingURL=7648.e0c4529f.chunk.js.map