import { useState } from "react";
import { Link } from "react-router-dom";
import { Film, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPass, setSignupPass] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Auth will be connected with Lovable Cloud backend");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Auth will be connected with Lovable Cloud backend");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
            <Film size={22} className="text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold text-gradient-gold">CineVault</span>
        </Link>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <Tabs defaultValue="login">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="login" className="flex-1">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="flex-1">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} type="email" placeholder="you@example.com" className="pl-9" />
                    </div>
                  </div>
                  <div>
                    <Label>Password</Label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input value={loginPass} onChange={(e) => setLoginPass(e.target.value)} type="password" placeholder="••••••••" className="pl-9" />
                    </div>
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    Sign In <ArrowRight size={16} />
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input value={signupName} onChange={(e) => setSignupName(e.target.value)} placeholder="Your name" className="pl-9" />
                    </div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} type="email" placeholder="you@example.com" className="pl-9" />
                    </div>
                  </div>
                  <div>
                    <Label>Password</Label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input value={signupPass} onChange={(e) => setSignupPass(e.target.value)} type="password" placeholder="••••••••" className="pl-9" />
                    </div>
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    Create Account <ArrowRight size={16} />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
