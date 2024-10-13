import React from "react";
import "./Store.css";
import Items from "./Items";

function Store() {
  return (
    <div className="StoreContainer">
      <h1 className="TitleStore">SQUID GAME COLLECTIONS</h1>
      <div className="StoreItems">
        <Items
          image={
            "https://img.kwcdn.com/product/open/2024-10-01/1727804345632-8e6bda5d9b3d4d5488f74c343b929e0e-goods.jpeg?imageView2/2/w/800/q/70/format/webp"
          }
          title={"Item 1"}
          lastPrix={"200dh"}
          prix={"160dh"}
        />
        <Items
          image={
            "https://img.kwcdn.com/product/open/2024-10-01/1727804345632-8e6bda5d9b3d4d5488f74c343b929e0e-goods.jpeg?imageView2/2/w/800/q/70/format/webp"
          }
          title={"Item 2"}
          lastPrix={"220dh"}
          prix={"180dh"}
        />
        <Items
          image={
            "https://img.kwcdn.com/product/open/2024-10-01/1727804345632-8e6bda5d9b3d4d5488f74c343b929e0e-goods.jpeg?imageView2/2/w/800/q/70/format/webp"
          }
          title={"Item 3"}
          lastPrix={"250dh"}
          prix={"210dh"}
        />
        <Items
          image={
            "https://img.kwcdn.com/product/open/2024-10-01/1727804345632-8e6bda5d9b3d4d5488f74c343b929e0e-goods.jpeg?imageView2/2/w/800/q/70/format/webp"
          }
          title={"Item 4"}
          lastPrix={"180dh"}
          prix={"150dh"}
        />
        <Items
          image={
            "https://img.kwcdn.com/product/open/2024-10-01/1727804345632-8e6bda5d9b3d4d5488f74c343b929e0e-goods.jpeg?imageView2/2/w/800/q/70/format/webp"
          }
          title={"Item 4"}
          lastPrix={"180dh"}
          prix={"150dh"}
        />
        <Items
          image={
            "https://img.kwcdn.com/product/open/2024-10-01/1727804345632-8e6bda5d9b3d4d5488f74c343b929e0e-goods.jpeg?imageView2/2/w/800/q/70/format/webp"
          }
          title={"Item 4"}
          lastPrix={"180dh"}
          prix={"150dh"}
        />
        <Items
          image={
            "https://img.kwcdn.com/product/open/2024-10-01/1727804345632-8e6bda5d9b3d4d5488f74c343b929e0e-goods.jpeg?imageView2/2/w/800/q/70/format/webp"
          }
          title={"Item 4"}
          lastPrix={"180dh"}
          prix={"150dh"}
        />
        <Items
          image={
            "https://img.kwcdn.com/product/open/2024-10-01/1727804345632-8e6bda5d9b3d4d5488f74c343b929e0e-goods.jpeg?imageView2/2/w/800/q/70/format/webp"
          }
          title={"Item 4"}
          lastPrix={"180dh"}
          prix={"150dh"}
        />
      </div>
    </div>
  );
}

export default Store;
