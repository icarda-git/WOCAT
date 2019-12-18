export const logGroup = (name: string, cb: () => void) => {
  console.group(name);
  cb();
  console.groupEnd();
};
