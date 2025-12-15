#!/usr/bin/env node

/**
 * Fetches GitHub stats for PathSim and PySimHub
 * Run this script before building to get latest stats
 */

import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function fetchStats() {
	const stats = {
		pathsim: {
			stars: 0,
			forks: 0
		},
		pysimhub: {
			projects: 0,
			members: 0
		},
		fetchedAt: new Date().toISOString()
	};

	try {
		// Fetch PathSim repo stats from GitHub
		const pathsimResponse = await fetch('https://api.github.com/repos/milanofthe/pathsim', {
			headers: {
				'Accept': 'application/vnd.github.v3+json',
				'User-Agent': 'milanrother-website'
			}
		});

		if (pathsimResponse.ok) {
			const pathsimData = await pathsimResponse.json();
			stats.pathsim.stars = pathsimData.stargazers_count || 0;
			stats.pathsim.forks = pathsimData.forks_count || 0;
		}

		// Fetch PySimHub featured projects from pysimhub.io
		const projectsResponse = await fetch('https://pysimhub.io/data/projects.json', {
			headers: {
				'User-Agent': 'milanrother-website'
			}
		});

		if (projectsResponse.ok) {
			const projects = await projectsResponse.json();
			stats.pysimhub.projects = Array.isArray(projects) ? projects.length : 0;
		}

		// Fetch PySimHub org members (public)
		const pysimhubMembersResponse = await fetch('https://api.github.com/orgs/pysimhub/members?per_page=100', {
			headers: {
				'Accept': 'application/vnd.github.v3+json',
				'User-Agent': 'milanrother-website'
			}
		});

		if (pysimhubMembersResponse.ok) {
			const members = await pysimhubMembersResponse.json();
			stats.pysimhub.members = members.length || 0;
		}

		console.log('Fetched stats:', stats);
	} catch (error) {
		console.error('Error fetching stats:', error.message);
		console.log('Using fallback stats');
	}

	// Write stats to JSON file
	const outputPath = join(__dirname, '..', 'src', 'lib', 'data', 'github-stats.json');
	writeFileSync(outputPath, JSON.stringify(stats, null, 2));
	console.log(`Stats written to ${outputPath}`);
}

fetchStats();
