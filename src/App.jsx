import { IntegrationConfigProvider } from "./design-system/integration/IntegrationConfigProvider";
import { ThemeProvider } from "./design-system/integration/ThemeContext";
import { MIGRATION_MODES } from "./design-system/integration/migrationModes";
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
