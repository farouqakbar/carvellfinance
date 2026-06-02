import{u as pe,i as ge,r as l,h as ue,g as U,s as g,j as e,L as he,d as xe,f as c,C as J}from"./index-8D83QUkP.js";import{C as be}from"./CategoryForm-0HZGh1f4.js";import{a as Q,i as V,C as fe}from"./ConfirmModal-73dFZhFq.js";const I=15;function je(d){const[u,p]=d.split("-").map(Number),x=new Date(u,p-2,1);return`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}`}function ve(d){const[u,p]=d.split("-").map(Number),x=new Date(u,p,1);return`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}`}function Se(){const{user:d}=pe(),u=ge(),[p,x]=l.useState([]),[$,X]=l.useState({}),[s,Z]=l.useState(0),[T,E]=l.useState(!0),[ee,b]=l.useState(!1),[f,F]=l.useState(null),[m,j]=l.useState(null),[P,B]=l.useState(null),[ae]=ue(),[o,W]=l.useState(()=>ae.get("month")||U()),[ye,Ne]=l.useState(!1),[te,se]=l.useState(null),[ne,C]=l.useState(!1),[v,D]=l.useState({description:"",amount:""}),[q,L]=l.useState(!1),ie=o===U();l.useEffect(()=>{N()},[o]);const N=async()=>{E(!0);const a=`${o}-01`,[t,r]=o.split("-").map(Number),n=new Date(t,r,0).toISOString().split("T")[0],[M,k,h,S]=await Promise.all([g.from("categories").select("*").eq("user_id",d.id).order("name"),g.from("transactions").select("category_id, amount").eq("user_id",d.id).eq("type","expense").gte("date",a).lte("date",n),g.from("transactions").select("category_id, amount").eq("user_id",d.id).eq("type","income").gte("date",a).lte("date",n),g.from("category_budgets").select("*").eq("user_id",d.id).eq("month",o)]),y={};(S.data||[]).forEach(i=>{y[i.category_id]=Number(i.budget_limit)});const _={};(k.data||[]).forEach(i=>{i.category_id&&(_[i.category_id]=(_[i.category_id]||0)+Number(i.amount))});const w=(M.data||[]).map(i=>({...i,budget_limit:y[i.id]!==void 0?y[i.id]:0})),z=(M.data||[]).find(i=>i.name==="Gaji"),de=z?(h.data||[]).filter(i=>i.category_id===z.id).reduce((i,me)=>i+Number(me.amount),0):0;x(w),X(_),Z(de),se((z==null?void 0:z.id)||null),E(!1)},re=async()=>{const a=parseFloat(v.amount)||0;if(!(!a||!v.description.trim())){L(!0);try{let t=te;if(!t){const{data:r}=await g.from("categories").insert({user_id:d.id,name:"Gaji",color:"#10b981",icon:"",is_mandatory:!1,budget_limit:0}).select().single();t=r.id}await g.from("transactions").insert({user_id:d.id,category_id:t,type:"income",amount:a,description:v.description.trim(),date:`${o}-01`}),u("Pemasukan dicatat","success"),C(!1),D({description:"",amount:""}),N()}finally{L(!1)}}},le=async()=>{await g.from("categories").delete().eq("id",P.id),u("Kategori dihapus","success"),B(null),N()},A=a=>{const t=String(Math.round(a.budget_limit||0)),r=s>0&&a.budget_limit>0?(a.budget_limit/s*100).toFixed(1):"";j({id:a.id,nominal:t,pct:r})},oe=a=>{const t=parseFloat(a)||0,r=s>0&&t>0?(t/s*100).toFixed(1):"";j(n=>({...n,nominal:a,pct:r}))},K=a=>{const t=parseFloat(a)||0,r=s>0&&t>0?String(Math.round(t/100*s)):"";j(n=>({...n,pct:a,nominal:r}))},ce=async()=>{const a=parseFloat(m.nominal)||0;await g.from("category_budgets").upsert({user_id:d.id,category_id:m.id,month:o,budget_limit:a},{onConflict:"category_id,month"}),u("Budget bulan ini disimpan","success"),j(null),N()},G=async a=>{await g.from("categories").update({is_mandatory:!a.is_mandatory}).eq("id",a.id),u(a.is_mandatory?"Dilepas dari pengeluaran wajib":"Dijadikan pengeluaran wajib","success"),N()},R=p.filter(a=>Q(a)),H=p.filter(a=>V(a)),O=p.filter(a=>!V(a)&&!Q(a));p.reduce((a,t)=>a+Number(t.budget_limit||0),0),Object.values($).reduce((a,t)=>a+t,0);const Y=(a,t)=>{const r=$[a.id]||0,n=Number(a.budget_limit||0),M=n>0?Math.min(r/n*100,100):0,k=n>0?r/n*100:0,h=k>100,S=!h&&k>=100,y=!h&&k>=80&&k<100,_=h?"var(--danger)":S?"var(--success)":y?"var(--warning)":a.color,w=s>0&&n>0?(n/s*100).toFixed(0):null;return t?e.jsxs("div",{className:"cat-card cat-mandatory",style:{"--cat-color":a.color},children:[e.jsxs("div",{className:"cat-card-top",children:[e.jsxs("div",{className:"cat-card-left",children:[e.jsx("span",{className:"cat-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)",fontSize:"1rem"},children:"↓"}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-name",children:a.name}),e.jsx("span",{className:"cat-mandatory-badge",children:"Wajib · langsung dipotong"})]})]}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>A(a),style:{fontSize:"0.72rem"},children:"Ubah"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.72rem",color:"var(--text-muted)"},onClick:()=>G(a),children:"Lepas"})]})]}),e.jsxs("div",{className:"mand-budget-row",children:[e.jsxs("div",{children:[e.jsx("span",{className:"mand-label",children:"Budget per bulan"}),e.jsx("span",{className:"mand-val tabular",children:n>0?c(n):"—"})]}),w&&e.jsxs("span",{className:"mand-pct-chip",children:[w,"% gaji"]})]})]},a.id):e.jsxs("div",{className:"cat-card",style:{"--cat-color":a.color},children:[e.jsxs("div",{className:"cat-card-top",children:[e.jsxs("div",{className:"cat-card-left",children:[e.jsx("span",{className:"cat-icon",style:{background:"rgba(248,113,113,0.12)",color:"var(--danger)",fontSize:"1rem"},children:"↓"}),e.jsx("span",{className:"cat-name",children:a.name})]}),e.jsxs("div",{className:"cat-card-actions",children:[e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>{F(a),b(!0)},children:"✎"}),e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>A(a),style:{fontSize:"0.72rem",whiteSpace:"nowrap"},children:n>0?"Set":"+ Budget"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{fontSize:"0.68rem",color:"var(--text-muted)",whiteSpace:"nowrap"},onClick:()=>G(a),children:"Wajibkan"}),e.jsx("button",{className:"btn btn-ghost btn-sm",style:{color:"var(--danger)"},onClick:()=>B({id:a.id,name:a.name}),children:"✕"})]})]}),n>0?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"cat-amounts",children:[e.jsx("span",{className:"cat-spent tabular",style:{color:h?"var(--danger)":"var(--text-primary)"},children:c(r)}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsxs("span",{className:"cat-budget tabular",children:["/ ",c(n)]}),w&&e.jsxs("span",{className:"cat-pct-label",children:[w,"% gaji"]})]})]}),e.jsx("div",{className:"progress-bar",style:{height:6},children:e.jsx("div",{className:"progress-fill",style:{width:`${M}%`,background:_}})}),e.jsxs("div",{className:"cat-status-row",children:[h&&e.jsxs("span",{className:"badge badge-danger",style:{fontSize:"0.6rem"},children:["Over ",c(r-n)]}),S&&e.jsx("span",{className:"badge badge-success",style:{fontSize:"0.6rem"},children:"Penuh"}),y&&e.jsx("span",{className:"badge badge-warning",style:{fontSize:"0.6rem"},children:"Hampir"}),!h&&!S&&!y&&e.jsxs("span",{className:"cat-sisa",children:["Sisa ",c(n-r)]})]})]}):e.jsxs("div",{className:"cat-no-budget",children:[e.jsx("span",{children:"Belum ada budget"}),s>0&&e.jsxs("span",{className:"cat-no-budget-hint",children:["Default: ",c(Math.round(s*I/100))," (",I,"%)"]})]})]},a.id)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"animate-in",children:[e.jsxs("div",{className:"dash-header",children:[e.jsx(he,{to:`/dashboard?month=${o}`,className:"back-btn",children:"‹ Dashboard"}),e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>W(je(o)),children:"‹"}),e.jsx("span",{className:"month-label-text",children:xe(o)}),e.jsx("button",{className:"month-btn",onClick:()=>W(ve(o)),disabled:ie,children:"›"})]}),e.jsx("div",{})]}),e.jsxs("div",{className:"cat-page-header",children:[e.jsx("div",{className:"cat-page-icon",children:"⚙"}),e.jsxs("div",{children:[e.jsx("h1",{className:"cat-page-title",children:"Setting Kategori"}),e.jsx("p",{className:"cat-page-sub",children:"Kelola kategori & budget bulanan"})]})]}),R.length>0&&e.jsxs("div",{className:"cat-section mb-24",children:[e.jsxs("div",{className:"cat-section-head",children:[e.jsxs("div",{children:[e.jsx("span",{className:"cat-section-title",children:"Pemasukan Wajib"}),e.jsx("span",{className:"cat-section-sub",children:s>0?`Total gaji bulan ini: ${c(s)}`:"Belum ada transaksi Gaji bulan ini"})]}),e.jsx("button",{className:"btn btn-ghost btn-sm cat-add-btn",onClick:()=>C(!0),children:"+"})]}),e.jsx("div",{className:"cat-grid",children:R.map(a=>e.jsxs("div",{className:"cat-card cat-mandatory",style:{"--cat-color":a.color},children:[e.jsx("div",{className:"cat-card-top",children:e.jsxs("div",{className:"cat-card-left",children:[e.jsx("span",{className:"cat-icon",style:{background:"rgba(52,211,153,0.12)",color:"var(--success)",fontSize:"1rem"},children:"↑"}),e.jsxs("div",{children:[e.jsx("span",{className:"cat-name",children:a.name}),e.jsx("span",{className:"cat-mandatory-badge",style:{color:"var(--success)"},children:"Wajib · pemasukan rutin"})]})]})}),e.jsx("div",{className:"mand-budget-row",children:e.jsxs("div",{children:[e.jsx("span",{className:"mand-label",children:"Bulan ini"}),e.jsx("span",{className:"mand-val tabular",style:{color:s>0?"var(--success)":"var(--text-muted)"},children:s>0?`+${c(s)}`:"—"})]})})]},a.id))})]}),e.jsxs("div",{className:"cat-section mb-24",children:[e.jsxs("div",{className:"cat-section-head",children:[e.jsxs("div",{children:[e.jsx("span",{className:"cat-section-title",children:"Pengeluaran Wajib"}),e.jsx("span",{className:"cat-section-sub",children:s>0?`${c(H.reduce((a,t)=>a+Number(t.budget_limit||0),0))} dari gaji ${c(s)} — langsung dipotong`:"Catat gaji di Dashboard untuk lihat persentase"})]}),e.jsx("button",{className:"btn btn-ghost btn-sm cat-add-btn",onClick:()=>{F({is_mandatory:!0}),b(!0)},children:"+"})]}),T?e.jsx("div",{className:"cat-grid",children:[...Array(3)].map((a,t)=>e.jsx("div",{className:"skeleton",style:{height:140}},t))}):e.jsx("div",{className:"cat-grid",children:H.map(a=>Y(a,!0))})]}),e.jsxs("div",{className:"cat-section",children:[e.jsxs("div",{className:"cat-section-head",children:[e.jsx("span",{className:"cat-section-title",children:"Kategori Lainnya"}),e.jsx("button",{className:"btn btn-ghost btn-sm cat-add-btn",onClick:()=>{F(null),b(!0)},children:"+"})]}),T?e.jsx("div",{className:"cat-grid",children:[...Array(2)].map((a,t)=>e.jsx("div",{className:"skeleton",style:{height:140}},t))}):O.length===0?e.jsx("div",{className:"card",children:e.jsxs("div",{className:"empty-state",style:{padding:"20px 0"},children:[e.jsx("div",{className:"empty-state-icon",children:"◈"}),e.jsx("strong",{children:"Belum ada kategori lain"}),e.jsx("p",{children:"Tambah kategori pengeluaran sesuai kebutuhanmu"})]})}):e.jsx("div",{className:"cat-grid",children:O.map(a=>Y(a,!1))})]}),e.jsx("style",{children:`
        .back-btn {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 0.75rem; font-weight: 600;
          color: var(--text-muted); text-decoration: none;
          padding: 5px 10px; transition: all 0.15s;
          width: fit-content; justify-self: start;
          font-family: var(--font-sans);
          letter-spacing: -0.01em;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }
        .back-btn:hover { color: var(--text-primary); background: var(--bg-input); box-shadow: none; }
        .dash-header {
          display: grid; grid-template-columns: 1fr auto 1fr;
          align-items: center; gap: 10px;
          position: sticky; top: 0; z-index: 100;
          background: var(--bg-sticky); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          padding: 10px 0; margin-bottom: 10px;
        }
        .dash-header > :last-child { display: flex; justify-content: flex-end; gap: 6px; }
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
        .cat-page-header {
          display: flex; align-items: center; gap: 14px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-left: 3px solid var(--accent);
          border-radius: var(--radius-lg);
          padding: 16px 20px;
          margin-bottom: 28px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
        }
        .cat-page-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: var(--accent-dim); color: var(--accent);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; flex-shrink: 0;
        }
        .cat-page-title {
          font-size: 1.1rem; font-weight: 800; letter-spacing: -0.03em;
          color: var(--text-primary); line-height: 1; margin: 0 0 4px;
        }
        .cat-page-sub {
          font-size: 0.72rem; color: var(--text-muted); font-weight: 500; margin: 0;
        }

        .cat-section { }
        .cat-section-head { margin-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-start; }
        .cat-add-btn {
          font-size: 1rem; font-weight: 500; line-height: 1;
          width: 28px; height: 28px; padding: 0;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px; flex-shrink: 0; margin-top: 1px;
          color: var(--text-muted);
          background: var(--bg-card);
          border: 1px solid var(--border);
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
          transition: all 0.15s;
        }
        .cat-add-btn:hover {
          color: var(--accent);
          border-color: var(--accent);
          background: var(--accent-dim);
          box-shadow: none;
        }
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
      `})]}),P&&e.jsx(fe,{title:"Hapus Kategori",message:`Hapus kategori "${P.name}"? Transaksi yang terhubung tidak akan ikut terhapus.`,confirmLabel:"Hapus",onConfirm:le,onCancel:()=>B(null)}),ne&&e.jsx("div",{className:"modal-overlay",onClick:()=>C(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Tambah Pemasukan"}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Dicatat ke bulan ",o]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>C(!1),children:"✕"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Nama Pemasukan"}),e.jsx("input",{className:"form-input",type:"text",placeholder:"Misal: Gaji Pokok, Bonus, Freelance...",value:v.description,onChange:a=>D(t=>({...t,description:a.target.value})),autoFocus:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Jumlah"}),e.jsx(J,{value:v.amount,onChange:a=>D(t=>({...t,amount:a}))})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>C(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:re,disabled:q||!v.description.trim()||!v.amount,children:q?"Menyimpan...":"Simpan"})]})]})}),ee&&!m&&e.jsx("div",{className:"modal-overlay",onClick:()=>b(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:f!=null&&f.id?"Edit Kategori":f!=null&&f.is_mandatory?"Pengeluaran Wajib Baru":"Kategori Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>b(!1),children:"✕"})]}),e.jsx(be,{editData:f,salary:s,month:o,onSuccess:()=>{N(),b(!1)},onClose:()=>b(!1)})]})}),m&&(()=>{const a=p.find(t=>t.id===m.id);return e.jsx("div",{className:"modal-overlay",onClick:()=>j(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Budget — ",a==null?void 0:a.name]}),s>0&&e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Gaji: ",c(s)]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>j(null),children:"✕"})]}),s>0&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx("input",{className:"form-input",type:"number",placeholder:String(I),value:m.pct,onChange:t=>K(t.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),e.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),m.pct&&s>0&&e.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",c(Math.round(parseFloat(m.pct)/100*s))]})]}),!m.pct&&e.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(t=>e.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>K(String(t)),children:[t,"%"]},t))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),e.jsx(J,{value:m.nominal,onChange:oe,autoFocus:!s})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>j(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:ce,children:"Simpan"})]})]})})})()]})}export{Se as default};
