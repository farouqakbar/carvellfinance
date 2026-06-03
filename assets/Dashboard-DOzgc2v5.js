import{G as aa,J as ta,M as sa,K as ra,E as h,x as U,D as e,A as S,H as na,z as Me,B as ia,F as u,a as oa,w as p,L as A,o as la,c as Pe,e as ue,d as Be,b as te,t as P,C as De}from"./index-4NYbs_cT.js";import{T as ca}from"./TransactionForm-CVIwkpAA.js";import{C as da}from"./CategoryForm-kdFpCnIl.js";import{b as ma,a as xe,i as F,C as pa}from"./ConfirmModal-DIbddYZp.js";const ga=15;function ha(c){const[L,v]=c.split("-").map(Number),B=new Date(L,v-2,1);return`${B.getFullYear()}-${String(B.getMonth()+1).padStart(2,"0")}`}function se(c){const[L,v]=c.split("-").map(Number),B=new Date(L,v,1);return`${B.getFullYear()}-${String(B.getMonth()+1).padStart(2,"0")}`}function va(){const{user:c}=aa(),{setHeader:L}=ta(),v=sa(),[B,Fe]=ra(),[l,Le]=h.useState(()=>B.get("month")||U()),[t,$e]=h.useState({salary:0,totalExpense:0,totalIncome:0,categories:[],transactions:[],savings:[],savingsLogs:[],categorySpend:[],hutangList:[],hutangTabunganList:[],todayExpense:0,totalTabungan:0,tabunganPerMonth:[],nextMonthPlans:[],cumulativeBalance:0,cumulativeMandatoryBudget:0,gajiTx:null,gajiCatId:null}),[Q,be]=h.useState(!0),[We,$]=h.useState(!1),[Ee,re]=h.useState(!1),[j,C]=h.useState(null),[fe,R]=h.useState(!1),[X,qe]=h.useState(null),[H,ne]=h.useState(null),[Ie,V]=h.useState(!1),[Ae,ie]=h.useState(!1),[Re,K]=h.useState(!1),[He,O]=h.useState(!1),[T,Z]=h.useState({amount:"",note:"",date:""}),[ve,je]=h.useState(!1),[oe,le]=h.useState(!1),[k,ce]=h.useState(()=>Number(U().split("-")[0])),[Ke,Oe]=h.useState(!1);h.useEffect(()=>{if(c.recording_start_month&&l<c.recording_start_month){ee(c.recording_start_month);return}W()},[l,c==null?void 0:c.recording_start_month]),h.useEffect(()=>{const a=l===U(),r=!!c.recording_start_month&&l<=c.recording_start_month,[o,d]=c.recording_start_month?c.recording_start_month.split("-").map(Number):[0,0],g=U(),[f,N]=g.split("-").map(Number),n=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];return L(e.jsxs(e.Fragment,{children:[oe&&e.jsx("div",{style:{position:"fixed",inset:0,zIndex:299},onClick:()=>le(!1)}),e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>ee(ha(l)),disabled:r,children:"‹"}),e.jsx("span",{className:"month-label-text month-label-clickable",onClick:()=>{ce(Number(l.split("-")[0])),le(m=>!m)},children:S(l)}),e.jsx("button",{className:"month-btn",onClick:()=>ee(se(l)),disabled:a,children:"›"}),oe&&e.jsxs("div",{className:"month-picker-popup",onMouseDown:m=>m.preventDefault(),children:[e.jsxs("div",{className:"mp-year-row",children:[e.jsx("button",{className:"mp-year-btn",onClick:()=>ce(m=>m-1),disabled:!!c.recording_start_month&&k<=o,children:"‹"}),e.jsx("span",{className:"mp-year-label",children:k}),e.jsx("button",{className:"mp-year-btn",onClick:()=>ce(m=>m+1),disabled:k>=f,children:"›"})]}),e.jsx("div",{className:"mp-grid",children:n.map((m,z)=>{const x=z+1,y=`${k}-${String(x).padStart(2,"0")}`,b=k>f||k===f&&x>N,w=!!c.recording_start_month&&(k<o||k===o&&x<d);return e.jsx("button",{className:`mp-month-btn${y===l?" mp-active":""}`,disabled:b||w,onClick:()=>{ee(y),le(!1)},children:m},y)})})]})]}),e.jsx("div",{className:"topbar-actions",children:e.jsx("button",{className:"btn btn-primary btn-sm",style:{fontSize:"0.78rem",height:34},onClick:()=>$(!0),children:"+ Transaksi"})})]})),()=>L(null)},[l,oe,k,c==null?void 0:c.recording_start_month]),na();const ee=a=>{Le(a),Fe({month:a})},W=async()=>{be(!0);try{const a=`${l}-01`,r=Me(l),o=ia(),d=se(l),g=c.recording_start_month;let f=u.from("transactions").select("amount, type").eq("user_id",c.id).lt("date",a);g&&(f=f.gte("date",`${g}-01`));let N=u.from("category_budgets").select("budget_limit, category_id, month").eq("user_id",c.id).lte("month",l);g&&(N=N.gte("month",g));const[n,m,z,x,y,b,w,D,E,pe,ke]=await Promise.all([u.from("transactions").select("*, categories(name, color, icon)").eq("user_id",c.id).gte("date",a).lte("date",r).order("date",{ascending:!1}),Promise.all([u.from("categories").select("*").eq("user_id",c.id).is("month",null),u.from("categories").select("*").eq("user_id",c.id).eq("month",l)]).then(([s,i])=>{const _=[...(s.data||[]).filter(I=>ma(I)),...i.data||[]].sort((I,ea)=>I.name.localeCompare(ea.name)),Te=new Set;return{data:_.filter(I=>Te.has(I.name)?!1:(Te.add(I.name),!0))}}),u.from("savings").select("*").eq("user_id",c.id),u.from("savings_log").select("*").eq("user_id",c.id).eq("month",l),u.from("transactions").select("amount").eq("user_id",c.id).eq("date",o).eq("type","expense"),u.from("category_budgets").select("category_id, budget_limit").eq("user_id",c.id).eq("month",l),N,u.from("plans").select("*").eq("user_id",c.id).eq("target_month",d).eq("done",!1).order("created_at",{ascending:!0}),f,u.from("hutang").select("id, nama, amount, due_date, sumber, jenis, lunas").eq("user_id",c.id).lte("month",l).eq("lunas",!1).order("due_date",{ascending:!0,nullsFirst:!1}),u.from("hutang").select("id, nama, amount, jenis, lunas, created_at").eq("user_id",c.id).lte("month",l).eq("sumber","tabungan").order("created_at",{ascending:!1})]),q=n.data||[],ge={};(b.data||[]).forEach(s=>{ge[s.category_id]=Number(s.budget_limit)});let J=(m.data||[]).map(s=>{const i=ge[s.id]!==void 0?ge[s.id]:0;return{...s,budget_limit:i,budget_set:i>0}});const M=J.find(s=>xe(s)),ze=M?q.filter(s=>s.type==="income"&&s.category_id===M.id):[],_e=ze.reduce((s,i)=>s+Number(i.amount),0),Ve=J,Se=q.filter(s=>s.type==="expense").reduce((s,i)=>s+Number(i.amount),0),Ce=q.filter(s=>s.type==="income"&&s.category_id!==(M==null?void 0:M.id)).reduce((s,i)=>s+Number(i.amount),0),he={};q.filter(s=>s.type==="expense"&&s.category_id).forEach(s=>{he[s.category_id]=(he[s.category_id]||0)+Number(s.amount)});const ae={};q.filter(s=>s.type==="expense"&&s.categories).forEach(s=>{const i=s.categories.name;ae[i]||(ae[i]={name:i,amount:0,color:s.categories.color,icon:s.categories.icon}),ae[i].amount+=Number(s.amount)});const Ze=Ve.map(s=>{const i=he[s.id]||0,_=s.budget_limit>0?i/s.budget_limit*100:null;return{...s,spent:i,pct:_,overBudget:s.budget_limit>0&&i>s.budget_limit}}).sort((s,i)=>s.overBudget&&!i.overBudget?-1:!s.overBudget&&i.overBudget?1:(i.pct||0)-(s.pct||0));$e({salary:_e,totalExpense:Se,totalIncome:Ce,categories:Ze,transactions:q.slice(0,5),savings:z.data||[],savingsLogs:x.data||[],todayExpense:(y.data||[]).reduce((s,i)=>s+Number(i.amount),0),tabunganPerMonth:(w.data||[]).filter(s=>{const i=J.find(_=>_.id===s.category_id);return i&&i.name==="Tabungan Bulanan"}).sort((s,i)=>s.month.localeCompare(i.month)),totalTabungan:(w.data||[]).filter(s=>{const i=J.find(_=>_.id===s.category_id);return i&&i.name==="Tabungan Bulanan"}).reduce((s,i)=>s+Number(i.budget_limit),0)+(c.tabungan_awal||0)-(ke.data||[]).filter(s=>!s.lunas).reduce((s,i)=>s+Number(i.amount),0),categorySpend:Object.values(ae).sort((s,i)=>i.amount-s.amount),nextMonthPlans:D.data||[],gajiTx:ze[0]||null,gajiCatId:(M==null?void 0:M.id)||null,hutangList:pe.data||[],hutangTabunganList:ke.data||[],cumulativeBalance:(E.data||[]).reduce((s,i)=>s+(i.type==="income"?Number(i.amount):-Number(i.amount)),0)+_e+Ce-Se+(c.saldo_awal||0),cumulativeMandatoryBudget:(w.data||[]).filter(s=>{const i=J.find(_=>_.id===s.category_id);return i&&F(i)}).reduce((s,i)=>s+Number(i.budget_limit),0)})}finally{be(!1)}},Ye=a=>{const r=String(Math.round(a.budget_limit||0)),o=t.salary>0&&a.budget_limit>0?(a.budget_limit/t.salary*100).toFixed(1):"";C({id:a.id,nominal:r,pct:o})},Ge=a=>{const r=parseFloat(a)||0,o=t.salary>0&&r>0?(r/t.salary*100).toFixed(1):"";C(d=>({...d,nominal:a,pct:o}))},ye=a=>{const r=parseFloat(a)||0,o=t.salary>0&&r>0?String(Math.round(r/100*t.salary)):"";C(d=>({...d,pct:a,nominal:o}))},Je=async()=>{const a=parseFloat(j.nominal)||0,[r,o]=await Promise.all([u.from("category_budgets").upsert({user_id:c.id,category_id:j.id,month:l,budget_limit:a},{onConflict:"category_id,month"}),u.from("categories").update({budget_limit:a}).eq("id",j.id)]),d=r.error||o.error;if(d){v(d.message,"error");return}v("Budget disimpan","success"),C(null),W()},Ue=async()=>{const a=`${l}-01`,r=Me(l),[o,d]=await Promise.all([u.from("transactions").delete().eq("category_id",H.id).gte("date",a).lte("date",r),u.from("category_budgets").delete().eq("category_id",H.id).eq("month",l)]);if(o.error||d.error){v((o.error||d.error).message,"error");return}const{error:g}=await u.from("categories").delete().eq("id",H.id);if(g){v(g.message,"error");return}v("Kategori dihapus","success"),ne(null),W()};t.categories.filter(a=>a.budget_limit>0).reduce((a,r)=>a+r.budget_limit,0),U();const we=t.categories.filter(a=>a.overBudget),Y=t.categories.filter(a=>F(a)).reduce((a,r)=>a+Number(r.budget_limit||0),0),Qe=t.categories.filter(a=>F(a)).reduce((a,r)=>a+(r.spent||0),0),Xe=Math.max(0,Y-Qe),G=t.totalExpense+Xe;t.salary+t.totalIncome-G,t.salary>0&&G/t.salary*100;const de=t.categories.filter(a=>a.name==="Tabungan Bulanan"&&a.budget_limit>0).reduce((a,r)=>a+Number(r.budget_limit),0),me=t.cumulativeBalance-t.cumulativeMandatoryBudget;t.salary-t.totalExpense-de,t.salary>0&&t.totalExpense/t.salary*100;const Ne=t.salary>0?t.salary-de:0;return Ne-t.totalExpense,t.salary>0&&de>0&&t.totalExpense>Ne,e.jsxs("div",{className:"animate-in",children:[we.length>0&&e.jsxs("div",{className:"alert-banner",children:[e.jsx(oa,{size:15}),e.jsxs("span",{children:[e.jsx("strong",{children:"Overbudget"})," — ",we.map(a=>a.name).join(", ")]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx("div",{className:"hero-card",children:Q?e.jsx("div",{className:"skeleton",style:{height:88,borderRadius:8}}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"hero-top",children:[e.jsxs("div",{className:"hero-left",children:[e.jsx("span",{className:"hero-eyebrow",children:"Total Saldo"}),e.jsxs("div",{className:`hero-balance ${me<0?"neg":""}`,children:[me<0&&e.jsx("span",{className:"hero-neg-sign",children:"-"}),p(Math.abs(me))]})]}),e.jsxs("div",{className:"hero-right",children:[e.jsxs("div",{className:"hero-chip hero-chip-btn",onClick:()=>{var a,r;Z({amount:t.gajiTx?String(t.gajiTx.amount):"",note:((a=t.gajiTx)==null?void 0:a.description)||"",date:((r=t.gajiTx)==null?void 0:r.date)||`${l}-01`}),O(!0)},children:[e.jsx("span",{className:"hero-chip-label",children:"Pemasukan Bulanan"}),e.jsx("span",{className:"hero-chip-val tabular",style:{color:t.salary>0?"var(--success)":"var(--text-muted)"},children:p(t.salary)}),e.jsx("span",{className:"hero-chip-cta",children:t.salary>0?"Lihat detail →":"+ Catat sekarang"})]}),e.jsxs("div",{className:"hero-chip hero-chip-btn",onClick:()=>V(!0),children:[e.jsx("span",{className:"hero-chip-label",children:"Pengeluaran Wajib"}),e.jsx("span",{className:"hero-chip-val tabular",style:{color:Y>0?"var(--danger)":"var(--text-muted)"},children:Y>0?`−${p(Y)}`:"—"}),e.jsx("span",{className:"hero-chip-cta",children:"Lihat detail →"})]}),e.jsxs("div",{className:"hero-chip hero-chip-btn",onClick:()=>ie(!0),children:[e.jsx("span",{className:"hero-chip-label",children:"Total Tabungan"}),e.jsx("span",{className:"hero-chip-val tabular",style:{color:t.totalTabungan>0?"var(--success)":"var(--text-muted)"},children:p(t.totalTabungan)}),e.jsx("span",{className:"hero-chip-cta",children:"Lihat detail →"})]})]})]}),e.jsxs("div",{className:"hero-stats-row",children:[e.jsxs("div",{className:"hero-stat",children:[e.jsx("span",{className:"hero-stat-label",children:"Total Pengeluaran"}),e.jsx("span",{className:"hero-stat-val",style:{color:G>0?"var(--danger)":"var(--text-muted)"},children:G>0?`−${p(G-t.totalIncome)}`:"—"}),e.jsx("span",{className:"hero-stat-sub",children:"dari gaji"})]}),e.jsx("div",{className:"hero-stat-divider"}),(()=>{const a=c.budget_harian||0,r=t.todayExpense,o=a>0?r/a:0,d=a>0&&r>=a,g=a>0&&o>=.8&&!d,f=a>0&&r>0&&o<.8,N=d?"var(--danger)":g?"var(--warning)":r>0?"var(--danger)":"var(--text-muted)";return e.jsxs("div",{className:"hero-stat",children:[e.jsx("span",{className:"hero-stat-label",children:"Hari Ini"}),e.jsx("span",{className:"hero-stat-val",style:{color:N},children:r>0?`−${p(r)}`:"—"}),d?e.jsx("span",{className:"hero-stat-sub",style:{color:"var(--danger)",fontWeight:600},children:"melebihi budget harian"}):g?e.jsx("span",{className:"hero-stat-sub",style:{color:"var(--warning)",fontWeight:600},children:"mendekati budget harian"}):f?e.jsx("span",{className:"hero-stat-sub",style:{color:"var(--success)",fontWeight:600},children:"dalam budget harian"}):e.jsx("span",{className:"hero-stat-sub",children:"pengeluaran"})]})})(),e.jsx("div",{className:"hero-stat-divider"}),e.jsxs("div",{className:"hero-stat hero-stat-btn",onClick:()=>K(!0),children:[e.jsx("span",{className:"hero-stat-label",children:"Rencana Bulan Depan"}),e.jsx("span",{className:"hero-stat-val",style:{color:t.nextMonthPlans.length>0?"var(--text-primary)":"var(--text-muted)"},children:t.nextMonthPlans.length>0?p(t.nextMonthPlans.reduce((a,r)=>a+Number(r.amount),0)):"—"}),e.jsx("span",{className:"hero-stat-sub",style:{color:"var(--accent)",fontWeight:600},children:t.nextMonthPlans.length>0?`${t.nextMonthPlans.length} item · Lihat detail`:"Belum ada"})]})]})]})}),e.jsxs("div",{className:"dash-two-col",children:[(()=>{const a=t.categories.filter(n=>!F(n)&&!xe(n)&&n.is_monthly&&(n.budget_limit>0||(n.spent||0)>0)),r=t.categories.filter(n=>!F(n)&&!xe(n)&&!n.is_monthly&&(n.budget_limit>0||(n.spent||0)>0)),o=(t.hutangList||[]).filter(n=>n.jenis==="hutang"),d=(t.hutangList||[]).filter(n=>n.jenis==="piutang"),g=!Q&&a.length===0&&r.length===0&&o.length===0&&d.length===0,f=[...a,...r];f.reduce((n,m)=>n+Number(m.budget_limit),0),f.reduce((n,m)=>n+Number(m.spent||0),0);const N=({cat:n})=>{const m=n.budget_limit>0?n.spent/n.budget_limit*100:0,z=Math.min(m,100),x=m>100,y=!x&&m>=100,b=!x&&m>=80&&m<100,w=x?"var(--danger)":y?"var(--success)":b?"var(--warning)":n.color||"var(--accent)",D=n.budget_limit-(n.spent||0),E=t.salary>0&&n.budget_limit>0?Math.round(n.budget_limit/t.salary*100):null;return e.jsxs("div",{className:"brow",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${n.color||"#6366f1"}18`},children:e.jsx("span",{style:{width:10,height:10,borderRadius:"50%",background:n.color||"var(--accent)",display:"inline-block",flexShrink:0}})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("span",{className:"brow-name",children:n.name}),x&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Over"}),y&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Penuh"}),b&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Hampir"})]})]}),n.budget_limit>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"brow-bar-wrap",children:e.jsx("div",{className:"brow-bar",children:e.jsx("div",{className:"brow-bar-fill",style:{width:`${z}%`,background:w}})})}),e.jsxs("div",{className:"brow-right",onClick:()=>E&&Oe(pe=>!pe),style:{cursor:E?"pointer":"default"},children:[e.jsx("span",{className:"brow-spent tabular",style:{color:x?"var(--danger)":"var(--text-primary)"},children:p(n.spent||0)}),Ke&&E?e.jsxs("span",{className:"brow-limit tabular",style:{color:"var(--accent)"},children:[E,"% gaji"]}):e.jsx("span",{className:"brow-limit tabular",style:{color:D<0?"var(--danger)":D===0?"var(--text-muted)":"var(--success)"},children:D<0?`Over ${p(Math.abs(D))}`:`Sisa ${p(D)}`})]}),e.jsxs("span",{className:"brow-pct",style:{color:w},children:[m.toFixed(0),"%"]})]}):n.spent>0?e.jsxs("span",{className:"brow-spent tabular",style:{color:"var(--danger)",marginLeft:"auto"},children:["−",p(n.spent)]}):e.jsx("div",{style:{flex:1}})]})};return e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",style:{marginBottom:14},children:[e.jsx("div",{children:e.jsx("h3",{className:"sect-title",children:"Budget Bulan Ini"})}),e.jsx(A,{to:`/categories?month=${l}`,className:"pill-link",children:"⚙ Atur"})]}),e.jsx("div",{className:"card-scroll-body",children:Q?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(3)].map((n,m)=>e.jsx("div",{className:"skeleton",style:{height:44}},m))}):g?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(la,{size:14})}),e.jsx("span",{children:"Tambahkan kategori dan budget"}),e.jsx(A,{to:`/categories?month=${l}`,className:"empty-hint-link",style:{color:"var(--accent)"},children:"Atur →"})]}):e.jsxs(e.Fragment,{children:[(o.length>0||d.length>0)&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Hutang & Piutang"}),e.jsx("div",{className:"budget-rows",children:[...o,...d].map(n=>{const m=n.jenis==="piutang",z=m?"#f59e0b":"#f87171",x=new Date;x.setHours(0,0,0,0);const y=n.due_date?new Date(n.due_date):null,b=y?Math.round((y-x)/864e5):null,w=b!==null&&b<0;return e.jsxs("div",{className:"brow",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${z}18`,color:z},children:m?e.jsx(Pe,{size:13}):e.jsx(ue,{size:13})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("span",{className:"brow-name",children:n.nama}),e.jsx("span",{style:{fontSize:"0.62rem",color:"var(--text-muted)",marginLeft:6},children:m?"piutang":"hutang"}),w&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Terlambat"})]})]}),e.jsx("div",{style:{flex:1}}),e.jsxs("div",{className:"brow-right",children:[e.jsx("span",{className:"brow-spent tabular",style:{color:z},children:p(n.amount)}),n.due_date&&e.jsx("span",{className:"brow-limit tabular",style:{color:w?"var(--danger)":b<=7?"var(--warning)":"var(--text-muted)"},children:b===0?"Hari ini":b>0?`${b}h lagi`:`${Math.abs(b)}h lalu`})]})]},n.id)})})]}),(o.length>0||d.length>0)&&a.length>0&&e.jsx("div",{style:{height:1,background:"var(--border)",margin:"12px 0"}}),a.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Pengeluaran Rutin"}),e.jsx("div",{className:"budget-rows",children:a.map(n=>e.jsx(N,{cat:n},n.id))})]}),(a.length>0||o.length>0||d.length>0)&&r.length>0&&e.jsx("div",{style:{height:1,background:"var(--border)",margin:"12px 0"}}),r.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Kategori Lainnya"}),e.jsx("div",{className:"budget-rows",children:r.map(n=>e.jsx(N,{cat:n},n.id))})]}):o.length===0&&d.length===0&&a.length===0&&e.jsxs("div",{style:{fontSize:"0.72rem",color:"var(--text-muted)"},children:["Belum ada kategori dengan budget. ",e.jsx(A,{to:`/categories?month=${l}`,style:{color:"var(--accent)"},children:"Atur →"})]})]})})]})})(),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",children:[e.jsx("h3",{className:"sect-title",children:"Transaksi Terakhir"}),e.jsx(A,{to:`/transactions?month=${l}`,className:"pill-link",children:"Lihat semua"})]}),e.jsx("div",{className:"card-scroll-body",children:Q?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,marginTop:12},children:[...Array(4)].map((a,r)=>e.jsx("div",{className:"skeleton",style:{height:42}},r))}):t.transactions.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(Be,{size:13})}),e.jsx("span",{children:"Belum ada transaksi bulan ini. "}),e.jsx("button",{className:"empty-hint-link",onClick:()=>$(!0),children:"Tambah sekarang →"})]}):e.jsx("div",{className:"tx-list",children:t.transactions.map(a=>{var r;return e.jsxs("div",{className:"tx-row",children:[e.jsx("div",{className:"tx-icon",style:{background:a.type==="income"?"rgba(52,211,153,0.12)":"rgba(248,113,113,0.12)",color:a.type==="income"?"var(--success)":"var(--danger)"},children:a.type==="income"?e.jsx(Be,{size:14}):e.jsx(te,{size:14})}),e.jsxs("div",{className:"tx-meta",children:[e.jsx("span",{className:"tx-desc",children:a.description||((r=a.categories)==null?void 0:r.name)||"Transaksi"}),e.jsx("span",{className:"tx-date",children:new Date(a.date).toLocaleDateString("id-ID",{day:"numeric",month:"short"})})]}),e.jsxs("span",{className:`tx-amount tabular ${a.type==="income"?"inc":"exp"}`,children:[a.type==="income"?"+":"−",p(a.amount)]})]},a.id)})})})]})]})]}),He&&(()=>{const a=t.salary>0,r=async()=>{const o=parseFloat(T.amount.replace(/\D/g,""))||0;if(o){je(!0);try{const d=T.date||`${l}-01`;if(t.gajiTx){const{error:g}=await u.from("transactions").update({amount:o,description:T.note,date:d}).eq("id",t.gajiTx.id);if(g)throw g}else{const{error:g}=await u.from("transactions").insert({user_id:c.id,category_id:t.gajiCatId,type:"income",amount:o,description:T.note,date:d});if(g)throw g}v("Pemasukan disimpan","success"),O(!1),W()}catch(d){v(d.message,"error")}finally{je(!1)}}};return e.jsx("div",{className:"modal-overlay",onClick:()=>O(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:o=>o.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Pemasukan Bulanan ",S(l)]}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:a?"Edit jumlah atau catatan":"Catat pemasukan bulan ini"})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>O(!1),children:e.jsx(P,{size:16})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Jumlah Pemasukan"}),e.jsx(De,{value:T.amount,onChange:o=>Z(d=>({...d,amount:o})),autoFocus:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Tanggal Diterima"}),e.jsx("input",{className:"form-input",type:"date",value:T.date,min:`${l}-01`,max:(()=>{const[o,d]=l.split("-").map(Number);return new Date(o,d,0).toISOString().split("T")[0]})(),onChange:o=>Z(d=>({...d,date:o.target.value}))})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Catatan ",!a&&e.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400},children:"(opsional)"})]}),e.jsx("textarea",{className:"form-input",rows:2,placeholder:"Misal: gaji pokok + bonus, tunjangan, dll...",value:T.note,onChange:o=>Z(d=>({...d,note:o.target.value})),style:{resize:"vertical",fontFamily:"var(--font-sans)",fontSize:"0.875rem"}})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>O(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:r,disabled:ve||!T.amount,children:ve?"Menyimpan...":"Simpan"})]})]})})})(),Ae&&e.jsx("div",{className:"modal-overlay",onClick:()=>ie(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Total Tabungan"}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Akumulasi s/d ",S(l)]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>ie(!1),children:e.jsx(P,{size:16})})]}),e.jsxs("div",{className:"wajib-rows",children:[(c.tabungan_awal||0)>0&&e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)",fontSize:"0.55rem",fontWeight:800},children:"AWAL"}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:"Saldo Awal Tabungan"}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)"},children:"sebelum mulai record"})]})]}),e.jsx("span",{className:"wajib-amount tabular",style:{color:"var(--success)"},children:p(c.tabungan_awal)})]}),t.tabunganPerMonth.length===0&&!(c.tabungan_awal>0)?e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--text-muted)",padding:"8px 0"},children:'Belum ada alokasi tabungan. Set budget kategori "Tabungan Bulanan".'}):t.tabunganPerMonth.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)"},children:e.jsx(te,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:S(a.month)}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)"},children:"Tabungan Bulanan"})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:Number(a.budget_limit)>0?"var(--success)":"var(--text-muted)"},children:["+",p(a.budget_limit)]})]},a.month)),t.hutangTabunganList.filter(a=>!a.lunas).length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"wajib-divider",style:{margin:"8px 0"}}),e.jsx("div",{style:{fontSize:"0.62rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"var(--text-muted)",marginBottom:4},children:"Outstanding bulan ini"}),t.hutangTabunganList.filter(a=>!a.lunas).map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:a.jenis==="piutang"?"rgba(245,158,11,0.1)":"rgba(248,113,113,0.1)",color:a.jenis==="piutang"?"var(--warning)":"var(--danger)",fontSize:"0.9rem"},children:a.jenis==="piutang"?e.jsx(Pe,{size:13}):e.jsx(ue,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:a.nama}),e.jsx("div",{style:{fontSize:"0.62rem",color:"var(--text-muted)"},children:a.jenis==="hutang"?"Hutang":"Piutang"})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",p(a.amount)]})]},a.id))]}),e.jsx("div",{className:"wajib-divider",style:{margin:"10px 0"}}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:4},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Tabungan"}),e.jsx("span",{className:"wajib-amount tabular",style:{color:t.totalTabungan>0?"var(--success)":"var(--text-muted)",fontWeight:800},children:p(t.totalTabungan)})]})]})]})}),Re&&e.jsx("div",{className:"modal-overlay",onClick:()=>K(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Rencana Bulan Depan"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:S(se(l))})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx(A,{to:"/savings",className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>K(!1),children:"Kelola →"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>K(!1),children:e.jsx(P,{size:16})})]})]}),t.nextMonthPlans.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(ue,{size:13})}),e.jsxs("span",{children:["Belum ada rencana untuk ",S(se(l)),"."]}),e.jsx(A,{to:"/savings",className:"empty-hint-link",onClick:()=>K(!1),children:"Tambah →"})]}):e.jsxs("div",{className:"wajib-rows",children:[t.nextMonthPlans.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsx("span",{className:"brow-name",children:a.name}),e.jsx("span",{className:"wajib-amount tabular",children:p(a.amount)})]},a.id)),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total"}),e.jsx("span",{className:"wajib-amount tabular",children:p(t.nextMonthPlans.reduce((a,r)=>a+Number(r.amount),0))})]})]})]})}),Ie&&e.jsx("div",{className:"modal-overlay",onClick:()=>V(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:420},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Pengeluaran Tetap"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:S(l)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>{V(!1),re(!0)},children:"Kelola"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>V(!1),children:e.jsx(P,{size:16})})]})]}),e.jsxs("div",{className:"wajib-rows",children:[t.categories.filter(a=>F(a)).map(a=>{const r=Number(a.budget_limit||0),o=t.salary>0&&r>0?Math.round(r/t.salary*100):null;return e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:e.jsx(te,{size:13})}),e.jsx("span",{className:"brow-name",children:a.name})]}),e.jsxs("div",{className:"wajib-right",children:[o&&e.jsxs("span",{className:"wajib-pct",children:[o,"%"]}),e.jsx("span",{className:"wajib-amount tabular",children:r>0?p(r):"—"})]})]},a.id)}),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Potongan"}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",p(Y)]})]})]})]})}),We&&e.jsx("div",{className:"modal-overlay",onClick:()=>$(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>$(!1),children:e.jsx(P,{size:16})})]}),e.jsx(ca,{month:l,onSuccess:()=>{W(),$(!1)},onClose:()=>$(!1)})]})}),Ee&&!j&&!fe&&e.jsx("div",{className:"modal-overlay",onClick:()=>re(!1),children:e.jsxs("div",{className:"modal cat-manager-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Kelola Kategori"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:S(l)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>{qe({is_mandatory:!0}),R(!0)},children:"+ Kategori"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>re(!1),children:e.jsx(P,{size:16})})]})]}),e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("p",{className:"cat-mgr-section-title",children:"Pengeluaran Wajib"}),e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:t.categories.filter(a=>F(a)).map(a=>{const r=Number(a.budget_limit)||0,o=t.salary>0&&r>0?Math.round(r/t.salary*100):null;return e.jsxs("div",{className:"cat-mgr-row",children:[e.jsxs("div",{className:"cat-mgr-left",children:[e.jsx("span",{className:"cat-mgr-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:e.jsx(te,{size:14})}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-mgr-name",children:a.name}),e.jsx("span",{className:"cat-mgr-sub",children:"Wajib · langsung dipotong"})]})]}),e.jsxs("div",{className:"cat-mgr-right",children:[o&&e.jsxs("span",{className:"cat-mgr-pct",children:[o,"%"]}),e.jsx("span",{className:"cat-mgr-amount tabular",children:r>0?p(r):"—"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.7rem"},onClick:()=>Ye(a),children:"Ubah"})]})]},a.id)})})]})]})}),j&&(()=>{const a=t.categories.find(r=>r.id===j.id);return e.jsx("div",{className:"modal-overlay",onClick:()=>C(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:r=>r.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Pengeluaran Wajib — ",a==null?void 0:a.name]}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[S(l),t.salary>0?` · ${p(t.salary)}`:""]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>C(null),children:e.jsx(P,{size:16})})]}),t.salary>0&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx("input",{className:"form-input",type:"number",placeholder:String(ga),value:j.pct,onChange:r=>ye(r.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),e.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),j.pct&&t.salary>0&&e.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",p(Math.round(parseFloat(j.pct)/100*t.salary))]})]}),!j.pct&&e.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(r=>e.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>ye(String(r)),children:[r,"%"]},r))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),e.jsx(De,{value:j.nominal,onChange:Ge,autoFocus:!t.salary})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:16},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)",fontSize:"0.78rem"},onClick:()=>{C(null),ne({id:a.id,name:a.name})},children:"Hapus Kategori"}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>C(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",onClick:Je,children:"Simpan"})]})]})]})})})(),H&&e.jsx(pa,{title:"Hapus Kategori",message:`Hapus kategori "${H.name}"? Semua transaksi kategori ini juga akan terhapus.`,confirmLabel:"Hapus",onConfirm:Ue,onCancel:()=>ne(null)}),fe&&e.jsx("div",{className:"modal-overlay",onClick:()=>R(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:X!=null&&X.id?"Edit Kategori":"Kategori Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>R(!1),children:e.jsx(P,{size:16})})]}),e.jsx(da,{editData:X,salary:t.salary,month:l,onSuccess:()=>{W(),R(!1)},onClose:()=>R(!1)})]})}),e.jsx("style",{children:`
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
          background: rgba(8, 8, 22, 0.80);
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          border: 1px solid rgba(99,102,241,0.20);
          border-radius: 20px;
          padding: 24px 26px;
          position: relative; overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        [data-theme="light"] .hero-card {
          background: rgba(255,255,255,0.82);
          border-color: rgba(99,102,241,0.18);
          box-shadow: 0 8px 40px rgba(99,102,241,0.12);
        }
        .hero-card::before {
          content: '';
          position: absolute; top: -60px; right: -60px;
          width: 260px; height: 260px;
          background: radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-card::after {
          content: '';
          position: absolute; bottom: -40px; left: -40px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-top {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 16px;
        }
        .hero-left { position: relative; z-index: 1; }
        .hero-eyebrow {
          font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.12em;
          color: var(--hero-muted); font-weight: 700; display: block; margin-bottom: 8px;
        }
        .hero-balance {
          font-size: clamp(1.9rem, 5vw, 2.8rem);
          font-weight: 800; letter-spacing: -0.045em;
          font-variant-numeric: tabular-nums; line-height: 1;
          /* Gradient text */
          background: linear-gradient(135deg, #fff 20%, rgba(167,139,250,0.9) 65%, rgba(99,102,241,0.85) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        .hero-balance.neg {
          background: linear-gradient(135deg, #fca5a5 0%, #f87171 60%, #ef4444 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-neg-sign { font-size: 0.7em; vertical-align: 0.05em; margin-right: 1px; }

        .hero-right {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-rows: auto;
          grid-auto-flow: column;
          gap: 8px;
          align-items: start;
          position: relative; z-index: 1;
        }
        .hero-chip {
          display: flex; flex-direction: column; align-items: flex-end; gap: 3px;
          background: rgba(99,102,241,0.06);
          border: 1px solid rgba(139,92,246,0.15);
          border-radius: 10px; padding: 9px 13px; min-width: 130px;
          transition: all 0.2s;
        }
        [data-theme="light"] .hero-chip { background: rgba(99,102,241,0.06); border-color: rgba(99,102,241,0.15); }
        .hero-chip-btn {
          cursor: pointer;
        }
        .hero-chip-btn:hover {
          border-color: rgba(139,92,246,0.4);
          background: rgba(99,102,241,0.12);
          box-shadow: 0 0 16px rgba(99,102,241,0.15);
          transform: translateY(-1px);
        }
        .hero-chip-label {
          font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--hero-muted); font-weight: 700;
        }
        .hero-chip-val {
          font-size: 0.875rem; font-weight: 700;
          color: var(--hero-chip-val); letter-spacing: -0.02em;
        }
        .hero-chip-cta {
          font-size: 0.58rem; color: var(--accent); font-weight: 700; margin-top: 1px;
          opacity: 0.85;
        }
        .hero-chip-btn:hover .hero-chip-cta { opacity: 1; }

        .hero-stats-row {
          display: flex; align-items: stretch; gap: 0;
          margin-top: 14px; padding-top: 14px;
          border-top: 1px solid rgba(99,102,241,0.12);
          position: relative; z-index: 1;
        }
        .hero-stat {
          flex: 1; display: flex; flex-direction: column; gap: 3px;
          padding: 0 12px;
        }
        .hero-stat:first-child { padding-left: 0; }
        .hero-stat:last-child { padding-right: 0; }
        .hero-stat-btn { cursor: pointer; border-radius: 8px; transition: all 0.15s; }
        .hero-stat-btn:hover { background: rgba(99,102,241,0.06); }
        .hero-stat-btn:hover .hero-stat-label { color: var(--accent); }
        .hero-stat-label {
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted);
        }
        .hero-stat-val {
          font-size: 0.85rem; font-weight: 700;
          letter-spacing: -0.02em; font-variant-numeric: tabular-nums;
          color: var(--text-primary);
        }
        .hero-stat-sub { font-size: 0.58rem; color: var(--text-muted); font-weight: 500; }
        .hero-stat-divider {
          width: 1px; background: rgba(99,102,241,0.12);
          flex-shrink: 0; align-self: stretch;
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
      `})]})}export{va as default};
