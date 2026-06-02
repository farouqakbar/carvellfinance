import{u as Ye,i as Je,h as Ue,r as m,g as O,s as h,j as e,d as k,L as Y,f as d,C as Ne}from"./index-8D83QUkP.js";import{T as Qe}from"./TransactionForm-LeoT8Cfk.js";import{C as Ve}from"./CategoryForm-0HZGh1f4.js";import{i as x,a as J,C as Xe}from"./ConfirmModal-73dFZhFq.js";const Ze=15;function ea(c){const[y,T]=c.split("-").map(Number),j=new Date(y,T-2,1);return`${j.getFullYear()}-${String(j.getMonth()+1).padStart(2,"0")}`}function U(c){const[y,T]=c.split("-").map(Number),j=new Date(y,T,1);return`${j.getFullYear()}-${String(j.getMonth()+1).padStart(2,"0")}`}function na(){const{user:c}=Ye(),y=Je(),[T,j]=Ue(),[o,ke]=m.useState(()=>T.get("month")||O()),[t,Se]=m.useState({salary:0,totalExpense:0,totalIncome:0,categories:[],transactions:[],savings:[],savingsLogs:[],categorySpend:[],todayExpense:0,totalTabungan:0,nextMonthPlans:[],cumulativeBalance:0,cumulativeMandatoryBudget:0,gajiTx:null,gajiCatId:null}),[I,le]=m.useState(!0),[ze,S]=m.useState(!1),[Ce,q]=m.useState(!1),[g,b]=m.useState(null),[ce,M]=m.useState(!1),[R,_e]=m.useState(null),[Q,V]=m.useState(null),[Te,A]=m.useState(!1),[Me,X]=m.useState(!1),[Pe,P]=m.useState(!1),[Be,B]=m.useState(!1),[z,Z]=m.useState({amount:"",note:""}),[de,me]=m.useState(!1),[pe,ee]=m.useState(!1),[D,ae]=m.useState(()=>Number(O().split("-")[0]));m.useEffect(()=>{C()},[o]);const te=a=>{ke(a),j({month:a})},C=async()=>{le(!0);try{const a=`${o}-01`,[s,i]=o.split("-").map(Number),l=new Date(s,i,0).toISOString().split("T")[0],p=new Date().toISOString().split("T")[0],f=U(o),u=c.recording_start_month;let w=h.from("transactions").select("amount, type").eq("user_id",c.id).lt("date",a);u&&(w=w.gte("date",`${u}-01`));let F=h.from("category_budgets").select("budget_limit, category_id").eq("user_id",c.id).lte("month",o);u&&(F=F.gte("month",u));const[ne,ie,Re,Ae,Le,Ge,fe,Ke,He]=await Promise.all([h.from("transactions").select("*, categories(name, color, icon)").eq("user_id",c.id).gte("date",a).lte("date",l).order("date",{ascending:!1}),h.from("categories").select("*").eq("user_id",c.id).order("name"),h.from("savings").select("*").eq("user_id",c.id),h.from("savings_log").select("*").eq("user_id",c.id).eq("month",o),h.from("transactions").select("amount").eq("user_id",c.id).eq("date",p).eq("type","expense"),h.from("category_budgets").select("*").eq("user_id",c.id).eq("month",o),F,h.from("plans").select("*").eq("user_id",c.id).eq("target_month",f).eq("done",!1).order("created_at",{ascending:!0}),w]),W=ne.data||[],E={};(Ge.data||[]).forEach(r=>{E[r.category_id]=Number(r.budget_limit)});const K=(ie.data||[]).map(r=>({...r,budget_limit:E[r.id]!==void 0?E[r.id]:0,budget_set:E[r.id]!==void 0})),v=(ie.data||[]).find(r=>r.name==="Gaji"),ve=v?W.filter(r=>r.type==="income"&&r.category_id===v.id):[],oe=ve.reduce((r,n)=>r+Number(n.amount),0),ye=W.filter(r=>r.type==="expense").reduce((r,n)=>r+Number(n.amount),0),je=W.filter(r=>r.type==="income"&&r.category_id!==(v==null?void 0:v.id)).reduce((r,n)=>r+Number(n.amount),0),$={};W.filter(r=>r.type==="expense"&&r.categories).forEach(r=>{const n=r.categories.name;$[n]||($[n]={name:n,amount:0,color:r.categories.color,icon:r.categories.icon}),$[n].amount+=Number(r.amount)});const Oe=K.map(r=>{var H;const n=((H=$[r.name])==null?void 0:H.amount)||0,N=r.budget_limit>0?n/r.budget_limit*100:null;return{...r,spent:n,pct:N,overBudget:r.budget_limit>0&&n>r.budget_limit}}).sort((r,n)=>r.overBudget&&!n.overBudget?-1:!r.overBudget&&n.overBudget?1:(n.pct||0)-(r.pct||0));Se({salary:oe,totalExpense:ye,totalIncome:je,categories:Oe,transactions:W.slice(0,5),savings:Re.data||[],savingsLogs:Ae.data||[],todayExpense:(Le.data||[]).reduce((r,n)=>r+Number(n.amount),0),totalTabungan:(fe.data||[]).filter(r=>{const n=K.find(N=>N.id===r.category_id);return n&&n.name==="Tabungan Bulanan"}).reduce((r,n)=>r+Number(n.budget_limit),0)+(c.tabungan_awal||0),categorySpend:Object.values($).sort((r,n)=>n.amount-r.amount),nextMonthPlans:Ke.data||[],gajiTx:ve[0]||null,gajiCatId:(v==null?void 0:v.id)||null,cumulativeBalance:(He.data||[]).reduce((r,n)=>r+(n.type==="income"?Number(n.amount):-Number(n.amount)),0)+oe+je-ye+(c.saldo_awal||0),cumulativeMandatoryBudget:(fe.data||[]).filter(r=>{const n=K.find(N=>N.id===r.category_id);return n&&x(n)}).reduce((r,n)=>r+Number(n.budget_limit),0)});const we=oe;if(we>0){const r=K.filter(n=>x(n)&&E[n.id]===void 0);if(r.length>0){const n=Math.round(Number(we)*.15);await Promise.all(r.map(H=>h.from("category_budgets").upsert({user_id:c.id,category_id:H.id,month:o,budget_limit:n},{onConflict:"category_id,month"})));const{data:N}=await h.from("categories").select("*").eq("user_id",c.id).order("name");ie.data=N}}}finally{le(!1)}},De=a=>{const s=String(Math.round(a.budget_limit||0)),i=t.salary>0&&a.budget_limit>0?(a.budget_limit/t.salary*100).toFixed(1):"";b({id:a.id,nominal:s,pct:i})},Fe=a=>{const s=parseFloat(a)||0,i=t.salary>0&&s>0?(s/t.salary*100).toFixed(1):"";b(l=>({...l,nominal:a,pct:i}))},he=a=>{const s=parseFloat(a)||0,i=t.salary>0&&s>0?String(Math.round(s/100*t.salary)):"";b(l=>({...l,pct:a,nominal:i}))},We=async()=>{const a=parseFloat(g.nominal)||0;await h.from("category_budgets").upsert({user_id:c.id,category_id:g.id,month:o,budget_limit:a},{onConflict:"category_id,month"}),y("Budget disimpan","success"),b(null),C()},Ee=async()=>{await h.from("categories").delete().eq("id",Q.id),y("Kategori dihapus","success"),V(null),C()};t.categories.filter(a=>a.budget_limit>0).reduce((a,s)=>a+s.budget_limit,0);const $e=o===O(),ge=t.categories.filter(a=>a.overBudget),Ie=.15,_=t.categories.filter(a=>x(a)).reduce((a,s)=>{const i=s.budget_set?Number(s.budget_limit):t.salary>0?Math.round(t.salary*Ie):0;return a+i},0),L=t.categories.filter(a=>x(a)).reduce((a,s)=>a+(s.spent||0),0),qe=Math.max(0,_-L),xe=t.totalExpense+qe;t.salary+t.totalIncome-xe,t.salary>0&&xe/t.salary*100;const se=t.categories.filter(a=>a.name==="Tabungan Bulanan"&&a.budget_limit>0).reduce((a,s)=>a+Number(s.budget_limit),0),re=t.cumulativeBalance-t.cumulativeMandatoryBudget;t.salary-t.totalExpense-se;const G=t.salary>0?t.totalExpense/t.salary*100:0,ue=G>90?"var(--danger)":G>70?"var(--warning)":"var(--accent)",be=t.salary>0?t.salary-se:0;return be-t.totalExpense,t.salary>0&&se>0&&t.totalExpense>be,e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"dash-header",children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>te(ea(o)),children:"‹"}),e.jsx("span",{className:"month-label-text month-label-clickable",onClick:()=>{ae(Number(o.split("-")[0])),ee(a=>!a)},children:k(o)}),e.jsx("button",{className:"month-btn",onClick:()=>te(U(o)),disabled:$e,children:"›"})]}),pe&&(()=>{const a=O(),[s,i]=a.split("-").map(Number),l=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];return e.jsxs("div",{className:"month-picker-popup",onMouseDown:p=>p.preventDefault(),children:[e.jsxs("div",{className:"mp-year-row",children:[e.jsx("button",{className:"mp-year-btn",onClick:()=>ae(p=>p-1),children:"‹"}),e.jsx("span",{className:"mp-year-label",children:D}),e.jsx("button",{className:"mp-year-btn",onClick:()=>ae(p=>p+1),disabled:D>=s,children:"›"})]}),e.jsx("div",{className:"mp-grid",children:l.map((p,f)=>{const u=f+1,w=`${D}-${String(u).padStart(2,"0")}`,F=D>s||D===s&&u>i,ne=w===o;return e.jsx("button",{className:`mp-month-btn${ne?" mp-active":""}`,disabled:F,onClick:()=>{te(w),ee(!1)},children:p},w)})})]})})(),pe&&e.jsx("div",{style:{position:"fixed",inset:0,zIndex:299},onClick:()=>ee(!1)})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-primary btn-sm",style:{fontSize:"0.78rem",height:34},onClick:()=>S(!0),children:"+ Transaksi"}),e.jsx(Y,{to:`/categories?month=${o}`,className:"btn btn-secondary btn-sm",style:{fontSize:"0.78rem",height:34},children:"⚙ Settings"})]})]}),ge.length>0&&e.jsxs("div",{className:"alert-banner",children:[e.jsx("span",{children:"⚠"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Overbudget"})," — ",ge.map(a=>a.name).join(", ")]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx("div",{className:"hero-card",children:I?e.jsx("div",{className:"skeleton",style:{height:88,borderRadius:8}}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"hero-top",children:[e.jsxs("div",{className:"hero-left",children:[e.jsx("span",{className:"hero-eyebrow",children:"Total Saldo"}),e.jsxs("div",{className:`hero-balance ${re<0?"neg":""}`,children:[re<0&&e.jsx("span",{className:"hero-neg-sign",children:"-"}),d(Math.abs(re))]})]}),e.jsxs("div",{className:"hero-right",children:[e.jsxs("div",{className:"hero-chip hero-chip-btn",onClick:()=>{var a;Z({amount:t.gajiTx?String(t.gajiTx.amount):"",note:((a=t.gajiTx)==null?void 0:a.description)||""}),B(!0)},children:[e.jsx("span",{className:"hero-chip-label",children:"Gaji"}),e.jsx("span",{className:"hero-chip-val tabular",style:{color:t.salary>0?"var(--success)":"var(--text-muted)"},children:d(t.salary)}),e.jsx("span",{style:{fontSize:"0.6rem",color:"var(--accent)",fontWeight:600,marginTop:1},children:t.salary>0?"See Detail":"+ Catat sekarang"})]}),e.jsxs("div",{className:"hero-chip hero-chip-btn",onClick:()=>A(!0),children:[e.jsx("span",{className:"hero-chip-label",children:"Pengeluaran Wajib"}),e.jsx("span",{className:"hero-chip-val tabular",style:{color:_>0?"var(--danger)":"var(--text-muted)"},children:_>0?`−${d(_)}`:"—"}),e.jsx("span",{style:{fontSize:"0.6rem",color:"var(--accent)",fontWeight:600,marginTop:1},children:"See Detail"})]}),e.jsxs("div",{className:"hero-chip hero-chip-btn",onClick:()=>X(!0),children:[e.jsx("span",{className:"hero-chip-label",children:"Total Tabungan"}),e.jsx("span",{className:"hero-chip-val tabular",style:{color:t.totalTabungan>0?"var(--success)":"var(--text-muted)"},children:d(t.totalTabungan)}),e.jsx("span",{style:{fontSize:"0.6rem",color:"var(--accent)",fontWeight:600,marginTop:1},children:"See Detail"})]})]})]}),t.salary>0&&e.jsxs("div",{className:"hero-bar-section",style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx("div",{className:"hero-bar-track",style:{flex:1},children:e.jsx("div",{className:"hero-bar-fill",style:{width:`${Math.min(G,100)}%`,background:ue}})}),e.jsxs("span",{style:{fontSize:"0.68rem",color:ue,fontWeight:700,flexShrink:0},children:[G.toFixed(0),"%"]})]}),e.jsxs("div",{className:"hero-stats-row",children:[e.jsxs("div",{className:"hero-stat",children:[e.jsx("span",{className:"hero-stat-label",children:"Total Pengeluaran"}),e.jsx("span",{className:"hero-stat-val",style:{color:Math.max(0,t.totalExpense-L-t.totalIncome)>0?"var(--danger)":"var(--text-muted)"},children:Math.max(0,t.totalExpense-L-t.totalIncome)>0?`−${d(t.totalExpense-L-t.totalIncome)}`:"—"}),e.jsx("span",{className:"hero-stat-sub",children:"diluar wajib & tabungan"})]}),e.jsx("div",{className:"hero-stat-divider"}),(()=>{const a=c.budget_harian||0,s=t.todayExpense,i=a>0?s/a:0,l=a>0&&s>=a,p=a>0&&i>=.8&&!l,f=a>0&&s>0&&i<.8,u=l?"var(--danger)":p?"var(--warning)":s>0?"var(--danger)":"var(--text-muted)";return e.jsxs("div",{className:"hero-stat",children:[e.jsx("span",{className:"hero-stat-label",children:"Hari Ini"}),e.jsx("span",{className:"hero-stat-val",style:{color:u},children:s>0?`−${d(s)}`:"—"}),l?e.jsx("span",{className:"hero-stat-sub",style:{color:"var(--danger)",fontWeight:600},children:"melebihi budget harian"}):p?e.jsx("span",{className:"hero-stat-sub",style:{color:"var(--warning)",fontWeight:600},children:"mendekati budget harian"}):f?e.jsx("span",{className:"hero-stat-sub",style:{color:"var(--success)",fontWeight:600},children:"dalam budget harian"}):e.jsx("span",{className:"hero-stat-sub",children:"pengeluaran"})]})})(),e.jsx("div",{className:"hero-stat-divider"}),e.jsxs("div",{className:"hero-stat hero-stat-btn",onClick:()=>P(!0),children:[e.jsx("span",{className:"hero-stat-label",children:"Rencana Bulan Depan"}),e.jsx("span",{className:"hero-stat-val",style:{color:t.nextMonthPlans.length>0?"var(--text-primary)":"var(--text-muted)"},children:t.nextMonthPlans.length>0?d(t.nextMonthPlans.reduce((a,s)=>a+Number(s.amount),0)):"—"}),e.jsx("span",{className:"hero-stat-sub",style:{color:"var(--accent)",fontWeight:600},children:t.nextMonthPlans.length>0?`${t.nextMonthPlans.length} item · See Detail`:"Belum ada"})]})]})]})}),(I||t.categories.filter(a=>!x(a)&&!J(a)&&a.budget_limit>0).length>0)&&e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"sect-title",children:"Pengeluaran Tambahan"}),t.categories.filter(a=>!x(a)&&!J(a)&&a.budget_limit>0).length>0&&(()=>{const a=t.categories.filter(l=>!x(l)&&!J(l)).reduce((l,p)=>l+(p.spent||0),0),s=t.salary>0?t.salary-_:0,i=s>0?(a/s*100).toFixed(0):null;return e.jsxs("p",{className:"sect-sub",children:[d(a)," dari ",s>0?d(s):"—",i!==null&&` — ${i}%`]})})()]}),e.jsx("button",{className:"pill-link",onClick:()=>q(!0),children:"Kelola"})]}),I?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(2)].map((a,s)=>e.jsx("div",{className:"skeleton",style:{height:44}},s))}):e.jsx("div",{className:"budget-rows",children:t.categories.filter(a=>!x(a)&&!J(a)&&a.budget_limit>0).map(a=>{const s=a.spent/a.budget_limit*100,i=Math.min(s,100),l=!a.overBudget&&s>=100,p=!a.overBudget&&s>=80&&s<100,f=a.overBudget?"var(--danger)":l?"var(--success)":p?"var(--warning)":a.color;return e.jsxs("div",{className:"brow",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${a.color}18`,color:a.color},children:"↓"}),e.jsx("span",{className:"brow-name",children:a.name}),a.overBudget&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 7px"},children:"Over"}),l&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.6rem",padding:"2px 7px"},children:"Penuh"}),p&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem",padding:"2px 7px"},children:"Hampir"})]}),e.jsx("div",{className:"brow-bar-wrap",children:e.jsx("div",{className:"brow-bar",children:e.jsx("div",{className:"brow-bar-fill",style:{width:`${i}%`,background:f}})})}),e.jsxs("div",{className:"brow-right",children:[e.jsx("span",{className:"brow-spent tabular",style:{color:a.overBudget?"var(--danger)":"var(--text-primary)"},children:d(a.spent)}),e.jsxs("span",{className:"brow-limit tabular",children:["/",d(a.budget_limit)]})]}),e.jsxs("span",{className:"brow-pct",style:{color:f},children:[i.toFixed(0),"%"]})]},a.id)})})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",children:[e.jsx("h3",{className:"sect-title",children:"Transaksi Terakhir"}),e.jsx(Y,{to:`/transactions?month=${o}`,className:"pill-link",children:"Lihat semua"})]}),I?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,marginTop:12},children:[...Array(4)].map((a,s)=>e.jsx("div",{className:"skeleton",style:{height:42}},s))}):t.transactions.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:"↕"}),e.jsx("span",{children:"Belum ada transaksi bulan ini. "}),e.jsx("button",{className:"empty-hint-link",onClick:()=>S(!0),children:"Tambah sekarang →"})]}):e.jsx("div",{className:"tx-list",children:t.transactions.map(a=>{var s;return e.jsxs("div",{className:"tx-row",children:[e.jsx("div",{className:"tx-icon",style:{background:a.type==="income"?"rgba(52,211,153,0.12)":"rgba(248,113,113,0.12)",color:a.type==="income"?"var(--success)":"var(--danger)",fontSize:"1rem",fontWeight:700},children:a.type==="income"?"↑":"↓"}),e.jsxs("div",{className:"tx-meta",children:[e.jsx("span",{className:"tx-desc",children:a.description||((s=a.categories)==null?void 0:s.name)||"Transaksi"}),e.jsx("span",{className:"tx-date",children:new Date(a.date).toLocaleDateString("id-ID",{day:"numeric",month:"short"})})]}),e.jsxs("span",{className:`tx-amount tabular ${a.type==="income"?"inc":"exp"}`,children:[a.type==="income"?"+":"−",d(a.amount)]})]},a.id)})})]})]}),Be&&(()=>{const a=t.salary>0,s=async()=>{const i=parseFloat(z.amount.replace(/\D/g,""))||0;if(!i)return;me(!0);const l=`${o}-01`;t.gajiTx?await h.from("transactions").update({amount:i,description:z.note,date:l}).eq("id",t.gajiTx.id):await h.from("transactions").insert({user_id:c.id,category_id:t.gajiCatId,type:"income",amount:i,description:z.note,date:l}),y("Gaji disimpan","success"),me(!1),B(!1),C()};return e.jsx("div",{className:"modal-overlay",onClick:()=>B(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:i=>i.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Gaji ",k(o)]}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:a?"Edit jumlah atau catatan":"Catat pemasukan gaji bulan ini"})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>B(!1),children:"✕"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Jumlah Gaji"}),e.jsx(Ne,{value:z.amount,onChange:i=>Z(l=>({...l,amount:i})),autoFocus:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Catatan ",!a&&e.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400},children:"(opsional)"})]}),e.jsx("textarea",{className:"form-input",rows:3,placeholder:"Misal: gaji pokok + bonus, tunjangan, dll...",value:z.note,onChange:i=>Z(l=>({...l,note:i.target.value})),style:{resize:"vertical",fontFamily:"var(--font-sans)",fontSize:"0.875rem"}})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>B(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:s,disabled:de||!z.amount,children:de?"Menyimpan...":"Simpan"})]})]})})})(),Me&&e.jsx("div",{className:"modal-overlay",onClick:()=>X(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Total Tabungan"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:"Semua kantong tabungan"})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>X(!1),children:"✕"})]}),t.savings.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:"🏦"}),e.jsx("span",{children:"Belum ada kantong tabungan."})]}):e.jsxs("div",{className:"wajib-rows",children:[t.savings.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)"},children:"↓"}),e.jsx("span",{className:"brow-name",children:a.name})]}),e.jsx("span",{className:"wajib-amount tabular",style:{color:a.current_amount>0?"var(--success)":"var(--text-muted)"},children:d(a.current_amount||0)})]},a.id)),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total"}),e.jsx("span",{className:"wajib-amount tabular",style:{color:"var(--success)"},children:d(t.savings.reduce((a,s)=>a+Number(s.current_amount||0),0)+(c.tabungan_awal||0))})]})]})]})}),Pe&&e.jsx("div",{className:"modal-overlay",onClick:()=>P(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Rencana Bulan Depan"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:k(U(o))})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx(Y,{to:"/savings",className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>P(!1),children:"Kelola →"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>P(!1),children:"✕"})]})]}),t.nextMonthPlans.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:"◈"}),e.jsxs("span",{children:["Belum ada rencana untuk ",k(U(o)),"."]}),e.jsx(Y,{to:"/savings",className:"empty-hint-link",onClick:()=>P(!1),children:"Tambah →"})]}):e.jsxs("div",{className:"wajib-rows",children:[t.nextMonthPlans.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsx("span",{className:"brow-name",children:a.name}),e.jsx("span",{className:"wajib-amount tabular",children:d(a.amount)})]},a.id)),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total"}),e.jsx("span",{className:"wajib-amount tabular",children:d(t.nextMonthPlans.reduce((a,s)=>a+Number(s.amount),0))})]})]})]})}),Te&&e.jsx("div",{className:"modal-overlay",onClick:()=>A(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:420},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Pengeluaran Tetap"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:k(o)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>{A(!1),q(!0)},children:"Kelola"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>A(!1),children:"✕"})]})]}),e.jsxs("div",{className:"wajib-rows",children:[t.categories.filter(a=>x(a)).map(a=>{const s=a.budget_set?Number(a.budget_limit):t.salary>0?Math.round(t.salary*.15):0,i=t.salary>0&&s>0?Math.round(s/t.salary*100):null;return e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:"↓"}),e.jsx("span",{className:"brow-name",children:a.name})]}),e.jsxs("div",{className:"wajib-right",children:[i&&e.jsxs("span",{className:"wajib-pct",children:[i,"%"]}),e.jsx("span",{className:"wajib-amount tabular",children:s>0?d(s):"—"})]})]},a.id)}),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Potongan"}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",d(_)]})]})]})]})}),ze&&e.jsx("div",{className:"modal-overlay",onClick:()=>S(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>S(!1),children:"✕"})]}),e.jsx(Qe,{month:o,onSuccess:()=>{C(),S(!1)},onClose:()=>S(!1)})]})}),Ce&&!g&&!ce&&e.jsx("div",{className:"modal-overlay",onClick:()=>q(!1),children:e.jsxs("div",{className:"modal cat-manager-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Kelola Kategori"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:k(o)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>{_e({is_mandatory:!0}),M(!0)},children:"+ Kategori"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>q(!1),children:"✕"})]})]}),e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("p",{className:"cat-mgr-section-title",children:"Pengeluaran Wajib"}),e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:t.categories.filter(a=>x(a)).map(a=>{const s=Number(a.budget_limit)||0,i=t.salary>0&&s>0?Math.round(s/t.salary*100):null;return e.jsxs("div",{className:"cat-mgr-row",children:[e.jsxs("div",{className:"cat-mgr-left",children:[e.jsx("span",{className:"cat-mgr-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:"↓"}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-mgr-name",children:a.name}),e.jsx("span",{className:"cat-mgr-sub",children:"Wajib · langsung dipotong"})]})]}),e.jsxs("div",{className:"cat-mgr-right",children:[i&&e.jsxs("span",{className:"cat-mgr-pct",children:[i,"%"]}),e.jsx("span",{className:"cat-mgr-amount tabular",children:s>0?d(s):"—"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.7rem"},onClick:()=>De(a),children:"Ubah"})]})]},a.id)})})]})]})}),g&&(()=>{const a=t.categories.find(s=>s.id===g.id);return e.jsx("div",{className:"modal-overlay",onClick:()=>b(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Pengeluaran Wajib — ",a==null?void 0:a.name]}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[k(o),t.salary>0?` · Gaji ${d(t.salary)}`:""]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>b(null),children:"✕"})]}),t.salary>0&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx("input",{className:"form-input",type:"number",placeholder:String(Ze),value:g.pct,onChange:s=>he(s.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),e.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),g.pct&&t.salary>0&&e.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",d(Math.round(parseFloat(g.pct)/100*t.salary))]})]}),!g.pct&&e.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(s=>e.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>he(String(s)),children:[s,"%"]},s))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),e.jsx(Ne,{value:g.nominal,onChange:Fe,autoFocus:!t.salary})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:16},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)",fontSize:"0.78rem"},onClick:()=>{b(null),V({id:a.id,name:a.name})},children:"Hapus Kategori"}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>b(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",onClick:We,children:"Simpan"})]})]})]})})})(),Q&&e.jsx(Xe,{title:"Hapus Kategori",message:`Hapus kategori "${Q.name}"? Transaksi yang terhubung tidak akan ikut terhapus.`,confirmLabel:"Hapus",onConfirm:Ee,onCancel:()=>V(null)}),ce&&e.jsx("div",{className:"modal-overlay",onClick:()=>M(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:R!=null&&R.id?"Edit Kategori":"Kategori Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>M(!1),children:"✕"})]}),e.jsx(Ve,{editData:R,salary:t.salary,month:o,onSuccess:()=>{C(),M(!1)},onClose:()=>M(!1)})]})}),e.jsx("style",{children:`
        /* ── Header ───────────────────────────── */
        .dash-header {
          display: flex; align-items: center; justify-content: space-between;
          gap: 10px;
          position: sticky; top: 0; z-index: 100;
          background: var(--bg-sticky);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          padding: 10px 0;
          margin-bottom: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .month-nav-group {
          display: flex; align-items: center; gap: 0;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 99px; overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        .month-btn {
          width: 34px; height: 34px; border: none; background: transparent;
          color: var(--text-secondary); font-size: 1.1rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s; font-family: var(--font-sans); flex-shrink: 0;
        }
        .month-btn:hover:not(:disabled) { background: var(--bg-input); color: var(--text-primary); }
        .month-btn:disabled { opacity: 0.2; cursor: not-allowed; }
        .month-btn:first-child { border-right: 1px solid var(--border); }
        .month-btn:last-child  { border-left:  1px solid var(--border); }
        .month-label-text {
          font-size: 0.875rem; font-weight: 700; letter-spacing: -0.02em;
          color: var(--text-primary); padding: 0 16px; min-width: 120px;
          text-align: center; line-height: 34px; white-space: nowrap;
        }
        .month-label-clickable {
          cursor: pointer; transition: color 0.15s; user-select: none;
        }
        .month-label-clickable:hover { color: var(--accent); }

        /* ── Month Picker Popup ───────────────── */
        .month-picker-popup {
          position: absolute; top: calc(100% + 8px); left: 0;
          z-index: 300; width: 224px;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          padding: 12px;
        }
        .mp-year-row {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 10px;
        }
        .mp-year-btn {
          width: 28px; height: 28px; border: none; background: transparent;
          color: var(--text-secondary); font-size: 1rem; cursor: pointer;
          border-radius: var(--radius-sm); display: flex; align-items: center;
          justify-content: center; transition: all 0.15s; font-family: var(--font-sans);
        }
        .mp-year-btn:hover:not(:disabled) { background: var(--bg-input); color: var(--text-primary); }
        .mp-year-btn:disabled { opacity: 0.2; cursor: not-allowed; }
        .mp-year-label {
          font-size: 0.875rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em;
        }
        .mp-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px;
        }
        .mp-month-btn {
          padding: 7px 0; border: 1px solid transparent; background: transparent;
          color: var(--text-secondary); font-size: 0.75rem; font-weight: 600;
          border-radius: var(--radius-sm); cursor: pointer; transition: all 0.12s;
          font-family: var(--font-sans);
        }
        .mp-month-btn:hover:not(:disabled) {
          background: var(--bg-input); color: var(--text-primary); border-color: var(--border);
        }
        .mp-month-btn:disabled { opacity: 0.2; cursor: not-allowed; }
        .mp-month-btn.mp-active {
          background: var(--accent); color: #fff; border-color: var(--accent); font-weight: 700;
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
        .hero-month-delta {
          display: block; font-size: 0.72rem; font-weight: 600;
          margin-top: 4px; letter-spacing: -0.01em;
        }

        .hero-right {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-rows: auto;
          grid-auto-flow: column;
          gap: 8px;
          align-items: start;
        }
        .hero-chip {
          display: flex; flex-direction: column; align-items: flex-end; gap: 2px;
          background: var(--hero-chip-bg); border: 1px solid var(--hero-chip-border);
          border-radius: var(--radius-sm); padding: 8px 12px; min-width: 130px;
        }
        .hero-chip-btn {
          cursor: pointer; transition: border-color 0.15s, background 0.15s;
        }
        .hero-chip-btn:hover { border-color: var(--accent); background: var(--accent-dim); }
        .hero-chip-label {
          font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.07em;
          color: var(--hero-muted); font-weight: 600;
        }
        .hero-chip-val {
          font-size: 0.9rem; font-weight: 700;
          color: var(--hero-chip-val); letter-spacing: -0.02em;
        }

        .hero-bar-section {}
        .hero-stats-row {
          display: flex;
          align-items: stretch;
          gap: 0;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }
        .hero-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 0 12px;
        }
        .hero-stat:first-child { padding-left: 0; }
        .hero-stat:last-child { padding-right: 0; }
        .hero-stat-btn { cursor: pointer; }
        .hero-stat-btn:hover .hero-stat-label { color: var(--accent); }
        .hero-stat-label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .hero-stat-val {
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
          color: var(--text-primary);
        }
        .hero-stat-sub {
          font-size: 0.6rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .hero-stat-divider {
          width: 1px;
          background: var(--border);
          flex-shrink: 0;
          align-self: stretch;
        }
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
        .wajib-type-badge {
          font-size: 0.55rem; text-transform: uppercase; letter-spacing: 0.06em;
          font-weight: 700; padding: 2px 7px; border-radius: 99px; flex-shrink: 0;
        }
        .wajib-type-badge.income {
          background: rgba(34,197,94,0.12); color: var(--success);
        }
        .wajib-divider {
          height: 1px; background: var(--border); margin: 4px 0;
        }
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
      `})]})}export{na as default};
