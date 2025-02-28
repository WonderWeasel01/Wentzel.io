const quizData = {
  questions: {
    1: '', // Empty for day 1
    2: 'Fra hvilken dato skiftede vi officielt navn til RealTruck?',
    3: 'Hvilke mål indenfor miljø har vi hos RealTruck Denmark?',
    4: 'Hvis du ser en nærved-ulykke (Sikkerhedshændelse) skal du?',
    5: 'Hvem er den største kunde for RealTruck Denmark i 2024?',
    6: 'Hvem er formand for AMO?',
    7: '', // Empty for day 7
    8: '', // Empty for day 8
    9: 'Hvad må du smide ud i restaffald?',
    10: 'Hvilken hunderace er Jeppes hund?',
    11: 'Hvor mange hjertestartere har vi hos RealTruck Danmark?',
    12: 'Hvilken sætning går igen over vores kampagner i øjeblikket?',
    13: 'Hvis brandalarmen går, skal du?',
    14: '', // Empty for day 14
    15: '', // Empty for day 15
    16: 'Hvor meget vejer Alexanders kat?',
    17: 'Hvis du får en idé indenfor Sustainability og Sikkerhed skal du?',
    18: 'Hvor har Andreas fra produktionen boet i en periode?',
    19: 'Hvis du skal arbejde med kemikalier der kræver maske, skal du?',
    20: 'Hvem er babyen på billedet?',
    21: '', // Empty for day 21
    22: '', // Empty for day 22
    23: '', // Empty for day 23
    24: '', // Empty for day 24
  },
  answers: {
    1: [],
    2: ['1. januar 2024', 'Vi har endnu ikke ændret navn', '1. oktober 2024'],
    3: [
      'Reducere aluminiumsaffald',
      'Reducere kemikalier',
      'Øge vores genanvendelsesprocent på affald',
      'Alle ovenstående svarmuligheder',
    ],
    4: [
      'Bare gå videre',
      'Tage fat i din nærmeste leder og få det registreret af EHS',
      'Håbe på, at en anden tager sig af det.',
    ],
    5: ['VW', 'Ford', 'Toyota'],
    6: [
      'Jeppe Christiansen',
      'Jeanette Hassel',
      'Anja Lindegaard',
      'Daniel Jones',
    ],
    7: [],
    8: [],
    9: ['Klar plast', 'Pap og papir', 'Sodavandsdåser', 'Ingen af delene'],
    10: ['Labradoodle', 'Shæfer', 'Chihuahua'],
    11: ['1', '2', '3', 'Ingen'],
    12: [
      'Bring your truck to life saver',
      'Unleash the full potential of your truck',
      'Transform your truck, elevate your ride',
    ],
    13: [
      'Sikre dig at du får jakke og madpakke med ud',
      'Gå ud ad hovedindgangen',
      'Forlade bygningen af nærmeste udgang med det samme',
    ],
    14: [],
    15: [],
    16: ['15 kg.', '4 kg.', '80 kg.'],
    17: [
      'Snakke med din kollega og håbe at nogle hører det',
      'Skrive et forslag på Kaizen-tavlen eller få hjælp af din leder til det',
      'Gøre ingenting',
    ],
    18: ['Spanien', 'Grønland', 'Dubai'],
    19: ['Være ligeglad', 'Tage en filtermaske på', 'Tage en Corona-maske på'],
    20: ['Wassim', 'Jeppe Christiansen', 'Oliver Wentzel', 'Jeanette Hassel'],
    21: [],
    22: [],
    23: [],
    24: [],
  },
  correctAnswers: {
    1: '',
    2: '1. januar 2024',
    3: 'Alle ovenstående svarmuligheder',
    4: 'Tage fat i din nærmeste leder og få det registreret af EHS',
    5: 'Ford',
    6: 'Jeanette Hassel',
    7: '',
    8: '',
    9: 'Ingen af delene',
    10: 'Shæfer',
    11: '2',
    12: 'Transform your truck, elevate your ride',
    13: 'Forlade bygningen af nærmeste udgang med det samme',
    14: '',
    15: '',
    16: '15 kg.',
    17: 'Skrive et forslag på Kaizen-tavlen eller få hjælp af din leder til det',
    18: 'Dubai',
    19: 'Tage en filtermaske på',
    20: 'Oliver Wentzel',
    21: '',
    22: '',
    23: '',
    24: '',
  },
  submissions: {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
    13: [],
    14: [],
    15: [],
    16: [],
    17: [],
    18: [],
    19: [],
    20: [],
    21: [],
    22: [],
    23: [],
    24: [],
  },
};

export const submitQuizAnswer = (req, res) => {
  const { day, name, answer } = req.body;
  if (!quizData.submissions[day]) {
    return res.status(400).send({ message: 'Invalid day' });
  }
  quizData.submissions[day].push({ name, answer });
  res.status(200).send({ message: 'Answer submitted successfully' });
};

export const getQuizWinner = (req, res) => {
  const today = new Date();
  const day = Math.min(today.getDate() - 1, 24); // Seneste færdige dag, max 24
  const winners = [];

  for (let i = 0; i < day; i++) {
    // Change the loop condition to exclude the current day
    if (!quizData.submissions[i] || quizData.submissions[i].length === 0) {
      winners.unshift({
        day: i + 1,
        winner: 'Ingen vindere for denne dag',
      });
      continue;
    }

    const correctSubmissions = quizData.submissions[i].filter(
      (submission) => submission.answer === quizData.correctAnswers[i]
    );

    if (correctSubmissions.length === 0) {
      winners.unshift({
        day: i + 1,
        winner: 'No correct submissions for this day',
      });
      continue;
    }

    const randomWinner =
      correctSubmissions[Math.floor(Math.random() * correctSubmissions.length)];

    winners.unshift({
      day: i + 1,
      winner: randomWinner.name,
    });
  }

  res.status(200).send(winners);
};

export const getQuizQuestion = (req, res) => {
  const today = new Date();
  const day = today.getDate();

  if (!quizData.questions[day]) {
    return res.status(400).send({ message: 'Invalid day' });
  }

  res.status(200).send({
    question: quizData.questions[day],
    answers: quizData.answers[day],
  });
};

export const getAllQuizAnswers = (req, res) => {
  res.status(200).send({ submissions: quizData.submissions });
};
