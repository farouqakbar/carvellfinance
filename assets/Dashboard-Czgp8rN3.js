import{u as Q,e as V,d as X,r as p,s as w,j as e,L as k}from"./index-DGLiPZED.js";import{g as I,a as _,f as o}from"./formatCurrency-CwSiFA8N.js";import{T as Z}from"./TransactionForm-GszQjaqL.js";import{C as ee}from"./CurrencyInput-oaYanA9C.js";function ae(d){const[b,u]=d.split("-").map(Number),m=new Date(b,u-2,1);return`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}`}function te(d){const[b,u]=d.split("-").map(Number),m=new Date(b,u,1);return`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}`}function oe(){const{user:d}=Q(),b=V(),[u,m]=X(),[l,P]=p.useState(()=>u.get("month")||I()),[r,A]=p.useState({salary:0,totalExpense:0,totalIncome:0,categories:[],transactions:[],savings:[],categorySpend:[]}),[v,C]=p.useState(!0),[L,h]=p.useState(!1),[B,$]=p.useState(""),[R,g]=p.useState(!1);p.useEffect(()=>{z()},[l]);const M=a=>{P(a),m({month:a})},z=async()=>{var a;C(!0);try{const s=`${l}-01`,n=`${l}-31`,[c,x,H,K]=await Promise.all([w.from("salaries").select("*").eq("user_id",d.id).eq("month",l).single(),w.from("transactions").select("*, categories(name, color, icon)").eq("user_id",d.id).gte("date",s).lte("date",n).order("date",{ascending:!1}),w.from("categories").select("*").eq("user_id",d.id).order("name"),w.from("savings").select("*").eq("user_id",d.id)]),N=x.data||[],O=H.data||[],W=N.filter(t=>t.type==="expense").reduce((t,i)=>t+Number(i.amount),0),Y=N.filter(t=>t.type==="income").reduce((t,i)=>t+Number(i.amount),0),f={};N.filter(t=>t.type==="expense"&&t.categories).forEach(t=>{const i=t.categories.name;f[i]||(f[i]={name:i,amount:0,color:t.categories.color,icon:t.categories.icon}),f[i].amount+=Number(t.amount)});const U=O.map(t=>{var F;const i=((F=f[t.name])==null?void 0:F.amount)||0,J=t.budget_limit>0?i/t.budget_limit*100:null;return{...t,spent:i,pct:J,overBudget:t.budget_limit>0&&i>t.budget_limit}}).sort((t,i)=>t.overBudget&&!i.overBudget?-1:!t.overBudget&&i.overBudget?1:(i.pct||0)-(t.pct||0));A({salary:((a=c.data)==null?void 0:a.amount)||0,totalExpense:W,totalIncome:Y,categories:U,transactions:N.slice(0,6),savings:K.data||[],categorySpend:Object.values(f).sort((t,i)=>i.amount-t.amount)})}finally{C(!1)}},q=async()=>{const a=parseFloat(B);a&&(await w.from("salaries").upsert({user_id:d.id,month:l,amount:a},{onConflict:"user_id,month"}),b("Gaji disimpan","success"),h(!1),$(""),z())},D=r.categories.filter(a=>a.budget_limit>0).reduce((a,s)=>a+s.budget_limit,0),S=r.salary+r.totalIncome-r.totalExpense,y=r.salary>0?r.totalExpense/r.salary*100:0,j=r.salary+r.totalIncome-r.totalExpense,G=l===I(),T=r.categories.filter(a=>a.overBudget),E=y>90?"var(--danger)":y>70?"var(--warning)":"var(--accent)";return e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"dash-header",children:[e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>M(ae(l)),children:"‹"}),e.jsx("span",{className:"month-label-text",children:_(l)}),e.jsx("button",{className:"month-btn",onClick:()=>M(te(l)),disabled:G,children:"›"})]}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary btn-sm",onClick:()=>h(!0),children:"Atur Gaji"}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>g(!0),children:"+ Transaksi"})]})]}),T.length>0&&e.jsxs("div",{className:"alert-banner",children:[e.jsx("span",{children:"⚠"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Overbudget"})," — ",T.map(a=>`${a.icon} ${a.name}`).join(", ")]})]}),e.jsx("div",{className:"hero-card mb-12",children:v?e.jsx("div",{className:"skeleton",style:{height:88,borderRadius:8}}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"hero-top",children:[e.jsxs("div",{className:"hero-left",children:[e.jsxs("span",{className:"hero-eyebrow",children:["Saldo Bersih ",_(l)]}),e.jsxs("div",{className:`hero-balance ${S<0?"neg":""}`,children:[S<0&&e.jsx("span",{className:"hero-neg-sign",children:"-"}),o(Math.abs(S))]})]}),r.salary>0&&e.jsx("div",{className:"hero-right",children:e.jsxs("div",{className:"hero-salary-chip",children:[e.jsx("span",{className:"hero-salary-label",children:"Gaji"}),e.jsx("span",{className:"hero-salary-val tabular",children:o(r.salary)})]})})]}),r.salary>0?e.jsxs("div",{className:"hero-bar-section",children:[e.jsx("div",{className:"hero-bar-track",children:e.jsx("div",{className:"hero-bar-fill",style:{width:`${Math.min(y,100)}%`,background:E}})}),e.jsxs("div",{className:"hero-bar-labels",children:[e.jsxs("span",{children:[o(r.totalExpense)," dipakai"]}),e.jsxs("span",{style:{color:E,fontWeight:700},children:[y.toFixed(0),"%"]})]})]}):e.jsxs("div",{className:"hero-no-salary",children:[e.jsx("button",{className:"salary-cta",onClick:()=>h(!0),children:"+ Atur gaji bulan ini"}),e.jsx("span",{className:"salary-cta-hint",children:"untuk menghitung saldo bersih"})]})]})}),e.jsx("div",{className:"stats-strip mb-20",children:[{label:"Pemasukan",val:r.totalIncome,color:"var(--success)",sign:"+"},{label:"Pengeluaran",val:r.totalExpense,color:"var(--danger)",sign:"-"},{label:j>=0?"Bisa ditabung":"Defisit",val:Math.abs(j),color:j>=0?"var(--accent)":"var(--danger)",sign:j>=0?"":"-"}].map((a,s,n)=>e.jsxs("div",{className:"stat-col",children:[e.jsx("span",{className:"stat-col-label",children:a.label}),e.jsxs("span",{className:"stat-col-val tabular",style:{color:a.color},children:[a.sign,o(a.val)]})]},a.label))}),e.jsxs("div",{className:"card mb-16",children:[e.jsxs("div",{className:"sect-head",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"sect-title",children:"Budget Kategori"}),D>0&&e.jsxs("p",{className:"sect-sub",children:[o(r.totalExpense)," dari ",o(D)]})]}),e.jsx(k,{to:"/categories",className:"pill-link",children:"Kelola"})]}),v?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[...Array(3)].map((a,s)=>e.jsx("div",{className:"skeleton",style:{height:44}},s))}):r.categories.filter(a=>a.budget_limit>0).length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:"◈"}),e.jsx("span",{children:"Belum ada budget kategori. "}),e.jsx(k,{to:"/categories",className:"empty-hint-link",children:"Buat sekarang →"})]}):e.jsxs("div",{className:"budget-rows",children:[r.categories.filter(a=>a.budget_limit>0).map(a=>{const s=Math.min(a.spent/a.budget_limit*100,100),n=a.overBudget?"var(--danger)":s>=80?"var(--warning)":a.color;return e.jsxs("div",{className:"brow",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${a.color}18`,color:a.color},children:a.icon}),e.jsx("span",{className:"brow-name",children:a.name}),a.overBudget&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.58rem",padding:"1px 6px"},children:"Over"}),!a.overBudget&&s>=80&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.58rem",padding:"1px 6px"},children:"Hampir"})]}),e.jsx("div",{className:"brow-bar-wrap",children:e.jsx("div",{className:"brow-bar",children:e.jsx("div",{className:"brow-bar-fill",style:{width:`${s}%`,background:n}})})}),e.jsxs("div",{className:"brow-right",children:[e.jsx("span",{className:"brow-spent tabular",style:{color:a.overBudget?"var(--danger)":"var(--text-primary)"},children:o(a.spent)}),e.jsxs("span",{className:"brow-limit tabular",children:["/",o(a.budget_limit)]})]}),e.jsxs("span",{className:"brow-pct",style:{color:n},children:[s.toFixed(0),"%"]})]},a.id)}),r.categories.filter(a=>a.budget_limit===0&&a.spent>0).map(a=>e.jsxs("div",{className:"brow no-limit",children:[e.jsxs("div",{className:"brow-left",children:[e.jsx("span",{className:"brow-icon",style:{background:`${a.color}18`,color:a.color},children:a.icon}),e.jsx("span",{className:"brow-name",children:a.name}),e.jsx("span",{className:"brow-no-limit-tag",children:"no limit"})]}),e.jsx("div",{className:"brow-bar-wrap"}),e.jsx("span",{className:"brow-spent tabular",children:o(a.spent)})]},a.id))]})]}),(v||r.savings.length>0)&&e.jsxs("div",{className:"card mb-16",children:[e.jsxs("div",{className:"sect-head",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"sect-title",children:"Tabungan"}),r.savings.length>0&&e.jsxs("p",{className:"sect-sub",children:[o(r.savings.reduce((a,s)=>a+Number(s.current_amount),0))," terkumpul"]})]}),e.jsx(k,{to:"/savings",className:"pill-link",children:"Kelola"})]}),v?e.jsx("div",{className:"savings-grid",children:[...Array(2)].map((a,s)=>e.jsx("div",{className:"skeleton",style:{height:68}},s))}):e.jsx("div",{className:"savings-grid",children:r.savings.map(a=>{const s=a.target_amount>0?Math.min(a.current_amount/a.target_amount*100,100):0,n=s>=100,c=a.deadline?Math.ceil((new Date(a.deadline)-new Date)/864e5):null,x=c!==null&&c<30&&!n;return e.jsxs("div",{className:`sv-chip ${n?"sv-done":x?"sv-urgent":""}`,children:[e.jsxs("div",{className:"sv-chip-top",children:[e.jsx("span",{className:"sv-chip-name",children:a.name}),e.jsx("span",{className:"sv-chip-pct",style:{color:n?"var(--success)":x?"var(--warning)":"var(--text-muted)"},children:n?"✓":`${s.toFixed(0)}%`})]}),e.jsxs("div",{className:"sv-chip-amounts",children:[e.jsx("span",{className:"sv-chip-cur tabular",children:o(a.current_amount)}),e.jsxs("span",{className:"sv-chip-tgt tabular",children:["/ ",o(a.target_amount)]})]}),e.jsx("div",{className:"sv-chip-bar",children:e.jsx("div",{className:"sv-chip-fill",style:{width:`${s}%`,background:n?"var(--success)":x?"var(--warning)":"linear-gradient(90deg, var(--accent), var(--info))"}})}),x&&c!==null&&e.jsx("span",{className:"sv-chip-deadline",children:c>0?`${c} hari lagi`:"Deadline lewat"})]},a.id)})})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"sect-head",children:[e.jsx("h3",{className:"sect-title",children:"Transaksi Terakhir"}),e.jsx(k,{to:"/transactions",className:"pill-link",children:"Lihat semua"})]}),v?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,marginTop:12},children:[...Array(4)].map((a,s)=>e.jsx("div",{className:"skeleton",style:{height:42}},s))}):r.transactions.length===0?e.jsxs("div",{className:"empty-hint",children:[e.jsx("span",{className:"empty-hint-icon",children:"↕"}),e.jsx("span",{children:"Belum ada transaksi bulan ini. "}),e.jsx("button",{className:"empty-hint-link",onClick:()=>g(!0),children:"Tambah sekarang →"})]}):e.jsx("div",{className:"tx-list",children:r.transactions.map(a=>{var s,n,c;return e.jsxs("div",{className:"tx-row",children:[e.jsx("div",{className:"tx-icon",style:{background:(s=a.categories)!=null&&s.color?`${a.categories.color}18`:"var(--bg-input)"},children:((n=a.categories)==null?void 0:n.icon)||(a.type==="income"?"↑":"↓")}),e.jsxs("div",{className:"tx-meta",children:[e.jsx("span",{className:"tx-desc",children:a.description||((c=a.categories)==null?void 0:c.name)||"Transaksi"}),e.jsx("span",{className:"tx-date",children:new Date(a.date).toLocaleDateString("id-ID",{day:"numeric",month:"short"})})]}),e.jsxs("span",{className:`tx-amount tabular ${a.type==="income"?"inc":"exp"}`,children:[a.type==="income"?"+":"−",o(a.amount)]})]},a.id)})})]}),L&&e.jsx("div",{className:"modal-overlay",onClick:()=>h(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("h2",{className:"modal-title",children:["Gaji ",_(l)]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>h(!1),children:"✕"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Gaji Bulan Ini"}),e.jsx(ee,{value:B,onChange:a=>$(a),autoFocus:!0})]}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>h(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:q,children:"Simpan"})]})]})}),R&&e.jsx("div",{className:"modal-overlay",onClick:()=>g(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>g(!1),children:"✕"})]}),e.jsx(Z,{onSuccess:()=>{z(),g(!1)},onClose:()=>g(!1)})]})}),e.jsx("style",{children:`
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
          background: var(--bg-card);
          border: 1px solid var(--border);
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

        .hero-salary-chip {
          display: flex; flex-direction: column; align-items: flex-end; gap: 3px;
          background: var(--bg-input); border: 1px solid var(--border);
          border-radius: var(--radius-sm); padding: 8px 12px;
        }
        .hero-salary-label {
          font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.07em;
          color: var(--text-muted); font-weight: 600;
        }
        .hero-salary-val {
          font-size: 0.875rem; font-weight: 700;
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
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: var(--radius-lg); overflow: hidden;
        }
        .stat-col {
          padding: 14px 18px; display: flex; flex-direction: column; gap: 5px;
          border-right: 1px solid var(--border); position: relative;
        }
        .stat-col:last-child { border-right: none; }
        .stat-col-label {
          font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.07em;
          color: var(--text-muted); font-weight: 600;
        }
        .stat-col-val {
          font-size: 1rem; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1;
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
          grid-template-columns: minmax(120px, 1.4fr) 1fr 140px 38px;
          align-items: center; gap: 12px; padding: 10px 0;
          border-bottom: 1px solid var(--border);
        }
        .brow:last-child { border-bottom: none; }
        .brow.no-limit { grid-template-columns: 1fr auto; }
        .brow-left { display: flex; align-items: center; gap: 8px; min-width: 0; }
        .brow-icon {
          width: 26px; height: 26px; border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem; flex-shrink: 0;
        }
        .brow-name {
          font-size: 0.8rem; font-weight: 600; color: var(--text-primary);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .brow-no-limit-tag {
          font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.04em;
          color: var(--text-muted); font-weight: 700;
          background: var(--bg-input); padding: 2px 6px; border-radius: 99px;
          flex-shrink: 0;
        }
        .brow-bar-wrap { display: flex; align-items: center; }
        .brow-bar { height: 5px; background: var(--border); border-radius: 99px; overflow: hidden; width: 100%; }
        .brow-bar-fill { height: 100%; border-radius: 99px; transition: width 0.7s cubic-bezier(0.4,0,0.2,1); }
        .brow-right { display: flex; align-items: baseline; gap: 2px; justify-content: flex-end; }
        .brow-spent { font-size: 0.78rem; font-weight: 700; letter-spacing: -0.01em; }
        .brow-limit { font-size: 0.68rem; color: var(--text-muted); font-weight: 500; }
        .brow-pct { font-size: 0.68rem; font-weight: 700; text-align: right; min-width: 30px; }

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
      `})]})}export{oe as default};
