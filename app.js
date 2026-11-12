const API_URL = 'http://www.raydelto.org/agenda.php';

const contactForm = document.getElementById('contactForm');
const contactsContainer = document.getElementById('contactsContainer');
const statusMessage = document.getElementById('statusMessage');
const submitBtn = document.getElementById('submitBtn');
const refreshBtn = document.getElementById('refreshBtn');

function showStatus(text, isError = false) {
  statusMessage.textContent = text;
  statusMessage.className = isError ? 'error' : 'success';
  setTimeout(() => {
    statusMessage.textContent = '';
    statusMessage.className = '';
  }, 4000);
}

function renderContacts(contacts) {
  contactsContainer.textContent = '';

  if (!Array.isArray(contacts) || contacts.length === 0) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'empty-state';
    emptyDiv.textContent = 'No hay contactos registrados.';
    contactsContainer.appendChild(emptyDiv);
    return;
  }

  contacts.forEach(contact => {
    const card = document.createElement('div');
    card.className = 'contact-card';

    const nameEl = document.createElement('div');
    nameEl.className = 'contact-name';
    const nombre = contact.nombre || '';
    const apellido = contact.apellido || '';
    nameEl.textContent = `${nombre} ${apellido}`.trim() || 'Sin Nombre';

    const phoneEl = document.createElement('div');
    phoneEl.className = 'contact-phone';
    phoneEl.textContent = `Tel: ${contact.telefono || 'Sin teléfono'}`;

    card.appendChild(nameEl);
    card.appendChild(phoneEl);
    contactsContainer.appendChild(card);
  });
}

// HTTP GET
async function loadContacts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener los datos del servidor.');
    }
    const contacts = await response.json();
    renderContacts(contacts);
  } catch (error) {
    console.error(error);
    contactsContainer.textContent = '';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'empty-state';
    errorDiv.textContent = 'Error al cargar los contactos.';
    contactsContainer.appendChild(errorDiv);
  }
}

// HTTP POST
async function addContact(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const telefono = document.getElementById('telefono').value.trim();

  if (!nombre || !apellido || !telefono) {
    showStatus('Por favor complete todos los campos.', true);
    return;
  }

  const newContact = { nombre, apellido, telefono };
  submitBtn.disabled = true;
  submitBtn.textContent = 'Guardando...';
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(newContact)
    });

    if (!response.ok) {
      throw new Error('No se pudo guardar el contacto.');
    }

    showStatus('¡Contacto guardado exitosamente!');
    contactForm.reset();
    await loadContacts(); 
  } catch (error) {
    console.error(error);
    showStatus('Error al intentar guardar el contacto.', true);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Guardar Contacto';
  }
}


contactForm.addEventListener('submit', addContact);
refreshBtn.addEventListener('click', loadContacts);
document.addEventListener('DOMContentLoaded', loadContacts);