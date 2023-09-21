"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const getGreeting = async name => {
    const raw = await fetch(
      `/.netlify/functions/hello_world` + (name ? `?name=${name}` : "")
    );
    const data = await raw.json();
    console.log(data);
    setGreeting(data.message);
  };

  const getWeather = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async data => {
        console.log(data);

        const raw = await fetch(
          `/.netlify/functions/get_weather?lat=${data.coords.latitude}&lon=${data.coords.longitude}`
        );
        const json = await raw.json();
        console.log(json);
        setCurrentWeather(json.main.temp);
      });
    }
  };

  useEffect(() => {
    getWeather();
    getGreeting("");
  }, []);
  console.log(process.env);
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>{greeting}</h1>
        <input value={name} onChange={e => setName(e.target.value)} />
        {currentWeather && <h5>Current Temperature: {currentWeather}C</h5>}
        <button onClick={() => getGreeting(name)}>Submit</button>
      </div>
    </main>
  );
}
