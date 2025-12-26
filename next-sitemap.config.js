/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://cyvanta.com',
  generateRobotsTxt: true, // (optional)
  // ...other options
}
