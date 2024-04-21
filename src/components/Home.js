import React, { useState } from 'react';
import Navbar from './Navbar';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress component
import '../styles/home.css';

function Home() {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null); // State to store result

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setImage(selectedImage);
        }
    };

    const handleClickPredict = () => {
        setLoading(true);

        const formData = new FormData();
        formData.append('image', image);

        fetch('http://localhost:8000/home/classify/', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Assuming the backend returns JSON
            })
            .then(data => {
                // Handle response data
                setResult(data); // Set the result state with response data
                setLoading(false);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                setLoading(false);
            });
    };

    return (
        <div className='homecontainer'>
            <Navbar />
            <h2 className='hometitle'>Signature Verification System Using CNN</h2>
            <div className='homebody'>

                <label htmlFor="fileInput" id="imageUpload">Choose Image</label>
                <input style={{ display: "none" }} id="fileInput" type="file" onChange={handleImageChange} accept="image/*" />

                {image && (
                    <>
                        <div>Preview</div>
                        <img className="imgpreview" src={URL.createObjectURL(image)} alt="Handwritten Signature Preview" />
                    </>
                )}

                {loading ? (
                    // Show CircularProgress while loading
                    <CircularProgress style={{ marginTop: '20px' }} />
                ) : (
                    // Show result section when not loading
                    result && (
                        <div className="result-section">
                            <p>Threshold: 0.5</p>
                            <p>Threshold Result: {result.result}</p>
                            <p >Confidence:</p>
                            {result.result == "Genuine" ? (<>
                                <p>Genuine: {result.confidence}</p>
                                <p>Fake: {1-result.confidence}</p>
                            </>) : (<>
                                <p>Genuine: {1- result.confidence}</p>
                                <p>Fake: {result.confidence}</p>
                            </>)}
                        </div>
                    )
                )}

                <LoadingButton
                    loading={loading}
                    onClick={handleClickPredict}
                    loadingPosition="start"
                    startIcon={<SendIcon />}
                    variant="outlined"
                    disabled={!image} // Disable the button when image state is null
                >
                    Predict
                </LoadingButton>

            </div>
        </div>
    );
}

export default Home;
