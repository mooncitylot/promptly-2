// @ts-nocheck
import { apiFetch } from './api-fetch.js'

/**
 * Get all prompts
 * @returns {Promise<Array>}
 */
export function getAllPrompts() {
  return apiFetch('/prompts', 'GET').then((r) => r.json())
}

/**
 * Get prompt by ID
 * @param {string} id
 * @returns {Promise<Object>}
 */
export function getPromptById(id) {
  return apiFetch(`/prompts/${id}`, 'GET').then((r) => r.json())
}

/**
 * Create new prompt
 * @param {{title: string, prompt: string}} promptData
 * @returns {Promise<Object>}
 */
export function createPrompt(promptData) {
  return apiFetch('/prompts', 'POST', promptData).then((r) => r.json())
}

/**
 * Update prompt
 * @param {string} id
 * @param {{title: string, prompt: string}} promptData
 * @returns {Promise<Object>}
 */
export function updatePrompt(id, promptData) {
  return apiFetch(`/prompts/${id}`, 'PUT', promptData).then((r) => r.json())
}

/**
 * Delete prompt
 * @param {string} id
 * @returns {Promise<Object>}
 */
export function deletePrompt(id) {
  return apiFetch(`/prompts/${id}`, 'DELETE').then((r) => r.json())
}

/**
 * Search prompts
 * @param {string} searchTerm
 * @returns {Promise<Array>}
 */
export function searchPrompts(searchTerm) {
  return apiFetch(`/prompts/search/${encodeURIComponent(searchTerm)}`, 'GET').then((r) => r.json())
}
