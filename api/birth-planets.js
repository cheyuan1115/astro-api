
import { getPlanetSignsAtNoon } from '../../utils/planetCalc.js';

export default async function handler(req, res) {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Missing 'date' query parameter" });
  }

  try {
    const signs = await getPlanetSignsAtNoon(date);
    res.status(200).json(signs);
  } catch (err) {
    res.status(500).json({ error: "Internal server error", detail: err.message });
  }
}
