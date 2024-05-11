import { Product, Clothing, Appliance } from "./products.js";


describe('test suite: Product',()=>{
  let product;
  beforeEach(()=>{
      product = new Product({
      id:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image:"images/products/athletic-cotton-socks-6-pairs.jpg",
      name:"Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating:4.5,
      priceCents:1090
    });
  })

  it('checking the properties and methods',()=>{
    expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(product.rating).toEqual(4.5);

    expect(product.extraInfoHTML()).toEqual('');
  });

  it('gets the price', () => {
    expect(product.getPrice()).toEqual('$10.90');
  });
});


describe('test suite: Clothing',()=>{
  let ProductClothing;
  beforeEach(()=>{
      ProductClothing  = new Clothing(
      {
        id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
        name: "Adults Plain Cotton T-Shirt - 2 Pack",
        rating: {
          stars: 4.5,
          count: 56
        },
        priceCents: 799,
        keywords: [
          "tshirts",
          "apparel",
          "mens"
        ],
        type: "clothing",
        sizeChartLink: "images/clothing-size-chart.png"
      }
    );
  })
  
  it('checking the Clothing properties and method',()=>{
    expect(ProductClothing.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");

    expect(ProductClothing.sizeChartLink).toEqual("images/clothing-size-chart.png")
  });

  it('extraInfoHtml verification',()=>{
    expect(ProductClothing.extraInfoHTML()).toContain(`<a href = "${ProductClothing.sizeChartLink}" target="_blank">Size Chart</a>`);
  })
})