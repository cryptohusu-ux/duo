/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type NativeLanguage = 'es' | 'fr' | 'de' | 'it' | 'tr' | 'az';

export const TRANSLATIONS: Record<string, Record<NativeLanguage, string>> = {
  // Sidebar / Navigation
  'leader.league': {
    es: 'Liga',
    fr: 'Ligue',
    de: 'Liga',
    it: 'Lega',
    tr: 'Ligi',
    az: 'Liqası'
  },
  'leader.ends': {
    es: 'Termina en 2 días • ¡Los 3 mejores ascienden!',
    fr: 'Finit dans 2 jours • Les 3 premiers sont promus !',
    de: 'Endet in 2 Tagen • Top 3 steigen auf!',
    it: 'Termina in 2 giorni • I primi 3 vengono promossi!',
    tr: '2 gün içinde bitiyor • İlk 3 bir üst lige yükselir!',
    az: '2 gün ərzində bitir • İlk 3 növbəti mərhələyə yüksəlir!'
  },
  'leader.promotion': {
    es: 'Zona de ascenso',
    fr: 'Zone de promotion',
    de: 'Aufstiegszone',
    it: 'Zona promozione',
    tr: 'Yükselme Grubu',
    az: 'Yüksəliş Zonası'
  },
  'leader.motivation': {
    es: '¡Gana más XP en la pestaña de Aprender para superar a tu competidor!',
    fr: 'Gagnez plus d\'XP dans l\'onglet Apprendre pour dépasser votre concurrent !',
    de: 'Verdienen Sie mehr XP im Lernpfad, um Ihre Konkurrenten zu überholen!',
    it: 'Guadagna più XP nel percorso Impara per superare il tuo avversario!',
    tr: 'En yakın rakibinizi geçmek için Öğrenme bölümünde daha fazla XP kazanın!',
    az: 'Ən yaxın rəqibinizi keçmək üçün Öyrənmə bölməsində daha çox XP qazanın!'
  },
  'leader.you.desc': {
    es: 'Tú (Estudiante Estrella)',
    fr: 'Vous (Élève Étoile)',
    de: 'Du (Sternenschüler)',
    it: 'Tu (Studente Stella)',
    tr: 'Sen (Yıldız Öğrenci)',
    az: 'Sən (Ulduz Tələbə)'
  },
  'vocab.select_theme': {
    es: 'Seleccionar Tema de Estudio',
    fr: 'Sélectionner le Thème d\'Étude',
    de: 'Lernthema auswählen',
    it: 'Seleziona Tema di Studio',
    tr: 'Çalışma Temasını Seçin',
    az: 'Mövzu Seçin'
  },
  'vocab.words_count': {
    es: 'palabras',
    fr: 'mots',
    de: 'Wörter',
    it: 'parole',
    tr: 'kelime',
    az: 'söz'
  },
  'vocab.glossary_tab': {
    es: 'Glosario de Inglés',
    fr: 'Glossaire d\'Anglais',
    de: 'Englisches Glossar',
    it: 'Glossario di Inglese',
    tr: 'İngilizce Sözlük',
    az: 'İngilis dili Lüğəti'
  },
  'vocab.flashcards_tab': {
    es: 'Tarjetas de Memoria',
    fr: 'Cartes Mémoire',
    de: 'Karteikarten',
    it: 'Carte di Memoria',
    tr: 'Flaş Kartlar',
    az: 'Flaş Kartlar'
  },
  'vocab.speedquiz_tab': {
    es: 'Prueba de Velocidad',
    fr: 'Quiz de Rapidité',
    de: 'Schnelligkeits-Quiz',
    it: 'Quiz di Velocità',
    tr: 'Hızlı Bilgi Yarışması',
    az: 'Sürətli Viktorina'
  },
  'vocab.comprehensive_glossary': {
    es: 'Glosario Completo de ESL',
    fr: 'Glossaire Complet d\'ESL',
    de: 'Umfassendes ESL-Glossar',
    it: 'Glossario Completo di ESL',
    tr: 'Kapsamlı İngilizce Sözlüğü',
    az: 'Hərtərəfli İngilis dili Lüğəti'
  },
  'vocab.explore_words': {
    es: 'Explora palabras de alta frecuencia. Presiona el ícono del altavoz para escuchar la pronunciación.',
    fr: 'Explorez les mots à haute fréquence. Appuyez sur l\'icône du haut-parleur pour entendre la prononciation.',
    de: 'Entdecken Sie hochfrequente Wörter. Drücken Sie das Lautsprechersymbol, um die Aussprache zu hören.',
    it: 'Esplora le parole ad alta frequenza. Premi l\'icona dell\'altoparlante per ascoltare la pronuncia.',
    tr: 'Yüksek frekanslı kelimeleri keşfedin. Telaffuzunu duymak için hoparlör simgesine basın.',
    az: 'Tez-tez istifadə olunan sözləri kəşf edin. Tələffüzünü eşitmək üçün dinamik işarəsinə basın.'
  },
  'vocab.english_term': {
    es: 'Término en Inglés',
    fr: 'Terme en Anglais',
    de: 'Englischer Begriff',
    it: 'Termine in Inglese',
    tr: 'İngilizce Terim',
    az: 'İngilis dili Termini'
  },
  'vocab.native_translation': {
    es: 'Traducción Nativa',
    fr: 'Traduction Native',
    de: 'Eigene Übersetzung',
    it: 'Traduzione Nativa',
    tr: 'Ana Dil Çevirisi',
    az: 'Ana dili Tərcüməsi'
  },
  'vocab.click_reveal': {
    es: 'Haz clic en cualquier lugar para revelar la traducción',
    fr: 'Cliquez n\'importe où pour révéler la traduction',
    de: 'Klicken Sie irgendwo hin, um die Übersetzung anzuzeigen',
    it: 'Clicca ovunque por rivelare la traduzione',
    tr: 'Çeviriyi görmek için herhangi bir yere tıklayın',
    az: 'Tərcüməni görmək üçün hər hansı bir yerə klikləyin'
  },
  'vocab.duo_says_flip': {
    es: 'Duo dice: ¡Voltea la tarjeta, memoriza el significado y escucha la pronunciación limpia para potenciar tu memoria!',
    fr: 'Duo dit : Retournez la carte, mémorisez le sens et écoutez la prononciation propre pour booster votre mémoire !',
    de: 'Duo sagt: Drehen Sie die Karte um, merken Sie sich die Bedeutung und hören Sie sich die klare Aussprache an, um Ihr Gedächtnis zu stärken!',
    it: 'Duo dice: Gira la carta, memorizza il significato e ascolta la pronuncia chiara per potenziare la tua memoria!',
    tr: 'Duo diyor ki: Hafızanı güçlendirmek için kartı çevir, anlamını ezberle ve net telaffuzunu dinle!',
    az: 'Duo deyir: Yaddaşınızı gücləndirmək üçün kartı çevirin, mənasını əzbərləyin və aydın tələffüzünü dinləyin!'
  },
  'vocab.flip_btn': {
    es: 'Voltear Traducción',
    fr: 'Retourner la Carte',
    de: 'Karte umdrehen',
    it: 'Gira Carta',
    tr: 'Çeviriyi Göster',
    az: 'Tərcüməni Göstər'
  },
  'vocab.next_btn': {
    es: 'Siguiente Palabra',
    fr: 'Mot Suivant',
    de: 'Nächstes Wort',
    it: 'Parola Successiva',
    tr: 'Sonraki Kelime',
    az: 'Növbəti Söz'
  },
  'vocab.quiz.title': {
    es: '¡Prueba de Vocabulario Sin Fin!',
    fr: 'Quiz de Vocabulaire Infini !',
    de: 'Endloses Wortschatz-Quiz!',
    it: 'Quiz di Vocabolario Infinito!',
    tr: 'Sonsuz Kelime Bilgi Yarışması!',
    az: 'Sonsuz Söz Viktorinası!'
  },
  'vocab.quiz.review': {
    es: '¡Responde 10 preguntas consecutivas de opción múltiple bajo presión y gana rachas!',
    fr: 'Répondez à 10 questions consécutives à choix multiples sous pression et gagnez des séries !',
    de: 'Beantworten Sie 10 aufeinanderfolgende Multiple-Choice-Fragen unter Druck und bauen Sie Serien auf!',
    it: 'Rispondi a 10 domande consecutive a scelta multipla sotto pressione e ottieni serie!',
    tr: 'Baskı altında ardışık 10 çoktan seçmeli soruyu yanıtlayın ve seriler kazanın!',
    az: 'Təzyiq altında ardıcıl 10 çoxseçimli suala cavab verin və seriyalar qazanın!'
  },
  'vocab.quiz.start': {
    es: 'Comenzar Prueba',
    fr: 'Commencer le Quiz',
    de: 'Quiz starten',
    it: 'Inizia Quiz',
    tr: 'Yarışmayı Başlat',
    az: 'Viktorinanı Başlat'
  },
  'vocab.quiz.what_is': {
    es: '¿Cuál es la traducción de:',
    fr: 'Quelle est la traduction de :',
    de: 'Was ist die Übersetzung von:',
    it: 'Qual è la traduzione di:',
    tr: 'Hangisi bunun çevirisidir:',
    az: 'Hansı bunun tərcüməsidir:'
  },
  'vocab.quiz.brilliant': {
    es: '¡Brillante! ¡Respuesta Correcta!',
    fr: 'Brillant ! Bonne Réponse !',
    de: 'Brillant! Richtige Antwort!',
    it: 'Brillante! Risposta Esatta!',
    tr: 'Harika! Doğru Cevap!',
    az: 'Möhtəşəm! Doğru Cavab!'
  },
  'vocab.quiz.incorrect': {
    es: 'Oh, incorrecto...',
    fr: 'Oh, incorrect...',
    de: 'Oh, falsch...',
    it: 'Oh, errato...',
    tr: 'Ah, yanlış...',
    az: 'Ah, yanlış...'
  },
  'vocab.quiz.is': {
    es: 'es',
    fr: 'est',
    de: 'ist',
    it: 'è',
    tr: 'kelimesinin anlamı:',
    az: 'sözünün mənası:'
  },
  'vocab.quiz.continue': {
    es: 'Continuar',
    fr: 'Continuer',
    de: 'Weiter',
    it: 'Continua',
    tr: 'Devam Et',
    az: 'Davam Et'
  },
  'vocab.quiz.completed': {
    es: '¡Prueba Completada!',
    fr: 'Quiz Terminé !',
    de: 'Quiz abgeschlossen!',
    it: 'Quiz Completato!',
    tr: 'Bilgi Yarışması Tamamlandı!',
    az: 'Viktorina Tamamlandı!'
  },
  'vocab.quiz.excellent': {
    es: '¡Excelente trabajo revisando el vocabulario! Tu tarjeta de puntuación está lista.',
    fr: 'Excellent travail de révision du vocabulaire ! Votre carte de score est prête.',
    de: 'Hervorragende Arbeit beim Wiederholen des Wortschatzes! Ihre Scorekarte ist bereit.',
    it: 'Ottimo lavoro nel ripassare il vocabolario! La tua scheda dei punteggi è pronta.',
    tr: 'Kelime dağarcığını gözden geçirme konusunda harika bir iş çıkardın! Puan kartın hazır.',
    az: 'Söz ehtiyatını nəzərdən keçirməkdə möhtəşəm iş gördünüz! Qiymət kartınız hazırdır.'
  },
  'vocab.quiz.best_streak': {
    es: 'Mejor Racha',
    fr: 'Meilleure Série',
    de: 'Beste Serie',
    it: 'Migliore Serie',
    tr: 'En İyi Seri',
    az: 'Ən Yaxşı Seriya'
  },
  'vocab.quiz.reset': {
    es: 'Reiniciar',
    fr: 'Réinitialiser',
    de: 'Zurücksetzen',
    it: 'Reimposta',
    tr: 'Sıfırla',
    az: 'Sıfırla'
  },
  'vocab.quiz.play_again': {
    es: 'Jugar de Nuevo',
    fr: 'Rejouer',
    de: 'Noch einmal spielen',
    it: 'Gioca Ancora',
    tr: 'Tekrar Oyna',
    az: 'Yenidən Oyna'
  },
  'vocab.card.example': {
    es: 'Ejemplo',
    fr: 'Exemple',
    de: 'Beispiel',
    it: 'Esempio',
    tr: 'Örnek',
    az: 'Nümunə'
  },
  'shop.boutique': {
    es: 'Boutique de Duo',
    fr: 'Boutique de Duo',
    de: 'Duos Boutique',
    it: 'Boutique di Duo',
    tr: 'Duo\'nun Butiği',
    az: 'Duo-nun Butiki'
  },
  'shop.title': {
    es: 'Tienda de Duo',
    fr: 'Boutique de Duo',
    de: 'Duos Shop',
    it: 'Negozio di Duo',
    tr: 'Duo\'nun Mağazası',
    az: 'Duo-nun Mağazası'
  },
  'shop.subtitle': {
    es: '¡Gasta tus gemas ganadas para comprar recargas de vidas, escudos de racha o trajes personalizados para Duo!',
    fr: 'Dépensez vos gemmes gagnées pour acheter des recharges de vies, des boucliers de série ou des tenues personnalisées pour Duo !',
    de: 'Geben Sie Ihre verdienten Edelsteine aus, um Lebensnachfüllungen, Serienschilder oder maßgeschneiderte Outfits für Duo zu kaufen!',
    it: 'Spendi le tue gemme guadagnate per acquistare ricariche di vite, scudi di serie o abiti personalizzati per Duo!',
    tr: 'Kazanılan mücevherlerinizi can doldurma, seri kalkanları veya Duo için özel kıyafetler satın almak için harcayın!',
    az: 'Qazandığınız brilyantları can doldurmaq, seriya qalxanları və ya Duo üçün xüsusi geyimlər almağa xərcləyin!'
  },
  'shop.my_gems': {
    es: 'Mis Gemas',
    fr: 'Mes Gemmes',
    de: 'Meine Edelsteine',
    it: 'Le Mie Gemme',
    tr: 'Mücevherlerim',
    az: 'Brilyantlarım'
  },
  'shop.active_outfit': {
    es: 'Traje de Mascota Activo',
    fr: 'Tenue de Mascotte Active',
    de: 'Aktives Maskottchen-Outfit',
    it: 'Abito Mascotte Attivo',
    tr: 'Aktif Maskot Kıyafeti',
    az: 'Aktiv Maskot Geyimi'
  },
  'shop.classic_green': {
    es: 'Verde Clásico',
    fr: 'Vert Classique',
    de: 'Klassisches Grün',
    it: 'Verde Classico',
    tr: 'Klasik Yeşil',
    az: 'Klasik Yaşıl'
  },
  'shop.mascot_desc': {
    es: '¡Compra nuevos trajes de la lista de abajo y haz clic en \'Equipar\' para ver a Duo enseñarte con estilo!',
    fr: 'Achetez de nouveaux costumes parmi les articles ci-dessous et cliquez sur \'Équiper\' pour voir Duo vous enseigner avec style !',
    de: 'Kaufen Sie neue Kostüme aus den folgenden Artikeln und klicken Sie auf \'Ausrüsten\', um zu sehen, wie Duo Sie mit Stil unterrichtet!',
    it: 'Acquista nuovi costumi dagli articoli qui sotto e fai clic su \'Equipaggia\' per vedere Duo insegnarti con stile!',
    tr: 'Aşağıdaki ürünlerden yeni kıyafetler satın alın ve Duo\'nun size şık bir şekilde ders vermesini görmek için \'Kuşan\'a tıklayın!',
    az: 'Aşağıdakı məhsullardan yeni geyimlər alın və Duo-nun sizə qəşəng tərzdə dərs keçməsini görmək üçün \'Geyin\' düyməsinə klikləyin!'
  },
  'shop.reset_classic': {
    es: 'Restablecer a Verde Clásico',
    fr: 'Réinitialiser au Vert Classique',
    de: 'Auf klassisches Grün zurücksetzen',
    it: 'Ripristina a Verde Classico',
    tr: 'Klasik Yeşile Sıfırla',
    az: 'Klasik Yaşıla Sıfırla'
  },
  'shop.equipped': {
    es: 'Equipado',
    fr: 'Équipé',
    de: 'Ausgerüstet',
    it: 'Equipaggiato',
    tr: 'Kuşanıldı',
    az: 'Geyinildi'
  },
  'shop.equip': {
    es: 'Equipar',
    fr: 'Équiper',
    de: 'Ausrüsten',
    it: 'Equipaggia',
    tr: 'Kuşan',
    az: 'Geyin'
  },
  'shop.item.hearts.name': {
    es: 'Recarga de Corazones',
    fr: 'Recharge de Vies',
    de: 'Herzen aufladen',
    it: 'Ricarica Cuori',
    tr: 'Canları Doldur',
    az: 'Canları Doldur'
  },
  'shop.item.hearts.desc': {
    es: '¡Restaura instantáneamente tus vidas a 5 para que puedas seguir studying sin interrupciones!',
    fr: 'Restaurez instantanément vos vies à 5 pour pouvoir continuer à étudier sans interruption !',
    de: 'Stellen Sie Ihre Leben sofort auf 5 wieder her, damit Sie ohne Unterbrechung weiterlernen können!',
    it: 'Ripristina istantaneamente le tue vite a 5 in modo da poter continuare a studiare senza interruzioni!',
    tr: 'Canlarınızı anında 5\'e yükseltin, böylece kesintisiz olarak çalışmaya devam edebilirsiniz!',
    az: 'Dərslərinizə fasiləsiz davam edə bilmək üçün canlarınızı dərhal 5-ə bərpa edin!'
  },
  'shop.item.freeze.name': {
    es: 'Protector de Racha',
    fr: 'Gel de Série',
    de: 'Serien-Schutz',
    it: 'Blocco Serie',
    tr: 'Seri Dondurma',
    az: 'Seriya Dondurma'
  },
  'shop.item.freeze.desc': {
    es: 'Protege tu racha diaria si olvidas practicar durante un día completo. Uso automático.',
    fr: 'Protège votre série quotidienne si vous oubliez de vous entraîner pendant une journée complète. Utilisation automatique.',
    de: 'Schützt Ihre tägliche Serie, wenn Sie vergessen, einen ganzen Tag lang zu üben. Automatische Nutzung.',
    it: 'Protegge la tua serie quotidiana se dimentichi di esercitarti per un giorno intero. Uso automatico.',
    tr: 'Bir gün boyunca pratik yapmayı unutursanız günlük serinizi korur. Otomatik kullanılır.',
    az: 'Bir gün ərzində məşq etməyi unutsanız, gündəlik seriyanızı qoruyur. Avtomatik istifadə olunur.'
  },
  'shop.item.tuxedo.name': {
    es: 'Compañero con Esmoquin Elegante',
    fr: 'Compagnon de Smoking Chic',
    de: 'Schicker Smoking-Begleiter',
    it: 'Compagno in Smoking Elegante',
    tr: 'Şık Smokini olan Duo',
    az: 'Qəşəng Smokini olan Duo'
  },
  'shop.item.tuxedo.desc': {
    es: 'Viste a tu compañero con un esmoquin sofisticado y formal. ¡Aprendamos con estilo!',
    fr: 'Habillez votre compagnon d\'un smoking sophistiqué et formel. Apprenons avec style !',
    de: 'Kleiden Sie Ihren Begleiter in einen eleganten, formellen Smoking. Lernen wir mit Stil!',
    it: 'Vesti il tuo compagno con uno smoking sofisticato e formale. Impariamo con stile!',
    tr: 'Duo\'yu sofistike, resmi bir smokin ile giydirin. Şık bir şekilde öğrenelim!',
    az: 'Duo-nu rəsmi, qəşəng bir smokinlə bəzəyin. Tərzlə öyrənək!'
  },
  'shop.item.cowboy.name': {
    es: 'Compañero Vaquero del Lejano Oeste',
    fr: 'Compagnon Cow-boy du Far West',
    de: 'Wildwest-Cowboy-Begleiter',
    it: 'Compagno Cowboy del West',
    tr: 'Vahşi Batı Kovboyu Duo',
    az: 'Vəhşi Qərb Kovboyu Duo'
  },
  'shop.item.cowboy.desc': {
    es: '¿Listos para un poco de inglés? Viste a tu compañero con un sombrero Stetson y chaleco de cuero.',
    fr: 'Prêt pour un peu d\'anglais ? Équipez votre compagnon d\'un chapeau Stetson et d\'un gilet en cuir.',
    de: 'Bereit für etwas Englisch? Rüsten Sie Ihren Begleiter mit einem Stetson-Hut und einer Lederweste aus.',
    it: 'Siete pronti per un po\' di inglese? Vesti il tuo compagno con un cappello Stetson e un gilet di pelle.',
    tr: 'İngilizce öğrenmeye hazır mısınız? Duo\'ya havalı bir kovboy şapkası ve deri yelek giydirin.',
    az: 'İngilis dilini öyrənməyə hazırsınız? Duo-ya havalı bir kovboy papağı və dəri jilet geyindirin.'
  },
  'shop.item.golden.name': {
    es: 'Compañero Dorado Brillante',
    fr: 'Compagnon Doré Éclatant',
    de: 'Goldener Pracht-Begleiter',
    it: 'Compagno Dorato Splendente',
    tr: 'Altın Kaplama Duo',
    az: 'Qızıl Örtüklü Duo'
  },
  'shop.item.golden.desc': {
    es: 'Un traje dorado brillante y majestuoso que refleja la maestría suprema y las altas rachas.',
    fr: 'Un costume en or majestueux et brillant qui reflète la maîtrise suprême et les séries élevées.',
    de: 'Ein glänzendes, majestätisches Goldkostüm, das höchste Meisterschaft und hohe Serien widerspiegelt.',
    it: 'Un costume dorato lucente e maestoso che riflette la maestria suprema e le serie elevate.',
    tr: 'Yüksek serileri ve üstün ustalığı yansıtan parlak, görkemli bir altın kıyafeti.',
    az: 'Yüksək seriyaları və üstün ustalığı əks etdirən parlaq, möhtəşəm bir qızıl geyim.'
  },
  'shop.alert.need_gems': {
    es: '¡Necesitas más gemas para comprar este artículo! Completa lecciones para ganar más.',
    fr: 'Vous avez besoin de plus de gemmes pour acheter cet article ! Terminez des leçons pour en gagner plus.',
    de: 'Sie benötigen mehr Edelsteine, um diesen Artikel zu kaufen! Schließen Sie Lektionen ab, um mehr zu verdienen.',
    it: 'Hai bisogno di più gemme per acquistare questo articolo! Completa le lezioni per guadagnarne di più.',
    tr: 'Bu ürünü satın almak için daha fazla mücevhere ihtiyacınız var! Daha fazlasını kazanmak için dersleri tamamlayın.',
    az: 'Bu məhsulu almaq üçün daha çox brilyanta ehtiyacınız var! Daha çox qazanmaq üçün dərsləri tamamlayın.'
  },
  'shop.alert.hearts_full': {
    es: '¡Tus corazones ya están llenos! Sigue estudiando, no necesitas una recarga ahora mismo.',
    fr: 'Vos vies sont déjà pleines ! Continuez à étudier, vous n\'avez pas besoin de recharge pour le moment.',
    de: 'Ihre Herzen sind bereits voll! Lernen Sie weiter, Sie benötigen derzeit keine Aufladung.',
    it: 'I tuoi cuori sono già pieni! Continua a studiare, non hai bisogno di una ricarica in questo momento.',
    tr: 'Canlarınız zaten dolu! Çalışmaya devam edin, şu an can doldurmaya ihtiyacınız yok.',
    az: 'Canlarınız onsuz da doludur! Oxumağa davam edin, hal-hazırda can doldurmağa ehtiyacınız yoxdur.'
  },
  'adventure.badge': {
    es: 'Habla Interactiva y Sandbox Personalizado',
    fr: 'Pratique Orale Interactive & Sandbox Personnalisé',
    de: 'Interaktives Sprechen & Eigener Sandkasten',
    it: 'Conversazione Interattiva e Sandbox Personalizzato',
    tr: 'İnteraktif Konuşma ve Özel Kum Havuzu',
    az: 'İnteraktiv Danışıq və Xüsusi Qum Qutusu'
  },
  'adventure.title': {
    es: 'Laboratorio de Aprendizaje de IA',
    fr: 'Laboratoire d\'Apprentissage de l\'IA',
    de: 'KI-Lernlabor',
    it: 'Laboratorio di Apprendimento IA',
    tr: 'Yapay Zeka Öğrenme Laboratuvarı',
    az: 'Süni İntellekt Öyrənmə Laboratoriyası'
  },
  'adventure.subtitle': {
    es: '¡Expande tus límites! ¡Practica juegos de rol en tiempo real con personajes de IA, o crea lecciones personalizadas sobre cualquier tema en el universo!',
    fr: 'Repoussez vos limites ! Entraînez-vous à des jeux de rôle en temps réel avec des personnages de l\'IA, ou créez des leçons personnalisées sur n\'importe quel sujet de l\'univers !',
    de: 'Erweitern Sie Ihre Grenzen! Üben Sie Echtzeit-Rollenspiele mit KI-Charakteren oder erstellen Sie personalisierte Lektionen zu jedem Thema im Universum!',
    it: 'Espandi i tuoi limiti! Pratica giochi di ruolo in tempo real con personaggi IA, o crea lezioni personalizzate su qualsiasi argomento dell\'universo!',
    tr: 'Sınırlarınızı genişletin! Yapay zeka karakterleriyle gerçek zamanlı rol yapma pratiği yapın veya evrendeki herhangi bir konuda tamamen kişiselleştirilmiş dersler oluşturun!',
    az: 'Sərhədlərinizi genişləndirin! Süni intellekt personajları ilə real vaxtda rol oyunu məşq edin və ya kainatdakı hər hansı bir mövzuda tamamilə fərdiləşdirilmiş dərslər yaradın!'
  },
  'adventure.tab.rpg': {
    es: 'Juego de Rol RPG',
    fr: 'Jeu de Rôle RPG',
    de: 'RPG-Rollenspiel',
    it: 'Gioco di Ruolo RPG',
    tr: 'RPG Rol Yapma',
    az: 'RPG Rol Oyunu'
  },
  'adventure.tab.creator': {
    es: 'Creador de Lecciones de IA',
    fr: 'Créateur de Leçons IA',
    de: 'KI-Lektionsersteller',
    it: 'Creatore di Lezioni IA',
    tr: 'Yapay Zeka Ders Oluşturucu',
    az: 'Süni İntellekt Dərs Yaradıcısı'
  },
  'adventure.btn.start': {
    es: 'Iniciar Aventura',
    fr: 'Commencer l\'Aventure',
    de: 'Abenteuer Starten',
    it: 'Inizia Avventura',
    tr: 'Macerayı Başlat',
    az: 'Macəranı Başlat'
  },
  'adventure.creator.title': {
    es: 'Sandbox de Lecciones Dinámicas de IA',
    fr: 'Sandbox de Leçons Dynamiques de l\'IA',
    de: 'Dynamischer KI-Lektions-Sandkasten',
    it: 'Sandbox di Lezioni Dinamiche IA',
    tr: 'Yapay Zeka Dinamik Ders Kum Havuzu',
    az: 'Süni İntellekt Dinamik Dərs Qum Qutusu'
  },
  'adventure.creator.desc': {
    es: '¡Ingresa cualquier escenario, jerga o situación, y Gemini IA estructurará dinámicamente un plan de estudios interactivo de 5 preguntas solo para ti!',
    fr: 'Saisissez n\'importe quel scénario, argot ou situation, et Gemini IA structurera dynamiquement un programme interactif de 5 questions rien que pour vous !',
    de: 'Geben Sie ein beliebiges Szenario, Slang oder eine Situation ein, und Gemini KI strukturiert dynamisch einen interaktiven Lehrplan mit 5 Fragen speziell für Sie!',
    it: 'Inserisci qualsiasi scenario, gergo o situazione, e Gemini IA strutturerà dinamicamente un programma interattivo di 5 domande solo per te!',
    tr: 'Herhangi bir senaryo, argo veya durumu yazın; Gemini Yapay Zekası sadece sizin için 5 soruluk tamamen etkileşimli bir ders programını dinamik olarak hazırlasın!',
    az: 'Hər hansı bir ssenari, jarqon və ya vəziyyəti daxil edin və Gemini Süni İntellekti sizin üçün 5 sualdan ibarət tamamilə interaktiv dərs proqramını dinamik şəkildə hazırlasın!'
  },
  'adventure.creator.generating': {
    es: 'Generando plan de estudios personalizado...',
    fr: 'Génération du programme personnalisé...',
    de: 'Erstelle personalisierten Lehrplan...',
    it: 'Generazione del programma personalizzato...',
    tr: 'Özel ders programı oluşturuluyor...',
    az: 'Fərdi dərs proqramı yaradılır...'
  },
  'adventure.creator.placeholder': {
    es: 'Ej: Pedir comida callejera en Londres, vocabulario de emergencia médica o negociaciones laborales...',
    fr: 'Ex : Commander de la nourriture de rue à l\'aide de l\'IA, vocabulaire d\'urgence médicale ou négociations d\'emploi...',
    de: 'Z.B. Streetfood in London bestellen, medizinischer Notfall-Wortschatz oder Gehaltsverhandlungen...',
    it: 'Es: Ordinare cibo da strada a Londra, vocabolario per emergenze mediche o trattative di lavoro...',
    tr: 'Örn: Londra\'da sokak yemeği sipariş etmek, tıbbi acil durum kelimeleri veya iş görüşmeleri...',
    az: 'Məs: Londonda küçə yeməyi sifariş etmək, tibbi təcili yardım sözləri və ya iş danışıqları...'
  },
  'adventure.creator.generate_btn': {
    es: 'Sintetizar Plan de Estudios Dinámico',
    fr: 'Synthétiser un Programme Dynamique',
    de: 'Dynamischen Lehrplan Synthetisieren',
    it: 'Sintetizza Programma Dinamico',
    tr: 'Dinamik Müfredatı Sentezle',
    az: 'Dinamik Dərs Proqramını Sentezlə'
  },
  'adventure.creator.topic_label': {
    es: 'Describe tu tema o contexto objetivo',
    fr: 'Décrivez votre thème ou contexte cible',
    de: 'Beschreiben Sie Ihr Zielthema oder Ihren Kontext',
    it: 'Descrivi il tuo tema o contesto target',
    tr: 'Hedef temanızı veya bağlamınızı açıklayın',
    az: 'Hədəf mövzunuzu və ya kontekstinizi təsvir edin'
  },
  'nav.learn': {
    es: 'Aprender',
    fr: 'Apprendre',
    de: 'Lernen',
    it: 'Impara',
    tr: 'Öğren',
    az: 'Öyrən'
  },
  'nav.speaking': {
    es: 'Speaking Club',
    fr: 'Club de Conversation',
    de: 'Sprechclub',
    it: 'Club di Conversazione',
    tr: 'Konuşma Kulübü',
    az: 'Danışıq Klubu'
  },
  'nav.adventure': {
    es: 'Aventura de IA',
    fr: 'Aventure d\'IA',
    de: 'KI-Abenteuer',
    it: 'Avventura di IA',
    tr: 'Yapay Zeka Macerası',
    az: 'Süni İntellekt Macərası'
  },
  'nav.leaderboard': {
    es: 'Clasificación',
    fr: 'Classement',
    de: 'Bestenliste',
    it: 'Classifica',
    tr: 'Liderlik Tablosu',
    az: 'Liderlik Cədvəli'
  },
  'nav.shop': {
    es: 'Tienda',
    fr: 'Boutique',
    de: 'Shop',
    it: 'Negozio',
    tr: 'Mağaza',
    az: 'Mağaza'
  },
  'nav.vocabulary': {
    es: 'Vocabulario',
    fr: 'Vocabulaire',
    de: 'Wortschatz',
    it: 'Vocabolario',
    tr: 'Kelime Dağarcığı',
    az: 'Söz Ehtiyatı'
  },

  // Units Title
  'unit.1.title': {
    es: 'Saludos y Conceptos Básicos',
    fr: 'Salutations & Bases Quotidiennes',
    de: 'Grüße & Tägliche Grundlagen',
    it: 'Saluti e Basi Quotidiane',
    tr: 'Selamlaşma ve Günlük Temeller',
    az: 'Salamlaşma və Gündəlik Əsaslar'
  },
  'unit.1.desc': {
    es: 'Domina saludos simples, pronombres y objetos cotidianos básicos.',
    fr: 'Maîtrisez les saluts simples, les pronoms et les objets du quotidien.',
    de: 'Meistern Sie einfache Grüße, Pronomen und alltägliche Gegenstände.',
    it: 'Padroneggia saluti semplici, pronomi e oggetti quotidiani di base.',
    tr: 'Basit selamlaşmaları, zamirleri ve temel günlük nesneleri öğrenin.',
    az: 'Sadə salamlaşmaları, əvəzlikləri və əsas gündəlik əşyaları öyrənin.'
  },
  'unit.2.title': {
    es: 'Viajes y Direcciones',
    fr: 'Voyage & Itinéraires',
    de: 'Reisen & Wegbeschreibungen',
    it: 'Viaggi e Direzioni',
    tr: 'Seyahat ve Yol Tarifleri',
    az: 'Səyahət və Yol İstiqlamətləri'
  },
  'unit.2.desc': {
    es: 'Aprende a navegar en aeropuertos, preguntar por hoteles y encontrar comida.',
    fr: 'Apprenez à naviguer dans les aéroports, demander des hôtels et trouver de la nourriture.',
    de: 'Lernen Sie, wie man sich an Flughäfen zurechtfindet, nach Hotels fragt und Essen findet.',
    it: 'Impara a muoverti negli aeroporti, chiedere degli hotel e trovare cibo.',
    tr: 'Havalimanlarında nasıl gezeceğinizi, otel sormayı ve yemek bulmayı öğrenin.',
    az: 'Hava limanlarında necə hərəkət edəcəyinizi, otel soruşmağı və yemək tapmağı öyrənin.'
  },
  'unit.3.title': {
    es: 'Negocios y Carrera',
    fr: 'Affaires & Carrière',
    de: 'Beruf & Karriere',
    it: 'Lavoro e Carriera',
    tr: 'İş ve Kariyer',
    az: 'Biznes və Karyera'
  },
  'unit.3.desc': {
    es: 'Prepárate para reuniones, negociaciones y acuerdos formales.',
    fr: 'Préparez-vous aux réunions, négociations et accords formels.',
    de: 'Bereiten Sie sich auf Besprechung, Verhandlungen und formelle Vereinbarungen vor.',
    it: 'Preparati per riunioni, trattative e accordi formali.',
    tr: 'Toplantılara, müzakerelere ve resmi anlaşmalara hazırlanın.',
    az: 'Görüşlərə, danışıqlara və rəsmi razılaşmalara hazırlaşın.'
  },
  'unit.4.title': {
    es: 'Metas de Vida y Futuro',
    fr: 'Objectifs de Vie & Futur',
    de: 'Lebensziele & Zukunft',
    it: 'Obiettivi di Vita e Futuro',
    tr: 'Hayat Hedefleri ve Gelecek',
    az: 'Həyat Hədəfləri və Gələcək'
  },
  'unit.4.desc': {
    es: 'Habla sobre tus planes futuros, ambiciones profesionales y sueños.',
    fr: 'Parlez de vos projets futurs, de vos ambitions professionnelles et de vos rêves.',
    de: 'Sprechen Sie über Ihre Zukunftspläne, Karriereambitionen und Träume.',
    it: 'Parla dei tuoi piani futuri, delle tue ambizioni di carriera e dei tuoi sogni.',
    tr: 'Gelecek planlarınız, kariyer hedefleriniz ve hayalleriniz hakkında konuşun.',
    az: 'Gələcək planlarınız, karyera ambisiyalarınız və xəyallarınız haqqında danışın.'
  },

  // General Header & Stats
  'header.teaching': {
    es: 'Enseñando inglés para:',
    fr: 'Enseignement de l\'anglais pour :',
    de: 'Englisch-Unterricht für:',
    it: 'Insegnamento dell\'inglese per:',
    tr: 'İngilizce Eğitimi Alınan Dil:',
    az: 'İngilis dili öyrənilən dil:'
  },
  'header.score': {
    es: 'Puntaje',
    fr: 'Score',
    de: 'Punkte',
    it: 'Punteggio',
    tr: 'Puan',
    az: 'Xal'
  },
  'header.streak': {
    es: 'Racha Diaria',
    fr: 'Série Quotidienne',
    de: 'Tägliche Serie',
    it: 'Serie Giornaliera',
    tr: 'Günlük Seri',
    az: 'Gündəlik Seriya'
  },
  'header.gems': {
    es: 'Mis Gemas',
    fr: 'Mes Gemmes',
    de: 'Meine Edelsteine',
    it: 'Le Mie Gemme',
    tr: 'Mücevherlerim',
    az: 'Mənim Cavahiratım'
  },
  'header.hearts': {
    es: 'Vidas',
    fr: 'Vies',
    de: 'Leben',
    it: 'Vite',
    tr: 'Canlar',
    az: 'Canlar'
  },
  'header.empty': {
    es: 'Vacío',
    fr: 'Vide',
    de: 'Leer',
    it: 'Vuoto',
    tr: 'Boş',
    az: 'Boş'
  },

  // Sidebar Footer
  'sidebar.streak': {
    es: 'Racha actual:',
    fr: 'Série actuelle :',
    de: 'Aktuelle Serie:',
    it: 'Serie attuale:',
    tr: 'Mevcut Seri:',
    az: 'Mövcud Seriya:'
  },
  'sidebar.gems': {
    es: 'Gemas:',
    fr: 'Gemmes :',
    de: 'Edelsteine:',
    it: 'Gemme:',
    tr: 'Mücevherler:',
    az: 'Mücevherlər:'
  },
  'sidebar.league': {
    es: 'Liga de Aprendizaje de Inglés',
    fr: 'Ligue d\'Apprentissage de l\'Anglais',
    de: 'Englisch-Lernliga',
    it: 'Lega di Apprendimento dell\'Inglese',
    tr: 'İngilizce Öğrenme Ligi',
    az: 'İngilis Dili Öyrənmə Liqası'
  },
  'sidebar.day': {
    es: 'día',
    fr: 'jour',
    de: 'Tag',
    it: 'giorno',
    tr: 'gün',
    az: 'gün'
  },
  'sidebar.days': {
    es: 'días',
    fr: 'jours',
    de: 'Tage',
    it: 'giorni',
    tr: 'gün',
    az: 'gün'
  },

  // Shop View
  'shop.desc': {
    es: '¡Usa tus gemas ganadas con tanto esfuerzo para personalizar tu adorable experiencia de aprendizaje!',
    fr: 'Utilisez vos gemmes durement gagnées pour personnaliser votre adorable expérience d\'apprentissage !',
    de: 'Nutzen Sie Ihre hart verdienten Edelsteine, um Ihr wunderbares Lernerlebnis zu personalisieren!',
    it: 'Usa le tue gemme guadagnate con fatica per personalizzare la tua adorabile esperienza di apprendimento!',
    tr: 'Zorlukla kazandığınız mücevherleri kullanarak sevimli öğrenme deneyiminizi kişiselleştirin!',
    az: 'Zəhmətlə qazandığınız cavahiratdan istifadə edərək sevimli öyrənmə təcrübənizi fərdiləşdirin!'
  },
  'shop.item.refill_hearts.name': {
    es: 'Recargar Vidas',
    fr: 'Recharger les Vies',
    de: 'Leben auffüllen',
    it: 'Ricarica Vite',
    tr: 'Canları Doldur',
    az: 'Canları Doldur'
  },
  'shop.item.refill_hearts.desc': {
    es: '¡Restaura instantáneamente tus vidas a 5 para que puedas seguir estudiando sin interrupciones!',
    fr: 'Restaurez instantanément vos vies à 5 pour continuer à étudier sans interruption !',
    de: 'Füllen Sie Ihre Leben sofort wieder auf 5 auf, damit Sie ohne Unterbrechung weiterlernen können!',
    it: 'Ripristina istantaneamente le tue vite a 5 per continuare a studiare senza interruzioni!',
    tr: 'Çalışmanıza kesintisiz devam edebilmeniz için canlarınızı anında 5\'e doldurun!',
    az: 'Öyrənməyə fasiləsiz davam edə bilmək üçün canlarınızı dərhal 5-ə doldurun!'
  },
  'shop.item.streak_freeze.name': {
    es: 'Protector de Racha',
    fr: 'Gel de Série',
    de: 'Serienschutz (Freeze)',
    it: 'Congela Serie',
    tr: 'Seri Dondurucu',
    az: 'Seriya Dondurucu'
  },
  'shop.item.streak_freeze.desc': {
    es: 'Protege tu racha diaria si olvidas practicar por un día completo. Se activa automáticamente.',
    fr: 'Protège votre série quotidienne si vous oubliez de pratiquer pendant une journée entière. Utilisation automatique.',
    de: 'Schützt Ihre tägliche Serie, wenn Sie einen ganzen Tag vergessen zu üben. Automatische Aktivierung.',
    it: 'Protegge la tua serie giornaliera se ti dimentichi di fare pratica per un giorno intero. Uso automatico.',
    tr: 'Tam bir gün pratik yapmayı unutursanız günlük serinizi korur. Otomatik kullanılır.',
    az: 'Tam bir gün praktika etməyi unutsanız gündəlik seriyanızı qoruyur. Avtomatik istifadə olunur.'
  },
  'shop.item.costume_tuxedo.name': {
    es: 'Compañero con Esmoquin Elegante',
    fr: 'Compagnon en Smoking Élégant',
    de: 'Schicker Smoking-Begleiter',
    it: 'Compagno in Tuxedo Elegante',
    tr: 'Şık Smokinli Yoldaş',
    az: 'Şık Smokinli Yoldaş'
  },
  'shop.item.costume_tuxedo.desc': {
    es: 'Viste a tu compañero con un esmoquin formal y sofisticado. ¡Aprendamos con estilo!',
    fr: 'Habillez votre compagnon d\'un smoking formel et sophistiqué. Apprenons avec style !',
    de: 'Kleiden Sie Ihren Begleiter in einen anspruchsvollen, formellen Smoking. Lernen wir mit Stil!',
    it: 'Vesti il tuo compagno con un tuxedo formale e sofisticato. Impariamo con stile!',
    tr: 'Yoldaşınıza sofistike, resmi bir smokin giydirin. Tarz sahibi öğrenelim!',
    az: 'Yoldaşınıza zərif, rəsmi smokin geyindirin. Üslubla öyrənək!'
  },
  'shop.item.costume_cowboy.name': {
    es: 'Compañero Vaquero del Salvaje Oeste',
    fr: 'Compagnon Cowboy du Far West',
    de: 'Wildwest-Cowboy-Begleiter',
    it: 'Compagno Cowboy del West',
    tr: 'Vahşi Batı Kovboyu Yoldaş',
    az: 'Vəhşi Qərb Kovboyu Yoldaş'
  },
  'shop.item.costume_cowboy.desc': {
    es: '¿Están listos para aprender inglés? Viste a tu compañero con un sombrero Stetson y chaleco de cuero.',
    fr: 'Prêt pour de l\'anglais ? Équipez votre compagnon d\'un chapeau Stetson et d\'un gilet en cuir.',
    de: 'Bereit für etwas Englisch? Statten Sie Ihren Begleiter mit einem coolen Stetson-Hut und einer Lederweste aus.',
    it: 'Pronto per un po\' di inglese? Equipaggia il tuo compagno con un cappello Stetson e un gilet di pelle.',
    tr: 'İngilizce öğrenmeye hazır mısınız? Yoldaşınızı harika bir Stetson şapka ve deri yelekle donatın.',
    az: 'İngilis dilini öyrənməyə hazırsınız? Yoldaşınızı qəşəng Stetson şlyapası və dəri jiletlə təmin edin.'
  },
  'shop.item.costume_golden.name': {
    es: 'Compañero Dorado Resplandeciente',
    fr: 'Compagnon Doré Majestic',
    de: 'Majestätischer Goldener Begleiter',
    it: 'Compagno Dorato Maestoso',
    tr: 'Görkemli Altın Yoldaş',
    az: 'Möhtəşəm Qızılı Yoldaş'
  },
  'shop.item.costume_golden.desc': {
    es: 'Un traje dorado brillante y majestuoso que refleja un dominio supremo y rachas altas.',
    fr: 'Un costume en or brillant et majestueux qui reflète une maîtrise suprême et des séries élevées.',
    de: 'Ein leuchtendes, majestätisches Goldkostüm, das überragende Meisterschaft und hohe Serien widerspiegelt.',
    it: 'Un costume dorato lucente e maestoso che riflette una maestria suprema e serie elevate.',
    tr: 'Yüksek serileri ve üstün ustalığı yansıtan parıldayan, görkemli bir altın kostüm.',
    az: 'Yüksək seriyaları və üstün ustalığı əks etdirən parıldayan, möhtəşəm qızıl kostyum.'
  },
  'shop.owned': {
    es: 'Adquirido',
    fr: 'Obtenu',
    de: 'Besessen',
    it: 'Posseduto',
    tr: 'Sahip Olundu',
    az: 'Sahib Olundu'
  },
  'shop.buy': {
    es: 'Comprar por',
    fr: 'Acheter pour',
    de: 'Kaufen für',
    it: 'Compra per',
    tr: 'Satın Al:',
    az: 'Satın Al:'
  },

  // Vocabulary View
  'vocab.title': {
    es: 'Kelime Dağarcığı Ustası',
    fr: 'Maître du Vocabulaire',
    de: 'Wortschatz-Meister',
    it: 'Maestro del Vocabolario',
    tr: 'Kelime Dağarcığı Ustası',
    az: 'Söz Ehtiyatı Ustası'
  },
  'vocab.desc': {
    es: '¡Practica y memoriza palabras esenciales en inglés con pronunciaciones de audio y oraciones de ejemplo!',
    fr: 'Pratiquez et mémorisez les mots essentiels en anglais avec prononciation et phrases d\'exemple !',
    de: 'Üben und memorieren Sie wichtige englische Wörter mit Audio-Aussprache und Beispielsätzen!',
    it: 'Pratica e memorizza parole essenziali in inglese con pronunce audio e frasi di esempio!',
    tr: 'Sesli telaffuzlar ve örnek cümlelerle temel İngilizce kelimeleri pratik edin ve ezberleyin!',
    az: 'Səsli tələffüzlər və nümunə cümlələrlə əsas ingilis dili sözlərini praktika edin və əzbərləyin!'
  },
  'vocab.card.pos': {
    es: 'Parte de la oración',
    fr: 'Nature grammaticale',
    de: 'Wortart',
    it: 'Parte del discorso',
    tr: 'Sözcük Türü',
    az: 'Nitq Hissəsi'
  },
  'vocab.search': {
    es: 'Buscar palabras...',
    fr: 'Rechercher des mots...',
    de: 'Wörter suchen...',
    it: 'Cerca parole...',
    tr: 'Kelimeleri ara...',
    az: 'Sözləri axtar...'
  },

  // Leaderboard View
  'leader.title': {
    es: 'Liga de Campeones',
    fr: 'Ligue des Champions',
    de: 'Champions League',
    it: 'Lega dei Campioni',
    tr: 'Şampiyonlar Ligi',
    az: 'Çempionlar Liqası'
  },
  'leader.desc': {
    es: '¡Compite con estudiantes de todo el mundo! Completa lecciones para ganar XP y ascender en la clasificación.',
    fr: 'Affrontez des étudiants du monde entier ! Suivez des leçons pour ganar de l\'XP et grimper au classement.',
    de: 'Messen Sie sich mit Lernenden weltweit! Schließen Sie Lektionen ab, um XP zu verdienen und aufzusteigen.',
    it: 'Competi con studenti di tutto il mondo! Completa le lezioni per guadagnare XP e salire in classifica.',
    tr: 'Dünyanın dört bir yanından öğrencilerle yarışın! XP kazanmak ve liderlik tablosunda yükselmek için dersleri tamamlayın.',
    az: 'Dünyanın hər yerindən olan tələbələrlə yarışın! XP qazanmaq və liderlik cədvəlində yüksəlmək üçün dərsləri tamamlayın.'
  },
  'leader.you': {
    es: 'Tú',
    fr: 'Vous',
    de: 'Du',
    it: 'Tu',
    tr: 'Sen',
    az: 'Sən'
  },
  'leader.rank': {
    es: 'Rango',
    fr: 'Rang',
    de: 'Rang',
    it: 'Posizione',
    tr: 'Sıra',
    az: 'Sıra'
  },
  'leader.student': {
    es: 'Estudiante',
    fr: 'Étudiant',
    de: 'Schüler',
    it: 'Studente',
    tr: 'Öğrenici',
    az: 'Öyrənən'
  },
  'leader.xp': {
    es: 'XP Acumulado',
    fr: 'XP Accumulé',
    de: 'Gesammeltes XP',
    it: 'XP Accumulato',
    tr: 'Toplam XP',
    az: 'Cəmi XP'
  },

  // Speaking club (Practice)
  'practice.title': {
    es: 'Club de Oratoria de IA',
    fr: 'Club d\'Élocution IA',
    de: 'KI-Sprechclub',
    it: 'Club di Conversazione IA',
    tr: 'Yapay Zeka Konuşma Kulübü',
    az: 'Süni İntellekt Danışıq Klubu'
  },
  'practice.desc': {
    es: '¡Practica hablar inglés libremente en voz alta! Di cualquier frase en inglés y nuestra IA evaluará tu pronunciación al instante.',
    fr: 'Entraînez-vous à parler anglais librement et à haute voix ! Dites n\'importe quelle phrase en anglais et notre IA évaluera instantanément votre prononciation.',
    de: 'Üben Sie, frei und laut Englisch zu sprechen! Sagen Sie einen beliebigen Satz auf Englisch und unsere KI bewertet Ihre Aussprache sofort.',
    it: 'Esercitati a parlare inglese liberamente ad alta voce! Pronuncia qualsiasi frase in inglese e la nostra IA valuterá istantaneamente la tua pronuncia.',
    tr: 'Yüksek sesle özgürce İngilizce konuşma pratiği yapın! Herhangi bir İngilizce cümle söyleyin; yapay zekamız telaffuzunuzu anında değerlendirecektir.',
    az: 'Uca səslə sərbəst şəkildə ingiliscə danışıq praktikası edin! Hər hansı ingiliscə cümlə söyləyin; süni intellektimiz tələffüzünüzü dərhal qiymətləndirəcək.'
  },

  // Generic LessonPlayer UI
  'lesson.quit': {
    es: '¿Estás seguro de que deseas salir? Perderás todo el progreso de esta lección.',
    fr: 'Êtes-vous sûr de vouloir quitter ? Vous perdrez toute votre progression dans cette leçon.',
    de: 'Sind Sie sicher, dass Sie abbrechen möchten? Sie verlieren jeglichen Fortschritt in dieser Lektion.',
    it: 'Sei sicuro di voler uscire? Perderai tutti i progressi di questa lezione.',
    tr: 'Çıkmak istediğinizden emin misiniz? Bu dersteki tüm ilerlemenizi kaybedeceksiniz.',
    az: 'Çıxmaq istədiyinizdən əminsiniz? Bu dərsdəki bütün irəliləyişinizi itirəcəksiniz.'
  },
  'lesson.correct': {
    es: '¡Excelente trabajo!',
    fr: 'Excellent travail !',
    de: 'Hervorragende Arbeit!',
    it: 'Ottimo lavoro!',
    tr: 'Harika iş!',
    az: 'Əla iş!'
  },
  'lesson.incorrect': {
    es: 'Respuesta incorrecta. La solución correcta es:',
    fr: 'Réponse incorrecte. La solution correcte est :',
    de: 'Falsche Antwort. Die richtige Lösung ist:',
    it: 'Risposta errata. La solución corretta è:',
    tr: 'Yanlış cevap. Doğru çözüm:',
    az: 'Yanlış cavab. Doğru həll yolu:'
  },
  'lesson.check': {
    es: 'Comprobar',
    fr: 'Vérifier',
    de: 'Überprüfen',
    it: 'Controlla',
    tr: 'Kontrol Et',
    az: 'Yoxla'
  },
  'lesson.continue': {
    es: 'Continuar',
    fr: 'Continuer',
    de: 'Weiter',
    it: 'Continua',
    tr: 'Devam Et',
    az: 'Davam Et'
  },
  'lesson.skip': {
    es: 'Saltar',
    fr: 'Passer',
    de: 'Überspringen',
    it: 'Salta',
    tr: 'Atla',
    az: 'Keç'
  }
};

export function t(key: string, lang: NativeLanguage): string {
  if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
    return TRANSLATIONS[key][lang];
  }
  return key;
}
