import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { SearchExamProvider } from './searchExam';
import { LabResultsProvider } from './labResults';
import { BagProvider } from './bag';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <SearchExamProvider>
        <LabResultsProvider>
          <BagProvider>{children}</BagProvider>
        </LabResultsProvider>
      </SearchExamProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
