import{u as S,i as C,r as d,s as p,j as e,C as P}from"./index-8D83QUkP.js";import{i as v,a as h}from"./ConfirmModal-73dFZhFq.js";function E({onSuccess:u,onClose:c,editData:r,month:n}){const{user:m}=S(),g=C(),[j,N]=d.useState([]),[f,x]=d.useState(!1),k=()=>{if(r!=null&&r.date)return r.date;if(!n)return new Date().toISOString().split("T")[0];const t=new Date().toISOString().substring(0,7);return n===t?new Date().toISOString().split("T")[0]:`${n}-01`},[s,o]=d.useState({amount:"",category_id:"",date:k(),description:"",type:"expense",...r});d.useEffect(()=>{w()},[n]);const w=async()=>{const[t,a]=await Promise.all([p.from("categories").select("*").eq("user_id",m.id).order("name"),n?p.from("category_budgets").select("category_id").eq("user_id",m.id).eq("month",n):Promise.resolve({data:[]})]),y=(t.data||[]).filter(l=>!v(l)&&!h(l)),b=new Set((a.data||[]).map(l=>l.category_id)),_=b.size>0?y.filter(l=>b.has(l.id)):y;N(_)},T=async t=>{if(t.preventDefault(),!(!s.amount||!s.date)){x(!0);try{const a={user_id:m.id,amount:parseFloat(s.amount),category_id:s.category_id||null,date:s.date,description:s.description,type:s.type};r!=null&&r.id?(await p.from("transactions").update(a).eq("id",r.id),g("Transaksi diperbarui","success")):(await p.from("transactions").insert(a),g("Transaksi ditambahkan","success")),u==null||u(),c==null||c()}catch(a){g(a.message,"error")}finally{x(!1)}}},i=s.type==="expense";return e.jsxs("form",{onSubmit:T,children:[e.jsxs("div",{className:"tf-type-row",children:[e.jsxs("button",{type:"button",className:`tf-type-btn ${i?"active":""}`,"data-type":"expense",onClick:()=>o(t=>({...t,type:"expense"})),children:[e.jsx("span",{className:"tf-type-icon",children:"↓"})," Pengeluaran"]}),e.jsxs("button",{type:"button",className:`tf-type-btn ${i?"":"active"}`,"data-type":"income",onClick:()=>o(t=>({...t,type:"income"})),children:[e.jsx("span",{className:"tf-type-icon",children:"↑"})," Pemasukan"]})]}),e.jsx(P,{variant:"large",value:s.amount,onChange:t=>o(a=>({...a,amount:t})),inputColor:i?"var(--danger)":"var(--success)",autoFocus:!0,style:{marginBottom:18}}),e.jsx("input",{type:"hidden",value:s.amount,required:!0}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Kategori"}),e.jsxs("select",{className:"form-select",value:s.category_id,onChange:t=>o(a=>({...a,category_id:t.target.value})),children:[e.jsx("option",{value:"",children:"— Tanpa kategori —"}),j.filter(t=>!v(t)&&!h(t)).map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))]})]}),e.jsxs("div",{className:"tf-row-2",children:[e.jsxs("div",{className:"form-group",style:{flex:1},children:[e.jsx("label",{className:"form-label",children:"Tanggal"}),e.jsx("input",{className:"form-input",type:"date",value:s.date,onChange:t=>o(a=>({...a,date:t.target.value})),required:!0})]}),e.jsxs("div",{className:"form-group",style:{flex:2},children:[e.jsxs("label",{className:"form-label",children:["Deskripsi ",e.jsx("span",{style:{color:"var(--text-muted)",textTransform:"none",letterSpacing:0,fontWeight:500},children:"(opsional)"})]}),e.jsx("input",{className:"form-input",type:"text",placeholder:"Keterangan...",value:s.description,onChange:t=>o(a=>({...a,description:t.target.value}))})]})]}),e.jsxs("div",{className:"flex gap-8",style:{marginTop:20},children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:c,children:"Batal"}),e.jsx("button",{type:"submit",className:"btn btn-primary btn-block",style:{flex:1,background:i?"var(--danger)":"var(--success)",boxShadow:i?"0 4px 14px rgba(248,113,113,0.3)":"0 4px 14px rgba(52,211,153,0.3)"},disabled:f,children:f?"Menyimpan...":r!=null&&r.id?"Perbarui":i?"Catat Pengeluaran":"Catat Pemasukan"})]}),e.jsx("style",{children:`
        .tf-type-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          margin-bottom: 20px;
        }
        .tf-type-btn {
          padding: 10px 12px;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-muted);
          background: var(--bg-input);
          transition: all 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          letter-spacing: -0.01em;
        }
        .tf-type-btn:active { transform: scale(0.97); }
        .tf-type-btn.active[data-type="expense"] {
          background: var(--danger-dim);
          border-color: var(--danger);
          color: var(--danger);
        }
        .tf-type-btn.active[data-type="income"] {
          background: var(--success-dim);
          border-color: var(--success);
          color: var(--success);
        }
        .tf-type-icon { font-size: 0.9rem; }

        .tf-row-2 {
          display: flex;
          gap: 10px;
        }
        @media (max-width: 480px) {
          .tf-row-2 { flex-direction: column; gap: 0; }
        }
      `})]})}export{E as T};
