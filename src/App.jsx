import { DesignSystemPreview } from "./design-system/playground/DesignSystemPreview";
import { IntegrationConfigProvider } from "./design-system/integration/IntegrationConfigProvider";
import { MIGRATION_MODES } from "./design-system/integration/migrationModes";

export default function App() {
  return (
    <IntegrationConfigProvider mode={MIGRATION_MODES.HYBRID}>
      <DesignSystemPreview />
    </IntegrationConfigProvider>
  );
}
