import { useEffect, useState } from 'react'
import { createContact, fetchContacts } from './api/contacts'
import AddContact from './components/AddContact'
import ContactList from './components/ContactList'

function App() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function loadContacts() {
    setLoading(true)
    setError('')
    try {
      const data = await fetchContacts()
      setContacts(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
      setError('Error al cargar los contactos.')
      setContacts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContacts()
  }, [])

  async function handleAddContact(newContact) {
    setIsSubmitting(true)
    try {
      await createContact(newContact)
      await loadContacts()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="container">
      <h1>Agenda Multicapas</h1>
      <AddContact onAdd={handleAddContact} isSubmitting={isSubmitting} />
      <ContactList
        contacts={contacts}
        loading={loading}
        error={error}
        onRefresh={loadContacts}
      />
    </main>
  )
}

export default App
