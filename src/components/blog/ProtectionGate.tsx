import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { matchesProtection } from "@/lib/protection";
import type { Protection } from "@/types/blog";

interface ProtectionGateProps {
  protection: Protection;
  onUnlock: (credential: string) => void;
}

const ProtectionGate: React.FC<ProtectionGateProps> = ({ protection, onUnlock }) => {
  const [credential, setCredential] = useState("");
  const [error, setError] = useState("");
  const isPassword = protection.type === "password";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (matchesProtection(credential, protection)) {
      setError("");
      onUnlock(credential);
    } else {
      setError(protection.errorMessage || "Incorrect, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-94">
      <div className="w-full max-w-sm p-8 rounded-lg shadow-lg border border-brand bg-white">
        <form onSubmit={handleSubmit}>
          <label htmlFor="credential" className="block text-lg font-medium text-brand mb-4 text-center">
            {protection.label}
          </label>
          <input
            id="credential"
            type={isPassword ? "password" : "text"}
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder={protection.placeholder || (isPassword ? "Password" : "Your Name")}
            className="border border-brand px-3 py-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-brand text-center"
            required
            autoFocus
          />
          {protection.message && (
            <div className="text-sm text-brand mb-4 text-center whitespace-pre-line">
              {protection.message}
            </div>
          )}
          <Button type="submit" className="w-full bg-brand text-white hover:bg-brand-20">Enter</Button>
        </form>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ProtectionGate;
