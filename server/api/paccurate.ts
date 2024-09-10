export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let postBody: any = {
    requestId: generateId(),
    orderId: generateId(),
    layFlat: body.options.layFlat,
    interlock: body.options.interlock,
    corners: body.options.corners,
    itemSets: body.itemSets,
    includeScripts: false
  };

  if (body.options.boxTypeSet === 'custom') {
    postBody.boxTypes = body.boxes;
  } else {
    postBody.boxTypeSets = [body.options.boxTypeSet];
  }

  const response = await $fetch('https://api.paccurate.io/', {
    method: 'POST',
    headers: {
      authorization: 'apikey ' + process.env.API_KEY
    },
    body: postBody
  }).catch((err) => {
    console.log(err);
  });

  return response;

  function generateId() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY';
    let id = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }
    return id;
  }
});
