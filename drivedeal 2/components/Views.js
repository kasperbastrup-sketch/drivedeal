import { useState } from 'react'
import { chartData, activityFeed } from '../lib/data'
import { showToast } from './Toast'

// ─── DASHBOARD ───────────────────────────────────────
export function DashboardView({ leads, onCampaign }) {
  const max = Math.max(...chartData)
  return (
    <div className="view-enter">
      <div className="kpi-grid">
        <div className="kpi-card gold">
          <div className="kpi-label">Kolde leads</div>
          <div className="kpi-value" style={{color:'var(--gold)'}}>{leads.filter(l=>l.status==='cold').length}</div>
          <div className="kpi-sub">Ikke kontaktet 90+ dage</div>
          <div className="kpi-trend nu">⏸ Klar til reactivation</div>
        </div>
        <div className="kpi-card green">
          <div className="kpi-label">Emails sendt i dag</div>
          <div className="kpi-value" style={{color:'var(--green)'}}>124</div>
          <div className="kpi-sub">Via Gmail integration</div>
          <div className="kpi-trend up">↑ +31 fra i går</div>
        </div>
        <div className="kpi-card blue">
          <div className="kpi-label">Åbningsrate</div>
          <div className="kpi-value" style={{color:'var(--blue)'}}>43%</div>
          <div className="kpi-sub">Branche snit: 22%</div>
          <div className="kpi-trend up">↑ +21pp over snit</div>
        </div>
        <div className="kpi-card amber">
          <div className="kpi-label">Bookinger</div>
          <div className="kpi-value" style={{color:'var(--amber)'}}>22</div>
          <div className="kpi-sub">Prøveture denne måned</div>
          <div className="kpi-trend up">↑ +6 fra forrige måned</div>
        </div>
      </div>

      <div className="grid-2-1">
        <div>
          <div className="panel" style={{marginBottom:14}}>
            <div className="panel-header">
              <div className="panel-title">AI aktivitet — live</div>
              <div className="pill pill-green" style={{fontSize:10}}><span className="plan-dot"></span> Auto-kørende</div>
            </div>
            {activityFeed.map((a,i) => (
              <div className="activity-item" key={i}>
                <div className="act-dot" style={{background:a.color}}></div>
                <div>
                  <div className="act-text" dangerouslySetInnerHTML={{__html:a.text}}/>
                  <div className="act-time">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="panel">
            <div className="panel-header"><div className="panel-title">Emails sendt — seneste 14 dage</div></div>
            <div className="mini-chart">
              {chartData.map((v,i) => {
                const h = Math.round((v/max)*65)+5
                return <div key={i} className={`chart-bar${i===chartData.length-1?' today':''}`} style={{height:h}} title={`${v} emails`}/>
              })}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:5}}>
              <span style={{fontSize:10,color:'var(--text3)'}}>14 dage siden</span>
              <span style={{fontSize:10,color:'var(--text3)'}}>I dag</span>
            </div>
          </div>
        </div>

        <div>
          <div className="panel" style={{marginBottom:14}}>
            <div className="panel-header"><div className="panel-title">Konverteringstragt</div></div>
            {[
              {label:'Sendt',  pct:100, val:312, color:'var(--blue)'},
              {label:'Åbnet',  pct:43,  val:134, color:'var(--gold)'},
              {label:'Klikket',pct:22,  val:68,  color:'var(--amber)'},
              {label:'Svarede',pct:14,  val:44,  color:'var(--gold3)'},
              {label:'Booket', pct:7,   val:22,  color:'var(--green)'},
              {label:'Salg',   pct:3,   val:9,   color:'var(--gold)'},
            ].map(r => (
              <div className="funnel-row" key={r.label}>
                <div className="funnel-label">{r.label}</div>
                <div className="funnel-bar"><div className="funnel-fill" style={{width:`${r.pct}%`,background:r.color}}/></div>
                <div className="funnel-val" style={{color:r.color}}>{r.val}</div>
              </div>
            ))}
            <div className="divider"/>
            <div style={{fontSize:10,color:'var(--text3)',marginBottom:4,textTransform:'uppercase',letterSpacing:'.8px'}}>AI-genereret omsætning (est.)</div>
            <div style={{fontFamily:'var(--font-head)',fontSize:22,fontWeight:800,color:'var(--gold)',letterSpacing:'-1px'}}>€ 243.600</div>
          </div>

          <div className="panel">
            <div className="panel-header"><div className="panel-title">Hurtig handling</div></div>
            <button className="btn btn-gold" style={{width:'100%',marginBottom:7,justifyContent:'center'}} onClick={onCampaign}>▶ Start ny AI kampagne</button>
            <button className="btn btn-ghost" style={{width:'100%',justifyContent:'center'}} onClick={()=>showToast('📥','Import','Gå til import-siden')}>+ Importer leads fra CRM</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── ANALYTICS ───────────────────────────────────────
export function AnalyticsView() {
  return (
    <div className="view-enter">
      <div className="kpi-grid">
        <div className="kpi-card gold"><div className="kpi-label">Total ROI</div><div className="kpi-value" style={{color:'var(--gold)'}}>1.840%</div><div className="kpi-sub">Abonnement vs. salg</div></div>
        <div className="kpi-card green"><div className="kpi-label">Gns. svartid</div><div className="kpi-value" style={{color:'var(--green)'}}>4,2t</div><div className="kpi-sub">Fra send → svar</div></div>
        <div className="kpi-card blue"><div className="kpi-label">Bedste dag</div><div className="kpi-value" style={{color:'var(--blue)'}}>Tirs</div><div className="kpi-sub">47% åbningsrate</div></div>
        <div className="kpi-card amber"><div className="kpi-label">Bedste tid</div><div className="kpi-value" style={{color:'var(--amber)'}}>10:00</div><div className="kpi-sub">Mest svar kl. 10-11</div></div>
      </div>
      <div className="grid-2">
        <div className="panel">
          <div className="panel-title" style={{marginBottom:14}}>Åbningsrate per emailtype</div>
          {[['Personaliseret','87%','var(--green)'],['Bil-specifik','65%','var(--gold)'],['Nysgerrig','52%','var(--amber)'],['Tilbud','38%','var(--blue)'],['Generisk','18%','var(--text3)']].map(([l,v,c])=>(
            <div className="funnel-row" key={l}>
              <div className="funnel-label" style={{width:120}}>{l}</div>
              <div className="funnel-bar"><div className="funnel-fill" style={{width:v,background:c}}/></div>
              <div className="funnel-val" style={{color:c}}>{v}</div>
            </div>
          ))}
        </div>
        <div className="panel">
          <div className="panel-title" style={{marginBottom:14}}>Konvertering per segment</div>
          {[['Luxury (BMW/Merc)','72%','8,2%','var(--gold)'],['SUV/Familie','58%','6,6%','var(--green)'],['Elbil (EV)','80%','9,1%','var(--blue)'],['Kompakt','33%','3,8%','var(--text2)']].map(([l,w,v,c])=>(
            <div className="funnel-row" key={l}>
              <div className="funnel-label" style={{width:140}}>{l}</div>
              <div className="funnel-bar"><div className="funnel-fill" style={{width:w,background:c}}/></div>
              <div className="funnel-val" style={{color:c}}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="panel">
        <div className="panel-header"><div className="panel-title">Månedlig præstation</div></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:10,textAlign:'center'}}>
          {[['Feb','€42k','5'],['Mar','€67k','8'],['Apr','€88k','11'],['Maj','€112k','14'],['Jun','€134k','16']].map(([m,r,s])=>(
            <div key={m}><div style={{fontSize:10,color:'var(--text3)',marginBottom:6}}>{m}</div><div style={{fontFamily:'var(--font-head)',fontSize:16,fontWeight:700}}>{r}</div><div style={{fontSize:10,color:'var(--green)'}}>{s} salg</div></div>
          ))}
          <div style={{background:'var(--goldglow)',borderRadius:8,border:'1px solid rgba(201,169,110,.3)',padding:'4px 0'}}>
            <div style={{fontSize:10,color:'var(--gold)',marginBottom:6}}>Jul ←</div>
            <div style={{fontFamily:'var(--font-head)',fontSize:16,fontWeight:700,color:'var(--gold)'}}>€94k</div>
            <div style={{fontSize:10,color:'var(--gold)'}}>9 salg</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── LEADS ───────────────────────────────────────────
const statusBadge = {
  cold:    <span className="badge badge-cold"><span className="badge-dot"/>Kold</span>,
  warm:    <span className="badge badge-warm"><span className="badge-dot"/>Varm</span>,
  sent:    <span className="badge badge-sent"><span className="badge-dot"/>AI sendt</span>,
  booked:  <span className="badge badge-booked"><span className="badge-dot"/>Booket ✓</span>,
  replied: <span className="badge badge-replied"><span className="badge-dot"/>Svarede</span>,
}

export function LeadsView({ leads, onCompose }) {
  const [filter, setFilter]   = useState('all')
  const [search, setSearch]   = useState('')
  const [selected, setSelected] = useState(new Set())

  const counts = {all:leads.length, cold:0, warm:0, sent:0, replied:0, booked:0}
  leads.forEach(l => { if(counts[l.status]!==undefined) counts[l.status]++ })

  const visible = leads.filter(l => {
    const mf = filter==='all' || l.status===filter
    const ms = !search || l.name.toLowerCase().includes(search) || l.email.toLowerCase().includes(search) || l.car.toLowerCase().includes(search)
    return mf && ms
  })

  const scoreColor = s => s>=80?'var(--green)':s>=60?'var(--gold)':'var(--text2)'

  function toggleOne(id, checked) {
    const s = new Set(selected)
    checked ? s.add(id) : s.delete(id)
    setSelected(s)
  }

  return (
    <div className="view-enter">
      <div className="filter-row">
        {['all','cold','warm','sent','replied','booked'].map(f => (
          <button key={f} className={`filter-chip${filter===f?' active':''}`} onClick={()=>setFilter(f)}>
            {{all:'Alle',cold:'Kolde',warm:'Varme',sent:'AI sendt',replied:'Svarede',booked:'Booket'}[f]}
            <span style={{opacity:.5}}> ({counts[f]})</span>
          </button>
        ))}
        <div className="search-box">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="#5e5d5a" strokeWidth="1.5"/><line x1="11" y1="11" x2="15" y2="15" stroke="#5e5d5a" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <input placeholder="Søg navn, email, bil..." value={search} onChange={e=>setSearch(e.target.value.toLowerCase())}/>
        </div>
        {selected.size > 0 && (
          <button className="btn btn-gold btn-sm" onClick={()=>{ showToast('✅',`AI sender til ${selected.size} leads`,''); setSelected(new Set()) }}>
            AI send til {selected.size} valgte →
          </button>
        )}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th style={{width:32}}><input type="checkbox" style={{accentColor:'var(--gold)'}} onChange={e=>setSelected(e.target.checked?new Set(visible.map(l=>l.id)):new Set())}/></th>
              <th>Kontakt</th><th>Bil interesse</th><th>Sidst kontaktet</th><th>Kilde</th><th>Status</th><th>AI score</th><th></th>
            </tr>
          </thead>
          <tbody>
            {visible.map(l => (
              <tr key={l.id}>
                <td><input type="checkbox" checked={selected.has(l.id)} onChange={e=>toggleOne(l.id,e.target.checked)} style={{accentColor:'var(--gold)'}}/></td>
                <td><div style={{fontWeight:500,fontSize:13}}>{l.name}</div><div style={{fontSize:11,color:'var(--text2)'}}>{l.email}</div></td>
                <td style={{fontSize:12}}>{l.car}</td>
                <td style={{fontSize:12,color:'var(--text2)'}}>{l.days} dage siden</td>
                <td style={{fontSize:11,color:'var(--text3)'}}>{l.source}</td>
                <td>{statusBadge[l.status]}</td>
                <td>
                  <div className="score-wrap">
                    <div className="score-bar"><div className="score-fill" style={{width:`${l.score}%`,background:scoreColor(l.score)}}/></div>
                    <span className="score-num" style={{color:scoreColor(l.score)}}>{l.score}</span>
                  </div>
                </td>
                <td>
                  <button className="btn btn-ghost btn-sm" onClick={()=>onCompose(l)}>AI Email →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── CAMPAIGNS ───────────────────────────────────────
export function CampaignsView({ onCampaign }) {
  const camps = [
    { icon:'📧', bg:'var(--goldglow)', name:'Sommer Reactivation 2025', meta:'BMW, Mercedes, Audi · 90+ dage · Startet 3. juli 2025', active:true, kpis:[{v:'247',l:'Sendt'},{v:'38%',c:'var(--gold)',l:'Åbnet'},{v:'26%',c:'var(--amber)',l:'Klikket'},{v:'14',c:'var(--green)',l:'Bookede'},{v:'€ 84k',c:'var(--green)',l:'Omsætning'}] },
    { icon:'⚡', bg:'var(--bluebg)',   name:'EV Interesse Follow-up',     meta:'Tesla, Audi e-tron, Mercedes EQ · 3-step sekvens', active:true, kpis:[{v:'92',l:'Sendt'},{v:'51%',c:'var(--gold)',l:'Åbnet'},{v:'34%',c:'var(--amber)',l:'Klikket'},{v:'9',c:'var(--green)',l:'Bookede'},{v:'€ 52k',c:'var(--green)',l:'Omsætning'}] },
    { icon:'❄️', bg:'var(--surface2)', name:'Vinter Udsalg 2025',          meta:'Alle segmenter · Planlagt november', active:false, kpis:[{v:'—',l:'Sendt'},{v:'—',l:'Åbnet'},{v:'—',l:'Klikket'},{v:'—',l:'Bookede'},{v:'—',l:'Omsætning'}] },
  ]
  return (
    <div className="view-enter">
      <div className="section-header">
        <div className="section-title">AI kampagner</div>
        <button className="btn btn-gold" onClick={onCampaign}>+ Ny kampagne</button>
      </div>
      {camps.map((c,i) => (
        <div key={i} className="campaign-row" style={{opacity:c.active?1:.55}}>
          <div className="camp-icon" style={{background:c.bg}}>{c.icon}</div>
          <div>
            <div className="camp-name">{c.name}</div>
            <div className="camp-meta">{c.meta}</div>
            <div style={{marginTop:5}}>
              {c.active ? <span className="pill pill-green">Aktiv</span> : <span className="pill" style={{background:'var(--surface2)',color:'var(--text2)'}}>Inaktiv</span>}
            </div>
          </div>
          <div className="camp-kpis">
            {c.kpis.map(k=>(
              <div className="ckpi" key={k.l}><span className="ckpi-val" style={{color:k.c||'inherit'}}>{k.v}</span><span className="ckpi-lbl">{k.l}</span></div>
            ))}
          </div>
          <div className="camp-actions">
            <button className="btn btn-ghost btn-sm" onClick={()=>showToast('📊','Rapport','Viser kampagnestatistik')}>Rapport</button>
            {c.active ? <button className="btn btn-red btn-sm" onClick={()=>showToast('⏸','Sat på pause','')}>Pause</button>
                      : <button className="btn btn-gold btn-sm" onClick={()=>showToast('▶','Aktiveret','')}>Aktiver</button>}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── SEQUENCES ───────────────────────────────────────
export function SequencesView() {
  return (
    <div className="view-enter">
      <div className="section-header">
        <div className="section-title">Email sekvenser (auto follow-up)</div>
        <button className="btn btn-gold" onClick={()=>showToast('✨','Ny sekvens','')}>+ Ny sekvens</button>
      </div>
      <div className="grid-2">
        {[
          { title:'Standard Reactivation — 3 emails', conv:'7,4%', steps:[
            {n:1,name:'Dag 0 — Personlig check-in email',delay:'Sendes straks ved kampagnestart'},
            {n:2,name:'Dag 5 — Blid opfølgning',delay:'Kun hvis email 1 ikke er besvaret'},
            {n:3,name:'Dag 12 — Eksklusivt tilbud',delay:'Sidste chance med personlig rabat'},
          ]},
          { title:'EV Interesse — 4 emails', conv:'9,8%', active:true, steps:[
            {n:1,name:'Dag 0 — EV fordele intro',delay:'Nysgerrighed-drevet åbning'},
            {n:2,name:'Dag 3 — Specifik model info',delay:'Personaliseret til bil-interesse'},
            {n:3,name:'Dag 8 — Prøvekørsel invitation',delay:'Med booking link'},
            {n:4,name:'Dag 18 — Tidsbegrænset tilbud',delay:'Urgency-trigger med deadline'},
          ]},
        ].map((seq,i) => (
          <div className="panel" key={i}>
            <div className="panel-title" style={{marginBottom:14}}>{seq.title}</div>
            {seq.steps.map((s,j) => (
              <div key={s.n}>
                <div className="seq-step">
                  <div className="seq-num">{s.n}</div>
                  <div className="seq-info"><div className="seq-name">{s.name}</div><div className="seq-delay">{s.delay}</div></div>
                  <button className="btn btn-ghost btn-sm" onClick={()=>showToast('✏️',s.name,'')}>Rediger</button>
                </div>
                {j < seq.steps.length-1 && <div className="seq-line"/>}
              </div>
            ))}
            <div style={{marginTop:12,paddingTop:12,borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontSize:11,color:'var(--text2)'}}>Gns. konvertering: <strong style={{color:'var(--green)'}}>{seq.conv}</strong></div>
              {seq.active
                ? <span className="pill pill-green" style={{fontSize:10}}><span className="plan-dot"/> Kørende</span>
                : <button className="btn btn-gold btn-sm" onClick={()=>showToast('▶','Sekvens aktiveret','')}>Aktivér</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── TEMPLATES ───────────────────────────────────────
export function TemplatesView() {
  const [sel, setSel] = useState('proeve')
  const [subject, setSubject] = useState('{{fornavn}}, din {{bil}} venter på dig 🚗')
  const [body, setBody] = useState('Hej {{fornavn}},\n\nDet er nu {{dage_siden}} dage siden du kiggede på en {{bil}} hos os, og jeg ville høre om du stadig overvejer det?\n\nVi har en flot {{bil}} klar til prøvekørsel denne uge — helt uforpligtende.\n\nMed venlig hilsen,\n{{afsender}}\n{{forhandler}}')
  const tmpls = [
    {id:'proeve',  label:'🚗 Prøvekørsel invitation', desc:'Inviterer til gratis prøvetur uden forpligtelse', rate:'Åbningsrate: 52% · Booking: 8.2%'},
    {id:'tilbud',  label:'💰 Personligt tilbud',       desc:'Eksklusivt tilbud specifikt til leadets bil',    rate:'Åbningsrate: 48% · Booking: 6.8%'},
    {id:'nysger',  label:'🤔 Blød check-in',           desc:'Uformel genoptagelse af kontakt',                rate:'Åbningsrate: 61% · Svar: 14%'},
    {id:'nymodel', label:'✨ Ny model lancering',       desc:'Fortæller om ny model der matcher interessen',   rate:'Åbningsrate: 44% · Booking: 5.1%'},
    {id:'ev',      label:'⚡ EV konvertering',          desc:'Konverter benzin-leads til elbil interesse',     rate:'Åbningsrate: 58% · Booking: 9.8%'},
  ]
  return (
    <div className="view-enter">
      <div className="section-header">
        <div className="section-title">Email skabeloner</div>
        <button className="btn btn-gold" onClick={()=>showToast('✨','Ny skabelon','')}>+ Ny skabelon</button>
      </div>
      <div className="grid-2">
        <div className="panel">
          <div className="panel-title" style={{marginBottom:14}}>Vælg skabelon</div>
          {tmpls.map(t => (
            <div key={t.id} className={`template-card${sel===t.id?' selected':''}`} onClick={()=>setSel(t.id)}>
              <div className="tpl-name">{t.label}</div>
              <div className="tpl-desc">{t.desc}</div>
              <div className="tpl-rate">{t.rate}</div>
            </div>
          ))}
        </div>
        <div className="panel">
          <div className="panel-title" style={{marginBottom:14}}>Rediger skabelon</div>
          <div className="label">Emne-linje</div>
          <input className="field-input" style={{width:'100%'}} value={subject} onChange={e=>setSubject(e.target.value)}/>
          <div className="label">Email tekst</div>
          <textarea className="field-textarea" style={{minHeight:200}} value={body} onChange={e=>setBody(e.target.value)}/>
          <div style={{marginTop:8,fontSize:11,color:'var(--text2)'}}>
            Variabler: {['{{fornavn}}','{{bil}}','{{dage_siden}}','{{afsender}}'].map(v=>(
              <code key={v} style={{fontFamily:'var(--font-mono)',fontSize:10,background:'var(--surface2)',padding:'1px 5px',borderRadius:3,marginRight:4}}>{v}</code>
            ))}
          </div>
          <div className="modal-footer" style={{paddingTop:12,marginTop:12}}>
            <button className="btn btn-ghost" onClick={()=>showToast('👁','Forhåndsvisning','')}>Forhåndsvis</button>
            <button className="btn btn-gold" onClick={()=>showToast('💾','Skabelon gemt','')}>Gem skabelon</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── IMPORT ───────────────────────────────────────────
export function ImportView({ onImport }) {
  const [dragging, setDragging] = useState(false)

  function processFile(file) {
    const count = Math.floor(Math.random()*150)+50
    onImport(count, file.name)
  }

  return (
    <div className="view-enter">
      <div className="grid-2">
        <div>
          <div className="panel" style={{marginBottom:14}}>
            <div className="panel-title" style={{marginBottom:14}}>Upload CSV / Excel</div>
            <div
              className={`drop-zone${dragging?' drag':''}`}
              onClick={()=>document.getElementById('csv-input').click()}
              onDragOver={e=>{e.preventDefault();setDragging(true)}}
              onDragLeave={()=>setDragging(false)}
              onDrop={e=>{e.preventDefault();setDragging(false);if(e.dataTransfer.files[0])processFile(e.dataTransfer.files[0])}}>
              <div className="drop-icon">📁</div>
              <div className="drop-title">Træk CSV / Excel fil her</div>
              <div className="drop-sub" style={{marginTop:4}}>eller klik for at vælge fil</div>
              <div className="drop-sub" style={{marginTop:8,fontSize:10,color:'var(--text3)'}}>Kolonner: Navn, Email, Telefon, Bil, Sidst kontaktet</div>
            </div>
            <input type="file" id="csv-input" accept=".csv,.xlsx,.xls" style={{display:'none'}} onChange={e=>e.target.files[0]&&processFile(e.target.files[0])}/>
          </div>
          <div className="panel">
            <div className="panel-title" style={{marginBottom:14}}>Manuelt tilføj lead</div>
            {[['Fuldt navn','Fx: Carlos Mendez','text'],['Email','carlos@gmail.com','email'],['Telefon','+34 612 345 678','text'],['Bil interesse','Fx: BMW 520d','text']].map(([l,p,t])=>(
              <div key={l}><div className="label">{l}</div><input className="field-input" placeholder={p} type={t} style={{width:'100%'}}/></div>
            ))}
            <div className="label">Kilde</div>
            <select className="field-select" style={{width:'100%'}}>
              {['Manuelt tilføjet','Hjemmeside formular','Telefonopkald','Showroom besøg'].map(o=><option key={o}>{o}</option>)}
            </select>
            <button className="btn btn-gold" style={{width:'100%',marginTop:14,justifyContent:'center'}} onClick={()=>showToast('✅','Lead tilføjet','')}>+ Tilføj lead</button>
          </div>
        </div>
        <div>
          <div className="panel" style={{marginBottom:14}}>
            <div className="panel-title" style={{marginBottom:14}}>Synkroniser fra CRM/System</div>
            {[
              {done:true,  n:'✓', name:'Gmail',        desc:'Forbundet · ventas@mercedesbcn.com',  pill:<span className="pill pill-green">Aktiv</span>},
              {done:false, n:'2', name:'HubSpot CRM',  desc:'Synkroniser leads automatisk',         btn:'Forbind'},
              {done:false, n:'3', name:'Salesforce',   desc:'Enterprise CRM integration',           btn:'Forbind'},
              {done:false, n:'4', name:'Calendly',     desc:'Prøvekørsel booking link',             btn:'Forbind'},
              {done:false, n:'5', name:'WhatsApp Biz', desc:'Send via WhatsApp',                    btn:'Opsæt'},
            ].map(s=>(
              <div key={s.name} className={`onboard-step${s.done?' done':''}`}>
                <div className="step-num">{s.n}</div>
                <div className="step-info"><div className="step-name">{s.name}</div><div className="step-desc">{s.desc}</div></div>
                {s.pill||<button className="btn btn-ghost btn-sm" onClick={()=>showToast('🔗',`${s.name} forbundet!`,'')}>{s.btn}</button>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── INTEGRATIONS ─────────────────────────────────────
export function IntegrationsView() {
  const [toggles, setToggles] = useState({tracking:true, daily:true, booking:true, weekly:false, import:true, dedup:true, cold:true})
  const toggle = k => setToggles(t=>({...t,[k]:!t[k]}))
  return (
    <div className="view-enter">
      <div className="grid-2">
        <div className="panel">
          <div className="panel-title" style={{marginBottom:14}}>Email udsendelse</div>
          <div className="setting-row"><div><div className="setting-lbl">Gmail</div><div className="setting-desc">ventas@mercedesbcn.com</div></div><span className="pill pill-green">● Forbundet</span></div>
          <div className="setting-row"><div><div className="setting-lbl">Send-grænse per dag</div><div className="setting-desc">Anbefalet: 80-150</div></div><input className="field-input" style={{width:80,textAlign:'center'}} defaultValue="100" type="number"/></div>
          <div className="setting-row"><div><div className="setting-lbl">Forsinkelse</div><div className="setting-desc">Undgår spam-filtre</div></div><select className="field-select"><option>30-90 sekunder</option><option>10-30 sekunder</option></select></div>
          <div className="setting-row"><div><div className="setting-lbl">Email tracking</div><div className="setting-desc">Måler åbningsrate præcist</div></div><button className={`toggle ${toggles.tracking?'on':'off'}`} onClick={()=>toggle('tracking')}/></div>
        </div>
        <div className="panel">
          <div className="panel-title" style={{marginBottom:14}}>CRM systemer</div>
          {[['HubSpot','Synk leads begge veje'],['Salesforce','Enterprise integration'],['Pipedrive','Pipeline synkronisering'],['AutoIt / CDK','Bil-specifik DMS']].map(([n,d])=>(
            <div className="setting-row" key={n}><div><div className="setting-lbl">{n}</div><div className="setting-desc">{d}</div></div><button className="btn btn-ghost btn-sm" onClick={()=>showToast('🔗',`${n} forbundet!`,'')}>Forbind</button></div>
          ))}
        </div>
        <div className="panel">
          <div className="panel-title" style={{marginBottom:14}}>Notifikationer</div>
          {[['daily','Daglig rapport email','Opsummering kl. 08:00'],['booking','Notifikation ved booking','Straks notifikation'],['weekly','Ugentlig rapport','Fredag kl. 17:00']].map(([k,l,d])=>(
            <div className="setting-row" key={k}><div><div className="setting-lbl">{l}</div><div className="setting-desc">{d}</div></div><button className={`toggle ${toggles[k]?'on':'off'}`} onClick={()=>toggle(k)}/></div>
          ))}
        </div>
        <div className="panel">
          <div className="panel-title" style={{marginBottom:14}}>Booking & kalender</div>
          <div className="setting-row"><div><div className="setting-lbl">Google Kalender</div><div className="setting-desc">Sync prøveture</div></div><span className="pill pill-green">● Forbundet</span></div>
          <div className="setting-row"><div><div className="setting-lbl">Calendly</div><div className="setting-desc">Prøvekørsel booking</div></div><button className="btn btn-ghost btn-sm" onClick={()=>showToast('🔗','Calendly forbundet!','')}>Forbind</button></div>
          <div className="setting-row"><div><div className="setting-lbl">Booking link</div></div><input className="field-input" placeholder="calendly.com/dinforhandler" style={{width:200}}/></div>
        </div>
      </div>
    </div>
  )
}

// ─── SETTINGS ─────────────────────────────────────────
export function SettingsView({ dealerName, setDealerName }) {
  const [tab, setTab] = useState('general')
  const [toggles, setToggles] = useState({pers:true, subj:true, urgency:true, autostop:true, unsubscribe:true})
  const toggle = k => setToggles(t=>({...t,[k]:!t[k]}))
  const tabs = ['general','ai','email','plan']
  const tabLabels = {general:'Forhandler',ai:'AI indstillinger',email:'Email',plan:'Plan & fakturering'}
  return (
    <div className="view-enter">
      <div className="tab-bar">
        {tabs.map(t=><button key={t} className={`tab${tab===t?' active':''}`} onClick={()=>setTab(t)}>{tabLabels[t]}</button>)}
      </div>
      {tab==='general' && (
        <div>
          <div className="settings-block">
            <div className="settings-block-title">Forhandler information</div>
            <div className="setting-row"><div><div className="setting-lbl">Forhandlernavn</div></div><input className="field-input" value={dealerName} onChange={e=>setDealerName(e.target.value)}/></div>
            {[['Afsendernavn','Carlos · Mercedes-Benz Madrid'],['Bil mærker','Mercedes-Benz, BMW, Audi'],['Booking link','calendly.com/mercedes-madrid'],['Telefon','+34 93 123 45 67']].map(([l,v])=>(
              <div className="setting-row" key={l}><div><div className="setting-lbl">{l}</div></div><input className="field-input" defaultValue={v}/></div>
            ))}
          </div>
          <button className="btn btn-gold" onClick={()=>showToast('💾','Indstillinger gemt','')}>Gem indstillinger</button>
        </div>
      )}
      {tab==='ai' && (
        <div>
          <div className="settings-block">
            <div className="settings-block-title">AI personlighed</div>
            <div className="setting-row"><div><div className="setting-lbl">Email tone</div></div><select className="field-select"><option>Varm og personlig</option><option>Professionel og formel</option><option>Direkte og salgsrettet</option></select></div>
            <div className="setting-row"><div><div className="setting-lbl">Primært sprog</div></div><select className="field-select"><option>Spansk</option><option>Dansk</option><option>Engelsk</option></select></div>
            {[['pers','Auto-personalisering','Brug navn, bil og tidspunkt'],['subj','AI-genereret emne-linje','AI vælger bedst mulig emne-linje'],['urgency','Urgency-trigger i email 3','Tilføj tidsbegrænset tilbud'],['autostop','Auto-stop ved booking','Stop sekvens automatisk']].map(([k,l,d])=>(
              <div className="setting-row" key={k}><div><div className="setting-lbl">{l}</div><div className="setting-desc">{d}</div></div><button className={`toggle ${toggles[k]?'on':'off'}`} onClick={()=>toggle(k)}/></div>
            ))}
          </div>
          <button className="btn btn-gold" onClick={()=>showToast('💾','AI indstillinger gemt','')}>Gem AI indstillinger</button>
        </div>
      )}
      {tab==='email' && (
        <div>
          <div className="settings-block">
            <div className="settings-block-title">Email signatur</div>
            <div className="setting-row" style={{alignItems:'flex-start'}}>
              <div><div className="setting-lbl">Signatur</div></div>
              <textarea className="field-textarea" style={{width:340}} defaultValue={'Med venlig hilsen,\nCarlos Fernández\nSalgskonsulent · Mercedes-Benz Madrid\n📞 +34 93 123 45 67'}/>
            </div>
            <div className="setting-row"><div><div className="setting-lbl">Afmeldingslink (GDPR)</div></div><button className={`toggle ${toggles.unsubscribe?'on':'off'}`} onClick={()=>toggle('unsubscribe')}/></div>
          </div>
          <button className="btn btn-gold" onClick={()=>showToast('💾','Email indstillinger gemt','')}>Gem email indstillinger</button>
        </div>
      )}
      {tab==='plan' && (
        <div>
          <div style={{background:'var(--goldglow)',border:'1px solid rgba(201,169,110,.3)',borderRadius:10,padding:18,marginBottom:14}}>
            <div style={{fontFamily:'var(--font-head)',fontSize:18,fontWeight:800,color:'var(--gold)'}}>Pro Plan</div>
            <div style={{fontSize:12,color:'var(--text2)',marginTop:2}}>€ 299/måned · Fornyes 1. august 2025</div>
            <div style={{marginTop:12,display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,fontSize:12}}>
              {['Ubegrænsede leads','AI email generering','Gmail integration','Sekvens-automatisering','CRM integrationer','Analytics dashboard'].map(f=>(
                <div key={f} style={{color:'var(--green)'}}>✓ {f}</div>
              ))}
            </div>
          </div>
          <div className="settings-block">
            <div className="settings-block-title">Fakturering</div>
            <div className="setting-row"><div><div className="setting-lbl">Næste faktura</div></div><div>€ 299,00 · 1. aug. 2025</div></div>
            <div className="setting-row"><div><div className="setting-lbl">Betalingsmetode</div></div><span className="pill pill-blue">Visa ·· 4242</span></div>
          </div>
        </div>
      )}
    </div>
  )
}
