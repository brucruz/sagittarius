/* eslint-disable no-param-reassign */
import {
  useContext,
  createContext,
  useState,
  useCallback,
  useMemo,
  ReactElement,
  useEffect,
} from 'react';
import mixpanel from 'mixpanel-browser';
import PriceFormatted from '@/@types/PriceFormatted';
import PricesInBag from '@/@types/PricesInBag';
import formatValue from '@/utils/formatValue';
import {
  ADD_CART_ITEM,
  GET_OR_CREATE_CART,
  REMOVE_CART_ITEM,
  CartQLQuery,
  GetOrCreateCartVariables,
  AddCartItemVariables,
  RemoveCartItemVariables,
  UpdateCartQLBagVariables,
  UPDATE_CARTQL_BAG,
} from '@/services/cartql';
import { useLazyQuery, useMutation } from '@apollo/client';
import api from '@/services/api';
import Price from '@/@types/Price';
import User from '@/@types/User';
import Lab from '../@types/Lab';
import { useAuth } from './auth';

interface Bag {
  id: string;
  user?: User;
  prices?: Price[];
}

interface BagContextData {
  isBagOpen: boolean;
  openBag(): void;
  closeBag(): void;
  bagItems: PricesInBag[];
  addBagItem(item: PricesInBag): void;
  addBagItems(items: PriceFormatted[], currentLab: Lab): void;
  removeBagItem(item: PriceFormatted, selectedLab: PricesInBag): void;
  clearBag(): void;
  initiateCheckout(): Promise<void>;
  bagPrices: PriceFormatted[];
  bagTotalPrice: number;
  bagTotalPriceFormatted: string;
  bagPriceCount: number;
  bagExamsTitles: string[];
  bagCompanyLabTitles: string[];
  bagLabCount: number;
}

const BagContext = createContext<BagContextData>({} as BagContextData);

