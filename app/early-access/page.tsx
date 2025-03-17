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
              Early Access Program 🚀
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the future of meme coin marketing and earn governance tokens
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 rounded-lg border bg-card">
              <Rocket className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">
                Early Adopter Benefits
              </h3>
              <p className="text-muted-foreground">
                Be among the first to use Memecook and receive governance tokens
                in our upcoming airdrop.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <Users className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">
                Community Governance
              </h3>
              <p className="text-muted-foreground">
                Shape the future of Memecook by participating in key platform
                decisions.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <Lock className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Exclusive Access</h3>
              <p className="text-muted-foreground">
                Get priority access to new features and templates before they re
                publicly released.
              </p>
            </div>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto bg-card p-8 rounded-lg border">
            <h2 className="text-2xl font-semibold">How to Participate</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-medium">Connect Your Wallet</h3>
                  <p className="text-muted-foreground">
                    Connect your Solana wallet to get started.
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
                    Set up your meme coin landing page using our templates.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Wait for Airdrop</h3>
                  <p className="text-muted-foreground">
                    Early users will automatically be eligible for the
                    governance token airdrop.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/">
              <Button size="lg" className="gap-2">
                Start Creating Now
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
