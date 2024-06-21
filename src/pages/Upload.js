import React, { useState } from 'react';

const Upload = () => {
    const [videoData, setVideoData] = useState({
        title: '',
        description: '',
        storeName: '',
        location: '',
        file: null
    });
    const [errors, setErrors] = useState({});
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setVideoData(prevData => ({
            ...prevData,
            [name]: value
        }));
        // Clear error when user starts typing
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 100 * 1024 * 1024) { // 100MB limit
                setErrors(prevErrors => ({ ...prevErrors, file: 'El archivo es demasiado grande. El límite es 100MB.' }));
            } else if (!file.type.startsWith('video/')) {
                setErrors(prevErrors => ({ ...prevErrors, file: 'Por favor, selecciona un archivo de video válido.' }));
            } else {
                setVideoData(prevData => ({ ...prevData, file }));
                setErrors(prevErrors => ({ ...prevErrors, file: '' }));
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!videoData.title.trim()) newErrors.title = 'El título es requerido';
        if (!videoData.description.trim()) newErrors.description = 'La descripción es requerida';
        if (!videoData.storeName.trim()) newErrors.storeName = 'El nombre de la tienda es requerido';
        if (!videoData.location.trim()) newErrors.location = 'La ubicación es requerida';
        if (!videoData.file) newErrors.file = 'Por favor, selecciona un archivo de video';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const simulateUpload = () => {
        setIsUploading(true);
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress(prevProgress => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    return 100;
                }
                return prevProgress + 10;
            });
        }, 500);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            setIsUploading(true);
            setUploadProgress(0);

            const formData = new FormData();
            formData.append('title', videoData.title);
            formData.append('description', videoData.description);
            formData.append('storeName', videoData.storeName);
            formData.append('location', videoData.location);
            formData.append('video', videoData.file);

            try {
                // Simular progreso
                const progressInterval = setInterval(() => {
                    setUploadProgress(prev => (prev >= 90 ? 90 : prev + 10));
                }, 500);

                const response = await fetch('http://localhost:5000/upload', {
                    method: 'POST',
                    body: formData,
                });

                clearInterval(progressInterval);  // Detener la simulación de progreso

                if (response.ok) {
                    setUploadProgress(100);
                    alert('Video subido con éxito!');
                    setVideoData({
                        title: '',
                        description: '',
                        storeName: '',
                        location: '',
                        file: null
                    });
                } else {
                    throw new Error('Error al subir el video');
                }
            } catch (error) {
                alert('Error al subir el video: ' + error.message);
            } finally {
                setIsUploading(false);
            }
        }
    };

    // ... (resto del código sin cambios)

    return (
        <div style={styles.container}>
            <h2>Subir Video</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                {/* ... (resto del formulario sin cambios) */}
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        margin: '10px 0',
        padding: '10px',
        fontSize: '16px',
    },
    textarea: {
        margin: '10px 0',
        padding: '10px',
        fontSize: '16px',
        minHeight: '100px',
    },
    fileInput: {
        margin: '10px 0',
    },
    button: {
        margin: '20px 0',
        padding: '10px',
        fontSize: '18px',
        backgroundColor: '#4a90e2',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        marginTop: '5px',
    },
    progressContainer: {
        width: '100%',
        height: '20px',
        backgroundColor: '#e0e0e0',
        borderRadius: '10px',
        margin: '10px 0',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#4a90e2',
        borderRadius: '10px',
        transition: 'width 0.5s ease-in-out',
    },
};

export default Upload;