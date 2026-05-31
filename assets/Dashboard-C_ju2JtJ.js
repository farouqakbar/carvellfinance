import{u as Me,e as Te,d as Pe,r as h,s as d,j as e,L as F}from"./index-JDpzkL5M.js";import{g as re,a as y,f as l}from"./formatCurrency-CwSiFA8N.js";import{T as De}from"./TransactionForm-CiTyQ8YE.js";import{i as p,C as Ee}from"./mandatoryCategories-COwJNLHy.js";import{C as Fe}from"./ConfirmModal-BMA07rxT.js";import{C as ne}from"./CurrencyInput-cZ9NXuyP.js";const $e=15;function qe(c){const[u,B]=c.split("-").map(Number),b=new Date(u,B-2,1);return`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}`}function $(c){const[u,B]=c.split("-").map(Number),b=new Date(u,B,1);return`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}`}function He(){const{user:c}=Me(),u=Te(),[B,b]=Pe(),[o,ie]=h.useState(re()),[t,oe]=h.useState({salary:0,totalExpense:0,totalIncome:0,categories:[],transactions:[],savings:[],savingsLogs:[],categorySpend:[],todayExpense:0,totalTabungan:0,nextMonthPlans:[]}),[j,H]=h.useState(!0),[le,w]=h.useState(!1),[G,O]=h.useState(""),[ce,N]=h.useState(!1),[de,M]=h.useState(!1),[x,f]=h.useState(null),[Y,v]=h.useState(!1),[T,q]=h.useState(null),[I,R]=h.useState(null);h.useEffect(()=>{k()},[o]);const U=a=>{ie(a),b({month:a})},k=async()=>{var a,s;H(!0);try{const i=`${o}-01`,m=`${o}-31`,g=new Date().toISOString().split("T")[0],_=$(o),[ae,ye,te,je,we,Ne,ke,_e,ze]=await Promise.all([d.from("salaries").select("*").eq("user_id",c.id).eq("month",o).maybeSingle(),d.from("transactions").select("*, categories(name, color, icon)").eq("user_id",c.id).gte("date",i).lte("date",m).order("date",{ascending:!1}),d.from("categories").select("*").eq("user_id",c.id).order("name"),d.from("savings").select("*").eq("user_id",c.id),d.from("savings_log").select("*").eq("user_id",c.id).eq("month",o),d.from("transactions").select("amount").eq("user_id",c.id).eq("date",g).eq("type","expense"),d.from("category_budgets").select("*").eq("user_id",c.id).eq("month",o),d.from("category_budgets").select("budget_limit, category_id").eq("user_id",c.id).lte("month",o),d.from("plans").select("*").eq("user_id",c.id).eq("target_month",_).eq("done",!1).order("created_at",{ascending:!0})]),D=ye.data||[],z={};(ke.data||[]).forEach(r=>{z[r.category_id]=Number(r.budget_limit)});const W=(te.data||[]).map(r=>({...r,budget_limit:z[r.id]!==void 0?z[r.id]:0,budget_set:z[r.id]!==void 0})),Ce=D.filter(r=>r.type==="expense").reduce((r,n)=>r+Number(n.amount),0),Se=D.filter(r=>r.type==="income").reduce((r,n)=>r+Number(n.amount),0),C={};D.filter(r=>r.type==="expense"&&r.categories).forEach(r=>{const n=r.categories.name;C[n]||(C[n]={name:n,amount:0,color:r.categories.color,icon:r.categories.icon}),C[n].amount+=Number(r.amount)});const Be=W.map(r=>{var E;const n=((E=C[r.name])==null?void 0:E.amount)||0,S=r.budget_limit>0?n/r.budget_limit*100:null;return{...r,spent:n,pct:S,overBudget:r.budget_limit>0&&n>r.budget_limit}}).sort((r,n)=>r.overBudget&&!n.overBudget?-1:!r.overBudget&&n.overBudget?1:(n.pct||0)-(r.pct||0));oe({salary:((a=ae.data)==null?void 0:a.amount)||0,totalExpense:Ce,totalIncome:Se,categories:Be,transactions:D.slice(0,5),savings:je.data||[],savingsLogs:we.data||[],todayExpense:(Ne.data||[]).reduce((r,n)=>r+Number(n.amount),0),totalTabungan:(_e.data||[]).filter(r=>{const n=W.find(S=>S.id===r.category_id);return n&&n.name==="Tabungan Bulanan"}).reduce((r,n)=>r+Number(n.budget_limit),0),categorySpend:Object.values(C).sort((r,n)=>n.amount-r.amount),nextMonthPlans:ze.data||[]});const se=((s=ae.data)==null?void 0:s.amount)||0;if(se>0){const r=W.filter(n=>p(n)&&z[n.id]===void 0);if(r.length>0){const n=Math.round(Number(se)*.15);await Promise.all(r.map(E=>d.from("category_budgets").upsert({user_id:c.id,category_id:E.id,month:o,budget_limit:n},{onConflict:"category_id,month"})));const{data:S}=await d.from("categories").select("*").eq("user_id",c.id).order("name");te.data=S}}}finally{H(!1)}},me=async()=>{const a=parseFloat(G);if(!a)return;await d.from("salaries").upsert({user_id:c.id,month:o,amount:a},{onConflict:"user_id,month"});const{data:s}=await d.from("category_budgets").select("category_id").eq("user_id",c.id).eq("month",o),i=new Set((s||[]).map(g=>g.category_id)),m=t.categories.filter(g=>p(g)&&!i.has(g.id));if(m.length>0){const g=Math.round(a*.15);await Promise.all(m.map(_=>d.from("category_budgets").upsert({user_id:c.id,category_id:_.id,month:o,budget_limit:g},{onConflict:"category_id,month"})))}u("Gaji disimpan","success"),w(!1),O(""),k()},J=a=>{const s=String(Math.round(a.budget_limit||0)),i=t.salary>0&&a.budget_limit>0?(a.budget_limit/t.salary*100).toFixed(1):"";f({id:a.id,nominal:s,pct:i})},pe=a=>{const s=parseFloat(a)||0,i=t.salary>0&&s>0?(s/t.salary*100).toFixed(1):"";f(m=>({...m,nominal:a,pct:i}))},Q=a=>{const s=parseFloat(a)||0,i=t.salary>0&&s>0?String(Math.round(s/100*t.salary)):"";f(m=>({...m,pct:a,nominal:i}))},he=async()=>{const a=parseFloat(x.nominal)||0;await d.from("category_budgets").upsert({user_id:c.id,category_id:x.id,month:o,budget_limit:a},{onConflict:"category_id,month"}),u("Budget disimpan","success"),f(null),k()},ge=async()=>{await d.from("categories").delete().eq("id",I.id),u("Kategori dihapus","success"),R(null),k()};t.categories.filter(a=>a.budget_limit>0).reduce((a,s)=>a+s.budget_limit,0);const xe=o===re(),V=t.categories.filter(a=>a.overBudget),ue=.15,be=t.categories.filter(a=>p(a)).reduce((a,s)=>{const i=s.budget_set?Number(s.budget_limit):t.salary>0?Math.round(t.salary*ue):0;return a+i},0),fe=t.categories.filter(a=>p(a)).reduce((a,s)=>a+(s.spent||0),0),A=Math.max(0,be-fe),L=t.totalExpense+A,K=t.salary+t.totalIncome-L,P=t.salary>0?L/t.salary*100:0,X=P>90?"var(--danger)":P>70?"var(--warning)":"var(--accent)",Z=t.categories.filter(a=>a.name==="Tabungan Bulanan"&&a.budget_limit>0).reduce((a,s)=>a+Number(s.budget_limit),0),ee=t.salary>0?t.salary-Z:0;ee-t.totalExpense;const ve=t.salary>0&&Z>0&&t.totalExpense>ee;return e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"dash-header",children:[e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>U(qe(o)),children:"‹"}),e.jsx("span",{className:"month-label-text",children:y(o)}),e.jsx("button",{className:"month-btn",onClick:()=>U($(o)),disabled:xe,children:"›"})]}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary btn-sm",onClick:()=>w(!0),children:"Atur Gaji"}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>N(!0),children:"+ Transaksi"})]})]}),V.length>0&&e.jsxs("div",{className:"alert-banner",children:[e.jsx("span",{children:"⚠"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Overbudget"})," — ",V.map(a=>`${a.icon} ${a.name}`).join(", ")]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx("div",{className:"hero-card",children:j?e.jsx("div",{className:"skeleton",style:{height:88,borderRadius:8}}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"hero-top",children:[e.jsxs("div",{className:"hero-left",children:[e.jsx("span",{className:"hero-date",children:new Date().toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}),e.jsxs("span",{className:"hero-eyebrow",children:["Saldo Bersih ",y(o)]}),e.jsxs("div",{className:`hero-balance ${K<0?"neg":""}`,children:[K<0&&e.jsx("span",{className:"hero-neg-sign",children:"-"}),l(Math.abs(K))]})]}),e.jsxs("div",{className:"hero-right",children:[t.salary>0&&e.jsxs("div",{className:"hero-chip",children:[e.jsx("span",{className:"hero-chip-label",children:"Gaji"}),e.jsx("span",{className:"hero-chip-val tabular",children:l(t.salary)})]}),e.jsxs("div",{className:"hero-chip",children:[e.jsx("span",{className:"hero-chip-label",children:"Total Tabungan"}),e.jsx("span",{className:"hero-chip-val tabular",style:{color:t.totalTabungan>0?"var(--success)":"var(--text-muted)"},children:l(t.totalTabungan)})]})]})]}),t.salary>0?e.jsxs("div",{className:"hero-bar-section",children:[e.jsx("div",{className:"hero-bar-track",children:e.jsx("div",{className:"hero-bar-fill",style:{width:`${Math.min(P,100)}%`,background:X}})}),e.jsxs("div",{className:"hero-bar-labels",children:[e.jsxs("span",{children:[l(t.totalExpense)," dipakai"]}),e.jsxs("span",{style:{color:X,fontWeight:700},children:[P.toFixed(0),"%"]})]})]}):e.jsxs("div",{className:"hero-no-salary",children:[e.jsx("button",{className:"salary-cta",onClick:()=>w(!0),children:"+ Atur gaji bulan ini"}),e.jsx("span",{className:"salary-cta-hint",children:"untuk menghitung saldo bersih"})]})]})}),e.jsxs("div",{className:"stats-strip",children:[e.jsxs("div",{className:"stat-col",children:[e.jsx("span",{className:"stat-col-label",children:"Pemasukan"}),e.jsxs("span",{className:"stat-col-val tabular",style:{color:"var(--success)"},children:["+",l(t.totalIncome)]})]}),e.jsxs("div",{className:"stat-col",children:[e.jsx("span",{className:"stat-col-label",children:"Pengeluaran"}),e.jsxs("span",{className:"stat-col-val tabular",style:{color:ve?"var(--danger)":"var(--text-primary)"},children:["-",l(L)]}),A>0&&e.jsxs("span",{className:"stat-col-sub",children:["+",l(A)," wajib"]})]}),e.jsxs("div",{className:"stat-col",children:[e.jsx("span",{className:"stat-col-label",children:"Belanja Hari Ini"}),e.jsx("span",{className:"stat-col-val tabular",style:{color:t.todayExpense>0?"var(--danger)":"var(--text-muted)"},children:t.todayExpense>0?`-${l(t.todayExpense)}`:"—"}),t.todayExpense>0&&t.salary>0&&e.jsxs("span",{className:"stat-col-sub",children:[(t.todayExpense/t.salary*100).toFixed(1),"% gaji"]})]})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"sect-title",children:"Pengeluaran Wajib"}),e.jsx("p",{className:"sect-sub",children:"Dipotong langsung dari gaji"})]}),e.jsx("button",{className:"pill-link",onClick:()=>M(!0),children:"Kelola"})]}),j?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[...Array(3)].map((a,s)=>e.jsx("div",{className:"skeleton",style:{height:36}},s))}):e.jsx("div",{className:"wajib-rows",children:t.categories.filter(a=>p(a)).map(a=>{const s=a.budget_set?Number(a.budget_limit):t.salary>0?Math.round(t.salary*.15):0,i=t.salary>0&&s>0?Math.round(s/t.salary*100):null;return e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${a.color}18`,color:a.color},children:a.icon}),e.jsx("span",{className:"brow-name",children:a.name})]}),e.jsxs("div",{className:"wajib-right",children:[i&&e.jsxs("span",{className:"wajib-pct",children:[i,"%"]}),e.jsx("span",{className:"wajib-amount tabular",children:l(s)})]})]},a.id)})})]}),(j||t.categories.filter(a=>!p(a)&&a.budget_limit>0).length>0)&&e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"sect-title",children:"Budget Kategori"}),t.categories.filter(a=>!p(a)&&a.budget_limit>0).length>0&&e.jsxs("p",{className:"sect-sub",children:[l(t.categories.filter(a=>!p(a)).reduce((a,s)=>a+(s.spent||0),0))," dari ",l(t.categories.filter(a=>!p(a)&&a.budget_limit>0).reduce((a,s)=>a+Number(s.budget_limit),0))]})]}),e.jsx("button",{className:"pill-link",onClick:()=>M(!0),children:"Kelola"})]}),j?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(2)].map((a,s)=>e.jsx("div",{className:"skeleton",style:{height:44}},s))}):e.jsx("div",{className:"budget-rows",children:t.categories.filter(a=>!p(a)&&a.budget_limit>0).map(a=>{const s=a.spent/a.budget_limit*100,i=Math.min(s,100),m=!a.overBudget&&s>=100,g=!a.overBudget&&s>=80&&s<100,_=a.overBudget?"var(--danger)":m?"var(--success)":g?"var(--warning)":a.color;return e.jsxs("div",{className:"brow",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${a.color}18`,color:a.color},children:a.icon}),e.jsx("span",{className:"brow-name",children:a.name}),a.overBudget&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 7px"},children:"Over"}),m&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.6rem",padding:"2px 7px"},children:"Penuh"}),g&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem",padding:"2px 7px"},children:"Hampir"})]}),e.jsx("div",{className:"brow-bar-wrap",children:e.jsx("div",{className:"brow-bar",children:e.jsx("div",{className:"brow-bar-fill",style:{width:`${i}%`,background:_}})})}),e.jsxs("div",{className:"brow-right",children:[e.jsx("span",{className:"brow-spent tabular",style:{color:a.overBudget?"var(--danger)":"var(--text-primary)"},children:l(a.spent)}),e.jsxs("span",{className:"brow-limit tabular",children:["/",l(a.budget_limit)]})]}),e.jsxs("span",{className:"brow-pct",style:{color:_},children:[i.toFixed(0),"%"]})]},a.id)})})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",children:[e.jsxs("div",{children:[e.jsxs("h3",{className:"sect-title",children:["Rencana ",y($(o))]}),t.nextMonthPlans.length>0&&e.jsxs("p",{className:"sect-sub",children:[t.nextMonthPlans.length," item ·"," ",l(t.nextMonthPlans.reduce((a,s)=>a+Number(s.amount),0))]})]}),e.jsx(F,{to:"/savings",className:"pill-link",children:"Kelola →"})]}),j?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[...Array(2)].map((a,s)=>e.jsx("div",{className:"skeleton",style:{height:36}},s))}):t.nextMonthPlans.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:"📋"}),e.jsxs("span",{children:["Belum ada rencana untuk ",y($(o)),"."]}),e.jsx(F,{to:"/savings",className:"empty-hint-link",children:"Tambah →"})]}):e.jsxs("div",{className:"plan-preview-list",children:[t.nextMonthPlans.slice(0,4).map(a=>e.jsxs("div",{className:"plan-preview-row",children:[e.jsx("span",{className:"plan-preview-icon",children:"🛒"}),e.jsx("span",{className:"plan-preview-name",children:a.name}),e.jsx("span",{className:"plan-preview-amount tabular",children:l(a.amount)})]},a.id)),t.nextMonthPlans.length>4&&e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:8,paddingTop:8,borderTop:"1px solid var(--border)"},children:["+",t.nextMonthPlans.length-4," rencana lainnya —"," ",e.jsx(F,{to:"/savings",style:{color:"var(--accent)",fontWeight:600},children:"lihat semua"})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",children:[e.jsx("h3",{className:"sect-title",children:"Transaksi Terakhir"}),e.jsx(F,{to:`/transactions?month=${o}`,className:"pill-link",children:"Lihat semua"})]}),j?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,marginTop:12},children:[...Array(4)].map((a,s)=>e.jsx("div",{className:"skeleton",style:{height:42}},s))}):t.transactions.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:"↕"}),e.jsx("span",{children:"Belum ada transaksi bulan ini. "}),e.jsx("button",{className:"empty-hint-link",onClick:()=>N(!0),children:"Tambah sekarang →"})]}):e.jsx("div",{className:"tx-list",children:t.transactions.map(a=>{var s,i,m;return e.jsxs("div",{className:"tx-row",children:[e.jsx("div",{className:"tx-icon",style:{background:(s=a.categories)!=null&&s.color?`${a.categories.color}18`:"var(--bg-input)"},children:((i=a.categories)==null?void 0:i.icon)||(a.type==="income"?"↑":"↓")}),e.jsxs("div",{className:"tx-meta",children:[e.jsx("span",{className:"tx-desc",children:a.description||((m=a.categories)==null?void 0:m.name)||"Transaksi"}),e.jsx("span",{className:"tx-date",children:new Date(a.date).toLocaleDateString("id-ID",{day:"numeric",month:"short"})})]}),e.jsxs("span",{className:`tx-amount tabular ${a.type==="income"?"inc":"exp"}`,children:[a.type==="income"?"+":"−",l(a.amount)]})]},a.id)})})]})]}),le&&e.jsx("div",{className:"modal-overlay",onClick:()=>w(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("h2",{className:"modal-title",children:["Gaji ",y(o)]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>w(!1),children:"✕"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Gaji Bulan Ini"}),e.jsx(ne,{value:G,onChange:a=>O(a),autoFocus:!0})]}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>w(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:me,children:"Simpan"})]})]})}),ce&&e.jsx("div",{className:"modal-overlay",onClick:()=>N(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>N(!1),children:"✕"})]}),e.jsx(De,{onSuccess:()=>{k(),N(!1)},onClose:()=>N(!1)})]})}),de&&!x&&!Y&&e.jsx("div",{className:"modal-overlay",onClick:()=>M(!1),children:e.jsxs("div",{className:"modal cat-manager-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Kelola Kategori"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:y(o)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>{q(null),v(!0)},children:"+ Kategori"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>M(!1),children:"✕"})]})]}),e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("p",{className:"cat-mgr-section-title",children:"Pengeluaran Wajib"}),e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:t.categories.filter(a=>p(a)).map(a=>{const s=Number(a.budget_limit)||0,i=t.salary>0&&s>0?Math.round(s/t.salary*100):null;return e.jsxs("div",{className:"cat-mgr-row",children:[e.jsxs("div",{className:"cat-mgr-left",children:[e.jsx("span",{className:"cat-mgr-icon",style:{background:`${a.color}18`,color:a.color},children:a.icon}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-mgr-name",children:a.name}),e.jsx("span",{className:"cat-mgr-sub",children:"Wajib · langsung dipotong"})]})]}),e.jsxs("div",{className:"cat-mgr-right",children:[i&&e.jsxs("span",{className:"cat-mgr-pct",children:[i,"%"]}),e.jsx("span",{className:"cat-mgr-amount tabular",children:s>0?l(s):"—"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.7rem"},onClick:()=>J(a),children:"Ubah"})]})]},a.id)})})]}),e.jsxs("div",{children:[e.jsx("p",{className:"cat-mgr-section-title",children:"Kategori Lainnya"}),t.categories.filter(a=>!p(a)).length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:"◈"}),e.jsx("span",{children:"Belum ada kategori tambahan."}),e.jsx("button",{className:"empty-hint-link",onClick:()=>{q(null),v(!0)},children:"Tambah →"})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:t.categories.filter(a=>!p(a)).map(a=>{const s=Number(a.budget_limit)||0,i=t.salary>0&&s>0?Math.round(s/t.salary*100):null;return e.jsxs("div",{className:"cat-mgr-row",children:[e.jsxs("div",{className:"cat-mgr-left",children:[e.jsx("span",{className:"cat-mgr-icon",style:{background:`${a.color}18`,color:a.color},children:a.icon}),e.jsx("span",{className:"cat-mgr-name",children:a.name})]}),e.jsxs("div",{className:"cat-mgr-right",children:[i&&e.jsxs("span",{className:"cat-mgr-pct",children:[i,"%"]}),e.jsx("span",{className:"cat-mgr-amount tabular",children:s>0?l(s):"—"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.7rem"},onClick:()=>J(a),children:s>0?"Set":"+ Budget"}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{q(a),v(!0)},children:"✎"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)"},onClick:()=>R({id:a.id,name:a.name}),children:"✕"})]})]},a.id)})})]})]})}),x&&(()=>{const a=t.categories.find(s=>s.id===x.id);return e.jsx("div",{className:"modal-overlay",onClick:()=>f(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Budget — ",a==null?void 0:a.name]}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[y(o),t.salary>0?` · Gaji ${l(t.salary)}`:""]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>f(null),children:"✕"})]}),t.salary>0&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx("input",{className:"form-input",type:"number",placeholder:String($e),value:x.pct,onChange:s=>Q(s.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),e.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),x.pct&&t.salary>0&&e.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",l(Math.round(parseFloat(x.pct)/100*t.salary))]})]}),!x.pct&&e.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(s=>e.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>Q(String(s)),children:[s,"%"]},s))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),e.jsx(ne,{value:x.nominal,onChange:pe,autoFocus:!t.salary})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>f(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:he,children:"Simpan"})]})]})})})(),I&&e.jsx(Fe,{title:"Hapus Kategori",message:`Hapus kategori "${I.name}"? Transaksi yang terhubung tidak akan ikut terhapus.`,confirmLabel:"Hapus",onConfirm:ge,onCancel:()=>R(null)}),Y&&e.jsx("div",{className:"modal-overlay",onClick:()=>v(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:T!=null&&T.id?"Edit Kategori":"Kategori Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>v(!1),children:"✕"})]}),e.jsx(Ee,{editData:T,onSuccess:()=>{k(),v(!1)},onClose:()=>v(!1)})]})}),e.jsx("style",{children:`
        /* ── Header ───────────────────────────── */
        .dash-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 20px; gap: 12px; flex-wrap: wrap;
        }
        .month-nav-group { display: flex; align-items: center; gap: 2px; }
        .month-btn {
          width: 30px; height: 30px; border: none; background: none;
          color: var(--text-muted); font-size: 1.2rem; cursor: pointer;
          border-radius: var(--radius-sm); display: flex; align-items: center;
          justify-content: center; transition: all 0.15s; font-family: var(--font-sans);
        }
        .month-btn:hover { background: var(--bg-input); color: var(--text-primary); }
        .month-btn:disabled { opacity: 0.25; cursor: not-allowed; }
        .month-label-text {
          font-size: 0.9375rem; font-weight: 700; letter-spacing: -0.025em;
          color: var(--text-primary); padding: 0 8px; min-width: 130px; text-align: center;
        }

        /* ── Alert ────────────────────────────── */
        .alert-banner {
          display: flex; align-items: center; gap: 9px;
          background: var(--danger-dim); border: 1px solid rgba(248,113,113,0.3);
          border-radius: var(--radius-sm); padding: 10px 14px;
          font-size: 0.78rem; color: var(--danger); margin-bottom: 14px; font-weight: 500;
        }

        /* ── Hero ─────────────────────────────── */
        .hero-card {
          background: var(--hero-bg);
          border: 1px solid var(--hero-border);
          border-radius: var(--radius-lg);
          padding: 22px 24px;
          position: relative; overflow: hidden;
        }
        .hero-card::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 100% 0%, rgba(99,102,241,0.07) 0%, transparent 55%);
          pointer-events: none;
        }
        .hero-top {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 14px;
        }
        .hero-left {}
        .hero-date {
          font-size: 0.72rem; font-weight: 600; color: var(--hero-muted);
          display: block; margin-bottom: 10px; letter-spacing: 0.01em;
          text-transform: capitalize;
        }
        .hero-eyebrow {
          font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.09em;
          color: var(--hero-muted); font-weight: 600; display: block; margin-bottom: 5px;
        }
        .hero-balance {
          font-size: clamp(1.75rem, 5vw, 2.5rem);
          font-weight: 800; letter-spacing: -0.04em;
          color: var(--hero-text); font-variant-numeric: tabular-nums; line-height: 1;
        }
        .hero-balance.neg { color: var(--danger); }
        .hero-neg-sign { font-size: 0.7em; vertical-align: 0.05em; margin-right: 1px; }

        .hero-right { display: flex; flex-direction: column; gap: 8px; align-items: flex-end; }
        .hero-chip {
          display: flex; flex-direction: column; align-items: flex-end; gap: 2px;
          background: var(--hero-chip-bg); border: 1px solid var(--hero-chip-border);
          border-radius: var(--radius-sm); padding: 8px 12px; min-width: 130px;
        }
        .hero-chip-label {
          font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.07em;
          color: var(--hero-muted); font-weight: 600;
        }
        .hero-chip-val {
          font-size: 0.9rem; font-weight: 700;
          color: var(--hero-chip-val); letter-spacing: -0.02em;
        }

        .hero-bar-section {}
        .hero-bar-track {
          height: 5px; background: var(--hero-track); border-radius: 99px; overflow: hidden; margin-bottom: 7px;
        }
        .hero-bar-fill { height: 100%; border-radius: 99px; transition: width 0.8s cubic-bezier(0.4,0,0.2,1); }
        .hero-bar-labels {
          display: flex; justify-content: space-between;
          font-size: 0.68rem; color: var(--hero-bar-label); font-weight: 500;
        }

        .hero-no-salary {
          display: flex; align-items: center; gap: 10px; margin-top: 10px;
        }
        .salary-cta {
          display: inline-flex; align-items: center; gap: 5px;
          background: var(--accent-dim);
          border: 1px solid rgba(99,102,241,0.35);
          border-radius: var(--radius-sm);
          padding: 7px 13px;
          color: var(--accent); font-size: 0.78rem; font-weight: 700;
          cursor: pointer; font-family: var(--font-sans);
          transition: all 0.15s; letter-spacing: -0.01em; white-space: nowrap;
        }
        .salary-cta:hover { background: rgba(99,102,241,0.2); transform: translateY(-1px); }
        .salary-cta-hint {
          font-size: 0.72rem; color: var(--hero-muted); font-weight: 500;
        }

        /* ── Stats strip ──────────────────────── */
        .stats-strip {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .stat-col {
          padding: 16px 20px; display: flex; flex-direction: column; gap: 6px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }
        .stat-col-label {
          font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--text-muted); font-weight: 700;
        }
        .stat-col-val {
          font-size: 1.1rem; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1;
        }
        .stat-col-sub {
          font-size: 0.68rem; color: var(--text-muted); font-weight: 500; margin-top: 2px;
        }

        /* ── Section head ─────────────────────── */
        .sect-head {
          display: flex; align-items: flex-start;
          justify-content: space-between; margin-bottom: 14px; gap: 8px;
        }
        .sect-title {
          font-size: 0.8125rem; font-weight: 700;
          letter-spacing: -0.01em; color: var(--text-primary);
        }
        .sect-sub {
          font-size: 0.68rem; color: var(--text-muted); margin-top: 2px; font-weight: 500;
        }
        .pill-link {
          display: inline-flex; align-items: center; gap: 3px;
          font-size: 0.7rem; color: var(--text-secondary);
          text-decoration: none; font-weight: 600;
          padding: 3px 10px; border: 1px solid var(--border);
          border-radius: 99px; background: transparent; transition: all 0.15s;
          white-space: nowrap; flex-shrink: 0; margin-top: 1px;
          cursor: pointer; font-family: var(--font-sans);
        }
        .pill-link:hover { color: var(--accent); border-color: var(--accent); background: var(--accent-dim); }

        /* ── Empty hint ───────────────────────── */
        .empty-hint {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 0; color: var(--text-muted); font-size: 0.8rem; font-weight: 500;
        }
        .empty-hint-icon {
          width: 28px; height: 28px; border-radius: 6px;
          background: var(--bg-input); display: flex; align-items: center;
          justify-content: center; font-size: 0.85rem; flex-shrink: 0;
        }
        .empty-hint-link {
          color: var(--accent); font-weight: 600; text-decoration: none;
          background: none; border: none; cursor: pointer; font-family: var(--font-sans);
          font-size: 0.8rem; padding: 0; transition: opacity 0.15s;
        }
        .empty-hint-link:hover { opacity: 0.75; }

        /* ── Wajib rows (no bar) ─────────────── */
        .wajib-rows { display: flex; flex-direction: column; }
        .wajib-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 9px 0; border-bottom: 1px solid var(--border); gap: 12px;
        }
        .wajib-row:last-child { border-bottom: none; }
        .wajib-left { display: flex; align-items: center; gap: 8px; }
        .wajib-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .wajib-pct {
          font-size: 0.68rem; font-weight: 700; color: var(--accent);
          background: var(--accent-dim); padding: 2px 8px; border-radius: 99px;
        }
        .wajib-amount { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; }

        /* ── Budget rows ──────────────────────── */
        .budget-rows { display: flex; flex-direction: column; }
        .brow {
          display: grid;
          grid-template-columns: minmax(140px, 1.6fr) 1fr 110px 36px;
          align-items: center; gap: 14px; padding: 12px 0;
          border-bottom: 1px solid var(--border);
        }
        .brow:last-child { border-bottom: none; }
        .brow.no-limit { grid-template-columns: 1fr auto; }
        .brow-left { display: flex; align-items: center; gap: 8px; min-width: 0; }
        .brow-icon {
          width: 28px; height: 28px; border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; flex-shrink: 0;
        }
        .brow-name {
          font-size: 0.8125rem; font-weight: 600; color: var(--text-primary);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .brow-no-limit-tag {
          font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.04em;
          color: var(--text-muted); font-weight: 700;
          background: var(--bg-input); padding: 2px 6px; border-radius: 99px;
          flex-shrink: 0;
        }
        .brow-bar-wrap { display: flex; align-items: center; }
        .brow-bar { height: 7px; background: var(--border); border-radius: 99px; overflow: hidden; width: 100%; }
        .brow-bar-fill { height: 100%; border-radius: 99px; transition: width 0.7s cubic-bezier(0.4,0,0.2,1); }
        .brow-right { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; justify-content: center; }
        .brow-spent { font-size: 0.8rem; font-weight: 700; letter-spacing: -0.01em; }
        .brow-limit { font-size: 0.65rem; color: var(--text-muted); font-weight: 500; }
        .brow-pct { font-size: 0.72rem; font-weight: 700; text-align: right; min-width: 30px; }

        /* ── Savings grid ─────────────────────── */
        .savings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 10px;
        }
        .sv-chip {
          background: var(--bg-input); border: 1px solid var(--border);
          border-radius: var(--radius-sm); padding: 13px 14px; transition: border-color 0.2s;
        }
        .sv-chip:hover { border-color: var(--border-light); }
        .sv-chip.sv-done { border-color: rgba(52,211,153,0.4); background: var(--success-dim); }
        .sv-chip.sv-urgent { border-color: rgba(251,191,36,0.4); }
        .sv-chip-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .sv-chip-name { font-size: 0.78rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.01em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .sv-chip-pct { font-size: 0.72rem; font-weight: 700; flex-shrink: 0; }
        .sv-chip-amounts { display: flex; align-items: baseline; gap: 3px; margin-bottom: 8px; }
        .sv-chip-cur { font-size: 0.9375rem; font-weight: 800; letter-spacing: -0.025em; color: var(--text-primary); }
        .sv-chip-tgt { font-size: 0.68rem; color: var(--text-muted); font-weight: 500; }
        .sv-chip-bar { height: 4px; background: var(--border); border-radius: 99px; overflow: hidden; }
        .sv-chip-fill { height: 100%; border-radius: 99px; transition: width 0.7s cubic-bezier(0.4,0,0.2,1); }
        .sv-chip-deadline { font-size: 0.65rem; color: var(--warning); font-weight: 600; margin-top: 5px; display: block; }

        /* ── Plan preview ────────────────────── */
        .plan-preview-list { display: flex; flex-direction: column; }
        .plan-preview-row {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 0; border-bottom: 1px solid var(--border);
        }
        .plan-preview-row:last-child { border-bottom: none; }
        .plan-preview-icon { font-size: 0.85rem; flex-shrink: 0; opacity: 0.7; }
        .plan-preview-name {
          flex: 1; font-size: 0.8rem; font-weight: 600;
          color: var(--text-primary);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .plan-preview-amount {
          font-size: 0.8rem; font-weight: 700;
          color: var(--text-secondary); letter-spacing: -0.01em; flex-shrink: 0;
        }

        /* ── Transactions ─────────────────────── */
        .tx-list { display: flex; flex-direction: column; margin-top: 4px; }
        .tx-row {
          display: flex; align-items: center; gap: 11px;
          padding: 10px 0; border-bottom: 1px solid var(--border);
        }
        .tx-row:last-child { border-bottom: none; }
        .tx-icon {
          width: 32px; height: 32px; border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; flex-shrink: 0;
        }
        .tx-meta { flex: 1; min-width: 0; }
        .tx-desc { display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .tx-date { font-size: 0.65rem; color: var(--text-muted); font-weight: 500; }
        .tx-amount { font-size: 0.8125rem; font-weight: 700; letter-spacing: -0.02em; white-space: nowrap; }
        .tx-amount.inc { color: var(--success); }
        .tx-amount.exp { color: var(--danger); }

        /* ── Category Manager ───────────────── */
        .cat-manager-modal { max-width: 520px; max-height: 85vh; overflow-y: auto; }
        .cat-mgr-section-title {
          font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--text-muted); font-weight: 700; margin: 0 0 6px;
        }
        .cat-mgr-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 8px 10px; border-radius: var(--radius-sm); gap: 8px;
        }
        .cat-mgr-row:hover { background: var(--bg-input); }
        .cat-mgr-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
        .cat-mgr-icon {
          width: 30px; height: 30px; border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; flex-shrink: 0;
        }
        .cat-mgr-name { font-size: 0.8125rem; font-weight: 600; color: var(--text-primary); display: block; }
        .cat-mgr-sub {
          font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em;
          color: var(--text-muted); font-weight: 600; margin-top: 1px; display: block;
        }
        .cat-mgr-right { display: flex; align-items: center; gap: 5px; flex-shrink: 0; }
        .cat-mgr-pct {
          font-size: 0.65rem; font-weight: 700; color: var(--accent);
          background: var(--accent-dim); padding: 2px 7px; border-radius: 99px;
        }
        .cat-mgr-amount {
          font-size: 0.8125rem; font-weight: 700; color: var(--text-primary);
          min-width: 90px; text-align: right;
        }

        /* ── Mobile ───────────────────────────── */
        @media (max-width: 768px) {
          .dash-header { flex-wrap: wrap; row-gap: 8px; }
          .month-label-text { font-size: 0.875rem; min-width: 110px; }
          .hero-card { padding: 14px 16px; }
          .hero-top { flex-direction: column; gap: 0; margin-bottom: 10px; }
          /* Chips tampil sebagai row horizontal di bawah balance */
          .hero-right {
            display: flex; flex-direction: row; gap: 8px;
            align-items: stretch; margin-top: 10px;
          }
          .hero-chip {
            flex: 1; min-width: 0; align-items: flex-start;
            padding: 7px 10px;
          }
          .hero-chip-val { font-size: 0.8rem; }
          .hero-balance { font-size: 1.6rem; }
          .stats-strip { border-radius: var(--radius-sm); }
          .stat-col { padding: 12px 14px; }
          .stat-col-val { font-size: 0.875rem; }
          .brow {
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto auto;
            grid-template-areas: "left right" "bar bar" "meta meta";
          }
          .brow-left { grid-area: left; }
          .brow-bar-wrap { grid-area: bar; margin-top: 5px; }
          .brow-right { grid-area: right; align-self: start; }
          .brow-pct { display: block; font-size: 0.68rem; grid-area: meta; }
          .brow-limit { display: block; font-size: 0.65rem; }
          .savings-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 400px) {
          .stats-strip { grid-template-columns: 1fr; }
          .stat-col { border-right: none; border-bottom: 1px solid var(--border); flex-direction: row; justify-content: space-between; align-items: center; padding: 10px 14px; }
          .stat-col:last-child { border-bottom: none; }
          .hero-balance { font-size: 1.4rem; }
        }
      `})]})}export{He as default};
