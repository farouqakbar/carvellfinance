import{u as ie,i as re,r as d,g as G,s as h,j as e,f as c,d as N,C as le}from"./index-vMXtwoXZ.js";import{a as Y,i as O,C as ce}from"./mandatoryCategories-DVTaj19V.js";import{C as oe}from"./ConfirmModal-pcyNqYX5.js";const $=15;function _(o){const[u,g]=o.split("-").map(Number),x=new Date(u,g-2,1);return`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}`}function de(o){const[u,g]=o.split("-").map(Number),x=new Date(u,g,1);return`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}`}function ue(){const{user:o}=ie(),u=re(),[g,x]=d.useState([]),[P,U]=d.useState({}),[s,J]=d.useState(0),[E,q]=d.useState(!0),[Q,j]=d.useState(!1),[C,D]=d.useState(null),[m,b]=d.useState(null),[z,M]=d.useState(null),[l,T]=d.useState(G()),[W,B]=d.useState(!1),V=l===G();d.useEffect(()=>{w()},[l]);const w=async()=>{q(!0);const a=`${l}-01`,t=`${l}-31`,[i,n,F,y]=await Promise.all([h.from("categories").select("*").eq("user_id",o.id).order("name"),h.from("transactions").select("category_id, amount").eq("user_id",o.id).eq("type","expense").gte("date",a).lte("date",t),h.from("transactions").select("category_id, amount").eq("user_id",o.id).eq("type","income").gte("date",a).lte("date",t),h.from("category_budgets").select("*").eq("user_id",o.id).eq("month",l)]),p={};(y.data||[]).forEach(r=>{p[r.category_id]=Number(r.budget_limit)});const f={};(n.data||[]).forEach(r=>{r.category_id&&(f[r.category_id]=(f[r.category_id]||0)+Number(r.amount))});const k=(i.data||[]).map(r=>({...r,budget_limit:p[r.id]!==void 0?p[r.id]:0})),S=(i.data||[]).find(r=>r.name==="Gaji"),v=S?(F.data||[]).filter(r=>r.category_id===S.id).reduce((r,ne)=>r+Number(ne.amount),0):0;x(k),U(f),J(v),q(!1)},X=async()=>{await h.from("categories").delete().eq("id",z.id),u("Kategori dihapus","success"),M(null),w()},A=a=>{const t=String(Math.round(a.budget_limit||0)),i=s>0&&a.budget_limit>0?(a.budget_limit/s*100).toFixed(1):"";b({id:a.id,nominal:t,pct:i})},Z=a=>{const t=parseFloat(a)||0,i=s>0&&t>0?(t/s*100).toFixed(1):"";b(n=>({...n,nominal:a,pct:i}))},K=a=>{const t=parseFloat(a)||0,i=s>0&&t>0?String(Math.round(t/100*s)):"";b(n=>({...n,pct:a,nominal:i}))},ee=async()=>{const a=parseFloat(m.nominal)||0;await h.from("category_budgets").upsert({user_id:o.id,category_id:m.id,month:l,budget_limit:a},{onConflict:"category_id,month"}),u("Budget bulan ini disimpan","success"),b(null),w()},ae=async()=>{B(!0);const a=_(l),{data:t}=await h.from("category_budgets").select("category_id, budget_limit").eq("user_id",o.id).eq("month",a);if(!t||t.length===0){u(`Tidak ada budget di ${N(a)}`,"error"),B(!1);return}await Promise.all(t.map(i=>h.from("category_budgets").upsert({user_id:o.id,category_id:i.category_id,month:l,budget_limit:i.budget_limit},{onConflict:"category_id,month"}))),u(`Budget disalin dari ${N(a)}`,"success"),B(!1),w()},R=g.filter(a=>Y(a)),I=g.filter(a=>O(a)),L=g.filter(a=>!O(a)&&!Y(a)),te=g.reduce((a,t)=>a+Number(t.budget_limit||0),0),se=Object.values(P).reduce((a,t)=>a+t,0),H=(a,t)=>{const i=P[a.id]||0,n=Number(a.budget_limit||0),F=n>0?Math.min(i/n*100,100):0,y=n>0?i/n*100:0,p=y>100,f=!p&&y>=100,k=!p&&y>=80&&y<100,S=p?"var(--danger)":f?"var(--success)":k?"var(--warning)":a.color,v=s>0&&n>0?(n/s*100).toFixed(0):null;return t?e.jsxs("div",{className:"cat-card cat-mandatory",style:{"--cat-color":a.color},children:[e.jsxs("div",{className:"cat-card-top",children:[e.jsxs("div",{className:"cat-card-left",children:[e.jsx("span",{className:"cat-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)"},children:"−"}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-name",children:a.name}),e.jsx("span",{className:"cat-mandatory-badge",children:"Wajib · langsung dipotong"})]})]}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>A(a),style:{fontSize:"0.72rem"},children:"Ubah"})]}),e.jsxs("div",{className:"mand-budget-row",children:[e.jsxs("div",{children:[e.jsx("span",{className:"mand-label",children:"Budget per bulan"}),e.jsx("span",{className:"mand-val tabular",children:n>0?c(n):"—"})]}),v&&e.jsxs("span",{className:"mand-pct-chip",children:[v,"% gaji"]})]})]},a.id):e.jsxs("div",{className:"cat-card",style:{"--cat-color":a.color},children:[e.jsxs("div",{className:"cat-card-top",children:[e.jsxs("div",{className:"cat-card-left",children:[e.jsx("span",{className:"cat-icon",style:{background:`${a.color}20`,color:a.color},children:a.icon}),e.jsx("span",{className:"cat-name",children:a.name})]}),e.jsxs("div",{className:"cat-card-actions",children:[e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{D(a),j(!0)},children:"✎"}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>A(a),style:{fontSize:"0.72rem",whiteSpace:"nowrap"},children:n>0?"Set":"+ Budget"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)"},onClick:()=>M({id:a.id,name:a.name}),children:"✕"})]})]}),n>0?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"cat-amounts",children:[e.jsx("span",{className:"cat-spent tabular",style:{color:p?"var(--danger)":"var(--text-primary)"},children:c(i)}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsxs("span",{className:"cat-budget tabular",children:["/ ",c(n)]}),v&&e.jsxs("span",{className:"cat-pct-label",children:[v,"% gaji"]})]})]}),e.jsx("div",{className:"progress-bar",style:{height:6},children:e.jsx("div",{className:"progress-fill",style:{width:`${F}%`,background:S}})}),e.jsxs("div",{className:"cat-status-row",children:[p&&e.jsxs("span",{className:"badge badge-danger",style:{fontSize:"0.6rem"},children:["Over ",c(i-n)]}),f&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.6rem"},children:"Penuh"}),k&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem"},children:"Hampir"}),!p&&!f&&!k&&e.jsxs("span",{className:"cat-sisa",children:["Sisa ",c(n-i)]})]})]}):e.jsxs("div",{className:"cat-no-budget",children:[e.jsx("span",{children:"Belum ada budget"}),s>0&&e.jsxs("span",{className:"cat-no-budget-hint",children:["Default: ",c(Math.round(s*$/100))," (",$,"%)"]})]})]},a.id)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"flex-between mb-24",style:{flexWrap:"wrap",gap:12},children:[e.jsxs("div",{children:[e.jsx("h1",{className:"page-title",children:"Budget & Kategori"}),e.jsxs("p",{className:"page-subtitle",style:{margin:0},children:[c(se)," dari ",c(te)," · ",N(l)]})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>T(_(l)),children:"‹"}),e.jsx("span",{className:"month-label-text",children:N(l)}),e.jsx("button",{className:"month-btn",onClick:()=>T(de(l)),disabled:V,children:"›"})]}),e.jsx("button",{className:"btn btn-secondary btn-sm",onClick:ae,disabled:W,title:`Salin semua budget dari ${N(_(l))}`,children:W?"...":`⎘ Salin dari ${N(_(l))}`}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>{D(null),j(!0)},children:"+ Kategori"})]})]}),R.length>0&&e.jsxs("div",{className:"cat-section mb-24",children:[e.jsx("div",{className:"cat-section-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"cat-section-title",children:"Pemasukan Wajib"}),e.jsx("span",{className:"cat-section-sub",children:s>0?`Total gaji bulan ini: ${c(s)}`:"Belum ada transaksi Gaji bulan ini"})]})}),e.jsx("div",{className:"cat-grid",children:R.map(a=>e.jsxs("div",{className:"cat-card cat-mandatory",style:{"--cat-color":a.color},children:[e.jsx("div",{className:"cat-card-top",children:e.jsxs("div",{className:"cat-card-left",children:[e.jsx("span",{className:"cat-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)"},children:"+"}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-name",children:a.name}),e.jsx("span",{className:"cat-mandatory-badge",style:{color:"var(--success)"},children:"Wajib · pemasukan rutin"})]})]})}),e.jsx("div",{className:"mand-budget-row",children:e.jsxs("div",{children:[e.jsx("span",{className:"mand-label",children:"Bulan ini"}),e.jsx("span",{className:"mand-val tabular",style:{color:s>0?"var(--success)":"var(--text-muted)"},children:s>0?`+${c(s)}`:"—"})]})})]},a.id))})]}),e.jsxs("div",{className:"cat-section mb-24",children:[e.jsx("div",{className:"cat-section-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"cat-section-title",children:"Pengeluaran Wajib"}),e.jsx("span",{className:"cat-section-sub",children:s>0?`${c(I.reduce((a,t)=>a+Number(t.budget_limit||0),0))} dari gaji ${c(s)} — langsung dipotong`:"Catat gaji di Dashboard untuk lihat persentase"})]})}),E?e.jsx("div",{className:"cat-grid",children:[...Array(3)].map((a,t)=>e.jsx("div",{className:"skeleton",style:{height:140}},t))}):e.jsx("div",{className:"cat-grid",children:I.map(a=>H(a,!0))})]}),e.jsxs("div",{className:"cat-section",children:[e.jsx("div",{className:"cat-section-head",children:e.jsx("span",{className:"cat-section-title",children:"Kategori Lainnya"})}),E?e.jsx("div",{className:"cat-grid",children:[...Array(2)].map((a,t)=>e.jsx("div",{className:"skeleton",style:{height:140}},t))}):L.length===0?e.jsx("div",{className:"card",children:e.jsxs("div",{className:"empty-state",style:{padding:"20px 0"},children:[e.jsx("div",{className:"empty-state-icon",children:"◈"}),e.jsx("strong",{children:"Belum ada kategori lain"}),e.jsx("p",{children:"Tambah kategori pengeluaran sesuai kebutuhanmu"})]})}):e.jsx("div",{className:"cat-grid",children:L.map(a=>H(a,!1))})]}),e.jsx("style",{children:`
        .month-nav-group {
          display: flex; align-items: center; gap: 0;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 99px; overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        .month-btn {
          width: 32px; height: 32px; border: none; background: transparent;
          color: var(--text-secondary); font-size: 1rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s; font-family: var(--font-sans); flex-shrink: 0;
        }
        .month-btn:hover:not(:disabled) { background: var(--bg-input); color: var(--text-primary); }
        .month-btn:disabled { opacity: 0.2; cursor: not-allowed; }
        .month-btn:first-child { border-right: 1px solid var(--border); }
        .month-btn:last-child  { border-left:  1px solid var(--border); }
        .month-label-text {
          font-size: 0.8rem; font-weight: 700; letter-spacing: -0.02em;
          color: var(--text-primary); padding: 0 12px; min-width: 110px;
          text-align: center; line-height: 32px; white-space: nowrap;
        }
        .cat-section { }
        .cat-section-head { margin-bottom: 12px; }
        .cat-section-title {
          font-size: 0.8125rem; font-weight: 700; color: var(--text-primary);
          letter-spacing: -0.01em; display: block;
        }
        .cat-section-sub {
          font-size: 0.72rem; color: var(--text-muted); font-weight: 500; margin-top: 2px; display: block;
        }

        .cat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 12px;
        }

        .cat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 16px 18px;
          display: flex; flex-direction: column; gap: 10px;
          border-top: 3px solid var(--cat-color);
        }
        .cat-mandatory { background: color-mix(in srgb, var(--cat-color) 5%, var(--bg-card)); }

        .cat-card-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .cat-card-left { display: flex; align-items: center; gap: 10px; }
        .cat-icon {
          width: 34px; height: 34px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
        }
        .cat-name { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.01em; display: block; }
        .cat-mandatory-badge {
          font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--text-muted); font-weight: 700; margin-top: 2px; display: block;
        }
        .cat-card-actions { display: flex; gap: 2px; flex-shrink: 0; }

        .cat-amounts { display: flex; justify-content: space-between; align-items: baseline; }
        .cat-spent { font-size: 1.1rem; font-weight: 800; letter-spacing: -0.025em; }
        .cat-budget { font-size: 0.75rem; color: var(--text-muted); font-weight: 500; }
        .cat-pct-label { font-size: 0.65rem; color: var(--accent); font-weight: 600; display: block; text-align: right; margin-top: 2px; }

        .cat-status-row { display: flex; align-items: center; gap: 6px; }
        .cat-sisa { font-size: 0.68rem; color: var(--text-muted); font-weight: 500; }

        .cat-no-budget {
          padding: 4px 0; display: flex; flex-direction: column; gap: 3px;
        }
        .cat-no-budget span:first-child { font-size: 0.75rem; color: var(--text-muted); font-weight: 500; }
        .cat-no-budget-hint { font-size: 0.7rem; color: var(--accent); font-weight: 600; }

        /* Mandatory card rows */
        .mand-budget-row {
          display: flex; justify-content: space-between; align-items: center;
          background: var(--bg-input); border-radius: var(--radius-sm);
          padding: 10px 12px;
        }
        .mand-label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); font-weight: 600; display: block; margin-bottom: 3px; }
        .mand-val { font-size: 1rem; font-weight: 800; letter-spacing: -0.025em; color: var(--text-primary); display: block; }
        .mand-pct-chip {
          background: var(--accent-dim); color: var(--accent);
          font-size: 0.72rem; font-weight: 700;
          padding: 4px 10px; border-radius: 99px; white-space: nowrap;
        }
        .mand-spent-row { display: flex; justify-content: space-between; align-items: center; }
        .mand-spent { font-size: 0.875rem; font-weight: 700; letter-spacing: -0.02em; }

        @media (max-width: 640px) {
          .cat-grid { grid-template-columns: 1fr; }
        }
      `})]}),z&&e.jsx(oe,{title:"Hapus Kategori",message:`Hapus kategori "${z.name}"? Transaksi yang terhubung tidak akan ikut terhapus.`,confirmLabel:"Hapus",onConfirm:X,onCancel:()=>M(null)}),Q&&!m&&e.jsx("div",{className:"modal-overlay",onClick:()=>j(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:C!=null&&C.id?"Edit Kategori":"Kategori Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>j(!1),children:"✕"})]}),e.jsx(ce,{editData:C,onSuccess:()=>{w(),j(!1)},onClose:()=>j(!1)})]})}),m&&(()=>{const a=g.find(t=>t.id===m.id);return e.jsx("div",{className:"modal-overlay",onClick:()=>b(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Budget — ",a==null?void 0:a.name]}),s>0&&e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Gaji: ",c(s)]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>b(null),children:"✕"})]}),s>0&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx("input",{className:"form-input",type:"number",placeholder:String($),value:m.pct,onChange:t=>K(t.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),e.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),m.pct&&s>0&&e.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",c(Math.round(parseFloat(m.pct)/100*s))]})]}),!m.pct&&e.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(t=>e.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>K(String(t)),children:[t,"%"]},t))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),e.jsx(le,{value:m.nominal,onChange:Z,autoFocus:!s})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>b(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:ee,children:"Simpan"})]})]})})})()]})}export{ue as default};
