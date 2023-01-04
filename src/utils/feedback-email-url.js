export function feedbackEmailUrl(order, userId) {
  const adminEmail = 'thrifttest123@gmail.com';
  const subject = `Customer Feedback - ${userId}`;
  const body = `Order ID: ${order.id}

    [Write Your Feedback here]
    `;

  return `mailto: ${adminEmail}?subject=${subject}&body=${body}`;
}

// Order Time: ${order.time}
// Item Name: ${order.item.name}
// Item Price: ${order.item.price}
// Collection From: ${order.item.from}
// Collection To: ${order.item.to}
// Status: ${order.status}
