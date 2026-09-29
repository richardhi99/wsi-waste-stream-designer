# Water Services Inc. — two-page treatment request site

## Pages

| File | Who uses it |
|---|---|
| `customer.html` | Customer. Enters stream, quality, tank type, depths, and allowed ISO boxes. Does **not** see the design. |
| `thanks.html` | Shown after submit. Text: Water Services Inc will get back to you. |
| `office.html` | WSI staff. Reads the queue and shows train, COG schedule, and container plan. |

Default aerator is the WSI **COG / Vacuum Bubble®** line (100 / 200 / 300 / 600) from the spec sheets.

Tank options: rectangular, circular/round, existing lagoon, or ISO containerized plant.

Allowed boxes (ft): 10×8×8.5, 10×8×9.5, 20×8×8.5, 20×8×9.5, 40×8×8.5, 40×8×9.5. The engine packs wet tanks and equipment skids into one or more of those boxes.

## Run the site (required for the database and thank-you email)

```bash
cd waste-stream-designer
python3 server.py
```

Then open:

- http://127.0.0.1:8765/customer.html
- http://127.0.0.1:8765/office.html

Each submit appends a row to `data/WSI_Customer_Submissions.xlsx` (Excel and Access). The office page can also download that file. A JSONL log is kept at `data/submissions.jsonl`.

## Thank-you email

Set Office 365 / SMTP so the server sends the customer note from Water Services Inc:

```bash
export WSI_SMTP_HOST=smtp.office365.com
export WSI_SMTP_PORT=587
export WSI_SMTP_USER=info@water-services.us
export WSI_SMTP_PASS='app-password'
export WSI_FROM=info@water-services.us
python3 server.py
```

Without SMTP the thank-you **page** still shows. The request is still stored.

Opening `customer.html` as a file (no server) stores the request in the browser and still shows the thank-you page; use `office.html` on the same browser to see it. The Excel database only updates when `server.py` is running.

## Publish on the web

This is not a static brochure. Customers submit a form; the server writes Excel and can send email. You need a host that runs **Python**, not GitHub Pages alone.

### 1. Easiest paid path — Render, Railway, or Fly.io

1. Put the `waste-stream-designer` folder in a GitHub repo (private is fine).
2. Create a new **Web Service** on [Render](https://render.com) (or Railway / Fly).
3. Build / start:
   - Build: `pip install -r requirements.txt`
   - Start: `python server.py`
4. Set environment variables in the host dashboard:

| Variable | Example |
|---|---|
| `PORT` | provided by the host |
| `WSI_SMTP_HOST` | `smtp.office365.com` |
| `WSI_SMTP_PORT` | `587` |
| `WSI_SMTP_USER` | `info@water-services.us` |
| `WSI_SMTP_PASS` | mailbox app password |
| `WSI_FROM` | `info@water-services.us` |

5. After deploy you get a URL such as `https://wsi-designer.onrender.com`.
   - Customer form: `https://…/customer.html`
   - Office queue: `https://…/office.html` — do not advertise this URL.
6. Point a company subdomain at it (Render/Railway “custom domain”), for example `design.water-services.us`. Add the CNAME they give you at your DNS host.

Disk note: free Render instances can lose files on restart. For a durable Excel file, attach a disk mounted at `data/` or download the workbook often from the office page.

### 2. Static-only (GitHub Pages / Netlify) — form only

Upload the HTML/CSS/JS/img files. The thank-you page still works, but:

- no Excel database
- no email from Water Services Inc
- office queue only works in that same browser (`localStorage`)

Use this only for a public demo, not for real leads.

### 3. Your own office computer or a small VPS

```bash
cd waste-stream-designer
python3 -m pip install -r requirements.txt
export PORT=8765
python3 server.py
```

Put **Caddy** or **nginx** in front with HTTPS, or use a tunnel:

```bash
npx cloudflared tunnel --url http://127.0.0.1:8765
```

That gives a temporary public `https://…trycloudflare.com` link for testing.

### Protect the office page

`office.html` lists customer names and emails. Do not link it from the customer form. After you have a live URL, add HTTP basic auth at the host (Render “Basic Auth”, nginx `auth_basic`, or Cloudflare Access) so only staff can open `/office.html`.

