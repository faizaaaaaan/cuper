import React, { Suspense } from "react";
import { Loader } from "lucide-react";

// Dynamically import your authentication page
const FormPage = React.lazy(() => import("./components/form"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center md:min-h-screen">
          <Loader className="animate-spin" />{" "}
        </div>
      }
    >
      <FormPage />
    </Suspense>
  );
}

export default App;
