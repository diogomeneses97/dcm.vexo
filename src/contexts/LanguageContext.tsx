'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'pt' | 'es' | 'fr' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.training': 'Training',
    'nav.nutrition': 'Nutrition',
    'nav.scanner': 'Scanner',
    'nav.community': 'Community',
    'nav.progress': 'Progress',
    'nav.profile': 'Profile',
    
    // Home
    'home.welcome': 'Welcome to DCM VEXO',
    'home.subtitle': 'The aesthetic-performance OS for your body',
    'home.todayWorkout': "Today's Workout",
    'home.nutrition': 'Nutrition',
    'home.streak': 'Day Streak',
    'home.quote': 'Daily Quote',
    'home.scanFood': 'Scan Food',
    'home.viewProgram': 'View Full Program',
    'home.logMeal': 'Log Meal',
    
    // Training
    'training.title': 'Your Training Program',
    'training.week': 'Week',
    'training.day': 'Day',
    'training.rest': 'Rest Day',
    'training.exercises': 'exercises',
    'training.startWorkout': 'Start Workout',
    'training.completed': 'Completed',
    
    // Nutrition
    'nutrition.title': 'Nutrition Plan',
    'nutrition.dailyGoals': 'Daily Goals',
    'nutrition.calories': 'Calories',
    'nutrition.protein': 'Protein',
    'nutrition.carbs': 'Carbs',
    'nutrition.fats': 'Fats',
    'nutrition.meals': 'Meals',
    'nutrition.breakfast': 'Breakfast',
    'nutrition.lunch': 'Lunch',
    'nutrition.dinner': 'Dinner',
    'nutrition.snack': 'Snack',
    
    // Scanner
    'scanner.title': 'Food Scanner',
    'scanner.subtitle': 'Take a photo to analyze calories and macros',
    'scanner.takePhoto': 'Take Photo',
    'scanner.analyzing': 'Analyzing...',
    'scanner.detected': 'Detected',
    'scanner.save': 'Save to Log',
    'scanner.history': 'Scan History',
    
    // Community
    'community.title': 'Community',
    'community.challenges': 'Weekly Challenges',
    'community.leaderboard': 'Leaderboard',
    'community.join': 'Join Challenge',
    'community.participants': 'participants',
    
    // Progress
    'progress.title': 'Your Progress',
    'progress.weight': 'Weight',
    'progress.bodyFat': 'Body Fat',
    'progress.photos': 'Progress Photos',
    'progress.measurements': 'Measurements',
    'progress.addEntry': 'Add Entry',
    
    // Subscription
    'sub.free': 'Free',
    'sub.premium': 'Premium',
    'sub.upgrade': 'Upgrade to Premium',
    'sub.month': '/month',
    'sub.features': 'Features',
    'sub.unlimitedWorkouts': 'Unlimited Workouts',
    'sub.unlimitedScans': 'Unlimited Food Scans',
    'sub.fullCommunity': 'Full Community Access',
    'sub.personalizedPlans': 'Personalized Plans',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.close': 'Close',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.finish': 'Finish',
  },
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.training': 'Treino',
    'nav.nutrition': 'Nutrição',
    'nav.scanner': 'Scanner',
    'nav.community': 'Comunidade',
    'nav.progress': 'Progresso',
    'nav.profile': 'Perfil',
    
    // Home
    'home.welcome': 'Bem-vindo ao DCM VEXO',
    'home.subtitle': 'O OS estético-performance para seu corpo',
    'home.todayWorkout': 'Treino de Hoje',
    'home.nutrition': 'Nutrição',
    'home.streak': 'Dias Seguidos',
    'home.quote': 'Frase do Dia',
    'home.scanFood': 'Escanear Comida',
    'home.viewProgram': 'Ver Programa Completo',
    'home.logMeal': 'Registrar Refeição',
    
    // Training
    'training.title': 'Seu Programa de Treino',
    'training.week': 'Semana',
    'training.day': 'Dia',
    'training.rest': 'Dia de Descanso',
    'training.exercises': 'exercícios',
    'training.startWorkout': 'Iniciar Treino',
    'training.completed': 'Concluído',
    
    // Nutrition
    'nutrition.title': 'Plano Nutricional',
    'nutrition.dailyGoals': 'Metas Diárias',
    'nutrition.calories': 'Calorias',
    'nutrition.protein': 'Proteína',
    'nutrition.carbs': 'Carboidratos',
    'nutrition.fats': 'Gorduras',
    'nutrition.meals': 'Refeições',
    'nutrition.breakfast': 'Café da Manhã',
    'nutrition.lunch': 'Almoço',
    'nutrition.dinner': 'Jantar',
    'nutrition.snack': 'Lanche',
    
    // Scanner
    'scanner.title': 'Scanner de Alimentos',
    'scanner.subtitle': 'Tire uma foto para analisar calorias e macros',
    'scanner.takePhoto': 'Tirar Foto',
    'scanner.analyzing': 'Analisando...',
    'scanner.detected': 'Detectado',
    'scanner.save': 'Salvar no Registro',
    'scanner.history': 'Histórico de Scans',
    
    // Community
    'community.title': 'Comunidade',
    'community.challenges': 'Desafios Semanais',
    'community.leaderboard': 'Classificação',
    'community.join': 'Participar do Desafio',
    'community.participants': 'participantes',
    
    // Progress
    'progress.title': 'Seu Progresso',
    'progress.weight': 'Peso',
    'progress.bodyFat': 'Gordura Corporal',
    'progress.photos': 'Fotos de Progresso',
    'progress.measurements': 'Medidas',
    'progress.addEntry': 'Adicionar Entrada',
    
    // Subscription
    'sub.free': 'Grátis',
    'sub.premium': 'Premium',
    'sub.upgrade': 'Upgrade para Premium',
    'sub.month': '/mês',
    'sub.features': 'Recursos',
    'sub.unlimitedWorkouts': 'Treinos Ilimitados',
    'sub.unlimitedScans': 'Scans Ilimitados',
    'sub.fullCommunity': 'Acesso Total à Comunidade',
    'sub.personalizedPlans': 'Planos Personalizados',
    
    // Common
    'common.loading': 'Carregando...',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Excluir',
    'common.edit': 'Editar',
    'common.close': 'Fechar',
    'common.next': 'Próximo',
    'common.previous': 'Anterior',
    'common.finish': 'Finalizar',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.training': 'Entrenamiento',
    'nav.nutrition': 'Nutrición',
    'nav.scanner': 'Escáner',
    'nav.community': 'Comunidad',
    'nav.progress': 'Progreso',
    'nav.profile': 'Perfil',
    'home.welcome': 'Bienvenido a DCM VEXO',
    'home.subtitle': 'El OS estético-rendimiento para tu cuerpo',
    'common.loading': 'Cargando...',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.training': 'Entraînement',
    'nav.nutrition': 'Nutrition',
    'nav.scanner': 'Scanner',
    'nav.community': 'Communauté',
    'nav.progress': 'Progrès',
    'nav.profile': 'Profil',
    'home.welcome': 'Bienvenue à DCM VEXO',
    'home.subtitle': 'Le système d\'exploitation esthétique-performance pour votre corps',
    'common.loading': 'Chargement...',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.training': 'Training',
    'nav.nutrition': 'Ernährung',
    'nav.scanner': 'Scanner',
    'nav.community': 'Community',
    'nav.progress': 'Fortschritt',
    'nav.profile': 'Profil',
    'home.welcome': 'Willkommen bei DCM VEXO',
    'home.subtitle': 'Das ästhetische-Leistungs-Betriebssystem für Ihren Körper',
    'common.loading': 'Laden...',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('dcm-vexo-language') as Language;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (mounted) {
      localStorage.setItem('dcm-vexo-language', lang);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
