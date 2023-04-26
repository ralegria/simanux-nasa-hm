import React, { useState } from "react";
import styles from "./App.module.scss";

function App() {
  const [coordinates, setCoordinates] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCoordinates(e.target.value);
  };

  const handleClick = () => {
    setLoading(true);
    fetchImage(coordinates);
  };

  const fetchImage = (coords) => {
    const [latitude, longitude] = coords.split(",");
    const apiKey = "9ixRXXctRst5hZPML6IR3zALdWgtvmUXNckEKHyk";
    const url = `https://api.nasa.gov/planetary/earth/assets?lat=${latitude}&lon=${longitude}&date=2018-01-01&dim=0.15&api_key=${apiKey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.url);
        setLoading(false); // Set loading to false after image has been fetched
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={coordinates}
          onChange={handleChange}
          className={styles["input-field"]}
          placeholder="Enter latitude, longitude (e.g. 40.7128,-74.006)"
        />
        <button onClick={handleClick} type="button" className={styles.button}>
          Get Image
        </button>
      </div>
      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        imageUrl && (
          <div className={styles.imageContainer}>
            <img
              src={imageUrl}
              alt="Aerial photography"
              className={styles.image}
            />
          </div>
        )
      )}
    </div>
  );
}

export default App;
