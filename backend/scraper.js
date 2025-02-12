const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/financialOpportunities')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));


const OpportunitySchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String,
});

const Opportunity = mongoose.model('Opportunity', OpportunitySchema);

async function scrapeNABARD() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto('https://www.nabard.org/content.aspx?id=3', { waitUntil: 'load', timeout: 0 });
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    let opportunities = [];
    
    $('.scheme-list-item').each((index, element) => {
        const title = $(element).find('h3').text().trim();
        const description = $(element).find('p').text().trim();
        const link = $(element).find('a').attr('href');
        
        opportunities.push({ title, description, link });
    });
    
    await browser.close();
    return opportunities;
}

async function fetchPMMYLoans() {
    try {
        const response = await axios.get('https://api.pmmymudra.org/v1/loans');
        return response.data;
    } catch (error) {
        console.error('Error fetching PMMY loans:', error);
        return [];
    }
}

async function saveToDatabase(data) {
    await Opportunity.insertMany(data);
    console.log('Data saved to MongoDB');
}

async function main() {
    const nabardData = await scrapeNABARD();
    console.log('NABARD Data:', nabardData);
    await saveToDatabase(nabardData);
    
    const pmmyData = await fetchPMMYLoans();
    console.log('PMMY Loan Data:', pmmyData);
    await saveToDatabase(pmmyData);
}

main();
