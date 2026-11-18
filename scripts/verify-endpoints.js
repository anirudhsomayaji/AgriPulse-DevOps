/**
 * Live API Verification Script
 * 
 * Boots the server on port 5000, performs live HTTP requests against all
 * required endpoints, verifies HTML landing page and JSON API responses,
 * displays the responses, and cleanly shuts down.
 */

const http = require('http');

// Helper to make HTTP requests using native http module
function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : null;
    const options = {
      hostname: '127.0.0.1',
      port: 5000,
      path,
      method,
      headers: {
        'Accept': headers.Accept || '*/*',
        ...(postData ? {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        } : {}),
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const contentType = res.headers['content-type'] || '';
        if (contentType.includes('application/json')) {
          try {
            resolve({ status: res.statusCode, contentType, data: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, contentType, raw: data });
          }
        } else {
          resolve({ status: res.statusCode, contentType, html: data });
        }
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function runVerification() {
  console.log('--- Starting Live Server for Endpoint Verification ---');
  // Load server
  const server = require('../src/server');

  // Allow server a brief moment to bind
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log('\n========================================');
  console.log('1. VERIFY: GET / (Browser / Default -> HTML Landing Page)');
  console.log('========================================');
  const res1 = await request('GET', '/', null, { Accept: 'text/html,application/xhtml+xml' });
  console.log(`Status: ${res1.status}`);
  console.log(`Content-Type: ${res1.contentType}`);
  console.log(`Contains Title "AgriPulse – Smart Agriculture API": ${res1.html.includes('AgriPulse – Smart Agriculture API')}`);
  console.log(`Contains Status Badge: ${res1.html.includes('API Status: Healthy')}`);
  console.log(`HTML Snippet:\n${res1.html.slice(0, 320)}...`);

  console.log('\n========================================');
  console.log('2. VERIFY: GET / (Explicit Accept: application/json)');
  console.log('========================================');
  const res1Json = await request('GET', '/', null, { Accept: 'application/json' });
  console.log(`Status: ${res1Json.status}`);
  console.log(`Content-Type: ${res1Json.contentType}`);
  console.log('Response Body:', JSON.stringify(res1Json.data, null, 2));

  console.log('\n========================================');
  console.log('3. VERIFY: GET /health');
  console.log('========================================');
  const res2 = await request('GET', '/health');
  console.log(`Status: ${res2.status}`);
  console.log(`Content-Type: ${res2.contentType}`);
  console.log('Response Body:', JSON.stringify(res2.data, null, 2));

  console.log('\n========================================');
  console.log('4. VERIFY: GET /api/crops');
  console.log('========================================');
  const res3 = await request('GET', '/api/crops');
  console.log(`Status: ${res3.status}`);
  console.log(`Content-Type: ${res3.contentType}`);
  console.log('Count:', res3.data.count);
  console.log('Crops Available:', res3.data.data.map(c => `${c.id}. ${c.name} (${c.category})`));

  console.log('\n========================================');
  console.log('5. VERIFY: GET /api/crops/1');
  console.log('========================================');
  const res4 = await request('GET', '/api/crops/1');
  console.log(`Status: ${res4.status}`);
  console.log(`Content-Type: ${res4.contentType}`);
  console.log('Response Body:', JSON.stringify(res4.data, null, 2));

  console.log('\n========================================');
  console.log('6. VERIFY: GET /api/crops/999 (Non-existent crop)');
  console.log('========================================');
  const res5 = await request('GET', '/api/crops/999');
  console.log(`Status: ${res5.status}`);
  console.log(`Content-Type: ${res5.contentType}`);
  console.log('Response Body:', JSON.stringify(res5.data, null, 2));

  console.log('\n========================================');
  console.log('7. VERIFY: POST /api/recommendations (Valid Input - Rice under stress)');
  console.log('========================================');
  const validPayload = { cropId: 1, soilMoisture: 25, temperature: 32 };
  console.log('Request Payload:', JSON.stringify(validPayload));
  const res6 = await request('POST', '/api/recommendations', validPayload);
  console.log(`Status: ${res6.status}`);
  console.log(`Content-Type: ${res6.contentType}`);
  console.log('Response Body:', JSON.stringify(res6.data, null, 2));

  console.log('\n========================================');
  console.log('8. VERIFY: POST /api/recommendations (Invalid Input - Soil Moisture: 150)');
  console.log('========================================');
  const invalidMoisturePayload = { cropId: 1, soilMoisture: 150, temperature: 32 };
  console.log('Request Payload:', JSON.stringify(invalidMoisturePayload));
  const res8 = await request('POST', '/api/recommendations', invalidMoisturePayload);
  console.log(`Status: ${res8.status}`);
  console.log(`Content-Type: ${res8.contentType}`);
  console.log('Response Body:', JSON.stringify(res8.data, null, 2));

  console.log('\n========================================');
  console.log('9. VERIFY: GET /unknown-endpoint (Meaningful JSON 404)');
  console.log('========================================');
  const res9 = await request('GET', '/unknown-endpoint');
  console.log(`Status: ${res9.status}`);
  console.log(`Content-Type: ${res9.contentType}`);
  console.log('Response Body:', JSON.stringify(res9.data, null, 2));

  console.log('\n--- All Endpoint Verifications Complete. Closing Server. ---');
  server.close(() => {
    console.log('Server stopped successfully.');
    process.exit(0);
  });
}

runVerification().catch((err) => {
  console.error('Verification failed with error:', err);
  process.exit(1);
});
