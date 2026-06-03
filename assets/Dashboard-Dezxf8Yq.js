import{H as Ue,K as Qe,N as Xe,M as Ve,F as p,y as G,E as e,B as S,A as Ze,D as ea,G as x,a as aa,x as h,L as I,p as ta,c as Se,e as pe,d as Ce,b as ae,u as M,C as Te}from"./index-Dk5OhnG-.js";import{T as sa}from"./TransactionForm-CpXabEMI.js";import{C as ra}from"./CategoryForm-B0-Obmd6.js";import{i as P,a as Me,C as na}from"./ConfirmModal-DTKwzRLI.js";const ia=15;function oa(o){const[L,w]=o.split("-").map(Number),B=new Date(L,w-2,1);return`${B.getFullYear()}-${String(B.getMonth()+1).padStart(2,"0")}`}function te(o){const[L,w]=o.split("-").map(Number),B=new Date(L,w,1);return`${B.getFullYear()}-${String(B.getMonth()+1).padStart(2,"0")}`}function ha(){const{user:o}=Ue(),{setHeader:L}=Qe(),w=Xe(),[B,Pe]=Ve(),[l,Be]=p.useState(()=>B.get("month")||G()),[t,Fe]=p.useState({salary:0,totalExpense:0,totalIncome:0,categories:[],transactions:[],savings:[],savingsLogs:[],categorySpend:[],hutangList:[],hutangTabunganList:[],todayExpense:0,totalTabungan:0,tabunganPerMonth:[],nextMonthPlans:[],cumulativeBalance:0,cumulativeMandatoryBudget:0,gajiTx:null,gajiCatId:null}),[J,ge]=p.useState(!0),[De,E]=p.useState(!1),[Le,se]=p.useState(!1),[N,C]=p.useState(null),[ue,q]=p.useState(!1),[U,Ee]=p.useState(null),[re,ne]=p.useState(null),[We,Q]=p.useState(!1),[$e,ie]=p.useState(!1),[Ae,R]=p.useState(!1),[Ie,H]=p.useState(!1),[W,oe]=p.useState({amount:"",note:""}),[xe,be]=p.useState(!1),[le,ce]=p.useState(!1),[z,de]=p.useState(()=>Number(G().split("-")[0]));p.useEffect(()=>{if(o.recording_start_month&&l<o.recording_start_month){X(o.recording_start_month);return}$()},[l,o==null?void 0:o.recording_start_month]),p.useEffect(()=>{const a=l===G(),r=!!o.recording_start_month&&l<=o.recording_start_month,[c,m]=o.recording_start_month?o.recording_start_month.split("-").map(Number):[0,0],g=G(),[v,k]=g.split("-").map(Number),i=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];return L(e.jsxs(e.Fragment,{children:[le&&e.jsx("div",{style:{position:"fixed",inset:0,zIndex:299},onClick:()=>ce(!1)}),e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>X(oa(l)),disabled:r,children:"‹"}),e.jsx("span",{className:"month-label-text month-label-clickable",onClick:()=>{de(Number(l.split("-")[0])),ce(d=>!d)},children:S(l)}),e.jsx("button",{className:"month-btn",onClick:()=>X(te(l)),disabled:a,children:"›"}),le&&e.jsxs("div",{className:"month-picker-popup",onMouseDown:d=>d.preventDefault(),children:[e.jsxs("div",{className:"mp-year-row",children:[e.jsx("button",{className:"mp-year-btn",onClick:()=>de(d=>d-1),disabled:!!o.recording_start_month&&z<=c,children:"‹"}),e.jsx("span",{className:"mp-year-label",children:z}),e.jsx("button",{className:"mp-year-btn",onClick:()=>de(d=>d+1),disabled:z>=v,children:"›"})]}),e.jsx("div",{className:"mp-grid",children:i.map((d,_)=>{const b=_+1,j=`${z}-${String(b).padStart(2,"0")}`,f=z>v||z===v&&b>k,y=!!o.recording_start_month&&(z<c||z===c&&b<m);return e.jsx("button",{className:`mp-month-btn${j===l?" mp-active":""}`,disabled:f||y,onClick:()=>{X(j),ce(!1)},children:d},j)})})]})]}),e.jsx("div",{className:"topbar-actions",children:e.jsx("button",{className:"btn btn-primary btn-sm",style:{fontSize:"0.78rem",height:34},onClick:()=>E(!0),children:"+ Transaksi"})})]})),()=>L(null)},[l,le,z,o==null?void 0:o.recording_start_month]);const X=a=>{Be(a),Pe({month:a})},$=async()=>{ge(!0);try{const a=`${l}-01`,r=Ze(l),c=ea(),m=te(l),g=o.recording_start_month;let v=x.from("transactions").select("amount, type").eq("user_id",o.id).lt("date",a);g&&(v=v.gte("date",`${g}-01`));let k=x.from("category_budgets").select("budget_limit, category_id, month").eq("user_id",o.id).lte("month",l);g&&(k=k.gte("month",g));const[i,d,_,b,j,f,y,F,Ye,Ge,Ne]=await Promise.all([x.from("transactions").select("*, categories(name, color, icon)").eq("user_id",o.id).gte("date",a).lte("date",r).order("date",{ascending:!1}),x.from("categories").select("*").eq("user_id",o.id).order("name"),x.from("savings").select("*").eq("user_id",o.id),x.from("savings_log").select("*").eq("user_id",o.id).eq("month",l),x.from("transactions").select("amount").eq("user_id",o.id).eq("date",c).eq("type","expense"),x.from("category_budgets").select("category_id, budget_limit").eq("user_id",o.id).eq("month",l),k,x.from("plans").select("*").eq("user_id",o.id).eq("target_month",m).eq("done",!1).order("created_at",{ascending:!0}),v,x.from("hutang").select("id, nama, amount, due_date, sumber, jenis, lunas").eq("user_id",o.id).eq("month",l).eq("lunas",!1).order("due_date",{ascending:!0,nullsFirst:!1}),x.from("hutang").select("id, nama, amount, jenis, lunas, created_at").eq("user_id",o.id).eq("month",l).eq("sumber","tabungan").order("created_at",{ascending:!1})]),O=i.data||[],A={};(f.data||[]).forEach(s=>{A[s.category_id]=Number(s.budget_limit)});let D=(d.data||[]).map(s=>({...s,budget_limit:A[s.id]!==void 0?A[s.id]:s.budget_limit||0,budget_set:A[s.id]!==void 0||(s.budget_limit||0)>0})),V=D.filter(s=>s.month===l);const T=V.find(s=>s.name==="Pemasukan Bulanan"),ke=T?O.filter(s=>s.type==="income"&&s.category_id===T.id):[],Z=ke.reduce((s,n)=>s+Number(n.amount),0);if(Z>0){const s=V.filter(n=>P(n)&&A[n.id]===void 0);if(s.length>0){const n=Math.round(Z*.15);await Promise.all(s.map(u=>x.from("category_budgets").upsert({user_id:o.id,category_id:u.id,month:l,budget_limit:n},{onConflict:"category_id,month"}))),s.forEach(u=>{A[u.id]=n}),D=D.map(u=>s.find(ee=>ee.id===u.id)?{...u,budget_limit:n,budget_set:!0}:u),V=D.filter(u=>u.month===l)}}const ze=O.filter(s=>s.type==="expense").reduce((s,n)=>s+Number(n.amount),0),_e=O.filter(s=>s.type==="income"&&s.category_id!==(T==null?void 0:T.id)).reduce((s,n)=>s+Number(n.amount),0),Y={};O.filter(s=>s.type==="expense"&&s.categories).forEach(s=>{const n=s.categories.name;Y[n]||(Y[n]={name:n,amount:0,color:s.categories.color,icon:s.categories.icon}),Y[n].amount+=Number(s.amount)});const Je=V.map(s=>{var ee;const n=((ee=Y[s.name])==null?void 0:ee.amount)||0,u=s.budget_limit>0?n/s.budget_limit*100:null;return{...s,spent:n,pct:u,overBudget:s.budget_limit>0&&n>s.budget_limit}}).sort((s,n)=>s.overBudget&&!n.overBudget?-1:!s.overBudget&&n.overBudget?1:(n.pct||0)-(s.pct||0));Fe({salary:Z,totalExpense:ze,totalIncome:_e,categories:Je,transactions:O.slice(0,5),savings:_.data||[],savingsLogs:b.data||[],todayExpense:(j.data||[]).reduce((s,n)=>s+Number(n.amount),0),tabunganPerMonth:(y.data||[]).filter(s=>{const n=D.find(u=>u.id===s.category_id);return n&&n.name==="Tabungan Bulanan"}).sort((s,n)=>s.month.localeCompare(n.month)),totalTabungan:(y.data||[]).filter(s=>{const n=D.find(u=>u.id===s.category_id);return n&&n.name==="Tabungan Bulanan"}).reduce((s,n)=>s+Number(n.budget_limit),0)+(o.tabungan_awal||0)-(Ne.data||[]).filter(s=>!s.lunas).reduce((s,n)=>s+Number(n.amount),0),categorySpend:Object.values(Y).sort((s,n)=>n.amount-s.amount),nextMonthPlans:F.data||[],gajiTx:ke[0]||null,gajiCatId:(T==null?void 0:T.id)||null,hutangList:Ge.data||[],hutangTabunganList:Ne.data||[],cumulativeBalance:(Ye.data||[]).reduce((s,n)=>s+(n.type==="income"?Number(n.amount):-Number(n.amount)),0)+Z+_e-ze+(o.saldo_awal||0),cumulativeMandatoryBudget:(y.data||[]).filter(s=>{const n=D.find(u=>u.id===s.category_id);return n&&P(n)}).reduce((s,n)=>s+Number(n.budget_limit),0)})}finally{ge(!1)}},qe=a=>{const r=String(Math.round(a.budget_limit||0)),c=t.salary>0&&a.budget_limit>0?(a.budget_limit/t.salary*100).toFixed(1):"";C({id:a.id,nominal:r,pct:c})},Re=a=>{const r=parseFloat(a)||0,c=t.salary>0&&r>0?(r/t.salary*100).toFixed(1):"";C(m=>({...m,nominal:a,pct:c}))},fe=a=>{const r=parseFloat(a)||0,c=t.salary>0&&r>0?String(Math.round(r/100*t.salary)):"";C(m=>({...m,pct:a,nominal:c}))},He=async()=>{const a=parseFloat(N.nominal)||0,{error:r}=await x.from("category_budgets").upsert({user_id:o.id,category_id:N.id,month:l,budget_limit:a},{onConflict:"category_id,month"});if(r){w(r.message,"error");return}w("Budget disimpan","success"),C(null),$()},Ke=async()=>{const{error:a}=await x.from("categories").delete().eq("id",re.id);if(a){w(a.message,"error");return}w("Kategori dihapus","success"),ne(null),$()};t.categories.filter(a=>a.budget_limit>0).reduce((a,r)=>a+r.budget_limit,0),G();const ve=t.categories.filter(a=>a.overBudget),K=t.categories.filter(a=>P(a)).reduce((a,r)=>a+Number(r.budget_limit||0),0),je=t.categories.filter(a=>P(a)).reduce((a,r)=>a+(r.spent||0),0),Oe=Math.max(0,K-je),ye=t.totalExpense+Oe;t.salary+t.totalIncome-ye,t.salary>0&&ye/t.salary*100;const me=t.categories.filter(a=>a.name==="Tabungan Bulanan"&&a.budget_limit>0).reduce((a,r)=>a+Number(r.budget_limit),0),he=t.cumulativeBalance-t.cumulativeMandatoryBudget;t.salary-t.totalExpense-me,t.salary>0&&t.totalExpense/t.salary*100;const we=t.salary>0?t.salary-me:0;return we-t.totalExpense,t.salary>0&&me>0&&t.totalExpense>we,e.jsxs("div",{className:"animate-in",children:[ve.length>0&&e.jsxs("div",{className:"alert-banner",children:[e.jsx(aa,{size:15}),e.jsxs("span",{children:[e.jsx("strong",{children:"Overbudget"})," — ",ve.map(a=>a.name).join(", ")]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx("div",{className:"hero-card",children:J?e.jsx("div",{className:"skeleton",style:{height:88,borderRadius:8}}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"hero-top",children:[e.jsxs("div",{className:"hero-left",children:[e.jsx("span",{className:"hero-eyebrow",children:"Total Saldo"}),e.jsxs("div",{className:`hero-balance ${he<0?"neg":""}`,children:[he<0&&e.jsx("span",{className:"hero-neg-sign",children:"-"}),h(Math.abs(he))]})]}),e.jsxs("div",{className:"hero-right",children:[e.jsxs("div",{className:"hero-chip hero-chip-btn",onClick:()=>{var a;oe({amount:t.gajiTx?String(t.gajiTx.amount):"",note:((a=t.gajiTx)==null?void 0:a.description)||""}),H(!0)},children:[e.jsx("span",{className:"hero-chip-label",children:"Pemasukan Bulanan"}),e.jsx("span",{className:"hero-chip-val tabular",style:{color:t.salary>0?"var(--success)":"var(--text-muted)"},children:h(t.salary)}),e.jsx("span",{className:"hero-chip-cta",children:t.salary>0?"Lihat detail →":"+ Catat sekarang"})]}),e.jsxs("div",{className:"hero-chip hero-chip-btn",onClick:()=>Q(!0),children:[e.jsx("span",{className:"hero-chip-label",children:"Pengeluaran Wajib"}),e.jsx("span",{className:"hero-chip-val tabular",style:{color:K>0?"var(--danger)":"var(--text-muted)"},children:K>0?`−${h(K)}`:"—"}),e.jsx("span",{className:"hero-chip-cta",children:"Lihat detail →"})]}),e.jsxs("div",{className:"hero-chip hero-chip-btn",onClick:()=>ie(!0),children:[e.jsx("span",{className:"hero-chip-label",children:"Total Tabungan"}),e.jsx("span",{className:"hero-chip-val tabular",style:{color:t.totalTabungan>0?"var(--success)":"var(--text-muted)"},children:h(t.totalTabungan)}),e.jsx("span",{className:"hero-chip-cta",children:"Lihat detail →"})]})]})]}),e.jsxs("div",{className:"hero-stats-row",children:[(()=>{const a=t.totalExpense-je;return e.jsxs("div",{className:"hero-stat",children:[e.jsx("span",{className:"hero-stat-label",children:"Total Pengeluaran"}),e.jsx("span",{className:"hero-stat-val",style:{color:a>0?"var(--danger)":"var(--text-muted)"},children:a>0?`−${h(a)}`:"—"}),e.jsx("span",{className:"hero-stat-sub",children:"diluar wajib & tabungan"})]})})(),e.jsx("div",{className:"hero-stat-divider"}),(()=>{const a=o.budget_harian||0,r=t.todayExpense,c=a>0?r/a:0,m=a>0&&r>=a,g=a>0&&c>=.8&&!m,v=a>0&&r>0&&c<.8,k=m?"var(--danger)":g?"var(--warning)":r>0?"var(--danger)":"var(--text-muted)";return e.jsxs("div",{className:"hero-stat",children:[e.jsx("span",{className:"hero-stat-label",children:"Hari Ini"}),e.jsx("span",{className:"hero-stat-val",style:{color:k},children:r>0?`−${h(r)}`:"—"}),m?e.jsx("span",{className:"hero-stat-sub",style:{color:"var(--danger)",fontWeight:600},children:"melebihi budget harian"}):g?e.jsx("span",{className:"hero-stat-sub",style:{color:"var(--warning)",fontWeight:600},children:"mendekati budget harian"}):v?e.jsx("span",{className:"hero-stat-sub",style:{color:"var(--success)",fontWeight:600},children:"dalam budget harian"}):e.jsx("span",{className:"hero-stat-sub",children:"pengeluaran"})]})})(),e.jsx("div",{className:"hero-stat-divider"}),e.jsxs("div",{className:"hero-stat hero-stat-btn",onClick:()=>R(!0),children:[e.jsx("span",{className:"hero-stat-label",children:"Rencana Bulan Depan"}),e.jsx("span",{className:"hero-stat-val",style:{color:t.nextMonthPlans.length>0?"var(--text-primary)":"var(--text-muted)"},children:t.nextMonthPlans.length>0?h(t.nextMonthPlans.reduce((a,r)=>a+Number(r.amount),0)):"—"}),e.jsx("span",{className:"hero-stat-sub",style:{color:"var(--accent)",fontWeight:600},children:t.nextMonthPlans.length>0?`${t.nextMonthPlans.length} item · Lihat detail`:"Belum ada"})]})]})]})}),e.jsxs("div",{className:"dash-two-col",children:[(()=>{const a=t.categories.filter(i=>!P(i)&&!Me(i)&&i.is_monthly&&i.budget_limit>0),r=t.categories.filter(i=>!P(i)&&!Me(i)&&!i.is_monthly&&i.budget_limit>0),c=(t.hutangList||[]).filter(i=>i.jenis==="hutang"),m=(t.hutangList||[]).filter(i=>i.jenis==="piutang"),g=!J&&a.length===0&&r.length===0&&c.length===0&&m.length===0,v=[...a,...r];v.reduce((i,d)=>i+Number(d.budget_limit),0),v.reduce((i,d)=>i+Number(d.spent||0),0);const k=({cat:i})=>{const d=i.budget_limit>0?i.spent/i.budget_limit*100:0,_=Math.min(d,100),b=d>100,j=!b&&d>=100,f=!b&&d>=80&&d<100,y=b?"var(--danger)":j?"var(--success)":f?"var(--warning)":i.color||"var(--accent)",F=i.budget_limit-(i.spent||0);return e.jsxs("div",{className:"brow",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${i.color||"#6366f1"}18`},children:e.jsx("span",{style:{width:10,height:10,borderRadius:"50%",background:i.color||"var(--accent)",display:"inline-block",flexShrink:0}})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("span",{className:"brow-name",children:i.name}),b&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Over"}),j&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Penuh"}),f&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Hampir"}),i.budget_limit===0&&e.jsx("span",{style:{fontSize:"0.65rem",color:"var(--text-muted)",marginLeft:6},children:"belum diset"})]})]}),i.budget_limit>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"brow-bar-wrap",children:e.jsx("div",{className:"brow-bar",children:e.jsx("div",{className:"brow-bar-fill",style:{width:`${_}%`,background:y}})})}),e.jsxs("div",{className:"brow-right",children:[e.jsx("span",{className:"brow-spent tabular",style:{color:b?"var(--danger)":"var(--text-primary)"},children:h(i.spent||0)}),e.jsx("span",{className:"brow-limit tabular",style:{color:F<0?"var(--danger)":F===0?"var(--text-muted)":"var(--success)"},children:F<0?`Over ${h(Math.abs(F))}`:`Sisa ${h(F)}`})]}),e.jsxs("span",{className:"brow-pct",style:{color:y},children:[d.toFixed(0),"%"]})]}):e.jsx("div",{style:{flex:1}})]})};return e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",style:{marginBottom:14},children:[e.jsx("div",{children:e.jsx("h3",{className:"sect-title",children:"Budget Bulan Ini"})}),e.jsx(I,{to:`/categories?month=${l}`,className:"pill-link",children:"⚙ Atur"})]}),e.jsx("div",{className:"card-scroll-body",children:J?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(3)].map((i,d)=>e.jsx("div",{className:"skeleton",style:{height:44}},d))}):g?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(ta,{size:14})}),e.jsx("span",{children:"Tambahkan kategori dan budget"}),e.jsx(I,{to:`/categories?month=${l}`,className:"empty-hint-link",style:{color:"var(--accent)"},children:"Atur →"})]}):e.jsxs(e.Fragment,{children:[(c.length>0||m.length>0)&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Hutang & Piutang"}),e.jsx("div",{className:"budget-rows",children:[...c,...m].map(i=>{const d=i.jenis==="piutang",_=d?"#f59e0b":"#f87171",b=new Date;b.setHours(0,0,0,0);const j=i.due_date?new Date(i.due_date):null,f=j?Math.round((j-b)/864e5):null,y=f!==null&&f<0;return e.jsxs("div",{className:"brow",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${_}18`,color:_},children:d?e.jsx(Se,{size:13}):e.jsx(pe,{size:13})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("span",{className:"brow-name",children:i.nama}),e.jsx("span",{style:{fontSize:"0.62rem",color:"var(--text-muted)",marginLeft:6},children:d?"piutang":"hutang"}),y&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Terlambat"})]})]}),e.jsx("div",{style:{flex:1}}),e.jsxs("div",{className:"brow-right",children:[e.jsx("span",{className:"brow-spent tabular",style:{color:_},children:h(i.amount)}),i.due_date&&e.jsx("span",{className:"brow-limit tabular",style:{color:y?"var(--danger)":f<=7?"var(--warning)":"var(--text-muted)"},children:f===0?"Hari ini":f>0?`${f}h lagi`:`${Math.abs(f)}h lalu`})]})]},i.id)})})]}),(c.length>0||m.length>0)&&a.length>0&&e.jsx("div",{style:{height:1,background:"var(--border)",margin:"12px 0"}}),a.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Pengeluaran Rutin"}),e.jsx("div",{className:"budget-rows",children:a.map(i=>e.jsx(k,{cat:i},i.id))})]}),(a.length>0||c.length>0||m.length>0)&&r.length>0&&e.jsx("div",{style:{height:1,background:"var(--border)",margin:"12px 0"}}),r.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Kategori Lainnya"}),e.jsx("div",{className:"budget-rows",children:r.map(i=>e.jsx(k,{cat:i},i.id))})]}):c.length===0&&m.length===0&&a.length===0&&e.jsxs("div",{style:{fontSize:"0.72rem",color:"var(--text-muted)"},children:["Belum ada kategori dengan budget. ",e.jsx(I,{to:`/categories?month=${l}`,style:{color:"var(--accent)"},children:"Atur →"})]})]})})]})})(),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",children:[e.jsx("h3",{className:"sect-title",children:"Transaksi Terakhir"}),e.jsx(I,{to:`/transactions?month=${l}`,className:"pill-link",children:"Lihat semua"})]}),e.jsx("div",{className:"card-scroll-body",children:J?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,marginTop:12},children:[...Array(4)].map((a,r)=>e.jsx("div",{className:"skeleton",style:{height:42}},r))}):t.transactions.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(Ce,{size:13})}),e.jsx("span",{children:"Belum ada transaksi bulan ini. "}),e.jsx("button",{className:"empty-hint-link",onClick:()=>E(!0),children:"Tambah sekarang →"})]}):e.jsx("div",{className:"tx-list",children:t.transactions.map(a=>{var r;return e.jsxs("div",{className:"tx-row",children:[e.jsx("div",{className:"tx-icon",style:{background:a.type==="income"?"rgba(52,211,153,0.12)":"rgba(248,113,113,0.12)",color:a.type==="income"?"var(--success)":"var(--danger)"},children:a.type==="income"?e.jsx(Ce,{size:14}):e.jsx(ae,{size:14})}),e.jsxs("div",{className:"tx-meta",children:[e.jsx("span",{className:"tx-desc",children:a.description||((r=a.categories)==null?void 0:r.name)||"Transaksi"}),e.jsx("span",{className:"tx-date",children:new Date(a.date).toLocaleDateString("id-ID",{day:"numeric",month:"short"})})]}),e.jsxs("span",{className:`tx-amount tabular ${a.type==="income"?"inc":"exp"}`,children:[a.type==="income"?"+":"−",h(a.amount)]})]},a.id)})})})]})]})]}),Ie&&(()=>{const a=t.salary>0,r=async()=>{const c=parseFloat(W.amount.replace(/\D/g,""))||0;if(c){be(!0);try{const m=`${l}-01`;if(t.gajiTx){const{error:g}=await x.from("transactions").update({amount:c,description:W.note,date:m}).eq("id",t.gajiTx.id);if(g)throw g}else{const{error:g}=await x.from("transactions").insert({user_id:o.id,category_id:t.gajiCatId,type:"income",amount:c,description:W.note,date:m});if(g)throw g}w("Pemasukan disimpan","success"),H(!1),$()}catch(m){w(m.message,"error")}finally{be(!1)}}};return e.jsx("div",{className:"modal-overlay",onClick:()=>H(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:c=>c.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Pemasukan Bulanan ",S(l)]}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:a?"Edit jumlah atau catatan":"Catat pemasukan bulan ini"})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>H(!1),children:e.jsx(M,{size:16})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Jumlah Pemasukan"}),e.jsx(Te,{value:W.amount,onChange:c=>oe(m=>({...m,amount:c})),autoFocus:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Catatan ",!a&&e.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400},children:"(opsional)"})]}),e.jsx("textarea",{className:"form-input",rows:3,placeholder:"Misal: gaji pokok + bonus, tunjangan, dll...",value:W.note,onChange:c=>oe(m=>({...m,note:c.target.value})),style:{resize:"vertical",fontFamily:"var(--font-sans)",fontSize:"0.875rem"}})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>H(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:r,disabled:xe||!W.amount,children:xe?"Menyimpan...":"Simpan"})]})]})})})(),$e&&e.jsx("div",{className:"modal-overlay",onClick:()=>ie(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Total Tabungan"}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Akumulasi s/d ",S(l)]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>ie(!1),children:e.jsx(M,{size:16})})]}),e.jsxs("div",{className:"wajib-rows",children:[(o.tabungan_awal||0)>0&&e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)",fontSize:"0.55rem",fontWeight:800},children:"AWAL"}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:"Saldo Awal Tabungan"}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)"},children:"sebelum mulai record"})]})]}),e.jsx("span",{className:"wajib-amount tabular",style:{color:"var(--success)"},children:h(o.tabungan_awal)})]}),t.tabunganPerMonth.length===0&&!(o.tabungan_awal>0)?e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--text-muted)",padding:"8px 0"},children:'Belum ada alokasi tabungan. Set budget kategori "Tabungan Bulanan".'}):t.tabunganPerMonth.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)"},children:e.jsx(ae,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:S(a.month)}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)"},children:"Tabungan Bulanan"})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:Number(a.budget_limit)>0?"var(--success)":"var(--text-muted)"},children:["+",h(a.budget_limit)]})]},a.month)),t.hutangTabunganList.filter(a=>!a.lunas).length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"wajib-divider",style:{margin:"8px 0"}}),e.jsx("div",{style:{fontSize:"0.62rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"var(--text-muted)",marginBottom:4},children:"Outstanding bulan ini"}),t.hutangTabunganList.filter(a=>!a.lunas).map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:a.jenis==="piutang"?"rgba(245,158,11,0.1)":"rgba(248,113,113,0.1)",color:a.jenis==="piutang"?"var(--warning)":"var(--danger)",fontSize:"0.9rem"},children:a.jenis==="piutang"?e.jsx(Se,{size:13}):e.jsx(pe,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:a.nama}),e.jsx("div",{style:{fontSize:"0.62rem",color:"var(--text-muted)"},children:a.jenis==="hutang"?"Hutang":"Piutang"})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",h(a.amount)]})]},a.id))]}),e.jsx("div",{className:"wajib-divider",style:{margin:"10px 0"}}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:4},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Tabungan"}),e.jsx("span",{className:"wajib-amount tabular",style:{color:t.totalTabungan>0?"var(--success)":"var(--text-muted)",fontWeight:800},children:h(t.totalTabungan)})]})]})]})}),Ae&&e.jsx("div",{className:"modal-overlay",onClick:()=>R(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Rencana Bulan Depan"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:S(te(l))})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx(I,{to:"/savings",className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>R(!1),children:"Kelola →"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>R(!1),children:e.jsx(M,{size:16})})]})]}),t.nextMonthPlans.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(pe,{size:13})}),e.jsxs("span",{children:["Belum ada rencana untuk ",S(te(l)),"."]}),e.jsx(I,{to:"/savings",className:"empty-hint-link",onClick:()=>R(!1),children:"Tambah →"})]}):e.jsxs("div",{className:"wajib-rows",children:[t.nextMonthPlans.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsx("span",{className:"brow-name",children:a.name}),e.jsx("span",{className:"wajib-amount tabular",children:h(a.amount)})]},a.id)),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total"}),e.jsx("span",{className:"wajib-amount tabular",children:h(t.nextMonthPlans.reduce((a,r)=>a+Number(r.amount),0))})]})]})]})}),We&&e.jsx("div",{className:"modal-overlay",onClick:()=>Q(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:420},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Pengeluaran Tetap"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:S(l)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>{Q(!1),se(!0)},children:"Kelola"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>Q(!1),children:e.jsx(M,{size:16})})]})]}),e.jsxs("div",{className:"wajib-rows",children:[t.categories.filter(a=>P(a)).map(a=>{const r=a.budget_set?Number(a.budget_limit):t.salary>0?Math.round(t.salary*.15):0,c=t.salary>0&&r>0?Math.round(r/t.salary*100):null;return e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:e.jsx(ae,{size:13})}),e.jsx("span",{className:"brow-name",children:a.name})]}),e.jsxs("div",{className:"wajib-right",children:[c&&e.jsxs("span",{className:"wajib-pct",children:[c,"%"]}),e.jsx("span",{className:"wajib-amount tabular",children:r>0?h(r):"—"})]})]},a.id)}),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Potongan"}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",h(K)]})]})]})]})}),De&&e.jsx("div",{className:"modal-overlay",onClick:()=>E(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>E(!1),children:e.jsx(M,{size:16})})]}),e.jsx(sa,{month:l,onSuccess:()=>{$(),E(!1)},onClose:()=>E(!1)})]})}),Le&&!N&&!ue&&e.jsx("div",{className:"modal-overlay",onClick:()=>se(!1),children:e.jsxs("div",{className:"modal cat-manager-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Kelola Kategori"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:S(l)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>{Ee({is_mandatory:!0}),q(!0)},children:"+ Kategori"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>se(!1),children:e.jsx(M,{size:16})})]})]}),e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("p",{className:"cat-mgr-section-title",children:"Pengeluaran Wajib"}),e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:t.categories.filter(a=>P(a)).map(a=>{const r=Number(a.budget_limit)||0,c=t.salary>0&&r>0?Math.round(r/t.salary*100):null;return e.jsxs("div",{className:"cat-mgr-row",children:[e.jsxs("div",{className:"cat-mgr-left",children:[e.jsx("span",{className:"cat-mgr-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:e.jsx(ae,{size:14})}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-mgr-name",children:a.name}),e.jsx("span",{className:"cat-mgr-sub",children:"Wajib · langsung dipotong"})]})]}),e.jsxs("div",{className:"cat-mgr-right",children:[c&&e.jsxs("span",{className:"cat-mgr-pct",children:[c,"%"]}),e.jsx("span",{className:"cat-mgr-amount tabular",children:r>0?h(r):"—"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.7rem"},onClick:()=>qe(a),children:"Ubah"})]})]},a.id)})})]})]})}),N&&(()=>{const a=t.categories.find(r=>r.id===N.id);return e.jsx("div",{className:"modal-overlay",onClick:()=>C(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:r=>r.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Pengeluaran Wajib — ",a==null?void 0:a.name]}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[S(l),t.salary>0?` · ${h(t.salary)}`:""]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>C(null),children:e.jsx(M,{size:16})})]}),t.salary>0&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx("input",{className:"form-input",type:"number",placeholder:String(ia),value:N.pct,onChange:r=>fe(r.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),e.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),N.pct&&t.salary>0&&e.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",h(Math.round(parseFloat(N.pct)/100*t.salary))]})]}),!N.pct&&e.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(r=>e.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>fe(String(r)),children:[r,"%"]},r))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),e.jsx(Te,{value:N.nominal,onChange:Re,autoFocus:!t.salary})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:16},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)",fontSize:"0.78rem"},onClick:()=>{C(null),ne({id:a.id,name:a.name})},children:"Hapus Kategori"}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>C(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",onClick:He,children:"Simpan"})]})]})]})})})(),re&&e.jsx(na,{title:"Hapus Kategori",message:`Hapus kategori "${re.name}"? Transaksi yang terhubung tidak akan ikut terhapus.`,confirmLabel:"Hapus",onConfirm:Ke,onCancel:()=>ne(null)}),ue&&e.jsx("div",{className:"modal-overlay",onClick:()=>q(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:U!=null&&U.id?"Edit Kategori":"Kategori Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>q(!1),children:e.jsx(M,{size:16})})]}),e.jsx(ra,{editData:U,salary:t.salary,month:l,onSuccess:()=>{$(),q(!1)},onClose:()=>q(!1)})]})}),e.jsx("style",{children:`
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
          .hero-balance { font-size: 1.35rem; }
          .hero-right { gap: 4px; }
          .hero-chip { padding: 6px 7px; }
          .hero-chip-val { font-size: 0.72rem; }
        }
      `})]})}export{ha as default};
