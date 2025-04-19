document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('propertyForm');
    const imageInput = document.getElementById('images');
    const imagePreview = document.getElementById('imagePreview');

    // Previsualización de imágenes
    imageInput.addEventListener('change', (e) => {
        imagePreview.innerHTML = '';
        const files = e.target.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.startsWith('image/')) continue;

            const reader = new FileReader();
            reader.onload = (e) => {
                const div = document.createElement('div');
                div.className = 'image-preview-item';
                
                const img = document.createElement('img');
                img.src = e.target.result;
                
                div.appendChild(img);
                imagePreview.appendChild(div);
            };
            reader.readAsDataURL(file);
        }
    });

    // Envío del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        
        // Agregar datos básicos
        formData.append('title', document.getElementById('title').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('type', document.getElementById('type').value);
        formData.append('operation', document.getElementById('operation').value);
        formData.append('price', document.getElementById('price').value);

        // Agregar ubicación
        const location = {
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value
        };
        formData.append('location', JSON.stringify(location));

        // Agregar características
        const features = {
            bedrooms: document.getElementById('bedrooms').value,
            bathrooms: document.getElementById('bathrooms').value,
            area: document.getElementById('area').value,
            parking: document.getElementById('parking').checked,
            furnished: document.getElementById('furnished').checked
        };
        formData.append('features', JSON.stringify(features));

        // Agregar imágenes
        const images = document.getElementById('images').files;
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            const response = await fetch('/api/properties', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert('Propiedad publicada exitosamente');
                window.location.href = '/';
            } else {
                alert(data.message || 'Error al publicar la propiedad');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en el servidor');
        }
    });

    // Validación de campos numéricos
    const numericInputs = document.querySelectorAll('input[type="number"]');
    numericInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            if (e.target.value < 0) {
                e.target.value = 0;
            }
        });
    });
}); 