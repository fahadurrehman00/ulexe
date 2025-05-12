function formatPrice(price) {
  return `$${parseFloat(price).toFixed(0)}`;
}

export default function finalPrice(details) {
  if (details.name === "Free Consultation") {
    return "$0";
  }

  if (details.has_promotion) {
    if (details.discount_type === "fixed") {
      return formatPrice(details.discount_value);
    } else {
      return formatPrice(details.price * (1 - details.discount_value / 100));
    }
  } else if (!details.use_price_range) {
    return `${formatPrice(details.min_price)} to ${formatPrice(
      details.max_price
    )}`;
  } else {
    return formatPrice(details.price);
  }
}
