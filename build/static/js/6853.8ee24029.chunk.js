"use strict";(self.webpackChunkrexett=self.webpackChunkrexett||[]).push([[6853],{93692:(e,l,i)=>{i.d(l,{A:()=>o});i(65043);var d=i(35475),s=i(60184),n=i(44063),r=i(70579);const o=e=>{var l,i,o,v,a,t,c,u,x,h;let{item:p,handleCardClick:m}=e;return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"developer-card",onClick:()=>{var e;return m(null===p||void 0===p||null===(e=p.developer)||void 0===e?void 0:e.id)},children:[(0,r.jsx)("div",{className:"user-imgbx",children:(0,r.jsx)("img",{src:null!==p&&void 0!==p&&null!==(l=p.developer)&&void 0!==l&&l.profile_picture?null===p||void 0===p||null===(i=p.developer)||void 0===i?void 0:i.profile_picture:n,alt:"developerImage",className:"user-img"})}),(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)("h3",{className:"user-name",children:null===p||void 0===p||null===(o=p.developer)||void 0===o?void 0:o.name}),(0,r.jsx)("p",{className:"designation-user",children:null===p||void 0===p||null===(v=p.developer)||void 0===v||null===(a=v.developer_detail)||void 0===a?void 0:a.professional_title}),(0,r.jsx)("p",{className:"email-user",children:null===p||void 0===p||null===(t=p.developer)||void 0===t?void 0:t.email}),(0,r.jsxs)("ul",{className:"social-icons d-none",children:[(0,r.jsx)("li",{children:(0,r.jsx)(d.N_,{to:null===p||void 0===p||null===(c=p.developer)||void 0===c||null===(u=c.developer_detail)||void 0===u?void 0:u.github_url,children:(0,r.jsx)(s.hL4,{})})}),(0,r.jsx)("li",{children:(0,r.jsx)(d.N_,{to:null===p||void 0===p||null===(x=p.developer)||void 0===x||null===(h=x.developer_detail)||void 0===h?void 0:h.linkedin_url,children:(0,r.jsx)(s.QEs,{})})})]})]})]},null===p||void 0===p?void 0:p.developer_id)})}},81763:(e,l,i)=>{i.d(l,{P:()=>n});i(65043);var d=i(35475),s=i(70579);const n=e=>{let{setCount:l}=e;return(0,s.jsx)(d.N_,{to:"#",className:"link-text-dark",onClick:()=>{l((e=>e+1))},children:"See More"})}},46853:(e,l,i)=>{i.r(l),i.d(l,{default:()=>g});var d=i(65043),s=i(4970),n=i(83003),r=i(93692),o=i(81763),v=i(82476),a=i(44063),t=i(45394),c=i(23156),u=i(5328),x=i(92843),h=i(73216),p=i(98394),m=i(74117),j=i(70579);const g=()=>{var e,l,i,g,N;const _=(0,n.wA)(),[b,f]=(0,d.useState)(1),A=(0,h.Zp)(),{t:k}=(0,m.Bd)(),{assignedDeveloperList:w,screenLoader:C}=(0,n.d4)((e=>e.clientData));(0,d.useEffect)((()=>{_((0,s.Wo)(b))}),[_,b]);return(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)(u.A.Container,{className:"w-100",defaultActiveKey:"list-view",children:[(0,j.jsxs)("div",{className:"d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom-grey",children:[(0,j.jsx)("h3",{className:"section-head-sub mb-0",children:k("listOfAssignedDevelopers")}),(0,j.jsxs)(x.A,{variant:"pills",className:"document-view-pill",children:[(0,j.jsx)(x.A.Item,{className:"document-view-item",children:(0,j.jsx)(x.A.Link,{className:"document-view-link",eventKey:"list-view",children:(0,j.jsx)(c.v5n,{})})}),(0,j.jsx)(x.A.Item,{className:"document-view-item",children:(0,j.jsx)(x.A.Link,{className:"document-view-link",eventKey:"grid-view",children:(0,j.jsx)(t.fdS,{})})})]})]}),C?(0,j.jsx)(v.A,{}):(0,j.jsxs)(j.Fragment,{children:[" ",(0,j.jsxs)(u.A.Content,{children:[(0,j.jsx)(u.A.Pane,{eventKey:"list-view",children:(0,j.jsx)("div",{className:"table-responsive",children:(0,j.jsxs)("table",{className:"table developer-table",children:[(0,j.jsx)("thead",{children:(0,j.jsxs)("tr",{children:[(0,j.jsx)("th",{children:(0,j.jsx)("span",{children:k("developerName")})}),(0,j.jsx)("th",{children:(0,j.jsx)("span",{children:k("designation")})}),(0,j.jsx)("th",{children:(0,j.jsx)("span",{children:k("email")})})]})}),(0,j.jsx)("tbody",{children:(null===w||void 0===w||null===(e=w.assigned_developers)||void 0===e?void 0:e.length)>0?null===w||void 0===w||null===(l=w.assigned_developers)||void 0===l?void 0:l.map(((e,l)=>{var i,d,n,r,o,v;return(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)("tr",{onClick:()=>{return l=null===e||void 0===e?void 0:e.developer_id,_((0,s.vS)(l)),void A("/client/client-single-developer/".concat(l));var l},children:[(0,j.jsx)("td",{children:(0,j.jsxs)("span",{className:"d-flex align-items-center gap-3",children:[(0,j.jsx)("img",{src:null!==e&&void 0!==e&&null!==(i=e.developer)&&void 0!==i&&i.profile_picture?null===e||void 0===e||null===(d=e.developer)||void 0===d?void 0:d.profile_picture:a}),(0,j.jsx)("h3",{className:"user-name color-121212 mb-0",children:null===e||void 0===e||null===(n=e.developer)||void 0===n?void 0:n.name})]})}),(0,j.jsx)("td",{children:(0,j.jsx)("span",{children:(0,j.jsx)("p",{className:"designation-user color-121212 mb-0",children:null===e||void 0===e||null===(r=e.developer)||void 0===r||null===(o=r.developer_detail)||void 0===o?void 0:o.professional_title})})}),(0,j.jsx)("td",{children:(0,j.jsx)("span",{children:(0,j.jsx)("p",{className:"designation-user color-121212 mb-0",children:null===e||void 0===e||null===(v=e.developer)||void 0===v?void 0:v.email})})})]},null===e||void 0===e?void 0:e.developer_id)})})):(0,j.jsxs)("td",{colSpan:10,children:[" ",(0,j.jsx)("div",{className:"simple-no-data",children:(0,j.jsx)(p.A,{})}),"  "]})})]})})}),(0,j.jsx)(u.A.Pane,{eventKey:"grid-view",children:(0,j.jsx)("div",{className:"developers-list",children:(null===w||void 0===w||null===(i=w.assigned_developers)||void 0===i?void 0:i.length)>0?null===w||void 0===w||null===(g=w.assigned_developers)||void 0===g?void 0:g.map(((e,l)=>(0,j.jsx)(j.Fragment,{children:(0,j.jsx)(r.A,{item:e,handleCardClick:()=>{return l=null===e||void 0===e?void 0:e.developer_id,_((0,s.vS)(l)),void A("/client/client-single-developer/".concat(l));var l}})}))):(0,j.jsxs)("td",{colSpan:10,children:[" ",(0,j.jsx)("div",{className:"simple-no-data",children:(0,j.jsx)(p.A,{})}),"  "]})})})]}),(null===w||void 0===w?void 0:w.total_developer_count)>5&&(null===w||void 0===w||null===(N=w.assigned_developers)||void 0===N?void 0:N.length)!==w.total_developer_count?(0,j.jsx)("div",{className:"text-center mt-3",children:(0,j.jsx)(o.P,{setCount:f})}):""]})]})})}}}]);
//# sourceMappingURL=6853.8ee24029.chunk.js.map