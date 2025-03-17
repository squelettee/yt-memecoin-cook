import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Rocket, Users, Lock } from "lucide-react";

export default function EarlyAccessPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-12 md:py-16">
        <div className="space-y-8 md:space-y-12">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Governance Program 🏛️
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Shape the future of Memecook by becoming an early governance token
              holder
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 rounded-lg border bg-card">
              <Users className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Community Power</h3>
              <p className="text-muted-foreground">
                Join our DAO and participate in key decisions about
                Memecook&apos;s future development.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <Rocket className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">
                Early Adopter Rewards
              </h3>
              <p className="text-muted-foreground">
                Early users receive governance tokens, giving you direct
                influence over platform decisions.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <Lock className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Exclusive Rights</h3>
              <p className="text-muted-foreground">
                Governance token holders get priority access to new features and
                vote on platform updates.
              </p>
            </div>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto bg-card p-8 rounded-lg border">
            <h2 className="text-2xl font-semibold">How to Get Involved</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-medium">Connect Your Wallet</h3>
                  <p className="text-muted-foreground">
                    Connect your Solana wallet to establish your identity.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-medium">Create Your Project</h3>
                  <p className="text-muted-foreground">
                    Build your meme coin landing page to qualify for governance
                    tokens.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Receive Governance Rights</h3>
                  <p className="text-muted-foreground">
                    Early users will receive governance tokens to participate in
                    platform decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto bg-card p-8 rounded-lg border">
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <p className="text-muted-foreground">
              We&apos;re open to collaborations and value your feedback! Whether you have ideas, questions, or want to contribute to the project, we&apos;d love to hear from you.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <a
                href="mailto:baptiste.gresse@proton.me"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                💌 baptiste.gresse@proton.me
              </a>
            </div>
          </div>

          <div className="text-center">
            <Link href="/">
              <Button size="lg" className="gap-2">
                Start Building Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
