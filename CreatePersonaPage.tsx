import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Persona } from '../types';
import { User, Briefcase, Heart, ArrowLeft, Lightbulb, Plus, X } from 'lucide-react';

interface CreatePersonaPageProps {
  onCreatePersona: (persona: Persona) => void;
  onBack: () => void;
}

export const CreatePersonaPage: React.FC<CreatePersonaPageProps> = ({ onCreatePersona, onBack }) => {
  const [persona, setPersona] = useState<Persona>({
    name: '',
    age: '',
    profession: '',
    traits: '',
    backstory: '',
    hobbies: [],
    quirks: [],
  });

  const [errors, setErrors] = useState<Partial<Persona>>({});
  const [currentHobby, setCurrentHobby] = useState('');
  const [currentQuirk, setCurrentQuirk] = useState('');

  const validateForm = () => {
    const newErrors: Partial<Persona> = {};
    
    if (!persona.name.trim()) newErrors.name = 'Le nom est requis';
    if (!persona.age.trim()) newErrors.age = 'L\'âge est requis';
    if (!persona.profession.trim()) newErrors.profession = 'Le métier est requis';
    if (!persona.traits.trim()) newErrors.traits = 'Les traits sont requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onCreatePersona(persona);
    }
  };

  const handleInputChange = (field: keyof Persona, value: string) => {
    setPersona(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const addHobby = () => {
    if (currentHobby.trim() && !persona.hobbies?.includes(currentHobby.trim())) {
      setPersona(prev => ({
        ...prev,
        hobbies: [...(prev.hobbies || []), currentHobby.trim()]
      }));
      setCurrentHobby('');
    }
  };

  const removeHobby = (hobby: string) => {
    setPersona(prev => ({
      ...prev,
      hobbies: prev.hobbies?.filter(h => h !== hobby) || []
    }));
  };

  const addQuirk = () => {
    if (currentQuirk.trim() && !persona.quirks?.includes(currentQuirk.trim())) {
      setPersona(prev => ({
        ...prev,
        quirks: [...(prev.quirks || []), currentQuirk.trim()]
      }));
      setCurrentQuirk('');
    }
  };

  const removeQuirk = (quirk: string) => {
    setPersona(prev => ({
      ...prev,
      quirks: prev.quirks?.filter(q => q !== quirk) || []
    }));
  };

  const generateRandomPersona = () => {
    const names = ['Alex Martin', 'Sam Dubois', 'Jordan Chen', 'Riley Johnson', 'Casey Brown'];
    const ages = ['25 ans', '32 ans', 'la trentaine', '28 ans', 'fin vingtaine'];
    const professions = ['Architecte', 'Chef cuisinier', 'Développeur', 'Photographe', 'Musicien', 'Designer'];
    const traits = [
      'Extraverti et passionné de voyages',
      'Introverti mais très créatif',
      'Sportif et amateur de cuisine',
      'Artiste et collectionneur de vinyles',
      'Technophile et amateur de café'
    ];

    setPersona({
      name: names[Math.floor(Math.random() * names.length)],
      age: ages[Math.floor(Math.random() * ages.length)],
      profession: professions[Math.floor(Math.random() * professions.length)],
      traits: traits[Math.floor(Math.random() * traits.length)],
      backstory: '',
      hobbies: [],
      quirks: [],
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent mb-4">
            Créez Votre Persona
          </h1>
          <p className="text-gray-300">
            Inventez une identité fictive convaincante. Plus elle sera crédible, plus vous aurez de chances de tromper vos adversaires.
          </p>
        </div>

        <Card glow className="animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Quick Generate Button */}
            <div className="flex justify-center">
              <Button
                type="button"
                variant="secondary"
                onClick={generateRandomPersona}
                className="flex items-center space-x-2"
              >
                <Lightbulb className="w-4 h-4" />
                <span>Générer un Persona Aléatoire</span>
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-neon-purple" />
                <h3 className="text-lg font-semibold text-white">Identité de Base</h3>
              </div>
              
              <Input
                label="Nom Fictif"
                placeholder="ex: Marie Dubois, Alex Chen..."
                value={persona.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}

              <Input
                label="Âge"
                placeholder="ex: 28 ans, la trentaine..."
                value={persona.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className={errors.age ? 'border-red-500' : ''}
              />
              {errors.age && <p className="text-red-400 text-sm">{errors.age}</p>}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="w-5 h-5 text-neon-cyan" />
                <h3 className="text-lg font-semibold text-white">Profession</h3>
              </div>
              
              <Input
                label="Métier"
                placeholder="ex: Architecte, Chef cuisinier, Développeur..."
                value={persona.profession}
                onChange={(e) => handleInputChange('profession', e.target.value)}
                className={errors.profession ? 'border-red-500' : ''}
              />
              {errors.profession && <p className="text-red-400 text-sm">{errors.profession}</p>}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-5 h-5 text-neon-purple" />
                <h3 className="text-lg font-semibold text-white">Personnalité</h3>
              </div>
              
              <Textarea
                label="Traits de Personnalité"
                placeholder="ex: Extraverti, passionné de voyages, collectionne les vinyles vintage..."
                rows={3}
                value={persona.traits}
                onChange={(e) => handleInputChange('traits', e.target.value)}
                className={errors.traits ? 'border-red-500' : ''}
              />
              {errors.traits && <p className="text-red-400 text-sm">{errors.traits}</p>}

              <Textarea
                label="Histoire Personnelle (Optionnel)"
                placeholder="ex: Né à Lyon, a vécu 3 ans au Japon, collectionne les appareils photo vintage..."
                rows={3}
                value={persona.backstory || ''}
                onChange={(e) => handleInputChange('backstory', e.target.value)}
              />
            </div>

            {/* Hobbies */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-white">Loisirs (Optionnel)</h4>
              <div className="flex space-x-2">
                <Input
                  placeholder="Ajouter un loisir..."
                  value={currentHobby}
                  onChange={(e) => setCurrentHobby(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHobby())}
                />
                <Button type="button" onClick={addHobby} disabled={!currentHobby.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {persona.hobbies && persona.hobbies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {persona.hobbies.map((hobby, index) => (
                    <span
                      key={index}
                      className="bg-neon-purple/20 text-neon-purple px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      <span>{hobby}</span>
                      <button
                        type="button"
                        onClick={() => removeHobby(hobby)}
                        className="hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quirks */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-white">Petites Manies (Optionnel)</h4>
              <div className="flex space-x-2">
                <Input
                  placeholder="Ajouter une manie..."
                  value={currentQuirk}
                  onChange={(e) => setCurrentQuirk(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addQuirk())}
                />
                <Button type="button" onClick={addQuirk} disabled={!currentQuirk.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {persona.quirks && persona.quirks.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {persona.quirks.map((quirk, index) => (
                    <span
                      key={index}
                      className="bg-neon-cyan/20 text-neon-cyan px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      <span>{quirk}</span>
                      <button
                        type="button"
                        onClick={() => removeQuirk(quirk)}
                        className="hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-dark-surface border border-gray-600 rounded-lg p-4">
              <h4 className="text-sm font-medium text-neon-cyan mb-2">💡 Conseils pour un bon persona</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Soyez spécifique mais pas trop détaillé</li>
                <li>• Mélangez vérité et fiction pour plus de crédibilité</li>
                <li>• Pensez à des détails que vous pourrez développer en conversation</li>
                <li>• Évitez les clichés trop évidents</li>
                <li>• Préparez des anecdotes cohérentes avec votre personnage</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                className="flex items-center space-x-2"
                onClick={onBack}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour</span>
              </Button>
              <Button
                type="submit"
                glow
                className="flex-1"
              >
                Valider Mon Persona
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};