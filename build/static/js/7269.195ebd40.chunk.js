"use strict";(self.webpackChunkrexett=self.webpackChunkrexett||[]).push([[7269],{13646:(e,t,l)=>{l.d(t,{A:()=>u});var s=l(65043),i=l(10615),a=l(40198),o=l(59374),r=l(10971),n=l(20921),d=l(36094),c=l(98394),v=l(64605),p=l(74117),m=l(70579);const u=e=>{let{data:t,columns:l,page:u,setPage:h,totalPages:x}=e;const{t:b}=(0,p.Bd)(),j=(0,m.jsx)(i.A,{id:"tooltip",children:"Download Timesheet"}),g=(0,m.jsx)(i.A,{id:"tooltip",children:"Download Invoice"}),y=e=>{if(e){const t=window.open(e,"_blank");t?t.focus():alert("Please allow pop-ups for this site to download the file in a new tab.")}};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("div",{className:"table-responsive",children:(0,m.jsxs)("table",{className:"table time-table table-bordered table-ui-custom",children:[(0,m.jsx)("thead",{children:(null===l||void 0===l?void 0:l.length)>0&&(null===l||void 0===l?void 0:l.map(((e,t)=>{let{label:l}=e;return(0,m.jsx)("th",{className:"time-table-head text-start text-uppercase",children:l},t)})))}),(0,m.jsx)("tbody",{children:(null===t||void 0===t?void 0:t.length)>0?null===t||void 0===t?void 0:t.map(((e,t)=>(0,m.jsx)("tr",{children:null===l||void 0===l?void 0:l.map(((t,l)=>{var i,c,v,p,u;let{key:h,subkey:x,profilePictureKey:b,isStatus:N,isHours:f,isAction:k,timesheetStatusKey:S,invoiceUrlKey:w,invoiceStatusKey:A,timeSheetUrlKey:D}=t;return(0,m.jsx)(s.Fragment,{children:b?(0,m.jsx)("td",{className:"time-table-data text-start",children:(0,m.jsxs)("div",{className:"d-flex align-items-center gap-2",children:[(0,m.jsx)("div",{className:"user-imgbx application-imgbx mx-0 mb-0",children:(0,m.jsx)("img",{src:null!==e&&void 0!==e&&e[h][b]?e[h][b]:"/demo-user.png",className:"user-img"})}),e[h][x]]})}):N?(0,m.jsx)("td",{className:"time-table-data text-start",children:(null===e||void 0===e||null===(i=e[h])||void 0===i?void 0:i[x])&&(0,m.jsx)("span",{className:"white-nowrap text-capitalize "+("Progress"===(null===e||void 0===e||null===(c=e[h])||void 0===c?void 0:c[x])||"progress"===(null===e||void 0===e||null===(v=e[h])||void 0===v?void 0:v[x])?"status-progress":"status-finished"),children:null===e||void 0===e||null===(p=e[h])||void 0===p?void 0:p[x]})}):k?(0,m.jsx)("td",{className:"time-table-data text-start",children:(0,m.jsxs)("div",{className:"d-flex align-items-center gap-2",children:[(0,m.jsx)(a.A,{placeholder:"bottom",overlay:j,children:(0,m.jsx)("img",{src:"pending"===e[S]?n:d,className:"approved_icon pointer",onClick:()=>{y(e[D])}})}),(0,m.jsx)(a.A,{placeholder:"bottom",overlay:g,children:(0,m.jsx)("img",{src:"pending"===(null===e||void 0===e?void 0:e[A])?r:o,className:"approved_icon pointer",onClick:()=>{y(e[w])}})})]})}):"invoiceMonth"===h?(0,m.jsx)("td",{className:"time-table-data text-start",children:(0,m.jsx)("div",{className:"d-flex align-items-center gap-2",children:null===e||void 0===e?void 0:e[h]})}):(0,m.jsx)("td",{className:"time-table-data text-start",children:(0,m.jsxs)("div",{className:"d-flex align-items-center gap-2",children:[null===e||void 0===e||null===(u=e[h])||void 0===u?void 0:u[x]," ",f&&"hrs"]})})},l)}))},t))):(0,m.jsxs)("td",{colSpan:10,children:[" ",(0,m.jsx)("div",{className:"simple-no-data",children:(0,m.jsx)(c.A,{})}),"  "]})})]})}),x>1?(0,m.jsxs)("div",{className:"d-flex justify-content-between align-items-center mt-3 mb-4",children:[(0,m.jsxs)("p",{className:"showing-result",children:[b("showing")," ",null===t||void 0===t?void 0:t.length," ",b("results")]}),(0,m.jsx)(v.A,{number:x,page:u,setPage:h})]}):""]})}},96869:(e,t,l)=>{l.d(t,{A:()=>m});var s=l(65043),i=l(10615),a=l(40198),o=(l(88521),l(4970),l(1071),l(74117)),r=l(36094),n=(l(29212),l(59374)),d=(l(20921),l(10971),l(44063),l(92021)),c=l(77465),v=l(70579);const p={projectInfo:[{label:"projectName",key:"projectName"},{label:"totalHiredDevelopers",key:"totalHiredDevelopers"},{label:"totalInvoiceRaised",key:"totalInvoiceRaised"},{label:"totalHoursSpend",key:"totalHoursSpend",isHours:!0},{label:"startDate",key:"startDate",isDate:!0},{label:"invoiceMonth",key:"invoiceMonth"},{label:"projectStatus",key:"projectStatus",isStatus:!0}],developerInfo:[{label:"developerName",key:"developerName",profilePictureKey:"profile_picture"},{label:"totalHoursSpend",key:"totalHoursSpend",isHours:!0},{label:"invoiceMonth",key:"invoiceMonth"},{label:"projectStatus",key:"projectStatus",isAction:!0,invoiceUrlKey:"invoiceUrl",timesheetUrlKey:"timesheetUrl"}]},m=e=>{let{data:t,columns:l}=e;const m=(0,v.jsx)(i.A,{id:"tooltip",children:"Download Invoice"}),u=(0,v.jsx)(i.A,{id:"tooltip",children:"Download Timesheet"}),{t:h}=(0,o.Bd)(),[x,b]=(0,s.useState)(null),[j,g]=(0,s.useState)(null),y=e=>{if(e){const t=window.open(e,"_blank");t?t.focus():alert("Please allow pop-ups for this site to download the file in a new tab.")}};return(0,v.jsx)("div",{className:"table-responsive",children:(0,v.jsxs)("table",{className:"table time-table table-bordered table-ui-custom",children:[(0,v.jsx)("thead",{children:null===p||void 0===p?void 0:p.projectInfo.map((e=>{let{label:t}=e;return(0,v.jsx)("th",{className:"time-table-head text-start",children:h(t)})}))}),(0,v.jsx)("tbody",{children:null===t||void 0===t?void 0:t.map(((e,t)=>{var l,s,i;return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("tr",{className:"application-row",onClick:()=>{return b(x===(e=t)?null:e),void g(e==j?null:e);var e},children:null===p||void 0===p||null===(l=p.projectInfo)||void 0===l?void 0:l.map(((l,s)=>{let{key:i,subkey:a,isHours:o,isDate:r,isStatus:n}=l;return(0,v.jsxs)("td",{className:"time-table-data text-start",children:[0===s&&(0,v.jsx)("span",{className:j==t?"row-arrow active":"row-arrow",children:(0,v.jsx)(d.SAQ,{})}),!a&&(0,v.jsxs)(v.Fragment,{children:[r&&(0,c.GW)(e[i],"DD-MM-YYYY"),n&&(0,v.jsx)("span",{className:"status-progress",children:"Progress"}),!r&&!n&&e[i]," ",o&&" hrs"]})]},s)}))}),x===t&&(0,v.jsx)("tr",{children:(0,v.jsx)("td",{colSpan:"7",children:(0,v.jsx)("div",{className:"table-responsive",children:(0,v.jsxs)("table",{className:"table time-table table-bordered table-ui-custom mb-0",children:[(0,v.jsx)("thead",{children:null===p||void 0===p||null===(s=p.developerInfo)||void 0===s?void 0:s.map(((e,t)=>{let{label:l}=e;return(0,v.jsx)("th",{className:"time-table-head text-start",children:h(l)},t)}))}),(0,v.jsx)("tbody",{children:null===e||void 0===e||null===(i=e.developers)||void 0===i?void 0:i.map((e=>{var t;return(0,v.jsx)("tr",{children:null===p||void 0===p||null===(t=p.developerInfo)||void 0===t?void 0:t.map((t=>{let{key:l,subkey:s,profilePictureKey:i,isAction:o,isHours:d,invoiceUrlKey:c,timesheetUrlKey:p}=t;return(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)("td",{className:"time-table-data text-start",children:[i&&(0,v.jsxs)("div",{className:"d-flex align-items-center gap-2",children:[(0,v.jsx)("div",{className:"user-imgbx application-imgbx mx-0 mb-0",children:(0,v.jsx)("img",{src:null!==e&&void 0!==e&&e[i]?null===e||void 0===e?void 0:e[i]:"/demo-user.png",className:"user-img"})}),null===e||void 0===e?void 0:e[l]]}),o&&(0,v.jsxs)("div",{className:"d-flex align-items-center gap-2",children:[(0,v.jsx)(a.A,{placeholder:"bottom",overlay:u,children:(0,v.jsx)("img",{onClick:()=>{y(null===e||void 0===e?void 0:e[p])},src:r,className:"approved_icon"})}),(0,v.jsx)(a.A,{placeholder:"bottom",overlay:m,children:(0,v.jsx)("img",{onClick:()=>{y(null===e||void 0===e?void 0:e[c])},src:n,className:"approved_icon"})})]}),!i&&!o&&(null===e||void 0===e?void 0:e[l]),d&&"hrs"]})})}))})}))})]})})})})]})}))})]})})}},7269:(e,t,l)=>{l.r(t),l.d(t,{DEVELOPER_INVOICE_COLUMNS:()=>m,default:()=>u});var s=l(65043),i=l(74117),a=l(83003),o=l(6108),r=l(39787),n=(l(13646),l(96869)),d=l(82476),c=l(88521),v=l(70579);const p={selectFilters:[{filterLabel:"Select Month",key:"month",options:o.Tl},{filterLabel:"Select Year",key:"year",options:o.M4},{filterLabel:"Invoice Status",key:"invoiceStatus",options:o.nx}],searchFilter:{key:"developerName",placeholder:"Enter developer name"}},m=[{label:"Developer Name",key:"developer",subkey:"name",profilePictureKey:"profile_picture"},{label:"Project",key:"project",subkey:"title"},{label:"Total hours",key:"project",subkey:"total_hours",isHours:!0},{label:"Invoice month",key:"invoiceMonth"},{label:"Project status",key:"project",subkey:"status",isStatus:!0},{label:"Action",key:"status",isAction:!0,timesheetStatusKey:"",timeSheetUrlKey:"",invoiceStatusKey:"invoiceStatus",invoiceUrlKey:"invoiceUrl"}],u=()=>{const e=(0,a.wA)(),{t:t}=(0,i.Bd)(),{invoiceList:l,screenLoader:m,totalInvoicePages:u}=(0,a.d4)((e=>e.clientData)),[h,x]=(0,s.useState)(1),[b,j]=(0,s.useState)({developerName:"",year:"",month:"",invoiceStatus:""}),{invoiceData:g}=(0,a.d4)((e=>e.vendorData)),{data:y}=g;console.log(y,"invoiceData"),(0,s.useEffect)((()=>{const e=(0,o.rA)(b);N(`${e}&page=${h}&perPage=5`)}),[h,b]);const N=t=>{e((0,c.Z_)(t))};return(0,v.jsx)(v.Fragment,{children:m?(0,v.jsx)(d.A,{}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(r.A,{filters:b,setFilters:j,filterFields:p}),(0,v.jsx)(n.A,{data:y})]})})}},59374:(e,t,l)=>{e.exports=l.p+"static/media/invoice_paid.929c3691172c93710fb9.png"},10971:(e,t,l)=>{e.exports=l.p+"static/media/invoice_unpaid.1cabd205dcd2533a8cef.png"},36094:(e,t,l)=>{e.exports=l.p+"static/media/timesheet_approved.e6d34219d395e2824e67.png"},20921:(e,t,l)=>{e.exports=l.p+"static/media/timesheet_notapproved.b4f89fe36e6e059dd0d1.png"}}]);
//# sourceMappingURL=7269.195ebd40.chunk.js.map