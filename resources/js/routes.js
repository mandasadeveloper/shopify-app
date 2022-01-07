const baseURL =  `https://${SHOPIFY_API_KEY}:${accessToken}@${shopOrigin}/admin/api/${ApiVersion.January21}`;

router.get('/themeId', async (ctx) => {

  const res = await fetch(
    `${baseUrl}/themes.json`
  );

  try {
      ctx.body = await res.json();
      ctx.status = 200;
  } catch (e) {
    console.log('error:', e.message);
  }
});
