import{u as G,e as Y,r as d,s as h,j as e}from"./index-BhR02Mtj.js";import{g as J,f as l}from"./formatCurrency-CwSiFA8N.js";import{i as $,C as Q}from"./mandatoryCategories-DDkfRrGa.js";import{C as V}from"./ConfirmModal-B2ASC_UR.js";import{C as X}from"./CurrencyInput-DYYEPUBF.js";const S=15;function ne(){const{user:x}=G(),_=Y(),[j,K]=d.useState([]),[z,T]=d.useState({}),[n,R]=d.useState(0),[B,F]=d.useState(!0),[W,g]=d.useState(!1),[y,M]=d.useState(null),[c,m]=d.useState(null),[w,k]=d.useState(null),b=J();d.useEffect(()=>{v()},[]);const v=async()=>{var N;F(!0);const a=`${b}-01`,t=`${b}-31`,[r,s,C,u]=await Promise.all([h.from("categories").select("*").eq("user_id",x.id).order("name"),h.from("transactions").select("category_id, amount").eq("user_id",x.id).eq("type","expense").gte("date",a).lte("date",t),h.from("salaries").select("amount").eq("user_id",x.id).eq("month",b).maybeSingle(),h.from("category_budgets").select("*").eq("user_id",x.id).eq("month",b)]),o={};(u.data||[]).forEach(i=>{o[i.category_id]=Number(i.budget_limit)});const p={};(s.data||[]).forEach(i=>{i.category_id&&(p[i.category_id]=(p[i.category_id]||0)+Number(i.amount))});const f=(r.data||[]).map(i=>({...i,budget_limit:o[i.id]!==void 0?o[i.id]:0}));K(f),T(p),R(Number(((N=C.data)==null?void 0:N.amount)||0)),F(!1)},H=async()=>{await h.from("categories").delete().eq("id",w.id),_("Kategori dihapus","success"),k(null),v()},E=a=>{const t=String(Math.round(a.budget_limit||0)),r=n>0&&a.budget_limit>0?(a.budget_limit/n*100).toFixed(1):"";m({id:a.id,nominal:t,pct:r})},L=a=>{const t=parseFloat(a)||0,r=n>0&&t>0?(t/n*100).toFixed(1):"";m(s=>({...s,nominal:a,pct:r}))},P=a=>{const t=parseFloat(a)||0,r=n>0&&t>0?String(Math.round(t/100*n)):"";m(s=>({...s,pct:a,nominal:r}))},I=async()=>{const a=parseFloat(c.nominal)||0;await h.from("category_budgets").upsert({user_id:x.id,category_id:c.id,month:b,budget_limit:a},{onConflict:"category_id,month"}),_("Budget bulan ini disimpan","success"),m(null),v()},q=j.filter(a=>$(a)),A=j.filter(a=>!$(a)),O=j.reduce((a,t)=>a+Number(t.budget_limit||0),0),U=Object.values(z).reduce((a,t)=>a+t,0),D=(a,t)=>{const r=z[a.id]||0,s=Number(a.budget_limit||0),C=s>0?Math.min(r/s*100,100):0,u=s>0?r/s*100:0,o=u>100,p=!o&&u>=100,f=!o&&u>=80&&u<100,N=o?"var(--danger)":p?"var(--success)":f?"var(--warning)":a.color,i=n>0&&s>0?(s/n*100).toFixed(0):null;return t?e.jsxs("div",{className:"cat-card cat-mandatory",style:{"--cat-color":a.color},children:[e.jsxs("div",{className:"cat-card-top",children:[e.jsxs("div",{className:"cat-card-left",children:[e.jsx("span",{className:"cat-icon",style:{background:`${a.color}20`,color:a.color},children:a.icon}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-name",children:a.name}),e.jsx("span",{className:"cat-mandatory-badge",children:"Wajib · langsung dipotong"})]})]}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>E(a),style:{fontSize:"0.72rem"},children:"Ubah"})]}),e.jsxs("div",{className:"mand-budget-row",children:[e.jsxs("div",{children:[e.jsx("span",{className:"mand-label",children:"Budget per bulan"}),e.jsx("span",{className:"mand-val tabular",children:s>0?l(s):"—"})]}),i&&e.jsxs("span",{className:"mand-pct-chip",children:[i,"% gaji"]})]})]},a.id):e.jsxs("div",{className:"cat-card",style:{"--cat-color":a.color},children:[e.jsxs("div",{className:"cat-card-top",children:[e.jsxs("div",{className:"cat-card-left",children:[e.jsx("span",{className:"cat-icon",style:{background:`${a.color}20`,color:a.color},children:a.icon}),e.jsx("span",{className:"cat-name",children:a.name})]}),e.jsxs("div",{className:"cat-card-actions",children:[e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{M(a),g(!0)},children:"✎"}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>E(a),style:{fontSize:"0.72rem",whiteSpace:"nowrap"},children:s>0?"Set":"+ Budget"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)"},onClick:()=>k({id:a.id,name:a.name}),children:"✕"})]})]}),s>0?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"cat-amounts",children:[e.jsx("span",{className:"cat-spent tabular",style:{color:o?"var(--danger)":"var(--text-primary)"},children:l(r)}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsxs("span",{className:"cat-budget tabular",children:["/ ",l(s)]}),i&&e.jsxs("span",{className:"cat-pct-label",children:[i,"% gaji"]})]})]}),e.jsx("div",{className:"progress-bar",style:{height:6},children:e.jsx("div",{className:"progress-fill",style:{width:`${C}%`,background:N}})}),e.jsxs("div",{className:"cat-status-row",children:[o&&e.jsxs("span",{className:"badge badge-danger",style:{fontSize:"0.6rem"},children:["Over ",l(r-s)]}),p&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.6rem"},children:"Penuh"}),f&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem"},children:"Hampir"}),!o&&!p&&!f&&e.jsxs("span",{className:"cat-sisa",children:["Sisa ",l(s-r)]})]})]}):e.jsxs("div",{className:"cat-no-budget",children:[e.jsx("span",{children:"Belum ada budget"}),n>0&&e.jsxs("span",{className:"cat-no-budget-hint",children:["Default: ",l(Math.round(n*S/100))," (",S,"%)"]})]})]},a.id)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"flex-between mb-24",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"page-title",children:"Kategori"}),e.jsxs("p",{className:"page-subtitle",style:{margin:0},children:[l(U)," dari ",l(O)," budget bulan ini"]})]}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>{M(null),g(!0)},children:"+ Kategori"})]}),e.jsxs("div",{className:"cat-section mb-24",children:[e.jsx("div",{className:"cat-section-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"cat-section-title",children:"Pengeluaran Wajib"}),e.jsx("span",{className:"cat-section-sub",children:n>0?`${l(q.reduce((a,t)=>a+Number(t.budget_limit||0),0))} dari gaji ${l(n)} — langsung dipotong`:"Atur gaji di Dashboard untuk lihat persentase"})]})}),B?e.jsx("div",{className:"cat-grid",children:[...Array(3)].map((a,t)=>e.jsx("div",{className:"skeleton",style:{height:140}},t))}):e.jsx("div",{className:"cat-grid",children:q.map(a=>D(a,!0))})]}),e.jsxs("div",{className:"cat-section",children:[e.jsx("div",{className:"cat-section-head",children:e.jsx("span",{className:"cat-section-title",children:"Kategori Lainnya"})}),B?e.jsx("div",{className:"cat-grid",children:[...Array(2)].map((a,t)=>e.jsx("div",{className:"skeleton",style:{height:140}},t))}):A.length===0?e.jsx("div",{className:"card",children:e.jsxs("div",{className:"empty-state",style:{padding:"20px 0"},children:[e.jsx("div",{className:"empty-state-icon",children:"◈"}),e.jsx("strong",{children:"Belum ada kategori lain"}),e.jsx("p",{children:"Tambah kategori pengeluaran sesuai kebutuhanmu"})]})}):e.jsx("div",{className:"cat-grid",children:A.map(a=>D(a,!1))})]}),e.jsx("style",{children:`
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
      `})]}),w&&e.jsx(V,{title:"Hapus Kategori",message:`Hapus kategori "${w.name}"? Transaksi yang terhubung tidak akan ikut terhapus.`,confirmLabel:"Hapus",onConfirm:H,onCancel:()=>k(null)}),W&&!c&&e.jsx("div",{className:"modal-overlay",onClick:()=>g(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:y!=null&&y.id?"Edit Kategori":"Kategori Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>g(!1),children:"✕"})]}),e.jsx(Q,{editData:y,onSuccess:()=>{v(),g(!1)},onClose:()=>g(!1)})]})}),c&&(()=>{const a=j.find(t=>t.id===c.id);return e.jsx("div",{className:"modal-overlay",onClick:()=>m(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Budget — ",a==null?void 0:a.name]}),n>0&&e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Gaji: ",l(n)]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>m(null),children:"✕"})]}),n>0&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx("input",{className:"form-input",type:"number",placeholder:String(S),value:c.pct,onChange:t=>P(t.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),e.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),c.pct&&n>0&&e.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",l(Math.round(parseFloat(c.pct)/100*n))]})]}),!c.pct&&e.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(t=>e.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>P(String(t)),children:[t,"%"]},t))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),e.jsx(X,{value:c.nominal,onChange:L,autoFocus:!n})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>m(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:I,children:"Simpan"})]})]})})})()]})}export{ne as default};
