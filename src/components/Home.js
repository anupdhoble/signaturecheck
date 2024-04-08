import React from 'react';
import Navbar from './Navbar';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import '../styles/home.css';

function Home() {
    const [loading, setLoading] = React.useState(false);
    const [image, setImage] = React.useState(null);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setImage(URL.createObjectURL(selectedImage));
        }
    };

    function handleClickPredict() {
        setLoading(true);
        // Add your prediction logic here
    }

    return (
        <div className='homecontainer'>
            <Navbar />
            <div className='homebody'>
                <label htmlFor="fileInput" id="imageUpload">Choose Image</label>
                <input style={{ display: "none" }} id="fileInput" type="file" onChange={handleImageChange} accept="image/*" />
                {image && (
                    <>
                        <div>Preview</div>
                        <img className="imgpreview" src={image} alt="Handwritten Signature Preview" />
                    </>
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
