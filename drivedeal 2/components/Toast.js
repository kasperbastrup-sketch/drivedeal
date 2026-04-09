import { useState, useCallback } from 'react'

let _addToast = null

export function useToast() {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((icon, title, sub = '') => {
    const id = Date.now()
    setToasts(t => [...t, { id, icon, title, sub }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3800)
  }, [])

  _addToast = addToast
  return { toasts, addToast }
}

export function showToast(icon, title, sub = '') {
  if (_addToast) _addToast(icon, title, sub)
}

export function ToastStack({ toasts }) {
  return (
    <div className="toast-stack">
      {toasts.map(t => (
        <div key={t.id} className="toast show">
          <span className="toast-icon">{t.icon}</span>
          <div className="toast-msg">
            <strong>{t.title}</strong>
            {t.sub && <span>{t.sub}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
