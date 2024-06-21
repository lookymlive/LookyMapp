import React from 'react';

const Upload = () => {
    return (
        <div>
            <h2>Subir Video</h2>
            <form>
                <input type="text" placeholder="Título del video" />
                <input type="file" accept="video/*" />
                <button type="submit">Subir</button>
            </form>
        </div>
    );
};

export default Upload;