// SellProduct.js
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import Map from './map';


import './sell.css';

function SellProduct() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setcategory] = useState('');
  const [price, setPrice] = useState('');
  const [location, setlocation] = useState('');
  const [contact, setcontact] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState([]);
  const [map, setMap] = useState(true)


  const firebaseConfig = {
    apiKey: "AIzaSyDS0It9CQdX7RovaBz7lSjXF1QtkWP67X0",
    authDomain: "olx-clone-707b1.firebaseapp.com",
    projectId: "olx-clone-707b1",
    storageBucket: "olx-clone-707b1.appspot.com",
    messagingSenderId: "645335990169",
    appId: "1:645335990169:web:ef57da829854af34375d08",
    measurementId: "G-M7XRSSDS01"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  const handleImageUpload = async () => {
    const urls = [];

    for (const file of acceptedFiles) {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }

    setImageURL(urls);
    console.log(urls);
  };

  const handleSellProduct = async () => {
    try {

      await handleImageUpload();


      if (imageURL.length > 0) {
        const productData = {
          title,
          brand,
          category,
          price,
          location,
          contact,
          description,
          imageURL,
        };
        const docRef = await addDoc(collection(db, 'Products'), productData);

        console.log('Product added with ID: ', docRef.id);
        alert('Product added successfully');
      } else {
        alert('Please upload an image before selling.');
      }
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };

  return (
    <div>
      {map
        ?
        <div className='sell-container'>
          <h1 className='heading'>SELL YOUR PRODUCTS</h1>

          <div className="sell-form">
            <div className="form-section">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-section">
              <label htmlFor="brand">Brand:</label>
              <input
                type="text"
                id="brand"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="form-section">
              <label htmlFor="category">category:</label>
              <input
                type="text"
                id="category"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              />
            </div>
            <div className="form-section">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-section">
              <label htmlFor="location">location:</label>
              <button onClick={()=>{setMap(false)}}>Set Loaction</button>
            </div>
            <div className="form-section">
              <label htmlFor="Contact">Contact:</label>
              <input
                type="text"
                id="Contact"
                placeholder="Enter Contact"
                value={contact}
                onChange={(e) => setcontact(e.target.value)}
              />
            </div>
            <div className="form-section">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div {...getRootProps()} className="file-upload-form dropzone">
              <input type='file' multiple {...getInputProps()} />
              <div className="file-upload-label">
                <div className="file-upload-design">
                  <p>Drag and Drop</p>
                  <p>or</p>
                  <span className="browse-button">Browse file</span>
                </div>
              </div>

              {acceptedFiles.length > 0 && (
                <div>
                  <h4>Files:</h4>
                  <ul>
                    {acceptedFiles.map((file) => (
                      <li key={file.path}>
                        {file.name} - {file.size / 1024} KB
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          style={{ width: '50px', height: 'auto', marginLeft: '10px' }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button onClick={handleSellProduct} className="sell-button">Sell Now</button>
          </div>
        </div>
        :
        <div>
          <Map />
        </div>
      }
    </div>
  );
}

export default SellProduct;
