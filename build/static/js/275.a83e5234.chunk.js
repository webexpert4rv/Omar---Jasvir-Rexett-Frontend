"use strict";(self.webpackChunkrexett=self.webpackChunkrexett||[]).push([[275],{82966:(e,a,t)=>{t.d(a,{A:()=>h});var l=t(86178),s=t.n(l),n=t(65043),i=t(14282),d=t(73722),r=t(25543),o=t(49342),c=t(45394),m=t(33012),v=t(1071),x=(t(62272),t(70579));const h=e=>{let{holidayList:a,handleShowEvent:t,handleDelete:l,handleAproveDisapprove:h,approvedLoader:p,selectedIndex:j,selectedRejectIndex:u}=e;const[N,b]=(0,n.useState)(),[f,A]=(0,n.useState)(),[g,y]=(0,n.useState)("All"),[w,_]=(0,n.useState)("2024");let D=localStorage.getItem("role");(0,n.useEffect)((()=>{const e=null===a||void 0===a?void 0:a.filter((e=>"2024"==s()(null===e||void 0===e?void 0:e.date).year()));A(e),_("2024"),b(e)}),[a]);const L=null===N||void 0===N?void 0:N.filter((e=>1==(null===e||void 0===e?void 0:e.is_approved_by_client)));return(0,x.jsx)("section",{className:"",children:(0,x.jsxs)("div",{className:"card-box border shadow-none",children:["client"===D?(0,x.jsx)("div",{className:"mb-0",children:(0,x.jsx)(i.A,{className:"main-btn font-14",onClick:t,children:"+ Create New Holiday"})}):"",(0,x.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[(0,x.jsx)("div",{className:"skill-filters",children:r.Pn.map((e=>(0,x.jsx)("span",{className:g===e?"active":"",onClick:()=>(e=>{if(y(e),"All"!==e){const a=null===f||void 0===f?void 0:f.filter((a=>s()(null===a||void 0===a?void 0:a.date).month()+1==s()(e,"MMMM").format("M")));b(a)}else b(f)})(e),children:e},e)))}),(0,x.jsx)(d.A,{className:"d-flex gap-2",children:(0,x.jsx)(d.A.Select,{className:"common-field font-14 w-auto",onChange:e=>(e=>{_(e),y("All");const t=null===a||void 0===a?void 0:a.filter((a=>s()(null===a||void 0===a?void 0:a.date).year()==e));A(t),b(t)})(e.target.value),value:w,children:null===r.Fl||void 0===r.Fl?void 0:r.Fl.map(((e,a)=>(0,x.jsx)("option",{children:e},a)))})})]}),(0,x.jsx)("div",{className:"table-responsive",children:(0,x.jsxs)("table",{className:"table table-ui-custom mb-0",children:[(0,x.jsx)("thead",{children:(0,x.jsxs)("tr",{children:[(0,x.jsx)("th",{children:"Date"}),(0,x.jsx)("th",{children:"Name"}),"client"===D?(0,x.jsx)("th",{children:"Action"}):""]})}),(0,x.jsx)("tbody",{children:(null===N||void 0===N?void 0:N.length)>0?"developer"===D?null===L||void 0===L?void 0:L.map(((e,a)=>(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)("tr",{children:[(0,x.jsx)("td",{className:"font-14 align-middle",children:(0,x.jsx)("strong",{children:null===e||void 0===e?void 0:e.date})}),(0,x.jsx)("td",{className:"font-14 align-middle",children:null===e||void 0===e?void 0:e.name})]},a)}))):null===N||void 0===N?void 0:N.map(((e,a)=>(0,x.jsxs)("tr",{children:[(0,x.jsx)("td",{className:"font-14 align-middle",children:(0,x.jsx)("strong",{children:null===e||void 0===e?void 0:e.date})}),(0,x.jsxs)("td",{className:"font-14 align-middle",children:[null===e||void 0===e?void 0:e.name,"client"===D&&"client"===(null===e||void 0===e?void 0:e.added_by)?(0,x.jsx)("span",{className:"associate-text",children:(0,x.jsx)("span",{className:"associate",children:"Created"})}):""]}),(0,x.jsx)("td",{children:"client"===D?"system"===(null===e||void 0===e?void 0:e.added_by)?!0===(null===e||void 0===e?void 0:e.is_approved_by_client)?(0,x.jsx)("div",{children:(0,x.jsx)("h6",{children:"Approved"})}):!1===(null===e||void 0===e?void 0:e.is_approved_by_client)?(0,x.jsx)("div",{children:(0,x.jsx)("h6",{children:"Disapproved"})}):(0,x.jsx)("div",{children:(0,x.jsxs)("div",{className:"d-flex gap-2",children:[(0,x.jsx)(m.A,{text:"Approve",children:(0,x.jsx)(v.A,{variant:"transparent",className:"px-3 arrow-btn primary-arrow font-16 text-decoration-none",isLoading:j==a&&p,icon:j==a?p:(0,x.jsx)(c.KDk,{}),onClick:()=>h(null===e||void 0===e?void 0:e.id,"approve",a)})}),(0,x.jsx)(m.A,{text:"Disapprove",children:(0,x.jsx)(v.A,{variant:"transparent",className:"px-3 arrow-btn danger-arrow font-16 text-decoration-none",isLoading:u==a&&p,icon:u==a?p:(0,x.jsx)(c.lr4,{}),onClick:()=>h(null===e||void 0===e?void 0:e.id,"disapprove",a)})})]})}):(0,x.jsxs)("div",{className:"d-flex gap-2",children:[(0,x.jsx)(m.A,{text:"Edit",children:(0,x.jsx)(i.A,{variant:"transparent",className:"px-3 arrow-btn info-arrow font-16 text-decoration-none",onClick:()=>t(null===e||void 0===e?void 0:e.id,"edit"),children:(0,x.jsx)(o.g4E,{})})}),(0,x.jsx)(m.A,{text:"Delete",children:(0,x.jsx)(i.A,{variant:"transparent",className:"px-3 arrow-btn danger-arrow font-16 text-decoration-none",onClick:()=>l(null===e||void 0===e?void 0:e.id),children:(0,x.jsx)(c.lr4,{})})})]}):""})]},a))):(0,x.jsx)("tr",{children:(0,x.jsx)("td",{colSpan:"3",className:"font-14",children:(0,x.jsx)("p",{className:"text-danger mb-0",children:"No holidays in this month"})})})})]})})]})})}},11808:(e,a,t)=>{t.d(a,{A:()=>o});var l=t(65043),s=t(25284),n=t(73722),i=t(14282),d=t(62272),r=t(70579);const o=e=>{let{show:a,handleClose:t,handleClick:o,smallLoader:c,header:m,feedbacks:v,submit:x}=e;const[h,p]=(0,l.useState)("");return(0,r.jsxs)(s.A,{show:a,onHide:t,centered:!0,className:"custom-modal",animation:!0,children:[(0,r.jsx)(s.A.Header,{closeButton:!0,className:"border-0 pb-3"}),(0,r.jsxs)(s.A.Body,{children:[(0,r.jsxs)("h3",{className:"popup-heading",children:[m," "]}),(0,r.jsxs)(n.A,{children:[(0,r.jsxs)(n.A.Group,{className:"mb-4",children:[(0,r.jsx)(n.A.Label,{children:v}),(0,r.jsx)(n.A.Control,{as:"textarea",rows:"6",placeholder:"Reasons"===v?"Enter your reason, why you want to reject the leave ?":"Enter your feedback, why you want to reject?",onChange:e=>{p(e.target.value)},required:!0})]}),(0,r.jsx)("div",{className:"text-center",children:(0,r.jsx)(i.A,{variant:"transparent",className:"main-btn px-4",onClick:e=>{let a;a="Reasons"===v?h:{status:"ended",end_reason:h},o(e,a)},disabled:0===(null===h||void 0===h?void 0:h.length),children:c?(0,r.jsx)(d.A,{}):x})})]})]})]})}},80275:(e,a,t)=>{t.r(a),t.d(a,{default:()=>L});var l=t(65043),s=t(5328),n=t(92843),i=t(61072),d=t(78602),r=t(14282),o=t(86347),c=t(45394),m=t(6720),v=(t(29212),t(24858)),x=t(83003),h=t(13368),p=t(74117),j=t(86178),u=t.n(j),N=t(1071),b=t(25543),f=(t(11808),t(33012)),A=(t(98394),t(82476)),g=t(82966),y=t(73722),w=t(70579);const _=e=>{let{allContracts:a,handleRange:t,id:s,selectionRange:n,setSelectionRange:r,smallLoader:c,start_date:m,end_date:j}=e;const{register:u,handleSubmit:f,setValue:A,reset:g,formState:{errors:_}}=(0,v.mN)({}),{leaveDetails:D}=(0,x.d4)((e=>e.developerData)),L=new Date,{t:S}=(0,p.Bd)(),C=(0,x.wA)(),k=localStorage.getItem("userId"),[Y,M]=(0,l.useState)({status:!1,leaveId:""});(0,l.useEffect)((()=>{const e=D.find((e=>e.id==s));e&&(r({startDate:new Date(e.start_date),endDate:new Date(e.end_date),key:"selection"}),M({status:!0,leaveId:s}),A("client_name",null===e||void 0===e?void 0:e.contract_id),A("leave_type",null===e||void 0===e?void 0:e.type),A("reason",null===e||void 0===e?void 0:e.reason_for_leave))}),[s]);return(0,w.jsxs)(i.A,{className:"gx-4",children:[(0,w.jsx)(d.A,{lg:7,children:(0,w.jsx)("div",{className:"leave-calendar h-100",children:(0,w.jsx)(o.Ur,{ranges:[n],onChange:t,minDate:L})})}),(0,w.jsx)(d.A,{lg:5,children:(0,w.jsxs)("div",{className:"plan-leave-wrapper",children:[(0,w.jsx)("h3",{className:"section-head border-0 mb-3",children:"Apply Leave"}),(0,w.jsxs)("form",{onSubmit:f((async e=>{let a={contract_id:+e.client_name,start_date:m,end_date:j,start_time:null,end_time:null,type:e.leave_type,reason_for_leave:e.reason};!0===(null===Y||void 0===Y?void 0:Y.status)?await C((0,h.Hv)(null===Y||void 0===Y?void 0:Y.leaveId,a)):await C((0,h.w_)(a));C((0,h.yD)(k,{approval_status:"Under Approval"})),M({status:!1,leaveId:""}),g(),r({startDate:new Date,endDate:new Date,key:"selection"})})),noValidate:!0,children:[(0,w.jsxs)("div",{className:"mb-4",children:[(0,w.jsx)(y.A.Label,{className:"mb-2 font-14",children:"Select Client"}),(0,w.jsxs)(y.A.Select,{className:"common-field font-14 mb-4",...u("client_name",{required:S("clientNameRequired")}),defaultValue:"",children:[(0,w.jsx)("option",{value:"",disabled:!0,children:"Select client"}),null===a||void 0===a?void 0:a.map(((e,a)=>{var t;return(0,w.jsx)("option",{value:null===e||void 0===e?void 0:e.id,children:null===e||void 0===e||null===(t=e.client)||void 0===t?void 0:t.name},a)}))]}),_.client_name&&(0,w.jsx)("span",{className:"error-message",children:_.client_name.message})]}),(0,w.jsxs)("div",{className:"mb-4",children:[(0,w.jsx)(y.A.Label,{className:"mb-2 font-14",children:"Leave Type"}),(0,w.jsxs)(y.A.Select,{className:"common-field font-10 mb-4",...u("leave_type",{required:S("leaveTypeRequired")}),defaultValue:"",children:[(0,w.jsx)("option",{value:"",disabled:!0,children:"Select leave type"}),b.t6.map(((e,a)=>(0,w.jsx)("option",{value:e.value,children:e.key},a)))]}),_.leave_type&&(0,w.jsx)("span",{className:"error-message",children:_.leave_type.message})]}),(0,w.jsxs)("div",{className:"mb-4",children:[(0,w.jsx)(y.A.Label,{className:"mb-2 font-14",children:"Reason"}),(0,w.jsx)(y.A.Control,{as:"textarea",rows:"3",className:"common-field font-14",placeholder:"Enter Reason",...u("reason",{required:{value:!0,message:S("reasonRequired")}})}),_.reason&&(0,w.jsx)("span",{className:"error-message",children:_.reason.message})]}),(0,w.jsx)("div",{className:"text-center",children:(0,w.jsx)(N.A,{type:"submit",text:S("Submit"),className:"main-btn font-14 px-4 py-2",variant:"transparent",isLoading:c})})]})]})})]})};var D=t(31404);const L=()=>{const[e,a]=(0,l.useState)({startDate:new Date,endDate:new Date,key:"selection"}),{screenLoader:t,leaveDetails:o,allContracts:j,holidayList:y,smallLoader:L}=(0,x.d4)((e=>e.developerData)),[S,C]=(0,l.useState)(),[k,Y]=(0,l.useState)(null),{handleSubmit:M,register:I,setValue:R,reset:E,formState:{errors:K}}=(0,v.mN)({}),P=(0,x.wA)(),{t:q}=(0,p.Bd)(),[H,F]=(0,l.useState)("first"),B=(new Date,u()(null===e||void 0===e?void 0:e.startDate).format("MM-DD-YYYY")),T=u()(null===e||void 0===e?void 0:e.endDate).format("MM-DD-YYYY"),V=localStorage.getItem("userId");(0,l.useEffect)((()=>{P((0,h.sq)())}),[]),(0,l.useEffect)((()=>{let e;"first"===H&&(e={approval_status:"Under Approval"}),P((0,h.yD)(V,e)),P((0,h.Hh)())}),[H]);const[U,$]=(0,l.useState)(new Date),G=(e=>{const a=null===e||void 0===e?void 0:e.map((e=>new Date(null===e||void 0===e?void 0:e.date)));return a})(y);return(0,w.jsxs)(w.Fragment,{children:[t?(0,w.jsx)(A.A,{}):(0,w.jsxs)(s.A.Container,{defaultActiveKey:"plan-leave",children:[(0,w.jsxs)(n.A,{variant:"pills",className:"mb-4 application-pills",children:[(0,w.jsx)(n.A.Item,{className:"application-item",children:(0,w.jsx)(n.A.Link,{className:"application-link",eventKey:"plan-leave",children:"Plan Leave"})}),(0,w.jsx)(n.A.Item,{className:"application-item",children:(0,w.jsx)(n.A.Link,{className:"application-link",eventKey:"public-holiday",children:"Public Holiday"})})]}),(0,w.jsxs)(s.A.Content,{children:[(0,w.jsx)(s.A.Pane,{eventKey:"plan-leave",children:(0,w.jsxs)(s.A.Container,{id:"left-tabs-example",defaultActiveKey:"first",onSelect:e=>{F(e)},children:[(0,w.jsxs)(n.A,{variant:"pills",className:"mb-4 application-pills",children:[(0,w.jsx)(n.A.Item,{className:"application-item",children:(0,w.jsx)(n.A.Link,{className:"application-link",eventKey:"first",children:"Apply Leave"})}),(0,w.jsx)(n.A.Item,{className:"application-item",children:(0,w.jsx)(n.A.Link,{className:"application-link",eventKey:"second",children:"Leave History"})})]}),(0,w.jsxs)(s.A.Content,{children:[(0,w.jsxs)(s.A.Pane,{eventKey:"first",children:[(0,w.jsxs)("div",{className:"card-box mb-4",children:[(0,w.jsx)("h3",{className:"section-head border-0 mb-2",children:"Applied Leaves"}),(0,w.jsx)(i.A,{children:o.length>0?null===o||void 0===o?void 0:o.map(((e,a)=>(0,w.jsx)(d.A,{xxl:3,xl:6,className:"mb-xxl-0 mb-3",children:(0,w.jsxs)("div",{className:"leave-wrapper-box",children:[(0,w.jsxs)("div",{children:[(0,w.jsx)("h4",{className:"project-heading"}),(0,w.jsx)("h4",{className:"leave-type-heading",children:(0,b.r$)(null===e||void 0===e?void 0:e.type)}),(0,w.jsx)("div",{children:(0,w.jsxs)("p",{className:"leave-date",children:[u()(null===e||void 0===e?void 0:e.start_date).format("MM-DD-YYYY"),"to",u()(null===e||void 0===e?void 0:e.end_date).format("MM-DD-YYYY")]})}),(0,w.jsx)("p",{className:"status-finished mb-0",children:null===e||void 0===e?void 0:e.approval_status})]}),(0,w.jsxs)("div",{className:"d-flex gap-3",children:[(0,w.jsx)(f.A,{text:"Cancel Leave",children:(0,w.jsx)(N.A,{className:"px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none",onClick:()=>(async(e,a)=>{C(a),await P((0,h.MX)(e,{withdrawal_reason:"reason"})),P((0,h.yD)(V,{approval_status:"Under Approval"}))})(null===e||void 0===e?void 0:e.id,a),isLoading:S===a&&L,children:(0,w.jsx)(c.$8F,{})})}),(0,w.jsx)(f.A,{text:"Edit Leave",children:(0,w.jsx)(r.A,{className:"px-3 mb-2 arrow-btn info-arrow font-16 text-decoration-none",onClick:()=>Y(null===e||void 0===e?void 0:e.id),children:(0,w.jsx)(m.$Sw,{})})})]})]})}))):(0,w.jsx)("p",{className:"text-muted font-14 mb-0",children:"No Leave Applied"})})]}),(0,w.jsx)(_,{allContracts:j,handleRange:e=>{a(e.selection)},selectionRange:e,setSelectionRange:a,smallLoader:L,id:k,start_date:B,end_date:T})]}),(0,w.jsx)(s.A.Pane,{eventKey:"second",children:(0,w.jsx)("div",{className:"table-responsive",children:(0,w.jsxs)("table",{className:"table time-table table-bordered table-ui-custom",children:[(0,w.jsxs)("thead",{children:[(0,w.jsx)("th",{className:"time-table-head text-start",children:"Leave Type"}),(0,w.jsx)("th",{className:"time-table-head text-start",children:"Leave Date"}),(0,w.jsx)("th",{className:"time-table-head text-start",children:"Reason"}),(0,w.jsx)("th",{className:"time-table-head text-start",children:"Project"}),(0,w.jsx)("th",{className:"time-table-head text-start",children:"Client Name"}),(0,w.jsx)("th",{className:"time-table-head text-start",children:"Leave Status"})]}),(0,w.jsx)("tbody",{children:null===o||void 0===o?void 0:o.map(((e,a)=>{var t,l;return(0,w.jsx)(w.Fragment,{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)("td",{className:"time-table-data text-start",children:(0,w.jsx)("h4",{className:"leave-type-heading mb-0 white-nowrap",children:(0,b.r$)(null===e||void 0===e?void 0:e.type)})}),(0,w.jsx)("td",{className:"time-table-data text-start",children:(0,w.jsxs)("p",{className:"leave-date white-nowrap",children:[u()(e.start_date).format("MM-DD-YYYY"),"to",u()(e.end_date).format("MM-DD-YYYY")]})}),(0,w.jsx)("td",{className:"time-table-data text-start reason-data",children:(0,w.jsx)("p",{className:"font-14 mb-0",children:e.reason_for_leave})}),(0,w.jsx)("td",{className:"time-table-data text-start white-nowrap",children:"AI Bot Project"}),(0,w.jsx)("td",{className:"time-table-data text-start",children:(0,w.jsx)("div",{className:"d-flex align-items-center gap-2",children:null===e||void 0===e||null===(t=e.contract)||void 0===t||null===(l=t.client)||void 0===l?void 0:l.name})}),(0,w.jsx)("td",{className:"time-table-data text-start",children:(0,w.jsx)("span",{className:"status-progress",children:e.approval_status})})]})})}))})]})})})]})]})}),(0,w.jsx)(s.A.Pane,{eventKey:"public-holiday",children:(0,w.jsx)(g.A,{onChange:$,value:U,tileContent:e=>{let{date:a,view:t}=e;return"month"===t&&G.find((e=>e.toDateString()===a.toDateString()))?(0,w.jsx)("div",{className:"dot"}):null},holidayList:y})})]})]}),(0,w.jsx)(D.A,{heading:"Guiding You Through: Helpful Text to Apply Leaves",guideLines:b.mg})]})}}}]);
//# sourceMappingURL=275.a83e5234.chunk.js.map