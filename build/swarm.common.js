const body_price = body => {
  return body.map(piece => BODYPART_COST[piece]).reduce((s, e) => {
    return s + e;
  }, 0);
};

const build_body = (base, extension, max_energy, design_level) => {
  const level_price = body_price(extension);
  let max_count = Math.floor((max_energy - body_price(base)) / level_price);
  let design_count = design_level;

  if (!design_count) {
    design_count = max_count;
  }

  let bodyparts_count = Math.min(max_count, design_count);

  if (bodyparts_count < 0) {
    return [];
  }

  return [].concat.apply(base, Array(bodyparts_count).fill(extension));
};

const place_flag = room => {};

module.exports = {
  body_price: body_price,
  build_body: build_body
};