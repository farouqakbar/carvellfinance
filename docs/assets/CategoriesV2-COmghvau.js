import{J as De,M as Ke,O as Ge,G as l,E as U,N as Ue,z as ee,F as a,L as Je,D as Oe,B as Ca,H as o,y as v,u as F,C as J,a as te,j as _a,s as Sa,o as se,g as Qe}from"./index-CWdwqngj.js";import{C as Ye}from"./CategoryForm-7KMsxt71.js";import{a as ne,d as Ve,f as Xe,c as Ze,e as at,C as re,b as za}from"./ConfirmModal-Cu6xwab8.js";const et=15,ie=["#6366f1","#3b82f6","#06b6d4","#10b981","#f59e0b","#f97316","#ef4444","#ec4899","#a855f7"];function tt(m){const[R,u]=m.split("-").map(Number),y=new Date(R,u-2,1);return`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`}function st(m){const[R,u]=m.split("-").map(Number),y=new Date(R,u,1);return`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`}function ot(){var Xa;const{user:m}=De(),{setHeader:R}=Ke(),u=Ge(),[y,le]=l.useState([]),[oe,ce]=l.useState({}),[g,de]=l.useState(0),[O,Pa]=l.useState(!0),[me,T]=l.useState(!1),[b,Q]=l.useState(null),[z,I]=l.useState(null),[C,Y]=l.useState({amount:"",date:U(),kantongId:""}),[V,da]=l.useState(!1),[X,Z]=l.useState(null),[Ta,ue]=l.useState({}),[nt,ge]=l.useState(0),[L,aa]=l.useState(null),[pe]=Ue(),[r,Ma]=l.useState(()=>pe.get("month")||ee()),[va,he]=l.useState(null),[P,xe]=l.useState(null),[be,ea]=l.useState(!1),[q,ma]=l.useState({amount:"",note:"",date:""}),[Ba,Fa]=l.useState(!1),[ve,ta]=l.useState(!1),[M,sa]=l.useState({description:"",amount:"",date:""}),[$a,Aa]=l.useState(!1),Ia=r===ee(),qa=!!m.recording_start_month&&r<=m.recording_start_month,[ua,fe]=l.useState([]),[j,je]=l.useState([]),[ye,na]=l.useState(!1),[x,D]=l.useState({jenis:"hutang",nama:"",amount:"",due_date:"",sumber:"saldo"}),[Ea,Ha]=l.useState(!1),[ga,fa]=l.useState(null),[N,ra]=l.useState(null),[E,$]=l.useState(null),[pa,K]=l.useState(null),[Wa,Ra]=l.useState(!1),[Ne,ha]=l.useState(null),[ia,la]=l.useState({date:"",amount:""});l.useEffect(()=>{_()},[r]),l.useEffect(()=>{ba()},[r]),l.useEffect(()=>(R(a.jsxs(a.Fragment,{children:[a.jsxs(Je,{to:`/dashboard?month=${r}`,className:"topbar-back-btn",children:["‹ ",a.jsx("span",{className:"back-label",children:"Dashboard"})]}),a.jsxs("div",{className:"month-nav-group",children:[a.jsx("button",{className:"month-btn",onClick:()=>Ma(tt(r)),disabled:qa,children:"‹"}),a.jsx("span",{className:"month-label-text",children:Oe(r)}),a.jsx("button",{className:"month-btn",onClick:()=>Ma(st(r)),disabled:Ia,children:"›"})]})]})),()=>R(null)),[r,Ia,qa]);const xa=()=>ie[y.length%ie.length],_=async()=>{Pa(!0);const e=`${r}-01`,t=Ca(r),[s,n]=await Promise.all([o.from("categories").select("*").eq("user_id",m.id).is("month",null),o.from("categories").select("*").eq("user_id",m.id).eq("month",r)]),d=[...s.data||[],...n.data||[]].sort((i,A)=>i.name.localeCompare(A.name)),c=new Set,p=d.filter(i=>c.has(i.name)?!1:(c.add(i.name),!0)),[f,h,k,w,B,S,oa]=await Promise.all([o.from("transactions").select("category_id, amount").eq("user_id",m.id).eq("type","expense").gte("date",e).lte("date",t),o.from("transactions").select("id, category_id, amount, description, date").eq("user_id",m.id).eq("type","income").gte("date",e).lte("date",t),o.from("category_budgets").select("category_id, budget_limit").eq("user_id",m.id).eq("month",r),o.from("savings").select("id, name, current_amount").eq("user_id",m.id).order("name"),o.from("category_budgets").select("category_id, budget_limit, categories(category_type, name)").eq("user_id",m.id).lte("month",r),o.from("hutang").select("amount").eq("user_id",m.id).eq("sumber","tabungan").eq("lunas",!1),o.from("savings_ledger").select("savings_id, amount").eq("user_id",m.id).lte("month",r)]),ya={};(k.data||[]).forEach(i=>{ya[i.category_id]=Number(i.budget_limit)});const Na={};(f.data||[]).forEach(i=>{i.category_id&&(Na[i.category_id]=(Na[i.category_id]||0)+Number(i.amount))});const We=(p||[]).map(i=>({...i,budget_limit:ya[i.id]!==void 0?ya[i.id]:0})),ca=(p||[]).find(i=>ne(i)),Za=ca?(h.data||[]).filter(i=>i.category_id===ca.id):[];le(We),ce(Na),de(Za.reduce((i,A)=>i+Number(A.amount),0)),he((ca==null?void 0:ca.id)||null),xe(Za[0]||null);const ka={};(oa.data||[]).forEach(i=>{ka[i.savings_id]=(ka[i.savings_id]||0)+Number(i.amount)});const Re=(w.data||[]).map(i=>({...i,ledger_amount:ka[i.id]??null}));je(Re);const wa={};(B.data||[]).filter(i=>{var A,ae;return((A=i.categories)==null?void 0:A.category_type)==="savings"||((ae=i.categories)==null?void 0:ae.name)==="Tabungan Bulanan"}).forEach(i=>{wa[i.category_id]=(wa[i.category_id]||0)+Number(i.budget_limit)}),ue(wa);const Le=(S.data||[]).reduce((i,A)=>i+Number(A.amount),0);ge(Le),Pa(!1)},ba=async()=>{const[e,t]=await Promise.all([o.from("hutang").select("*").eq("user_id",m.id).eq("month",r).order("due_date",{ascending:!0,nullsFirst:!1}),o.from("hutang").select("*").eq("user_id",m.id).lt("month",r).eq("lunas",!1).order("due_date",{ascending:!0,nullsFirst:!1})]);fe([...t.data||[],...e.data||[]])},ke=async()=>{const e=parseFloat(M.amount)||0;if(!(!e||!M.description.trim())){Aa(!0);try{let t=va;if(!t){const{data:n,error:d}=await o.from("categories").insert({user_id:m.id,name:"Pemasukan Bulanan",color:"#22c55e",icon:"",is_mandatory:!1,budget_limit:0,category_type:"income"}).select().single();if(d)throw d;t=n.id}const{error:s}=await o.from("transactions").insert({user_id:m.id,category_id:t,type:"income",amount:e,description:M.description.trim(),date:M.date||`${r}-01`});if(s)throw s;u("Pemasukan dicatat","success"),ta(!1),sa({description:"",amount:"",date:`${r}-01`}),_()}catch(t){u(t.message,"error")}finally{Aa(!1)}}},we=async()=>{const e=y.find(p=>p.id===L.id);if(e&&za(e)){u("Kategori ini tidak bisa dihapus","error"),aa(null);return}const t=`${r}-01`,s=Ca(r),[n,d]=await Promise.all([o.from("transactions").delete().eq("category_id",L.id).gte("date",t).lte("date",s),o.from("category_budgets").delete().eq("category_id",L.id).eq("month",r)]);if(n.error||d.error){u((n.error||d.error).message,"error");return}const{error:c}=await o.from("categories").delete().eq("id",L.id);if(c){u(c.message,"error");return}u("Kategori dihapus","success"),aa(null),_()},Ce=e=>{const t=String(Math.round(e.budget_limit||0)),s=g>0&&e.budget_limit>0?(e.budget_limit/g*100).toFixed(1):"";I({id:e.id,nominal:t,pct:s})},_e=e=>{var s;const t=j.find(n=>n.name.toLowerCase()===e.name.toLowerCase());Y({amount:"",date:U(),kantongId:(t==null?void 0:t.id)||((s=j[0])==null?void 0:s.id)||""}),Z(e)},ja=async(e,t,s)=>{const n=s.substring(0,7);await o.from("savings_ledger").insert({user_id:m.id,savings_id:e,amount:t,month:n,date:s})},Se=async()=>{var c;if(!X)return;if(!C.amount||parseFloat(C.amount)<=0){u("Masukkan jumlah pengeluaran","error");return}da(!0);let e=C.kantongId||((c=j[0])==null?void 0:c.id),t=j.find(p=>p.id===e)||j[0];if(!t){const p=Ta[X.id]||0,{data:f,error:h}=await o.from("savings").insert({user_id:m.id,name:X.name,current_amount:p,target_amount:0}).select("id, name, current_amount").single();if(h){u("Gagal buat kantong: "+h.message,"error"),da(!1);return}t=f}const s=parseFloat(C.amount),n=Math.max(0,Number(t.current_amount)-s),{error:d}=await o.from("savings").update({current_amount:n}).eq("id",t.id);if(d){u(d.message,"error"),da(!1);return}await ja(t.id,-s,C.date||U()),u("Pengeluaran tabungan dicatat ✓","success"),Y(p=>({amount:"",date:U(),kantongId:p.kantongId})),da(!1),Z(null),_()},ze=e=>{const t=parseFloat(e)||0;I(s=>({...s,nominal:e,pct:g>0&&t>0?(t/g*100).toFixed(1):""}))},La=e=>{const t=parseFloat(e)||0;I(s=>({...s,pct:e,nominal:g>0&&t>0?String(Math.round(t/100*g)):""}))},Pe=async()=>{const e=parseFloat(z.nominal)||0,t=await o.from("categories").update({budget_limit:e}).eq("id",z.id);if(t.error){u(t.error.message,"error");return}let s=null;if(e>0){const{error:n}=await o.from("category_budgets").upsert({user_id:m.id,category_id:z.id,month:r,budget_limit:e},{onConflict:"category_id,month"});s=n}else{const{error:n}=await o.from("category_budgets").delete().eq("user_id",m.id).eq("category_id",z.id).eq("month",r);s=n}if(s){u(s.message,"error");return}u("Budget disimpan","success"),I(null),_()},Te=async(e,t,s,n,d)=>{const c=new Date().toISOString().split("T")[0],p=e==="hutang";let f=null;if(t==="saldo"){const{data:h,error:k}=await o.from("transactions").insert({user_id:m.id,amount:n,category_id:null,type:p?"income":"expense",description:p?`Hutang dari ${d}`:`Piutang ke ${d}`,date:c}).select("id").single();if(k)throw k;f=(h==null?void 0:h.id)||null}else if(t==="tabungan"&&s){const{data:h,error:k}=await o.from("savings").select("current_amount").eq("id",s).single();if(k)throw k;const w=p?n:-n,B=Math.max(0,Number(h.current_amount)+w),{error:S}=await o.from("savings").update({current_amount:B}).eq("id",s);if(S)throw S;await ja(s,w,c)}return f},Da=async(e,t,s,n,d,c)=>{const p=new Date().toISOString().split("T")[0],f=e==="hutang";if(t==="saldo")if(c){const{error:h}=await o.from("transactions").delete().eq("id",c);if(h)throw h}else{const{error:h}=await o.from("transactions").insert({user_id:m.id,amount:n,category_id:null,type:f?"expense":"income",description:f?`Bayar hutang ke ${d}`:`Terima piutang dari ${d}`,date:p});if(h)throw h}else if(t==="tabungan"&&s){const{data:h,error:k}=await o.from("savings").select("current_amount").eq("id",s).single();if(k)throw k;if(h){const w=f?-n:n,B=Math.max(0,Number(h.current_amount)+w),{error:S}=await o.from("savings").update({current_amount:B}).eq("id",s);if(S)throw S;await ja(s,w,p)}}},Me=async()=>{var t;const e=parseFloat(x.amount)||0;if(!(!x.nama.trim()||!e)){Ha(!0);try{let s=x.sumber==="tabungan"&&((t=j[0])==null?void 0:t.id)||null;if(x.sumber==="tabungan"&&!s){const c=x.jenis==="hutang"?0:m.tabungan_awal||0,{data:p}=await o.from("savings").insert({user_id:m.id,name:"Tabungan",current_amount:c,target_amount:0}).select("id").single();p&&(s=p.id,await _())}const n=await Te(x.jenis,x.sumber,s,e,x.nama.trim()),{error:d}=await o.from("hutang").insert({user_id:m.id,jenis:x.jenis,nama:x.nama.trim(),amount:e,due_date:x.due_date||null,sumber:x.sumber,savings_id:s,linked_tx_id:n,month:r});if(d)throw d;u(x.jenis==="hutang"?"Hutang dicatat":"Piutang dicatat","success"),na(!1),D({jenis:"hutang",nama:"",amount:"",due_date:"",sumber:"saldo"}),ba(),_()}catch(s){u(s.message,"error")}finally{Ha(!1)}}},Be=async(e,t,s)=>{Ra(!0);try{await Da(e.jenis,t,s,Number(e.amount),e.nama,null);const{error:n}=await o.from("hutang").update({lunas:!0}).eq("id",e.id);if(n)throw n;u(e.jenis==="hutang"?"Hutang ditandai lunas":"Piutang diterima","success"),ra(null),$(null),K(null),ba(),_()}catch(n){u(n.message,"error")}finally{Ra(!1)}},Fe=async()=>{const e=ua.find(t=>t.id===ga.id);if(e)try{e.lunas||await Da(e.jenis,e.sumber,e.savings_id,Number(e.amount),e.nama,e.linked_tx_id);const{error:t}=await o.from("hutang").delete().eq("id",ga.id);if(t)throw t;u("Dihapus","success"),fa(null),ba(),_()}catch(t){u(t.message,"error")}},$e=(e,t)=>{if(t)return{label:"Lunas",color:"#34d399",bg:"rgba(52,211,153,0.1)"};if(!e)return null;const s=new Date;s.setHours(0,0,0,0);const n=new Date(e),d=Math.round((n-s)/864e5);return d<0?{label:`Terlambat ${Math.abs(d)}h`,color:"#f87171",bg:"rgba(248,113,113,0.1)"}:d===0?{label:"Hari ini!",color:"#f87171",bg:"rgba(248,113,113,0.1)"}:d<=7?{label:`${d} hari lagi`,color:"#fbbf24",bg:"rgba(251,191,36,0.1)"}:{label:`${d} hari lagi`,color:"var(--text-muted)",bg:null}},Ae=async()=>{const e=parseFloat(q.amount.replace(/\D/g,""))||0;if(va){Fa(!0);try{const t=q.date||`${r}-01`;if(P){const{error:s}=await o.from("transactions").update({amount:e,description:q.note,date:t}).eq("id",P.id);if(s)throw s}else{const{error:s}=await o.from("transactions").insert({user_id:m.id,category_id:va,type:"income",amount:e,description:q.note,date:t});if(s)throw s}u("Pemasukan disimpan","success"),ea(!1),_()}catch(t){u(t.message,"error")}finally{Fa(!1)}}},Ie=async e=>{const{error:t}=await o.from("categories").update({is_planned:!e.is_planned}).eq("id",e.id);if(t){u(t.message,"error");return}u(e.is_planned?"Kategori diaktifkan":"Dipindah ke perencanaan","success"),_()},qe=async(e,t)=>{const s=parseFloat(ia.amount)||0;if(!s)return;const{error:n}=await o.from("transactions").insert({user_id:m.id,category_id:e,type:"expense",amount:s,description:t,date:ia.date||`${r}-01`});if(n){u(n.message,"error");return}u("Transaksi dicatat","success"),ha(null),la({date:"",amount:""}),_()},Ka=y.filter(e=>ne(e)),Ga=y.filter(e=>Ve(e)),Ua=y.filter(e=>Xe(e)),Ja=y.filter(e=>Ze(e)),Oa=y.filter(e=>at(e)),H=Ga.reduce((e,t)=>e+Number(t.budget_limit||0),0),W=Ua.reduce((e,t)=>e+Number(t.budget_limit||0),0),Qa=g-H-W,Ya=e=>{const t=oe[e.id]||0,s=Number(e.budget_limit||0),n=s>0?t/s*100:0,d=Math.min(n,100),c=n>100,p=!c&&n>=80,f=!c&&n>=100,h=c?"#f87171":f?"#34d399":p?"#fbbf24":e.color||"var(--accent)",k=c?"#f87171":p?"#fbbf24":f?"#34d399":"var(--text-muted)",w=!!e.is_planned,B=Ne===e.id;return a.jsxs("div",{children:[a.jsxs("div",{className:`cv2-row${w?" cv2-row-dim":""}`,style:{"--rc":e.color||"var(--accent)"},children:[a.jsxs("div",{className:"cv2-cell-name",children:[a.jsx("span",{className:"cv2-dot",style:{background:e.color||"var(--accent)"}}),a.jsx("span",{className:"cv2-name",children:e.name}),w&&a.jsx("span",{className:"cv2-tag",style:{background:"rgba(255,255,255,0.05)",color:"var(--text-muted)"},children:"plan"})]}),a.jsxs("div",{className:"cv2-cell-bar",children:[s>0?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"cv2-bar-track",children:a.jsx("div",{className:"cv2-bar-fill",style:{width:`${d}%`,background:h}})}),a.jsx("span",{className:"cv2-bar-pct",style:{color:k},children:c?`+${Math.round(n-100)}%`:`${Math.round(n)}%`})]}):t>0?a.jsx("span",{className:"cv2-bar-label",children:"no budget"}):a.jsx("span",{className:"cv2-bar-cta",onClick:()=>{ha(e.id),la({date:U(),amount:""})},children:"+ catat"}),s>0&&!t&&a.jsx("span",{className:"cv2-bar-cta",style:{marginLeft:8},onClick:()=>{ha(e.id),la({date:U(),amount:""})},children:"+ catat"})]}),a.jsxs("div",{className:"cv2-cell-amount",children:[a.jsx("span",{className:"cv2-amount-main tabular",style:{color:c?"#f87171":"var(--text-primary)"},children:t>0?v(t):"—"}),s>0&&a.jsxs("span",{className:"cv2-amount-sub tabular",children:["/ ",v(s)]})]}),a.jsxs("div",{className:"cv2-cell-actions",children:[a.jsx("button",{className:"cv2-icon-btn",style:{color:w?"#34d399":"var(--text-muted)"},onClick:()=>Ie(e),title:w?"Aktifkan":"Rencanakan",children:a.jsx("span",{style:{width:6,height:6,borderRadius:"50%",background:"currentColor",display:"block"}})}),a.jsx("button",{className:"cv2-icon-btn",onClick:()=>{Q(e),T(!0)},title:"Edit",children:a.jsx(_a,{size:11})}),!za(e)&&a.jsx("button",{className:"cv2-icon-btn cv2-icon-danger",onClick:()=>aa({id:e.id,name:e.name}),title:"Hapus",children:a.jsx(Sa,{size:11})})]}),s>0&&a.jsx("div",{className:"cv2-mobile-prog",children:a.jsx("div",{className:"cv2-bar-track",children:a.jsx("div",{className:"cv2-bar-fill",style:{width:`${d}%`,background:h}})})})]}),B&&a.jsxs("div",{className:"cv2-quick-row",children:[a.jsx("input",{className:"form-input",type:"date",value:ia.date,min:`${r}-01`,max:Ca(r),onChange:S=>la(oa=>({...oa,date:S.target.value}))}),a.jsx(J,{value:ia.amount,onChange:S=>la(oa=>({...oa,amount:S}))}),a.jsxs("div",{style:{display:"flex",gap:6},children:[a.jsx("button",{className:"btn btn-ghost btn-sm",onClick:()=>ha(null),children:"Batal"}),a.jsx("button",{className:"btn btn-primary btn-sm",style:{flex:1},onClick:()=>qe(e.id,e.name),disabled:!ia.amount,children:"Catat"})]})]})]},e.id)},Va=(e,t="wajib")=>{const s=Number(e.budget_limit||0),n=g>0&&s>0?Math.round(s/g*100):null,d=!!e.is_planned,c=t==="savings",p=c?j.find(S=>S.name.toLowerCase()===e.name.toLowerCase()):null,f=c?(Ta[e.id]||0)+((p==null?void 0:p.ledger_amount)||0):0,h=c?e.color||"#6366f1":e.color||"#f87171",k=c?"rgba(99,102,241,0.1)":"rgba(248,113,113,0.1)",w=c?"#818cf8":"#f87171",B=c?"tabungan":"wajib";return a.jsxs("div",{className:`cv2-row${d?" cv2-row-dim":""}`,style:{"--rc":h},children:[a.jsxs("div",{className:"cv2-cell-name",children:[a.jsx("span",{className:"cv2-dot",style:{background:h}}),a.jsx("span",{className:"cv2-name",children:e.name}),a.jsx("span",{className:"cv2-tag",style:{background:k,color:w},children:B})]}),a.jsx("div",{className:"cv2-cell-bar",children:n?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"cv2-bar-track",children:a.jsx("div",{className:"cv2-bar-fill",style:{width:`${Math.min(n,100)}%`,background:h}})}),a.jsxs("span",{className:"cv2-bar-pct",style:{color:"var(--text-muted)"},children:[n,"%"]})]}):a.jsx("span",{className:"cv2-bar-label",children:"dari gaji"})}),a.jsx("div",{className:"cv2-cell-amount",children:c?a.jsxs(a.Fragment,{children:[a.jsx("span",{className:"cv2-amount-main tabular",style:{color:"#818cf8"},children:f>0?v(f):"—"}),a.jsx("span",{className:"cv2-amount-sub tabular",children:s>0?`+${v(s)}/bln`:"belum diatur"})]}):a.jsxs(a.Fragment,{children:[a.jsx("span",{className:"cv2-amount-main tabular",children:s>0?v(s):"—"}),a.jsx("span",{className:"cv2-amount-sub",children:"per bulan"})]})}),a.jsxs("div",{className:"cv2-cell-actions",children:[c&&a.jsx("button",{className:"cv2-icon-btn cv2-icon-danger cv2-sav-withdraw-btn",onClick:()=>_e(e),title:"Catat pengeluaran tabungan",children:a.jsx(te,{size:11})}),a.jsx("button",{className:"cv2-icon-btn",onClick:()=>Ce(e),title:"Ubah Budget",children:a.jsx(_a,{size:11})}),!za(e)&&a.jsx("button",{className:"cv2-icon-btn cv2-icon-danger",onClick:()=>aa({id:e.id,name:e.name}),title:"Hapus",children:a.jsx(Sa,{size:11})})]}),n&&a.jsx("div",{className:"cv2-mobile-prog",children:a.jsx("div",{className:"cv2-bar-track",children:a.jsx("div",{className:"cv2-bar-fill",style:{width:`${Math.min(n,100)}%`,background:h}})})})]},e.id)},Ee=e=>a.jsxs("div",{className:"cv2-row",style:{"--rc":"#34d399"},children:[a.jsxs("div",{className:"cv2-cell-name",children:[a.jsx("span",{className:"cv2-dot",style:{background:"#34d399"}}),a.jsx("span",{className:"cv2-name",children:e.name}),a.jsx("span",{className:"cv2-tag",style:{background:"rgba(52,211,153,0.1)",color:"#34d399"},children:"pemasukan"})]}),a.jsx("div",{className:"cv2-cell-bar"}),a.jsxs("div",{className:"cv2-cell-amount",children:[a.jsx("span",{className:"cv2-amount-main tabular",style:{color:g>0?"#34d399":"var(--text-muted)"},children:g>0?`+${v(g)}`:"—"}),a.jsx("span",{className:"cv2-amount-sub",children:"bulan ini"})]}),a.jsx("div",{className:"cv2-cell-actions",children:a.jsx("button",{className:"cv2-icon-btn",onClick:()=>{ma({amount:P?String(P.amount):"",note:(P==null?void 0:P.description)||"",date:(P==null?void 0:P.date)||`${r}-01`}),ea(!0)},title:g>0?"Edit":"Catat",children:g>0?a.jsx(_a,{size:11}):a.jsx(se,{size:11})})})]},e.id),He=e=>{const t=$e(e.due_date,e.lunas),s=e.jenis==="piutang"?"#f59e0b":"#f87171";return a.jsxs("div",{className:`cv2-row${e.lunas?" cv2-row-dim":""}`,style:{"--rc":s},children:[a.jsxs("div",{className:"cv2-cell-name",children:[a.jsx("span",{className:"cv2-dot",style:{background:s}}),a.jsx("span",{className:"cv2-name",children:e.nama}),a.jsx("span",{className:"cv2-tag",style:{background:e.jenis==="piutang"?"rgba(245,158,11,0.1)":"rgba(248,113,113,0.1)",color:s},children:e.jenis}),e.lunas&&a.jsx("span",{className:"cv2-tag",style:{background:"rgba(52,211,153,0.1)",color:"#34d399"},children:"lunas"})]}),a.jsx("div",{className:"cv2-cell-bar",children:t&&!e.lunas&&a.jsx("span",{style:{fontSize:"0.62rem",fontWeight:700,color:t.color,background:t.bg||"transparent",padding:t.bg?"2px 7px":"0",borderRadius:99},children:t.label})}),a.jsxs("div",{className:"cv2-cell-amount",children:[a.jsx("span",{className:"cv2-amount-main tabular",style:{color:e.lunas?"var(--text-muted)":s},children:v(e.amount)}),a.jsx("span",{className:"cv2-amount-sub",children:e.sumber})]}),a.jsxs("div",{className:"cv2-cell-actions",children:[!e.lunas&&a.jsx("button",{className:"cv2-icon-btn",style:{color:"#34d399"},onClick:()=>{ra(e),$(null),K(null)},title:"Tandai Lunas",children:a.jsx(Qe,{size:11})}),a.jsx("button",{className:"cv2-icon-btn cv2-icon-danger",onClick:()=>fa({id:e.id,nama:e.nama}),title:"Hapus",children:a.jsx(Sa,{size:11})})]})]},e.id)},G=({label:e,sub:t,children:s,onAdd:n})=>a.jsxs("div",{className:"cv2-section",children:[a.jsxs("div",{className:"cv2-section-head",children:[a.jsxs("div",{children:[a.jsx("span",{className:"cv2-section-label",children:e}),t&&a.jsx("span",{className:"cv2-section-sub",children:t})]}),n&&a.jsx("button",{className:"cv2-add-btn",onClick:n,children:a.jsx(se,{size:11})})]}),a.jsx("div",{className:"cv2-table-body",children:s})]});return a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"cv2-page animate-in",children:[g>0&&a.jsxs("div",{className:"cv2-stats-strip",children:[a.jsxs("div",{className:"cv2-stat",children:[a.jsx("span",{className:"cv2-stat-label",children:"Pemasukan"}),a.jsxs("span",{className:"cv2-stat-val",style:{color:"#34d399"},children:["+",v(g)]})]}),a.jsx("div",{className:"cv2-stat-divider"}),a.jsxs("div",{className:"cv2-stat",children:[a.jsx("span",{className:"cv2-stat-label",children:"Tabungan"}),a.jsx("span",{className:"cv2-stat-val",style:{color:H>0?"#6366f1":"var(--text-muted)"},children:H>0?`−${v(H)}`:"—"})]}),a.jsx("div",{className:"cv2-stat-divider"}),a.jsxs("div",{className:"cv2-stat",children:[a.jsx("span",{className:"cv2-stat-label",children:"Wajib"}),a.jsx("span",{className:"cv2-stat-val",style:{color:W>0?"#f87171":"var(--text-muted)"},children:W>0?`−${v(W)}`:"—"})]}),a.jsx("div",{className:"cv2-stat-divider"}),a.jsxs("div",{className:"cv2-stat",children:[a.jsx("span",{className:"cv2-stat-label",children:"Sisa Bebas"}),a.jsx("span",{className:"cv2-stat-val",style:{color:Qa>=0?"#34d399":"#f87171"},children:v(Math.abs(Qa))})]})]}),a.jsxs(G,{label:"PEMASUKAN",sub:g>0?`Bulan ini: +${v(g)}`:"Belum ada pemasukan",onAdd:()=>{sa({description:"",amount:"",date:`${r}-01`}),ta(!0)},children:[Ka.map(Ee),Ka.length===0&&!O&&a.jsx("div",{className:"cv2-empty",children:"Belum ada kategori pemasukan"})]}),a.jsx(G,{label:"TABUNGAN",sub:H>0?`${v(H)} · ${g>0?`${Math.round(H/g*100)}% gaji · `:""}auto-deduct`:"Alokasi tabungan bulanan",onAdd:()=>{Q({is_mandatory:!0,category_type:"savings",color:xa()}),T(!0)},children:O?[...Array(2)].map((e,t)=>a.jsx("div",{className:"skeleton",style:{height:50,marginBottom:1}},t)):Ga.map(e=>Va(e,"savings"))}),a.jsx(G,{label:"HUTANG & PIUTANG",sub:(()=>{const e=ua.filter(t=>!t.lunas);return e.length?`${e.length} aktif`:"Tidak ada hutang/piutang aktif"})(),onAdd:()=>na(!0),children:ua.length===0?a.jsx("div",{className:"cv2-empty",children:"Tidak ada hutang tercatat"}):ua.map(He)}),a.jsx(G,{label:"PENGELUARAN WAJIB",sub:g>0&&W>0?`${v(W)} · ${Math.round(W/g*100)}% gaji · langsung dipotong`:"Langsung dipotong dari gaji",onAdd:()=>{Q({is_mandatory:!0,category_type:"wajib",color:xa()}),T(!0)},children:O?[...Array(2)].map((e,t)=>a.jsx("div",{className:"skeleton",style:{height:50,marginBottom:1}},t)):Ua.map(e=>Va(e,"wajib"))}),a.jsx(G,{label:"PENGELUARAN RUTIN",sub:"Tagihan & langganan bulanan",onAdd:()=>{Q({is_monthly:!0,category_type:"rutin",color:xa()}),T(!0)},children:O?[...Array(2)].map((e,t)=>a.jsx("div",{className:"skeleton",style:{height:50,marginBottom:1}},t)):Ja.length===0?a.jsx("div",{className:"cv2-empty",children:"Belum ada pengeluaran rutin"}):Ja.map(Ya)}),a.jsx(G,{label:"PENGELUARAN TAMBAHAN",onAdd:()=>{Q({category_type:"tambahan",color:xa()}),T(!0)},children:O?[...Array(2)].map((e,t)=>a.jsx("div",{className:"skeleton",style:{height:50,marginBottom:1}},t)):Oa.length===0?a.jsx("div",{className:"cv2-empty",children:"Belum ada pengeluaran tambahan"}):Oa.map(Ya)})]}),L&&a.jsx(re,{title:"Hapus Kategori",message:`Hapus "${L.name}"? Transaksi bulan ini untuk kategori ini juga akan terhapus.`,confirmLabel:"Hapus",onConfirm:we,onCancel:()=>aa(null)}),N&&a.jsx("div",{className:"modal-overlay",onClick:()=>{ra(null),$(null),K(null)},children:a.jsxs("div",{className:"modal",style:{maxWidth:360},onClick:e=>e.stopPropagation(),children:[!E&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"modal-header",children:[a.jsxs("div",{children:[a.jsx("h2",{className:"modal-title",children:N.jenis==="hutang"?"Hutang Terbayar":"Piutang Diterima"}),a.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:[N.nama," · ",v(N.amount)]})]}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>ra(null),children:a.jsx(F,{size:16})})]}),a.jsx("p",{style:{fontSize:"0.78rem",color:"var(--text-muted)",marginBottom:14},children:N.jenis==="hutang"?"Bayar dari mana?":"Uang masuk ke mana?"}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[a.jsxs("button",{className:"btn btn-secondary",style:{justifyContent:"flex-start",gap:10},onClick:()=>$("tabungan"),children:[a.jsx("span",{style:{fontSize:"1rem"},children:"🏦"}),a.jsxs("div",{style:{textAlign:"left"},children:[a.jsx("div",{style:{fontWeight:700,fontSize:"0.82rem"},children:"Tabungan"}),a.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)",fontWeight:400},children:N.jenis==="hutang"?"Kurangi dari kantong tabungan":"Tambah ke kantong tabungan"})]})]}),a.jsxs("button",{className:"btn btn-secondary",style:{justifyContent:"flex-start",gap:10},onClick:()=>$("saldo"),children:[a.jsx("span",{style:{fontSize:"1rem"},children:"💳"}),a.jsxs("div",{style:{textAlign:"left"},children:[a.jsx("div",{style:{fontWeight:700,fontSize:"0.82rem"},children:"Saldo"}),a.jsx("div",{style:{fontSize:"0.65rem",color:"var(--text-muted)",fontWeight:400},children:N.jenis==="hutang"?"Bayar langsung dari saldo":"Terima ke saldo"})]})]})]})]}),E==="tabungan"&&!pa&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"modal-header",children:[a.jsxs("div",{children:[a.jsx("h2",{className:"modal-title",children:"Pilih Tabungan"}),a.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:v(N.amount)})]}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>$(null),children:a.jsx(F,{size:16})})]}),a.jsx("div",{className:"wajib-rows",children:j.map(e=>a.jsxs("div",{className:"wajib-row",style:{cursor:"pointer"},onClick:()=>K(e.id),children:[a.jsx("span",{className:"brow-name",children:e.name}),a.jsx("span",{className:"wajib-amount tabular",style:{color:Number(e.current_amount)>=Number(N.amount)?"#34d399":"#f87171"},children:v(Number(e.current_amount))})]},e.id))})]}),E&&(E==="saldo"||pa)&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h2",{className:"modal-title",children:"Konfirmasi"}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>{E==="saldo"?$(null):K(null)},children:a.jsx(F,{size:16})})]}),a.jsxs("div",{style:{fontSize:"0.82rem",color:"var(--text-muted)",lineHeight:1.6,marginBottom:16},children:["Tandai ",N.jenis," ke ",a.jsx("strong",{style:{color:"var(--text-primary)"},children:N.nama})," sebesar"," ",a.jsx("strong",{style:{color:N.jenis==="hutang"?"#f87171":"#f59e0b"},children:v(N.amount)})," sebagai ",a.jsx("strong",{style:{color:"#34d399"},children:"lunas"}),E==="tabungan"&&a.jsxs(a.Fragment,{children:[" dari tabungan ",a.jsx("strong",{style:{color:"var(--text-primary)"},children:(Xa=j.find(e=>e.id===pa))==null?void 0:Xa.name})]}),"?"]}),a.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"flex-end"},children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>{ra(null),$(null),K(null)},children:"Batal"}),a.jsx("button",{className:"btn btn-primary",disabled:Wa,onClick:()=>Be(N,E,pa),children:Wa?"Menyimpan...":"Konfirmasi Lunas"})]})]})]})}),ga&&a.jsx(re,{title:"Hapus Hutang",message:`Hapus catatan hutang ke "${ga.nama}"?`,confirmLabel:"Hapus",onConfirm:Fe,onCancel:()=>fa(null)}),ye&&a.jsx("div",{className:"modal-overlay",onClick:()=>na(!1),children:a.jsxs("div",{className:"modal",style:{maxWidth:400},onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsxs("h2",{className:"modal-title",children:["Catat ",x.jenis==="hutang"?"Hutang":"Piutang"]}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>na(!1),children:a.jsx(F,{size:16})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Jenis"}),a.jsx("div",{style:{display:"flex",gap:8},children:[{val:"hutang",label:"Hutang",sub:"Saya pinjam dari orang"},{val:"piutang",label:"Piutang",sub:"Orang pinjam dari saya"}].map(({val:e,label:t,sub:s})=>a.jsxs("button",{type:"button",className:x.jenis===e?"btn btn-primary btn-sm":"btn btn-secondary btn-sm",style:{flex:1,fontWeight:700,display:"flex",flexDirection:"column",gap:2,height:"auto",padding:"8px 4px"},onClick:()=>D(n=>({...n,jenis:e})),children:[a.jsx("span",{children:t}),a.jsx("span",{style:{fontSize:"0.6rem",fontWeight:500,opacity:.75},children:s})]},e))})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:x.jenis==="hutang"?"Dari siapa kamu meminjam":"Siapa yang meminjam darimu"}),a.jsx("input",{className:"form-input",type:"text",placeholder:x.jenis==="hutang"?"Misal: Budi, Bank BCA...":"Misal: Andi, Rudi...",value:x.nama,onChange:e=>D(t=>({...t,nama:e.target.value})),autoFocus:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Berapa"}),a.jsx(J,{value:x.amount,onChange:e=>D(t=>({...t,amount:e}))})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Kapan janji dibayar"}),a.jsx("input",{className:"form-input",type:"date",value:x.due_date,onChange:e=>D(t=>({...t,due_date:e.target.value}))})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:x.jenis==="hutang"?"Uang masuk ke":"Uang keluar dari"}),a.jsx("div",{style:{display:"flex",gap:8},children:[{val:"saldo",label:"Saldo"},{val:"tabungan",label:"Tabungan"}].map(({val:e,label:t})=>a.jsxs("button",{type:"button",className:x.sumber===e?"btn btn-primary btn-sm":"btn btn-secondary btn-sm",style:{flex:1,fontWeight:700},onClick:()=>D(s=>({...s,sumber:e})),children:[t,e==="tabungan"&&j[0]&&a.jsx("span",{style:{fontSize:"0.6rem",fontWeight:500,display:"block",marginTop:1,opacity:.8},children:j[0].name})]},e))})]}),a.jsxs("div",{className:"flex gap-8 mt-16",children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>na(!1),children:"Batal"}),a.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:Me,disabled:Ea||!x.nama.trim()||!x.amount,children:Ea?"Menyimpan...":"Simpan"})]})]})}),be&&a.jsx("div",{className:"modal-overlay",onClick:()=>ea(!1),children:a.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsxs("div",{children:[a.jsx("h2",{className:"modal-title",children:"Pemasukan Bulanan"}),a.jsx("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:P?"Edit jumlah atau catatan":"Catat pemasukan bulan ini"})]}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>ea(!1),children:a.jsx(F,{size:16})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Jumlah Pemasukan"}),a.jsx(J,{value:q.amount,onChange:e=>ma(t=>({...t,amount:e})),autoFocus:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Tanggal Diterima"}),a.jsx("input",{className:"form-input",type:"date",value:q.date,min:`${r}-01`,max:(()=>{const[e,t]=r.split("-").map(Number);return new Date(e,t,0).toISOString().split("T")[0]})(),onChange:e=>ma(t=>({...t,date:e.target.value}))})]}),a.jsxs("div",{className:"form-group",children:[a.jsxs("label",{className:"form-label",children:["Catatan ",a.jsx("span",{style:{color:"var(--text-muted)",fontWeight:400},children:"(opsional)"})]}),a.jsx("textarea",{className:"form-input",rows:2,placeholder:"Misal: Gaji pokok + tunjangan...",value:q.note,onChange:e=>ma(t=>({...t,note:e.target.value})),style:{resize:"vertical",fontFamily:"var(--font-sans)",fontSize:"0.875rem"}})]}),a.jsxs("div",{className:"flex gap-8 mt-16",children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>ea(!1),children:"Batal"}),a.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:Ae,disabled:Ba,children:Ba?"Menyimpan...":"Simpan"})]})]})}),ve&&a.jsx("div",{className:"modal-overlay",onClick:()=>ta(!1),children:a.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsxs("div",{children:[a.jsx("h2",{className:"modal-title",children:"Tambah Pemasukan"}),a.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Dicatat ke bulan ",r]})]}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>ta(!1),children:a.jsx(F,{size:16})})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Nama Pemasukan"}),a.jsx("input",{className:"form-input",type:"text",placeholder:"Misal: Gaji Pokok, Bonus, Freelance...",value:M.description,onChange:e=>sa(t=>({...t,description:e.target.value})),autoFocus:!0})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Jumlah"}),a.jsx(J,{value:M.amount,onChange:e=>sa(t=>({...t,amount:e}))})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Tanggal"}),a.jsx("input",{className:"form-input",type:"date",value:M.date||`${r}-01`,min:`${r}-01`,max:(()=>{const[e,t]=r.split("-").map(Number);return new Date(e,t,0).toISOString().split("T")[0]})(),onChange:e=>sa(t=>({...t,date:e.target.value}))})]}),a.jsxs("div",{className:"flex gap-8 mt-16",children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>ta(!1),children:"Batal"}),a.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:ke,disabled:$a||!M.description.trim()||!M.amount,children:$a?"Menyimpan...":"Simpan"})]})]})}),me&&!z&&a.jsx("div",{className:"modal-overlay",onClick:()=>T(!1),children:a.jsxs("div",{className:"modal",onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h2",{className:"modal-title",children:b!=null&&b.id?"Edit Kategori":(b==null?void 0:b.category_type)==="savings"?"Tabungan Baru":(b==null?void 0:b.category_type)==="wajib"||b!=null&&b.is_mandatory?"Pengeluaran Wajib Baru":(b==null?void 0:b.category_type)==="rutin"||b!=null&&b.is_monthly?"Pengeluaran Rutin Baru":(b==null?void 0:b.category_type)==="income"?"Pemasukan Baru":"Kategori Baru"}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>T(!1),children:a.jsx(F,{size:16})})]}),a.jsx(Ye,{editData:b,salary:g,month:r,onSuccess:()=>{_(),T(!1)},onClose:()=>T(!1)})]})}),z&&(()=>{const e=y.find(t=>t.id===z.id);return a.jsx("div",{className:"modal-overlay",onClick:()=>I(null),children:a.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:t=>t.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsxs("div",{children:[a.jsxs("h2",{className:"modal-title",children:["Budget — ",e==null?void 0:e.name]}),g>0&&a.jsxs("p",{style:{fontSize:"0.72rem",color:"var(--text-muted)",marginTop:2},children:["Gaji: ",v(g)]})]}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>I(null),children:a.jsx(F,{size:16})})]}),g>0&&a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Persentase dari gaji"}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[a.jsxs("div",{style:{position:"relative",flex:1},children:[a.jsx("input",{className:"form-input",type:"number",placeholder:String(et),value:z.pct,onChange:t=>La(t.target.value),min:"0",max:"100",step:"0.5",style:{paddingRight:36}}),a.jsx("span",{style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontWeight:700,fontSize:"0.85rem"},children:"%"})]}),z.pct&&g>0&&a.jsxs("span",{style:{fontSize:"0.78rem",color:"var(--text-secondary)",fontWeight:600,whiteSpace:"nowrap"},children:["= ",v(Math.round(parseFloat(z.pct)/100*g))]})]}),!z.pct&&a.jsx("div",{style:{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"},children:[10,15,20,25].map(t=>a.jsxs("button",{className:"btn btn-secondary btn-sm",onClick:()=>La(String(t)),children:[t,"%"]},t))})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Atau nominal langsung"}),a.jsx(J,{value:z.nominal,onChange:ze,autoFocus:!g})]}),a.jsxs("div",{className:"flex gap-8 mt-16",children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>I(null),children:"Batal"}),a.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:Pe,children:"Simpan"})]})]})})})(),X&&a.jsx("div",{className:"modal-overlay",onClick:()=>!V&&Z(null),children:a.jsxs("div",{className:"modal",style:{maxWidth:380},onClick:e=>e.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsxs("h2",{className:"modal-title",children:["Pengeluaran — ",X.name]}),a.jsx("button",{className:"btn btn-ghost",onClick:()=>Z(null),disabled:V,children:a.jsx(F,{size:16})})]}),j.length===0&&a.jsx("p",{style:{fontSize:"0.8rem",color:"var(--text-muted)",marginBottom:12},children:"Kantong tabungan akan dibuat otomatis dari kategori ini."}),j.length>0&&a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Dari kantong"}),a.jsx("select",{className:"form-select",value:C.kantongId,onChange:e=>Y(t=>({...t,kantongId:e.target.value})),children:j.map(e=>a.jsxs("option",{value:e.id,children:[e.name," — ",v(e.current_amount)]},e.id))})]}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},children:[a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Jumlah"}),a.jsx(J,{value:C.amount,onChange:e=>Y(t=>({...t,amount:e}))})]}),a.jsxs("div",{className:"form-group",style:{margin:0},children:[a.jsx("label",{className:"form-label",children:"Tanggal"}),a.jsx("input",{className:"form-input",type:"date",value:C.date,onChange:e=>Y(t=>({...t,date:e.target.value}))})]})]}),C.amount>0&&C.kantongId&&(()=>{const e=j.find(n=>n.id===C.kantongId),t=Math.max(0,Number((e==null?void 0:e.current_amount)||0)-parseFloat(C.amount)),s=Number((e==null?void 0:e.current_amount)||0)>=parseFloat(C.amount);return a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",background:"var(--bg-input)",border:`1px solid ${s?"var(--border)":"rgba(248,113,113,0.4)"}`,borderRadius:"var(--radius-sm)",padding:"10px 14px",fontSize:"0.8rem",color:"var(--text-secondary)",fontWeight:500,marginTop:12},children:[a.jsx("span",{children:"Sisa kantong"}),a.jsx("span",{className:"tabular",style:{color:s?"var(--success)":"var(--danger)",fontWeight:700},children:v(t)})]})})(),a.jsxs("div",{className:"flex gap-8 mt-16",children:[a.jsx("button",{className:"btn btn-secondary",onClick:()=>Z(null),disabled:V,children:"Batal"}),a.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:Se,disabled:V,children:V?"Menyimpan...":a.jsxs(a.Fragment,{children:[a.jsx(te,{size:13})," Catat Pengeluaran"]})})]})]})}),a.jsx("style",{children:`
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
        [data-theme="light"] .cv2-bar-track {
          background: rgba(0,0,0,0.09);
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
        .cv2-sav-withdraw-btn { opacity: 1 !important; }
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
      `})]})}export{ot as default};
