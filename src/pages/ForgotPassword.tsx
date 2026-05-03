import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {

    e.preventDefault();
    setLoading(true);

    try {

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          email,
          {
            redirectTo:
              `${window.location.origin}/reset-password`
          }
        );

      if (error) throw error;

      toast({
        title: "Reset Email Sent",
        description:
          "Check your email to reset password."
      });

    } catch (err: any) {

      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="flex justify-center items-center min-h-screen">

      <Card className="w-full max-w-md p-6">

        <h2 className="text-xl text-center mb-4">
          Forgot Password
        </h2>

        <form
          onSubmit={handleReset}
          className="space-y-4"
        >

          <div>

            <Label>Email</Label>

            <Input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >

            {loading
              ? "Sending..."
              : "Send Reset Link"}

          </Button>

        </form>

      </Card>

    </div>
  );
};

export default ForgotPassword;
