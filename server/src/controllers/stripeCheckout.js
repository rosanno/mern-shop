import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_KEY);

export const stripeCheckout = async (req, res) => {
  const line_items = req.body.cartItems?.product?.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.productId.title,
          images: [item.colorImg[0]],
          description: item.productId.title,
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.productId.price * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'PH'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd',
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'usd',
          },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/`,
  });

  res.send({ url: session.url, _id: session.id });
};

export const getSessions = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.params.id);

  res.status(200).json({ payment_status: session.payment_status });

  console.log(session);
};
