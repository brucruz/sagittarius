import { useBag } from "@/hooks/bag";
import { BagBadgeButton, BagBadgeContainer, BagBadgeFooter, BagBadgeLabSummary, BagBadgeMenu, BagBadgeMenuContainer, BagBadgeSummary, MenuArrow } from "@/styles/components/molecules/BagBadge";
import Link from "next/link";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdShoppingCart } from "react-icons/md";

const BagBadge = () => {
  const { isBagOpen, openBag, closeBag } = useBag();

  return (
    <BagBadgeContainer>
      <BagBadgeButton
        onClick={isBagOpen ? closeBag : openBag}
      >
        <MdShoppingCart />

        <p>R$ 2.323,44</p>

        { isBagOpen ? (<MdKeyboardArrowUp />) : (<MdKeyboardArrowDown />) }
      </BagBadgeButton>

      { isBagOpen && (
        <BagBadgeMenuContainer>
          <MenuArrow />

          <BagBadgeMenu>
            <BagBadgeLabSummary>
              <article>
                <div>
                  logo
                </div>

                <div>
                  <h5>Dr Consulta - Shopping Santa Cruz</h5>
                  <div>
                    <p>3 exames</p>

                    <p>R$ 2.300,99</p>
                  </div>
                </div>
              </article>

              <article>
                <div>
                  logo
                </div>

                <div>
                  <h5>Delboni Auriemo - Augusta</h5>
                  <div>
                    <p>3 exames</p>

                    <p>R$ 2.300,99</p>
                  </div>
                </div>
              </article>
            </BagBadgeLabSummary>

            <BagBadgeSummary>
              <h6>Total:<strong> R$ 4.601,98</strong></h6>
            </BagBadgeSummary>

            <BagBadgeFooter>
              <Link href="">
                <p>Ver Carrinho</p>
              </Link>

              <Link href="">
                <button>"Fechar Pedido"</button>
              </Link>
            </BagBadgeFooter>
          </BagBadgeMenu>

        </BagBadgeMenuContainer>
      )}
    </BagBadgeContainer>
  )
};

export default BagBadge;
