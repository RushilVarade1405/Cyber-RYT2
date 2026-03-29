const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/--+/g, '-');
};

export default slugify;