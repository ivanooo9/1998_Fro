import { IntegrationConfigProvider, ThemeProvider, MIGRATION_MODES } from '@/design-system';
import { Home } from "./pages/Home";

export default function App() {
  return (
    <ThemeProvider>
      <IntegrationConfigProvider mode={MIGRATION_MODES.HYBRID}>
        <Home />
      </IntegrationConfigProvider>
    </ThemeProvider>
  );
}
