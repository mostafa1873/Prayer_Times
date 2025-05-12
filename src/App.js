import './App.css';
import React, { useEffect, useState } from 'react';
import Times from './components/Times';

function App(props) {

  const [times, setTimes] = useState({});
  const [date, setDate] = useState("");
  const [city, setCity] = useState("Cairo");

  const citys = [
    { name: "القاهرة", value: "Cairo" },
    { name: "الاسكندرية", value: "Alexandria" },
    { name: "البحيرة", value: "Beheira" },
    { name: "الجيزة", value: "Giza" },
    { name: "المنصورة", value: "Mansoura" },
    { name: "اسوان", value: "Aswan" },
    { name: "الاقصر", value: "Luxor" }
  ]

  useEffect(() => {

    const fetchTimes = async () => {

      try {
        const respons = await fetch(`https://api.aladhan.com/v1/timingsByCity?date=25-03-2025&city=${city}&country=EG`);
        const data_prayer = await respons.json();
        setTimes(data_prayer.data.timings)
        setDate(data_prayer.data.date.gregorian.date)

      } catch (error) {
        console.error(error)
      }

    }

    fetchTimes();
  }, [city])



  const formatTime = (time) => {
    if (!time) {
      return "00:00";
    }
    let [hours, minutes] = time.split(":").map(Number)
    const minTime = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes <10 ? "0" + minutes : minutes} ${minTime}`
  }


  return (

    <>

      <section>
        <div className='cont'>
          <div className='top-sec'>

            <div className='city'>
              <h3>المدينة</h3>
              <select onChange={(e) => setCity(e.target.value)}>
                {citys.map((city_ob) => (
                  <option key={city_ob.value} value={city_ob.value}>{city_ob.name}</option>
                ))}
              </select>
            </div>

            <div className='date'>
              <h3>التاريخ</h3>
              <h4>{date}</h4>
            </div>
          </div>

          <Times name="الفجر" time={formatTime(times.Fajr)} />
          <Times name="الظهر" time={formatTime(times.Dhuhr)} />
          <Times name="العصر" time={formatTime(times.Asr)} />
          <Times name="المغرب" time={formatTime(times.Sunset)} />
          <Times name="العشاء" time={formatTime(times.Isha)} />
        </div>
      </section>


    </>
  );
}

export default App;
