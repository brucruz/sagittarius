import PageTemplate from "@/components/templates/PageTemplate"

const BagPage = () => {
  return (
    <PageTemplate
      titleMain={{
        title: 'Meu Carrinho'
      }}
      buttonType={{
        type: 'go_back_button',
      }}
    >
      hello bag
    </PageTemplate>
  )
}

export default BagPage;
