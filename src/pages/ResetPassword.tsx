import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

import { toast } from "@/hooks/use-toast";

const ResetPassword = () => {

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (password !== confirmPassword) {

      toast({
        title: "Passwords do not match",
        variant: "destructive"
      });

      return;
    }

    setLoading(true);

    try {

      const { error } =
        await supabase.auth.updateUser({
          password: password,
        });

      if (error) throw error;

      toast({
        title: "Password Updated",
        description: "You can now login with new password.",
      });

      navigate("/auth");

    } catch (err: any) {

      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="flex justify-center items-center min-h-screen">

      <Card className="w-full max-w-md p-6">

        <h2 className="text-xl font-semibold text-center mb-4">
          Reset Password
        </h2>

        <form
          onSubmit={handleResetPassword}
          className="space-y-4"
        >

          <div>

            <Label>New Password</Label>

            <Input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          <div>

            <Label>Confirm Password</Label>

            <Input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >

            {loading
              ? "Updating..."
              : "Update Password"}

          </Button>

        </form>

      </Card>

    </div>
  );
};

export default ResetPassword;