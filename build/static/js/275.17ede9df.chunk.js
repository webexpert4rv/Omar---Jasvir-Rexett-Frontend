"use strict";(self.webpackChunkrexett=self.webpackChunkrexett||[]).push([[275],{31404:(e,a,l)=>{l.d(a,{A:()=>t});l(65043);var s=l(70579);const t=e=>{let{heading:a,guideLines:l}=e;return(0,s.jsx)("div",{children:(0,s.jsxs)("div",{className:"helper-text-section",children:[(0,s.jsx)("h3",{children:a}),(0,s.jsx)("ol",{className:"ps-3  mb-0",children:null===l||void 0===l?void 0:l.map(((e,a)=>(0,s.jsx)("li",{className:"mb-1",children:(0,s.jsxs)("p",{children:[" ",e," "]},a)})))})]})})}},82966:(e,a,l)=>{l.d(a,{A:()=>x});var s=l(86178),t=l.n(s),n=l(65043),i=l(14282),d=l(73722),r=l(25543),o=l(49342),c=l(45394),m=l(33012),v=l(1071),h=(l(62272),l(70579));const x=e=>{let{holidayList:a,handleShowEvent:l,handleDelete:s,handleAproveDisapprove:x,approvedLoader:p,selectedIndex:j,selectedRejectIndex:u}=e;const[N,b]=(0,n.useState)(),[f,A]=(0,n.useState)(),[g,y]=(0,n.useState)("All"),[w,_]=(0,n.useState)("2024");let D=localStorage.getItem("role");(0,n.useEffect)((()=>{const e=null===a||void 0===a?void 0:a.filter((e=>"2024"==t()(null===e||void 0===e?void 0:e.date).year()));A(e),_("2024"),b(e)}),[a]);const L=null===N||void 0===N?void 0:N.filter((e=>1==(null===e||void 0===e?void 0:e.is_approved_by_client)));return(0,h.jsx)("section",{className:"",children:(0,h.jsxs)("div",{className:"card-box border shadow-none",children:["client"===D?(0,h.jsx)("div",{className:"mb-0",children:(0,h.jsx)(i.A,{className:"main-btn font-14",onClick:l,children:"+ Create New Holiday"})}):"",(0,h.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[(0,h.jsx)("div",{className:"skill-filters",children:r.Pn.map((e=>(0,h.jsx)("span",{className:g===e?"active":"",onClick:()=>(e=>{if(y(e),"All"!==e){const a=null===f||void 0===f?void 0:f.filter((a=>t()(null===a||void 0===a?void 0:a.date).month()+1==t()(e,"MMMM").format("M")));b(a)}else b(f)})(e),children:e},e)))}),(0,h.jsx)(d.A,{className:"d-flex gap-2",children:(0,h.jsx)(d.A.Select,{className:"common-field font-14 w-auto",onChange:e=>(e=>{_(e),y("All");const l=null===a||void 0===a?void 0:a.filter((a=>t()(null===a||void 0===a?void 0:a.date).year()==e));A(l),b(l)})(e.target.value),value:w,children:null===r.Fl||void 0===r.Fl?void 0:r.Fl.map(((e,a)=>(0,h.jsx)("option",{children:e},a)))})})]}),(0,h.jsx)("div",{className:"table-responsive",children:(0,h.jsxs)("table",{className:"table table-ui-custom mb-0",children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{children:"Date"}),(0,h.jsx)("th",{children:"Name"}),"client"===D?(0,h.jsx)("th",{children:"Action"}):""]})}),(0,h.jsx)("tbody",{children:(null===N||void 0===N?void 0:N.length)>0?"developer"===D?null===L||void 0===L?void 0:L.map(((e,a)=>(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{className:"font-14 align-middle",children:(0,h.jsx)("strong",{children:null===e||void 0===e?void 0:e.date})}),(0,h.jsx)("td",{className:"font-14 align-middle",children:null===e||void 0===e?void 0:e.name})]},a)}))):null===N||void 0===N?void 0:N.map(((e,a)=>(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{className:"font-14 align-middle",children:(0,h.jsx)("strong",{children:null===e||void 0===e?void 0:e.date})}),(0,h.jsxs)("td",{className:"font-14 align-middle",children:[null===e||void 0===e?void 0:e.name,"client"===D&&"client"===(null===e||void 0===e?void 0:e.added_by)?(0,h.jsx)("span",{className:"associate-text",children:(0,h.jsx)("span",{className:"associate",children:"Created"})}):""]}),(0,h.jsx)("td",{children:"client"===D?"system"===(null===e||void 0===e?void 0:e.added_by)?!0===(null===e||void 0===e?void 0:e.is_approved_by_client)?(0,h.jsx)("div",{children:(0,h.jsx)("h6",{children:"Approved"})}):!1===(null===e||void 0===e?void 0:e.is_approved_by_client)?(0,h.jsx)("div",{children:(0,h.jsx)("h6",{children:"Disapproved"})}):(0,h.jsx)("div",{children:(0,h.jsxs)("div",{className:"d-flex gap-2",children:[(0,h.jsx)(m.A,{text:"Approve",children:(0,h.jsx)(v.A,{variant:"transparent",className:"px-3 arrow-btn primary-arrow font-16 text-decoration-none",isLoading:j==a&&p,icon:j==a?p:(0,h.jsx)(c.KDk,{}),onClick:()=>x(null===e||void 0===e?void 0:e.id,"approve",a)})}),(0,h.jsx)(m.A,{text:"Disapprove",children:(0,h.jsx)(v.A,{variant:"transparent",className:"px-3 arrow-btn danger-arrow font-16 text-decoration-none",isLoading:u==a&&p,icon:u==a?p:(0,h.jsx)(c.lr4,{}),onClick:()=>x(null===e||void 0===e?void 0:e.id,"disapprove",a)})})]})}):(0,h.jsxs)("div",{className:"d-flex gap-2",children:[(0,h.jsx)(m.A,{text:"Edit",children:(0,h.jsx)(i.A,{variant:"transparent",className:"px-3 arrow-btn info-arrow font-16 text-decoration-none",onClick:()=>l(null===e||void 0===e?void 0:e.id,"edit"),children:(0,h.jsx)(o.g4E,{})})}),(0,h.jsx)(m.A,{text:"Delete",children:(0,h.jsx)(i.A,{variant:"transparent",className:"px-3 arrow-btn danger-arrow font-16 text-decoration-none",onClick:()=>s(null===e||void 0===e?void 0:e.id),children:(0,h.jsx)(c.lr4,{})})})]}):""})]},a))):(0,h.jsx)("tr",{children:(0,h.jsx)("td",{colSpan:"3",className:"font-14",children:(0,h.jsx)("p",{className:"text-danger mb-0",children:"No holidays in this month"})})})})]})})]})})}},80275:(e,a,l)=>{l.r(a),l.d(a,{default:()=>L});var s=l(65043),t=l(5328),n=l(92843),i=l(61072),d=l(78602),r=l(14282),o=l(86347),c=l(45394),m=l(6720),v=(l(29212),l(24858)),h=l(83003),x=l(13368),p=l(74117),j=l(86178),u=l.n(j),N=l(1071),b=l(25543),f=(l(85603),l(33012)),A=(l(98394),l(82476)),g=l(82966),y=l(73722),w=l(70579);const _=e=>{let{allContracts:a,handleRange:l,id:t,selectionRange:n,setSelectionRange:r,smallLoader:c,start_date:m,end_date:j}=e;const{register:u,handleSubmit:f,setValue:A,reset:g,formState:{errors:_}}=(0,v.mN)({}),{leaveDetails:D}=(0,h.d4)((e=>e.developerData)),L=new Date,{t:S}=(0,p.Bd)(),C=(0,h.wA)(),k=localStorage.getItem("userId"),[Y,M]=(0,s.useState)({status:!1,leaveId:""});(0,s.useEffect)((()=>{const e=D.find((e=>e.id==t));e&&(r({startDate:new Date(e.start_date),endDate:new Date(e.end_date),key:"selection"}),M({status:!0,leaveId:t}),A("client_name",null===e||void 0===e?void 0:e.contract_id),A("leave_type",null===e||void 0===e?void 0:e.type),A("reason",null===e||void 0===e?void 0:e.reason_for_leave))}),[t]);return(0,w.jsxs)(i.A,{className:"gx-4",children:[(0,w.jsx)(d.A,{lg:7,children:(0,w.jsx)("div",{className:"leave-calendar h-100",children:(0,w.jsx)(o.Ur,{ranges:[n],onChange:l,minDate:L})})}),(0,w.jsx)(d.A,{lg:5,children:(0,w.jsxs)("div",{className:"plan-leave-wrapper",children:[(0,w.jsx)("h3",{className:"section-head border-0 mb-3",children:"Apply Leave"}),(0,w.jsxs)("form",{onSubmit:f((async e=>{let a={contract_id:+e.client_name,start_date:m,end_date:j,start_time:null,end_time:null,type:e.leave_type,reason_for_leave:e.reason};!0===(null===Y||void 0===Y?void 0:Y.status)?await C((0,x.Hv)(null===Y||void 0===Y?void 0:Y.leaveId,a)):await C((0,x.w_)(a));C((0,x.yD)(k,{approval_status:"Under Approval"})),M({status:!1,leaveId:""}),g(),r({startDate:new Date,endDate:new Date,key:"selection"})})),noValidate:!0,children:[(0,w.jsxs)("div",{className:"mb-4",children:[(0,w.jsx)(y.A.Label,{className:"mb-2 font-14",children:"Select Client"}),(0,w.jsxs)(y.A.Select,{className:"common-field font-14 mb-4",...u("client_name",{required:S("clientNameRequired")}),defaultValue:"",children:[(0,w.jsx)("option",{value:"",disabled:!0,children:"Select client"}),null===a||void 0===a?void 0:a.map(((e,a)=>{var l;return(0,w.jsx)("option",{value:null===e||void 0===e?void 0:e.id,children:null===e||void 0===e||null===(l=e.client)||void 0===l?void 0:l.name},a)}))]}),_.client_name&&(0,w.jsx)("span",{className:"error-message",children:_.client_name.message})]}),(0,w.jsxs)("div",{className:"mb-4",children:[(0,w.jsx)(y.A.Label,{className:"mb-2 font-14",children:"Leave Type"}),(0,w.jsxs)(y.A.Select,{className:"common-field font-10 mb-4",...u("leave_type",{required:S("leaveTypeRequired")}),defaultValue:"",children:[(0,w.jsx)("option",{value:"",disabled:!0,children:"Select leave type"}),b.t6.map(((e,a)=>(0,w.jsx)("option",{value:e.value,children:e.key},a)))]}),_.leave_type&&(0,w.jsx)("span",{className:"error-message",children:_.leave_type.message})]}),(0,w.jsxs)("div",{className:"mb-4",children:[(0,w.jsx)(y.A.Label,{className:"mb-2 font-14",children:"Reason"}),(0,w.jsx)(y.A.Control,{as:"textarea",rows:"3",className:"common-field font-14",placeholder:"Enter Reason",...u("reason",{required:{value:!0,message:S("reasonRequired")}})}),_.reason&&(0,w.jsx)("span",{className:"error-message",children:_.reason.message})]}),(0,w.jsx)("div",{className:"text-center",children:(0,w.jsx)(N.A,{type:"submit",text:S("Submit"),className:"main-btn font-14 px-4 py-2",variant:"transparent",isLoading:c})})]})]})})]})};var D=l(31404);const L=()=>{const[e,a]=(0,s.useState)({startDate:new Date,endDate:new Date,key:"selection"}),{screenLoader:l,leaveDetails:o,allContracts:j,holidayList:y,smallLoader:L}=(0,h.d4)((e=>e.developerData)),[S,C]=(0,s.useState)(),[k,Y]=(0,s.useState)(null),{handleSubmit:M,register:I,setValue:R,reset:E,formState:{errors:K}}=(0,v.mN)({}),P=(0,h.wA)(),{t:q}=(0,p.Bd)(),[H,F]=(0,s.useState)("first"),B=(new Date,u()(null===e||void 0===e?void 0:e.startDate).format("MM-DD-YYYY")),T=u()(null===e||void 0===e?void 0:e.endDate).format("MM-DD-YYYY"),V=localStorage.getItem("userId");(0,s.useEffect)((()=>{P((0,x.sq)())}),[]),(0,s.useEffect)((()=>{let e;"first"===H&&(e={approval_status:"Under Approval"}),P((0,x.yD)(V,e)),P((0,x.Hh)())}),[H]);const[U,$]=(0,s.useState)(new Date),G=(e=>{const a=null===e||void 0===e?void 0:e.map((e=>new Date(null===e||void 0===e?void 0:e.date)));return a})(y);return(0,w.jsxs)(w.Fragment,{children:[l?(0,w.jsx)(A.A,{}):(0,w.jsxs)(t.A.Container,{defaultActiveKey:"plan-leave",children:[(0,w.jsxs)(n.A,{variant:"pills",className:"mb-4 application-pills",children:[(0,w.jsx)(n.A.Item,{className:"application-item",children:(0,w.jsx)(n.A.Link,{className:"application-link",eventKey:"plan-leave",children:"Plan Leave"})}),(0,w.jsx)(n.A.Item,{className:"application-item",children:(0,w.jsx)(n.A.Link,{className:"application-link",eventKey:"public-holiday",children:"Public Holiday"})})]}),(0,w.jsxs)(t.A.Content,{children:[(0,w.jsx)(t.A.Pane,{eventKey:"plan-leave",children:(0,w.jsxs)(t.A.Container,{id:"left-tabs-example",defaultActiveKey:"first",onSelect:e=>{F(e)},children:[(0,w.jsxs)(n.A,{variant:"pills",className:"mb-4 application-pills",children:[(0,w.jsx)(n.A.Item,{className:"application-item",children:(0,w.jsx)(n.A.Link,{className:"application-link",eventKey:"first",children:"Apply Leave"})}),(0,w.jsx)(n.A.Item,{className:"application-item",children:(0,w.jsx)(n.A.Link,{className:"application-link",eventKey:"second",children:"Leave History"})})]}),(0,w.jsxs)(t.A.Content,{children:[(0,w.jsxs)(t.A.Pane,{eventKey:"first",children:[(0,w.jsxs)("div",{className:"card-box mb-4",children:[(0,w.jsx)("h3",{className:"section-head border-0 mb-2",children:"Applied Leaves"}),(0,w.jsx)(i.A,{children:o.length>0?null===o||void 0===o?void 0:o.map(((e,a)=>(0,w.jsx)(d.A,{xxl:3,xl:6,className:"mb-xxl-0 mb-3",children:(0,w.jsxs)("div",{className:"leave-wrapper-box",children:[(0,w.jsxs)("div",{children:[(0,w.jsx)("h4",{className:"project-heading"}),(0,w.jsx)("h4",{className:"leave-type-heading",children:(0,b.r$)(null===e||void 0===e?void 0:e.type)}),(0,w.jsx)("div",{children:(0,w.jsxs)("p",{className:"leave-date",children:[u()(null===e||void 0===e?void 0:e.start_date).format("MM-DD-YYYY"),"to",u()(null===e||void 0===e?void 0:e.end_date).format("MM-DD-YYYY")]})}),(0,w.jsx)("p",{className:"status-finished mb-0",children:null===e||void 0===e?void 0:e.approval_status})]}),(0,w.jsxs)("div",{className:"d-flex gap-3",children:[(0,w.jsx)(f.A,{text:"Cancel Leave",children:(0,w.jsx)(N.A,{className:"px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none",onClick:()=>(async(e,a)=>{C(a),await P((0,x.MX)(e,{withdrawal_reason:"reason"})),P((0,x.yD)(V,{approval_status:"Under Approval"}))})(null===e||void 0===e?void 0:e.id,a),isLoading:S===a&&L,children:(0,w.jsx)(c.$8F,{})})}),(0,w.jsx)(f.A,{text:"Edit Leave",children:(0,w.jsx)(r.A,{className:"px-3 mb-2 arrow-btn info-arrow font-16 text-decoration-none",onClick:()=>Y(null===e||void 0===e?void 0:e.id),children:(0,w.jsx)(m.$Sw,{})})})]})]})}))):(0,w.jsx)("p",{className:"text-muted font-14 mb-0",children:"No Leave Applied"})})]}),(0,w.jsx)(_,{allContracts:j,handleRange:e=>{a(e.selection)},selectionRange:e,setSelectionRange:a,smallLoader:L,id:k,start_date:B,end_date:T})]}),(0,w.jsx)(t.A.Pane,{eventKey:"second",children:(0,w.jsx)("div",{className:"table-responsive",children:(0,w.jsxs)("table",{className:"table time-table table-bordered table-ui-custom",children:[(0,w.jsxs)("thead",{children:[(0,w.jsx)("th",{className:"time-table-head text-start",children:"Leave Type"}),(0,w.jsx)("th",{className:"time-table-head text-start",children:"Leave Date"}),(0,w.jsx)("th",{className:"time-table-head text-start",children:"Reason"}),(0,w.jsx)("th",{className:"time-table-head text-start",children:"Project"}),(0,w.jsx)("th",{className:"time-table-head text-start",children:"Client Name"}),(0,w.jsx)("th",{className:"time-table-head text-start",children:"Leave Status"})]}),(0,w.jsx)("tbody",{children:null===o||void 0===o?void 0:o.map(((e,a)=>{var l,s;return(0,w.jsx)(w.Fragment,{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)("td",{className:"time-table-data text-start",children:(0,w.jsx)("h4",{className:"leave-type-heading mb-0 white-nowrap",children:(0,b.r$)(null===e||void 0===e?void 0:e.type)})}),(0,w.jsx)("td",{className:"time-table-data text-start",children:(0,w.jsxs)("p",{className:"leave-date white-nowrap",children:[u()(e.start_date).format("MM-DD-YYYY"),"to",u()(e.end_date).format("MM-DD-YYYY")]})}),(0,w.jsx)("td",{className:"time-table-data text-start reason-data",children:(0,w.jsx)("p",{className:"font-14 mb-0",children:e.reason_for_leave})}),(0,w.jsx)("td",{className:"time-table-data text-start white-nowrap",children:"AI Bot Project"}),(0,w.jsx)("td",{className:"time-table-data text-start",children:(0,w.jsx)("div",{className:"d-flex align-items-center gap-2",children:null===e||void 0===e||null===(l=e.contract)||void 0===l||null===(s=l.client)||void 0===s?void 0:s.name})}),(0,w.jsx)("td",{className:"time-table-data text-start",children:(0,w.jsx)("span",{className:"status-progress",children:e.approval_status})})]})})}))})]})})})]})]})}),(0,w.jsx)(t.A.Pane,{eventKey:"public-holiday",children:(0,w.jsx)(g.A,{onChange:$,value:U,tileContent:e=>{let{date:a,view:l}=e;return"month"===l&&G.find((e=>e.toDateString()===a.toDateString()))?(0,w.jsx)("div",{className:"dot"}):null},holidayList:y})})]})]}),(0,w.jsx)(D.A,{heading:"Guiding You Through: Helpful Text to Apply Leaves",guideLines:b.mg})]})}},85603:(e,a,l)=>{l.d(a,{A:()=>o});var s=l(65043),t=l(25284),n=l(73722),i=l(14282),d=l(62272),r=l(70579);const o=e=>{let{show:a,handleClose:l,handleClick:o,smallLoader:c,header:m,feedbacks:v,submit:h}=e;const[x,p]=(0,s.useState)("");return(0,r.jsxs)(t.A,{show:a,onHide:l,centered:!0,className:"custom-modal",animation:!0,children:[(0,r.jsx)(t.A.Header,{closeButton:!0,className:"border-0 pb-3"}),(0,r.jsxs)(t.A.Body,{children:[(0,r.jsxs)("h3",{className:"popup-heading",children:[m," "]}),(0,r.jsxs)(n.A,{children:[(0,r.jsxs)(n.A.Group,{className:"mb-4",children:[(0,r.jsx)(n.A.Label,{children:v}),(0,r.jsx)(n.A.Control,{as:"textarea",rows:"6",placeholder:"Reasons"===v?"Enter your reason, why you want to reject the leave ?":"Enter your feedback, why you want to reject?",onChange:e=>{p(e.target.value)},required:!0})]}),(0,r.jsx)("div",{className:"text-center",children:(0,r.jsx)(i.A,{variant:"transparent",className:"main-btn px-4",onClick:e=>{let a;a="Reasons"===v?x:{status:"ended",end_reason:x},o(e,a)},disabled:0===(null===x||void 0===x?void 0:x.length),children:c?(0,r.jsx)(d.A,{}):h})})]})]})]})}}}]);
//# sourceMappingURL=275.17ede9df.chunk.js.map