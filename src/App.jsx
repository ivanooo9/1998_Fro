import { IntegrationConfigProvider } from "./design-system/integration/IntegrationConfigProvider";
import { MIGRATION_MODES } from "./design-system/integration/migrationModes";
import { Home } from "./pages/Home";

export default function App() {
  return (
    <IntegrationConfigProvider mode={MIGRATION_MODES.HYBRID}>
      <Home />
    </IntegrationConfigProvider>
  );
}
