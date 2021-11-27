const Products = require("./models/products");

async function extractClientUsefulInfo(nearLocations, requiredProduct) {
  let loc = [];

  const daya = await Promise.all(
    nearLocations.map(async (item) => {
      let alreadFilled = false;
      item.products.map(async (prod_id) => {
        const prod_info = await Products.findById(prod_id);
        if (
          prod_info.productName.toLowerCase() ===
            requiredProduct.toLowerCase() &&
          alreadFilled === false
        ) {
          const info = {
            location: item.location,
            shopName: item.shopName,
            address: item.address,
            lastUpdated: item.lastUpdated,
            quantityAvailable: prod_info.quantityAvailable,
            productName: prod_info.productName,
            price: prod_info.price,
          };
          return info;
          alreadFilled = true;
        }
      });
    })
  );
  console.log(daya);
  return loc;
}

module.exports = { extractClientUsefulInfo };
