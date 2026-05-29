import { use } from "react";

interface IdPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductIdPage({ params }: IdPageProps) {
  const { slug } = use(params);

  return (
    <div>product page: {slug}</div>
  );
}