import{G as la,J as da,M as ca,K as ma,E as g,x as U,D as e,A as z,H as ga,z as Fe,B as pa,F as u,w as p,a as ba,L as H,e as se,o as $e,n as Ee,d as Ie,b as re,c as Le,t as B,C as qe}from"./index-CQKwVZRO.js";import{T as ua}from"./TransactionForm-Cya7fdrb.js";import{C as ha}from"./CategoryForm-Cq7Tjov5.js";import{b as xa,a as ve,i as K,C as fa}from"./ConfirmModal-Cm6hxZjU.js";const va=15;function ja(d){const[$,f]=d.split("-").map(Number),D=new Date($,f-2,1);return`${D.getFullYear()}-${String(D.getMonth()+1).padStart(2,"0")}`}function ne(d){const[$,f]=d.split("-").map(Number),D=new Date($,f,1);return`${D.getFullYear()}-${String(D.getMonth()+1).padStart(2,"0")}`}function za(){var Ce;const{user:d}=la(),{setHeader:$}=da(),f=ca(),[D,We]=ma(),[l,Re]=g.useState(()=>D.get("month")||U()),[t,He]=g.useState({salary:0,totalExpense:0,totalIncome:0,categories:[],transactions:[],savings:[],savingsLogs:[],categorySpend:[],hutangList:[],hutangTabunganList:[],todayExpense:0,totalTabungan:0,tabunganPerMonth:[],nextMonthPlans:[],cumulativeBalance:0,cumulativeMandatoryBudget:0,gajiTx:null,gajiCatId:null}),[_,je]=g.useState(!0),[Ke,E]=g.useState(!1),[Oe,ie]=g.useState(!1),[v,S]=g.useState(null),[ye,O]=g.useState(!1),[J,Ge]=g.useState(null),[G,oe]=g.useState(null),[Ye,Q]=g.useState(!1),[Ue,le]=g.useState(!1),[Je,X]=g.useState(!1),[Qe,Y]=g.useState(!1),[C,V]=g.useState({amount:"",note:"",date:""}),[we,Ne]=g.useState(!1),[de,ce]=g.useState(!1),[N,me]=g.useState(()=>Number(U().split("-")[0])),[Xe,Ve]=g.useState(!1),[Z,ke]=g.useState("transaction"),[ge,ze]=g.useState(0);g.useEffect(()=>{if(d.recording_start_month&&l<d.recording_start_month){ee(d.recording_start_month);return}I()},[l,d==null?void 0:d.recording_start_month]),g.useEffect(()=>{const a=l===U(),n=!!d.recording_start_month&&l<=d.recording_start_month,[o,c]=d.recording_start_month?d.recording_start_month.split("-").map(Number):[0,0],b=U(),[w,M]=b.split("-").map(Number),r=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];return $(e.jsxs(e.Fragment,{children:[de&&e.jsx("div",{style:{position:"fixed",inset:0,zIndex:299},onClick:()=>ce(!1)}),e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>ee(ja(l)),disabled:n,children:"‹"}),e.jsx("span",{className:"month-label-text month-label-clickable",onClick:()=>{me(Number(l.split("-")[0])),ce(m=>!m)},children:z(l)}),e.jsx("button",{className:"month-btn",onClick:()=>ee(ne(l)),disabled:a,children:"›"}),de&&e.jsxs("div",{className:"month-picker-popup",onMouseDown:m=>m.preventDefault(),children:[e.jsxs("div",{className:"mp-year-row",children:[e.jsx("button",{className:"mp-year-btn",onClick:()=>me(m=>m-1),disabled:!!d.recording_start_month&&N<=o,children:"‹"}),e.jsx("span",{className:"mp-year-label",children:N}),e.jsx("button",{className:"mp-year-btn",onClick:()=>me(m=>m+1),disabled:N>=w,children:"›"})]}),e.jsx("div",{className:"mp-grid",children:r.map((m,k)=>{const h=k+1,j=`${N}-${String(h).padStart(2,"0")}`,x=N>w||N===w&&h>M,y=!!d.recording_start_month&&(N<o||N===o&&h<c);return e.jsx("button",{className:`mp-month-btn${j===l?" mp-active":""}`,disabled:x||y,onClick:()=>{ee(j),ce(!1)},children:m},j)})})]})]})]})),()=>$(null)},[l,de,N,d==null?void 0:d.recording_start_month]),ga();const ee=a=>{Re(a),We({month:a})},I=async()=>{je(!0);try{const a=`${l}-01`,n=Fe(l),o=pa(),c=ne(l),b=d.recording_start_month;let w=u.from("transactions").select("amount, type").eq("user_id",d.id).lt("date",a);b&&(w=w.gte("date",`${b}-01`));let M=u.from("category_budgets").select("budget_limit, category_id, month, categories(is_mandatory, name)").eq("user_id",d.id).lte("month",l);b&&(M=M.gte("month",b));const[r,m,k,h,j,x,y,F,q,ue,ae]=await Promise.all([u.from("transactions").select("*, categories(name, color, icon)").eq("user_id",d.id).gte("date",a).lte("date",n).order("date",{ascending:!1}),Promise.all([u.from("categories").select("*").eq("user_id",d.id).is("month",null),u.from("categories").select("*").eq("user_id",d.id).eq("month",l)]).then(([s,i])=>{const fe=[...(s.data||[]).filter(R=>xa(R)),...i.data||[]].sort((R,oa)=>R.name.localeCompare(oa.name)),Ae=new Set;return{data:fe.filter(R=>Ae.has(R.name)?!1:(Ae.add(R.name),!0))}}),u.from("savings").select("*").eq("user_id",d.id),u.from("savings_log").select("*").eq("user_id",d.id).eq("month",l),u.from("transactions").select("amount").eq("user_id",d.id).eq("date",o).eq("type","expense"),u.from("category_budgets").select("category_id, budget_limit").eq("user_id",d.id).eq("month",l),M,u.from("plans").select("*").eq("user_id",d.id).eq("target_month",c).eq("done",!1).order("created_at",{ascending:!0}),w,u.from("hutang").select("id, nama, amount, due_date, sumber, jenis, lunas").eq("user_id",d.id).lte("month",l).eq("lunas",!1).order("due_date",{ascending:!0,nullsFirst:!1}),u.from("hutang").select("id, nama, amount, jenis, lunas, created_at").eq("user_id",d.id).lte("month",l).eq("sumber","tabungan").order("created_at",{ascending:!1})]),W=r.data||[],he={};(x.data||[]).forEach(s=>{he[s.category_id]=Number(s.budget_limit)});let Te=(m.data||[]).map(s=>{const i=he[s.id]!==void 0?he[s.id]:0;return{...s,budget_limit:i,budget_set:i>0}});const P=Te.find(s=>ve(s)),Me=P?W.filter(s=>s.type==="income"&&s.category_id===P.id):[],Pe=Me.reduce((s,i)=>s+Number(i.amount),0),na=Te,Be=W.filter(s=>s.type==="expense").reduce((s,i)=>s+Number(i.amount),0),De=W.filter(s=>s.type==="income"&&s.category_id!==(P==null?void 0:P.id)).reduce((s,i)=>s+Number(i.amount),0),xe={};W.filter(s=>s.type==="expense"&&s.category_id).forEach(s=>{xe[s.category_id]=(xe[s.category_id]||0)+Number(s.amount)});const te={};W.filter(s=>s.type==="expense"&&s.categories).forEach(s=>{const i=s.categories.name;te[i]||(te[i]={name:i,amount:0,color:s.categories.color,icon:s.categories.icon}),te[i].amount+=Number(s.amount)});const ia=na.map(s=>{const i=xe[s.id]||0,fe=s.budget_limit>0?i/s.budget_limit*100:null;return{...s,spent:i,pct:fe,overBudget:s.budget_limit>0&&i>s.budget_limit}}).sort((s,i)=>s.overBudget&&!i.overBudget?-1:!s.overBudget&&i.overBudget?1:(i.pct||0)-(s.pct||0));He({salary:Pe,totalExpense:Be,totalIncome:De,categories:ia,transactions:W.slice(0,5),savings:k.data||[],savingsLogs:h.data||[],todayExpense:(j.data||[]).reduce((s,i)=>s+Number(i.amount),0),tabunganPerMonth:(y.data||[]).filter(s=>{var i;return((i=s.categories)==null?void 0:i.name)==="Tabungan Bulanan"&&Number(s.budget_limit)>0}).sort((s,i)=>s.month.localeCompare(i.month)),totalTabungan:(y.data||[]).filter(s=>{var i;return((i=s.categories)==null?void 0:i.name)==="Tabungan Bulanan"}).reduce((s,i)=>s+Number(i.budget_limit),0)+(d.tabungan_awal||0)-(ae.data||[]).filter(s=>!s.lunas).reduce((s,i)=>s+Number(i.amount),0),categorySpend:Object.values(te).sort((s,i)=>i.amount-s.amount),nextMonthPlans:F.data||[],gajiTx:Me[0]||null,gajiCatId:(P==null?void 0:P.id)||null,hutangList:ue.data||[],hutangTabunganList:ae.data||[],cumulativeBalance:(q.data||[]).reduce((s,i)=>s+(i.type==="income"?Number(i.amount):-Number(i.amount)),0)+Pe+De-Be+(d.saldo_awal||0),cumulativeMandatoryBudget:(y.data||[]).filter(s=>{var i;return((i=s.categories)==null?void 0:i.is_mandatory)===!0}).reduce((s,i)=>s+Number(i.budget_limit),0)})}finally{je(!1)}},Ze=a=>{const n=String(Math.round(a.budget_limit||0)),o=t.salary>0&&a.budget_limit>0?(a.budget_limit/t.salary*100).toFixed(1):"";S({id:a.id,nominal:n,pct:o})},ea=a=>{const n=parseFloat(a)||0,o=t.salary>0&&n>0?(n/t.salary*100).toFixed(1):"";S(c=>({...c,nominal:a,pct:o}))},_e=a=>{const n=parseFloat(a)||0,o=t.salary>0&&n>0?String(Math.round(n/100*t.salary)):"";S(c=>({...c,pct:a,nominal:o}))},aa=async()=>{const a=parseFloat(v.nominal)||0,[n,o]=await Promise.all([u.from("category_budgets").upsert({user_id:d.id,category_id:v.id,month:l,budget_limit:a},{onConflict:"category_id,month"}),u.from("categories").update({budget_limit:a}).eq("id",v.id)]),c=n.error||o.error;if(c){f(c.message,"error");return}f("Budget disimpan","success"),S(null),I()},ta=async()=>{const a=`${l}-01`,n=Fe(l),[o,c]=await Promise.all([u.from("transactions").delete().eq("category_id",G.id).gte("date",a).lte("date",n),u.from("category_budgets").delete().eq("category_id",G.id).eq("month",l)]);if(o.error||c.error){f((o.error||c.error).message,"error");return}const{error:b}=await u.from("categories").delete().eq("id",G.id);if(b){f(b.message,"error");return}f("Kategori dihapus","success"),oe(null),I()};t.categories.filter(a=>a.budget_limit>0).reduce((a,n)=>a+n.budget_limit,0),U();const A=t.categories.filter(a=>a.overBudget);g.useEffect(()=>{if(A.length<=1){ze(0);return}const a=setInterval(()=>ze(n=>(n+1)%A.length),2e3);return()=>clearInterval(a)},[A.length]);const L=t.categories.filter(a=>K(a)).reduce((a,n)=>a+Number(n.budget_limit||0),0),sa=t.categories.filter(a=>K(a)).reduce((a,n)=>a+(n.spent||0),0),ra=Math.max(0,L-sa),T=t.totalExpense+ra;t.salary+t.totalIncome-T,t.salary>0&&T/t.salary*100;const pe=t.categories.filter(a=>a.name==="Tabungan Bulanan"&&a.budget_limit>0).reduce((a,n)=>a+Number(n.budget_limit),0),be=t.cumulativeBalance-t.cumulativeMandatoryBudget;t.salary-t.totalExpense-pe,t.salary>0&&t.totalExpense/t.salary*100;const Se=t.salary>0?t.salary-pe:0;return Se-t.totalExpense,t.salary>0&&pe>0&&t.totalExpense>Se,e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"db-page",children:[e.jsxs("div",{className:"db-hero",children:[e.jsx("span",{className:"db-eyebrow",children:"TOTAL SALDO"}),_?e.jsx("div",{className:"skeleton",style:{height:56,width:220,borderRadius:8,marginTop:6}}):e.jsxs("div",{className:`db-balance${be<0?" neg":""}`,children:[be<0&&e.jsx("span",{className:"db-neg-sign",children:"−"}),p(Math.abs(be))]}),!_&&t.todayExpense>0&&e.jsx("div",{className:"db-daily",children:(()=>{const a=d.budget_harian||0,n=t.todayExpense,o=a>0&&n>=a,c=a>0&&n/a>=.8&&!o,b=o?"#f87171":c?"#fbbf24":"var(--text-muted)";return e.jsxs(e.Fragment,{children:[e.jsxs("span",{style:{color:b},children:["Hari ini −",p(n)]}),o&&e.jsx("span",{className:"db-daily-badge",style:{background:"rgba(248,113,113,0.1)",color:"#f87171"},children:"melebihi limit"}),c&&e.jsx("span",{className:"db-daily-badge",style:{background:"rgba(251,191,36,0.1)",color:"#fbbf24"},children:"hampir limit"})]})})()})]}),!_&&e.jsxs("div",{className:"db-stats-grid",children:[e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>{var a,n;V({amount:t.gajiTx?String(t.gajiTx.amount):"",note:((a=t.gajiTx)==null?void 0:a.description)||"",date:((n=t.gajiTx)==null?void 0:n.date)||`${l}-01`}),Y(!0)},children:[e.jsx("span",{className:"db-stat-label",children:"PEMASUKAN"}),e.jsx("span",{className:"db-stat-val tabular",style:{color:t.salary>0?"#34d399":"var(--text-muted)"},children:t.salary>0?`+${p(t.salary)}`:"—"}),e.jsx("span",{className:"db-stat-sub",children:t.salary>0?"bulan ini":"belum dicatat"})]}),e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>Q(!0),children:[e.jsx("span",{className:"db-stat-label",children:"WAJIB"}),e.jsx("span",{className:"db-stat-val tabular",style:{color:L>0?"#f87171":"var(--text-muted)"},children:L>0?`−${p(L)}`:"—"}),e.jsx("span",{className:"db-stat-sub",children:L>0?"auto-deduct":"belum diatur"})]}),e.jsxs("div",{className:"db-stat",children:[e.jsx("span",{className:"db-stat-label",children:"PENGELUARAN"}),e.jsx("span",{className:"db-stat-val tabular",style:{color:T>t.totalIncome?"#f87171":T>0?"var(--text-primary)":"var(--text-muted)"},children:T>0?`−${p(T-t.totalIncome)}`:"—"}),e.jsx("span",{className:"db-stat-sub",children:t.salary>0&&T>0?`${Math.round(T/t.salary*100)}% gaji`:"bulan ini"})]}),e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>le(!0),children:[e.jsx("span",{className:"db-stat-label",children:"TABUNGAN"}),e.jsx("span",{className:"db-stat-val tabular",style:{color:t.totalTabungan>0?"#34d399":"var(--text-muted)"},children:p(t.totalTabungan)}),e.jsx("span",{className:"db-stat-sub",children:((Ce=t.savings)==null?void 0:Ce.length)>0?`${t.savings.length} kantong`:"semua kantong"})]})]}),_&&e.jsx("div",{className:"skeleton",style:{height:120,borderRadius:"var(--radius-lg)"}}),(()=>{var M;const a=t.categories.filter(r=>!K(r)&&!ve(r)&&r.is_monthly&&(r.budget_limit>0||(r.spent||0)>0)),n=t.categories.filter(r=>!K(r)&&!ve(r)&&!r.is_monthly&&(r.budget_limit>0||(r.spent||0)>0)),o=(t.hutangList||[]).filter(r=>r.jenis==="hutang"),c=(t.hutangList||[]).filter(r=>r.jenis==="piutang"),b=!_&&a.length===0&&n.length===0&&o.length===0&&c.length===0,w=({cat:r})=>{const m=r.budget_limit>0?r.spent/r.budget_limit*100:0,k=Math.min(m,100),h=m>100,j=!h&&m>=100,x=!h&&m>=80&&m<100,y=h?"var(--danger)":j?"var(--success)":x?"var(--warning)":r.color||"var(--accent)",F=r.budget_limit-(r.spent||0),q=t.salary>0&&r.budget_limit>0?Math.round(r.budget_limit/t.salary*100):null,ue=r.budget_limit>0;return e.jsxs("div",{className:`brow${!ue&&r.spent>0?" brow-no-budget":""}`,children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${r.color||"#6366f1"}18`},children:e.jsx("span",{style:{width:10,height:10,borderRadius:"50%",background:r.color||"var(--accent)",display:"inline-block",flexShrink:0}})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("span",{className:"brow-name",children:r.name}),h&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Over"}),j&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Penuh"}),x&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Hampir"})]})]}),r.budget_limit>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"brow-bar-wrap",children:e.jsx("div",{className:"brow-bar",children:e.jsx("div",{className:"brow-bar-fill",style:{width:`${k}%`,background:y}})})}),e.jsxs("div",{className:"brow-right",onClick:()=>q&&Ve(ae=>!ae),style:{cursor:q?"pointer":"default"},children:[e.jsx("span",{className:"brow-spent tabular",style:{color:h?"var(--danger)":"var(--text-primary)"},children:p(r.spent||0)}),Xe&&q?e.jsxs("span",{className:"brow-limit tabular",style:{color:"var(--accent)"},children:[q,"% gaji"]}):e.jsx("span",{className:"brow-limit tabular",style:{color:F<0?"var(--danger)":F===0?"var(--text-muted)":"var(--success)"},children:F<0?`Over ${p(Math.abs(F))}`:`Sisa ${p(F)}`})]}),e.jsxs("span",{className:"brow-pct",style:{color:y},children:[m.toFixed(0),"%"]})]}):r.spent>0?e.jsxs("span",{className:"brow-only-spent tabular",style:{color:"var(--danger)"},children:["−",p(r.spent)]}):null]})};return e.jsxs(e.Fragment,{children:[!_&&A.length>0&&e.jsxs("div",{className:"db-alert",children:[e.jsx(ba,{size:11}),e.jsxs("span",{children:["Overbudget — ",e.jsx("strong",{children:(M=A[ge])==null?void 0:M.name})]}),A.length>1&&e.jsxs("span",{className:"db-alert-count",children:[ge+1,"/",A.length]})]},ge),e.jsxs("div",{className:"card dash-tab-card",children:[e.jsxs("div",{className:"sect-head",style:{marginBottom:16},children:[e.jsxs("div",{className:"dash-tab-toggle",children:[e.jsx("button",{className:`dash-tab-btn${Z==="transaction"?" active":""}`,onClick:()=>ke("transaction"),children:"My Transaction"}),e.jsx("button",{className:`dash-tab-btn${Z==="budget"?" active":""}`,onClick:()=>ke("budget"),children:"My Budget"})]}),e.jsxs("div",{className:"tab-actions",children:[e.jsxs(H,{to:`/transactions?month=${l}`,className:"tab-act",children:[e.jsx(se,{size:13}),e.jsx("span",{className:"tab-act-label",children:"Lihat semua"})]}),e.jsxs(H,{to:`/categories?month=${l}`,className:"tab-act",children:[e.jsx($e,{size:13}),e.jsx("span",{className:"tab-act-label",children:"Atur"})]}),e.jsxs("button",{className:"tab-act tab-act-accent",onClick:()=>E(!0),children:[e.jsx(Ee,{size:13}),e.jsx("span",{className:"tab-act-label",children:"Transaksi"})]})]})]}),e.jsxs("div",{className:"card-scroll-body",children:[Z==="transaction"&&(_?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[...Array(4)].map((r,m)=>e.jsx("div",{className:"skeleton",style:{height:42}},m))}):t.transactions.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(Ie,{size:13})}),e.jsx("span",{children:"Belum ada transaksi bulan ini."}),e.jsx("button",{className:"empty-hint-link",onClick:()=>E(!0),children:"Tambah sekarang →"})]}):e.jsx("div",{className:"tx-list",children:t.transactions.map(r=>{var m;return e.jsxs("div",{className:"tx-row",children:[e.jsx("div",{className:"tx-icon",style:{background:r.type==="income"?"rgba(52,211,153,0.12)":"rgba(248,113,113,0.12)",color:r.type==="income"?"var(--success)":"var(--danger)"},children:r.type==="income"?e.jsx(Ie,{size:14}):e.jsx(re,{size:14})}),e.jsxs("div",{className:"tx-meta",children:[e.jsx("span",{className:"tx-desc",children:r.description||((m=r.categories)==null?void 0:m.name)||"Transaksi"}),e.jsx("span",{className:"tx-date",children:new Date(r.date).toLocaleDateString("id-ID",{day:"numeric",month:"short"})})]}),e.jsxs("span",{className:`tx-amount tabular ${r.type==="income"?"inc":"exp"}`,children:[r.type==="income"?"+":"−",p(r.amount)]})]},r.id)})})),Z==="budget"&&(_?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(3)].map((r,m)=>e.jsx("div",{className:"skeleton",style:{height:44}},m))}):b?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx($e,{size:14})}),e.jsx("span",{children:"Tambahkan kategori dan budget"}),e.jsx(H,{to:`/categories?month=${l}`,className:"empty-hint-link",style:{color:"var(--accent)"},children:"Atur →"})]}):e.jsxs(e.Fragment,{children:[(o.length>0||c.length>0)&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Hutang & Piutang"}),e.jsx("div",{className:"budget-rows",children:[...o,...c].map(r=>{const m=r.jenis==="piutang",k=m?"#f59e0b":"#f87171",h=new Date;h.setHours(0,0,0,0);const j=r.due_date?new Date(r.due_date):null,x=j?Math.round((j-h)/864e5):null,y=x!==null&&x<0;return e.jsxs("div",{className:"brow",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${k}18`,color:k},children:m?e.jsx(Le,{size:13}):e.jsx(se,{size:13})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("span",{className:"brow-name",children:r.nama}),e.jsx("span",{style:{fontSize:"0.62rem",color:"var(--text-muted)",marginLeft:6},children:m?"piutang":"hutang"}),y&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Terlambat"})]})]}),e.jsx("div",{style:{flex:1}}),e.jsxs("div",{className:"brow-right",children:[e.jsx("span",{className:"brow-spent tabular",style:{color:k},children:p(r.amount)}),r.due_date&&e.jsx("span",{className:"brow-limit tabular",style:{color:y?"var(--danger)":x<=7?"var(--warning)":"var(--text-muted)"},children:x===0?"Hari ini":x>0?`${x}h lagi`:`${Math.abs(x)}h lalu`})]})]},r.id)})})]}),(o.length>0||c.length>0)&&a.length>0&&e.jsx("div",{style:{height:1,background:"var(--border)",margin:"12px 0"}}),a.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Pengeluaran Rutin"}),e.jsx("div",{className:"budget-rows",children:a.map(r=>e.jsx(w,{cat:r},r.id))})]}),(a.length>0||o.length>0||c.length>0)&&n.length>0&&e.jsx("div",{style:{height:1,background:"var(--border)",margin:"12px 0"}}),n.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Kategori Lainnya"}),e.jsx("div",{className:"budget-rows",children:n.map(r=>e.jsx(w,{cat:r},r.id))})]}):o.length===0&&c.length===0&&a.length===0&&e.jsxs("div",{style:{fontSize:"0.72rem",color:"var(--text-muted)"},children:["Belum ada kategori dengan budget. ",e.jsx(H,{to:`/categories?month=${l}`,style:{color:"var(--accent)"},children:"Atur →"})]})]}))]})]})]})})()]}),Qe&&(()=>{const a=t.salary>0,n=async()=>{const o=parseFloat(C.amount.replace(/\D/g,""))||0;if(o){Ne(!0);try{const c=C.date||`${l}-01`;if(t.gajiTx){const{error:b}=await u.from("transactions").update({amount:o,description:C.note,date:c}).eq("id",t.gajiTx.id);if(b)throw b}else{const{error:b}=await u.from("transactions").insert({user_id:d.id,category_id:t.gajiCatId,type:"income",amount:o,description:C.note,date:c});if(b)throw b}f("Pemasukan disimpan","success"),Y(!1),I()}catch(c){f(c.message,"error")}finally{Ne(!1)}}};return e.jsx("div",{className:"modal-overlay",onClick:()=>Y(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:o=>o.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Pemasukan Bulanan ",z(l)]}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:a?"Edit jumlah atau catatan":"Catat pemasukan bulan ini"})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>Y(!1),children:e.jsx(B,{size:16})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Jumlah Pemasukan"}),e.jsx(qe,{value:C.amount,onChange:o=>V(c=>({...c,amount:o})),autoFocus:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Tanggal Diterima"}),e.jsx("input",{className:"form-input",type:"date",value:C.date,min:`${l}-01`,max:(()=>{const[o,c]=l.split("-").map(Number);return new Date(o,c,0).toISOString().split("T")[0]})(),onChange:o=>V(c=>({...c,date:o.target.value}))})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Catatan ",!a&&e.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400},children:"(opsional)"})]}),e.jsx("textarea",{className:"form-input",rows:2,placeholder:"Misal: gaji pokok + bonus, tunjangan, dll...",value:C.note,onChange:o=>V(c=>({...c,note:o.target.value})),style:{resize:"vertical",fontFamily:"var(--font-sans)",fontSize:"0.875rem"}})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>Y(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:n,disabled:we||!C.amount,children:we?"Menyimpan...":"Simpan"})]})]})})})(),Ue&&e.jsx("div",{className:"modal-overlay",onClick:()=>le(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Total Tabungan"}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Akumulasi s/d ",z(l)]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>le(!1),children:e.jsx(B,{size:16})})]}),e.jsxs("div",{className:"wajib-rows",children:[(d.tabungan_awal||0)>0&&e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)",fontSize:"0.55rem",fontWeight:800},children:"AWAL"}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:"Saldo Awal Tabungan"}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)"},children:"sebelum mulai record"})]})]}),e.jsx("span",{className:"wajib-amount tabular",style:{color:"var(--success)"},children:p(d.tabungan_awal)})]}),t.tabunganPerMonth.length===0&&!(d.tabungan_awal>0)?e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--text-muted)",padding:"8px 0"},children:'Belum ada alokasi tabungan. Set budget kategori "Tabungan Bulanan".'}):t.tabunganPerMonth.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)"},children:e.jsx(re,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:z(a.month)}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)"},children:"Tabungan Bulanan"})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:Number(a.budget_limit)>0?"var(--success)":"var(--text-muted)"},children:["+",p(a.budget_limit)]})]},a.month)),t.hutangTabunganList.filter(a=>!a.lunas).length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"wajib-divider",style:{margin:"8px 0"}}),e.jsx("div",{style:{fontSize:"0.62rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"var(--text-muted)",marginBottom:4},children:"Outstanding bulan ini"}),t.hutangTabunganList.filter(a=>!a.lunas).map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:a.jenis==="piutang"?"rgba(245,158,11,0.1)":"rgba(248,113,113,0.1)",color:a.jenis==="piutang"?"var(--warning)":"var(--danger)",fontSize:"0.9rem"},children:a.jenis==="piutang"?e.jsx(Le,{size:13}):e.jsx(se,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:a.nama}),e.jsx("div",{style:{fontSize:"0.62rem",color:"var(--text-muted)"},children:a.jenis==="hutang"?"Hutang":"Piutang"})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",p(a.amount)]})]},a.id))]}),e.jsx("div",{className:"wajib-divider",style:{margin:"10px 0"}}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:4},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Tabungan"}),e.jsx("span",{className:"wajib-amount tabular",style:{color:t.totalTabungan>0?"var(--success)":"var(--text-muted)",fontWeight:800},children:p(t.totalTabungan)})]})]})]})}),Je&&e.jsx("div",{className:"modal-overlay",onClick:()=>X(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Rencana Bulan Depan"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:z(ne(l))})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx(H,{to:"/savings",className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>X(!1),children:"Kelola →"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>X(!1),children:e.jsx(B,{size:16})})]})]}),t.nextMonthPlans.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(se,{size:13})}),e.jsxs("span",{children:["Belum ada rencana untuk ",z(ne(l)),"."]}),e.jsx(H,{to:"/savings",className:"empty-hint-link",onClick:()=>X(!1),children:"Tambah →"})]}):e.jsxs("div",{className:"wajib-rows",children:[t.nextMonthPlans.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsx("span",{className:"brow-name",children:a.name}),e.jsx("span",{className:"wajib-amount tabular",children:p(a.amount)})]},a.id)),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total"}),e.jsx("span",{className:"wajib-amount tabular",children:p(t.nextMonthPlans.reduce((a,n)=>a+Number(n.amount),0))})]})]})]})}),Ye&&e.jsx("div",{className:"modal-overlay",onClick:()=>Q(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:420},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Pengeluaran Tetap"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:z(l)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>{Q(!1),ie(!0)},children:"Kelola"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>Q(!1),children:e.jsx(B,{size:16})})]})]}),e.jsxs("div",{className:"wajib-rows",children:[t.categories.filter(a=>K(a)).map(a=>{const n=Number(a.budget_limit||0),o=t.salary>0&&n>0?Math.round(n/t.salary*100):null;return e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:e.jsx(re,{size:13})}),e.jsx("span",{className:"brow-name",children:a.name})]}),e.jsxs("div",{className:"wajib-right",children:[o&&e.jsxs("span",{className:"wajib-pct",children:[o,"%"]}),e.jsx("span",{className:"wajib-amount tabular",children:n>0?p(n):"—"})]})]},a.id)}),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Potongan"}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",p(L)]})]})]})]})}),Ke&&e.jsx("div",{className:"modal-overlay",onClick:()=>E(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>E(!1),children:e.jsx(B,{size:16})})]}),e.jsx(ua,{month:l,onSuccess:()=>{I(),E(!1)},onClose:()=>E(!1)})]})}),Oe&&!v&&!ye&&e.jsx("div",{className:"modal-overlay",onClick:()=>ie(!1),children:e.jsxs("div",{className:"modal cat-manager-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Kelola Kategori"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:z(l)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsxs("button",{className:"btn btn-primary btn-sm",onClick:()=>{Ge({is_mandatory:!0}),O(!0)},children:[e.jsx(Ee,{size:13})," Kategori"]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>ie(!1),children:e.jsx(B,{size:16})})]})]}),e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("p",{className:"cat-mgr-section-title",children:"Pengeluaran Wajib"}),e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:t.categories.filter(a=>K(a)).map(a=>{const n=Number(a.budget_limit)||0,o=t.salary>0&&n>0?Math.round(n/t.salary*100):null;return e.jsxs("div",{className:"cat-mgr-row",children:[e.jsxs("div",{className:"cat-mgr-left",children:[e.jsx("span",{className:"cat-mgr-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:e.jsx(re,{size:14})}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-mgr-name",children:a.name}),e.jsx("span",{className:"cat-mgr-sub",children:"Wajib · langsung dipotong"})]})]}),e.jsxs("div",{className:"cat-mgr-right",children:[o&&e.jsxs("span",{className:"cat-mgr-pct",children:[o,"%"]}),e.jsx("span",{className:"cat-mgr-amount tabular",children:n>0?p(n):"—"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.7rem"},onClick:()=>Ze(a),children:"Ubah"})]})]},a.id)})})]})]})}),v&&(()=>{const a=t.categories.find(n=>n.id===v.id);return e.jsx("div",{className:"modal-overlay",onClick:()=>S(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Pengeluaran Wajib — ",a==null?void 0:a.name]}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[z(l),t.salary>0?` · ${p(t.salary)}`:""]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>S(null),children:e.jsx(B,{size:16})})]}),t.salary>0&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx("input",{className:"form-input",type:"number",placeholder:String(va),value:v.pct,onChange:n=>_e(n.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),e.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),v.pct&&t.salary>0&&e.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",p(Math.round(parseFloat(v.pct)/100*t.salary))]})]}),!v.pct&&e.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(n=>e.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>_e(String(n)),children:[n,"%"]},n))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),e.jsx(qe,{value:v.nominal,onChange:ea,autoFocus:!t.salary})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:16},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)",fontSize:"0.78rem"},onClick:()=>{S(null),oe({id:a.id,name:a.name})},children:"Hapus Kategori"}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>S(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",onClick:aa,children:"Simpan"})]})]})]})})})(),G&&e.jsx(fa,{title:"Hapus Kategori",message:`Hapus kategori "${G.name}"? Semua transaksi kategori ini juga akan terhapus.`,confirmLabel:"Hapus",onConfirm:ta,onCancel:()=>oe(null)}),ye&&e.jsx("div",{className:"modal-overlay",onClick:()=>O(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:J!=null&&J.id?"Edit Kategori":"Kategori Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>O(!1),children:e.jsx(B,{size:16})})]}),e.jsx(ha,{editData:J,salary:t.salary,month:l,onSuccess:()=>{I(),O(!1)},onClose:()=>O(!1)})]})}),e.jsx("style",{children:`
        /* ── Month Picker Popup ───────────────── */

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
        .db-alert {
          display: flex; align-items: center; gap: 7px;
          background: rgba(248,113,113,0.08);
          border: 1px solid rgba(248,113,113,0.2);
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 0.72rem; color: #f87171; font-weight: 600;
          animation: heroAlertIn 0.3s ease both;
        }
        [data-theme="light"] .db-alert { background: rgba(239,68,68,0.07); border-color: rgba(239,68,68,0.2); }
        .db-alert-count {
          margin-left: auto; font-size: 0.6rem; font-weight: 700;
          background: rgba(248,113,113,0.12); padding: 1px 6px; border-radius: 99px;
        }
        @keyframes heroAlertIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Dashboard page ───────────────────── */
        .db-page { display: flex; flex-direction: column; gap: 16px; padding-bottom: 48px; }

        /* ── Saldo hero ───────────────────────── */
        .db-hero { padding: 8px 0 4px; }

        .db-eyebrow {
          font-size: 0.58rem; font-weight: 700; letter-spacing: 0.12em;
          color: var(--text-muted); text-transform: uppercase;
          display: block; margin-bottom: 8px;
        }
        .db-balance {
          font-size: clamp(2.2rem, 8vw, 3.4rem);
          font-weight: 800; letter-spacing: -0.045em;
          font-variant-numeric: tabular-nums; line-height: 1;
          background: linear-gradient(135deg, #fff 20%, rgba(167,139,250,0.9) 65%, rgba(99,102,241,0.85) 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        .db-balance.neg {
          background: linear-gradient(135deg, #fca5a5 0%, #f87171 60%, #ef4444 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        [data-theme="light"] .db-balance {
          background: linear-gradient(135deg, #1e1b4b 0%, #3730a3 45%, #4f46e5 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        [data-theme="light"] .db-balance.neg {
          background: linear-gradient(135deg, #7f1d1d 0%, #b91c1c 60%, #dc2626 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .db-neg-sign { font-size: 0.7em; vertical-align: 0.05em; margin-right: 1px; }

        .db-daily {
          display: flex; align-items: center; gap: 8px;
          margin-top: 8px;
          font-size: 0.72rem; font-weight: 600; color: var(--text-muted);
        }
        .db-daily-badge {
          font-size: 0.6rem; font-weight: 700; padding: 2px 7px; border-radius: 99px;
        }

        /* ── Stats 2×2 ────────────────────────── */
        .db-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .db-stat {
          display: flex; flex-direction: column; gap: 4px;
          padding: 14px 16px;
          background: var(--bg-card);
          text-align: left; border: none;
          font-family: var(--font-sans); cursor: default;
          transition: background 0.12s;
        }
        .db-stat-btn { cursor: pointer; }
        .db-stat-btn:hover { background: rgba(255,255,255,0.025); }
        [data-theme="light"] .db-stat-btn:hover { background: rgba(0,0,0,0.02); }
        .db-stat-label {
          font-size: 0.55rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--text-muted);
        }
        .db-stat-val {
          font-size: 0.9rem; font-weight: 800;
          letter-spacing: -0.025em; font-variant-numeric: tabular-nums;
          color: var(--text-primary);
        }
        .db-stat-sub {
          font-size: 0.58rem; font-weight: 500;
          color: var(--text-muted); opacity: 0.8;
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
          font-size: 0.68rem; color: var(--text-muted);
          text-decoration: none; font-weight: 700;
          padding: 4px 12px; border: 1px solid var(--border-glass);
          border-radius: 99px; background: var(--bg-glass);
          backdrop-filter: var(--glass-blur);
          transition: all 0.18s;
          white-space: nowrap; flex-shrink: 0; margin-top: 1px;
          cursor: pointer; font-family: var(--font-sans); letter-spacing: 0.01em;
        }
        .pill-link:hover {
          color: var(--accent); border-color: rgba(99,102,241,0.3);
          background: var(--accent-dim); box-shadow: var(--glow-sm);
        }

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

        /* ── Tab toggle ──────────────────────── */
        .dash-tab-card { display: flex; flex-direction: column; }
        .dash-tab-card .sect-head { flex-wrap: wrap; gap: 8px; }
        .dash-tab-toggle {
          display: flex;
          gap: 2px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          padding: 3px;
        }
        [data-theme="light"] .dash-tab-toggle {
          background: rgba(0,0,0,0.04);
          border-color: rgba(0,0,0,0.08);
        }
        .dash-tab-btn {
          padding: 5px 12px;
          border-radius: 5px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 700;
          font-family: var(--font-sans);
          letter-spacing: -0.01em;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .dash-tab-btn:hover { color: var(--text-secondary); }
        .dash-tab-btn.active {
          background: rgba(255,255,255,0.09);
          color: var(--text-primary);
        }
        [data-theme="light"] .dash-tab-btn.active {
          background: #fff;
          color: var(--accent);
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }

        /* ── Tab actions ──────────────────────── */
        .tab-actions { display: flex; gap: 4px; align-items: center; flex-shrink: 0; }
        .tab-act {
          display: flex; align-items: center; gap: 5px;
          padding: 6px 10px; border-radius: 7px;
          font-size: 0.72rem; font-weight: 600; letter-spacing: -0.01em;
          color: var(--text-muted);
          border: 1px solid rgba(255,255,255,0.07);
          background: transparent; text-decoration: none;
          transition: all 0.12s; cursor: pointer;
          font-family: var(--font-sans); white-space: nowrap;
        }
        .tab-act:hover {
          color: var(--text-primary);
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.12);
        }
        .tab-act-accent {
          color: var(--accent);
          border-color: rgba(99,102,241,0.2);
          background: rgba(99,102,241,0.06);
        }
        .tab-act-accent:hover {
          background: rgba(99,102,241,0.12);
          border-color: rgba(99,102,241,0.35);
          color: var(--accent);
        }
        [data-theme="light"] .tab-act { border-color: rgba(0,0,0,0.09); }
        [data-theme="light"] .tab-act:hover { background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.14); }
        [data-theme="light"] .tab-act-accent { background: var(--accent-dim); border-color: rgba(99,102,241,0.25); }

        @media (max-width: 600px) {
          .dash-tab-card .sect-head { flex-wrap: wrap; gap: 8px; align-items: center; }
          .dash-tab-toggle { flex: 1; }
          .dash-tab-toggle .dash-tab-btn { flex: 1; text-align: center; }
          .tab-act-label { display: none; }
          .tab-act { padding: 7px 9px; border-radius: 8px; }
        }

        /* ── Two-col layout ──────────────────── */
        .dash-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          align-items: stretch;
        }
        .dash-two-col > .card,
        .dash-two-col > * > .card {
          display: flex;
          flex-direction: column;
          height: 420px;
          overflow: hidden;
        }
        .card-scroll-body {
          flex: 1;
          overflow-y: auto;
          min-height: 0;
        }
        .card-scroll-body::-webkit-scrollbar { width: 3px; }
        .card-scroll-body::-webkit-scrollbar-track { background: transparent; }
        .card-scroll-body::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }
        @media (max-width: 700px) {
          .dash-two-col { grid-template-columns: 1fr; }
          .dash-two-col > .card, .dash-two-col > * > .card { height: 380px; }
        }

        /* ── Budget rows ──────────────────────── */
        .budget-rows { display: flex; flex-direction: column; }
        .budget-section-label {
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 8px;
          padding-bottom: 0;
        }
        .brow {
          display: grid;
          grid-template-columns: minmax(140px, 1.6fr) 1fr 36px 110px;
          grid-template-areas: "left bar pct right";
          align-items: center; gap: 14px; padding: 12px 0;
          border-bottom: 1px solid var(--border);
        }
        .brow-left { grid-area: left; }
        .brow-bar-wrap { grid-area: bar; }
        .brow-pct { grid-area: pct; }
        .brow-right { grid-area: right; }
        .brow:last-child { border-bottom: none; }
        .brow.no-limit { grid-template-columns: 1fr auto; grid-template-areas: none; }
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
        .brow-no-budget {
          grid-template-columns: 1fr auto;
          grid-template-areas: none;
        }
        .brow-no-budget .brow-left { grid-column: 1; grid-area: unset; }
        .brow-only-spent { grid-column: 2; align-self: center; text-align: right; }

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
          padding: 10px 6px; border-bottom: 1px solid rgba(99,102,241,0.07);
          border-radius: 8px; transition: background 0.15s;
        }
        .tx-row:last-child { border-bottom: none; }
        .tx-row:hover { background: rgba(99,102,241,0.04); }
        .tx-icon {
          width: 34px; height: 34px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; position: relative;
        }
        .tx-icon::after {
          content: ''; position: absolute; inset: 0;
          border-radius: inherit; opacity: 0.3;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
        }
        .tx-meta { flex: 1; min-width: 0; }
        .tx-desc { display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .tx-date { font-size: 0.64rem; color: var(--text-muted); font-weight: 500; }
        .tx-amount { font-size: 0.85rem; font-weight: 700; letter-spacing: -0.025em; white-space: nowrap; }
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
          .month-label-text { font-size: 0.875rem; }
          .hero-card { padding: 14px 16px; }
          .hero-top { flex-direction: column; gap: 0; margin-bottom: 10px; }
          /* Chips tampil sebagai row horizontal di bawah balance */
          .hero-right {
            display: flex; flex-direction: row; gap: 6px;
            align-items: stretch; margin-top: 10px;
          }
          .hero-chip {
            flex: 1; min-width: 0; align-items: flex-start;
            padding: 7px 8px;
          }
          .hero-chip-val { font-size: 0.78rem; }
          .hero-chip-label { font-size: 0.55rem; letter-spacing: 0.04em; }
          .hero-chip-cta { font-size: 0.55rem; }
          .hero-balance { font-size: 1.55rem; }
          .hero-stats-row { gap: 0; }
          .hero-stat { padding: 0 8px; }
          .hero-stat-val { font-size: 0.78rem; }
          .hero-stat-sub { font-size: 0.56rem; }
          .stats-strip { border-radius: var(--radius-sm); }
          .stat-col { padding: 12px 14px; }
          .stat-col-val { font-size: 0.875rem; }
          .brow {
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto;
            grid-template-areas: none;
            gap: 0 8px;
          }
          .brow-left   { grid-column: 1; grid-row: 1; padding-bottom: 5px; }
          .brow-right  { grid-column: 2; grid-row: 1; align-self: start; flex-direction: column; align-items: flex-end; gap: 1px; }
          .brow-bar-wrap { grid-column: 1; grid-row: 2; align-self: center; }
          .brow-pct    { grid-column: 2; grid-row: 2; align-self: center; padding-left: 6px; font-size: 0.65rem; }
          .brow-no-budget { grid-template-rows: auto; }
          .brow-no-budget .brow-left { grid-row: 1; padding-bottom: 0; }
          .brow-only-spent { grid-column: 2; grid-row: 1; align-self: center; }
          .brow-limit  { font-size: 0.62rem; }
          .savings-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 400px) {
          .stats-strip { grid-template-columns: 1fr; }
          .stat-col { border-right: none; border-bottom: 1px solid var(--border); flex-direction: row; justify-content: space-between; align-items: center; padding: 10px 14px; }
          .stat-col:last-child { border-bottom: none; }
          .hero-balance { font-size: 1.35rem; }
          .hero-right { gap: 4px; }
          .hero-chip { padding: 6px 7px; }
          .hero-chip-val { font-size: 0.72rem; }
        }
      `})]})}export{za as default};
