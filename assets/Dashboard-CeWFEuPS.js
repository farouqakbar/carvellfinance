import{u as _e,e as Ce,d as ze,r as g,s as d,j as e,L as X}from"./index-BV5NurQF.js";import{g as Z,a as C,f as l}from"./formatCurrency-CwSiFA8N.js";import{T as Se}from"./TransactionForm-DWR8A8_p.js";import{C as Be}from"./CategoryForm-CVslh7de.js";import{C as ee}from"./CurrencyInput-D1uFUGq0.js";import{i as p}from"./mandatoryCategories-BLLVk51K.js";const Te=15;function Me(c){const[x,z]=c.split("-").map(Number),u=new Date(x,z-2,1);return`${u.getFullYear()}-${String(u.getMonth()+1).padStart(2,"0")}`}function De(c){const[x,z]=c.split("-").map(Number),u=new Date(x,z,1);return`${u.getFullYear()}-${String(u.getMonth()+1).padStart(2,"0")}`}function Ae(){const{user:c}=_e(),x=Ce(),[z,u]=ze(),[o,ae]=g.useState(Z()),[s,te]=g.useState({salary:0,totalExpense:0,totalIncome:0,categories:[],transactions:[],savings:[],savingsLogs:[],categorySpend:[],todayExpense:0,totalTabungan:0}),[w,I]=g.useState(!0),[se,v]=g.useState(!1),[L,W]=g.useState(""),[re,y]=g.useState(!1),[ne,S]=g.useState(!1),[h,b]=g.useState(null),[ie,f]=g.useState(!1),[B,F]=g.useState(null);g.useEffect(()=>{j()},[o]);const K=a=>{ae(a),u({month:a})},j=async()=>{var a,t;I(!0);try{const i=`${o}-01`,m=`${o}-31`,M=new Date().toISOString().split("T")[0],[N,ue,Q,be,fe,ve,ye,je]=await Promise.all([d.from("salaries").select("*").eq("user_id",c.id).eq("month",o).maybeSingle(),d.from("transactions").select("*, categories(name, color, icon)").eq("user_id",c.id).gte("date",i).lte("date",m).order("date",{ascending:!1}),d.from("categories").select("*").eq("user_id",c.id).order("name"),d.from("savings").select("*").eq("user_id",c.id),d.from("savings_log").select("*").eq("user_id",c.id).eq("month",o),d.from("transactions").select("amount").eq("user_id",c.id).eq("date",M).eq("type","expense"),d.from("category_budgets").select("*").eq("user_id",c.id).eq("month",o),d.from("category_budgets").select("budget_limit, category_id").eq("user_id",c.id).lte("month",o)]),D=ue.data||[],q={};(ye.data||[]).forEach(r=>{q[r.category_id]=Number(r.budget_limit)});const A=(Q.data||[]).map(r=>({...r,budget_limit:q[r.id]!==void 0?q[r.id]:0})),we=D.filter(r=>r.type==="expense").reduce((r,n)=>r+Number(n.amount),0),Ne=D.filter(r=>r.type==="income").reduce((r,n)=>r+Number(n.amount),0),k={};D.filter(r=>r.type==="expense"&&r.categories).forEach(r=>{const n=r.categories.name;k[n]||(k[n]={name:n,amount:0,color:r.categories.color,icon:r.categories.icon}),k[n].amount+=Number(r.amount)});const ke=A.map(r=>{var E;const n=((E=k[r.name])==null?void 0:E.amount)||0,_=r.budget_limit>0?n/r.budget_limit*100:null;return{...r,spent:n,pct:_,overBudget:r.budget_limit>0&&n>r.budget_limit}}).sort((r,n)=>r.overBudget&&!n.overBudget?-1:!r.overBudget&&n.overBudget?1:(n.pct||0)-(r.pct||0));te({salary:((a=N.data)==null?void 0:a.amount)||0,totalExpense:we,totalIncome:Ne,categories:ke,transactions:D.slice(0,5),savings:be.data||[],savingsLogs:fe.data||[],todayExpense:(ve.data||[]).reduce((r,n)=>r+Number(n.amount),0),totalTabungan:(je.data||[]).filter(r=>{const n=A.find(_=>_.id===r.category_id);return n&&n.name==="Tabungan Bulanan"}).reduce((r,n)=>r+Number(n.budget_limit),0),categorySpend:Object.values(k).sort((r,n)=>n.amount-r.amount)});const V=((t=N.data)==null?void 0:t.amount)||0;if(V>0){const r=A.filter(n=>p(n)&&!(Number(n.budget_limit)>0));if(r.length>0){const n=Math.round(Number(V)*.15);await Promise.all(r.map(E=>d.from("category_budgets").upsert({user_id:c.id,category_id:E.id,month:o,budget_limit:n},{onConflict:"category_id,month"})));const{data:_}=await d.from("categories").select("*").eq("user_id",c.id).order("name");Q.data=_}}}finally{I(!1)}},oe=async()=>{const a=parseFloat(L);if(!a)return;await d.from("salaries").upsert({user_id:c.id,month:o,amount:a},{onConflict:"user_id,month"});const t=s.categories.filter(i=>p(i)&&!(Number(i.budget_limit)>0));if(t.length>0){const i=Math.round(a*.15);await Promise.all(t.map(m=>d.from("category_budgets").upsert({user_id:c.id,category_id:m.id,month:o,budget_limit:i},{onConflict:"category_id,month"})))}x("Gaji disimpan","success"),v(!1),W(""),j()},G=a=>{const t=String(Math.round(a.budget_limit||0)),i=s.salary>0&&a.budget_limit>0?(a.budget_limit/s.salary*100).toFixed(1):"";b({id:a.id,nominal:t,pct:i})},le=a=>{const t=parseFloat(a)||0,i=s.salary>0&&t>0?(t/s.salary*100).toFixed(1):"";b(m=>({...m,nominal:a,pct:i}))},H=a=>{const t=parseFloat(a)||0,i=s.salary>0&&t>0?String(Math.round(t/100*s.salary)):"";b(m=>({...m,pct:a,nominal:i}))},ce=async()=>{const a=parseFloat(h.nominal)||0;await d.from("category_budgets").upsert({user_id:c.id,category_id:h.id,month:o,budget_limit:a},{onConflict:"category_id,month"}),x("Budget disimpan","success"),b(null),j()},de=async a=>{confirm("Hapus kategori ini?")&&(await d.from("categories").delete().eq("id",a),x("Kategori dihapus","success"),j())};s.categories.filter(a=>a.budget_limit>0).reduce((a,t)=>a+t.budget_limit,0);const me=o===Z(),O=s.categories.filter(a=>a.overBudget),pe=.15,ge=s.categories.filter(a=>p(a)).reduce((a,t)=>{const i=Number(t.budget_limit)>0?Number(t.budget_limit):s.salary>0?Math.round(s.salary*pe):0;return a+i},0),he=s.categories.filter(a=>p(a)).reduce((a,t)=>a+(t.spent||0),0),P=Math.max(0,ge-he),$=s.totalExpense+P,R=s.salary+s.totalIncome-$,T=s.salary>0?$/s.salary*100:0,Y=T>90?"var(--danger)":T>70?"var(--warning)":"var(--accent)",U=s.categories.filter(a=>a.name==="Tabungan Bulanan"&&a.budget_limit>0).reduce((a,t)=>a+Number(t.budget_limit),0),J=s.salary>0?s.salary-U:0;J-s.totalExpense;const xe=s.salary>0&&U>0&&s.totalExpense>J;return e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"dash-header",children:[e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>K(Me(o)),children:"‹"}),e.jsx("span",{className:"month-label-text",children:C(o)}),e.jsx("button",{className:"month-btn",onClick:()=>K(De(o)),disabled:me,children:"›"})]}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary btn-sm",onClick:()=>v(!0),children:"Atur Gaji"}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>y(!0),children:"+ Transaksi"})]})]}),O.length>0&&e.jsxs("div",{className:"alert-banner",children:[e.jsx("span",{children:"⚠"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Overbudget"})," — ",O.map(a=>`${a.icon} ${a.name}`).join(", ")]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx("div",{className:"hero-card",children:w?e.jsx("div",{className:"skeleton",style:{height:88,borderRadius:8}}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"hero-top",children:[e.jsxs("div",{className:"hero-left",children:[e.jsx("span",{className:"hero-date",children:new Date().toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}),e.jsxs("span",{className:"hero-eyebrow",children:["Saldo Bersih ",C(o)]}),e.jsxs("div",{className:`hero-balance ${R<0?"neg":""}`,children:[R<0&&e.jsx("span",{className:"hero-neg-sign",children:"-"}),l(Math.abs(R))]})]}),e.jsxs("div",{className:"hero-right",children:[s.salary>0&&e.jsxs("div",{className:"hero-chip",children:[e.jsx("span",{className:"hero-chip-label",children:"Gaji"}),e.jsx("span",{className:"hero-chip-val tabular",children:l(s.salary)})]}),e.jsxs("div",{className:"hero-chip",children:[e.jsx("span",{className:"hero-chip-label",children:"Total Tabungan"}),e.jsx("span",{className:"hero-chip-val tabular",style:{color:s.totalTabungan>0?"var(--success)":"var(--text-muted)"},children:l(s.totalTabungan)})]})]})]}),s.salary>0?e.jsxs("div",{className:"hero-bar-section",children:[e.jsx("div",{className:"hero-bar-track",children:e.jsx("div",{className:"hero-bar-fill",style:{width:`${Math.min(T,100)}%`,background:Y}})}),e.jsxs("div",{className:"hero-bar-labels",children:[e.jsxs("span",{children:[l(s.totalExpense)," dipakai"]}),e.jsxs("span",{style:{color:Y,fontWeight:700},children:[T.toFixed(0),"%"]})]})]}):e.jsxs("div",{className:"hero-no-salary",children:[e.jsx("button",{className:"salary-cta",onClick:()=>v(!0),children:"+ Atur gaji bulan ini"}),e.jsx("span",{className:"salary-cta-hint",children:"untuk menghitung saldo bersih"})]})]})}),e.jsxs("div",{className:"stats-strip",children:[e.jsxs("div",{className:"stat-col",children:[e.jsx("span",{className:"stat-col-label",children:"Pemasukan"}),e.jsxs("span",{className:"stat-col-val tabular",style:{color:"var(--success)"},children:["+",l(s.totalIncome)]})]}),e.jsxs("div",{className:"stat-col",children:[e.jsx("span",{className:"stat-col-label",children:"Pengeluaran"}),e.jsxs("span",{className:"stat-col-val tabular",style:{color:xe?"var(--danger)":"var(--text-primary)"},children:["-",l($)]}),P>0&&e.jsxs("span",{className:"stat-col-sub",children:["+",l(P)," wajib"]})]}),e.jsxs("div",{className:"stat-col",children:[e.jsx("span",{className:"stat-col-label",children:"Belanja Hari Ini"}),e.jsx("span",{className:"stat-col-val tabular",style:{color:s.todayExpense>0?"var(--danger)":"var(--text-muted)"},children:s.todayExpense>0?`-${l(s.todayExpense)}`:"—"}),s.todayExpense>0&&s.salary>0&&e.jsxs("span",{className:"stat-col-sub",children:[(s.todayExpense/s.salary*100).toFixed(1),"% gaji"]})]})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"sect-title",children:"Pengeluaran Wajib"}),e.jsx("p",{className:"sect-sub",children:"Dipotong langsung dari gaji"})]}),e.jsx("button",{className:"pill-link",onClick:()=>S(!0),children:"Kelola"})]}),w?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[...Array(3)].map((a,t)=>e.jsx("div",{className:"skeleton",style:{height:36}},t))}):e.jsx("div",{className:"wajib-rows",children:s.categories.filter(a=>p(a)).map(a=>{const t=Number(a.budget_limit)>0?Number(a.budget_limit):s.salary>0?Math.round(s.salary*.15):0,i=s.salary>0&&t>0?Math.round(t/s.salary*100):null;return e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${a.color}18`,color:a.color},children:a.icon}),e.jsx("span",{className:"brow-name",children:a.name})]}),e.jsxs("div",{className:"wajib-right",children:[i&&e.jsxs("span",{className:"wajib-pct",children:[i,"%"]}),e.jsx("span",{className:"wajib-amount tabular",children:l(t)})]})]},a.id)})})]}),(w||s.categories.filter(a=>!p(a)&&a.budget_limit>0).length>0)&&e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"sect-title",children:"Budget Kategori"}),s.categories.filter(a=>!p(a)&&a.budget_limit>0).length>0&&e.jsxs("p",{className:"sect-sub",children:[l(s.categories.filter(a=>!p(a)).reduce((a,t)=>a+(t.spent||0),0))," dari ",l(s.categories.filter(a=>!p(a)&&a.budget_limit>0).reduce((a,t)=>a+Number(t.budget_limit),0))]})]}),e.jsx("button",{className:"pill-link",onClick:()=>S(!0),children:"Kelola"})]}),w?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(2)].map((a,t)=>e.jsx("div",{className:"skeleton",style:{height:44}},t))}):e.jsx("div",{className:"budget-rows",children:s.categories.filter(a=>!p(a)&&a.budget_limit>0).map(a=>{const t=a.spent/a.budget_limit*100,i=Math.min(t,100),m=!a.overBudget&&t>=100,M=!a.overBudget&&t>=80&&t<100,N=a.overBudget?"var(--danger)":m?"var(--success)":M?"var(--warning)":a.color;return e.jsxs("div",{className:"brow",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${a.color}18`,color:a.color},children:a.icon}),e.jsx("span",{className:"brow-name",children:a.name}),a.overBudget&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 7px"},children:"Over"}),m&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.6rem",padding:"2px 7px"},children:"Penuh"}),M&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem",padding:"2px 7px"},children:"Hampir"})]}),e.jsx("div",{className:"brow-bar-wrap",children:e.jsx("div",{className:"brow-bar",children:e.jsx("div",{className:"brow-bar-fill",style:{width:`${i}%`,background:N}})})}),e.jsxs("div",{className:"brow-right",children:[e.jsx("span",{className:"brow-spent tabular",style:{color:a.overBudget?"var(--danger)":"var(--text-primary)"},children:l(a.spent)}),e.jsxs("span",{className:"brow-limit tabular",children:["/",l(a.budget_limit)]})]}),e.jsxs("span",{className:"brow-pct",style:{color:N},children:[i.toFixed(0),"%"]})]},a.id)})})]}),e.jsxs("div",{className:"card",style:{borderStyle:"dashed"},children:[e.jsxs("div",{className:"sect-head",children:[e.jsx("h3",{className:"sect-title",children:"Rencana Bulan Depan"}),e.jsx(X,{to:"/savings",className:"pill-link",children:"Atur →"})]}),e.jsx("p",{style:{fontSize:"0.78rem",color:"var(--text-muted)",margin:0},children:"Rencanakan pengeluaran bulan depan secara rinci di halaman Rencana."})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",children:[e.jsx("h3",{className:"sect-title",children:"Transaksi Terakhir"}),e.jsx(X,{to:`/transactions?month=${o}`,className:"pill-link",children:"Lihat semua"})]}),w?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,marginTop:12},children:[...Array(4)].map((a,t)=>e.jsx("div",{className:"skeleton",style:{height:42}},t))}):s.transactions.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:"↕"}),e.jsx("span",{children:"Belum ada transaksi bulan ini. "}),e.jsx("button",{className:"empty-hint-link",onClick:()=>y(!0),children:"Tambah sekarang →"})]}):e.jsx("div",{className:"tx-list",children:s.transactions.map(a=>{var t,i,m;return e.jsxs("div",{className:"tx-row",children:[e.jsx("div",{className:"tx-icon",style:{background:(t=a.categories)!=null&&t.color?`${a.categories.color}18`:"var(--bg-input)"},children:((i=a.categories)==null?void 0:i.icon)||(a.type==="income"?"↑":"↓")}),e.jsxs("div",{className:"tx-meta",children:[e.jsx("span",{className:"tx-desc",children:a.description||((m=a.categories)==null?void 0:m.name)||"Transaksi"}),e.jsx("span",{className:"tx-date",children:new Date(a.date).toLocaleDateString("id-ID",{day:"numeric",month:"short"})})]}),e.jsxs("span",{className:`tx-amount tabular ${a.type==="income"?"inc":"exp"}`,children:[a.type==="income"?"+":"−",l(a.amount)]})]},a.id)})})]})]}),se&&e.jsx("div",{className:"modal-overlay",onClick:()=>v(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("h2",{className:"modal-title",children:["Gaji ",C(o)]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>v(!1),children:"✕"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Gaji Bulan Ini"}),e.jsx(ee,{value:L,onChange:a=>W(a),autoFocus:!0})]}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>v(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:oe,children:"Simpan"})]})]})}),re&&e.jsx("div",{className:"modal-overlay",onClick:()=>y(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>y(!1),children:"✕"})]}),e.jsx(Se,{onSuccess:()=>{j(),y(!1)},onClose:()=>y(!1)})]})}),ne&&e.jsx("div",{className:"modal-overlay",onClick:()=>S(!1),children:e.jsxs("div",{className:"modal cat-manager-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Kelola Kategori"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:C(o)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>{F(null),f(!0)},children:"+ Kategori"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>S(!1),children:"✕"})]})]}),e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("p",{className:"cat-mgr-section-title",children:"Pengeluaran Wajib"}),e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:s.categories.filter(a=>p(a)).map(a=>{const t=Number(a.budget_limit)||0,i=s.salary>0&&t>0?Math.round(t/s.salary*100):null;return e.jsxs("div",{className:"cat-mgr-row",children:[e.jsxs("div",{className:"cat-mgr-left",children:[e.jsx("span",{className:"cat-mgr-icon",style:{background:`${a.color}18`,color:a.color},children:a.icon}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-mgr-name",children:a.name}),e.jsx("span",{className:"cat-mgr-sub",children:"Wajib · langsung dipotong"})]})]}),e.jsxs("div",{className:"cat-mgr-right",children:[i&&e.jsxs("span",{className:"cat-mgr-pct",children:[i,"%"]}),e.jsx("span",{className:"cat-mgr-amount tabular",children:t>0?l(t):"—"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.7rem"},onClick:()=>G(a),children:"Ubah"})]})]},a.id)})})]}),e.jsxs("div",{children:[e.jsx("p",{className:"cat-mgr-section-title",children:"Kategori Lainnya"}),s.categories.filter(a=>!p(a)).length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:"◈"}),e.jsx("span",{children:"Belum ada kategori tambahan."}),e.jsx("button",{className:"empty-hint-link",onClick:()=>{F(null),f(!0)},children:"Tambah →"})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:s.categories.filter(a=>!p(a)).map(a=>{const t=Number(a.budget_limit)||0,i=s.salary>0&&t>0?Math.round(t/s.salary*100):null;return e.jsxs("div",{className:"cat-mgr-row",children:[e.jsxs("div",{className:"cat-mgr-left",children:[e.jsx("span",{className:"cat-mgr-icon",style:{background:`${a.color}18`,color:a.color},children:a.icon}),e.jsx("span",{className:"cat-mgr-name",children:a.name})]}),e.jsxs("div",{className:"cat-mgr-right",children:[i&&e.jsxs("span",{className:"cat-mgr-pct",children:[i,"%"]}),e.jsx("span",{className:"cat-mgr-amount tabular",children:t>0?l(t):"—"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.7rem"},onClick:()=>G(a),children:t>0?"Set":"+ Budget"}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{F(a),f(!0)},children:"✎"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)"},onClick:()=>de(a.id),children:"✕"})]})]},a.id)})})]})]})}),h&&(()=>{const a=s.categories.find(t=>t.id===h.id);return e.jsx("div",{className:"modal-overlay",onClick:()=>b(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Budget — ",a==null?void 0:a.name]}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[C(o),s.salary>0?` · Gaji ${l(s.salary)}`:""]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>b(null),children:"✕"})]}),s.salary>0&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx("input",{className:"form-input",type:"number",placeholder:String(Te),value:h.pct,onChange:t=>H(t.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),e.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),h.pct&&s.salary>0&&e.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",l(Math.round(parseFloat(h.pct)/100*s.salary))]})]}),!h.pct&&e.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(t=>e.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>H(String(t)),children:[t,"%"]},t))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),e.jsx(ee,{value:h.nominal,onChange:le,autoFocus:!s.salary})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>b(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:ce,children:"Simpan"})]})]})})})(),ie&&e.jsx("div",{className:"modal-overlay",onClick:()=>f(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:B!=null&&B.id?"Edit Kategori":"Kategori Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>f(!1),children:"✕"})]}),e.jsx(Be,{editData:B,onSuccess:()=>{j(),f(!1)},onClose:()=>f(!1)})]})}),e.jsx("style",{children:`
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
          background: linear-gradient(135deg, #12122a 0%, #0f0f17 60%);
          border: 1px solid #252540;
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
          font-size: 0.72rem; font-weight: 600; color: var(--text-muted);
          display: block; margin-bottom: 10px; letter-spacing: 0.01em;
          text-transform: capitalize;
        }
        .hero-eyebrow {
          font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.09em;
          color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 5px;
        }
        .hero-balance {
          font-size: clamp(1.75rem, 5vw, 2.5rem);
          font-weight: 800; letter-spacing: -0.04em;
          color: var(--text-primary); font-variant-numeric: tabular-nums; line-height: 1;
        }
        .hero-balance.neg { color: var(--danger); }
        .hero-neg-sign { font-size: 0.7em; vertical-align: 0.05em; margin-right: 1px; }

        .hero-right { display: flex; flex-direction: column; gap: 8px; align-items: flex-end; }
        .hero-chip {
          display: flex; flex-direction: column; align-items: flex-end; gap: 2px;
          background: var(--bg-input); border: 1px solid var(--border);
          border-radius: var(--radius-sm); padding: 8px 12px; min-width: 130px;
        }
        .hero-chip-label {
          font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.07em;
          color: var(--text-muted); font-weight: 600;
        }
        .hero-chip-val {
          font-size: 0.9rem; font-weight: 700;
          color: var(--text-secondary); letter-spacing: -0.02em;
        }

        .hero-bar-section {}
        .hero-bar-track {
          height: 5px; background: var(--border); border-radius: 99px; overflow: hidden; margin-bottom: 7px;
        }
        .hero-bar-fill { height: 100%; border-radius: 99px; transition: width 0.8s cubic-bezier(0.4,0,0.2,1); }
        .hero-bar-labels {
          display: flex; justify-content: space-between;
          font-size: 0.68rem; color: var(--text-muted); font-weight: 500;
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
          font-size: 0.72rem; color: var(--text-muted); font-weight: 500;
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
          .hero-card { padding: 16px; }
          .hero-top { flex-direction: column; gap: 8px; margin-bottom: 12px; }
          .hero-right { display: none; }
          .hero-balance { font-size: 1.75rem; }
          .stats-strip { border-radius: var(--radius-sm); }
          .stat-col { padding: 12px 14px; }
          .stat-col-val { font-size: 0.875rem; }
          .brow {
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto;
            grid-template-areas: "left right" "bar bar";
          }
          .brow-left { grid-area: left; }
          .brow-bar-wrap { grid-area: bar; margin-top: 4px; }
          .brow-right { grid-area: right; align-self: start; }
          .brow-pct { display: none; }
          .brow-limit { display: none; }
          .savings-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 400px) {
          .stats-strip { grid-template-columns: 1fr; }
          .stat-col { border-right: none; border-bottom: 1px solid var(--border); flex-direction: row; justify-content: space-between; align-items: center; padding: 10px 14px; }
          .stat-col:last-child { border-bottom: none; }
          .hero-balance { font-size: 1.5rem; }
        }
      `})]})}export{Ae as default};
