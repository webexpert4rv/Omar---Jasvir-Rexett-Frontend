"use strict";(self.webpackChunkrexett=self.webpackChunkrexett||[]).push([[4373],{98394:(e,s,l)=>{l.d(s,{A:()=>n});l(65043);const i=l.p+"static/media/warning-icon.0644361391cc2004555a.gif";var t=l(70579);const n=e=>{let{data:s}=e;return(0,t.jsx)("div",{className:"no-data-container",children:(0,t.jsxs)("div",{className:"no-data",children:[(0,t.jsx)("img",{src:i}),s||"No Data Found"]})})}},39319:(e,s,l)=>{l.d(s,{A:()=>a});l(65043);var i=l(83003),t=(l(33859),l(83666),l(37194),l(27491)),n=l(70579);const a=e=>{let{number:s,setPage:l,page:a}=e;(0,i.wA)();const d=e=>{l(e)};return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)(t.A,{className:"pagination flex-wrap",children:[(0,n.jsx)(t.A.Prev,{className:"pagination-arrow custom-pagination-item me-1",onClick:()=>d(a-1),disabled:1===a}),(0,n.jsx)("div",{className:"pages-link flex-wrap",children:(()=>{const e=[];if(s<=6)for(let l=1;l<=s;l++)e.push((0,n.jsx)(t.A.Item,{className:"custom-pagination-item",active:l===a,onClick:()=>d(l),children:l},l));else{e.push((0,n.jsx)(t.A.Item,{className:"custom-pagination-item",active:1===a,onClick:()=>d(1),children:1},1)),a>4&&e.push((0,n.jsx)(t.A.Ellipsis,{disabled:!0},"start-dots"));for(let l=Math.max(2,a-1);l<=Math.min(a+1,s-1);l++)e.push((0,n.jsx)(t.A.Item,{className:"custom-pagination-item",active:l===a,onClick:()=>d(l),children:l},l));a<s-3&&e.push((0,n.jsx)(t.A.Ellipsis,{disabled:!0},"end-dots")),e.push((0,n.jsx)(t.A.Item,{className:"custom-pagination-item",active:s===a,onClick:()=>d(s),children:s},s))}return e})()}),(0,n.jsx)(t.A.Next,{className:"pagination-arrow next-arrow ms-1 custom-pagination-item",onClick:()=>d(a+1),disabled:a===s})]})})}},20882:(e,s,l)=>{l.d(s,{A:()=>b});l(65043);var i=l(10615),t=l(39062),n=l(14282),a=l(44063),d=l(73216),o=l(35475),r=l(60184),c=l(6720),v=l(98394),u=l(39319),m=l(83003),h=l(2661),x=l(83002),p=l(47196),j=l(82476),g=l(70579);const b=e=>{var s;let{handleJobStatusModal:l,type:b,data:A,jobStatus:N,role:w,setPage:f,page:k}=e;const y=(0,d.Zp)(),{singleJobPagination:S,screenLoader:C}=(0,m.d4)((e=>e.adminData));console.log(C,"screenloader");const I=(0,g.jsx)(i.A,{id:"tooltip",children:"Interviewing"===b?"Hire":"Shortlisted"===b?"Interview":"Shortlist"}),L=(0,g.jsx)(i.A,{id:"tooltip",children:"Reject"});return(0,g.jsx)(g.Fragment,{children:C?(0,g.jsx)(j.A,{}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{className:"developers-list job-card pt-0",children:(null===A||void 0===A?void 0:A.length)>0?(0,g.jsx)(g.Fragment,{children:null===A||void 0===A?void 0:A.map(((e,s)=>{var d,v,u,m,j,A,f,k;return(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)("div",{className:null!==e&&void 0!==e&&e.recommed?"developer-card recomed-dev p-0":"developer-card p-0",children:[(0,g.jsx)("div",{className:"tag-developer",children:b&&"Suggested"===b?"Suggest":b}),(0,g.jsxs)("div",{className:"overflow-hidden inner-dev-card",children:[(0,g.jsx)("div",{className:"user-imgbx",onClick:s=>{var l,i;return i=null===e||void 0===e||null===(l=e.developer)||void 0===l?void 0:l.id,void("client"==w?y("/client/client-single-developer/".concat(i)):"admin"===w&&y("/admin-single-developer/".concat(i)))},children:(0,g.jsx)("img",{src:null!==e&&void 0!==e&&null!==(d=e.developer)&&void 0!==d&&d.profile_picture?null===e||void 0===e||null===(v=e.developer)||void 0===v?void 0:v.profile_picture:a,alt:"developer",className:"user-img"})}),(0,g.jsxs)("div",{className:"text-center",children:[(0,g.jsx)("h3",{className:"user-name",children:null===e||void 0===e||null===(u=e.developer)||void 0===u?void 0:u.name}),(0,g.jsx)("p",{className:"designation-user",children:"Software Developer"}),(0,g.jsx)("p",{className:"email-user",children:null===e||void 0===e||null===(m=e.developer)||void 0===m?void 0:m.email}),(0,g.jsxs)("ul",{className:"social-icons",children:[(0,g.jsx)("li",{children:(0,g.jsx)(o.N_,{to:"#",children:(0,g.jsx)(r.hL4,{})})}),(0,g.jsx)("li",{children:(0,g.jsx)(o.N_,{to:"#",children:(0,g.jsx)(r.QEs,{})})})]}),(0,g.jsxs)("div",{className:"job-card-btns",children:["admin"===w||"Shortlisted"!==b&&"Suggested"!==b&&"Interviewing"!==b||"Hired"===b?"":(0,g.jsx)(t.A,{placement:"bottom",overlay:I,children:(0,g.jsx)(n.A,{variant:"danger",disabled:"Ended"===N,onClick:s=>l(s,null===e||void 0===e?void 0:e.id,b),className:"w-100 main-btn text-black border-white mt-3",children:"Interviewing"===b?(0,g.jsx)(p.rYN,{}):"Shortlisted"===b?(0,g.jsx)(x.mho,{}):(0,g.jsx)(h.ymB,{})})}),"admin"!==w&&(0,g.jsx)(t.A,{placement:"bottom",overlay:L,children:(0,g.jsx)(n.A,{variant:"danger",onClick:s=>l(s,null===e||void 0===e?void 0:e.id,"rejected"),disabled:"Ended"===N,className:"w-100",children:(0,g.jsx)(h.e6Y,{})})}),"admin"===w&&(0,g.jsx)(t.A,{placement:"top",overlay:(k=null===e||void 0===e||null===(j=e.developer)||void 0===j?void 0:j.already_suggested,(0,g.jsx)(i.A,{id:"tooltip",children:k?" Remove from suggestion":"Suggest the developer"})),children:(0,g.jsx)(n.A,{variant:null!==e&&void 0!==e&&null!==(A=e.developer)&&void 0!==A&&A.already_suggested?"dark":"success",onClick:()=>{var s,i;return l(null===e||void 0===e||null===(s=e.developer)||void 0===s?void 0:s.id,null!==e&&void 0!==e&&null!==(i=e.developer)&&void 0!==i&&i.already_suggested?0:1)},className:"w-100 mt-2 main-btn py-2 text-black mt-3 font-15",children:null!==e&&void 0!==e&&null!==(f=e.developer)&&void 0!==f&&f.already_suggested?(0,g.jsx)(c.DkO,{}):(0,g.jsx)(p.rYN,{})})})]})]})]})]})})}))}):(0,g.jsx)("div",{children:(0,g.jsx)(v.A,{data:"No developer found"})})}),"admin"===w&&"Suggested"===b?(0,g.jsxs)("div",{className:"d-flex w-100 align-items-center justify-content-between my-4",children:[(0,g.jsxs)("p",{className:"mb-0",children:["Showing ",null===S||void 0===S||null===(s=S.data)||void 0===s?void 0:s.length," results"]}),(0,g.jsx)(u.A,{number:null===S||void 0===S?void 0:S.total_pages_for_all,setPage:f,page:k})]}):""]})})}},16713:(e,s,l)=>{l.d(s,{A:()=>o});l(65043);var i=l(25284),t=l(73722),n=l(14282),a=l(1071),d=(l(4970),l(70579));const o=e=>{let{text:s,show:l,handleClose:o,onClick:r,handleAction:c,smallLoader:v,type:u,startDate:m,endDate:h}=e;return(0,d.jsxs)(i.A,{show:l,onHide:e=>o(e),centered:!0,animation:!0,className:"custom-modal",children:[(0,d.jsx)(i.A.Header,{closeButton:!0,className:"border-0 pb-3"}),(0,d.jsx)(i.A.Body,{children:(0,d.jsxs)(t.A,{children:[(0,d.jsx)(t.A.Group,{className:"mb-4",children:(0,d.jsx)(t.A.Label,{className:"d-block text-center",children:s})}),(0,d.jsxs)("div",{className:"text-center",children:[(0,d.jsx)(a.A,{type:"submit",text:"Yes",onClick:u?e=>{r(e,{status:u})}:c,className:"main-btn px-4 me-3 font-14 fw-semibold",variant:"transparent",disabled:v,isLoading:v}),(0,d.jsx)(n.A,{variant:"transparent",onClick:o,className:"outline-main-btn font-14 fw-semibold bg-transparent border-black text-black px-4",children:"No"})]})]})})]})}},85603:(e,s,l)=>{l.d(s,{A:()=>r});var i=l(65043),t=l(25284),n=l(73722),a=l(14282),d=l(66480),o=l(70579);const r=e=>{let{show:s,handleClose:l,handleClick:r,smallLoader:c,header:v,feedbacks:u,submit:m}=e;const[h,x]=(0,i.useState)("");return(0,o.jsxs)(t.A,{show:s,onHide:l,centered:!0,className:"custom-modal",animation:!0,children:[(0,o.jsx)(t.A.Header,{closeButton:!0,className:"border-0 pb-3"}),(0,o.jsxs)(t.A.Body,{children:[(0,o.jsxs)("h3",{className:"popup-heading",children:[v," "]}),(0,o.jsxs)(n.A,{children:[(0,o.jsxs)(n.A.Group,{className:"mb-4",children:[(0,o.jsx)(n.A.Label,{children:u}),(0,o.jsx)(n.A.Control,{as:"textarea",rows:"6",placeholder:"Reasons"===u?"Enter your reason, why you want to reject the leave ?":"Enter your feedback, why you want to reject?",onChange:e=>{x(e.target.value)},required:!0})]}),(0,o.jsx)("div",{className:"text-center",children:(0,o.jsx)(a.A,{variant:"transparent",className:"main-btn px-4",onClick:e=>{let s;s="Reasons"===u?h:{status:"ended",end_reason:h},r(e,s)},disabled:0===(null===h||void 0===h?void 0:h.length),children:c?(0,o.jsx)(d.A,{}):m})})]})]})]})}},26079:(e,s,l)=>{l.r(s),l.d(s,{default:()=>_});var i=l(65043),t=l(10615),n=l(79422),a=l(5328),d=l(39062),o=l(14282),r=l(61072),c=l(78602),v=l(73216),u=l(25284),m=l(73722),h=l(66480),x=l(70579);const p=e=>{let{show:s,handleClose:l,onClick:t,smallLoader:n}=e;const[a,d]=(0,i.useState)("");return(0,x.jsxs)(u.A,{show:s,onHide:l,centered:!0,className:"custom-modal",animation:!0,children:[(0,x.jsx)(u.A.Header,{closeButton:!0,className:"border-0 pb-3"}),(0,x.jsxs)(u.A.Body,{children:[(0,x.jsx)("h3",{className:"popup-heading",children:"Reject"}),(0,x.jsxs)(m.A,{children:[(0,x.jsxs)(m.A.Group,{className:"mb-4",children:[(0,x.jsx)(m.A.Label,{className:"font-14",children:"Feedbacks"}),(0,x.jsx)(m.A.Control,{as:"textarea",rows:"6",className:"common-field",placeholder:"Enter your feedback, why you want to reject?",onChange:e=>{d(e.target.value)}})]}),(0,x.jsx)("div",{className:"text-center",children:(0,x.jsxs)(o.A,{variant:"transparent",className:"main-btn px-4 font-14 fw-semibold",onClick:e=>{t(e,{status:"rejected",rejection_reason:a})},children:[n?(0,x.jsx)(h.A,{}):"Submit","  "]})})]})]})]})};var j=l(85603),g=l(16713),b=l(83003),A=l(4970),N=l(20882),w=l(70278),f=l(6720),k=l(31462),y=l(74117),S=l(23156),C=l(49342),I=l(1071),L=l(82476);const _=()=>{var e,s,l,u,m,_,q,E,J,D;const[F,M]=(0,i.useState)([]),[U,H]=(0,i.useState)("application"),[P,B]=(0,i.useState)("application"),[R,K]=(0,i.useState)({isTrue:!1,id:null}),[T,Y]=(0,i.useState)({}),G=(0,b.wA)(),O=(0,v.Zp)(),Z=(0,v.zy)();let z=Z.pathname.split("/")[3];const Q=localStorage.getItem("userId");console.log(Q,"clientid");const{allJobPostedList:V,jobCategoryList:W,jobPostedData:X,approvedLoader:$,smallLoader:ee,screenLoader:se}=(0,b.d4)((e=>e.clientData)),{t:le}=(0,y.Bd)();(0,i.useEffect)((()=>{z&&G((0,A.ir)(z,(()=>{}))),G((0,A.wO)())}),[]),(0,i.useEffect)((()=>{Y(null===X||void 0===X?void 0:X.data)}),[X]);const ie=e=>null===e||void 0===e?void 0:e.split(","),te=(e,s)=>{e.preventDefault(),"ended"==s.status?G((0,A.ri)(null===T||void 0===T?void 0:T.id,s,(()=>{K({}),G((0,A.ir)(z,(()=>{})))}))):"application"==s.status?G((0,A.B3)(null===R||void 0===R?void 0:R.id,(()=>{K({}),O("/client/job-posted")}))):G((0,A.w2)(P,null===R||void 0===R?void 0:R.id,s,(()=>{G((0,A.ir)(z,(()=>{var e;K({});let s={...X},l=null===(e=s[P])||void 0===e?void 0:e.filter((e=>e.id!==(null===R||void 0===R?void 0:R.id)));s[P]=l,M(s[P])})))})))},ne=(e,s,l)=>{void 0==e?K({[l]:!R.isTrue,id:s}):(e.stopPropagation(),K({[l]:!R.isTrue,id:s}))},ae=(0,x.jsx)(t.A,{id:"tooltip",children:le("endJob")}),de=(0,x.jsx)(t.A,{id:"tooltip",children:"Unpublished"==(null===T||void 0===T?void 0:T.status)?"Delete Job":"Unpublish Job to delete"}),oe=(0,x.jsx)(t.A,{id:"tooltip",children:"Unpublished"==(null===T||void 0===T?void 0:T.status)?"Edit Job":"Unpublish Job to edit"}),re=(0,x.jsx)(t.A,{id:"tooltip",children:"Unpublished"==(null===T||void 0===T?void 0:T.status)?"Publish Job":"Unpublish Job"});return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(n.A,{defaultActiveKey:"application",id:"fill-tab-example",className:"mb-3 job-tabs",onSelect:e=>{B(e),M(X[e]),"suggested"==e&&H("shortlisted");"shortlisted"==e&&H("interviewing"),"interviewing"==e&&H("hired"),"application"==e&&H("application")},children:[(0,x.jsx)(a.A,{eventKey:"application",title:le("jobDetails"),children:se?(0,x.jsx)(L.A,{}):(0,x.jsxs)("section",{className:"single-job-section",children:[(0,x.jsxs)("div",{className:"single-job-card job-information-wrapper",children:[(0,x.jsxs)("div",{className:"d-flex justify-content-between align-items-md-center flex-md-row flex-column-reverse",children:[(0,x.jsxs)("div",{className:"d-flex align-items-center gap-3",children:[(0,x.jsx)("h2",{className:"single-job-title text-start mb-0",children:null===T||void 0===T?void 0:T.title}),(0,x.jsx)("p",{className:"mb-0 ".concat((e=>{switch(e){case"ended":case"Unpublished":return"status-rejected";case"Initiated":return"status-progress";case"completed":case"published":return"status-finished";default:return}})(null===T||void 0===T?void 0:T.status)),children:(0,x.jsx)("span",{children:(null===T||void 0===T||null===(e=T.status)||void 0===e||null===(s=e.charAt(0))||void 0===s?void 0:s.toUpperCase())+(null===T||void 0===T||null===(l=T.status)||void 0===l?void 0:l.slice(1))})})]}),(0,x.jsxs)("div",{className:"d-flex gap-3 flex-wrap mb-md-0 mb-4 align-items-center",children:["ended"!==(null===T||void 0===T?void 0:T.status)?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(d.A,{placement:"top",overlay:ae,children:(0,x.jsx)(o.A,{variant:"transparent",onClick:e=>ne(e,null===T||void 0===T?void 0:T.id,"ended"),className:"px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none",children:(0,x.jsx)(f.IAq,{})})}),(0,x.jsx)(d.A,{placement:"top",overlay:re,children:(0,x.jsx)(o.A,{variant:"transparent",className:"px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none",onClick:()=>{let e={status:"published"==(null===T||void 0===T?void 0:T.status)?"Unpublished":"published"};((e,s)=>{G((0,A.ri)(e,s,(()=>{G((0,A.ir)(e,(()=>{})))})))})(null===T||void 0===T?void 0:T.id,e)},children:$?(0,x.jsx)(h.A,{}):"published"==(null===T||void 0===T?void 0:T.status)?(0,x.jsx)(k.mVO,{}):(0,x.jsx)(k.qYP,{})})})]}):"","ended"!==(null===T||void 0===T?void 0:T.status)?(0,x.jsx)(d.A,{placement:"top",overlay:de,children:(0,x.jsx)(o.A,{className:"px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none",variant:"transparent",onClick:()=>((e,s)=>{"Unpublished"==(null===T||void 0===T?void 0:T.status)&&K({[e]:!R.isTrue,id:s})})("application",null===T||void 0===T?void 0:T.id),children:(0,x.jsx)(S.G02,{})})}):"","ended"!==(null===T||void 0===T?void 0:T.status)?(0,x.jsx)(d.A,{placement:"top",overlay:oe,children:(0,x.jsx)(o.A,{className:"px-3 mb-2 arrow-btn info-arrow font-16 text-decoration-none",variant:"transparent",onClick:()=>(null===T||void 0===T||T.id,void("Unpublished"==(null===T||void 0===T?void 0:T.status)&&(localStorage.getItem("activeStep")&&localStorage.setItem("activeStep",1),O("/job-edit-post/".concat(z))))),children:(0,x.jsx)(C.g4E,{})})}):""]})]}),(0,x.jsx)("p",{className:"req-heading mb-1 mt-3",children:"About this job"}),(0,x.jsx)("p",{className:"single-job-description mb-0",dangerouslySetInnerHTML:{__html:null===T||void 0===T?void 0:T.description}})]}),(0,x.jsx)("div",{className:"single-job-card",children:(0,x.jsxs)(r.A,{children:[(0,x.jsxs)(c.A,{md:"4",children:[(0,x.jsx)("h3",{className:"req-heading",children:le("clientName")}),(0,x.jsx)("p",{className:"req-text",children:null===T||void 0===T||null===(u=T.client)||void 0===u?void 0:u.name})]}),(0,x.jsxs)(c.A,{md:"4",children:[(0,x.jsx)("h3",{className:"req-heading",children:le("experienceRequirements")}),(0,x.jsx)("p",{className:"req-text",children:null!==Z&&void 0!==Z&&null!==(m=Z.state)&&void 0!==m&&m.workExperienceyears?"".concat(null===Z||void 0===Z||null===(_=Z.state)||void 0===_?void 0:_.workExperienceyears," years"):"Not Mentioned"})]}),(0,x.jsxs)(c.A,{md:"4",children:[(0,x.jsx)("h3",{className:"req-heading",children:le("contract")}),(0,x.jsx)("p",{className:"req-text",children:null===T||void 0===T?void 0:T.contract_type})]}),(0,x.jsxs)(c.A,{md:"4",children:[(0,x.jsx)("h3",{className:"req-heading mt-4",children:le("location")}),(0,x.jsx)("p",{className:"req-text",children:null===T||void 0===T?void 0:T.job_type})]})]})}),(0,x.jsx)("div",{className:"single-job-card",children:(0,x.jsxs)(r.A,{children:[(0,x.jsxs)(c.A,{md:"4",children:[(0,x.jsx)("h3",{className:"req-heading",children:le("skillsRequired")}),(null===T||void 0===T||null===(q=T.skills)||void 0===q?void 0:q.length)>0?(0,x.jsx)("ul",{className:"skills-listing mb-0",children:null===(E=ie(null===T||void 0===T?void 0:T.skills))||void 0===E?void 0:E.map(((e,s)=>(0,x.jsx)(x.Fragment,{children:(0,x.jsx)("li",{children:e},s)})))}):"Not Mentioned"," "]}),(0,x.jsxs)(c.A,{md:"4",children:[(0,x.jsx)("h3",{className:"req-heading",children:le("optionalSkills")}),(null===T||void 0===T||null===(J=T.optional_skills)||void 0===J?void 0:J.length)>0?(0,x.jsx)("ul",{className:"skills-listing mb-0",children:null===(D=ie(null===T||void 0===T?void 0:T.optional_skills))||void 0===D?void 0:D.map(((e,s)=>(0,x.jsx)(x.Fragment,{children:(0,x.jsx)("li",{children:e},s)})))}):"Not Mentioned"]})]})})]})}),(0,x.jsxs)(a.A,{eventKey:"suggested",title:le("suggestions"),children:[(0,x.jsx)("div",{className:"text-end",children:(0,x.jsx)(I.A,{className:"main-btn px-4 py-2 font-14",text:"Make Suggestion Request",isLoading:$,disabled:$,onClick:()=>(()=>{let e={clientId:Q,jobId:z,message:"Suggest Developer"};console.log(e,"payload"),G((0,A.Ef)(e))})()})}),(0,x.jsx)(N.A,{handleJobStatusModal:ne,type:"Suggested",data:F,jobStatus:null===T||void 0===T?void 0:T.status,role:"client"})]}),(0,x.jsx)(a.A,{eventKey:"shortlisted",title:le("shortlisted"),children:(0,x.jsx)(N.A,{handleJobStatusModal:ne,type:"Shortlisted",data:F,jobStatus:null===T||void 0===T?void 0:T.status,role:"client"})}),(0,x.jsx)(a.A,{eventKey:"interviewing",title:le("interviewing"),children:(0,x.jsx)(N.A,{handleJobStatusModal:ne,type:"Interviewing",data:F,jobStatus:null===T||void 0===T?void 0:T.status})}),(0,x.jsx)(a.A,{eventKey:"hired",title:le("hired"),children:(0,x.jsx)(N.A,{handleJobStatusModal:ne,type:"Hired",data:F,jobStatus:null===T||void 0===T?void 0:T.status})})]}),(0,x.jsx)(p,{show:null===R||void 0===R?void 0:R.rejected,handleClose:ne,onClick:te,type:P,smallLoader:ee}),(0,x.jsx)(j.A,{show:null===R||void 0===R?void 0:R.ended,handleClose:ne,onClick:te,smallLoader:ee,header:"End Job",feedbacks:"Feedbacks",submit:"Request"}),(0,x.jsx)(g.A,{text:(0,w.rv)(P),show:(null===R||void 0===R?void 0:R.Shortlisted)||(null===R||void 0===R?void 0:R.Interviewing)||(null===R||void 0===R?void 0:R.Suggested)||(null===R||void 0===R?void 0:R.application),onClick:te,handleClose:ne,smallLoader:ee,type:U})]})}}}]);
//# sourceMappingURL=4373.85dfe01b.chunk.js.map