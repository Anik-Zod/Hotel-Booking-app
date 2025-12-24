import React, { useState } from 'react';
import { authClient } from '../../../lib/auth-client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2, UserPlus, Mail, Lock, User,
  ShieldCheck, Check, Eye, EyeOff, AlertCircle, ArrowRight
} from 'lucide-react';

function NewUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isFormValid =
    formData.name.length > 1 &&
    isEmailValid &&
    formData.password.length >= 8;

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const { error } = await authClient.admin.createUser(formData);
      if (error) throw new Error(error.message);
      setStatus({ type: 'success', message: 'User created successfully' });
      setFormData({ name: '', email: '', password: '', role: 'user' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'System error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[35vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl rounded-[2rem] overflow-hidden border
                   bg-[var(--color-bg)]
                   border-[var(--color-bg-dull)]
                   shadow-xl flex"
      >
        {/* LEFT BRAND */}
        <div
          className="hidden lg:flex w-2/5 p-8 flex-col justify-between relative"
          style={{ background: 'var(--color-primary)' }}
        >
          <div className="relative z-10">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              <UserPlus className="w-5 h-5 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-white leading-tight">
              Identity <br /> Management
            </h2>
            <p className="text-sm mt-3 text-white/80">
              Secure role-based access
            </p>
          </div>

          <div className="space-y-3 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" /> Instant credentials
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" /> Encrypted access
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="flex-1 p-6 md:p-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-bold text-[var(--color-textColor)]">
                New Account
              </h1>
              <p className="text-sm text-[var(--color-textDull)]">
                Credentials & Role
              </p>
            </div>
            <span
              className="px-3 py-1 text-[10px] font-bold uppercase rounded-full"
              style={{
                background: 'var(--color-bg-dull)',
                color: 'var(--color-textDull)',
              }}
            >
              Admin
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-3 rounded-xl text-sm flex items-center gap-2
                    ${
                      status.type === 'success'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-rose-500/10 text-rose-400'
                    }`}
                >
                  {status.type === 'success' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>

            {/* INPUTS */}
            <div className="space-y-4">
              {[
                { label: 'Full Name', icon: User, name: 'name', type: 'text' },
                { label: 'Email', icon: Mail, name: 'email', type: 'email' },
              ].map(({ label, icon: Icon, name, type }) => (
                <div key={name}>
                  <label className="text-xs font-bold uppercase text-[var(--color-textDull)]">
                    {label}
                  </label>
                  <div className="relative">
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-textDull)]" />
                    <input
                      name={name}
                      type={type}

                       placeholder={label === 'Email' ? 'Enter Email' : 'Enter Full Name'}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 rounded-xl outline-none
                                 bg-[var(--color-bg-dull)]
                                 text-[var(--color-textColor)]"
                    />
                  </div>
                </div>
              ))}

              <div className="grid md:grid-cols-2 gap-4">
                {/* PASSWORD */}
                <div>
                  <label className="text-xs font-bold uppercase text-[var(--color-textDull)]">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-textDull)]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder='Set Password'
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-11 pr-10 py-3 rounded-xl outline-none
                                 bg-[var(--color-bg-dull)]
                                 text-[var(--color-textColor)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-textDull)]"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* ROLE */}
                <div>
                  <label className="text-xs font-bold uppercase text-[var(--color-textDull)]">
                    Role
                  </label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-textDull)]" />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 rounded-xl outline-none
                                 bg-[var(--color-bg-dull)]
                                 text-[var(--color-textColor)]"
                    >
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <motion.button
              type="submit"
              disabled={!isFormValid || isLoading}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2
                         text-white"
              style={{
                background: isFormValid
                  ? 'var(--color-primary)'
                  : 'var(--color-bg-dull)',
                opacity: isFormValid ? 1 : 0.6,
              }}
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <>
                  Create User <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default NewUser;
