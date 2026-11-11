/**
 * sonarScan.js
 * Project scanner runner for SonarQube using sonarqube-scanner.
 */

import { scan } from 'sonarqube-scanner';

const serverUrl = process.env.SONAR_HOST_URL || 'http://localhost:9000';
const token = process.env.SONAR_TOKEN || ''; // never hard-code tokens in the repository

console.log('🚀 [SonarQube Scanner]: Kod analizi başlatılıyor...');
console.log(`📍 Sunucu: ${serverUrl}`);

const options = {
  'sonar.projectKey': 'antigravity-js',
  'sonar.projectName': 'Antigravity JS (Linear UI)',
  'sonar.projectVersion': '1.0.0',
  'sonar.sources': 'frontend/src,backend/src',
  'sonar.exclusions': '**/node_modules/**,**/dist/**,database/**,coverage/**,**/scripts/**,**/*.sqlite,**/*.sqlite-*',
  'sonar.sourceEncoding': 'UTF-8',
};

if (token) {
  options['sonar.token'] = token;
}

try {
  await scan({
    serverUrl,
    token,
    options
  });
  console.log('✅ [SonarQube Scanner]: Analiz başarıyla tamamlandı!');
  console.log(`🔗 Sonuçları inceleyin: ${serverUrl}/dashboard?id=antigravity-js`);
} catch (error) {
  console.error('❌ [SonarQube Scanner]: Tarama sırasında hata oluştu:', error.message);
  console.log('\n💡 İpucu:');
  console.log(' 1. SonarQube sunucusunun çalıştığından emin olun (http://localhost:9000).');
  console.log(' 2. Eğer token gerekiyorsa: SONAR_TOKEN="token_buraya" npm run sonar komutu ile çalıştırın.');
  process.exit(1);
}
