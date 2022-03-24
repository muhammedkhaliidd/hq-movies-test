const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "43d0713f2da06b569ecf206a0083d50c",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
