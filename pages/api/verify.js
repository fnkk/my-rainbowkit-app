// pages/api/verify.js
import { ethers } from 'ethers';

export default async function handler(req, res) {
  const { message, signature } = req.body;

  try {
    const address = ethers.utils.verifyMessage(message, signature);
    res.status(200).json({ verified: true, address });
  } catch (error) {
    res.status(400).json({ verified: false, error: error.message });
  }
}