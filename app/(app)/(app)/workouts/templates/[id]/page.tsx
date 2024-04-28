import TemplatesPage from "@/components/templates/containers/TemplatesPage";

import Body from "@/components/Body";
import Header from "@/components/Header";

export default function page() {
  return (
    <>
      <Header
        title="template"
        backHref="/workouts/templates"
      />
      <Body>
        <p>This is the templates page.</p>
      </Body>
    </>
  );
}
