export default {
  backend_url:
    process.env.NODE_ENV === 'production'
      ? 'https://wine-century-backend-gqldhk5rva-as.a.run.app'
      : 'http://localhost:3030'
};
