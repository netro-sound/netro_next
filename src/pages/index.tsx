import { NextSeo } from "next-seo";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <NextSeo title="Netro Sound" />
      <h1 className="text-center uppercase text-6xl">
        <div className="relative w-96 h-screen ml-2 mr-4">
          <Image src="/netrosound_jacke.svg" alt="Netro Sound logo" fill />
        </div>
      </h1>
    </>
  );
}
