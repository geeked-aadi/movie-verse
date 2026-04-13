import { useState } from "react";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center pt-16 px-4">
      <div className="w-full max-w-sm space-y-6 rounded-lg border border-border bg-card p-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Star className="h-8 w-8 fill-primary text-primary" />
            <span className="text-2xl font-bold text-primary" style={{ fontFamily: "'Englebert', cursive" }}>MovieVerse</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {isRegister ? "Create your account" : "Welcome back"}
          </p>
        </div>

        <div className="space-y-4">
          {isRegister && (
            <div>
              <Label className="text-foreground">Full Name</Label>
              <Input className="bg-panel border-border text-foreground" placeholder="John Doe" />
            </div>
          )}
          <div>
            <Label className="text-foreground">Email</Label>
            <Input type="email" className="bg-panel border-border text-foreground" placeholder="you@example.com" />
          </div>
          <div>
            <Label className="text-foreground">Password</Label>
            <Input type="password" className="bg-panel border-border text-foreground" placeholder="••••••••" />
          </div>
          <Button className="w-full gold-gradient text-primary-foreground font-semibold hover:opacity-90">
            {isRegister ? "Create Account" : "Sign In"}
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsRegister(!isRegister)} className="text-primary hover:underline font-medium">
            {isRegister ? "Sign In" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}
