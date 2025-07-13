import Playground from "@/components/Playground";
import { Suspense } from 'react';
export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Playground/>
    </Suspense>
  );
}
