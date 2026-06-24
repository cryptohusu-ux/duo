/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WordDefinition {
  english: string;
  native: {
    es: string;
    fr: string;
    de: string;
    it: string;
    tr?: string;
    az?: string;
  };
  pos: string;
  ex: string;
  ext: {
    es: string;
    fr: string;
    de: string;
    it: string;
    tr?: string;
    az?: string;
  };
}

const RAW_VOCABULARY_CATEGORIES: { [key: string]: { name: string; emoji: string; words: WordDefinition[] } } = {
  basics: {
    name: 'Greetings & Basics',
    emoji: '👋',
    words: [
      {
        english: 'Hello',
        native: { es: 'Hola', fr: 'Bonjour', de: 'Hallo', it: 'Ciao' },
        pos: 'Noun / Interjection',
        ex: 'Hello, how are you today?',
        ext: { es: 'Hola, ¿cómo estás hoy?', fr: 'Bonjour, comment allez-vous aujourd\'hui ?', de: 'Hallo, wie geht es dir heute?', it: 'Ciao, come stai oggi?' }
      },
      {
        english: 'Thank you',
        native: { es: 'Gracias', fr: 'Merci', de: 'Danke', it: 'Grazie' },
        pos: 'Phrase',
        ex: 'Thank you for your generous help.',
        ext: { es: 'Gracias por tu generosa ayuda.', fr: 'Merci pour votre aide généreuse.', de: 'Danke für deine großzügige Hilfe.', it: 'Grazie per il tuo generoso aiuto.' }
      },
      {
        english: 'Please',
        native: { es: 'Por favor', fr: 'S\'il vous plaît', de: 'Bitte', it: 'Per favore' },
        pos: 'Adverb',
        ex: 'A cold cup of water, please.',
        ext: { es: 'Un vaso de agua fría, por favor.', fr: 'Un verre d\'eau froide, s\'il vous plaît.', de: 'Ein kaltes Glas Wasser, bitte.', it: 'Un bicchiere d\'acqua fredda, per favore.' }
      },
      {
        english: 'Excuse me',
        native: { es: 'Disculpe / Con permiso', fr: 'Excusez-moi', de: 'Entschuldigung', it: 'Scusa' },
        pos: 'Phrase',
        ex: 'Excuse me, is this seat taken?',
        ext: { es: 'Disculpe, ¿este asiento está ocupado?', fr: 'Excusez-moi, ce siège est-il occupé ?', de: 'Entschuldigung, ist dieser Platz besetzt?', it: 'Scusa, questo posto è occupato?' }
      },
      {
        english: 'Goodbye',
        native: { es: 'Adiós', fr: 'Au revoir', de: 'Auf Wiedersehen', it: 'Arrivederci' },
        pos: 'Interjection',
        ex: 'Goodbye! See you next Monday.',
        ext: { es: '¡Adiós! Nos vemos el próximo lunes.', fr: 'Au revoir ! À lundi prochain.', de: 'Auf Wiedersehen! Bis nächsten Montag.', it: 'Arrivederci! Ci vediamo lunedì prossimo.' }
      },
      {
        english: 'Welcome',
        native: { es: 'Bienvenido', fr: 'Bienvenue', de: 'Willkommen', it: 'Benvenuto' },
        pos: 'Noun / Adj',
        ex: 'Welcome to our cozy mountain cabin!',
        ext: { es: '¡Bienvenido a nuestra acogedora cabaña de montaña!', fr: 'Bienvenue dans notre chalet de montagne douillet !', de: 'Willkommen in unserer gemütlichen Berghütte!', it: 'Benvenuto nella nostra accogliente baita di montagna!' }
      },
      {
        english: 'Friend',
        native: { es: 'Amigo', fr: 'Ami', de: 'Freund', it: 'Amico' },
        pos: 'Noun',
        ex: 'She is my best childhood friend.',
        ext: { es: 'Ella es mi mejor amiga de la infancia.', fr: 'C\'est ma meilleure amie d\'enfance.', de: 'Sie ist meine beste Kindheitsfreundin.', it: 'È la mia migliore amica d\'infanzia.' }
      },
      {
        english: 'Family',
        native: { es: 'Familia', fr: 'Famille', de: 'Familie', it: 'Famiglia' },
        pos: 'Noun',
        ex: 'I love spending time with my family.',
        ext: { es: 'Me encanta pasar tiempo con mi familia.', fr: 'J\'adore passer du temps en famille.', de: 'Ich liebe es, Zeit mit meiner Familie zu verbringen.', it: 'Adoro passare il tempo con la mia famiglia.' }
      }
    ]
  },
  travel: {
    name: 'Travel & Airport',
    emoji: '✈️',
    words: [
      {
        english: 'Airport',
        native: { es: 'Aeropuerto', fr: 'Aéroport', de: 'Flughafen', it: 'Aeroporto' },
        pos: 'Noun',
        ex: 'We must leave for the airport now.',
        ext: { es: 'Debemos salir para el aeropuerto ahora.', fr: 'Nous devons partir pour l\'aéroport maintenant.', de: 'Wir müssen jetzt zum Flughafen aufbrechen.', it: 'Dobbiamo partire per l\'aeroporto adesso.' }
      },
      {
        english: 'Passport',
        native: { es: 'Pasaporte', fr: 'Passeport', de: 'Reisepass', it: 'Passaporto' },
        pos: 'Noun',
        ex: 'Keep your passport in a safe pocket.',
        ext: { es: 'Guarda tu pasaporte en un bolsillo seguro.', fr: 'Gardez votre passeport dans une poche sûre.', de: 'Bewahre deinen Reisepass in einer sicheren Tasche auf.', it: 'Tieni il passaporto in una tasca sicura.' }
      },
      {
        english: 'Luggage',
        native: { es: 'Equipaje', fr: 'Bagages', de: 'Gepäck', it: 'Bagaglio' },
        pos: 'Noun',
        ex: 'The airline lost our checked luggage.',
        ext: { es: 'La aerolínea perdió nuestro equipaje facturado.', fr: 'La compagnie aérienne a perdu nos bagages enregistrés.', de: 'Die Fluggesellschaft hat unser aufgegebenes Gepäck verloren.', it: 'La compagnia aerea ha smarrito il nostro bagaglio registrato.' }
      },
      {
        english: 'Ticket',
        native: { es: 'Billete / Boleto', fr: 'Billet / Ticket', de: 'Fahrkarte / Ticket', it: 'Biglietto' },
        pos: 'Noun',
        ex: 'Can you show me your boarding ticket?',
        ext: { es: '¿Puede mostrarme su boleto de abordar?', fr: 'Pouvez-vous me montrer votre billet d\'embarquement ?', de: 'Können Sie mir Ihre Bordkarte zeigen?', it: 'Può mostrarmi il biglietto d\'imbarco?' }
      },
      {
        english: 'Destination',
        native: { es: 'Destino', fr: 'Destination', de: 'Reiseziel', it: 'Destinazione' },
        pos: 'Noun',
        ex: 'Tokyo is our final travel destination.',
        ext: { es: 'Tokio es nuestro destino final de viaje.', fr: 'Tokyo est notre destination de voyage finale.', de: 'Tokio ist unser endgültiges Reiseziel.', it: 'Tokyo è la nostra destinazione finale del viaggio.' }
      },
      {
        english: 'Hotel',
        native: { es: 'Hotel', fr: 'Hôtel', de: 'Hotel', it: 'Hotel' },
        pos: 'Noun',
        ex: 'We booked a beautiful five-star hotel.',
        ext: { es: 'Reservamos un hermoso hotel de cinco estrellas.', fr: 'Nous avons réservé un magnifique hôtel cinq étoiles.', de: 'Wir haben ein wunderschönes Fünf-Sterne-Hotel gebucht.', it: 'Abbiamo prenotato un bellissimo hotel a cinque stelle.' }
      },
      {
        english: 'Train',
        native: { es: 'Tren', fr: 'Train', de: 'Zug', it: 'Treno' },
        pos: 'Noun',
        ex: 'The express train arrives at noon.',
        ext: { es: 'El tren expreso llega al mediodía.', fr: 'Le train express arrive à midi.', de: 'Der Schnellzug kommt mittags an.', it: 'Il treno espresso arriva a mezzogiorno.' }
      },
      {
        english: 'Adventure',
        native: { es: 'Aventura', fr: 'Aventure', de: 'Abenteuer', it: 'Avventura' },
        pos: 'Noun',
        ex: 'Our road trip was a magnificent adventure.',
        ext: { es: 'Nuestro viaje por carretera fue una magnífica aventura.', fr: 'Notre road trip a été une magnifique aventure.', de: 'Unser Roadtrip war ein herrliches Abenteuer.', it: 'Il nostro viaggio su strada è stato una magnifica avventura.' }
      }
    ]
  },
  food: {
    name: 'Food & Dining',
    emoji: '🍕',
    words: [
      {
        english: 'Delicious',
        native: { es: 'Delicioso', fr: 'Délicieux', de: 'Köstlich', it: 'Delizioso' },
        pos: 'Adjective',
        ex: 'This warm chocolate croissant is delicious.',
        ext: { es: 'Este croissant de chocolate caliente está delicioso.', fr: 'Ce croissant chaud au chocolat est délicieux.', de: 'Dieses warme Schokocroissant ist köstlich.', it: 'Questo cornetto caldo al cioccolato è delizioso.' }
      },
      {
        english: 'Breakfast',
        native: { es: 'Desayuno', fr: 'Petit déjeuner', de: 'Frühstück', it: 'Colazione' },
        pos: 'Noun',
        ex: 'What did you have for breakfast today?',
        ext: { es: '¿Qué desayunaste hoy?', fr: 'Qu\'avez-vous mangé au petit-déjeuner aujourd\'hui ?', de: 'Was hattest du heute zum Frühstück?', it: 'Cosa hai mangiato a colazione oggi?' }
      },
      {
        english: 'Restaurant',
        native: { es: 'Restaurante', fr: 'Restaurant', de: 'Restaurant', it: 'Ristorante' },
        pos: 'Noun',
        ex: 'This cozy local restaurant is famous for pasta.',
        ext: { es: 'Este acogedor restaurante local es famoso por la pasta.', fr: 'Ce restaurant local chaleureux est célèbre pour ses pâtes.', de: 'Dieses gemütliche lokale Restaurant ist berühmt für Pasta.', it: 'Questo accogliente ristorante locale è famoso per la pasta.' }
      },
      {
        english: 'Menu',
        native: { es: 'Menú / Carta', fr: 'Carte / Menu', de: 'Speisekarte', it: 'Menu / Carta' },
        pos: 'Noun',
        ex: 'Could you bring us the dessert menu, please?',
        ext: { es: '¿Podría traernos el menú de postres, por favor?', fr: 'Pourriez-vous nous apporter la carte des desserts, s\'il vous plaît ?', de: 'Könnten Sie uns bitte die Dessertkarte bringen?', it: 'Potrebbe portarci il menu dei dolci, per favore?' }
      },
      {
        english: 'Coffee',
        native: { es: 'Café', fr: 'Café', de: 'Kaffee', it: 'Caffè' },
        pos: 'Noun',
        ex: 'I cannot start my day without hot coffee.',
        ext: { es: 'No puedo empezar mi día sin café caliente.', fr: 'Je ne peux pas commencer ma journée sans café chaud.', de: 'Ohne heißen Kaffee kann ich meinen Tag nicht beginnen.', it: 'Non posso iniziare la giornata senza un caffè caldo.' }
      },
      {
        english: 'Water',
        native: { es: 'Agua', fr: 'Eau', de: 'Wasser', it: 'Acqua' },
        pos: 'Noun',
        ex: 'Always drink plenty of water while hiking.',
        ext: { es: 'Siempre bebe mucha agua mientras haces senderismo.', fr: 'Buvez toujours beaucoup d\'eau pendant la randonnée.', de: 'Trinke beim Wandern immer viel Wasser.', it: 'Bevi sempre molta acqua durante le escursioni.' }
      },
      {
        english: 'Bill / Check',
        native: { es: 'La cuenta', fr: 'L\'addition', de: 'Die Rechnung', it: 'Il conto' },
        pos: 'Noun',
        ex: 'Excuse me, could we have the bill, please?',
        ext: { es: 'Disculpe, ¿nos trae la cuenta, por favor?', fr: 'Excusez-moi, pourrions-nous avoir l\'addition, s\'il vous plaît ?', de: 'Entschuldigung, könnten wir bitte die Rechnung haben?', it: 'Scusa, potremmo avere il conto, per favore?' }
      },
      {
        english: 'Hungry',
        native: { es: 'Hambriento', fr: 'Affamé / Faim', de: 'Hungrig', it: 'Affamato' },
        pos: 'Adjective',
        ex: 'I am so hungry I could eat everything.',
        ext: { es: 'Tengo tanta hambre que podría comer de todo.', fr: 'J\'ai tellement faim que je pourrais tout manger.', de: 'Ich bin so hungrig, dass ich alles essen könnte.', it: 'Ho così fame che potrei mangiare di tutto.' }
      }
    ]
  },
  tech: {
    name: 'Tech & Programming',
    emoji: '💻',
    words: [
      {
        english: 'Software',
        native: { es: 'Software / Programas', fr: 'Logiciel', de: 'Software', it: 'Software' },
        pos: 'Noun',
        ex: 'They develop cutting-edge security software.',
        ext: { es: 'Ellos desarrollan software de seguridad de vanguardia.', fr: 'Ils développent des logiciels de sécurité de pointe.', de: 'Sie entwickeln modernste Sicherheitssoftware.', it: 'Sviluppano software di sicurezza all\'avanguardia.' }
      },
      {
        english: 'Database',
        native: { es: 'Base de datos', fr: 'Base de données', de: 'Datenbank', it: 'Database' },
        pos: 'Noun',
        ex: 'Our user records are stored in a secure cloud database.',
        ext: { es: 'Nuestros registros de usuarios se guardan en una base de datos segura en la nube.', fr: 'Nos dossiers d\'utilisateurs sont stockés dans une base de données cloud sécurisée.', de: 'Unsere Benutzerdaten werden in einer sicheren Cloud-Datenbank gespeichert.', it: 'I record dei nostri utenti sono memorizzati in un database sicuro nel cloud.' }
      },
      {
        english: 'Interface',
        native: { es: 'Interfaz', fr: 'Interface', de: 'Schnittstelle / Oberfläche', it: 'Interfaccia' },
        pos: 'Noun',
        ex: 'The app has a highly intuitive user interface.',
        ext: { es: 'La aplicación tiene una interfaz de usuario muy intuitiva.', fr: 'L\'application dispose d\'une interface utilisateur très intuitive.', de: 'Die App hat eine sehr intuitive Benutzeroberfläche.', it: 'L\'app ha un\'interfaccia utente altamente intuitiva.' }
      },
      {
        english: 'Algorithm',
        native: { es: 'Algoritmo', fr: 'Algorithme', de: 'Algorithmus', it: 'Algoritmo' },
        pos: 'Noun',
        ex: 'Our matching algorithm pairs students perfectly.',
        ext: { es: 'Nuestro algoritmo de coincidencia empareja perfectamente a los estudiantes.', fr: 'Notre algorithme de mise en relation associe parfaitement les étudiants.', de: 'Unser Matching-Algorithmus bringt Schüler perfekt zusammen.', it: 'Il nostro algoritmo di abbinamento accoppia gli studenti in modo perfetto.' }
      },
      {
        english: 'Network',
        native: { es: 'Red', fr: 'Réseau', de: 'Netzwerk', it: 'Rete' },
        pos: 'Noun',
        ex: 'The corporate network was down for two hours.',
        ext: { es: 'La red corporativa estuvo caída durante dos horas.', fr: 'Le réseau de l\'entreprise a été en panne pendant deux heures.', de: 'Das Firmennetzwerk war für zwei Stunden ausgefallen.', it: 'La rete aziendale è rimasta inattiva per due ore.' }
      },
      {
        english: 'Computer',
        native: { es: 'Ordenador / Computadora', fr: 'Ordinateur', de: 'Computer', it: 'Computer' },
        pos: 'Noun',
        ex: 'My new computer compiles code in seconds.',
        ext: { es: 'Mi nueva computadora compila código en segundos.', fr: 'Mon nouvel ordinateur compile le code en quelques secondes.', de: 'Mein neuer Computer kompiliert Code in Sekundenschnelle.', it: 'Il mio nuovo computer compila il codice in pochi secondi.' }
      },
      {
        english: 'Developer',
        native: { es: 'Desarrollador', fr: 'Développeur', de: 'Entwickler', it: 'Sviluppatore' },
        pos: 'Noun',
        ex: 'She works as a senior frontend React developer.',
        ext: { es: 'Ella trabaja como desarrolladora senior de frontend en React.', fr: 'Elle travaille en tant que développeur React frontend senior.', de: 'Sie arbeitet als leitende Frontend-React-Entwicklerin.', it: 'Lavora come sviluppatrice frontend senior React.' }
      },
      {
        english: 'Artificial Intelligence',
        native: { es: 'Inteligencia Artificial', fr: 'Intelligence Artificielle', de: 'Künstliche Intelligenz', it: 'Intelligenza Artificiale' },
        pos: 'Noun',
        ex: 'Artificial intelligence is changing the education system.',
        ext: { es: 'La inteligencia artificial está cambiando el sistema educativo.', fr: 'L\'intelligence artificielle change le système éducatif.', de: 'Künstliche Intelligenz verändert das Bildungssystem.', it: 'L\'intelligenza artificiale sta cambiando il sistema educativo.' }
      }
    ]
  },
  career: {
    name: 'Career & Business',
    emoji: '💼',
    words: [
      {
        english: 'Meeting',
        native: { es: 'Reunión', fr: 'Réunion', de: 'Besprechung / Meeting', it: 'Riunione' },
        pos: 'Noun',
        ex: 'Our strategic board meeting begins at three.',
        ext: { es: 'Nuestra reunión estratégica de la junta comienza a las tres.', fr: 'Notre réunion stratégique du conseil d\'administration commence à trois heures.', de: 'Unsere strategische Vorstandssitzung beginnt um drei.', it: 'La nostra riunione strategica del consiglio di amministrazione inizia alle tre.' }
      },
      {
        english: 'Agreement',
        native: { es: 'Acuerdo', fr: 'Accord', de: 'Vereinbarung / Vertrag', it: 'Accordo' },
        pos: 'Noun',
        ex: 'We finally reached a mutual business agreement.',
        ext: { es: 'Finalmente llegamos a un acuerdo comercial mutuo.', fr: 'Nous sommes finalement parvenus à un accord commercial mutuel.', de: 'Wir haben uns schließlich auf ein gegenseitiges Geschäftsabkommen geeinigt.', it: 'Alla fine abbiamo raggiunto un accordo commerciale reciproco.' }
      },
      {
        english: 'Company',
        native: { es: 'Empresa / Compañía', fr: 'Entreprise / Société', de: 'Unternehmen / Firma', it: 'Azienda' },
        pos: 'Noun',
        ex: 'The tech company has offices in Berlin.',
        ext: { es: 'La empresa tecnológica tiene oficinas en Berlín.', fr: 'L\'entreprise technologique a des bureaux à Berlin.', de: 'Das Technologieunternehmen hat Niederlassungen in Berlin.', it: 'L\'azienda tecnologica ha uffici a Berlino.' }
      },
      {
        english: 'Interview',
        native: { es: 'Entrevista', fr: 'Entretien', de: 'Vorstellungsgespräch', it: 'Colloquio' },
        pos: 'Noun',
        ex: 'Prepare thoroughly for your job interview tomorrow.',
        ext: { es: 'Prepárate a fondo para tu entrevista de trabajo de mañana.', fr: 'Préparez-vous minutieusement pour votre entretien d\'embauche de demain.', de: 'Bereite dich gründlich auf dein Vorstellungsgespräch morgen vor.', it: 'Preparati a fondo per il tuo colloquio di lavoro di domani.' }
      },
      {
        english: 'Negotiation',
        native: { es: 'Negociación', fr: 'Négociation', de: 'Verhandlung', it: 'Trattativa' },
        pos: 'Noun',
        ex: 'Salary negotiation requires confidence and patience.',
        ext: { es: 'La negociación salarial requiere confianza y paciencia.', fr: 'La négociation salariale exige de la confiance et de la patience.', de: 'Gehaltsverhandlungen erfordern Selbstvertrauen und Geduld.', it: 'La trattativa salariale richiede fiducia e pazienza.' }
      },
      {
        english: 'Colleague',
        native: { es: 'Colega / Compañero de trabajo', fr: 'Collègue', de: 'Kollege', it: 'Collega' },
        pos: 'Noun',
        ex: 'My colleagues gifted me a beautiful coffee mug.',
        ext: { es: 'Mis compañeros de trabajo me regalaron una hermosa taza de café.', fr: 'Mes collègues m\'ont offert une magnifique tasse de café.', de: 'Meine Kollegen haben mir eine schöne Kaffeetasse geschenkt.', it: 'I miei colleghi mi hanno regalato una bellissima tazza da caffè.' }
      },
      {
        english: 'Manager',
        native: { es: 'Gerente / Director', fr: 'Directeur / Manager', de: 'Manager / Abteilungsleiter', it: 'Manager / Direttore' },
        pos: 'Noun',
        ex: 'The operations manager approved our marketing budget.',
        ext: { es: 'El gerente de operaciones aprobó nuestro presupuesto de marketing.', fr: 'Le directeur des opérations a approuvé notre budget de marketing.', de: 'Der Betriebsleiter hat unser Marketingbudget genehmigt.', it: 'Il responsabile delle operazioni ha approvato il nostro budget di marketing.' }
      },
      {
        english: 'Presentation',
        native: { es: 'Presentación', fr: 'Présentation', de: 'Präsentation', it: 'Presentazione' },
        pos: 'Noun',
        ex: 'His slides for the presentation were outstanding.',
        ext: { es: 'Sus diapositivas para la presentación fueron sobresalientes.', fr: 'Ses diapositives pour la présentation étaient exceptionnelles.', de: 'Seine Folien für die Präsentation waren hervorragend.', it: 'Le sue diapositive per la presentazione erano eccezionali.' }
      }
    ]
  },
  slangs: {
    name: 'Slangs & Idioms',
    emoji: '🔥',
    words: [
      {
        english: 'Piece of cake',
        native: { es: 'Pan comido', fr: 'Un jeu d\'enfant', de: 'Kinderspiel', it: 'Un gioco da ragazzi' },
        pos: 'Idiom',
        ex: 'That exam was a piece of cake!',
        ext: { es: '¡Ese examen fue pan comido!', fr: 'Cet examen était un jeu d\'enfant !', de: 'Diese Prüfung war ein Kinderspiel!', it: 'Quell\'esame è stato un gioco da ragazzi!' }
      },
      {
        english: 'Break a leg',
        native: { es: 'Mucha suerte', fr: 'Merde / Bonne chance', de: 'Hals- und Beinbruch', it: 'In bocca al lupo' },
        pos: 'Idiom',
        ex: 'Break a leg on stage tonight!',
        ext: { es: '¡Mucha suerte en el escenario esta noche!', fr: 'Bonne chance sur scène ce soir !', de: 'Hals- und Beinbruch heute Abend auf der Bühne!', it: 'In bocca al lupo sul palco stasera!' }
      },
      {
        english: 'Cool',
        native: { es: 'Guay / Chulo', fr: 'Cool / Sympa', de: 'Cool / Geil', it: 'Fico / Forte' },
        pos: 'Slang',
        ex: 'Those sneakers are really cool.',
        ext: { es: 'Esas zapatillas están muy guay.', fr: 'Ces baskets sont vraiment cool.', de: 'Diese Sneaker sind echt cool.', it: 'Quelle scarpe da ginnastica sono davvero fighe.' }
      },
      {
        english: 'Bust',
        native: { es: 'Fracaso', fr: 'Fiasco', de: 'Reinfall / Pleite', it: 'Fiasco / Fallimento' },
        pos: 'Slang',
        ex: 'The startup business was a complete bust.',
        ext: { es: 'El negocio de la startup fue un fracaso total.', fr: 'La start-up a été un fiasco complet.', de: 'Das Startup-Unternehmen war eine totale Pleite.', it: 'La start-up è stata un completo fallimento.' }
      },
      {
        english: 'Spill the beans',
        native: { es: 'Revelar el secreto', fr: 'Vendre la mèche', de: 'Ausplaudern', it: 'Sputare il rospo' },
        pos: 'Idiom',
        ex: 'Come on, spill the beans about the secret party!',
        ext: { es: '¡Vamos, revela el secreto sobre la fiesta secreta!', fr: 'Allez, vends la mèche à propos de la fête secrète !', de: 'Komm schon, plaudere das Geheimnis über die geheime Party aus!', it: 'Dai, sputa il rospo sulla festa segreta!' }
      },
      {
        english: 'Chilled out',
        native: { es: 'Relajado', fr: 'Tranquille / Détendu', de: 'Entspannt / Gelassen', it: 'Rilassato' },
        pos: 'Slang / Adj',
        ex: 'We had a chilled out weekend by the lake.',
        ext: { es: 'Pasamos un fin de semana relajado junto al lago.', fr: 'Nous avons passé un week-end tranquille au bord du lac.', de: 'Wir hatten ein entspanntes Wochenende am See.', it: 'Abbiamo passato un fine settimana rilassato al lago.' }
      }
    ]
  }
};

