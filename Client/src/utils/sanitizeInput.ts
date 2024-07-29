export const sanitizeInput = (input: string): string => {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return input.replace(/[&<>"']/g, (char) => map[char]);
  };