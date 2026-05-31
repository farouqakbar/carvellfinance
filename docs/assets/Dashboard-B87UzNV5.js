import{u as J,d as V,b as X,r as p,s as j,j as e}from"./index-PyUc3ceh.js";import{g as E,a as S,f as l}from"./formatCurrency-CwSiFA8N.js";import{T as Z}from"./TransactionForm-CsL1Qpt7.js";function ee(n){const[h,x]=n.split("-").map(Number),m=new Date(h,x-2,1);return`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}`}function ae(n){const[h,x]=n.split("-").map(Number),m=new Date(h,x,1);return`${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}`}function ie(){var D;const{user:n}=J(),h=V(),[x,m]=X(),[c,I]=p.useState(()=>x.get("month")||E()),[t,P]=p.useState({salary:0,totalExpense:0,totalIncome:0,categories:[],transactions:[],savings:[],categorySpend:[]}),[u,_]=p.useState(!0),[A,g]=p.useState(!1),[C,B]=p.useState(""),[R,b]=p.useState(!1);p.useEffect(()=>{k()},[c]);const T=a=>{I(a),m({month:a})},k=async()=>{var a;_(!0);try{const r=`${c}-01`,o=`${c}-31`,[d,f,W,G]=await Promise.all([j.from("salaries").select("*").eq("user_id",n.id).eq("month",c).single(),j.from("transactions").select("*, categories(name, color, icon)").eq("user_id",n.id).gte("date",r).lte("date",o).order("date",{ascending:!1}),j.from("categories").select("*").eq("user_id",n.id).order("name"),j.from("savings").select("*").eq("user_id",n.id)]),N=f.data||[],L=W.data||[],O=N.filter(s=>s.type==="expense").reduce((s,i)=>s+Number(i.amount),0),Q=N.filter(s=>s.type==="income").reduce((s,i)=>s+Number(i.amount),0),v={};N.filter(s=>s.type==="expense"&&s.categories).forEach(s=>{const i=s.categories.name;v[i]||(v[i]={name:i,amount:0,color:s.categories.color,icon:s.categories.icon}),v[i].amount+=Number(s.amount)});const Y=L.map(s=>{var F;const i=((F=v[s.name])==null?void 0:F.amount)||0,U=s.budget_limit>0?i/s.budget_limit*100:null;return{...s,spent:i,pct:U,overBudget:s.budget_limit>0&&i>s.budget_limit}}).sort((s,i)=>s.overBudget&&!i.overBudget?-1:!s.overBudget&&i.overBudget?1:(i.pct||0)-(s.pct||0));P({salary:((a=d.data)==null?void 0:a.amount)||0,totalExpense:O,totalIncome:Q,categories:Y,transactions:N.slice(0,6),savings:G.data||[],categorySpend:Object.values(v).sort((s,i)=>i.amount-s.amount)})}finally{_(!1)}},H=async()=>{const a=parseFloat(C);a&&(await j.from("salaries").upsert({user_id:n.id,month:c,amount:a},{onConflict:"user_id,month"}),h("Gaji disimpan","success"),g(!1),B(""),k())},q=t.categories.filter(a=>a.budget_limit>0).reduce((a,r)=>a+r.budget_limit,0),z=t.salary+t.totalIncome-t.totalExpense,y=t.salary>0?t.totalExpense/t.salary*100:0,w=t.salary+t.totalIncome-t.totalExpense,K=c===E(),$=t.categories.filter(a=>a.overBudget);(D=n==null?void 0:n.full_name)!=null&&D.split(" ")[0]||n!=null&&n.username;const M=y>90?"var(--danger)":y>70?"var(--warning)":"var(--accent)";return e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"dash-header",children:[e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"btn btn-ghost btn-sm month-arrow",onClick:()=>T(ee(c)),children:"‹"}),e.jsx("span",{className:"month-label-text",children:S(c)}),e.jsx("button",{className:"btn btn-ghost btn-sm month-arrow",onClick:()=>T(ae(c)),disabled:K,children:"›"})]}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary btn-sm",onClick:()=>g(!0),children:"Atur Gaji"}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>b(!0),children:"+ Transaksi"})]})]}),$.length>0&&e.jsxs("div",{className:"alert-banner",children:[e.jsx("span",{className:"alert-icon",children:"⚠"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Overbudget"})," — ",$.map(a=>`${a.icon} ${a.name}`).join(", ")]})]}),e.jsx("div",{className:"hero-card",children:u?e.jsx("div",{className:"skeleton",style:{height:90,borderRadius:10}}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"hero-top",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"hero-eyebrow",children:["Saldo bersih ",S(c)]}),e.jsxs("div",{className:`hero-balance ${z<0?"negative":""}`,children:[z<0?"-":"",l(Math.abs(z))]})]}),t.salary>0&&e.jsx("div",{className:"hero-right",children:e.jsxs("div",{className:"hero-stat",children:[e.jsx("span",{className:"hero-stat-label",children:"Gaji"}),e.jsx("span",{className:"hero-stat-val",children:l(t.salary)})]})})]}),t.salary>0&&e.jsxs("div",{className:"hero-track-wrap",children:[e.jsx("div",{className:"hero-track",children:e.jsx("div",{className:"hero-track-fill",style:{width:`${Math.min(y,100)}%`,background:M}})}),e.jsxs("div",{className:"hero-track-labels",children:[e.jsxs("span",{style:{color:"var(--text-muted)",fontSize:"0.72rem",fontWeight:500},children:[l(t.totalExpense)," pengeluaran"]}),e.jsxs("span",{style:{color:M,fontSize:"0.72rem",fontWeight:700},children:[y.toFixed(0),"%"]})]})]}),t.salary===0&&e.jsx("button",{className:"set-salary-cta",onClick:()=>g(!0),children:"Belum ada gaji bulan ini — klik untuk atur →"})]})}),e.jsx("div",{className:"quick-stats mb-24",children:[{label:"Pemasukan",val:t.totalIncome,color:"var(--success)",prefix:"+"},{label:"Pengeluaran",val:t.totalExpense,color:"var(--danger)",prefix:"-"},{label:w>=0?"Bisa ditabung":"Defisit",val:Math.abs(w),color:w>=0?"var(--accent)":"var(--danger)",prefix:w>=0?"":"-"}].map(a=>e.jsxs("div",{className:"qs-item",children:[e.jsx("span",{className:"qs-label",children:a.label}),e.jsxs("span",{className:"qs-value tabular",style:{color:a.color},children:[a.prefix,l(a.val)]})]},a.label))}),e.jsxs("div",{className:"card mb-20",children:[e.jsxs("div",{className:"section-head",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"section-title",children:"Budget Kategori"}),q>0&&e.jsxs("p",{className:"section-sub",children:[l(t.totalExpense)," dari ",l(q)," total budget"]})]}),e.jsx("a",{href:"/categories",className:"section-link",children:"Kelola →"})]}),u?e.jsx("div",{className:"flex",style:{flexDirection:"column",gap:12,marginTop:16},children:[...Array(3)].map((a,r)=>e.jsx("div",{className:"skeleton",style:{height:48}},r))}):t.categories.filter(a=>a.budget_limit>0).length===0?e.jsxs("div",{className:"empty-state",style:{padding:"28px 0"},children:[e.jsx("div",{className:"empty-state-icon",children:"◈"}),e.jsx("strong",{children:"Belum ada budget kategori"}),e.jsx("p",{children:"Tambah kategori dan atur budget di halaman Kategori"})]}):e.jsxs("div",{className:"budget-rows",children:[t.categories.filter(a=>a.budget_limit>0).map(a=>{const r=Math.min(a.spent/a.budget_limit*100,100),o=a.overBudget?"var(--danger)":r>=80?"var(--warning)":a.color;return e.jsxs("div",{className:"budget-row-item",children:[e.jsxs("div",{className:"bri-left",children:[e.jsx("span",{className:"bri-icon",style:{background:`${a.color}15`,color:a.color},children:a.icon}),e.jsx("span",{className:"bri-name",children:a.name}),a.overBudget&&e.jsx("span",{className:"badge badge-danger",style:{fontSize:"0.6rem",padding:"2px 6px"},children:"Over"}),!a.overBudget&&r>=80&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem",padding:"2px 6px"},children:"Hampir"})]}),e.jsx("div",{className:"bri-bar-wrap",children:e.jsx("div",{className:"bri-bar",children:e.jsx("div",{className:"bri-bar-fill",style:{width:`${r}%`,background:o}})})}),e.jsxs("div",{className:"bri-right",children:[e.jsx("span",{className:"bri-spent tabular",style:{color:a.overBudget?"var(--danger)":"var(--text-primary)"},children:l(a.spent)}),e.jsxs("span",{className:"bri-limit tabular",children:["/ ",l(a.budget_limit)]})]}),e.jsxs("span",{className:"bri-pct",style:{color:o},children:[r.toFixed(0),"%"]})]},a.id)}),t.categories.filter(a=>a.budget_limit===0&&a.spent>0).map(a=>e.jsxs("div",{className:"budget-row-item no-budget",children:[e.jsxs("div",{className:"bri-left",children:[e.jsx("span",{className:"bri-icon",style:{background:`${a.color}15`,color:a.color},children:a.icon}),e.jsx("span",{className:"bri-name",children:a.name}),e.jsx("span",{className:"badge badge-info",style:{fontSize:"0.6rem",padding:"2px 6px"},children:"No limit"})]}),e.jsx("div",{className:"bri-bar-wrap"}),e.jsx("div",{className:"bri-right",children:e.jsx("span",{className:"bri-spent tabular",children:l(a.spent)})})]},a.id))]})]}),(u||t.savings.length>0)&&e.jsxs("div",{className:"card mb-20",children:[e.jsxs("div",{className:"section-head",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"section-title",children:"Tabungan"}),t.savings.length>0&&e.jsxs("p",{className:"section-sub",children:[l(t.savings.reduce((a,r)=>a+Number(r.current_amount),0))," total tersimpan"]})]}),e.jsx("a",{href:"/savings",className:"section-link",children:"Kelola →"})]}),u?e.jsx("div",{className:"grid-2",style:{marginTop:16},children:[...Array(2)].map((a,r)=>e.jsx("div",{className:"skeleton",style:{height:70}},r))}):e.jsx("div",{className:"savings-compact-grid",children:t.savings.map(a=>{const r=a.target_amount>0?Math.min(a.current_amount/a.target_amount*100,100):0,o=r>=100,d=a.deadline?Math.ceil((new Date(a.deadline)-new Date)/864e5):null,f=d!==null&&d<30&&!o;return e.jsxs("div",{className:`saving-compact-card ${o?"done":""} ${f?"urgent":""}`,children:[e.jsxs("div",{className:"scc-top",children:[e.jsx("span",{className:"scc-name",children:a.name}),e.jsxs("div",{className:"flex gap-4",style:{alignItems:"center"},children:[o&&e.jsx("span",{className:"badge badge-success",children:"✓"}),f&&!o&&e.jsxs("span",{className:"badge badge-warning",children:[d,"h"]}),e.jsxs("span",{className:"scc-pct",children:[r.toFixed(0),"%"]})]})]}),e.jsxs("div",{className:"scc-amounts",children:[e.jsx("span",{className:"scc-current tabular",children:l(a.current_amount)}),e.jsxs("span",{className:"scc-target tabular",children:["/ ",l(a.target_amount)]})]}),e.jsx("div",{className:"scc-bar",children:e.jsx("div",{className:"scc-bar-fill",style:{width:`${r}%`,background:o?"var(--success)":f?"var(--warning)":"linear-gradient(90deg, var(--accent), var(--info))"}})})]},a.id)})})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"section-head",children:[e.jsx("h3",{className:"section-title",children:"Transaksi Terakhir"}),e.jsx("a",{href:"/transactions",className:"section-link",children:"Semua →"})]}),u?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10,marginTop:14},children:[...Array(4)].map((a,r)=>e.jsx("div",{className:"skeleton",style:{height:40}},r))}):t.transactions.length===0?e.jsxs("div",{className:"empty-state",style:{padding:"24px 0"},children:[e.jsx("div",{className:"empty-state-icon",children:"↕"}),e.jsx("strong",{children:"Belum ada transaksi"}),e.jsx("p",{children:'Tap "+ Transaksi" di atas untuk mulai mencatat'})]}):e.jsx("div",{className:"tx-list",children:t.transactions.map(a=>{var r,o,d;return e.jsxs("div",{className:"tx-item",children:[e.jsx("div",{className:"tx-icon-wrap",style:{background:(r=a.categories)!=null&&r.color?`${a.categories.color}18`:"var(--bg-input)"},children:e.jsx("span",{children:((o=a.categories)==null?void 0:o.icon)||(a.type==="income"?"↑":"↓")})}),e.jsxs("div",{className:"tx-info",children:[e.jsx("span",{className:"tx-desc",children:a.description||((d=a.categories)==null?void 0:d.name)||"Transaksi"}),e.jsx("span",{className:"tx-date",children:new Date(a.date).toLocaleDateString("id-ID",{day:"numeric",month:"short"})})]}),e.jsxs("span",{className:`tx-amount tabular ${a.type==="income"?"income":"expense"}`,children:[a.type==="income"?"+":"-",l(a.amount)]})]},a.id)})})]}),A&&e.jsx("div",{className:"modal-overlay",onClick:()=>g(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("h2",{className:"modal-title",children:["Gaji ",S(c)]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>g(!1),children:"✕"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Nominal (Rp)"}),e.jsx("input",{className:"form-input",type:"number",placeholder:"0",value:C,onChange:a=>B(a.target.value),autoFocus:!0,style:{fontSize:"1.1rem",fontWeight:600}})]}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>g(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:H,children:"Simpan"})]})]})}),R&&e.jsx("div",{className:"modal-overlay",onClick:()=>b(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tambah Transaksi"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>b(!1),children:"✕"})]}),e.jsx(Z,{onSuccess:()=>{k(),b(!1)},onClose:()=>b(!1)})]})}),e.jsx("style",{children:`
        /* Header */
        .dash-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .month-nav-group {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .month-arrow {
          width: 32px;
          height: 32px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          border-radius: var(--radius-sm);
        }
        .month-label-text {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          padding: 0 10px;
          min-width: 140px;
          text-align: center;
        }

        /* Alert */
        .alert-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--danger-dim);
          border: 1px solid var(--danger);
          border-radius: var(--radius-sm);
          padding: 11px 16px;
          font-size: 0.8125rem;
          color: var(--danger);
          margin-bottom: 16px;
          font-weight: 500;
        }
        .alert-icon { font-size: 0.9rem; }

        /* Hero card */
        .hero-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          margin-bottom: 14px;
          position: relative;
          overflow: hidden;
        }
        .hero-card::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, var(--accent-dim) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }
        .hero-eyebrow {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          font-weight: 600;
          display: block;
          margin-bottom: 6px;
        }
        .hero-balance {
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          font-variant-numeric: tabular-nums;
          line-height: 1;
        }
        .hero-balance.negative { color: var(--danger); }
        .hero-right { text-align: right; }
        .hero-stat-label {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          font-weight: 600;
          display: block;
          margin-bottom: 3px;
        }
        .hero-stat-val {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-secondary);
          font-variant-numeric: tabular-nums;
        }
        .hero-track-wrap { margin-top: 4px; }
        .hero-track {
          height: 6px;
          background: var(--border);
          border-radius: 99px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .hero-track-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hero-track-labels {
          display: flex;
          justify-content: space-between;
        }
        .set-salary-cta {
          background: none;
          border: 1px dashed var(--border-light);
          border-radius: var(--radius-sm);
          padding: 8px 14px;
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          font-family: var(--font-sans);
          margin-top: 8px;
          transition: all 0.15s;
          width: 100%;
          text-align: left;
        }
        .set-salary-cta:hover { color: var(--accent); border-color: var(--accent); }

        /* Quick stats */
        .quick-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .qs-item {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .qs-label {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          font-weight: 600;
        }
        .qs-value {
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        /* Section head */
        .section-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .section-title {
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--text-primary);
        }
        .section-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 2px;
          font-weight: 500;
        }
        .section-link {
          font-size: 0.72rem;
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
          white-space: nowrap;
          margin-top: 2px;
        }
        .section-link:hover { opacity: 0.75; }

        /* Budget rows */
        .budget-rows {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .budget-row-item {
          display: grid;
          grid-template-columns: minmax(140px, 1.5fr) 1fr 160px 44px;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid var(--border);
        }
        .budget-row-item:last-child { border-bottom: none; }
        .budget-row-item.no-budget { opacity: 0.7; }
        .bri-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }
        .bri-icon {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          flex-shrink: 0;
        }
        .bri-name {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .bri-bar-wrap { display: flex; align-items: center; }
        .bri-bar {
          height: 5px;
          background: var(--border);
          border-radius: 99px;
          overflow: hidden;
          width: 100%;
        }
        .bri-bar-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .bri-right {
          display: flex;
          align-items: baseline;
          gap: 3px;
          justify-content: flex-end;
        }
        .bri-spent {
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .bri-limit {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .bri-pct {
          font-size: 0.72rem;
          font-weight: 700;
          text-align: right;
          min-width: 32px;
        }

        /* Savings compact */
        .savings-compact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
        }
        .saving-compact-card {
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 14px 16px;
          transition: border-color 0.2s;
        }
        .saving-compact-card:hover { border-color: var(--border-light); }
        .saving-compact-card.done { border-color: var(--success); background: var(--success-dim); }
        .saving-compact-card.urgent { border-color: var(--warning); }
        .scc-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .scc-name {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .scc-pct {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
        }
        .scc-amounts {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 8px;
        }
        .scc-current {
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: -0.025em;
          color: var(--text-primary);
        }
        .scc-target {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .scc-bar {
          height: 4px;
          background: var(--border);
          border-radius: 99px;
          overflow: hidden;
        }
        .scc-bar-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Transactions */
        .tx-list {
          display: flex;
          flex-direction: column;
          margin-top: 4px;
        }
        .tx-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 0;
          border-bottom: 1px solid var(--border);
        }
        .tx-item:last-child { border-bottom: none; }
        .tx-icon-wrap {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
        }
        .tx-info { flex: 1; min-width: 0; }
        .tx-desc {
          display: block;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .tx-date {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .tx-amount {
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          white-space: nowrap;
        }
        .tx-amount.income { color: var(--success); }
        .tx-amount.expense { color: var(--danger); }

        /* ── Mobile ─────────────────────────── */
        @media (max-width: 768px) {
          /* Header */
          .dash-header { flex-wrap: wrap; row-gap: 8px; }
          .month-label-text { font-size: 0.875rem; min-width: 110px; }

          /* Hero */
          .hero-card { padding: 16px; }
          .hero-top { flex-direction: column; gap: 0; margin-bottom: 12px; }
          .hero-right { display: none; }
          .hero-balance { font-size: 1.75rem; }
          .hero-eyebrow { margin-bottom: 4px; }

          /* Quick stats */
          .quick-stats { gap: 6px; }
          .qs-item { padding: 10px 12px; }
          .qs-label { font-size: 0.6rem; }
          .qs-value { font-size: 0.8rem; }

          /* Budget rows — reorder with grid areas */
          .budget-row-item {
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto;
            grid-template-areas:
              "left right"
              "bar  bar";
            padding: 12px 0;
            gap: 8px;
          }
          .bri-left { grid-area: left; }
          .bri-bar-wrap { grid-area: bar; }
          .bri-right { grid-area: right; align-self: start; }
          .bri-pct { display: none; }
          .bri-limit { display: none; }

          /* Savings compact — 1 col */
          .savings-compact-grid { grid-template-columns: 1fr; }

          /* Sections */
          .section-head { flex-wrap: nowrap; gap: 8px; }

          /* Transactions on dash */
          .tx-item { padding: 10px 0; }
          .tx-icon-wrap { width: 30px; height: 30px; font-size: 0.8rem; }
          .tx-desc { font-size: 0.78rem; }
          .tx-amount { font-size: 0.8rem; }

          /* Alert */
          .alert-banner { font-size: 0.75rem; padding: 9px 12px; }
        }

        @media (max-width: 400px) {
          .quick-stats { grid-template-columns: 1fr; gap: 6px; }
          .qs-item { flex-direction: row; justify-content: space-between; align-items: center; padding: 10px 14px; }
          .hero-balance { font-size: 1.5rem; }
          .month-label-text { min-width: 100px; font-size: 0.8rem; }
        }
      `})]})}export{ie as default};
