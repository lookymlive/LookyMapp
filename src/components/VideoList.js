import React, { useState, useEffect } from 'react';

const VideoList = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/videos')
            .then(response => response.json())
            .then(data => setVideos(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <h2>Videos Subidos</h2>
            {videos.map((video, index) => (
                <div key={index} style={styles.videoItem}>
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                    <p>Tienda: {video.storeName}</p>
                    <p>Ubicación: {video.location}</p>
                    <video width="320" height="240" controls>
                        <source src={`http://localhost:5000/uploads/${video.fileName}`} type="video/mp4" />
                        Tu navegador no soporta el tag de video.
                    </video>
                </div>
            ))}
        </div>
    );
};

const styles = {
    videoItem: {
        border: '1px solid #ddd',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px'
    }
};

export default VideoList;