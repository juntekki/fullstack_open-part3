(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{21:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n(1),c=n.n(r),i=n(15),a=n.n(i),u=(n(21),n(6)),s=n(4),l=function(e){var t=e.person,n=e.handleDeletePerson;return Object(o.jsxs)("li",{children:[t.name,", ",t.number,Object(o.jsx)("button",{onClick:n,children:"Poista"})]})},j=function(e){var t=e.filter,n=e.persons,r=e.handleDeletePerson;return Object(o.jsx)("ul",{children:n.filter((function(e){return e.name.toUpperCase().includes(t.toUpperCase())})).map((function(e){return Object(o.jsx)(l,{name:e.name,id:e.id,person:e,handleDeletePerson:r(e.name,e.id)},e.name)}))})},d=function(e){var t=e.filter,n=e.onFilterChange;return Object(o.jsxs)("p",{children:["Filter names ",Object(o.jsx)("input",{value:t,onChange:n})]})},f=n(3),b=n.n(f),h="http://localhost:3001/api/persons",m=function(e){return e.then((function(e){return e.data}))},p=function(e){return m(b.a.post(h,e))},O=function(e,t){return m(b.a.put("".concat(h,"/").concat(e),t))},x=function(e){return b.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},g=function(e){var t=e.message;if(null===t)return null;var n={"border-color":t.isError?"red":"green",fontSize:"16px",borderStyle:"solid",borderRadius:"3px",padding:"10px",marginBottom:"5px"};return Object(o.jsx)("div",{style:n,children:t.content})},v=function(){var e=Object(r.useState)(null),t=Object(s.a)(e,2),n=t[0],c=t[1],i=Object(r.useState)([]),a=Object(s.a)(i,2),l=a[0],f=a[1],h=Object(r.useState)(""),m=Object(s.a)(h,2),v=m[0],E=m[1],k=Object(r.useState)(""),w=Object(s.a)(k,2),P=w[0],S=w[1],C=Object(r.useState)(""),y=Object(s.a)(C,2),D=y[0],F=y[1];Object(r.useEffect)((function(){b.a.get("http://localhost:3001/api/persons").then((function(e){f(e.data)}))}),[]);var B=function(e){console.log("menn\xe4\xe4nk\xf6 t\xe4nne kuitenki");var t=l.find((function(t){return t.name===e})),n=Object(u.a)(Object(u.a)({},t),{},{number:P});O(n.id,n).then((function(e){f(l.map((function(n){return n.id!==t.id?n:e}))),c({content:"P\xe4ivitetty ".concat(n.name,"."),isError:!1})})).catch((function(t){"Request failed with status code 404"===t.message?c({content:"".concat(e," tiedot on jo poistettu"),isError:!0}):(console.log("error message: "+t.message),c({content:t.response.data.error,isError:!0}))}))},J=function(){p({name:v,number:P}).then((function(e){f(l.concat(e)),c({content:"Luotu ".concat(e.name,"."),isError:!1})})).catch((function(e){c({content:e.response.data.error,isError:!0})})),E(""),S("")};return Object(o.jsxs)("div",{children:[Object(o.jsx)(d,{filter:D,onFilterChange:function(e){return F(e.target.value)}}),Object(o.jsx)("h2",{children:"Puhelinluettelo"}),Object(o.jsx)(g,{message:n}),Object(o.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),l.some((function(e){return e.name===v})))return console.log("On jo listassa"),E(""),S(""),window.confirm("".concat(v," on jo listassa, p\xe4ivitet\xe4\xe4nk\xf6 numero?"))?B(v):window.alert("Ei muutoksia");var t={name:v,num:P,id:l.length+1};J(),f(l.concat(t)),E(""),S("")},children:[Object(o.jsxs)("div",{children:["nimi:",Object(o.jsx)("input",{value:v,onChange:function(e){console.log(e.target.value),E(e.target.value)}})]}),Object(o.jsxs)("div",{children:["numero:",Object(o.jsx)("input",{value:P,onChange:function(e){console.log(e.target.value),S(e.target.value)}})]}),Object(o.jsx)("div",{children:Object(o.jsx)("button",{type:"submit",children:"add"})})]}),Object(o.jsx)("h2",{children:"Numerot"}),Object(o.jsx)("ul",{children:Object(o.jsx)(j,{filter:D,persons:l,handleDeletePerson:function(e,t){return function(){window.confirm("Poistetaanko ".concat(e," ?"))&&(x(t).then((function(){f(l.filter((function(e){return e.id!==t}))),c({content:"Poistettu ".concat(e,"."),isError:!1}),E(""),S("")})).catch((function(t){f(l.filter((function(t){return t.name!==e}))),c({content:"".concat(e," on jo poistettu."),isError:!0})})),setTimeout((function(){c(null)}),3e3))}}})})]})};a.a.render(Object(o.jsx)(c.a.StrictMode,{children:Object(o.jsx)(v,{})}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.24e7d79b.chunk.js.map