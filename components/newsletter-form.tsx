"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { subscribeToNewsletter } from "@/actions/newletter/subscribe";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const result = await subscribeToNewsletter(email);
      if (result.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Failed to subscribe. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={status === "loading" || status === "success"}
          >
            {status === "loading"
              ? "Joining..."
              : status === "success"
                ? "Joined!"
                : "Join Waitlist"}
          </Button>
        </div>
        {status === "error" && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
        {status === "success" && (
          <p className="text-sm text-green-500">
            Thanks for joining! We&apos;ll keep you updated.
          </p>
        )}
      </form>
    </div>
  );
}
