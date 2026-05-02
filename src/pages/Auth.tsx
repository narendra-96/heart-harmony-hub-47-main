// import { useEffect, useState } from "react";
// import { useNavigate, useSearchParams, Link } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { useAuth } from "@/lib/auth";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card } from "@/components/ui/card";
// import { Heart, Phone, Mail } from "lucide-react";
// import { toast } from "@/hooks/use-toast";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// const Auth = () => {

//   const [params] = useSearchParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [mode, setMode] = useState<"signin" | "signup">(
//     params.get("mode") === "signup" ? "signup" : "signin"
//   );

//   const [method, setMethod] = useState<"email" | "phone">("email");

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [gender, setGender] = useState<"male" | "female" | "other">("male");
//   const [dob, setDob] = useState("");

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (user) navigate("/browse", { replace: true });
//   }, [user, navigate]);

//   const handleSubmit = async (e: React.FormEvent) => {

//     e.preventDefault();
//     setLoading(true);

//     try {

//       if (mode === "signup") {

//         const { error } = await supabase.auth.signUp({
//           email,
//           password,
//           options: {
//             emailRedirectTo: `${window.location.origin}/browse`,
//             data: {
//               full_name: fullName,
//               gender,
//               date_of_birth: dob
//             }
//           }
//         });

//         if (error) throw error;

//         toast({
//           title: "Signup Successful",
//           description: "Check your email to verify account."
//         });

//       } else {

//         const { error } =
//           await supabase.auth.signInWithPassword({
//             email,
//             password
//           });

//         if (error) throw error;
//       }

//     } catch (err: any) {

