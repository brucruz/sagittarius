import { ApolloProvider } from '@apollo/react-hooks';
import { cartQl } from '@/services/cartql';
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { SearchExamProvider } from './searchExam';
import { LabResultsProvider } from './labResults';
import { BagProvider } from './bag';
import { DatesProvider } from './dates';

const AppProvider: React.FC = ({ children }) => (
  <ApolloProvider client={cartQl}>
    <AuthProvider>
      <ToastProvider>
        <SearchExamProvider>
          <LabResultsProvider>
            <DatesProvider>
              <BagProvider>{children}</BagProvider>
            </DatesProvider>
          </LabResultsProvider>
        </SearchExamProvider>
      </ToastProvider>
    </AuthProvider>
  </ApolloProvider>
);

export default AppProvider;
