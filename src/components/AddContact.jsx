import { useState } from 'react'

function AddContact({ onAdd, isSubmitting }) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [telefono, setTelefono] = useState('')
  const [status, setStatus] = useState({ text: '', isError: false })

  async function handleSubmit(event) {
    event.preventDefault()

    const trimmedNombre = nombre.trim()
    const trimmedApellido = apellido.trim()
    const trimmedTelefono = telefono.trim()

    if (!trimmedNombre || !trimmedApellido || !trimmedTelefono) {
      setStatus({ text: 'Por favor complete todos los campos.', isError: true })
      return
    }

    try {
      await onAdd({
        nombre: trimmedNombre,
        apellido: trimmedApellido,
        telefono: trimmedTelefono,
      })
      setNombre('')
      setApellido('')
      setTelefono('')
      setStatus({ text: '¡Contacto guardado exitosamente!', isError: false })
    } catch {
      setStatus({ text: 'Error al intentar guardar el contacto.', isError: true })
    }
  }

  return (
    <section className="card">
      <h2>Nuevo Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            placeholder="Ej. Juan"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            required
            placeholder="Ej. Pérez"
            value={apellido}
            onChange={(event) => setApellido(event.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            required
            placeholder="Ej. 8095550199"
            value={telefono}
            onChange={(event) => setTelefono(event.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar Contacto'}
          </button>
        </div>
      </form>
      {status.text ? (
        <div
          className={status.isError ? 'status-message error' : 'status-message success'}
          role="alert"
        >
          {status.text}
        </div>
      ) : null}
    </section>
  )
}

export default AddContact
