import{u as V,e as X,r as d,s as x,j as e}from"./index-Cs9p8C--.js";import{g as Z,f as l}from"./formatCurrency-CwSiFA8N.js";import{a as A,i as K,C as ee}from"./mandatoryCategories-BYI7P-zN.js";import{C as ae}from"./ConfirmModal-BIJeLDhG.js";import{C as se}from"./CurrencyInput-DB8vOIPh.js";const _=15;function ce(){const{user:b}=V(),z=X(),[j,R]=d.useState([]),[B,H]=d.useState({}),[t,I]=d.useState(0),[F,M]=d.useState(!0),[L,g]=d.useState(!1),[y,E]=d.useState(null),[c,m]=d.useState(null),[w,C]=d.useState(null),v=Z();d.useEffect(()=>{N()},[]);const N=async()=>{M(!0);const a=`${v}-01`,s=`${v}-31`,[r,n,S,u]=await Promise.all([x.from("categories").select("*").eq("user_id",b.id).order("name"),x.from("transactions").select("category_id, amount").eq("user_id",b.id).eq("type","expense").gte("date",a).lte("date",s),x.from("transactions").select("category_id, amount").eq("user_id",b.id).eq("type","income").gte("date",a).lte("date",s),x.from("category_budgets").select("*").eq("user_id",b.id).eq("month",v)]),o={};(u.data||[]).forEach(i=>{o[i.category_id]=Number(i.budget_limit)});const p={};(n.data||[]).forEach(i=>{i.category_id&&(p[i.category_id]=(p[i.category_id]||0)+Number(i.amount))});const f=(r.data||[]).map(i=>({...i,budget_limit:o[i.id]!==void 0?o[i.id]:0})),k=(r.data||[]).find(i=>i.name==="Gaji"),h=k?(S.data||[]).filter(i=>i.category_id===k.id).reduce((i,Q)=>i+Number(Q.amount),0):0;R(f),H(p),I(h),M(!1)},G=async()=>{await x.from("categories").delete().eq("id",w.id),z("Kategori dihapus","success"),C(null),N()},P=a=>{const s=String(Math.round(a.budget_limit||0)),r=t>0&&a.budget_limit>0?(a.budget_limit/t*100).toFixed(1):"";m({id:a.id,nominal:s,pct:r})},O=a=>{const s=parseFloat(a)||0,r=t>0&&s>0?(s/t*100).toFixed(1):"";m(n=>({...n,nominal:a,pct:r}))},$=a=>{const s=parseFloat(a)||0,r=t>0&&s>0?String(Math.round(s/100*t)):"";m(n=>({...n,pct:a,nominal:r}))},U=async()=>{const a=parseFloat(c.nominal)||0;await x.from("category_budgets").upsert({user_id:b.id,category_id:c.id,month:v,budget_limit:a},{onConflict:"category_id,month"}),z("Budget bulan ini disimpan","success"),m(null),N()},T=j.filter(a=>A(a)),q=j.filter(a=>K(a)),D=j.filter(a=>!K(a)&&!A(a)),Y=j.reduce((a,s)=>a+Number(s.budget_limit||0),0),J=Object.values(B).reduce((a,s)=>a+s,0),W=(a,s)=>{const r=B[a.id]||0,n=Number(a.budget_limit||0),S=n>0?Math.min(r/n*100,100):0,u=n>0?r/n*100:0,o=u>100,p=!o&&u>=100,f=!o&&u>=80&&u<100,k=o?"var(--danger)":p?"var(--success)":f?"var(--warning)":a.color,h=t>0&&n>0?(n/t*100).toFixed(0):null;return s?e.jsxs("div",{className:"cat-card cat-mandatory",style:{"--cat-color":a.color},children:[e.jsxs("div",{className:"cat-card-top",children:[e.jsxs("div",{className:"cat-card-left",children:[e.jsx("span",{className:"cat-icon",style:{background:`${a.color}20`,color:a.color},children:a.icon}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-name",children:a.name}),e.jsx("span",{className:"cat-mandatory-badge",children:"Wajib · langsung dipotong"})]})]}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>P(a),style:{fontSize:"0.72rem"},children:"Ubah"})]}),e.jsxs("div",{className:"mand-budget-row",children:[e.jsxs("div",{children:[e.jsx("span",{className:"mand-label",children:"Budget per bulan"}),e.jsx("span",{className:"mand-val tabular",children:n>0?l(n):"—"})]}),h&&e.jsxs("span",{className:"mand-pct-chip",children:[h,"% gaji"]})]})]},a.id):e.jsxs("div",{className:"cat-card",style:{"--cat-color":a.color},children:[e.jsxs("div",{className:"cat-card-top",children:[e.jsxs("div",{className:"cat-card-left",children:[e.jsx("span",{className:"cat-icon",style:{background:`${a.color}20`,color:a.color},children:a.icon}),e.jsx("span",{className:"cat-name",children:a.name})]}),e.jsxs("div",{className:"cat-card-actions",children:[e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{E(a),g(!0)},children:"✎"}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>P(a),style:{fontSize:"0.72rem",whiteSpace:"nowrap"},children:n>0?"Set":"+ Budget"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)"},onClick:()=>C({id:a.id,name:a.name}),children:"✕"})]})]}),n>0?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"cat-amounts",children:[e.jsx("span",{className:"cat-spent tabular",style:{color:o?"var(--danger)":"var(--text-primary)"},children:l(r)}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsxs("span",{className:"cat-budget tabular",children:["/ ",l(n)]}),h&&e.jsxs("span",{className:"cat-pct-label",children:[h,"% gaji"]})]})]}),e.jsx("div",{className:"progress-bar",style:{height:6},children:e.jsx("div",{className:"progress-fill",style:{width:`${S}%`,background:k}})}),e.jsxs("div",{className:"cat-status-row",children:[o&&e.jsxs("span",{className:"badge badge-danger",style:{fontSize:"0.6rem"},children:["Over ",l(r-n)]}),p&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.6rem"},children:"Penuh"}),f&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem"},children:"Hampir"}),!o&&!p&&!f&&e.jsxs("span",{className:"cat-sisa",children:["Sisa ",l(n-r)]})]})]}):e.jsxs("div",{className:"cat-no-budget",children:[e.jsx("span",{children:"Belum ada budget"}),t>0&&e.jsxs("span",{className:"cat-no-budget-hint",children:["Default: ",l(Math.round(t*_/100))," (",_,"%)"]})]})]},a.id)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"flex-between mb-24",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"page-title",children:"Kategori"}),e.jsxs("p",{className:"page-subtitle",style:{margin:0},children:[l(J)," dari ",l(Y)," budget bulan ini"]})]}),e.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>{E(null),g(!0)},children:"+ Kategori"})]}),T.length>0&&e.jsxs("div",{className:"cat-section mb-24",children:[e.jsx("div",{className:"cat-section-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"cat-section-title",children:"Pemasukan Wajib"}),e.jsx("span",{className:"cat-section-sub",children:t>0?`Total gaji bulan ini: ${l(t)}`:"Belum ada transaksi Gaji bulan ini"})]})}),e.jsx("div",{className:"cat-grid",children:T.map(a=>e.jsxs("div",{className:"cat-card cat-mandatory",style:{"--cat-color":a.color},children:[e.jsx("div",{className:"cat-card-top",children:e.jsxs("div",{className:"cat-card-left",children:[e.jsx("span",{className:"cat-icon",style:{background:`${a.color}20`,color:a.color},children:a.icon}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-name",children:a.name}),e.jsx("span",{className:"cat-mandatory-badge",style:{color:"var(--success)"},children:"Wajib · pemasukan rutin"})]})]})}),e.jsx("div",{className:"mand-budget-row",children:e.jsxs("div",{children:[e.jsx("span",{className:"mand-label",children:"Bulan ini"}),e.jsx("span",{className:"mand-val tabular",style:{color:t>0?"var(--success)":"var(--text-muted)"},children:t>0?`+${l(t)}`:"—"})]})})]},a.id))})]}),e.jsxs("div",{className:"cat-section mb-24",children:[e.jsx("div",{className:"cat-section-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"cat-section-title",children:"Pengeluaran Wajib"}),e.jsx("span",{className:"cat-section-sub",children:t>0?`${l(q.reduce((a,s)=>a+Number(s.budget_limit||0),0))} dari gaji ${l(t)} — langsung dipotong`:"Catat gaji di Dashboard untuk lihat persentase"})]})}),F?e.jsx("div",{className:"cat-grid",children:[...Array(3)].map((a,s)=>e.jsx("div",{className:"skeleton",style:{height:140}},s))}):e.jsx("div",{className:"cat-grid",children:q.map(a=>W(a,!0))})]}),e.jsxs("div",{className:"cat-section",children:[e.jsx("div",{className:"cat-section-head",children:e.jsx("span",{className:"cat-section-title",children:"Kategori Lainnya"})}),F?e.jsx("div",{className:"cat-grid",children:[...Array(2)].map((a,s)=>e.jsx("div",{className:"skeleton",style:{height:140}},s))}):D.length===0?e.jsx("div",{className:"card",children:e.jsxs("div",{className:"empty-state",style:{padding:"20px 0"},children:[e.jsx("div",{className:"empty-state-icon",children:"◈"}),e.jsx("strong",{children:"Belum ada kategori lain"}),e.jsx("p",{children:"Tambah kategori pengeluaran sesuai kebutuhanmu"})]})}):e.jsx("div",{className:"cat-grid",children:D.map(a=>W(a,!1))})]}),e.jsx("style",{children:`
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
      `})]}),w&&e.jsx(ae,{title:"Hapus Kategori",message:`Hapus kategori "${w.name}"? Transaksi yang terhubung tidak akan ikut terhapus.`,confirmLabel:"Hapus",onConfirm:G,onCancel:()=>C(null)}),L&&!c&&e.jsx("div",{className:"modal-overlay",onClick:()=>g(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:y!=null&&y.id?"Edit Kategori":"Kategori Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>g(!1),children:"✕"})]}),e.jsx(ee,{editData:y,onSuccess:()=>{N(),g(!1)},onClose:()=>g(!1)})]})}),c&&(()=>{const a=j.find(s=>s.id===c.id);return e.jsx("div",{className:"modal-overlay",onClick:()=>m(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Budget — ",a==null?void 0:a.name]}),t>0&&e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Gaji: ",l(t)]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>m(null),children:"✕"})]}),t>0&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx("input",{className:"form-input",type:"number",placeholder:String(_),value:c.pct,onChange:s=>$(s.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),e.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),c.pct&&t>0&&e.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",l(Math.round(parseFloat(c.pct)/100*t))]})]}),!c.pct&&e.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(s=>e.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>$(String(s)),children:[s,"%"]},s))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),e.jsx(se,{value:c.nominal,onChange:O,autoFocus:!t})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>m(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:U,children:"Simpan"})]})]})})})()]})}export{ce as default};
