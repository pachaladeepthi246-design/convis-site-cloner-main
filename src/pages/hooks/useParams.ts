export function useParams(): string {
  const path = window.location.pathname;
  const parts = path.split('/');
  return parts[parts.length - 1];
}
