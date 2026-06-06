import{F as Sa,H as Ca,K as Ta,J as Ma,D as g,w as X,B as e,z as S,G as Pa,y as ea,A as Ba,E as u,v as p,f as Ia,I as Aa,L as G,d as oe,n as aa,m as ta,c as sa,a as le,b as ra,s as I,C as na}from"./index-BpWy567X.js";import{T as Fa}from"./TransactionForm-h2Lt-fT6.js";import{C as Da}from"./CategoryForm-CfJMWfnJ.js";import{a as de,d as ke,i as Y,f as Ea,c as $a,e as La,C as Wa}from"./ConfirmModal-BfITtd0e.js";const qa=15;function Ra(d){const[L,v]=d.split("-").map(Number),A=new Date(L,v-2,1);return`${A.getFullYear()}-${String(A.getMonth()+1).padStart(2,"0")}`}function ce(d){const[L,v]=d.split("-").map(Number),A=new Date(L,v,1);return`${A.getFullYear()}-${String(A.getMonth()+1).padStart(2,"0")}`}function Ya(){var We,qe,Re,He,Ke,Oe,Ge,Ye;const{user:d}=Sa(),{setHeader:L}=Ca(),v=Ta(),[A,ia]=Ma(),[l,oa]=g.useState(()=>A.get("month")||X()),[s,la]=g.useState({salary:0,totalExpense:0,totalIncome:0,categories:[],transactions:[],savings:[],savingsLogs:[],categorySpend:[],hutangList:[],hutangTabunganList:[],todayExpense:0,totalTabungan:0,tabunganPerMonth:[],nextMonthPlans:[],cumulativeBalance:0,cumulativeMandatoryBudget:0,gajiTx:null,gajiCatId:null}),[f,ze]=g.useState(!0),[da,W]=g.useState(!1),[ca,me]=g.useState(!1),[j,C]=g.useState(null),[_e,U]=g.useState(!1),[V,ma]=g.useState(null),[J,ge]=g.useState(null),[ga,Z]=g.useState(!1),[pa,pe]=g.useState(!1),[ba,q]=g.useState(!1),[ua,Q]=g.useState(!1),[T,ee]=g.useState({amount:"",note:"",date:""}),[Se,Ce]=g.useState(!1),[be,ue]=g.useState(!1),[k,he]=g.useState(()=>Number(X().split("-")[0])),[ha,xa]=g.useState(!1),[ae,Te]=g.useState("transaction"),[xe,Me]=g.useState(0),[R,Pe]=g.useState(0),[F,Be]=g.useState(0);g.useEffect(()=>{if(d.recording_start_month&&l<d.recording_start_month){te(d.recording_start_month);return}H()},[l,d==null?void 0:d.recording_start_month]),g.useEffect(()=>{const a=l===X(),t=!!d.recording_start_month&&l<=d.recording_start_month,[i,c]=d.recording_start_month?d.recording_start_month.split("-").map(Number):[0,0],b=X(),[N,P]=b.split("-").map(Number),n=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];return L(e.jsxs(e.Fragment,{children:[be&&e.jsx("div",{style:{position:"fixed",inset:0,zIndex:299},onClick:()=>ue(!1)}),e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>te(Ra(l)),disabled:t,children:"‹"}),e.jsx("span",{className:"month-label-text month-label-clickable",onClick:()=>{he(Number(l.split("-")[0])),ue(m=>!m)},children:S(l)}),e.jsx("button",{className:"month-btn",onClick:()=>te(ce(l)),disabled:a,children:"›"}),be&&e.jsxs("div",{className:"month-picker-popup",onMouseDown:m=>m.preventDefault(),children:[e.jsxs("div",{className:"mp-year-row",children:[e.jsx("button",{className:"mp-year-btn",onClick:()=>he(m=>m-1),disabled:!!d.recording_start_month&&k<=i,children:"‹"}),e.jsx("span",{className:"mp-year-label",children:k}),e.jsx("button",{className:"mp-year-btn",onClick:()=>he(m=>m+1),disabled:k>=N,children:"›"})]}),e.jsx("div",{className:"mp-grid",children:n.map((m,z)=>{const h=z+1,y=`${k}-${String(h).padStart(2,"0")}`,x=k>N||k===N&&h>P,w=!!d.recording_start_month&&(k<i||k===i&&h<c);return e.jsx("button",{className:`mp-month-btn${y===l?" mp-active":""}`,disabled:x||w,onClick:()=>{te(y),ue(!1)},children:m},y)})})]})]})]})),()=>L(null)},[l,be,k,d==null?void 0:d.recording_start_month]),Pa();const te=a=>{oa(a),ia({month:a})},H=async()=>{ze(!0);try{const a=`${l}-01`,t=ea(l),i=Ba(),c=ce(l),b=d.recording_start_month;let N=u.from("transactions").select("amount, type").eq("user_id",d.id).lt("date",a);b&&(N=N.gte("date",`${b}-01`));let P=u.from("category_budgets").select("budget_limit, category_id, month, categories(is_mandatory, name, category_type)").eq("user_id",d.id).lte("month",l);b&&(P=P.gte("month",b));const[n,m,z,h,y,x,w,$,K,ye,re]=await Promise.all([u.from("transactions").select("*, categories(name, color, icon)").eq("user_id",d.id).gte("date",a).lte("date",t).order("date",{ascending:!1}),Promise.all([u.from("categories").select("*").eq("user_id",d.id).is("month",null),u.from("categories").select("*").eq("user_id",d.id).eq("month",l)]).then(([r,o])=>{const _=[...r.data||[],...o.data||[]].sort((ie,_a)=>ie.name.localeCompare(_a.name)),Ze=new Set;return{data:_.filter(ie=>Ze.has(ie.name)?!1:(Ze.add(ie.name),!0))}}),u.from("savings").select("*").eq("user_id",d.id),u.from("savings_log").select("*").eq("user_id",d.id).eq("month",l),u.from("transactions").select("amount").eq("user_id",d.id).eq("date",i).eq("type","expense"),u.from("category_budgets").select("category_id, budget_limit").eq("user_id",d.id).eq("month",l),P,u.from("plans").select("*").eq("user_id",d.id).eq("target_month",c).eq("done",!1).order("created_at",{ascending:!0}),N,u.from("hutang").select("id, nama, amount, due_date, sumber, jenis, lunas").eq("user_id",d.id).lte("month",l).eq("lunas",!1).order("due_date",{ascending:!0,nullsFirst:!1}),u.from("hutang").select("id, nama, amount, jenis, lunas, created_at").eq("user_id",d.id).lte("month",l).eq("sumber","tabungan").order("created_at",{ascending:!1})]),O=n.data||[],we={};(x.data||[]).forEach(r=>{we[r.category_id]=Number(r.budget_limit)});let Ue=(m.data||[]).map(r=>{const o=we[r.id]!==void 0?we[r.id]:0;return{...r,budget_limit:o,budget_set:o>0}});const B=Ue.find(r=>de(r)),Je=B?O.filter(r=>r.type==="income"&&r.category_id===B.id):[],Qe=Je.reduce((r,o)=>r+Number(o.amount),0),ka=Ue,Xe=O.filter(r=>r.type==="expense").reduce((r,o)=>r+Number(o.amount),0),Ve=O.filter(r=>r.type==="income"&&r.category_id!==(B==null?void 0:B.id)).reduce((r,o)=>r+Number(o.amount),0),Ne={};O.filter(r=>r.type==="expense"&&r.category_id).forEach(r=>{Ne[r.category_id]=(Ne[r.category_id]||0)+Number(r.amount)});const ne={};O.filter(r=>r.type==="expense"&&r.categories).forEach(r=>{const o=r.categories.name;ne[o]||(ne[o]={name:o,amount:0,color:r.categories.color,icon:r.categories.icon}),ne[o].amount+=Number(r.amount)});const za=ka.map(r=>{const o=Ne[r.id]||0,_=r.budget_limit>0?o/r.budget_limit*100:null;return{...r,spent:o,pct:_,overBudget:r.budget_limit>0&&o>r.budget_limit}}).sort((r,o)=>r.overBudget&&!o.overBudget?-1:!r.overBudget&&o.overBudget?1:(o.pct||0)-(r.pct||0));la({salary:Qe,totalExpense:Xe,totalIncome:Ve,categories:za,transactions:O.slice(0,5),savings:z.data||[],savingsLogs:h.data||[],todayExpense:(y.data||[]).reduce((r,o)=>r+Number(o.amount),0),tabunganPerMonth:(w.data||[]).filter(r=>{var o,_;return(((o=r.categories)==null?void 0:o.category_type)==="savings"||((_=r.categories)==null?void 0:_.name)==="Tabungan Bulanan")&&Number(r.budget_limit)>0}).sort((r,o)=>r.month.localeCompare(o.month)),totalTabungan:(w.data||[]).filter(r=>{var o,_;return((o=r.categories)==null?void 0:o.category_type)==="savings"||((_=r.categories)==null?void 0:_.name)==="Tabungan Bulanan"}).reduce((r,o)=>r+Number(o.budget_limit),0)+(d.tabungan_awal||0)-(re.data||[]).filter(r=>!r.lunas).reduce((r,o)=>r+Number(o.amount),0),categorySpend:Object.values(ne).sort((r,o)=>o.amount-r.amount),nextMonthPlans:$.data||[],gajiTx:Je[0]||null,gajiCatId:(B==null?void 0:B.id)||null,hutangList:ye.data||[],hutangTabunganList:re.data||[],cumulativeBalance:(K.data||[]).reduce((r,o)=>r+(o.type==="income"?Number(o.amount):-Number(o.amount)),0)+Qe+Ve-Xe+(d.saldo_awal||0),cumulativeMandatoryBudget:(w.data||[]).filter(r=>{var o;return((o=r.categories)==null?void 0:o.is_mandatory)===!0}).reduce((r,o)=>r+Number(o.budget_limit),0)})}finally{ze(!1)}},fa=a=>{const t=String(Math.round(a.budget_limit||0)),i=s.salary>0&&a.budget_limit>0?(a.budget_limit/s.salary*100).toFixed(1):"";C({id:a.id,nominal:t,pct:i})},va=a=>{const t=parseFloat(a)||0,i=s.salary>0&&t>0?(t/s.salary*100).toFixed(1):"";C(c=>({...c,nominal:a,pct:i}))},Ie=a=>{const t=parseFloat(a)||0,i=s.salary>0&&t>0?String(Math.round(t/100*s.salary)):"";C(c=>({...c,pct:a,nominal:i}))},ja=async()=>{const a=parseFloat(j.nominal)||0,[t,i]=await Promise.all([u.from("category_budgets").upsert({user_id:d.id,category_id:j.id,month:l,budget_limit:a},{onConflict:"category_id,month"}),u.from("categories").update({budget_limit:a}).eq("id",j.id)]),c=t.error||i.error;if(c){v(c.message,"error");return}v("Budget disimpan","success"),C(null),H()},ya=async()=>{const a=`${l}-01`,t=ea(l),[i,c]=await Promise.all([u.from("transactions").delete().eq("category_id",J.id).gte("date",a).lte("date",t),u.from("category_budgets").delete().eq("category_id",J.id).eq("month",l)]);if(i.error||c.error){v((i.error||c.error).message,"error");return}const{error:b}=await u.from("categories").delete().eq("id",J.id);if(b){v(b.message,"error");return}v("Kategori dihapus","success"),ge(null),H()};s.categories.filter(a=>a.budget_limit>0).reduce((a,t)=>a+t.budget_limit,0),X();const D=s.categories.filter(a=>a.overBudget);g.useEffect(()=>{if(D.length<=1){Me(0);return}const a=setInterval(()=>Me(t=>(t+1)%D.length),2e3);return()=>clearInterval(a)},[D.length]);const fe=s.categories.filter(a=>ke(a)).length;g.useEffect(()=>{if(f||fe<=1)return;const a=setInterval(()=>Pe(t=>(t+1)%fe),2500);return()=>clearInterval(a)},[f,fe]),g.useEffect(()=>{if(f)return;const a=setInterval(()=>Be(t=>(t+1)%3),3e3);return()=>clearInterval(a)},[f]);const Ae=s.categories.filter(a=>Y(a)).reduce((a,t)=>a+Number(t.budget_limit||0),0),wa=s.categories.filter(a=>Y(a)).reduce((a,t)=>a+(t.spent||0),0),Na=Math.max(0,Ae-wa),Fe=s.totalExpense+Na;s.salary+s.totalIncome-Fe,s.salary>0&&Fe/s.salary*100;const ve=s.categories.filter(a=>ke(a)&&a.budget_limit>0).reduce((a,t)=>a+Number(t.budget_limit),0);s.categories.filter(a=>de(a));const M=s.categories.filter(a=>ke(a)),De=s.categories.filter(a=>Ea(a)),Ee=s.categories.filter(a=>$a(a)),$e=s.categories.filter(a=>La(a)),E=[{label:"Wajib",spent:De.reduce((a,t)=>a+(t.spent||0),0),budget:De.reduce((a,t)=>a+Number(t.budget_limit||0),0),color:"#f87171",action:()=>Z(!0)},{label:"Rutin",spent:Ee.reduce((a,t)=>a+(t.spent||0),0),budget:Ee.reduce((a,t)=>a+Number(t.budget_limit||0),0),color:"#fbbf24"},{label:"Tambahan",spent:$e.reduce((a,t)=>a+(t.spent||0),0),budget:$e.reduce((a,t)=>a+Number(t.budget_limit||0),0),color:"#f97316"}],se=s.cumulativeBalance-s.cumulativeMandatoryBudget,je=(s.hutangList||[]).filter(a=>a.jenis==="hutang").reduce((a,t)=>a+Number(t.amount),0);s.salary-s.totalExpense-ve,s.salary>0&&s.totalExpense/s.salary*100;const Le=s.salary>0?s.salary-ve:0;return Le-s.totalExpense,s.salary>0&&ve>0&&s.totalExpense>Le,e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"db-page",children:[e.jsxs("div",{className:"db-hero",children:[e.jsx("span",{className:"db-eyebrow",children:"TOTAL SALDO"}),f?e.jsx("div",{className:"skeleton",style:{height:56,width:220,borderRadius:8,marginTop:6}}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:`db-balance${se<0?" neg":""}${je>0&&se>=0?" hutang":""}`,children:[se<0&&e.jsx("span",{className:"db-neg-sign",children:"−"}),p(Math.abs(se))]}),je>0&&e.jsxs("span",{className:"db-hutang-note",children:["⚠ termasuk hutang ",p(je)]})]}),e.jsxs("div",{className:"db-hero-chips",children:[!f&&s.todayExpense>0&&e.jsx("div",{className:"db-daily",children:(()=>{const a=d.budget_harian||0,t=s.todayExpense,i=a>0&&t>=a,c=a>0&&t/a>=.8&&!i,b=i?"#f87171":c?"#fbbf24":"var(--text-primary)";return e.jsxs(e.Fragment,{children:[e.jsxs("span",{style:{color:b},children:["Hari ini −",p(t)]}),i&&e.jsx("span",{className:"db-daily-badge",style:{background:"rgba(248,113,113,0.1)",color:"#f87171"},children:"melebihi limit"}),c&&e.jsx("span",{className:"db-daily-badge",style:{background:"rgba(251,191,36,0.1)",color:"#fbbf24"},children:"hampir limit"})]})})()}),!f&&s.nextMonthPlans.length>0&&e.jsxs("button",{className:"db-rencana-chip",onClick:()=>q(!0),children:[e.jsx(Ia,{size:11}),s.nextMonthPlans.length," rencana bulan depan"]})]})]}),!f&&e.jsxs("div",{className:"db-stats-grid",children:[e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>{var a,t;ee({amount:s.gajiTx?String(s.gajiTx.amount):"",note:((a=s.gajiTx)==null?void 0:a.description)||"",date:((t=s.gajiTx)==null?void 0:t.date)||`${l}-01`}),Q(!0)},children:[e.jsx("span",{className:"db-stat-label",children:"PEMASUKAN"}),e.jsx("span",{className:"db-stat-val tabular",style:{color:s.salary>0?"#34d399":"var(--text-muted)"},children:s.salary>0?`+${p(s.salary)}`:"—"}),e.jsx("span",{className:"db-stat-sub",children:s.salary>0?"bulan ini":"belum dicatat"})]}),e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>pe(!0),children:[e.jsx("span",{className:"db-stat-label",children:"TABUNGAN"}),M.length>0?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"db-stat-val tabular",style:{color:(((We=M[R])==null?void 0:We.budget_limit)||0)>0?"#818cf8":"var(--text-muted)"},children:(((qe=M[R])==null?void 0:qe.budget_limit)||0)>0?p(M[R].budget_limit):"—"}),e.jsx("span",{className:"db-stat-sub",style:{color:(Re=M[R])==null?void 0:Re.color},children:((He=M[R])==null?void 0:He.name)||"—"})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"db-stat-val tabular",style:{color:"var(--text-muted)"},children:"—"}),e.jsx("span",{className:"db-stat-sub",children:"belum diatur"})]}),M.length>1&&e.jsx("div",{className:"db-sub-dots",children:M.map((a,t)=>e.jsx("span",{className:`db-sub-dot${R===t?" active":""}`,onClick:i=>{i.stopPropagation(),Pe(t)}},t))})]}),e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>{var a,t;return(t=(a=E[F])==null?void 0:a.action)==null?void 0:t.call(a)},children:[e.jsx("span",{className:"db-stat-label",children:"PENGELUARAN"}),e.jsx("span",{className:"db-stat-val tabular",style:{color:(((Ke=E[F])==null?void 0:Ke.spent)||0)>0?"#f87171":"var(--text-muted)"},children:(((Oe=E[F])==null?void 0:Oe.spent)||0)>0?`−${p(E[F].spent)}`:"—"}),e.jsx("span",{className:"db-stat-sub",style:{color:(Ge=E[F])==null?void 0:Ge.color},children:(Ye=E[F])==null?void 0:Ye.label}),e.jsx("div",{className:"db-sub-dots",children:E.map((a,t)=>e.jsx("span",{className:`db-sub-dot${F===t?" active":""}`,onClick:i=>{i.stopPropagation(),Be(t)}},t))})]}),e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>q(!0),children:[e.jsx("span",{className:"db-stat-label",children:"RENCANA"}),e.jsx("span",{className:"db-stat-val tabular",style:{color:s.nextMonthPlans.length>0?"#fbbf24":"var(--text-muted)"},children:s.nextMonthPlans.length>0?s.nextMonthPlans.length:"—"}),e.jsx("span",{className:"db-stat-sub",children:s.nextMonthPlans.length>0?"rencana bulan depan":"belum ada rencana"})]})]}),f&&e.jsx("div",{className:"skeleton",style:{height:120,borderRadius:"var(--radius-lg)"}}),(()=>{var P;const a=s.categories.filter(n=>!Y(n)&&!de(n)&&n.is_monthly&&(n.budget_limit>0||(n.spent||0)>0)),t=s.categories.filter(n=>!Y(n)&&!de(n)&&!n.is_monthly&&(n.budget_limit>0||(n.spent||0)>0)),i=(s.hutangList||[]).filter(n=>n.jenis==="hutang"),c=(s.hutangList||[]).filter(n=>n.jenis==="piutang"),b=!f&&a.length===0&&t.length===0&&i.length===0&&c.length===0,N=({cat:n})=>{const m=n.budget_limit>0?n.spent/n.budget_limit*100:0,z=Math.min(m,100),h=m>100,y=!h&&m>=100,x=!h&&m>=80&&m<100,w=h?"var(--danger)":y?"var(--success)":x?"var(--warning)":n.color||"var(--accent)",$=n.budget_limit-(n.spent||0),K=s.salary>0&&n.budget_limit>0?Math.round(n.budget_limit/s.salary*100):null,ye=n.budget_limit>0;return e.jsxs("div",{className:`brow${!ye&&n.spent>0?" brow-no-budget":""}`,children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${n.color||"#6366f1"}18`},children:e.jsx("span",{style:{width:10,height:10,borderRadius:"50%",background:n.color||"var(--accent)",display:"inline-block",flexShrink:0}})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("span",{className:"brow-name",children:n.name}),h&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Over"}),y&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Penuh"}),x&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Hampir"})]})]}),n.budget_limit>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"brow-bar-wrap",children:e.jsx("div",{className:"brow-bar",children:e.jsx("div",{className:"brow-bar-fill",style:{width:`${z}%`,background:w}})})}),e.jsxs("div",{className:"brow-right",onClick:()=>K&&xa(re=>!re),style:{cursor:K?"pointer":"default"},children:[e.jsx("span",{className:"brow-spent tabular",style:{color:h?"var(--danger)":"var(--text-primary)"},children:p(n.spent||0)}),ha&&K?e.jsxs("span",{className:"brow-limit tabular",style:{color:"var(--accent)"},children:[K,"% gaji"]}):e.jsx("span",{className:"brow-limit tabular",style:{color:$<0?"var(--danger)":$===0?"var(--text-muted)":"var(--success)"},children:$<0?`Over ${p(Math.abs($))}`:`Sisa ${p($)}`})]}),e.jsxs("span",{className:"brow-pct",style:{color:w},children:[m.toFixed(0),"%"]})]}):n.spent>0?e.jsxs("span",{className:"brow-only-spent tabular",style:{color:"var(--danger)"},children:["−",p(n.spent)]}):null]})};return e.jsxs(e.Fragment,{children:[!f&&D.length>0&&e.jsxs("div",{className:"db-alert",children:[e.jsx(Aa,{size:11}),e.jsxs("span",{children:["Overbudget — ",e.jsx("strong",{children:(P=D[xe])==null?void 0:P.name})]}),D.length>1&&e.jsxs("span",{className:"db-alert-count",children:[xe+1,"/",D.length]})]},xe),e.jsxs("div",{className:"card dash-tab-card",children:[e.jsxs("div",{className:"sect-head",style:{marginBottom:16},children:[e.jsxs("div",{className:"dash-tab-toggle",children:[e.jsx("button",{className:`dash-tab-btn${ae==="transaction"?" active":""}`,onClick:()=>Te("transaction"),children:"My Transaction"}),e.jsx("button",{className:`dash-tab-btn${ae==="budget"?" active":""}`,onClick:()=>Te("budget"),children:"My Budget"})]}),e.jsxs("div",{className:"tab-actions",children:[e.jsxs(G,{to:`/transactions?month=${l}`,className:"tab-act",children:[e.jsx(oe,{size:13}),e.jsx("span",{className:"tab-act-label",children:"Lihat semua"})]}),e.jsxs(G,{to:`/categories?month=${l}`,className:"tab-act",children:[e.jsx(aa,{size:13}),e.jsx("span",{className:"tab-act-label",children:"Atur"})]}),e.jsxs("button",{className:"tab-act tab-act-accent",onClick:()=>W(!0),children:[e.jsx(ta,{size:13}),e.jsx("span",{className:"tab-act-label",children:"Transaksi"})]})]})]}),e.jsxs("div",{className:"card-scroll-body",children:[ae==="transaction"&&(f?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[...Array(4)].map((n,m)=>e.jsx("div",{className:"skeleton",style:{height:42}},m))}):s.transactions.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(sa,{size:13})}),e.jsx("span",{children:"Belum ada transaksi bulan ini."}),e.jsx("button",{className:"empty-hint-link",onClick:()=>W(!0),children:"Tambah sekarang →"})]}):e.jsx("div",{className:"tx-list",children:s.transactions.map(n=>{var m;return e.jsxs("div",{className:"tx-row",children:[e.jsx("div",{className:"tx-icon",style:{background:n.type==="income"?"rgba(52,211,153,0.12)":"rgba(248,113,113,0.12)",color:n.type==="income"?"var(--success)":"var(--danger)"},children:n.type==="income"?e.jsx(sa,{size:14}):e.jsx(le,{size:14})}),e.jsxs("div",{className:"tx-meta",children:[e.jsx("span",{className:"tx-desc",children:n.description||((m=n.categories)==null?void 0:m.name)||"Transaksi"}),e.jsx("span",{className:"tx-date",children:new Date(n.date).toLocaleDateString("id-ID",{day:"numeric",month:"short"})})]}),e.jsxs("span",{className:`tx-amount tabular ${n.type==="income"?"inc":"exp"}`,children:[n.type==="income"?"+":"−",p(n.amount)]})]},n.id)})})),ae==="budget"&&(f?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(3)].map((n,m)=>e.jsx("div",{className:"skeleton",style:{height:44}},m))}):b?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(aa,{size:14})}),e.jsx("span",{children:"Tambahkan kategori dan budget"}),e.jsx(G,{to:`/categories?month=${l}`,className:"empty-hint-link",style:{color:"var(--accent)"},children:"Atur →"})]}):e.jsxs(e.Fragment,{children:[(i.length>0||c.length>0)&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Hutang & Piutang"}),e.jsx("div",{className:"budget-rows",children:[...i,...c].map(n=>{const m=n.jenis==="piutang",z=m?"#f59e0b":"#f87171",h=new Date;h.setHours(0,0,0,0);const y=n.due_date?new Date(n.due_date):null,x=y?Math.round((y-h)/864e5):null,w=x!==null&&x<0;return e.jsxs("div",{className:"brow",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${z}18`,color:z},children:m?e.jsx(ra,{size:13}):e.jsx(oe,{size:13})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("span",{className:"brow-name",children:n.nama}),e.jsx("span",{style:{fontSize:"0.62rem",color:"var(--text-muted)",marginLeft:6},children:m?"piutang":"hutang"}),w&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Terlambat"})]})]}),e.jsx("div",{style:{flex:1}}),e.jsxs("div",{className:"brow-right",children:[e.jsx("span",{className:"brow-spent tabular",style:{color:z},children:p(n.amount)}),n.due_date&&e.jsx("span",{className:"brow-limit tabular",style:{color:w?"var(--danger)":x<=7?"var(--warning)":"var(--text-muted)"},children:x===0?"Hari ini":x>0?`${x}h lagi`:`${Math.abs(x)}h lalu`})]})]},n.id)})})]}),(i.length>0||c.length>0)&&a.length>0&&e.jsx("div",{style:{height:1,background:"var(--border)",margin:"12px 0"}}),a.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Pengeluaran Rutin"}),e.jsx("div",{className:"budget-rows",children:a.map(n=>e.jsx(N,{cat:n},n.id))})]}),(a.length>0||i.length>0||c.length>0)&&t.length>0&&e.jsx("div",{style:{height:1,background:"var(--border)",margin:"12px 0"}}),t.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Kategori Lainnya"}),e.jsx("div",{className:"budget-rows",children:t.map(n=>e.jsx(N,{cat:n},n.id))})]}):i.length===0&&c.length===0&&a.length===0&&e.jsxs("div",{style:{fontSize:"0.72rem",color:"var(--text-muted)"},children:["Belum ada kategori dengan budget. ",e.jsx(G,{to:`/categories?month=${l}`,style:{color:"var(--accent)"},children:"Atur →"})]})]}))]})]})]})})()]}),ua&&(()=>{const a=s.salary>0,t=async()=>{const i=parseFloat(T.amount.replace(/\D/g,""))||0;if(i){Ce(!0);try{const c=T.date||`${l}-01`;if(s.gajiTx){const{error:b}=await u.from("transactions").update({amount:i,description:T.note,date:c}).eq("id",s.gajiTx.id);if(b)throw b}else{const{error:b}=await u.from("transactions").insert({user_id:d.id,category_id:s.gajiCatId,type:"income",amount:i,description:T.note,date:c});if(b)throw b}v("Pemasukan disimpan","success"),Q(!1),H()}catch(c){v(c.message,"error")}finally{Ce(!1)}}};return e.jsx("div",{className:"modal-overlay",onClick:()=>Q(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:i=>i.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Pemasukan Bulanan ",S(l)]}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:a?"Edit jumlah atau catatan":"Catat pemasukan bulan ini"})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>Q(!1),children:e.jsx(I,{size:16})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Jumlah Pemasukan"}),e.jsx(na,{value:T.amount,onChange:i=>ee(c=>({...c,amount:i})),autoFocus:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Tanggal Diterima"}),e.jsx("input",{className:"form-input",type:"date",value:T.date,min:`${l}-01`,max:(()=>{const[i,c]=l.split("-").map(Number);return new Date(i,c,0).toISOString().split("T")[0]})(),onChange:i=>ee(c=>({...c,date:i.target.value}))})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Catatan ",!a&&e.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400},children:"(opsional)"})]}),e.jsx("textarea",{className:"form-input",rows:2,placeholder:"Misal: gaji pokok + bonus, tunjangan, dll...",value:T.note,onChange:i=>ee(c=>({...c,note:i.target.value})),style:{resize:"vertical",fontFamily:"var(--font-sans)",fontSize:"0.875rem"}})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>Q(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:t,disabled:Se||!T.amount,children:Se?"Menyimpan...":"Simpan"})]})]})})})(),pa&&e.jsx("div",{className:"modal-overlay",onClick:()=>pe(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Total Tabungan"}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Akumulasi s/d ",S(l)]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>pe(!1),children:e.jsx(I,{size:16})})]}),e.jsxs("div",{className:"wajib-rows",children:[(d.tabungan_awal||0)>0&&e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)",fontSize:"0.55rem",fontWeight:800},children:"AWAL"}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:"Saldo Awal Tabungan"}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)"},children:"sebelum mulai record"})]})]}),e.jsx("span",{className:"wajib-amount tabular",style:{color:"var(--success)"},children:p(d.tabungan_awal)})]}),s.tabunganPerMonth.length===0&&!(d.tabungan_awal>0)?e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--text-muted)",padding:"8px 0"},children:'Belum ada alokasi tabungan. Set budget kategori "Tabungan Bulanan".'}):s.tabunganPerMonth.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)"},children:e.jsx(le,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:S(a.month)}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)"},children:"Tabungan Bulanan"})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:Number(a.budget_limit)>0?"var(--success)":"var(--text-muted)"},children:["+",p(a.budget_limit)]})]},a.month)),s.hutangTabunganList.filter(a=>!a.lunas).length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"wajib-divider",style:{margin:"8px 0"}}),e.jsx("div",{style:{fontSize:"0.62rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"var(--text-muted)",marginBottom:4},children:"Outstanding bulan ini"}),s.hutangTabunganList.filter(a=>!a.lunas).map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:a.jenis==="piutang"?"rgba(245,158,11,0.1)":"rgba(248,113,113,0.1)",color:a.jenis==="piutang"?"var(--warning)":"var(--danger)",fontSize:"0.9rem"},children:a.jenis==="piutang"?e.jsx(ra,{size:13}):e.jsx(oe,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:a.nama}),e.jsx("div",{style:{fontSize:"0.62rem",color:"var(--text-muted)"},children:a.jenis==="hutang"?"Hutang":"Piutang"})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",p(a.amount)]})]},a.id))]}),e.jsx("div",{className:"wajib-divider",style:{margin:"10px 0"}}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:4},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Tabungan"}),e.jsx("span",{className:"wajib-amount tabular",style:{color:s.totalTabungan>0?"var(--success)":"var(--text-muted)",fontWeight:800},children:p(s.totalTabungan)})]})]})]})}),ba&&e.jsx("div",{className:"modal-overlay",onClick:()=>q(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Rencana Bulan Depan"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:S(ce(l))})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx(G,{to:"/savings",className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>q(!1),children:"Kelola →"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>q(!1),children:e.jsx(I,{size:16})})]})]}),s.nextMonthPlans.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(oe,{size:13})}),e.jsxs("span",{children:["Belum ada rencana untuk ",S(ce(l)),"."]}),e.jsx(G,{to:"/savings",className:"empty-hint-link",onClick:()=>q(!1),children:"Tambah →"})]}):e.jsxs("div",{className:"wajib-rows",children:[s.nextMonthPlans.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsx("span",{className:"brow-name",children:a.name}),e.jsx("span",{className:"wajib-amount tabular",children:p(a.amount)})]},a.id)),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total"}),e.jsx("span",{className:"wajib-amount tabular",children:p(s.nextMonthPlans.reduce((a,t)=>a+Number(t.amount),0))})]})]})]})}),ga&&e.jsx("div",{className:"modal-overlay",onClick:()=>Z(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:420},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Pengeluaran Tetap"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:S(l)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>{Z(!1),me(!0)},children:"Kelola"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>Z(!1),children:e.jsx(I,{size:16})})]})]}),e.jsxs("div",{className:"wajib-rows",children:[s.categories.filter(a=>Y(a)).map(a=>{const t=Number(a.budget_limit||0),i=s.salary>0&&t>0?Math.round(t/s.salary*100):null;return e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:e.jsx(le,{size:13})}),e.jsx("span",{className:"brow-name",children:a.name})]}),e.jsxs("div",{className:"wajib-right",children:[i&&e.jsxs("span",{className:"wajib-pct",children:[i,"%"]}),e.jsx("span",{className:"wajib-amount tabular",children:t>0?p(t):"—"})]})]},a.id)}),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Potongan"}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",p(Ae)]})]})]})]})}),da&&e.jsx("div",{className:"modal-overlay",onClick:()=>W(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>W(!1),children:e.jsx(I,{size:16})})]}),e.jsx(Fa,{month:l,onSuccess:()=>{H(),W(!1)},onClose:()=>W(!1)})]})}),ca&&!j&&!_e&&e.jsx("div",{className:"modal-overlay",onClick:()=>me(!1),children:e.jsxs("div",{className:"modal cat-manager-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Kelola Kategori"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:S(l)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsxs("button",{className:"btn btn-primary btn-sm",onClick:()=>{ma({is_mandatory:!0}),U(!0)},children:[e.jsx(ta,{size:13})," Kategori"]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>me(!1),children:e.jsx(I,{size:16})})]})]}),e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("p",{className:"cat-mgr-section-title",children:"Pengeluaran Wajib"}),e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:s.categories.filter(a=>Y(a)).map(a=>{const t=Number(a.budget_limit)||0,i=s.salary>0&&t>0?Math.round(t/s.salary*100):null;return e.jsxs("div",{className:"cat-mgr-row",children:[e.jsxs("div",{className:"cat-mgr-left",children:[e.jsx("span",{className:"cat-mgr-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:e.jsx(le,{size:14})}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-mgr-name",children:a.name}),e.jsx("span",{className:"cat-mgr-sub",children:"Wajib · langsung dipotong"})]})]}),e.jsxs("div",{className:"cat-mgr-right",children:[i&&e.jsxs("span",{className:"cat-mgr-pct",children:[i,"%"]}),e.jsx("span",{className:"cat-mgr-amount tabular",children:t>0?p(t):"—"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.7rem"},onClick:()=>fa(a),children:"Ubah"})]})]},a.id)})})]})]})}),j&&(()=>{const a=s.categories.find(t=>t.id===j.id);return e.jsx("div",{className:"modal-overlay",onClick:()=>C(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Pengeluaran Wajib — ",a==null?void 0:a.name]}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[S(l),s.salary>0?` · ${p(s.salary)}`:""]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>C(null),children:e.jsx(I,{size:16})})]}),s.salary>0&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx("input",{className:"form-input",type:"number",placeholder:String(qa),value:j.pct,onChange:t=>Ie(t.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),e.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),j.pct&&s.salary>0&&e.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",p(Math.round(parseFloat(j.pct)/100*s.salary))]})]}),!j.pct&&e.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(t=>e.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>Ie(String(t)),children:[t,"%"]},t))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),e.jsx(na,{value:j.nominal,onChange:va,autoFocus:!s.salary})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:16},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)",fontSize:"0.78rem"},onClick:()=>{C(null),ge({id:a.id,name:a.name})},children:"Hapus Kategori"}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>C(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",onClick:ja,children:"Simpan"})]})]})]})})})(),J&&e.jsx(Wa,{title:"Hapus Kategori",message:`Hapus kategori "${J.name}"? Semua transaksi kategori ini juga akan terhapus.`,confirmLabel:"Hapus",onConfirm:ya,onCancel:()=>ge(null)}),_e&&e.jsx("div",{className:"modal-overlay",onClick:()=>U(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:V!=null&&V.id?"Edit Kategori":"Kategori Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>U(!1),children:e.jsx(I,{size:16})})]}),e.jsx(Da,{editData:V,salary:s.salary,month:l,onSuccess:()=>{H(),U(!1)},onClose:()=>U(!1)})]})}),e.jsx("style",{children:`
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
        .db-balance.hutang {
          background: linear-gradient(135deg, #fde68a 0%, #fbbf24 55%, #f59e0b 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        [data-theme="light"] .db-balance.hutang {
          background: linear-gradient(135deg, #92400e 0%, #b45309 55%, #d97706 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .db-hutang-note {
          display: block; font-size: 0.62rem; font-weight: 600;
          color: #fbbf24; margin-top: 2px; letter-spacing: 0.01em;
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
      `})]})}export{Ya as default};
