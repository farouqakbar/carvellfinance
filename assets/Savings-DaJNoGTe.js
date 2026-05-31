import{u as P,e as L,r as l,s as p,j as e}from"./index-CYW2WHt3.js";import{f as g}from"./formatCurrency-CwSiFA8N.js";import{C as z}from"./CurrencyInput-DngthRvD.js";function O(){const{user:s}=P(),i=L(),[r,o]=l.useState([]),[h,x]=l.useState(!0),[N,u]=l.useState(!1),[t,c]=l.useState(null),[v,b]=l.useState(null),[y,_]=l.useState(""),[w,k]=l.useState("");l.useEffect(()=>{f()},[]);const f=async()=>{x(!0);const{data:a}=await p.from("savings").select("*").eq("user_id",s.id).order("created_at");o(a||[]),x(!1)},q=async a=>{try{t!=null&&t.id?(await p.from("savings").update({name:a.name,target_amount:parseFloat(a.target_amount),deadline:a.deadline||null}).eq("id",t.id),i("Target diperbarui","success")):(await p.from("savings").insert({user_id:s.id,name:a.name,target_amount:parseFloat(a.target_amount),current_amount:0,deadline:a.deadline||null}),i("Target tabungan dibuat","success")),u(!1),f()}catch(n){i(n.message,"error")}},B=async()=>{if(!y)return;const a=Math.max(0,parseFloat(y));await p.from("savings").update({current_amount:a}).eq("id",v.id),i("Saldo diperbarui","success"),b(null),_(""),f()},$=async()=>{if(!w)return;const a=parseFloat(w);if(isNaN(a)||a<=0)return;const n=Number(v.current_amount);await p.from("savings").update({current_amount:n+a}).eq("id",v.id),i(`+${g(a)} ditambahkan`,"success"),b(null),k(""),f()},E=async a=>{confirm("Hapus target tabungan ini?")&&(await p.from("savings").delete().eq("id",a),i("Target dihapus","success"),f())},C=r.reduce((a,n)=>a+Number(n.current_amount),0),j=r.reduce((a,n)=>a+Number(n.target_amount),0),F=r.filter(a=>Number(a.current_amount)>=Number(a.target_amount)).length;return e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"flex-between mb-16",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"page-title",children:"Tabungan"}),e.jsxs("p",{className:"page-subtitle",style:{margin:0},children:[r.length," target · ",F>0&&`${F} tercapai · `,e.jsx("span",{style:{color:"var(--success)",fontWeight:700},children:g(C)}),j>0&&e.jsxs("span",{style:{color:"var(--text-muted)"},children:[" / ",g(j)]})]})]}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>{c(null),u(!0)},children:"+ Target Baru"})]}),j>0&&e.jsxs("div",{className:"card mb-20",children:[e.jsxs("div",{className:"flex-between mb-10",children:[e.jsx("span",{style:{fontSize:"0.78rem",fontWeight:600,color:"var(--text-muted)",textTransform:"uppercase",letterSpacing:"0.06em"},children:"Total progress tabungan"}),e.jsxs("span",{style:{fontSize:"0.78rem",fontWeight:700,color:"var(--success)"},children:[(C/j*100).toFixed(1),"%"]})]}),e.jsx("div",{className:"progress-bar",style:{height:7},children:e.jsx("div",{className:"progress-fill",style:{width:`${Math.min(C/j*100,100)}%`,background:"linear-gradient(90deg, var(--accent), var(--success))"}})})]}),h?e.jsx("div",{className:"sv-grid",children:[...Array(4)].map((a,n)=>e.jsx("div",{className:"skeleton",style:{height:180}},n))}):r.length===0?e.jsx("div",{className:"card",children:e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:"◎"}),e.jsx("strong",{children:"Belum ada target tabungan"}),e.jsx("p",{children:"Mulai atur target untuk mencapai tujuan finansialmu"}),e.jsx("button",{className:"btn btn-primary mt-16",onClick:()=>u(!0),children:"Buat Target Pertama"})]})}):e.jsx("div",{className:"sv-grid",children:r.map(a=>{const n=a.target_amount>0?Math.min(a.current_amount/a.target_amount*100,100):0,d=n>=100,A=Math.max(0,a.target_amount-a.current_amount),m=a.deadline?Math.ceil((new Date(a.deadline)-new Date)/864e5):null,S=m!==null&&m<0&&!d,T=m!==null&&m>=0&&m<30&&!d,M=d?"var(--success)":S?"var(--danger)":T?"var(--warning)":"var(--accent)";return e.jsxs("div",{className:`sv-card ${d?"sv-done":""}`,style:{"--sv-color":M},children:[e.jsxs("div",{className:"sv-header",children:[e.jsxs("div",{className:"sv-title-wrap",children:[e.jsx("h3",{className:"sv-name",children:a.name}),a.deadline&&e.jsx("span",{className:`sv-deadline ${S?"overdue":T?"urgent":""}`,children:d?"✓ Tercapai":S?"Deadline lewat":m===0?"Hari ini!":`${m} hari lagi`})]}),e.jsxs("div",{className:"sv-actions",children:[d&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.65rem"},children:"✓ Done"}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{c(a),u(!0)},children:"✎"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)"},onClick:()=>E(a.id),children:"✕"})]})]}),e.jsxs("div",{className:"sv-amounts",children:[e.jsxs("div",{children:[e.jsx("div",{className:"sv-current tabular",children:g(a.current_amount)}),e.jsxs("div",{className:"sv-target-label",children:["dari ",g(a.target_amount)]})]}),e.jsx("div",{className:"sv-pct-circle",children:e.jsxs("span",{className:"sv-pct-num",style:{color:M},children:[n.toFixed(0),e.jsx("span",{style:{fontSize:"0.6em"},children:"%"})]})})]}),e.jsxs("div",{className:"sv-bar-wrap",children:[e.jsx("div",{className:"progress-bar",style:{height:8},children:e.jsx("div",{className:"progress-fill",style:{width:`${n}%`,background:d?"var(--success)":S?"var(--danger)":T?"var(--warning)":"linear-gradient(90deg, var(--accent), var(--info))"}})}),!d&&A>0&&e.jsxs("span",{className:"sv-remaining",children:["Sisa ",g(A)]})]}),e.jsx("button",{className:"sv-update-btn",onClick:()=>{b(a),_(String(a.current_amount)),k("")},children:"Update Saldo"})]},a.id)})}),N&&e.jsx(U,{editData:t,onSave:q,onClose:()=>u(!1)}),v&&e.jsx("div",{className:"modal-overlay",onClick:()=>b(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:v.name}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>b(null),children:"✕"})]}),e.jsxs("div",{className:"update-tabs",children:[e.jsxs("div",{className:"update-section",children:[e.jsx("label",{className:"form-label",children:"Tambah nominal"}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx(z,{value:w,onChange:a=>k(a),autoFocus:!0,style:{flex:1}}),e.jsx("button",{className:"btn btn-primary",onClick:$,disabled:!w,children:"+"})]})]}),e.jsx("div",{className:"update-divider",children:"atau"}),e.jsxs("div",{className:"update-section",children:[e.jsx("label",{className:"form-label",children:"Set total saldo"}),e.jsxs("div",{className:"flex gap-8",children:[e.jsx(z,{value:y,onChange:a=>_(a),style:{flex:1}}),e.jsx("button",{className:"btn btn-secondary",onClick:B,disabled:!y,children:"Set"})]})]})]})]})}),e.jsx("style",{children:`
        .sv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 14px;
        }
        .sv-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: border-color 0.2s;
          position: relative;
          overflow: hidden;
        }
        .sv-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--sv-color);
          opacity: 0.8;
        }
        .sv-card:hover { border-color: var(--border-light); }
        .sv-card.sv-done { border-color: var(--success); }

        .sv-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
        }
        .sv-title-wrap { flex: 1; min-width: 0; }
        .sv-name {
          font-size: 0.9375rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .sv-deadline {
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-top: 3px;
          display: block;
        }
        .sv-deadline.urgent { color: var(--warning); }
        .sv-deadline.overdue { color: var(--danger); }

        .sv-actions {
          display: flex;
          align-items: center;
          gap: 2px;
          flex-shrink: 0;
        }

        .sv-amounts {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .sv-current {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          line-height: 1.1;
        }
        .sv-target-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
          margin-top: 2px;
        }
        .sv-pct-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 2px solid var(--border-light);
          background: var(--bg-input);
        }
        .sv-pct-num {
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          font-variant-numeric: tabular-nums;
        }

        .sv-bar-wrap { display: flex; flex-direction: column; gap: 5px; }
        .sv-remaining { font-size: 0.68rem; color: var(--text-muted); font-weight: 500; }

        .sv-update-btn {
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 8px;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s;
          width: 100%;
          text-align: center;
          letter-spacing: -0.01em;
        }
        .sv-update-btn:hover {
          background: var(--accent-dim);
          border-color: var(--accent);
          color: var(--accent);
        }

        .update-tabs { display: flex; flex-direction: column; gap: 0; }
        .update-section { padding: 4px 0; }
        .update-divider {
          text-align: center;
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
          padding: 10px 0;
          position: relative;
        }
        .update-divider::before, .update-divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 40%;
          height: 1px;
          background: var(--border);
        }
        .update-divider::before { left: 0; }
        .update-divider::after { right: 0; }

        @media (max-width: 768px) {
          .sv-grid { grid-template-columns: 1fr; gap: 10px; }
          .sv-card { padding: 16px; }
          .sv-current { font-size: 1.3rem; }
          .sv-update-btn { padding: 10px; font-size: 0.8rem; }
          .scc-top { flex-wrap: wrap; }
        }
        @media (max-width: 640px) {
          .sv-grid { grid-template-columns: 1fr; }
        }
      `})]})}function U({editData:s,onSave:i,onClose:r}){const[o,h]=l.useState({name:(s==null?void 0:s.name)||"",target_amount:(s==null?void 0:s.target_amount)||"",deadline:(s==null?void 0:s.deadline)||""}),[x,N]=l.useState(!1),u=async t=>{t.preventDefault(),!(!o.name||!o.target_amount)&&(N(!0),await i(o),N(!1))};return e.jsx("div",{className:"modal-overlay",onClick:r,children:e.jsxs("div",{className:"modal",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:s!=null&&s.id?"Edit Target":"Target Tabungan Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:r,children:"✕"})]}),e.jsxs("form",{onSubmit:u,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Nama Target"}),e.jsx("input",{className:"form-input",type:"text",placeholder:"Contoh: Dana Darurat, Liburan, HP Baru...",value:o.name,onChange:t=>h(c=>({...c,name:t.target.value})),required:!0,autoFocus:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Target Nominal"}),e.jsx(z,{value:o.target_amount,onChange:t=>h(c=>({...c,target_amount:t})),required:!0,min:"1"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Deadline ",e.jsx("span",{style:{color:"var(--text-muted)",textTransform:"none",letterSpacing:0},children:"(opsional)"})]}),e.jsx("input",{className:"form-input",type:"date",value:o.deadline,onChange:t=>h(c=>({...c,deadline:t.target.value}))})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:r,children:"Batal"}),e.jsx("button",{type:"submit",className:"btn btn-primary",style:{flex:1},disabled:x,children:x?"Menyimpan...":s!=null&&s.id?"Perbarui":"Buat Target"})]})]})]})})}export{O as default};
