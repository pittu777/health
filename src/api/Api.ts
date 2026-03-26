

// const url = 'https://imdb236.p.rapidapi.com/api/imdb/cast/nm0000190/titles';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '751b738438msh541761f23e4eb01p1ea329jsn7db29bf7393e',
// 		'x-rapidapi-host': 'imdb236.p.rapidapi.com',
// 		'Content-Type': 'application/json'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }

import axios from "axios";



const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
const apiHost = process.env.REACT_APP_RAPIDAPI_HOST;

console.log(apiKey);
console.log(apiHost);


const apiClient = axios.create({
    baseURL: process.env.dev || 'http://localhost:3000/',
    timeout: 10000,
    headers: {
        'x-rapidapi-key': '751b738438msh541761f23e4eb01p1ea329jsn7db29bf7393e',
        'x-rapidapi-host': 'imdb236.p.rapidapi.com',
        'Content-Type': 'application/json',
    },

});

export default apiClient;