import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { useAuth } from '../hooks/useAuth';
import { Eye, LogIn, Shield, Users, UserPlus, Mail, Lock, User } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { signIn, signUp, loading, error, clearError } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email invalide';
    }
    
    if (!formData.password) {
      errors.password = 'Mot de passe requis';
    } else if (formData.password.length < 6) {
      errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    if (isSignUp) {
      if (!formData.displayName.trim()) {
        errors.displayName = 'Nom requis';
      }
      
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      clearError();
      
      if (isSignUp) {
        await signUp(formData.email, formData.password, formData.displayName);
      } else {
        await signIn(formData.email, formData.password);
      }
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (error) clearError();
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ email: '', password: '', confirmPassword: '', displayName: '' });
    setFormErrors({});
    clearError();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Eye className="w-12 h-12 text-neon-purple mr-4" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
              Persona Echo
            </h1>
          </div>
          <p className="text-gray-300 mb-6">
            {isSignUp 
              ? 'Créez votre compte pour commencer à jouer'
              : 'Connectez-vous pour accéder à vos parties'
            }
          </p>
        </div>

        <Card glow className="animate-slide-up">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-4">
                {isSignUp ? 'Créer un Compte' : 'Connexion'}
              </h2>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <Input
                    label="Nom d'utilisateur"
                    placeholder="Votre nom d'utilisateur"
                    value={formData.displayName}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                    className={formErrors.displayName ? 'border-red-500' : ''}
                  />
                  {formErrors.displayName && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.displayName}</p>
                  )}
                </div>
              )}

              <div>
                <Input
                  label="Email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={formErrors.email ? 'border-red-500' : ''}
                />
                {formErrors.email && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <Input
                  label="Mot de passe"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={formErrors.password ? 'border-red-500' : ''}
                />
                {formErrors.password && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.password}</p>
                )}
              </div>

              {isSignUp && (
                <div>
                  <Input
                    label="Confirmer le mot de passe"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={formErrors.confirmPassword ? 'border-red-500' : ''}
                  />
                  {formErrors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.confirmPassword}</p>
                  )}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                glow
                size="lg"
                className="w-full flex items-center justify-center space-x-2"
              >
                {isSignUp ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                <span>
                  {loading 
                    ? (isSignUp ? 'Création...' : 'Connexion...') 
                    : (isSignUp ? 'Créer le Compte' : 'Se Connecter')
                  }
                </span>
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={toggleMode}
                className="text-neon-cyan hover:text-neon-purple transition-colors text-sm"
              >
                {isSignUp 
                  ? 'Déjà un compte ? Se connecter'
                  : 'Pas de compte ? Créer un compte'
                }
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-600">
              <div className="text-center">
                <Shield className="w-6 h-6 text-neon-cyan mx-auto mb-2" />
                <p className="text-xs text-gray-400">Sécurisé</p>
              </div>
              <div className="text-center">
                <Users className="w-6 h-6 text-neon-purple mx-auto mb-2" />
                <p className="text-xs text-gray-400">Multijoueur</p>
              </div>
              <div className="text-center">
                <Eye className="w-6 h-6 text-neon-cyan mx-auto mb-2" />
                <p className="text-xs text-gray-400">Temps réel</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            En créant un compte, vous acceptez nos conditions d'utilisation et notre politique de confidentialité
          </p>
        </div>
      </div>
    </div>
  );
};