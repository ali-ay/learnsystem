/**
 * catalog.js
 * Curriculum metadata loaded from the database at sign-in: stages, lesson list and the
 * placement test. Everything else (lesson text, quiz questions, vocabulary) is fetched
 * from the API when it is needed.
 */
import { curriculumApi } from './api.js';

const state = {
  loaded: false,
  stages: [],
  modules: [],
  placement: { levels: [], questions: [] }
};

function toStage(s) {
  return {
    id: s.id,
    trackId: s.track_id,
    name: s.name,
    shortName: s.short_name,
    color: s.color,
    folder: s.folder,
    vocabTarget: s.vocab_target || 0,
    vocabCount: s.vocab_count || 0,
    moduleCount: s.modules_count || 0
  };
}

function toModule(m) {
  return {
    id: m.id,
    stageId: m.stage_id,
    number: m.number,
    title: m.title,
    duration: m.duration,
    description: m.description
  };
}

/** Loads the catalog. Called once after sign-in, before any screen is rendered. */
export async function loadCatalog() {
  const [stages, modules, placement] = await Promise.all([
    curriculumApi.getStages(),
    curriculumApi.getModules(),
    curriculumApi.getPlacement()
  ]);
  state.stages = stages.map(toStage);
  state.modules = modules.map(toModule);
  state.placement = placement;
  state.loaded = true;
}

export function catalogLoaded() {
  return state.loaded;
}

export function getStage(stageId) {
  return state.stages.find(s => s.id === stageId) || null;
}

export function getTrackStages(trackId) {
  return state.stages.filter(s => s.trackId === trackId);
}

/** Lessons of a track in curriculum order. */
export function getTrackModules(trackId) {
  const stageIds = new Set(getTrackStages(trackId).map(s => s.id));
  return state.modules.filter(m => stageIds.has(m.stageId));
}

export function getModuleMeta(moduleId) {
  return state.modules.find(m => m.id === moduleId) || null;
}

export function getTrackModuleStage(trackId, moduleId) {
  const mod = getTrackModules(trackId).find(m => m.id === moduleId);
  return mod ? mod.stageId : null;
}

export function getPlacement() {
  return state.placement;
}

/** Placement level for a score: the highest level whose minimum score is reached. */
export function levelForScore(score) {
  const levels = [...state.placement.levels].sort((a, b) => b.minScore - a.minScore);
  return (levels.find(l => score >= l.minScore) || levels[levels.length - 1]).level;
}
