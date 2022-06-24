// just for testing suspense

export const sleep = (s: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Wait for : " + s + "seconds");
      resolve(true);
    }, s);
  });
};
