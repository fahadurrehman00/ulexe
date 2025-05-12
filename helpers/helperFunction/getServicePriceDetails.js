
export default function getServicePriceDetails({ serviceData }) {
    const {
        discount_type,
        discount_value,
        has_promotion,
        max_price,
        min_price,
        price: prevPrice,
        use_price_range
    } = serviceData;

    let salePrice,
        price,
        isPercentage,
        isSale,
        discount

    if (has_promotion) {

        if (discount_type === 'fixed') {
            salePrice = parseFloat(discount_value).toFixed(0)
            price = parseFloat(prevPrice).toFixed(0)
            isPercentage =`Discount ${( ((prevPrice - discount_value) / prevPrice)*100).toFixed(2)}%`
            isSale = true
            discount = null

        } else if (discount_type === 'percentage') {
            salePrice = (parseFloat(prevPrice) - (prevPrice * (discount_value / 100))).toFixed(0)
            price = parseFloat(prevPrice).toFixed(0)
            isPercentage = `Discount ${discount_value}% `
            isSale = true
            discount = discount_value

        }
    } else {
        salePrice = null
        price = use_price_range
            ? ` $${min_price
                ? parseFloat(min_price).toFixed(0)
                : 0
            }-$${max_price
                ? parseFloat(max_price).toFixed(0)
                : 0
            } `
            : `$${parseFloat(prevPrice).toFixed(0)}`
        isPercentage = ""
        isSale = false
        discount = null
    }

    return {
        salePrice,
        price,
        isPercentage,
        isSale,
        discount,
    }
}

