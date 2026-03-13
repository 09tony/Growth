# Tony Styles · GrowthEngine Copywriting
## tony-styles.vercel.app

Full working website with client portal, application forms, and interactive tools.
No domain needed — Vercel gives you a free professional URL on day one.

---

## 📁 What's Inside

```
📂 Root
 ├── index.html          → Homepage
 ├── about.html          → About Tony
 ├── services.html       → 3-Tier Services + Quiz + ROI Calc
 ├── results.html        → Case Studies + Before/After
 ├── insights.html       → Free Tools (Audit Widget, Subject Scorer)
 ├── contact.html        → Application Form + Free Audit Tab
 ├── login.html          → Client Portal Login ← NEW
 ├── vercel.json         → Vercel config
 ├── css/style.css       → Full design system
 ├── js/main.js          → All JS incl. auth + dashboard
 └── 📂 dashboard/
      └── index.html     → Client Dashboard ← NEW
```

---

## 🚀 OPTION A — VERCEL (Recommended · Free · 5 Minutes)

**Best choice. Free custom subdomain. No credit card. Fastest CDN globally.**

### Step 1 — Create GitHub account
→ github.com → Sign up (free)

### Step 2 — Create repository
- Click **+** top right → New repository
- Name: `tony-styles-growthengine`
- Set to **Public**
- Click **Create repository**

### Step 3 — Upload files
1. In your new repo, click **"uploading an existing file"**
2. Drag the entire unzipped folder content into the browser window
3. Scroll down, type: `Initial commit — full website`
4. Click **Commit changes**

### Step 4 — Deploy on Vercel
1. Go to → **vercel.com**
2. Click **Sign up** → choose **Continue with GitHub**
3. Click **Add New Project**
4. Find `tony-styles-growthengine` → click **Import**
5. Leave ALL settings as default
6. Click **Deploy**

✅ Done. Your site is live at:
**`https://tony-styles-growthengine.vercel.app`**

### Customise your Vercel URL (still free):
- Go to: Project → Settings → Domains
- Click **Edit** on the default domain
- Type: `tony-styles` → Save
- New URL: **`https://tony-styles.vercel.app`**

---

## 🌐 OPTION B — GITHUB PAGES (Free · Also works · Slightly slower)

### After uploading to GitHub (Step 3 above):
1. In your repo → click **Settings**
2. Left sidebar → **Pages**
3. Source → select **main** branch → **/ (root)**
4. Click **Save**
5. Wait 3 minutes → live at:
   `https://YOUR_USERNAME.github.io/tony-styles-growthengine`

> ⚠️ Note: GitHub Pages doesn't support the `vercel.json` rewrites.
> The dashboard will still work — just navigate to `/dashboard/index.html` directly.

---

## 🌐 OPTION C — NETLIFY (Free · Drag & Drop · Zero sign-in with GitHub needed)

If you want the absolute fastest deploy without GitHub:

1. Go to → **netlify.com** → Sign up free
2. Drag your entire project folder onto the Netlify dashboard
3. Done — live URL given instantly like `https://tony-styles-abc123.netlify.app`
4. In Site Settings → Domain Management → you can rename to `tony-styles.netlify.app`

---

## 🔑 CLIENT PORTAL — How It Works

The client portal (`/login.html` → `/dashboard/index.html`) uses **localStorage**
to store sessions. This means:

- Works completely without a server
- Works on GitHub Pages, Vercel, AND Netlify
- Client data persists across browser sessions

### Demo credentials (pre-built):
```
Email:    client@demo.com
Password: demo1234
```

### To add a real client:
Open `js/main.js` and find the `clients` object in `AUTH`:
```javascript
clients: {
  'client@demo.com': { ... },          ← Demo client

  // ADD YOUR REAL CLIENT HERE:
  'sarah@happypaws.com': {
    password: 'their_password_here',
    name: 'Sarah Mitchell',
    brand: 'Happy Paws Supplements',
    tier: 'Performance Copy (Tier 2)',
    avatar: 'S',
    joinDate: 'Mar 2025',
    projects: [
      { id:1, name:'Email Sequence', status:'active', progress:60, due:'Apr 15 2025',
        deliverable:'Email doc', notes:'In progress.' }
    ],
    invoices: [
      { id:'INV-001', date:'Mar 1 2025', amount:'$1,500', status:'paid' }
    ],
    messages: [
      { from:'Tony', date:'Mar 10', text:'Welcome aboard! Starting your brief this week.' }
    ],
    openRate: '—', revenueUp: '—', emailsSent: '—'
  }
}
```
Then re-upload `js/main.js` to GitHub → Vercel auto-redeploys.

---

## 📧 CONNECT FORMS (so you receive applications by email)

### Using Formspree (free, 50 submissions/month):
1. Go to: **formspree.io** → Create free account
2. Create a new form → copy the form ID (e.g. `xpzgdkla`)
3. In `contact.html`, update each `<form>` tag:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" data-form="...">
```
4. Save → re-upload to GitHub

Every application now lands in your email inbox instantly.

---

## ✏️ QUICK CUSTOMISATIONS

| What to change | Where to find it |
|---|---|
| Your email address | Search `tony@growthengine.com` in all HTML files |
| Available spots count | Search `"2 spots"` across all HTML files |
| Stats numbers (47%, $380K) | `index.html` stats bar section |
| Testimonial names/quotes | Search `tcard-author` in any HTML file |
| Gold colour | `css/style.css` → `--gold: #C9A84C` |

---

## ✅ LAUNCH CHECKLIST

- [ ] Upload to GitHub
- [ ] Deploy on Vercel → get your free URL
- [ ] Connect Formspree to receive applications
- [ ] Test the client portal (login.html → demo credentials)
- [ ] Test all forms (contact, audit, newsletter)
- [ ] Update `tony@growthengine.com` to your real email
- [ ] Update "2 spots available" to your real availability
- [ ] Add your LinkedIn and social links in footer
- [ ] Start pitching with the URL 🚀

---

## 💬 PITCH EMAIL TEMPLATE (post-launch)

**Subject:** "Quick thought about [Brand Name]'s copy"

> Hi [Name],
>
> I specialise in copywriting for pet/baby brands.
>
> I took a look at [specific page] on your site and noticed [specific issue].
> Quick example fix below — yours free regardless:
>
> *"[Their weak line]"* → *"[Tony's stronger version]"*
>
> I've built a free copy audit for brands like yours.
> If you're curious what else I'd change: **tony-styles.vercel.app**
>
> No pressure either way.
> Tony

---

Built with HTML + CSS + JavaScript
Deployed via Vercel (free) or GitHub Pages
© Tony Styles · GrowthEngine Copywriting · 2025
