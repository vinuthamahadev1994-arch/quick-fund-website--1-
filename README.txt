QUICK FUND - loan comparison website (purple and gold theme)

HOW TO RUN
  Unzip and open index.html in a browser. An internet connection is needed for
  Bootstrap's JavaScript, Font Awesome icons and Google Fonts (loaded from CDNs).
  Bootstrap 5.3.2 CSS is included locally in css/bootstrap.min.css.

FILES
  index.html             home page, loan page, carousel, sticky bottom bar & call button, pop-ups
  css/style.css          purple and gold theme, 3D cards and buttons, dark mode
  css/carousel.css       hero image carousel, badges, navigation controls, responsive layout
  css/responsive.css     mobile overflow fix, sticky navbar & bottom nav, alternating light/dark styles
  css/bootstrap.min.css  Bootstrap 5.3.2
  js/carousel.js         hero carousel controller (auto-play, touch swipe, controls, indicators)
  js/app.js              loans, lender rates, navigation, EMI calculator, login/register, policy text
  assets/logo.png        High-resolution Quick Fund brand logo
  assets/favicon.png     Crisp PNG browser icon
  assets/hero-*.jpg      High-clarity hero carousel photography (home, business, personal, car loans)

HOW TO EDIT
  Lender rates: edit the D object in js/app.js. Each row is
    [lender, rate from %, rate to % or null, max tenure years or null, processing fee or null]
  Loan types: LOANS array. Menu groups: GROUPS array. Policy text: LEGAL object.
  Update REVIEWED to the month you last checked the rates.
  Contact details: search for hello@quickfund.in and +91 00000 00000.

LOGIN AND REGISTER (IMPORTANT)
  The forms are fully working on the front end (validation, show/hide password,
  logged-in menu, log out), but accounts are stored only in the visitor's own
  browser (password saved as a salted hash). This is for demonstration. Before launch,
  replace the "Login and register" block in js/app.js with calls to your own secure
  backend (account creation, password hashing on the server, sessions, password reset).

BEFORE YOU GO LIVE
  1. Verify every rate and fee against each lender's official rate card.
  2. Replace the placeholder email and phone, and connect the call-back form and
     accounts to a backend or CRM.
  3. Have a lawyer review the terms, privacy policy and other policy text.
