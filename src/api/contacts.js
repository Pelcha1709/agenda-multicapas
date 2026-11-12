const API_URL = 'http://www.raydelto.org/agenda.php'

export async function fetchContacts() {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Error al obtener los datos del servidor.')
  }
  return response.json()
}

export async function createContact(contact) {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(contact),
  })
  if (!response.ok) {
    throw new Error('No se pudo guardar el contacto.')
  }
  return response
}
