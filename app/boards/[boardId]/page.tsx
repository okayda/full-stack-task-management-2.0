import { Suspense } from "react";

import AsyncPage from "./async-page";
import AsyncLoader from "./async-loader";

export default function BoardIdPage() {
  return (
    <Suspense fallback={<AsyncLoader />}>
      <AsyncPage />
    </Suspense>
  );
}
