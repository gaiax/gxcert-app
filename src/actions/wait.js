
function wait() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 6000);
  });
}

export default wait;
