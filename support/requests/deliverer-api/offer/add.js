const Base = require("../$base");

class AddOfferRequest extends Base {
  constructor(build) {
    super();
    this.productId = build.productId;
  }
  get method() {
    return "POST";
  }
  get path() {
    return "offer/add";
  }
  get body() {
    return {
      productId: this.productId,
      availableQuantity: "8",
      onHandQuantity: "10",
      unitPrice: "18",
      delivererLocation: {
        latitude: "27.670799",
        longitude: "105.1599679,16"
      }
    };
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.productId = "1";
      }
      withProductId(productId) {
        this.productId = productId
        return this
      }
      build() {
        return new AddOfferRequest(this);
      }
    }
    return Builder;
  }
}

module.exports = AddOfferRequest;
