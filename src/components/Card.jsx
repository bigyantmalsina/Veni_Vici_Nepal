// src/components/Card.jsx
import React from "react";
import "../App.css";

export default function Card({ item, addBan }) {
  if (!item) return null;

  return (
    <article className="card">
      <div className="card-visual">
        <img src={item.image} alt={item.name} className="card-image" />
        <div className="image-gradient" />
      </div>

      <div className="card-info">
        <h2 className="card-title">{item.name}</h2>

        <div className="attributes">
          <div className="attr-row">
            <span className="label">Type</span>
            <button className="attr-btn" onClick={() => addBan("type", item.type)}>{item.type}</button>
          </div>

          <div className="attr-row">
            <span className="label">Location</span>
            <button className="attr-btn" onClick={() => addBan("location", item.location)}>{item.location}</button>
          </div>

          <div className="attr-row desc">
            <span className="label">Fact</span>
            <span className="desc-text">{item.fact}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
