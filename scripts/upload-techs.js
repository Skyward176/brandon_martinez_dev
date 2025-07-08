#!/usr/bin/env node

// Simple script to run the upload process
// Usage: node scripts/upload-techs.js

const { runUpload } = require('../lib/upload_techs.tsx');

console.log('Starting database initialization...');
runUpload();
