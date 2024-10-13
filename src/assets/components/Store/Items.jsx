import React from "react";
function Items({ image, title, lastPrix, prix }) {
  return (
    <div
    className="trensparentBg"
    >
      <img
        src={image}
        alt="Item image"
        style={{ width: "100%", height: "60%", borderRadius: 10 }}
      />
      <h3 style={{color:"#ffffff"}}>{title}</h3>
      <div className="PrixLabel " style={{display:'flex',alignItems:'center'}}>
        <p style={{ color: "red", fontSize: 18 }}>{prix}</p>
        <p
          style={{
            color: "grey",
            fontSize: 15,
            textDecoration: "line-through",
          }}
        >
          {lastPrix}
        </p>
      </div>
    </div>
  );
}

export default Items;
