"use strict";(self.webpackChunkrexett=self.webpackChunkrexett||[]).push([[1997],{12751:(e,l,s)=>{s.d(l,{A:()=>n});var o=s(65043),a=s(73722),t=s(24858),r=s(2364);var i=s(70579);const n=e=>{var l;let{control:s,name:n,errors:d,options:u,required:c,label:m,type:v}=e;const[p,b]=(0,o.useState)([]);return(0,o.useEffect)((()=>{const e=((e,l)=>{console.log(e,"options inside countries select");let s=[];return s="timezones"===l?null===e||void 0===e?void 0:e.map((e=>({label:e,value:e}))):null===e||void 0===e?void 0:e.map((e=>{let{name:s,code:o,isoCode:a}=e;return{label:s,value:"country"===l?o:a}})),s})(u,v);b(e)}),[u]),(0,i.jsxs)(a.A.Group,{className:"mb-3",children:[(0,i.jsxs)(a.A.Label,{className:"common-label",children:[m,c&&"*"]}),(0,i.jsx)(t.xI,{name:n,control:s,rules:{required:{value:!!c,message:c}},render:e=>{let{field:l}=e;return(0,i.jsx)(r.Ay,{className:"common-field",...l,options:p})}}),d[n]&&(0,i.jsx)("p",{className:"error-message",children:null===(l=d[n])||void 0===l?void 0:l.message})]})}},75112:(e,l,s)=>{s.d(l,{A:()=>A});var o=s(65043),a=s(61072),t=s(78602),r=s(73722),i=s(60184),n=s(3538),d=s(83003),u=s(74117),c=s(4970),m=s(13368),v=s(82476),p=s(1071),b=s(16713),h=s(75210),x=s(22630);var f=s(24858),y=s(12751),j=(s(37194),s(70579));const A=e=>{var l;let{role:s}=e;const A=localStorage.getItem("userId"),[_,g]=(0,o.useState)(null),[w,N]=(0,o.useState)(!1),[P,q]=(0,o.useState)(!1),{allTimeZones:S,countriesList:F,statesList:C,citiesList:z,timeZones:L}=(0,d.d4)((e=>e.clientData)),{t:k}=(0,u.Bd)(),{register:T,setValue:I,watch:D,control:E,handleSubmit:Z,formState:{errors:V,isDirty:$,isValid:B,isSubmitting:G}}=(0,f.mN)({}),H=(0,d.wA)(),[K,M]=(0,o.useState)(!1),[O,R]=(0,o.useState)("inactive"),[Y,Q]=(0,o.useState)({firstPass:!1,secondPass:!1}),[U,X]=(0,o.useState)(null),{smallLoader:J,userProfileDetails:W,screenLoader:ee}=(0,d.d4)((e=>e.developerData)),le="AIzaSyABX4LTqTLQGg_b3jFOH8Z6_H5CDqn8tbc";(0,o.useEffect)((()=>{let e=(e=>({developer:"developer/get-profile",admin:"admin/profile",client:"client/get-profile"}[e]))(s);H((0,m.i7)(e)),H((0,c.Zg)())}),[H]),(0,o.useEffect)((()=>{var e,l,s;null!==(e=D("country"))&&void 0!==e&&e.value&&(H((0,c.tM)(null===(l=D("country"))||void 0===l?void 0:l.value)),H((0,c.HM)(null===(s=D("country"))||void 0===s?void 0:s.value)),I("time_zone",null),I("state",null))}),[D("country")]),(0,o.useEffect)((()=>{var e,l,s;null!==(e=D("state"))&&void 0!==e&&e.value&&(H((0,c.YF)(null===(l=D("country"))||void 0===l?void 0:l.value,null===(s=D("state"))||void 0===s?void 0:s.value)),I("city",null))}),[D("state")]),(0,o.useEffect)((()=>{var e,l,s,o,a,t,r,i,n,d,u,c,m;null!==W&&void 0!==W&&W.data&&(I("name",null===W||void 0===W||null===(e=W.data)||void 0===e?void 0:e.name),I("email",null===W||void 0===W||null===(l=W.data)||void 0===l?void 0:l.email),I("phone_number",null===W||void 0===W||null===(s=W.data)||void 0===s?void 0:s.phone_number),I("address",null===W||void 0===W||null===(o=W.data)||void 0===o?void 0:o.address),I("address_2",null===W||void 0===W||null===(a=W.data)||void 0===a?void 0:a.address_2),I("city",{label:null===W||void 0===W||null===(t=W.data)||void 0===t?void 0:t.city,value:null}),I("country",{label:null===W||void 0===W||null===(r=W.data)||void 0===r?void 0:r.country,value:null}),I("passcode",null===W||void 0===W||null===(i=W.data)||void 0===i?void 0:i.passcode),I("time_zone",{label:null===W||void 0===W||null===(n=W.data)||void 0===n?void 0:n.time_zone,value:null===W||void 0===W||null===(d=W.data)||void 0===d?void 0:d.time_zone}),I("state",{label:null===W||void 0===W||null===(u=W.data)||void 0===u?void 0:u.state,value:null}),null!==W&&void 0!==W&&null!==(c=W.data)&&void 0!==c&&c.is_2FA_enabled?I("is_2FA_enabled",null===W||void 0===W||null===(m=W.data)||void 0===m?void 0:m.is_2FA_enabled):I("is_2FA_enabled",!1))}),[W]);const se=e=>{if(""===e)return!0;if(!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(e))return"Password must contain at least a symbol, upper and lower case letters and a number";return!0},oe=()=>N(!1);return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)("div",{children:ee?(0,j.jsx)(v.A,{}):(0,j.jsxs)("form",{onSubmit:Z((e=>{let l=(e=>({developer:"common/update-profile/",admin:"admin/update-profile",client:"client/update-profile/"}[e]))(s),o=new FormData,a=new FormData;for(const s in e)o.append(s,e[s]);if(a.append("file",U),null==U){var t,r,i,n,d;let s={...e,user_id:A,country:null===e||void 0===e||null===(t=e.country)||void 0===t?void 0:t.label,country_iso_code:null===e||void 0===e?void 0:e.country.value,state:null===e||void 0===e||null===(r=e.state)||void 0===r?void 0:r.label,state_iso_code:null===e||void 0===e||null===(i=e.state)||void 0===i?void 0:i.value,time_zone:null===e||void 0===e||null===(n=e.time_zone)||void 0===n?void 0:n.label,city:null===e||void 0===e||null===(d=e.city)||void 0===d?void 0:d.label};H((0,m.Vk)(s,l))}else H((0,c.C7)(a,(s=>{var o,a,t,r,i;let n={...e,profile_picture:s,user_id:A,country:null===e||void 0===e||null===(o=e.country)||void 0===o?void 0:o.label,country_iso_code:null===e||void 0===e?void 0:e.country.value,state:null===e||void 0===e||null===(a=e.state)||void 0===a?void 0:a.label,state_iso_code:null===e||void 0===e||null===(t=e.state)||void 0===t?void 0:t.value,time_zone:null===e||void 0===e||null===(r=e.time_zone)||void 0===r?void 0:r.label,city:null===e||void 0===e||null===(i=e.city)||void 0===i?void 0:i.label};H((0,m.Vk)(n,l))})))})),noValidate:!0,children:[(0,j.jsxs)(a.A,{className:"mb-4",children:[(0,j.jsxs)(t.A,{md:"12",className:"mb-3",children:[(0,j.jsx)("h5",{className:"fw-semibold mb-3",children:"Security"}),(0,j.jsx)(r.A.Group,{className:"mb-3",children:(0,j.jsxs)(a.A,{className:"gx-4",children:[(0,j.jsxs)(t.A,{md:8,children:[(0,j.jsx)(r.A.Label,{className:"common-label font-16 fw-semibold mb-0",children:"Enable Two Factor Authentication"}),(0,j.jsx)("p",{className:"font-14 mb-0",children:"Two-Factor Authentication (2FA) is a security process in which users provide two different authentication factors to verify their identity. This method adds an additional layer of security, making it more difficult for unauthorized individuals to access your accounts."})]}),(0,j.jsx)(t.A,{md:4,children:(0,j.jsx)("div",{class:"form-check form-switch toggle-switch-wrapper",children:(0,j.jsx)(f.xI,{name:"is_2FA_enabled",control:E,render:e=>{let{field:l}=e;return(0,j.jsx)("input",{...l,onChange:e=>{(e=>{const{checked:l}=null===e||void 0===e?void 0:e.target;N(!w),q(l)})(e)},checked:!0===D("is_2FA_enabled"),class:"form-check-input toggle-switch-custom",type:"checkbox",role:"switch"})}})})})]})})]}),(0,j.jsx)(t.A,{md:"12",children:(0,j.jsx)("h5",{className:"fw-semibold mb-3",children:"Personal Information"})}),(0,j.jsx)(t.A,{md:"6",children:(0,j.jsxs)("div",{className:"inner-form",children:[(0,j.jsx)(h.A,{label:k("clientName")+" *",name:"name",control:E,rules:{required:"Name is required"},error:V.name}),(0,j.jsx)(h.A,{label:k("email")+" *",name:"email",control:E,rules:{required:"Email is required",pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:"Invalid email format"}},error:V.email,readOnly:!0}),(0,j.jsx)(h.A,{label:k("previousPassword"),name:"previous_password",control:E,type:Y.firstPass?"text":"password",rules:{validate:se},error:V.previous_password,isPassword:!0,onTogglePassword:()=>Q({...Y,firstPass:!Y.firstPass}),icon:(0,j.jsx)(i.Ny1,{})}),(0,j.jsx)(h.A,{label:k("newPassword"),name:"password",control:E,type:Y.secondPass?"text":"password",rules:{validate:se},error:V.password,isPassword:!0,onTogglePassword:()=>Q({...Y,secondPass:!Y.secondPass}),icon:(0,j.jsx)(i.Ny1,{})}),(0,j.jsx)(x.A,{label:k("address")+" *",name:"address",control:E,rules:{required:"Address is required"},error:V.address,apiKey:le,onPlaceSelected:e=>{I("address",e.formatted_address)},onChange:e=>{I("address",e.target.value)},options:{types:["establishment","geocode"]},r:!0}),(0,j.jsx)(x.A,{label:k("address")+" 2",name:"address_2",control:E,rules:{required:!1},error:V.address_2,apiKey:le,onPlaceSelected:e=>{I("address_2",e.formatted_address)},onChange:e=>{I("address_2",e.target.value)},options:{types:["establishment","geocode"]}})]})}),(0,j.jsx)(t.A,{md:"6",children:(0,j.jsxs)("div",{children:[(0,j.jsx)(h.A,{label:k("phone")+"*",name:"phone_number",control:E,type:"text",rules:{required:"Phone Number is required",pattern:{value:/^[0-9]{10}$/,message:"Please enter a valid phone number"}},error:V.phone_number}),(0,j.jsx)(y.A,{name:"country",errors:V,control:E,required:"Country is required",label:"Country",type:"country",options:F}),(0,j.jsx)(y.A,{name:"state",errors:V,control:E,required:"State is required",label:"State",type:"state",options:C}),(0,j.jsx)(y.A,{name:"city",errors:V,control:E,label:"City",type:"city",options:z}),(0,j.jsx)(y.A,{name:"time_zone",errors:V,type:"timezones",control:E,options:L,required:"Time zone is required",label:"Time Zone"}),(0,j.jsx)(h.A,{label:k("postCode")+"*",name:"passcode",control:E,rules:{required:"Postcode is required",pattern:{value:/^[0-9]+$/,message:"Postcode should only contain numbers"}},error:V.passcode}),(0,j.jsx)(r.A.Label,{children:"Image*"}),(0,j.jsxs)(r.A.Label,{htmlFor:"developer-image",className:"upload-image-label d-block",children:[(0,j.jsx)(n.pT4,{}),k("uploadImage")]}),(0,j.jsx)(f.xI,{name:"profile_picture",control:E,rules:{required:!1},render:e=>{let{field:l}=e;return(0,j.jsx)("input",{...l,id:"developer-image",className:"visually-hidden common-field",type:"file",accept:"image/*",onChange:e=>(e=>{const l=e.target.files[0];if(X(l),l){const e=new FileReader;e.onloadend=()=>{g(e.result)},e.readAsDataURL(l)}})(e)})}}),(0,j.jsx)("div",{children:(0,j.jsx)("img",{src:_||(null===W||void 0===W||null===(l=W.data)||void 0===l?void 0:l.profile_picture),alt:"Selected",className:"uploaded-image"})})]})})]}),(0,j.jsx)("div",{className:"text-center",children:(0,j.jsx)(p.A,{type:"submit",text:k("updateProfile"),className:"main-btn px-5",variant:"transparent",disabled:J,isLoading:J})})]})}),(0,j.jsx)(b.A,{show:K,handleClose:()=>{R(!O),M(!1)},onClick:()=>{let e={user_id:+A,status:O};H((0,c.Ts)(e))},smallLoader:J,text:"Are you sure, you want to disable your account"}),w&&(0,j.jsx)(b.A,{show:w,handleClose:oe,handleAction:()=>{I("is_2FA_enabled",P),oe()},smallLoader:J,text:"Are you sure, you want to ".concat(P?"enable":"disable"," two factor authentication")})]})}},33027:(e,l,s)=>{s.d(l,{A:()=>t});s(65043);var o=s(74117),a=s(70579);const t=e=>{let{children:l}=e;const{t:s}=(0,o.Bd)();return(0,a.jsxs)("section",{className:"card-box",children:[(0,a.jsx)("div",{className:"d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey",children:(0,a.jsx)("h2",{className:"section-head-sub mb-0 border-0",children:s("updateYourProfile")})}),l]})}},1997:(e,l,s)=>{s.r(l),s.d(l,{default:()=>r});s(65043);var o=s(75112),a=s(33027),t=s(70579);const r=()=>(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(a.A,{children:(0,t.jsx)(o.A,{role:"developer"})})})}}]);
//# sourceMappingURL=1997.763216fe.chunk.js.map