function getImgSize(image) {
  const newImg = new Image();
  return new Promise((res, rej) => {
    newImg.onload = function() {
      const height = newImg.height;
      const width = newImg.width;
      res({
        width: newImg.width,
        height: newImg.height
      });
    }
    newImg.src = image.src;
  });
}

const img = document.querySelector('img');
getImgSize(img).then(size => console.log(size));