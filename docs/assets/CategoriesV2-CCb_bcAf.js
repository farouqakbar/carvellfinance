import{F as Ne,H as ke,K as we,D as i,J as Ce,w as Da,B as a,L as Se,z as _e,y as ga,E as l,v as b,s as A,C as ta,A as Ra,i as pa,q as ha,m as La,g as ze}from"./index-BHb6Mhxq.js";import{C as Pe}from"./CategoryForm-DUxHqzhz.js";import{a as Wa,d as Me,f as Ae,c as Te,e as $e,C as Ua,b as Ga}from"./ConfirmModal-CwA4Jjn5.js";const Be=15,Ka=["#6366f1","#3b82f6","#06b6d4","#10b981","#f59e0b","#f97316","#ef4444","#ec4899","#a855f7"];function Fe(m){const[E,d]=m.split("-").map(Number),v=new Date(E,d-2,1);return`${v.getFullYear()}-${String(v.getMonth()+1).padStart(2,"0")}`}function qe(m){const[E,d]=m.split("-").map(Number),v=new Date(E,d,1);return`${v.getFullYear()}-${String(v.getMonth()+1).padStart(2,"0")}`}function De(){var Ea;const{user:m}=Ne(),{setHeader:E}=ke(),d=we(),[v,Ja]=i.useState([]),[Oa,Qa]=i.useState({}),[o,Ya]=i.useState(0),[W,xa]=i.useState(!0),[Va,z]=i.useState(!1),[S,U]=i.useState(null),[N,T]=i.useState(null),[I,G]=i.useState(null),[Xa]=Ce(),[r,ba]=i.useState(()=>Xa.get("month")||Da()),[da,Za]=i.useState(null),[k,ae]=i.useState(null),[ee,K]=i.useState(!1),[$,sa]=i.useState({amount:"",note:"",date:""}),[va,fa]=i.useState(!1),[te,J]=i.useState(!1),[P,O]=i.useState({description:"",amount:"",date:""}),[ja,ya]=i.useState(!1),Na=r===Da(),ka=!!m.recording_start_month&&r<=m.recording_start_month,[na,se]=i.useState([]),[Q,ne]=i.useState([]),[re,Y]=i.useState(!1),[g,D]=i.useState({jenis:"hutang",nama:"",amount:"",due_date:"",sumber:"saldo"}),[wa,Ca]=i.useState(!1),[ra,ma]=i.useState(null),[f,V]=i.useState(null),[B,M]=i.useState(null),[ia,R]=i.useState(null),[Sa,_a]=i.useState(!1),[ie,la]=i.useState(null),[X,Z]=i.useState({date:"",amount:""});i.useEffect(()=>{w()},[r]),i.useEffect(()=>{ca()},[r]),i.useEffect(()=>(E(a.jsxs(a.Fragment,{children:[a.jsxs(Se,{to:`/dashboard?month=${r}`,className:"topbar-back-btn",children:["‹ ",a.jsx("span",{className:"back-label",children:"Dashboard"})]}),a.jsxs("div",{className:"month-nav-group",children:[a.jsx("button",{className:"month-btn",onClick:()=>ba(Fe(r)),disabled:ka,children:"‹"}),a.jsx("span",{className:"month-label-text",children:_e(r)}),a.jsx("button",{className:"month-btn",onClick:()=>ba(qe(r)),disabled:Na,children:"›"})]})]})),()=>E(null)),[r,Na,ka]);const oa=()=>Ka[v.length%Ka.length],w=async()=>{xa(!0);const e=`${r}-01`,t=ga(r),[s,n]=await Promise.all([l.from("categories").select("*").eq("user_id",m.id).is("month",null),l.from("categories").select("*").eq("user_id",m.id).eq("month",r)]),c=[...s.data||[],...n.data||[]].sort((h,ua)=>h.name.localeCompare(ua.name)),p=new Set,x=c.filter(h=>p.has(h.name)?!1:(p.add(h.name),!0)),[y,u,j,_]=await Promise.all([l.from("transactions").select("category_id, amount").eq("user_id",m.id).eq("type","expense").gte("date",e).lte("date",t),l.from("transactions").select("id, category_id, amount, description, date").eq("user_id",m.id).eq("type","income").gte("date",e).lte("date",t),l.from("category_budgets").select("category_id, budget_limit").eq("user_id",m.id).eq("month",r),l.from("savings").select("id, name, current_amount").eq("user_id",m.id).order("name")]),C={};(j.data||[]).forEach(h=>{C[h.category_id]=Number(h.budget_limit)});const H={};(y.data||[]).forEach(h=>{h.category_id&&(H[h.category_id]=(H[h.category_id]||0)+Number(h.amount))});const aa=(x||[]).map(h=>({...h,budget_limit:C[h.id]!==void 0?C[h.id]:0})),ea=(x||[]).find(h=>Wa(h)),Ia=ea?(u.data||[]).filter(h=>h.category_id===ea.id):[];Ja(aa),Qa(H),Ya(Ia.reduce((h,ua)=>h+Number(ua.amount),0)),Za((ea==null?void 0:ea.id)||null),ae(Ia[0]||null),ne(_.data||[]),xa(!1)},ca=async()=>{const[e,t]=await Promise.all([l.from("hutang").select("*").eq("user_id",m.id).eq("month",r).order("due_date",{ascending:!0,nullsFirst:!1}),l.from("hutang").select("*").eq("user_id",m.id).lt("month",r).eq("lunas",!1).order("due_date",{ascending:!0,nullsFirst:!1})]);se([...t.data||[],...e.data||[]])},le=async()=>{const e=parseFloat(P.amount)||0;if(!(!e||!P.description.trim())){ya(!0);try{let t=da;if(!t){const{data:n,error:c}=await l.from("categories").insert({user_id:m.id,name:"Pemasukan Bulanan",color:"#22c55e",icon:"",is_mandatory:!1,budget_limit:0}).select().single();if(c)throw c;t=n.id}const{error:s}=await l.from("transactions").insert({user_id:m.id,category_id:t,type:"income",amount:e,description:P.description.trim(),date:P.date||`${r}-01`});if(s)throw s;d("Pemasukan dicatat","success"),J(!1),O({description:"",amount:"",date:`${r}-01`}),w()}catch(t){d(t.message,"error")}finally{ya(!1)}}},oe=async()=>{const e=v.find(x=>x.id===I.id);if(e&&Ga(e)){d("Kategori ini tidak bisa dihapus","error"),G(null);return}const t=`${r}-01`,s=ga(r),[n,c]=await Promise.all([l.from("transactions").delete().eq("category_id",I.id).gte("date",t).lte("date",s),l.from("category_budgets").delete().eq("category_id",I.id).eq("month",r)]);if(n.error||c.error){d((n.error||c.error).message,"error");return}const{error:p}=await l.from("categories").delete().eq("id",I.id);if(p){d(p.message,"error");return}d("Kategori dihapus","success"),G(null),w()},ce=e=>{const t=String(Math.round(e.budget_limit||0)),s=o>0&&e.budget_limit>0?(e.budget_limit/o*100).toFixed(1):"";T({id:e.id,nominal:t,pct:s})},de=e=>{const t=parseFloat(e)||0;T(s=>({...s,nominal:e,pct:o>0&&t>0?(t/o*100).toFixed(1):""}))},za=e=>{const t=parseFloat(e)||0;T(s=>({...s,pct:e,nominal:o>0&&t>0?String(Math.round(t/100*o)):""}))},me=async()=>{const e=parseFloat(N.nominal)||0,t=await l.from("categories").update({budget_limit:e}).eq("id",N.id);if(t.error){d(t.error.message,"error");return}let s=null;if(e>0){const{error:n}=await l.from("category_budgets").upsert({user_id:m.id,category_id:N.id,month:r,budget_limit:e},{onConflict:"category_id,month"});s=n}else{const{error:n}=await l.from("category_budgets").delete().eq("user_id",m.id).eq("category_id",N.id).eq("month",r);s=n}if(s){d(s.message,"error");return}d("Budget disimpan","success"),T(null),w()},ue=async(e,t,s,n,c)=>{const p=new Date().toISOString().split("T")[0],x=e==="hutang";let y=null;if(t==="saldo"){const{data:u,error:j}=await l.from("transactions").insert({user_id:m.id,amount:n,category_id:null,type:x?"income":"expense",description:x?`Hutang dari ${c}`:`Piutang ke ${c}`,date:p}).select("id").single();if(j)throw j;y=(u==null?void 0:u.id)||null}else if(t==="tabungan"&&s){const{data:u,error:j}=await l.from("savings").select("current_amount").eq("id",s).single();if(j)throw j;const _=x?Number(u.current_amount)+n:Math.max(0,Number(u.current_amount)-n),{error:C}=await l.from("savings").update({current_amount:_}).eq("id",s);if(C)throw C}return y},Pa=async(e,t,s,n,c,p)=>{const x=new Date().toISOString().split("T")[0],y=e==="hutang";if(t==="saldo")if(p){const{error:u}=await l.from("transactions").delete().eq("id",p);if(u)throw u}else{const{error:u}=await l.from("transactions").insert({user_id:m.id,amount:n,category_id:null,type:y?"expense":"income",description:y?`Bayar hutang ke ${c}`:`Terima piutang dari ${c}`,date:x});if(u)throw u}else if(t==="tabungan"&&s){const{data:u,error:j}=await l.from("savings").select("current_amount").eq("id",s).single();if(j)throw j;if(u){const _=y?Math.max(0,Number(u.current_amount)-n):Number(u.current_amount)+n,{error:C}=await l.from("savings").update({current_amount:_}).eq("id",s);if(C)throw C}}},ge=async()=>{var t;const e=parseFloat(g.amount)||0;if(!(!g.nama.trim()||!e)){Ca(!0);try{const s=g.sumber==="tabungan"&&((t=Q[0])==null?void 0:t.id)||null,n=await ue(g.jenis,g.sumber,s,e,g.nama.trim()),{error:c}=await l.from("hutang").insert({user_id:m.id,jenis:g.jenis,nama:g.nama.trim(),amount:e,due_date:g.due_date||null,sumber:g.sumber,savings_id:s,linked_tx_id:n,month:r});if(c)throw c;d(g.jenis==="hutang"?"Hutang dicatat":"Piutang dicatat","success"),Y(!1),D({jenis:"hutang",nama:"",amount:"",due_date:"",sumber:"saldo"}),ca(),w()}catch(s){d(s.message,"error")}finally{Ca(!1)}}},pe=async(e,t,s)=>{_a(!0);try{await Pa(e.jenis,t,s,Number(e.amount),e.nama,null);const{error:n}=await l.from("hutang").update({lunas:!0}).eq("id",e.id);if(n)throw n;d(e.jenis==="hutang"?"Hutang ditandai lunas":"Piutang diterima","success"),V(null),M(null),R(null),ca(),w()}catch(n){d(n.message,"error")}finally{_a(!1)}},he=async()=>{const e=na.find(t=>t.id===ra.id);if(e)try{e.lunas||await Pa(e.jenis,e.sumber,e.savings_id,Number(e.amount),e.nama,e.linked_tx_id);const{error:t}=await l.from("hutang").delete().eq("id",ra.id);if(t)throw t;d("Dihapus","success"),ma(null),ca(),w()}catch(t){d(t.message,"error")}},xe=(e,t)=>{if(t)return{label:"Lunas",color:"#34d399",bg:"rgba(52,211,153,0.1)"};if(!e)return null;const s=new Date;s.setHours(0,0,0,0);const n=new Date(e),c=Math.round((n-s)/864e5);return c<0?{label:`Terlambat ${Math.abs(c)}h`,color:"#f87171",bg:"rgba(248,113,113,0.1)"}:c===0?{label:"Hari ini!",color:"#f87171",bg:"rgba(248,113,113,0.1)"}:c<=7?{label:`${c} hari lagi`,color:"#fbbf24",bg:"rgba(251,191,36,0.1)"}:{label:`${c} hari lagi`,color:"var(--text-muted)",bg:null}},be=async()=>{const e=parseFloat($.amount.replace(/\D/g,""))||0;if(da){fa(!0);try{const t=$.date||`${r}-01`;if(k){const{error:s}=await l.from("transactions").update({amount:e,description:$.note,date:t}).eq("id",k.id);if(s)throw s}else{const{error:s}=await l.from("transactions").insert({user_id:m.id,category_id:da,type:"income",amount:e,description:$.note,date:t});if(s)throw s}d("Pemasukan disimpan","success"),K(!1),w()}catch(t){d(t.message,"error")}finally{fa(!1)}}},ve=async e=>{const{error:t}=await l.from("categories").update({is_planned:!e.is_planned}).eq("id",e.id);if(t){d(t.message,"error");return}d(e.is_planned?"Kategori diaktifkan":"Dipindah ke perencanaan","success"),w()},fe=async(e,t)=>{const s=parseFloat(X.amount)||0;if(!s)return;const{error:n}=await l.from("transactions").insert({user_id:m.id,category_id:e,type:"expense",amount:s,description:t,date:X.date||`${r}-01`});if(n){d(n.message,"error");return}d("Transaksi dicatat","success"),la(null),Z({date:"",amount:""}),w()},Ma=v.filter(e=>Wa(e)),Aa=v.filter(e=>Me(e)),Ta=v.filter(e=>Ae(e)),$a=v.filter(e=>Te(e)),Ba=v.filter(e=>$e(e)),F=Aa.reduce((e,t)=>e+Number(t.budget_limit||0),0),q=Ta.reduce((e,t)=>e+Number(t.budget_limit||0),0),Fa=o-F-q,qa=e=>{const t=Oa[e.id]||0,s=Number(e.budget_limit||0),n=s>0?t/s*100:0,c=Math.min(n,100),p=n>100,x=!p&&n>=80,y=!p&&n>=100,u=p?"#f87171":y?"#34d399":x?"#fbbf24":e.color||"var(--accent)",j=p?"#f87171":x?"#fbbf24":y?"#34d399":"var(--text-muted)",_=!!e.is_planned,C=ie===e.id;return a.jsxs("div",{children:[a.jsxs("div",{className:`cv2-row${_?" cv2-row-dim":""}`,style:{"--rc":e.color||"var(--accent)"},children:[a.jsxs("div",{className:"cv2-cell-name",children:[a.jsx("span",{className:"cv2-dot",style:{background:e.color||"var(--accent)"}}),a.jsx("span",{className:"cv2-name",children:e.name}),_&&a.jsx("span",{className:"cv2-tag",style:{background:"rgba(255,255,255,0.05)",color:"var(--text-muted)"},children:"plan"})]}),a.jsxs("div",{className:"cv2-cell-bar",children:[s>0?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"cv2-bar-track",children:a.jsx("div",{className:"cv2-bar-fill",style:{width:`${c}%`,background:u}})}),a.jsx("span",{className:"cv2-bar-pct",style:{color:j},children:p?`+${Math.round(n-100)}%`:`${Math.round(n)}%`})]}):t>0?a.jsx("span",{className:"cv2-bar-label",children:"no budget"}):a.jsx("span",{className:"cv2-bar-cta",onClick:()=>{la(e.id),Z({date:Ra(),amount:""})},children:"+ catat"}),s>0&&!t&&a.jsx("span",{className:"cv2-bar-cta",style:{marginLeft:8},onClick:()=>{la(e.id),Z({date:Ra(),amount:""})},children:"+ catat"})]}),a.jsxs("div",{className:"cv2-cell-amount",children:[a.jsx("span",{className:"cv2-amount-main tabular",style:{color:p?"#f87171":"var(--text-primary)"},children:t>0?b(t):"—"}),s>0&&a.jsxs("span",{className:"cv2-amount-sub tabular",children:["/ ",b(s)]})]}),a.jsxs("div",{className:"cv2-cell-actions",children:[a.jsx("button",{className:"cv2-icon-btn",style:{color:_?"#34d399":"var(--text-muted)"},onClick:()=>ve(e),title:_?"Aktifkan":"Rencanakan",children:a.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:"currentColor",display:"block"}})}),a.jsx("button",{className:"cv2-icon-btn",onClick:()=>{U(e),z(!0)},title:"Edit",children:a.jsx(pa,{size:11})}),a.jsx("button",{className:"cv2-icon-btn cv2-icon-danger",onClick:()=>G({id:e.id,name:e.name}),title:"Hapus",children:a.jsx(ha,{size:11})})]}),s>0&&a.jsx("div",{className:"cv2-mobile-prog",children:a.jsx("div",{className:"cv2-bar-track",children:a.jsx("div",{className:"cv2-bar-fill",style:{width:`${c}%`,background:u}})})})]}),C&&a.jsxs("div",{className:"cv2-quick-row",children:[a.jsx("input",{className:"form-input",type:"date",value:X.date,min:`${r}-01`,max:ga(r),onChange:H=>Z(aa=>({...aa,date:H.target.value}))}),a.jsx(ta,{value:X.amount,onChange:H=>Z(aa=>({...aa,amount:H}))}),a.jsxs("div",{style:{display:"flex",gap:6},children:[a.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>la(null),children:"Batal"}),a.jsx("button",{className:"btn btn-primary btn-sm",style:{flex:1},onClick:()=>fe(e.id,e.name),disabled:!X.amount,children:"Catat"})]})]})]},e.id)},Ha=(e,t="wajib")=>{const s=Number(e.budget_limit||0),n=o>0&&s>0?Math.round(s/o*100):null,c=!!e.is_planned,p=t==="savings",x=p?e.color||"#6366f1":e.color||"#f87171",y=p?"rgba(99,102,241,0.1)":"rgba(248,113,113,0.1)",u=p?"#818cf8":"#f87171",j=p?"tabungan":"wajib";return a.jsxs("div",{className:`cv2-row${c?" cv2-row-dim":""}`,style:{"--rc":x},children:[a.jsxs("div",{className:"cv2-cell-name",children:[a.jsx("span",{className:"cv2-dot",style:{background:x}}),a.jsx("span",{className:"cv2-name",children:e.name}),a.jsx("span",{className:"cv2-tag",style:{background:y,color:u},children:j})]}),a.jsx("div",{className:"cv2-cell-bar",children:n?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"cv2-bar-track",children:a.jsx("div",{className:"cv2-bar-fill",style:{width:`${Math.min(n,100)}%`,background:x}})}),a.jsxs("span",{className:"cv2-bar-pct",style:{color:"var(--text-muted)"},children:[n,"%"]})]}):a.jsx("span",{className:"cv2-bar-label",children:"dari gaji"})}),a.jsxs("div",{className:"cv2-cell-amount",children:[a.jsx("span",{className:"cv2-amount-main tabular",children:s>0?b(s):"—"}),a.jsx("span",{className:"cv2-amount-sub",children:"per bulan"})]}),a.jsxs("div",{className:"cv2-cell-actions",children:[a.jsx("button",{className:"cv2-icon-btn",onClick:()=>ce(e),title:"Ubah Budget",children:a.jsx(pa,{size:11})}),!Ga(e)&&a.jsx("button",{className:"cv2-icon-btn cv2-icon-danger",onClick:()=>G({id:e.id,name:e.name}),title:"Hapus",children:a.jsx(ha,{size:11})})]}),n&&a.jsx("div",{className:"cv2-mobile-prog",children:a.jsx("div",{className:"cv2-bar-track",children:a.jsx("div",{className:"cv2-bar-fill",style:{width:`${Math.min(n,100)}%`,background:x}})})})]},e.id)},je=e=>a.jsxs("div",{className:"cv2-row",style:{"--rc":"#34d399"},children:[a.jsxs("div",{className:"cv2-cell-name",children:[a.jsx("span",{className:"cv2-dot",style:{background:"#34d399"}}),a.jsx("span",{className:"cv2-name",children:e.name}),a.jsx("span",{className:"cv2-tag",style:{background:"rgba(52,211,153,0.1)",color:"#34d399"},children:"pemasukan"})]}),a.jsx("div",{className:"cv2-cell-bar"}),a.jsxs("div",{className:"cv2-cell-amount",children:[a.jsx("span",{className:"cv2-amount-main tabular",style:{color:o>0?"#34d399":"var(--text-muted)"},children:o>0?`+${b(o)}`:"—"}),a.jsx("span",{className:"cv2-amount-sub",children:"bulan ini"})]}),a.jsx("div",{className:"cv2-cell-actions",children:a.jsx("button",{className:"cv2-icon-btn",onClick:()=>{sa({amount:k?String(k.amount):"",note:(k==null?void 0:k.description)||"",date:(k==null?void 0:k.date)||`${r}-01`}),K(!0)},title:o>0?"Edit":"Catat",children:o>0?a.jsx(pa,{size:11}):a.jsx(La,{size:11})})})]},e.id),ye=e=>{const t=xe(e.due_date,e.lunas),s=e.jenis==="piutang"?"#f59e0b":"#f87171";return a.jsxs("div",{className:`cv2-row${e.lunas?" cv2-row-dim":""}`,style:{"--rc":s},children:[a.jsxs("div",{className:"cv2-cell-name",children:[a.jsx("span",{className:"cv2-dot",style:{background:s}}),a.jsx("span",{className:"cv2-name",children:e.nama}),a.jsx("span",{className:"cv2-tag",style:{background:e.jenis==="piutang"?"rgba(245,158,11,0.1)":"rgba(248,113,113,0.1)",color:s},children:e.jenis}),e.lunas&&a.jsx("span",{className:"cv2-tag",style:{background:"rgba(52,211,153,0.1)",color:"#34d399"},children:"lunas"})]}),a.jsx("div",{className:"cv2-cell-bar",children:t&&!e.lunas&&a.jsx("span",{style:{fontSize:"0.62rem",fontWeight:700,color:t.color,background:t.bg||"transparent",padding:t.bg?"2px 7px":"0",borderRadius:99},children:t.label})}),a.jsxs("div",{className:"cv2-cell-amount",children:[a.jsx("span",{className:"cv2-amount-main tabular",style:{color:e.lunas?"var(--text-muted)":s},children:b(e.amount)}),a.jsx("span",{className:"cv2-amount-sub",children:e.sumber})]}),a.jsxs("div",{className:"cv2-cell-actions",children:[!e.lunas&&a.jsx("button",{className:"cv2-icon-btn",style:{color:"#34d399"},onClick:()=>{V(e),M(null),R(null)},title:"Tandai Lunas",children:a.jsx(ze,{size:11})}),a.jsx("button",{className:"cv2-icon-btn cv2-icon-danger",onClick:()=>ma({id:e.id,nama:e.nama}),title:"Hapus",children:a.jsx(ha,{size:11})})]})]},e.id)},L=({label:e,sub:t,children:s,onAdd:n})=>a.jsxs("div",{className:"cv2-section",children:[a.jsxs("div",{className:"cv2-section-head",children:[a.jsxs("div",{children:[a.jsx("span",{className:"cv2-section-label",children:e}),t&&a.jsx("span",{className:"cv2-section-sub",children:t})]}),n&&a.jsx("button",{className:"cv2-add-btn",onClick:n,children:a.jsx(La,{size:11})})]}),a.jsx("div",{className:"cv2-table-body",children:s})]});return a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"cv2-page animate-in",children:[o>0&&a.jsxs("div",{className:"cv2-stats-strip",children:[a.jsxs("div",{className:"cv2-stat",children:[a.jsx("span",{className:"cv2-stat-label",children:"Pemasukan"}),a.jsxs("span",{className:"cv2-stat-val",style:{color:"#34d399"},children:["+",b(o)]})]}),a.jsx("div",{className:"cv2-stat-divider"}),a.jsxs("div",{className:"cv2-stat",children:[a.jsx("span",{className:"cv2-stat-label",children:"Tabungan"}),a.jsx("span",{className:"cv2-stat-val",style:{color:F>0?"#6366f1":"var(--text-muted)"},children:F>0?`−${b(F)}`:"—"})]}),a.jsx("div",{className:"cv2-stat-divider"}),a.jsxs("div",{className:"cv2-stat",children:[a.jsx("span",{className:"cv2-stat-label",children:"Wajib"}),a.jsx("span",{className:"cv2-stat-val",style:{color:q>0?"#f87171":"var(--text-muted)"},children:q>0?`−${b(q)}`:"—"})]}),a.jsx("div",{className:"cv2-stat-divider"}),a.jsxs("div",{className:"cv2-stat",children:[a.jsx("span",{className:"cv2-stat-label",children:"Sisa Bebas"}),a.jsx("span",{className:"cv2-stat-val",style:{color:Fa>=0?"#34d399":"#f87171"},children:b(Math.abs(Fa))})]})]}),a.jsxs(L,{label:"PEMASUKAN",sub:o>0?`Bulan ini: +${b(o)}`:"Belum ada pemasukan",onAdd:()=>{O({description:"",amount:"",date:`${r}-01`}),J(!0)},children:[Ma.map(je),Ma.length===0&&!W&&a.jsx("div",{className:"cv2-empty",children:"Belum ada kategori pemasukan"})]}),a.jsx(L,{label:"TABUNGAN",sub:F>0?`${b(F)} · ${o>0?`${Math.round(F/o*100)}% gaji · `:""}auto-deduct`:"Alokasi tabungan bulanan",onAdd:()=>{U({is_mandatory:!0,category_type:"savings",color:oa()}),z(!0)},children:W?[...Array(2)].map((e,t)=>a.jsx("div",{className:"skeleton",style:{height:50,marginBottom:1}},t)):Aa.map(e=>Ha(e,"savings"))}),a.jsx(L,{label:"HUTANG & PIUTANG",sub:(()=>{const e=na.filter(t=>!t.lunas);return e.length?`${e.length} aktif`:"Tidak ada hutang/piutang aktif"})(),onAdd:()=>Y(!0),children:na.length===0?a.jsx("div",{className:"cv2-empty",children:"Tidak ada hutang tercatat"}):na.map(ye)}),a.jsx(L,{label:"PENGELUARAN WAJIB",sub:o>0&&q>0?`${b(q)} · ${Math.round(q/o*100)}% gaji · langsung dipotong`:"Langsung dipotong dari gaji",onAdd:()=>{U({is_mandatory:!0,category_type:"wajib",color:oa()}),z(!0)},children:W?[...Array(2)].map((e,t)=>a.jsx("div",{className:"skeleton",style:{height:50,marginBottom:1}},t)):Ta.map(e=>Ha(e,"wajib"))}),a.jsx(L,{label:"PENGELUARAN RUTIN",sub:"Tagihan & langganan bulanan",onAdd:()=>{U({is_monthly:!0,category_type:"rutin",color:oa()}),z(!0)},children:W?[...Array(2)].map((e,t)=>a.jsx("div",{className:"skeleton",style:{height:50,marginBottom:1}},t)):$a.length===0?a.jsx("div",{className:"cv2-empty",children:"Belum ada pengeluaran rutin"}):$a.map(qa)}),a.jsx(L,{label:"PENGELUARAN TAMBAHAN",onAdd:()=>{U({category_type:"tambahan",color:oa()}),z(!0)},children:W?[...Array(2)].map((e,t)=>a.jsx("div",{className:"skeleton",style:{height:50,marginBottom:1}},t)):Ba.length===0?a.jsx("div",{className:"cv2-empty",children:"Belum ada pengeluaran tambahan"}):Ba.map(qa)})]}),I&&a.jsx(Ua,{title:"Hapus Kategori",message:`Hapus "${I.name}"? Transaksi bulan ini untuk kategori ini juga akan terhapus.`,confirmLabel:"Hapus",onConfirm:oe,onCancel:()=>G(null)}),f&&a.jsx("div",{className:"modal-overlay",onClick:()=>{V(null),M(null),R(null)},children:a.jsxs("div",{className:"modal",style:{maxWidth:360},onClick:e=>e.stopPropagation(),children:[!B&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"modal-header",children:[a.jsxs("div",{children:[a.jsx("h2",{className:"modal-title",children:f.jenis==="hutang"?"Hutang Terbayar":"Piutang Diterima"}),a.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[f.nama," · ",b(f.amount)]})]}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>V(null),children:a.jsx(A,{size:16})})]}),a.jsx("p",{style:{fontSize:"0.78rem",color:"var(--text-muted)",marginBottom:14},children:f.jenis==="hutang"?"Bayar dari mana?":"Uang masuk ke mana?"}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[a.jsxs("button",{className:"btn btn-secondary",style:{justifyContent:"flex-start",gap:10},onClick:()=>M("tabungan"),children:[a.jsx("span",{style:{fontSize:"1rem"},children:"🏦"}),a.jsxs("div",{style:{textAlign:"left"},children:[a.jsx("div",{style:{fontWeight:700,fontSize:"0.82rem"},children:"Tabungan"}),a.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)",fontWeight:400},children:f.jenis==="hutang"?"Kurangi dari kantong tabungan":"Tambah ke kantong tabungan"})]})]}),a.jsxs("button",{className:"btn btn-secondary",style:{justifyContent:"flex-start",gap:10},onClick:()=>M("saldo"),children:[a.jsx("span",{style:{fontSize:"1rem"},children:"💳"}),a.jsxs("div",{style:{textAlign:"left"},children:[a.jsx("div",{style:{fontWeight:700,fontSize:"0.82rem"},children:"Saldo"}),a.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)",fontWeight:400},children:f.jenis==="hutang"?"Bayar langsung dari saldo":"Terima ke saldo"})]})]})]})]}),B==="tabungan"&&!ia&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"modal-header",children:[a.jsxs("div",{children:[a.jsx("h2",{className:"modal-title",children:"Pilih Tabungan"}),a.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:b(f.amount)})]}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>M(null),children:a.jsx(A,{size:16})})]}),a.jsx("div",{className:"wajib-rows",children:Q.map(e=>a.jsxs("div",{className:"wajib-row",style:{cursor:"pointer"},onClick:()=>R(e.id),children:[a.jsx("span",{className:"brow-name",children:e.name}),a.jsx("span",{className:"wajib-amount tabular",style:{color:Number(e.current_amount)>=Number(f.amount)?"#34d399":"#f87171"},children:b(Number(e.current_amount))})]},e.id))})]}),B&&(B==="saldo"||ia)&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h2",{className:"modal-title",children:"Konfirmasi"}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>{B==="saldo"?M(null):R(null)},children:a.jsx(A,{size:16})})]}),a.jsxs("div",{style:{fontSize:"0.82rem",color:"var(--text-muted)",lineHeight:1.6,marginBottom:16},children:["Tandai ",f.jenis," ke ",a.jsx("strong",{style:{color:"var(--text-primary)"},children:f.nama})," sebesar"," ",a.jsx("strong",{style:{color:f.jenis==="hutang"?"#f87171":"#f59e0b"},children:b(f.amount)})," sebagai ",a.jsx("strong",{style:{color:"#34d399"},children:"lunas"}),B==="tabungan"&&a.jsxs(a.Fragment,{children:[" dari tabungan ",a.jsx("strong",{style:{color:"var(--text-primary)"},children:(Ea=Q.find(e=>e.id===ia))==null?void 0:Ea.name})]}),"?"]}),a.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"flex-end"},children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>{V(null),M(null),R(null)},children:"Batal"}),a.jsx("button",{className:"btn btn-primary",disabled:Sa,onClick:()=>pe(f,B,ia),children:Sa?"Menyimpan...":"Konfirmasi Lunas"})]})]})]})}),ra&&a.jsx(Ua,{title:"Hapus Hutang",message:`Hapus catatan hutang ke "${ra.nama}"?`,confirmLabel:"Hapus",onConfirm:he,onCancel:()=>ma(null)}),re&&a.jsx("div",{className:"modal-overlay",onClick:()=>Y(!1),children:a.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsxs("h2",{className:"modal-title",children:["Catat ",g.jenis==="hutang"?"Hutang":"Piutang"]}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>Y(!1),children:a.jsx(A,{size:16})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Jenis"}),a.jsx("div",{style:{display:"flex",gap:8},children:[{val:"hutang",label:"Hutang",sub:"Saya pinjam dari orang"},{val:"piutang",label:"Piutang",sub:"Orang pinjam dari saya"}].map(({val:e,label:t,sub:s})=>a.jsxs("button",{type:"button",className:g.jenis===e?"btn btn-primary btn-sm":"btn btn-secondary btn-sm",style:{flex:1,fontWeight:700,display:"flex",flexDirection:"column",gap:2,height:"auto",padding:"8px 4px"},onClick:()=>D(n=>({...n,jenis:e})),children:[a.jsx("span",{children:t}),a.jsx("span",{style:{fontSize:"0.6rem",fontWeight:500,opacity:.75},children:s})]},e))})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:g.jenis==="hutang"?"Dari siapa kamu meminjam":"Siapa yang meminjam darimu"}),a.jsx("input",{className:"form-input",type:"text",placeholder:g.jenis==="hutang"?"Misal: Budi, Bank BCA...":"Misal: Andi, Rudi...",value:g.nama,onChange:e=>D(t=>({...t,nama:e.target.value})),autoFocus:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Berapa"}),a.jsx(ta,{value:g.amount,onChange:e=>D(t=>({...t,amount:e}))})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Kapan janji dibayar"}),a.jsx("input",{className:"form-input",type:"date",value:g.due_date,onChange:e=>D(t=>({...t,due_date:e.target.value}))})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:g.jenis==="hutang"?"Uang masuk ke":"Uang keluar dari"}),a.jsx("div",{style:{display:"flex",gap:8},children:[{val:"saldo",label:"Saldo"},{val:"tabungan",label:"Tabungan"}].map(({val:e,label:t})=>a.jsxs("button",{type:"button",className:g.sumber===e?"btn btn-primary btn-sm":"btn btn-secondary btn-sm",style:{flex:1,fontWeight:700},onClick:()=>D(s=>({...s,sumber:e})),children:[t,e==="tabungan"&&Q[0]&&a.jsx("span",{style:{fontSize:"0.6rem",fontWeight:500,display:"block",marginTop:1,opacity:.8},children:Q[0].name})]},e))})]}),a.jsxs("div",{className:"flex gap-8 mt-16",children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>Y(!1),children:"Batal"}),a.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:ge,disabled:wa||!g.nama.trim()||!g.amount,children:wa?"Menyimpan...":"Simpan"})]})]})}),ee&&a.jsx("div",{className:"modal-overlay",onClick:()=>K(!1),children:a.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsxs("div",{children:[a.jsx("h2",{className:"modal-title",children:"Pemasukan Bulanan"}),a.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:k?"Edit jumlah atau catatan":"Catat pemasukan bulan ini"})]}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>K(!1),children:a.jsx(A,{size:16})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Jumlah Pemasukan"}),a.jsx(ta,{value:$.amount,onChange:e=>sa(t=>({...t,amount:e})),autoFocus:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Tanggal Diterima"}),a.jsx("input",{className:"form-input",type:"date",value:$.date,min:`${r}-01`,max:(()=>{const[e,t]=r.split("-").map(Number);return new Date(e,t,0).toISOString().split("T")[0]})(),onChange:e=>sa(t=>({...t,date:e.target.value}))})]}),a.jsxs("div",{className:"form-group",children:[a.jsxs("label",{className:"form-label",children:["Catatan ",a.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400},children:"(opsional)"})]}),a.jsx("textarea",{className:"form-input",rows:2,placeholder:"Misal: Gaji pokok + tunjangan...",value:$.note,onChange:e=>sa(t=>({...t,note:e.target.value})),style:{resize:"vertical",fontFamily:"var(--font-sans)",fontSize:"0.875rem"}})]}),a.jsxs("div",{className:"flex gap-8 mt-16",children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>K(!1),children:"Batal"}),a.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:be,disabled:va,children:va?"Menyimpan...":"Simpan"})]})]})}),te&&a.jsx("div",{className:"modal-overlay",onClick:()=>J(!1),children:a.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsxs("div",{children:[a.jsx("h2",{className:"modal-title",children:"Tambah Pemasukan"}),a.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Dicatat ke bulan ",r]})]}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>J(!1),children:a.jsx(A,{size:16})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Nama Pemasukan"}),a.jsx("input",{className:"form-input",type:"text",placeholder:"Misal: Gaji Pokok, Bonus, Freelance...",value:P.description,onChange:e=>O(t=>({...t,description:e.target.value})),autoFocus:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Jumlah"}),a.jsx(ta,{value:P.amount,onChange:e=>O(t=>({...t,amount:e}))})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Tanggal"}),a.jsx("input",{className:"form-input",type:"date",value:P.date||`${r}-01`,min:`${r}-01`,max:(()=>{const[e,t]=r.split("-").map(Number);return new Date(e,t,0).toISOString().split("T")[0]})(),onChange:e=>O(t=>({...t,date:e.target.value}))})]}),a.jsxs("div",{className:"flex gap-8 mt-16",children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>J(!1),children:"Batal"}),a.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:le,disabled:ja||!P.description.trim()||!P.amount,children:ja?"Menyimpan...":"Simpan"})]})]})}),Va&&!N&&a.jsx("div",{className:"modal-overlay",onClick:()=>z(!1),children:a.jsxs("div",{className:"modal",onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h2",{className:"modal-title",children:S!=null&&S.id?"Edit Kategori":S!=null&&S.is_mandatory?"Pengeluaran Wajib Baru":S!=null&&S.is_monthly?"Pengeluaran Rutin Baru":"Kategori Baru"}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>z(!1),children:a.jsx(A,{size:16})})]}),a.jsx(Pe,{editData:S,salary:o,month:r,onSuccess:()=>{w(),z(!1)},onClose:()=>z(!1)})]})}),N&&(()=>{const e=v.find(t=>t.id===N.id);return a.jsx("div",{className:"modal-overlay",onClick:()=>T(null),children:a.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:t=>t.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsxs("div",{children:[a.jsxs("h2",{className:"modal-title",children:["Budget — ",e==null?void 0:e.name]}),o>0&&a.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Gaji: ",b(o)]})]}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>T(null),children:a.jsx(A,{size:16})})]}),o>0&&a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[a.jsxs("div",{style:{position:"relative",flex:1},children:[a.jsx("input",{className:"form-input",type:"number",placeholder:String(Be),value:N.pct,onChange:t=>za(t.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),a.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),N.pct&&o>0&&a.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",b(Math.round(parseFloat(N.pct)/100*o))]})]}),!N.pct&&a.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(t=>a.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>za(String(t)),children:[t,"%"]},t))})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),a.jsx(ta,{value:N.nominal,onChange:de,autoFocus:!o})]}),a.jsxs("div",{className:"flex gap-8 mt-16",children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>T(null),children:"Batal"}),a.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:me,children:"Simpan"})]})]})})})(),a.jsx("style",{children:`
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
      `})]})}export{De as default};
