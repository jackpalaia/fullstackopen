(this.webpackJsonptesting=this.webpackJsonptesting||[]).push([[0],{15:function(t,e,n){t.exports=n(38)},37:function(t,e,n){},38:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),c=n(14),r=n.n(c),u=n(4),i=n(2),l=function(t){var e=t.note,n=t.toggleImportance,a=e.important?"make not important":"make important";return o.a.createElement("li",{className:"note"},e.content,o.a.createElement("button",{onClick:n},a))},m=n(3),f=n.n(m),s=function(){return f.a.get("/api/notes").then((function(t){return t.data}))},p=function(t){return f.a.post("/api/notes",t).then((function(t){return t.data}))},d=function(t,e){return f.a.put("".concat("/api/notes","/").concat(t),e).then((function(t){return t.data}))},b=function(t){var e=t.message,n=t.type;return null===e?null:o.a.createElement("div",{className:n},e)},g=function(){var t=Object(a.useState)([]),e=Object(i.a)(t,2),n=e[0],c=e[1],r=Object(a.useState)(""),m=Object(i.a)(r,2),f=m[0],g=m[1],h=Object(a.useState)(!0),v=Object(i.a)(h,2),E=v[0],O=v[1],j=Object(a.useState)(null),S=Object(i.a)(j,2),k=S[0],y=S[1],w=Object(a.useState)(null),I=Object(i.a)(w,2),N=I[0],C=I[1];Object(a.useEffect)((function(){s().then((function(t){c(t)}))}),[]);var T=E?n:n.filter((function(t){return t.important}));return o.a.createElement("div",null,o.a.createElement("h1",null,"Notes"),o.a.createElement(b,{message:k,type:N}),o.a.createElement("button",{onClick:function(){return O(!E)}},"show ",E?"important":"all"),o.a.createElement("ul",null,T.map((function(t){return o.a.createElement(l,{key:t.id,note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),a=Object(u.a)(Object(u.a)({},e),{},{important:!e.important});d(t,a).then((function(e){c(n.map((function(n){return n.id===t?e:n}))),C("good"),y("note '".concat(e.content,"' importance changed to ").concat(e.important)),setTimeout((function(){y(null)}),3e3)})).catch((function(t){C("bad"),y("Note '".concat(e.content,"' was already removed from the server")),setTimeout((function(){y(null)}),3e3)})),c(n.filter((function(e){return e.id!==t})))}(t.id)}})}))),o.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:f,date:(new Date).toISOString(),important:Math.random()<.5};p(e).then((function(t){c(n.concat(t)),g(""),C("good"),y("note '".concat(t.content,"' added")),setTimeout((function(){y(null)}),3e3)}))}},o.a.createElement("input",{value:f,onChange:function(t){g(t.target.value)}}),o.a.createElement("button",{type:"submit"},"save")))};n(37);r.a.render(o.a.createElement(g,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.e7166cb6.chunk.js.map