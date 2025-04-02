
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import GrainBackground from '@/components/GrainBackground';
import Logo from '@/components/Logo';
import { CategoryTag, FACT_CATEGORIES } from '@/components/FactCategories';

const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  name: Yup.string().required('Name is required'),
});

const SignUp = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      if (step === 1) {
        setStep(2);
      } else {
        if (selectedCategories.length === 0) {
          toast({
            title: "Please select at least one category",
            description: "Choose categories to personalize your fact experience",
            variant: "destructive"
          });
          return;
        }
        
        // In a real app, this would send data to the backend
        console.log({
          ...values,
          categories: selectedCategories
        });
        
        toast({
          title: "Account created!",
          description: "Welcome to FactFlow! Your account has been created successfully.",
        });
        
        // Mock successful signup - in a real app, redirect after API response
        setTimeout(() => {
          window.location.href = '/facts';
        }, 1500);
      }
    },
  });

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <GrainBackground className="min-h-screen flex flex-col">
      <div className="container py-8">
        <header className="flex justify-between items-center mb-8">
          <Link to="/">
            <Logo />
          </Link>
          <Button variant="outline" asChild>
            <Link to="/login">Login</Link>
          </Button>
        </header>
        
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold tracking-tight">
              {step === 1 ? "Create your account" : "Select your interests"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {step === 1 
                ? "Sign up to discover amazing facts personalized for you."
                : "Choose categories to customize your fact experience."}
            </p>
          </motion.div>
          
          <form onSubmit={formik.handleSubmit}>
            {step === 1 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-sm text-destructive">{formik.errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-destructive">{formik.errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a secure password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-sm text-destructive">{formik.errors.password}</p>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <p className="text-sm text-muted-foreground mb-4">
                  Select at least one category (you can change this later)
                </p>
                <div className="flex flex-wrap gap-2">
                  {FACT_CATEGORIES.map((category) => (
                    <CategoryTag
                      key={category.id}
                      category={category}
                      selected={selectedCategories.includes(category.id)}
                      onClick={() => toggleCategory(category.id)}
                    />
                  ))}
                </div>
                {selectedCategories.length > 0 && (
                  <p className="text-sm">
                    <span className="font-medium">{selectedCategories.length}</span> categories selected
                  </p>
                )}
              </motion.div>
            )}
            
            <div className="mt-6 flex justify-between">
              {step === 2 && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
              )}
              <Button 
                type="submit" 
                className={step === 2 ? "ml-auto" : "w-full"}
              >
                {step === 1 ? "Continue" : "Create Account"}
              </Button>
            </div>
          </form>
          
          {step === 1 && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Login
              </Link>
            </p>
          )}
        </div>
      </div>
    </GrainBackground>
  );
};

export default SignUp;
