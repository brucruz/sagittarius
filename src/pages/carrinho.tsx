/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useRouter } from 'next/router';
import { ReactElement, useCallback, useEffect } from 'react';
import PageTemplate from '@/components/templates/PageTemplate';
import Button from '@/components/atom/Button';
import TotalPriceBagContainer from '@/components/molecule/TotalPriceBagContainer';
import deleteIcon from '@/assets/pages/Cart/delete-icon.svg';

import { ItemsContainer, ConfirmOrder, BagContent } from '@/styles/pages/Cart';
import { useBag } from '@/hooks/bag';
import formatValueWo$ from '@/utils/formatValueWo$';
import { useAuth } from '@/hooks/auth';
import SEO from '@/components/atom/SEO';
import mixpanel from 'mixpanel-browser';
import PriceFormatted from '@/@types/PriceFormatted';
import PricesInBag from '@/@types/PricesInBag';

export default function Cart(): ReactElement {
  const {
    bagItems,
    bagTotalPrice,
    bagPriceCount,
    removeBagItem,
    bagCompanyLabTitles,
    bagExamsTitles,
    bagLabCount,
  } = useBag();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    user && mixpanel.identify(user.id);
    mixpanel.track('Page View', {
      'Page Title': 'Cart',
    });
  }, [user]);

  const handleCheckoutInitiation = useCallback(() => {
    user && mixpanel.identify(user.id);

    mixpanel.register(
      {
        'Selected Labs': bagCompanyLabTitles,
        'Selected Exams': bagExamsTitles,
        'Total Price': bagTotalPrice,
        'Price Count': bagPriceCount,
        'Lab Count': bagLabCount,
      },
      1,
    );

    mixpanel.track('Initiate Checkout');

    if (!user) {
      router.push('/login');
    } else {
      router.push('/checkout/paciente');
    }
  }, [
    user,
    router,
    bagCompanyLabTitles,
    bagExamsTitles,
    bagTotalPrice,
    bagPriceCount,
    bagLabCount,
  ]);

  const handleRemoveBagItem = useCallback(
    (price: PriceFormatted, item: PricesInBag) => {
      removeBagItem(price, item);

      user && mixpanel.identify(user.id);
      mixpanel.track('Remove Exam from Bag', {
        Lab: item.title,
        Company: item.company.title,
        Exam: price.exam.title,
        Price: price.price,
        'Click Source': 'Cart Page',
      });
    },
    [removeBagItem, user],
  );

  return (
    <PageTemplate
      buttonType={{
        type: 'go_back_button',
      }}
      titleMain={{ title: 'Meu carrinho' }}
    >
      <SEO
        title="Carrinho"
        description="Agende seus exames médicos de forma rápida, simples e segura"
        canonical="carrinho"
      />

      <BagContent>
        <ItemsContainer>
          <div className="header-items-container">
            <div>
              <span>Exames ({bagPriceCount})</span>
            </div>
            <div>
              <span>Valor</span>
            </div>
          </div>
          <div className="content-items-container">
            {bagItems.map(item => {
              return (
                <div className="lab-item" key={item.id}>
                  <span className="title-lab-item">
                    {item.company.title} - {item.title}
                  </span>
                  {item.price.map(price => {
                    return (
                      <div className="exam-lab-item" key={price.id}>
                        <div>
                          <span>{price.exam.title}</span>
                        </div>
                        <div>
                          <span>R$ {formatValueWo$(price.price)}</span>
                          <img
                            onClick={() => handleRemoveBagItem(price, item)}
                            src={deleteIcon}
                            alt="Ícone de deletar exame"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="desktop-footer">
            <TotalPriceBagContainer totalPrice={bagTotalPrice} />
          </div>
        </ItemsContainer>
        <ConfirmOrder>
          <TotalPriceBagContainer totalPrice={bagTotalPrice} />
          <div>
            <Button onClick={handleCheckoutInitiation}>Agendar Exames</Button>
          </div>
        </ConfirmOrder>
      </BagContent>
    </PageTemplate>
  );
}
