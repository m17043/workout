// 保存キーを一箇所で定義
const KEY = 'workout:sessions';

/**
 * Session 型:
 * { date: ISO文字列, duration: 秒数, type: "plank"|"squat"|"pushup" }
 */

/** 履歴をすべて取得して配列で返す */
export function loadSessions() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    // JSON.parse が壊れたとき安全に空配列
    return [];
  }
}

/** 履歴 1 件を追記保存する */
export function saveSession(duration, type) {
  const sessions = loadSessions();
  sessions.push({ date: new Date().toISOString(), duration, type });
  localStorage.setItem(KEY, JSON.stringify(sessions));
}
