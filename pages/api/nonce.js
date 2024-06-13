// pages/api/hello.js
export default function handler(req, res) {
    const nonce = Math.random().toString(36).substring(2); // 生成随机的 nonce
    res.status(200).json({ nonce });
}