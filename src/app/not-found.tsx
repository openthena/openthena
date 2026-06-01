import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <div className="relative h-20 w-20 animate-float drop-shadow-[0_0_24px_rgba(56,225,214,0.35)]">
        <Image
          src="/openthena.svg"
          alt="OpenThena"
          fill
          className="object-contain"
        />
      </div>
      <p className="mt-8 text-6xl font-semibold tracking-tight text-gradient">
        404
      </p>
      <h1 className="mt-2 text-2xl font-semibold">This page drifted away</h1>
      <p className="mt-3 max-w-sm text-ink/55">
        The page you&apos;re looking for doesn&apos;t exist — but your privacy is
        still intact.
      </p>
      <div className="mt-8 flex gap-3">
        <Button href="/">Back home</Button>
        <Button href="/chat" variant="secondary">
          Open the app
        </Button>
      </div>
    </main>
  );
}
