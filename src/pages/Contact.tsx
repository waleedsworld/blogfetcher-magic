import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const emptyForm: FormState = { name: '', email: '', message: '' };
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const Contact = () => {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = 'Please tell us your name.';
    if (!isEmail(form.email)) next.email = 'A valid email helps us reply.';
    if (form.message.trim().length < 10) next.message = 'A little more detail, please (10+ characters).';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulated send — swap for a real endpoint when the backend is wired up.
    setTimeout(() => {
      setSubmitting(false);
      setForm(emptyForm);
      toast.success("Thanks! We'll be in touch within one business day.");
    }, 700);
  };

  const update = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-14"
        >
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Questions about licensing, bulk orders, or a blog topic you want us
            to cover? Drop us a line.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <ContactRow icon={<Mail className="h-5 w-5" />} label="Email" value="contact@digitalsoftwareplanet.com" />
            <ContactRow icon={<Phone className="h-5 w-5" />} label="Phone" value="+1 (555) 123-4567" />
            <ContactRow icon={<MapPin className="h-5 w-5" />} label="Hours" value="Mon–Fri, 9am–6pm" />
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-3 bg-background border rounded-2xl p-8 shadow-sm space-y-5"
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name} onChange={update('name')} className="mt-1.5" placeholder="Ada Lovelace" />
              {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={update('email')} className="mt-1.5" placeholder="you@company.com" />
              {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" value={form.message} onChange={update('message')} className="mt-1.5 min-h-32" placeholder="How can we help?" />
              {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
            </div>
            <Button type="submit" disabled={submitting} className="w-full rounded-full py-6 text-base">
              {submitting ? 'Sending…' : 'Send message'}
            </Button>
          </motion.form>
        </div>
      </div>
    </Layout>
  );
};

const ContactRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-start gap-4 p-5 rounded-xl bg-secondary/30">
    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-primary">{label}</p>
      <p className="text-muted-foreground break-all">{value}</p>
    </div>
  </div>
);

export default Contact;
