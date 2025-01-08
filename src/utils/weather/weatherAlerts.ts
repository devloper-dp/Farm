// import { WeatherData, WeatherForecast } from '../../types/weather';

// const WEATHER_THRESHOLDS = {
//   temperature: {
//     high: 30,
//     low: 5
//   },
//   humidity: {
//     high: 80,
//     low: 30
//   },
//   rainfall: {
//     high: 50
//   }
// };

// // export function generateWeatherAlerts(
// //   current: WeatherData,
// //   forecast: WeatherForecast[]
// // ): WeatherAlert[] {
// //   const alerts: WeatherAlert[] = [];

// //   // Temperature alerts
// //   if (current.temperature > WEATHER_THRESHOLDS.temperature.high) {
// //     alerts.push({
// //       type: 'warning',
// //       parameter: 'temperature',
// //       message: 'High temperature may affect fertilizer effectiveness',
// //       recommendation: 'Consider early morning or evening application'
// //     });
// //   }

// //   if (current.temperature < WEATHER_THRESHOLDS.temperature.low) {
// //     alerts.push({
// //       type: 'warning',
// //       parameter: 'temperature',
// //       message: 'Low temperature may reduce nutrient uptake',
// //       recommendation: 'Wait for warmer conditions if possible'
// //     });
// //   }

// //   // Humidity alerts
// //   if (current.humidity > WEATHER_THRESHOLDS.humidity.high) {
// //     alerts.push({
// //       type: 'warning',
// //       parameter: 'humidity',
// //       message: 'High humidity increases disease risk',
// //       recommendation: 'Monitor crop health closely'
// //     });
// //   }

// //   if (current.humidity < WEATHER_THRESHOLDS.humidity.low) {
// //     alerts.push({
// //       type: 'warning',
// //       parameter: 'humidity',
// //       message: 'Low humidity may affect spray application',
// //       recommendation: 'Consider using anti-evaporation additives'
// //     });
// //   }

// //   // Rainfall alerts
// //   if (current.rainfall > WEATHER_THRESHOLDS.rainfall.high) {
// //     alerts.push({
// //       type: 'critical',
// //       parameter: 'rainfall',
// //       message: 'Heavy rainfall may cause nutrient leaching',
// //       recommendation: 'Delay fertilizer application'
// //     });
// //   }

// //   return alerts;
// // }