import React, {useState} from 'react';

// eslint-disable-next-line
const api = {
	base: 'https://api.openweathermap.org/data/2.5/',
	key: 'cd1b2398538b7477fea2978be28f7bbf'
}

function App() {
	const [query, setQuery] = useState('')
	const [weather, setWeather] = useState({})


	const search = evt => {
		if (evt.key === 'Enter') {
			fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
				.then(res => res.json())
				.then(result => {
					setWeather(result);
				});
		}
	}

	const dateBuilder = d => {
		const months = ["January", "February", "March", "April", "May", "June", "July", "August",
				"September", "October", "November", "December"],
			days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

		const day = days[d.getDay()],
			month = months[d.getMonth()],
			date = d.getDate(),
			year = d.getFullYear();

		return `${day}, ${date} ${month} ${year}`;
	}

	return (
		<div className={
			(typeof weather.main != "undefined")
				? ((weather.main.temp > 16)
				? 'app warm'
				: 'app')
				: 'app'}>
			<main>
				<div className="search-box">
					<input type="text"
						   className="search-bar"
						   placeholder="Search..."
						   onChange={e => setQuery(e.target.value)}
						   onKeyPress={e => search(e)}
					/>
				</div>
				{(typeof weather.main != "undefined") ? (
					<div>
						<div className="location-box">
							<div className="location">{weather.name}, {weather.sys.country}</div>
							<div className="date">{dateBuilder(new Date())}</div>
						</div>
						<div className="weather-box">
							<div className="temp">
								{Math.round(weather.main.temp)}°C
							</div>
							<div className="weather">
								{weather.weather[0].main}
							</div>
						</div>
					</div>
				) : ('')}
			</main>
		</div>
	);

}

export default App;