"use strict";(self.webpackChunkrexett=self.webpackChunkrexett||[]).push([[1697],{81763:(e,l,s)=>{s.d(l,{P:()=>i});s(65043);var a=s(35475),t=s(70579);const i=e=>{let{setCount:l}=e;return(0,t.jsx)(a.N_,{to:"#",className:"link-text-dark",onClick:()=>{l((e=>e+1))},children:"See More"})}},31697:(e,l,s)=>{s.r(l),s.d(l,{default:()=>N});var a=s(65043),t=(s(44063),s(73216)),i=s(10615),n=s(5328),d=s(73722),c=s(40198),r=s(14282),o=s(45394),v=s(83003),h=s(88521),u=s(98394),x=s(82476),m=(s(81763),s(4970)),j=s(74117),p=s(86908),g=s(37194),b=s(70579);const N=()=>{var e,l;const{allDevelopersList:s,screenLoader:N}=(0,v.d4)((e=>e.vendorData)),{smallLoader:f}=(0,v.d4)((e=>e.adminData)),{data:A}=s,w=(0,v.wA)(),[C,S]=(0,a.useState)({modalName:"",isTrue:!1}),[y,k]=(0,a.useState)({}),[D,_]=(0,a.useState)(1),[T,P]=(0,a.useState)(),[L,K]=(0,a.useState)(""),[E,F]=(0,a.useState)(),B=(0,t.Zp)(),{t:I}=(0,j.Bd)();(0,a.useEffect)((()=>{w((0,h.C4)({page:D}))}),[D]);const M=(0,b.jsx)(i.A,{children:"Disable Account"}),O=(e,l)=>{e.stopPropagation(),S(l)},R=(e,l)=>{let s={...y,[l]:e.target.value};w((0,h.C4)(s))};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(n.A.Container,{className:"w-100",defaultActiveKey:"list-view",children:[(0,b.jsx)("div",{className:"d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom-grey",children:(0,b.jsx)("h3",{className:"section-head-sub mb-0",children:I("listOfAllDevelopers")})}),(0,b.jsx)("div",{className:"filter-section",children:(0,b.jsx)(d.A,{children:(0,b.jsxs)("div",{className:"d-flex justify-content-between align-items-center gap-3",children:[(0,b.jsxs)("div",{className:"d-flex gap-3",children:[(0,b.jsx)("div",{className:"flex-none",children:(0,b.jsx)(d.A.Select,{className:"filter-select shadow-none",onChange:e=>R(e,"status"),children:[{label:"Status",value:"status"},{label:"Active",value:"active"},{label:"Disabled",value:"disabled"}].map(((e,l)=>(0,b.jsx)("option",{disabled:0===l,value:e.value,selected:0===l,children:e.label},l)))})}),(0,b.jsx)("div",{className:"flex-none",children:(0,b.jsx)(d.A.Select,{className:"filter-select shadow-none",onChange:e=>R(e,"sort_by_name"),children:[{label:"Sort by name",value:"sort_by_name"},{label:"Ascending",value:"ascending"},{label:"Descending",value:"descending"}].map(((e,l)=>(0,b.jsx)("option",{disabled:0===l,value:e.value,selected:0===l,children:e.label},l)))})}),(0,b.jsx)("div",{className:"flex-none",children:(0,b.jsx)(d.A.Select,{className:"filter-select shadow-none",onChange:e=>R(e,"assignment_filter"),children:[{label:"Select Developer",value:"select_developer"},{label:"Assigned",value:"assigned"},{label:"UnAssigned",value:"unassigned"}].map(((e,l)=>(0,b.jsx)("option",{disabled:0===l,value:e.value,selected:0===l,children:e.label},l)))})})]}),(0,b.jsx)("div",{className:"flex-none",children:(0,b.jsx)(d.A.Control,{type:"email",placeholder:"Search Developer",className:"common-field font-14",value:E,onChange:e=>{clearTimeout(L),F(e.target.value);const l=setTimeout((()=>{let l={...y,search:e.target.value};w((0,h.C4)(l))}),500);K(l)}})})]})})}),(0,b.jsxs)(n.A.Content,{children:[(0,b.jsx)(n.A.Pane,{eventKey:"grid-view"}),(0,b.jsx)(n.A.Pane,{eventKey:"list-view",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table developer-table",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{children:(0,b.jsx)("span",{children:I("developerName")})}),(0,b.jsx)("th",{children:(0,b.jsx)("span",{children:I("designation")})}),(0,b.jsx)("th",{children:(0,b.jsx)("span",{children:I("email")})}),(0,b.jsx)("th",{children:(0,b.jsx)("span",{children:"Status"})}),(0,b.jsx)("th",{className:"text-center",children:(0,b.jsx)("span",{children:"Restrict Action"})}),(0,b.jsx)("th",{className:"text-center",children:(0,b.jsx)("span",{children:"Delete Account"})})]})}),(0,b.jsx)("tbody",{children:N?(0,b.jsx)(x.A,{}):(null===A||void 0===A||null===(e=A.developers)||void 0===e?void 0:e.length)>0?null===A||void 0===A||null===(l=A.developers)||void 0===l?void 0:l.map(((e,l)=>{var s;return(0,b.jsx)(b.Fragment,{children:(0,b.jsxs)("tr",{onClick:l=>((e,l)=>{e.stopPropagation(),w((0,m.vS)(l)),B("/vendor-single-developer/".concat(l))})(l,null===e||void 0===e?void 0:e.id),children:[(0,b.jsx)("td",{children:(0,b.jsxs)("span",{className:"d-flex align-items-center gap-3",children:[(0,b.jsx)("img",{src:null===e||void 0===e?void 0:e.profile_picture}),(0,b.jsx)("h3",{className:"user-name color-121212 mb-0",children:null===e||void 0===e?void 0:e.name})]})}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{children:(0,b.jsx)("p",{className:"designation-user color-121212 mb-0",children:null===e||void 0===e||null===(s=e.developer_detail)||void 0===s?void 0:s.professional_title})})}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{children:(0,b.jsx)("p",{className:"email-user color-121212 mb-0",children:null===e||void 0===e?void 0:e.email})})}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"status-finished",children:"active"==(null===e||void 0===e?void 0:e.status)?"Active":"InActive"})}),(0,b.jsx)("td",{children:(0,b.jsx)("div",{className:"text-center",children:(0,b.jsx)(c.A,{placement:"bottom",overlay:M,children:(0,b.jsx)("div",{class:"form-check form-switch toggle-switch-wrapper d-inline-block ps-0",children:(0,b.jsx)("input",{onClick:l=>{let s={modalName:"toggle",id:e.id,isTrue:!0,active:"active"==(null===e||void 0===e?void 0:e.status)?"inactive":"active",status:"active"==(null===e||void 0===e?void 0:e.status)?"Disable":"Enable"};O(l,s)},class:"form-check-input toggle-switch-custom shadow-none  cursor-pointer",type:"checkbox",role:"switch",checked:"active"==(null===e||void 0===e?void 0:e.status),id:"candidate-reminder"})})})})}),(0,b.jsx)("td",{className:"text-center",onClick:l=>{let s={modalName:"delete",id:e.id,isTrue:!0};O(l,s)},children:(0,b.jsx)(r.A,{className:"arrow-btn danger-arrow mx-auto",children:(0,b.jsx)(o.tW_,{})})})]})})})):(0,b.jsxs)("td",{colSpan:10,children:[" ",(0,b.jsxs)("div",{className:"simple-no-data",children:[" ",(0,b.jsx)(u.A,{})]})," "]})})]})})})]})]}),(0,b.jsx)(p.A,{show:null===C||void 0===C?void 0:C.isTrue,handleClose:()=>{S(!C)},handleAction:async e=>{e.preventDefault();let l={user_id:null===C||void 0===C?void 0:C.id,status:null===C||void 0===C?void 0:C.active};"toggle"==C.modalName?await w((0,g.pA)(l)):await w((0,h.g6)(null===C||void 0===C?void 0:C.id)),w((0,h.C4)({page:D})),S({modalName:"",isTrue:!1})},text:"Are you sure you want to ".concat("toggle"==C.modalName?null===C||void 0===C?void 0:C.status:"Delete"," this developer ?"),smallLoader:f})]})}}}]);
//# sourceMappingURL=1697.b59844e8.chunk.js.map