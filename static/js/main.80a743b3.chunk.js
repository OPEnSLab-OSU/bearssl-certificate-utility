(this["webpackJsonpbearssl-certificate-utility"]=this["webpackJsonpbearssl-certificate-utility"]||[]).push([[0],{13:function(t,e,n){},14:function(t,e,n){},15:function(t,e,n){"use strict";n.r(e);var i=n(0),s=n(1),a=n.n(s),o=n(7),r=n.n(o),c=(n(13),n(2)),h=n(3),u=n(5),l=n(4),d=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(){var t;Object(c.a)(this,n);for(var i=arguments.length,s=new Array(i),a=0;a<i;a++)s[a]=arguments[a];return(t=e.call.apply(e,[this].concat(s))).handleChange=function(e){var n={};n[e.target.id]=e.target.value,t.props.onChange(n)},t}return Object(h.a)(n,[{key:"render",value:function(){var t=this,e=Object.entries(this.props.inputs).map((function(e,n){return Object(i.jsxs)("div",{children:[Object(i.jsx)("label",{htmlFor:e[0],children:t.props.descriptions[n]||e[0]}),Object(i.jsx)("input",{id:e[0],type:"text",value:e[1],onChange:t.handleChange})]},e[0])}));return this.props.legend?Object(i.jsxs)("fieldset",{children:[Object(i.jsx)("legend",{children:this.props.legend}),e]}):Object(i.jsx)("div",{children:e})}}]),n}(a.a.Component),p=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).click_index=void 0,i.input_error=void 0,i.state={header:null,error:null},i.click_index=i.props.click_index,i.input_error=null,i}return Object(h.a)(n,[{key:"fetchHeaderForDomains",value:function(){var t=this;if(this.props.domains.length<=0)return Promise.resolve();var e=this.props.domains.map((function(t){return"domain=".concat(t)})).concat(Object.entries(this.props.options).map((function(t){return"".concat(t[0],"=").concat(t[1])}))).join("&"),n="https://certutil.prototypical.pro/getheader?".concat(e);return fetch(n).then((function(t){return t.json()})).catch((function(e){console.error(e),t.setState({header:null,error:e.message})})).then((function(e){t.setState({header:e,error:null})}))}},{key:"render",value:function(){return this.props.click_index===this.click_index||(this.click_index=this.props.click_index,this.input_error=null,this.props.domains&&0!==this.props.domains.length||(this.input_error="Please add at least one valid domain!"),this.props.options&&!Object.values(this.props.options).some((function(t){return!t}))||(this.input_error="Please input non-emptey header options."),Object.values(this.props.options).some((function(t){return!!t.match(/\s|-/)}))&&(this.input_error="Varible names cannot contain dashes or spaces."),this.input_error)?this.input_error?n.msgDiv(this.input_error):this.state.error?n.msgDiv("Error: ".concat(this.state.error)):this.state.header?Object(i.jsxs)("div",{children:[Object(i.jsxs)("p",{children:[this.state.header.invalid_domains.length>0?"Invalid Domains: ".concat(this.state.header.invalid_domains.join(", ")):null,Object(i.jsx)("br",{})]}),Object(i.jsx)("textarea",{rows:(this.state.header.header.match(/\n/g)||"").length+5,cols:80,readOnly:!0,value:this.state.header.header})]}):n.msgDiv("Please add some domains, and click submit!"):(this.fetchHeaderForDomains(),n.msgDiv("Generating header..."))}}],[{key:"msgDiv",value:function(t){return Object(i.jsx)("div",{children:Object(i.jsx)("p",{className:"msg",children:t})})}}]),n}(a.a.Component),m=(n(14),function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).state={domain_input:{domain:"www.google.com, www.amazon.com"},valid_domains:["www.google.com","www.amazon.com"],options:{array_name:"TAs",length_name:"TAs_NUM",guard_name:"CERTIFICATES"},submit_count:0},i}return Object(h.a)(n,[{key:"onSubmit",value:function(t){this.setState((function(t){return{submit_count:t.submit_count+1}})),t.preventDefault()}},{key:"onOptionsChange",value:function(t){this.setState({options:Object.assign({},this.state.options,t)})}},{key:"onDomainChange",value:function(t){this.setState({domain_input:t,valid_domains:t.domain.split(",").map((function(t){return t.trim()})).filter((function(t){return n.validateDomain(t)}))})}},{key:"render",value:function(){return Object(i.jsxs)("div",{className:"App",children:[Object(i.jsxs)("form",{onSubmit:this.onSubmit.bind(this),children:[Object(i.jsx)(d,{inputs:this.state.domain_input,descriptions:["Domains To Include"],onChange:this.onDomainChange.bind(this)}),Object(i.jsx)(d,{legend:"Header Customization Options",inputs:this.state.options,descriptions:["Name For Trust Anchor Array Varible","Name For Array Length Varible","Name For The Header Guard (Usually Caps)"],onChange:this.onOptionsChange.bind(this)}),Object(i.jsx)("input",{type:"submit",value:"Submit"})]}),Object(i.jsx)("p",{children:"Domains: ".concat(this.state.valid_domains.join(", "))}),Object(i.jsx)(p,{click_index:this.state.submit_count,domains:this.state.valid_domains,options:this.state.options})]})}}],[{key:"validateDomain",value:function(t){return t.length>0&&t.length<=255&&!!/^((?:(?:(?:\w[.\-+]?)*)\w)+)((?:(?:(?:\w[.\-+]?){0,62})\w)+)\.(\w{2,6})$/.exec(t)}}]),n}(a.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(Object(i.jsx)(m,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[15,1,2]]]);
//# sourceMappingURL=main.80a743b3.chunk.js.map