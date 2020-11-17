import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const cartQl = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.cartql.com',
});

export interface GetOrCreateCartVariables {
  cartQLId: string;
}

interface CartQLItem {
  id: string;
}
export interface CartQLQuery {
  cart: {
    id: string;
    email: string;
    isEmpty: boolean;
    abandoned: boolean;
    items: CartQLItem[];
  };
}

export interface AddCartItemVariables {
  cartQLId: string;
  priceId: string;
  priceName: string;
  pricePrice: number;
}

export interface RemoveCartItemVariables {
  cartQLId: string;
  priceId: string;
}

export const GET_OR_CREATE_CART = gql`
  query GetCartQLItems($cartQLId: ID!) {
    cart(id: $cartQLId) {
      id
      email
      isEmpty
      abandoned
      items {
        id
      }
    }
  }
`;

export const ADD_CART_ITEM = gql`
  mutation AddBagItemToCartQL(
    $cartQLId: ID!
    $priceId: ID!
    $priceName: String
    $pricePrice: Int!
  ) {
    addItem(
      input: {
        cartId: $cartQLId
        id: $priceId
        name: $priceName
        price: $pricePrice
      }
    ) {
      id
    }
  }
`;

export const REMOVE_CART_ITEM = gql`
  mutation RemoveBagItemToCartQL($cartQLId: ID!, $priceId: ID!) {
    removeItem(input: { cartId: $cartQLId, id: $priceId }) {
      id
    }
  }
`;
