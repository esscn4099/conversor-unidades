document.addEventListener('DOMContentLoaded', () => {
    const CLAVE_ACCESO = "engie2025"; 

    const loginContainer = document.getElementById('login-container');
    const passwordInput = document.getElementById('password-input');
    const loginBtn = document.getElementById('login-btn');
    const errorMessage = document.getElementById('error-message');
    const mainContent = document.getElementById('main-content');
    
    // Función para manejar el inicio de sesión
    const handleLogin = () => {
        if (passwordInput.value === CLAVE_ACCESO) {
            loginContainer.classList.add('hidden');
            mainContent.classList.remove('hidden');
        } else {
            errorMessage.classList.remove('hidden');
            passwordInput.value = ''; // Limpiar el campo
        }
    };
    
    loginBtn.addEventListener('click', handleLogin);
    
    // Permitir ingresar con la tecla Enter
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });

    // El resto del código de la aplicación (cálculo y enlaces)
    const calcularBtn = document.getElementById('calcular');
    const limpiarBtn = document.getElementById('limpiar');
    const verLinksBtn = document.getElementById('ver_links');
    const linksContainer = document.getElementById('links-container');

    const inputs = {
        densidad: document.getElementById('densidad'),
        sm3_mmbtu: document.getElementById('sm3_mmbtu'),
        sm3_m3gnl: document.getElementById('sm3_m3gnl'),
        kg_gnl: document.getElementById('kg_gnl'),
        m3_gnl: document.getElementById('m3_gnl'),
        kg_gn: document.getElementById('kg_gn'),
        m3_gn: document.getElementById('m3_gn'),
        mmbtu: document.getElementById('mmbtu')
    };

    const formatNumber = (num) => {
        return num.toFixed(2);
    };

    const calcular = () => {
        let valKGGNL, valM3GNL, valKGGN, valM3GN, valMMBTU;

        const Densidad = parseFloat(inputs.densidad.value) || 430;
        const SM3_MMBTU = parseFloat(inputs.sm3_mmbtu.value) || 27.31;
        const SM3_M3GNL = parseFloat(inputs.sm3_m3gnl.value) || 608;

        const kg_gnl_val = parseFloat(inputs.kg_gnl.value);
        const m3_gnl_val = parseFloat(inputs.m3_gnl.value);
        const kg_gn_val = parseFloat(inputs.kg_gn.value);
        const m3_gn_val = parseFloat(inputs.m3_gn.value);
        const mmbtu_val = parseFloat(inputs.mmbtu.value);

        limpiarCamposSalida();

        if (!isNaN(m3_gnl_val)) {
            valM3GNL = m3_gnl_val;
            valKGGNL = valM3GNL * Densidad;
            valKGGN = valKGGNL;
            valM3GN = valM3GNL * SM3_M3GNL;
            valMMBTU = valM3GN / SM3_MMBTU;
        } else if (!isNaN(kg_gnl_val)) {
            valKGGNL = kg_gnl_val;
            valM3GNL = valKGGNL / Densidad;
            valKGGN = valKGGNL;
            valM3GN = valM3GNL * SM3_M3GNL;
            valMMBTU = valM3GN / SM3_MMBTU;
        } else if (!isNaN(mmbtu_val)) {
            valMMBTU = mmbtu_val;
            valM3GN = valMMBTU * SM3_MMBTU;
            valM3GNL = valM3GN / SM3_M3GNL;
            valKGGNL = valM3GNL * Densidad;
            valKGGN = valKGGNL;
        } else if (!isNaN(m3_gn_val)) {
            valM3GN = m3_gn_val;
            valM3GNL = valM3GN / SM3_M3GNL;
            valKGGNL = valM3GNL * Densidad;
            valKGGN = valKGGNL;
            valMMBTU = valM3GN / SM3_MMBTU;
        } else if (!isNaN(kg_gn_val)) {
            valKGGN = kg_gn_val;
            valKGGNL = valKGGN;
            valM3GNL = valKGGNL / Densidad;
            valM3GN = valM3GNL * SM3_M3GNL;
            valMMBTU = valM3GN / SM3_MMBTU;
        } else {
            alert("Por favor, ingrese un valor en al menos un campo para convertir.");
            return;
        }

        if (isNaN(m3_gnl_val)) inputs.m3_gnl.value = formatNumber(valM3GNL);
        if (isNaN(kg_gnl_val)) inputs.kg_gnl.value = formatNumber(valKGGNL);
        if (isNaN(kg_gn_val)) inputs.kg_gn.value = formatNumber(valKGGN);
        if (isNaN(m3_gn_val)) inputs.m3_gn.value = formatNumber(valM3GN);
        if (isNaN(mmbtu_val)) inputs.mmbtu.value = formatNumber(valMMBTU);
    };

    const limpiar = () => {
        inputs.kg_gnl.value = '';
        inputs.m3_gnl.value = '';
        inputs.kg_gn.value = '';
        inputs.m3_gn.value = '';
        inputs.mmbtu.value = '';
    };

    const limpiarCamposSalida = () => {
        limpiar();
    };

    calcularBtn.addEventListener('click', calcular);
    limpiarBtn.addEventListener('click', limpiar);
    
    verLinksBtn.addEventListener('click', () => {
        if (linksContainer.classList.contains('hidden')) {
            linksContainer.classList.remove('hidden');
        } else {
            linksContainer.classList.add('hidden');
        }
    });
});
