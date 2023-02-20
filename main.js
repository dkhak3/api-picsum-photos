const imageList = document.querySelector(".images");
const loadmore = document.querySelector(".load-more");
const loading = document.querySelector(".image-loader");

loadmore.style.display = "none";

let page = 1;
const limit = 8;
const endpoint = `https://picsum.photos/v2/list?limit=${limit}`;

function imageTemplate(url) {
  const template = `<div class="image-item">
    <img src="${url}" alt="" />
  </div>`;

  imageList.insertAdjacentHTML("beforeend", template);
}

async function fetchImages(page) {
  loading.style.display = "block";
  loadmore.style.display = "none";

  const response = await fetch(`${endpoint}&page=${page}`);
  const images = await response.json();

  if (images.length > 0 && Array.isArray(images)) {
    loading.style.display = "none";
    loadmore.style.display = "block";

    images.forEach((item) => imageTemplate(item.download_url));
  }
}

loadmore.addEventListener("click", async () => {
  page++;
  await fetchImages(page);
});

fetchImages();
