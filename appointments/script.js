const form = document.getElementById('form');
const appointments = document.getElementById('appointments');
const url = "http://localhost:3000/appointments";

form.addEventListener('submit', postAppointments);
window.addEventListener("DOMContentLoaded", fetchData);
appointments.addEventListener('click', handleAppointmentClick);

async function fetchData() {
    try {
        const resp = await axios.get(url);
        resp.data.forEach(item => {
            appendAppointment(item.name, item.email, item.phone);
        });
    } catch (err) {
        console.log("error", err);
    }
}

async function postAppointments(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('mobile').value;

    if (name && email && phone) {
        const newAppointment = { name, email, phone };
    
        try {
            const resp = await axios.get(url);
            if (resp.data.some(item => item.email === email)) {
                alert("This user already exists");
            } else {
                await axios.post(url, newAppointment);
                appendAppointment(name, email, phone);
            }
        } catch (err) {
            console.log("error", err);
        }
    }

    form.reset();
}

function appendAppointment(name, email, phone) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.innerHTML = `
        <span>${name} - ${email} - ${phone}</span>
        <button id="${email}" class="btn btn-danger btn-sm float-end delete me-1">X</button>
        <button class="btn btn-success btn-sm float-end edit me-1">Edit</button>
    `;
    appointments.appendChild(listItem);
}

async function handleAppointmentClick(e) {
    if (e.target.classList.contains('delete')) {
        const listItem = e.target.parentElement;
        appointments.removeChild(listItem);

        try {
            const resp = await axios.get(url);
            const item = resp.data.find(values => values.email === e.target.id);
            
            if (item) await axios.delete(`${url}/${item.id}`);
        } catch (err) {
            console.log("error", err);
        }
    }

    else if (e.target.classList.contains('edit')) {
        const listItem = e.target.parentElement;
        const email = e.target.previousElementSibling.id;

        try  {
            const resp = await axios.get(url);
            const item = resp.data.find(values => values.email === email);
            if (item) {
                document.getElementById('name').value = item.name;
                document.getElementById('email').value = item.email;
                document.getElementById('mobile').value = item.phone;
                await axios.delete(`${url}/${item.id} `);
                appointments.removeChild(listItem);
            }
        } catch (err) {
            console.log("error", err);
        }
    }
}

//new
