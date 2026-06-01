import{u as Oe,i as Je,h as Ue,r as d,g as H,s as h,j as e,d as N,L as Y,f as o,C as ye}from"./index-vMXtwoXZ.js";import{T as Qe}from"./TransactionForm-zBsJvjoJ.js";import{i as g,a as u,C as Ve}from"./mandatoryCategories-DVTaj19V.js";import{C as Xe}from"./ConfirmModal-pcyNqYX5.js";const Ze=15;function ea(c){const[v,I]=c.split("-").map(Number),j=new Date(v,I-2,1);return`${j.getFullYear()}-${String(j.getMonth()+1).padStart(2,"0")}`}function O(c){const[v,I]=c.split("-").map(Number),j=new Date(v,I,1);return`${j.getFullYear()}-${String(j.getMonth()+1).padStart(2,"0")}`}function na(){const{user:c}=Oe(),v=Je(),[I,j]=Ue(),[l,we]=d.useState(H()),[t,Ne]=d.useState({salary:0,totalExpense:0,totalIncome:0,categories:[],transactions:[],savings:[],savingsLogs:[],categorySpend:[],todayExpense:0,totalTabungan:0,nextMonthPlans:[],cumulativeBalance:0,gajiTx:null,gajiCatId:null}),[R,ne]=d.useState(!0),[ke,k]=d.useState(!1),[Se,q]=d.useState(!1),[x,y]=d.useState(null),[ie,w]=d.useState(!1),[G,J]=d.useState(null),[U,Q]=d.useState(null),[ze,L]=d.useState(!1),[Ce,V]=d.useState(!1),[_e,T]=d.useState(!1),[Te,M]=d.useState(!1),[S,X]=d.useState({amount:"",note:""}),[oe,le]=d.useState(!1),[ce,Z]=d.useState(!1),[B,ee]=d.useState(()=>Number(H().split("-")[0]));d.useEffect(()=>{z()},[l]);const ae=a=>{we(a),j({month:a})},z=async()=>{ne(!0);try{const a=`${l}-01`,s=`${l}-31`,i=new Date().toISOString().split("T")[0],m=O(l),p=c.recording_start_month;let b=h.from("transactions").select("amount, type").eq("user_id",c.id).lte("date",s);p&&(b=b.gte("date",`${p}-01`));let _=h.from("category_budgets").select("budget_limit, category_id").eq("user_id",c.id).lte("month",l);p&&(_=_.gte("month",p));const[P,D,se,Ie,Re,qe,Ge,Le,Ae]=await Promise.all([h.from("transactions").select("*, categories(name, color, icon)").eq("user_id",c.id).gte("date",a).lte("date",s).order("date",{ascending:!1}),h.from("categories").select("*").eq("user_id",c.id).order("name"),h.from("savings").select("*").eq("user_id",c.id),h.from("savings_log").select("*").eq("user_id",c.id).eq("month",l),h.from("transactions").select("amount").eq("user_id",c.id).eq("date",i).eq("type","expense"),h.from("category_budgets").select("*").eq("user_id",c.id).eq("month",l),_,h.from("plans").select("*").eq("user_id",c.id).eq("target_month",m).eq("done",!1).order("created_at",{ascending:!0}),b]),E=P.data||[],W={};(qe.data||[]).forEach(r=>{W[r.category_id]=Number(r.budget_limit)});const re=(D.data||[]).map(r=>({...r,budget_limit:W[r.id]!==void 0?W[r.id]:0,budget_set:W[r.id]!==void 0})),f=(D.data||[]).find(r=>r.name==="Gaji"),fe=f?E.filter(r=>r.type==="income"&&r.category_id===f.id):[],ve=fe.reduce((r,n)=>r+Number(n.amount),0),Ke=E.filter(r=>r.type==="expense").reduce((r,n)=>r+Number(n.amount),0),He=E.filter(r=>r.type==="income"&&r.category_id!==(f==null?void 0:f.id)).reduce((r,n)=>r+Number(n.amount),0),F={};E.filter(r=>r.type==="expense"&&r.categories).forEach(r=>{const n=r.categories.name;F[n]||(F[n]={name:n,amount:0,color:r.categories.color,icon:r.categories.icon}),F[n].amount+=Number(r.amount)});const Ye=re.map(r=>{var K;const n=((K=F[r.name])==null?void 0:K.amount)||0,$=r.budget_limit>0?n/r.budget_limit*100:null;return{...r,spent:n,pct:$,overBudget:r.budget_limit>0&&n>r.budget_limit}}).sort((r,n)=>r.overBudget&&!n.overBudget?-1:!r.overBudget&&n.overBudget?1:(n.pct||0)-(r.pct||0));Ne({salary:ve,totalExpense:Ke,totalIncome:He,categories:Ye,transactions:E.slice(0,5),savings:se.data||[],savingsLogs:Ie.data||[],todayExpense:(Re.data||[]).reduce((r,n)=>r+Number(n.amount),0),totalTabungan:(Ge.data||[]).filter(r=>{const n=re.find($=>$.id===r.category_id);return n&&n.name==="Tabungan Bulanan"}).reduce((r,n)=>r+Number(n.budget_limit),0)+(c.tabungan_awal||0),categorySpend:Object.values(F).sort((r,n)=>n.amount-r.amount),nextMonthPlans:Le.data||[],gajiTx:fe[0]||null,gajiCatId:(f==null?void 0:f.id)||null,cumulativeBalance:(Ae.data||[]).reduce((r,n)=>r+(n.type==="income"?Number(n.amount):-Number(n.amount)),0)+(c.saldo_awal||0)});const je=ve;if(je>0){const r=re.filter(n=>g(n)&&W[n.id]===void 0);if(r.length>0){const n=Math.round(Number(je)*.15);await Promise.all(r.map(K=>h.from("category_budgets").upsert({user_id:c.id,category_id:K.id,month:l,budget_limit:n},{onConflict:"category_id,month"})));const{data:$}=await h.from("categories").select("*").eq("user_id",c.id).order("name");D.data=$}}}finally{ne(!1)}},de=a=>{const s=String(Math.round(a.budget_limit||0)),i=t.salary>0&&a.budget_limit>0?(a.budget_limit/t.salary*100).toFixed(1):"";y({id:a.id,nominal:s,pct:i})},Me=a=>{const s=parseFloat(a)||0,i=t.salary>0&&s>0?(s/t.salary*100).toFixed(1):"";y(m=>({...m,nominal:a,pct:i}))},me=a=>{const s=parseFloat(a)||0,i=t.salary>0&&s>0?String(Math.round(s/100*t.salary)):"";y(m=>({...m,pct:a,nominal:i}))},Be=async()=>{const a=parseFloat(x.nominal)||0;await h.from("category_budgets").upsert({user_id:c.id,category_id:x.id,month:l,budget_limit:a},{onConflict:"category_id,month"}),v("Budget disimpan","success"),y(null),z()},Pe=async()=>{await h.from("categories").delete().eq("id",U.id),v("Kategori dihapus","success"),Q(null),z()};t.categories.filter(a=>a.budget_limit>0).reduce((a,s)=>a+s.budget_limit,0);const De=l===H(),pe=t.categories.filter(a=>a.overBudget),Ee=.15,C=t.categories.filter(a=>g(a)).reduce((a,s)=>{const i=s.budget_set?Number(s.budget_limit):t.salary>0?Math.round(t.salary*Ee):0;return a+i},0),he=t.categories.filter(a=>g(a)).reduce((a,s)=>a+(s.spent||0),0),We=Math.max(0,C-he),ge=t.totalExpense+We;t.salary+t.totalIncome-ge,t.salary>0&&ge/t.salary*100;const Fe=Math.max(0,t.salary-C),$e=Math.max(0,t.totalExpense-he),te=Fe-$e,A=t.salary>0?t.totalExpense/t.salary*100:0,xe=A>90?"var(--danger)":A>70?"var(--warning)":"var(--accent)",ue=t.categories.filter(a=>a.name==="Tabungan Bulanan"&&a.budget_limit>0).reduce((a,s)=>a+Number(s.budget_limit),0),be=t.salary>0?t.salary-ue:0;return be-t.totalExpense,t.salary>0&&ue>0&&t.totalExpense>be,e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"dash-header",children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>ae(ea(l)),children:"‹"}),e.jsx("span",{className:"month-label-text month-label-clickable",onClick:()=>{ee(Number(l.split("-")[0])),Z(a=>!a)},children:N(l)}),e.jsx("button",{className:"month-btn",onClick:()=>ae(O(l)),disabled:De,children:"›"})]}),ce&&(()=>{const a=H(),[s,i]=a.split("-").map(Number),m=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];return e.jsxs("div",{className:"month-picker-popup",onMouseDown:p=>p.preventDefault(),children:[e.jsxs("div",{className:"mp-year-row",children:[e.jsx("button",{className:"mp-year-btn",onClick:()=>ee(p=>p-1),children:"‹"}),e.jsx("span",{className:"mp-year-label",children:B}),e.jsx("button",{className:"mp-year-btn",onClick:()=>ee(p=>p+1),disabled:B>=s,children:"›"})]}),e.jsx("div",{className:"mp-grid",children:m.map((p,b)=>{const _=b+1,P=`${B}-${String(_).padStart(2,"0")}`,D=B>s||B===s&&_>i,se=P===l;return e.jsx("button",{className:`mp-month-btn${se?" mp-active":""}`,disabled:D,onClick:()=>{ae(P),Z(!1)},children:p},P)})})]})})(),ce&&e.jsx("div",{style:{position:"fixed",inset:0,zIndex:299},onClick:()=>Z(!1)})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-primary btn-sm",style:{fontSize:"0.78rem",height:34},onClick:()=>k(!0),children:"+ Transaksi"}),e.jsx(Y,{to:"/categories",className:"btn btn-secondary btn-sm",style:{fontSize:"0.78rem",height:34},children:"⚙ Settings"})]})]}),pe.length>0&&e.jsxs("div",{className:"alert-banner",children:[e.jsx("span",{children:"⚠"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Overbudget"})," — ",pe.map(a=>a.name).join(", ")]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx("div",{className:"hero-card",children:R?e.jsx("div",{className:"skeleton",style:{height:88,borderRadius:8}}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"hero-top",children:[e.jsxs("div",{className:"hero-left",children:[e.jsx("span",{className:"hero-eyebrow",children:"Sisa Belanja"}),e.jsxs("div",{className:`hero-balance ${te<0?"neg":""}`,children:[te<0&&e.jsx("span",{className:"hero-neg-sign",children:"-"}),o(Math.abs(te))]})]}),e.jsxs("div",{className:"hero-right",children:[e.jsxs("div",{className:"hero-chip hero-chip-btn",onClick:()=>{var a;X({amount:t.gajiTx?String(t.gajiTx.amount):"",note:((a=t.gajiTx)==null?void 0:a.description)||""}),M(!0)},children:[e.jsx("span",{className:"hero-chip-label",children:"Gaji"}),e.jsx("span",{className:"hero-chip-val tabular",style:{color:t.salary>0?"var(--success)":"var(--text-muted)"},children:o(t.salary)}),e.jsx("span",{style:{fontSize:"0.6rem",color:"var(--accent)",fontWeight:600,marginTop:1},children:t.salary>0?"See Detail":"+ Catat sekarang"})]}),e.jsxs("div",{className:"hero-chip hero-chip-btn",onClick:()=>L(!0),children:[e.jsx("span",{className:"hero-chip-label",children:"Pengeluaran Wajib"}),e.jsx("span",{className:"hero-chip-val tabular",style:{color:C>0?"var(--danger)":"var(--text-muted)"},children:C>0?`−${o(C)}`:"—"}),e.jsx("span",{style:{fontSize:"0.6rem",color:"var(--accent)",fontWeight:600,marginTop:1},children:"See Detail"})]}),e.jsxs("div",{className:"hero-chip hero-chip-btn",onClick:()=>V(!0),children:[e.jsx("span",{className:"hero-chip-label",children:"Total Tabungan"}),e.jsx("span",{className:"hero-chip-val tabular",style:{color:t.totalTabungan>0?"var(--success)":"var(--text-muted)"},children:o(t.totalTabungan)}),e.jsx("span",{style:{fontSize:"0.6rem",color:"var(--accent)",fontWeight:600,marginTop:1},children:"See Detail"})]})]})]}),t.salary>0&&e.jsxs("div",{className:"hero-bar-section",style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx("div",{className:"hero-bar-track",style:{flex:1},children:e.jsx("div",{className:"hero-bar-fill",style:{width:`${Math.min(A,100)}%`,background:xe}})}),e.jsxs("span",{style:{fontSize:"0.68rem",color:xe,fontWeight:700,flexShrink:0},children:[A.toFixed(0),"%"]})]}),e.jsxs("div",{className:"hero-stats-row",children:[e.jsxs("div",{className:"hero-stat",children:[e.jsx("span",{className:"hero-stat-label",children:"Total Pengeluaran"}),e.jsx("span",{className:"hero-stat-val",style:{color:t.totalExpense>0?"var(--danger)":"var(--text-muted)"},children:t.totalExpense>0?`−${o(t.totalExpense)}`:"—"}),e.jsx("span",{className:"hero-stat-sub",children:"bulan ini"})]}),e.jsx("div",{className:"hero-stat-divider"}),e.jsxs("div",{className:"hero-stat",children:[e.jsx("span",{className:"hero-stat-label",children:"Hari Ini"}),e.jsx("span",{className:"hero-stat-val",style:{color:t.todayExpense>0?"var(--danger)":"var(--text-muted)"},children:t.todayExpense>0?`−${o(t.todayExpense)}`:"—"}),e.jsx("span",{className:"hero-stat-sub",children:"pengeluaran"})]}),e.jsx("div",{className:"hero-stat-divider"}),e.jsxs("div",{className:"hero-stat hero-stat-btn",onClick:()=>T(!0),children:[e.jsx("span",{className:"hero-stat-label",children:"Rencana Bulan Depan"}),e.jsx("span",{className:"hero-stat-val",style:{color:t.nextMonthPlans.length>0?"var(--text-primary)":"var(--text-muted)"},children:t.nextMonthPlans.length>0?o(t.nextMonthPlans.reduce((a,s)=>a+Number(s.amount),0)):"—"}),e.jsx("span",{className:"hero-stat-sub",style:{color:"var(--accent)",fontWeight:600},children:t.nextMonthPlans.length>0?`${t.nextMonthPlans.length} item · See Detail`:"Belum ada"})]})]})]})}),(R||t.categories.filter(a=>!g(a)&&!u(a)&&a.budget_limit>0).length>0)&&e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"sect-title",children:"Budget Kategori"}),t.categories.filter(a=>!g(a)&&!u(a)&&a.budget_limit>0).length>0&&e.jsxs("p",{className:"sect-sub",children:[o(t.categories.filter(a=>!g(a)&&!u(a)).reduce((a,s)=>a+(s.spent||0),0))," dari ",o(t.categories.filter(a=>!g(a)&&!u(a)&&a.budget_limit>0).reduce((a,s)=>a+Number(s.budget_limit),0))]})]}),e.jsx("button",{className:"pill-link",onClick:()=>q(!0),children:"Kelola"})]}),R?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(2)].map((a,s)=>e.jsx("div",{className:"skeleton",style:{height:44}},s))}):e.jsx("div",{className:"budget-rows",children:t.categories.filter(a=>!g(a)&&!u(a)&&a.budget_limit>0).map(a=>{const s=a.spent/a.budget_limit*100,i=Math.min(s,100),m=!a.overBudget&&s>=100,p=!a.overBudget&&s>=80&&s<100,b=a.overBudget?"var(--danger)":m?"var(--success)":p?"var(--warning)":a.color;return e.jsxs("div",{className:"brow",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${a.color}18`,color:a.color},children:"−"}),e.jsx("span",{className:"brow-name",children:a.name}),a.overBudget&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 7px"},children:"Over"}),m&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.6rem",padding:"2px 7px"},children:"Penuh"}),p&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem",padding:"2px 7px"},children:"Hampir"})]}),e.jsx("div",{className:"brow-bar-wrap",children:e.jsx("div",{className:"brow-bar",children:e.jsx("div",{className:"brow-bar-fill",style:{width:`${i}%`,background:b}})})}),e.jsxs("div",{className:"brow-right",children:[e.jsx("span",{className:"brow-spent tabular",style:{color:a.overBudget?"var(--danger)":"var(--text-primary)"},children:o(a.spent)}),e.jsxs("span",{className:"brow-limit tabular",children:["/",o(a.budget_limit)]})]}),e.jsxs("span",{className:"brow-pct",style:{color:b},children:[i.toFixed(0),"%"]})]},a.id)})})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",children:[e.jsx("h3",{className:"sect-title",children:"Transaksi Terakhir"}),e.jsx(Y,{to:`/transactions?month=${l}`,className:"pill-link",children:"Lihat semua"})]}),R?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,marginTop:12},children:[...Array(4)].map((a,s)=>e.jsx("div",{className:"skeleton",style:{height:42}},s))}):t.transactions.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:"↕"}),e.jsx("span",{children:"Belum ada transaksi bulan ini. "}),e.jsx("button",{className:"empty-hint-link",onClick:()=>k(!0),children:"Tambah sekarang →"})]}):e.jsx("div",{className:"tx-list",children:t.transactions.map(a=>{var s;return e.jsxs("div",{className:"tx-row",children:[e.jsx("div",{className:"tx-icon",style:{background:a.type==="income"?"rgba(52,211,153,0.12)":"rgba(248,113,113,0.12)",color:a.type==="income"?"var(--success)":"var(--danger)",fontSize:"1rem",fontWeight:700},children:a.type==="income"?"↑":"↓"}),e.jsxs("div",{className:"tx-meta",children:[e.jsx("span",{className:"tx-desc",children:a.description||((s=a.categories)==null?void 0:s.name)||"Transaksi"}),e.jsx("span",{className:"tx-date",children:new Date(a.date).toLocaleDateString("id-ID",{day:"numeric",month:"short"})})]}),e.jsxs("span",{className:`tx-amount tabular ${a.type==="income"?"inc":"exp"}`,children:[a.type==="income"?"+":"−",o(a.amount)]})]},a.id)})})]})]}),Te&&(()=>{const a=t.salary>0,s=async()=>{const i=parseFloat(S.amount.replace(/\D/g,""))||0;if(!i)return;le(!0);const m=`${l}-01`;t.gajiTx?await h.from("transactions").update({amount:i,description:S.note,date:m}).eq("id",t.gajiTx.id):await h.from("transactions").insert({user_id:c.id,category_id:t.gajiCatId,type:"income",amount:i,description:S.note,date:m}),v("Gaji disimpan","success"),le(!1),M(!1),z()};return e.jsx("div",{className:"modal-overlay",onClick:()=>M(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:i=>i.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Gaji ",N(l)]}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:a?"Edit jumlah atau catatan":"Catat pemasukan gaji bulan ini"})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>M(!1),children:"✕"})]}),a?e.jsxs("div",{style:{marginBottom:16,padding:"12px 14px",background:"var(--bg-input)",borderRadius:"var(--radius-sm)",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:"0.72rem",color:"var(--text-muted)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em"},children:"Gaji tercatat"}),e.jsx("span",{style:{fontSize:"1.1rem",fontWeight:800,color:"var(--success)",letterSpacing:"-0.02em"},children:o(t.salary)})]}):e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Jumlah Gaji"}),e.jsx(ye,{value:S.amount,onChange:i=>X(m=>({...m,amount:i})),autoFocus:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Catatan ",!a&&e.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400},children:"(opsional)"})]}),e.jsx("textarea",{className:"form-input",rows:3,placeholder:"Misal: gaji pokok + bonus, tunjangan, dll...",value:S.note,onChange:i=>X(m=>({...m,note:i.target.value})),style:{resize:"vertical",fontFamily:"var(--font-sans)",fontSize:"0.875rem"}})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>M(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:s,disabled:oe||!a&&!S.amount,children:oe?"Menyimpan...":a?"Simpan Catatan":"Simpan Gaji"})]})]})})})(),Ce&&e.jsx("div",{className:"modal-overlay",onClick:()=>V(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Total Tabungan"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:"Semua kantong tabungan"})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>V(!1),children:"✕"})]}),t.savings.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:"🏦"}),e.jsx("span",{children:"Belum ada kantong tabungan."})]}):e.jsxs("div",{className:"wajib-rows",children:[t.savings.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)"},children:"−"}),e.jsx("span",{className:"brow-name",children:a.name})]}),e.jsx("span",{className:"wajib-amount tabular",style:{color:a.current_amount>0?"var(--success)":"var(--text-muted)"},children:o(a.current_amount||0)})]},a.id)),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total"}),e.jsx("span",{className:"wajib-amount tabular",style:{color:"var(--success)"},children:o(t.savings.reduce((a,s)=>a+Number(s.current_amount||0),0)+(c.tabungan_awal||0))})]})]})]})}),_e&&e.jsx("div",{className:"modal-overlay",onClick:()=>T(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Rencana Bulan Depan"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:N(O(l))})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx(Y,{to:"/savings",className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>T(!1),children:"Kelola →"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>T(!1),children:"✕"})]})]}),t.nextMonthPlans.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:"◈"}),e.jsxs("span",{children:["Belum ada rencana untuk ",N(O(l)),"."]}),e.jsx(Y,{to:"/savings",className:"empty-hint-link",onClick:()=>T(!1),children:"Tambah →"})]}):e.jsxs("div",{className:"wajib-rows",children:[t.nextMonthPlans.map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsx("span",{className:"brow-name",children:a.name}),e.jsx("span",{className:"wajib-amount tabular",children:o(a.amount)})]},a.id)),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total"}),e.jsx("span",{className:"wajib-amount tabular",children:o(t.nextMonthPlans.reduce((a,s)=>a+Number(s.amount),0))})]})]})]})}),ze&&e.jsx("div",{className:"modal-overlay",onClick:()=>L(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:420},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Pengeluaran Tetap"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:N(l)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem"},onClick:()=>{L(!1),q(!0)},children:"Kelola"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>L(!1),children:"✕"})]})]}),e.jsxs("div",{className:"wajib-rows",children:[t.categories.filter(a=>u(a)).map(a=>e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)"},children:"+"}),e.jsx("span",{className:"brow-name",children:a.name}),e.jsx("span",{className:"wajib-type-badge income",children:"Pemasukan"})]}),e.jsx("span",{className:"wajib-amount tabular",style:{color:t.salary>0?"var(--success)":"var(--text-muted)"},children:t.salary>0?`+${o(t.salary)}`:"—"})]},a.id)),t.categories.some(a=>u(a))&&e.jsx("div",{className:"wajib-divider"}),t.categories.filter(a=>g(a)).map(a=>{const s=a.budget_set?Number(a.budget_limit):t.salary>0?Math.round(t.salary*.15):0,i=t.salary>0&&s>0?Math.round(s/t.salary*100):null;return e.jsxs("div",{className:"wajib-row",children:[e.jsxs("div",{className:"wajib-left",children:[e.jsx("span",{className:"brow-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:"−"}),e.jsx("span",{className:"brow-name",children:a.name})]}),e.jsxs("div",{className:"wajib-right",children:[i&&e.jsxs("span",{className:"wajib-pct",children:[i,"%"]}),e.jsx("span",{className:"wajib-amount tabular",children:s>0?o(s):"—"})]})]},a.id)}),e.jsx("div",{className:"wajib-divider"}),e.jsxs("div",{className:"wajib-row",style:{paddingTop:10},children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--text-primary)"},children:"Total Potongan"}),e.jsxs("span",{className:"wajib-amount tabular",style:{color:"var(--danger)"},children:["−",o(C)]})]})]})]})}),ke&&e.jsx("div",{className:"modal-overlay",onClick:()=>k(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>k(!1),children:"✕"})]}),e.jsx(Qe,{onSuccess:()=>{z(),k(!1)},onClose:()=>k(!1)})]})}),Se&&!x&&!ie&&e.jsx("div",{className:"modal-overlay",onClick:()=>q(!1),children:e.jsxs("div",{className:"modal cat-manager-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Kelola Kategori"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:N(l)})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>{J(null),w(!0)},children:"+ Kategori"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>q(!1),children:"✕"})]})]}),e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("p",{className:"cat-mgr-section-title",children:"Pemasukan Wajib"}),e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:t.categories.filter(a=>u(a)).map(a=>e.jsxs("div",{className:"cat-mgr-row",children:[e.jsxs("div",{className:"cat-mgr-left",children:[e.jsx("span",{className:"cat-mgr-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)"},children:"+"}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-mgr-name",children:a.name}),e.jsx("span",{className:"cat-mgr-sub",children:"Wajib · pemasukan rutin"})]})]}),e.jsx("div",{className:"cat-mgr-right",children:e.jsx("span",{className:"cat-mgr-amount tabular",style:{color:t.salary>0?"var(--success)":"var(--text-muted)"},children:t.salary>0?o(t.salary):"—"})})]},a.id))})]}),e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("p",{className:"cat-mgr-section-title",children:"Pengeluaran Wajib"}),e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:t.categories.filter(a=>g(a)).map(a=>{const s=Number(a.budget_limit)||0,i=t.salary>0&&s>0?Math.round(s/t.salary*100):null;return e.jsxs("div",{className:"cat-mgr-row",children:[e.jsxs("div",{className:"cat-mgr-left",children:[e.jsx("span",{className:"cat-mgr-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:"−"}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-mgr-name",children:a.name}),e.jsx("span",{className:"cat-mgr-sub",children:"Wajib · langsung dipotong"})]})]}),e.jsxs("div",{className:"cat-mgr-right",children:[i&&e.jsxs("span",{className:"cat-mgr-pct",children:[i,"%"]}),e.jsx("span",{className:"cat-mgr-amount tabular",children:s>0?o(s):"—"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.7rem"},onClick:()=>de(a),children:"Ubah"})]})]},a.id)})})]}),e.jsxs("div",{children:[e.jsx("p",{className:"cat-mgr-section-title",children:"Kategori Lainnya"}),t.categories.filter(a=>!g(a)&&!u(a)).length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:"◈"}),e.jsx("span",{children:"Belum ada kategori tambahan."}),e.jsx("button",{className:"empty-hint-link",onClick:()=>{J(null),w(!0)},children:"Tambah →"})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:t.categories.filter(a=>!g(a)&&!u(a)).map(a=>{const s=Number(a.budget_limit)||0,i=t.salary>0&&s>0?Math.round(s/t.salary*100):null;return e.jsxs("div",{className:"cat-mgr-row",children:[e.jsxs("div",{className:"cat-mgr-left",children:[e.jsx("span",{className:"cat-mgr-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:"−"}),e.jsx("span",{className:"cat-mgr-name",children:a.name})]}),e.jsxs("div",{className:"cat-mgr-right",children:[i&&e.jsxs("span",{className:"cat-mgr-pct",children:[i,"%"]}),e.jsx("span",{className:"cat-mgr-amount tabular",children:s>0?o(s):"—"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.7rem"},onClick:()=>de(a),children:s>0?"Set":"+ Budget"}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{J(a),w(!0)},children:"✎"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)"},onClick:()=>Q({id:a.id,name:a.name}),children:"✕"})]})]},a.id)})})]})]})}),x&&(()=>{const a=t.categories.find(s=>s.id===x.id);return e.jsx("div",{className:"modal-overlay",onClick:()=>y(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Budget — ",a==null?void 0:a.name]}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[N(l),t.salary>0?` · Gaji ${o(t.salary)}`:""]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>y(null),children:"✕"})]}),t.salary>0&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx("input",{className:"form-input",type:"number",placeholder:String(Ze),value:x.pct,onChange:s=>me(s.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),e.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),x.pct&&t.salary>0&&e.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",o(Math.round(parseFloat(x.pct)/100*t.salary))]})]}),!x.pct&&e.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(s=>e.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>me(String(s)),children:[s,"%"]},s))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),e.jsx(ye,{value:x.nominal,onChange:Me,autoFocus:!t.salary})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>y(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:Be,children:"Simpan"})]})]})})})(),U&&e.jsx(Xe,{title:"Hapus Kategori",message:`Hapus kategori "${U.name}"? Transaksi yang terhubung tidak akan ikut terhapus.`,confirmLabel:"Hapus",onConfirm:Pe,onCancel:()=>Q(null)}),ie&&e.jsx("div",{className:"modal-overlay",onClick:()=>w(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:G!=null&&G.id?"Edit Kategori":"Kategori Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>w(!1),children:"✕"})]}),e.jsx(Ve,{editData:G,onSuccess:()=>{z(),w(!1)},onClose:()=>w(!1)})]})}),e.jsx("style",{children:`
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
