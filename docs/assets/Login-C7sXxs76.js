import{u as h,a as v,r as o,j as e}from"./index-DVikC9Cf.js";function w(){const{signIn:l,signUp:u}=h(),d=v(),[n,f]=o.useState("login"),[a,i]=o.useState({username:"",password:"",confirmPassword:""}),[c,s]=o.useState(""),[m,g]=o.useState(!1),x=async r=>{if(r.preventDefault(),s(""),n==="register"){if(a.username.length<3)return s("Username minimal 3 karakter");if(!/^[a-zA-Z0-9_]+$/.test(a.username))return s("Username hanya boleh huruf, angka, dan underscore");if(a.password.length<6)return s("Password minimal 6 karakter");if(a.password!==a.confirmPassword)return s("Password tidak cocok")}g(!0);try{n==="login"?(await l(a.username,a.password),d("/dashboard")):(await u(a.username,a.password),await l(a.username,a.password),d("/dashboard"))}catch(t){s(t.message)}finally{g(!1)}},p=r=>{f(r),s(""),i({username:"",password:"",confirmPassword:""})};return e.jsxs("div",{className:"login-page",children:[e.jsxs("div",{className:"login-left",children:[e.jsxs("div",{className:"login-brand",children:[e.jsx("span",{className:"login-logo-mark",children:"◈"}),e.jsx("span",{className:"login-logo-text",children:"Finora"})]}),e.jsxs("div",{className:"login-tagline",children:[e.jsxs("h1",{children:["Kelola keuangan",e.jsx("br",{}),e.jsx("em",{children:"dengan lebih bijak."})]}),e.jsx("p",{children:"Lacak pengeluaran, atur budget, dan capai target tabungan kamu — semua dalam satu tempat."})]}),e.jsx("div",{className:"login-features",children:["Dashboard visual yang ringkas","Kategori & budget custom","Target tabungan & progress","Riwayat transaksi lengkap"].map(r=>e.jsxs("div",{className:"feature-item",children:[e.jsx("span",{className:"feature-check",children:"✓"}),e.jsx("span",{children:r})]},r))})]}),e.jsx("div",{className:"login-right",children:e.jsxs("div",{className:"login-card",children:[e.jsxs("div",{className:"login-header",children:[e.jsxs("div",{className:"login-logo-sm",children:[e.jsx("span",{style:{color:"var(--accent)",fontSize:"1.4rem"},children:"◈"}),e.jsx("span",{style:{fontFamily:"var(--font-serif)",fontStyle:"italic",fontSize:"1.2rem"},children:"Finora"})]}),e.jsx("h2",{className:"login-title",children:n==="login"?"Selamat datang kembali":"Buat akun baru"}),e.jsx("p",{className:"login-sub",children:n==="login"?"Masukkan username dan password kamu":"Daftar gratis, tidak perlu email"})]}),e.jsxs("form",{onSubmit:x,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Username"}),e.jsxs("div",{className:"input-wrap",children:[e.jsx("span",{className:"input-prefix",children:"@"}),e.jsx("input",{className:"form-input input-with-prefix",type:"text",placeholder:"username_kamu",value:a.username,onChange:r=>i(t=>({...t,username:r.target.value.toLowerCase().replace(/\s/g,"")})),required:!0,autoComplete:"username",autoFocus:!0})]}),n==="register"&&e.jsx("p",{className:"form-hint",children:"Hanya huruf, angka, dan underscore. Min. 3 karakter."})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Password"}),e.jsx("input",{className:"form-input",type:"password",placeholder:n==="register"?"Minimal 6 karakter":"••••••••",value:a.password,onChange:r=>i(t=>({...t,password:r.target.value})),required:!0,autoComplete:n==="login"?"current-password":"new-password"})]}),n==="register"&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Konfirmasi Password"}),e.jsx("input",{className:"form-input",type:"password",placeholder:"Ulangi password",value:a.confirmPassword,onChange:r=>i(t=>({...t,confirmPassword:r.target.value})),required:!0,autoComplete:"new-password"})]}),c&&e.jsx("div",{className:"auth-error",children:c}),e.jsx("button",{type:"submit",className:"btn btn-primary btn-block btn-lg",disabled:m,children:m?"Memproses...":n==="login"?"Masuk":"Buat Akun"})]}),e.jsx("div",{className:"login-switch",children:n==="login"?e.jsxs(e.Fragment,{children:["Belum punya akun? ",e.jsx("button",{onClick:()=>p("register"),children:"Daftar sekarang"})]}):e.jsxs(e.Fragment,{children:["Sudah punya akun? ",e.jsx("button",{onClick:()=>p("login"),children:"Masuk"})]})})]})}),e.jsx("style",{children:`
        .login-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .login-left {
          background: linear-gradient(135deg, #0f0f11 0%, #17171a 100%);
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }

        .login-left::before {
          content: '';
          position: absolute;
          top: -100px; left: -100px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(200,255,87,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .login-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .login-logo-mark { font-size: 1.6rem; color: var(--accent); }
        .login-logo-text { font-family: var(--font-serif); font-size: 1.4rem; font-style: italic; color: var(--text-primary); }

        .login-tagline h1 {
          font-family: var(--font-serif);
          font-size: 2.8rem;
          line-height: 1.15;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .login-tagline p { color: var(--text-secondary); font-size: 1rem; line-height: 1.6; max-width: 400px; }

        .login-features { display: flex; flex-direction: column; gap: 12px; }
        .feature-item { display: flex; align-items: center; gap: 12px; color: var(--text-secondary); font-size: 0.9rem; }
        .feature-check { color: var(--accent); font-weight: 700; width: 20px; text-align: center; }

        .login-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
          background: var(--bg);
        }

        .login-card { width: 100%; max-width: 400px; }

        .login-header { margin-bottom: 28px; }

        .login-logo-sm {
          display: none;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .login-title {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-style: italic;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .login-sub { color: var(--text-secondary); font-size: 0.875rem; }

        .input-wrap { position: relative; }
        .input-prefix {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 0.9rem;
          pointer-events: none;
        }
        .input-with-prefix { padding-left: 28px !important; }

        .form-hint { font-size: 0.75rem; color: var(--text-muted); margin-top: 5px; }

        .auth-error {
          background: var(--danger-dim);
          color: var(--danger);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          font-size: 0.85rem;
          margin-bottom: 16px;
        }

        .login-switch {
          text-align: center;
          margin-top: 20px;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .login-switch button {
          background: none;
          border: none;
          color: var(--accent);
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .login-switch button:hover { color: var(--accent-hover); }

        @media (max-width: 768px) {
          .login-page { grid-template-columns: 1fr; }
          .login-left { display: none; }
          .login-right { padding: 24px; align-items: flex-start; padding-top: 48px; }
          .login-logo-sm { display: flex; }
        }
      `})]})}export{w as default};
