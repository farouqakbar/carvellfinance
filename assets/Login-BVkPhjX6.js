import{J as z,K as P,G as i,F as e,v as h,k as I,r as M,n as S,e as X,g as F,h as L,I as T,l as K,x as R}from"./index-CWdwqngj.js";const k={username:"",password:"",confirmPassword:"",recoveryCode:""};function D(){const{signIn:w,signUp:v,resetPasswordWithCode:j}=z(),g=P(),[n,y]=i.useState("login"),[a,s]=i.useState(k),[p,o]=i.useState(""),[m,u]=i.useState(!1),[d,x]=i.useState(null),[f,c]=i.useState(!1),N=async r=>{if(r.preventDefault(),o(""),n==="register"){if(a.username.length<3)return o("Username minimal 3 karakter");if(!/^[a-zA-Z0-9_]+$/.test(a.username))return o("Username hanya boleh huruf, angka, dan underscore");if(a.password.length<6)return o("Password minimal 6 karakter");if(a.password!==a.confirmPassword)return o("Password tidak cocok")}if(n==="forgot"){if(!a.recoveryCode.trim())return o("Masukkan recovery code kamu");if(a.password.length<6)return o("Password baru minimal 6 karakter");if(a.password!==a.confirmPassword)return o("Password tidak cocok")}u(!0);try{if(n==="login")await w(a.username,a.password),g("/dashboard");else if(n==="register")await v(a.username,a.password),g("/dashboard");else{const t=await j(a.username,a.recoveryCode,a.password);x({username:a.username,code:t})}}catch(t){o(t.message)}finally{u(!1)}},l=r=>{y(r),o(""),x(null),c(!1),s(k)},C=async()=>{await R(d.code)&&(c(!0),setTimeout(()=>c(!1),2e3))},b={login:{title:"Selamat datang",sub:"Masuk dengan username dan password kamu"},register:{title:"Buat akun",sub:"Pilih username dan password"},forgot:{title:"Lupa password",sub:"Masukkan recovery code kamu untuk mengatur password baru"}};return e.jsxs("div",{className:"login-root",children:[e.jsx("div",{className:"login-panel",children:e.jsxs("div",{className:"login-panel-inner",children:[e.jsx(h,{dark:!0,size:"lg",id:"login-logo"}),e.jsxs("div",{className:"login-hero",children:[e.jsxs("h1",{className:"login-headline",children:["Kendali penuh",e.jsx("br",{}),"atas keuanganmu."]}),e.jsx("p",{className:"login-sub-text",children:"Catat pemasukan dan pengeluaran, pantau budget per kategori, dan capai target tabungan — dalam satu dashboard yang ringkas."})]}),e.jsx("ul",{className:"login-features",children:[{Icon:I,text:"Dashboard keuangan per bulan"},{Icon:M,text:"Budget per kategori + alert overbudget"},{Icon:S,text:"Target tabungan dengan progress"},{Icon:X,text:"Laporan bulanan dengan grafik tren"}].map(r=>e.jsxs("li",{className:"login-feature-item",children:[e.jsx("span",{className:"login-feature-icon",children:e.jsx(r.Icon,{size:15})}),e.jsx("span",{children:r.text})]},r.text))}),e.jsx("div",{className:"login-grid-dots","aria-hidden":!0})]})}),e.jsx("div",{className:"login-form-panel",children:e.jsxs("div",{className:"login-form-wrap",children:[e.jsx("div",{className:"login-mobile-logo",children:e.jsx(h,{dark:!1,size:"md",id:"login-mobile-logo"})}),d?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"login-form-header",children:[e.jsx("h2",{className:"login-form-title",children:"Password berhasil diganti"}),e.jsx("p",{className:"login-form-sub",children:"Recovery code lama sudah dipakai dan tidak berlaku. Simpan kode baru di bawah ini."})]}),e.jsx("div",{className:"login-code-box",children:e.jsx("code",{className:"login-code",children:d.code})}),e.jsxs("button",{type:"button",className:"btn btn-ghost btn-sm login-copy-btn",onClick:C,children:[f?e.jsx(F,{size:14}):e.jsx(L,{size:14}),f?"Tersalin":"Salin kode baru"]}),e.jsxs("div",{className:"login-warn",children:[e.jsx(T,{size:14}),e.jsx("span",{children:"Kode ini cuma ditampilkan sekali. Catat sekarang sebelum lanjut."})]}),e.jsx("button",{type:"button",className:"btn btn-primary btn-block login-submit-btn",onClick:()=>l("login"),children:"Lanjut ke Masuk"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"login-form-header",children:[e.jsx("h2",{className:"login-form-title",children:b[n].title}),e.jsx("p",{className:"login-form-sub",children:b[n].sub})]}),e.jsxs("form",{onSubmit:N,className:"login-form",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Username"}),e.jsxs("div",{className:"input-prefix-wrap",children:[e.jsx("span",{className:"input-prefix-char",children:"@"}),e.jsx("input",{className:"form-input input-has-prefix",type:"text",placeholder:"username_kamu",value:a.username,onChange:r=>s(t=>({...t,username:r.target.value.toLowerCase().replace(/\s/g,"")})),required:!0,autoComplete:"username",autoFocus:!0})]}),n==="register"&&e.jsx("p",{className:"form-hint",children:"Huruf, angka, underscore. Min. 3 karakter."})]}),n==="forgot"&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Recovery code"}),e.jsxs("div",{className:"input-prefix-wrap",children:[e.jsx("span",{className:"input-prefix-icon",children:e.jsx(K,{size:14})}),e.jsx("input",{className:"form-input input-has-prefix login-code-input",type:"text",placeholder:"CV-XXXX-XXXX-XXXX",value:a.recoveryCode,onChange:r=>s(t=>({...t,recoveryCode:r.target.value.toUpperCase()})),required:!0,autoComplete:"off",autoCapitalize:"characters",spellCheck:!1})]}),e.jsx("p",{className:"form-hint",children:"Kode yang kamu simpan waktu daftar. Strip dan spasi boleh diabaikan."})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:n==="forgot"?"Password baru":"Password"}),e.jsx("input",{className:"form-input",type:"password",placeholder:n==="login"?"••••••••":"Minimal 6 karakter",value:a.password,onChange:r=>s(t=>({...t,password:r.target.value})),required:!0,autoComplete:n==="login"?"current-password":"new-password"})]}),(n==="register"||n==="forgot")&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Konfirmasi Password"}),e.jsx("input",{className:"form-input",type:"password",placeholder:"Ulangi password",value:a.confirmPassword,onChange:r=>s(t=>({...t,confirmPassword:r.target.value})),required:!0,autoComplete:"new-password"})]}),n==="login"&&e.jsx("button",{type:"button",className:"login-forgot-link",onClick:()=>l("forgot"),children:"Lupa password?"}),p&&e.jsx("div",{className:"auth-error",children:p}),e.jsx("button",{type:"submit",className:"btn btn-primary btn-block login-submit-btn",disabled:m,children:m?"Memproses...":n==="login"?"Masuk":n==="register"?"Buat Akun":"Reset Password"})]}),e.jsx("p",{className:"login-switch",children:n==="login"?e.jsxs(e.Fragment,{children:["Belum punya akun? ",e.jsx("button",{type:"button",onClick:()=>l("register"),children:"Daftar"})]}):n==="register"?e.jsxs(e.Fragment,{children:["Sudah punya akun? ",e.jsx("button",{type:"button",onClick:()=>l("login"),children:"Masuk"})]}):e.jsxs(e.Fragment,{children:["Ingat password kamu? ",e.jsx("button",{type:"button",onClick:()=>l("login"),children:"Kembali masuk"})]})})]})]})}),e.jsx("style",{children:`
        .login-root {
          min-height: 100dvh;
          display: grid;
          grid-template-columns: 55% 45%;
          background: var(--bg);
        }

        /* Left panel — glass aurora */
        .login-panel {
          background: linear-gradient(145deg, rgba(6,6,16,0.96) 0%, rgba(10,8,24,0.98) 100%);
          border-right: 1px solid rgba(99,102,241,0.15);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: stretch;
        }
        /* Aurora blobs inside panel */
        .login-panel::before {
          content: '';
          position: absolute;
          top: -80px; left: -80px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 65%);
          filter: blur(40px);
          pointer-events: none;
          animation: aurora-drift-1 18s ease-in-out infinite;
        }
        .login-panel::after {
          content: '';
          position: absolute;
          bottom: -100px; right: -80px;
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 65%);
          filter: blur(50px);
          pointer-events: none;
          animation: aurora-drift-2 24s ease-in-out infinite;
        }
        .login-panel-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; justify-content: space-between;
          padding: 44px 48px; width: 100%;
        }

        .login-hero { flex:1; display:flex; flex-direction:column; justify-content:center; padding: 48px 0; }
        .login-headline {
          font-size: clamp(2rem, 3.2vw, 3rem);
          font-weight: 800; letter-spacing: -0.045em; line-height: 1.08;
          margin-bottom: 18px;
          background: linear-gradient(135deg, #fff 30%, rgba(167,139,250,0.9) 65%, rgba(99,102,241,0.85) 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        [data-theme="light"] .login-headline {
          background: linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #4f46e5 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .login-sub-text {
          font-size: 0.95rem; line-height: 1.7;
          color: rgba(160, 160, 200, 0.60); max-width: 360px;
        }
        [data-theme="light"] .login-sub-text { color: var(--text-secondary); }

        .login-features { list-style:none; display:flex; flex-direction:column; gap:12px; }
        .login-feature-item {
          display: flex; align-items: center; gap: 12px;
          color: rgba(160, 160, 200, 0.55); font-size: 0.85rem; font-weight: 500;
        }
        [data-theme="light"] .login-feature-item { color: var(--text-secondary); }
        .login-feature-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.20);
          display: flex; align-items: center; justify-content: center;
          color: #a78bfa; flex-shrink: 0;
        }

        /* Dot grid */
        .login-grid-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px);
          background-size: 28px 28px; opacity: 0.35; pointer-events: none;
          mask-image: radial-gradient(ellipse at 70% 30%, black 10%, transparent 65%);
          -webkit-mask-image: radial-gradient(ellipse at 70% 30%, black 10%, transparent 65%);
        }

        /* Right panel — glass form */
        .login-form-panel {
          display: flex; align-items: center; justify-content: center;
          padding: 48px 40px;
          background: rgba(8,8,20,0.5);
          backdrop-filter: blur(8px);
        }
        [data-theme="light"] .login-form-panel { background: rgba(240,240,248,0.7); }
        .login-form-wrap { width: 100%; max-width: 380px; }

        .login-mobile-logo { display: none; margin-bottom: 32px; }

        .login-form-header { margin-bottom: 32px; }
        .login-form-title {
          font-size: 1.75rem; font-weight: 800; letter-spacing: -0.04em;
          color: var(--text-primary); margin-bottom: 8px;
        }
        .login-form-sub { font-size: 0.85rem; color: var(--text-secondary); font-weight: 500; }

        .login-form { display: flex; flex-direction: column; gap: 0; }

        .input-prefix-wrap { position: relative; }
        .input-prefix-char {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%);
          color: var(--accent); font-size: 0.9rem; font-weight: 700;
          pointer-events: none; z-index: 1;
        }
        .input-has-prefix { padding-left: 30px !important; }
        .input-prefix-icon {
          position: absolute; left: 11px; top: 50%;
          transform: translateY(-50%);
          color: var(--accent); display: flex;
          pointer-events: none; z-index: 1;
        }
        .login-code-input {
          font-family: var(--font-mono, ui-monospace, "SF Mono", Menlo, monospace);
          letter-spacing: 0.06em;
        }

        .login-forgot-link {
          align-self: flex-end;
          background: none; border: none; padding: 0;
          margin: -4px 0 14px;
          color: var(--text-muted); cursor: pointer;
          font-family: var(--font-sans); font-size: 0.76rem; font-weight: 600;
          transition: color 0.15s;
        }
        .login-forgot-link:hover { color: var(--accent); }

        .login-code-box {
          background: var(--accent-dim);
          border: 1px dashed rgba(99,102,241,0.45);
          border-radius: var(--radius-sm);
          padding: 16px 12px; text-align: center;
          margin-bottom: 10px;
        }
        .login-code {
          font-family: var(--font-mono, ui-monospace, "SF Mono", Menlo, monospace);
          font-size: clamp(0.95rem, 4.5vw, 1.3rem);
          font-weight: 700; letter-spacing: 0.08em;
          color: var(--text-primary); user-select: all; word-break: break-all;
        }
        .login-copy-btn {
          width: 100%; display: inline-flex; align-items: center;
          justify-content: center; gap: 6px; margin-bottom: 14px;
        }
        .login-warn {
          display: flex; align-items: flex-start; gap: 8px;
          background: rgba(245,158,11,0.07);
          border: 1px solid rgba(245,158,11,0.22);
          border-radius: var(--radius-sm);
          padding: 10px 12px; margin-bottom: 14px;
          font-size: 0.73rem; line-height: 1.55; color: #f59e0b;
        }
        .login-warn svg { flex-shrink: 0; margin-top: 2px; }

        .form-hint { font-size: 0.7rem; color: var(--text-muted); margin-top: 5px; font-weight: 500; }

        .auth-error {
          background: var(--danger-dim); color: var(--danger);
          border: 1px solid rgba(248,113,113,0.25);
          border-radius: var(--radius-sm); padding: 10px 14px;
          font-size: 0.8rem; font-weight: 500; margin-bottom: 14px;
          backdrop-filter: var(--glass-blur);
        }

        .login-submit-btn {
          padding: 13px; font-size: 0.9rem;
          border-radius: var(--radius-sm); margin-top: 6px;
          letter-spacing: -0.01em; font-weight: 700;
        }

        .login-switch {
          text-align: center; margin-top: 22px;
          font-size: 0.82rem; color: var(--text-muted); font-weight: 500;
        }
        .login-switch button {
          background: none; border: none; color: var(--accent);
          cursor: pointer; font-family: var(--font-sans);
          font-size: 0.82rem; font-weight: 700; padding: 0;
          margin-left: 4px; transition: all 0.15s;
        }
        .login-switch button:hover { opacity: 0.8; text-decoration: underline; }

        @media (max-width: 768px) {
          .login-root { grid-template-columns: 1fr; }
          .login-panel { display: none; }
          .login-form-panel { padding: 32px 20px; align-items: flex-start; padding-top: 56px; background: transparent; }
          .login-mobile-logo { display: block; }
        }
      `})]})}export{D as default};
