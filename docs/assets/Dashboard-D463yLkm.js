import{F as Ya,H as Ua,K as Ja,J as Qa,D as m,w as re,B as e,z as B,G as Xa,y as ga,A as Va,E as u,v as p,f as Za,I as et,L as Y,d as xe,n as pa,m as ba,c as ua,a as ne,b as ha,s as y,C as xa}from"./index-BaIoCt0I.js";import{T as at}from"./TransactionForm-BEoRT0YC.js";import{C as tt}from"./CategoryForm-C8a3FHHS.js";import{a as fe,i as U,d as fa,f as st,c as rt,e as nt,C as it}from"./ConfirmModal-BYX4LxHg.js";const lt=15;function ot(d){const[J,q]=d.split("-").map(Number),j=new Date(J,q-2,1);return`${j.getFullYear()}-${String(j.getMonth()+1).padStart(2,"0")}`}function je(d){const[J,q]=d.split("-").map(Number),j=new Date(J,q,1);return`${j.getFullYear()}-${String(j.getMonth()+1).padStart(2,"0")}`}function pt(){var Ze,ea,aa,ta,sa,ra,na;const{user:d,updateProfile:J}=Ya(),{setHeader:q}=Ua(),j=Ja(),[ja,va]=Qa(),[o,ya]=m.useState(()=>ja.get("month")||re()),[s,wa]=m.useState({salary:0,totalExpense:0,totalIncome:0,categories:[],transactions:[],savings:[],savingsLogs:[],categorySpend:[],hutangList:[],hutangTabunganList:[],todayExpense:0,totalTabungan:0,tabunganPerMonth:[],nextMonthPlans:[],cumulativeBalance:0,cumulativeMandatoryBudget:0,gajiTx:null,gajiCatId:null}),[v,Ie]=m.useState(!0),[Na,R]=m.useState(!1),[ka,ve]=m.useState(!1),[k,I]=m.useState(null),[Fe,Q]=m.useState(!1),[ie,Sa]=m.useState(null),[X,ye]=m.useState(null),[za,le]=m.useState(!1),[Ca,we]=m.useState(!1),[_a,H]=m.useState(!1),[Ta,V]=m.useState(!1),[Ma,oe]=m.useState(!1),[w,Z]=m.useState(null),[E,F]=m.useState(null),[ee,ae]=m.useState(null),[Ae,De]=m.useState(!1),[Pa,te]=m.useState(!1),[Ne,Ee]=m.useState(""),[Le,$e]=m.useState(!1),[A,de]=m.useState({amount:"",note:"",date:""}),[We,qe]=m.useState(!1),[ke,Se]=m.useState(!1),[T,ze]=m.useState(()=>Number(re().split("-")[0])),[Ba,Ia]=m.useState(!1),[ce,Re]=m.useState("transaction"),[Ce,He]=m.useState(0),[Fa,Ke]=m.useState(0),[Aa,Oe]=m.useState(0);m.useEffect(()=>{if(d.recording_start_month&&o<d.recording_start_month){me(d.recording_start_month);return}L()},[o,d==null?void 0:d.recording_start_month]),m.useEffect(()=>{const a=o===re(),t=!!d.recording_start_month&&o<=d.recording_start_month,[i,c]=d.recording_start_month?d.recording_start_month.split("-").map(Number):[0,0],b=re(),[h,_]=b.split("-").map(Number),n=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];return q(e.jsxs(e.Fragment,{children:[ke&&e.jsx("div",{style:{position:"fixed",inset:0,zIndex:299},onClick:()=>Se(!1)}),e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>me(ot(o)),disabled:t,children:"‹"}),e.jsx("span",{className:"month-label-text month-label-clickable",onClick:()=>{ze(Number(o.split("-")[0])),Se(g=>!g)},children:B(o)}),e.jsx("button",{className:"month-btn",onClick:()=>me(je(o)),disabled:a,children:"›"}),ke&&e.jsxs("div",{className:"month-picker-popup",onMouseDown:g=>g.preventDefault(),children:[e.jsxs("div",{className:"mp-year-row",children:[e.jsx("button",{className:"mp-year-btn",onClick:()=>ze(g=>g-1),disabled:!!d.recording_start_month&&T<=i,children:"‹"}),e.jsx("span",{className:"mp-year-label",children:T}),e.jsx("button",{className:"mp-year-btn",onClick:()=>ze(g=>g+1),disabled:T>=h,children:"›"})]}),e.jsx("div",{className:"mp-grid",children:n.map((g,M)=>{const x=M+1,z=`${T}-${String(x).padStart(2,"0")}`,f=T>h||T===h&&x>_,C=!!d.recording_start_month&&(T<i||T===i&&x<c);return e.jsx("button",{className:`mp-month-btn${z===o?" mp-active":""}`,disabled:f||C,onClick:()=>{me(z),Se(!1)},children:g},z)})})]})]})]})),()=>q(null)},[o,ke,T,d==null?void 0:d.recording_start_month]),Xa();const me=a=>{ya(a),va({month:a})},L=async()=>{Ie(!0);try{const a=`${o}-01`,t=ga(o),i=Va(),c=je(o),b=d.recording_start_month;let h=u.from("transactions").select("amount, type").eq("user_id",d.id).lt("date",a);b&&(h=h.gte("date",`${b}-01`));let _=u.from("category_budgets").select("budget_limit, category_id, month, categories(is_mandatory, name, category_type)").eq("user_id",d.id).lte("month",o);b&&(_=_.gte("month",b));const[n,g,M,x,z,f,C,W,O,Me,be]=await Promise.all([u.from("transactions").select("*, categories(name, color, icon)").eq("user_id",d.id).gte("date",a).lte("date",t).order("date",{ascending:!1}),Promise.all([u.from("categories").select("*").eq("user_id",d.id).is("month",null),u.from("categories").select("*").eq("user_id",d.id).eq("month",o)]).then(([r,l])=>{const P=[...r.data||[],...l.data||[]].sort((he,Ga)=>he.name.localeCompare(Ga.name)),ma=new Set;return{data:P.filter(he=>ma.has(he.name)?!1:(ma.add(he.name),!0))}}),u.from("savings").select("*").eq("user_id",d.id),u.from("savings_log").select("*").eq("user_id",d.id).eq("month",o),u.from("transactions").select("amount").eq("user_id",d.id).eq("date",i).eq("type","expense"),u.from("category_budgets").select("category_id, budget_limit").eq("user_id",d.id).eq("month",o),_,u.from("plans").select("*").eq("user_id",d.id).eq("target_month",c).eq("done",!1).order("created_at",{ascending:!0}),h,u.from("hutang").select("id, nama, amount, due_date, sumber, jenis, lunas").eq("user_id",d.id).eq("month",o).eq("lunas",!1).order("due_date",{ascending:!0,nullsFirst:!1}),u.from("hutang").select("id, nama, amount, jenis, lunas, created_at").eq("user_id",d.id).eq("month",o).eq("sumber","tabungan").order("created_at",{ascending:!1})]),G=n.data||[],Pe={};(f.data||[]).forEach(r=>{Pe[r.category_id]=Number(r.budget_limit)});let ia=(g.data||[]).map(r=>{const l=Pe[r.id]!==void 0?Pe[r.id]:0;return{...r,budget_limit:l,budget_set:l>0}});const D=ia.find(r=>fe(r)),la=D?G.filter(r=>r.type==="income"&&r.category_id===D.id):[],oa=la.reduce((r,l)=>r+Number(l.amount),0),Ka=ia,da=G.filter(r=>r.type==="expense").reduce((r,l)=>r+Number(l.amount),0),ca=G.filter(r=>r.type==="income"&&r.category_id!==(D==null?void 0:D.id)).reduce((r,l)=>r+Number(l.amount),0),Be={};G.filter(r=>r.type==="expense"&&r.category_id).forEach(r=>{Be[r.category_id]=(Be[r.category_id]||0)+Number(r.amount)});const ue={};G.filter(r=>r.type==="expense"&&r.categories).forEach(r=>{const l=r.categories.name;ue[l]||(ue[l]={name:l,amount:0,color:r.categories.color,icon:r.categories.icon}),ue[l].amount+=Number(r.amount)});const Oa=Ka.map(r=>{const l=Be[r.id]||0,P=r.budget_limit>0?l/r.budget_limit*100:null;return{...r,spent:l,pct:P,overBudget:r.budget_limit>0&&l>r.budget_limit}}).sort((r,l)=>r.overBudget&&!l.overBudget?-1:!r.overBudget&&l.overBudget?1:(l.pct||0)-(r.pct||0));wa({salary:oa,totalExpense:da,totalIncome:ca,categories:Oa,transactions:G.slice(0,5),savings:M.data||[],savingsLogs:x.data||[],todayExpense:(z.data||[]).reduce((r,l)=>r+Number(l.amount),0),tabunganPerMonth:(C.data||[]).filter(r=>{var l,P;return(((l=r.categories)==null?void 0:l.category_type)==="savings"||((P=r.categories)==null?void 0:P.name)==="Tabungan Bulanan")&&Number(r.budget_limit)>0}).sort((r,l)=>r.month.localeCompare(l.month)),totalTabungan:(C.data||[]).filter(r=>{var l,P;return((l=r.categories)==null?void 0:l.category_type)==="savings"||((P=r.categories)==null?void 0:P.name)==="Tabungan Bulanan"}).reduce((r,l)=>r+Number(l.budget_limit),0)+(d.tabungan_awal||0)-(be.data||[]).filter(r=>!r.lunas).reduce((r,l)=>r+Number(l.amount),0),categorySpend:Object.values(ue).sort((r,l)=>l.amount-r.amount),nextMonthPlans:W.data||[],gajiTx:la[0]||null,gajiCatId:(D==null?void 0:D.id)||null,hutangList:Me.data||[],hutangTabunganList:be.data||[],cumulativeBalance:(O.data||[]).reduce((r,l)=>r+(l.type==="income"?Number(l.amount):-Number(l.amount)),0)+oa+ca-da+(d.saldo_awal||0),cumulativeMandatoryBudget:(C.data||[]).filter(r=>{var l;return((l=r.categories)==null?void 0:l.is_mandatory)===!0}).reduce((r,l)=>r+Number(l.budget_limit),0)})}finally{Ie(!1)}},Da=a=>{const t=String(Math.round(a.budget_limit||0)),i=s.salary>0&&a.budget_limit>0?(a.budget_limit/s.salary*100).toFixed(1):"";I({id:a.id,nominal:t,pct:i})},Ea=a=>{const t=parseFloat(a)||0,i=s.salary>0&&t>0?(t/s.salary*100).toFixed(1):"";I(c=>({...c,nominal:a,pct:i}))},Ge=a=>{const t=parseFloat(a)||0,i=s.salary>0&&t>0?String(Math.round(t/100*s.salary)):"";I(c=>({...c,pct:a,nominal:i}))},La=async()=>{const a=parseFloat(k.nominal)||0,[t,i]=await Promise.all([u.from("category_budgets").upsert({user_id:d.id,category_id:k.id,month:o,budget_limit:a},{onConflict:"category_id,month"}),u.from("categories").update({budget_limit:a}).eq("id",k.id)]),c=t.error||i.error;if(c){j(c.message,"error");return}j("Budget disimpan","success"),I(null),L()},$a=async()=>{const a=`${o}-01`,t=ga(o),[i,c]=await Promise.all([u.from("transactions").delete().eq("category_id",X.id).gte("date",a).lte("date",t),u.from("category_budgets").delete().eq("category_id",X.id).eq("month",o)]);if(i.error||c.error){j((i.error||c.error).message,"error");return}const{error:b}=await u.from("categories").delete().eq("id",X.id);if(b){j(b.message,"error");return}j("Kategori dihapus","success"),ye(null),L()};s.categories.filter(a=>a.budget_limit>0).reduce((a,t)=>a+t.budget_limit,0);const _e=o===re(),$=s.categories.filter(a=>a.overBudget);m.useEffect(()=>{if($.length<=1){He(0);return}const a=setInterval(()=>He(t=>(t+1)%$.length),2e3);return()=>clearInterval(a)},[$.length]);const Ye=s.categories.filter(a=>U(a)).reduce((a,t)=>a+Number(t.budget_limit||0),0),Wa=s.categories.filter(a=>U(a)).reduce((a,t)=>a+(t.spent||0),0),qa=Math.max(0,Ye-Wa),Ue=s.totalExpense+qa;s.salary+s.totalIncome-Ue,s.salary>0&&Ue/s.salary*100;const Te=s.categories.filter(a=>fa(a)&&a.budget_limit>0).reduce((a,t)=>a+Number(t.budget_limit),0);s.categories.filter(a=>fe(a));const Ra=s.categories.filter(a=>fa(a)),Je=s.categories.filter(a=>st(a)),Qe=s.categories.filter(a=>rt(a)),Xe=s.categories.filter(a=>nt(a)),Ha=[{label:"Wajib",spent:Je.reduce((a,t)=>a+(t.spent||0),0),budget:Je.reduce((a,t)=>a+Number(t.budget_limit||0),0),color:"#f87171",action:()=>le(!0)},{label:"Rutin",spent:Qe.reduce((a,t)=>a+(t.spent||0),0),budget:Qe.reduce((a,t)=>a+Number(t.budget_limit||0),0),color:"#fbbf24"},{label:"Tambahan",spent:Xe.reduce((a,t)=>a+(t.spent||0),0),budget:Xe.reduce((a,t)=>a+Number(t.budget_limit||0),0),color:"#f97316"}],S=Ra.filter(a=>Number(a.budget_limit)>0),N=Ha.filter(a=>a.spent>0),ge=S.length>0?Fa%S.length:0,se=N.length>0?Aa%N.length:0;m.useEffect(()=>{if(v||S.length<=1)return;const a=setInterval(()=>Ke(t=>(t+1)%S.length),2500);return()=>clearInterval(a)},[v,S.length]),m.useEffect(()=>{if(v||N.length<=1)return;const a=setInterval(()=>Oe(t=>(t+1)%N.length),3e3);return()=>clearInterval(a)},[v,N.length]);const pe=s.cumulativeBalance-s.cumulativeMandatoryBudget,K=(s.hutangList||[]).filter(a=>a.jenis==="hutang").reduce((a,t)=>a+Number(t.amount),0);s.salary-s.totalExpense-Te,s.salary>0&&s.totalExpense/s.salary*100;const Ve=s.salary>0?s.salary-Te:0;return Ve-s.totalExpense,s.salary>0&&Te>0&&s.totalExpense>Ve,e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"db-page",children:[e.jsxs("div",{className:"db-hero",children:[e.jsx("span",{className:"db-eyebrow",children:K>0?"SALDO BERSIH":"TOTAL SALDO"}),v?e.jsx("div",{className:"skeleton",style:{height:56,width:220,borderRadius:8,marginTop:6}}):e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:6},children:[e.jsxs("div",{className:`db-balance${pe-K<0?" neg":""}`,children:[pe-K<0&&e.jsx("span",{className:"db-neg-sign",children:"−"}),p(Math.abs(pe-K))]}),K>0&&_e&&e.jsxs("button",{className:"db-hutang-chip",onClick:()=>oe(!0),children:[e.jsx("span",{className:"db-hutang-chip-label",children:"+ hutang"}),e.jsx("span",{className:"db-hutang-chip-amount",children:p(pe)}),e.jsx("span",{className:"db-hutang-chip-arrow",children:"›"})]})]}),e.jsx("div",{className:"db-hero-chips",children:!v&&_e&&s.nextMonthPlans.length>0&&e.jsxs("button",{className:"db-rencana-chip",onClick:()=>H(!0),children:[e.jsx(Za,{size:11}),s.nextMonthPlans.length," rencana bulan depan"]})})]}),!v&&e.jsxs("div",{className:"db-stats-grid",children:[e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>{var a,t;de({amount:s.gajiTx?String(s.gajiTx.amount):"",note:((a=s.gajiTx)==null?void 0:a.description)||"",date:((t=s.gajiTx)==null?void 0:t.date)||`${o}-01`}),V(!0)},children:[e.jsx("span",{className:"db-stat-label",children:"PEMASUKAN"}),e.jsx("span",{className:"db-stat-val tabular",style:{color:s.salary>0?"#34d399":"var(--text-muted)"},children:s.salary>0?`+${p(s.salary)}`:"—"}),e.jsx("span",{className:"db-stat-sub",children:s.salary>0?"bulan ini":"belum dicatat"})]}),e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>we(!0),children:[e.jsx("span",{className:"db-stat-label",children:"TABUNGAN"}),S.length>0?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"db-stat-val tabular",style:{color:"#818cf8"},children:p(((Ze=S[ge])==null?void 0:Ze.budget_limit)||0)}),e.jsx("span",{className:"db-stat-sub",style:{color:(ea=S[ge])==null?void 0:ea.color},children:((aa=S[ge])==null?void 0:aa.name)||"—"}),S.length>1&&e.jsx("div",{className:"db-sub-dots",children:S.map((a,t)=>e.jsx("span",{className:`db-sub-dot${ge===t?" active":""}`,onClick:i=>{i.stopPropagation(),Ke(t)}},t))})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"db-stat-val tabular",style:{color:"var(--text-muted)"},children:"—"}),e.jsx("span",{className:"db-stat-sub",children:"belum diatur"})]})]}),e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>{var a,t;return(t=(a=N[se])==null?void 0:a.action)==null?void 0:t.call(a)},children:[e.jsx("span",{className:"db-stat-label",children:"PENGELUARAN"}),N.length>0?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"db-stat-val tabular",style:{color:"#f87171"},children:["−",p(((ta=N[se])==null?void 0:ta.spent)||0)]}),e.jsx("span",{className:"db-stat-sub",style:{color:(sa=N[se])==null?void 0:sa.color},children:(ra=N[se])==null?void 0:ra.label}),N.length>1&&e.jsx("div",{className:"db-sub-dots",children:N.map((a,t)=>e.jsx("span",{className:`db-sub-dot${se===t?" active":""}`,onClick:i=>{i.stopPropagation(),Oe(t)}},t))})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"db-stat-val tabular",style:{color:"var(--text-muted)"},children:"—"}),e.jsx("span",{className:"db-stat-sub",children:"belum ada"})]})]}),e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>H(!0),children:[e.jsx("span",{className:"db-stat-label",children:"RENCANA"}),e.jsx("span",{className:"db-stat-val tabular",style:{color:s.nextMonthPlans.length>0?"#fbbf24":"var(--text-muted)"},children:s.nextMonthPlans.length>0?s.nextMonthPlans.length:"—"}),e.jsx("span",{className:"db-stat-sub",children:s.nextMonthPlans.length>0?"rencana bulan depan":"belum ada rencana"})]})]}),v&&e.jsx("div",{className:"skeleton",style:{height:120,borderRadius:"var(--radius-lg)"}}),!v&&_e&&s.todayExpense>0&&(()=>{const a=d.budget_harian||0,t=s.todayExpense,i=a>0&&t>=a,c=a>0&&t/a>=.8&&!i,b=a>0&&!i&&!c,h=i?"#f87171":c?"#fbbf24":b?"#34d399":"#818cf8",_=i?"rgba(248,113,113,0.06)":c?"rgba(251,191,36,0.06)":b?"rgba(52,211,153,0.06)":"rgba(129,140,248,0.06)",n=i?"rgba(248,113,113,0.25)":c?"rgba(251,191,36,0.25)":b?"rgba(52,211,153,0.25)":"rgba(129,140,248,0.25)",g=a>0?Math.min(t/a*100,100):0;return e.jsxs("div",{className:"db-daily-card db-daily-card-clickable",style:{background:_,borderColor:n},onClick:()=>{Ee(a>0?String(a):""),te(!0)},children:[e.jsxs("div",{className:"db-daily-card-left",children:[e.jsx("span",{className:"db-daily-card-label",children:"PENGELUARAN HARI INI"}),e.jsxs("span",{className:"db-daily-card-amount tabular",style:{color:h},children:["−",p(t)]})]}),e.jsx("div",{className:"db-daily-card-right",children:a>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"db-daily-card-track",children:e.jsx("div",{className:"db-daily-card-fill",style:{width:`${g}%`,background:h}})}),e.jsxs("span",{className:"db-daily-card-sub",style:{color:h},children:[i?"Melebihi":c?"Hampir":`${Math.round(g)}%`," dari ",p(a)]})]}):e.jsx("span",{className:"db-daily-card-sub",style:{color:"#818cf8"},children:"Atur budget harian →"})})]})})(),(()=>{var _;const a=s.categories.filter(n=>!U(n)&&!fe(n)&&n.is_monthly&&(n.budget_limit>0||(n.spent||0)>0)),t=s.categories.filter(n=>!U(n)&&!fe(n)&&!n.is_monthly&&(n.budget_limit>0||(n.spent||0)>0)),i=(s.hutangList||[]).filter(n=>n.jenis==="hutang"),c=(s.hutangList||[]).filter(n=>n.jenis==="piutang"),b=!v&&a.length===0&&t.length===0&&i.length===0&&c.length===0,h=({cat:n})=>{const g=n.budget_limit>0?n.spent/n.budget_limit*100:0,M=Math.min(g,100),x=g>100,z=!x&&g>=100,f=!x&&g>=80&&g<100,C=x?"var(--danger)":z?"var(--success)":f?"var(--warning)":n.color||"var(--accent)",W=n.budget_limit-(n.spent||0),O=s.salary>0&&n.budget_limit>0?Math.round(n.budget_limit/s.salary*100):null,Me=n.budget_limit>0;return e.jsxs("div",{className:`brow${!Me&&n.spent>0?" brow-no-budget":""}`,children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${n.color||"#6366f1"}18`},children:e.jsx("span",{style:{width:10,height:10,borderRadius:"50%",background:n.color||"var(--accent)",display:"inline-block",flexShrink:0}})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("span",{className:"brow-name",children:n.name}),x&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Over"}),z&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Penuh"}),f&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Hampir"})]})]}),n.budget_limit>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"brow-bar-wrap",children:e.jsx("div",{className:"brow-bar",children:e.jsx("div",{className:"brow-bar-fill",style:{width:`${M}%`,background:C}})})}),e.jsxs("div",{className:"brow-right",onClick:()=>O&&Ia(be=>!be),style:{cursor:O?"pointer":"default"},children:[e.jsx("span",{className:"brow-spent tabular",style:{color:x?"var(--danger)":"var(--text-primary)"},children:p(n.spent||0)}),Ba&&O?e.jsxs("span",{className:"brow-limit tabular",style:{color:"var(--accent)"},children:[O,"% gaji"]}):e.jsx("span",{className:"brow-limit tabular",style:{color:W<0?"var(--danger)":W===0?"var(--text-muted)":"var(--success)"},children:W<0?`Over ${p(Math.abs(W))}`:`Sisa ${p(W)}`})]}),e.jsxs("span",{className:"brow-pct",style:{color:C},children:[g.toFixed(0),"%"]})]}):n.spent>0?e.jsxs("span",{className:"brow-only-spent tabular",style:{color:"var(--danger)"},children:["−",p(n.spent)]}):null]})};return e.jsxs(e.Fragment,{children:[!v&&$.length>0&&e.jsxs("div",{className:"db-alert",children:[e.jsx(et,{size:11}),e.jsxs("span",{children:["Overbudget — ",e.jsx("strong",{children:(_=$[Ce])==null?void 0:_.name})]}),$.length>1&&e.jsxs("span",{className:"db-alert-count",children:[Ce+1,"/",$.length]})]},Ce),e.jsxs("div",{className:"card dash-tab-card",children:[e.jsxs("div",{className:"sect-head",style:{marginBottom:16},children:[e.jsxs("div",{className:"dash-tab-toggle",children:[e.jsx("button",{className:`dash-tab-btn${ce==="transaction"?" active":""}`,onClick:()=>Re("transaction"),children:"My Transaction"}),e.jsx("button",{className:`dash-tab-btn${ce==="budget"?" active":""}`,onClick:()=>Re("budget"),children:"My Budget"})]}),e.jsxs("div",{className:"tab-actions",children:[e.jsxs(Y,{to:`/transactions?month=${o}`,className:"tab-act",children:[e.jsx(xe,{size:13}),e.jsx("span",{className:"tab-act-label",children:"Lihat semua"})]}),e.jsxs(Y,{to:`/categories?month=${o}`,className:"tab-act",children:[e.jsx(pa,{size:13}),e.jsx("span",{className:"tab-act-label",children:"Atur"})]}),e.jsxs("button",{className:"tab-act tab-act-accent",onClick:()=>R(!0),children:[e.jsx(ba,{size:13}),e.jsx("span",{className:"tab-act-label",children:"Transaksi"})]})]})]}),e.jsxs("div",{className:"card-scroll-body",children:[ce==="transaction"&&(v?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[...Array(4)].map((n,g)=>e.jsx("div",{className:"skeleton",style:{height:42}},g))}):s.transactions.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(ua,{size:13})}),e.jsx("span",{children:"Belum ada transaksi bulan ini."}),e.jsx("button",{className:"empty-hint-link",onClick:()=>R(!0),children:"Tambah sekarang →"})]}):e.jsx("div",{className:"tx-list",children:s.transactions.map(n=>{var g;return e.jsxs("div",{className:"tx-row",children:[e.jsx("div",{className:"tx-icon",style:{background:n.type==="income"?"rgba(52,211,153,0.12)":"rgba(248,113,113,0.12)",color:n.type==="income"?"var(--success)":"var(--danger)"},children:n.type==="income"?e.jsx(ua,{size:14}):e.jsx(ne,{size:14})}),e.jsxs("div",{className:"tx-meta",children:[e.jsx("span",{className:"tx-desc",children:n.description||((g=n.categories)==null?void 0:g.name)||"Transaksi"}),e.jsx("span",{className:"tx-date",children:new Date(n.date).toLocaleDateString("id-ID",{day:"numeric",month:"short"})})]}),e.jsxs("span",{className:`tx-amount tabular ${n.type==="income"?"inc":"exp"}`,children:[n.type==="income"?"+":"−",p(n.amount)]})]},n.id)})})),ce==="budget"&&(v?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(3)].map((n,g)=>e.jsx("div",{className:"skeleton",style:{height:44}},g))}):b?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(pa,{size:14})}),e.jsx("span",{children:"Tambahkan kategori dan budget"}),e.jsx(Y,{to:`/categories?month=${o}`,className:"empty-hint-link",style:{color:"var(--accent)"},children:"Atur →"})]}):e.jsxs(e.Fragment,{children:[(i.length>0||c.length>0)&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Hutang & Piutang"}),e.jsx("div",{className:"budget-rows",children:[...i,...c].map(n=>{const g=n.jenis==="piutang",M=g?"#f59e0b":"#f87171",x=new Date;x.setHours(0,0,0,0);const z=n.due_date?new Date(n.due_date):null,f=z?Math.round((z-x)/864e5):null,C=f!==null&&f<0;return e.jsxs("div",{className:"brow",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${M}18`,color:M},children:g?e.jsx(ha,{size:13}):e.jsx(xe,{size:13})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("span",{className:"brow-name",children:n.nama}),e.jsx("span",{style:{fontSize:"0.62rem",color:"var(--text-muted)",marginLeft:6},children:g?"piutang":"hutang"}),C&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Terlambat"})]})]}),e.jsx("div",{style:{flex:1}}),e.jsxs("div",{className:"brow-right",children:[e.jsx("span",{className:"brow-spent tabular",style:{color:M},children:p(n.amount)}),n.due_date&&e.jsx("span",{className:"brow-limit tabular",style:{color:C?"var(--danger)":f<=7?"var(--warning)":"var(--text-muted)"},children:f===0?"Hari ini":f>0?`${f}h lagi`:`${Math.abs(f)}h lalu`})]})]},n.id)})})]}),(i.length>0||c.length>0)&&a.length>0&&e.jsx("div",{style:{height:1,background:"var(--border)",margin:"12px 0"}}),a.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Pengeluaran Rutin"}),e.jsx("div",{className:"budget-rows",children:a.map(n=>e.jsx(h,{cat:n},n.id))})]}),(a.length>0||i.length>0||c.length>0)&&t.length>0&&e.jsx("div",{style:{height:1,background:"var(--border)",margin:"12px 0"}}),t.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Kategori Lainnya"}),e.jsx("div",{className:"budget-rows",children:t.map(n=>e.jsx(h,{cat:n},n.id))})]}):i.length===0&&c.length===0&&a.length===0&&e.jsxs("div",{style:{fontSize:"0.72rem",color:"var(--text-muted)"},children:["Belum ada kategori dengan budget. ",e.jsx(Y,{to:`/categories?month=${o}`,style:{color:"var(--accent)"},children:"Atur →"})]})]}))]})]})]})})()]}),Ta&&(()=>{const a=s.salary>0,t=async()=>{const i=parseFloat(A.amount.replace(/\D/g,""))||0;if(i){qe(!0);try{const c=A.date||`${o}-01`;if(s.gajiTx){const{error:b}=await u.from("transactions").update({amount:i,description:A.note,date:c}).eq("id",s.gajiTx.id);if(b)throw b}else{const{error:b}=await u.from("transactions").insert({user_id:d.id,category_id:s.gajiCatId,type:"income",amount:i,description:A.note,date:c});if(b)throw b}j("Pemasukan disimpan","success"),V(!1),L()}catch(c){j(c.message,"error")}finally{qe(!1)}}};return e.jsx("div",{className:"modal-overlay",onClick:()=>V(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:i=>i.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Pemasukan Bulanan ",B(o)]}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:a?"Edit jumlah atau catatan":"Catat pemasukan bulan ini"})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>V(!1),children:e.jsx(y,{size:16})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Jumlah Pemasukan"}),e.jsx(xa,{value:A.amount,onChange:i=>de(c=>({...c,amount:i})),autoFocus:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Tanggal Diterima"}),e.jsx("input",{className:"form-input",type:"date",value:A.date,min:`${o}-01`,max:(()=>{const[i,c]=o.split("-").map(Number);return new Date(i,c,0).toISOString().split("T")[0]})(),onChange:i=>de(c=>({...c,date:i.target.value}))})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Catatan ",!a&&e.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400},children:"(opsional)"})]}),e.jsx("textarea",{className:"form-input",rows:2,placeholder:"Misal: gaji pokok + bonus, tunjangan, dll...",value:A.note,onChange:i=>de(c=>({...c,note:i.target.value})),style:{resize:"vertical",fontFamily:"var(--font-sans)",fontSize:"0.875rem"}})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>V(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:t,disabled:We||!A.amount,children:We?"Menyimpan...":"Simpan"})]})]})})})(),Ca&&e.jsx("div",{className:"modal-overlay",onClick:()=>we(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Total Tabungan"}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Akumulasi s/d ",B(o)]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>we(!1),children:e.jsx(y,{size:16})})]}),e.jsxs("div",{className:"wajib-rows",children:[(d.tabungan_awal||0)>0&&e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)",fontSize:"0.55rem",fontWeight:800},children:"AWAL"}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:"Saldo Awal Tabungan"}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)"},children:"sebelum mulai record"})]})]}),e.jsx("span",{className:"wajib-amount tabular",style:{color:"var(--success)"},children:p(d.tabungan_awal)})]}),s.tabunganPerMonth.length===0&&!(d.tabungan_awal>0)?e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--text-muted)",padding:"8px 0"},children:'Belum ada alokasi tabungan. Set budget kategori "Tabungan Bulanan".'}):s.tabunganPerMonth.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)"},children:e.jsx(ne,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:B(a.month)}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)"},children:"Tabungan Bulanan"})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:Number(a.budget_limit)>0?"var(--success)":"var(--text-muted)"},children:["+",p(a.budget_limit)]})]},a.month)),s.hutangTabunganList.filter(a=>!a.lunas).length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"wajib-divider",style:{margin:"8px 0"}}),e.jsx("div",{style:{fontSize:"0.62rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"var(--text-muted)",marginBottom:4},children:"Outstanding bulan ini"}),s.hutangTabunganList.filter(a=>!a.lunas).map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:a.jenis==="piutang"?"rgba(245,158,11,0.1)":"rgba(248,113,113,0.1)",color:a.jenis==="piutang"?"var(--warning)":"var(--danger)",fontSize:"0.9rem"},children:a.jenis==="piutang"?e.jsx(ha,{size:13}):e.jsx(xe,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:a.nama}),e.jsx("div",{style:{fontSize:"0.62rem",color:"var(--text-muted)"},children:a.jenis==="hutang"?"Hutang":"Piutang"})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",p(a.amount)]})]},a.id))]}),e.jsx("div",{className:"wajib-divider",style:{margin:"10px 0"}}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:4},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Tabungan"}),e.jsx("span",{className:"wajib-amount tabular",style:{color:s.totalTabungan>0?"var(--success)":"var(--text-muted)",fontWeight:800},children:p(s.totalTabungan)})]})]})]})}),_a&&e.jsx("div",{className:"modal-overlay",onClick:()=>H(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Rencana Bulan Depan"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:B(je(o))})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx(Y,{to:"/savings",className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>H(!1),children:"Kelola →"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>H(!1),children:e.jsx(y,{size:16})})]})]}),s.nextMonthPlans.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(xe,{size:13})}),e.jsxs("span",{children:["Belum ada rencana untuk ",B(je(o)),"."]}),e.jsx(Y,{to:"/savings",className:"empty-hint-link",onClick:()=>H(!1),children:"Tambah →"})]}):e.jsxs("div",{className:"wajib-rows",children:[s.nextMonthPlans.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsx("span",{className:"brow-name",children:a.name}),e.jsx("span",{className:"wajib-amount tabular",children:p(a.amount)})]},a.id)),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total"}),e.jsx("span",{className:"wajib-amount tabular",children:p(s.nextMonthPlans.reduce((a,t)=>a+Number(t.amount),0))})]})]})]})}),Ma&&e.jsx("div",{className:"modal-overlay",onClick:()=>{oe(!1),Z(null),F(null)},children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:a=>a.stopPropagation(),children:[!w&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Detail Pinjaman"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>oe(!1),children:e.jsx(y,{size:16})})]}),e.jsxs("div",{className:"wajib-rows",children:[(s.hutangList||[]).filter(a=>a.jenis==="hutang").map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(251,191,36,0.1)",color:"#fbbf24"},children:e.jsx(ne,{size:13})}),e.jsx("span",{className:"brow-name",children:a.nama})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("span",{className:"wajib-amount tabular",children:p(Number(a.amount))}),e.jsx("button",{className:"btn btn-sm",style:{fontSize:"0.65rem",padding:"3px 10px",background:"rgba(52,211,153,0.12)",color:"#34d399",border:"1px solid rgba(52,211,153,0.25)",borderRadius:99},onClick:()=>{Z(a),F(null),ae(null)},children:"Bayar"})]})]},a.id)),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Pinjaman"}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"#fbbf24"},children:["−",p(K)]})]})]})]}),w&&!E&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Hutang Terbayar"}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[w.nama," · ",p(w.amount)]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>Z(null),children:e.jsx(y,{size:16})})]}),e.jsx("p",{style:{fontSize:"0.78rem",color:"var(--text-muted)",marginBottom:14},children:"Bayar dari mana?"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsxs("button",{className:"btn btn-secondary",style:{justifyContent:"flex-start",gap:10},onClick:()=>F("tabungan"),children:[e.jsx("span",{style:{fontSize:"1rem"},children:"🏦"}),e.jsxs("div",{style:{textAlign:"left"},children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.82rem"},children:"Tabungan"}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)",fontWeight:400},children:"Kurangi dari kantong tabungan"})]})]}),e.jsxs("button",{className:"btn btn-secondary",style:{justifyContent:"flex-start",gap:10},onClick:()=>F("saldo"),children:[e.jsx("span",{style:{fontSize:"1rem"},children:"💳"}),e.jsxs("div",{style:{textAlign:"left"},children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.82rem"},children:"Saldo"}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)",fontWeight:400},children:"Bayar langsung dari saldo"})]})]})]})]}),w&&E==="tabungan"&&!ee&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Pilih Tabungan"}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[p(w.amount)," akan dikurangi"]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>F(null),children:e.jsx(y,{size:16})})]}),e.jsx("div",{className:"wajib-rows",children:(s.savings||[]).map(a=>e.jsxs("div",{className:"wajib-row",style:{cursor:"pointer"},onClick:()=>ae(a.id),children:[e.jsx("span",{className:"brow-name",children:a.name}),e.jsx("span",{className:"wajib-amount tabular",style:{color:Number(a.current_amount)>=Number(w.amount)?"#34d399":"#f87171"},children:p(Number(a.current_amount))})]},a.id))})]}),w&&E&&(E==="saldo"||ee)&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{children:e.jsx("h2",{className:"modal-title",children:"Konfirmasi"})}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>{E==="saldo"?F(null):ae(null)},children:e.jsx(y,{size:16})})]}),e.jsxs("div",{style:{fontSize:"0.82rem",color:"var(--text-muted)",lineHeight:1.6,marginBottom:16},children:["Tandai hutang ke ",e.jsx("strong",{style:{color:"var(--text-primary)"},children:w.nama})," sebesar"," ",e.jsx("strong",{style:{color:"#fbbf24"},children:p(w.amount)})," sebagai ",e.jsx("strong",{style:{color:"#34d399"},children:"lunas"}),E==="tabungan"&&e.jsxs(e.Fragment,{children:[" dari tabungan ",e.jsx("strong",{style:{color:"var(--text-primary)"},children:(na=(s.savings||[]).find(a=>a.id===ee))==null?void 0:na.name})]}),"?"]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"flex-end"},children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>{Z(null),F(null),ae(null)},children:"Batal"}),e.jsx("button",{className:"btn btn-primary",disabled:Ae,onClick:async()=>{De(!0);try{if(E==="tabungan"){const a=(s.savings||[]).find(t=>t.id===ee);await u.from("savings").update({current_amount:Number(a.current_amount)-Number(w.amount)}).eq("id",ee)}await u.from("hutang").update({lunas:!0}).eq("id",w.id),await L(),oe(!1),Z(null),F(null),ae(null)}finally{De(!1)}},children:Ae?"Menyimpan...":"Konfirmasi Lunas"})]})]})]})}),Pa&&e.jsx("div",{className:"modal-overlay",onClick:()=>te(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:340},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Budget Harian"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:"Batas pengeluaran per hari"})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>te(!1),children:e.jsx(y,{size:16})})]}),e.jsxs("div",{style:{padding:"4px 0 8px"},children:[e.jsx("label",{style:{fontSize:"0.72rem",color:"var(--text-muted)",display:"block",marginBottom:6},children:"Jumlah per hari"}),e.jsx("input",{className:"form-input",type:"number",placeholder:"cth: 50000",value:Ne,onChange:a=>Ee(a.target.value),autoFocus:!0})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8},children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>te(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",disabled:Le||!Ne,onClick:async()=>{$e(!0);try{await J({budget_harian:parseFloat(Ne)||0}),te(!1)}finally{$e(!1)}},children:Le?"Menyimpan...":"Simpan"})]})]})}),za&&e.jsx("div",{className:"modal-overlay",onClick:()=>le(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:420},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Pengeluaran Tetap"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:B(o)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>{le(!1),ve(!0)},children:"Kelola"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>le(!1),children:e.jsx(y,{size:16})})]})]}),e.jsxs("div",{className:"wajib-rows",children:[s.categories.filter(a=>U(a)).map(a=>{const t=Number(a.budget_limit||0),i=s.salary>0&&t>0?Math.round(t/s.salary*100):null;return e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:e.jsx(ne,{size:13})}),e.jsx("span",{className:"brow-name",children:a.name})]}),e.jsxs("div",{className:"wajib-right",children:[i&&e.jsxs("span",{className:"wajib-pct",children:[i,"%"]}),e.jsx("span",{className:"wajib-amount tabular",children:t>0?p(t):"—"})]})]},a.id)}),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Potongan"}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",p(Ye)]})]})]})]})}),Na&&e.jsx("div",{className:"modal-overlay",onClick:()=>R(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>R(!1),children:e.jsx(y,{size:16})})]}),e.jsx(at,{month:o,onSuccess:()=>{L(),R(!1)},onClose:()=>R(!1)})]})}),ka&&!k&&!Fe&&e.jsx("div",{className:"modal-overlay",onClick:()=>ve(!1),children:e.jsxs("div",{className:"modal cat-manager-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Kelola Kategori"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:B(o)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsxs("button",{className:"btn btn-primary btn-sm",onClick:()=>{Sa({is_mandatory:!0}),Q(!0)},children:[e.jsx(ba,{size:13})," Kategori"]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>ve(!1),children:e.jsx(y,{size:16})})]})]}),e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("p",{className:"cat-mgr-section-title",children:"Pengeluaran Wajib"}),e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:s.categories.filter(a=>U(a)).map(a=>{const t=Number(a.budget_limit)||0,i=s.salary>0&&t>0?Math.round(t/s.salary*100):null;return e.jsxs("div",{className:"cat-mgr-row",children:[e.jsxs("div",{className:"cat-mgr-left",children:[e.jsx("span",{className:"cat-mgr-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:e.jsx(ne,{size:14})}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-mgr-name",children:a.name}),e.jsx("span",{className:"cat-mgr-sub",children:"Wajib · langsung dipotong"})]})]}),e.jsxs("div",{className:"cat-mgr-right",children:[i&&e.jsxs("span",{className:"cat-mgr-pct",children:[i,"%"]}),e.jsx("span",{className:"cat-mgr-amount tabular",children:t>0?p(t):"—"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.7rem"},onClick:()=>Da(a),children:"Ubah"})]})]},a.id)})})]})]})}),k&&(()=>{const a=s.categories.find(t=>t.id===k.id);return e.jsx("div",{className:"modal-overlay",onClick:()=>I(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Pengeluaran Wajib — ",a==null?void 0:a.name]}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[B(o),s.salary>0?` · ${p(s.salary)}`:""]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>I(null),children:e.jsx(y,{size:16})})]}),s.salary>0&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx("input",{className:"form-input",type:"number",placeholder:String(lt),value:k.pct,onChange:t=>Ge(t.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),e.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),k.pct&&s.salary>0&&e.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",p(Math.round(parseFloat(k.pct)/100*s.salary))]})]}),!k.pct&&e.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(t=>e.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>Ge(String(t)),children:[t,"%"]},t))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),e.jsx(xa,{value:k.nominal,onChange:Ea,autoFocus:!s.salary})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:16},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)",fontSize:"0.78rem"},onClick:()=>{I(null),ye({id:a.id,name:a.name})},children:"Hapus Kategori"}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>I(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",onClick:La,children:"Simpan"})]})]})]})})})(),X&&e.jsx(it,{title:"Hapus Kategori",message:`Hapus kategori "${X.name}"? Semua transaksi kategori ini juga akan terhapus.`,confirmLabel:"Hapus",onConfirm:$a,onCancel:()=>ye(null)}),Fe&&e.jsx("div",{className:"modal-overlay",onClick:()=>Q(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:ie!=null&&ie.id?"Edit Kategori":"Kategori Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>Q(!1),children:e.jsx(y,{size:16})})]}),e.jsx(tt,{editData:ie,salary:s.salary,month:o,onSuccess:()=>{L(),Q(!1)},onClose:()=>Q(!1)})]})}),e.jsx("style",{children:`
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
      `})]})}export{pt as default};
