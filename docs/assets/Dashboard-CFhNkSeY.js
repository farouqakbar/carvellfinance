import{F as La,H as $a,K as Wa,J as Ra,D as g,w as se,B as e,z as B,G as Ha,y as sa,A as qa,E as h,v as p,f as Ka,I as Oa,L as Y,d as be,n as ra,m as na,c as ia,a as re,b as la,s as N,C as oa}from"./index-C5srdEod.js";import{T as Ga}from"./TransactionForm-6TmsFVe2.js";import{C as Ya}from"./CategoryForm-Lax-NrBh.js";import{a as he,i as U,d as da,f as Ua,c as Ja,e as Qa,C as Xa}from"./ConfirmModal-CPZp7DpA.js";const Va=15;function Za(m){const[J,R]=m.split("-").map(Number),v=new Date(J,R-2,1);return`${v.getFullYear()}-${String(v.getMonth()+1).padStart(2,"0")}`}function xe(m){const[J,R]=m.split("-").map(Number),v=new Date(J,R,1);return`${v.getFullYear()}-${String(v.getMonth()+1).padStart(2,"0")}`}function rt(){var Qe;const{user:m,updateProfile:J}=La(),{setHeader:R}=$a(),v=Wa(),[ca,ma]=Ra(),[c,ga]=g.useState(()=>ca.get("month")||se()),[t,pa]=g.useState({salary:0,totalExpense:0,totalIncome:0,categories:[],transactions:[],savings:[],savingsLogs:[],categorySpend:[],hutangList:[],hutangTabunganList:[],todayExpense:0,totalTabungan:0,tabunganPerMonth:[],nextMonthPlans:[],cumulativeBalance:0,cumulativeMandatoryBudget:0,gajiTx:null,gajiCatId:null}),[y,Be]=g.useState(!0),[ua,H]=g.useState(!1),[ba,fe]=g.useState(!1),[S,I]=g.useState(null),[Ie,Q]=g.useState(!1),[ne,ha]=g.useState(null),[X,je]=g.useState(null),[xa,ie]=g.useState(!1),[fa,ve]=g.useState(!1),[ja,q]=g.useState(!1),[va,V]=g.useState(!1),[ya,le]=g.useState(!1),[k,Z]=g.useState(null),[E,F]=g.useState(null),[ee,ae]=g.useState(null),[Fe,Ae]=g.useState(!1),[wa,te]=g.useState(!1),[ye,De]=g.useState(""),[Ee,Le]=g.useState(!1),[A,oe]=g.useState({amount:"",note:"",date:""}),[$e,We]=g.useState(!1),[we,Ne]=g.useState(!1),[M,ke]=g.useState(()=>Number(se().split("-")[0])),[Na,ka]=g.useState(!1),[de,Re]=g.useState("transaction"),[Se,He]=g.useState(0),[Sa,ze]=g.useState(0),[za,_e]=g.useState(0);g.useEffect(()=>{if(m.recording_start_month&&c<m.recording_start_month){ce(m.recording_start_month);return}L()},[c,m==null?void 0:m.recording_start_month]),g.useEffect(()=>{const a=c===se(),s=!!m.recording_start_month&&c<=m.recording_start_month,[i,o]=m.recording_start_month?m.recording_start_month.split("-").map(Number):[0,0],u=se(),[f,w]=u.split("-").map(Number),n=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];return R(e.jsxs(e.Fragment,{children:[we&&e.jsx("div",{style:{position:"fixed",inset:0,zIndex:299},onClick:()=>Ne(!1)}),e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>ce(Za(c)),disabled:s,children:"‹"}),e.jsx("span",{className:"month-label-text month-label-clickable",onClick:()=>{ke(Number(c.split("-")[0])),Ne(d=>!d)},children:B(c)}),e.jsx("button",{className:"month-btn",onClick:()=>ce(xe(c)),disabled:a,children:"›"}),we&&e.jsxs("div",{className:"month-picker-popup",onMouseDown:d=>d.preventDefault(),children:[e.jsxs("div",{className:"mp-year-row",children:[e.jsx("button",{className:"mp-year-btn",onClick:()=>ke(d=>d-1),disabled:!!m.recording_start_month&&M<=i,children:"‹"}),e.jsx("span",{className:"mp-year-label",children:M}),e.jsx("button",{className:"mp-year-btn",onClick:()=>ke(d=>d+1),disabled:M>=f,children:"›"})]}),e.jsx("div",{className:"mp-grid",children:n.map((d,b)=>{const x=b+1,_=`${M}-${String(x).padStart(2,"0")}`,j=M>f||M===f&&x>w,C=!!m.recording_start_month&&(M<i||M===i&&x<o);return e.jsx("button",{className:`mp-month-btn${_===c?" mp-active":""}`,disabled:j||C,onClick:()=>{ce(_),Ne(!1)},children:d},_)})})]})]})]})),()=>R(null)},[c,we,M,m==null?void 0:m.recording_start_month]),Ha();const ce=a=>{ga(a),ma({month:a})},L=async()=>{Be(!0);try{const a=`${c}-01`,s=sa(c),i=qa(),o=xe(c),u=m.recording_start_month;let f=h.from("transactions").select("amount, type").eq("user_id",m.id).lt("date",a);u&&(f=f.gte("date",`${u}-01`));let w=h.from("category_budgets").select("budget_limit, category_id, month, categories(is_mandatory, name, category_type)").eq("user_id",m.id).lte("month",c);u&&(w=w.gte("month",u));const[n,d,b,x,_,j,C,W,O,Te,ge]=await Promise.all([h.from("transactions").select("*, categories(name, color, icon)").eq("user_id",m.id).gte("date",a).lte("date",s).order("date",{ascending:!1}),Promise.all([h.from("categories").select("*").eq("user_id",m.id).is("month",null),h.from("categories").select("*").eq("user_id",m.id).eq("month",c)]).then(([r,l])=>{const P=[...r.data||[],...l.data||[]].sort((ue,Ea)=>ue.name.localeCompare(Ea.name)),ta=new Set;return{data:P.filter(ue=>ta.has(ue.name)?!1:(ta.add(ue.name),!0))}}),h.from("savings").select("*").eq("user_id",m.id),h.from("savings_log").select("*").eq("user_id",m.id).eq("month",c),h.from("transactions").select("amount").eq("user_id",m.id).eq("date",i).eq("type","expense"),h.from("category_budgets").select("category_id, budget_limit").eq("user_id",m.id).eq("month",c),w,h.from("plans").select("*").eq("user_id",m.id).eq("target_month",o).eq("done",!1).order("created_at",{ascending:!0}),f,h.from("hutang").select("id, nama, amount, due_date, sumber, jenis, lunas").eq("user_id",m.id).lte("month",c).eq("lunas",!1).order("due_date",{ascending:!0,nullsFirst:!1}),h.from("hutang").select("id, nama, amount, jenis, lunas, created_at").eq("user_id",m.id).lte("month",c).eq("sumber","tabungan").order("created_at",{ascending:!1})]),G=n.data||[],Me={};(j.data||[]).forEach(r=>{Me[r.category_id]=Number(r.budget_limit)});let Xe=(d.data||[]).map(r=>{const l=Me[r.id]!==void 0?Me[r.id]:0;return{...r,budget_limit:l,budget_set:l>0}});const D=Xe.find(r=>he(r)),Ve=D?G.filter(r=>r.type==="income"&&r.category_id===D.id):[],Ze=Ve.reduce((r,l)=>r+Number(l.amount),0),Aa=Xe,ea=G.filter(r=>r.type==="expense").reduce((r,l)=>r+Number(l.amount),0),aa=G.filter(r=>r.type==="income"&&r.category_id!==(D==null?void 0:D.id)).reduce((r,l)=>r+Number(l.amount),0),Pe={};G.filter(r=>r.type==="expense"&&r.category_id).forEach(r=>{Pe[r.category_id]=(Pe[r.category_id]||0)+Number(r.amount)});const pe={};G.filter(r=>r.type==="expense"&&r.categories).forEach(r=>{const l=r.categories.name;pe[l]||(pe[l]={name:l,amount:0,color:r.categories.color,icon:r.categories.icon}),pe[l].amount+=Number(r.amount)});const Da=Aa.map(r=>{const l=Pe[r.id]||0,P=r.budget_limit>0?l/r.budget_limit*100:null;return{...r,spent:l,pct:P,overBudget:r.budget_limit>0&&l>r.budget_limit}}).sort((r,l)=>r.overBudget&&!l.overBudget?-1:!r.overBudget&&l.overBudget?1:(l.pct||0)-(r.pct||0));pa({salary:Ze,totalExpense:ea,totalIncome:aa,categories:Da,transactions:G.slice(0,5),savings:b.data||[],savingsLogs:x.data||[],todayExpense:(_.data||[]).reduce((r,l)=>r+Number(l.amount),0),tabunganPerMonth:(C.data||[]).filter(r=>{var l,P;return(((l=r.categories)==null?void 0:l.category_type)==="savings"||((P=r.categories)==null?void 0:P.name)==="Tabungan Bulanan")&&Number(r.budget_limit)>0}).sort((r,l)=>r.month.localeCompare(l.month)),totalTabungan:(C.data||[]).filter(r=>{var l,P;return((l=r.categories)==null?void 0:l.category_type)==="savings"||((P=r.categories)==null?void 0:P.name)==="Tabungan Bulanan"}).reduce((r,l)=>r+Number(l.budget_limit),0)+(m.tabungan_awal||0)-(ge.data||[]).filter(r=>!r.lunas).reduce((r,l)=>r+Number(l.amount),0),categorySpend:Object.values(pe).sort((r,l)=>l.amount-r.amount),nextMonthPlans:W.data||[],gajiTx:Ve[0]||null,gajiCatId:(D==null?void 0:D.id)||null,hutangList:Te.data||[],hutangTabunganList:ge.data||[],cumulativeBalance:(O.data||[]).reduce((r,l)=>r+(l.type==="income"?Number(l.amount):-Number(l.amount)),0)+Ze+aa-ea+(m.saldo_awal||0),cumulativeMandatoryBudget:(C.data||[]).filter(r=>{var l;return((l=r.categories)==null?void 0:l.is_mandatory)===!0}).reduce((r,l)=>r+Number(l.budget_limit),0)})}finally{Be(!1)}},_a=a=>{const s=String(Math.round(a.budget_limit||0)),i=t.salary>0&&a.budget_limit>0?(a.budget_limit/t.salary*100).toFixed(1):"";I({id:a.id,nominal:s,pct:i})},Ca=a=>{const s=parseFloat(a)||0,i=t.salary>0&&s>0?(s/t.salary*100).toFixed(1):"";I(o=>({...o,nominal:a,pct:i}))},qe=a=>{const s=parseFloat(a)||0,i=t.salary>0&&s>0?String(Math.round(s/100*t.salary)):"";I(o=>({...o,pct:a,nominal:i}))},Ta=async()=>{const a=parseFloat(S.nominal)||0,[s,i]=await Promise.all([h.from("category_budgets").upsert({user_id:m.id,category_id:S.id,month:c,budget_limit:a},{onConflict:"category_id,month"}),h.from("categories").update({budget_limit:a}).eq("id",S.id)]),o=s.error||i.error;if(o){v(o.message,"error");return}v("Budget disimpan","success"),I(null),L()},Ma=async()=>{const a=`${c}-01`,s=sa(c),[i,o]=await Promise.all([h.from("transactions").delete().eq("category_id",X.id).gte("date",a).lte("date",s),h.from("category_budgets").delete().eq("category_id",X.id).eq("month",c)]);if(i.error||o.error){v((i.error||o.error).message,"error");return}const{error:u}=await h.from("categories").delete().eq("id",X.id);if(u){v(u.message,"error");return}v("Kategori dihapus","success"),je(null),L()};t.categories.filter(a=>a.budget_limit>0).reduce((a,s)=>a+s.budget_limit,0),se();const $=t.categories.filter(a=>a.overBudget);g.useEffect(()=>{if($.length<=1){He(0);return}const a=setInterval(()=>He(s=>(s+1)%$.length),2e3);return()=>clearInterval(a)},[$.length]);const T=Ia.filter(a=>Number(a.budget_limit)>0),z=Fa.filter(a=>(a.spent||0)>0);g.useEffect(()=>{if(y||T.length<=1){ze(0);return}const a=setInterval(()=>ze(s=>(s+1)%T.length),2500);return()=>clearInterval(a)},[y,T.length]),g.useEffect(()=>{if(y||z.length<=1){_e(0);return}const a=setInterval(()=>_e(s=>(s+1)%z.length),3e3);return()=>clearInterval(a)},[y,z.length]);const Ke=t.categories.filter(a=>U(a)).reduce((a,s)=>a+Number(s.budget_limit||0),0),Pa=t.categories.filter(a=>U(a)).reduce((a,s)=>a+(s.spent||0),0),Ba=Math.max(0,Ke-Pa),Oe=t.totalExpense+Ba;t.salary+t.totalIncome-Oe,t.salary>0&&Oe/t.salary*100;const Ce=t.categories.filter(a=>da(a)&&a.budget_limit>0).reduce((a,s)=>a+Number(s.budget_limit),0);t.categories.filter(a=>he(a));const Ia=t.categories.filter(a=>da(a)),Ge=t.categories.filter(a=>Ua(a)),Ye=t.categories.filter(a=>Ja(a)),Ue=t.categories.filter(a=>Qa(a)),Fa=[{label:"Wajib",spent:Ge.reduce((a,s)=>a+(s.spent||0),0),budget:Ge.reduce((a,s)=>a+Number(s.budget_limit||0),0),color:"#f87171",action:()=>ie(!0)},{label:"Rutin",spent:Ye.reduce((a,s)=>a+(s.spent||0),0),budget:Ye.reduce((a,s)=>a+Number(s.budget_limit||0),0),color:"#fbbf24"},{label:"Tambahan",spent:Ue.reduce((a,s)=>a+(s.spent||0),0),budget:Ue.reduce((a,s)=>a+Number(s.budget_limit||0),0),color:"#f97316"}],me=t.cumulativeBalance-t.cumulativeMandatoryBudget,K=(t.hutangList||[]).filter(a=>a.jenis==="hutang").reduce((a,s)=>a+Number(s.amount),0);t.salary-t.totalExpense-Ce,t.salary>0&&t.totalExpense/t.salary*100;const Je=t.salary>0?t.salary-Ce:0;return Je-t.totalExpense,t.salary>0&&Ce>0&&t.totalExpense>Je,e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"db-page",children:[e.jsxs("div",{className:"db-hero",children:[e.jsx("span",{className:"db-eyebrow",children:K>0?"SALDO BERSIH":"TOTAL SALDO"}),y?e.jsx("div",{className:"skeleton",style:{height:56,width:220,borderRadius:8,marginTop:6}}):e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:6},children:[e.jsxs("div",{className:`db-balance${me-K<0?" neg":""}`,children:[me-K<0&&e.jsx("span",{className:"db-neg-sign",children:"−"}),p(Math.abs(me-K))]}),K>0&&e.jsxs("button",{className:"db-hutang-chip",onClick:()=>le(!0),children:[e.jsx("span",{className:"db-hutang-chip-label",children:"+ hutang"}),e.jsx("span",{className:"db-hutang-chip-amount",children:p(me)}),e.jsx("span",{className:"db-hutang-chip-arrow",children:"›"})]})]}),e.jsx("div",{className:"db-hero-chips",children:!y&&t.nextMonthPlans.length>0&&e.jsxs("button",{className:"db-rencana-chip",onClick:()=>q(!0),children:[e.jsx(Ka,{size:11}),t.nextMonthPlans.length," rencana bulan depan"]})})]}),!y&&(()=>{var i,o,u,f,w,n;const a=Math.min(Sa,Math.max(0,T.length-1)),s=Math.min(za,Math.max(0,z.length-1));return e.jsxs("div",{className:"db-stats-grid",children:[e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>{var d,b;oe({amount:t.gajiTx?String(t.gajiTx.amount):"",note:((d=t.gajiTx)==null?void 0:d.description)||"",date:((b=t.gajiTx)==null?void 0:b.date)||`${c}-01`}),V(!0)},children:[e.jsx("span",{className:"db-stat-label",children:"PEMASUKAN"}),e.jsx("span",{className:"db-stat-val tabular",style:{color:t.salary>0?"#34d399":"var(--text-muted)"},children:t.salary>0?`+${p(t.salary)}`:"—"}),e.jsx("span",{className:"db-stat-sub",children:t.salary>0?"bulan ini":"belum dicatat"})]}),e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>ve(!0),children:[e.jsx("span",{className:"db-stat-label",children:"TABUNGAN"}),T.length>0?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"db-stat-val tabular",style:{color:"#818cf8"},children:p(((i=T[a])==null?void 0:i.budget_limit)||0)}),e.jsx("span",{className:"db-stat-sub",style:{color:(o=T[a])==null?void 0:o.color},children:((u=T[a])==null?void 0:u.name)||"—"}),T.length>1&&e.jsx("div",{className:"db-sub-dots",children:T.map((d,b)=>e.jsx("span",{className:`db-sub-dot${a===b?" active":""}`,onClick:x=>{x.stopPropagation(),ze(b)}},b))})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"db-stat-val tabular",style:{color:"var(--text-muted)"},children:"—"}),e.jsx("span",{className:"db-stat-sub",children:"belum diatur"})]})]}),e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>{var d,b;return(b=(d=z[s])==null?void 0:d.action)==null?void 0:b.call(d)},children:[e.jsx("span",{className:"db-stat-label",children:"PENGELUARAN"}),z.length>0?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"db-stat-val tabular",style:{color:"#f87171"},children:["−",p(((f=z[s])==null?void 0:f.spent)||0)]}),e.jsx("span",{className:"db-stat-sub",style:{color:(w=z[s])==null?void 0:w.color},children:(n=z[s])==null?void 0:n.label}),z.length>1&&e.jsx("div",{className:"db-sub-dots",children:z.map((d,b)=>e.jsx("span",{className:`db-sub-dot${s===b?" active":""}`,onClick:x=>{x.stopPropagation(),_e(b)}},b))})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"db-stat-val tabular",style:{color:"var(--text-muted)"},children:"—"}),e.jsx("span",{className:"db-stat-sub",children:"belum ada"})]})]}),e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>q(!0),children:[e.jsx("span",{className:"db-stat-label",children:"RENCANA"}),e.jsx("span",{className:"db-stat-val tabular",style:{color:t.nextMonthPlans.length>0?"#fbbf24":"var(--text-muted)"},children:t.nextMonthPlans.length>0?t.nextMonthPlans.length:"—"}),e.jsx("span",{className:"db-stat-sub",children:t.nextMonthPlans.length>0?"rencana bulan depan":"belum ada rencana"})]})]})})(),y&&e.jsx("div",{className:"skeleton",style:{height:120,borderRadius:"var(--radius-lg)"}}),!y&&t.todayExpense>0&&(()=>{const a=m.budget_harian||0,s=t.todayExpense,i=a>0&&s>=a,o=a>0&&s/a>=.8&&!i,u=a>0&&!i&&!o,f=i?"#f87171":o?"#fbbf24":u?"#34d399":"#818cf8",w=i?"rgba(248,113,113,0.06)":o?"rgba(251,191,36,0.06)":u?"rgba(52,211,153,0.06)":"rgba(129,140,248,0.06)",n=i?"rgba(248,113,113,0.25)":o?"rgba(251,191,36,0.25)":u?"rgba(52,211,153,0.25)":"rgba(129,140,248,0.25)",d=a>0?Math.min(s/a*100,100):0;return e.jsxs("div",{className:"db-daily-card db-daily-card-clickable",style:{background:w,borderColor:n},onClick:()=>{De(a>0?String(a):""),te(!0)},children:[e.jsxs("div",{className:"db-daily-card-left",children:[e.jsx("span",{className:"db-daily-card-label",children:"PENGELUARAN HARI INI"}),e.jsxs("span",{className:"db-daily-card-amount tabular",style:{color:f},children:["−",p(s)]})]}),e.jsx("div",{className:"db-daily-card-right",children:a>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"db-daily-card-track",children:e.jsx("div",{className:"db-daily-card-fill",style:{width:`${d}%`,background:f}})}),e.jsxs("span",{className:"db-daily-card-sub",style:{color:f},children:[i?"Melebihi":o?"Hampir":`${Math.round(d)}%`," dari ",p(a)]})]}):e.jsx("span",{className:"db-daily-card-sub",style:{color:"#818cf8"},children:"Atur budget harian →"})})]})})(),(()=>{var w;const a=t.categories.filter(n=>!U(n)&&!he(n)&&n.is_monthly&&(n.budget_limit>0||(n.spent||0)>0)),s=t.categories.filter(n=>!U(n)&&!he(n)&&!n.is_monthly&&(n.budget_limit>0||(n.spent||0)>0)),i=(t.hutangList||[]).filter(n=>n.jenis==="hutang"),o=(t.hutangList||[]).filter(n=>n.jenis==="piutang"),u=!y&&a.length===0&&s.length===0&&i.length===0&&o.length===0,f=({cat:n})=>{const d=n.budget_limit>0?n.spent/n.budget_limit*100:0,b=Math.min(d,100),x=d>100,_=!x&&d>=100,j=!x&&d>=80&&d<100,C=x?"var(--danger)":_?"var(--success)":j?"var(--warning)":n.color||"var(--accent)",W=n.budget_limit-(n.spent||0),O=t.salary>0&&n.budget_limit>0?Math.round(n.budget_limit/t.salary*100):null,Te=n.budget_limit>0;return e.jsxs("div",{className:`brow${!Te&&n.spent>0?" brow-no-budget":""}`,children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${n.color||"#6366f1"}18`},children:e.jsx("span",{style:{width:10,height:10,borderRadius:"50%",background:n.color||"var(--accent)",display:"inline-block",flexShrink:0}})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("span",{className:"brow-name",children:n.name}),x&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Over"}),_&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Penuh"}),j&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Hampir"})]})]}),n.budget_limit>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"brow-bar-wrap",children:e.jsx("div",{className:"brow-bar",children:e.jsx("div",{className:"brow-bar-fill",style:{width:`${b}%`,background:C}})})}),e.jsxs("div",{className:"brow-right",onClick:()=>O&&ka(ge=>!ge),style:{cursor:O?"pointer":"default"},children:[e.jsx("span",{className:"brow-spent tabular",style:{color:x?"var(--danger)":"var(--text-primary)"},children:p(n.spent||0)}),Na&&O?e.jsxs("span",{className:"brow-limit tabular",style:{color:"var(--accent)"},children:[O,"% gaji"]}):e.jsx("span",{className:"brow-limit tabular",style:{color:W<0?"var(--danger)":W===0?"var(--text-muted)":"var(--success)"},children:W<0?`Over ${p(Math.abs(W))}`:`Sisa ${p(W)}`})]}),e.jsxs("span",{className:"brow-pct",style:{color:C},children:[d.toFixed(0),"%"]})]}):n.spent>0?e.jsxs("span",{className:"brow-only-spent tabular",style:{color:"var(--danger)"},children:["−",p(n.spent)]}):null]})};return e.jsxs(e.Fragment,{children:[!y&&$.length>0&&e.jsxs("div",{className:"db-alert",children:[e.jsx(Oa,{size:11}),e.jsxs("span",{children:["Overbudget — ",e.jsx("strong",{children:(w=$[Se])==null?void 0:w.name})]}),$.length>1&&e.jsxs("span",{className:"db-alert-count",children:[Se+1,"/",$.length]})]},Se),e.jsxs("div",{className:"card dash-tab-card",children:[e.jsxs("div",{className:"sect-head",style:{marginBottom:16},children:[e.jsxs("div",{className:"dash-tab-toggle",children:[e.jsx("button",{className:`dash-tab-btn${de==="transaction"?" active":""}`,onClick:()=>Re("transaction"),children:"My Transaction"}),e.jsx("button",{className:`dash-tab-btn${de==="budget"?" active":""}`,onClick:()=>Re("budget"),children:"My Budget"})]}),e.jsxs("div",{className:"tab-actions",children:[e.jsxs(Y,{to:`/transactions?month=${c}`,className:"tab-act",children:[e.jsx(be,{size:13}),e.jsx("span",{className:"tab-act-label",children:"Lihat semua"})]}),e.jsxs(Y,{to:`/categories?month=${c}`,className:"tab-act",children:[e.jsx(ra,{size:13}),e.jsx("span",{className:"tab-act-label",children:"Atur"})]}),e.jsxs("button",{className:"tab-act tab-act-accent",onClick:()=>H(!0),children:[e.jsx(na,{size:13}),e.jsx("span",{className:"tab-act-label",children:"Transaksi"})]})]})]}),e.jsxs("div",{className:"card-scroll-body",children:[de==="transaction"&&(y?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[...Array(4)].map((n,d)=>e.jsx("div",{className:"skeleton",style:{height:42}},d))}):t.transactions.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(ia,{size:13})}),e.jsx("span",{children:"Belum ada transaksi bulan ini."}),e.jsx("button",{className:"empty-hint-link",onClick:()=>H(!0),children:"Tambah sekarang →"})]}):e.jsx("div",{className:"tx-list",children:t.transactions.map(n=>{var d;return e.jsxs("div",{className:"tx-row",children:[e.jsx("div",{className:"tx-icon",style:{background:n.type==="income"?"rgba(52,211,153,0.12)":"rgba(248,113,113,0.12)",color:n.type==="income"?"var(--success)":"var(--danger)"},children:n.type==="income"?e.jsx(ia,{size:14}):e.jsx(re,{size:14})}),e.jsxs("div",{className:"tx-meta",children:[e.jsx("span",{className:"tx-desc",children:n.description||((d=n.categories)==null?void 0:d.name)||"Transaksi"}),e.jsx("span",{className:"tx-date",children:new Date(n.date).toLocaleDateString("id-ID",{day:"numeric",month:"short"})})]}),e.jsxs("span",{className:`tx-amount tabular ${n.type==="income"?"inc":"exp"}`,children:[n.type==="income"?"+":"−",p(n.amount)]})]},n.id)})})),de==="budget"&&(y?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(3)].map((n,d)=>e.jsx("div",{className:"skeleton",style:{height:44}},d))}):u?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(ra,{size:14})}),e.jsx("span",{children:"Tambahkan kategori dan budget"}),e.jsx(Y,{to:`/categories?month=${c}`,className:"empty-hint-link",style:{color:"var(--accent)"},children:"Atur →"})]}):e.jsxs(e.Fragment,{children:[(i.length>0||o.length>0)&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Hutang & Piutang"}),e.jsx("div",{className:"budget-rows",children:[...i,...o].map(n=>{const d=n.jenis==="piutang",b=d?"#f59e0b":"#f87171",x=new Date;x.setHours(0,0,0,0);const _=n.due_date?new Date(n.due_date):null,j=_?Math.round((_-x)/864e5):null,C=j!==null&&j<0;return e.jsxs("div",{className:"brow",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${b}18`,color:b},children:d?e.jsx(la,{size:13}):e.jsx(be,{size:13})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("span",{className:"brow-name",children:n.nama}),e.jsx("span",{style:{fontSize:"0.62rem",color:"var(--text-muted)",marginLeft:6},children:d?"piutang":"hutang"}),C&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Terlambat"})]})]}),e.jsx("div",{style:{flex:1}}),e.jsxs("div",{className:"brow-right",children:[e.jsx("span",{className:"brow-spent tabular",style:{color:b},children:p(n.amount)}),n.due_date&&e.jsx("span",{className:"brow-limit tabular",style:{color:C?"var(--danger)":j<=7?"var(--warning)":"var(--text-muted)"},children:j===0?"Hari ini":j>0?`${j}h lagi`:`${Math.abs(j)}h lalu`})]})]},n.id)})})]}),(i.length>0||o.length>0)&&a.length>0&&e.jsx("div",{style:{height:1,background:"var(--border)",margin:"12px 0"}}),a.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Pengeluaran Rutin"}),e.jsx("div",{className:"budget-rows",children:a.map(n=>e.jsx(f,{cat:n},n.id))})]}),(a.length>0||i.length>0||o.length>0)&&s.length>0&&e.jsx("div",{style:{height:1,background:"var(--border)",margin:"12px 0"}}),s.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Kategori Lainnya"}),e.jsx("div",{className:"budget-rows",children:s.map(n=>e.jsx(f,{cat:n},n.id))})]}):i.length===0&&o.length===0&&a.length===0&&e.jsxs("div",{style:{fontSize:"0.72rem",color:"var(--text-muted)"},children:["Belum ada kategori dengan budget. ",e.jsx(Y,{to:`/categories?month=${c}`,style:{color:"var(--accent)"},children:"Atur →"})]})]}))]})]})]})})()]}),va&&(()=>{const a=t.salary>0,s=async()=>{const i=parseFloat(A.amount.replace(/\D/g,""))||0;if(i){We(!0);try{const o=A.date||`${c}-01`;if(t.gajiTx){const{error:u}=await h.from("transactions").update({amount:i,description:A.note,date:o}).eq("id",t.gajiTx.id);if(u)throw u}else{const{error:u}=await h.from("transactions").insert({user_id:m.id,category_id:t.gajiCatId,type:"income",amount:i,description:A.note,date:o});if(u)throw u}v("Pemasukan disimpan","success"),V(!1),L()}catch(o){v(o.message,"error")}finally{We(!1)}}};return e.jsx("div",{className:"modal-overlay",onClick:()=>V(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:i=>i.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Pemasukan Bulanan ",B(c)]}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:a?"Edit jumlah atau catatan":"Catat pemasukan bulan ini"})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>V(!1),children:e.jsx(N,{size:16})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Jumlah Pemasukan"}),e.jsx(oa,{value:A.amount,onChange:i=>oe(o=>({...o,amount:i})),autoFocus:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Tanggal Diterima"}),e.jsx("input",{className:"form-input",type:"date",value:A.date,min:`${c}-01`,max:(()=>{const[i,o]=c.split("-").map(Number);return new Date(i,o,0).toISOString().split("T")[0]})(),onChange:i=>oe(o=>({...o,date:i.target.value}))})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Catatan ",!a&&e.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400},children:"(opsional)"})]}),e.jsx("textarea",{className:"form-input",rows:2,placeholder:"Misal: gaji pokok + bonus, tunjangan, dll...",value:A.note,onChange:i=>oe(o=>({...o,note:i.target.value})),style:{resize:"vertical",fontFamily:"var(--font-sans)",fontSize:"0.875rem"}})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>V(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:s,disabled:$e||!A.amount,children:$e?"Menyimpan...":"Simpan"})]})]})})})(),fa&&e.jsx("div",{className:"modal-overlay",onClick:()=>ve(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Total Tabungan"}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Akumulasi s/d ",B(c)]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>ve(!1),children:e.jsx(N,{size:16})})]}),e.jsxs("div",{className:"wajib-rows",children:[(m.tabungan_awal||0)>0&&e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)",fontSize:"0.55rem",fontWeight:800},children:"AWAL"}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:"Saldo Awal Tabungan"}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)"},children:"sebelum mulai record"})]})]}),e.jsx("span",{className:"wajib-amount tabular",style:{color:"var(--success)"},children:p(m.tabungan_awal)})]}),t.tabunganPerMonth.length===0&&!(m.tabungan_awal>0)?e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--text-muted)",padding:"8px 0"},children:'Belum ada alokasi tabungan. Set budget kategori "Tabungan Bulanan".'}):t.tabunganPerMonth.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)"},children:e.jsx(re,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:B(a.month)}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)"},children:"Tabungan Bulanan"})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:Number(a.budget_limit)>0?"var(--success)":"var(--text-muted)"},children:["+",p(a.budget_limit)]})]},a.month)),t.hutangTabunganList.filter(a=>!a.lunas).length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"wajib-divider",style:{margin:"8px 0"}}),e.jsx("div",{style:{fontSize:"0.62rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"var(--text-muted)",marginBottom:4},children:"Outstanding bulan ini"}),t.hutangTabunganList.filter(a=>!a.lunas).map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:a.jenis==="piutang"?"rgba(245,158,11,0.1)":"rgba(248,113,113,0.1)",color:a.jenis==="piutang"?"var(--warning)":"var(--danger)",fontSize:"0.9rem"},children:a.jenis==="piutang"?e.jsx(la,{size:13}):e.jsx(be,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:a.nama}),e.jsx("div",{style:{fontSize:"0.62rem",color:"var(--text-muted)"},children:a.jenis==="hutang"?"Hutang":"Piutang"})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",p(a.amount)]})]},a.id))]}),e.jsx("div",{className:"wajib-divider",style:{margin:"10px 0"}}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:4},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Tabungan"}),e.jsx("span",{className:"wajib-amount tabular",style:{color:t.totalTabungan>0?"var(--success)":"var(--text-muted)",fontWeight:800},children:p(t.totalTabungan)})]})]})]})}),ja&&e.jsx("div",{className:"modal-overlay",onClick:()=>q(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Rencana Bulan Depan"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:B(xe(c))})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx(Y,{to:"/savings",className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>q(!1),children:"Kelola →"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>q(!1),children:e.jsx(N,{size:16})})]})]}),t.nextMonthPlans.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(be,{size:13})}),e.jsxs("span",{children:["Belum ada rencana untuk ",B(xe(c)),"."]}),e.jsx(Y,{to:"/savings",className:"empty-hint-link",onClick:()=>q(!1),children:"Tambah →"})]}):e.jsxs("div",{className:"wajib-rows",children:[t.nextMonthPlans.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsx("span",{className:"brow-name",children:a.name}),e.jsx("span",{className:"wajib-amount tabular",children:p(a.amount)})]},a.id)),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total"}),e.jsx("span",{className:"wajib-amount tabular",children:p(t.nextMonthPlans.reduce((a,s)=>a+Number(s.amount),0))})]})]})]})}),ya&&e.jsx("div",{className:"modal-overlay",onClick:()=>{le(!1),Z(null),F(null)},children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:a=>a.stopPropagation(),children:[!k&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Detail Pinjaman"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>le(!1),children:e.jsx(N,{size:16})})]}),e.jsxs("div",{className:"wajib-rows",children:[(t.hutangList||[]).filter(a=>a.jenis==="hutang").map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(251,191,36,0.1)",color:"#fbbf24"},children:e.jsx(re,{size:13})}),e.jsx("span",{className:"brow-name",children:a.nama})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("span",{className:"wajib-amount tabular",children:p(Number(a.amount))}),e.jsx("button",{className:"btn btn-sm",style:{fontSize:"0.65rem",padding:"3px 10px",background:"rgba(52,211,153,0.12)",color:"#34d399",border:"1px solid rgba(52,211,153,0.25)",borderRadius:99},onClick:()=>{Z(a),F(null),ae(null)},children:"Bayar"})]})]},a.id)),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Pinjaman"}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"#fbbf24"},children:["−",p(K)]})]})]})]}),k&&!E&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Hutang Terbayar"}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[k.nama," · ",p(k.amount)]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>Z(null),children:e.jsx(N,{size:16})})]}),e.jsx("p",{style:{fontSize:"0.78rem",color:"var(--text-muted)",marginBottom:14},children:"Bayar dari mana?"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsxs("button",{className:"btn btn-secondary",style:{justifyContent:"flex-start",gap:10},onClick:()=>F("tabungan"),children:[e.jsx("span",{style:{fontSize:"1rem"},children:"🏦"}),e.jsxs("div",{style:{textAlign:"left"},children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.82rem"},children:"Tabungan"}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)",fontWeight:400},children:"Kurangi dari kantong tabungan"})]})]}),e.jsxs("button",{className:"btn btn-secondary",style:{justifyContent:"flex-start",gap:10},onClick:()=>F("saldo"),children:[e.jsx("span",{style:{fontSize:"1rem"},children:"💳"}),e.jsxs("div",{style:{textAlign:"left"},children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.82rem"},children:"Saldo"}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)",fontWeight:400},children:"Bayar langsung dari saldo"})]})]})]})]}),k&&E==="tabungan"&&!ee&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Pilih Tabungan"}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[p(k.amount)," akan dikurangi"]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>F(null),children:e.jsx(N,{size:16})})]}),e.jsx("div",{className:"wajib-rows",children:(t.savings||[]).map(a=>e.jsxs("div",{className:"wajib-row",style:{cursor:"pointer"},onClick:()=>ae(a.id),children:[e.jsx("span",{className:"brow-name",children:a.name}),e.jsx("span",{className:"wajib-amount tabular",style:{color:Number(a.current_amount)>=Number(k.amount)?"#34d399":"#f87171"},children:p(Number(a.current_amount))})]},a.id))})]}),k&&E&&(E==="saldo"||ee)&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{children:e.jsx("h2",{className:"modal-title",children:"Konfirmasi"})}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>{E==="saldo"?F(null):ae(null)},children:e.jsx(N,{size:16})})]}),e.jsxs("div",{style:{fontSize:"0.82rem",color:"var(--text-muted)",lineHeight:1.6,marginBottom:16},children:["Tandai hutang ke ",e.jsx("strong",{style:{color:"var(--text-primary)"},children:k.nama})," sebesar"," ",e.jsx("strong",{style:{color:"#fbbf24"},children:p(k.amount)})," sebagai ",e.jsx("strong",{style:{color:"#34d399"},children:"lunas"}),E==="tabungan"&&e.jsxs(e.Fragment,{children:[" dari tabungan ",e.jsx("strong",{style:{color:"var(--text-primary)"},children:(Qe=(t.savings||[]).find(a=>a.id===ee))==null?void 0:Qe.name})]}),"?"]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"flex-end"},children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>{Z(null),F(null),ae(null)},children:"Batal"}),e.jsx("button",{className:"btn btn-primary",disabled:Fe,onClick:async()=>{Ae(!0);try{if(E==="tabungan"){const a=(t.savings||[]).find(s=>s.id===ee);await h.from("savings").update({current_amount:Number(a.current_amount)-Number(k.amount)}).eq("id",ee)}await h.from("hutang").update({lunas:!0}).eq("id",k.id),await L(),le(!1),Z(null),F(null),ae(null)}finally{Ae(!1)}},children:Fe?"Menyimpan...":"Konfirmasi Lunas"})]})]})]})}),wa&&e.jsx("div",{className:"modal-overlay",onClick:()=>te(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:340},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Budget Harian"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:"Batas pengeluaran per hari"})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>te(!1),children:e.jsx(N,{size:16})})]}),e.jsxs("div",{style:{padding:"4px 0 8px"},children:[e.jsx("label",{style:{fontSize:"0.72rem",color:"var(--text-muted)",display:"block",marginBottom:6},children:"Jumlah per hari"}),e.jsx("input",{className:"form-input",type:"number",placeholder:"cth: 50000",value:ye,onChange:a=>De(a.target.value),autoFocus:!0})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8},children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>te(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",disabled:Ee||!ye,onClick:async()=>{Le(!0);try{await J({budget_harian:parseFloat(ye)||0}),te(!1)}finally{Le(!1)}},children:Ee?"Menyimpan...":"Simpan"})]})]})}),xa&&e.jsx("div",{className:"modal-overlay",onClick:()=>ie(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:420},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Pengeluaran Tetap"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:B(c)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>{ie(!1),fe(!0)},children:"Kelola"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>ie(!1),children:e.jsx(N,{size:16})})]})]}),e.jsxs("div",{className:"wajib-rows",children:[t.categories.filter(a=>U(a)).map(a=>{const s=Number(a.budget_limit||0),i=t.salary>0&&s>0?Math.round(s/t.salary*100):null;return e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:e.jsx(re,{size:13})}),e.jsx("span",{className:"brow-name",children:a.name})]}),e.jsxs("div",{className:"wajib-right",children:[i&&e.jsxs("span",{className:"wajib-pct",children:[i,"%"]}),e.jsx("span",{className:"wajib-amount tabular",children:s>0?p(s):"—"})]})]},a.id)}),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Potongan"}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",p(Ke)]})]})]})]})}),ua&&e.jsx("div",{className:"modal-overlay",onClick:()=>H(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>H(!1),children:e.jsx(N,{size:16})})]}),e.jsx(Ga,{month:c,onSuccess:()=>{L(),H(!1)},onClose:()=>H(!1)})]})}),ba&&!S&&!Ie&&e.jsx("div",{className:"modal-overlay",onClick:()=>fe(!1),children:e.jsxs("div",{className:"modal cat-manager-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Kelola Kategori"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:B(c)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsxs("button",{className:"btn btn-primary btn-sm",onClick:()=>{ha({is_mandatory:!0}),Q(!0)},children:[e.jsx(na,{size:13})," Kategori"]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>fe(!1),children:e.jsx(N,{size:16})})]})]}),e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("p",{className:"cat-mgr-section-title",children:"Pengeluaran Wajib"}),e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:t.categories.filter(a=>U(a)).map(a=>{const s=Number(a.budget_limit)||0,i=t.salary>0&&s>0?Math.round(s/t.salary*100):null;return e.jsxs("div",{className:"cat-mgr-row",children:[e.jsxs("div",{className:"cat-mgr-left",children:[e.jsx("span",{className:"cat-mgr-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:e.jsx(re,{size:14})}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-mgr-name",children:a.name}),e.jsx("span",{className:"cat-mgr-sub",children:"Wajib · langsung dipotong"})]})]}),e.jsxs("div",{className:"cat-mgr-right",children:[i&&e.jsxs("span",{className:"cat-mgr-pct",children:[i,"%"]}),e.jsx("span",{className:"cat-mgr-amount tabular",children:s>0?p(s):"—"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.7rem"},onClick:()=>_a(a),children:"Ubah"})]})]},a.id)})})]})]})}),S&&(()=>{const a=t.categories.find(s=>s.id===S.id);return e.jsx("div",{className:"modal-overlay",onClick:()=>I(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Pengeluaran Wajib — ",a==null?void 0:a.name]}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[B(c),t.salary>0?` · ${p(t.salary)}`:""]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>I(null),children:e.jsx(N,{size:16})})]}),t.salary>0&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx("input",{className:"form-input",type:"number",placeholder:String(Va),value:S.pct,onChange:s=>qe(s.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),e.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),S.pct&&t.salary>0&&e.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",p(Math.round(parseFloat(S.pct)/100*t.salary))]})]}),!S.pct&&e.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(s=>e.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>qe(String(s)),children:[s,"%"]},s))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),e.jsx(oa,{value:S.nominal,onChange:Ca,autoFocus:!t.salary})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:16},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)",fontSize:"0.78rem"},onClick:()=>{I(null),je({id:a.id,name:a.name})},children:"Hapus Kategori"}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>I(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",onClick:Ta,children:"Simpan"})]})]})]})})})(),X&&e.jsx(Xa,{title:"Hapus Kategori",message:`Hapus kategori "${X.name}"? Semua transaksi kategori ini juga akan terhapus.`,confirmLabel:"Hapus",onConfirm:Ma,onCancel:()=>je(null)}),Ie&&e.jsx("div",{className:"modal-overlay",onClick:()=>Q(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:ne!=null&&ne.id?"Edit Kategori":"Kategori Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>Q(!1),children:e.jsx(N,{size:16})})]}),e.jsx(Ya,{editData:ne,salary:t.salary,month:c,onSuccess:()=>{L(),Q(!1)},onClose:()=>Q(!1)})]})}),e.jsx("style",{children:`
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
        .db-hutang-chip {
          display: inline-flex; align-items: center; gap: 5px;
          align-self: flex-start; width: fit-content;
          background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.22);
          border-radius: 99px; padding: 4px 10px 4px 8px;
          cursor: pointer; margin-top: 7px;
          transition: background 0.15s;
        }
        .db-hutang-chip:hover { background: rgba(251,191,36,0.18); }
        .db-hutang-chip-label {
          font-size: 0.6rem; font-weight: 600; color: rgba(251,191,36,0.8);
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .db-hutang-chip-amount {
          font-size: 0.7rem; font-weight: 700; color: #fbbf24;
          font-variant-numeric: tabular-nums;
        }
        .db-hutang-chip-arrow {
          font-size: 0.85rem; color: rgba(251,191,36,0.5); line-height: 1;
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

        .db-hero-chips {
          display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
          margin-top: 10px;
        }
        .db-daily {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.82rem; font-weight: 700;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 99px; padding: 4px 12px;
        }
        .db-daily-badge {
          font-size: 0.6rem; font-weight: 700; padding: 2px 7px; border-radius: 99px;
        }
        .db-rencana-chip {
          display: flex; align-items: center; gap: 5px;
          font-size: 0.72rem; font-weight: 600;
          color: var(--warning);
          background: rgba(251,191,36,0.07);
          border: 1px solid rgba(251,191,36,0.2);
          border-radius: 99px; padding: 4px 12px;
          cursor: pointer; font-family: var(--font-sans);
          transition: all 0.15s;
        }
        .db-rencana-chip:hover { background: rgba(251,191,36,0.13); border-color: rgba(251,191,36,0.35); }

        /* ── Card Hari Ini ──────────────────────── */
        .db-daily-card {
          border: 1px solid;
          border-radius: var(--radius-lg);
          display: flex; align-items: center; gap: 14px;
          padding: 12px 16px;
          transition: background 0.2s, border-color 0.2s;
        }
        .db-daily-card-left {
          display: flex; flex-direction: column; gap: 3px; flex-shrink: 0;
        }
        .db-daily-card-clickable { cursor: pointer; }
        .db-daily-card-clickable:hover { filter: brightness(1.04); }
        .db-daily-card-label {
          font-size: 0.55rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--text-muted);
        }
        .db-daily-card-amount {
          font-size: 1.05rem; font-weight: 800;
          letter-spacing: -0.025em; font-variant-numeric: tabular-nums; line-height: 1;
        }
        .db-daily-card-right {
          flex: 1; display: flex; flex-direction: column; gap: 5px; min-width: 0;
        }
        .db-daily-card-track {
          height: 5px; border-radius: 99px;
          background: rgba(255,255,255,0.1); overflow: hidden;
        }
        [data-theme="light"] .db-daily-card-track { background: rgba(0,0,0,0.08); }
        .db-daily-card-fill {
          height: 100%; border-radius: 99px; transition: width 0.4s ease;
        }
        .db-daily-card-sub {
          font-size: 0.62rem; font-weight: 600;
          text-align: right; opacity: 0.8;
        }

        /* ── Stats 2×2 ──────────────────────────── */
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
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          padding: 14px 12px;
          background: var(--bg-card);
          text-align: center; border: none;
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
          color: var(--text-muted);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%;
        }
        .db-sub-dots {
          display: flex; gap: 4px; margin-top: 3px; justify-content: center;
        }
        .db-sub-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--text-muted); opacity: 0.25; flex-shrink: 0;
          transition: opacity 0.2s; cursor: pointer;
          padding: 3px; box-sizing: content-box;
        }
        .db-sub-dot.active { opacity: 0.9; background: var(--text-primary); }
        .db-sub-dot:hover { opacity: 0.55; }

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
          .dash-tab-card .sect-head { flex-wrap: wrap; gap: 8px; }
          .dash-tab-toggle { width: 100%; }
          .dash-tab-toggle .dash-tab-btn { flex: 1; text-align: center; }
          .tab-actions { width: 100%; }
          .tab-act { flex: 1; justify-content: center; padding: 7px 8px; border-radius: 8px; font-size: 0.65rem; gap: 4px; }
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
      `})]})}export{rt as default};
