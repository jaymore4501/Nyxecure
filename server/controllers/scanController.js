import zxcvbn from 'zxcvbn';
import { analyzePhishingUrl } from '../utils/heuristics.js';
import Scan from '../models/Scan.js';

export const analyzeUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const result = analyzePhishingUrl(url);

    // Log asynchronously (without await) to make the API response instant
    const scanDoc = new Scan({
      type: 'url',
      input: url,
      score: result.score,
      result: result.status,
      details: { reasons: result.reasons }
    });
    scanDoc.save().catch(err => console.error('Silent DB log fail:', err.message));

    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

export const analyzePassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ error: "Password is required" });

    const result = zxcvbn(password);
    
    // Map score 0-4 to strength texts
    const strengthMap = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
    const strength = strengthMap[result.score];
    const crackTime = result.crack_times_display.offline_slow_hashing_1e4_per_second;

    const payload = {
      score: result.score,
      strength: strength,
      crackTime,
      feedback: result.feedback
    };

    // Log asynchronously (without await) to make the API response instant
    const scanDoc = new Scan({
      type: 'password',
      input: '*'.repeat(password.length),
      score: result.score,
      result: strength,
      details: { crackTime }
    });
    scanDoc.save().catch(err => console.error('Silent DB log fail:', err.message));

    return res.json(payload);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getStats = async (req, res) => {
  try {
    const totalScans = await Scan.countDocuments();
    const urlScans = await Scan.find({ type: 'url' }).sort({ createdAt: -1 }).limit(10);
    const passScans = await Scan.find({ type: 'password' }).sort({ createdAt: -1 }).limit(10);
    
    const threatsDetected = await Scan.countDocuments({ 
      $or: [
        { type: 'url', result: { $in: ['Suspicious', 'Dangerous'] } },
        { type: 'password', result: { $in: ['Very Weak', 'Weak'] } }
      ]
    });

    return res.json({
      totalScans,
      threatsDetected,
      recentScans: { urls: urlScans, passwords: passScans }
    });
  } catch (err) {
    // Return minimal mock data if db fails easily
    return res.json({
      totalScans: 156,
      threatsDetected: 12,
      recentScans: { urls: [], passwords: [] },
      isMock: true
    });
  }
};
