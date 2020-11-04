import Link from 'next/link';
import { useBag } from '@/hooks/bag';
import {
  BagBadgeButton,
  BagBadgeContainer,
  EmptyBagContent,
  BagBadgeFooter,
  BagBadgeLabSummary,
  BagBadgeMenu,
  BagBadgeMenuContainer,
  BagBadgeSummary,
  MenuArrow,
} from '@/styles/components/molecules/BagBadge';
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdLightbulbOutline,
  MdShoppingCart,
} from 'react-icons/md';

import formatValue from '@/utils/formatValue';
import { useAuth } from '@/hooks/auth';

const BagBadge = () => {
  const {
    isBagOpen,
    openBag,
    closeBag,
    bagItems,
    bagTotalPriceFormatted,
  } = useBag();
  const { user } = useAuth();

  return (
    <BagBadgeContainer>
      <BagBadgeButton onClick={isBagOpen ? closeBag : openBag}>
        <MdShoppingCart />

        <p>{bagTotalPriceFormatted}</p>

        {isBagOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </BagBadgeButton>

      {isBagOpen && (
        <BagBadgeMenuContainer>
          <MenuArrow />

          <BagBadgeMenu>
            <BagBadgeLabSummary>
              {bagItems.length > 0 &&
                bagItems.map(bagItem => {
                  const priceValues = bagItem.price.map(price => price.price);

                  const totalPrice = priceValues.reduce(
                    (total, price) => total + price,
                    0,
                  );

                  const totalPriceFormmatted = formatValue(totalPrice);

                  return (
                    <article key={bagItem.id}>
                      <div>
                        <img
                          src={bagItem.company.logo}
                          alt={bagItem.company.title}
                        />
                      </div>

                      <div>
                        <h5>{`${bagItem.company.title} - ${bagItem.title}`}</h5>

                        <div>
                          {bagItem.price.length === 1 ? (
                            <p>{bagItem.price.length} exame</p>
                          ) : (
                            <p>{bagItem.price.length} exames</p>
                          )}

                          <p>{totalPriceFormmatted}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}

              {bagItems.length === 0 && (
                <EmptyBagContent>
                  <MdLightbulbOutline />

                  <p>Adicione exames ao carrinho para visualizá-los aqui</p>
                </EmptyBagContent>
              )}
            </BagBadgeLabSummary>

            <BagBadgeSummary>
              <h6>
                Total:<strong> {bagTotalPriceFormatted}</strong>
              </h6>
            </BagBadgeSummary>

            <BagBadgeFooter>
              <Link href="/carrinho">
                <p>Ver Carrinho</p>
              </Link>

              <Link
                href={{
                  pathname: user ? '/checkout/paciente' : '/login',
                }}
              >
                <button>Fechar Pedido</button>
              </Link>
            </BagBadgeFooter>
          </BagBadgeMenu>
        </BagBadgeMenuContainer>
      )}
    </BagBadgeContainer>
  );
};

export default BagBadge;
