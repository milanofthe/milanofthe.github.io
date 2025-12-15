#!/usr/bin/env node

/**
 * Updates the sitemap.xml with the current date
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sitemapPath = join(__dirname, '..', 'static', 'sitemap.xml');

const today = new Date().toISOString().split('T')[0];

let sitemap = readFileSync(sitemapPath, 'utf-8');
sitemap = sitemap.replace(
	/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/,
	`<lastmod>${today}</lastmod>`
);

writeFileSync(sitemapPath, sitemap);
console.log(`Sitemap updated with date: ${today}`);
