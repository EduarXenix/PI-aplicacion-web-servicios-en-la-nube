function obtenerClima() {
    const apiKey = '71ea74baa1ba89ec8dd05fd1ca63f5eb';
    const ciudad = document.getElementById('ciudad').value;

    if (!ciudad) {
        alert('Por favor, ingrese una ciudad');
        return;
    }

    const urlClimaActual = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&appid=${apiKey}`;
    const urlPronostico = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&lang=es&appid=${apiKey}`;

    fetch(urlClimaActual)
        .then(respuesta => respuesta.json())
        .then(datos => {
            mostrarClima(datos);
        })
        .catch(error => {
            console.error('Error al obtener los datos del clima actual:', error);
            alert('Error al obtener los datos del clima actual. Por favor, intente nuevamente.');
        });

    fetch(urlPronostico)
        .then(respuesta => respuesta.json())
        .then(datos => {
            mostrarPronosticoHorario(datos.list);
        })
        .catch(error => {
            console.error('Error al obtener los datos del pronóstico horario:', error);
            alert('Error al obtener los datos del pronóstico horario. Por favor, intente nuevamente.');
        });
}

function mostrarClima(datos) {
    const divInfoTemp = document.getElementById('div-temp');
    const divInfoClima = document.getElementById('info-clima');
    const iconoClima = document.getElementById('icono-clima');
    const pronosticoHorarioDiv = document.getElementById('pronostico-horario');

    divInfoClima.innerHTML = '';
    pronosticoHorarioDiv.innerHTML = '';
    divInfoTemp.innerHTML = '';

    if (datos.cod === '404') {
        divInfoClima.innerHTML = `<p>${datos.message}</p>`;
    } else {
        const nombreCiudad = datos.name;
        const temperatura = Math.round(datos.main.temp - 273.15);
        const descripcion = datos.weather[0].description;
        const codigoIcono = datos.weather[0].icon;
        const urlIcono = `https://openweathermap.org/img/wn/${codigoIcono}@4x.png`;

        const temperaturaHTML = `
            <p>${temperatura}°C</p>
        `;

        const climaHtml = `
            <p>${nombreCiudad}</p>
            <p>${descripcion}</p>
        `;

        divInfoTemp.innerHTML = temperaturaHTML;
        divInfoClima.innerHTML = climaHtml;
        iconoClima.src = urlIcono;
        iconoClima.alt = descripcion;

        mostrarImagen();
    }
}

function mostrarPronosticoHorario(datosHorarios) {
    const pronosticoHorarioDiv = document.getElementById('pronostico-horario');

    const proximas24Horas = datosHorarios.slice(0, 8);

    proximas24Horas.forEach(item => {
        const fechaHora = new Date(item.dt * 1000);
        const hora = fechaHora.getHours();
        const temperatura = Math.round(item.main.temp - 273.15);
        const codigoIcono = item.weather[0].icon;
        const urlIcono = `https://openweathermap.org/img/wn/${codigoIcono}.png`;

        const itemHTML = `
            <div class="item-horario">
                <span>${hora}:00</span>
                <img src="${urlIcono}" alt="Icono del Clima Horario">
                <span>${temperatura}°C</span>
            </div>
        `;

        pronosticoHorarioDiv.innerHTML += itemHTML;
    });
}

function mostrarImagen() {
    const iconoClima = document.getElementById('icono-clima');
    iconoClima.style.display = 'block';
}
