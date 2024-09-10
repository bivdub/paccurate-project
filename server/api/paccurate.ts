export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let sampleBody = {
    itemSets: [
      {
        refId: 0,
        color: 'tomato',
        weight: 2,
        dimensions: {
          x: 5,
          y: 6,
          z: 4
        },
        quantity: 1
      }
    ],
    boxTypes: [
      {
        weightMax: 150,
        name: '5x6x8',
        dimensions: {
          x: 5,
          y: 6,
          z: 8
        }
      }
    ],
    includeScripts: false
  };

  let postBody = {
    // requestId: generateId(),
    // orderId: generateId(),
    // layFlat: body.options.layFlat,
    // interlock: body.options.interlock,
    // corners: body.options.corners,
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
      authorization: 'apikey ' + process.env.REAL_API_KEY
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

  // return {
  //   boxTypeChoiceGoalUsed: 'lowest-cost',
  //   boxes: [
  //     {
  //       box: {
  //         boxType: {
  //           centerOfMass: { x: 0, y: 0, z: 0 },
  //           dimensions: { x: 5, y: 6, z: 8 },
  //           itemsInlineOverhang: { x: -1, y: -1, z: -1 },
  //           name: '5x6x8',
  //           price: 0,
  //           rateTable: {
  //             basePrice: 0,
  //             carrier: '',
  //             dimFactor: 0,
  //             priceIncreaseRate: 0,
  //             rates: null,
  //             service: '',
  //             weights: null,
  //             zone: ''
  //           },
  //           refId: 0,
  //           reservedSpace: null,
  //           weightMax: 150,
  //           weightTare: 0
  //         },
  //         centerOfMass: { x: 2.5, y: 3, z: 2 },
  //         centerOfMassString: '[2.5 3 2]',
  //         depthOrder: [1],
  //         depthOrderString: '[1]',
  //         dimensionalWeight: 0,
  //         dimensionalWeightUsed: false,
  //         dimensions: { x: 5, y: 6, z: 8 },
  //         id: 0,
  //         items: [
  //           {
  //             item: {
  //               centerOfMass: { x: 2.5, y: 3, z: 2 },
  //               color: 'tomato',
  //               deltaCost: 240,
  //               dimensions: { x: 5, y: 6, z: 4 },
  //               index: 1,
  //               message:
  //                 'packed #0 in 219.701µs at 680.475µs in Box(name:5x6x8 dimensions:[5,6,8] weight:150 index:0)',
  //               name: '',
  //               origin: { x: 0, y: 0, z: 0 },
  //               quantity: 1,
  //               refId: 0,
  //               sequence: '',
  //               uniqueId: '0-0',
  //               virtual: false,
  //               weight: 2
  //             }
  //           }
  //         ],
  //         lenItems: 1,
  //         name: '5x6x8',
  //         origin: { x: 0, y: 0, z: 0 },
  //         price: 240,
  //         refId: 0,
  //         subspace: null,
  //         volumeMax: 240,
  //         volumeNet: 120,
  //         volumeRemaining: 120,
  //         volumeReserved: 0,
  //         volumeUsed: 120,
  //         volumeUtilization: 0.5,
  //         weightMax: 150,
  //         weightNet: 2,
  //         weightRemaining: 148,
  //         weightTare: 0,
  //         weightUsed: 2,
  //         weightUtilization: 0.013333333333333334
  //       }
  //     }
  //   ],
  //   built: '2024-09-04T21:52:11.858161781Z',
  //   host: 'api.paccurate.io',
  //   itemSortReverseUsed: false,
  //   itemSortUsed: 'none',
  //   leftovers: [],
  //   lenBoxes: 1,
  //   lenItems: 1,
  //   lenLeftovers: 0,
  //   lenUnits: 1,
  //   packTime: 0.000700856,
  //   packUuid:
  //     '30459e3c3fd5b6ad23063d2f2cd71227ab441ef09bfff86593d76b6b1f9ff109a54536fef05e1a91ce9da6eefb42538109c40fb782cff569399d2d5e9b80fa98',
  //   renderTime: 0.00061995,
  //   requestFingerprint:
  //     '2662fbac3653ed2b8f2b8724f24e4991a2fe8f12efa8e5fc931efbb93bbe99de3de867a95177a1f0dc7de5dd33190b6aac88cb5c5776e8809194906f3b7f9b3c',
  //   responseFingerprint:
  //     'd4f167ef6c036f13ecc739f8da5b7a3f47b9fb30e1e12707aee3c4a72f2fbe0d94ea6014eec13e1b6470617265b315c9779e199141b369d416279b771faeae66',
  //   startedAt: '2024-09-05T07:07:22.161716287Z',
  //   svgs: [
  //     "\u003cfigure class='box-figure' data-box-index=0\u003e\u003csvg viewBox='-28.53300858899106,-26.531036307982866,123.7436867076458,122.4744871391589'\u003e[\u003cline data-volume-index='0' class='volume-line' x1='24.5' y1='24.5' x2='24.5' y2='14.293792738403425'/\u003e\n \u003cline data-volume-index='0' class='volume-line' x1='24.5' y1='24.5' x2='15.661165235168156' y2='29.603103630798287'/\u003e\n \u003cline data-volume-index='0' class='volume-line' x1='24.5' y1='24.5' x2='33.338834764831844' y2='29.603103630798287'/\u003e\n \u003cline data-volume-index='0' class='volume-line' x1='24.5' y1='24.5' x2='95.21067811865474' y2='65.3248290463863'/\u003e\n \u003cline data-volume-index='0' class='volume-line' x1='24.5' y1='24.5' x2='-28.53300858899106' y2='55.118621784789724'/\u003e\n \u003cline data-volume-index='0' class='volume-line' x1='24.5' y1='24.5' x2='24.5' y2='-26.531036307982866'/\u003e\n] \u003cpolygon vector-effect='non-scaling-stroke' data-item-ref-id='0' data-volume-index='1' data-side='[5 6 4] [1 0 0]' data-direction='0 [5 6 4] [1 0 0] [] [] [1,0,0]' data-max-depth='5.696152423572657' data-min-depth='2.8094010776245284' class='volume-line' points='59.85533905932737,-6.118621784789724 24.5,-26.531036307982866 -28.53300858899106,4.087585476806854 6.822330470336313,24.500000000000004' style='fill:tomato;' /\u003e\n\u003cpolygon vector-effect='non-scaling-stroke' data-item-ref-id='0' data-volume-index='1' data-side='[5 6 4] [0 1 0]' data-direction='1 [5 6 4] [0 1 0] [] [] [0,1,0]' data-max-depth='5.696152423572657' data-min-depth='3.0980762122193415' class='volume-line' points='6.822330470336313,75.53103630798287 6.822330470336313,24.500000000000004 -28.53300858899106,4.087585476806854 -28.53300858899106,55.118621784789724' style='fill:tomato;' /\u003e\n\u003cpolygon vector-effect='non-scaling-stroke' data-item-ref-id='0' data-volume-index='1' data-side='[5 6 4] [0 0 1]' data-direction='2 [5 6 4] [0 0 1] [] [] [0,0,1]' data-max-depth='5.696152423572657' data-min-depth='2.5207259430297153' class='volume-line' points='59.85533905932737,44.91241452319314 59.85533905932737,-6.118621784789724 6.822330470336313,24.500000000000004 6.822330470336313,75.53103630798287' style='fill:tomato;' /\u003e\n [\u003cline data-volume-index='0' class='volume-line' x1='95.21067811865474' y1='65.3248290463863' x2='42.17766952966369' y2='95.94345083117602'/\u003e\n \u003cline data-volume-index='0' class='volume-line' x1='95.21067811865474' y1='65.3248290463863' x2='95.21067811865474' y2='14.293792738403427'/\u003e\n \u003cline data-volume-index='0' class='volume-line' x1='42.17766952966369' y1='95.94345083117602' x2='-28.53300858899106' y2='55.118621784789724'/\u003e\n \u003cline data-volume-index='0' class='volume-line' x1='42.17766952966369' y1='95.94345083117602' x2='42.17766952966369' y2='44.91241452319315'/\u003e\n \u003cline data-volume-index='0' class='volume-line' x1='-28.53300858899106' y1='55.118621784789724' x2='-28.53300858899106' y2='4.087585476806854'/\u003e\n \u003cline data-volume-index='0' class='volume-line' x1='-28.53300858899106' y1='4.087585476806854' x2='24.5' y2='-26.531036307982866'/\u003e\n \u003cline data-volume-index='0' class='volume-line' x1='-28.53300858899106' y1='4.087585476806854' x2='42.17766952966369' y2='44.91241452319315'/\u003e\n \u003cline data-volume-index='0' class='volume-line' x1='24.5' y1='-26.531036307982866' x2='95.21067811865474' y2='14.293792738403427'/\u003e\n \u003cline data-volume-index='0' class='volume-line' x1='95.21067811865474' y1='14.293792738403427' x2='42.17766952966369' y2='44.91241452319315'/\u003e\n]\u003c/svg\u003e\u003cfigcaption\u003e\u003c/figcaption\u003e\u003c/figure\u003e"
  //   ],
  //   title: 'Default',
  //   totalCost: 240,
  //   totalTime: 0.001320806,
  //   totalVolume: 240,
  //   totalVolumeNet: 120,
  //   totalVolumeUsed: 120,
  //   totalVolumeUtilization: 0.5,
  //   totalWeight: 2,
  //   usedKeyStem: '6UZlPsHAqp',
  //   version: '1.7.1'
  // };
});
