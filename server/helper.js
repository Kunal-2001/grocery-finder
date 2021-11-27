function extractClientUsefulInfo(nearLocations) {
  let loc = [];

  nearLocations.forEach((item) => {
    const info = {
      location: item.location,
      shopName: item.shopName,
      address: item.address,
      lastUpdated: item.lastUpdated,
    };
    loc.push(info);
  });

  return loc;
}

module.exports = { extractClientUsefulInfo };
