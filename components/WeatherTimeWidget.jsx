"use client";

import { useEffect, useState } from "react";

const WeatherTimeWidget = () => {
  const [localDateTime, setLocalDateTime] = useState(new Date());
  const [sanDiegoDateTime, setSanDiegoDateTime] = useState(new Date());

  const [visitorCity, setVisitorCity] = useState("Your City");
  const [visitorWeatherIcon, setVisitorWeatherIcon] = useState("");
  const [visitorWeatherDesc, setVisitorWeatherDesc] = useState("");

  const [sanDiegoWeatherIcon, setSanDiegoWeatherIcon] = useState("");
  const [sanDiegoWeatherDesc, setSanDiegoWeatherDesc] = useState("");

  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setLocalDateTime(now);

      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const sanDiegoOffset = -7;
      const sanDiegoTime = new Date(utc + 3600000 * sanDiegoOffset);
      setSanDiegoDateTime(sanDiegoTime);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        const res = await fetch("https://ipapi.co/json");
        const data = await res.json();
        const city = data.city;
        setVisitorCity(city);

        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const weatherData = await weatherRes.json();
        const icon = weatherData.weather[0].icon;
        const desc = weatherData.weather[0].description;
        setVisitorWeatherIcon(`https://openweathermap.org/img/wn/${icon}@2x.png`);
        setVisitorWeatherDesc(desc);
      } catch (err) {
        console.error("Error fetching visitor data:", err);
      }
    };

    const fetchSanDiegoWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=San Diego&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        const icon = data.weather[0].icon;
        const desc = data.weather[0].description;
        setSanDiegoWeatherIcon(`https://openweathermap.org/img/wn/${icon}@2x.png`);
        setSanDiegoWeatherDesc(desc);
      } catch (err) {
        console.error("Error fetching San Diego weather:", err);
      }
    };

    fetchVisitorData();
    fetchSanDiegoWeather();
  }, [API_KEY]);

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="w-full flex justify-center">
      <div className="w-full md:w-1/2 h-[60px] backdrop-blur-md bg-white/30 border border-white/40 shadow-md rounded-md px-4 flex items-center justify-between text-sm font-medium text-gray-800">
        {/* Visitor */}
        <div className="flex items-center gap-2">
          {visitorWeatherIcon && (
            <img src={visitorWeatherIcon} alt="Visitor Weather" className="w-6 h-6" />
          )}
          <div className="flex flex-col">
            <span className="font-semibold text-[15px]">{visitorCity}</span>
            <span className="text-xs capitalize font-medium text-gray-700">
              {visitorWeatherDesc} • {formatTime(localDateTime)}
            </span>
          </div>
        </div>

        {/* San Diego */}
        <div className="flex items-center gap-2">
          {sanDiegoWeatherIcon && (
            <img src={sanDiegoWeatherIcon} alt="San Diego Weather" className="w-6 h-6" />
          )}
          <div className="flex flex-col items-end">
            <span className="font-semibold text-[15px]">San Diego</span>
            <span className="text-xs capitalize font-medium text-gray-700">
              {sanDiegoWeatherDesc} • {formatTime(sanDiegoDateTime)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherTimeWidget;
