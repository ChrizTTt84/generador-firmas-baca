// Generador de Firmas Digitales - JavaScript
class SignatureGenerator {
    constructor() {
        this.form = document.getElementById('signatureForm');
        this.preview = document.getElementById('signaturePreview');
        this.downloadBtn = document.getElementById('downloadHtml');
        this.resetBtn = document.getElementById('resetForm');
        this.successMessage = document.getElementById('copySuccess');
        
        this.initializeEventListeners();
        this.loadSavedData();
    }

    initializeEventListeners() {
        // Escuchar cambios en todos los inputs del formulario
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.generatePreview();
                this.saveFormData();
            });
            input.addEventListener('change', () => {
                this.generatePreview();
                this.saveFormData();
            });
        });

        // Botones de acción
        this.downloadBtn.addEventListener('click', () => this.downloadHtml());
        this.resetBtn.addEventListener('click', () => this.resetForm());
    }

    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value.trim();
        }
        
        return data;
    }

    generatePreview() {
        const data = this.getFormData();
        
        // Si no hay nombre, mostrar placeholder
        if (!data.fullName) {
            this.showPlaceholder();
            this.disableActions();
            return;
        }

        const signatureHtml = this.generateSignatureHtml(data);
        this.preview.innerHTML = signatureHtml;
        this.enableActions();
    }

    generateSignatureHtml(data) {
        const contactInfo = this.generateContactInfo(data);
        const socialLinks = this.generateFixedSocialLinks(); // Ahora usa enlaces fijos
        const primaryColor = '#87CEEB'; // Color azul cielo fijo
        const includeLogo = true; // Siempre incluir el logo
        
        // Solo usar la plantilla minimalista
        return this.generateMinimalSignature(data, contactInfo, socialLinks, primaryColor, includeLogo);
    }

    generateContactInfo(data) {
        const contactInfo = [];
        
        // Teléfono con extensión
        let phoneDisplay = data.phone; // Ya viene fijo: "664 6899763"
        if (data.extension) {
            phoneDisplay += ` Ext. ${data.extension}`;
        }
        contactInfo.push(`<a href="tel:${data.phone}">&#128222; ${this.escapeHtml(phoneDisplay)}</a>`);
        
        if (data.mobile) {
            contactInfo.push(`<a href="tel:${data.mobile}">&#128241; ${this.escapeHtml(data.mobile)}</a>`);
        }
        
        if (data.email) {
            contactInfo.push(`<a href="mailto:${data.email}">&#9993;&#65039; ${this.escapeHtml(data.email)}</a>`);
        }
        
        if (data.website) {
            const websiteUrl = data.website.startsWith('http') ? data.website : `https://${data.website}`;
            contactInfo.push(`<a href="${websiteUrl}" target="_blank">&#127760; ${this.escapeHtml(data.website)}</a>`);
        }
        
        return contactInfo.join(' | ');
    }

    generateFixedSocialLinks() {
        return `
            <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 5px;">
                <tr>
                    <td style="padding-right: 8px;">
                        <a href="https://www.linkedin.com/company/grupo-industrial-baca" style="text-decoration: none; display: inline-block;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0077B5" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                    </td>
                    <td style="padding-right: 8px;">
                        <a href="https://www.facebook.com/grupoindustrialbaca" style="text-decoration: none; display: inline-block;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                    </td>
                    <td>
                        <a href="https://www.instagram.com/grupoindustrialbaca" style="text-decoration: none; display: inline-block;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#E4405F" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a>
                    </td>
                </tr>
            </table>
        `;
    }

    generateMinimalSignature(data, contactInfo, socialLinks, primaryColor, includeLogo) {
        return `
            <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; max-width: 600px; border-top: 3px solid ${primaryColor}; padding-top: 15px;">
                <tr>
                    <td>
                        <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                            <tr>
                                <td style="font-size: 16px; font-weight: bold; color: #1B4F9C; margin-bottom: 12px; text-align: left; padding: 5px 0; border-bottom: 1px solid #e0e0e0;">
                                    Grupo Industrial Baca S.A de C.V
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-top: 10px;">
                                    <div style="font-size: 18px; font-weight: bold; color: #1B4F9C; margin-bottom: 3px;">
                                        ${this.escapeHtml(data.fullName)}
                                    </div>
                                    ${data.jobTitle ? `<div style="font-size: 14px; color: #666; margin-bottom: 10px;">${this.escapeHtml(data.jobTitle)}</div>` : ''}
                                    
                                    <div style="font-size: 13px; line-height: 1.4; color: #555; margin-bottom: 8px;">
                                        ${contactInfo}
                                    </div>
                                    
                                    <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 8px; margin-bottom: 8px;">
                                        <tr>
                                            <td style="padding-right: 8px;">
                                                <img src="https://github.com/ChrizTTt84/generador-firmas-baca/blob/main/Master_Qualified_Facility.png" alt="Master Qualified Facility Certified" style="height: 24px !important; width: auto !important; max-width: 60px !important; object-fit: contain !important; vertical-align: middle !important;">
                                            </td>
                                            <td style="padding-right: 8px;">
                                                <img src="https://github.com/ChrizTTt84/generador-firmas-baca/blob/main/9001_2015.png" alt="ISO 9001:2015 Certified" style="height: 24px !important; width: auto !important; max-width: 60px !important; object-fit: contain !important; vertical-align: middle !important;">
                                            </td>
                                            <td style="padding-right: 8px;">
                                                <img src="https://github.com/ChrizTTt84/generador-firmas-baca/blob/main/fsc.png" alt="FSC Certified" style="height: 24px !important; width: auto !important; max-width: 60px !important; object-fit: contain !important; vertical-align: middle !important;">
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    ${data.address ? `<div style="font-size: 12px; color: #888; margin-top: 5px; font-style: italic; line-height: 1.4; word-wrap: break-word; white-space: pre-wrap; overflow-wrap: break-word; width: 100%; display: block;">${this.escapeHtml(data.address).replace(/\n/g, '<br>')}</div>` : ''}
                                    ${socialLinks ? `<div style="margin-top: 10px;">${socialLinks}</div>` : ''}
                                    
                                    <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #ddd; font-size: 10px; color: #666; line-height: 1.2;">
                                        <strong>Aviso de Confidencialidad:</strong><br>
                                        La información contenida en este correo electrónico es confidencial, exclusivamente para la persona a la que fue enviada. Favor de borrar este correo electrónico en caso de no ser el destinatario correcto. La autorización escrita de GRUPO INDUSTRIAL BACA, S. A. de C.V. es requerida para copiar o distribuir la información contenida en este correo electrónico. El cumplimiento de esta disposición es de conformidad con las leyes mexicanas.<br><br>
                                        <strong>Confidentiality Notice:</strong><br>
                                        The information on this e-mail is confidential, exclusively for the person this e-mail was sent to. Please delete this e-mail if you were not its proper recipient. Written authorization from GRUPO INDUSTRIAL BACA, S. A. of C.V. is required to copy or further distribute the information contained on this e-mail. Compliance with this provision is in accordance with Mexican law.
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;
    }

    generateSocialLinks(data) {
        // Esta función ya no se usa, pero se mantiene por compatibilidad
        return this.generateFixedSocialLinks();
    }

    showPlaceholder() {
        this.preview.innerHTML = `
            <div class="placeholder">
                <i class="fas fa-eye"></i>
                <p>La vista previa aparecerá aquí mientras completas el formulario</p>
            </div>
        `;
    }

    enableActions() {
        this.downloadBtn.disabled = false;
    }

    disableActions() {
        this.downloadBtn.disabled = true;
    }

    downloadHtml() {
        const data = this.getFormData();
        if (!data.fullName) return;
        
        const signatureHtml = this.generateCompleteHtml(data);
        const blob = new Blob([signatureHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `firma-${data.fullName.replace(/\s+/g, '-').toLowerCase()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    async copyToClipboard() {
        const data = this.getFormData();
        if (!data.fullName) return;
        
        try {
            // Crear un canvas temporal
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Configurar el canvas con un tamaño apropiado para la firma
            canvas.width = 600;
            canvas.height = 300;
            
            // Fondo blanco
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Crear un elemento temporal con la firma
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = this.generateSignatureHtml(data);
            tempDiv.style.position = 'absolute';
            tempDiv.style.left = '-9999px';
            tempDiv.style.width = '600px';
            tempDiv.style.fontFamily = 'Arial, sans-serif';
            document.body.appendChild(tempDiv);
            
            // Usar html2canvas para convertir a imagen
            const html2canvas = await this.loadHtml2Canvas();
            const canvasResult = await html2canvas(tempDiv, {
                backgroundColor: '#ffffff',
                width: 600,
                height: 300,
                scale: 2,
                useCORS: true,
                allowTaint: true
            });
            
            // Limpiar el elemento temporal
            document.body.removeChild(tempDiv);
            
            // Convertir a JPEG y descargar
            canvasResult.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `firma-${data.fullName.replace(/\s+/g, '-').toLowerCase()}.jpg`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 'image/jpeg', 0.9);
            
        } catch (error) {
            console.error('Error al generar la imagen:', error);
            alert('Error al generar la imagen. Por favor, intenta de nuevo.');
        }
    }

    async loadHtml2Canvas() {
        // Cargar html2canvas dinámicamente si no está disponible
        if (typeof html2canvas === 'undefined') {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
                script.onload = () => resolve(window.html2canvas);
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }
        return window.html2canvas;
    }

    generateCompleteHtml(data) {
        const signatureHtml = this.generateSignatureHtml(data);
        
        return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Firma Digital - ${this.escapeHtml(data.fullName)}</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .signature { line-height: 1.4; color: #333; }
        .signature-modern { border-left: 4px solid var(--primary-color, #3498db); padding-left: 15px; }
        .signature-classic { border: 1px solid #ddd; padding: 15px; background: #fafafa; }
        .signature-minimal { border-top: 2px solid var(--primary-color, #3498db); padding-top: 15px; }
        .signature-name { font-size: 18px; font-weight: bold; color: var(--primary-color, #2c3e50); margin-bottom: 5px; }
        .signature-title { font-size: 14px; color: #666; margin-bottom: 3px; }
        .signature-company { font-size: 14px; font-weight: 600; color: var(--primary-color, #2c3e50); margin-bottom: 8px; }
        .signature-contact { font-size: 12px; color: #666; margin-bottom: 8px; }
        .signature-contact a { color: var(--primary-color, #3498db); text-decoration: none; }
        .signature-contact a:hover { text-decoration: underline; }
        .signature-social { margin-top: 10px; }
        .signature-social a { display: inline-block; margin-right: 10px; color: var(--primary-color, #3498db); font-size: 16px; text-decoration: none; }
        .signature-address { font-size: 11px; color: #888; margin-top: 8px; font-style: italic; }
    </style>
</head>
<body>
    <h1>Firma Digital</h1>
    <p>Copia el siguiente código HTML para usar en tu cliente de correo:</p>
    <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <code style="white-space: pre-wrap;">${this.escapeHtml(signatureHtml)}</code>
    </div>
    <h2>Vista Previa:</h2>
    ${signatureHtml}
</body>
</html>`;
    }

    showSuccessMessage() {
        this.successMessage.style.display = 'block';
        setTimeout(() => {
            this.successMessage.style.display = 'none';
        }, 3000);
    }

    resetForm() {
        if (confirm('¿Estás seguro de que quieres limpiar todos los campos?')) {
            this.form.reset();
            this.showPlaceholder();
            this.disableActions();
            this.clearSavedData();
        }
    }

    saveFormData() {
        const data = this.getFormData();
        localStorage.setItem('signatureFormData', JSON.stringify(data));
    }

    loadSavedData() {
        try {
            const savedData = localStorage.getItem('signatureFormData');
            if (savedData) {
                const data = JSON.parse(savedData);
                
                // Llenar el formulario con los datos guardados
                Object.keys(data).forEach(key => {
                    const input = this.form.querySelector(`[name="${key}"]`);
                    if (input && data[key]) {
                        input.value = data[key];
                    }
                });
                
                // Generar vista previa si hay datos
                if (data.fullName) {
                    this.generatePreview();
                }
            }
        } catch (err) {
            console.error('Error al cargar datos guardados:', err);
        }
    }

    clearSavedData() {
        localStorage.removeItem('signatureFormData');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Funciones de utilidad adicionales
class SignatureUtils {
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validateUrl(url) {
        try {
            new URL(url.startsWith('http') ? url : `https://${url}`);
            return true;
        } catch {
            return false;
        }
    }

    static formatPhone(phone) {
        // Remover caracteres no numéricos excepto + al inicio
        const cleaned = phone.replace(/[^\d+]/g, '');
        
        // Formatear número de teléfono básico
        if (cleaned.length === 10) {
            return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        }
        
        return phone; // Devolver original si no se puede formatear
    }
}

// Validación en tiempo real
function setupValidation() {
    const emailInput = document.getElementById('email');
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    const urlInputs = document.querySelectorAll('input[type="url"]');

    // Validar email
    emailInput.addEventListener('blur', function() {
        if (this.value && !SignatureUtils.validateEmail(this.value)) {
            this.setCustomValidity('Por favor, ingresa un email válido');
        } else {
            this.setCustomValidity('');
        }
    });

    // Formatear teléfonos
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value) {
                this.value = SignatureUtils.formatPhone(this.value);
            }
        });
    });

    // Validar URLs
    urlInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !SignatureUtils.validateUrl(this.value)) {
                this.setCustomValidity('Por favor, ingresa una URL válida');
            } else {
                this.setCustomValidity('');
            }
        });
    });
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el generador de firmas
    const generator = new SignatureGenerator();
    
    // Configurar validaciones
    setupValidation();
    
    // Agregar tooltips informativos
    const tooltips = {
        'fullName': 'Tu nombre completo como aparecerá en la firma',
        'jobTitle': 'Tu cargo o posición en la empresa',
        'phone': 'Teléfono fijo de la empresa (no modificable)',
        'extension': 'Extensión telefónica personal (opcional)',
        'mobile': 'Número de móvil personal (opcional)',
        'email': 'Tu dirección de correo electrónico',
        'website': 'Sitio web de tu empresa o personal',
        'address': 'Dirección física de la empresa (fija)',
        'template': 'Estilo visual de la firma'
    };

    Object.keys(tooltips).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.title = tooltips[id];
        }
    });

    console.log('Generador de Firmas Digitales inicializado correctamente');
});
