export function getWelcomeMessage() {
  const date = new Date();
  const hour = date.getHours();
  const message = hour < 12 ? 'buenos días' : hour < 18 ? 'buenas tardes' : 'buenas noches';
  return message;
}