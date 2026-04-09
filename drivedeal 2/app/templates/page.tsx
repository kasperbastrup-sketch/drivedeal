'use client'
import { useState } from 'react'
import { useToast } from '@/components/Toast'

const templates = [
  {key:'proeve',icon:'🚗',name:'Prøvekørsel invitation',desc:'Inviterer til gratis prøvetur uden forpligtelse',rate:'Åbningsrate: 52% · Booking-rate: 8.2%'},
  {key:'tilbud',icon:'💰',name:'Personligt tilbud',desc:'Eksklusivt tilbud specifikt til leadets bil',rate:'Åbningsrate: 48% · Booking-rate: 6.8%'},
  {key:'nysger',icon:'🤔',name:'Blød check-in',desc:'Uformel genoptagelse af kontakt',rate:'Åbningsrate: 61% · Svar-rate: 14%'},
  {key:'nymodel',icon:'✨',name:'Ny model lancering',desc:'Fortæller om ny model der matcher interessen',rate:'Åbningsrate: 44% · Booking-rate: 5.1%'},
  {key:'ev',icon:'⚡',name:'EV konvertering',desc:'Konverter benzin-leads til elbil interesse',rate:'Åbningsrate: 58% · Booking-rate: 9.8%'},
]

const defaultSubject = '{{fornavn}}, din {{bil}} venter på dig 🚗'
const defaultBody = `Hej {{fornavn}},

Det er nu {{dage_siden}} dage siden du kiggede på en {{bil}} hos os, og jeg ville høre om du stadig overvejer det?

Vi har faktisk en rigtig flot {{bil}} klar til prøvekørsel denne uge — helt uforpligtende.

Har du 20 minutter til en prøvetur?

Med venlig hilsen,
{{afsender}}
{{forhandler}}`

export default function Templates() {
  const [selected, setSelected] = useState('proeve')
  const [subject, setSubject] = useState(defaultSubject)
  const [body, setBody] = useState(defaultBody)
  const { show } = useToast()

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
        <div className="font-head" style={{fontSize:14,fontWeight:700}}>Email skabeloner</div>
        <button className="btn btn-gold" onClick={()=>show('✨','Ny skabelon','Opret din egen AI-skabelon')}>+ Ny skabelon</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        <div className="panel">
          <div className="font-head" style={{fontSize:13,fontWeight:600,marginBottom:14}}>Vælg skabelon</div>
          {templates.map(t=>(
            <div key={t.key} className={`template-card${selected===t.key?' selected':''}`} onClick={()=>setSelected(t.key)}>
              <div style={{fontWeight:600,fontSize:12,marginBottom:3}}>{t.icon} {t.name}</div>
              <div style={{fontSize:11,color:'var(--text2)'}}>{t.desc}</div>
              <div style={{fontSize:10,color:'var(--green)',marginTop:4}}>{t.rate}</div>
            </div>
          ))}
        </div>
        <div className="panel">
          <div className="font-head" style={{fontSize:13,fontWeight:600,marginBottom:14}}>Rediger skabelon</div>
          <div className="label" style={{marginTop:0}}>Emne-linje</div>
          <input className="field-input" value={subject} onChange={e=>setSubject(e.target.value)} style={{width:'100%'}}/>
          <div className="label">Email tekst</div>
          <textarea className="field-textarea" value={body} onChange={e=>setBody(e.target.value)} style={{minHeight:220}}/>
          <div style={{marginTop:8,fontSize:11,color:'var(--text2)'}}>
            Variabler: {['{{fornavn}}','{{bil}}','{{dage_siden}}','{{afsender}}'].map(v=>(
              <code key={v} style={{fontFamily:'var(--font-mono)',fontSize:10,background:'var(--surface2)',padding:'1px 5px',borderRadius:3,marginRight:4}}>{v}</code>
            ))}
          </div>
          <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:14}}>
            <button className="btn btn-ghost" onClick={()=>show('👁','Forhåndsvisning','Åbner email preview')}>Forhåndsvis</button>
            <button className="btn btn-gold" onClick={()=>show('💾','Skabelon gemt','Klar til brug i kampagner')}>Gem skabelon</button>
          </div>
        </div>
      </div>
    </div>
  )
}
