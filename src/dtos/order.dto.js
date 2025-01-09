class orderDto {
    constructor(order, order_products){
        this.id= order.id
        this.code = order.code
        this.total= order.total

        let products = []
        order_products.forEach(order_p => {
            products.push(order_p.product)
        });

        this.products = products;
    }
}

module.exports = orderDto;