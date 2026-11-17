(function () {
  var LOGO = '<img src="assets/logo.png" alt="Quick Fund Logo" class="brand-logo-img" width="38" height="38">';
  var REVIEWED = "November 2026";
  var LOANS = [
    { s: "home-loan", n: "Home loan", i: "fa-house", t: 20, k: "property", d: "Buy, build or extend a house with long repayment tenures.",
      e: "Salaried or self-employed, age 21 to 65, steady income and a good credit score." },
    { s: "loan-against-property", n: "Loan against property", i: "fa-landmark", t: 10, k: "property", d: "Borrow against a house, shop or land you already own, and keep using it.",
      e: "Owner of a residential or commercial property with clear title, steady income and a credit score of about 700 or more." },
    { s: "mortgage-loan", n: "Mortgage loan", i: "fa-file-contract", t: 10, k: "property", d: "A property-backed loan for large needs such as business, education or medical costs.",
      e: "Owner of a property with clear title and enough income to repay the loan." },
    { s: "business-loan", n: "Business loan", i: "fa-briefcase", t: 3, k: "business", d: "Working capital and growth funding for small businesses and the self-employed.",
      e: "A business running for 2 or more years with turnover proof and account statements." },
    { s: "personal-loan", n: "Personal loan", i: "fa-user", t: 3, k: "personal", d: "Unsecured funds for weddings, travel, medical bills or emergencies.",
      e: "Salaried or self-employed, age 21 to 58, with the minimum monthly income the lender asks for." },
    { s: "gold-loan", n: "Gold loan", i: "fa-coins", t: 1, k: "gold", d: "Quick cash against your gold jewellery, with minimal paperwork.",
      e: "Age 18 or above with gold ornaments of 18 to 22 carat and a valid ID." },
    { s: "car-loan", n: "Car loan", i: "fa-car", t: 5, k: "vehicle", d: "Finance a new or used car, with repayment up to several years.",
      e: "Salaried or self-employed with income proof, identity and address proof." },
    { s: "education-loan", n: "Education loan", i: "fa-graduation-cap", t: 7, k: "education", d: "Tuition and living costs for study in India or abroad.",
      e: "An admission offer from a recognised institution and a co-applicant, usually a parent or guardian." }
  ];
  var GROUPS = [
    ["Home Loans", "fa-house", ["home-loan", "loan-against-property", "mortgage-loan"]],
    ["Personal Loans", "fa-user", ["personal-loan", "gold-loan", "education-loan"]],
    ["Business and Vehicle", "fa-briefcase", ["business-loan", "car-loan"]]
  ];
  var DOCS = {
    property: ["Identity and address proof (Aadhaar, PAN)", "Last 3 months’ salary slips or 2 years’ ITR", "Last 6 months’ account statements", "Property papers: sale deed, title documents, tax receipts"],
    business: ["Identity and address proof", "Business registration or GST certificate", "Last 2 years’ ITR and financial statements", "Last 6 to 12 months’ account statements"],
    personal: ["Identity and address proof", "Last 3 months’ salary slips", "Last 3 to 6 months’ account statements", "Income proof, if self-employed"],
    gold: ["Identity and address proof", "Passport-size photographs", "Hallmarked gold ornaments for valuation"],
    vehicle: ["Identity and address proof", "Salary slips or ITR", "Last 6 months’ account statements", "Vehicle quotation or invoice"],
    education: ["Admission letter and fee structure", "Identity and address proof of student and co-applicant", "Co-applicant’s income proof", "Academic records, and collateral papers if needed"]
  };
  // Rows: [lender, rate from %, rate to % (or null), max tenure in years (or null), processing fee (or null)]
  var D = {
    "home-loan": [
      ["LIC Housing Finance", 7.15, null, null, null], ["Bajaj Housing Finance", 7.25, null, null, null], ["PNB Housing Finance", 7.50, null, null, null],
      ["Tata Capital Housing Finance", 7.50, null, null, null], ["ICICI Home Finance", 7.50, null, null, null], ["Godrej Housing Finance", 7.65, null, null, null],
      ["GIC Housing Finance", 8.20, null, null, null], ["Easy Home Finance", 8.99, null, null, null]],
    "loan-against-property": [
      ["Aditya Birla Housing Finance", 8.75, null, null, null], ["Bajaj Housing Finance", 8.99, 18.00, 20, "Up to 4%"], ["Tata Capital", 9.00, 17.00, 20, "Up to 1.25%"],
      ["L&T Finance", 9.50, null, null, null], ["LIC Housing Finance", 9.70, 12.85, 15, "1%"], ["PNB Housing Finance", 9.75, 11.85, 15, "0.75% (max ₹1 lakh)"],
      ["Godrej Housing Finance", 9.75, null, null, "Up to 3%"], ["Bajaj Finance", 9.75, 14.00, null, null]],
    "mortgage-loan": [
      ["Aditya Birla Housing Finance", 8.75, null, null, null], ["Bajaj Housing Finance", 8.99, 18.00, 20, null], ["PNB Housing Finance", 9.00, null, 15, null],
      ["Tata Capital", 9.00, 17.00, 20, "Up to 1.25%"], ["LIC Housing Finance", 9.50, 11.55, null, null], ["L&T Finance", 9.50, null, null, null], ["Godrej Housing Finance", 9.75, null, null, null]],
    "business-loan": [
      ["L&T Finance", 9.00, 26.00, null, null], ["Shriram Finance", 10.00, null, null, null], ["Tata Capital", 12.00, 30.00, null, null], ["Godrej Capital", 12.00, null, null, null],
      ["FlexiLoans", 12.00, null, null, null], ["HDB Financial Services", 13.00, null, null, null], ["Lendingkart", 13.50, null, null, null], ["Bajaj Finance", 14.00, 23.50, 8, null],
      ["Aditya Birla Capital", 14.00, null, null, null], ["Hero FinCorp", 14.00, null, null, null], ["Poonawalla Fincorp", 15.00, null, null, null],
      ["Indifi Capital", 18.00, null, null, null], ["Muthoot Fincorp", 18.00, 28.00, null, null]],
    "personal-loan": [
      ["Poonawalla Fincorp", 9.99, null, null, "Up to 3%"], ["Bajaj Finance", 10.00, 30.00, 9, "Up to 3.93%"], ["Tata Capital", 10.99, 29.99, 6, "Up to 3.5%"],
      ["Aditya Birla Capital", 10.99, 24.00, null, "Up to 3%"], ["L&T Finance", 11.00, null, null, "Up to 3%"], ["Shriram Finance", 11.00, null, null, "Up to 5%"],
      ["IIFL Finance", 12.00, 28.00, null, "2% to 9%"], ["Piramal Finance", 12.14, null, null, "Up to 5%"], ["Dhani", 13.99, null, 2, "Up to 3%"]],
    "gold-loan": [
      ["Manappuram Finance", 9.90, null, null, null], ["Muthoot Finance", 10.90, null, null, "0.25% to 1%"], ["IIFL Finance", 11.88, 27.00, 2, "Up to 2%"], ["Muthoot Fincorp", 12.00, 30.00, 2, null]],
    "car-loan": [
      ["HDB Financial Services", 8.00, 26.00, null, "Up to 3.54%"], ["Sundaram Finance", 8.00, 20.00, null, "1% to 5%"], ["Tata Capital", 9.49, null, null, "Up to 2.95%"],
      ["Mahindra Finance", 9.50, null, null, null], ["Shriram Finance", 10.00, 28.00, null, "Up to 5%"]],
    "education-loan": [
      ["HDFC Credila", 9.90, 12.50, null, "0.5% to 1%"], ["Tata Capital", 10.99, 14.50, null, null], ["Avanse Financial Services", 11.00, 14.00, null, "1% to 2%"],
      ["InCred Financial Services", 11.00, 14.00, null, null], ["Auxilo Finserve", 11.50, 14.00, null, null]]
  };
  var FAQ = [
    ["Does Quick Fund lend money?", "No. Quick Fund is a comparison service. We help you compare lenders and connect you with the ones you choose. The loan is approved and given by the lender."],
    ["What decides my interest rate?", "Your credit score, income, loan amount and tenure, your employment or business profile and, for property loans, the property itself. The lender’s own policy also matters."],
    ["Should I choose a fixed or floating rate?", "A fixed rate keeps your EMI steady. A floating rate moves with the lender’s benchmark and is usually lower at the start. Ask the lender how often a floating rate resets."],
    ["What is the difference between a loan against property and a mortgage loan?", "Both are secured by property you own. A loan against property is usually for any personal or business need, while the term mortgage loan is used more broadly, sometimes with different limits and terms. Compare both before you decide."],
    ["Does comparing loans on Quick Fund affect my credit score?", "No. Browsing rates here does not touch your credit score. A lender may check your credit report when you formally apply."],
    ["Are the rates on this site final?", "No. They are indicative starting rates collected from lender websites and public listings. Your final rate is decided by the lender after checking your profile."]
  ];
  var LEGAL = {
    terms: ["Terms and conditions", [
      "By using Quick Fund you agree to these terms. Quick Fund is an online platform that lets you compare loan products from lending partners and request a call back. We are not a lender and we do not approve, price or disburse loans.",
      "Rates, fees, tenures and eligibility shown on this site are indicative and collected from public information. The lender’s own offer letter and loan agreement are the final word on all terms. Please read them fully before you accept any loan.",
      "You agree to give accurate and complete information when you send an enquiry. You allow Quick Fund to share your enquiry details with the lenders you select or that match your request so they can contact you.",
      "Quick Fund is not responsible for a lender’s decision to approve, reject or change a loan, or for any loss arising from your dealings with a lender. We may change or stop any part of the site at any time.",
      "If you create an account, you are responsible for keeping your password confidential and for activity under your account. Please give accurate details and tell us if you suspect unauthorised use.",
      "These terms are governed by the laws of India, and the courts at the place of our registered office will have jurisdiction."]],
    privacy: ["Privacy policy", [
      "We collect the details you give us in an enquiry, such as your name, mobile number, city, loan type and amount, along with basic usage data like pages viewed and device type.",
      "We use this information to respond to your request, match you with suitable lenders, improve the site and meet legal obligations. We share your details only with lenders and service providers who need them for your request, and they must protect them.",
      "We take your consent before contacting you and you may withdraw it at any time. We keep your data only as long as needed for these purposes or as the law requires, and we use reasonable security safeguards. We do not sell your personal data.",
      "If you register, we store your name, mobile number and email to run your account, and we protect your password with industry-standard practices.",
      "In line with applicable Indian law, including the Digital Personal Data Protection Act, 2023, you can ask to access, correct or erase your data by writing to hello@quickfund.in."]],
    disclaimer: ["Disclaimer", [
      "Quick Fund is a comparison service and not a lender or financial adviser. Nothing on this site is an offer, a commitment to lend or financial advice.",
      "Interest rates, charges and eligibility change often and depend on your credit profile, income, property or business details and the lender’s policy. We try to keep the information current, but we do not guarantee that it is complete or accurate.",
      "Please confirm the final rate, fees, prepayment and foreclosure charges and all other terms directly with the lender before you apply. Borrow only what you can repay, as a missed payment can harm your credit score."]],
    cookies: ["Cookie policy", [
      "Cookies and similar technologies are small files stored on your device. We use essential cookies to make the site work and, with your permission, analytics cookies to understand how it is used.",
      "You can block or delete cookies in your browser settings. Some parts of the site may not work properly if you block essential cookies."]],
    grievance: ["Grievance redressal", [
      "If you have a complaint about Quick Fund, write to our grievance officer at hello@quickfund.in with your name, contact number and details of the issue. We will acknowledge your complaint within 2 working days and aim to resolve it within 30 days.",
      "For complaints about a loan, first contact the lender’s own grievance team. If you are not satisfied with the response, you can approach the RBI through its complaint portal (cms.rbi.org.in)."]],
    forgot: ["Forgot your password?", [
      "Write to hello@quickfund.in from your registered email address and our team will help you reset your password."]],
    fair: ["Fair practices", [
      "We show lenders and rates in a clear and neutral way, sorted by starting rate. We do not charge you a fee to compare loans or to ask for a call back.",
      "We ask for only the details needed to match you with lenders, we are open about how your data is used, and we will not pressure you to take a loan. Lenders follow the RBI’s fair practices code and digital lending guidelines."]]
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var inr = function (n) { return "₹" + Math.round(n).toLocaleString("en-IN"); };
  var by = {}; LOANS.forEach(function (l) { by[l.s] = l; });
  function rowsFor(s) { return D[s].slice().sort(function (a, b) { return a[1] - b[1]; }); }
  function emiOf(P, a, y) { var r = a / 1200, n = y * 12; return P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1); }
  function modal(id) { return bootstrap.Modal.getOrCreateInstance($(id)); }

  var mq = matchMedia("(prefers-color-scheme: dark)");
  function theme() { var t = document.documentElement.dataset.theme; document.documentElement.setAttribute("data-bs-theme", t || (mq.matches ? "dark" : "light")); }
  theme(); mq.addEventListener("change", theme);
  document.querySelectorAll("[data-logo]").forEach(function (e) { e.innerHTML = LOGO; });

  // navigation
  $("#menu").innerHTML = GROUPS.map(function (g) {
    return '<li class="nav-item dropdown"><button class="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid ' + g[1] + '"></i> ' + g[0] + '</button><ul class="dropdown-menu">' +
      g[2].map(function (s) { return '<li><a class="dropdown-item" href="#' + s + '">' + by[s].n + '</a></li>'; }).join("") + '</ul></li>';
  }).join("") + '<li class="nav-item"><a class="nav-link" href="#calculator">Calculator</a></li><li class="nav-item"><a class="nav-link" href="#how-it-works">How it works</a></li>';

  // home page content (no rates)
  var lenders = {}; Object.keys(D).forEach(function (s) { D[s].forEach(function (r) { lenders[r[0]] = 1; }); });
  var names = Object.keys(lenders).sort();
  $("#facts").innerHTML = [[names.length, "Lending partners"], [LOANS.length, "Loan types"], ["Free", "To compare and enquire"], ["1 place", "For rates, eligibility and guidance"]].map(function (f) {
    return '<div class="col-6 col-lg-3"><div class="fact"><strong>' + f[0] + '</strong><span>' + f[1] + '</span></div></div>';
  }).join("");
  $("#cards").innerHTML = LOANS.map(function (l) {
    return '<div class="col-sm-6 col-lg-4 col-xl-3"><a class="card3d tilt" href="#' + l.s + '"><span class="ico3d"><i class="fa-solid ' + l.i + '"></i></span><h3>' + l.n + '</h3><p>' + l.d + '</p><span class="go">See lenders and rates <i class="fa-solid fa-arrow-right"></i></span></a></div>';
  }).join("");
  $("#partnerList").innerHTML = names.map(function (n) { return "<span>" + n + "</span>"; }).join("");
  $("#faqs").innerHTML = FAQ.map(function (f, i) {
    return '<div class="accordion-item"><h3 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q' + i + '" aria-expanded="false" aria-controls="q' + i + '">' + f[0] + '</button></h3><div id="q' + i + '" class="accordion-collapse collapse" data-bs-parent="#faqs"><div class="accordion-body">' + f[1] + '</div></div></div>';
  }).join("");
  $("#f-type").innerHTML = LOANS.map(function (l) { return "<option>" + l.n + "</option>"; }).join("");
  $("#yr").textContent = new Date().getFullYear();


  // ---- Login and register (front-end demo: accounts are kept in this browser only; connect AUTH to your own backend before launch) ----
  var UKEY = "qf_users", SKEY = "qf_session";
  function users() { try { return JSON.parse(localStorage.getItem(UKEY) || "[]"); } catch (e) { return []; } }
  function saveUsers(u) { try { localStorage.setItem(UKEY, JSON.stringify(u)); } catch (e) {} }
  function session() { try { return JSON.parse(sessionStorage.getItem(SKEY) || localStorage.getItem(SKEY) || "null"); } catch (e) { return null; } }
  function setSession(u, remember) { var v = JSON.stringify({ name: u.name, email: u.email }); try { (remember ? localStorage : sessionStorage).setItem(SKEY, v); } catch (e) {} }
  function hash(pw, salt) {
    var data = new TextEncoder().encode(salt + pw);
    if (window.crypto && crypto.subtle) return crypto.subtle.digest("SHA-256", data).then(function (b) { return Array.prototype.map.call(new Uint8Array(b), function (x) { return ("0" + x.toString(16)).slice(-2); }).join(""); });
    var h = 5381; (salt + pw).split("").forEach(function (c) { h = ((h << 5) + h + c.charCodeAt(0)) | 0; }); return Promise.resolve("d" + h);
  }
  function digits(v) { return v.replace(/\D/g, "").slice(-10); }
  function renderAuthNav() {
    var s = session();
    $("#authNav").innerHTML = s
      ? '<div class="dropdown"><button class="login dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-circle-user"></i> Hi, ' + s.name.split(" ")[0].replace(/[<>&"]/g, "") + '</button><ul class="dropdown-menu dropdown-menu-end"><li><button class="dropdown-item" type="button" data-logout><i class="fa-solid fa-right-from-bracket"></i> Log out</button></li></ul></div>'
      : '<a class="login" href="#login">Login</a><a class="btn btn-3d" href="#register">Register</a>';
    var tabAuth = $("#tabAuth"), tabAuthLabel = $("#tabAuthLabel");
    if (tabAuth && tabAuthLabel) {
      if (s) {
        tabAuthLabel.textContent = s.name.split(" ")[0].replace(/[<>&"]/g, "");
        tabAuth.href = "#home";
      } else {
        tabAuthLabel.textContent = "Login";
        tabAuth.href = "#login";
      }
    }
  }
  function pwField(id, label, auto) {
    return '<div class="col-12"><label class="form-label" for="' + id + '">' + label + '</label><div class="pw"><input id="' + id + '" name="' + id + '" type="password" class="form-control" required autocomplete="' + auto + '"><button type="button" data-showpw="' + id + '" aria-label="Show or hide password"><i class="fa-solid fa-eye"></i></button></div></div>';
  }
  function renderAuth(kind) {
    var reg = kind === "register";
    $("#view-auth").innerHTML = '<section class="auth"><div class="container"><div class="auth-wrap">' +
      '<div class="auth-side"><a class="navbar-brand" href="#home">' + LOGO + '<span class="wm">Quick<span class="b2">Fund</span></span></a>' +
      '<h2>' + (reg ? "Create your free account" : "Welcome back") + '</h2><p class="lead-p">' + (reg ? "Join Quick Fund to compare loans and get guided by an advisor." : "Log in to continue comparing loans and rates.") + '</p>' +
      '<ul><li><i class="fa-solid fa-circle-check"></i>Compare leading lenders in one place</li><li><i class="fa-solid fa-circle-check"></i>Free to use, no obligation</li><li><i class="fa-solid fa-circle-check"></i>Your details stay protected</li></ul></div>' +
      '<div class="auth-form"><h1>' + (reg ? "Register" : "Login") + '</h1><p class="sub">' + (reg ? "It takes less than a minute." : "Enter your details to log in.") + '</p>' +
      '<div class="auth-err" id="authErr" role="alert"></div>' +
      '<form id="authForm" class="row g-3" novalidate data-kind="' + kind + '">' +
      (reg ? '<div class="col-12"><label class="form-label" for="a-name">Full name</label><input id="a-name" name="name" class="form-control" required autocomplete="name"></div>' +
             '<div class="col-md-6"><label class="form-label" for="a-phone">Mobile number</label><input id="a-phone" name="phone" class="form-control" required inputmode="tel" autocomplete="tel" placeholder="10-digit number"></div>' +
             '<div class="col-md-6"><label class="form-label" for="a-email">Email</label><input id="a-email" name="email" type="email" class="form-control" required autocomplete="email"></div>'
           : '<div class="col-12"><label class="form-label" for="a-id">Email or mobile number</label><input id="a-id" name="id" class="form-control" required autocomplete="username"></div>') +
      pwField("a-pw", "Password", reg ? "new-password" : "current-password") +
      (reg ? pwField("a-pw2", "Confirm password", "new-password") + '<div class="col-12 form-text mt-0">Use at least 8 characters with letters and numbers.</div>' +
             '<div class="col-12"><div class="form-check"><input class="form-check-input" type="checkbox" id="a-agree" name="agree"><label class="form-check-label" for="a-agree">I agree to the <button type="button" class="linkbtn" data-legal="terms">Terms and conditions</button> and <button type="button" class="linkbtn" data-legal="privacy">Privacy policy</button></label></div></div>'
           : '<div class="col-12 d-flex justify-content-between flex-wrap gap-2"><div class="form-check"><input class="form-check-input" type="checkbox" id="a-rem" name="remember"><label class="form-check-label" for="a-rem">Remember me</label></div><button type="button" class="linkbtn" data-legal="forgot">Forgot password?</button></div>') +
      '<div class="col-12"><button class="btn btn-3d w-100" type="submit">' + (reg ? "Create account" : "Log in") + '</button></div></form>' +
      '<p class="auth-alt">' + (reg ? 'Already registered? <a href="#login">Log in</a>' : 'New to Quick Fund? <a href="#register">Create an account</a>') + '</p></div></div></div></section>';
  }
  function authError(m) { var b = $("#authErr"); b.textContent = m; b.classList.add("show"); b.scrollIntoView({ block: "nearest" }); }
  document.addEventListener("submit", function (e) {
    var f = e.target; if (f.id !== "authForm") return; e.preventDefault();
    var d = new FormData(f), reg = f.dataset.kind === "register", all = users(), pw = d.get("a-pw") || "";
    $("#authErr").classList.remove("show");
    if (reg) {
      var name = (d.get("name") || "").trim(), ph = digits(d.get("phone") || ""), em = (d.get("email") || "").trim().toLowerCase();
      if (name.length < 2) return authError("Please enter your full name.");
      if (!/^[6-9]\d{9}$/.test(ph)) return authError("Please enter a valid 10-digit mobile number.");
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return authError("Please enter a valid email address.");
      if (pw.length < 8 || !/[A-Za-z]/.test(pw) || !/\d/.test(pw)) return authError("Password needs at least 8 characters with letters and numbers.");
      if (pw !== d.get("a-pw2")) return authError("The two passwords do not match.");
      if (!d.get("agree")) return authError("Please accept the terms and privacy policy to continue.");
      if (all.some(function (u) { return u.email === em || u.phone === ph; })) return authError("An account with this email or mobile number already exists. Please log in.");
      var salt = Math.random().toString(36).slice(2);
      hash(pw, salt).then(function (h) { var u = { name: name, phone: ph, email: em, salt: salt, h: h }; all.push(u); saveUsers(all); setSession(u, true); renderAuthNav(); location.hash = "home"; });
    } else {
      var id = (d.get("id") || "").trim().toLowerCase(), idp = digits(id);
      var u = all.filter(function (x) { return x.email === id || x.phone === idp; })[0];
      if (!u) return authError("We could not find an account with these details.");
      hash(pw, u.salt).then(function (h) { if (h !== u.h) return authError("Incorrect password. Please try again."); setSession(u, !!d.get("remember")); renderAuthNav(); location.hash = "home"; });
    }
  });

  // loan page (rates live here)
  function renderLoan(l) {
    var R = rowsFor(l.s), grp = GROUPS.filter(function (g) { return g[2].indexOf(l.s) > -1; })[0];
    $("#view-loan").innerHTML =
      '<section class="loan-head"><div class="container">' +
      '<nav class="crumbs" aria-label="Breadcrumb"><a href="#home">Home</a> / ' + grp[0] + ' / ' + l.n + '</nav>' +
      '<div class="d-flex align-items-center gap-3 mt-3"><span class="ico3d"><i class="fa-solid ' + l.i + '"></i></span><h1>' + l.n + ' interest rates</h1></div>' +
      '<p class="lead">' + l.d + '</p>' +
      '<div class="row g-3 mt-1"><div class="col-6 col-md-3"><div class="stat"><small>Lenders</small><strong>' + R.length + '</strong></div></div>' +
      '<div class="col-6 col-md-3"><div class="stat"><small>Lowest starting rate</small><strong>' + R[0][1].toFixed(2) + '%</strong></div></div>' +
      '<div class="col-12 col-md-6"><div class="stat"><small>Rates reviewed</small><strong>' + REVIEWED + '</strong></div></div></div>' +
      '</div></section>' +
      '<section class="py-section sec-light"><div class="container"><h2 class="mb-2">Lenders offering a ' + l.n.toLowerCase() + '</h2><p class="sub">Sorted from the lowest starting rate. Your own rate depends on your profile.</p><div class="row g-4">' +
      R.map(function (r, i) {
        var yrs = Math.min(r[3] || l.t, l.t), rows = "";
        if (r[2]) rows += "<dt>Typical range</dt><dd>" + r[1].toFixed(2) + "% to " + r[2].toFixed(2) + "%</dd>";
        if (r[3]) rows += "<dt>Max tenure</dt><dd>" + r[3] + " years</dd>";
        if (r[4]) rows += "<dt>Processing fee</dt><dd>" + r[4] + "</dd>";
        return '<div class="col-md-6 col-lg-4"><article class="lender tilt">' + (i === 0 ? '<span class="best">Lowest rate</span>' : '') +
          '<h3>' + r[0] + '</h3><div class="rate"><small>from</small> ' + r[1].toFixed(2) + '%<small> a year</small></div>' +
          (rows ? "<dl>" + rows + "</dl>" : '<p class="hint mt-2">Fees and tenure: confirm with the lender.</p>') +
          '<p class="hint">EMI on ₹10 lakh for ' + yrs + (yrs === 1 ? ' year' : ' years') + ' at this rate: <b>' + inr(emiOf(1000000, r[1], yrs)) + '</b></p>' +
          '<button class="btn btn-3d w-100" data-apply data-loan="' + l.n + '" data-lender="' + r[0] + '">Apply with ' + r[0] + '</button></article></div>';
      }).join("") + '</div>' +
      '<p class="note">Rates are indicative starting rates per year, compiled from lender websites and public comparison listings (2025 to 2026) and last reviewed in ' + REVIEWED + '. They change often and vary with your credit score, income and the lender’s policy. Please confirm the final rate and charges with the lender before you sign.</p></div></section>' +
      '<section class="py-section sec-dark"><div class="container"><div class="row g-4">' +
      '<div class="col-lg-4"><div class="panel-box"><h3>Who can apply</h3><p class="mt-3 mb-0" style="color:#ded6f7">' + l.e + '</p></div></div>' +
      '<div class="col-lg-4"><div class="panel-box"><h3>Documents you may need</h3><ul class="mt-3">' + DOCS[l.k].map(function (d) { return "<li>" + d + "</li>"; }).join("") + '</ul></div></div>' +
      '<div class="col-lg-4"><div class="panel-box"><h3>Before you apply</h3><ul class="mt-3"><li>Check your credit score. 750 or above usually gets better offers.</li><li>Compare the processing fee and prepayment charges, not just the rate.</li><li>Ask if the rate is fixed or floating.</li><li>Borrow only what you can comfortably repay.</li></ul></div></div>' +
      '</div></div></section>';
  }

  function route() {
    var h = (location.hash || "#home").slice(1), l = by[h], au = h === "login" || h === "register";
    if (au && session()) { location.hash = "home"; return; }
    $("#view-home").hidden = !!(l || au); $("#view-loan").hidden = !l; $("#view-auth").hidden = !au;
    if (au) { renderAuth(h); document.title = (h === "login" ? "Login" : "Register") + " | Quick Fund"; window.scrollTo(0, 0); }
    else if (l) { renderLoan(l); document.title = l.n + " interest rates – compare lenders | Quick Fund"; window.scrollTo(0, 0); }
    else { document.title = "Quick Fund – Compare loans from leading lenders"; var t = h !== "home" && document.getElementById(h); if (t) t.scrollIntoView(); else window.scrollTo(0, 0); }
    document.querySelectorAll(".dropdown-item").forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + h); });
    var c = $("#nav"); if (c.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(c).hide();
    var tabHome = $("#tabHome"), tabCalc = $("#tabCalc"), tabAuth = $("#tabAuth");
    if (tabHome && tabCalc && tabAuth) {
      tabHome.classList.toggle("active", h === "home" || h === "" || (!by[h] && h !== "calculator" && h !== "login" && h !== "register"));
      tabCalc.classList.toggle("active", h === "calculator");
      tabAuth.classList.toggle("active", h === "login" || h === "register");
    }
    tilt();
  }
  addEventListener("hashchange", route);

  var still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function tilt() {
    if (still) return;
    document.querySelectorAll(".tilt").forEach(function (el) {
      if (el.dataset.t) return; el.dataset.t = 1;
      el.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse") return;
        var b = el.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5;
        el.style.transform = "perspective(800px) rotateX(" + (-y * 9).toFixed(1) + "deg) rotateY(" + (x * 11).toFixed(1) + "deg) translateY(-4px)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }

  function calc() {
    var P = +$("#amt").value, a = +$("#rate").value, y = +$("#ten").value, e = emiOf(P, a, y), n = y * 12;
    $("#amtO").textContent = inr(P); $("#rateO").textContent = a + "%"; $("#tenO").textContent = y + (y === 1 ? " year" : " years");
    $("#emi-v").textContent = inr(e); $("#int").textContent = inr(e * n - P); $("#tot").textContent = inr(e * n);
  }
  ["#amt", "#rate", "#ten"].forEach(function (s) { $(s).addEventListener("input", calc); });

  document.addEventListener("click", function (e) {
    var lo = e.target.closest("[data-logout]"), sp = e.target.closest("[data-showpw]");
    if (lo) { try { sessionStorage.removeItem(SKEY); localStorage.removeItem(SKEY); } catch (x) {} renderAuthNav(); location.hash = "home"; route(); }
    if (sp) { var inp = document.getElementById(sp.dataset.showpw); inp.type = inp.type === "password" ? "text" : "password"; }
    var a = e.target.closest("[data-apply]"), g = e.target.closest("[data-legal]");
    if (a) { if (a.dataset.loan) $("#f-type").value = a.dataset.loan; $("#f-lender").value = a.dataset.lender || ""; modal("#applyModal").show(); }
    if (g) { var L = LEGAL[g.dataset.legal]; $("#legalTitle").textContent = L[0]; $("#legalBody").innerHTML = L[1].map(function (p) { return "<p>" + p + "</p>"; }).join(""); modal("#legalModal").show(); }
  });
  $("#form").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = new FormData(this), v = function (k) { return f.get(k) || "-"; };
    var body = "Name: " + v("name") + "\nMobile: " + v("phone") + "\nLoan type: " + v("type") + "\nLender: " + v("lender") + "\nAmount: ₹" + v("amount") + "\nCity: " + v("city");
    modal("#applyModal").hide();
    location.href = "mailto:hello@quickfund.in?subject=" + encodeURIComponent("Loan enquiry – " + v("type")) + "&body=" + encodeURIComponent(body);
  });

  renderAuthNav(); calc(); route();
})();
