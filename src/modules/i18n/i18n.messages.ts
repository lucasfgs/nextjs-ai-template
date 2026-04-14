import type { Locale } from './i18n.constants'

export const enMessages = {
  app: {
    description:
      'A production-ready Next.js AI starter template with auth, email, and modular architecture.',
  },
  localeSwitcher: {
    label: 'Language',
  },
  metadata: {
    pages: {
      signIn: { title: 'Sign In' },
      signUp: { title: 'Sign Up' },
      forgotPassword: { title: 'Forgot Password' },
      resetPassword: { title: 'Reset Password' },
      verifyEmail: { title: 'Verify Email' },
      dashboard: { title: 'Dashboard' },
      settings: { title: 'Settings' },
      settingsProfile: { title: 'Profile Settings' },
      settingsSecurity: { title: 'Security Settings' },
      settingsBilling: { title: 'Billing Settings' },
    },
  },
  common: {
    email: 'Email',
    password: 'Password',
    fullName: 'Full name',
    signIn: 'Sign in',
    signUp: 'Sign up',
    getStarted: 'Get started',
    toggleTheme: 'Toggle theme',
    saveChanges: 'Save changes',
    saving: 'Saving…',
    backToSignIn: 'Back to sign in',
    settings: 'Settings',
    profile: 'Profile',
    security: 'Security',
    billing: 'Billing',
    dashboard: 'Dashboard',
    statusLabel: 'Status: {status}',
    currentSubscription: 'Current subscription',
    noActiveSubscription: 'No active subscription',
    notAvailableYet: 'Not available yet',
    recently: 'Recently',
    complete: 'Complete',
    pending: 'Pending',
    healthy: 'Healthy',
    actionNeeded: 'Action needed',
    optional: 'Optional',
  },
  validation: {
    invalidInput: 'Invalid input',
    invalidEmailAddress: 'Invalid email address',
    passwordRequired: 'Password is required',
    passwordMinLength: 'Password must be at least 8 characters',
    passwordMaxLength: 'Password must be less than 100 characters',
    passwordUppercase: 'Password must contain at least one uppercase letter',
    passwordNumber: 'Password must contain at least one number',
    passwordsDoNotMatch: 'Passwords do not match',
    nameMinLength: 'Name must be at least 2 characters',
    nameMaxLength: 'Name must be less than 100 characters',
    invalidImageUrl: 'Invalid image URL',
    unauthorized: 'Unauthorized',
    invalidToken: 'Invalid token',
  },
  layout: {
    workspace: 'Workspace',
    readyToCustomize: 'Ready to customize',
    sidebarSummary: 'Manage profile, security, and billing from a focused command rail.',
    overviewHome: 'Overview home',
    footerRights: 'All rights reserved.',
  },
  navigation: {
    sections: {
      overview: 'Overview',
      account: 'Account',
    },
    items: {
      dashboard: {
        label: 'Dashboard',
        description: 'See your account pulse and recommended next steps.',
      },
      settings: {
        label: 'Settings',
        description: 'View your account sections and overall preferences.',
      },
      profile: {
        label: 'Profile',
        description: 'Update your name, avatar, and personal details.',
      },
      security: {
        label: 'Security',
        description: 'Track password and account protection updates.',
      },
      billing: {
        label: 'Billing',
        description: 'Manage plans, subscriptions, and payment access.',
      },
    },
  },
  pageContext: {
    dashboard: {
      eyebrow: 'Overview',
      title: 'Dashboard',
      description: 'See your account readiness, recent milestones, and suggested next steps.',
    },
    settings: {
      eyebrow: 'Settings',
      title: 'Account settings',
      description: 'Jump into profile, billing, and security controls from one place.',
    },
    profile: {
      eyebrow: 'Settings',
      title: 'Profile',
      description: 'Update your personal details and keep your workspace polished.',
    },
    security: {
      eyebrow: 'Settings',
      title: 'Security',
      description: 'Review the latest account protections and upcoming security tools.',
    },
    billing: {
      eyebrow: 'Settings',
      title: 'Billing',
      description: 'Manage your plan, subscription status, and payment access.',
    },
  },
  auth: {
    pages: {
      signIn: {
        title: 'Sign in',
        description: 'Enter your credentials to access your account',
      },
      signUp: {
        title: 'Create an account',
        description: 'Start your journey today',
      },
      forgotPassword: {
        title: 'Forgot password?',
        description: "Enter your email and we'll send you a reset link",
      },
      resetPassword: {
        title: 'Reset password',
        description: 'Enter your new password below',
      },
      verifyEmail: {
        invalidLink: 'Invalid verification link.',
        successLink: 'Sign in',
      },
    },
    forms: {
      orContinueWith: 'Or continue with',
      forgotPassword: 'Forgot password?',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      minPasswordHint: 'Min 8 characters, one uppercase, one number',
      confirmPassword: 'Confirm password',
      newPassword: 'New password',
      confirmNewPassword: 'Confirm new password',
      sendResetLink: 'Send reset link',
      sending: 'Sending…',
      resetPassword: 'Reset password',
      resetting: 'Resetting…',
      createAccount: 'Create account',
      creatingAccount: 'Creating account…',
      signingIn: 'Signing in…',
      continueWithGoogle: 'Continue with Google',
      continueWithGitHub: 'Continue with GitHub',
    },
    actions: {
      signedInSuccessfully: 'Signed in successfully',
      invalidEmailOrPassword: 'Invalid email or password',
      somethingWentWrong: 'Something went wrong. Please try again.',
      accountAlreadyExists: 'An account with this email already exists',
      accountCreated: 'Account created! Please check your email to verify your account.',
      ifAccountExists: 'If an account exists, a reset link has been sent.',
      emailSendFailed: 'We could not send the reset email. Please try again.',
      resetPasswordEmailSubject: 'Reset your password',
      invalidOrExpiredResetToken: 'Invalid or expired reset token',
      resetTokenExpired: 'Reset token has expired. Please request a new one.',
      passwordResetSuccessfully: 'Password reset successfully. You can now sign in.',
      invalidOrExpiredVerificationToken: 'Invalid or expired verification token',
      verificationTokenExpired: 'Verification token has expired. Please request a new one.',
      emailVerifiedSuccessfully: 'Email verified successfully! You can now sign in.',
    },
  },
  userMenu: {
    openUserMenu: 'Open user menu',
    yourAccount: 'Your account',
    signOut: 'Sign out',
  },
  profile: {
    page: {
      title: 'Profile',
      description: 'Update your personal information',
    },
    form: {
      emailCannotBeChanged: 'Email cannot be changed',
    },
    actions: {
      profileUpdatedSuccessfully: 'Profile updated successfully',
    },
  },
  security: {
    page: {
      title: 'Security',
      description: 'Manage your password and active sessions',
      comingSoon: 'Password change and session management coming soon.',
    },
  },
  billing: {
    page: {
      title: 'Billing',
      description: 'Manage your plan and payment details',
      startPlan: 'Start {planName}',
      openBillingPortal: 'Open billing portal',
    },
    plans: {
      free: {
        name: 'Free',
        description: 'Start with the free plan and upgrade anytime.',
        features: ['Core app access', 'Email support'],
      },
      premium: {
        name: 'Premium',
        description: 'Unlock premium capabilities for growing teams.',
        features: ['Priority support', 'Advanced workflows', 'Premium features'],
      },
      pro: {
        name: 'Pro',
        description: 'Best for power users who need the full experience.',
        features: ['Everything in Premium', 'Pro features', 'Billing portal access'],
      },
    },
    planNames: {
      FREE: 'Free',
      PREMIUM: 'Premium',
      PRO: 'Pro',
    },
    subscriptionStatuses: {
      ACTIVE: 'Active',
      TRIALING: 'Trialing',
      INACTIVE: 'Inactive',
      PAST_DUE: 'Past due',
      CANCELED: 'Canceled',
      UNPAID: 'Unpaid',
    },
  },
  template: {
    home: {
      eyebrow: 'AI orchestration starter',
      titleSuffix:
        'Use this template to bootstrap new products with a clear module structure, strong auth foundations, and AI-friendly project context.',
    },
    settings: {
      title: 'Settings',
      description: 'Manage your account settings',
    },
    dashboard: {
      completionMessage:
        'Everything essential is in place. Use the dashboard as a calm launch point for account management and day-to-day progress.',
      inProgressMessage:
        'Track the essentials at a glance, finish your setup, and jump back into the areas that matter most without hunting through the app.',
      executiveOverview: 'Executive overview',
      emailVerified: 'Email verified',
      verificationPending: 'Verification pending',
      workspaceStatus: 'Workspace status',
      welcomeBack: 'Welcome back, {name}',
      primaryActions: {
        openWorkspaceSettings: 'Open workspace settings',
        completeProfile: 'Complete profile',
        manageBilling: 'Manage billing',
        reviewPlans: 'Review plans',
      },
      kpis: {
        plan: 'Plan',
        security: 'Security',
        memberSince: 'Member since',
        starterAccess: 'Starter access',
        verified: 'Verified',
        pending: 'Pending',
        recoveryReady: 'Recovery ready',
        confirmationNeeded: 'Confirmation needed',
      },
      trend: {
        eyebrow: 'Workspace pulse',
        title: 'Weekly activation trend',
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      readiness: {
        title: 'Readiness overview',
        description:
          'A tighter view of the few signals that make the starter workspace feel production-ready.',
        completed: '{completed} of {total} complete',
        label: 'Workspace readiness',
        ready: 'Ready',
        healthyTrajectory: 'Healthy trajectory',
        needsAttention: 'Needs attention',
        helper: 'A fast visual read on how complete the starter workspace feels right now.',
      },
      checklist: {
        identity: {
          label: 'Identity',
          detail: 'Profile name is set.',
        },
        avatar: {
          label: 'Avatar',
          detail: 'Workspace avatar is configured.',
        },
        verification: {
          label: 'Verification',
          detailVerified: 'Verified on {date}.',
          detailPending: 'Email confirmation is still pending.',
        },
        plan: {
          label: 'Plan',
          detailActiveThrough: 'Active through {date}.',
          detailActive: 'Paid access is enabled.',
          detailPending: 'Still on the starter plan.',
        },
      },
      activation: {
        title: 'Activation momentum',
        description:
          'A simple distribution chart to give the starter dashboard a more credible analytics surface.',
        identityComplete: 'Identity complete',
        securityTrust: 'Security trust',
        commercialReadiness: 'Commercial readiness',
        workspacePolish: 'Workspace polish',
      },
      priorityQueue: {
        title: 'Priority queue',
        description:
          'Keep the starter focused on a few high-signal actions instead of a long list of generic widgets.',
      },
      focusItems: {
        profile: {
          titleReady: 'Profile looks polished',
          titlePending: 'Finish profile setup',
          descriptionReady:
            'Your account identity is already in good shape. Review details only when needed.',
          descriptionPending:
            'Add your name and avatar to make the product feel credible from the first screen.',
          actionReady: 'Review profile',
          actionPending: 'Update profile',
        },
        billing: {
          titleReady: 'Billing is healthy',
          titlePending: 'Choose a paid plan',
          descriptionReadyWithDate: 'Your subscription is active through {date}.',
          descriptionReady: 'Your plan is active and ready for more advanced workflows.',
          descriptionPending:
            'Upgrade when you want the template to represent a more mature commercial product.',
          actionReady: 'Open billing',
          actionPending: 'Explore plans',
        },
        verification: {
          titleReady: 'Trust signals are strong',
          titlePending: 'Complete email verification',
          descriptionReady:
            'Email verification is already done, which improves account trust and recovery.',
          descriptionPending:
            'Finishing verification makes the workspace feel production-ready and safer to demo.',
          action: 'Open security',
        },
      },
      snapshot: {
        title: 'Snapshot',
        description:
          'A tighter summary panel that feels more premium than another row of starter cards.',
        planStatus: 'Plan status',
        memberSince: 'Member since',
        operatorNote: 'Operator note',
        healthyTitle: 'Commercial setup is in good shape.',
        pendingTitle: 'The template is still in starter mode.',
        healthyDescription:
          'Billing is active, trust signals are solid, and the dashboard can now act more like a polished SaaS home.',
        pendingDescription:
          'Once profile, verification, and billing are complete, this surface reads much more like a finished product than a scaffold.',
      },
    },
  },
  emailTemplates: {
    resetPassword: {
      preview: 'Reset your password',
      heading: 'Reset your password',
      greeting: 'Hi {name},',
      body: 'We received a request to reset your password. Click the button below to create a new password.',
      button: 'Reset password',
      footer:
        'This link expires in 1 hour. If you did not request a password reset, you can safely ignore this email.',
    },
    verifyEmail: {
      preview: 'Verify your email address',
      heading: 'Verify your email',
      greeting: 'Hi {name},',
      body: 'Please click the button below to verify your email address.',
      button: 'Verify email',
      footer:
        'This link expires in 24 hours. If you did not create an account, you can ignore this email.',
    },
    welcome: {
      preview: 'Welcome aboard!',
      heading: 'Welcome{nameSuffix}!',
      body: 'We’re excited to have you on board. Your account has been created successfully.',
      secondary: 'Get started by exploring the dashboard and customising your profile.',
    },
  },
}

export type Messages = typeof enMessages

export const ptMessages = {
  app: {
    description:
      'Um template inicial de IA com Next.js pronto para produção, autenticação, email e arquitetura modular.',
  },
  localeSwitcher: {
    label: 'Idioma',
  },
  metadata: {
    pages: {
      signIn: { title: 'Entrar' },
      signUp: { title: 'Criar conta' },
      forgotPassword: { title: 'Esqueci a senha' },
      resetPassword: { title: 'Redefinir senha' },
      verifyEmail: { title: 'Verificar email' },
      dashboard: { title: 'Painel' },
      settings: { title: 'Configurações' },
      settingsProfile: { title: 'Configurações de perfil' },
      settingsSecurity: { title: 'Configurações de segurança' },
      settingsBilling: { title: 'Configurações de cobrança' },
    },
  },
  common: {
    email: 'Email',
    password: 'Senha',
    fullName: 'Nome completo',
    signIn: 'Entrar',
    signUp: 'Criar conta',
    getStarted: 'Começar',
    toggleTheme: 'Alternar tema',
    saveChanges: 'Salvar alterações',
    saving: 'Salvando…',
    backToSignIn: 'Voltar para entrar',
    settings: 'Configurações',
    profile: 'Perfil',
    security: 'Segurança',
    billing: 'Cobrança',
    dashboard: 'Painel',
    statusLabel: 'Status: {status}',
    currentSubscription: 'Assinatura atual',
    noActiveSubscription: 'Nenhuma assinatura ativa',
    notAvailableYet: 'Ainda não disponível',
    recently: 'Recentemente',
    complete: 'Concluído',
    pending: 'Pendente',
    healthy: 'Saudável',
    actionNeeded: 'Ação necessária',
    optional: 'Opcional',
  },
  validation: {
    invalidInput: 'Entrada inválida',
    invalidEmailAddress: 'Endereço de email inválido',
    passwordRequired: 'A senha é obrigatória',
    passwordMinLength: 'A senha deve ter pelo menos 8 caracteres',
    passwordMaxLength: 'A senha deve ter menos de 100 caracteres',
    passwordUppercase: 'A senha deve conter pelo menos uma letra maiúscula',
    passwordNumber: 'A senha deve conter pelo menos um número',
    passwordsDoNotMatch: 'As senhas não coincidem',
    nameMinLength: 'O nome deve ter pelo menos 2 caracteres',
    nameMaxLength: 'O nome deve ter menos de 100 caracteres',
    invalidImageUrl: 'URL da imagem inválida',
    unauthorized: 'Não autorizado',
    invalidToken: 'Token inválido',
  },
  layout: {
    workspace: 'Espaço de trabalho',
    readyToCustomize: 'Pronto para personalizar',
    sidebarSummary:
      'Gerencie perfil, segurança e cobrança a partir de uma trilha de comando focada.',
    overviewHome: 'Página inicial da visão geral',
    footerRights: 'Todos os direitos reservados.',
  },
  navigation: {
    sections: {
      overview: 'Visão geral',
      account: 'Conta',
    },
    items: {
      dashboard: {
        label: 'Painel',
        description: 'Veja o pulso da sua conta e as próximas recomendações.',
      },
      settings: {
        label: 'Configurações',
        description: 'Veja as seções da sua conta e as preferências gerais.',
      },
      profile: {
        label: 'Perfil',
        description: 'Atualize seu nome, avatar e dados pessoais.',
      },
      security: {
        label: 'Segurança',
        description: 'Acompanhe atualizações de senha e proteção da conta.',
      },
      billing: {
        label: 'Cobrança',
        description: 'Gerencie planos, assinaturas e acesso a pagamentos.',
      },
    },
  },
  pageContext: {
    dashboard: {
      eyebrow: 'Visão geral',
      title: 'Painel',
      description: 'Veja a prontidão da sua conta, marcos recentes e os próximos passos sugeridos.',
    },
    settings: {
      eyebrow: 'Configurações',
      title: 'Configurações da conta',
      description: 'Acesse perfil, cobrança e controles de segurança em um só lugar.',
    },
    profile: {
      eyebrow: 'Configurações',
      title: 'Perfil',
      description: 'Atualize seus dados pessoais e mantenha o workspace refinado.',
    },
    security: {
      eyebrow: 'Configurações',
      title: 'Segurança',
      description:
        'Revise as proteções mais recentes da conta e as próximas ferramentas de segurança.',
    },
    billing: {
      eyebrow: 'Configurações',
      title: 'Cobrança',
      description: 'Gerencie seu plano, status da assinatura e acesso a pagamentos.',
    },
  },
  auth: {
    pages: {
      signIn: {
        title: 'Entrar',
        description: 'Informe suas credenciais para acessar sua conta',
      },
      signUp: {
        title: 'Criar uma conta',
        description: 'Comece sua jornada hoje',
      },
      forgotPassword: {
        title: 'Esqueceu a senha?',
        description: 'Informe seu email e enviaremos um link de redefinição',
      },
      resetPassword: {
        title: 'Redefinir senha',
        description: 'Informe sua nova senha abaixo',
      },
      verifyEmail: {
        invalidLink: 'Link de verificação inválido.',
        successLink: 'Entrar',
      },
    },
    forms: {
      orContinueWith: 'Ou continue com',
      forgotPassword: 'Esqueceu a senha?',
      dontHaveAccount: 'Ainda não tem uma conta?',
      alreadyHaveAccount: 'Já tem uma conta?',
      minPasswordHint: 'Mínimo de 8 caracteres, uma maiúscula e um número',
      confirmPassword: 'Confirmar senha',
      newPassword: 'Nova senha',
      confirmNewPassword: 'Confirmar nova senha',
      sendResetLink: 'Enviar link de redefinição',
      sending: 'Enviando…',
      resetPassword: 'Redefinir senha',
      resetting: 'Redefinindo…',
      createAccount: 'Criar conta',
      creatingAccount: 'Criando conta…',
      signingIn: 'Entrando…',
      continueWithGoogle: 'Continuar com Google',
      continueWithGitHub: 'Continuar com GitHub',
    },
    actions: {
      signedInSuccessfully: 'Login realizado com sucesso',
      invalidEmailOrPassword: 'Email ou senha inválidos',
      somethingWentWrong: 'Algo deu errado. Tente novamente.',
      accountAlreadyExists: 'Já existe uma conta com este email',
      accountCreated: 'Conta criada! Verifique seu email para confirmar sua conta.',
      ifAccountExists: 'Se a conta existir, um link de redefinição foi enviado.',
      emailSendFailed: 'Não foi possível enviar o email de redefinição. Tente novamente.',
      resetPasswordEmailSubject: 'Redefina sua senha',
      invalidOrExpiredResetToken: 'Token de redefinição inválido ou expirado',
      resetTokenExpired: 'O token de redefinição expirou. Solicite um novo link.',
      passwordResetSuccessfully: 'Senha redefinida com sucesso. Agora você pode entrar.',
      invalidOrExpiredVerificationToken: 'Token de verificação inválido ou expirado',
      verificationTokenExpired: 'O token de verificação expirou. Solicite um novo link.',
      emailVerifiedSuccessfully: 'Email verificado com sucesso! Agora você pode entrar.',
    },
  },
  userMenu: {
    openUserMenu: 'Abrir menu do usuário',
    yourAccount: 'Sua conta',
    signOut: 'Sair',
  },
  profile: {
    page: {
      title: 'Perfil',
      description: 'Atualize suas informações pessoais',
    },
    form: {
      emailCannotBeChanged: 'O email não pode ser alterado',
    },
    actions: {
      profileUpdatedSuccessfully: 'Perfil atualizado com sucesso',
    },
  },
  security: {
    page: {
      title: 'Segurança',
      description: 'Gerencie sua senha e sessões ativas',
      comingSoon: 'Alteração de senha e gerenciamento de sessões em breve.',
    },
  },
  billing: {
    page: {
      title: 'Cobrança',
      description: 'Gerencie seu plano e detalhes de pagamento',
      startPlan: 'Iniciar {planName}',
      openBillingPortal: 'Abrir portal de cobrança',
    },
    plans: {
      free: {
        name: 'Grátis',
        description: 'Comece com o plano gratuito e faça upgrade quando quiser.',
        features: ['Acesso principal ao app', 'Suporte por email'],
      },
      premium: {
        name: 'Premium',
        description: 'Desbloqueie recursos premium para times em crescimento.',
        features: ['Suporte prioritário', 'Fluxos avançados', 'Recursos premium'],
      },
      pro: {
        name: 'Pro',
        description: 'Ideal para usuários avançados que querem a experiência completa.',
        features: ['Tudo do Premium', 'Recursos Pro', 'Acesso ao portal de cobrança'],
      },
    },
    planNames: {
      FREE: 'Grátis',
      PREMIUM: 'Premium',
      PRO: 'Pro',
    },
    subscriptionStatuses: {
      ACTIVE: 'Ativa',
      TRIALING: 'Em teste',
      INACTIVE: 'Inativa',
      PAST_DUE: 'Em atraso',
      CANCELED: 'Cancelada',
      UNPAID: 'Não paga',
    },
  },
  template: {
    home: {
      eyebrow: 'Base para orquestração de IA',
      titleSuffix:
        'Use este template para iniciar novos produtos com uma estrutura de módulos clara, uma base sólida de autenticação e um contexto de projeto amigável para IA.',
    },
    settings: {
      title: 'Configurações',
      description: 'Gerencie as configurações da sua conta',
    },
    dashboard: {
      completionMessage:
        'Tudo o que é essencial já está no lugar. Use o painel como um ponto de partida tranquilo para a gestão da conta e o progresso do dia a dia.',
      inProgressMessage:
        'Acompanhe o essencial rapidamente, conclua sua configuração e volte para as áreas mais importantes sem precisar procurar pelo app.',
      executiveOverview: 'Visão executiva',
      emailVerified: 'Email verificado',
      verificationPending: 'Verificação pendente',
      workspaceStatus: 'Status do workspace',
      welcomeBack: 'Bem-vindo de volta, {name}',
      primaryActions: {
        openWorkspaceSettings: 'Abrir configurações do workspace',
        completeProfile: 'Concluir perfil',
        manageBilling: 'Gerenciar cobrança',
        reviewPlans: 'Revisar planos',
      },
      kpis: {
        plan: 'Plano',
        security: 'Segurança',
        memberSince: 'Membro desde',
        starterAccess: 'Acesso inicial',
        verified: 'Verificado',
        pending: 'Pendente',
        recoveryReady: 'Recuperação pronta',
        confirmationNeeded: 'Confirmação necessária',
      },
      trend: {
        eyebrow: 'Pulso do workspace',
        title: 'Tendência semanal de ativação',
        days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      },
      readiness: {
        title: 'Visão geral de prontidão',
        description:
          'Uma visão mais precisa dos poucos sinais que fazem o workspace parecer pronto para produção.',
        completed: '{completed} de {total} concluídos',
        label: 'Prontidão do workspace',
        ready: 'Pronto',
        healthyTrajectory: 'Trajetória saudável',
        needsAttention: 'Precisa de atenção',
        helper:
          'Uma leitura visual rápida de quão completo o workspace inicial parece neste momento.',
      },
      checklist: {
        identity: {
          label: 'Identidade',
          detail: 'O nome do perfil está configurado.',
        },
        avatar: {
          label: 'Avatar',
          detail: 'O avatar do workspace está configurado.',
        },
        verification: {
          label: 'Verificação',
          detailVerified: 'Verificado em {date}.',
          detailPending: 'A confirmação de email ainda está pendente.',
        },
        plan: {
          label: 'Plano',
          detailActiveThrough: 'Ativo até {date}.',
          detailActive: 'O acesso pago está habilitado.',
          detailPending: 'Ainda está no plano inicial.',
        },
      },
      activation: {
        title: 'Momento de ativação',
        description:
          'Um gráfico simples para dar ao painel inicial uma superfície analítica mais convincente.',
        identityComplete: 'Identidade concluída',
        securityTrust: 'Confiança em segurança',
        commercialReadiness: 'Prontidão comercial',
        workspacePolish: 'Refinamento do workspace',
      },
      priorityQueue: {
        title: 'Fila de prioridades',
        description:
          'Mantenha o starter focado em poucas ações de alto sinal em vez de uma longa lista de widgets genéricos.',
      },
      focusItems: {
        profile: {
          titleReady: 'O perfil está bem ajustado',
          titlePending: 'Finalize a configuração do perfil',
          descriptionReady:
            'A identidade da sua conta já está em boa forma. Revise os detalhes apenas quando precisar.',
          descriptionPending:
            'Adicione seu nome e avatar para que o produto pareça mais confiável desde a primeira tela.',
          actionReady: 'Revisar perfil',
          actionPending: 'Atualizar perfil',
        },
        billing: {
          titleReady: 'A cobrança está saudável',
          titlePending: 'Escolha um plano pago',
          descriptionReadyWithDate: 'Sua assinatura está ativa até {date}.',
          descriptionReady: 'Seu plano está ativo e pronto para fluxos de trabalho mais avançados.',
          descriptionPending:
            'Faça upgrade quando quiser que o template represente um produto comercial mais maduro.',
          actionReady: 'Abrir cobrança',
          actionPending: 'Explorar planos',
        },
        verification: {
          titleReady: 'Os sinais de confiança estão fortes',
          titlePending: 'Conclua a verificação de email',
          descriptionReady:
            'A verificação de email já foi concluída, o que melhora a confiança e a recuperação da conta.',
          descriptionPending:
            'Concluir a verificação deixa o workspace mais pronto para produção e mais seguro para demonstrar.',
          action: 'Abrir segurança',
        },
      },
      snapshot: {
        title: 'Resumo',
        description:
          'Um painel de resumo mais enxuto e premium do que outra fileira de cartões iniciais.',
        planStatus: 'Status do plano',
        memberSince: 'Membro desde',
        operatorNote: 'Nota operacional',
        healthyTitle: 'A configuração comercial está em boa forma.',
        pendingTitle: 'O template ainda está em modo inicial.',
        healthyDescription:
          'A cobrança está ativa, os sinais de confiança estão sólidos e o painel agora pode agir mais como uma home SaaS refinada.',
        pendingDescription:
          'Quando perfil, verificação e cobrança estiverem concluídos, esta superfície parecerá muito mais um produto final do que um esqueleto.',
      },
    },
  },
  emailTemplates: {
    resetPassword: {
      preview: 'Redefina sua senha',
      heading: 'Redefina sua senha',
      greeting: 'Olá, {name},',
      body: 'Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para criar uma nova senha.',
      button: 'Redefinir senha',
      footer:
        'Este link expira em 1 hora. Se você não solicitou a redefinição da senha, pode ignorar este email com segurança.',
    },
    verifyEmail: {
      preview: 'Verifique seu endereço de email',
      heading: 'Verifique seu email',
      greeting: 'Olá, {name},',
      body: 'Clique no botão abaixo para verificar seu endereço de email.',
      button: 'Verificar email',
      footer: 'Este link expira em 24 horas. Se você não criou uma conta, pode ignorar este email.',
    },
    welcome: {
      preview: 'Boas-vindas!',
      heading: 'Bem-vindo{nameSuffix}!',
      body: 'Estamos felizes em ter você com a gente. Sua conta foi criada com sucesso.',
      secondary: 'Comece explorando o painel e personalizando seu perfil.',
    },
  },
} satisfies Messages

export const messagesByLocale: Record<Locale, Messages> = {
  en: enMessages,
  pt: ptMessages,
}
