import{u as b,b as w,r as s,j as e,a as m}from"./index-Ds62nZ3J.js";function v(){const{signIn:c,signUp:u}=b(),x=w(),[r,f]=s.useState("login"),[n,o]=s.useState({username:"",password:"",confirmPassword:""}),[l,i]=s.useState(""),[d,p]=s.useState(!1),h=async a=>{if(a.preventDefault(),i(""),r==="register"){if(n.username.length<3)return i("Username minimal 3 karakter");if(!/^[a-zA-Z0-9_]+$/.test(n.username))return i("Username hanya boleh huruf, angka, dan underscore");if(n.password.length<6)return i("Password minimal 6 karakter");if(n.password!==n.confirmPassword)return i("Password tidak cocok")}p(!0);try{r==="login"?await c(n.username,n.password):await u(n.username,n.password),x("/dashboard")}catch(t){i(t.message)}finally{p(!1)}},g=a=>{f(a),i(""),o({username:"",password:"",confirmPassword:""})};return e.jsxs("div",{className:"login-root",children:[e.jsx("div",{className:"login-panel",children:e.jsxs("div",{className:"login-panel-inner",children:[e.jsx(m,{dark:!0,size:"lg",id:"login-logo"}),e.jsxs("div",{className:"login-hero",children:[e.jsxs("h1",{className:"login-headline",children:["Kendali penuh",e.jsx("br",{}),"atas keuanganmu."]}),e.jsx("p",{className:"login-sub-text",children:"Catat pemasukan dan pengeluaran, pantau budget per kategori, dan capai target tabungan — dalam satu dashboard yang ringkas."})]}),e.jsx("ul",{className:"login-features",children:[{icon:"↗",text:"Dashboard keuangan per bulan"},{icon:"◈",text:"Budget per kategori + alert overbudget"},{icon:"◎",text:"Target tabungan dengan progress"},{icon:"▤",text:"Laporan bulanan dengan grafik tren"}].map(a=>e.jsxs("li",{className:"login-feature-item",children:[e.jsx("span",{className:"login-feature-icon",children:a.icon}),e.jsx("span",{children:a.text})]},a.text))}),e.jsx("div",{className:"login-grid-dots","aria-hidden":!0})]})}),e.jsx("div",{className:"login-form-panel",children:e.jsxs("div",{className:"login-form-wrap",children:[e.jsx("div",{className:"login-mobile-logo",children:e.jsx(m,{dark:!1,size:"md",id:"login-mobile-logo"})}),e.jsxs("div",{className:"login-form-header",children:[e.jsx("h2",{className:"login-form-title",children:r==="login"?"Selamat datang":"Buat akun"}),e.jsx("p",{className:"login-form-sub",children:r==="login"?"Masuk dengan username dan password kamu":"Pilih username dan password"})]}),e.jsxs("form",{onSubmit:h,className:"login-form",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Username"}),e.jsxs("div",{className:"input-prefix-wrap",children:[e.jsx("span",{className:"input-prefix-char",children:"@"}),e.jsx("input",{className:"form-input input-has-prefix",type:"text",placeholder:"username_kamu",value:n.username,onChange:a=>o(t=>({...t,username:a.target.value.toLowerCase().replace(/\s/g,"")})),required:!0,autoComplete:"username",autoFocus:!0})]}),r==="register"&&e.jsx("p",{className:"form-hint",children:"Huruf, angka, underscore. Min. 3 karakter."})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Password"}),e.jsx("input",{className:"form-input",type:"password",placeholder:r==="register"?"Minimal 6 karakter":"••••••••",value:n.password,onChange:a=>o(t=>({...t,password:a.target.value})),required:!0,autoComplete:r==="login"?"current-password":"new-password"})]}),r==="register"&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Konfirmasi Password"}),e.jsx("input",{className:"form-input",type:"password",placeholder:"Ulangi password",value:n.confirmPassword,onChange:a=>o(t=>({...t,confirmPassword:a.target.value})),required:!0,autoComplete:"new-password"})]}),l&&e.jsx("div",{className:"auth-error",children:l}),e.jsx("button",{type:"submit",className:"btn btn-primary btn-block login-submit-btn",disabled:d,children:d?"Memproses...":r==="login"?"Masuk":"Buat Akun"})]}),e.jsx("p",{className:"login-switch",children:r==="login"?e.jsxs(e.Fragment,{children:["Belum punya akun? ",e.jsx("button",{type:"button",onClick:()=>g("register"),children:"Daftar"})]}):e.jsxs(e.Fragment,{children:["Sudah punya akun? ",e.jsx("button",{type:"button",onClick:()=>g("login"),children:"Masuk"})]})})]})}),e.jsx("style",{children:`
        .login-root {
          min-height: 100dvh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--bg);
        }

        /* Left panel */
        .login-panel {
          background: #0a0a10;
          border-right: 1px solid #1e1e2a;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: stretch;
        }
        .login-panel::before {
          content: '';
          position: absolute;
          top: -120px; left: -120px;
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%);
          pointer-events: none;
        }
        .login-panel::after {
          content: '';
          position: absolute;
          bottom: -80px; right: -80px;
          width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 65%);
          pointer-events: none;
        }
        .login-panel-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 40px 44px;
          width: 100%;
        }

        .login-hero { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 40px 0; }
        .login-headline {
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.1;
          color: #eeeef5;
          margin-bottom: 16px;
        }
        .login-sub-text {
          font-size: 0.9rem;
          line-height: 1.65;
          color: #6565808a;
          color: rgba(160, 160, 200, 0.7);
          max-width: 380px;
        }

        .login-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .login-feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(160, 160, 200, 0.65);
          font-size: 0.8125rem;
          font-weight: 500;
        }
        .login-feature-icon {
          color: #818cf8;
          font-size: 0.85rem;
          width: 18px;
          text-align: center;
          flex-shrink: 0;
        }

        .login-grid-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px);
          background-size: 32px 32px;
          opacity: 0.4;
          pointer-events: none;
          mask-image: radial-gradient(ellipse at 80% 20%, black 20%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at 80% 20%, black 20%, transparent 70%);
        }

        /* Right panel */
        .login-form-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
        }
        .login-form-wrap {
          width: 100%;
          max-width: 380px;
        }

        .login-mobile-logo {
          display: none;
          margin-bottom: 32px;
        }

        .login-form-header { margin-bottom: 28px; }
        .login-form-title {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.035em;
          color: var(--text-primary);
          margin-bottom: 6px;
        }
        .login-form-sub {
          font-size: 0.825rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .login-form { display: flex; flex-direction: column; gap: 0; }

        .input-prefix-wrap { position: relative; }
        .input-prefix-char {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 0.875rem;
          font-weight: 600;
          pointer-events: none;
          z-index: 1;
        }
        .input-has-prefix { padding-left: 28px !important; }

        .form-hint {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 5px;
          font-weight: 500;
        }

        .auth-error {
          background: var(--danger-dim);
          color: var(--danger);
          border: 1px solid rgba(248,113,113,0.2);
          border-radius: var(--radius-sm);
          padding: 9px 13px;
          font-size: 0.8rem;
          font-weight: 500;
          margin-bottom: 14px;
        }

        .login-submit-btn {
          padding: 12px;
          font-size: 0.875rem;
          border-radius: var(--radius-sm);
          margin-top: 4px;
          letter-spacing: -0.01em;
        }

        .login-switch {
          text-align: center;
          margin-top: 20px;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .login-switch button {
          background: none;
          border: none;
          color: var(--accent);
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0;
          text-decoration: none;
          margin-left: 4px;
          transition: opacity 0.15s;
        }
        .login-switch button:hover { opacity: 0.75; }

        @media (max-width: 768px) {
          .login-root { grid-template-columns: 1fr; }
          .login-panel { display: none; }
          .login-form-panel { padding: 32px 20px; align-items: flex-start; padding-top: 48px; }
          .login-mobile-logo { display: block; }
        }
      `})]})}export{v as default};
