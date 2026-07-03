#!/usr/bin/env node

/**
 * i18n Translation Validator
 * 
 * Two modes:
 * - Default: Reports warnings, always exits 0 (for development)
 * - Strict (--strict): Reports errors, exits 1 on failure (for production)
 * 
 * Validates:
 * 1. Missing keys between fr.json and en.json
 * 2. Unused keys (present in one locale but not the other)
 * 3. Type mismatches (string vs array vs object)
 * 4. Empty strings
 * 5. Invalid placeholders (unclosed braces)
 * 6. Persona completeness (from config/persona_requirements.json)
 */

const fs = require('fs');
const path = require('path');

const TRANSLATIONS_DIR = path.join(__dirname, '..', 'pages', 'why-me', 'translations');
const FR_PATH = path.join(TRANSLATIONS_DIR, 'fr.json');
const EN_PATH = path.join(TRANSLATIONS_DIR, 'en.json');
const CONFIG_PATH = path.join(__dirname, '..', 'config', 'persona_requirements.json');

// Parse arguments
const args = process.argv.slice(2);
const STRICT_MODE = args.includes('--strict');

function loadJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`[i18n:check] Error loading ${filePath}: ${error.message}`);
    process.exit(1);
  }
}

function getAllKeys(obj, prefix = '') {
  const keys = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys.push(...getAllKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
  }
  return keys;
}

function compareTypes(a, b) {
  const typeA = Array.isArray(a) ? 'array' : typeof a;
  const typeB = Array.isArray(b) ? 'array' : typeof b;
  return typeA === typeB;
}

function getValueByPath(obj, path) {
  const keys = path.split('.');
  let value = obj;
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return undefined;
    }
  }
  return value;
}

function findEmptyStrings(obj, prefix = '') {
  const emptyKeys = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];
      
      if (typeof value === 'string' && value.trim() === '') {
        emptyKeys.push(fullKey);
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        emptyKeys.push(...findEmptyStrings(value, fullKey));
      }
    }
  }
  return emptyKeys;
}

function findInvalidPlaceholders(obj, prefix = '') {
  const invalid = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];
      
      if (typeof value === 'string') {
        const openBraces = (value.match(/\{/g) || []).length;
        const closeBraces = (value.match(/\}/g) || []).length;
        if (openBraces !== closeBraces) {
          invalid.push(fullKey);
        }
        const placeholderPattern = /\{[^\w]\}/g;
        if (value.match(placeholderPattern)) {
          invalid.push(fullKey);
        }
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        invalid.push(...findInvalidPlaceholders(value, fullKey));
      }
    }
  }
  return invalid;
}

function validatePersonas(translations, locale, personaRequirements) {
  const errors = [];
  
  for (const [persona, requiredFields] of Object.entries(personaRequirements)) {
    const personaData = translations[persona];
    
    if (!personaData) {
      errors.push({ type: 'missing_persona', persona, locale });
      continue;
    }
    
    if (typeof personaData !== 'object' || personaData === null) {
      errors.push({ type: 'invalid_persona_type', persona, locale });
      continue;
    }
    
    for (const requiredField of requiredFields) {
      if (!(requiredField in personaData)) {
        errors.push({ type: 'missing_field', persona, field: requiredField, locale });
      }
    }
  }
  
  return errors;
}

function formatPersonaError(error, isStrict) {
  const prefix = isStrict ? '  ❌' : '  ⚠️';
  switch (error.type) {
    case 'missing_persona':
      return `${prefix} Persona "${error.persona}" missing entirely in ${error.locale}`;
    case 'invalid_persona_type':
      return `${prefix} Persona "${error.persona}" is not an object in ${error.locale}`;
    case 'missing_field':
      return `${prefix} Persona "${error.persona}" missing required field "${error.field}" in ${error.locale}`;
    default:
      return `${prefix} Unknown persona error in ${error.locale}`;
  }
}

