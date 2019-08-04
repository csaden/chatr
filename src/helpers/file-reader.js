export default {
  encodeImageFileAsURL(file) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = error => {
        reject(error);
      };
      reader.readAsDataURL(file[0]);
    });
  }
};