const EXTRA_LANGS: Record<string, { tr: string; az: string; trExt: string; azExt: string }> = {
  // basics
  'Hello': {
    tr: 'Merhaba',
    az: 'Salam',
    trExt: 'Merhaba, bugün nasılsın?',
    azExt: 'Salam, bugün necəsən?'
  },
  'Thank you': {
    tr: 'Teşekkür ederim',
    az: 'Təşəkkür edirəm',
    trExt: 'Cömert yardımınız için teşekkür ederim.',
    azExt: 'Səxavətli köməyiniz üçün təşəkkür edirəm.'
  },
  'Please': {
    tr: 'Lütfen',
    az: 'Zəhmət olmasa',
    trExt: 'Soğuk bir bardak su, lütfen.',
    azExt: 'Soyuq bir stəkan su, zəhmət olmasa.'
  },
  'Excuse me': {
    tr: 'Affedersiniz',
    az: 'Bağışlayın',
    trExt: 'Affedersiniz, bu koltuk boş mu?',
    azExt: 'Bağışlayın, bu yer boşdur?'
  },
  'Goodbye': {
    tr: 'Hoşça kalın',
    az: 'Sağ olun',
    trExt: 'Hoşça kalın! Gelecek pazartesi görüşürüz.',
    azExt: 'Sağ olun! Gələn bazar ertəsi görüşənədək.'
  },
  'Welcome': {
    tr: 'Hoş geldiniz',
    az: 'Xoş gəlmisiniz',
    trExt: 'Konforlu dağ kulübemize hoş geldiniz!',
    azExt: 'Rahat dağ daxmamıza xoş gəlmisiniz!'
  },
  'Friend': {
    tr: 'Arkadaş',
    az: 'Dost',
    trExt: 'O benim en iyi çocukluk arkadaşım.',
    azExt: 'O, mənim uşaqlıqdakı ən yaxın dostumdur.'
  },
  'Family': {
    tr: 'Aile',
    az: 'Ailə',
    trExt: 'Ailemle vakit geçirmeyi seviyorum.',
    azExt: 'Ailəmlə vaxt keçirməyi sevirəm.'
  },

  // travel
  'Airport': {
    tr: 'Havalimanı',
    az: 'Hava limanı',
    trExt: 'Şimdi havalimanına gitmek üzere yola çıkmalıyız.',
    azExt: 'İndi hava limanına yola düşməliyik.'
  },
  'Passport': {
    tr: 'Pasaport',
    az: 'Pasport',
    trExt: 'Güvenlik görevlisi pasaportumu dikkatle inceledi.',
    azExt: 'Təhlükəsizlik əməkdaşı pasportumu diqqətlə yoxladı.'
  },
  'Hotel': {
    tr: 'Otel',
    az: 'Otel',
    trExt: 'Şehir merkezinde lüks bir otel için rezervasyon yaptık.',
    azExt: 'Şəhərin mərkəzində lüks bir otel bron etdik.'
  },
  'Luggage': {
    tr: 'Bagaj',
    az: 'Baqaj / Yük',
    trExt: 'Uçuşumuzdan önce bagajlarımızı tartmamız gerekiyor.',
    azExt: 'Uçuşdan əvvəl baqajımızı çəkməliyik.'
  },
  'Flight': {
    tr: 'Uçuş',
    az: 'Uçuş',
    trExt: 'Londra\'ya giden direkt uçuşumuz yaklaşık sekiz saat sürüyor.',
    azExt: 'Londona birbaşa uçuşumuz təxminən səkkiz saat çəkir.'
  },
  'Ticket': {
    tr: 'Bilet',
    az: 'Bilet',
    trExt: 'Hızlı tren için gidiş-dönüş biletini internetten aldım.',
    azExt: 'Sürət qatarı üçün gediş-dönüş biletini onlayn aldım.'
  },
  'Adventure': {
    tr: 'Macera',
    az: 'Macəra',
    trExt: 'Sırt çantamızla ormanda yürüyüş yapmak gerçek bir maceraydı.',
    azExt: 'Meşədə kürək çantası ilə gəzmək əsl macəra idi.'
  },
  'Destination': {
    tr: 'Varış noktası',
    az: 'Təyinat nöqtəsi',
    trExt: 'Paris, dünyadaki en popüler tatil varış noktalarından biridir.',
    azExt: 'Paris, dünyada ən populyar tətil təyinat nöqtələrindən biridir.'
  },

  // phrases
  'Good morning': {
    tr: 'Günaydın',
    az: 'Sabahınız xeyir',
    trExt: 'Sınıfa giren öğretmen herkese günaydın dedi.',
    azExt: 'Müəllim sinfə girərkən hamıya sabahınız xeyir dedi.'
  },
  'How much is this': {
    tr: 'Bu ne kadar',
    az: 'Bu neçəyədir',
    trExt: 'Bu mavi deri ceketin fiyatı ne kadar acaba?',
    azExt: 'Maraqlıdır, bu mavi dəri gödəkçə neçəyədir?'
  },
  'I am lost': {
    tr: 'Kayboldum',
    az: 'Azmışam / İtmişəm',
    trExt: 'Haritam çalışmıyor ve sanırım yabancı bir şehirde kayboldum.',
    azExt: 'Xəritəm işləmir və deyəsən, yad bir şəhərdə azmışam.'
  },
  'Nice to meet you': {
    tr: 'Tanıştığımıza memnun oldum',
    az: 'Tanış olmağımıza şadam',
    trExt: 'Yeni takım liderimizle tanıştığımıza çok memnun olduk.',
    azExt: 'Yeni komanda rəhbərimizlə tanış olmağımıza çox şad olduq.'
  },
  'Do you speak English': {
    tr: 'İngilizce konuşabiliyor musunuz',
    az: 'İngiliscə danışa bilirsiniz',
    trExt: 'Affedersiniz, İngilizce konuşabiliyor musunuz? Yardıma ihtiyacım var.',
    azExt: 'Bağışlayın, ingiliscə danışa bilirsiniz? Köməyə ehtiyacım var.'
  },
  'I do not understand': {
    tr: 'Anlamıyorum',
    az: 'Anlamıram',
    trExt: 'Çok hızlı konuştukları için bu kelimenin anlamını anlamıyorum.',
    azExt: 'Çox sürətlə danışdıqları üçün bu sözün mənasını anlamıram.'
  },
  'Where is the bathroom': {
    tr: 'Lavabo nerede',
    az: 'Ayaqyolu haradadır',
    trExt: 'Affedersiniz, bu restoranda lavabo nerede acaba?',
    azExt: 'Bağışlayın, bu restoranda ayaqyolu haradadır?'
  },
  'Have a nice day': {
    tr: 'İyi günler dilerim',
    az: 'Xoş günlər arzulayıram',
    trExt: 'Kasiyer makbuzu uzatırken iyi günler diledi.',
    azExt: 'Kassir qəbzi təqdim edərkən xoş günlər arzuladı.'
  },

  // food
  'Delicious': {
    tr: 'Lezzetli',
    az: 'Ləzzətli',
    trExt: 'Büyükannemin ev yapımı elmalı turtası son derece lezzetliydi.',
    azExt: 'Nənəmin ev üsulu hazırladığı alma piroqu olduqca ləzzətli idi.'
  },
  'Breakfast': {
    tr: 'Kahvaltı',
    az: 'Səhər yeməyi',
    trExt: 'Her sabah kahvaltıda taze yumurta ve meyve yeriz.',
    azExt: 'Hər səhər yeməyində təzə yumurta və meyvə yeyirik.'
  },
  'Water': {
    tr: 'Su',
    az: 'Su',
    trExt: 'Yorucu bir koşudan sonra buz gibi bir bardak su çok iyi geldi.',
    azExt: 'Yorucu qaçışdan sonra buz kimi bir stəkan su çox xoş oldu.'
  },
  'Restaurant': {
    tr: 'Restoran',
    az: 'Restoran',
    trExt: 'Evlilik yıldönümümüzü kutlamak için şık bir restorana gittik.',
    azExt: 'Evlilik ildönümümüzü qeyd etmək üçün şık bir restorana getdik.'
  },
  'Coffee': {
    tr: 'Kahve',
    az: 'Kofe / Qəhvə',
    trExt: 'Sabahları taze çekilmiş kahve kokusuyla uyanmayı seviyorum.',
    azExt: 'Səhərlər təzə üyüdülmüş qəhvə qoxusu ilə oyanmağı sevirəm.'
  },
  'Menu': {
    tr: 'Menü',
    az: 'Menyu',
    trExt: 'Garson siparişi almadan önce bize akşam yemeği menüsünü getirdi.',
    azExt: 'Ofisiant sifarişi qəbul etməzdən əvvəl bizə şam yeməyi menyusunu gətirdi.'
  },
  'Bill': {
    tr: 'Hesap',
    az: 'Hesab',
    trExt: 'Affedersiniz, hesabı getirebilir misiniz lütfen?',
    azExt: 'Bağışlayın, hesabı gətirə bilərsiniz, zəhmət olmasa?'
  },
  'Hungry': {
    tr: 'Aç',
    az: 'Ac',
    trExt: 'O kadar açım ki masadaki her şeyi yiyebilirim.',
    azExt: 'O qədər acam ki, masadakı hər şeyi yeyə bilərəm.'
  },

  // tech
  'Software': {
    tr: 'Yazılım',
    az: 'Proqram təminatı',
    trExt: 'Onlar son teknoloji güvenlik yazılımları geliştiriyorlar.',
    azExt: 'Onlar ən müasir təhlükəsizlik proqram təminatı hazırlayırlar.'
  },
  'Database': {
    tr: 'Veritabanı',
    az: 'Məlumat bazası',
    trExt: 'Kullanıcı kayıtlarımız güvenli bir bulut veritabanında saklanmaktadır.',
    azExt: 'İstifadəçi qeydlərimiz təhlükəsiz bulud məlumat bazasında saxlanılır.'
  },
  'Interface': {
    tr: 'Arayüz',
    az: 'İnterfeys',
    trExt: 'Uygulama oldukça sezgisel bir kullanıcı arayüzüne sahiptir.',
    azExt: 'Tətbiq olduqca asan anlaşılan istifadəçi interfeysinə malikdir.'
  },
  'Algorithm': {
    tr: 'Algoritma',
    az: 'Alqoritm',
    trExt: 'Eşleştirme algoritmamız öğrencileri mükemmel bir şekilde eşleştirir.',
    azExt: 'Bizim uyğunlaşdırma alqoritmimiz tələbələri mükəmməl şəkildə birləşdirir.'
  },
  'Network': {
    tr: 'Ağ',
    az: 'Şəbəkə',
    trExt: 'Şirket ağı iki saat boyunca hizmet dışı kaldı.',
    azExt: 'Şirkət şəbəkəsi iki saat ərzində fəaliyyət göstərmədi.'
  },
  'Computer': {
    tr: 'Bilgisayar',
    az: 'Kompüter',
    trExt: 'Yeni bilgisayarım kodları saniyeler içinde derliyor.',
    azExt: 'Mənim yeni kompüterim kodu saniyələr ərzində tərtib edir.'
  },
  'Developer': {
    tr: 'Geliştirici',
    az: 'Tərtibatçı / Proqramçı',
    trExt: 'Kıdemli bir ön uç React geliştiricisi olarak çalışıyor.',
    azExt: 'O, baş frontend React tərtibatçısı kimi çalışır.'
  },
  'Artificial Intelligence': {
    tr: 'Yapay Zeka',
    az: 'Süni İntellekt',
    trExt: 'Yapay zeka eğitim sistemini değiştiriyor.',
    azExt: 'Süni intellekt təhsil sistemini dəyişir.'
  },

  // career
  'Meeting': {
    tr: 'Toplantı',
    az: 'Toplantı / Görüş',
    trExt: 'Stratejik yönetim kurulu toplantımız saat üçte başlıyor.',
    azExt: 'Strateji idarə heyətinin iclası saat üçdə başlayır.'
  },
  'Agreement': {
    tr: 'Anlaşma',
    az: 'Müqavilə / Razılaşma',
    trExt: 'Sonunda karşılıklı bir iş anlaşmasına vardık.',
    azExt: 'Nəhayət, qarşılıqlı biznes razılığına gəldik.'
  },
  'Company': {
    tr: 'Şirket',
    az: 'Şirkət',
    trExt: 'Teknoloji şirketinin Berlin\'de ofisleri bulunuyor.',
    azExt: 'Texnologiya şirkətinin Berlində ofisləri var.'
  },
  'Interview': {
    tr: 'Mülakat / Görüşme',
    az: 'Müsahibə',
    trExt: 'Yarınki iş mülakatınız için kapsamlı bir şekilde hazırlanın.',
    azExt: 'Sabahkı iş müsahibəniz üçün hərtərəfli hazırlaşın.'
  },
  'Negotiation': {
    tr: 'Müzakere',
    az: 'Danışıqlar',
    trExt: 'Maaş müzakeresi özgüven ve sabır gerektirir.',
    azExt: 'Maaş danışıqları özünəinam və səbir tələb edir.'
  },
  'Colleague': {
    tr: 'Meslektaş / İş arkadaşı',
    az: 'Həmkar',
    trExt: 'Meslektaşlarım bana güzel bir kahve kupası hediye etti.',
    azExt: 'Həmkarlarım mənə gözəl bir qəhvə fincanı hədiyyə etdilər.'
  },
  'Manager': {
    tr: 'Yönetici / Müdür',
    az: 'Menecer / Direktor',
    trExt: 'Operasyon müdürü pazarlama bütçemizi onayladı.',
    azExt: 'Əməliyyat meneceri marketinq büdcəmizi təsdiqlədi.'
  },
  'Presentation': {
    tr: 'Sunum',
    az: 'Təqdimat',
    trExt: 'Sunum için hazırladığı slaytlar olağanüstüydü.',
    azExt: 'Təqdimat üçün hazırladığı slaydlar mükəmməl idi.'
  },

  // slangs
  'Piece of cake': {
    tr: 'Çocuk oyuncağı',
    az: 'Su içmək kimi / Çox asan',
    trExt: 'O sınav çocuk oyuncağıydı!',
    azExt: 'O imtahan çox asan idi!'
  },
  'Break a leg': {
    tr: 'Şansın açık olsun / Şeytanın bacağını kır',
    az: 'Uğurlar! / Sahədə uğurlar',
    trExt: 'Bu gece sahnede şeytanın bacağını kır!',
    azExt: 'Bu gecə səhnədə sizə uğurlar arzulayıram!'
  },
  'Cool': {
    tr: 'Harika / Havalı',
    az: 'Əla / Havalı',
    trExt: 'Bu spor ayakkabılar gerçekten çok havalı.',
    azExt: 'Bu idman ayaqqabıları həqiqətən çox havalıdır.'
  },
  'Bust': {
    tr: 'Fiyasko / Tam bir başarısızlık',
    az: 'Fiyasko / Uğursuzluq',
    trExt: 'Yeni kurulan girişim işi tam bir fiyaskoydu.',
    azExt: 'Yeni yaradılan startap tamamilə uğursuz oldu.'
  },
  'Spill the beans': {
    tr: 'Baklayı ağzından çıkarmak',
    az: 'Sirri açmaq / Ağzından qaçırmaq',
    trExt: 'Hadi, gizli parti hakkındaki baklayı ağzından çıkar!',
    azExt: 'Hə, gizli partiya haqqındakı sirri aç!'
  },
  'Chilled out': {
    tr: 'Sakin / Rahat',
    az: 'Rahat / Sakit',
    trExt: 'Göl kenarında sakin bir hafta sonu geçirdik.',
    azExt: 'Göl kənarında sakit bir həftə sonu keçirdik.'
  }
};

export const VOCABULARY_CATEGORIES: { [key: string]: { name: string; emoji: string; words: WordDefinition[] } } = {};

// Merge EXTRA_LANGS into RAW_VOCABULARY_CATEGORIES and export VOCABULARY_CATEGORIES
for (const catKey of Object.keys(RAW_VOCABULARY_CATEGORIES)) {
  const cat = RAW_VOCABULARY_CATEGORIES[catKey];
  VOCABULARY_CATEGORIES[catKey] = {
    name: cat.name,
    emoji: cat.emoji,
    words: cat.words.map(w => {
      const extra = EXTRA_LANGS[w.english] || {
        tr: w.english,
        az: w.english,
        trExt: w.ex,
        azExt: w.ex
      };
      return {
        ...w,
        native: {
          ...w.native,
          tr: extra.tr,
          az: extra.az
        },
        ext: {
          ...w.ext,
          tr: extra.trExt,
          az: extra.azExt
        }
      };
    })
  };
}
