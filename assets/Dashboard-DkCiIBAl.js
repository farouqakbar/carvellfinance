import{G as Ve,J as Xe,M as Ze,K as ea,E as h,x as Y,D as e,A as z,z as aa,B as ta,F as g,a as sa,w as p,L as W,p as ra,c as Ce,e as pe,d as Te,b as X,C as Me}from"./index-Bwuw86n0.js";import{T as na}from"./TransactionForm-DDaf4-Kc.js";import{C as ia}from"./CategoryForm-D-b2wIpN.js";import{i as T,a as Pe,C as oa}from"./ConfirmModal-B_OsTFaJ.js";const la=15;function ca(o){const[F,M]=o.split("-").map(Number),P=new Date(F,M-2,1);return`${P.getFullYear()}-${String(P.getMonth()+1).padStart(2,"0")}`}function Z(o){const[F,M]=o.split("-").map(Number),P=new Date(F,M,1);return`${P.getFullYear()}-${String(P.getMonth()+1).padStart(2,"0")}`}function ga(){const{user:o}=Ve(),{setHeader:F}=Xe(),M=Ze(),[P,Be]=ea(),[l,Fe]=h.useState(()=>P.get("month")||Y()),[t,De]=h.useState({salary:0,totalExpense:0,totalIncome:0,categories:[],transactions:[],savings:[],savingsLogs:[],categorySpend:[],hutangList:[],hutangTabunganList:[],todayExpense:0,totalTabungan:0,tabunganPerMonth:[],nextMonthPlans:[],cumulativeBalance:0,cumulativeMandatoryBudget:0,gajiTx:null,gajiCatId:null}),[G,he]=h.useState(!0),[Le,D]=h.useState(!1),[Ee,ee]=h.useState(!1),[v,_]=h.useState(null),[ge,$]=h.useState(!1),[J,We]=h.useState(null),[ae,te]=h.useState(null),[$e,U]=h.useState(!1),[Ae,se]=h.useState(!1),[qe,A]=h.useState(!1),[Ie,q]=h.useState(!1),[L,re]=h.useState({amount:"",note:""}),[ue,xe]=h.useState(!1),[ne,ie]=h.useState(!1),[y,oe]=h.useState(()=>Number(Y().split("-")[0]));h.useEffect(()=>{if(o.recording_start_month&&l<o.recording_start_month){Q(o.recording_start_month);return}E()},[l,o==null?void 0:o.recording_start_month]),h.useEffect(()=>{const a=l===Y(),r=!!o.recording_start_month&&l<=o.recording_start_month,[c,m]=o.recording_start_month?o.recording_start_month.split("-").map(Number):[0,0],S=Y(),[j,b]=S.split("-").map(Number),n=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];return F(e.jsxs(e.Fragment,{children:[ne&&e.jsx("div",{style:{position:"fixed",inset:0,zIndex:299},onClick:()=>ie(!1)}),e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>Q(ca(l)),disabled:r,children:"‹"}),e.jsx("span",{className:"month-label-text month-label-clickable",onClick:()=>{oe(Number(l.split("-")[0])),ie(d=>!d)},children:z(l)}),e.jsx("button",{className:"month-btn",onClick:()=>Q(Z(l)),disabled:a,children:"›"}),ne&&e.jsxs("div",{className:"month-picker-popup",onMouseDown:d=>d.preventDefault(),children:[e.jsxs("div",{className:"mp-year-row",children:[e.jsx("button",{className:"mp-year-btn",onClick:()=>oe(d=>d-1),disabled:!!o.recording_start_month&&y<=c,children:"‹"}),e.jsx("span",{className:"mp-year-label",children:y}),e.jsx("button",{className:"mp-year-btn",onClick:()=>oe(d=>d+1),disabled:y>=j,children:"›"})]}),e.jsx("div",{className:"mp-grid",children:n.map((d,w)=>{const u=w+1,f=`${y}-${String(u).padStart(2,"0")}`,x=y>j||y===j&&u>b,N=!!o.recording_start_month&&(y<c||y===c&&u<m);return e.jsx("button",{className:`mp-month-btn${f===l?" mp-active":""}`,disabled:x||N,onClick:()=>{Q(f),ie(!1)},children:d},f)})})]})]}),e.jsx("div",{className:"topbar-actions",children:e.jsx("button",{className:"btn btn-primary btn-sm",style:{fontSize:"0.78rem",height:34},onClick:()=>D(!0),children:"+ Transaksi"})})]})),()=>F(null)},[l,ne,y,o==null?void 0:o.recording_start_month]);const Q=a=>{Fe(a),Be({month:a})},E=async()=>{he(!0);try{const a=`${l}-01`,[r,c]=l.split("-").map(Number),m=aa(l),S=ta(),j=Z(l),b=o.recording_start_month;let n=g.from("transactions").select("amount, type").eq("user_id",o.id).lt("date",a);b&&(n=n.gte("date",`${b}-01`));let d=g.from("category_budgets").select("budget_limit, category_id, month").eq("user_id",o.id).lte("month",l);b&&(d=d.gte("month",b));const[w,u,f,x,N,B,de,Ge,Je,Ue,we]=await Promise.all([g.from("transactions").select("*, categories(name, color, icon)").eq("user_id",o.id).gte("date",a).lte("date",m).order("date",{ascending:!1}),g.from("categories").select("*").eq("user_id",o.id).order("name"),g.from("savings").select("*").eq("user_id",o.id),g.from("savings_log").select("*").eq("user_id",o.id).eq("month",l),g.from("transactions").select("amount").eq("user_id",o.id).eq("date",S).eq("type","expense"),g.from("category_budgets").select("category_id, budget_limit").eq("user_id",o.id).eq("month",l),d,g.from("plans").select("*").eq("user_id",o.id).eq("target_month",j).eq("done",!1).order("created_at",{ascending:!0}),n,g.from("hutang").select("id, nama, amount, due_date, sumber, jenis, lunas").eq("user_id",o.id).eq("month",l).eq("lunas",!1).order("due_date",{ascending:!0,nullsFirst:!1}),g.from("hutang").select("id, nama, amount, jenis, lunas, created_at").eq("user_id",o.id).eq("month",l).eq("sumber","tabungan").order("created_at",{ascending:!1})]),R=w.data||[],H={};(B.data||[]).forEach(s=>{H[s.category_id]=Number(s.budget_limit)});const K=(u.data||[]).map(s=>({...s,budget_limit:H[s.id]!==void 0?H[s.id]:s.budget_limit||0,budget_set:H[s.id]!==void 0||(s.budget_limit||0)>0})),Ne=K.filter(s=>s.month===l),C=Ne.find(s=>s.name==="Pemasukan Bulanan"),ke=C?R.filter(s=>s.type==="income"&&s.category_id===C.id):[],me=ke.reduce((s,i)=>s+Number(i.amount),0),ze=R.filter(s=>s.type==="expense").reduce((s,i)=>s+Number(i.amount),0),_e=R.filter(s=>s.type==="income"&&s.category_id!==(C==null?void 0:C.id)).reduce((s,i)=>s+Number(i.amount),0),O={};R.filter(s=>s.type==="expense"&&s.categories).forEach(s=>{const i=s.categories.name;O[i]||(O[i]={name:i,amount:0,color:s.categories.color,icon:s.categories.icon}),O[i].amount+=Number(s.amount)});const Qe=Ne.map(s=>{var V;const i=((V=O[s.name])==null?void 0:V.amount)||0,k=s.budget_limit>0?i/s.budget_limit*100:null;return{...s,spent:i,pct:k,overBudget:s.budget_limit>0&&i>s.budget_limit}}).sort((s,i)=>s.overBudget&&!i.overBudget?-1:!s.overBudget&&i.overBudget?1:(i.pct||0)-(s.pct||0));De({salary:me,totalExpense:ze,totalIncome:_e,categories:Qe,transactions:R.slice(0,5),savings:f.data||[],savingsLogs:x.data||[],todayExpense:(N.data||[]).reduce((s,i)=>s+Number(i.amount),0),tabunganPerMonth:(de.data||[]).filter(s=>{const i=K.find(k=>k.id===s.category_id);return i&&i.name==="Tabungan Bulanan"}).sort((s,i)=>s.month.localeCompare(i.month)),totalTabungan:(de.data||[]).filter(s=>{const i=K.find(k=>k.id===s.category_id);return i&&i.name==="Tabungan Bulanan"}).reduce((s,i)=>s+Number(i.budget_limit),0)+(o.tabungan_awal||0)-(we.data||[]).filter(s=>!s.lunas).reduce((s,i)=>s+Number(i.amount),0),categorySpend:Object.values(O).sort((s,i)=>i.amount-s.amount),nextMonthPlans:Ge.data||[],gajiTx:ke[0]||null,gajiCatId:(C==null?void 0:C.id)||null,hutangList:Ue.data||[],hutangTabunganList:we.data||[],cumulativeBalance:(Je.data||[]).reduce((s,i)=>s+(i.type==="income"?Number(i.amount):-Number(i.amount)),0)+me+_e-ze+(o.saldo_awal||0),cumulativeMandatoryBudget:(de.data||[]).filter(s=>{const i=K.find(k=>k.id===s.category_id);return i&&T(i)}).reduce((s,i)=>s+Number(i.budget_limit),0)});const Se=me;if(Se>0){const s=K.filter(i=>T(i)&&H[i.id]===void 0);if(s.length>0){const i=Math.round(Number(Se)*.15);await Promise.all(s.map(V=>g.from("category_budgets").upsert({user_id:o.id,category_id:V.id,month:l,budget_limit:i},{onConflict:"category_id,month"})));const{data:k}=await g.from("categories").select("*").eq("user_id",o.id).order("name");u.data=k}}}finally{he(!1)}},Re=a=>{const r=String(Math.round(a.budget_limit||0)),c=t.salary>0&&a.budget_limit>0?(a.budget_limit/t.salary*100).toFixed(1):"";_({id:a.id,nominal:r,pct:c})},He=a=>{const r=parseFloat(a)||0,c=t.salary>0&&r>0?(r/t.salary*100).toFixed(1):"";_(m=>({...m,nominal:a,pct:c}))},be=a=>{const r=parseFloat(a)||0,c=t.salary>0&&r>0?String(Math.round(r/100*t.salary)):"";_(m=>({...m,pct:a,nominal:c}))},Ke=async()=>{const a=parseFloat(v.nominal)||0;await g.from("category_budgets").upsert({user_id:o.id,category_id:v.id,month:l,budget_limit:a},{onConflict:"category_id,month"}),M("Budget disimpan","success"),_(null),E()},Oe=async()=>{await g.from("categories").delete().eq("id",ae.id),M("Kategori dihapus","success"),te(null),E()};t.categories.filter(a=>a.budget_limit>0).reduce((a,r)=>a+r.budget_limit,0),Y();const fe=t.categories.filter(a=>a.overBudget),I=t.categories.filter(a=>T(a)).reduce((a,r)=>a+Number(r.budget_limit||0),0),ve=t.categories.filter(a=>T(a)).reduce((a,r)=>a+(r.spent||0),0),Ye=Math.max(0,I-ve),je=t.totalExpense+Ye;t.salary+t.totalIncome-je,t.salary>0&&je/t.salary*100;const le=t.categories.filter(a=>a.name==="Tabungan Bulanan"&&a.budget_limit>0).reduce((a,r)=>a+Number(r.budget_limit),0),ce=t.cumulativeBalance-t.cumulativeMandatoryBudget;t.salary-t.totalExpense-le,t.salary>0&&t.totalExpense/t.salary*100;const ye=t.salary>0?t.salary-le:0;return ye-t.totalExpense,t.salary>0&&le>0&&t.totalExpense>ye,e.jsxs("div",{className:"animate-in",children:[fe.length>0&&e.jsxs("div",{className:"alert-banner",children:[e.jsx(sa,{size:15}),e.jsxs("span",{children:[e.jsx("strong",{children:"Overbudget"})," — ",fe.map(a=>a.name).join(", ")]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx("div",{className:"hero-card",children:G?e.jsx("div",{className:"skeleton",style:{height:88,borderRadius:8}}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"hero-top",children:[e.jsxs("div",{className:"hero-left",children:[e.jsx("span",{className:"hero-eyebrow",children:"Total Saldo"}),e.jsxs("div",{className:`hero-balance ${ce<0?"neg":""}`,children:[ce<0&&e.jsx("span",{className:"hero-neg-sign",children:"-"}),p(Math.abs(ce))]})]}),e.jsxs("div",{className:"hero-right",children:[e.jsxs("div",{className:"hero-chip hero-chip-btn",onClick:()=>{var a;re({amount:t.gajiTx?String(t.gajiTx.amount):"",note:((a=t.gajiTx)==null?void 0:a.description)||""}),q(!0)},children:[e.jsx("span",{className:"hero-chip-label",children:"Pemasukan Bulanan"}),e.jsx("span",{className:"hero-chip-val tabular",style:{color:t.salary>0?"var(--success)":"var(--text-muted)"},children:p(t.salary)}),e.jsx("span",{className:"hero-chip-cta",children:t.salary>0?"Lihat detail →":"+ Catat sekarang"})]}),e.jsxs("div",{className:"hero-chip hero-chip-btn",onClick:()=>U(!0),children:[e.jsx("span",{className:"hero-chip-label",children:"Pengeluaran Wajib"}),e.jsx("span",{className:"hero-chip-val tabular",style:{color:I>0?"var(--danger)":"var(--text-muted)"},children:I>0?`−${p(I)}`:"—"}),e.jsx("span",{className:"hero-chip-cta",children:"Lihat detail →"})]}),e.jsxs("div",{className:"hero-chip hero-chip-btn",onClick:()=>se(!0),children:[e.jsx("span",{className:"hero-chip-label",children:"Total Tabungan"}),e.jsx("span",{className:"hero-chip-val tabular",style:{color:t.totalTabungan>0?"var(--success)":"var(--text-muted)"},children:p(t.totalTabungan)}),e.jsx("span",{className:"hero-chip-cta",children:"Lihat detail →"})]})]})]}),e.jsxs("div",{className:"hero-stats-row",children:[(()=>{const a=t.totalExpense-ve;return e.jsxs("div",{className:"hero-stat",children:[e.jsx("span",{className:"hero-stat-label",children:"Total Pengeluaran"}),e.jsx("span",{className:"hero-stat-val",style:{color:a>0?"var(--danger)":"var(--text-muted)"},children:a>0?`−${p(a)}`:"—"}),e.jsx("span",{className:"hero-stat-sub",children:"diluar wajib & tabungan"})]})})(),e.jsx("div",{className:"hero-stat-divider"}),(()=>{const a=o.budget_harian||0,r=t.todayExpense,c=a>0?r/a:0,m=a>0&&r>=a,S=a>0&&c>=.8&&!m,j=a>0&&r>0&&c<.8,b=m?"var(--danger)":S?"var(--warning)":r>0?"var(--danger)":"var(--text-muted)";return e.jsxs("div",{className:"hero-stat",children:[e.jsx("span",{className:"hero-stat-label",children:"Hari Ini"}),e.jsx("span",{className:"hero-stat-val",style:{color:b},children:r>0?`−${p(r)}`:"—"}),m?e.jsx("span",{className:"hero-stat-sub",style:{color:"var(--danger)",fontWeight:600},children:"melebihi budget harian"}):S?e.jsx("span",{className:"hero-stat-sub",style:{color:"var(--warning)",fontWeight:600},children:"mendekati budget harian"}):j?e.jsx("span",{className:"hero-stat-sub",style:{color:"var(--success)",fontWeight:600},children:"dalam budget harian"}):e.jsx("span",{className:"hero-stat-sub",children:"pengeluaran"})]})})(),e.jsx("div",{className:"hero-stat-divider"}),e.jsxs("div",{className:"hero-stat hero-stat-btn",onClick:()=>A(!0),children:[e.jsx("span",{className:"hero-stat-label",children:"Rencana Bulan Depan"}),e.jsx("span",{className:"hero-stat-val",style:{color:t.nextMonthPlans.length>0?"var(--text-primary)":"var(--text-muted)"},children:t.nextMonthPlans.length>0?p(t.nextMonthPlans.reduce((a,r)=>a+Number(r.amount),0)):"—"}),e.jsx("span",{className:"hero-stat-sub",style:{color:"var(--accent)",fontWeight:600},children:t.nextMonthPlans.length>0?`${t.nextMonthPlans.length} item · See Detail`:"Belum ada"})]})]})]})}),e.jsxs("div",{className:"dash-two-col",children:[(()=>{const a=t.categories.filter(n=>!T(n)&&!Pe(n)&&n.is_monthly&&n.budget_limit>0),r=t.categories.filter(n=>!T(n)&&!Pe(n)&&!n.is_monthly&&n.budget_limit>0),c=(t.hutangList||[]).filter(n=>n.jenis==="hutang"),m=(t.hutangList||[]).filter(n=>n.jenis==="piutang"),S=!G&&a.length===0&&r.length===0&&c.length===0&&m.length===0,j=[...a,...r];j.reduce((n,d)=>n+Number(d.budget_limit),0),j.reduce((n,d)=>n+Number(d.spent||0),0);const b=({cat:n})=>{const d=n.budget_limit>0?n.spent/n.budget_limit*100:0,w=Math.min(d,100),u=d>100,f=!u&&d>=100,x=!u&&d>=80&&d<100,N=u?"var(--danger)":f?"var(--success)":x?"var(--warning)":n.color||"var(--accent)",B=n.budget_limit-(n.spent||0);return e.jsxs("div",{className:"brow",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${n.color||"#6366f1"}18`},children:e.jsx("span",{style:{width:10,height:10,borderRadius:"50%",background:n.color||"var(--accent)",display:"inline-block",flexShrink:0}})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("span",{className:"brow-name",children:n.name}),u&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Over"}),f&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Penuh"}),x&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Hampir"}),n.budget_limit===0&&e.jsx("span",{style:{fontSize:"0.65rem",color:"var(--text-muted)",marginLeft:6},children:"belum diset"})]})]}),n.budget_limit>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"brow-bar-wrap",children:e.jsx("div",{className:"brow-bar",children:e.jsx("div",{className:"brow-bar-fill",style:{width:`${w}%`,background:N}})})}),e.jsxs("div",{className:"brow-right",children:[e.jsx("span",{className:"brow-spent tabular",style:{color:u?"var(--danger)":"var(--text-primary)"},children:p(n.spent||0)}),e.jsx("span",{className:"brow-limit tabular",style:{color:B<0?"var(--danger)":B===0?"var(--text-muted)":"var(--success)"},children:B<0?`Over ${p(Math.abs(B))}`:`Sisa ${p(B)}`})]}),e.jsxs("span",{className:"brow-pct",style:{color:N},children:[d.toFixed(0),"%"]})]}):e.jsx("div",{style:{flex:1}})]})};return e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",style:{marginBottom:14},children:[e.jsx("div",{children:e.jsx("h3",{className:"sect-title",children:"Budget Bulan Ini"})}),e.jsx(W,{to:`/categories?month=${l}`,className:"pill-link",children:"⚙ Atur"})]}),e.jsx("div",{className:"card-scroll-body",children:G?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(3)].map((n,d)=>e.jsx("div",{className:"skeleton",style:{height:44}},d))}):S?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(ra,{size:14})}),e.jsx("span",{children:"Tambahkan kategori dan budget"}),e.jsx(W,{to:`/categories?month=${l}`,className:"empty-hint-link",style:{color:"var(--accent)"},children:"Atur →"})]}):e.jsxs(e.Fragment,{children:[(c.length>0||m.length>0)&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Hutang & Piutang"}),e.jsx("div",{className:"budget-rows",children:[...c,...m].map(n=>{const d=n.jenis==="piutang",w=d?"#f59e0b":"#f87171",u=new Date;u.setHours(0,0,0,0);const f=n.due_date?new Date(n.due_date):null,x=f?Math.round((f-u)/864e5):null,N=x!==null&&x<0;return e.jsxs("div",{className:"brow",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${w}18`,color:w},children:d?e.jsx(Ce,{size:13}):e.jsx(pe,{size:13})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("span",{className:"brow-name",children:n.nama}),e.jsx("span",{style:{fontSize:"0.62rem",color:"var(--text-muted)",marginLeft:6},children:d?"piutang":"hutang"}),N&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Terlambat"})]})]}),e.jsx("div",{style:{flex:1}}),e.jsxs("div",{className:"brow-right",children:[e.jsx("span",{className:"brow-spent tabular",style:{color:w},children:p(n.amount)}),n.due_date&&e.jsx("span",{className:"brow-limit tabular",style:{color:N?"var(--danger)":x<=7?"var(--warning)":"var(--text-muted)"},children:x===0?"Hari ini":x>0?`${x}h lagi`:`${Math.abs(x)}h lalu`})]})]},n.id)})})]}),(c.length>0||m.length>0)&&a.length>0&&e.jsx("div",{style:{height:1,background:"var(--border)",margin:"12px 0"}}),a.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Pengeluaran Rutin"}),e.jsx("div",{className:"budget-rows",children:a.map(n=>e.jsx(b,{cat:n},n.id))})]}),(a.length>0||c.length>0||m.length>0)&&r.length>0&&e.jsx("div",{style:{height:1,background:"var(--border)",margin:"12px 0"}}),r.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Kategori Lainnya"}),e.jsx("div",{className:"budget-rows",children:r.map(n=>e.jsx(b,{cat:n},n.id))})]}):c.length===0&&m.length===0&&a.length===0&&e.jsxs("div",{style:{fontSize:"0.72rem",color:"var(--text-muted)"},children:["Belum ada kategori dengan budget. ",e.jsx(W,{to:`/categories?month=${l}`,style:{color:"var(--accent)"},children:"Atur →"})]})]})})]})})(),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",children:[e.jsx("h3",{className:"sect-title",children:"Transaksi Terakhir"}),e.jsx(W,{to:`/transactions?month=${l}`,className:"pill-link",children:"Lihat semua"})]}),e.jsx("div",{className:"card-scroll-body",children:G?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,marginTop:12},children:[...Array(4)].map((a,r)=>e.jsx("div",{className:"skeleton",style:{height:42}},r))}):t.transactions.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(Te,{size:13})}),e.jsx("span",{children:"Belum ada transaksi bulan ini. "}),e.jsx("button",{className:"empty-hint-link",onClick:()=>D(!0),children:"Tambah sekarang →"})]}):e.jsx("div",{className:"tx-list",children:t.transactions.map(a=>{var r;return e.jsxs("div",{className:"tx-row",children:[e.jsx("div",{className:"tx-icon",style:{background:a.type==="income"?"rgba(52,211,153,0.12)":"rgba(248,113,113,0.12)",color:a.type==="income"?"var(--success)":"var(--danger)"},children:a.type==="income"?e.jsx(Te,{size:14}):e.jsx(X,{size:14})}),e.jsxs("div",{className:"tx-meta",children:[e.jsx("span",{className:"tx-desc",children:a.description||((r=a.categories)==null?void 0:r.name)||"Transaksi"}),e.jsx("span",{className:"tx-date",children:new Date(a.date).toLocaleDateString("id-ID",{day:"numeric",month:"short"})})]}),e.jsxs("span",{className:`tx-amount tabular ${a.type==="income"?"inc":"exp"}`,children:[a.type==="income"?"+":"−",p(a.amount)]})]},a.id)})})})]})]})]}),Ie&&(()=>{const a=t.salary>0,r=async()=>{const c=parseFloat(L.amount.replace(/\D/g,""))||0;if(!c)return;xe(!0);const m=`${l}-01`;t.gajiTx?await g.from("transactions").update({amount:c,description:L.note,date:m}).eq("id",t.gajiTx.id):await g.from("transactions").insert({user_id:o.id,category_id:t.gajiCatId,type:"income",amount:c,description:L.note,date:m}),M("Pemasukan disimpan","success"),xe(!1),q(!1),E()};return e.jsx("div",{className:"modal-overlay",onClick:()=>q(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:c=>c.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Pemasukan Bulanan ",z(l)]}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:a?"Edit jumlah atau catatan":"Catat pemasukan bulan ini"})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>q(!1),children:"✕"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Jumlah Pemasukan"}),e.jsx(Me,{value:L.amount,onChange:c=>re(m=>({...m,amount:c})),autoFocus:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Catatan ",!a&&e.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400},children:"(opsional)"})]}),e.jsx("textarea",{className:"form-input",rows:3,placeholder:"Misal: gaji pokok + bonus, tunjangan, dll...",value:L.note,onChange:c=>re(m=>({...m,note:c.target.value})),style:{resize:"vertical",fontFamily:"var(--font-sans)",fontSize:"0.875rem"}})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>q(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:r,disabled:ue||!L.amount,children:ue?"Menyimpan...":"Simpan"})]})]})})})(),Ae&&e.jsx("div",{className:"modal-overlay",onClick:()=>se(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Total Tabungan"}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Akumulasi s/d ",z(l)]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>se(!1),children:"✕"})]}),e.jsxs("div",{className:"wajib-rows",children:[(o.tabungan_awal||0)>0&&e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)",fontSize:"0.55rem",fontWeight:800},children:"AWAL"}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:"Saldo Awal Tabungan"}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)"},children:"sebelum mulai record"})]})]}),e.jsx("span",{className:"wajib-amount tabular",style:{color:"var(--success)"},children:p(o.tabungan_awal)})]}),t.tabunganPerMonth.length===0&&!(o.tabungan_awal>0)?e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--text-muted)",padding:"8px 0"},children:'Belum ada alokasi tabungan. Set budget kategori "Tabungan Bulanan".'}):t.tabunganPerMonth.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)"},children:e.jsx(X,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:z(a.month)}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)"},children:"Tabungan Bulanan"})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:Number(a.budget_limit)>0?"var(--success)":"var(--text-muted)"},children:["+",p(a.budget_limit)]})]},a.month)),t.hutangTabunganList.filter(a=>!a.lunas).length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"wajib-divider",style:{margin:"8px 0"}}),e.jsx("div",{style:{fontSize:"0.62rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"var(--text-muted)",marginBottom:4},children:"Outstanding bulan ini"}),t.hutangTabunganList.filter(a=>!a.lunas).map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:a.jenis==="piutang"?"rgba(245,158,11,0.1)":"rgba(248,113,113,0.1)",color:a.jenis==="piutang"?"var(--warning)":"var(--danger)",fontSize:"0.9rem"},children:a.jenis==="piutang"?e.jsx(Ce,{size:13}):e.jsx(pe,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:a.nama}),e.jsx("div",{style:{fontSize:"0.62rem",color:"var(--text-muted)"},children:a.jenis==="hutang"?"Hutang":"Piutang"})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",p(a.amount)]})]},a.id))]}),e.jsx("div",{className:"wajib-divider",style:{margin:"10px 0"}}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:4},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Tabungan"}),e.jsx("span",{className:"wajib-amount tabular",style:{color:t.totalTabungan>0?"var(--success)":"var(--text-muted)",fontWeight:800},children:p(t.totalTabungan)})]})]})]})}),qe&&e.jsx("div",{className:"modal-overlay",onClick:()=>A(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Rencana Bulan Depan"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:z(Z(l))})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx(W,{to:"/savings",className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>A(!1),children:"Kelola →"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>A(!1),children:"✕"})]})]}),t.nextMonthPlans.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(pe,{size:13})}),e.jsxs("span",{children:["Belum ada rencana untuk ",z(Z(l)),"."]}),e.jsx(W,{to:"/savings",className:"empty-hint-link",onClick:()=>A(!1),children:"Tambah →"})]}):e.jsxs("div",{className:"wajib-rows",children:[t.nextMonthPlans.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsx("span",{className:"brow-name",children:a.name}),e.jsx("span",{className:"wajib-amount tabular",children:p(a.amount)})]},a.id)),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total"}),e.jsx("span",{className:"wajib-amount tabular",children:p(t.nextMonthPlans.reduce((a,r)=>a+Number(r.amount),0))})]})]})]})}),$e&&e.jsx("div",{className:"modal-overlay",onClick:()=>U(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:420},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Pengeluaran Tetap"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:z(l)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>{U(!1),ee(!0)},children:"Kelola"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>U(!1),children:"✕"})]})]}),e.jsxs("div",{className:"wajib-rows",children:[t.categories.filter(a=>T(a)).map(a=>{const r=a.budget_set?Number(a.budget_limit):t.salary>0?Math.round(t.salary*.15):0,c=t.salary>0&&r>0?Math.round(r/t.salary*100):null;return e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:e.jsx(X,{size:13})}),e.jsx("span",{className:"brow-name",children:a.name})]}),e.jsxs("div",{className:"wajib-right",children:[c&&e.jsxs("span",{className:"wajib-pct",children:[c,"%"]}),e.jsx("span",{className:"wajib-amount tabular",children:r>0?p(r):"—"})]})]},a.id)}),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Potongan"}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",p(I)]})]})]})]})}),Le&&e.jsx("div",{className:"modal-overlay",onClick:()=>D(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>D(!1),children:"✕"})]}),e.jsx(na,{month:l,onSuccess:()=>{E(),D(!1)},onClose:()=>D(!1)})]})}),Ee&&!v&&!ge&&e.jsx("div",{className:"modal-overlay",onClick:()=>ee(!1),children:e.jsxs("div",{className:"modal cat-manager-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Kelola Kategori"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:z(l)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>{We({is_mandatory:!0}),$(!0)},children:"+ Kategori"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>ee(!1),children:"✕"})]})]}),e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("p",{className:"cat-mgr-section-title",children:"Pengeluaran Wajib"}),e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:t.categories.filter(a=>T(a)).map(a=>{const r=Number(a.budget_limit)||0,c=t.salary>0&&r>0?Math.round(r/t.salary*100):null;return e.jsxs("div",{className:"cat-mgr-row",children:[e.jsxs("div",{className:"cat-mgr-left",children:[e.jsx("span",{className:"cat-mgr-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:e.jsx(X,{size:14})}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-mgr-name",children:a.name}),e.jsx("span",{className:"cat-mgr-sub",children:"Wajib · langsung dipotong"})]})]}),e.jsxs("div",{className:"cat-mgr-right",children:[c&&e.jsxs("span",{className:"cat-mgr-pct",children:[c,"%"]}),e.jsx("span",{className:"cat-mgr-amount tabular",children:r>0?p(r):"—"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.7rem"},onClick:()=>Re(a),children:"Ubah"})]})]},a.id)})})]})]})}),v&&(()=>{const a=t.categories.find(r=>r.id===v.id);return e.jsx("div",{className:"modal-overlay",onClick:()=>_(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:r=>r.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Pengeluaran Wajib — ",a==null?void 0:a.name]}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[z(l),t.salary>0?` · ${p(t.salary)}`:""]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>_(null),children:"✕"})]}),t.salary>0&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx("input",{className:"form-input",type:"number",placeholder:String(la),value:v.pct,onChange:r=>be(r.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),e.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),v.pct&&t.salary>0&&e.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",p(Math.round(parseFloat(v.pct)/100*t.salary))]})]}),!v.pct&&e.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(r=>e.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>be(String(r)),children:[r,"%"]},r))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),e.jsx(Me,{value:v.nominal,onChange:He,autoFocus:!t.salary})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:16},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)",fontSize:"0.78rem"},onClick:()=>{_(null),te({id:a.id,name:a.name})},children:"Hapus Kategori"}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>_(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",onClick:Ke,children:"Simpan"})]})]})]})})})(),ae&&e.jsx(oa,{title:"Hapus Kategori",message:`Hapus kategori "${ae.name}"? Transaksi yang terhubung tidak akan ikut terhapus.`,confirmLabel:"Hapus",onConfirm:Oe,onCancel:()=>te(null)}),ge&&e.jsx("div",{className:"modal-overlay",onClick:()=>$(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:J!=null&&J.id?"Edit Kategori":"Kategori Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>$(!1),children:"✕"})]}),e.jsx(ia,{editData:J,salary:t.salary,month:l,onSuccess:()=>{E(),$(!1)},onClose:()=>$(!1)})]})}),e.jsx("style",{children:`
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
        .hero-chip-cta {
          font-size: 0.6rem; color: var(--accent); font-weight: 600; margin-top: 1px;
          opacity: 0.85;
        }
        .hero-chip-btn:hover .hero-chip-cta { opacity: 1; }

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
          .month-label-text { font-size: 0.875rem; }
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
      `})]})}export{ga as default};