function printReport(results, isStrict) {
  const prefix = isStrict ? 'ERROR' : 'WARNING';
  
  console.log('\n' + '='.repeat(60));
  console.log(`  ${prefix}: Translation Validation Report`);
  console.log('='.repeat(60) + '\n');
  
  // Summary counts
  console.log('  Summary:');
  console.log(`    Warnings           : ${results.summary.warnings}`);
  console.log(`    Missing keys       : ${results.summary.missingInFr + results.summary.missingInEn}`);
  console.log(`    Unused keys        : ${results.summary.missingInFr + results.summary.missingInEn}`);
  console.log(`    Missing persona fields : ${results.summary.missingPersonaFields}`);
  console.log(`    Invalid placeholders : ${results.summary.invalidPlaceholders}`);
  console.log(`    Empty strings       : ${results.summary.emptyStrings}`);
  console.log(`    Type mismatches     : ${results.summary.typeMismatches}`);
  
  // Detailed sections
  if (results.emptyStrings.length > 0) {
    console.log('\n  Empty strings:');
    results.emptyStrings.forEach(k => console.log(`    ${isStrict ? '❌' : '⚠️'}  "${k}"`));
  }
  
  if (results.missingInFr.length > 0) {
    console.log('\n  Keys missing in fr.json:');
    results.missingInFr.forEach(k => console.log(`    ${isStrict ? '❌' : '⚠️'}  "${k}" (present in en.json)`));
  }
  
  if (results.missingInEn.length > 0) {
    console.log('\n  Keys missing in en.json:');
    results.missingInEn.forEach(k => console.log(`    ${isStrict ? '❌' : '⚠️'}  "${k}" (present in fr.json)`));
  }
  
  if (results.typeMismatches.length > 0) {
    console.log('\n  Type mismatches:');
    results.typeMismatches.forEach(({ key, frType, enType }) => {
      console.log(`    ${isStrict ? '❌' : '⚠️'}  "${key}": fr=${frType}, en=${enType}`);
    });
  }
  
  if (results.invalidPlaceholders.length > 0) {
    console.log('\n  Invalid placeholders:');
    results.invalidPlaceholders.forEach(k => console.log(`    ${isStrict ? '❌' : '⚠️'}  "${k}"`));
  }
  
  if (results.personaErrors.length > 0) {
    console.log('\n  Missing persona fields:');
    results.personaErrors.forEach(error => console.log(formatPersonaError(error, isStrict)));
  }
  
  const totalIssues = results.summary.warnings + 
                      results.summary.missingInFr + 
                      results.summary.missingInEn +
                      results.summary.typeMismatches +
                      results.summary.invalidPlaceholders +
                      results.summary.emptyStrings +
                      results.summary.missingPersonaFields;
  
  console.log('\n' + '='.repeat(60));
  if (totalIssues > 0) {
    console.log(`  ${isStrict ? '❌' : '⚠️'}  ${totalIssues} warnings found`);
    console.log(`  Application can ${isStrict ? 'NOT ' : ''}continue.`);
  } else {
    console.log(`  ✅ All checks passed`);
    console.log(`  Application can continue.`);
  }
  console.log('='.repeat(60) + '\n');
}

function validateTranslations() {
  console.log('🔍 Running i18n validation...');
  
  // Load translations
  const fr = loadJson(FR_PATH);
  const en = loadJson(EN_PATH);
  
  // Load persona requirements from config
  let personaRequirements = {};
  try {
    personaRequirements = loadJson(CONFIG_PATH);
  } catch (error) {
    console.log('  ℹ️  No persona requirements config found, skipping persona validation');
  }
  
  // Get all keys from both files
  const frKeys = new Set(getAllKeys(fr));
  const enKeys = new Set(getAllKeys(en));
  
  // Collect all results
  const results = {
    emptyStrings: [],
    missingInFr: [],
    missingInEn: [],
    typeMismatches: [],
    invalidPlaceholders: [],
    personaErrors: [],
    summary: {
      warnings: 0,
      missingInFr: 0,
      missingInEn: 0,
      typeMismatches: 0,
      invalidPlaceholders: 0,
      emptyStrings: 0,
      missingPersonaFields: 0
    }
  };
  
  // Check for empty strings
  const emptyFr = findEmptyStrings(fr);
  const emptyEn = findEmptyStrings(en);
  results.emptyStrings = [...emptyFr, ...emptyEn].map(k => k);
  results.summary.emptyStrings = results.emptyStrings.length;
  results.summary.warnings += results.summary.emptyStrings;
  
  // Check for missing keys
  results.missingInFr = [...enKeys].filter(k => !frKeys.has(k));
  results.missingInEn = [...frKeys].filter(k => !enKeys.has(k));
  results.summary.missingInFr = results.missingInFr.length;
  results.summary.missingInEn = results.missingInEn.length;
  results.summary.warnings += results.summary.missingInFr + results.summary.missingInEn;
  
  // Check for type mismatches
  const allKeys = new Set([...frKeys, ...enKeys]);
  for (const key of allKeys) {
    const frValue = getValueByPath(fr, key);
    const enValue = getValueByPath(en, key);
    
    if (frValue !== undefined && enValue !== undefined) {
      if (!compareTypes(frValue, enValue)) {
        const frType = Array.isArray(frValue) ? 'array' : typeof frValue;
        const enType = Array.isArray(enValue) ? 'array' : typeof enValue;
        results.typeMismatches.push({ key, frType, enType });
      }
    }
  }
  results.summary.typeMismatches = results.typeMismatches.length;
  results.summary.warnings += results.summary.typeMismatches;
  
  // Check for invalid placeholders
  const invalidFr = findInvalidPlaceholders(fr);
  const invalidEn = findInvalidPlaceholders(en);
  results.invalidPlaceholders = [...invalidFr, ...invalidEn];
  results.summary.invalidPlaceholders = results.invalidPlaceholders.length;
  results.summary.warnings += results.summary.invalidPlaceholders;
  
  // Validate persona completeness
  if (Object.keys(personaRequirements).length > 0) {
    const personaErrorsFr = validatePersonas(fr, 'fr.json', personaRequirements);
    const personaErrorsEn = validatePersonas(en, 'en.json', personaRequirements);
    results.personaErrors = [...personaErrorsFr, ...personaErrorsEn];
    results.summary.missingPersonaFields = results.personaErrors.length;
    results.summary.warnings += results.summary.missingPersonaFields;
  }
  
  // Print report
  printReport(results, STRICT_MODE);
  
  // Exit code: strict mode fails on warnings, default mode always succeeds
  const hasIssues = results.summary.warnings > 0;
  if (STRICT_MODE && hasIssues) {
    return false;
  }
  return true;
}

// Run validation
const success = validateTranslations();
process.exit(success ? 0 : 1);
