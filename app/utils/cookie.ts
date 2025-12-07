export function setCookie(name: string, value: string, days = 1) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  const secure = typeof window !== 'undefined' && window.location.protocol === 'https:';
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax${secure ? ';secure' : ''}`;
}

export function getCookie(name: string) {
  if (typeof document === 'undefined') return null;
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`)
  );
  return matches ? decodeURIComponent(matches[1]) : null;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
}
