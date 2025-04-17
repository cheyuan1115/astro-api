
import swe from 'swisseph';

swe.set_ephe_path('.'); // 使用預設星曆資料夾

const planets = {
  moon: swe.MOON,
  mercury: swe.MERCURY,
  venus: swe.VENUS,
  mars: swe.MARS
};

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export async function getPlanetSignsAtNoon(dateStr) {
  return new Promise((resolve, reject) => {
    const result = {};
    const [year, month, day] = dateStr.split("-").map(Number);

    // 將中午時間轉為儒略日（UTC 中午 12:00）
    swe.julday(year, month, day, 12.0, swe.GREG_CAL, (julDay) => {
      const planetNames = Object.keys(planets);
      let completed = 0;

      planetNames.forEach((name) => {
        swe.calc_ut(julDay, planets[name], (res) => {
          if (res.error) {
            return reject(res.error);
          }
          const signIndex = Math.floor(res.longitude / 30);
          result[name] = zodiacSigns[signIndex];
          completed++;
          if (completed === planetNames.length) {
            resolve(result);
          }
        });
      });
    });
  });
}
