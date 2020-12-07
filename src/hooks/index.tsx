import { ApolloProvider } from '@apollo/react-hooks';
import { cartQl } from '@/services/cartql';
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { SearchExamProvider } from './searchExam';
import { LabResultsProvider } from './labResults';
import { BagProvider } from './bag';
import { DatesProvider } from './dates';
import { PaymentProvider } from './payment';

const AppProvider: React.FC = ({ children }) => (
  <ApolloProvider client={cartQl}>
    <AuthProvider>
      <ToastProvider>
        <SearchExamProvider>
          <LabResultsProvider>
            <DatesProvider>
              <BagProvider>
                <PaymentProvider>{children}</PaymentProvider>
              </BagProvider>
            </DatesProvider>
          </LabResultsProvider>
        </SearchExamProvider>
      </ToastProvider>
    </AuthProvider>
  </ApolloProvider>
);

export default AppProvider;
