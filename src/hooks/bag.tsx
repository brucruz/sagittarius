/* eslint-disable no-param-reassign */
import {
  useContext,
  createContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
// import mixpanel from 'mixpanel-browser';
import PriceFormatted from '@/@types/PriceFormatted';
import PricesInBag from '@/@types/PricesInBag';
import Lab from '../@types/Lab';
import { useAuth } from './auth';

interface BagContextData {
  bagOpen: boolean;
  openBag(): void;
  closeBag(): void;
  bagItems: PricesInBag[];
  addBagItem(item: PricesInBag): void;
  removeBagItem(item: PriceFormatted, selectedLab: PricesInBag): void;
  clearBag(): void;
  bagPrices: PriceFormatted[];
  bagTotalPrice: number;
  bagPriceCount: number;
  bagExamsTitles: string[];
  bagCompanyLabTitles: string[];
  bagLabCount: number;
}

const BagContext = createContext<BagContextData>({} as BagContextData);

const BagProvider = ({ children }) => {
  const [bagOpen, setBagOpen] = useState(false);

  const [bagItems, setBagItems] = useState<PricesInBag[]>([]);

  const { user } = useAuth();

  const openBag = useCallback(() => {
    setBagOpen(true);

    // user && mixpanel.identify(user.id);
    // mixpanel.track('Open Bag');
  }, [user]);

  const closeBag = useCallback(() => {
    setBagOpen(false);

    // user && mixpanel.identify(user.id);
    // mixpanel.track('Close Bag');
  }, [user]);

  const addBagItem = useCallback(
    (item: PricesInBag) => {
      const clickedItem = item;

      const clickedPrice = item.price[0];

      const clickedLab: Lab = item;

      const clickedLabIndex = bagItems.findIndex(
        bagItem => bagItem.id === clickedLab.id,
      );

      if (clickedLabIndex < 0) {
        setBagItems(oldBagItems => [...oldBagItems, clickedItem]);
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
        } else if (clickedLabPricesCount > 1) {
          bagItems[clickedLabIndex].price.splice(clickedPriceIndex, 1);
          setBagItems([...bagItems]);
        } else {
          bagItems.splice(clickedLabIndex, 1);
          setBagItems([...bagItems]);
        }
      }
    },
    [bagItems],
  );

  const removeBagItem = useCallback(
    (item: PriceFormatted, selectedLab: PricesInBag) => {
      // user && mixpanel.identify(user.id);
      // mixpanel.track('Remove Exam from Bag', {
      //   Lab: selectedLab.title,
      //   Company: selectedLab.company.title,
      //   Exam: item.exam.title,
      //   Price: item.price,
      // });

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
    },
    [bagItems, user],
  );

  const clearBag = useCallback(() => {
    setBagItems([]);

    // user && mixpanel.identify(user.id);
    // mixpanel.track('Clear Bag');
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

  return (
    <BagContext.Provider
      value={{
        bagOpen,
        openBag,
        closeBag,
        bagItems,
        addBagItem,
        removeBagItem,
        clearBag,
        bagPrices,
        bagTotalPrice,
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
