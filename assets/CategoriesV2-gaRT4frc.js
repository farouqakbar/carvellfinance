import{F as ge,H as pe,K as he,D as c,J as xe,w as za,B as a,L as be,z as ve,y as la,E as i,v as f,s as Y,C as V,A as Aa,i as oa,q as ca,m as Ba,g as fe}from"./index-BLpsvlZG.js";import{C as je}from"./CategoryForm-YdjIEsTh.js";import{a as Fa,d as ye,f as Ne,c as ke,e as we,C as qa,b as Ta}from"./ConfirmModal-Ct2mL1y7.js";const Ce=15,Ha=["#6366f1","#3b82f6","#06b6d4","#10b981","#f59e0b","#f97316","#ef4444","#ec4899","#a855f7"];function _e(m){const[F,d]=m.split("-").map(Number),b=new Date(F,d-2,1);return`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}`}function Se(m){const[F,d]=m.split("-").map(Number),b=new Date(F,d,1);return`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}`}function ze(){const{user:m}=ge(),{setHeader:F}=pe(),d=he(),[b,Ea]=c.useState([]),[Ia,Da]=c.useState({}),[l,Ra]=c.useState(0),[E,da]=c.useState(!0),[La,S]=c.useState(!1),[C,I]=c.useState(null),[y,M]=c.useState(null),[q,D]=c.useState(null),[Wa]=xe(),[r,ma]=c.useState(()=>Wa.get("month")||za()),[sa,Ga]=c.useState(null),[N,Ua]=c.useState(null),[Ka,R]=c.useState(!1),[$,X]=c.useState({amount:"",note:"",date:""}),[ua,ga]=c.useState(!1),[Ja,L]=c.useState(!1),[P,W]=c.useState({description:"",amount:"",date:""}),[pa,ha]=c.useState(!1),xa=r===za(),ba=!!m.recording_start_month&&r<=m.recording_start_month,[G,Oa]=c.useState([]),[na,Qa]=c.useState([]),[Ya,U]=c.useState(!1),[g,T]=c.useState({jenis:"hutang",nama:"",amount:"",due_date:"",sumber:"saldo"}),[va,fa]=c.useState(!1),[Z,ra]=c.useState(null),[Va,aa]=c.useState(null),[K,J]=c.useState({date:"",amount:""});c.useEffect(()=>{k()},[r]),c.useEffect(()=>{ta()},[r]),c.useEffect(()=>(F(a.jsxs(a.Fragment,{children:[a.jsxs(be,{to:`/dashboard?month=${r}`,className:"topbar-back-btn",children:["‹ ",a.jsx("span",{className:"back-label",children:"Dashboard"})]}),a.jsxs("div",{className:"month-nav-group",children:[a.jsx("button",{className:"month-btn",onClick:()=>ma(_e(r)),disabled:ba,children:"‹"}),a.jsx("span",{className:"month-label-text",children:ve(r)}),a.jsx("button",{className:"month-btn",onClick:()=>ma(Se(r)),disabled:xa,children:"›"})]})]})),()=>F(null)),[r,xa,ba]);const ea=()=>Ha[b.length%Ha.length],k=async()=>{da(!0);const e=`${r}-01`,t=la(r),[s,n]=await Promise.all([i.from("categories").select("*").eq("user_id",m.id).is("month",null),i.from("categories").select("*").eq("user_id",m.id).eq("month",r)]),o=[...s.data||[],...n.data||[]].sort((h,ia)=>h.name.localeCompare(ia.name)),p=new Set,x=o.filter(h=>p.has(h.name)?!1:(p.add(h.name),!0)),[j,u,v,_]=await Promise.all([i.from("transactions").select("category_id, amount").eq("user_id",m.id).eq("type","expense").gte("date",e).lte("date",t),i.from("transactions").select("id, category_id, amount, description, date").eq("user_id",m.id).eq("type","income").gte("date",e).lte("date",t),i.from("category_budgets").select("category_id, budget_limit").eq("user_id",m.id).eq("month",r),i.from("savings").select("id, name, current_amount").eq("user_id",m.id).order("name")]),w={};(v.data||[]).forEach(h=>{w[h.category_id]=Number(h.budget_limit)});const B={};(j.data||[]).forEach(h=>{h.category_id&&(B[h.category_id]=(B[h.category_id]||0)+Number(h.amount))});const O=(x||[]).map(h=>({...h,budget_limit:w[h.id]!==void 0?w[h.id]:0})),Q=(x||[]).find(h=>Fa(h)),$a=Q?(u.data||[]).filter(h=>h.category_id===Q.id):[];Ea(O),Da(B),Ra($a.reduce((h,ia)=>h+Number(ia.amount),0)),Ga((Q==null?void 0:Q.id)||null),Ua($a[0]||null),Qa(_.data||[]),da(!1)},ta=async()=>{const[e,t]=await Promise.all([i.from("hutang").select("*").eq("user_id",m.id).eq("month",r).order("due_date",{ascending:!0,nullsFirst:!1}),i.from("hutang").select("*").eq("user_id",m.id).lt("month",r).eq("lunas",!1).order("due_date",{ascending:!0,nullsFirst:!1})]);Oa([...t.data||[],...e.data||[]])},Xa=async()=>{const e=parseFloat(P.amount)||0;if(!(!e||!P.description.trim())){ha(!0);try{let t=sa;if(!t){const{data:n,error:o}=await i.from("categories").insert({user_id:m.id,name:"Pemasukan Bulanan",color:"#22c55e",icon:"",is_mandatory:!1,budget_limit:0}).select().single();if(o)throw o;t=n.id}const{error:s}=await i.from("transactions").insert({user_id:m.id,category_id:t,type:"income",amount:e,description:P.description.trim(),date:P.date||`${r}-01`});if(s)throw s;d("Pemasukan dicatat","success"),L(!1),W({description:"",amount:"",date:`${r}-01`}),k()}catch(t){d(t.message,"error")}finally{ha(!1)}}},Za=async()=>{const e=b.find(x=>x.id===q.id);if(e&&Ta(e)){d("Kategori ini tidak bisa dihapus","error"),D(null);return}const t=`${r}-01`,s=la(r),[n,o]=await Promise.all([i.from("transactions").delete().eq("category_id",q.id).gte("date",t).lte("date",s),i.from("category_budgets").delete().eq("category_id",q.id).eq("month",r)]);if(n.error||o.error){d((n.error||o.error).message,"error");return}const{error:p}=await i.from("categories").delete().eq("id",q.id);if(p){d(p.message,"error");return}d("Kategori dihapus","success"),D(null),k()},ae=e=>{const t=String(Math.round(e.budget_limit||0)),s=l>0&&e.budget_limit>0?(e.budget_limit/l*100).toFixed(1):"";M({id:e.id,nominal:t,pct:s})},ee=e=>{const t=parseFloat(e)||0;M(s=>({...s,nominal:e,pct:l>0&&t>0?(t/l*100).toFixed(1):""}))},ja=e=>{const t=parseFloat(e)||0;M(s=>({...s,pct:e,nominal:l>0&&t>0?String(Math.round(t/100*l)):""}))},te=async()=>{const e=parseFloat(y.nominal)||0,t=await i.from("categories").update({budget_limit:e}).eq("id",y.id);if(t.error){d(t.error.message,"error");return}let s=null;if(e>0){const{error:n}=await i.from("category_budgets").upsert({user_id:m.id,category_id:y.id,month:r,budget_limit:e},{onConflict:"category_id,month"});s=n}else{const{error:n}=await i.from("category_budgets").delete().eq("user_id",m.id).eq("category_id",y.id).eq("month",r);s=n}if(s){d(s.message,"error");return}d("Budget disimpan","success"),M(null),k()},se=async(e,t,s,n,o)=>{const p=new Date().toISOString().split("T")[0],x=e==="hutang";let j=null;if(t==="saldo"){const{data:u,error:v}=await i.from("transactions").insert({user_id:m.id,amount:n,category_id:null,type:x?"income":"expense",description:x?`Hutang dari ${o}`:`Piutang ke ${o}`,date:p}).select("id").single();if(v)throw v;j=(u==null?void 0:u.id)||null}else if(t==="tabungan"&&s){const{data:u,error:v}=await i.from("savings").select("current_amount").eq("id",s).single();if(v)throw v;const _=x?Number(u.current_amount)+n:Math.max(0,Number(u.current_amount)-n),{error:w}=await i.from("savings").update({current_amount:_}).eq("id",s);if(w)throw w}return j},ya=async(e,t,s,n,o,p)=>{const x=new Date().toISOString().split("T")[0],j=e==="hutang";if(t==="saldo")if(p){const{error:u}=await i.from("transactions").delete().eq("id",p);if(u)throw u}else{const{error:u}=await i.from("transactions").insert({user_id:m.id,amount:n,category_id:null,type:j?"expense":"income",description:j?`Bayar hutang ke ${o}`:`Terima piutang dari ${o}`,date:x});if(u)throw u}else if(t==="tabungan"&&s){const{data:u,error:v}=await i.from("savings").select("current_amount").eq("id",s).single();if(v)throw v;if(u){const _=j?Math.max(0,Number(u.current_amount)-n):Number(u.current_amount)+n,{error:w}=await i.from("savings").update({current_amount:_}).eq("id",s);if(w)throw w}}},ne=async()=>{var t;const e=parseFloat(g.amount)||0;if(!(!g.nama.trim()||!e)){fa(!0);try{const s=g.sumber==="tabungan"&&((t=na[0])==null?void 0:t.id)||null,n=await se(g.jenis,g.sumber,s,e,g.nama.trim()),{error:o}=await i.from("hutang").insert({user_id:m.id,jenis:g.jenis,nama:g.nama.trim(),amount:e,due_date:g.due_date||null,sumber:g.sumber,savings_id:s,linked_tx_id:n,month:r});if(o)throw o;d(g.jenis==="hutang"?"Hutang dicatat":"Piutang dicatat","success"),U(!1),T({jenis:"hutang",nama:"",amount:"",due_date:"",sumber:"saldo"}),ta(),k()}catch(s){d(s.message,"error")}finally{fa(!1)}}},re=async e=>{const t=G.find(s=>s.id===e);if(t)try{await ya(t.jenis,t.sumber,t.savings_id,Number(t.amount),t.nama,null);const{error:s}=await i.from("hutang").update({lunas:!0}).eq("id",e);if(s)throw s;d(t.jenis==="hutang"?"Hutang ditandai lunas":"Piutang diterima","success"),ta(),k()}catch(s){d(s.message,"error")}},ie=async()=>{const e=G.find(t=>t.id===Z.id);if(e)try{e.lunas||await ya(e.jenis,e.sumber,e.savings_id,Number(e.amount),e.nama,e.linked_tx_id);const{error:t}=await i.from("hutang").delete().eq("id",Z.id);if(t)throw t;d("Dihapus","success"),ra(null),ta(),k()}catch(t){d(t.message,"error")}},le=(e,t)=>{if(t)return{label:"Lunas",color:"#34d399",bg:"rgba(52,211,153,0.1)"};if(!e)return null;const s=new Date;s.setHours(0,0,0,0);const n=new Date(e),o=Math.round((n-s)/864e5);return o<0?{label:`Terlambat ${Math.abs(o)}h`,color:"#f87171",bg:"rgba(248,113,113,0.1)"}:o===0?{label:"Hari ini!",color:"#f87171",bg:"rgba(248,113,113,0.1)"}:o<=7?{label:`${o} hari lagi`,color:"#fbbf24",bg:"rgba(251,191,36,0.1)"}:{label:`${o} hari lagi`,color:"var(--text-muted)",bg:null}},oe=async()=>{const e=parseFloat($.amount.replace(/\D/g,""))||0;if(sa){ga(!0);try{const t=$.date||`${r}-01`;if(N){const{error:s}=await i.from("transactions").update({amount:e,description:$.note,date:t}).eq("id",N.id);if(s)throw s}else{const{error:s}=await i.from("transactions").insert({user_id:m.id,category_id:sa,type:"income",amount:e,description:$.note,date:t});if(s)throw s}d("Pemasukan disimpan","success"),R(!1),k()}catch(t){d(t.message,"error")}finally{ga(!1)}}},ce=async e=>{const{error:t}=await i.from("categories").update({is_planned:!e.is_planned}).eq("id",e.id);if(t){d(t.message,"error");return}d(e.is_planned?"Kategori diaktifkan":"Dipindah ke perencanaan","success"),k()},de=async(e,t)=>{const s=parseFloat(K.amount)||0;if(!s)return;const{error:n}=await i.from("transactions").insert({user_id:m.id,category_id:e,type:"expense",amount:s,description:t,date:K.date||`${r}-01`});if(n){d(n.message,"error");return}d("Transaksi dicatat","success"),aa(null),J({date:"",amount:""}),k()},Na=b.filter(e=>Fa(e)),ka=b.filter(e=>ye(e)),wa=b.filter(e=>Ne(e)),Ca=b.filter(e=>ke(e)),_a=b.filter(e=>we(e)),z=ka.reduce((e,t)=>e+Number(t.budget_limit||0),0),A=wa.reduce((e,t)=>e+Number(t.budget_limit||0),0),Sa=l-z-A,Pa=e=>{const t=Ia[e.id]||0,s=Number(e.budget_limit||0),n=s>0?t/s*100:0,o=Math.min(n,100),p=n>100,x=!p&&n>=80,j=!p&&n>=100,u=p?"#f87171":j?"#34d399":x?"#fbbf24":e.color||"var(--accent)",v=p?"#f87171":x?"#fbbf24":j?"#34d399":"var(--text-muted)",_=!!e.is_planned,w=Va===e.id;return a.jsxs("div",{children:[a.jsxs("div",{className:`cv2-row${_?" cv2-row-dim":""}`,style:{"--rc":e.color||"var(--accent)"},children:[a.jsxs("div",{className:"cv2-cell-name",children:[a.jsx("span",{className:"cv2-dot",style:{background:e.color||"var(--accent)"}}),a.jsx("span",{className:"cv2-name",children:e.name}),_&&a.jsx("span",{className:"cv2-tag",style:{background:"rgba(255,255,255,0.05)",color:"var(--text-muted)"},children:"plan"})]}),a.jsxs("div",{className:"cv2-cell-bar",children:[s>0?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"cv2-bar-track",children:a.jsx("div",{className:"cv2-bar-fill",style:{width:`${o}%`,background:u}})}),a.jsx("span",{className:"cv2-bar-pct",style:{color:v},children:p?`+${Math.round(n-100)}%`:`${Math.round(n)}%`})]}):t>0?a.jsx("span",{className:"cv2-bar-label",children:"no budget"}):a.jsx("span",{className:"cv2-bar-cta",onClick:()=>{aa(e.id),J({date:Aa(),amount:""})},children:"+ catat"}),s>0&&!t&&a.jsx("span",{className:"cv2-bar-cta",style:{marginLeft:8},onClick:()=>{aa(e.id),J({date:Aa(),amount:""})},children:"+ catat"})]}),a.jsxs("div",{className:"cv2-cell-amount",children:[a.jsx("span",{className:"cv2-amount-main tabular",style:{color:p?"#f87171":"var(--text-primary)"},children:t>0?f(t):"—"}),s>0&&a.jsxs("span",{className:"cv2-amount-sub tabular",children:["/ ",f(s)]})]}),a.jsxs("div",{className:"cv2-cell-actions",children:[a.jsx("button",{className:"cv2-icon-btn",style:{color:_?"#34d399":"var(--text-muted)"},onClick:()=>ce(e),title:_?"Aktifkan":"Rencanakan",children:a.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:"currentColor",display:"block"}})}),a.jsx("button",{className:"cv2-icon-btn",onClick:()=>{I(e),S(!0)},title:"Edit",children:a.jsx(oa,{size:11})}),a.jsx("button",{className:"cv2-icon-btn cv2-icon-danger",onClick:()=>D({id:e.id,name:e.name}),title:"Hapus",children:a.jsx(ca,{size:11})})]}),s>0&&a.jsx("div",{className:"cv2-mobile-prog",children:a.jsx("div",{className:"cv2-bar-track",children:a.jsx("div",{className:"cv2-bar-fill",style:{width:`${o}%`,background:u}})})})]}),w&&a.jsxs("div",{className:"cv2-quick-row",children:[a.jsx("input",{className:"form-input",type:"date",value:K.date,min:`${r}-01`,max:la(r),onChange:B=>J(O=>({...O,date:B.target.value}))}),a.jsx(V,{value:K.amount,onChange:B=>J(O=>({...O,amount:B}))}),a.jsxs("div",{style:{display:"flex",gap:6},children:[a.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>aa(null),children:"Batal"}),a.jsx("button",{className:"btn btn-primary btn-sm",style:{flex:1},onClick:()=>de(e.id,e.name),disabled:!K.amount,children:"Catat"})]})]})]},e.id)},Ma=(e,t="wajib")=>{const s=Number(e.budget_limit||0),n=l>0&&s>0?Math.round(s/l*100):null,o=!!e.is_planned,p=t==="savings",x=p?e.color||"#6366f1":e.color||"#f87171",j=p?"rgba(99,102,241,0.1)":"rgba(248,113,113,0.1)",u=p?"#818cf8":"#f87171",v=p?"tabungan":"wajib";return a.jsxs("div",{className:`cv2-row${o?" cv2-row-dim":""}`,style:{"--rc":x},children:[a.jsxs("div",{className:"cv2-cell-name",children:[a.jsx("span",{className:"cv2-dot",style:{background:x}}),a.jsx("span",{className:"cv2-name",children:e.name}),a.jsx("span",{className:"cv2-tag",style:{background:j,color:u},children:v})]}),a.jsx("div",{className:"cv2-cell-bar",children:n?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"cv2-bar-track",children:a.jsx("div",{className:"cv2-bar-fill",style:{width:`${Math.min(n,100)}%`,background:x}})}),a.jsxs("span",{className:"cv2-bar-pct",style:{color:"var(--text-muted)"},children:[n,"%"]})]}):a.jsx("span",{className:"cv2-bar-label",children:"dari gaji"})}),a.jsxs("div",{className:"cv2-cell-amount",children:[a.jsx("span",{className:"cv2-amount-main tabular",children:s>0?f(s):"—"}),a.jsx("span",{className:"cv2-amount-sub",children:"per bulan"})]}),a.jsxs("div",{className:"cv2-cell-actions",children:[a.jsx("button",{className:"cv2-icon-btn",onClick:()=>ae(e),title:"Ubah Budget",children:a.jsx(oa,{size:11})}),!Ta(e)&&a.jsx("button",{className:"cv2-icon-btn cv2-icon-danger",onClick:()=>D({id:e.id,name:e.name}),title:"Hapus",children:a.jsx(ca,{size:11})})]}),n&&a.jsx("div",{className:"cv2-mobile-prog",children:a.jsx("div",{className:"cv2-bar-track",children:a.jsx("div",{className:"cv2-bar-fill",style:{width:`${Math.min(n,100)}%`,background:x}})})})]},e.id)},me=e=>a.jsxs("div",{className:"cv2-row",style:{"--rc":"#34d399"},children:[a.jsxs("div",{className:"cv2-cell-name",children:[a.jsx("span",{className:"cv2-dot",style:{background:"#34d399"}}),a.jsx("span",{className:"cv2-name",children:e.name}),a.jsx("span",{className:"cv2-tag",style:{background:"rgba(52,211,153,0.1)",color:"#34d399"},children:"pemasukan"})]}),a.jsx("div",{className:"cv2-cell-bar"}),a.jsxs("div",{className:"cv2-cell-amount",children:[a.jsx("span",{className:"cv2-amount-main tabular",style:{color:l>0?"#34d399":"var(--text-muted)"},children:l>0?`+${f(l)}`:"—"}),a.jsx("span",{className:"cv2-amount-sub",children:"bulan ini"})]}),a.jsx("div",{className:"cv2-cell-actions",children:a.jsx("button",{className:"cv2-icon-btn",onClick:()=>{X({amount:N?String(N.amount):"",note:(N==null?void 0:N.description)||"",date:(N==null?void 0:N.date)||`${r}-01`}),R(!0)},title:l>0?"Edit":"Catat",children:l>0?a.jsx(oa,{size:11}):a.jsx(Ba,{size:11})})})]},e.id),ue=e=>{const t=le(e.due_date,e.lunas),s=e.jenis==="piutang"?"#f59e0b":"#f87171";return a.jsxs("div",{className:`cv2-row${e.lunas?" cv2-row-dim":""}`,style:{"--rc":s},children:[a.jsxs("div",{className:"cv2-cell-name",children:[a.jsx("span",{className:"cv2-dot",style:{background:s}}),a.jsx("span",{className:"cv2-name",children:e.nama}),a.jsx("span",{className:"cv2-tag",style:{background:e.jenis==="piutang"?"rgba(245,158,11,0.1)":"rgba(248,113,113,0.1)",color:s},children:e.jenis}),e.lunas&&a.jsx("span",{className:"cv2-tag",style:{background:"rgba(52,211,153,0.1)",color:"#34d399"},children:"lunas"})]}),a.jsx("div",{className:"cv2-cell-bar",children:t&&!e.lunas&&a.jsx("span",{style:{fontSize:"0.62rem",fontWeight:700,color:t.color,background:t.bg||"transparent",padding:t.bg?"2px 7px":"0",borderRadius:99},children:t.label})}),a.jsxs("div",{className:"cv2-cell-amount",children:[a.jsx("span",{className:"cv2-amount-main tabular",style:{color:e.lunas?"var(--text-muted)":s},children:f(e.amount)}),a.jsx("span",{className:"cv2-amount-sub",children:e.sumber})]}),a.jsxs("div",{className:"cv2-cell-actions",children:[!e.lunas&&a.jsx("button",{className:"cv2-icon-btn",style:{color:"#34d399"},onClick:()=>re(e.id),title:"Tandai Lunas",children:a.jsx(fe,{size:11})}),a.jsx("button",{className:"cv2-icon-btn cv2-icon-danger",onClick:()=>ra({id:e.id,nama:e.nama}),title:"Hapus",children:a.jsx(ca,{size:11})})]})]},e.id)},H=({label:e,sub:t,children:s,onAdd:n})=>a.jsxs("div",{className:"cv2-section",children:[a.jsxs("div",{className:"cv2-section-head",children:[a.jsxs("div",{children:[a.jsx("span",{className:"cv2-section-label",children:e}),t&&a.jsx("span",{className:"cv2-section-sub",children:t})]}),n&&a.jsx("button",{className:"cv2-add-btn",onClick:n,children:a.jsx(Ba,{size:11})})]}),a.jsx("div",{className:"cv2-table-body",children:s})]});return a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"cv2-page animate-in",children:[l>0&&a.jsxs("div",{className:"cv2-stats-strip",children:[a.jsxs("div",{className:"cv2-stat",children:[a.jsx("span",{className:"cv2-stat-label",children:"Pemasukan"}),a.jsxs("span",{className:"cv2-stat-val",style:{color:"#34d399"},children:["+",f(l)]})]}),a.jsx("div",{className:"cv2-stat-divider"}),a.jsxs("div",{className:"cv2-stat",children:[a.jsx("span",{className:"cv2-stat-label",children:"Tabungan"}),a.jsx("span",{className:"cv2-stat-val",style:{color:z>0?"#6366f1":"var(--text-muted)"},children:z>0?`−${f(z)}`:"—"})]}),a.jsx("div",{className:"cv2-stat-divider"}),a.jsxs("div",{className:"cv2-stat",children:[a.jsx("span",{className:"cv2-stat-label",children:"Wajib"}),a.jsx("span",{className:"cv2-stat-val",style:{color:A>0?"#f87171":"var(--text-muted)"},children:A>0?`−${f(A)}`:"—"})]}),a.jsx("div",{className:"cv2-stat-divider"}),a.jsxs("div",{className:"cv2-stat",children:[a.jsx("span",{className:"cv2-stat-label",children:"Sisa Bebas"}),a.jsx("span",{className:"cv2-stat-val",style:{color:Sa>=0?"#34d399":"#f87171"},children:f(Math.abs(Sa))})]})]}),a.jsxs(H,{label:"PEMASUKAN",sub:l>0?`Bulan ini: +${f(l)}`:"Belum ada pemasukan",onAdd:()=>{W({description:"",amount:"",date:`${r}-01`}),L(!0)},children:[Na.map(me),Na.length===0&&!E&&a.jsx("div",{className:"cv2-empty",children:"Belum ada kategori pemasukan"})]}),a.jsx(H,{label:"TABUNGAN",sub:z>0?`${f(z)} · ${l>0?`${Math.round(z/l*100)}% gaji · `:""}auto-deduct`:"Alokasi tabungan bulanan",onAdd:()=>{I({is_mandatory:!0,category_type:"savings",color:ea()}),S(!0)},children:E?[...Array(2)].map((e,t)=>a.jsx("div",{className:"skeleton",style:{height:50,marginBottom:1}},t)):ka.map(e=>Ma(e,"savings"))}),a.jsx(H,{label:"HUTANG & PIUTANG",sub:(()=>{const e=G.filter(t=>!t.lunas);return e.length?`${e.length} aktif`:"Tidak ada hutang/piutang aktif"})(),onAdd:()=>U(!0),children:G.length===0?a.jsx("div",{className:"cv2-empty",children:"Tidak ada hutang tercatat"}):G.map(ue)}),a.jsx(H,{label:"PENGELUARAN WAJIB",sub:l>0&&A>0?`${f(A)} · ${Math.round(A/l*100)}% gaji · langsung dipotong`:"Langsung dipotong dari gaji",onAdd:()=>{I({is_mandatory:!0,category_type:"wajib",color:ea()}),S(!0)},children:E?[...Array(2)].map((e,t)=>a.jsx("div",{className:"skeleton",style:{height:50,marginBottom:1}},t)):wa.map(e=>Ma(e,"wajib"))}),a.jsx(H,{label:"PENGELUARAN RUTIN",sub:"Tagihan & langganan bulanan",onAdd:()=>{I({is_monthly:!0,category_type:"rutin",color:ea()}),S(!0)},children:E?[...Array(2)].map((e,t)=>a.jsx("div",{className:"skeleton",style:{height:50,marginBottom:1}},t)):Ca.length===0?a.jsx("div",{className:"cv2-empty",children:"Belum ada pengeluaran rutin"}):Ca.map(Pa)}),a.jsx(H,{label:"PENGELUARAN TAMBAHAN",onAdd:()=>{I({category_type:"tambahan",color:ea()}),S(!0)},children:E?[...Array(2)].map((e,t)=>a.jsx("div",{className:"skeleton",style:{height:50,marginBottom:1}},t)):_a.length===0?a.jsx("div",{className:"cv2-empty",children:"Belum ada pengeluaran tambahan"}):_a.map(Pa)})]}),q&&a.jsx(qa,{title:"Hapus Kategori",message:`Hapus "${q.name}"? Transaksi bulan ini untuk kategori ini juga akan terhapus.`,confirmLabel:"Hapus",onConfirm:Za,onCancel:()=>D(null)}),Z&&a.jsx(qa,{title:"Hapus Hutang",message:`Hapus catatan hutang ke "${Z.nama}"?`,confirmLabel:"Hapus",onConfirm:ie,onCancel:()=>ra(null)}),Ya&&a.jsx("div",{className:"modal-overlay",onClick:()=>U(!1),children:a.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsxs("h2",{className:"modal-title",children:["Catat ",g.jenis==="hutang"?"Hutang":"Piutang"]}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>U(!1),children:a.jsx(Y,{size:16})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Jenis"}),a.jsx("div",{style:{display:"flex",gap:8},children:[{val:"hutang",label:"Hutang",sub:"Saya pinjam dari orang"},{val:"piutang",label:"Piutang",sub:"Orang pinjam dari saya"}].map(({val:e,label:t,sub:s})=>a.jsxs("button",{type:"button",className:g.jenis===e?"btn btn-primary btn-sm":"btn btn-secondary btn-sm",style:{flex:1,fontWeight:700,display:"flex",flexDirection:"column",gap:2,height:"auto",padding:"8px 4px"},onClick:()=>T(n=>({...n,jenis:e})),children:[a.jsx("span",{children:t}),a.jsx("span",{style:{fontSize:"0.6rem",fontWeight:500,opacity:.75},children:s})]},e))})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:g.jenis==="hutang"?"Dari siapa kamu meminjam":"Siapa yang meminjam darimu"}),a.jsx("input",{className:"form-input",type:"text",placeholder:g.jenis==="hutang"?"Misal: Budi, Bank BCA...":"Misal: Andi, Rudi...",value:g.nama,onChange:e=>T(t=>({...t,nama:e.target.value})),autoFocus:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Berapa"}),a.jsx(V,{value:g.amount,onChange:e=>T(t=>({...t,amount:e}))})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Kapan janji dibayar"}),a.jsx("input",{className:"form-input",type:"date",value:g.due_date,onChange:e=>T(t=>({...t,due_date:e.target.value}))})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:g.jenis==="hutang"?"Uang masuk ke":"Uang keluar dari"}),a.jsx("div",{style:{display:"flex",gap:8},children:[{val:"saldo",label:"Saldo"},{val:"tabungan",label:"Tabungan"}].map(({val:e,label:t})=>a.jsxs("button",{type:"button",className:g.sumber===e?"btn btn-primary btn-sm":"btn btn-secondary btn-sm",style:{flex:1,fontWeight:700},onClick:()=>T(s=>({...s,sumber:e})),children:[t,e==="tabungan"&&na[0]&&a.jsx("span",{style:{fontSize:"0.6rem",fontWeight:500,display:"block",marginTop:1,opacity:.8},children:na[0].name})]},e))})]}),a.jsxs("div",{className:"flex gap-8 mt-16",children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>U(!1),children:"Batal"}),a.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:ne,disabled:va||!g.nama.trim()||!g.amount,children:va?"Menyimpan...":"Simpan"})]})]})}),Ka&&a.jsx("div",{className:"modal-overlay",onClick:()=>R(!1),children:a.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsxs("div",{children:[a.jsx("h2",{className:"modal-title",children:"Pemasukan Bulanan"}),a.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:N?"Edit jumlah atau catatan":"Catat pemasukan bulan ini"})]}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>R(!1),children:a.jsx(Y,{size:16})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Jumlah Pemasukan"}),a.jsx(V,{value:$.amount,onChange:e=>X(t=>({...t,amount:e})),autoFocus:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Tanggal Diterima"}),a.jsx("input",{className:"form-input",type:"date",value:$.date,min:`${r}-01`,max:(()=>{const[e,t]=r.split("-").map(Number);return new Date(e,t,0).toISOString().split("T")[0]})(),onChange:e=>X(t=>({...t,date:e.target.value}))})]}),a.jsxs("div",{className:"form-group",children:[a.jsxs("label",{className:"form-label",children:["Catatan ",a.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400},children:"(opsional)"})]}),a.jsx("textarea",{className:"form-input",rows:2,placeholder:"Misal: Gaji pokok + tunjangan...",value:$.note,onChange:e=>X(t=>({...t,note:e.target.value})),style:{resize:"vertical",fontFamily:"var(--font-sans)",fontSize:"0.875rem"}})]}),a.jsxs("div",{className:"flex gap-8 mt-16",children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>R(!1),children:"Batal"}),a.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:oe,disabled:ua,children:ua?"Menyimpan...":"Simpan"})]})]})}),Ja&&a.jsx("div",{className:"modal-overlay",onClick:()=>L(!1),children:a.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsxs("div",{children:[a.jsx("h2",{className:"modal-title",children:"Tambah Pemasukan"}),a.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Dicatat ke bulan ",r]})]}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>L(!1),children:a.jsx(Y,{size:16})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Nama Pemasukan"}),a.jsx("input",{className:"form-input",type:"text",placeholder:"Misal: Gaji Pokok, Bonus, Freelance...",value:P.description,onChange:e=>W(t=>({...t,description:e.target.value})),autoFocus:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Jumlah"}),a.jsx(V,{value:P.amount,onChange:e=>W(t=>({...t,amount:e}))})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Tanggal"}),a.jsx("input",{className:"form-input",type:"date",value:P.date||`${r}-01`,min:`${r}-01`,max:(()=>{const[e,t]=r.split("-").map(Number);return new Date(e,t,0).toISOString().split("T")[0]})(),onChange:e=>W(t=>({...t,date:e.target.value}))})]}),a.jsxs("div",{className:"flex gap-8 mt-16",children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>L(!1),children:"Batal"}),a.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:Xa,disabled:pa||!P.description.trim()||!P.amount,children:pa?"Menyimpan...":"Simpan"})]})]})}),La&&!y&&a.jsx("div",{className:"modal-overlay",onClick:()=>S(!1),children:a.jsxs("div",{className:"modal",onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h2",{className:"modal-title",children:C!=null&&C.id?"Edit Kategori":C!=null&&C.is_mandatory?"Pengeluaran Wajib Baru":C!=null&&C.is_monthly?"Pengeluaran Rutin Baru":"Kategori Baru"}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>S(!1),children:a.jsx(Y,{size:16})})]}),a.jsx(je,{editData:C,salary:l,month:r,onSuccess:()=>{k(),S(!1)},onClose:()=>S(!1)})]})}),y&&(()=>{const e=b.find(t=>t.id===y.id);return a.jsx("div",{className:"modal-overlay",onClick:()=>M(null),children:a.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:t=>t.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsxs("div",{children:[a.jsxs("h2",{className:"modal-title",children:["Budget — ",e==null?void 0:e.name]}),l>0&&a.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Gaji: ",f(l)]})]}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>M(null),children:a.jsx(Y,{size:16})})]}),l>0&&a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[a.jsxs("div",{style:{position:"relative",flex:1},children:[a.jsx("input",{className:"form-input",type:"number",placeholder:String(Ce),value:y.pct,onChange:t=>ja(t.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),a.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),y.pct&&l>0&&a.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",f(Math.round(parseFloat(y.pct)/100*l))]})]}),!y.pct&&a.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(t=>a.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>ja(String(t)),children:[t,"%"]},t))})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),a.jsx(V,{value:y.nominal,onChange:ee,autoFocus:!l})]}),a.jsxs("div",{className:"flex gap-8 mt-16",children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>M(null),children:"Batal"}),a.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:te,children:"Simpan"})]})]})})})(),a.jsx("style",{children:`
        .cv2-page { padding: 0 0 56px; }

        /* ── Stats Strip ─────────────────────────────────────── */
        .cv2-stats-strip {
          display: flex;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-bottom: 32px;
        }
        .cv2-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 16px 20px;
        }
        .cv2-stat-divider {
          width: 1px;
          background: var(--border);
          flex-shrink: 0;
          margin: 12px 0;
        }
        .cv2-stat-label {
          font-size: 0.58rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          font-weight: 700;
        }
        .cv2-stat-val {
          font-size: 1.05rem;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        /* ── Section ─────────────────────────────────────────── */
        .cv2-section { margin-bottom: 36px; }
        .cv2-section-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 0;
        }
        .cv2-section-label {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: var(--text-muted);
          text-transform: uppercase;
          display: block;
        }
        .cv2-section-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
          margin-top: 3px;
          display: block;
        }
        .cv2-add-btn {
          width: 22px; height: 22px;
          border-radius: 6px;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-muted);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.12s;
          flex-shrink: 0;
        }
        .cv2-add-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: var(--accent-dim);
        }

        /* ── Row ─────────────────────────────────────────────── */
        .cv2-table-body { }
        .cv2-row {
          display: grid;
          grid-template-columns: 1fr 180px 148px 72px;
          grid-template-rows: auto;
          align-items: center;
          min-height: 50px;
          padding: 0 4px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          position: relative;
          transition: background 0.12s;
        }
        .cv2-row:last-child { border-bottom: none; }
        .cv2-row::before {
          content: '';
          position: absolute;
          left: 0; top: 10px; bottom: 10px;
          width: 2px;
          background: var(--rc, var(--accent));
          border-radius: 2px;
          opacity: 0;
          transition: opacity 0.15s;
        }
        .cv2-row:hover { background: rgba(255,255,255,0.02); }
        .cv2-row:hover::before { opacity: 0.8; }
        .cv2-row-dim { opacity: 0.38; }

        /* ── Cells ───────────────────────────────────────────── */
        .cv2-cell-name {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 13px 0 13px 8px;
          min-width: 0;
        }
        .cv2-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .cv2-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cv2-tag {
          font-size: 0.52rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 2px 5px;
          border-radius: 3px;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .cv2-cell-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-right: 16px;
        }
        .cv2-bar-track {
          flex: 1;
          height: 3px;
          background: rgba(255,255,255,0.07);
          border-radius: 2px;
          overflow: hidden;
        }
        .cv2-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cv2-bar-pct {
          font-size: 0.6rem;
          font-weight: 700;
          min-width: 30px;
          text-align: right;
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.02em;
        }
        .cv2-bar-label {
          font-size: 0.58rem;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .cv2-bar-cta {
          font-size: 0.62rem;
          font-weight: 700;
          color: var(--accent);
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.15s;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }
        .cv2-row:hover .cv2-bar-cta { opacity: 1; }

        .cv2-cell-amount {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          padding-right: 4px;
        }
        .cv2-amount-main {
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }
        .cv2-amount-sub {
          font-size: 0.62rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .cv2-cell-actions {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 1px;
          opacity: 0;
          transition: opacity 0.15s;
        }
        .cv2-row:hover .cv2-cell-actions { opacity: 1; }
        .cv2-icon-btn {
          width: 26px; height: 26px;
          border-radius: 5px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.12s;
        }
        .cv2-icon-btn:hover { background: rgba(255,255,255,0.07); color: var(--text-primary); }
        .cv2-icon-danger:hover { background: rgba(248,113,113,0.1); color: #f87171; }

        /* Mobile progress row */
        .cv2-mobile-prog {
          display: none;
          grid-column: 1 / -1;
          padding: 0 8px 10px;
        }

        /* ── Quick Add ───────────────────────────────────────── */
        .cv2-quick-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 10px 12px 14px;
          background: var(--bg-input);
          border-bottom: 1px solid var(--border);
          margin: 0;
        }
        .cv2-quick-row .form-input { font-size: 0.8rem; padding: 7px 10px; height: auto; }

        /* ── Empty ───────────────────────────────────────────── */
        .cv2-empty {
          padding: 18px 8px;
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* ── Mobile ──────────────────────────────────────────── */
        @media (max-width: 640px) {
          .cv2-stats-strip { }
          .cv2-stat { padding: 12px 14px; }
          .cv2-stat-val { font-size: 0.9rem; }

          .cv2-row {
            grid-template-columns: 1fr auto auto;
            grid-template-rows: auto auto;
            align-items: start;
            min-height: auto;
            padding: 0;
          }
          .cv2-cell-name {
            grid-column: 1; grid-row: 1;
            padding: 12px 0 4px 8px;
          }
          .cv2-cell-bar { display: none; }
          .cv2-cell-amount {
            grid-column: 2; grid-row: 1;
            padding: 12px 4px 4px 0;
            align-items: flex-end;
          }
          .cv2-cell-actions {
            grid-column: 3; grid-row: 1;
            opacity: 1;
            padding: 10px 4px 4px 0;
            align-items: flex-start;
          }
          .cv2-mobile-prog {
            display: block;
            grid-column: 1 / -1; grid-row: 2;
            padding: 2px 8px 10px;
          }
          .cv2-row::before { display: none; }
          .cv2-name { font-size: 0.82rem; }
          .cv2-amount-main { font-size: 0.82rem; }
        }

        @media (max-width: 380px) {
          .cv2-stat { padding: 10px 10px; }
          .cv2-stat-val { font-size: 0.82rem; }
          .cv2-stat-label { font-size: 0.52rem; }
          .cv2-tag { display: none; }
        }
      `})]})}export{ze as default};
