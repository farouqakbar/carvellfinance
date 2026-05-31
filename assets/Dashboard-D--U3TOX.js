import{u as ee,e as ae,d as se,r as g,s as b,j as e,L as S}from"./index-P_s38k2_.js";import{g as A,a as _,f as n}from"./formatCurrency-CwSiFA8N.js";import{T as te}from"./TransactionForm-B9hTyWhu.js";import{C as re}from"./CurrencyInput-D0Ri3rQv.js";function ne(d){const[v,f]=d.split("-").map(Number),p=new Date(v,f-2,1);return`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}`}function ie(d){const[v,f]=d.split("-").map(Number),p=new Date(v,f,1);return`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}`}function me(){const{user:d}=ee(),v=ae(),[f,p]=se(),[o,R]=g.useState(()=>f.get("month")||A()),[s,G]=g.useState({salary:0,totalExpense:0,totalIncome:0,categories:[],transactions:[],savings:[],savingsLogs:[],categorySpend:[]}),[y,M]=g.useState(!0),[H,x]=g.useState(!1),[T,D]=g.useState(""),[K,u]=g.useState(!1);g.useEffect(()=>{B()},[o]);const E=a=>{R(a),p({month:a})},B=async()=>{var a;M(!0);try{const r=`${o}-01`,l=`${o}-31`,[c,m,k,Y,U]=await Promise.all([b.from("salaries").select("*").eq("user_id",d.id).eq("month",o).maybeSingle(),b.from("transactions").select("*, categories(name, color, icon)").eq("user_id",d.id).gte("date",r).lte("date",l).order("date",{ascending:!1}),b.from("categories").select("*").eq("user_id",d.id).order("name"),b.from("savings").select("*").eq("user_id",d.id),b.from("savings_log").select("*").eq("user_id",d.id).eq("month",o)]),z=m.data||[],J=k.data||[],Q=z.filter(t=>t.type==="expense").reduce((t,i)=>t+Number(i.amount),0),V=z.filter(t=>t.type==="income").reduce((t,i)=>t+Number(i.amount),0),j={};z.filter(t=>t.type==="expense"&&t.categories).forEach(t=>{const i=t.categories.name;j[i]||(j[i]={name:i,amount:0,color:t.categories.color,icon:t.categories.icon}),j[i].amount+=Number(t.amount)});const X=J.map(t=>{var q;const i=((q=j[t.name])==null?void 0:q.amount)||0,Z=t.budget_limit>0?i/t.budget_limit*100:null;return{...t,spent:i,pct:Z,overBudget:t.budget_limit>0&&i>t.budget_limit}}).sort((t,i)=>t.overBudget&&!i.overBudget?-1:!t.overBudget&&i.overBudget?1:(i.pct||0)-(t.pct||0));G({salary:((a=c.data)==null?void 0:a.amount)||0,totalExpense:Q,totalIncome:V,categories:X,transactions:z.slice(0,5),savings:Y.data||[],savingsLogs:U.data||[],categorySpend:Object.values(j).sort((t,i)=>i.amount-t.amount)})}finally{M(!1)}},O=async()=>{const a=parseFloat(T);a&&(await b.from("salaries").upsert({user_id:d.id,month:o,amount:a},{onConflict:"user_id,month"}),v("Gaji disimpan","success"),x(!1),D(""),B())},F=s.categories.filter(a=>a.budget_limit>0).reduce((a,r)=>a+r.budget_limit,0),w=s.salary+s.totalIncome-s.totalExpense,N=s.salary>0?s.totalExpense/s.salary*100:0,W=o===A(),L=s.categories.filter(a=>a.overBudget),P=N>90?"var(--danger)":N>70?"var(--warning)":"var(--accent)",h=s.savings.reduce((a,r)=>a+Number(r.target_amount),0),C=s.salary>0?s.salary-h:0,I=C-s.totalExpense,$=s.salary>0&&h>0&&s.totalExpense>C;return e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"dash-header",children:[e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>E(ne(o)),children:"‹"}),e.jsx("span",{className:"month-label-text",children:_(o)}),e.jsx("button",{className:"month-btn",onClick:()=>E(ie(o)),disabled:W,children:"›"})]}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary btn-sm",onClick:()=>x(!0),children:"Atur Gaji"}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>u(!0),children:"+ Transaksi"})]})]}),L.length>0&&e.jsxs("div",{className:"alert-banner",children:[e.jsx("span",{children:"⚠"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Overbudget"})," — ",L.map(a=>`${a.icon} ${a.name}`).join(", ")]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx("div",{className:"hero-card",children:y?e.jsx("div",{className:"skeleton",style:{height:88,borderRadius:8}}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"hero-top",children:[e.jsxs("div",{className:"hero-left",children:[e.jsxs("span",{className:"hero-eyebrow",children:["Saldo Bersih ",_(o)]}),e.jsxs("div",{className:`hero-balance ${w<0?"neg":""}`,children:[w<0&&e.jsx("span",{className:"hero-neg-sign",children:"-"}),n(Math.abs(w))]})]}),e.jsxs("div",{className:"hero-right",children:[s.salary>0&&e.jsxs("div",{className:"hero-chip",children:[e.jsx("span",{className:"hero-chip-label",children:"Gaji"}),e.jsx("span",{className:"hero-chip-val tabular",children:n(s.salary)})]}),s.savings.length>0&&e.jsxs("div",{className:"hero-chip",children:[e.jsxs("span",{className:"hero-chip-label",children:["Ditabung ",_(o).split(" ")[0]]}),e.jsx("span",{className:"hero-chip-val tabular",style:{color:"var(--success)"},children:n(s.savingsLogs.reduce((a,r)=>a+Number(r.amount),0))})]})]})]}),s.salary>0?e.jsxs("div",{className:"hero-bar-section",children:[e.jsx("div",{className:"hero-bar-track",children:e.jsx("div",{className:"hero-bar-fill",style:{width:`${Math.min(N,100)}%`,background:P}})}),e.jsxs("div",{className:"hero-bar-labels",children:[e.jsxs("span",{children:[n(s.totalExpense)," dipakai"]}),e.jsxs("span",{style:{color:P,fontWeight:700},children:[N.toFixed(0),"%"]})]})]}):e.jsxs("div",{className:"hero-no-salary",children:[e.jsx("button",{className:"salary-cta",onClick:()=>x(!0),children:"+ Atur gaji bulan ini"}),e.jsx("span",{className:"salary-cta-hint",children:"untuk menghitung saldo bersih"})]})]})}),e.jsxs("div",{className:"stats-strip",children:[e.jsxs("div",{className:"stat-col",children:[e.jsx("span",{className:"stat-col-label",children:"Pemasukan"}),e.jsxs("span",{className:"stat-col-val tabular",style:{color:"var(--success)"},children:["+",n(s.totalIncome)]})]}),e.jsxs("div",{className:"stat-col",children:[e.jsx("span",{className:"stat-col-label",children:"Pengeluaran"}),e.jsxs("span",{className:"stat-col-val tabular",style:{color:$?"var(--danger)":"var(--text-primary)"},children:["-",n(s.totalExpense)]}),s.salary>0&&h>0&&e.jsxs("span",{className:"stat-col-sub",style:{color:$?"var(--danger)":"var(--text-muted)"},children:[$?"⚠ ":"","Batas ",n(C)]})]}),e.jsxs("div",{className:"stat-col",children:[e.jsx("span",{className:"stat-col-label",children:s.salary>0&&h>0?"Sisa belanja":"Bisa ditabung"}),e.jsx("span",{className:"stat-col-val tabular",style:{color:I>=0?"var(--accent)":"var(--danger)"},children:s.salary>0&&h>0?n(Math.max(0,I)):n(Math.max(0,w))}),s.salary>0&&h>0&&e.jsxs("span",{className:"stat-col-sub",children:["Tabungan ",n(h),"/bln"]})]})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"sect-title",children:"Budget Kategori"}),F>0&&e.jsxs("p",{className:"sect-sub",children:[n(s.totalExpense)," dari ",n(F)]})]}),e.jsx(S,{to:"/categories",className:"pill-link",children:"Kelola"})]}),y?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(3)].map((a,r)=>e.jsx("div",{className:"skeleton",style:{height:44}},r))}):s.categories.filter(a=>a.budget_limit>0).length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:"◈"}),e.jsx("span",{children:"Belum ada budget kategori. "}),e.jsx(S,{to:"/categories",className:"empty-hint-link",children:"Buat sekarang →"})]}):e.jsxs("div",{className:"budget-rows",children:[s.categories.filter(a=>a.budget_limit>0).map(a=>{const r=a.budget_limit>0?a.spent/a.budget_limit*100:0,l=Math.min(r,100),c=!a.overBudget&&r>=100,m=!a.overBudget&&r>=80&&r<100,k=a.overBudget?"var(--danger)":c?"var(--success)":m?"var(--warning)":a.color;return e.jsxs("div",{className:"brow",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${a.color}18`,color:a.color},children:a.icon}),e.jsx("span",{className:"brow-name",children:a.name}),a.overBudget&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 7px"},children:"Over"}),c&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.6rem",padding:"2px 7px"},children:"Penuh"}),m&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem",padding:"2px 7px"},children:"Hampir"})]}),e.jsx("div",{className:"brow-bar-wrap",children:e.jsx("div",{className:"brow-bar",children:e.jsx("div",{className:"brow-bar-fill",style:{width:`${l}%`,background:k}})})}),e.jsxs("div",{className:"brow-right",children:[e.jsx("span",{className:"brow-spent tabular",style:{color:a.overBudget?"var(--danger)":"var(--text-primary)"},children:n(a.spent)}),e.jsxs("span",{className:"brow-limit tabular",children:["/",n(a.budget_limit)]})]}),e.jsxs("span",{className:"brow-pct",style:{color:k},children:[l.toFixed(0),"%"]})]},a.id)}),s.categories.filter(a=>a.budget_limit===0&&a.spent>0).map(a=>e.jsxs("div",{className:"brow no-limit",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${a.color}18`,color:a.color},children:a.icon}),e.jsx("span",{className:"brow-name",children:a.name}),e.jsx("span",{className:"brow-no-limit-tag",children:"no limit"})]}),e.jsx("div",{className:"brow-bar-wrap"}),e.jsx("span",{className:"brow-spent tabular",children:n(a.spent)})]},a.id))]})]}),(y||s.savings.length>0)&&e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"sect-title",children:"Tabungan"}),s.savings.length>0&&e.jsxs("p",{className:"sect-sub",children:[n(s.savings.reduce((a,r)=>a+Number(r.current_amount),0))," terkumpul"]})]}),e.jsx(S,{to:"/savings",className:"pill-link",children:"Kelola"})]}),y?e.jsx("div",{className:"savings-grid",children:[...Array(2)].map((a,r)=>e.jsx("div",{className:"skeleton",style:{height:68}},r))}):e.jsx("div",{className:"savings-grid",children:s.savings.map(a=>{const r=a.target_amount>0?Math.min(a.current_amount/a.target_amount*100,100):0,l=r>=100,c=a.deadline?Math.ceil((new Date(a.deadline)-new Date)/864e5):null,m=c!==null&&c<30&&!l;return e.jsxs("div",{className:`sv-chip ${l?"sv-done":m?"sv-urgent":""}`,children:[e.jsxs("div",{className:"sv-chip-top",children:[e.jsx("span",{className:"sv-chip-name",children:a.name}),e.jsx("span",{className:"sv-chip-pct",style:{color:l?"var(--success)":m?"var(--warning)":"var(--text-muted)"},children:l?"✓":`${r.toFixed(0)}%`})]}),e.jsxs("div",{className:"sv-chip-amounts",children:[e.jsx("span",{className:"sv-chip-cur tabular",children:n(a.current_amount)}),e.jsxs("span",{className:"sv-chip-tgt tabular",children:["/ ",n(a.target_amount)]})]}),e.jsx("div",{className:"sv-chip-bar",children:e.jsx("div",{className:"sv-chip-fill",style:{width:`${r}%`,background:l?"var(--success)":m?"var(--warning)":"linear-gradient(90deg, var(--accent), var(--info))"}})}),m&&c!==null&&e.jsx("span",{className:"sv-chip-deadline",children:c>0?`${c} hari lagi`:"Deadline lewat"})]},a.id)})})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",children:[e.jsx("h3",{className:"sect-title",children:"Transaksi Terakhir"}),e.jsx(S,{to:`/transactions?month=${o}`,className:"pill-link",children:"Lihat semua"})]}),y?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,marginTop:12},children:[...Array(4)].map((a,r)=>e.jsx("div",{className:"skeleton",style:{height:42}},r))}):s.transactions.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:"↕"}),e.jsx("span",{children:"Belum ada transaksi bulan ini. "}),e.jsx("button",{className:"empty-hint-link",onClick:()=>u(!0),children:"Tambah sekarang →"})]}):e.jsx("div",{className:"tx-list",children:s.transactions.map(a=>{var r,l,c;return e.jsxs("div",{className:"tx-row",children:[e.jsx("div",{className:"tx-icon",style:{background:(r=a.categories)!=null&&r.color?`${a.categories.color}18`:"var(--bg-input)"},children:((l=a.categories)==null?void 0:l.icon)||(a.type==="income"?"↑":"↓")}),e.jsxs("div",{className:"tx-meta",children:[e.jsx("span",{className:"tx-desc",children:a.description||((c=a.categories)==null?void 0:c.name)||"Transaksi"}),e.jsx("span",{className:"tx-date",children:new Date(a.date).toLocaleDateString("id-ID",{day:"numeric",month:"short"})})]}),e.jsxs("span",{className:`tx-amount tabular ${a.type==="income"?"inc":"exp"}`,children:[a.type==="income"?"+":"−",n(a.amount)]})]},a.id)})})]})]}),H&&e.jsx("div",{className:"modal-overlay",onClick:()=>x(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("h2",{className:"modal-title",children:["Gaji ",_(o)]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>x(!1),children:"✕"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Gaji Bulan Ini"}),e.jsx(re,{value:T,onChange:a=>D(a),autoFocus:!0})]}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>x(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:O,children:"Simpan"})]})]})}),K&&e.jsx("div",{className:"modal-overlay",onClick:()=>u(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>u(!1),children:"✕"})]}),e.jsx(te,{onSuccess:()=>{B(),u(!1)},onClose:()=>u(!1)})]})}),e.jsx("style",{children:`
        /* ── Header ───────────────────────────── */
        .dash-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 20px; gap: 12px; flex-wrap: wrap;
        }
        .month-nav-group { display: flex; align-items: center; gap: 2px; }
        .month-btn {
          width: 30px; height: 30px; border: none; background: none;
          color: var(--text-muted); font-size: 1.2rem; cursor: pointer;
          border-radius: var(--radius-sm); display: flex; align-items: center;
          justify-content: center; transition: all 0.15s; font-family: var(--font-sans);
        }
        .month-btn:hover { background: var(--bg-input); color: var(--text-primary); }
        .month-btn:disabled { opacity: 0.25; cursor: not-allowed; }
        .month-label-text {
          font-size: 0.9375rem; font-weight: 700; letter-spacing: -0.025em;
          color: var(--text-primary); padding: 0 8px; min-width: 130px; text-align: center;
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
          background: linear-gradient(135deg, #12122a 0%, #0f0f17 60%);
          border: 1px solid #252540;
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
        .hero-eyebrow {
          font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.09em;
          color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 5px;
        }
        .hero-balance {
          font-size: clamp(1.75rem, 5vw, 2.5rem);
          font-weight: 800; letter-spacing: -0.04em;
          color: var(--text-primary); font-variant-numeric: tabular-nums; line-height: 1;
        }
        .hero-balance.neg { color: var(--danger); }
        .hero-neg-sign { font-size: 0.7em; vertical-align: 0.05em; margin-right: 1px; }

        .hero-right { display: flex; flex-direction: column; gap: 8px; align-items: flex-end; }
        .hero-chip {
          display: flex; flex-direction: column; align-items: flex-end; gap: 2px;
          background: var(--bg-input); border: 1px solid var(--border);
          border-radius: var(--radius-sm); padding: 8px 12px; min-width: 130px;
        }
        .hero-chip-label {
          font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.07em;
          color: var(--text-muted); font-weight: 600;
        }
        .hero-chip-val {
          font-size: 0.9rem; font-weight: 700;
          color: var(--text-secondary); letter-spacing: -0.02em;
        }

        .hero-bar-section {}
        .hero-bar-track {
          height: 5px; background: var(--border); border-radius: 99px; overflow: hidden; margin-bottom: 7px;
        }
        .hero-bar-fill { height: 100%; border-radius: 99px; transition: width 0.8s cubic-bezier(0.4,0,0.2,1); }
        .hero-bar-labels {
          display: flex; justify-content: space-between;
          font-size: 0.68rem; color: var(--text-muted); font-weight: 500;
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
          font-size: 0.72rem; color: var(--text-muted); font-weight: 500;
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

        /* ── Mobile ───────────────────────────── */
        @media (max-width: 768px) {
          .dash-header { flex-wrap: wrap; row-gap: 8px; }
          .month-label-text { font-size: 0.875rem; min-width: 110px; }
          .hero-card { padding: 16px; }
          .hero-top { flex-direction: column; gap: 8px; margin-bottom: 12px; }
          .hero-right { display: none; }
          .hero-balance { font-size: 1.75rem; }
          .stats-strip { border-radius: var(--radius-sm); }
          .stat-col { padding: 12px 14px; }
          .stat-col-val { font-size: 0.875rem; }
          .brow {
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto;
            grid-template-areas: "left right" "bar bar";
          }
          .brow-left { grid-area: left; }
          .brow-bar-wrap { grid-area: bar; margin-top: 4px; }
          .brow-right { grid-area: right; align-self: start; }
          .brow-pct { display: none; }
          .brow-limit { display: none; }
          .savings-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 400px) {
          .stats-strip { grid-template-columns: 1fr; }
          .stat-col { border-right: none; border-bottom: 1px solid var(--border); flex-direction: row; justify-content: space-between; align-items: center; padding: 10px 14px; }
          .stat-col:last-child { border-bottom: none; }
          .hero-balance { font-size: 1.5rem; }
        }
      `})]})}export{me as default};
