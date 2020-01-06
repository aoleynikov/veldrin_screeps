const body_price = (body) => {
  body.map((piece) => BODYPART_COST[piece]).reduce((s, e) => {
    return s + e
  }, 0)
}

const build_body = (base, extension, max_energy, design_level) => {
  const level_price = body_price(extension)

  let max_count = (max_energy - body_price(base)) / level_price
  let design_count = design_level || Math.INF
  let bodyparts_count = Math.min(max_count, design_count)

  return [].concat.apply(base, Array(bodyparts_count).fill(extension))
}

module.exports = {
  body_price: body_price,
  build_body: build_body
}