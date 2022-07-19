/**
 * 设置localStorage
 * @param {string} key
 * @param {any} value
 */
import projectInfo from '../../package.json';
export function setCache(key: string, value: any): void {
  const storageKey = projectInfo.name + '_' + projectInfo.version + '_' + key;
  window.localStorage.setItem(storageKey, btoa(JSON.stringify(value)));
}

/**
 * 获取localStorage
 * @param {string} key
 * @returns {any}
 */
export function getCache(key: string): string {
  const storageKey = projectInfo.name + '_' + projectInfo.version + '_' + key;
  let storageValue = window.localStorage.getItem(storageKey)
  if(storageValue === null) return ""
  else return JSON.parse(atob(storageValue));
}

/**
 * 清除指定localStorage
 * @param {string} key
 */
export function removeCache(key: string) {
  const storageKey = projectInfo.name + '_' + projectInfo.version + '_' + key;
  return window.localStorage.removeItem(storageKey);
}

/**
 * 清除所有localStorage
 */
export function removeAll() {
  return window.localStorage.clear();
}
