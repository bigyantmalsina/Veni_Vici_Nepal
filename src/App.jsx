import React, { useState, useEffect } from "react";
import { NEPAL_DATA } from "./data/nepalData";
import Card from "./components/Card";
import "./App.css";

export default function App() {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const result = await new Promise((resolve) =>
          setTimeout(() => resolve(NEPAL_DATA), 160)
        );
        if (mounted) setData(result);
      } catch (err) {
        console.error("Failed to load dataset:", err);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  const isBanned = (item) =>
    banList.some(
      (b) =>
        (b.type === "type" && b.value === item.type) ||
        (b.type === "location" && b.value === item.location)
    );

  const discover = () => {
    if (!data || data.length === 0) return;
    const available = data.filter((it) => !isBanned(it));
    if (available.length === 0) {
      alert("No available results — try removing some bans.");
      return;
    }
    const pick = available[Math.floor(Math.random() * available.length)];
    setCurrent(pick);
    setHistory((prev) => {
      const newHist = [pick, ...prev];
      const uniq = [];
      for (const it of newHist) {
        if (!uniq.some((u) => u.id === it.id)) uniq.push(it);
      }
      return uniq.slice(0, 24);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addBan = (type, value) => {
    if (!value) return;
    setBanList((prev) => {
      if (prev.some((b) => b.type === type && b.value === value)) return prev;
      return [...prev, { type, value }];
    });
    if (
      current &&
      ((type === "type" && current.type === value) ||
        (type === "location" && current.location === value))
    ) {
      setCurrent(null);
      setTimeout(discover, 60);
    }
  };

  const removeBan = (type, value) => {
    setBanList((prev) =>
      prev.filter((b) => !(b.type === type && b.value === value))
    );
  };

  const showFromHistory = (item) => {
    if (!item) return;
    if (isBanned(item)) {
      alert("That item is currently banned. Remove the ban to view it.");
      return;
    }
    setCurrent(item);
    setHistory((h) => {
      const others = h.filter((x) => x.id !== item.id);
      return [item, ...others].slice(0, 24);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToDashboard = () => {
    setCurrent(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <button
            className="logo"
            onClick={goToDashboard}
            aria-label="Go to dashboard"
            title="Go to dashboard"
          >
            🌄
          </button>
          <div>
            <h1>Veni Vici — Discover Nepal</h1>
            <p className="tag">Explore. Ban what you know. Repeat.</p>
          </div>
        </div>

        <div className="controls">
          <button
            className="discover primary"
            onClick={discover}
            aria-label="Discover a random Nepal item"
          >
            Discover
          </button>
        </div>
      </header>

      <main className="layout">
        <section className="content">
          <div aria-live="polite">
            {current ? (
              <Card item={current} addBan={addBan} />
            ) : (
              <div className="empty">
                <h2>Ready to discover?</h2>
                <p>
                  Click <strong>Discover</strong> to see a Nepal place, temple,
                  festival, or view.
                </p>
                <div style={{ marginTop: 16 }}>
                  <button className="discover secondary" onClick={discover}>
                    Start Exploring
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="history-panel">
            <h3>History</h3>
            {history.length === 0 ? (
              <p className="muted">Your recent discoveries will appear here.</p>
            ) : (
              <div className="history-grid">
                {history.map((h) => (
                  <button
                    key={h.id}
                    className="history-card"
                    onClick={() => showFromHistory(h)}
                    title={`Open ${h.name}`}
                  >
                    <img src={h.image} alt={h.name} className="history-img" />
                    <div className="history-meta">
                      <div className="h-name">{h.name}</div>
                      <div className="h-type">{h.type}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        <aside className="sidebar">
          <div className="panel">
            <h3>Ban List</h3>
            {banList.length === 0 ? (
              <p className="muted">
                No bans yet. Click Type or Location to ban.
              </p>
            ) : (
              <ul className="ban-list">
                {banList.map((b, i) => (
                  <li
                    key={i}
                    className="ban-item"
                    onClick={() => removeBan(b.type, b.value)}
                    title="Click to remove ban"
                  >
                    <div
                      style={{ display: "flex", gap: 8, alignItems: "center" }}
                    >
                      <div className="pill">{b.value}</div>
                      <div className="meta">{b.type}</div>
                    </div>
                    <button
                      className="remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeBan(b.type, b.value);
                      }}
                      aria-label={`Remove ban ${b.value}`}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="panel tips">
            <h4>Tips</h4>
            <ul>
              <li>
                Click an attribute (Type / Location) in the card to ban it.
              </li>
              <li>Click a ban to remove it and allow those items again.</li>
              <li>
                If you run out of items, remove some bans or clear history.
              </li>
            </ul>
          </div>
        </aside>
      </main>

      <footer className="footer" aria-hidden="true" />
    </div>
  );
}
