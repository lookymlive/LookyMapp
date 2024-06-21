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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            simulateUpload();
            // Aquí iría la lógica para enviar los datos al servidor
            console.log('Datos del video:', videoData);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Subir Video</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="title"
                    value={videoData.title}
                    onChange={handleInputChange}
                    placeholder="Título del video"
                    style={styles.input}
                />
                {errors.title && <span style={styles.error}>{errors.title}</span>}

                <textarea
                    name="description"
                    value={videoData.description}
                    onChange={handleInputChange}
                    placeholder="Descripción del video"
                    style={styles.textarea}
                />
                {errors.description && <span style={styles.error}>{errors.description}</span>}

                <input
                    type="text"
                    name="storeName"
                    value={videoData.storeName}
                    onChange={handleInputChange}
                    placeholder="Nombre de la tienda"
                    style={styles.input}
                />
                {errors.storeName && <span style={styles.error}>{errors.storeName}</span>}

                <input
                    type="text"
                    name="location"
                    value={videoData.location}
                    onChange={handleInputChange}
                    placeholder="Ubicación de la tienda"
                    style={styles.input}
                />
                {errors.location && <span style={styles.error}>{errors.location}</span>}

                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="video/*"
                    style={styles.fileInput}
                />
                {errors.file && <span style={styles.error}>{errors.file}</span>}

                {isUploading && (
                    <div style={styles.progressContainer}>
                        <div style={{ ...styles.progressBar, width: `${uploadProgress}%` }}></div>
                    </div>
                )}

                <button type="submit" style={styles.button} disabled={isUploading}>
                    {isUploading ? 'Subiendo...' : 'Subir Video'}
                </button>
            </form>
        </div>
    );
};

const styles = {
    // ... (mantén los estilos existentes)
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