(function () {
  const LANG_KEY = 'shiftsmart_lang';
  const LANGS = { en: 'EN', rw: 'RW', fr: 'FR' };

  const dict = {
    en: {
      nav_features:'Features', nav_about:'About', nav_schedule:'Schedule',
      nav_contact:'Contact', nav_login:'Log In', nav_getstarted:'Get Started',
      hero_h1a:'Schedule Smarter,', hero_h1b:'Work Better',
      hero_cta1:'Get Started Free', hero_cta2:'See How It Works',
      feat_label:'Features', feat_title:'Everything you need to run a smooth operation',
      feat_sub:'From intelligent assignment to real-time notifications — ShiftSmart handles the complexity so you can focus on your people.',
      feat1_title:'Smart Assignment', feat2_title:'Conflict Detection',
      feat3_title:'Real-time Notifications', feat4_title:'Advanced Analytics',
      feat5_title:'Role-based Access', feat6_title:'Mobile-first Design',
      about_label:'About ShiftSmart', about_title:'Built for modern workforce management',
      cta_label:'Get Started Today', cta_title:'Ready to transform your scheduling?',
      cta_sub:'Join over 10,000 companies using ShiftSmart. Free 14-day trial, no credit card required.',
      cta_btn1:'Start Free Trial', cta_btn2:'Book a Demo',
      footer_product:'Product', footer_company:'Company', footer_support:'Support',
      login_title:'Welcome back', login_sub:'Sign in to your ShiftSmart account',
      login_role_label:'Select your role', login_role_admin:'Admin',
      login_role_manager:'Manager', login_role_employee:'Employee',
      login_email:'Email Address', login_password:'Password',
      login_remember:'Remember me', login_forgot:'Forgot password?', login_btn:'Sign In',
      sidebar_main:'Main', sidebar_dashboard:'Dashboard', sidebar_schedule:'Schedule',
      sidebar_notifications:'Notifications', sidebar_management:'Management',
      sidebar_users:'All Users', sidebar_managers:'Managers', sidebar_employees:'Employees',
      sidebar_settings:'Settings', sidebar_tasks:'Tasks', sidebar_myteam:'My Team',
      sidebar_reports:'Reports', sidebar_myspace:'My Space', sidebar_history:'History',
      sidebar_logout:'Logout',
      topbar_search:'Search users…',
      admin_title:'Admin Dashboard', admin_overview:'Overview',
      admin_add_user:'Add User', admin_export:'Export',
      admin_total_employees:'Total Employees', admin_managers:'Managers',
      admin_active_shifts:'Active Shifts Today', admin_pending:'Pending Requests',
      admin_user_roles:'User Roles', admin_recent:'Recent Records',
      admin_user_mgmt:'User Management', admin_all_users:'All registered system users',
      manager_title:'Manager Dashboard', manager_task_mgmt:'Task Management',
      manager_create_task:'Create Task', manager_view_schedule:'View Schedule',
      manager_total_tasks:'Total Tasks', manager_confirmed:'Confirmed',
      manager_pending:'Pending', manager_team_members:'Team Members',
      manager_quick_create:'Quick Create Task', manager_assign_new:'Assign a new shift or task',
      manager_task_title:'Task Title', manager_assign_to:'Assign To',
      manager_date:'Date', manager_priority:'Priority',
      manager_start:'Start Time', manager_end:'End Time',
      manager_create_assign:'Create & Assign Task',
      manager_team_status:"Team Status", manager_today_avail:"Today's availability",
      manager_task_list:'Task List', manager_tasks_week:'All assigned tasks this week',
      employee_title:'My Dashboard', employee_my_schedule:'My Schedule',
      employee_request_swap:'Request Swap', employee_shifts_month:'Shifts This Month',
      employee_completed:'Completed', employee_pending:'Pending',
      employee_hours_week:'Hours This Week', employee_assigned_tasks:'My Assigned Tasks',
      employee_current_week:'Current week', employee_next_shift:'Next Shift In',
      employee_availability:'My Availability', employee_shift_history:'Shift History',
      employee_past30:'Past 30 days',
      schedule_title:'Weekly Schedule', schedule_add_shift:'Add Shift',
      schedule_shift_summary:'Shift Summary', schedule_conflicts:'Conflicts',
      schedule_staff:'Staff on Shift',
      notif_title:'Notifications', notif_mark_all:'Mark All Read',
      notif_all:'All', notif_shifts:'Shifts', notif_tasks:'Tasks', notif_system:'System',
      cancel:'Cancel', save:'Save', edit:'Edit', delete:'Delete',
      export:'Export', search:'Search', today:'Today',
    },
    rw: {
      nav_features:'Ibiranga', nav_about:'Abo turi bo', nav_schedule:'Gahunda',
      nav_contact:'Twandikire', nav_login:'Injira', nav_getstarted:'Tangira',
      hero_h1a:'Gahunda Nziza,', hero_h1b:'Akazi Keza',
      hero_cta1:'Tangira Ubuntu', hero_cta2:'Reba Uburyo Bikora',
      feat_label:'Ibiranga', feat_title:'Ibyo ukeneye byose kugira ngo ibikorwa bigende neza',
      feat_sub:'Kuva gushyiraho akazi kugeza kumenyesha — ShiftSmart ikemura ingorane kugira ngo wemerere abantu bawe.',
      feat1_title:'Gushyiraho Akazi Nziza', feat2_title:'Kumenya Ingorane',
      feat3_title:'Kumenyesha Igihe Cyose', feat4_title:'Isesengura Ryimbitse',
      feat5_title:'Uburenganzira Bwigenga', feat6_title:"Igishushanyo cy'Telefoni",
      about_label:'Abo turi bo', about_title:"Yakozwe kubicuruzwa by'igihe",
      cta_label:'Tangira Uyu Munsi', cta_title:'Witeguye guhindura gahunda yawe?',
      cta_sub:'Jya mu masosiyete 10,000 akoresha ShiftSmart. Iminsi 14 ubuntu, nta karita ya banki ikenewe.',
      cta_btn1:'Tangira Ubuntu', cta_btn2:'Saba Ibiganiro',
      footer_product:'Igicuruzwa', footer_company:'Sosiyete', footer_support:'Inkunga',
      login_title:'Murakaza neza', login_sub:'Injira muri konti yawe ya ShiftSmart',
      login_role_label:'Hitamo uruhare rwawe', login_role_admin:'Umuyobozi',
      login_role_manager:"Umukozi w'Ubuyobozi", login_role_employee:'Umukozi',
      login_email:'Imeyili', login_password:"Ijambo ry'ibanga",
      login_remember:'Nzibutse', login_forgot:"Wibagiwe ijambo ry'ibanga?", login_btn:'Injira',
      sidebar_main:'Ibanze', sidebar_dashboard:'Ikibaho', sidebar_schedule:'Gahunda',
      sidebar_notifications:'Amakuru', sidebar_management:'Ubuyobozi',
      sidebar_users:'Abakoresha Bose', sidebar_managers:'Abayobozi',
      sidebar_employees:'Abakozi', sidebar_settings:'Igenamiterere',
      sidebar_tasks:'Imirimo', sidebar_myteam:'Itsinda Ryanjye',
      sidebar_reports:'Raporo', sidebar_myspace:'Ahantu Hanjye',
      sidebar_history:'Amateka', sidebar_logout:'Sohoka',
      topbar_search:'Shakisha abakoresha…',
      admin_title:"Ikibaho cy'Umuyobozi", admin_overview:'Incamake',
      admin_add_user:'Ongeraho Umukoresha', admin_export:'Kohereza',
      admin_total_employees:'Abakozi Bose', admin_managers:'Abayobozi',
      admin_active_shifts:"Imirimo y'Uyu Munsi", admin_pending:'Ibisabwa',
      admin_user_roles:"Inshingano z'Abakoresha", admin_recent:'Ibyanditswe Bishya',
      admin_user_mgmt:'Gucunga Abakoresha', admin_all_users:'Abakoresha bose biyandikishije',
      manager_title:"Ikibaho cy'Umuyobozi", manager_task_mgmt:'Gucunga Imirimo',
      manager_create_task:'Shiraho Akazi', manager_view_schedule:'Reba Gahunda',
      manager_total_tasks:'Imirimo Yose', manager_confirmed:'Byemejwe',
      manager_pending:'Bitegereje', manager_team_members:'Abagize Itsinda',
      manager_quick_create:'Shiraho Akazi Vuba', manager_assign_new:'Shyiraho akazi gashya',
      manager_task_title:"Izina ry'Akazi", manager_assign_to:'Shyiraho',
      manager_date:'Itariki', manager_priority:'Ibanze',
      manager_start:'Isaha yo Gutangira', manager_end:'Isaha yo Gurangiza',
      manager_create_assign:'Shiraho & Shyiraho Akazi',
      manager_team_status:"Imimerere y'Itsinda", manager_today_avail:"Ubushobozi bw'uyu munsi",
      manager_task_list:"Urutonde rw'Imirimo", manager_tasks_week:"Imirimo yose y'icyumweru",
      employee_title:'Ikibaho Cyanjye', employee_my_schedule:'Gahunda Yanjye',
      employee_request_swap:'Saba Guhindura', employee_shifts_month:"Imirimo y'Uku Kwezi",
      employee_completed:'Byarangiye', employee_pending:'Bitegereje',
      employee_hours_week:"Amasaha y'Icyumweru", employee_assigned_tasks:'Imirimo Yanjye',
      employee_current_week:'Icyumweru gishize', employee_next_shift:'Akazi Gakurikira',
      employee_availability:'Ubushobozi Bwanjye', employee_shift_history:"Amateka y'Imirimo",
      employee_past30:'Iminsi 30 ishize',
      schedule_title:"Gahunda y'Icyumweru", schedule_add_shift:'Ongeraho Akazi',
      schedule_shift_summary:"Incamake y'Imirimo", schedule_conflicts:'Ingorane',
      schedule_staff:'Abakozi ku Kazi',
      notif_title:'Amakuru', notif_mark_all:'Shyira Byose ko Byasomwe',
      notif_all:'Byose', notif_shifts:'Imirimo', notif_tasks:'Akazi', notif_system:'Sisitemu',
      cancel:'Hagarika', save:'Bika', edit:'Hindura', delete:'Siba',
      export:'Kohereza', search:'Shakisha', today:'Uyu Munsi',
    },
    fr: {
      nav_features:'Fonctionnalités', nav_about:'À propos', nav_schedule:'Planning',
      nav_contact:'Contact', nav_login:'Connexion', nav_getstarted:'Commencer',
      hero_h1a:'Planifiez Mieux,', hero_h1b:'Travaillez Mieux',
      hero_cta1:'Commencer Gratuitement', hero_cta2:'Voir Comment Ça Marche',
      feat_label:'Fonctionnalités', feat_title:'Tout ce dont vous avez besoin pour une opération fluide',
      feat_sub:"De l'affectation intelligente aux notifications en temps réel — ShiftSmart gère la complexité pour que vous puissiez vous concentrer sur vos équipes.",
      feat1_title:'Affectation Intelligente', feat2_title:'Détection des Conflits',
      feat3_title:'Notifications en Temps Réel', feat4_title:'Analyses Avancées',
      feat5_title:'Accès par Rôle', feat6_title:'Conception Mobile',
      about_label:'À propos de ShiftSmart', about_title:'Conçu pour la gestion moderne des effectifs',
      cta_label:"Commencez Aujourd'hui", cta_title:'Prêt à transformer votre planification?',
      cta_sub:"Rejoignez plus de 10 000 entreprises utilisant ShiftSmart. Essai gratuit de 14 jours, sans carte de crédit.",
      cta_btn1:'Essai Gratuit', cta_btn2:'Réserver une Démo',
      footer_product:'Produit', footer_company:'Entreprise', footer_support:'Support',
      login_title:'Bon retour', login_sub:'Connectez-vous à votre compte ShiftSmart',
      login_role_label:'Sélectionnez votre rôle', login_role_admin:'Administrateur',
      login_role_manager:'Responsable', login_role_employee:'Employé',
      login_email:'Adresse e-mail', login_password:'Mot de passe',
      login_remember:'Se souvenir de moi', login_forgot:'Mot de passe oublié?',
      login_btn:'Se connecter',
      sidebar_main:'Principal', sidebar_dashboard:'Tableau de bord', sidebar_schedule:'Planning',
      sidebar_notifications:'Notifications', sidebar_management:'Gestion',
      sidebar_users:'Tous les utilisateurs', sidebar_managers:'Responsables',
      sidebar_employees:'Employés', sidebar_settings:'Paramètres',
      sidebar_tasks:'Tâches', sidebar_myteam:'Mon Équipe',
      sidebar_reports:'Rapports', sidebar_myspace:'Mon Espace',
      sidebar_history:'Historique', sidebar_logout:'Déconnexion',
      topbar_search:'Rechercher des utilisateurs…',
      admin_title:'Tableau de bord Admin', admin_overview:"Vue d'ensemble",
      admin_add_user:'Ajouter un utilisateur', admin_export:'Exporter',
      admin_total_employees:'Total Employés', admin_managers:'Responsables',
      admin_active_shifts:"Quarts actifs aujourd'hui", admin_pending:'Demandes en attente',
      admin_user_roles:'Rôles des utilisateurs', admin_recent:'Enregistrements récents',
      admin_user_mgmt:'Gestion des utilisateurs', admin_all_users:'Tous les utilisateurs enregistrés',
      manager_title:'Tableau de bord Responsable', manager_task_mgmt:'Gestion des tâches',
      manager_create_task:'Créer une tâche', manager_view_schedule:'Voir le planning',
      manager_total_tasks:'Total des tâches', manager_confirmed:'Confirmées',
      manager_pending:'En attente', manager_team_members:"Membres de l'équipe",
      manager_quick_create:'Création rapide de tâche', manager_assign_new:'Assigner un nouveau quart ou tâche',
      manager_task_title:'Titre de la tâche', manager_assign_to:'Assigner à',
      manager_date:'Date', manager_priority:'Priorité',
      manager_start:'Heure de début', manager_end:'Heure de fin',
      manager_create_assign:'Créer et assigner',
      manager_team_status:"Statut de l'équipe", manager_today_avail:"Disponibilité aujourd'hui",
      manager_task_list:'Liste des tâches', manager_tasks_week:'Toutes les tâches de la semaine',
      employee_title:'Mon Tableau de bord', employee_my_schedule:'Mon Planning',
      employee_request_swap:'Demander un échange', employee_shifts_month:'Quarts ce mois',
      employee_completed:'Terminés', employee_pending:'En attente',
      employee_hours_week:'Heures cette semaine', employee_assigned_tasks:'Mes tâches assignées',
      employee_current_week:'Semaine en cours', employee_next_shift:'Prochain quart dans',
      employee_availability:'Ma disponibilité', employee_shift_history:'Historique des quarts',
      employee_past30:'30 derniers jours',
      schedule_title:'Planning hebdomadaire', schedule_add_shift:'Ajouter un quart',
      schedule_shift_summary:'Résumé des quarts', schedule_conflicts:'Conflits',
      schedule_staff:'Personnel en service',
      notif_title:'Notifications', notif_mark_all:'Tout marquer comme lu',
      notif_all:'Tout', notif_shifts:'Quarts', notif_tasks:'Tâches', notif_system:'Système',
      cancel:'Annuler', save:'Enregistrer', edit:'Modifier', delete:'Supprimer',
      export:'Exporter', search:'Rechercher', today:"Aujourd'hui",
    }
  };

  function getLang() { return localStorage.getItem(LANG_KEY) || 'en'; }

  function setLang(lang) {
    if (!dict[lang]) return;
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    applyTranslations();
    updateSwitcherUI();
  }

  function t(key) {
    const lang = getLang();
    return (dict[lang] && dict[lang][key]) || dict.en[key] || key;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const attr = el.getAttribute('data-i18n-attr');
      if (attr) el.setAttribute(attr, t(key));
      else el.textContent = t(key);
    });
  }

  function updateSwitcherUI() {
    const lang = getLang();
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  function buildSwitcher() {
    const wrap = document.createElement('div');
    wrap.className = 'lang-switcher';
    wrap.setAttribute('aria-label', 'Language switcher');
    Object.entries(LANGS).forEach(function ([code, label]) {
      const btn = document.createElement('button');
      btn.className = 'lang-btn';
      btn.dataset.lang = code;
      btn.textContent = label;
      btn.setAttribute('type', 'button');
      btn.addEventListener('click', function () { setLang(code); });
      wrap.appendChild(btn);
    });
    return wrap;
  }

  function injectSwitcher() {
    const navActions = document.querySelector('.nav-actions');
    const topbarRight = document.querySelector('.topbar-right');
    const target = navActions || topbarRight;
    if (target) target.insertBefore(buildSwitcher(), target.firstChild);
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectSwitcher();
    applyTranslations();
    updateSwitcherUI();
    document.documentElement.lang = getLang();
  });

  window.i18n = { t: t, setLang: setLang, getLang: getLang, applyTranslations: applyTranslations };
})();
