// 1. Force Node.js CommonJS require to bypass Turbopack ESM bugs
const { Cashfree } = require("cashfree-pg");

// 2. Initialize credentials safely
// @ts-ignore
Cashfree.XClientId = process.env.CASHFREE_APP_ID!;
// @ts-ignore
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY!;

// 3. Fallback for the Sandbox Environment
// @ts-ignore
Cashfree.XEnvironment = Cashfree.Environment?.SANDBOX || "sandbox";

// 4. Export as a standard default
export default Cashfree;