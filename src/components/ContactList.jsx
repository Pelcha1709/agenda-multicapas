function ContactList({ contacts, loading, error, onRefresh }) {
  let content

  if (loading) {
    content = <div className="empty-state">Cargando contactos...</div>
  } else if (error) {
    content = <div className="empty-state">{error}</div>
  } else if (!contacts.length) {
    content = <div className="empty-state">No hay contactos registrados.</div>
  } else {
    content = contacts.map((contact, index) => {
      const nombre = contact.nombre || ''
      const apellido = contact.apellido || ''
      const fullName = `${nombre} ${apellido}`.trim() || 'Sin Nombre'
      const key = `${nombre}-${apellido}-${contact.telefono || ''}-${index}`

      return (
        <div className="contact-card" key={key}>
          <div className="contact-name">{fullName}</div>
          <div className="contact-phone">
            Tel: {contact.telefono || 'Sin teléfono'}
          </div>
        </div>
      )
    })
  }

  return (
    <section className="card">
      <div className="contact-list-header">
        <h2>Listado de Contactos</h2>
        <button type="button" onClick={onRefresh} disabled={loading}>
          Actualizar
        </button>
      </div>
      <div className="contact-grid">{content}</div>
    </section>
  )
}

export default ContactList
