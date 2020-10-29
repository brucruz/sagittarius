import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { SearchExamProvider } from './searchExam';
import { LabResultsProvider } from './labResults';
import { BagProvider } from './bag';
import { DatesProvider } from './dates';

const AppProvider: React.FC = ({ children }) => (
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
);

export default AppProvider;