const BagProvider = ({ children }): ReactElement => {
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [bagItems, setBagItems] = useState<PricesInBag[]>([]);
  const [bagId, setBagId] = useState<string>(undefined);

  const { user, token } = useAuth();

  const [GetCartQLItems, { data: cartQLCart }] = useLazyQuery<
    CartQLQuery,
    GetOrCreateCartVariables
  >(GET_OR_CREATE_CART);

  const [AddBagItemToCartQL] = useMutation<string, AddCartItemVariables>(
    ADD_CART_ITEM,
  );
  const [RemoveBagItemToCartQL] = useMutation<string, RemoveCartItemVariables>(
    REMOVE_CART_ITEM,
  );
  const [UpdateCartQLBag] = useMutation<string, UpdateCartQLBagVariables>(
    UPDATE_CARTQL_BAG,
  );

  const openBag = useCallback(() => {
    setIsBagOpen(true);

    user && mixpanel.identify(user.id);
    mixpanel.track('Open Bag');
  }, [user]);

  const closeBag = useCallback(() => {
    setIsBagOpen(false);

    user && mixpanel.identify(user.id);
    mixpanel.track('Close Bag');
  }, [user]);

  const generateBagId = useCallback(async () => {
    const { data } = await api.post<Bag>('/bags');

    sessionStorage.setItem('@Heali:bagId', data.id);

    setBagId(data.id);

    return data;
  }, []);

  useEffect(() => {
    setBagId(sessionStorage.getItem('@Heali:bagId'));

    bagId &&
      GetCartQLItems({
        variables: { cartQLId: bagId },
      });

    const cartQLItems = cartQLCart && cartQLCart.cart.items;

    const cartQLItemsIds = cartQLCart && cartQLItems.map(item => item.id);

    if (cartQLCart && cartQLItemsIds.length > 0) {
      api
        .get<Price[]>('/prices', {
          params: {
            id: cartQLItemsIds,
          },
        })
        .then(results => {
          const apiPrices = results.data;

          const apiLabs = apiPrices.map(apiPrice => apiPrice.lab);

          const itemsToAddInBag: PricesInBag[] = apiLabs.map(apiLab => {
            const labPrices = apiPrices.filter(
              price => price.lab_id === apiLab.id,
            );

            const labPricesFormatted: PriceFormatted[] = labPrices.map(
              price => {
                return {
                  ...price,
                  formatted_price: formatValue(price.price),
                };
              },
            );

            return {
              ...apiLab,
              price: labPricesFormatted,
            };
          });

          setBagItems(itemsToAddInBag);
        })
        .catch(err => console.log(err));
    }
  }, [bagId, GetCartQLItems, cartQLCart]);

  const addBagItem = useCallback(
    async (item: PricesInBag) => {
      let bag: Bag;

      if (!bagId) bag = await generateBagId();

      const clickedItem = item;

      const clickedPrice = item.price[0];

      const clickedLab: Lab = item;

      const clickedLabIndex = bagItems.findIndex(
        bagItem => bagItem.id === clickedLab.id,
      );

      if (clickedLabIndex < 0) {
        setBagItems(oldBagItems => [...oldBagItems, clickedItem]);

        AddBagItemToCartQL({
          variables: {
            cartQLId: bagId || bag.id,
            priceId: clickedPrice.id,
            priceName: clickedPrice.exam.title,
            pricePrice: clickedPrice.price,
          },
        });
      } else {
        const clickedPriceIndex = bagItems[clickedLabIndex].price.findIndex(
          labPrice => labPrice.id === clickedPrice.id,
        );

        const clickedLabPrices = bagItems[clickedLabIndex].price;
        const clickedLabPricesCount = clickedLabPrices.length;

        if (clickedPriceIndex < 0) {
          bagItems.splice(clickedLabIndex, 1);

          const newClickedLabPrices = [...clickedLabPrices, clickedPrice];

          clickedItem.price = newClickedLabPrices;

          setBagItems(oldBagItems => [...oldBagItems, clickedItem]);

          AddBagItemToCartQL({
            variables: {
              cartQLId: bagId || bag.id,
              priceId: clickedPrice.id,
              priceName: clickedPrice.exam.title,
              pricePrice: clickedPrice.price,
            },
          });
        } else if (clickedLabPricesCount > 1) {
          bagItems[clickedLabIndex].price.splice(clickedPriceIndex, 1);

          setBagItems([...bagItems]);

          RemoveBagItemToCartQL({
            variables: {
              cartQLId: bagId || bag.id,
              priceId: clickedPrice.id,
            },
          });
        } else {
          bagItems.splice(clickedLabIndex, 1);

          setBagItems([...bagItems]);

          RemoveBagItemToCartQL({
            variables: {
              cartQLId: bagId || bag.id,
              priceId: clickedPrice.id,
            },
          });
        }
      }
    },
    [
      bagItems,
      setBagItems,
      bagId,
      AddBagItemToCartQL,
      RemoveBagItemToCartQL,
      generateBagId,
    ],
  );

  const addBagItems = useCallback(
    async (items: PriceFormatted[], currentLab: Lab) => {
      let bag: Bag;

      if (!bagId) bag = await generateBagId();

      const itemToAdd: PricesInBag = {
        id: currentLab.id,
        title: currentLab.title,
        slug: currentLab.slug,
        address: currentLab.address,
        city: currentLab.city,
        state: currentLab.state,
        latitude: currentLab.latitude,
        longitude: currentLab.longitude,
        collect_hour: currentLab.collect_hour,
        open_hour: currentLab.open_hour,
        company: currentLab.company,
        company_id: currentLab.company_id,
        price: items.map(item => {
          return {
            id: item.id,
            price: item.price,
            formatted_price: item.formatted_price,
            created_date: item.created_date,
            exam: item.exam,
            exam_id: item.exam_id,
            lab_id: item.lab_id,
            lab: item.lab,
          };
        }),
      };

      items.map(item =>
        AddBagItemToCartQL({
          variables: {
            cartQLId: bagId || bag.id,
            priceId: item.id,
            priceName: item.exam.title,
            pricePrice: item.price,
          },
        }),
      );

      if (bagItems.length === 0) {
        setBagItems([itemToAdd]);
      } else {
        const labIndex = bagItems.findIndex(item => item.id === itemToAdd.id);
        if (labIndex >= 0) {
          setBagItems([
            ...bagItems.map((item, index) =>
              index === labIndex ? itemToAdd : item,
            ),
          ]);
        } else {
          setBagItems(currentBagItem => [...currentBagItem, itemToAdd]);
        }
      }

      itemToAdd.price.forEach(price => {
        user && mixpanel.identify(user.id);
        mixpanel.track('Add Exam To Bag', {
          Lab: itemToAdd.title,
          Company: itemToAdd.company.title,
          Exam: price.exam.title,
          Price: price.price,
        });
      });
    },
    [bagItems, setBagItems, user, bagId, AddBagItemToCartQL, generateBagId],
  );

  const removeBagItem = useCallback(
    async (item: PriceFormatted, selectedLab: PricesInBag) => {
      let bag: Bag;

      if (!bagId) bag = await generateBagId();

      user && mixpanel.identify(user.id);
      mixpanel.track('Remove Exam from Bag', {
        Lab: selectedLab.title,
        Company: selectedLab.company.title,
        Exam: item.exam.title,
        Price: item.price,
        'Click Source': 'Cart Widget',
      });

      const labIndex = bagItems.findIndex(lab => lab.id === selectedLab.id);

      const labItems = bagItems[labIndex];

      const labPriceIndex = labItems.price.findIndex(
        labItem => labItem.id === item.id,
      );

      const labPricesCount = labItems.price.length;

      labItems.price.splice(labPriceIndex, 1);

      bagItems.splice(labIndex, 1);

      if (labPricesCount > 1) {
        setBagItems([...bagItems, labItems]);
      } else {
        setBagItems([...bagItems]);
      }

      RemoveBagItemToCartQL({
        variables: {
          cartQLId: bagId || bag.id,
          priceId: item.id,
        },
      });
    },
    [bagItems, user, generateBagId, bagId, RemoveBagItemToCartQL],
  );

  const clearBag = useCallback(() => {
    setBagItems([]);

    user && mixpanel.identify(user.id);
    mixpanel.track('Clear Bag');
  }, [user]);

  const bagPrices = useMemo(() => {
    const prices = bagItems.map(item => item.price).flat();

    return prices;
  }, [bagItems]);

  const bagTotalPrice = useMemo(() => {
    const priceValues = bagPrices.map(price => price.price);

    const totalPrice = priceValues.reduce((total, price) => total + price, 0);

    return totalPrice;
  }, [bagPrices]);

  const bagTotalPriceFormatted = useMemo(() => {
    return formatValue(bagTotalPrice);
  }, [bagTotalPrice]);

  const bagPriceCount = useMemo(() => {
    const priceCount = bagPrices.length;

    return priceCount;
  }, [bagPrices]);

  const bagExamsTitles = useMemo(() => {
    const titles = bagPrices.map(price => price.exam.title);

    return titles;
  }, [bagPrices]);

  const bagCompanyLabTitles = useMemo(() => {
    const titles = bagItems.map(
      item => `${item.company.title} - ${item.title}`,
    );

    return titles;
  }, [bagItems]);

  const bagLabCount = useMemo(() => {
    const labCount = bagItems.length;

    return labCount;
  }, [bagItems]);

  const initiateCheckout = useCallback(async () => {
    if (bagId && token) {
      const bagPricesIds = bagPrices.map(price => price.id);

      await api.put<Bag>(
        `/bags/${bagId}`,
        {
          priceId: bagPricesIds,
        },
        {
          headers: { Authorization: `Bearer: ${token}` },
        },
      );

      await UpdateCartQLBag({
        variables: {
          cartQLId: bagId,
          email: user.email,
        },
      });
    }
  }, [token, user, UpdateCartQLBag, bagId, bagPrices]);

  return (
    <BagContext.Provider
      value={{
        isBagOpen,
        openBag,
        closeBag,
        bagItems,
        addBagItem,
        addBagItems,
        removeBagItem,
        clearBag,
        initiateCheckout,
        bagPrices,
        bagTotalPrice,
        bagTotalPriceFormatted,
        bagPriceCount,
        bagExamsTitles,
        bagCompanyLabTitles,
        bagLabCount,
      }}
    >
      {children}
    </BagContext.Provider>
  );
};

function useBag(): BagContextData {
  const context = useContext(BagContext);

  if (!context) {
    throw new Error('useBag must be used within a BagProvider');
  }

  return context;
}

export { BagProvider, useBag };
