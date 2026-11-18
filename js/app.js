(function () {
  var LOGO = '<img src="assets/logo.png" alt="Quick Fund Logo" class="brand-logo-img" width="40" height="40">';
  var REVIEWED = "November 2026";

  // Enforce light theme permanently so device dark mode doesn't wash out text
  document.documentElement.setAttribute("data-bs-theme", "light");
  document.documentElement.removeAttribute("data-theme");

  // Only Business Loan, Home Loan, Mortgage Loan, and Loan Against Property
  var LOANS = [
    {
      s: "business-loan",
      n: "Business loan",
      i: "fa-briefcase",
      t: 8,
      k: "business",
      d: "Working capital, business expansion and machinery financing with fast sanction from top lenders.",
      e: "A business running for 2 or more years with turnover proof, GST registration and bank statements.",
      img: "assets/page-business-loan.jpg"
    },
    {
      s: "home-loan",
      n: "Home loan",
      i: "fa-house",
      t: 30,
      k: "property",
      d: "Buy, build or extend your dream house with affordable interest rates and repayment up to 30 years.",
      e: "Salaried or self-employed individuals, age 21 to 65, with steady income and a good credit score.",
      img: "assets/page-home-loan.jpg"
    },
    {
      s: "mortgage-loan",
      n: "Mortgage loan",
      i: "fa-file-contract",
      t: 20,
      k: "property",
      d: "A high-value property-backed mortgage loan for major business, education, medical or personal needs.",
      e: "Owner of a residential or commercial property with clear legal title and repayment ability.",
      img: "assets/page-mortgage-loan.jpg"
    },
    {
      s: "loan-against-property",
      n: "Loan against property",
      i: "fa-landmark",
      t: 20,
      k: "property",
      d: "Borrow high funds against a house, office or land you already own, while continuing to use it.",
      e: "Owner of residential or commercial property with clear title, steady income and credit score of 700+.",
      img: "assets/page-property-loan.jpg"
    }
  ];

  var DOCS = {
    property: [
      "Identity and address proof (Aadhaar, PAN card, Passport)",
      "Last 3 months’ salary slips or 2 years’ ITR with computation",
      "Last 6 months’ operative bank account statements",
      "Property papers: title deed, approved plan, prior deeds, latest tax receipts"
    ],
    business: [
      "Identity and address proof of promoters/directors (Aadhaar, PAN)",
      "Business registration proof (GST certificate, Udyam MSME, Partnership deed/COI)",
      "Last 2 to 3 years’ audited financial statements with ITR returns",
      "Last 6 to 12 months’ current bank account statements"
    ]
  };

  // Rows: [lender, rate from %, rate to % (or null), max tenure in years (or null), processing fee (or null)]
  var D = {
    "business-loan": [
      ["L&T Finance", 9.00, 26.00, 5, "Up to 2%"],
      ["Shriram Finance", 10.00, 28.00, 5, "Up to 3%"],
      ["Tata Capital", 12.00, 30.00, 5, "Up to 2.5%"],
      ["Godrej Capital", 12.00, 24.00, 7, "Up to 2%"],
      ["FlexiLoans", 12.00, 28.00, 3, "Up to 3%"],
      ["HDB Financial Services", 13.00, 28.00, 5, "Up to 3%"],
      ["Lendingkart", 13.50, 30.00, 3, "Up to 2.5%"],
      ["Bajaj Finance", 14.00, 23.50, 8, "Up to 3.5%"],
      ["Aditya Birla Capital", 14.00, 26.00, 5, "Up to 3%"],
      ["Hero FinCorp", 14.00, 25.00, 5, "Up to 2.5%"],
      ["Poonawalla Fincorp", 15.00, 26.00, 5, "Up to 2%"],
      ["Muthoot Fincorp", 18.00, 28.00, 5, "Up to 3%"],
      ["Indifi Capital", 18.00, 32.00, 3, "Up to 3.5%"]
    ],
    "home-loan": [
      ["LIC Housing Finance", 7.15, 9.80, 30, "0.5% (max ₹10,000)"],
      ["Bajaj Housing Finance", 7.25, 9.50, 30, "Up to 0.5%"],
      ["PNB Housing Finance", 7.50, 10.50, 30, "0.5% (max ₹15,000)"],
      ["Tata Capital Housing Finance", 7.50, 10.25, 30, "0.5%"],
      ["ICICI Home Finance", 7.50, 11.00, 30, "0.5% to 1%"],
      ["Godrej Housing Finance", 7.65, 10.50, 30, "Up to 0.5%"],
      ["GIC Housing Finance", 8.20, 11.50, 30, "Up to 1%"],
      ["Easy Home Finance", 8.99, 13.00, 25, "Up to 1.5%"]
    ],
    "mortgage-loan": [
      ["Aditya Birla Housing Finance", 8.75, 14.00, 20, "Up to 1%"],
      ["Bajaj Housing Finance", 8.99, 18.00, 20, "Up to 2%"],
      ["PNB Housing Finance", 9.00, 14.50, 15, "0.75% to 1.5%"],
      ["Tata Capital", 9.00, 17.00, 20, "Up to 1.25%"],
      ["LIC Housing Finance", 9.50, 11.55, 15, "1%"],
      ["L&T Finance", 9.50, 15.00, 15, "Up to 2%"],
      ["Godrej Housing Finance", 9.75, 15.00, 20, "Up to 1.5%"]
    ],
    "loan-against-property": [
      ["Aditya Birla Housing Finance", 8.75, 14.00, 20, "Up to 1%"],
      ["Bajaj Housing Finance", 8.99, 18.00, 20, "Up to 4%"],
      ["Tata Capital", 9.00, 17.00, 20, "Up to 1.25%"],
      ["L&T Finance", 9.50, 16.00, 15, "Up to 2%"],
      ["LIC Housing Finance", 9.70, 12.85, 15, "1%"],
      ["PNB Housing Finance", 9.75, 11.85, 15, "0.75% (max ₹1 lakh)"],
      ["Godrej Housing Finance", 9.75, 15.00, 20, "Up to 3%"],
      ["Bajaj Finance", 9.75, 14.00, 15, "Up to 2.5%"]
    ]
  };

  var FAQ = [
    ["Does Quick Fund lend money directly?", "No. Quick Fund is an online comparison service. We help you compare verified loan options and connect you with leading institutional lenders. The final approval and disbursal is carried out by the respective lender."],
    ["What decides my interest rate?", "Your credit score, annual income, loan amount, repayment tenure, employment/business profile, and property title clarity (for property-backed loans). Lenders also apply their internal risk matrices."],
    ["What is the difference between a loan against property and a mortgage loan?", "Both are secured by property you own. A loan against property (LAP) is commonly taken for general business expansion or large personal needs. A mortgage loan is a broader term encompassing all property-backed facilities, often with customized tenure and higher valuation ratios. Compare both to find your best rate."],
    ["Can I get a business loan without collateral?", "Yes, many of our partner lenders offer unsecured business loans up to ₹50 lakh based on your business turnover, GST returns, and bank statements without requiring physical collateral."],
    ["Does checking loan rates affect my credit score?", "No. Comparing indicative rates and browsing on Quick Fund does not touch your credit score. An enquiry only leads to a formal credit check when you officially submit an application with a chosen lender."],
    ["Are the rates shown on Quick Fund final?", "They are indicative starting rates collected directly from lender rate cards and public filings. Your final approved rate is determined by the lender after reviewing your financial documents."]
  ];

  var LEGAL = {
    terms: ["Terms and conditions", [
      "By using Quick Fund you agree to these terms. Quick Fund is an online comparison platform that allows you to compare business loans, home loans, mortgage loans, and loans against property from verified lending partners.",
      "Rates, fees, tenures and eligibility shown on this site are indicative. The lender’s official sanction letter and loan agreement govern all terms and conditions.",
      "You agree to provide true and accurate information when submitting an enquiry. You authorize Quick Fund to share your contact details with matching lenders to facilitate your loan request.",
      "Quick Fund is not responsible for any lender's decision to approve, reject, or modify an application.",
      "These terms are governed by the laws of India, and courts at the registered office of Quick Fund shall have exclusive jurisdiction."
    ]],
    privacy: ["Privacy policy", [
      "We collect details you submit in an enquiry, such as your name, mobile number, city, required loan amount and loan type.",
      "We use this information solely to connect you with suitable lenders and financial advisors. We never sell your personal data to unauthorized third parties.",
      "In compliance with the Digital Personal Data Protection Act, 2023, you can request access, modification, or erasure of your stored information by contacting hello@quickfund.in."
    ]],
    disclaimer: ["Disclaimer", [
      "Quick Fund is a comparison portal and not a bank, NBFC, or direct lender. Nothing on this website constitutes a binding offer to lend money.",
      "Interest rates and charges are subject to market conditions and individual borrower eligibility. Please confirm all details directly with the lender before executing agreements."
    ]],
    cookies: ["Cookie policy", [
      "We use necessary cookies to ensure the website functions properly and maintain your demo session."
    ]],
    grievance: ["Grievance redressal", [
      "For queries or complaints regarding Quick Fund services, write to our Grievance Officer at hello@quickfund.in. We acknowledge all grievances within 48 business hours and resolve them within 30 days."
    ]],
    fair: ["Fair practices", [
      "We present rates objectively, sorted by starting interest rates. We never levy comparison fees or pressure borrowers into taking loans."
    ]],
    forgot: ["Forgot your password?", [
      "Write to hello@quickfund.in from your registered email address and our support team will help you reset your credentials."
    ]]
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var inr = function (n) { return "₹" + Math.round(n).toLocaleString("en-IN"); };
  var by = {};
  LOANS.forEach(function (l) { by[l.s] = l; });

  function rowsFor(s) {
    return (D[s] || []).slice().sort(function (a, b) { return a[1] - b[1]; });
  }

  function emiOf(P, a, y) {
    var r = a / 1200, n = y * 12;
    return P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  }

  function modal(id) {
    return bootstrap.Modal.getOrCreateInstance($(id));
  }

  document.querySelectorAll("[data-logo]").forEach(function (e) {
    e.innerHTML = LOGO;
  });

  /* --------------------------------------------------------------------------
     NAVIGATION (Spacious Navbar with Business Loan & Home Loans Dropdown)
     -------------------------------------------------------------------------- */
  var menuHtml =
    '<li class="nav-item">' +
      '<a class="nav-link" href="#business-loan"><i class="fa-solid fa-briefcase"></i> Business Loan</a>' +
    '</li>' +
    '<li class="nav-item dropdown">' +
      '<button class="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">' +
        '<i class="fa-solid fa-house"></i> Home Loans' +
      '</button>' +
      '<ul class="dropdown-menu">' +
        '<li><a class="dropdown-item" href="#home-loan"><i class="fa-solid fa-house"></i> Home Loan</a></li>' +
        '<li><a class="dropdown-item" href="#mortgage-loan"><i class="fa-solid fa-file-contract"></i> Mortgage Loan</a></li>' +
        '<li><a class="dropdown-item" href="#loan-against-property"><i class="fa-solid fa-landmark"></i> Loan Against Property</a></li>' +
      '</ul>' +
    '</li>' +
    '<li class="nav-item"><a class="nav-link" href="#calculator"><i class="fa-solid fa-calculator"></i> Calculator</a></li>' +
    '<li class="nav-item"><a class="nav-link" href="#how-it-works"><i class="fa-solid fa-list-check"></i> How It Works</a></li>';

  $("#menu").innerHTML = menuHtml;

  // Lenders and facts
  var lenders = {};
  Object.keys(D).forEach(function (s) {
    D[s].forEach(function (r) { lenders[r[0]] = 1; });
  });
  var names = Object.keys(lenders).sort();

  $("#facts").innerHTML = [
    [names.length, "Lending Partners"],
    [LOANS.length, "Specialized Loans"],
    ["Free", "To Compare & Enquire"],
    ["1 Place", "Rates, Eligibility & Advice"]
  ].map(function (f) {
    return '<div class="col-6 col-lg-3"><div class="fact"><strong>' + f[0] + '</strong><span>' + f[1] + '</span></div></div>';
  }).join("");

  // Home Page Loan Cards (Only 4 Loans)
  $("#cards").innerHTML = LOANS.map(function (l) {
    return (
      '<div class="col-sm-6 col-lg-6 col-xl-3">' +
      '<a class="card3d tilt" href="#' + l.s + '">' +
      '<span class="ico3d"><i class="fa-solid ' + l.i + '"></i></span>' +
      '<h3>' + l.n + '</h3>' +
      '<p>' + l.d + '</p>' +
      '<span class="go">Compare ' + (D[l.s] ? D[l.s].length : 0) + ' lenders <i class="fa-solid fa-arrow-right"></i></span>' +
      '</a></div>'
    );
  }).join("");

  $("#partnerList").innerHTML = names.map(function (n) {
    return "<span>" + n + "</span>";
  }).join("");

  $("#faqs").innerHTML = FAQ.map(function (f, i) {
    return (
      '<div class="accordion-item">' +
      '<h3 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q' + i + '" aria-expanded="false" aria-controls="q' + i + '">' + f[0] + '</button></h3>' +
      '<div id="q' + i + '" class="accordion-collapse collapse" data-bs-parent="#faqs"><div class="accordion-body">' + f[1] + '</div></div>' +
      '</div>'
    );
  }).join("");

  $("#f-type").innerHTML = LOANS.map(function (l) {
    return "<option value=\"" + l.n + "\">" + l.n + "</option>";
  }).join("");

  $("#yr").textContent = new Date().getFullYear();

  /* --------------------------------------------------------------------------
     LOGIN & REGISTER (Demo Client-Side Authentication, No Toggle Button)
     -------------------------------------------------------------------------- */
  var UKEY = "qf_users", SKEY = "qf_session";
  function users() { try { return JSON.parse(localStorage.getItem(UKEY) || "[]"); } catch (e) { return []; } }
  function saveUsers(u) { try { localStorage.setItem(UKEY, JSON.stringify(u)); } catch (e) {} }
  function session() { try { return JSON.parse(sessionStorage.getItem(SKEY) || localStorage.getItem(SKEY) || "null"); } catch (e) { return null; } }
  function setSession(u, remember) { var v = JSON.stringify({ name: u.name, email: u.email }); try { (remember ? localStorage : sessionStorage).setItem(SKEY, v); } catch (e) {} }
  function hash(pw, salt) {
    var data = new TextEncoder().encode(salt + pw);
    if (window.crypto && crypto.subtle) {
      return crypto.subtle.digest("SHA-256", data).then(function (b) {
        return Array.prototype.map.call(new Uint8Array(b), function (x) { return ("0" + x.toString(16)).slice(-2); }).join("");
      });
    }
    var h = 5381;
    (salt + pw).split("").forEach(function (c) { h = ((h << 5) + h + c.charCodeAt(0)) | 0; });
    return Promise.resolve("d" + h);
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
    return (
      '<div class="col-12"><label class="form-label" for="' + id + '">' + label + '</label>' +
      '<div class="pw"><input id="' + id + '" name="' + id + '" type="password" class="form-control" required autocomplete="' + auto + '">' +
      '<button type="button" data-showpw="' + id + '" aria-label="Show or hide password"><i class="fa-solid fa-eye"></i></button></div></div>'
    );
  }

  function renderAuth(kind) {
    var reg = kind === "register";
    $("#view-auth").innerHTML =
      '<section class="auth"><div class="container"><div class="auth-wrap">' +
      '<div class="auth-side"><a class="navbar-brand" href="#home">' + LOGO + '<span class="wm">Quick<span class="b2">Fund</span></span></a>' +
      '<h2>' + (reg ? "Create your free account" : "Welcome back") + '</h2>' +
      '<p class="lead-p">' + (reg ? "Join Quick Fund to compare business and home loans and connect with expert advisors." : "Log in to track your loan comparisons and check latest lender rates.") + '</p>' +
      '<ul><li><i class="fa-solid fa-circle-check"></i>Compare leading lenders in one place</li><li><i class="fa-solid fa-circle-check"></i>Free to use, zero obligation</li><li><i class="fa-solid fa-circle-check"></i>Your financial details stay protected</li></ul></div>' +
      '<div class="auth-form"><h1>' + (reg ? "Register" : "Login") + '</h1><p class="sub">' + (reg ? "It takes less than a minute." : "Enter your credentials to log in.") + '</p>' +
      '<div class="auth-err" id="authErr" role="alert"></div>' +
      '<form id="authForm" class="row g-3" novalidate data-kind="' + kind + '">' +
      (reg
        ? '<div class="col-12"><label class="form-label" for="a-name">Full name</label><input id="a-name" name="name" class="form-control" required autocomplete="name"></div>' +
          '<div class="col-md-6"><label class="form-label" for="a-phone">Mobile number</label><input id="a-phone" name="phone" class="form-control" required inputmode="tel" autocomplete="tel" placeholder="10-digit number"></div>' +
          '<div class="col-md-6"><label class="form-label" for="a-email">Email</label><input id="a-email" name="email" type="email" class="form-control" required autocomplete="email"></div>'
        : '<div class="col-12"><label class="form-label" for="a-id">Email or mobile number</label><input id="a-id" name="id" class="form-control" required autocomplete="username"></div>') +
      pwField("a-pw", "Password", reg ? "new-password" : "current-password") +
      (reg
        ? pwField("a-pw2", "Confirm password", "new-password") +
          '<div class="col-12 form-text mt-0">Use at least 8 characters with letters and numbers.</div>' +
          '<div class="col-12"><div class="form-check"><input class="form-check-input" type="checkbox" id="a-agree" name="agree"><label class="form-check-label" for="a-agree">I agree to the <button type="button" class="linkbtn" data-legal="terms">Terms and conditions</button> and <button type="button" class="linkbtn" data-legal="privacy">Privacy policy</button></label></div></div>'
        : '<div class="col-12 d-flex justify-content-between flex-wrap gap-2"><div class="form-check"><input class="form-check-input" type="checkbox" id="a-rem" name="remember"><label class="form-check-label" for="a-rem">Remember me</label></div><button type="button" class="linkbtn" data-legal="forgot">Forgot password?</button></div>') +
      '<div class="col-12"><button class="btn btn-3d w-100" type="submit">' + (reg ? "Create account" : "Log in") + '</button></div></form>' +
      '<p class="auth-alt">' + (reg ? 'Already registered? <a href="#login">Log in</a>' : 'New to Quick Fund? <a href="#register">Create an account</a>') + '</p></div></div></div></section>';
  }

  function authError(m) {
    var b = $("#authErr");
    if (!b) return;
    b.textContent = m;
    b.classList.add("show");
    b.scrollIntoView({ block: "nearest" });
  }

  document.addEventListener("submit", function (e) {
    var f = e.target;
    if (f.id !== "authForm") return;
    e.preventDefault();
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
      hash(pw, salt).then(function (h) {
        var u = { name: name, phone: ph, email: em, salt: salt, h: h };
        all.push(u);
        saveUsers(all);
        setSession(u, true);
        renderAuthNav();
        location.hash = "home";
      });
    } else {
      var id = (d.get("id") || "").trim().toLowerCase(), idp = digits(id);
      var u = all.filter(function (x) { return x.email === id || x.phone === idp; })[0];
      if (!u) return authError("We could not find an account with these details.");
      hash(pw, u.salt).then(function (h) {
        if (h !== u.h) return authError("Incorrect password. Please try again.");
        setSession(u, !!d.get("remember"));
        renderAuthNav();
        location.hash = "home";
      });
    }
  });

  /* --------------------------------------------------------------------------
     LOAN VIEW PAGE (TALL HERO PICTURE BANNER WITH AUTHENTIC NATURAL PHOTO)
     -------------------------------------------------------------------------- */
  function renderLoan(l) {
    var R = rowsFor(l.s);
    var grp = l.s === "business-loan" ? "Business Loans" : "Home Loans";
    var heroBg = l.img || "assets/page-home-loan.jpg";

    $("#view-loan").innerHTML =
      '<section class="loan-hero-banner" style="background-image: url(\'' + heroBg + '\')">' +
      '<div class="loan-hero-overlay"></div>' +
      '<div class="container loan-hero-container">' +
      '<nav class="crumbs" aria-label="Breadcrumb">' +
        '<a href="#home">Home</a> <i class="fa-solid fa-chevron-right crumb-sep"></i> ' +
        grp + ' <i class="fa-solid fa-chevron-right crumb-sep"></i> ' +
        '<span>' + l.n + '</span>' +
      '</nav>' +
      '<div class="d-flex align-items-center gap-3 mt-3">' +
        '<span class="ico3d loan-hero-icon"><i class="fa-solid ' + l.i + '"></i></span>' +
        '<h1 class="loan-hero-title">' + l.n + ' interest rates</h1>' +
      '</div>' +
      '<p class="lead loan-hero-lead">' + l.d + '</p>' +
      '<div class="row g-3 mt-3">' +
        '<div class="col-6 col-md-3"><div class="stat loan-stat"><small>Lenders</small><strong>' + R.length + '</strong></div></div>' +
        '<div class="col-6 col-md-3"><div class="stat loan-stat"><small>Lowest starting rate</small><strong>' + (R.length ? R[0][1].toFixed(2) + '%' : 'N/A') + '</strong></div></div>' +
        '<div class="col-12 col-md-6"><div class="stat loan-stat"><small>Rates reviewed</small><strong>' + REVIEWED + '</strong></div></div>' +
      '</div>' +
      '</div></section>' +

      '<section class="py-section sec-light"><div class="container">' +
      '<h2 class="mb-2">Lenders offering a ' + l.n.toLowerCase() + '</h2>' +
      '<p class="sub">Sorted from the lowest starting rate. Your final rate depends on your financial profile.</p>' +
      '<div class="row g-4">' +
      R.map(function (r, i) {
        var yrs = Math.min(r[3] || l.t, l.t), rows = "";
        if (r[2]) rows += "<dt>Typical range</dt><dd>" + r[1].toFixed(2) + "% to " + r[2].toFixed(2) + "%</dd>";
        if (r[3]) rows += "<dt>Max tenure</dt><dd>" + r[3] + " years</dd>";
        if (r[4]) rows += "<dt>Processing fee</dt><dd>" + r[4] + "</dd>";
        return (
          '<div class="col-md-6 col-lg-4"><article class="lender tilt">' +
          (i === 0 ? '<span class="best">Lowest rate</span>' : '') +
          '<h3>' + r[0] + '</h3>' +
          '<div class="rate"><small>from</small> ' + r[1].toFixed(2) + '%<small> a year</small></div>' +
          (rows ? "<dl>" + rows + "</dl>" : '<p class="hint mt-2">Fees and tenure: confirm with the lender.</p>') +
          '<p class="hint">EMI on ₹10 lakh for ' + yrs + (yrs === 1 ? ' year' : ' years') + ' at this rate: <b>' + inr(emiOf(1000000, r[1], yrs)) + '</b></p>' +
          '<button class="btn btn-3d w-100" data-apply data-loan="' + l.n + '" data-lender="' + r[0] + '">Apply with ' + r[0] + '</button>' +
          '</article></div>'
        );
      }).join("") + '</div>' +
      '<p class="note">Rates are indicative starting rates per year, compiled from lender websites and public comparison filings (2025 to 2026) and last reviewed in ' + REVIEWED + '. Rates depend on borrower credit score, turnover, and lender policy. Please verify final terms before signing.</p>' +
      '</div></section>' +

      '<section class="py-section sec-dark"><div class="container"><div class="row g-4">' +
      '<div class="col-lg-4"><div class="panel-box"><h3>Who can apply</h3><p class="mt-3 mb-0 panel-box-text">' + l.e + '</p></div></div>' +
      '<div class="col-lg-4"><div class="panel-box"><h3>Documents you may need</h3><ul class="mt-3">' + DOCS[l.k].map(function (d) { return "<li>" + d + "</li>"; }).join("") + '</ul></div></div>' +
      '<div class="col-lg-4"><div class="panel-box"><h3>Before you apply</h3><ul class="mt-3"><li>Check your credit score. 750+ unlocks lowest interest slabs.</li><li>Compare processing fees and prepayment charges alongside rates.</li><li>Ask if the rate is fixed or linked to the repo benchmark.</li><li>Borrow within your comfortable monthly repayment threshold.</li></ul></div></div>' +
      '</div></div></section>';
  }

  function route() {
    var h = (location.hash || "#home").slice(1), l = by[h], au = h === "login" || h === "register";
    if (au && session()) { location.hash = "home"; return; }

    $("#view-home").hidden = !!(l || au);
    $("#view-loan").hidden = !l;
    $("#view-auth").hidden = !au;

    if (au) {
      renderAuth(h);
      document.title = (h === "login" ? "Login" : "Register") + " | Quick Fund";
      window.scrollTo(0, 0);
    } else if (l) {
      renderLoan(l);
      document.title = l.n + " interest rates – Compare lenders | Quick Fund";
      window.scrollTo(0, 0);
    } else {
      document.title = "Quick Fund – Compare Business and Home Loans";
      var t = h !== "home" && document.getElementById(h);
      if (t) t.scrollIntoView();
      else window.scrollTo(0, 0);
    }

    // Update active state in nav dropdowns and links
    document.querySelectorAll(".dropdown-item").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + h);
    });

    var c = $("#nav");
    if (c && c.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(c).hide();
    }

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
      if (el.dataset.t) return;
      el.dataset.t = 1;
      el.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse") return;
        var b = el.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5;
        el.style.transform = "perspective(800px) rotateX(" + (-y * 8).toFixed(1) + "deg) rotateY(" + (x * 10).toFixed(1) + "deg) translateY(-4px)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }

  function calc() {
    var P = +$("#amt").value, a = +$("#rate").value, y = +$("#ten").value, e = emiOf(P, a, y), n = y * 12;
    $("#amtO").textContent = inr(P);
    $("#rateO").textContent = a + "%";
    $("#tenO").textContent = y + (y === 1 ? " year" : " years");
    $("#emi-v").textContent = inr(e);
    $("#int").textContent = inr(e * n - P);
    $("#tot").textContent = inr(e * n);
  }

  ["#amt", "#rate", "#ten"].forEach(function (s) {
    var el = $(s);
    if (el) el.addEventListener("input", calc);
  });

  document.addEventListener("click", function (e) {
    var lo = e.target.closest("[data-logout]"), sp = e.target.closest("[data-showpw]");
    if (lo) {
      try { sessionStorage.removeItem(SKEY); localStorage.removeItem(SKEY); } catch (x) {}
      renderAuthNav();
      location.hash = "home";
      route();
    }
    if (sp) {
      var inp = document.getElementById(sp.dataset.showpw);
      if (inp) inp.type = inp.type === "password" ? "text" : "password";
    }

    var a = e.target.closest("[data-apply]"), g = e.target.closest("[data-legal]");
    if (a) {
      if (a.dataset.loan) $("#f-type").value = a.dataset.loan;
      $("#f-lender").value = a.dataset.lender || "";
      modal("#applyModal").show();
    }
    if (g) {
      var L = LEGAL[g.dataset.legal];
      if (L) {
        $("#legalTitle").textContent = L[0];
        $("#legalBody").innerHTML = L[1].map(function (p) { return "<p>" + p + "</p>"; }).join("");
        modal("#legalModal").show();
      }
    }
  });

  var form = $("#form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = new FormData(this), v = function (k) { return f.get(k) || "-"; };
      var body = "Name: " + v("name") + "\nMobile: " + v("phone") + "\nLoan type: " + v("type") + "\nLender: " + v("lender") + "\nAmount: ₹" + v("amount") + "\nCity: " + v("city");
      modal("#applyModal").hide();
      location.href = "mailto:hello@quickfund.in?subject=" + encodeURIComponent("Loan enquiry – " + v("type")) + "&body=" + encodeURIComponent(body);
    });
  }

  renderAuthNav();
  calc();
  route();
})();
