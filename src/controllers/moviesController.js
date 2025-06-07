import { getProducersInterval } from '../services/producersInterval.js';

async function listIntervals(_, res) {
  try {
    const result = await getProducersInterval();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate intervals', details: error.message });
  }
}

export default {
  listIntervals,
};
