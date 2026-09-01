export const PRIVACY_KEY = 'hange-privacy'

export type PrivacyPrefs = { analytics: boolean }

export function readPrivacyPrefs(): PrivacyPrefs {
  try {
    const raw = localStorage.getItem(PRIVACY_KEY)
    if (!raw) return { analytics: true }
    const parsed = JSON.parse(raw) as PrivacyPrefs
    return { analytics: parsed.analytics !== false }
  } catch {
    return { analytics: true }
  }
}

export function writePrivacyPrefs(prefs: PrivacyPrefs) {
  localStorage.setItem(PRIVACY_KEY, JSON.stringify(prefs))
}
