const { When } = require('cucumber')
const AddProductWishRequest = require('support/web/requests/customer-api/add_product_wish')

When('Customer adds a product wish with description {string}', async function (description) {
  const request = new AddProductWishRequest.Builder().withDescription(description).build()
  await this.send(request)
})
