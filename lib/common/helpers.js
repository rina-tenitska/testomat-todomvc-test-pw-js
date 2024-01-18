import * as fs from 'fs'

export function getCredentials(file) {
	return JSON.parse(fs.readFileSync(file, 'utf8'))
} 
