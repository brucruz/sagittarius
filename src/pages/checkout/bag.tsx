import PageTemplate from "@/components/templates/PageTemplate"
import { useRouter } from "next/router"

const BagPage = () => {
  window.history.back()

  return (
    <PageTemplate
      titleMain={{
        title: 'Meu Carrinho'
      }}

    >
      hello bag
    </PageTemplate>
  )
}
