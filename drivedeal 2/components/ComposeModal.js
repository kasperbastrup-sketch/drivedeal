import { useState, useEffect } from 'react'
import { showToast } from './Toast'

const purposeMap = {
  proevekoer: 'invitere til en gratis, uforpligtende prøvekørsel af deres drømmebil',
  tilbud:     'præsentere et eksklusivt personligt tilbud kun til dem',
  ny_model:   'fortælle om en spændende ny model der matcher deres interesser perfekt',
  check_in:   'tage en blød og nysgerrig check-in om de stadig leder efter bil',
  ev:         'vække interesse for elektriske biler og invitere til EV demonstration',
  urgency:    'skabe urgency med et tidsbegrænset tilbud der udløber om 48 timer',
}

export default function ComposeModal({ lead, onClose, onSent }) {
  const [purpose, setPurpose]   = useState('proevekoer')
  const [lang, setLang]         = useState('spansk')
  const [subject, setSubject]   = useState('')
  const [body, setBody]         = useState('')
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    if (lead) generate(purpose, lang)
  }, [lead])

  async function generate(p, l) {
    if (!lead) return
    setGenerating(true)
    setSubject('')
    setBody('')

    const prompt = `Du er en erfaren og varm bilsælger hos en premium bilforhandler. Skriv en kort, personlig og engagerende salgs-email på ${l}.

Lead information:
- Navn: ${lead.name}
- Bil interesse: ${lead.car}
- Siden sidst kontaktet: ${lead.days} dage
- Kilde: ${lead.source}

Formål: ${purposeMap[p]}

Regler:
1. Max 4 korte afsnit
2. Brug kundens fornavn
3. Nævn specifikt bilmodellen
4. Én klar call-to-action
5. Afslut med: Carlos · Mercedes-Benz Madrid · +34 93 123 45 67
6. Skriv varmt og autentisk — ikke salgs-agtigt
7. SVAR KUN med JSON: {"subject":"EMNE","body":"TEKST MED \\n FOR LINJESKIFT"}`

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      setSubject(data.subject || '')
      setBody(data.body || 'Kunne ikke generere email.')
    } catch {
      setBody('Fejl ved AI generering. Prøv igen.')
    }
    setGenerating(false)
  }

  function handleSend() {
    onSent(lead)
    onClose()
    showToast('📤', `Email sendt til ${lead.name}`, subject)
  }

  if (!lead) return null

  const scoreColor = lead.score >= 80 ? 'var(--green)' : lead.score >= 60 ? 'var(--gold)' : 'var(--text2)'

  return (
    <div className="overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="modal modal-lg">
        <div className="modal-header">
          <div>
            <div className="modal-title">AI Email Composer</div>
            <div className="modal-sub">Personaliseret email til {lead.name}</div>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="lead-info-box">
          <div><div className="info-pair-label">Navn</div><div className="info-pair-val">{lead.name}</div></div>
          <div><div className="info-pair-label">Email</div><div className="info-pair-val" style={{color:'var(--blue)'}}>{lead.email}</div></div>
          <div><div className="info-pair-label">Bil interesse</div><div className="info-pair-val">{lead.car}</div></div>
          <div><div className="info-pair-label">Sidst kontaktet</div><div className="info-pair-val" style={{color:'var(--amber)'}}>{lead.days} dage siden</div></div>
          <div><div className="info-pair-label">AI score</div><div className="info-pair-val" style={{color:scoreColor}}>{lead.score}/100</div></div>
          <div><div className="info-pair-label">Status</div><div className="info-pair-val">{lead.status}</div></div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
          <div>
            <div className="label">Email formål</div>
            <select className="field-select" style={{width:'100%'}} value={purpose}
              onChange={e=>{setPurpose(e.target.value);generate(e.target.value,lang)}}>
              <option value="proevekoer">🚗 Book prøvekørsel</option>
              <option value="tilbud">💰 Personligt tilbud</option>
              <option value="ny_model">✨ Ny model lancering</option>
              <option value="check_in">👋 Blød check-in</option>
              <option value="ev">⚡ EV konvertering</option>
              <option value="urgency">⏰ Tidsbegrænset tilbud</option>
            </select>
          </div>
          <div>
            <div className="label">Sprog</div>
            <select className="field-select" style={{width:'100%'}} value={lang}
              onChange={e=>{setLang(e.target.value);generate(purpose,e.target.value)}}>
              <option value="spansk">Spansk</option>
              <option value="dansk">Dansk</option>
              <option value="engelsk">Engelsk</option>
            </select>
          </div>
        </div>

        <div className="label">AI-genereret emne-linje</div>
        <input className="field-input" style={{width:'100%',marginBottom:12}} value={subject}
          onChange={e=>setSubject(e.target.value)} placeholder={generating?'Genererer...':''} />

        <div className="label">Email tekst (redigérbar)</div>
        <div className="ai-box" contentEditable={!generating} suppressContentEditableWarning
          onBlur={e=>setBody(e.currentTarget.textContent)}>
          {body}
        </div>
        <div className={`ai-generating${generating?'':' hidden'}`}>
          <div className="dots"><span/><span/><span/></div>
          <span>AI genererer personaliseret email...</span>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={()=>generate(purpose,lang)}>↻ Regenerer</button>
          <button className="btn btn-ghost" onClick={onClose}>Annuller</button>
          <button className="btn btn-gold" onClick={handleSend} disabled={generating}>
            ✈ Send via Gmail
          </button>
        </div>
      </div>
    </div>
  )
}