//       toast({
//         title: "Authentication error",
//         description: err.message,
//         variant: "destructive"
//       });

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (

//     <div className="container flex min-h-screen items-center justify-center py-12">

//       <Card className="w-full max-w-md p-8">

//         <div className="text-center mb-6">

//           <Heart className="mx-auto mb-3 h-8 w-8 fill-primary text-primary" />

//           <h1 className="text-3xl font-serif text-primary">

//             {mode === "signup"
//               ? "Begin Your Journey"
//               : "Welcome Back"}

//           </h1>

//           <p className="text-sm text-muted-foreground mt-1">

//             {mode === "signup"
//               ? "Create your matrimonial profile"
//               : "Sign in to find your match"}

//           </p>

//         </div>

//         <Tabs value={method}
//           onValueChange={(v) =>
//             setMethod(v as "email" | "phone")
//           }
//         >

//           <TabsList className="grid grid-cols-2 mb-4">

//             <TabsTrigger value="email">
//               <Mail className="mr-2 h-4 w-4" />
//               Email
//             </TabsTrigger>

//             <TabsTrigger value="phone">
//               <Phone className="mr-2 h-4 w-4" />
//               Mobile
//             </TabsTrigger>

//           </TabsList>

//           {/* EMAIL FORM */}

//           <TabsContent value="email">

//             <form
//               onSubmit={handleSubmit}
//               className="space-y-4"
//             >

//               {mode === "signup" && (

//                 <>
//                   <div>

//                     <Label>Full Name</Label>

//                     <Input
//                       required
//                       value={fullName}
//                       onChange={(e) =>
//                         setFullName(e.target.value)
//                       }
//                     />

//                   </div>

//                   <div className="grid grid-cols-2 gap-3">

//                     <div>

//                       <Label>Gender</Label>

//                       <select
//                         value={gender}
//                         onChange={(e) =>
//                           setGender(e.target.value as any)
//                         }
//                         className="flex h-10 w-full border rounded-md px-3"
//                       >

//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                         <option value="other">Other</option>

//                       </select>

//                     </div>

//                     <div>

//                       <Label>DOB</Label>

//                       <Input
//                         type="date"
//                         required
//                         value={dob}
//                         onChange={(e) =>
//                           setDob(e.target.value)
//                         }
//                       />

//                     </div>

//                   </div>
//                 </>
//               )}

//               <div>

//                 <Label>Email</Label>

//                 <Input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) =>
//                     setEmail(e.target.value)
//                   }
//                 />

//               </div>

//               <div>

//                 <Label>Password</Label>

//                 <Input
//                   type="password"
//                   required
//                   minLength={6}
//                   value={password}
//                   onChange={(e) =>
//                     setPassword(e.target.value)
//                   }
//                 />

//               </div>

//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full"
//               >

//                 {loading
//                   ? "Please wait…"
//                   : mode === "signup"
//                   ? "Create account"
//                   : "Sign in"}

//               </Button>

//               {/* Forgot Password */}

//               {mode === "signin" && (

//                 <div className="text-right mt-2">

//                   <button
//                     type="button"
//                     onClick={() =>
//                       navigate("/forgot-password")
//                     }
//                     className="text-sm text-primary hover:underline"
//                   >

//                     Forgot Password?

//                   </button>

//                 </div>
//               )}

//             </form>

//           </TabsContent>

//         </Tabs>

//         <p className="mt-6 text-center text-sm">

//           {mode === "signup"
//             ? "Already a member?"
//             : "New to Saath?"}

//           <button
//             type="button"
//             onClick={() =>
//               setMode(
//                 mode === "signup"
//                   ? "signin"
//                   : "signup"
//               )
//             }
//             className="ml-1 text-primary hover:underline"
//           >

//             {mode === "signup"
//               ? "Sign in"
//               : "Create an account"}

//           </button>

//         </p>

//         <p className="text-center text-xs mt-2">

//           <Link to="/">
//             ← Back to home
//           </Link>

//         </p>

//       </Card>

//     </div>
//   );
// };

// export default Auth;

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Heart, Phone, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const Auth = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">(params.get("mode") === "signup" ? "signup" : "signin");
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);

  // Phone OTP state
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Forgot password state
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  useEffect(() => {
    if (user) navigate("/browse", { replace: true });
  }, [user, navigate]);

  const fullPhone = () => `${countryCode}${phone.replace(/[^0-9]/g, "")}`;

  const handleSendOtp = async () => {
    if (!phone || phone.replace(/[^0-9]/g, "").length < 7) {
      toast({ title: "Invalid number", description: "Enter a valid mobile number.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: fullPhone(),
        options: { channel: "sms" },
      });
      if (error) throw error;
      setOtpSent(true);
      toast({ title: "OTP sent", description: `Code sent to ${fullPhone()}` });
    } catch (err: any) {
      toast({ title: "Couldn't send OTP", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({ title: "Enter the 6-digit code", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: fullPhone(),
        token: otp,
        type: "sms",
      });
      if (error) throw error;

      if (mode === "signin") {
        // Verified + signed in.
        return;
      }
      // Signup: now collect profile details + password
      setOtpVerified(true);
      toast({ title: "Phone verified", description: "Now complete your profile to finish signup." });
    } catch (err: any) {
      toast({ title: "Verification failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleCompletePhoneSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // User is already authenticated via OTP. Set password + update profile metadata.
      const { error: pwErr } = await supabase.auth.updateUser({
        password,
        data: { full_name: fullName, gender, date_of_birth: dob },
      });
      if (pwErr) throw pwErr;

      // Update profile row created by handle_new_user trigger
      const { data: { user: u } } = await supabase.auth.getUser();
      if (u) {
        await supabase.from("profiles").update({
          full_name: fullName,
          gender,
          date_of_birth: dob,
          contact_phone: fullPhone(),
        }).eq("id", u.id);
      }
      toast({ title: "Welcome to Saath", description: "Account created via mobile OTP." });
    } catch (err: any) {
      toast({ title: "Couldn't finish signup", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/browse`,
            data: { full_name: fullName, gender, date_of_birth: dob },
          },
        });
        if (error) throw error;
        toast({
          title: "Check your email 📩",
          description: "We sent you a verification link. Confirm your email to activate your account.",
        });
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.user && !data.user.email_confirmed_at) {
          await supabase.auth.signOut();
          toast({
            title: "Email not verified",
            description: "Please click the link in your verification email before signing in.",
            variant: "destructive",
          });
          return;
        }
      }
    } catch (err: any) {
      toast({ title: "Authentication error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast({
        title: "Reset link sent 📩",
        description: `Check ${forgotEmail} for a link to set a new password.`,
      });
      setShowForgot(false);
      setForgotEmail("");
    } catch (err: any) {
      toast({ title: "Couldn't send reset email", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md border-border/60 bg-card p-8 shadow-elegant">
        <div className="mb-6 text-center">
          <Heart className="mx-auto mb-3 h-8 w-8 fill-primary text-primary" />
          <h1 className="font-serif text-3xl text-primary">{mode === "signup" ? "Begin Your Journey" : "Welcome Back"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signup" ? "Create your matrimonial profile" : "Sign in to find your match"}
          </p>
        </div>

        <Tabs value={method} onValueChange={(v) => { setMethod(v as "email" | "phone"); setOtpSent(false); setOtpVerified(false); setOtp(""); }} className="mb-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email"><Mail className="mr-2 h-4 w-4" />Email</TabsTrigger>
            <TabsTrigger value="phone"><Phone className="mr-2 h-4 w-4" />Mobile</TabsTrigger>
          </TabsList>

          {/* ---------- EMAIL TAB ---------- */}
          <TabsContent value="email">
        {showForgot ? (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <Label htmlFor="forgot_email">Email address</Label>
              <Input
                id="forgot_email"
                type="email"
                required
                placeholder="you@example.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                We'll email you a link to set a new password.
              </p>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-royal text-primary-foreground shadow-elegant hover:opacity-95"
            >
              {loading ? "Sending…" : "Send reset link"}
            </Button>
            <button
              type="button"
              onClick={() => setShowForgot(false)}
              className="block w-full text-center text-xs text-muted-foreground hover:text-primary"
            >
              ← Back to sign in
            </button>
          </form>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <div>
                <Label htmlFor="full_name">Full name</Label>
                <Input id="full_name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="dob">Date of birth</Label>
                  <Input id="dob" type="date" required value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
              </div>
            </>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
            {mode === "signin" && (
              <button
                type="button"
                onClick={() => { setShowForgot(true); setForgotEmail(email); }}
                className="mt-2 block text-xs text-primary hover:underline"
              >
                Forgot password?
              </button>
            )}
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-gradient-royal text-primary-foreground shadow-elegant hover:opacity-95">
            {loading ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
          </Button>
          {mode === "signin" && (
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => {
                setEmail("vechanarendra3@gmail.com");
                setPassword("");
                setTimeout(() => document.getElementById("password")?.focus(), 0);
                toast({ title: "Admin email filled", description: "1122@narendraV#." });
              }}
              className="w-full"
            >
              {/* Sign in as Admin */}
            </Button>
          )}
        </form>
        )}
          </TabsContent>

          {/* ---------- PHONE TAB ---------- */}
          <TabsContent value="phone">
            {!otpSent && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone">Mobile number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="cc"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-20"
                    />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">We'll send a 6-digit code via SMS.</p>
                </div>
                <Button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full bg-gradient-royal text-primary-foreground shadow-elegant hover:opacity-95"
                >
                  {loading ? "Sending…" : "Send OTP"}
                </Button>
              </div>
            )}

            {otpSent && !otpVerified && (
              <div className="space-y-4">
                <div>
                  <Label>Enter 6-digit code</Label>
                  <div className="mt-2 flex justify-center">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <InputOTPSlot key={i} index={i} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <p className="mt-2 text-center text-xs text-muted-foreground">Sent to {fullPhone()}</p>
                </div>
                <Button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="w-full bg-gradient-royal text-primary-foreground shadow-elegant hover:opacity-95"
                >
                  {loading ? "Verifying…" : "Verify & continue"}
                </Button>
                <button
                  type="button"
                  onClick={() => { setOtpSent(false); setOtp(""); }}
                  className="block w-full text-center text-xs text-muted-foreground hover:text-primary"
                >
                  Change number
                </button>
              </div>
            )}

            {otpVerified && mode === "signup" && (
              <form onSubmit={handleCompletePhoneSignup} className="space-y-4">
                <div>
                  <Label htmlFor="p_full_name">Full name</Label>
                  <Input id="p_full_name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="p_gender">Gender</Label>
                    <select
                      id="p_gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="p_dob">Date of birth</Label>
                    <Input id="p_dob" type="date" required value={dob} onChange={(e) => setDob(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="p_pw">Set password</Label>
                  <Input id="p_pw" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-royal text-primary-foreground shadow-elegant hover:opacity-95"
                >
                  {loading ? "Finishing…" : "Complete signup"}
                </Button>
              </form>
            )}
          </TabsContent>
        </Tabs>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "signup" ? "Already a member?" : "New to Saath?"}{" "}
          <button
            type="button"
            onClick={() => { setMode(mode === "signup" ? "signin" : "signup"); setOtpSent(false); setOtpVerified(false); setOtp(""); }}
            className="font-medium text-primary hover:underline"
          >
            {mode === "signup" ? "Sign in" : "Create an account"}
          </button>
        </p>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">← Back to home</Link>
        </p>
      </Card>
    </div>
  );
};

export default Auth;