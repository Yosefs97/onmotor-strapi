/**
 * Lifecycle hooks for Article – automatic image import from external URLs
 */

const axios = require("axios");

// detect if URL is image
const isImageUrl = (url) => {
  if (!url) return false;
  return (
    /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(url) ||
    url.includes("hondanews") ||
    url.includes("yamaha") ||
    url.includes("kawasaki") ||
    url.includes("press.ktm") ||
    url.includes("cdn")
  );
};

// extract any URLs from string
const extractUrlsFromString = (text) => {
  if (!text) return [];
  const regex = /(https?:\/\/[^\s"'<>]+)/g;
  return Array.from(text.match(regex) || []);
};

// download file as buffer
async function downloadImage(url) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36",
      },
    });

    return Buffer.from(response.data);
  } catch (err) {
    console.error("❌ Failed downloading image:", url);
    return null;
  }
}

// upload buffer to Cloudinary via Strapi upload service
async function uploadToCloudinary(buffer, filename) {
  try {
    const uploaded = await strapi.plugins["upload"].services.upload.upload({
      data: {},
      files: {
        path: null,
        name: filename,
        type: "image/jpeg",
        size: buffer.length,
        buffer,
      },
    });

    return uploaded?.[0] || null;
  } catch (err) {
    console.error("❌ Cloudinary upload error:", err);
    return null;
  }
}

// import external image and store in Strapi
async function importExternalImage(url) {
  console.log("📥 Importing external image:", url);

  const data = await downloadImage(url);
  if (!data) return null;

  const filename = `imported_${Date.now()}.jpg`;

  const uploaded = await uploadToCloudinary(data, filename);
  if (!uploaded) return null;

  console.log("✅ Saved in cloud:", uploaded.url);
  return uploaded;
}

// replace URLs inside content blocks
async function replaceInContent(content) {
  if (!content) return content;

  const stringContent = JSON.stringify(content);
  const urls = extractUrlsFromString(stringContent).filter(isImageUrl);

  let replaced = stringContent;

  for (const url of urls) {
    const image = await importExternalImage(url);
    if (image) {
      replaced = replaced.replace(String(url), image.url);
    }
  }

  return JSON.parse(replaced);
}

module.exports = {
  async beforeCreate(event) {
    await processArticle(event);
  },

  async beforeUpdate(event) {
    await processArticle(event);
  },
};

async function processArticle(event) {
  const { data } = event.params;
  if (!data) return;

  // --- CONTENT (rich text)
  if (data.content) {
    data.content = await replaceInContent(data.content);
  }

  // --- external_media_links (JSON array)
  if (Array.isArray(data.external_media_links)) {
    const newList = [];

    for (const url of data.external_media_links) {
      if (!isImageUrl(url)) {
        newList.push(url);
        continue;
      }

      const imported = await importExternalImage(url);
      if (imported) newList.push(imported.url);
    }

    data.external_media_links = newList;
  }

  // --- externalImageUrls (string containing URLs)
  if (typeof data.externalImageUrls === "string") {
    const urls = extractUrlsFromString(data.externalImageUrls);
    const newUrls = [];

    for (const url of urls) {
      const imported = await importExternalImage(url);
      if (imported) newUrls.push(imported.url);
    }

    data.externalImageUrls = newUrls;
  }

  // --- gallery (array of URLs or media)
  if (Array.isArray(data.gallery)) {
    const newGallery = [];

    for (const item of data.gallery) {
      if (typeof item === "string" && isImageUrl(item)) {
        const imported = await importExternalImage(item);
        if (imported) {
          newGallery.push(imported.id);
        }
      } else {
        // existing media stays
        newGallery.push(item);
      }
    }

    data.gallery = newGallery;
  }
}
