/**
 * tracks.js
 * Learning tracks ("alanlar"). Each track is an independent curriculum. The track list
 * below is UI configuration; stages, lessons and content come from the database through
 * the catalog (see catalog.js).
 *
 * A track with no content yet keeps status "planned"; the UI shows it as
 * "Yakında" and renders an empty state instead of a lesson.
 */
import { getTrackStages, getTrackModules, getTrackModuleStage } from './catalog.js';

export const DEFAULT_TRACK_ID = 'js';

export const TRACKS = [
  {
    id: 'js',
    name: 'JavaScript',
    icon: '🟨',
    description: 'Dil temelinden V8 motoruna, DOM\'dan ileri tasarım kalıplarına.',
    status: 'active'
  },
  {
    id: 'react',
    name: 'React',
    icon: '⚛️',
    description: 'Bileşenler, hook\'lar, durum yönetimi ve performans.',
    status: 'planned'
  },
  {
    id: 'devops',
    name: 'DevOps',
    icon: '🛠️',
    description: 'Konteynerler, CI/CD, izleme ve altyapı otomasyonu.',
    status: 'planned'
  },
  {
    id: 'english',
    name: 'İngilizce',
    icon: '🇬🇧',
    description: "A1’den B2’ye: seviye testiyle başla, konu konu ilerle.",
    status: 'active',
    placement: true,
    labels: { note: '📘 Dilbilgisi Notu', tip: '💡 Kullanım İpucu' }
  },
  {
    id: 'ai',
    name: 'AI Uzmanlığı',
    icon: '🤖',
    description: 'Python, Docker, LLM ve RAG uygulamalarından kurumsal veri entegrasyonuna, yerel LLM ve GPU altyapısına.',
    status: 'active',
    labels: { note: 'Teknik not', tip: 'İpucu' }
  }
];

export function getTrack(trackId) {
  return TRACKS.find(t => t.id === trackId) || null;
}

export { getTrackStages, getTrackModuleStage };

/** Lessons of a track (same shape the screens always used). */
export function getTrackManifest(trackId) {
  return getTrackModules(trackId);
}

export function trackHasContent(trackId) {
  return getTrackModules(trackId).length > 0;
}
