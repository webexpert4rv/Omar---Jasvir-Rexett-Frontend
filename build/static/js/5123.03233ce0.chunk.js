"use strict";(self.webpackChunkrexett=self.webpackChunkrexett||[]).push([[5123],{59409:(e,s,t)=>{t.r(s),t.d(s,{default:()=>N});var i=t(65043),a=t(10615),l=t(5328),n=t(83003),d=(t(88521),t(74117)),o=(t(44063),t(29212),t(78461),t(83225)),c=t(36094),r=t(59374),v=(t(20921),t(10971)),m=t(6108),j=t(37194),x=(t(23831),t(65843),t(98394)),p=t(39062),u=t(70579);const h=e=>{let{data:s,columns:t,isRaisedByDev:l=!1}=e;const n=localStorage.getItem("role"),d=(0,u.jsx)(a.A,{id:"tooltip",children:"Download Timesheet"}),o=(0,u.jsx)(a.A,{id:"tooltip",children:"Download Invoice"});return(0,u.jsx)(u.Fragment,{children:(0,u.jsx)("div",{className:"table-responsive",children:(0,u.jsxs)("table",{className:"table time-table table-bordered table-ui-custom",children:[(0,u.jsx)("thead",{children:(null===t||void 0===t?void 0:t.length)>0&&(null===t||void 0===t?void 0:t.map(((e,s)=>{let{label:t}=e;return(0,u.jsx)("th",{className:"time-table-head text-start text-uppercase",children:t},s)})))}),(0,u.jsx)("tbody",{children:(null===s||void 0===s?void 0:s.length)>0?null===s||void 0===s?void 0:s.map(((e,s)=>(0,u.jsx)("tr",{children:t.map(((s,t)=>{let{key:a,subKey:m,isAction:j}=s;return(0,u.jsx)(i.Fragment,{children:m?(0,u.jsx)("td",{className:"time-table-data text-start",children:(0,u.jsxs)("div",{className:"d-flex align-items-center gap-2",children:[(0,u.jsx)("div",{className:"user-imgbx application-imgbx mx-0 mb-0",children:(0,u.jsx)("img",{src:e[m]?e[m]:"/demo-user.png",className:"user-img"})}),null===e||void 0===e?void 0:e[a]]})}):"projectStatus"===a?(0,u.jsx)("td",{className:"time-table-data text-start",children:(0,u.jsx)("span",{className:"white-nowrap text-capitalize ".concat(null!==e&&void 0!==e&&e[a]?"ended"===(null===e||void 0===e?void 0:e[a])?"status-finished":"status-progress":""),children:"ended"===(null===e||void 0===e?void 0:e[a])?"Completed":null===e||void 0===e?void 0:e[a]})}):"associatedWith"===a?"client"!==n&&(0,u.jsx)("td",{className:"time-table-data",children:(0,u.jsx)("p",{className:"associate-text font-14 mt-2 mb-2",children:(0,u.jsx)("span",{className:"".concat((null===e||void 0===e?void 0:e[a])&&"associate"," mb-1 font-14"),children:null===e||void 0===e?void 0:e[a]})})}):j?(0,u.jsx)("td",{className:"time-table-data text-start",children:(0,u.jsxs)("div",{className:"d-flex align-items-center gap-2",children:[l&&(0,u.jsx)(p.A,{placeholder:"bottom",overlay:d,children:(0,u.jsx)("img",{onClick:()=>{},src:c,className:"approved_icon"})}),(0,u.jsx)(p.A,{placeholder:"bottom",overlay:o,children:(0,u.jsx)("img",{onClick:()=>{(e=>{if(e){const s=window.open(e,"_blank");s?s.focus():alert("Please allow pop-ups for this site to download the file in a new tab.")}})(null===e||void 0===e?void 0:e.invoiceUrl)},src:"pending"===(null===e||void 0===e?void 0:e[a])?v:r,className:"approved_icon"})})]})}):(0,u.jsx)("td",{className:"time-table-data text-start",children:(0,u.jsxs)("div",{className:"d-flex align-items-center gap-2",children:[null===e||void 0===e?void 0:e[a]," ","totalHours"===a&&"hrs"]})})},t)}))},s))):(0,u.jsx)(x.A,{})})]})})})};var b=t(39319),g=t(82476),f=t(39787);const N=()=>{const e=(0,n.wA)(),{invoiceDetails:s,invoiceTotalPage:t,screenLoader:c}=(0,n.d4)((e=>e.adminData)),[r,v]=(0,i.useState)([]),[x,p]=(0,i.useState)(null===m.j5||void 0===m.j5?void 0:m.j5.raisedByDev),N=(new Date).getFullYear(),{t:y}=(0,d.Bd)(),[w,A]=(0,i.useState)(!1),[k,D]=(0,i.useState)({month:"",year:"",developerName:"",projectName:"",invoiceStatus:""}),[C,S]=(0,i.useState)({month:"",year:"",projectName:"",invoiceStatus:"",clientName:""}),[B,F]=(0,i.useState)(1),[_,T]=(0,i.useState)(1);a.A,a.A,a.A;(0,i.useEffect)((()=>{const e=[];for(let s=0;s<=10;s++){const t=N-s;e.push(t)}v(e)}),[]);(0,i.useEffect)((()=>{const e=x===m.j5.raisedByDev?k:C,s=x===m.j5.raisedByDev?B:_,t=(0,m.rA)(e),i="".concat(t,"&page=").concat(s,"&perPage=").concat(m.Is,"&tab=").concat(x);P(i)}),[k,C,x,B,_]);const P=s=>{e((0,j.yI)(s))};return(0,u.jsxs)(u.Fragment,{children:[c?(0,u.jsx)(g.A,{}):(0,u.jsx)("div",{className:"card-box",children:(0,u.jsxs)(l.A.Container,{id:"left-tabs-example",children:[(0,u.jsx)("div",{className:"d-flex justify-content-center",children:(0,u.jsxs)("div",{variant:"pills",className:"weekly-tabs d-flex mb-3",children:[(0,u.jsx)("div",{className:"weekly-tab-item pointer",children:(0,u.jsx)("div",{className:"weekly-tab-link d-flex align-items-center gap-2 ".concat(x===(null===m.j5||void 0===m.j5?void 0:m.j5.raisedByDev)&&"active"),eventKey:"raise-by-devs",onClick:()=>p(null===m.j5||void 0===m.j5?void 0:m.j5.raisedByDev),children:"Raise By Devs/Vendors"})}),(0,u.jsx)("div",{className:"weekly-tab-item pointer",children:(0,u.jsx)("div",{className:"weekly-tab-link ".concat(x===(null===m.j5||void 0===m.j5?void 0:m.j5.raisedToClients)&&"active"),onClick:()=>p(null===m.j5||void 0===m.j5?void 0:m.j5.raisedToClients),children:"Raise To Clients"})})]})}),(0,u.jsxs)(l.A.Content,{children:[x===(null===m.j5||void 0===m.j5?void 0:m.j5.raisedByDev)&&(0,u.jsxs)("div",{eventKey:"raise-by-devs",children:[(0,u.jsx)(f.A,{filters:k,setFilters:D,filterFields:m.aD}),(0,u.jsx)(h,{columns:m.n,data:null===s||void 0===s?void 0:s.invoices,isRaisedByDev:!0}),t>1?(0,u.jsxs)("div",{className:"d-flex justify-content-between align-items-center mt-3 mb-4",children:[(0,u.jsx)("p",{className:"showing-result"}),(0,u.jsx)(b.A,{number:t,setPage:F,page:B})]}):""]}),x===(null===m.j5||void 0===m.j5?void 0:m.j5.raisedToClients)&&(0,u.jsxs)("div",{eventKey:"raise-to-clients",children:[(0,u.jsx)(f.A,{filters:k,setFilters:D,filterFields:m.ZH}),(0,u.jsx)(h,{columns:m.VH,data:null===s||void 0===s?void 0:s.invoices}),t>1?(0,u.jsxs)("div",{className:"d-flex justify-content-between align-items-center mt-3 mb-4",children:[(0,u.jsx)("p",{className:"showing-result"}),(0,u.jsx)(b.A,{number:t,setPage:T,page:_})]}):""]})]})]})}),(0,u.jsx)(o.A,{show:w,handleClose:()=>{A(!1)}})]})}},59374:(e,s,t)=>{e.exports=t.p+"static/media/invoice_paid.929c3691172c93710fb9.png"},10971:(e,s,t)=>{e.exports=t.p+"static/media/invoice_unpaid.1cabd205dcd2533a8cef.png"},36094:(e,s,t)=>{e.exports=t.p+"static/media/timesheet_approved.e6d34219d395e2824e67.png"},20921:(e,s,t)=>{e.exports=t.p+"static/media/timesheet_notapproved.b4f89fe36e6e059dd0d1.png"}}]);
//# sourceMappingURL=5123.03233ce0.chunk.js.map