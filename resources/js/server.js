

import RedisStore from './redis-store';
const sessionStorage = new RedisStore();

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(','),
  HOST_NAME: process.env.HOST.replace(/https:\/\//, ''),
  API_VERSION: ApiVersion.January21,
  IS_EMBEDDED_APP: true,
  SESSION_STORAGE: new Shopify.Session.CustomSessionStorage(
    sessionStorage.storeCallback,
    sessionStorage.loadCallback,
    sessionStorage.deleteCallback,
  )
});

// accessToken

 createShopifyAuth({
  async afterAuth(ctx) {
  // Access token and shop available in ctx.state.shopify
  const {shop, accessToken, scope} = ctx.state.shopify;
  }})
