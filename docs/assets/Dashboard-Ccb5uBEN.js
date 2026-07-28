import{J as ht,M as bt,O as xt,N as ft,G as d,z as te,H as f,F as e,D as E,K as vt,B as ka,E as Ke,y as b,f as Sa,I as jt,L as V,d as Te,p as za,o as Ca,c as Ye,a as se,b as _a,u as T,C as Ta}from"./index-CWdwqngj.js";import{T as yt}from"./TransactionForm-D7FdcNaj.js";import{C as wt}from"./CategoryForm-7KMsxt71.js";import{a as Me,d as Ge,i as ne,f as Nt,c as kt,e as St,C as zt}from"./ConfirmModal-Cu6xwab8.js";const Ct=15;function _t(m){const[re,X]=m.split("-").map(Number),k=new Date(re,X-2,1);return`${k.getFullYear()}-${String(k.getMonth()+1).padStart(2,"0")}`}function Pe(m){const[re,X]=m.split("-").map(Number),k=new Date(re,X,1);return`${k.getFullYear()}-${String(k.getMonth()+1).padStart(2,"0")}`}function Et(){var pa,ha,ba,xa;const{user:m,updateProfile:re}=ht(),{setHeader:X}=bt(),k=xt(),[Ma,Pa]=ft(),[g,Da]=d.useState(()=>Ma.get("month")||te()),[s,Ea]=d.useState({salary:0,totalExpense:0,totalIncome:0,categories:[],transactions:[],savings:[],savingsLogs:[],categorySpend:[],hutangList:[],hutangTabunganList:[],todayExpense:0,totalTabungan:0,tabunganPerMonth:[],nextMonthPlans:[],cumulativeBalance:0,cumulativeMandatoryBudget:0,gajiTx:null,gajiCatId:null,planEvents:[],allWishlist:[]}),[C,Ia]=d.useState(!1),[v,xe]=d.useState(null),[Ba,Ue]=d.useState(""),[z,Je]=d.useState(!0),[Wa,Q]=d.useState(!1),[La,De]=d.useState(!1),[D,F]=d.useState(null),[Ve,ie]=d.useState(!1),[fe,Fa]=d.useState(null),[le,Ee]=d.useState(null),[$a,ve]=d.useState(!1),[Aa,Ie]=d.useState(!1),[qa,oe]=d.useState(!1),[Ra,de]=d.useState(!1),[Ha,je]=d.useState(!1),[_,ce]=d.useState(null),[$,A]=d.useState(null),[Z,me]=d.useState(null),[Xe,Qe]=d.useState(!1),[Oa,ge]=d.useState(!1),[Be,Ze]=d.useState(""),[ea,aa]=d.useState(!1),[q,ye]=d.useState({amount:"",note:"",date:""}),[ta,sa]=d.useState(!1),[We,Le]=d.useState(!1),[I,Fe]=d.useState(()=>Number(te().split("-")[0])),[Ka,Ya]=d.useState(!1),[we,na]=d.useState("transaction"),[$e,ra]=d.useState(0),[Ga,Ua]=d.useState(0),[Ja,ia]=d.useState(0),[Va,Xa]=d.useState(0),[Qa,Ne]=d.useState(!1);d.useEffect(()=>{if(m.recording_start_month&&g<m.recording_start_month){ke(m.recording_start_month);return}R()},[g,m==null?void 0:m.recording_start_month]);const G=d.useRef(null);d.useEffect(()=>{G.current=R}),d.useEffect(()=>{const a=f.channel(`dash-realtime-${m.id}`).on("postgres_changes",{event:"*",schema:"public",table:"transactions",filter:`user_id=eq.${m.id}`},()=>{var n;(n=G.current)==null||n.call(G)}).subscribe(),t=()=>{var n;return(n=G.current)==null?void 0:n.call(G)};return window.addEventListener("focus",t),()=>{f.removeChannel(a),window.removeEventListener("focus",t)}},[m.id]),d.useEffect(()=>{const a=g===te(),t=!!m.recording_start_month&&g<=m.recording_start_month,[n,l]=m.recording_start_month?m.recording_start_month.split("-").map(Number):[0,0],o=te(),[u,x]=o.split("-").map(Number),r=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];return X(e.jsxs(e.Fragment,{children:[We&&e.jsx("div",{style:{position:"fixed",inset:0,zIndex:299},onClick:()=>Le(!1)}),e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>ke(_t(g)),disabled:t,children:"‹"}),e.jsx("span",{className:"month-label-text month-label-clickable",onClick:()=>{Fe(Number(g.split("-")[0])),Le(p=>!p)},children:E(g)}),e.jsx("button",{className:"month-btn",onClick:()=>ke(Pe(g)),disabled:a,children:"›"}),We&&e.jsxs("div",{className:"month-picker-popup",onMouseDown:p=>p.preventDefault(),children:[e.jsxs("div",{className:"mp-year-row",children:[e.jsx("button",{className:"mp-year-btn",onClick:()=>Fe(p=>p-1),disabled:!!m.recording_start_month&&I<=n,children:"‹"}),e.jsx("span",{className:"mp-year-label",children:I}),e.jsx("button",{className:"mp-year-btn",onClick:()=>Fe(p=>p+1),disabled:I>=u,children:"›"})]}),e.jsx("div",{className:"mp-grid",children:r.map((p,S)=>{const h=S+1,j=`${I}-${String(h).padStart(2,"0")}`,w=I>u||I===u&&h>x,y=!!m.recording_start_month&&(I<n||I===n&&h<l);return e.jsx("button",{className:`mp-month-btn${j===g?" mp-active":""}`,disabled:w||y,onClick:()=>{ke(j),Le(!1)},children:p},j)})})]})]})]})),()=>X(null)},[g,We,I,m==null?void 0:m.recording_start_month]),vt();const ke=a=>{Da(a),Pa({month:a})},R=async()=>{Je(!0);try{const a=`${g}-01`,t=ka(g),n=Ke(),l=Pe(g),o=m.recording_start_month;let u=f.from("transactions").select("amount, type, date").eq("user_id",m.id).lt("date",a);o&&(u=u.gte("date",`${o}-01`));let x=f.from("category_budgets").select("budget_limit, category_id, month, categories(is_mandatory, name, category_type)").eq("user_id",m.id).lte("month",g);o&&(x=x.gte("month",o));const[r,p,S,h,j,w,y,W,N,L,ee,Re,ze,ct,mt]=await Promise.all([f.from("transactions").select("*, categories(name, color, icon)").eq("user_id",m.id).gte("date",a).lte("date",t).order("date",{ascending:!1}),Promise.all([f.from("categories").select("*").eq("user_id",m.id).is("month",null),f.from("categories").select("*").eq("user_id",m.id).eq("month",g)]).then(([i,c])=>{const ae=[...i.data||[],...c.data||[]].sort((_e,pt)=>_e.name.localeCompare(pt.name)),Na=new Set;return{data:ae.filter(_e=>Na.has(_e.name)?!1:(Na.add(_e.name),!0))}}),f.from("savings").select("*").eq("user_id",m.id),f.from("savings_log").select("*").eq("user_id",m.id).eq("month",g),f.from("transactions").select("amount").eq("user_id",m.id).eq("date",n).eq("type","expense"),f.from("category_budgets").select("category_id, budget_limit").eq("user_id",m.id).eq("month",g),x,f.from("plans").select("*").eq("user_id",m.id).eq("target_month",l).eq("done",!1).order("created_at",{ascending:!0}),u,f.from("hutang").select("id, nama, amount, due_date, sumber, jenis, lunas").eq("user_id",m.id).lte("month",g).eq("lunas",!1).order("due_date",{ascending:!0,nullsFirst:!1}),f.from("hutang").select("id, nama, amount, jenis, lunas, created_at").eq("user_id",m.id).lte("month",g).eq("sumber","tabungan").eq("lunas",!1).order("created_at",{ascending:!1}),f.from("plan_events").select("*").eq("user_id",m.id).order("date",{ascending:!0}),f.from("plans").select("*").eq("user_id",m.id).eq("done",!1).order("target_month",{ascending:!0}),f.from("hutang").select("amount, jenis, savings_id").eq("user_id",m.id).eq("sumber","tabungan").eq("lunas",!1),f.from("savings_ledger").select("amount").eq("user_id",m.id).lte("month",g)]),J=r.data||[],He={};(w.data||[]).forEach(i=>{He[i.category_id]=Number(i.budget_limit)});let fa=(p.data||[]).map(i=>{const c=He[i.id]!==void 0?He[i.id]:0;return{...i,budget_limit:c,budget_set:c>0}});const Y=fa.find(i=>Me(i)),va=Y?J.filter(i=>i.type==="income"&&i.category_id===Y.id):[],ja=va.reduce((i,c)=>i+Number(c.amount),0),gt=fa,ya=J.filter(i=>i.type==="expense").reduce((i,c)=>i+Number(c.amount),0),wa=J.filter(i=>i.type==="income"&&i.category_id!==(Y==null?void 0:Y.id)).reduce((i,c)=>i+Number(c.amount),0),Oe={};J.filter(i=>i.type==="expense"&&i.category_id).forEach(i=>{Oe[i.category_id]=(Oe[i.category_id]||0)+Number(i.amount)});const Ce={};J.filter(i=>i.type==="expense"&&i.categories).forEach(i=>{const c=i.categories.name;Ce[c]||(Ce[c]={name:c,amount:0,color:i.categories.color,icon:i.categories.icon}),Ce[c].amount+=Number(i.amount)});const ut=gt.map(i=>{const c=Oe[i.id]||0,ae=i.budget_limit>0?c/i.budget_limit*100:null;return{...i,spent:c,pct:ae,overBudget:i.budget_limit>0&&c>i.budget_limit}}).sort((i,c)=>i.overBudget&&!c.overBudget?-1:!i.overBudget&&c.overBudget?1:(c.pct||0)-(i.pct||0));Ea({salary:ja,totalExpense:ya,totalIncome:wa,categories:ut,transactions:J.slice(0,5),savings:S.data||[],savingsLogs:h.data||[],todayExpense:(j.data||[]).reduce((i,c)=>i+Number(c.amount),0),tabunganPerMonth:(y.data||[]).filter(i=>{var c,ae;return(((c=i.categories)==null?void 0:c.category_type)==="savings"||((ae=i.categories)==null?void 0:ae.name)==="Tabungan Bulanan")&&Number(i.budget_limit)>0}).sort((i,c)=>i.month.localeCompare(c.month)),totalTabungan:(m.tabungan_awal||0)+(y.data||[]).filter(i=>{var c;return Ge(i.categories)||["Tabungan Bulanan","Dana Darurat"].includes((c=i.categories)==null?void 0:c.name)}).reduce((i,c)=>i+Number(c.budget_limit),0)+(mt.data||[]).reduce((i,c)=>i+Number(c.amount),0)-(ct.data||[]).filter(i=>i.jenis==="hutang").reduce((i,c)=>i+Number(c.amount),0),categorySpend:Object.values(Ce).sort((i,c)=>c.amount-i.amount),nextMonthPlans:W.data||[],gajiTx:va[0]||null,gajiCatId:(Y==null?void 0:Y.id)||null,hutangList:L.data||[],hutangTabunganList:ee.data||[],cumulativeBalance:(N.data||[]).reduce((i,c)=>i+(c.type==="income"?Number(c.amount):-Number(c.amount)),0)+ja+wa-ya+(m.saldo_awal||0),cumulativeMandatoryBudget:(y.data||[]).filter(i=>{var c;return((c=i.categories)==null?void 0:c.is_mandatory)===!0}).reduce((i,c)=>i+Number(c.budget_limit),0),planEvents:Re.data||[],allWishlist:ze.data||[],allCurrentMonthTx:J,histTransactions:N.data||[]})}finally{Je(!1)}},Za=a=>{const t=String(Math.round(a.budget_limit||0)),n=s.salary>0&&a.budget_limit>0?(a.budget_limit/s.salary*100).toFixed(1):"";F({id:a.id,nominal:t,pct:n})},et=a=>{const t=parseFloat(a)||0,n=s.salary>0&&t>0?(t/s.salary*100).toFixed(1):"";F(l=>({...l,nominal:a,pct:n}))},la=a=>{const t=parseFloat(a)||0,n=s.salary>0&&t>0?String(Math.round(t/100*s.salary)):"";F(l=>({...l,pct:a,nominal:n}))},at=async()=>{const a=parseFloat(D.nominal)||0,[t,n]=await Promise.all([f.from("category_budgets").upsert({user_id:m.id,category_id:D.id,month:g,budget_limit:a},{onConflict:"category_id,month"}),f.from("categories").update({budget_limit:a}).eq("id",D.id)]),l=t.error||n.error;if(l){k(l.message,"error");return}k("Budget disimpan","success"),F(null),R()},tt=async()=>{const a=`${g}-01`,t=ka(g),[n,l]=await Promise.all([f.from("transactions").delete().eq("category_id",le.id).gte("date",a).lte("date",t),f.from("category_budgets").delete().eq("category_id",le.id).eq("month",g)]);if(n.error||l.error){k((n.error||l.error).message,"error");return}const{error:o}=await f.from("categories").delete().eq("id",le.id);if(o){k(o.message,"error");return}k("Kategori dihapus","success"),Ee(null),R()};s.categories.filter(a=>a.budget_limit>0).reduce((a,t)=>a+t.budget_limit,0);const Se=g===te(),U=s.categories.filter(a=>a.overBudget);d.useEffect(()=>{if(U.length<=1){ra(0);return}const a=setInterval(()=>ra(t=>(t+1)%U.length),2e3);return()=>clearInterval(a)},[U.length]);const oa=s.categories.filter(a=>ne(a)).reduce((a,t)=>a+Number(t.budget_limit||0),0),st=s.categories.filter(a=>ne(a)).reduce((a,t)=>a+(t.spent||0),0),nt=Math.max(0,oa-st),da=s.totalExpense+nt;s.salary+s.totalIncome-da,s.salary>0&&da/s.salary*100;const Ae=s.categories.filter(a=>Ge(a)&&a.budget_limit>0).reduce((a,t)=>a+Number(t.budget_limit),0);s.categories.filter(a=>Me(a));const rt=s.categories.filter(a=>Ge(a)),ca=s.categories.filter(a=>Nt(a)),ma=s.categories.filter(a=>kt(a)),ga=s.categories.filter(a=>St(a)),it=[{label:"Wajib",spent:ca.reduce((a,t)=>a+(t.spent||0),0),budget:ca.reduce((a,t)=>a+Number(t.budget_limit||0),0),color:"#f87171",action:()=>ve(!0)},{label:"Rutin",spent:ma.reduce((a,t)=>a+(t.spent||0),0),budget:ma.reduce((a,t)=>a+Number(t.budget_limit||0),0),color:"#fbbf24"},{label:"Tambahan",spent:ga.reduce((a,t)=>a+(t.spent||0),0),budget:ga.reduce((a,t)=>a+Number(t.budget_limit||0),0),color:"#f97316"}],ue=rt.filter(a=>Number(a.budget_limit)>0),M=it.filter(a=>a.spent>0);ue.length>0&&Ga%ue.length;const pe=M.length>0?Ja%M.length:0;d.useEffect(()=>{if(z||ue.length<=1)return;const a=setInterval(()=>Ua(t=>(t+1)%ue.length),2500);return()=>clearInterval(a)},[z,ue.length]),d.useEffect(()=>{if(z||M.length<=1)return;const a=setInterval(()=>ia(t=>(t+1)%M.length),3e3);return()=>clearInterval(a)},[z,M.length]),d.useEffect(()=>{if(z)return;const a=(s.planEvents||[]).length,t=(s.allWishlist||[]).length;if(a===0||t===0)return;const n=setInterval(()=>Xa(l=>(l+1)%2),3e3);return()=>clearInterval(n)},[z,s.planEvents,s.allWishlist]);const he=s.cumulativeBalance-s.cumulativeMandatoryBudget,H=(s.hutangList||[]).filter(a=>a.jenis==="hutang"&&a.sumber==="saldo").reduce((a,t)=>a+Number(t.amount),0);s.salary-s.totalExpense-Ae,s.salary>0&&s.totalExpense/s.salary*100;const ua=s.salary>0?s.salary-Ae:0;ua-s.totalExpense,s.salary>0&&Ae>0&&s.totalExpense>ua;const O=Ke(),lt=te(),P=d.useMemo(()=>{const a=new Map,t=new Map;(s.planEvents||[]).forEach(N=>{a.set(N.date,(a.get(N.date)||0)+1)}),(s.allWishlist||[]).forEach(N=>{const[L,ee]=N.target_month.split("-").map(Number),Re=new Date(L,ee,0).getDate(),ze=`${L}-${String(ee).padStart(2,"0")}-${String(Re).padStart(2,"0")}`;t.set(ze,(t.get(ze)||0)+1)});const[n,l]=O.split("-").map(Number),o=new Date(n,l-2,1),u=N=>`${N.getFullYear()}-${String(N.getMonth()+1).padStart(2,"0")}-${String(N.getDate()).padStart(2,"0")}`,x=u(o),r=new Date(n,l+1,0),p=u(r),S=[...a.keys(),...t.keys()],h=S.length>0?S.reduce((N,L)=>N>L?N:L):null,j=h&&h>p?h:p,w=[],y=new Date(x+"T00:00:00"),W=new Date(j+"T00:00:00");for(;y<=W;)w.push({key:u(y),planCount:a.get(u(y))||0,wishlistCount:t.get(u(y))||0}),y.setDate(y.getDate()+1);return w},[s.planEvents,s.allWishlist,O]),qe=d.useMemo(()=>{if(!C||!v)return null;if(v<O){const u=[...s.allCurrentMonthTx||[],...s.histTransactions||[]].filter(x=>x.date>v&&x.date<=O).reduce((x,r)=>x+(r.type==="income"?Number(r.amount):-Number(r.amount)),0);return he-u}const a=v.slice(0,7),t=(s.planEvents||[]).filter(o=>o.type==="income"&&o.date>=O&&o.date<=v).reduce((o,u)=>o+Number(u.amount),0),n=(s.planEvents||[]).filter(o=>o.type==="expense"&&o.date>=O&&o.date<=v).reduce((o,u)=>o+Number(u.amount),0),l=(s.allWishlist||[]).filter(o=>o.target_month>=lt&&o.target_month<=a).reduce((o,u)=>o+Number(u.amount),0);return he+t-n-l},[C,v,s.planEvents,s.allWishlist,s.allCurrentMonthTx,s.histTransactions,he]),ot=()=>{be.current&&clearTimeout(be.current),Ia(a=>!a),xe(null)},B=d.useRef(null),be=d.useRef(null),K=44,dt=a=>{const t=a.currentTarget,n=Math.round(t.scrollLeft/K),l=P[Math.max(0,Math.min(n,P.length-1))];if(l){const o=new Date(l.key+"T00:00:00");Ue(o.toLocaleDateString("id-ID",{month:"long",year:"numeric"})),be.current&&clearTimeout(be.current),be.current=setTimeout(()=>xe(l.key),120)}};return d.useEffect(()=>{if(!C||!B.current||P.length===0)return;const a=P.findIndex(l=>l.key===O),t=a>=0?a:0;B.current.scrollTo({left:t*K,behavior:"instant"});const n=P[t];if(n){const l=new Date(n.key+"T00:00:00");Ue(l.toLocaleDateString("id-ID",{month:"long",year:"numeric"})),xe(n.key)}},[C,P.length]),d.useEffect(()=>{const a=B.current;if(!a)return;let t=!1,n=0;const l=()=>{t=!0,n=Math.round(a.scrollLeft/K)},o=()=>{t=!1},u=x=>{if(!t)return;x.preventDefault();const r=x.deltaY+x.deltaX>0?1:-1;n=Math.max(0,Math.min(n+r,P.length-1)),a.scrollTo({left:n*K,behavior:"instant"})};return a.addEventListener("mouseenter",l),a.addEventListener("mouseleave",o),window.addEventListener("wheel",u,{passive:!1}),()=>{a.removeEventListener("mouseenter",l),a.removeEventListener("mouseleave",o),window.removeEventListener("wheel",u)}},[C,P.length]),d.useEffect(()=>{if(!v||!B.current)return;const a=P.findIndex(n=>n.key===v);if(a<0)return;const t=a*K;Math.abs(B.current.scrollLeft-t)<K||B.current.scrollTo({left:t,behavior:"smooth"})},[v]),e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"db-page",children:[e.jsxs("div",{className:"db-hero",children:[e.jsx("span",{className:"db-eyebrow",children:C&&v?`PROYEKSI · ${new Date(v+"T00:00:00").toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"})}`:H>0?"SALDO BERSIH":"TOTAL SALDO"}),z?e.jsx("div",{className:"skeleton",style:{height:56,width:220,borderRadius:8,marginTop:6}}):e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:6},children:[(()=>{const a=C&&v!==null?qe-H:he-H,t=a<0;return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:`db-balance${t?" neg":""}`,children:[t&&e.jsx("span",{className:"db-neg-sign",children:"−"}),b(Math.abs(a))]}),C&&v!==null&&qe!==null&&e.jsx("div",{className:"db-sim-delta",children:(()=>{const n=qe-H-(he-H),l=n>=0;return e.jsxs("span",{style:{color:l?"var(--success)":"var(--danger)"},children:[l?"▲":"▼"," ",l?"+":"−",b(Math.abs(n))," dari sekarang"]})})()})]})})(),H>0&&!C&&e.jsxs("button",{className:"db-hutang-chip",onClick:()=>je(!0),children:[e.jsx("span",{className:"db-hutang-chip-label",children:"hutang"}),e.jsx("span",{className:"db-hutang-chip-amount",children:b(H)}),e.jsx("span",{className:"db-hutang-chip-arrow",children:"›"})]})]}),e.jsx("div",{className:"db-hero-chips",children:!z&&Se&&s.nextMonthPlans.length>0&&!C&&e.jsxs("button",{className:"db-rencana-chip",onClick:()=>oe(!0),children:[e.jsx(Sa,{size:11}),s.nextMonthPlans.length," rencana bulan depan"]})})]}),!z&&e.jsxs("div",{className:"db-stats-grid",children:[e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>{var a,t;ye({amount:s.gajiTx?String(s.gajiTx.amount):"",note:((a=s.gajiTx)==null?void 0:a.description)||"",date:((t=s.gajiTx)==null?void 0:t.date)||`${g}-01`}),de(!0)},children:[e.jsx("span",{className:"db-stat-label",children:"PEMASUKAN"}),e.jsx("span",{className:"db-stat-val tabular",style:{color:s.salary>0?"#34d399":"var(--text-muted)"},children:s.salary>0?`+${b(s.salary)}`:"—"}),e.jsx("span",{className:"db-stat-sub",children:s.salary>0?"bulan ini":"belum dicatat"})]}),e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>Ie(!0),children:[e.jsx("span",{className:"db-stat-label",children:"TABUNGAN"}),s.totalTabungan>0?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"db-stat-val tabular",style:{color:"#818cf8"},children:b(s.totalTabungan)}),e.jsx("span",{className:"db-stat-sub",children:"total tabungan"})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"db-stat-val tabular",style:{color:"var(--text-muted)"},children:"—"}),e.jsx("span",{className:"db-stat-sub",children:"belum diatur"})]})]}),e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>{var a,t;return(t=(a=M[pe])==null?void 0:a.action)==null?void 0:t.call(a)},children:[e.jsx("span",{className:"db-stat-label",children:"PENGELUARAN"}),M.length>0?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"db-stat-val tabular",style:{color:"#f87171"},children:["−",b(((pa=M[pe])==null?void 0:pa.spent)||0)]}),e.jsx("span",{className:"db-stat-sub",style:{color:(ha=M[pe])==null?void 0:ha.color},children:(ba=M[pe])==null?void 0:ba.label}),M.length>1&&e.jsx("div",{className:"db-sub-dots",children:M.map((a,t)=>e.jsx("span",{className:`db-sub-dot${pe===t?" active":""}`,onClick:n=>{n.stopPropagation(),ia(t)}},t))})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"db-stat-val tabular",style:{color:"var(--text-muted)"},children:"—"}),e.jsx("span",{className:"db-stat-sub",children:"belum ada"})]})]}),(()=>{const a=(s.planEvents||[]).length,t=(s.allWishlist||[]).length,n=a+t,l=a>0&&t>0,o=l?Va%2:a>0?0:1,u=a>0&&(!l||o===0),x=u?a:t,r=u?"#818cf8":"#fbbf24",p=u?"plan events":"wishlist aktif";return e.jsxs("div",{className:`db-stat${C?" db-stat-sim":""}`,style:{cursor:"pointer"},onClick:()=>Ne(!0),children:[e.jsx("span",{className:"db-stat-label",children:"PLAN & WISHLIST"}),e.jsx("span",{className:"db-stat-val tabular",style:{color:n>0?r:"var(--text-muted)"},children:x>0?x:"—"}),e.jsx("span",{className:"db-stat-sub",style:{color:n>0?r:void 0},children:n>0?p:"belum ada"}),Se&&e.jsx("button",{className:`sim-toggle${C?" active":""}`,onClick:S=>{S.stopPropagation(),ot()},title:C?"Matikan Simulasi":"Mode Simulasi"})]})})()]}),z&&e.jsx("div",{className:"skeleton",style:{height:120,borderRadius:"var(--radius-lg)"}}),!z&&Se&&C&&e.jsxs("div",{className:"sim-wrap",children:[e.jsxs("div",{className:"sim-cal-header",children:[e.jsx("button",{className:"sim-nav-btn",onClick:()=>{var a;return(a=B.current)==null?void 0:a.scrollBy({left:-K*7,behavior:"smooth"})},children:"‹"}),e.jsx("span",{className:"sim-cal-header-label",children:Ba}),e.jsx("button",{className:"sim-nav-btn",onClick:()=>{var a;return(a=B.current)==null?void 0:a.scrollBy({left:K*7,behavior:"smooth"})},children:"›"})]}),e.jsx("div",{className:"sim-cal-scroll",ref:B,onScroll:dt,children:P.map(a=>{const t=v===a.key,l=new Date(a.key+"T00:00:00").getDate(),o=a.planCount>0,u=a.wishlistCount>0,x=t?void 0:o?{background:"rgba(167,139,250,0.28)",color:"#c4b5fd",fontWeight:800}:u?{background:"rgba(251,191,36,0.28)",color:"#fcd34d",fontWeight:700}:void 0;return e.jsxs("div",{className:"sim-cal-item","data-selected":t?"true":void 0,children:[e.jsx("button",{className:`sim-cal-day${t?" active":""}`,style:x,onClick:()=>xe(t?null:a.key),children:l}),e.jsx("div",{className:"sim-cal-dots"})]},a.key)})}),(()=>{if(!v)return e.jsx("div",{className:"sim-hint",children:"Scroll ke tanggal untuk lihat proyeksi"});const a=P.find(l=>l.key===v),t=((a==null?void 0:a.planCount)??0)>0,n=((a==null?void 0:a.wishlistCount)??0)>0;return!t&&!n?null:e.jsxs("div",{className:"sim-cal-arrow",children:[t&&e.jsx("span",{className:"sim-dot plan",children:"▲"}),n&&e.jsx("span",{className:"sim-dot wish",children:"▲"})]})})(),v&&(()=>{const a=new Date(v+"T00:00:00").toLocaleDateString("id-ID",{day:"numeric",month:"short"});if(v<O){const h=[...(s.allCurrentMonthTx||[]).filter(j=>j.date===v),...(s.histTransactions||[]).filter(j=>j.date===v)];return h.length===0?null:e.jsx("div",{className:"sim-breakdown",children:e.jsxs("div",{className:"sim-bk-group",children:[e.jsxs("span",{className:"sim-bk-label",children:["Transaksi ",a]}),h.map((j,w)=>{var y;return e.jsxs("div",{className:"sim-bk-row",children:[e.jsx("span",{className:"sim-bk-name",children:((y=j.categories)==null?void 0:y.name)||(j.type==="income"?"Pemasukan":"Pengeluaran")}),e.jsxs("span",{className:"sim-bk-amt",style:{color:j.type==="income"?"var(--success)":"var(--danger)"},children:[j.type==="income"?"+":"−",b(j.amount)]})]},j.id||w)})]})})}const t=P.find(h=>h.key===v),n=((t==null?void 0:t.planCount)??0)>0,l=((t==null?void 0:t.wishlistCount)??0)>0;if(!n&&!l)return null;const o=v.slice(0,7),u=(s.planEvents||[]).filter(h=>h.date===v),x=new Date(v+"T00:00:00"),r=new Date(x.getFullYear(),x.getMonth()+1,0).getDate(),S=x.getDate()===r?(s.allWishlist||[]).filter(h=>h.target_month===o):[];return e.jsxs("div",{className:"sim-breakdown",children:[u.length>0&&e.jsxs("div",{className:"sim-bk-group",children:[e.jsxs("span",{className:"sim-bk-label",children:["Plan events ",a]}),u.map(h=>e.jsxs("div",{className:"sim-bk-row",children:[e.jsx("span",{className:"sim-bk-name",children:h.title}),e.jsxs("span",{className:"sim-bk-amt",style:{color:h.type==="income"?"var(--success)":"var(--danger)"},children:[h.type==="income"?"+":"−",b(h.amount)]})]},h.id))]}),S.length>0&&e.jsxs("div",{className:"sim-bk-group",children:[e.jsxs("span",{className:"sim-bk-label",children:["Wishlist ",o]}),S.map(h=>e.jsxs("div",{className:"sim-bk-row",children:[e.jsx("span",{className:"sim-bk-name",children:h.name}),e.jsxs("span",{className:"sim-bk-amt",style:{color:"var(--danger)"},children:["−",b(h.amount)]})]},h.id))]})]})})()]}),!z&&Se&&s.todayExpense>0&&!C&&(()=>{const a=m.budget_harian||0,t=s.todayExpense,n=a>0&&t>=a,l=a>0&&t/a>=.8&&!n,o=a>0&&!n&&!l,u=n?"#f87171":l?"#fbbf24":o?"#34d399":"#818cf8",x=n?"rgba(248,113,113,0.06)":l?"rgba(251,191,36,0.06)":o?"rgba(52,211,153,0.06)":"rgba(129,140,248,0.06)",r=n?"rgba(248,113,113,0.25)":l?"rgba(251,191,36,0.25)":o?"rgba(52,211,153,0.25)":"rgba(129,140,248,0.25)",p=a>0?Math.min(t/a*100,100):0;return e.jsxs("div",{className:"db-daily-card db-daily-card-clickable",style:{background:x,borderColor:r},onClick:()=>{Ze(a>0?String(a):""),ge(!0)},children:[e.jsxs("div",{className:"db-daily-card-left",children:[e.jsx("span",{className:"db-daily-card-label",children:"PENGELUARAN HARI INI"}),e.jsxs("span",{className:"db-daily-card-amount tabular",style:{color:u},children:["−",b(t)]})]}),e.jsx("div",{className:"db-daily-card-right",children:a>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"db-daily-card-track",children:e.jsx("div",{className:"db-daily-card-fill",style:{width:`${p}%`,background:u}})}),e.jsxs("span",{className:"db-daily-card-sub",style:{color:u},children:[n?"Melebihi":l?"Hampir":`${Math.round(p)}%`," dari ",b(a)]})]}):e.jsx("span",{className:"db-daily-card-sub",style:{color:"#818cf8"},children:"Atur budget harian →"})})]})})(),(()=>{var x;const a=s.categories.filter(r=>!ne(r)&&!Me(r)&&r.is_monthly&&(r.budget_limit>0||(r.spent||0)>0)),t=s.categories.filter(r=>!ne(r)&&!Me(r)&&!r.is_monthly&&(r.budget_limit>0||(r.spent||0)>0)),n=(s.hutangList||[]).filter(r=>r.jenis==="hutang"),l=(s.hutangList||[]).filter(r=>r.jenis==="piutang"),o=!z&&a.length===0&&t.length===0&&n.length===0&&l.length===0,u=({cat:r})=>{const p=r.budget_limit>0?r.spent/r.budget_limit*100:0,S=Math.min(p,100),h=p>100,j=!h&&p>=100,w=!h&&p>=80&&p<100,y=h?"var(--danger)":j?"var(--success)":w?"var(--warning)":r.color||"var(--accent)",W=r.budget_limit-(r.spent||0),N=s.salary>0&&r.budget_limit>0?Math.round(r.budget_limit/s.salary*100):null,L=r.budget_limit>0;return e.jsxs("div",{className:`brow${!L&&r.spent>0?" brow-no-budget":""}`,children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${r.color||"#6366f1"}18`},children:e.jsx("span",{style:{width:10,height:10,borderRadius:"50%",background:r.color||"var(--accent)",display:"inline-block",flexShrink:0}})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("span",{className:"brow-name",children:r.name}),h&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Over"}),j&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Penuh"}),w&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Hampir"})]})]}),r.budget_limit>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"brow-bar-wrap",children:e.jsx("div",{className:"brow-bar",children:e.jsx("div",{className:"brow-bar-fill",style:{width:`${S}%`,background:y}})})}),e.jsxs("div",{className:"brow-right",onClick:()=>N&&Ya(ee=>!ee),style:{cursor:N?"pointer":"default"},children:[e.jsx("span",{className:"brow-spent tabular",style:{color:h?"var(--danger)":"var(--text-primary)"},children:b(r.spent||0)}),Ka&&N?e.jsxs("span",{className:"brow-limit tabular",style:{color:"var(--accent)"},children:[N,"% gaji"]}):e.jsx("span",{className:"brow-limit tabular",style:{color:W<0?"var(--danger)":W===0?"var(--text-muted)":"var(--success)"},children:W<0?`Over ${b(Math.abs(W))}`:`Sisa ${b(W)}`})]}),e.jsxs("span",{className:"brow-pct",style:{color:y},children:[p.toFixed(0),"%"]})]}):r.spent>0?e.jsxs("span",{className:"brow-only-spent tabular",style:{color:"var(--danger)"},children:["−",b(r.spent)]}):null]})};return e.jsxs(e.Fragment,{children:[!z&&U.length>0&&e.jsxs("div",{className:"db-alert",children:[e.jsx(jt,{size:11}),e.jsxs("span",{children:["Overbudget — ",e.jsx("strong",{children:(x=U[$e])==null?void 0:x.name})]}),U.length>1&&e.jsxs("span",{className:"db-alert-count",children:[$e+1,"/",U.length]})]},$e),e.jsxs("div",{className:"card dash-tab-card",children:[e.jsxs("div",{className:"sect-head",style:{marginBottom:16},children:[e.jsxs("div",{className:"dash-tab-toggle",children:[e.jsx("button",{className:`dash-tab-btn${we==="transaction"?" active":""}`,onClick:()=>na("transaction"),children:"My Transaction"}),e.jsx("button",{className:`dash-tab-btn${we==="budget"?" active":""}`,onClick:()=>na("budget"),children:"My Budget"})]}),e.jsxs("div",{className:"tab-actions",children:[e.jsxs(V,{to:`/transactions?month=${g}`,className:"tab-act",children:[e.jsx(Te,{size:13}),e.jsx("span",{className:"tab-act-label",children:"Lihat semua"})]}),e.jsxs(V,{to:`/categories?month=${g}`,className:"tab-act",children:[e.jsx(za,{size:13}),e.jsx("span",{className:"tab-act-label",children:"Atur"})]}),e.jsxs("button",{className:"tab-act tab-act-accent",onClick:()=>Q(!0),children:[e.jsx(Ca,{size:13}),e.jsx("span",{className:"tab-act-label",children:"Transaksi"})]})]})]}),e.jsxs("div",{className:"card-scroll-body",children:[we==="transaction"&&(z?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[...Array(4)].map((r,p)=>e.jsx("div",{className:"skeleton",style:{height:42}},p))}):s.transactions.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(Ye,{size:13})}),e.jsx("span",{children:"Belum ada transaksi bulan ini."}),e.jsx("button",{className:"empty-hint-link",onClick:()=>Q(!0),children:"Tambah sekarang →"})]}):e.jsx("div",{className:"tx-list",children:s.transactions.map(r=>{var p;return e.jsxs("div",{className:"tx-row",children:[e.jsx("div",{className:"tx-icon",style:{background:r.type==="income"?"rgba(52,211,153,0.12)":"rgba(248,113,113,0.12)",color:r.type==="income"?"var(--success)":"var(--danger)"},children:r.type==="income"?e.jsx(Ye,{size:14}):e.jsx(se,{size:14})}),e.jsxs("div",{className:"tx-meta",children:[e.jsx("span",{className:"tx-desc",children:r.description||((p=r.categories)==null?void 0:p.name)||"Transaksi"}),e.jsx("span",{className:"tx-date",children:new Date(r.date).toLocaleDateString("id-ID",{day:"numeric",month:"short"})})]}),e.jsxs("span",{className:`tx-amount tabular ${r.type==="income"?"inc":"exp"}`,children:[r.type==="income"?"+":"−",b(r.amount)]})]},r.id)})})),we==="budget"&&(z?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(3)].map((r,p)=>e.jsx("div",{className:"skeleton",style:{height:44}},p))}):o?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(za,{size:14})}),e.jsx("span",{children:"Tambahkan kategori dan budget"}),e.jsx(V,{to:`/categories?month=${g}`,className:"empty-hint-link",style:{color:"var(--accent)"},children:"Atur →"})]}):e.jsxs(e.Fragment,{children:[(n.length>0||l.length>0)&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Hutang & Piutang"}),e.jsx("div",{className:"budget-rows",children:[...n,...l].map(r=>{const p=r.jenis==="piutang",S=p?"#f59e0b":"#f87171",h=new Date;h.setHours(0,0,0,0);const j=r.due_date?new Date(r.due_date):null,w=j?Math.round((j-h)/864e5):null,y=w!==null&&w<0;return e.jsxs("div",{className:"brow",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${S}18`,color:S},children:p?e.jsx(_a,{size:13}):e.jsx(Te,{size:13})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("span",{className:"brow-name",children:r.nama}),e.jsx("span",{style:{fontSize:"0.62rem",color:"var(--text-muted)",marginLeft:6},children:p?"piutang":"hutang"}),y&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Terlambat"})]})]}),e.jsx("div",{style:{flex:1}}),e.jsxs("div",{className:"brow-right",children:[e.jsx("span",{className:"brow-spent tabular",style:{color:S},children:b(r.amount)}),r.due_date&&e.jsx("span",{className:"brow-limit tabular",style:{color:y?"var(--danger)":w<=7?"var(--warning)":"var(--text-muted)"},children:w===0?"Hari ini":w>0?`${w}h lagi`:`${Math.abs(w)}h lalu`})]})]},r.id)})})]}),(n.length>0||l.length>0)&&a.length>0&&e.jsx("div",{style:{height:1,background:"var(--border)",margin:"12px 0"}}),a.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Pengeluaran Rutin"}),e.jsx("div",{className:"budget-rows",children:a.map(r=>e.jsx(u,{cat:r},r.id))})]}),(a.length>0||n.length>0||l.length>0)&&t.length>0&&e.jsx("div",{style:{height:1,background:"var(--border)",margin:"12px 0"}}),t.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Kategori Lainnya"}),e.jsx("div",{className:"budget-rows",children:t.map(r=>e.jsx(u,{cat:r},r.id))})]}):n.length===0&&l.length===0&&a.length===0&&e.jsxs("div",{style:{fontSize:"0.72rem",color:"var(--text-muted)"},children:["Belum ada kategori dengan budget. ",e.jsx(V,{to:`/categories?month=${g}`,style:{color:"var(--accent)"},children:"Atur →"})]})]}))]})]})]})})()]}),Ra&&(()=>{const a=s.salary>0,t=async()=>{const n=parseFloat(q.amount.replace(/\D/g,""))||0;if(n){sa(!0);try{const l=q.date||`${g}-01`;if(s.gajiTx){const{error:o}=await f.from("transactions").update({amount:n,description:q.note,date:l}).eq("id",s.gajiTx.id);if(o)throw o}else{const{error:o}=await f.from("transactions").insert({user_id:m.id,category_id:s.gajiCatId,type:"income",amount:n,description:q.note,date:l});if(o)throw o}k("Pemasukan disimpan","success"),de(!1),R()}catch(l){k(l.message,"error")}finally{sa(!1)}}};return e.jsx("div",{className:"modal-overlay",onClick:()=>de(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Pemasukan Bulanan ",E(g)]}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:a?"Edit jumlah atau catatan":"Catat pemasukan bulan ini"})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>de(!1),children:e.jsx(T,{size:16})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Jumlah Pemasukan"}),e.jsx(Ta,{value:q.amount,onChange:n=>ye(l=>({...l,amount:n})),autoFocus:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Tanggal Diterima"}),e.jsx("input",{className:"form-input",type:"date",value:q.date,min:`${g}-01`,max:(()=>{const[n,l]=g.split("-").map(Number);return new Date(n,l,0).toISOString().split("T")[0]})(),onChange:n=>ye(l=>({...l,date:n.target.value}))})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Catatan ",!a&&e.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400},children:"(opsional)"})]}),e.jsx("textarea",{className:"form-input",rows:2,placeholder:"Misal: gaji pokok + bonus, tunjangan, dll...",value:q.note,onChange:n=>ye(l=>({...l,note:n.target.value})),style:{resize:"vertical",fontFamily:"var(--font-sans)",fontSize:"0.875rem"}})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>de(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:t,disabled:ta||!q.amount,children:ta?"Menyimpan...":"Simpan"})]})]})})})(),Aa&&e.jsx("div",{className:"modal-overlay",onClick:()=>Ie(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Total Tabungan"}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Akumulasi s/d ",E(g)]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>Ie(!1),children:e.jsx(T,{size:16})})]}),e.jsxs("div",{className:"wajib-rows",children:[(m.tabungan_awal||0)>0&&e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)",fontSize:"0.55rem",fontWeight:800},children:"AWAL"}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:"Saldo Awal Tabungan"}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)"},children:"sebelum mulai record"})]})]}),e.jsx("span",{className:"wajib-amount tabular",style:{color:"var(--success)"},children:b(m.tabungan_awal)})]}),s.tabunganPerMonth.length===0&&!(m.tabungan_awal>0)?e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--text-muted)",padding:"8px 0"},children:'Belum ada alokasi tabungan. Set budget kategori "Tabungan Bulanan".'}):s.tabunganPerMonth.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)"},children:e.jsx(se,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:E(a.month)}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)"},children:"Tabungan Bulanan"})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:Number(a.budget_limit)>0?"var(--success)":"var(--text-muted)"},children:["+",b(a.budget_limit)]})]},a.month)),s.hutangTabunganList.filter(a=>!a.lunas).length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"wajib-divider",style:{margin:"8px 0"}}),e.jsx("div",{style:{fontSize:"0.62rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"var(--text-muted)",marginBottom:4},children:"Outstanding bulan ini"}),s.hutangTabunganList.filter(a=>!a.lunas).map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:a.jenis==="piutang"?"rgba(245,158,11,0.1)":"rgba(248,113,113,0.1)",color:a.jenis==="piutang"?"var(--warning)":"var(--danger)",fontSize:"0.9rem"},children:a.jenis==="piutang"?e.jsx(_a,{size:13}):e.jsx(Te,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:a.nama}),e.jsx("div",{style:{fontSize:"0.62rem",color:"var(--text-muted)"},children:a.jenis==="hutang"?"Hutang":"Piutang"})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",b(a.amount)]})]},a.id))]}),e.jsx("div",{className:"wajib-divider",style:{margin:"10px 0"}}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:4},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Tabungan"}),e.jsx("span",{className:"wajib-amount tabular",style:{color:s.totalTabungan>0?"var(--success)":"var(--text-muted)",fontWeight:800},children:b(s.totalTabungan)})]})]})]})}),Qa&&e.jsx("div",{className:"modal-overlay",onClick:()=>Ne(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:420},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Plan & Wishlist"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:"Semua event dan target pembelian"})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx(V,{to:"/savings",className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>Ne(!1),children:"Kelola →"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>Ne(!1),children:e.jsx(T,{size:16})})]})]}),e.jsxs("div",{style:{marginBottom:16},children:[e.jsxs("div",{style:{fontSize:"0.62rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"#818cf8",marginBottom:8},children:["Plan Events (",(s.planEvents||[]).length,")"]}),(s.planEvents||[]).length===0?e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--text-muted)",padding:"4px 0"},children:"Belum ada plan event."}):e.jsx("div",{className:"wajib-rows",children:(s.planEvents||[]).map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:a.type==="income"?"rgba(52,211,153,0.12)":"rgba(248,113,113,0.12)",color:a.type==="income"?"var(--success)":"var(--danger)"},children:a.type==="income"?e.jsx(Ye,{size:13}):e.jsx(se,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:a.title}),e.jsx("div",{style:{fontSize:"0.62rem",color:"var(--text-muted)"},children:new Date(a.date+"T00:00:00").toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"})})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:a.type==="income"?"var(--success)":"var(--danger)"},children:[a.type==="income"?"+":"−",b(a.amount)]})]},a.id))})]}),e.jsx("div",{className:"wajib-divider",style:{margin:"4px 0 16px"}}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:"0.62rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"#fbbf24",marginBottom:8},children:["Wishlist (",(s.allWishlist||[]).length,")"]}),(s.allWishlist||[]).length===0?e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--text-muted)",padding:"4px 0"},children:"Belum ada wishlist aktif."}):e.jsx("div",{className:"wajib-rows",children:(s.allWishlist||[]).map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(251,191,36,0.12)",color:"#fbbf24"},children:e.jsx(Sa,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:a.name}),e.jsx("div",{style:{fontSize:"0.62rem",color:"var(--text-muted)"},children:E(a.target_month)})]})]}),e.jsx("span",{className:"wajib-amount tabular",style:{color:"#fbbf24"},children:b(a.amount)})]},a.id))})]})]})}),qa&&e.jsx("div",{className:"modal-overlay",onClick:()=>oe(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Rencana Bulan Depan"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:E(Pe(g))})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx(V,{to:"/savings",className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>oe(!1),children:"Kelola →"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>oe(!1),children:e.jsx(T,{size:16})})]})]}),s.nextMonthPlans.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(Te,{size:13})}),e.jsxs("span",{children:["Belum ada rencana untuk ",E(Pe(g)),"."]}),e.jsx(V,{to:"/savings",className:"empty-hint-link",onClick:()=>oe(!1),children:"Tambah →"})]}):e.jsxs("div",{className:"wajib-rows",children:[s.nextMonthPlans.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsx("span",{className:"brow-name",children:a.name}),e.jsx("span",{className:"wajib-amount tabular",children:b(a.amount)})]},a.id)),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total"}),e.jsx("span",{className:"wajib-amount tabular",children:b(s.nextMonthPlans.reduce((a,t)=>a+Number(t.amount),0))})]})]})]})}),Ha&&e.jsx("div",{className:"modal-overlay",onClick:()=>{je(!1),ce(null),A(null)},children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:a=>a.stopPropagation(),children:[!_&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Detail Pinjaman"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>je(!1),children:e.jsx(T,{size:16})})]}),e.jsxs("div",{className:"wajib-rows",children:[(s.hutangList||[]).filter(a=>a.jenis==="hutang"&&a.sumber==="saldo").map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(251,191,36,0.1)",color:"#fbbf24"},children:e.jsx(se,{size:13})}),e.jsx("span",{className:"brow-name",children:a.nama})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("span",{className:"wajib-amount tabular",children:b(Number(a.amount))}),e.jsx("button",{className:"btn btn-sm",style:{fontSize:"0.65rem",padding:"3px 10px",background:"rgba(52,211,153,0.12)",color:"#34d399",border:"1px solid rgba(52,211,153,0.25)",borderRadius:99},onClick:()=>{ce(a),A(null),me(null)},children:"Bayar"})]})]},a.id)),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Pinjaman"}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"#fbbf24"},children:["−",b(H)]})]})]})]}),_&&!$&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Hutang Terbayar"}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[_.nama," · ",b(_.amount)]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>ce(null),children:e.jsx(T,{size:16})})]}),e.jsx("p",{style:{fontSize:"0.78rem",color:"var(--text-muted)",marginBottom:14},children:"Bayar dari mana?"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsxs("button",{className:"btn btn-secondary",style:{justifyContent:"flex-start",gap:10},onClick:()=>A("tabungan"),children:[e.jsx("span",{style:{fontSize:"1rem"},children:"🏦"}),e.jsxs("div",{style:{textAlign:"left"},children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.82rem"},children:"Tabungan"}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)",fontWeight:400},children:"Kurangi dari kantong tabungan"})]})]}),e.jsxs("button",{className:"btn btn-secondary",style:{justifyContent:"flex-start",gap:10},onClick:()=>A("saldo"),children:[e.jsx("span",{style:{fontSize:"1rem"},children:"💳"}),e.jsxs("div",{style:{textAlign:"left"},children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.82rem"},children:"Saldo"}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)",fontWeight:400},children:"Bayar langsung dari saldo"})]})]})]})]}),_&&$==="tabungan"&&!Z&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Pilih Tabungan"}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[b(_.amount)," akan dikurangi"]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>A(null),children:e.jsx(T,{size:16})})]}),e.jsx("div",{className:"wajib-rows",children:(s.savings||[]).map(a=>e.jsxs("div",{className:"wajib-row",style:{cursor:"pointer"},onClick:()=>me(a.id),children:[e.jsx("span",{className:"brow-name",children:a.name}),e.jsx("span",{className:"wajib-amount tabular",style:{color:Number(a.current_amount)>=Number(_.amount)?"#34d399":"#f87171"},children:b(Number(a.current_amount))})]},a.id))})]}),_&&$&&($==="saldo"||Z)&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{children:e.jsx("h2",{className:"modal-title",children:"Konfirmasi"})}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>{$==="saldo"?A(null):me(null)},children:e.jsx(T,{size:16})})]}),e.jsxs("div",{style:{fontSize:"0.82rem",color:"var(--text-muted)",lineHeight:1.6,marginBottom:16},children:["Tandai hutang ke ",e.jsx("strong",{style:{color:"var(--text-primary)"},children:_.nama})," sebesar"," ",e.jsx("strong",{style:{color:"#fbbf24"},children:b(_.amount)})," sebagai ",e.jsx("strong",{style:{color:"#34d399"},children:"lunas"}),$==="tabungan"&&e.jsxs(e.Fragment,{children:[" dari tabungan ",e.jsx("strong",{style:{color:"var(--text-primary)"},children:(xa=(s.savings||[]).find(a=>a.id===Z))==null?void 0:xa.name})]}),"?"]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"flex-end"},children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>{ce(null),A(null),me(null)},children:"Batal"}),e.jsx("button",{className:"btn btn-primary",disabled:Xe,onClick:async()=>{Qe(!0);try{const a=Ke();if($==="tabungan"){const n=(s.savings||[]).find(u=>u.id===Z),l=Math.max(0,Number(n.current_amount)-Number(_.amount)),{error:o}=await f.from("savings").update({current_amount:l}).eq("id",Z);if(o){k(o.message,"error");return}await f.from("savings_ledger").insert({user_id:m.id,savings_id:Z,amount:-Number(_.amount),month:a.substring(0,7),date:a})}else if($==="saldo"){const{error:n}=await f.from("transactions").insert({user_id:m.id,type:"expense",amount:Number(_.amount),description:`Bayar hutang - ${_.nama}`,date:a,category_id:null});if(n){k(n.message,"error");return}}const{error:t}=await f.from("hutang").update({lunas:!0}).eq("id",_.id);if(t){k(t.message,"error");return}k("Hutang lunas ✓","success"),await R(),je(!1),ce(null),A(null),me(null)}catch(a){k(a.message,"error")}finally{Qe(!1)}},children:Xe?"Menyimpan...":"Konfirmasi Lunas"})]})]})]})}),Oa&&e.jsx("div",{className:"modal-overlay",onClick:()=>ge(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:340},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Budget Harian"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:"Batas pengeluaran per hari"})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>ge(!1),children:e.jsx(T,{size:16})})]}),e.jsxs("div",{style:{padding:"4px 0 8px"},children:[e.jsx("label",{style:{fontSize:"0.72rem",color:"var(--text-muted)",display:"block",marginBottom:6},children:"Jumlah per hari"}),e.jsx("input",{className:"form-input",type:"number",placeholder:"cth: 50000",value:Be,onChange:a=>Ze(a.target.value),autoFocus:!0})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8},children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>ge(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",disabled:ea||!Be,onClick:async()=>{aa(!0);try{await re({budget_harian:parseFloat(Be)||0}),ge(!1)}finally{aa(!1)}},children:ea?"Menyimpan...":"Simpan"})]})]})}),$a&&e.jsx("div",{className:"modal-overlay",onClick:()=>ve(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:420},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Pengeluaran Tetap"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:E(g)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>{ve(!1),De(!0)},children:"Kelola"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>ve(!1),children:e.jsx(T,{size:16})})]})]}),e.jsxs("div",{className:"wajib-rows",children:[s.categories.filter(a=>ne(a)).map(a=>{const t=Number(a.budget_limit||0),n=s.salary>0&&t>0?Math.round(t/s.salary*100):null;return e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:e.jsx(se,{size:13})}),e.jsx("span",{className:"brow-name",children:a.name})]}),e.jsxs("div",{className:"wajib-right",children:[n&&e.jsxs("span",{className:"wajib-pct",children:[n,"%"]}),e.jsx("span",{className:"wajib-amount tabular",children:t>0?b(t):"—"})]})]},a.id)}),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Potongan"}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",b(oa)]})]})]})]})}),Wa&&e.jsx("div",{className:"modal-overlay",onClick:()=>Q(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>Q(!1),children:e.jsx(T,{size:16})})]}),e.jsx(yt,{month:g,onSuccess:()=>{R(),Q(!1)},onClose:()=>Q(!1)})]})}),La&&!D&&!Ve&&e.jsx("div",{className:"modal-overlay",onClick:()=>De(!1),children:e.jsxs("div",{className:"modal cat-manager-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Kelola Kategori"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:E(g)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsxs("button",{className:"btn btn-primary btn-sm",onClick:()=>{Fa({is_mandatory:!0}),ie(!0)},children:[e.jsx(Ca,{size:13})," Kategori"]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>De(!1),children:e.jsx(T,{size:16})})]})]}),e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("p",{className:"cat-mgr-section-title",children:"Pengeluaran Wajib"}),e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:s.categories.filter(a=>ne(a)).map(a=>{const t=Number(a.budget_limit)||0,n=s.salary>0&&t>0?Math.round(t/s.salary*100):null;return e.jsxs("div",{className:"cat-mgr-row",children:[e.jsxs("div",{className:"cat-mgr-left",children:[e.jsx("span",{className:"cat-mgr-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:e.jsx(se,{size:14})}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-mgr-name",children:a.name}),e.jsx("span",{className:"cat-mgr-sub",children:"Wajib · langsung dipotong"})]})]}),e.jsxs("div",{className:"cat-mgr-right",children:[n&&e.jsxs("span",{className:"cat-mgr-pct",children:[n,"%"]}),e.jsx("span",{className:"cat-mgr-amount tabular",children:t>0?b(t):"—"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.7rem"},onClick:()=>Za(a),children:"Ubah"})]})]},a.id)})})]})]})}),D&&(()=>{const a=s.categories.find(t=>t.id===D.id);return e.jsx("div",{className:"modal-overlay",onClick:()=>F(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Pengeluaran Wajib — ",a==null?void 0:a.name]}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[E(g),s.salary>0?` · ${b(s.salary)}`:""]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>F(null),children:e.jsx(T,{size:16})})]}),s.salary>0&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx("input",{className:"form-input",type:"number",placeholder:String(Ct),value:D.pct,onChange:t=>la(t.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),e.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),D.pct&&s.salary>0&&e.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",b(Math.round(parseFloat(D.pct)/100*s.salary))]})]}),!D.pct&&e.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(t=>e.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>la(String(t)),children:[t,"%"]},t))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),e.jsx(Ta,{value:D.nominal,onChange:et,autoFocus:!s.salary})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:16},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)",fontSize:"0.78rem"},onClick:()=>{F(null),Ee({id:a.id,name:a.name})},children:"Hapus Kategori"}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>F(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",onClick:at,children:"Simpan"})]})]})]})})})(),le&&e.jsx(zt,{title:"Hapus Kategori",message:`Hapus kategori "${le.name}"? Semua transaksi kategori ini juga akan terhapus.`,confirmLabel:"Hapus",onConfirm:tt,onCancel:()=>Ee(null)}),Ve&&e.jsx("div",{className:"modal-overlay",onClick:()=>ie(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:fe!=null&&fe.id?"Edit Kategori":"Kategori Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>ie(!1),children:e.jsx(T,{size:16})})]}),e.jsx(wt,{editData:fe,salary:s.salary,month:g,onSuccess:()=>{R(),ie(!1)},onClose:()=>ie(!1)})]})}),e.jsx("style",{children:`
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

        /* ── Simulation toggle ────────────────── */
        .db-stat-sim { background: rgba(99,102,241,0.06) !important; }
        [data-theme="light"] .db-stat-sim { background: var(--accent-dim) !important; }

        .sim-toggle {
          width: 28px; height: 16px; border-radius: 99px; border: none;
          background: rgba(255,255,255,0.12); position: relative; cursor: pointer;
          transition: background 0.2s; flex-shrink: 0; padding: 0;
        }
        .sim-toggle::after {
          content: ''; position: absolute; top: 2px; left: 2px;
          width: 12px; height: 12px; border-radius: 50%;
          background: rgba(255,255,255,0.5); transition: transform 0.2s, background 0.2s;
        }
        .sim-toggle.active { background: var(--accent); }
        .sim-toggle.active::after { transform: translateX(12px); background: #fff; }
        [data-theme="light"] .sim-toggle { background: rgba(0,0,0,0.12); }
        [data-theme="light"] .sim-toggle::after { background: rgba(0,0,0,0.35); }
        [data-theme="light"] .sim-toggle.active { background: var(--accent); }
        [data-theme="light"] .sim-toggle.active::after { background: #fff; }

        /* ── Sim delta (hero) ─────────────────── */
        .db-sim-delta {
          font-size: 0.78rem; font-weight: 700; letter-spacing: -0.01em;
          margin-top: 2px;
        }

        /* ── Simulation wrap ──────────────────── */
        .sim-wrap {
          border-radius: var(--radius-lg);
          background: var(--bg-card);
          border: 1px solid var(--border);
          overflow: hidden;
        }

        .sim-cal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 12px 6px;
        }
        .sim-cal-header-label {
          font-size: 0.8rem; font-weight: 700; color: var(--text-primary);
          letter-spacing: -0.01em; text-transform: capitalize;
        }
        .sim-nav-btn {
          background: none; border: none; cursor: pointer;
          color: var(--text-muted); font-size: 1.1rem; padding: 2px 10px;
          border-radius: 6px; transition: all 0.15s; font-family: var(--font-sans);
          line-height: 1;
        }
        .sim-nav-btn:hover { background: rgba(255,255,255,0.07); color: var(--text-primary); }
        [data-theme="light"] .sim-nav-btn:hover { background: rgba(0,0,0,0.06); }

        .sim-cal-scroll {
          display: flex; overflow-x: auto; overflow-y: hidden; scrollbar-width: none;
          padding: 4px calc(50% - 22px) 2px; gap: 0;
          scroll-snap-type: x mandatory;
        }
        .sim-cal-scroll::-webkit-scrollbar { display: none; }

        .sim-cal-item {
          display: flex; flex-direction: column; align-items: center;
          flex-shrink: 0; min-width: 44px; gap: 1px;
          scroll-snap-align: center;
        }

        .sim-cal-day {
          width: 32px; height: 32px; border-radius: 50%;
          border: none; background: transparent;
          color: var(--text-secondary);
          font-size: 0.875rem; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.15s; font-family: var(--font-sans);
        }
        .sim-cal-day:hover { background: rgba(255,255,255,0.07); color: var(--text-primary); }
        .sim-cal-day.active {
          background: #a78bfa; color: #fff;
          font-weight: 800;
        }
        [data-theme="light"] .sim-cal-day.active { background: #7c3aed; color: #fff; }

        .sim-cal-dots { display: flex; gap: 2px; height: 10px; align-items: center; }
        .sim-dot {
          font-size: 0.6rem; font-weight: 700; line-height: 1; flex-shrink: 0;
          display: inline-block;
        }
        .sim-dot.plan { color: var(--accent); }
        .sim-dot.wish { color: var(--warning); }

        .sim-cal-arrow {
          display: flex; justify-content: center; align-items: center; gap: 4px;
          padding: 0 0 4px; color: var(--text-muted); font-size: 0.75rem;
        }

        .sim-hint {
          font-size: 0.62rem; color: var(--text-muted); text-align: center;
          padding: 4px 14px 8px; font-weight: 500;
        }
        .sim-empty {
          font-size: 0.72rem; color: var(--text-muted);
          padding: 10px 16px; text-align: center;
        }

        /* Breakdown panel */
        .sim-breakdown {
          border-top: 1px solid var(--border);
          padding: 12px 14px; display: flex; flex-direction: column; gap: 12px;
        }
        .sim-bk-group { display: flex; flex-direction: column; gap: 4px; }
        .sim-bk-label {
          font-size: 0.58rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 4px;
        }
        .sim-bk-row {
          display: grid; grid-template-columns: 1fr auto;
          align-items: center; gap: 8px;
          padding: 5px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .sim-bk-row:last-child { border-bottom: none; }
        [data-theme="light"] .sim-bk-row { border-bottom-color: rgba(0,0,0,0.05); }
        .sim-bk-date { font-size: 0.62rem; color: var(--text-muted); font-weight: 500; }
        .sim-bk-name { font-size: 0.8rem; font-weight: 600; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .sim-bk-amt { font-size: 0.8rem; font-weight: 700; letter-spacing: -0.02em; white-space: nowrap; }

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
      `})]})}export{Et as default};
