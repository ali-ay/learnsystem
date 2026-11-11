/**
 * Track rows written to the `tracks` table by ensureTracks().
 * The frontend keeps its own copy for the UI (frontend/src/core/tracks.js, which also holds
 * UI-only settings such as labels and placement); keep id, name, icon, description and
 * status the same in both files.
 */
export const TRACKS = [
  { id: 'js', name: 'JavaScript', icon: '🟨', description: 'Dil temelinden V8 motoruna, DOM\'dan ileri tasarım kalıplarına.', status: 'active' },
  { id: 'react', name: 'React', icon: '⚛️', description: 'Bileşenler, hook\'lar, durum yönetimi ve performans.', status: 'planned' },
  { id: 'devops', name: 'DevOps', icon: '🛠️', description: 'Konteynerler, CI/CD, izleme ve altyapı otomasyonu.', status: 'planned' },
  { id: 'english', name: 'İngilizce', icon: '🇬🇧', description: 'A1’den B2’ye: seviye testiyle başla, konu konu ilerle.', status: 'active' },
  { id: 'ai', name: 'AI Uzmanlığı', icon: '🤖', description: 'Python, Docker, LLM ve RAG uygulamalarından kurumsal veri entegrasyonuna, yerel LLM ve GPU altyapısına.', status: 'active' }
];
