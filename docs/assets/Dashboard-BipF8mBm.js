import{F as bt,H as xt,K as ft,J as vt,D as c,w as te,B as e,z as I,G as jt,y as za,A as Ca,E as j,v as b,f as _a,I as yt,L as Q,d as Te,n as Ta,m as Ma,c as Ke,a as se,b as Pa,s as C,C as Da}from"./index-BV_XpBh9.js";import{T as wt}from"./TransactionForm-Zf61uaUR.js";import{C as Nt}from"./CategoryForm-DCww5-mn.js";import{a as Me,i as ne,d as Ea,f as kt,c as St,e as zt,C as Ct}from"./ConfirmModal-DZgpyXID.js";const _t=15;function Tt(m){const[re,Z]=m.split("-").map(Number),_=new Date(re,Z-2,1);return`${_.getFullYear()}-${String(_.getMonth()+1).padStart(2,"0")}`}function Pe(m){const[re,Z]=m.split("-").map(Number),_=new Date(re,Z,1);return`${_.getFullYear()}-${String(_.getMonth()+1).padStart(2,"0")}`}function It(){var pa,ua,ha,ba,xa,fa,va;const{user:m,updateProfile:re}=bt(),{setHeader:Z}=xt(),_=ft(),[Ia,Ba]=vt(),[g,Wa]=c.useState(()=>Ia.get("month")||te()),[s,La]=c.useState({salary:0,totalExpense:0,totalIncome:0,categories:[],transactions:[],savings:[],savingsLogs:[],categorySpend:[],hutangList:[],hutangTabunganList:[],todayExpense:0,totalTabungan:0,tabunganPerMonth:[],nextMonthPlans:[],cumulativeBalance:0,cumulativeMandatoryBudget:0,gajiTx:null,gajiCatId:null,planEvents:[],allWishlist:[]}),[z,Fa]=c.useState(!1),[f,xe]=c.useState(null),[Aa,Ye]=c.useState(""),[S,Ge]=c.useState(!0),[$a,ee]=c.useState(!1),[Ra,De]=c.useState(!1),[D,$]=c.useState(null),[Ue,ie]=c.useState(!1),[fe,qa]=c.useState(null),[le,Ee]=c.useState(null),[Ha,ve]=c.useState(!1),[Oa,Ie]=c.useState(!1),[Ka,oe]=c.useState(!1),[Ya,de]=c.useState(!1),[Ga,je]=c.useState(!1),[T,ce]=c.useState(null),[Y,R]=c.useState(null),[me,ge]=c.useState(null),[Je,Ve]=c.useState(!1),[Ua,pe]=c.useState(!1),[Be,Xe]=c.useState(""),[Qe,Ze]=c.useState(!1),[q,ye]=c.useState({amount:"",note:"",date:""}),[ea,aa]=c.useState(!1),[We,Le]=c.useState(!1),[B,Fe]=c.useState(()=>Number(te().split("-")[0])),[Ja,Va]=c.useState(!1),[we,ta]=c.useState("transaction"),[Ae,sa]=c.useState(0),[Xa,na]=c.useState(0),[Qa,ra]=c.useState(0),[Za,et]=c.useState(0),[at,Ne]=c.useState(!1);c.useEffect(()=>{if(m.recording_start_month&&g<m.recording_start_month){ke(m.recording_start_month);return}G()},[g,m==null?void 0:m.recording_start_month]),c.useEffect(()=>{const a=g===te(),t=!!m.recording_start_month&&g<=m.recording_start_month,[n,l]=m.recording_start_month?m.recording_start_month.split("-").map(Number):[0,0],o=te(),[p,x]=o.split("-").map(Number),r=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];return Z(e.jsxs(e.Fragment,{children:[We&&e.jsx("div",{style:{position:"fixed",inset:0,zIndex:299},onClick:()=>Le(!1)}),e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>ke(Tt(g)),disabled:t,children:"‹"}),e.jsx("span",{className:"month-label-text month-label-clickable",onClick:()=>{Fe(Number(g.split("-")[0])),Le(u=>!u)},children:I(g)}),e.jsx("button",{className:"month-btn",onClick:()=>ke(Pe(g)),disabled:a,children:"›"}),We&&e.jsxs("div",{className:"month-picker-popup",onMouseDown:u=>u.preventDefault(),children:[e.jsxs("div",{className:"mp-year-row",children:[e.jsx("button",{className:"mp-year-btn",onClick:()=>Fe(u=>u-1),disabled:!!m.recording_start_month&&B<=n,children:"‹"}),e.jsx("span",{className:"mp-year-label",children:B}),e.jsx("button",{className:"mp-year-btn",onClick:()=>Fe(u=>u+1),disabled:B>=p,children:"›"})]}),e.jsx("div",{className:"mp-grid",children:r.map((u,k)=>{const h=k+1,v=`${B}-${String(h).padStart(2,"0")}`,w=B>p||B===p&&h>x,y=!!m.recording_start_month&&(B<n||B===n&&h<l);return e.jsx("button",{className:`mp-month-btn${v===g?" mp-active":""}`,disabled:w||y,onClick:()=>{ke(v),Le(!1)},children:u},v)})})]})]})]})),()=>Z(null)},[g,We,B,m==null?void 0:m.recording_start_month]),jt();const ke=a=>{Wa(a),Ba({month:a})},G=async()=>{Ge(!0);try{const a=`${g}-01`,t=za(g),n=Ca(),l=Pe(g),o=m.recording_start_month;let p=j.from("transactions").select("amount, type, date").eq("user_id",m.id).lt("date",a);o&&(p=p.gte("date",`${o}-01`));let x=j.from("category_budgets").select("budget_limit, category_id, month, categories(is_mandatory, name, category_type)").eq("user_id",m.id).lte("month",g);o&&(x=x.gte("month",o));const[r,u,k,h,v,w,y,L,N,F,V,qe,ze]=await Promise.all([j.from("transactions").select("*, categories(name, color, icon)").eq("user_id",m.id).gte("date",a).lte("date",t).order("date",{ascending:!1}),Promise.all([j.from("categories").select("*").eq("user_id",m.id).is("month",null),j.from("categories").select("*").eq("user_id",m.id).eq("month",g)]).then(([i,d])=>{const A=[...i.data||[],...d.data||[]].sort((_e,ht)=>_e.name.localeCompare(ht.name)),Sa=new Set;return{data:A.filter(_e=>Sa.has(_e.name)?!1:(Sa.add(_e.name),!0))}}),j.from("savings").select("*").eq("user_id",m.id),j.from("savings_log").select("*").eq("user_id",m.id).eq("month",g),j.from("transactions").select("amount").eq("user_id",m.id).eq("date",n).eq("type","expense"),j.from("category_budgets").select("category_id, budget_limit").eq("user_id",m.id).eq("month",g),x,j.from("plans").select("*").eq("user_id",m.id).eq("target_month",l).eq("done",!1).order("created_at",{ascending:!0}),p,j.from("hutang").select("id, nama, amount, due_date, sumber, jenis, lunas").eq("user_id",m.id).eq("month",g).eq("lunas",!1).order("due_date",{ascending:!0,nullsFirst:!1}),j.from("hutang").select("id, nama, amount, jenis, lunas, created_at").eq("user_id",m.id).eq("month",g).eq("sumber","tabungan").order("created_at",{ascending:!1}),j.from("plan_events").select("*").eq("user_id",m.id).order("date",{ascending:!0}),j.from("plans").select("*").eq("user_id",m.id).eq("done",!1).order("target_month",{ascending:!0})]),X=r.data||[],He={};(w.data||[]).forEach(i=>{He[i.category_id]=Number(i.budget_limit)});let ja=(u.data||[]).map(i=>{const d=He[i.id]!==void 0?He[i.id]:0;return{...i,budget_limit:d,budget_set:d>0}});const K=ja.find(i=>Me(i)),ya=K?X.filter(i=>i.type==="income"&&i.category_id===K.id):[],wa=ya.reduce((i,d)=>i+Number(d.amount),0),pt=ja,Na=X.filter(i=>i.type==="expense").reduce((i,d)=>i+Number(d.amount),0),ka=X.filter(i=>i.type==="income"&&i.category_id!==(K==null?void 0:K.id)).reduce((i,d)=>i+Number(d.amount),0),Oe={};X.filter(i=>i.type==="expense"&&i.category_id).forEach(i=>{Oe[i.category_id]=(Oe[i.category_id]||0)+Number(i.amount)});const Ce={};X.filter(i=>i.type==="expense"&&i.categories).forEach(i=>{const d=i.categories.name;Ce[d]||(Ce[d]={name:d,amount:0,color:i.categories.color,icon:i.categories.icon}),Ce[d].amount+=Number(i.amount)});const ut=pt.map(i=>{const d=Oe[i.id]||0,A=i.budget_limit>0?d/i.budget_limit*100:null;return{...i,spent:d,pct:A,overBudget:i.budget_limit>0&&d>i.budget_limit}}).sort((i,d)=>i.overBudget&&!d.overBudget?-1:!i.overBudget&&d.overBudget?1:(d.pct||0)-(i.pct||0));La({salary:wa,totalExpense:Na,totalIncome:ka,categories:ut,transactions:X.slice(0,5),savings:k.data||[],savingsLogs:h.data||[],todayExpense:(v.data||[]).reduce((i,d)=>i+Number(d.amount),0),tabunganPerMonth:(y.data||[]).filter(i=>{var d,A;return(((d=i.categories)==null?void 0:d.category_type)==="savings"||((A=i.categories)==null?void 0:A.name)==="Tabungan Bulanan")&&Number(i.budget_limit)>0}).sort((i,d)=>i.month.localeCompare(d.month)),totalTabungan:(y.data||[]).filter(i=>{var d,A;return((d=i.categories)==null?void 0:d.category_type)==="savings"||((A=i.categories)==null?void 0:A.name)==="Tabungan Bulanan"}).reduce((i,d)=>i+Number(d.budget_limit),0)+(m.tabungan_awal||0)-(V.data||[]).filter(i=>!i.lunas).reduce((i,d)=>i+Number(d.amount),0),categorySpend:Object.values(Ce).sort((i,d)=>d.amount-i.amount),nextMonthPlans:L.data||[],gajiTx:ya[0]||null,gajiCatId:(K==null?void 0:K.id)||null,hutangList:F.data||[],hutangTabunganList:V.data||[],cumulativeBalance:(N.data||[]).reduce((i,d)=>i+(d.type==="income"?Number(d.amount):-Number(d.amount)),0)+wa+ka-Na+(m.saldo_awal||0),cumulativeMandatoryBudget:(y.data||[]).filter(i=>{var d;return((d=i.categories)==null?void 0:d.is_mandatory)===!0}).reduce((i,d)=>i+Number(d.budget_limit),0),planEvents:qe.data||[],allWishlist:ze.data||[],allCurrentMonthTx:X,histTransactions:N.data||[]})}finally{Ge(!1)}},tt=a=>{const t=String(Math.round(a.budget_limit||0)),n=s.salary>0&&a.budget_limit>0?(a.budget_limit/s.salary*100).toFixed(1):"";$({id:a.id,nominal:t,pct:n})},st=a=>{const t=parseFloat(a)||0,n=s.salary>0&&t>0?(t/s.salary*100).toFixed(1):"";$(l=>({...l,nominal:a,pct:n}))},ia=a=>{const t=parseFloat(a)||0,n=s.salary>0&&t>0?String(Math.round(t/100*s.salary)):"";$(l=>({...l,pct:a,nominal:n}))},nt=async()=>{const a=parseFloat(D.nominal)||0,[t,n]=await Promise.all([j.from("category_budgets").upsert({user_id:m.id,category_id:D.id,month:g,budget_limit:a},{onConflict:"category_id,month"}),j.from("categories").update({budget_limit:a}).eq("id",D.id)]),l=t.error||n.error;if(l){_(l.message,"error");return}_("Budget disimpan","success"),$(null),G()},rt=async()=>{const a=`${g}-01`,t=za(g),[n,l]=await Promise.all([j.from("transactions").delete().eq("category_id",le.id).gte("date",a).lte("date",t),j.from("category_budgets").delete().eq("category_id",le.id).eq("month",g)]);if(n.error||l.error){_((n.error||l.error).message,"error");return}const{error:o}=await j.from("categories").delete().eq("id",le.id);if(o){_(o.message,"error");return}_("Kategori dihapus","success"),Ee(null),G()};s.categories.filter(a=>a.budget_limit>0).reduce((a,t)=>a+t.budget_limit,0);const ue=g===te(),U=s.categories.filter(a=>a.overBudget);c.useEffect(()=>{if(U.length<=1){sa(0);return}const a=setInterval(()=>sa(t=>(t+1)%U.length),2e3);return()=>clearInterval(a)},[U.length]);const la=s.categories.filter(a=>ne(a)).reduce((a,t)=>a+Number(t.budget_limit||0),0),it=s.categories.filter(a=>ne(a)).reduce((a,t)=>a+(t.spent||0),0),lt=Math.max(0,la-it),oa=s.totalExpense+lt;s.salary+s.totalIncome-oa,s.salary>0&&oa/s.salary*100;const $e=s.categories.filter(a=>Ea(a)&&a.budget_limit>0).reduce((a,t)=>a+Number(t.budget_limit),0);s.categories.filter(a=>Me(a));const ot=s.categories.filter(a=>Ea(a)),da=s.categories.filter(a=>kt(a)),ca=s.categories.filter(a=>St(a)),ma=s.categories.filter(a=>zt(a)),dt=[{label:"Wajib",spent:da.reduce((a,t)=>a+(t.spent||0),0),budget:da.reduce((a,t)=>a+Number(t.budget_limit||0),0),color:"#f87171",action:()=>ve(!0)},{label:"Rutin",spent:ca.reduce((a,t)=>a+(t.spent||0),0),budget:ca.reduce((a,t)=>a+Number(t.budget_limit||0),0),color:"#fbbf24"},{label:"Tambahan",spent:ma.reduce((a,t)=>a+(t.spent||0),0),budget:ma.reduce((a,t)=>a+Number(t.budget_limit||0),0),color:"#f97316"}],E=ot.filter(a=>Number(a.budget_limit)>0),M=dt.filter(a=>a.spent>0),Se=E.length>0?Xa%E.length:0,he=M.length>0?Qa%M.length:0;c.useEffect(()=>{if(S||E.length<=1)return;const a=setInterval(()=>na(t=>(t+1)%E.length),2500);return()=>clearInterval(a)},[S,E.length]),c.useEffect(()=>{if(S||M.length<=1)return;const a=setInterval(()=>ra(t=>(t+1)%M.length),3e3);return()=>clearInterval(a)},[S,M.length]),c.useEffect(()=>{if(S)return;const a=(s.planEvents||[]).length,t=(s.allWishlist||[]).length;if(a===0||t===0)return;const n=setInterval(()=>et(l=>(l+1)%2),3e3);return()=>clearInterval(n)},[S,s.planEvents,s.allWishlist]);const ae=s.cumulativeBalance-s.cumulativeMandatoryBudget,J=(s.hutangList||[]).filter(a=>a.jenis==="hutang").reduce((a,t)=>a+Number(t.amount),0);s.salary-s.totalExpense-$e,s.salary>0&&s.totalExpense/s.salary*100;const ga=s.salary>0?s.salary-$e:0;ga-s.totalExpense,s.salary>0&&$e>0&&s.totalExpense>ga;const H=Ca(),ct=te(),P=c.useMemo(()=>{const a=new Map,t=new Map;(s.planEvents||[]).forEach(N=>{a.set(N.date,(a.get(N.date)||0)+1)}),(s.allWishlist||[]).forEach(N=>{const[F,V]=N.target_month.split("-").map(Number),qe=new Date(F,V,0).getDate(),ze=`${F}-${String(V).padStart(2,"0")}-${String(qe).padStart(2,"0")}`;t.set(ze,(t.get(ze)||0)+1)});const[n,l]=H.split("-").map(Number),o=new Date(n,l-2,1),p=N=>`${N.getFullYear()}-${String(N.getMonth()+1).padStart(2,"0")}-${String(N.getDate()).padStart(2,"0")}`,x=p(o),r=new Date(n,l+1,0),u=p(r),k=[...a.keys(),...t.keys()],h=k.length>0?k.reduce((N,F)=>N>F?N:F):null,v=h&&h>u?h:u,w=[],y=new Date(x+"T00:00:00"),L=new Date(v+"T00:00:00");for(;y<=L;)w.push({key:p(y),planCount:a.get(p(y))||0,wishlistCount:t.get(p(y))||0}),y.setDate(y.getDate()+1);return w},[s.planEvents,s.allWishlist,H]),Re=c.useMemo(()=>{if(!z||!f)return null;if(f<H){const p=[...s.allCurrentMonthTx||[],...s.histTransactions||[]].filter(x=>x.date>f&&x.date<=H).reduce((x,r)=>x+(r.type==="income"?Number(r.amount):-Number(r.amount)),0);return ae-p}const a=f.slice(0,7),t=(s.planEvents||[]).filter(o=>o.type==="income"&&o.date>=H&&o.date<=f).reduce((o,p)=>o+Number(p.amount),0),n=(s.planEvents||[]).filter(o=>o.type==="expense"&&o.date>=H&&o.date<=f).reduce((o,p)=>o+Number(p.amount),0),l=(s.allWishlist||[]).filter(o=>o.target_month>=ct&&o.target_month<=a).reduce((o,p)=>o+Number(p.amount),0);return ae+t-n-l},[z,f,s.planEvents,s.allWishlist,s.allCurrentMonthTx,s.histTransactions,ae]),mt=()=>{be.current&&clearTimeout(be.current),Fa(a=>!a),xe(null)},W=c.useRef(null),be=c.useRef(null),O=44,gt=a=>{const t=a.currentTarget,n=Math.round(t.scrollLeft/O),l=P[Math.max(0,Math.min(n,P.length-1))];if(l){const o=new Date(l.key+"T00:00:00");Ye(o.toLocaleDateString("id-ID",{month:"long",year:"numeric"})),be.current&&clearTimeout(be.current),be.current=setTimeout(()=>xe(l.key),120)}};return c.useEffect(()=>{if(!z||!W.current||P.length===0)return;const a=P.findIndex(l=>l.key===H),t=a>=0?a:0;W.current.scrollTo({left:t*O,behavior:"instant"});const n=P[t];if(n){const l=new Date(n.key+"T00:00:00");Ye(l.toLocaleDateString("id-ID",{month:"long",year:"numeric"})),xe(n.key)}},[z,P.length]),c.useEffect(()=>{const a=W.current;if(!a)return;let t=!1,n=0;const l=()=>{t=!0,n=Math.round(a.scrollLeft/O)},o=()=>{t=!1},p=x=>{if(!t)return;x.preventDefault();const r=x.deltaY+x.deltaX>0?1:-1;n=Math.max(0,Math.min(n+r,P.length-1)),a.scrollTo({left:n*O,behavior:"instant"})};return a.addEventListener("mouseenter",l),a.addEventListener("mouseleave",o),window.addEventListener("wheel",p,{passive:!1}),()=>{a.removeEventListener("mouseenter",l),a.removeEventListener("mouseleave",o),window.removeEventListener("wheel",p)}},[z,P.length]),c.useEffect(()=>{if(!f||!W.current)return;const a=P.findIndex(n=>n.key===f);if(a<0)return;const t=a*O;Math.abs(W.current.scrollLeft-t)<O||W.current.scrollTo({left:t,behavior:"smooth"})},[f]),e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"db-page",children:[e.jsxs("div",{className:"db-hero",children:[e.jsx("span",{className:"db-eyebrow",children:z&&f?`PROYEKSI · ${new Date(f+"T00:00:00").toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"})}`:J>0?"SALDO BERSIH":"TOTAL SALDO"}),S?e.jsx("div",{className:"skeleton",style:{height:56,width:220,borderRadius:8,marginTop:6}}):e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:6},children:[(()=>{const a=z&&f!==null?Re-J:ae-J,t=a<0;return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:`db-balance${t?" neg":""}`,children:[t&&e.jsx("span",{className:"db-neg-sign",children:"−"}),b(Math.abs(a))]}),z&&f!==null&&Re!==null&&e.jsx("div",{className:"db-sim-delta",children:(()=>{const n=Re-J-(ae-J),l=n>=0;return e.jsxs("span",{style:{color:l?"var(--success)":"var(--danger)"},children:[l?"▲":"▼"," ",l?"+":"−",b(Math.abs(n))," dari sekarang"]})})()})]})})(),J>0&&ue&&!z&&e.jsxs("button",{className:"db-hutang-chip",onClick:()=>je(!0),children:[e.jsx("span",{className:"db-hutang-chip-label",children:"+ hutang"}),e.jsx("span",{className:"db-hutang-chip-amount",children:b(ae)}),e.jsx("span",{className:"db-hutang-chip-arrow",children:"›"})]})]}),e.jsx("div",{className:"db-hero-chips",children:!S&&ue&&s.nextMonthPlans.length>0&&!z&&e.jsxs("button",{className:"db-rencana-chip",onClick:()=>oe(!0),children:[e.jsx(_a,{size:11}),s.nextMonthPlans.length," rencana bulan depan"]})})]}),!S&&e.jsxs("div",{className:"db-stats-grid",children:[e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>{var a,t;ye({amount:s.gajiTx?String(s.gajiTx.amount):"",note:((a=s.gajiTx)==null?void 0:a.description)||"",date:((t=s.gajiTx)==null?void 0:t.date)||`${g}-01`}),de(!0)},children:[e.jsx("span",{className:"db-stat-label",children:"PEMASUKAN"}),e.jsx("span",{className:"db-stat-val tabular",style:{color:s.salary>0?"#34d399":"var(--text-muted)"},children:s.salary>0?`+${b(s.salary)}`:"—"}),e.jsx("span",{className:"db-stat-sub",children:s.salary>0?"bulan ini":"belum dicatat"})]}),e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>Ie(!0),children:[e.jsx("span",{className:"db-stat-label",children:"TABUNGAN"}),E.length>0?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"db-stat-val tabular",style:{color:"#818cf8"},children:b(((pa=E[Se])==null?void 0:pa.budget_limit)||0)}),e.jsx("span",{className:"db-stat-sub",style:{color:(ua=E[Se])==null?void 0:ua.color},children:((ha=E[Se])==null?void 0:ha.name)||"—"}),E.length>1&&e.jsx("div",{className:"db-sub-dots",children:E.map((a,t)=>e.jsx("span",{className:`db-sub-dot${Se===t?" active":""}`,onClick:n=>{n.stopPropagation(),na(t)}},t))})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"db-stat-val tabular",style:{color:"var(--text-muted)"},children:"—"}),e.jsx("span",{className:"db-stat-sub",children:"belum diatur"})]})]}),e.jsxs("button",{className:"db-stat db-stat-btn",onClick:()=>{var a,t;return(t=(a=M[he])==null?void 0:a.action)==null?void 0:t.call(a)},children:[e.jsx("span",{className:"db-stat-label",children:"PENGELUARAN"}),M.length>0?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"db-stat-val tabular",style:{color:"#f87171"},children:["−",b(((ba=M[he])==null?void 0:ba.spent)||0)]}),e.jsx("span",{className:"db-stat-sub",style:{color:(xa=M[he])==null?void 0:xa.color},children:(fa=M[he])==null?void 0:fa.label}),M.length>1&&e.jsx("div",{className:"db-sub-dots",children:M.map((a,t)=>e.jsx("span",{className:`db-sub-dot${he===t?" active":""}`,onClick:n=>{n.stopPropagation(),ra(t)}},t))})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"db-stat-val tabular",style:{color:"var(--text-muted)"},children:"—"}),e.jsx("span",{className:"db-stat-sub",children:"belum ada"})]})]}),(()=>{const a=(s.planEvents||[]).length,t=(s.allWishlist||[]).length,n=a+t,l=a>0&&t>0,o=l?Za%2:a>0?0:1,p=a>0&&(!l||o===0),x=p?a:t,r=p?"#818cf8":"#fbbf24",u=p?"plan events":"wishlist aktif";return e.jsxs("div",{className:`db-stat${z?" db-stat-sim":""}`,style:{cursor:"pointer"},onClick:()=>Ne(!0),children:[e.jsx("span",{className:"db-stat-label",children:"PLAN & WISHLIST"}),e.jsx("span",{className:"db-stat-val tabular",style:{color:n>0?r:"var(--text-muted)"},children:x>0?x:"—"}),e.jsx("span",{className:"db-stat-sub",style:{color:n>0?r:void 0},children:n>0?u:"belum ada"}),ue&&e.jsx("button",{className:`sim-toggle${z?" active":""}`,onClick:k=>{k.stopPropagation(),mt()},title:z?"Matikan Simulasi":"Mode Simulasi"})]})})()]}),S&&e.jsx("div",{className:"skeleton",style:{height:120,borderRadius:"var(--radius-lg)"}}),!S&&ue&&z&&e.jsxs("div",{className:"sim-wrap",children:[e.jsxs("div",{className:"sim-cal-header",children:[e.jsx("button",{className:"sim-nav-btn",onClick:()=>{var a;return(a=W.current)==null?void 0:a.scrollBy({left:-O*7,behavior:"smooth"})},children:"‹"}),e.jsx("span",{className:"sim-cal-header-label",children:Aa}),e.jsx("button",{className:"sim-nav-btn",onClick:()=>{var a;return(a=W.current)==null?void 0:a.scrollBy({left:O*7,behavior:"smooth"})},children:"›"})]}),e.jsx("div",{className:"sim-cal-scroll",ref:W,onScroll:gt,children:P.map(a=>{const t=f===a.key,l=new Date(a.key+"T00:00:00").getDate(),o=a.planCount>0,p=a.wishlistCount>0,x=t?void 0:o?{background:"rgba(167,139,250,0.28)",color:"#c4b5fd",fontWeight:800}:p?{background:"rgba(251,191,36,0.28)",color:"#fcd34d",fontWeight:700}:void 0;return e.jsxs("div",{className:"sim-cal-item","data-selected":t?"true":void 0,children:[e.jsx("button",{className:`sim-cal-day${t?" active":""}`,style:x,onClick:()=>xe(t?null:a.key),children:l}),e.jsx("div",{className:"sim-cal-dots"})]},a.key)})}),(()=>{if(!f)return e.jsx("div",{className:"sim-hint",children:"Scroll ke tanggal untuk lihat proyeksi"});const a=P.find(l=>l.key===f),t=((a==null?void 0:a.planCount)??0)>0,n=((a==null?void 0:a.wishlistCount)??0)>0;return!t&&!n?null:e.jsxs("div",{className:"sim-cal-arrow",children:[t&&e.jsx("span",{className:"sim-dot plan",children:"▲"}),n&&e.jsx("span",{className:"sim-dot wish",children:"▲"})]})})(),f&&(()=>{const a=new Date(f+"T00:00:00").toLocaleDateString("id-ID",{day:"numeric",month:"short"});if(f<H){const h=[...(s.allCurrentMonthTx||[]).filter(v=>v.date===f),...(s.histTransactions||[]).filter(v=>v.date===f)];return h.length===0?null:e.jsx("div",{className:"sim-breakdown",children:e.jsxs("div",{className:"sim-bk-group",children:[e.jsxs("span",{className:"sim-bk-label",children:["Transaksi ",a]}),h.map((v,w)=>{var y;return e.jsxs("div",{className:"sim-bk-row",children:[e.jsx("span",{className:"sim-bk-name",children:((y=v.categories)==null?void 0:y.name)||(v.type==="income"?"Pemasukan":"Pengeluaran")}),e.jsxs("span",{className:"sim-bk-amt",style:{color:v.type==="income"?"var(--success)":"var(--danger)"},children:[v.type==="income"?"+":"−",b(v.amount)]})]},v.id||w)})]})})}const t=P.find(h=>h.key===f),n=((t==null?void 0:t.planCount)??0)>0,l=((t==null?void 0:t.wishlistCount)??0)>0;if(!n&&!l)return null;const o=f.slice(0,7),p=(s.planEvents||[]).filter(h=>h.date===f),x=new Date(f+"T00:00:00"),r=new Date(x.getFullYear(),x.getMonth()+1,0).getDate(),k=x.getDate()===r?(s.allWishlist||[]).filter(h=>h.target_month===o):[];return e.jsxs("div",{className:"sim-breakdown",children:[p.length>0&&e.jsxs("div",{className:"sim-bk-group",children:[e.jsxs("span",{className:"sim-bk-label",children:["Plan events ",a]}),p.map(h=>e.jsxs("div",{className:"sim-bk-row",children:[e.jsx("span",{className:"sim-bk-name",children:h.title}),e.jsxs("span",{className:"sim-bk-amt",style:{color:h.type==="income"?"var(--success)":"var(--danger)"},children:[h.type==="income"?"+":"−",b(h.amount)]})]},h.id))]}),k.length>0&&e.jsxs("div",{className:"sim-bk-group",children:[e.jsxs("span",{className:"sim-bk-label",children:["Wishlist ",o]}),k.map(h=>e.jsxs("div",{className:"sim-bk-row",children:[e.jsx("span",{className:"sim-bk-name",children:h.name}),e.jsxs("span",{className:"sim-bk-amt",style:{color:"var(--danger)"},children:["−",b(h.amount)]})]},h.id))]})]})})()]}),!S&&ue&&s.todayExpense>0&&!z&&(()=>{const a=m.budget_harian||0,t=s.todayExpense,n=a>0&&t>=a,l=a>0&&t/a>=.8&&!n,o=a>0&&!n&&!l,p=n?"#f87171":l?"#fbbf24":o?"#34d399":"#818cf8",x=n?"rgba(248,113,113,0.06)":l?"rgba(251,191,36,0.06)":o?"rgba(52,211,153,0.06)":"rgba(129,140,248,0.06)",r=n?"rgba(248,113,113,0.25)":l?"rgba(251,191,36,0.25)":o?"rgba(52,211,153,0.25)":"rgba(129,140,248,0.25)",u=a>0?Math.min(t/a*100,100):0;return e.jsxs("div",{className:"db-daily-card db-daily-card-clickable",style:{background:x,borderColor:r},onClick:()=>{Xe(a>0?String(a):""),pe(!0)},children:[e.jsxs("div",{className:"db-daily-card-left",children:[e.jsx("span",{className:"db-daily-card-label",children:"PENGELUARAN HARI INI"}),e.jsxs("span",{className:"db-daily-card-amount tabular",style:{color:p},children:["−",b(t)]})]}),e.jsx("div",{className:"db-daily-card-right",children:a>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"db-daily-card-track",children:e.jsx("div",{className:"db-daily-card-fill",style:{width:`${u}%`,background:p}})}),e.jsxs("span",{className:"db-daily-card-sub",style:{color:p},children:[n?"Melebihi":l?"Hampir":`${Math.round(u)}%`," dari ",b(a)]})]}):e.jsx("span",{className:"db-daily-card-sub",style:{color:"#818cf8"},children:"Atur budget harian →"})})]})})(),(()=>{var x;const a=s.categories.filter(r=>!ne(r)&&!Me(r)&&r.is_monthly&&(r.budget_limit>0||(r.spent||0)>0)),t=s.categories.filter(r=>!ne(r)&&!Me(r)&&!r.is_monthly&&(r.budget_limit>0||(r.spent||0)>0)),n=(s.hutangList||[]).filter(r=>r.jenis==="hutang"),l=(s.hutangList||[]).filter(r=>r.jenis==="piutang"),o=!S&&a.length===0&&t.length===0&&n.length===0&&l.length===0,p=({cat:r})=>{const u=r.budget_limit>0?r.spent/r.budget_limit*100:0,k=Math.min(u,100),h=u>100,v=!h&&u>=100,w=!h&&u>=80&&u<100,y=h?"var(--danger)":v?"var(--success)":w?"var(--warning)":r.color||"var(--accent)",L=r.budget_limit-(r.spent||0),N=s.salary>0&&r.budget_limit>0?Math.round(r.budget_limit/s.salary*100):null,F=r.budget_limit>0;return e.jsxs("div",{className:`brow${!F&&r.spent>0?" brow-no-budget":""}`,children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${r.color||"#6366f1"}18`},children:e.jsx("span",{style:{width:10,height:10,borderRadius:"50%",background:r.color||"var(--accent)",display:"inline-block",flexShrink:0}})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("span",{className:"brow-name",children:r.name}),h&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Over"}),v&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Penuh"}),w&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Hampir"})]})]}),r.budget_limit>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"brow-bar-wrap",children:e.jsx("div",{className:"brow-bar",children:e.jsx("div",{className:"brow-bar-fill",style:{width:`${k}%`,background:y}})})}),e.jsxs("div",{className:"brow-right",onClick:()=>N&&Va(V=>!V),style:{cursor:N?"pointer":"default"},children:[e.jsx("span",{className:"brow-spent tabular",style:{color:h?"var(--danger)":"var(--text-primary)"},children:b(r.spent||0)}),Ja&&N?e.jsxs("span",{className:"brow-limit tabular",style:{color:"var(--accent)"},children:[N,"% gaji"]}):e.jsx("span",{className:"brow-limit tabular",style:{color:L<0?"var(--danger)":L===0?"var(--text-muted)":"var(--success)"},children:L<0?`Over ${b(Math.abs(L))}`:`Sisa ${b(L)}`})]}),e.jsxs("span",{className:"brow-pct",style:{color:y},children:[u.toFixed(0),"%"]})]}):r.spent>0?e.jsxs("span",{className:"brow-only-spent tabular",style:{color:"var(--danger)"},children:["−",b(r.spent)]}):null]})};return e.jsxs(e.Fragment,{children:[!S&&U.length>0&&e.jsxs("div",{className:"db-alert",children:[e.jsx(yt,{size:11}),e.jsxs("span",{children:["Overbudget — ",e.jsx("strong",{children:(x=U[Ae])==null?void 0:x.name})]}),U.length>1&&e.jsxs("span",{className:"db-alert-count",children:[Ae+1,"/",U.length]})]},Ae),e.jsxs("div",{className:"card dash-tab-card",children:[e.jsxs("div",{className:"sect-head",style:{marginBottom:16},children:[e.jsxs("div",{className:"dash-tab-toggle",children:[e.jsx("button",{className:`dash-tab-btn${we==="transaction"?" active":""}`,onClick:()=>ta("transaction"),children:"My Transaction"}),e.jsx("button",{className:`dash-tab-btn${we==="budget"?" active":""}`,onClick:()=>ta("budget"),children:"My Budget"})]}),e.jsxs("div",{className:"tab-actions",children:[e.jsxs(Q,{to:`/transactions?month=${g}`,className:"tab-act",children:[e.jsx(Te,{size:13}),e.jsx("span",{className:"tab-act-label",children:"Lihat semua"})]}),e.jsxs(Q,{to:`/categories?month=${g}`,className:"tab-act",children:[e.jsx(Ta,{size:13}),e.jsx("span",{className:"tab-act-label",children:"Atur"})]}),e.jsxs("button",{className:"tab-act tab-act-accent",onClick:()=>ee(!0),children:[e.jsx(Ma,{size:13}),e.jsx("span",{className:"tab-act-label",children:"Transaksi"})]})]})]}),e.jsxs("div",{className:"card-scroll-body",children:[we==="transaction"&&(S?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[...Array(4)].map((r,u)=>e.jsx("div",{className:"skeleton",style:{height:42}},u))}):s.transactions.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(Ke,{size:13})}),e.jsx("span",{children:"Belum ada transaksi bulan ini."}),e.jsx("button",{className:"empty-hint-link",onClick:()=>ee(!0),children:"Tambah sekarang →"})]}):e.jsx("div",{className:"tx-list",children:s.transactions.map(r=>{var u;return e.jsxs("div",{className:"tx-row",children:[e.jsx("div",{className:"tx-icon",style:{background:r.type==="income"?"rgba(52,211,153,0.12)":"rgba(248,113,113,0.12)",color:r.type==="income"?"var(--success)":"var(--danger)"},children:r.type==="income"?e.jsx(Ke,{size:14}):e.jsx(se,{size:14})}),e.jsxs("div",{className:"tx-meta",children:[e.jsx("span",{className:"tx-desc",children:r.description||((u=r.categories)==null?void 0:u.name)||"Transaksi"}),e.jsx("span",{className:"tx-date",children:new Date(r.date).toLocaleDateString("id-ID",{day:"numeric",month:"short"})})]}),e.jsxs("span",{className:`tx-amount tabular ${r.type==="income"?"inc":"exp"}`,children:[r.type==="income"?"+":"−",b(r.amount)]})]},r.id)})})),we==="budget"&&(S?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(3)].map((r,u)=>e.jsx("div",{className:"skeleton",style:{height:44}},u))}):o?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(Ta,{size:14})}),e.jsx("span",{children:"Tambahkan kategori dan budget"}),e.jsx(Q,{to:`/categories?month=${g}`,className:"empty-hint-link",style:{color:"var(--accent)"},children:"Atur →"})]}):e.jsxs(e.Fragment,{children:[(n.length>0||l.length>0)&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Hutang & Piutang"}),e.jsx("div",{className:"budget-rows",children:[...n,...l].map(r=>{const u=r.jenis==="piutang",k=u?"#f59e0b":"#f87171",h=new Date;h.setHours(0,0,0,0);const v=r.due_date?new Date(r.due_date):null,w=v?Math.round((v-h)/864e5):null,y=w!==null&&w<0;return e.jsxs("div",{className:"brow",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${k}18`,color:k},children:u?e.jsx(Pa,{size:13}):e.jsx(Te,{size:13})}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("span",{className:"brow-name",children:r.nama}),e.jsx("span",{style:{fontSize:"0.62rem",color:"var(--text-muted)",marginLeft:6},children:u?"piutang":"hutang"}),y&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 6px",marginLeft:6},children:"Terlambat"})]})]}),e.jsx("div",{style:{flex:1}}),e.jsxs("div",{className:"brow-right",children:[e.jsx("span",{className:"brow-spent tabular",style:{color:k},children:b(r.amount)}),r.due_date&&e.jsx("span",{className:"brow-limit tabular",style:{color:y?"var(--danger)":w<=7?"var(--warning)":"var(--text-muted)"},children:w===0?"Hari ini":w>0?`${w}h lagi`:`${Math.abs(w)}h lalu`})]})]},r.id)})})]}),(n.length>0||l.length>0)&&a.length>0&&e.jsx("div",{style:{height:1,background:"var(--border)",margin:"12px 0"}}),a.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Pengeluaran Rutin"}),e.jsx("div",{className:"budget-rows",children:a.map(r=>e.jsx(p,{cat:r},r.id))})]}),(a.length>0||n.length>0||l.length>0)&&t.length>0&&e.jsx("div",{style:{height:1,background:"var(--border)",margin:"12px 0"}}),t.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"budget-section-label",children:"Kategori Lainnya"}),e.jsx("div",{className:"budget-rows",children:t.map(r=>e.jsx(p,{cat:r},r.id))})]}):n.length===0&&l.length===0&&a.length===0&&e.jsxs("div",{style:{fontSize:"0.72rem",color:"var(--text-muted)"},children:["Belum ada kategori dengan budget. ",e.jsx(Q,{to:`/categories?month=${g}`,style:{color:"var(--accent)"},children:"Atur →"})]})]}))]})]})]})})()]}),Ya&&(()=>{const a=s.salary>0,t=async()=>{const n=parseFloat(q.amount.replace(/\D/g,""))||0;if(n){aa(!0);try{const l=q.date||`${g}-01`;if(s.gajiTx){const{error:o}=await j.from("transactions").update({amount:n,description:q.note,date:l}).eq("id",s.gajiTx.id);if(o)throw o}else{const{error:o}=await j.from("transactions").insert({user_id:m.id,category_id:s.gajiCatId,type:"income",amount:n,description:q.note,date:l});if(o)throw o}_("Pemasukan disimpan","success"),de(!1),G()}catch(l){_(l.message,"error")}finally{aa(!1)}}};return e.jsx("div",{className:"modal-overlay",onClick:()=>de(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Pemasukan Bulanan ",I(g)]}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:a?"Edit jumlah atau catatan":"Catat pemasukan bulan ini"})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>de(!1),children:e.jsx(C,{size:16})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Jumlah Pemasukan"}),e.jsx(Da,{value:q.amount,onChange:n=>ye(l=>({...l,amount:n})),autoFocus:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Tanggal Diterima"}),e.jsx("input",{className:"form-input",type:"date",value:q.date,min:`${g}-01`,max:(()=>{const[n,l]=g.split("-").map(Number);return new Date(n,l,0).toISOString().split("T")[0]})(),onChange:n=>ye(l=>({...l,date:n.target.value}))})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Catatan ",!a&&e.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400},children:"(opsional)"})]}),e.jsx("textarea",{className:"form-input",rows:2,placeholder:"Misal: gaji pokok + bonus, tunjangan, dll...",value:q.note,onChange:n=>ye(l=>({...l,note:n.target.value})),style:{resize:"vertical",fontFamily:"var(--font-sans)",fontSize:"0.875rem"}})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>de(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:t,disabled:ea||!q.amount,children:ea?"Menyimpan...":"Simpan"})]})]})})})(),Oa&&e.jsx("div",{className:"modal-overlay",onClick:()=>Ie(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Total Tabungan"}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Akumulasi s/d ",I(g)]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>Ie(!1),children:e.jsx(C,{size:16})})]}),e.jsxs("div",{className:"wajib-rows",children:[(m.tabungan_awal||0)>0&&e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)",fontSize:"0.55rem",fontWeight:800},children:"AWAL"}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:"Saldo Awal Tabungan"}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)"},children:"sebelum mulai record"})]})]}),e.jsx("span",{className:"wajib-amount tabular",style:{color:"var(--success)"},children:b(m.tabungan_awal)})]}),s.tabunganPerMonth.length===0&&!(m.tabungan_awal>0)?e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--text-muted)",padding:"8px 0"},children:'Belum ada alokasi tabungan. Set budget kategori "Tabungan Bulanan".'}):s.tabunganPerMonth.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)"},children:e.jsx(se,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:I(a.month)}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)"},children:"Tabungan Bulanan"})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:Number(a.budget_limit)>0?"var(--success)":"var(--text-muted)"},children:["+",b(a.budget_limit)]})]},a.month)),s.hutangTabunganList.filter(a=>!a.lunas).length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"wajib-divider",style:{margin:"8px 0"}}),e.jsx("div",{style:{fontSize:"0.62rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"var(--text-muted)",marginBottom:4},children:"Outstanding bulan ini"}),s.hutangTabunganList.filter(a=>!a.lunas).map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:a.jenis==="piutang"?"rgba(245,158,11,0.1)":"rgba(248,113,113,0.1)",color:a.jenis==="piutang"?"var(--warning)":"var(--danger)",fontSize:"0.9rem"},children:a.jenis==="piutang"?e.jsx(Pa,{size:13}):e.jsx(Te,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:a.nama}),e.jsx("div",{style:{fontSize:"0.62rem",color:"var(--text-muted)"},children:a.jenis==="hutang"?"Hutang":"Piutang"})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",b(a.amount)]})]},a.id))]}),e.jsx("div",{className:"wajib-divider",style:{margin:"10px 0"}}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:4},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Tabungan"}),e.jsx("span",{className:"wajib-amount tabular",style:{color:s.totalTabungan>0?"var(--success)":"var(--text-muted)",fontWeight:800},children:b(s.totalTabungan)})]})]})]})}),at&&e.jsx("div",{className:"modal-overlay",onClick:()=>Ne(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:420},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Plan & Wishlist"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:"Semua event dan target pembelian"})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx(Q,{to:"/savings",className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>Ne(!1),children:"Kelola →"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>Ne(!1),children:e.jsx(C,{size:16})})]})]}),e.jsxs("div",{style:{marginBottom:16},children:[e.jsxs("div",{style:{fontSize:"0.62rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"#818cf8",marginBottom:8},children:["Plan Events (",(s.planEvents||[]).length,")"]}),(s.planEvents||[]).length===0?e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--text-muted)",padding:"4px 0"},children:"Belum ada plan event."}):e.jsx("div",{className:"wajib-rows",children:(s.planEvents||[]).map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:a.type==="income"?"rgba(52,211,153,0.12)":"rgba(248,113,113,0.12)",color:a.type==="income"?"var(--success)":"var(--danger)"},children:a.type==="income"?e.jsx(Ke,{size:13}):e.jsx(se,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:a.title}),e.jsx("div",{style:{fontSize:"0.62rem",color:"var(--text-muted)"},children:new Date(a.date+"T00:00:00").toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"})})]})]}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:a.type==="income"?"var(--success)":"var(--danger)"},children:[a.type==="income"?"+":"−",b(a.amount)]})]},a.id))})]}),e.jsx("div",{className:"wajib-divider",style:{margin:"4px 0 16px"}}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:"0.62rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"#fbbf24",marginBottom:8},children:["Wishlist (",(s.allWishlist||[]).length,")"]}),(s.allWishlist||[]).length===0?e.jsx("div",{style:{fontSize:"0.75rem",color:"var(--text-muted)",padding:"4px 0"},children:"Belum ada wishlist aktif."}):e.jsx("div",{className:"wajib-rows",children:(s.allWishlist||[]).map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(251,191,36,0.12)",color:"#fbbf24"},children:e.jsx(_a,{size:13})}),e.jsxs("div",{children:[e.jsx("div",{className:"brow-name",children:a.name}),e.jsx("div",{style:{fontSize:"0.62rem",color:"var(--text-muted)"},children:I(a.target_month)})]})]}),e.jsx("span",{className:"wajib-amount tabular",style:{color:"#fbbf24"},children:b(a.amount)})]},a.id))})]})]})}),Ka&&e.jsx("div",{className:"modal-overlay",onClick:()=>oe(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Rencana Bulan Depan"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:I(Pe(g))})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx(Q,{to:"/savings",className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>oe(!1),children:"Kelola →"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>oe(!1),children:e.jsx(C,{size:16})})]})]}),s.nextMonthPlans.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:e.jsx(Te,{size:13})}),e.jsxs("span",{children:["Belum ada rencana untuk ",I(Pe(g)),"."]}),e.jsx(Q,{to:"/savings",className:"empty-hint-link",onClick:()=>oe(!1),children:"Tambah →"})]}):e.jsxs("div",{className:"wajib-rows",children:[s.nextMonthPlans.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsx("span",{className:"brow-name",children:a.name}),e.jsx("span",{className:"wajib-amount tabular",children:b(a.amount)})]},a.id)),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total"}),e.jsx("span",{className:"wajib-amount tabular",children:b(s.nextMonthPlans.reduce((a,t)=>a+Number(t.amount),0))})]})]})]})}),Ga&&e.jsx("div",{className:"modal-overlay",onClick:()=>{je(!1),ce(null),R(null)},children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:a=>a.stopPropagation(),children:[!T&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Detail Pinjaman"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>je(!1),children:e.jsx(C,{size:16})})]}),e.jsxs("div",{className:"wajib-rows",children:[(s.hutangList||[]).filter(a=>a.jenis==="hutang").map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(251,191,36,0.1)",color:"#fbbf24"},children:e.jsx(se,{size:13})}),e.jsx("span",{className:"brow-name",children:a.nama})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("span",{className:"wajib-amount tabular",children:b(Number(a.amount))}),e.jsx("button",{className:"btn btn-sm",style:{fontSize:"0.65rem",padding:"3px 10px",background:"rgba(52,211,153,0.12)",color:"#34d399",border:"1px solid rgba(52,211,153,0.25)",borderRadius:99},onClick:()=>{ce(a),R(null),ge(null)},children:"Bayar"})]})]},a.id)),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Pinjaman"}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"#fbbf24"},children:["−",b(J)]})]})]})]}),T&&!Y&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Hutang Terbayar"}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[T.nama," · ",b(T.amount)]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>ce(null),children:e.jsx(C,{size:16})})]}),e.jsx("p",{style:{fontSize:"0.78rem",color:"var(--text-muted)",marginBottom:14},children:"Bayar dari mana?"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsxs("button",{className:"btn btn-secondary",style:{justifyContent:"flex-start",gap:10},onClick:()=>R("tabungan"),children:[e.jsx("span",{style:{fontSize:"1rem"},children:"🏦"}),e.jsxs("div",{style:{textAlign:"left"},children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.82rem"},children:"Tabungan"}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)",fontWeight:400},children:"Kurangi dari kantong tabungan"})]})]}),e.jsxs("button",{className:"btn btn-secondary",style:{justifyContent:"flex-start",gap:10},onClick:()=>R("saldo"),children:[e.jsx("span",{style:{fontSize:"1rem"},children:"💳"}),e.jsxs("div",{style:{textAlign:"left"},children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.82rem"},children:"Saldo"}),e.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)",fontWeight:400},children:"Bayar langsung dari saldo"})]})]})]})]}),T&&Y==="tabungan"&&!me&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Pilih Tabungan"}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[b(T.amount)," akan dikurangi"]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>R(null),children:e.jsx(C,{size:16})})]}),e.jsx("div",{className:"wajib-rows",children:(s.savings||[]).map(a=>e.jsxs("div",{className:"wajib-row",style:{cursor:"pointer"},onClick:()=>ge(a.id),children:[e.jsx("span",{className:"brow-name",children:a.name}),e.jsx("span",{className:"wajib-amount tabular",style:{color:Number(a.current_amount)>=Number(T.amount)?"#34d399":"#f87171"},children:b(Number(a.current_amount))})]},a.id))})]}),T&&Y&&(Y==="saldo"||me)&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{children:e.jsx("h2",{className:"modal-title",children:"Konfirmasi"})}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>{Y==="saldo"?R(null):ge(null)},children:e.jsx(C,{size:16})})]}),e.jsxs("div",{style:{fontSize:"0.82rem",color:"var(--text-muted)",lineHeight:1.6,marginBottom:16},children:["Tandai hutang ke ",e.jsx("strong",{style:{color:"var(--text-primary)"},children:T.nama})," sebesar"," ",e.jsx("strong",{style:{color:"#fbbf24"},children:b(T.amount)})," sebagai ",e.jsx("strong",{style:{color:"#34d399"},children:"lunas"}),Y==="tabungan"&&e.jsxs(e.Fragment,{children:[" dari tabungan ",e.jsx("strong",{style:{color:"var(--text-primary)"},children:(va=(s.savings||[]).find(a=>a.id===me))==null?void 0:va.name})]}),"?"]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"flex-end"},children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>{ce(null),R(null),ge(null)},children:"Batal"}),e.jsx("button",{className:"btn btn-primary",disabled:Je,onClick:async()=>{Ve(!0);try{if(Y==="tabungan"){const a=(s.savings||[]).find(t=>t.id===me);await j.from("savings").update({current_amount:Number(a.current_amount)-Number(T.amount)}).eq("id",me)}await j.from("hutang").update({lunas:!0}).eq("id",T.id),await G(),je(!1),ce(null),R(null),ge(null)}finally{Ve(!1)}},children:Je?"Menyimpan...":"Konfirmasi Lunas"})]})]})]})}),Ua&&e.jsx("div",{className:"modal-overlay",onClick:()=>pe(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:340},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Budget Harian"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:"Batas pengeluaran per hari"})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>pe(!1),children:e.jsx(C,{size:16})})]}),e.jsxs("div",{style:{padding:"4px 0 8px"},children:[e.jsx("label",{style:{fontSize:"0.72rem",color:"var(--text-muted)",display:"block",marginBottom:6},children:"Jumlah per hari"}),e.jsx("input",{className:"form-input",type:"number",placeholder:"cth: 50000",value:Be,onChange:a=>Xe(a.target.value),autoFocus:!0})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8},children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>pe(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",disabled:Qe||!Be,onClick:async()=>{Ze(!0);try{await re({budget_harian:parseFloat(Be)||0}),pe(!1)}finally{Ze(!1)}},children:Qe?"Menyimpan...":"Simpan"})]})]})}),Ha&&e.jsx("div",{className:"modal-overlay",onClick:()=>ve(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:420},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Pengeluaran Tetap"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:I(g)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>{ve(!1),De(!0)},children:"Kelola"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>ve(!1),children:e.jsx(C,{size:16})})]})]}),e.jsxs("div",{className:"wajib-rows",children:[s.categories.filter(a=>ne(a)).map(a=>{const t=Number(a.budget_limit||0),n=s.salary>0&&t>0?Math.round(t/s.salary*100):null;return e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:e.jsx(se,{size:13})}),e.jsx("span",{className:"brow-name",children:a.name})]}),e.jsxs("div",{className:"wajib-right",children:[n&&e.jsxs("span",{className:"wajib-pct",children:[n,"%"]}),e.jsx("span",{className:"wajib-amount tabular",children:t>0?b(t):"—"})]})]},a.id)}),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Potongan"}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",b(la)]})]})]})]})}),$a&&e.jsx("div",{className:"modal-overlay",onClick:()=>ee(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>ee(!1),children:e.jsx(C,{size:16})})]}),e.jsx(wt,{month:g,onSuccess:()=>{G(),ee(!1)},onClose:()=>ee(!1)})]})}),Ra&&!D&&!Ue&&e.jsx("div",{className:"modal-overlay",onClick:()=>De(!1),children:e.jsxs("div",{className:"modal cat-manager-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Kelola Kategori"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:I(g)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsxs("button",{className:"btn btn-primary btn-sm",onClick:()=>{qa({is_mandatory:!0}),ie(!0)},children:[e.jsx(Ma,{size:13})," Kategori"]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>De(!1),children:e.jsx(C,{size:16})})]})]}),e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("p",{className:"cat-mgr-section-title",children:"Pengeluaran Wajib"}),e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:s.categories.filter(a=>ne(a)).map(a=>{const t=Number(a.budget_limit)||0,n=s.salary>0&&t>0?Math.round(t/s.salary*100):null;return e.jsxs("div",{className:"cat-mgr-row",children:[e.jsxs("div",{className:"cat-mgr-left",children:[e.jsx("span",{className:"cat-mgr-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:e.jsx(se,{size:14})}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-mgr-name",children:a.name}),e.jsx("span",{className:"cat-mgr-sub",children:"Wajib · langsung dipotong"})]})]}),e.jsxs("div",{className:"cat-mgr-right",children:[n&&e.jsxs("span",{className:"cat-mgr-pct",children:[n,"%"]}),e.jsx("span",{className:"cat-mgr-amount tabular",children:t>0?b(t):"—"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.7rem"},onClick:()=>tt(a),children:"Ubah"})]})]},a.id)})})]})]})}),D&&(()=>{const a=s.categories.find(t=>t.id===D.id);return e.jsx("div",{className:"modal-overlay",onClick:()=>$(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Pengeluaran Wajib — ",a==null?void 0:a.name]}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[I(g),s.salary>0?` · ${b(s.salary)}`:""]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>$(null),children:e.jsx(C,{size:16})})]}),s.salary>0&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx("input",{className:"form-input",type:"number",placeholder:String(_t),value:D.pct,onChange:t=>ia(t.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),e.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),D.pct&&s.salary>0&&e.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",b(Math.round(parseFloat(D.pct)/100*s.salary))]})]}),!D.pct&&e.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(t=>e.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>ia(String(t)),children:[t,"%"]},t))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),e.jsx(Da,{value:D.nominal,onChange:st,autoFocus:!s.salary})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:16},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)",fontSize:"0.78rem"},onClick:()=>{$(null),Ee({id:a.id,name:a.name})},children:"Hapus Kategori"}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>$(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",onClick:nt,children:"Simpan"})]})]})]})})})(),le&&e.jsx(Ct,{title:"Hapus Kategori",message:`Hapus kategori "${le.name}"? Semua transaksi kategori ini juga akan terhapus.`,confirmLabel:"Hapus",onConfirm:rt,onCancel:()=>Ee(null)}),Ue&&e.jsx("div",{className:"modal-overlay",onClick:()=>ie(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:fe!=null&&fe.id?"Edit Kategori":"Kategori Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>ie(!1),children:e.jsx(C,{size:16})})]}),e.jsx(Nt,{editData:fe,salary:s.salary,month:g,onSuccess:()=>{G(),ie(!1)},onClose:()=>ie(!1)})]})}),e.jsx("style",{children:`
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
          display: grid; grid-template-columns: 50px 1fr auto;
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
      `})]})}export{It as default};
