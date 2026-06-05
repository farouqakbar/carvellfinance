import{G as ua,J as pa,M as ga,E as l,K as ha,x as $e,D as e,L as xa,A as ba,z as oe,F as i,w as j,t as O,C as J,B as Fe,j as ce,r as de,n as qe,h as va}from"./index-CasCzvCu.js";import{C as fa}from"./CategoryForm-kUfnU_hL.js";import{b as F,a as te,i as me,C as Ae}from"./ConfirmModal-DdSCzl8i.js";const ja=15,Be=["#6366f1","#3b82f6","#06b6d4","#10b981","#f59e0b","#f97316","#ef4444","#ec4899","#a855f7"];function ya(u){const[q,d]=u.split("-").map(Number),x=new Date(q,d-2,1);return`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}`}function Na(u){const[q,d]=u.split("-").map(Number),x=new Date(q,d,1);return`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}`}function _a(){const{user:u}=ua(),{setHeader:q}=pa(),d=ga(),[x,Te]=l.useState([]),[Ee,He]=l.useState({}),[o,Ie]=l.useState(0),[Q,ue]=l.useState(!0),[De,M]=l.useState(!1),[C,Y]=l.useState(null),[v,P]=l.useState(null),[A,T]=l.useState(null),[Re]=ha(),[r,pe]=l.useState(()=>Re.get("month")||$e()),[se,Le]=l.useState(null),[y,We]=l.useState(null),[Ge,E]=l.useState(!1),[z,V]=l.useState({amount:"",note:"",date:""}),[ge,he]=l.useState(!1),[Ke,H]=l.useState(!1),[S,I]=l.useState({description:"",amount:"",date:""}),[xe,be]=l.useState(!1),ve=r===$e(),fe=!!u.recording_start_month&&r<=u.recording_start_month,[D,Ue]=l.useState([]),[ne,Oe]=l.useState([]),[Je,R]=l.useState(!1),[p,B]=l.useState({jenis:"hutang",nama:"",amount:"",due_date:"",sumber:"saldo"}),[je,ye]=l.useState(!1),[X,re]=l.useState(null),[Qe,Z]=l.useState(null),[L,W]=l.useState({date:"",amount:""});l.useEffect(()=>{N()},[r]),l.useEffect(()=>{ee()},[r]),l.useEffect(()=>(q(e.jsxs(e.Fragment,{children:[e.jsxs(xa,{to:`/dashboard?month=${r}`,className:"topbar-back-btn",children:["‹ ",e.jsx("span",{className:"back-label",children:"Dashboard"})]}),e.jsxs("div",{className:"month-nav-group",children:[e.jsx("button",{className:"month-btn",onClick:()=>pe(ya(r)),disabled:fe,children:"‹"}),e.jsx("span",{className:"month-label-text",children:ba(r)}),e.jsx("button",{className:"month-btn",onClick:()=>pe(Na(r)),disabled:ve,children:"›"})]})]})),()=>q(null)),[r,ve,fe]);const ie=()=>Be[x.length%Be.length],N=async()=>{ue(!0);const a=`${r}-01`,t=oe(r),[s,n]=await Promise.all([i.from("categories").select("*").eq("user_id",u.id).is("month",null),i.from("categories").select("*").eq("user_id",u.id).eq("month",r)]),c=[...(s.data||[]).filter(m=>F(m)),...n.data||[]].sort((m,le)=>m.name.localeCompare(le.name)),h=new Set,b=c.filter(m=>h.has(m.name)?!1:(h.add(m.name),!0)),[k,g,f,_]=await Promise.all([i.from("transactions").select("category_id, amount").eq("user_id",u.id).eq("type","expense").gte("date",a).lte("date",t),i.from("transactions").select("id, category_id, amount, description, date").eq("user_id",u.id).eq("type","income").gte("date",a).lte("date",t),i.from("category_budgets").select("category_id, budget_limit").eq("user_id",u.id).eq("month",r),i.from("savings").select("id, name, current_amount").eq("user_id",u.id).order("name")]),w={};(f.data||[]).forEach(m=>{w[m.category_id]=Number(m.budget_limit)});const $={};(k.data||[]).forEach(m=>{m.category_id&&($[m.category_id]=($[m.category_id]||0)+Number(m.amount))});const K=(b||[]).map(m=>({...m,budget_limit:w[m.id]!==void 0?w[m.id]:0})),U=(b||[]).find(m=>te(m)),ze=U?(g.data||[]).filter(m=>m.category_id===U.id):[];Te(K),He($),Ie(ze.reduce((m,le)=>m+Number(le.amount),0)),Le((U==null?void 0:U.id)||null),We(ze[0]||null),Oe(_.data||[]),ue(!1)},ee=async()=>{const[a,t]=await Promise.all([i.from("hutang").select("*").eq("user_id",u.id).eq("month",r).order("due_date",{ascending:!0,nullsFirst:!1}),i.from("hutang").select("*").eq("user_id",u.id).lt("month",r).eq("lunas",!1).order("due_date",{ascending:!0,nullsFirst:!1})]);Ue([...t.data||[],...a.data||[]])},Ye=async()=>{const a=parseFloat(S.amount)||0;if(!(!a||!S.description.trim())){be(!0);try{let t=se;if(!t){const{data:n,error:c}=await i.from("categories").insert({user_id:u.id,name:"Pemasukan Bulanan",color:"#22c55e",icon:"",is_mandatory:!1,budget_limit:0}).select().single();if(c)throw c;t=n.id}const{error:s}=await i.from("transactions").insert({user_id:u.id,category_id:t,type:"income",amount:a,description:S.description.trim(),date:S.date||`${r}-01`});if(s)throw s;d("Pemasukan dicatat","success"),H(!1),I({description:"",amount:"",date:`${r}-01`}),N()}catch(t){d(t.message,"error")}finally{be(!1)}}},Ve=async()=>{const a=x.find(b=>b.id===A.id);if(a&&F(a)){d("Kategori ini tidak bisa dihapus","error"),T(null);return}const t=`${r}-01`,s=oe(r),[n,c]=await Promise.all([i.from("transactions").delete().eq("category_id",A.id).gte("date",t).lte("date",s),i.from("category_budgets").delete().eq("category_id",A.id).eq("month",r)]);if(n.error||c.error){d((n.error||c.error).message,"error");return}const{error:h}=await i.from("categories").delete().eq("id",A.id);if(h){d(h.message,"error");return}d("Kategori dihapus","success"),T(null),N()},Xe=a=>{const t=String(Math.round(a.budget_limit||0)),s=o>0&&a.budget_limit>0?(a.budget_limit/o*100).toFixed(1):"";P({id:a.id,nominal:t,pct:s})},Ze=a=>{const t=parseFloat(a)||0;P(s=>({...s,nominal:a,pct:o>0&&t>0?(t/o*100).toFixed(1):""}))},Ne=a=>{const t=parseFloat(a)||0;P(s=>({...s,pct:a,nominal:o>0&&t>0?String(Math.round(t/100*o)):""}))},ea=async()=>{const a=parseFloat(v.nominal)||0,t=await i.from("categories").update({budget_limit:a}).eq("id",v.id);if(t.error){d(t.error.message,"error");return}let s=null;if(a>0){const{error:n}=await i.from("category_budgets").upsert({user_id:u.id,category_id:v.id,month:r,budget_limit:a},{onConflict:"category_id,month"});s=n}else{const{error:n}=await i.from("category_budgets").delete().eq("user_id",u.id).eq("category_id",v.id).eq("month",r);s=n}if(s){d(s.message,"error");return}d("Budget disimpan","success"),P(null),N()},aa=async(a,t,s,n,c)=>{const h=new Date().toISOString().split("T")[0],b=a==="hutang";let k=null;if(t==="saldo"){const{data:g,error:f}=await i.from("transactions").insert({user_id:u.id,amount:n,category_id:null,type:b?"income":"expense",description:b?`Hutang dari ${c}`:`Piutang ke ${c}`,date:h}).select("id").single();if(f)throw f;k=(g==null?void 0:g.id)||null}else if(t==="tabungan"&&s){const{data:g,error:f}=await i.from("savings").select("current_amount").eq("id",s).single();if(f)throw f;const _=b?Number(g.current_amount)+n:Math.max(0,Number(g.current_amount)-n),{error:w}=await i.from("savings").update({current_amount:_}).eq("id",s);if(w)throw w}return k},ke=async(a,t,s,n,c,h)=>{const b=new Date().toISOString().split("T")[0],k=a==="hutang";if(t==="saldo")if(h){const{error:g}=await i.from("transactions").delete().eq("id",h);if(g)throw g}else{const{error:g}=await i.from("transactions").insert({user_id:u.id,amount:n,category_id:null,type:k?"expense":"income",description:k?`Bayar hutang ke ${c}`:`Terima piutang dari ${c}`,date:b});if(g)throw g}else if(t==="tabungan"&&s){const{data:g,error:f}=await i.from("savings").select("current_amount").eq("id",s).single();if(f)throw f;if(g){const _=k?Math.max(0,Number(g.current_amount)-n):Number(g.current_amount)+n,{error:w}=await i.from("savings").update({current_amount:_}).eq("id",s);if(w)throw w}}},ta=async()=>{var t;const a=parseFloat(p.amount)||0;if(!(!p.nama.trim()||!a)){ye(!0);try{const s=p.sumber==="tabungan"&&((t=ne[0])==null?void 0:t.id)||null,n=await aa(p.jenis,p.sumber,s,a,p.nama.trim()),{error:c}=await i.from("hutang").insert({user_id:u.id,jenis:p.jenis,nama:p.nama.trim(),amount:a,due_date:p.due_date||null,sumber:p.sumber,savings_id:s,linked_tx_id:n,month:r});if(c)throw c;d(p.jenis==="hutang"?"Hutang dicatat":"Piutang dicatat","success"),R(!1),B({jenis:"hutang",nama:"",amount:"",due_date:"",sumber:"saldo"}),ee(),N()}catch(s){d(s.message,"error")}finally{ye(!1)}}},sa=async a=>{const t=D.find(s=>s.id===a);if(t)try{await ke(t.jenis,t.sumber,t.savings_id,Number(t.amount),t.nama,null);const{error:s}=await i.from("hutang").update({lunas:!0}).eq("id",a);if(s)throw s;d(t.jenis==="hutang"?"Hutang ditandai lunas":"Piutang diterima","success"),ee(),N()}catch(s){d(s.message,"error")}},na=async()=>{const a=D.find(t=>t.id===X.id);if(a)try{a.lunas||await ke(a.jenis,a.sumber,a.savings_id,Number(a.amount),a.nama,a.linked_tx_id);const{error:t}=await i.from("hutang").delete().eq("id",X.id);if(t)throw t;d("Dihapus","success"),re(null),ee(),N()}catch(t){d(t.message,"error")}},ra=(a,t)=>{if(t)return{label:"Lunas",color:"#34d399",bg:"rgba(52,211,153,0.1)"};if(!a)return null;const s=new Date;s.setHours(0,0,0,0);const n=new Date(a),c=Math.round((n-s)/864e5);return c<0?{label:`Terlambat ${Math.abs(c)}h`,color:"#f87171",bg:"rgba(248,113,113,0.1)"}:c===0?{label:"Hari ini!",color:"#f87171",bg:"rgba(248,113,113,0.1)"}:c<=7?{label:`${c} hari lagi`,color:"#fbbf24",bg:"rgba(251,191,36,0.1)"}:{label:`${c} hari lagi`,color:"var(--text-muted)",bg:null}},ia=async()=>{const a=parseFloat(z.amount.replace(/\D/g,""))||0;if(se){he(!0);try{const t=z.date||`${r}-01`;if(y){const{error:s}=await i.from("transactions").update({amount:a,description:z.note,date:t}).eq("id",y.id);if(s)throw s}else{const{error:s}=await i.from("transactions").insert({user_id:u.id,category_id:se,type:"income",amount:a,description:z.note,date:t});if(s)throw s}d("Pemasukan disimpan","success"),E(!1),N()}catch(t){d(t.message,"error")}finally{he(!1)}}},la=async a=>{const{error:t}=await i.from("categories").update({is_planned:!a.is_planned}).eq("id",a.id);if(t){d(t.message,"error");return}d(a.is_planned?"Kategori diaktifkan":"Dipindah ke perencanaan","success"),N()},oa=async(a,t)=>{const s=parseFloat(L.amount)||0;if(!s)return;const{error:n}=await i.from("transactions").insert({user_id:u.id,category_id:a,type:"expense",amount:s,description:t,date:L.date||`${r}-01`});if(n){d(n.message,"error");return}d("Transaksi dicatat","success"),Z(null),W({date:"",amount:""}),N()},we=x.filter(a=>te(a)),Ce=x.filter(a=>me(a)).sort((a,t)=>F(a)&&!F(t)?-1:!F(a)&&F(t)?1:a.name.localeCompare(t.name)),_e=x.filter(a=>a.is_monthly&&!me(a)&&!te(a)),Se=x.filter(a=>!me(a)&&!te(a)&&!a.is_monthly),ae=Ce.reduce((a,t)=>a+Number(t.budget_limit||0),0),Me=o-ae,Pe=a=>{const t=Ee[a.id]||0,s=Number(a.budget_limit||0),n=s>0?t/s*100:0,c=Math.min(n,100),h=n>100,b=!h&&n>=80,k=!h&&n>=100,g=h?"#f87171":k?"#34d399":b?"#fbbf24":a.color||"var(--accent)",f=h?"#f87171":b?"#fbbf24":k?"#34d399":"var(--text-muted)",_=!!a.is_planned,w=Qe===a.id;return e.jsxs("div",{children:[e.jsxs("div",{className:`cv2-row${_?" cv2-row-dim":""}`,style:{"--rc":a.color||"var(--accent)"},children:[e.jsxs("div",{className:"cv2-cell-name",children:[e.jsx("span",{className:"cv2-dot",style:{background:a.color||"var(--accent)"}}),e.jsx("span",{className:"cv2-name",children:a.name}),_&&e.jsx("span",{className:"cv2-tag",style:{background:"rgba(255,255,255,0.05)",color:"var(--text-muted)"},children:"plan"})]}),e.jsxs("div",{className:"cv2-cell-bar",children:[s>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"cv2-bar-track",children:e.jsx("div",{className:"cv2-bar-fill",style:{width:`${c}%`,background:g}})}),e.jsx("span",{className:"cv2-bar-pct",style:{color:f},children:h?`+${Math.round(n-100)}%`:`${Math.round(n)}%`})]}):t>0?e.jsx("span",{className:"cv2-bar-label",children:"no budget"}):e.jsx("span",{className:"cv2-bar-cta",onClick:()=>{Z(a.id),W({date:Fe(),amount:""})},children:"+ catat"}),s>0&&!t&&e.jsx("span",{className:"cv2-bar-cta",style:{marginLeft:8},onClick:()=>{Z(a.id),W({date:Fe(),amount:""})},children:"+ catat"})]}),e.jsxs("div",{className:"cv2-cell-amount",children:[e.jsx("span",{className:"cv2-amount-main tabular",style:{color:h?"#f87171":"var(--text-primary)"},children:t>0?j(t):"—"}),s>0&&e.jsxs("span",{className:"cv2-amount-sub tabular",children:["/ ",j(s)]})]}),e.jsxs("div",{className:"cv2-cell-actions",children:[e.jsx("button",{className:"cv2-icon-btn",style:{color:_?"#34d399":"var(--text-muted)"},onClick:()=>la(a),title:_?"Aktifkan":"Rencanakan",children:e.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:"currentColor",display:"block"}})}),e.jsx("button",{className:"cv2-icon-btn",onClick:()=>{Y(a),M(!0)},title:"Edit",children:e.jsx(ce,{size:11})}),e.jsx("button",{className:"cv2-icon-btn cv2-icon-danger",onClick:()=>T({id:a.id,name:a.name}),title:"Hapus",children:e.jsx(de,{size:11})})]}),s>0&&e.jsx("div",{className:"cv2-mobile-prog",children:e.jsx("div",{className:"cv2-bar-track",children:e.jsx("div",{className:"cv2-bar-fill",style:{width:`${c}%`,background:g}})})})]}),w&&e.jsxs("div",{className:"cv2-quick-row",children:[e.jsx("input",{className:"form-input",type:"date",value:L.date,min:`${r}-01`,max:oe(r),onChange:$=>W(K=>({...K,date:$.target.value}))}),e.jsx(J,{value:L.amount,onChange:$=>W(K=>({...K,amount:$}))}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>Z(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary btn-sm",style:{flex:1},onClick:()=>oa(a.id,a.name),disabled:!L.amount,children:"Catat"})]})]})]},a.id)},ca=a=>{const t=Number(a.budget_limit||0),s=o>0&&t>0?Math.round(t/o*100):null,n=!!a.is_planned;return e.jsxs("div",{className:`cv2-row${n?" cv2-row-dim":""}`,style:{"--rc":a.color||"#f87171"},children:[e.jsxs("div",{className:"cv2-cell-name",children:[e.jsx("span",{className:"cv2-dot",style:{background:a.color||"#f87171"}}),e.jsx("span",{className:"cv2-name",children:a.name}),e.jsx("span",{className:"cv2-tag",style:{background:"rgba(248,113,113,0.1)",color:"#f87171"},children:"wajib"})]}),e.jsx("div",{className:"cv2-cell-bar",children:s?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"cv2-bar-track",children:e.jsx("div",{className:"cv2-bar-fill",style:{width:`${Math.min(s,100)}%`,background:a.color||"#f87171"}})}),e.jsxs("span",{className:"cv2-bar-pct",style:{color:"var(--text-muted)"},children:[s,"%"]})]}):e.jsx("span",{className:"cv2-bar-label",children:"dari gaji"})}),e.jsxs("div",{className:"cv2-cell-amount",children:[e.jsx("span",{className:"cv2-amount-main tabular",children:t>0?j(t):"—"}),e.jsx("span",{className:"cv2-amount-sub",children:"per bulan"})]}),e.jsxs("div",{className:"cv2-cell-actions",children:[e.jsx("button",{className:"cv2-icon-btn",onClick:()=>Xe(a),title:"Ubah Budget",children:e.jsx(ce,{size:11})}),!F(a)&&e.jsx("button",{className:"cv2-icon-btn cv2-icon-danger",onClick:()=>T({id:a.id,name:a.name}),title:"Hapus",children:e.jsx(de,{size:11})})]}),s&&e.jsx("div",{className:"cv2-mobile-prog",children:e.jsx("div",{className:"cv2-bar-track",children:e.jsx("div",{className:"cv2-bar-fill",style:{width:`${Math.min(s,100)}%`,background:a.color||"#f87171"}})})})]},a.id)},da=a=>e.jsxs("div",{className:"cv2-row",style:{"--rc":"#34d399"},children:[e.jsxs("div",{className:"cv2-cell-name",children:[e.jsx("span",{className:"cv2-dot",style:{background:"#34d399"}}),e.jsx("span",{className:"cv2-name",children:a.name}),e.jsx("span",{className:"cv2-tag",style:{background:"rgba(52,211,153,0.1)",color:"#34d399"},children:"pemasukan"})]}),e.jsx("div",{className:"cv2-cell-bar"}),e.jsxs("div",{className:"cv2-cell-amount",children:[e.jsx("span",{className:"cv2-amount-main tabular",style:{color:o>0?"#34d399":"var(--text-muted)"},children:o>0?`+${j(o)}`:"—"}),e.jsx("span",{className:"cv2-amount-sub",children:"bulan ini"})]}),e.jsx("div",{className:"cv2-cell-actions",children:e.jsx("button",{className:"cv2-icon-btn",onClick:()=>{V({amount:y?String(y.amount):"",note:(y==null?void 0:y.description)||"",date:(y==null?void 0:y.date)||`${r}-01`}),E(!0)},title:o>0?"Edit":"Catat",children:o>0?e.jsx(ce,{size:11}):e.jsx(qe,{size:11})})})]},a.id),ma=a=>{const t=ra(a.due_date,a.lunas),s=a.jenis==="piutang"?"#f59e0b":"#f87171";return e.jsxs("div",{className:`cv2-row${a.lunas?" cv2-row-dim":""}`,style:{"--rc":s},children:[e.jsxs("div",{className:"cv2-cell-name",children:[e.jsx("span",{className:"cv2-dot",style:{background:s}}),e.jsx("span",{className:"cv2-name",children:a.nama}),e.jsx("span",{className:"cv2-tag",style:{background:a.jenis==="piutang"?"rgba(245,158,11,0.1)":"rgba(248,113,113,0.1)",color:s},children:a.jenis}),a.lunas&&e.jsx("span",{className:"cv2-tag",style:{background:"rgba(52,211,153,0.1)",color:"#34d399"},children:"lunas"})]}),e.jsx("div",{className:"cv2-cell-bar",children:t&&!a.lunas&&e.jsx("span",{style:{fontSize:"0.62rem",fontWeight:700,color:t.color,background:t.bg||"transparent",padding:t.bg?"2px 7px":"0",borderRadius:99},children:t.label})}),e.jsxs("div",{className:"cv2-cell-amount",children:[e.jsx("span",{className:"cv2-amount-main tabular",style:{color:a.lunas?"var(--text-muted)":s},children:j(a.amount)}),e.jsx("span",{className:"cv2-amount-sub",children:a.sumber})]}),e.jsxs("div",{className:"cv2-cell-actions",children:[!a.lunas&&e.jsx("button",{className:"cv2-icon-btn",style:{color:"#34d399"},onClick:()=>sa(a.id),title:"Tandai Lunas",children:e.jsx(va,{size:11})}),e.jsx("button",{className:"cv2-icon-btn cv2-icon-danger",onClick:()=>re({id:a.id,nama:a.nama}),title:"Hapus",children:e.jsx(de,{size:11})})]})]},a.id)},G=({label:a,sub:t,children:s,onAdd:n})=>e.jsxs("div",{className:"cv2-section",children:[e.jsxs("div",{className:"cv2-section-head",children:[e.jsxs("div",{children:[e.jsx("span",{className:"cv2-section-label",children:a}),t&&e.jsx("span",{className:"cv2-section-sub",children:t})]}),n&&e.jsx("button",{className:"cv2-add-btn",onClick:n,children:e.jsx(qe,{size:11})})]}),e.jsx("div",{className:"cv2-table-body",children:s})]});return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"cv2-page animate-in",children:[o>0&&e.jsxs("div",{className:"cv2-stats-strip",children:[e.jsxs("div",{className:"cv2-stat",children:[e.jsx("span",{className:"cv2-stat-label",children:"Pemasukan"}),e.jsxs("span",{className:"cv2-stat-val",style:{color:"#34d399"},children:["+",j(o)]})]}),e.jsx("div",{className:"cv2-stat-divider"}),e.jsxs("div",{className:"cv2-stat",children:[e.jsx("span",{className:"cv2-stat-label",children:"Wajib"}),e.jsxs("span",{className:"cv2-stat-val",style:{color:"#f87171"},children:["−",j(ae)]})]}),e.jsx("div",{className:"cv2-stat-divider"}),e.jsxs("div",{className:"cv2-stat",children:[e.jsx("span",{className:"cv2-stat-label",children:"Sisa Bebas"}),e.jsx("span",{className:"cv2-stat-val",style:{color:Me>=0?"#34d399":"#f87171"},children:j(Math.abs(Me))})]})]}),e.jsxs(G,{label:"PEMASUKAN",sub:o>0?`Bulan ini: +${j(o)}`:"Belum ada pemasukan",onAdd:()=>{I({description:"",amount:"",date:`${r}-01`}),H(!0)},children:[we.map(da),we.length===0&&!Q&&e.jsx("div",{className:"cv2-empty",children:"Belum ada kategori pemasukan"})]}),e.jsx(G,{label:"PENGELUARAN WAJIB",sub:o>0?`${j(ae)} · ${Math.round(ae/o*100)}% gaji · langsung dipotong`:"Langsung dipotong dari gaji",onAdd:()=>{Y({is_mandatory:!0,color:ie()}),M(!0)},children:Q?[...Array(3)].map((a,t)=>e.jsx("div",{className:"skeleton",style:{height:50,marginBottom:1}},t)):Ce.map(ca)}),e.jsx(G,{label:"HUTANG & PIUTANG",sub:(()=>{const a=D.filter(t=>!t.lunas);return a.length?`${a.length} aktif`:"Tidak ada hutang/piutang aktif"})(),onAdd:()=>R(!0),children:D.length===0?e.jsx("div",{className:"cv2-empty",children:"Tidak ada hutang tercatat"}):D.map(ma)}),e.jsx(G,{label:"PENGELUARAN RUTIN",sub:"Tagihan & langganan bulanan",onAdd:()=>{Y({is_monthly:!0,color:ie()}),M(!0)},children:Q?[...Array(2)].map((a,t)=>e.jsx("div",{className:"skeleton",style:{height:50,marginBottom:1}},t)):_e.length===0?e.jsx("div",{className:"cv2-empty",children:"Belum ada pengeluaran rutin"}):_e.map(Pe)}),e.jsx(G,{label:"KATEGORI LAINNYA",onAdd:()=>{Y({color:ie()}),M(!0)},children:Q?[...Array(2)].map((a,t)=>e.jsx("div",{className:"skeleton",style:{height:50,marginBottom:1}},t)):Se.length===0?e.jsx("div",{className:"cv2-empty",children:"Belum ada kategori lain"}):Se.map(Pe)})]}),A&&e.jsx(Ae,{title:"Hapus Kategori",message:`Hapus "${A.name}"? Transaksi bulan ini untuk kategori ini juga akan terhapus.`,confirmLabel:"Hapus",onConfirm:Ve,onCancel:()=>T(null)}),X&&e.jsx(Ae,{title:"Hapus Hutang",message:`Hapus catatan hutang ke "${X.nama}"?`,confirmLabel:"Hapus",onConfirm:na,onCancel:()=>re(null)}),Je&&e.jsx("div",{className:"modal-overlay",onClick:()=>R(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("h2",{className:"modal-title",children:["Catat ",p.jenis==="hutang"?"Hutang":"Piutang"]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>R(!1),children:e.jsx(O,{size:16})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Jenis"}),e.jsx("div",{style:{display:"flex",gap:8},children:[{val:"hutang",label:"Hutang",sub:"Saya pinjam dari orang"},{val:"piutang",label:"Piutang",sub:"Orang pinjam dari saya"}].map(({val:a,label:t,sub:s})=>e.jsxs("button",{type:"button",className:p.jenis===a?"btn btn-primary btn-sm":"btn btn-secondary btn-sm",style:{flex:1,fontWeight:700,display:"flex",flexDirection:"column",gap:2,height:"auto",padding:"8px 4px"},onClick:()=>B(n=>({...n,jenis:a})),children:[e.jsx("span",{children:t}),e.jsx("span",{style:{fontSize:"0.6rem",fontWeight:500,opacity:.75},children:s})]},a))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:p.jenis==="hutang"?"Dari siapa kamu meminjam":"Siapa yang meminjam darimu"}),e.jsx("input",{className:"form-input",type:"text",placeholder:p.jenis==="hutang"?"Misal: Budi, Bank BCA...":"Misal: Andi, Rudi...",value:p.nama,onChange:a=>B(t=>({...t,nama:a.target.value})),autoFocus:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Berapa"}),e.jsx(J,{value:p.amount,onChange:a=>B(t=>({...t,amount:a}))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Kapan janji dibayar"}),e.jsx("input",{className:"form-input",type:"date",value:p.due_date,onChange:a=>B(t=>({...t,due_date:a.target.value}))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:p.jenis==="hutang"?"Uang masuk ke":"Uang keluar dari"}),e.jsx("div",{style:{display:"flex",gap:8},children:[{val:"saldo",label:"Saldo"},{val:"tabungan",label:"Tabungan"}].map(({val:a,label:t})=>e.jsxs("button",{type:"button",className:p.sumber===a?"btn btn-primary btn-sm":"btn btn-secondary btn-sm",style:{flex:1,fontWeight:700},onClick:()=>B(s=>({...s,sumber:a})),children:[t,a==="tabungan"&&ne[0]&&e.jsx("span",{style:{fontSize:"0.6rem",fontWeight:500,display:"block",marginTop:1,opacity:.8},children:ne[0].name})]},a))})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>R(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:ta,disabled:je||!p.nama.trim()||!p.amount,children:je?"Menyimpan...":"Simpan"})]})]})}),Ge&&e.jsx("div",{className:"modal-overlay",onClick:()=>E(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Pemasukan Bulanan"}),e.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:y?"Edit jumlah atau catatan":"Catat pemasukan bulan ini"})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>E(!1),children:e.jsx(O,{size:16})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Jumlah Pemasukan"}),e.jsx(J,{value:z.amount,onChange:a=>V(t=>({...t,amount:a})),autoFocus:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Tanggal Diterima"}),e.jsx("input",{className:"form-input",type:"date",value:z.date,min:`${r}-01`,max:(()=>{const[a,t]=r.split("-").map(Number);return new Date(a,t,0).toISOString().split("T")[0]})(),onChange:a=>V(t=>({...t,date:a.target.value}))})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Catatan ",e.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400},children:"(opsional)"})]}),e.jsx("textarea",{className:"form-input",rows:2,placeholder:"Misal: Gaji pokok + tunjangan...",value:z.note,onChange:a=>V(t=>({...t,note:a.target.value})),style:{resize:"vertical",fontFamily:"var(--font-sans)",fontSize:"0.875rem"}})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>E(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:ia,disabled:ge,children:ge?"Menyimpan...":"Simpan"})]})]})}),Ke&&e.jsx("div",{className:"modal-overlay",onClick:()=>H(!1),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"modal-title",children:"Tambah Pemasukan"}),e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Dicatat ke bulan ",r]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>H(!1),children:e.jsx(O,{size:16})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Nama Pemasukan"}),e.jsx("input",{className:"form-input",type:"text",placeholder:"Misal: Gaji Pokok, Bonus, Freelance...",value:S.description,onChange:a=>I(t=>({...t,description:a.target.value})),autoFocus:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Jumlah"}),e.jsx(J,{value:S.amount,onChange:a=>I(t=>({...t,amount:a}))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Tanggal"}),e.jsx("input",{className:"form-input",type:"date",value:S.date||`${r}-01`,min:`${r}-01`,max:(()=>{const[a,t]=r.split("-").map(Number);return new Date(a,t,0).toISOString().split("T")[0]})(),onChange:a=>I(t=>({...t,date:a.target.value}))})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>H(!1),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:Ye,disabled:xe||!S.description.trim()||!S.amount,children:xe?"Menyimpan...":"Simpan"})]})]})}),De&&!v&&e.jsx("div",{className:"modal-overlay",onClick:()=>M(!1),children:e.jsxs("div",{className:"modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{className:"modal-title",children:C!=null&&C.id?"Edit Kategori":C!=null&&C.is_mandatory?"Pengeluaran Wajib Baru":C!=null&&C.is_monthly?"Pengeluaran Rutin Baru":"Kategori Baru"}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>M(!1),children:e.jsx(O,{size:16})})]}),e.jsx(fa,{editData:C,salary:o,month:r,onSuccess:()=>{N(),M(!1)},onClose:()=>M(!1)})]})}),v&&(()=>{const a=x.find(t=>t.id===v.id);return e.jsx("div",{className:"modal-overlay",onClick:()=>P(null),children:e.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"modal-title",children:["Budget — ",a==null?void 0:a.name]}),o>0&&e.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Gaji: ",j(o)]})]}),e.jsx("button",{className:"btn btn-ghost",onClick:()=>P(null),children:e.jsx(O,{size:16})})]}),o>0&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsxs("div",{style:{position:"relative",flex:1},children:[e.jsx("input",{className:"form-input",type:"number",placeholder:String(ja),value:v.pct,onChange:t=>Ne(t.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),e.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),v.pct&&o>0&&e.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",j(Math.round(parseFloat(v.pct)/100*o))]})]}),!v.pct&&e.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(t=>e.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>Ne(String(t)),children:[t,"%"]},t))})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),e.jsx(J,{value:v.nominal,onChange:Ze,autoFocus:!o})]}),e.jsxs("div",{className:"flex gap-8 mt-16",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>P(null),children:"Batal"}),e.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:ea,children:"Simpan"})]})]})})})(),e.jsx("style",{children:`
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
      `})]})}export{_a as default};
