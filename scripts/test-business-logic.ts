/**
 * Automated Verification Test Suite for Swarna Bhoomi Real Estate Platform
 * Tests all critical business logic: search modes, tolerances, facings, phases,
 * WhatsApp URL generation, and CSV import validation.
 */

import { searchPlots, importPlotsFromCSV } from '../src/services/plots.service';
import { INITIAL_PLOTS } from '../src/services/plots.data';
import { generateWhatsAppEnquiryUrl } from '../src/lib/whatsapp';
import { PlotFilterCriteria } from '../src/types/plot';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`✅ PASSED: ${message}`);
}

async function runTests() {
  console.log('--- SWARNA BHOOMI BUSINESS LOGIC TESTS ---\n');

  // Test 1: Exact Match Area Search for 700 sqft
  console.log('1. Testing Exact Match for 700 Sq.Ft...');
  const exactCriteria: PlotFilterCriteria = {
    area: 700,
    searchMode: 'exact',
    tolerance: 0,
    facing: 'All',
    phase: 'All',
    availability: 'All',
    sortBy: 'area_asc',
  };
  const exactRes = await searchPlots(exactCriteria);
  assert(exactRes.plots.length > 0, 'Found 700 sq.ft. plots');
  assert(exactRes.plots.every((p) => p.areaSqft === 700), 'All returned plots have exactly 700 sq.ft.');

  // Test 2: Nearby Area with ±50 sqft tolerance (650 to 750)
  console.log('\n2. Testing Nearby Area for 700 ± 50 Sq.Ft...');
  const nearbyCriteria: PlotFilterCriteria = {
    area: 700,
    searchMode: 'nearby',
    tolerance: 50,
    facing: 'All',
    phase: 'All',
    availability: 'All',
    sortBy: 'area_asc',
  };
  const nearbyRes = await searchPlots(nearbyCriteria);
  assert(nearbyRes.plots.length > 0, 'Found nearby plots');
  assert(
    nearbyRes.plots.every((p) => p.areaSqft >= 650 && p.areaSqft <= 750),
    'All returned plots fall within 650 to 750 sq.ft.'
  );

  // Test 3: Minimum Area Search (>= 1200 sqft)
  console.log('\n3. Testing Minimum Area for >= 1200 Sq.Ft...');
  const minCriteria: PlotFilterCriteria = {
    area: 1200,
    searchMode: 'min',
    tolerance: 0,
    facing: 'All',
    phase: 'All',
    availability: 'All',
    sortBy: 'area_asc',
  };
  const minRes = await searchPlots(minCriteria);
  assert(minRes.plots.length > 0, 'Found large plots');
  assert(minRes.plots.every((p) => p.areaSqft >= 1200), 'All returned plots have >= 1200 sq.ft.');

  // Test 4: Facing Filter (East Facing only)
  console.log('\n4. Testing East Facing Filter...');
  const eastCriteria: PlotFilterCriteria = {
    searchMode: 'exact',
    tolerance: 0,
    facing: 'East',
    phase: 'All',
    availability: 'All',
    sortBy: 'plot_asc',
  };
  const eastRes = await searchPlots(eastCriteria);
  assert(eastRes.plots.length > 0, 'Found East facing plots');
  assert(eastRes.plots.every((p) => p.facing === 'East'), 'All returned plots are East facing');

  // Test 5: Phase Filter (Phase 2 only)
  console.log('\n5. Testing Phase 2 Filter...');
  const p2Criteria: PlotFilterCriteria = {
    searchMode: 'exact',
    tolerance: 0,
    facing: 'All',
    phase: 2,
    availability: 'All',
    sortBy: 'plot_asc',
  };
  const p2Res = await searchPlots(p2Criteria);
  assert(p2Res.plots.length > 0, 'Found Phase 2 plots');
  assert(p2Res.plots.every((p) => p.phaseNumber === 2), 'All returned plots belong to Phase 2');

  // Test 6: Availability Integrity
  console.log('\n6. Testing Availability Filter (Available only)...');
  const availCriteria: PlotFilterCriteria = {
    searchMode: 'exact',
    tolerance: 0,
    facing: 'All',
    phase: 'All',
    availability: 'Available',
    sortBy: 'plot_asc',
  };
  const availRes = await searchPlots(availCriteria);
  assert(
    availRes.plots.every((p) => p.availability === 'Available'),
    'Never shows sold or reserved plots when filtering for Available'
  );

  // Test 7: Dimensions Filter (min width >= 25 ft)
  console.log('\n7. Testing Dimensions Filter (width >= 25 ft)...');
  const dimCriteria: PlotFilterCriteria = {
    searchMode: 'exact',
    tolerance: 0,
    facing: 'All',
    phase: 'All',
    minWidth: 25,
    availability: 'All',
    sortBy: 'plot_asc',
  };
  const dimRes = await searchPlots(dimCriteria);
  assert(dimRes.plots.every((p) => (p.widthFeet ?? 0) >= 25), 'All returned plots have width >= 25 ft');

  // Test 8: WhatsApp URL Generation for selected Plot 42
  console.log('\n8. Testing WhatsApp URL Generation...');
  const plot42 = INITIAL_PLOTS.find((p) => p.plotNumber === '42');
  assert(Boolean(plot42), 'Found Plot 42 in seed data');
  const urlWithPlot = generateWhatsAppEnquiryUrl(plot42);
  assert(urlWithPlot.startsWith('https://wa.me/917339652776?text='), 'Target destination is +91 7339652776');
  const decodedText = decodeURIComponent(urlWithPlot.split('text=')[1]);
  assert(decodedText.includes('Plot Number: 42'), 'Message contains Plot Number 42');
  assert(decodedText.includes('700 Sq.Ft.'), 'Message contains Area 700 Sq.Ft.');
  assert(decodedText.includes('Phase 2'), 'Message contains Phase 2');
  assert(decodedText.includes('East Facing'), 'Message contains East Facing');

  // Test 9: General WhatsApp Enquiry URL
  const generalUrl = generateWhatsAppEnquiryUrl(null);
  assert(generalUrl.includes('917339652776'), 'General URL targets +91 7339652776');

  // Test 10: CSV Import Validation
  console.log('\n9. Testing CSV Import Validation...');
  const validCsv = 'Plot,Phase,Area,Facing,Width,Length,Status\n999,1,750,North,25,30,Available';
  const importSuccess = importPlotsFromCSV(validCsv);
  assert(importSuccess.importedCount === 1, 'Valid CSV row imported');

  // Duplicate CSV test
  const duplicateCsv = 'Plot,Phase,Area,Facing,Width,Length,Status\n999,1,750,North,25,30,Available';
  const importDup = importPlotsFromCSV(duplicateCsv);
  assert(importDup.skippedCount === 1, 'Duplicate plot correctly detected and skipped');

  // Invalid Area CSV test
  const invalidAreaCsv = 'Plot,Phase,Area,Facing,Width,Length,Status\n1000,1,-500,North,20,30,Available';
  const importInvalid = importPlotsFromCSV(invalidAreaCsv);
  assert(importInvalid.skippedCount === 1, 'Negative area correctly rejected');

  console.log('\n===========================================');
  console.log('🎉 ALL 10 CRITICAL BUSINESS LOGIC TESTS PASSED!');
  console.log('===========================================\n');
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
