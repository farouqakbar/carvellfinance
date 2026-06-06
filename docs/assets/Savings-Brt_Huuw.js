import{F as ie,K as ce,D as r,w as W,E as c,B as e,f as G,v as u,m as K,z as de,r as pe,g as H,q as me,s as L,C as ue,o as ge,h as xe,l as he,A as be}from"./index-BLpsvlZG.js";function fe(){const d=[],l=new Date;for(let i=0;i<24;i++){const p=new Date(l.getFullYear(),l.getMonth()+i,1),g=`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}`;d.push({val:g,label:p.toLocaleDateString("id-ID",{month:"long",year:"numeric"})})}return d}const ve=fe(),Y=be();function ye(){const{user:d}=ie(),l=ce(),[i,p]=r.useState([]),[g,T]=r.useState([]),[U,X]=r.useState([]),[J,D]=r.useState(!0),[x,Q]=r.useState("aktif"),[V,v]=r.useState(!1),[o,j]=r.useState({name:"",amount:"",targetMonth:W(),notes:""}),[_,M]=r.useState(!1),[Z,I]=r.useState(null),[m,y]=r.useState(null),[h,k]=r.useState("gaji"),[b,P]=r.useState(""),[B,F]=r.useState(""),[R,q]=r.useState(Y),[N,f]=r.useState(!1);r.useEffect(()=>{ee()},[]);const ee=async()=>{D(!0);const[a,t,s]=await Promise.all([c.from("plans").select("*").eq("user_id",d.id).order("target_month",{ascending:!0}).order("created_at",{ascending:!0}),c.from("savings").select("*").eq("user_id",d.id).order("name"),c.from("categories").select("*").eq("user_id",d.id).order("name")]);p(a.data||[]),T(t.data||[]);const n=s.data||[];X(n),n.length>0&&F(n[0].id),(t.data||[]).length>0&&P(t.data[0].id),D(!1)},ae=async()=>{const{data:a}=await c.from("plans").select("*").eq("user_id",d.id).order("target_month",{ascending:!0}).order("created_at",{ascending:!0});p(a||[])},ne=async()=>{if(!o.name.trim()||!o.amount||!o.targetMonth)return;M(!0);const{error:a}=await c.from("plans").insert({user_id:d.id,name:o.name.trim(),amount:parseFloat(o.amount),target_month:o.targetMonth,notes:o.notes.trim(),done:!1});a?l("Gagal menyimpan","error"):(l("Rencana ditambahkan","success"),j({name:"",amount:"",targetMonth:W(),notes:""}),v(!1),ae()),M(!1)},te=a=>{if(a.done){c.from("plans").update({done:!1}).eq("id",a.id).then(({error:t})=>{if(t){l(t.message,"error");return}p(s=>s.map(n=>n.id===a.id?{...n,done:!1}:n)),l("Ditandai aktif kembali","success")});return}y(a),k("gaji"),q(Y)},se=async()=>{if(!m)return;f(!0);const a=m;if(h==="tabungan"){const s=g.find(C=>C.id===b);if(!s){l("Pilih tabungan dulu","error"),f(!1);return}const n=Math.max(0,Number(s.current_amount)-Number(a.amount)),{error:S}=await c.from("savings").update({current_amount:n}).eq("id",b);if(S){l("Gagal update tabungan","error"),f(!1);return}T(C=>C.map(z=>z.id===b?{...z,current_amount:n}:z))}else{const{error:s}=await c.from("transactions").insert({user_id:d.id,category_id:B||null,amount:Number(a.amount),date:R,description:`Beli: ${a.name}`,type:"expense"});if(s){l("Gagal catat transaksi","error"),f(!1);return}}const{error:t}=await c.from("plans").update({done:!0}).eq("id",a.id);if(t){l(t.message,"error"),f(!1);return}p(s=>s.map(n=>n.id===a.id?{...n,done:!0}:n)),l("Rencana selesai dicatat ✓","success"),y(null),f(!1)},re=async a=>{I(a);const{error:t}=await c.from("plans").delete().eq("id",a);t||(p(s=>s.filter(n=>n.id!==a)),l("Rencana dihapus","success")),I(null)},le=i.filter(a=>x==="aktif"?!a.done:x==="selesai"?a.done:!0),w={};le.forEach(a=>{w[a.target_month]||(w[a.target_month]=[]),w[a.target_month].push(a)});const $=Object.keys(w).sort(),A=i.filter(a=>!a.done).reduce((a,t)=>a+Number(t.amount),0),oe=i.filter(a=>a.done).reduce((a,t)=>a+Number(t.amount),0),E=i.filter(a=>!a.done).length,O=i.filter(a=>a.done).length;return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"animate-in pln-page",children:[e.jsxs("div",{className:"pln-page-header",children:[e.jsx("div",{className:"pln-page-icon",children:e.jsx(G,{size:16})}),e.jsxs("div",{children:[e.jsx("h1",{className:"pln-page-title",children:"Rencana"}),e.jsx("p",{className:"pln-page-sub",children:"Catat apa yang ingin dibeli, berapa, dan kapan targetnya"})]})]}),i.length>0&&e.jsxs("div",{className:"pln-stats-strip",children:[e.jsxs("div",{className:"pln-stat",children:[e.jsx("span",{className:"pln-stat-label",children:"Belum Terbeli"}),e.jsx("span",{className:"pln-stat-val tabular",style:{color:A>0?"var(--warning)":"var(--text-primary)"},children:u(A)})]}),e.jsx("div",{className:"pln-stat-divider"}),e.jsxs("div",{className:"pln-stat",children:[e.jsx("span",{className:"pln-stat-label",children:"Aktif"}),e.jsxs("span",{className:"pln-stat-val",children:[E," item"]})]}),e.jsx("div",{className:"pln-stat-divider"}),e.jsxs("div",{className:"pln-stat",children:[e.jsx("span",{className:"pln-stat-label",children:"Sudah Terbeli"}),e.jsx("span",{className:"pln-stat-val tabular",style:{color:O>0?"var(--success)":"var(--text-primary)"},children:u(oe)})]})]}),e.jsxs("div",{className:"pln-filter-row",children:[e.jsx("div",{className:"pln-filter-tabs",children:["aktif","selesai","semua"].map(a=>e.jsx("button",{className:`pln-filter-btn ${x===a?"active":""}`,onClick:()=>Q(a),children:a==="aktif"?`Aktif (${E})`:a==="selesai"?`Selesai (${O})`:"Semua"},a))}),e.jsx("button",{className:"pln-add-btn",onClick:()=>v(!0),title:"Tambah Rencana",children:e.jsx(K,{size:11})})]}),J?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:1},children:[...Array(4)].map((a,t)=>e.jsx("div",{className:"skeleton",style:{height:50,borderRadius:0,opacity:1-t*.18}},t))}):$.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:e.jsx(G,{size:22})}),e.jsx("strong",{children:x==="aktif"?"Belum ada rencana aktif":x==="selesai"?"Belum ada rencana selesai":"Belum ada rencana"}),e.jsx("p",{children:x==="aktif"?"Tekan + untuk mulai mencatat.":"Selesaikan rencana dengan menekan tombol ✓."})]}):e.jsx("div",{className:"pln-sections",children:$.map(a=>{const t=w[a],s=t.reduce((n,S)=>n+Number(S.amount),0);return e.jsxs("div",{className:"pln-section",children:[e.jsx("div",{className:"pln-section-head",children:e.jsxs("div",{children:[e.jsx("span",{className:"pln-section-label",children:de(a)}),e.jsxs("span",{className:"pln-section-sub",children:[t.length," item · ",u(s)]})]})}),e.jsx("div",{className:"pln-table-body",children:t.map(n=>e.jsxs("div",{className:`pln-row${n.done?" pln-row-done":""}`,children:[e.jsxs("div",{className:"pln-row-info",children:[e.jsx("span",{className:"pln-row-name",children:n.name}),n.notes&&e.jsx("span",{className:"pln-row-notes",children:n.notes})]}),e.jsx("span",{className:"pln-row-amount tabular",children:u(n.amount)}),e.jsxs("div",{className:"pln-row-actions",children:[e.jsx("button",{className:`pln-act ${n.done?"pln-act-undo":"pln-act-done"}`,onClick:()=>te(n),title:n.done?"Tandai aktif":"Tandai selesai",children:n.done?e.jsx(pe,{size:12}):e.jsx(H,{size:12})}),e.jsx("button",{className:"pln-act pln-act-del",onClick:()=>re(n.id),disabled:Z===n.id,title:"Hapus",children:e.jsx(me,{size:12})})]})]},n.id))})]},a)})}),V&&e.jsx("div",{className:"modal-overlay",onClick:()=>v(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:420},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tambah Rencana"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>v(!1),children:e.jsx(L,{size:16})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Nama barang / kebutuhan"}),e.jsx("input",{className:"form-input",type:"text",placeholder:"contoh: Beli laptop, Kondangan Budi...",value:o.name,onChange:a=>j(t=>({...t,name:a.target.value})),autoFocus:!0})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},children:[e.jsxs("div",{className:"form-group",style:{margin:0},children:[e.jsx("label",{className:"form-label",children:"Estimasi harga"}),e.jsx(ue,{value:o.amount,onChange:a=>j(t=>({...t,amount:a}))})]}),e.jsxs("div",{className:"form-group",style:{margin:0},children:[e.jsx("label",{className:"form-label",children:"Target bulan"}),e.jsx("select",{className:"form-select",value:o.targetMonth,onChange:a=>j(t=>({...t,targetMonth:a.target.value})),children:ve.map(a=>e.jsx("option",{value:a.val,children:a.label},a.val))})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Catatan"," ",e.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400,textTransform:"none",letterSpacing:0},children:"(opsional)"})]}),e.jsx("input",{className:"form-input",type:"text",placeholder:"detail tambahan...",value:o.notes,onChange:a=>j(t=>({...t,notes:a.target.value}))})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>v(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:ne,disabled:!o.name.trim()||!o.amount||_,children:_?"Menyimpan...":e.jsxs(e.Fragment,{children:[e.jsx(K,{size:13})," Simpan"]})})]})]})}),m&&e.jsx("div",{className:"modal-overlay",onClick:()=>!N&&y(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:"Tandai Selesai"}),e.jsx("button",{type:"button",className:"btn btn-ghost",onClick:()=>y(null),disabled:N,children:e.jsx(L,{size:16})})]}),e.jsxs("div",{className:"pln-done-info",children:[e.jsx("div",{className:"pln-done-icon",children:e.jsx(ge,{size:16})}),e.jsxs("div",{children:[e.jsx("div",{className:"pln-done-name",children:m.name}),e.jsx("div",{className:"pln-done-amount tabular",children:u(m.amount)})]})]}),e.jsx("p",{className:"pln-done-q",children:"Dari mana uangnya?"}),e.jsxs("div",{className:"pln-src-toggle",children:[e.jsxs("button",{type:"button",className:`pln-src-btn${h==="gaji"?" active":""}`,onClick:()=>k("gaji"),children:[e.jsx("span",{className:"pln-src-icon",children:e.jsx(xe,{size:15})}),e.jsx("span",{className:"pln-src-label",children:"Potongan Gaji"}),e.jsx("span",{className:"pln-src-sub",children:"Dicatat sebagai pengeluaran"})]}),e.jsxs("button",{type:"button",className:`pln-src-btn${h==="tabungan"?" active":""}`,onClick:()=>k("tabungan"),children:[e.jsx("span",{className:"pln-src-icon",children:e.jsx(he,{size:15})}),e.jsx("span",{className:"pln-src-label",children:"Dari Tabungan"}),e.jsx("span",{className:"pln-src-sub",children:"Kurangi saldo tabungan"})]})]}),h==="gaji"&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,marginTop:16},children:[e.jsxs("div",{className:"form-group",style:{margin:0},children:[e.jsx("label",{className:"form-label",children:"Kategori pengeluaran"}),e.jsxs("select",{className:"form-select",value:B,onChange:a=>F(a.target.value),children:[e.jsx("option",{value:"",children:"— Tanpa kategori —"}),U.map(a=>e.jsx("option",{value:a.id,children:a.name},a.id))]})]}),e.jsxs("div",{className:"form-group",style:{margin:0},children:[e.jsx("label",{className:"form-label",children:"Tanggal transaksi"}),e.jsx("input",{className:"form-input",type:"date",value:R,onChange:a=>q(a.target.value)})]}),e.jsxs("div",{className:"pln-preview",children:[e.jsx("span",{children:"Pengeluaran dicatat sebesar"}),e.jsx("span",{className:"tabular",style:{color:"var(--danger)",fontWeight:700},children:u(m.amount)})]})]}),h==="tabungan"&&e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12,marginTop:16},children:g.length===0?e.jsx("p",{style:{fontSize:"0.8rem",color:"var(--text-muted)"},children:"Belum ada tabungan."}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"form-group",style:{margin:0},children:[e.jsx("label",{className:"form-label",children:"Pilih tabungan"}),e.jsx("select",{className:"form-select",value:b,onChange:a=>P(a.target.value),children:g.map(a=>e.jsxs("option",{value:a.id,children:[a.name," — ",u(a.current_amount)]},a.id))})]}),b&&(()=>{const a=g.find(n=>n.id===b),t=Math.max(0,Number((a==null?void 0:a.current_amount)||0)-Number(m.amount)),s=Number((a==null?void 0:a.current_amount)||0)>=Number(m.amount);return e.jsxs("div",{className:`pln-preview${s?"":" pln-preview-warn"}`,children:[e.jsx("span",{children:"Saldo setelah dikurangi"}),e.jsx("span",{className:"tabular",style:{color:s?"var(--success)":"var(--danger)",fontWeight:700},children:u(t)})]})})()]})}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>y(null),disabled:N,children:"Batal"}),e.jsx("button",{type:"button",className:"btn btn-primary",style:{flex:1},onClick:se,disabled:N||h==="tabungan"&&g.length===0,children:N?"Menyimpan...":e.jsxs(e.Fragment,{children:[e.jsx(H,{size:13})," Tandai Selesai"]})})]})]})}),e.jsx("style",{children:`
          .pln-page { padding-bottom: 56px; }

          /* ── Page Header ─────────────────────── */
          .pln-page-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 24px;
          }
          .pln-page-icon {
            width: 36px; height: 36px;
            border-radius: 9px;
            background: rgba(251,191,36,0.08);
            border: 1px solid rgba(251,191,36,0.2);
            color: var(--warning);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
          }
          .pln-page-title {
            font-size: 1.1rem;
            font-weight: 800;
            letter-spacing: -0.025em;
            color: var(--text-primary);
            margin: 0;
            line-height: 1.2;
          }
          .pln-page-sub {
            font-size: 0.72rem;
            color: var(--text-muted);
            margin: 2px 0 0;
          }

          /* ── Stats Strip ─────────────────────── */
          .pln-stats-strip {
            display: flex;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            overflow: hidden;
            margin-bottom: 28px;
          }
          .pln-stat {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 5px;
            padding: 16px 20px;
          }
          .pln-stat-divider {
            width: 1px;
            background: var(--border);
            flex-shrink: 0;
            margin: 12px 0;
          }
          .pln-stat-label {
            font-size: 0.58rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--text-muted);
            font-weight: 700;
          }
          .pln-stat-val {
            font-size: 1.05rem;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: var(--text-primary);
          }

          /* ── Filter Row ──────────────────────── */
          .pln-filter-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            margin-bottom: 24px;
          }
          .pln-filter-tabs { display: flex; gap: 6px; }
          .pln-filter-btn {
            background: none;
            border: 1px solid var(--border);
            border-radius: 99px;
            padding: 5px 14px;
            font-family: var(--font-sans);
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--text-muted);
            cursor: pointer;
            transition: all 0.15s;
          }
          .pln-filter-btn:hover { color: var(--text-primary); border-color: var(--border-light); }
          .pln-filter-btn.active {
            background: var(--accent-dim);
            border-color: var(--accent);
            color: var(--accent);
          }
          .pln-add-btn {
            width: 28px; height: 28px;
            border-radius: 7px;
            background: transparent;
            border: 1px solid var(--border);
            color: var(--text-muted);
            cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            transition: all 0.15s;
            flex-shrink: 0;
          }
          .pln-add-btn:hover {
            border-color: var(--accent);
            color: var(--accent);
            background: var(--accent-dim);
          }

          /* ── Sections ────────────────────────── */
          .pln-sections { display: flex; flex-direction: column; gap: 32px; }
          .pln-section-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--border);
            margin-bottom: 2px;
          }
          .pln-section-label {
            display: block;
            font-size: 0.62rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--text-secondary);
          }
          .pln-section-sub {
            display: block;
            font-size: 0.7rem;
            color: var(--text-muted);
            font-weight: 500;
            margin-top: 2px;
          }

          /* ── Table Rows ──────────────────────── */
          .pln-table-body { display: flex; flex-direction: column; }
          .pln-row {
            display: grid;
            grid-template-columns: 1fr 160px 60px;
            align-items: center;
            min-height: 50px;
            padding: 0 4px;
            border-bottom: 1px solid rgba(255,255,255,0.04);
            position: relative;
            transition: background 0.12s;
          }
          .pln-row::before {
            content: '';
            position: absolute;
            left: 0; top: 0; bottom: 0;
            width: 2px;
            border-radius: 1px;
            background: var(--accent);
            opacity: 0;
            transition: opacity 0.12s;
          }
          .pln-row:hover { background: rgba(255,255,255,0.02); }
          .pln-row:hover::before { opacity: 1; }
          .pln-row:last-child { border-bottom: none; }

          .pln-row-done { opacity: 0.48; }
          .pln-row-done::before { background: var(--success); opacity: 1; }
          .pln-row-done .pln-row-name {
            text-decoration: line-through;
            color: var(--text-muted);
          }

          .pln-row-info {
            display: flex;
            flex-direction: column;
            gap: 1px;
            padding: 10px 0 10px 8px;
            min-width: 0;
          }
          .pln-row-name {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--text-primary);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .pln-row-notes {
            font-size: 0.65rem;
            color: var(--text-muted);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .pln-row-amount {
            font-size: 0.875rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: var(--text-primary);
            text-align: right;
            padding-right: 8px;
          }

          .pln-row-actions {
            display: flex;
            gap: 4px;
            justify-content: flex-end;
            opacity: 0;
            transition: opacity 0.15s;
          }
          .pln-row:hover .pln-row-actions { opacity: 1; }

          .pln-act {
            width: 26px; height: 26px;
            border-radius: 5px;
            border: none;
            background: transparent;
            cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            color: var(--text-muted);
            transition: all 0.12s;
          }
          .pln-act-done:hover { background: var(--success-dim); color: var(--success); }
          .pln-act-undo:hover { background: var(--warning-dim); color: var(--warning); }
          .pln-act-del:hover { background: var(--danger-dim); color: var(--danger); }
          .pln-act:disabled { opacity: 0.3; cursor: not-allowed; }

          /* ── Done Modal ──────────────────────── */
          .pln-done-info {
            display: flex;
            align-items: center;
            gap: 10px;
            background: var(--bg-input);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            padding: 12px 14px;
            margin-bottom: 16px;
          }
          .pln-done-icon {
            width: 32px; height: 32px;
            border-radius: var(--radius-sm);
            background: var(--bg-card);
            border: 1px solid var(--border);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
            color: var(--text-secondary);
          }
          .pln-done-name { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); }
          .pln-done-amount { font-size: 0.78rem; color: var(--text-secondary); margin-top: 2px; }
          .pln-done-q {
            font-size: 0.62rem; font-weight: 700;
            text-transform: uppercase; letter-spacing: 0.1em;
            color: var(--text-muted); margin-bottom: 10px;
          }

          .pln-src-toggle { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
          .pln-src-btn {
            display: flex; flex-direction: column; align-items: flex-start;
            gap: 2px; padding: 12px 14px;
            background: var(--bg-input);
            border: 1.5px solid var(--border);
            border-radius: var(--radius-sm);
            cursor: pointer; text-align: left;
            transition: all 0.15s;
            font-family: var(--font-sans);
          }
          .pln-src-btn:hover { border-color: var(--border-light); }
          .pln-src-btn.active { border-color: var(--accent); background: var(--accent-dim); }
          .pln-src-icon { color: var(--text-secondary); margin-bottom: 2px; }
          .pln-src-label { font-size: 0.8rem; font-weight: 700; color: var(--text-primary); }
          .pln-src-btn.active .pln-src-label { color: var(--accent); }
          .pln-src-sub { font-size: 0.62rem; color: var(--text-muted); }

          .pln-preview {
            display: flex; justify-content: space-between; align-items: center;
            background: var(--bg-input); border: 1px solid var(--border);
            border-radius: var(--radius-sm); padding: 10px 14px;
            font-size: 0.8rem; color: var(--text-secondary); font-weight: 500;
          }
          .pln-preview-warn { border-color: rgba(248,113,113,0.4); background: var(--danger-dim); }

          /* ── Mobile ──────────────────────────── */
          @media (max-width: 640px) {
            .pln-stat { padding: 12px; }
            .pln-stat-val { font-size: 0.82rem; }
            .pln-stat-label { font-size: 0.55rem; }
            .pln-row { grid-template-columns: 1fr auto auto; gap: 0 6px; }
            .pln-row-amount { font-size: 0.82rem; padding-right: 0; }
            .pln-row-actions { opacity: 1; }
          }
        `})]})})}export{ye as default};
