/**
 * English A1 curriculum: 12 lessons aligned with CEFR A1.
 * Imported into the database with: npm run content:en-a1
 *
 * Lesson ids keep the original four (en-a1-01..04) so learners' progress survives;
 * the order on screen comes from the array order, not from the id.
 *
 * Lesson HTML uses only plain elements and the classes styled in src/styles/design.css
 * (lesson-goal, grammar-table, examples, tr-note, dialog, mistakes).
 */

import { goal, h, p, table, examples, trNote, dialog, mistakes, q } from './lessonHtml.js';

export const STAGE_ID = 'en-a1';

export const A1_LESSONS = [
  // 1 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-a1-01',
    title: 'Selamlaşma ve Kendini Tanıtma',
    duration: '20 dk',
    description: 'Selamlaşma, vedalaşma, adını ve nereli olduğunu söyleme.',
    deepDive: [
      goal('İnsanlarla selamlaşıp vedalaşabilir, adını, yaşını ve nereli olduğunu söyleyebilir, karşındakine aynı soruları sorabilirsin.'),
      h('Selamlaşma'),
      p('Günün saatine ve ortamın resmiyetine göre farklı ifadeler kullanılır. <strong>Hi</strong> ve <strong>Hello</strong> her zaman güvenlidir.'),
      table(['İfade', 'Ne zaman?', 'Anlamı'], [
        ['Hi / Hello', 'Her zaman', 'Merhaba'],
        ['Good morning', 'Öğlene kadar', 'Günaydın'],
        ['Good afternoon', 'Öğleden akşama', 'İyi günler'],
        ['Good evening', 'Akşam, karşılaşırken', 'İyi akşamlar'],
        ['Good night', 'Gece, ayrılırken', 'İyi geceler']
      ]),
      p('<strong>Good night</strong> selamlaşmak için değil, ayrılırken ya da yatmadan önce söylenir. Akşam birine rastladığında <strong>Good evening</strong> dersin.'),
      h('Hal hatır sorma'),
      examples([
        ['How are you?', 'Nasılsın?'],
        ["I'm fine, thanks. And you?", 'İyiyim, teşekkürler. Ya sen?'],
        ["I'm good / I'm OK / Not bad.", 'İyiyim / Fena değil.'],
        ['Nice to meet you.', 'Tanıştığımıza memnun oldum.'],
        ['Nice to meet you, too.', 'Ben de memnun oldum.']
      ]),
      h('Kendini tanıtma'),
      examples([
        ["My name is Elif. / I'm Elif.", 'Benim adım Elif.'],
        ["I'm 24 (years old).", '24 yaşındayım.'],
        ["I'm from Turkey. I'm Turkish.", "Türkiye'denim. Türküm."],
        ['I live in İzmir.', "İzmir'de yaşıyorum."],
        ["I'm a teacher. / I'm a student.", 'Öğretmenim. / Öğrenciyim.']
      ]),
      h('Soru sorma'),
      examples([
        ["What's your name?", 'Adın ne?'],
        ['How old are you?', 'Kaç yaşındasın?'],
        ['Where are you from?', 'Nerelisin?'],
        ['What do you do?', 'Ne iş yapıyorsun?']
      ]),
      h('Vedalaşma'),
      p('<strong>Goodbye</strong> (hoşça kal), <strong>Bye</strong> (görüşürüz, samimi), <strong>See you later / See you tomorrow</strong> (sonra / yarın görüşürüz), <strong>Have a nice day</strong> (iyi günler).'),
      trNote('Türkçede "Ben öğretmenim" derken meslekten önce bir şey gelmez. İngilizcede tekil meslekten önce <strong>a / an</strong> gelir: <em>I\'m <u>a</u> teacher</em>, <em>She\'s <u>an</u> engineer</em>. Yaş söylerken de "yaşındayım" fiili yoktur, <strong>be</strong> kullanılır: <em>I <u>am</u> 24</em>.'),
      h('Mini diyalog'),
      dialog([
        ['Anna', 'Hi! I\'m Anna. What\'s your name?'],
        ['Mert', 'Hello, Anna. My name is Mert. Nice to meet you.'],
        ['Anna', 'Nice to meet you, too. Where are you from?'],
        ['Mert', "I'm from Turkey, from Bursa. And you?"],
        ['Anna', "I'm from Canada. I'm a student here."],
        ['Mert', 'Great! See you later, Anna.'],
        ['Anna', 'Bye!']
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['I have 24 years.', "I'm 24.", 'Yaş "have" ile değil "be" ile söylenir.'],
        ["I'm teacher.", "I'm a teacher.", 'Tekil meslekten önce a / an gelir.'],
        ['Good night! (akşam karşılaşınca)', 'Good evening!', 'Good night yalnızca ayrılırken söylenir.'],
        ['How are you? — Thanks, fine. (karşı soru yok)', "I'm fine, thanks. And you?", 'Karşı soruyu sormak kibarlık sayılır.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Karşı soruyu unutma', text: '"How are you?" sorusuna cevap verdikten sonra "And you?" diye sormak doğal ve kibardır.' },
      { type: 'good', title: 'Meslekte a / an', text: '"I\'m <strong>a</strong> doctor", "He\'s <strong>an</strong> engineer" — tekil meslekten önce mutlaka a / an kullan.' },
      { type: 'bad', title: 'Yaşı have ile söyleme', text: '"I have 20 years" yanlıştır. Doğrusu "I\'m 20" ya da "I\'m 20 years old".' }
    ],
    questions: [
      q('Selamlaşma', 'Saat sabah 9. Bir iş arkadaşınla karşılaştın. Ne dersin?', ['Good night!', 'Good morning!', 'Good evening!', 'Goodbye!'], 1, 'Öğlene kadar "Good morning" kullanılır.'),
      q('Selamlaşma', '"How are you?" sorusuna en uygun cevap hangisi?', ["I'm 25.", "I'm from Ankara.", "I'm fine, thanks. And you?", 'My name is Can.'], 2, '"How are you?" hal hatır sorar; cevap "I\'m fine, thanks" gibi olur.'),
      q('Tanışma', 'Biriyle ilk tanıştığında ne dersin?', ['Nice to meet you.', 'See you tomorrow.', 'Good night.', 'Have a nice day.'], 0, '"Nice to meet you" = Tanıştığımıza memnun oldum.'),
      q('Dilbilgisi', 'Doğru cümle hangisi?', ['I have 30 years.', 'I am 30.', 'I am 30 year.', 'My age 30.'], 1, 'Yaş "be" fiiliyle söylenir: I am 30 (years old).'),
      q('Dilbilgisi', '"She is ___ engineer." boşluğa ne gelir?', ['a', 'an', 'the', '—'], 1, 'Sesli harfle başlayan kelimeden önce "an" gelir: an engineer.'),
      q('Soru', 'Birine nereli olduğunu nasıl sorarsın?', ['Where do you live from?', 'Where are you from?', 'What are you from?', 'Where you are from?'], 1, 'Doğru kalıp: Where are you from?'),
      q('Soru', '"What do you do?" sorusu neyi sorar?', ['Şu an ne yaptığını', 'Mesleğini', 'Nerede yaşadığını', 'Kaç yaşında olduğunu'], 1, '"What do you do?" genellikle mesleği sorar: I\'m a nurse.'),
      q('Vedalaşma', 'Gece arkadaşından ayrılırken ne dersin?', ['Good evening!', 'Good night!', 'Good afternoon!', 'Hello!'], 1, '"Good night" ayrılırken ya da yatmadan önce söylenir.'),
      q('Çeviri', '"Türküm ve İstanbul\'da yaşıyorum." cümlesinin İngilizcesi hangisi?', ["I'm Turkey and I live in Istanbul.", "I'm Turkish and I live in Istanbul.", 'I Turkish and I living in Istanbul.', "I'm Turkish and I'm live in Istanbul."], 1, 'Milliyet "Turkish", ülke "Turkey"dir. "I live" ile "I\'m" birlikte kullanılmaz.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ["I'm a student.", 'My name is Deniz.', "I'm teacher.", 'Nice to meet you.'], 2, 'Meslekten önce "a" eksik: I\'m a teacher.')
    ]
  },

  // 2 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-a1-02',
    title: 'To Be: am, is, are',
    duration: '25 dk',
    description: 'Olmak fiili: olumlu, olumsuz, soru ve kısa cevaplar.',
    deepDive: [
      goal('Kendini ve başkalarını "be" fiiliyle tanıtabilir, olumsuz cümle kurabilir, soru sorup kısa cevap verebilirsin.'),
      h('Yapı'),
      p('"To be" fiili "olmak" anlamına gelir ve özneye göre üç şekle girer: <strong>am, is, are</strong>. Konuşmada neredeyse her zaman kısaltılır.'),
      table(['Özne', 'Olumlu', 'Kısa', 'Olumsuz (kısa)'], [
        ['I', 'I am', "I'm", "I'm not"],
        ['He / She / It', 'He is', "He's", "He isn't"],
        ['You / We / They', 'You are', "You're", "You aren't"]
      ]),
      h('Soru ve kısa cevap'),
      p('Soru yapmak için fiil öznenin <strong>önüne</strong> geçer. Kısa cevapta fiil tekrarlanır.'),
      table(['Soru', 'Evet', 'Hayır'], [
        ['Am I late?', 'Yes, you are.', "No, you aren't."],
        ['Is she a doctor?', 'Yes, she is.', "No, she isn't."],
        ['Are they at home?', 'Yes, they are.', "No, they aren't."]
      ]),
      p('Olumlu kısa cevapta kısaltma yapılmaz: <em>Yes, I am.</em> (✗ Yes, I\'m.)'),
      h('Nerelerde kullanılır?'),
      examples([
        ["I'm hungry.", 'Açım. (durum)'],
        ['She is a nurse.', 'O bir hemşire. (meslek)'],
        ["We're from Turkey.", "Türkiye'liyiz. (köken)"],
        ['The keys are on the table.', 'Anahtarlar masanın üstünde. (yer)'],
        ["It's cold today.", 'Bugün hava soğuk. (hava)'],
        ['My brother is 12.', 'Kardeşim 12 yaşında. (yaş)']
      ]),
      trNote('Türkçede "olmak" çoğu zaman ek ile gösterilir: "Ben öğrenci<u>yim</u>", "Onlar ev<u>de</u>". İngilizcede bu ekin yerine ayrı bir kelime gelir ve <strong>atlanamaz</strong>: <em>I <u>am</u> a student</em>, <em>They <u>are</u> at home</em>. "She happy" gibi fiilsiz cümle yanlıştır.'),
      h('Mini diyalog'),
      dialog([
        ['Ece', 'Is this your new phone?'],
        ['Tom', "Yes, it is. It's very fast."],
        ['Ece', 'Are your parents at home?'],
        ['Tom', "No, they aren't. They're at work."],
        ['Ece', "OK. I'm hungry. Is the café open?"],
        ['Tom', "Yes, it is. Let's go!"]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['She happy.', 'She is happy.', '"be" fiili atlanmaz.'],
        ['He is be a doctor.', 'He is a doctor.', 'İki fiil yan yana gelmez.'],
        ['You is my friend.', 'You are my friend.', '"you" her zaman "are" alır.'],
        ["Yes, I'm.", 'Yes, I am.', 'Olumlu kısa cevapta kısaltma yapılmaz.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Özneyle eşleştir', text: 'I → am, he/she/it → is, you/we/they → are.' },
      { type: 'good', title: 'Konuşmada kısalt', text: "I'm, she's, they're, isn't, aren't kısaltmaları günlük İngilizcede standarttır." },
      { type: 'bad', title: 'Fiili atlama', text: 'Türkçedeki gibi ek kullanılmaz: "She tired" değil "She is tired".' }
    ],
    questions: [
      q('To be', 'They ___ my friends.', ['am', 'is', 'are', 'be'], 2, '"they" ile "are" kullanılır.'),
      q('To be', 'My sister ___ a nurse.', ['am', 'is', 'are', 'be'], 1, '"my sister" = she → is.'),
      q('Olumsuz', 'Doğru olumsuz cümle hangisi?', ["I amn't tired.", "I'm not tired.", "I isn't tired.", "I not tired."], 1, '"am not" kısaltılmaz; doğru şekil: I\'m not.'),
      q('Soru', '"Sen öğrenci misin?" sorusunun İngilizcesi hangisi?', ['You are a student?', 'Are you a student?', 'Is you a student?', 'Do you a student?'], 1, 'Soruda "be" fiili öznenin önüne geçer.'),
      q('Kısa cevap', '"Is he at home?" — "Yes, ___."', ["he's", 'he is', 'is he', 'he are'], 1, 'Olumlu kısa cevapta kısaltma yapılmaz: Yes, he is.'),
      q('Kısa cevap', '"Are you from Spain?" — "No, I ___."', ["isn't", "aren't", "'m not", 'not'], 2, 'Doğru cevap: No, I\'m not.'),
      q('Hata bulma', 'Hangi cümle yanlış?', ['We are ready.', 'It is cold.', 'She hungry.', 'I am at work.'], 2, '"be" fiili eksik: She is hungry.'),
      q('Çeviri', '"Anahtarlar çantada." cümlesinin İngilizcesi hangisi?', ['The keys is in the bag.', 'The keys are in the bag.', 'The keys in the bag.', 'The keys be in the bag.'], 1, '"keys" çoğul olduğu için "are" kullanılır.'),
      q('To be', 'The weather ___ nice today.', ['are', 'is', 'am', 'be'], 1, '"the weather" = it → is.'),
      q('Soru', 'Boşluğa ne gelir? "___ your parents teachers?"', ['Is', 'Am', 'Are', 'Do'], 2, '"your parents" = they → Are.')
    ]
  },

  // 3 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-a1-03',
    title: 'Sayılar, Saat, Günler ve at / on / in',
    duration: '25 dk',
    description: 'Sayılar, saati sorma ve söyleme, günler, aylar ve zaman edatları.',
    deepDive: [
      goal('100\'e kadar sayabilir, saati sorup söyleyebilir, gün ve ayları kullanarak bir randevu zamanını <strong>at / on / in</strong> ile belirtebilirsin.'),
      h('Sayılar'),
      p('1–12 ezberlenir: one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve. 13–19 <strong>-teen</strong> ile biter: thirteen, fourteen, fifteen… Onlar <strong>-ty</strong> ile biter: twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety, a hundred.'),
      p('Dikkat: <strong>fourteen</strong> ama <strong>forty</strong> (u yok). <strong>thirteen</strong> (13) ile <strong>thirty</strong> (30) vurguyla ayrılır: thir<u>teen</u> / <u>thir</u>ty. Bileşik sayılar tire ile yazılır: <em>twenty-five</em>, <em>sixty-eight</em>.'),
      h('Saat'),
      examples([
        ["What time is it? — It's three o'clock.", 'Saat kaç? — Saat üç.'],
        ["It's half past seven.", 'Saat yedi buçuk.'],
        ["It's quarter past nine.", 'Saat dokuzu çeyrek geçiyor.'],
        ["It's quarter to five.", 'Saat beşe çeyrek var.'],
        ["It's ten past six. / It's twenty to eight.", 'Altıyı on geçiyor. / Sekize yirmi var.'],
        ["It's 7:45 (seven forty-five).", 'Dijital okuma da çok yaygın.']
      ]),
      p('<strong>past</strong> = geçiyor, <strong>to</strong> = var. <strong>a.m.</strong> öğleden önce, <strong>p.m.</strong> öğleden sonra demektir.'),
      h('Günler ve aylar'),
      p('Günler: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday. Aylar: January, February, March, April, May, June, July, August, September, October, November, December. İkisi de her zaman <strong>büyük harfle</strong> başlar.'),
      h('Zaman edatları: at / on / in'),
      table(['Edat', 'Ne ile?', 'Örnek'], [
        ['at', 'Saat ve belirli anlar', "at 8 o'clock, at noon, at night, at the weekend (İngiliz İng.)"],
        ['on', 'Günler ve tarihler', 'on Monday, on 5 May, on my birthday'],
        ['in', 'Aylar, yıllar, mevsimler, gün bölümleri', 'in June, in 2025, in summer, in the morning']
      ]),
      p('Küçükten büyüğe düşün: <strong>at</strong> (nokta) → <strong>on</strong> (gün) → <strong>in</strong> (daha uzun dönem). İstisna: <em>in the morning</em> ama <em>at night</em>.'),
      trNote('Türkçede hepsi "-de" ekiyle söylenir: "saat 8\'<u>de</u>", "Pazartesi<u>de</u>", "Haziran\'<u>da</u>". İngilizcede zamanın türüne göre üç farklı edat seçmen gerekir.'),
      h('Mini diyalog'),
      dialog([
        ['Leyla', 'What time is the meeting?'],
        ['Sam', "It's at half past ten."],
        ['Leyla', 'On Tuesday?'],
        ['Sam', 'No, on Wednesday. And the next one is in June.'],
        ['Leyla', "OK. What time is it now?"],
        ['Sam', "It's quarter to ten. We have 45 minutes."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['in Monday', 'on Monday', 'Günler "on" alır.'],
        ["at 5 o'clock in the night", 'at 5 in the morning / at night', '"night" ile "at" kullanılır.'],
        ['fourty', 'forty', '40\'ta "u" yoktur.'],
        ['monday, june', 'Monday, June', 'Gün ve ay adları büyük harfle başlar.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'at → on → in', text: 'Saat için <strong>at</strong>, gün için <strong>on</strong>, ay / yıl / mevsim için <strong>in</strong>.' },
      { type: 'good', title: '-teen ve -ty vurgusu', text: 'fif<u>teen</u> (15) sonda, <u>fif</u>ty (50) başta vurgulanır.' },
      { type: 'bad', title: 'Gün adlarını küçük yazma', text: '"monday" değil "Monday"; "may" değil "May".' }
    ],
    questions: [
      q('Sayılar', '40 nasıl yazılır?', ['fourty', 'forty', 'fourteen', 'fortty'], 1, 'Doğru yazım: forty.'),
      q('Sayılar', '"seventy-three" kaçtır?', ['17', '37', '73', '703'], 2, 'seventy = 70, three = 3 → 73.'),
      q('Saat', '"It\'s half past six." saat kaç?', ['6:00', '6:30', '5:30', '6:15'], 1, '"half past six" = altı buçuk.'),
      q('Saat', '8:45 için doğru ifade hangisi?', ['quarter past eight', 'quarter to eight', 'quarter to nine', 'half past eight'], 2, '8:45 = dokuza çeyrek var = quarter to nine.'),
      q('Edatlar', 'The party is ___ Saturday.', ['at', 'on', 'in', 'to'], 1, 'Günler "on" alır.'),
      q('Edatlar', 'My birthday is ___ March.', ['at', 'on', 'in', 'of'], 2, 'Aylar "in" alır.'),
      q('Edatlar', 'The film starts ___ 9 p.m.', ['at', 'on', 'in', 'by'], 0, 'Saatler "at" alır.'),
      q('Edatlar', 'Hangisi doğru?', ['in night', 'on the night', 'at night', 'at the morning'], 2, 'İstisna: at night, ama in the morning.'),
      q('Günler', 'Cumadan sonra hangi gün gelir?', ['Thursday', 'Sunday', 'Saturday', 'Monday'], 2, 'Friday → Saturday.'),
      q('Çeviri', '"Toplantı Pazartesi saat 10\'da." cümlesinin İngilizcesi hangisi?', ['The meeting is in Monday at 10.', 'The meeting is on Monday at 10.', 'The meeting is at Monday on 10.', 'The meeting on Monday in 10.'], 1, 'Gün → on, saat → at.')
    ]
  },

  // 4 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-a1-05',
    title: 'a / an, the ve Çoğullar',
    duration: '25 dk',
    description: 'Belirsiz ve belirli tanımlıklar, düzenli ve düzensiz çoğullar.',
    deepDive: [
      goal('İsimlerden önce doğru tanımlığı (<strong>a, an, the</strong> ya da hiçbiri) seçebilir ve isimleri doğru çoğul yapabilirsin.'),
      h('a / an: "bir tane", ilk kez söz ederken'),
      p('Tekil ve sayılabilen bir isimden ilk kez söz ederken kullanılır. Seçim harfe değil <strong>sese</strong> göre yapılır.'),
      table(['Kural', 'Örnek'], [
        ['Ünsüz sesten önce → a', 'a book, a car, a university (yu- sesi)'],
        ['Ünlü sesten önce → an', 'an apple, an egg, an hour (h okunmaz)']
      ]),
      h('the: bilinen, belli olan'),
      p('Karşımızdakinin hangi şeyi kastettiğimizi bildiği durumlarda <strong>the</strong> kullanılır: daha önce bahsedildiyse, tek olan bir şeyse ya da durumdan belliyse.'),
      examples([
        ['I have a dog. The dog is black.', 'Bir köpeğim var. Köpek siyah. (ikinci kez → the)'],
        ['The sun is hot.', 'Güneş sıcak. (tek olan)'],
        ['Close the door, please.', 'Kapıyı kapat lütfen. (hangi kapı olduğu belli)']
      ]),
      h('Tanımlık kullanılmayan durumlar'),
      p('Genel olarak çoğul ya da sayılamayan isimlerden bahsederken tanımlık kullanılmaz: <em>I like cats.</em> (Genel olarak kedileri severim.) <em>Water is important.</em> Şehir, ülke ve öğün adlarında da genelde tanımlık kullanılmaz: <em>in Ankara, have breakfast</em>.'),
      h('Çoğullar'),
      table(['Kural', 'Örnek'], [
        ['Çoğu isim: + s', 'book → books, car → cars'],
        ['-s, -sh, -ch, -x ile bitenler: + es', 'bus → buses, box → boxes, watch → watches'],
        ['Ünsüz + y: y → ies', 'city → cities, baby → babies (ama day → days)'],
        ['-f / -fe: → ves', 'knife → knives, wife → wives']
      ]),
      p('<strong>Düzensizler</strong> ezberlenir: man → men, woman → women, child → children, person → people, foot → feet, tooth → teeth, mouse → mice. <em>fish</em> ve <em>sheep</em> değişmez.'),
      trNote('Türkçede tanımlık yoktur: "Kitap masada" cümlesinde kitabın hangisi olduğu bağlamdan anlaşılır. İngilizcede bunu <strong>the</strong> gösterir: <em><u>The</u> book is on <u>the</u> table.</em> Bir diğer fark: Türkçede sayıdan sonra isim tekil kalır ("üç kitap"), İngilizcede çoğul olur: <em>three book<u>s</u></em>.'),
      h('Mini diyalog'),
      dialog([
        ['Kerem', 'Is there a café near here?'],
        ['Jane', 'Yes, there is. The café on the corner is very good.'],
        ['Kerem', 'Great. Do they have sandwiches?'],
        ['Jane', 'Yes, and the cakes are delicious. Get an apple pie!']
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['a apple', 'an apple', 'Ünlü sesten önce "an".'],
        ['three book', 'three books', 'Birden fazlaysa isim çoğul olur.'],
        ['childs, mans', 'children, men', 'Düzensiz çoğullar.'],
        ['I like the music. (genel olarak)', 'I like music.', 'Genel anlamda tanımlık kullanılmaz.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Sese göre seç', text: '"an hour" (h okunmaz), "a university" (yu- sesi). Yazıya değil telaffuza bak.' },
      { type: 'good', title: 'İkinci kez → the', text: 'İlk kez "a", tekrar söz ederken "the": I saw a man. The man was tall.' },
      { type: 'bad', title: 'Sayıdan sonra tekil isim', text: 'Türkçedeki gibi "two apple" denmez; "two apples" olmalı.' }
    ],
    questions: [
      q('a / an', 'I eat ___ egg every morning.', ['a', 'an', 'the', '—'], 1, '"egg" ünlü sesle başlar → an.'),
      q('a / an', 'She is ___ university student.', ['a', 'an', 'the', '—'], 0, '"university" /yu/ sesiyle başlar → a.'),
      q('a / an', 'I waited for ___ hour.', ['a', 'an', 'the', '—'], 1, '"hour" kelimesinde h okunmaz → an hour.'),
      q('the', 'I bought a shirt and a hat. ___ shirt is blue.', ['A', 'An', 'The', '—'], 2, 'Gömlekten ikinci kez söz ediliyor → the.'),
      q('the', 'Hangisi doğru?', ['A sun is hot.', 'The sun is hot.', 'Sun is hot.', 'An sun is hot.'], 1, 'Tek olan şeyler "the" alır: the sun, the moon.'),
      q('Tanımlık yok', '"Kedileri severim (genel olarak)." İngilizcesi hangisi?', ['I like the cats.', 'I like a cats.', 'I like cats.', 'I like cat.'], 2, 'Genel anlamda çoğul isimle tanımlık kullanılmaz.'),
      q('Çoğullar', '"box" kelimesinin çoğulu nedir?', ['boxs', 'boxes', 'boxies', 'box'], 1, '-x ile bitenler -es alır.'),
      q('Çoğullar', '"city" kelimesinin çoğulu nedir?', ['citys', 'cityes', 'cities', 'citis'], 2, 'Ünsüz + y → ies.'),
      q('Düzensiz', '"child" kelimesinin çoğulu nedir?', ['childs', 'childes', 'children', 'childrens'], 2, 'Düzensiz çoğul: children.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['I have two sisters.', 'There are three persons.', 'The men are tall.', 'Her feet are cold.'], 1, '"person" kelimesinin çoğulu "people" olur.')
    ]
  },

  // 5 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-a1-06',
    title: 'this / that / these / those ve Soru Kelimeleri',
    duration: '20 dk',
    description: 'İşaret sözcükleri ve wh- soruları.',
    deepDive: [
      goal('Yakındaki ve uzaktaki şeyleri gösterebilir, <strong>what, where, who, when, why, how</strong> ile temel sorular sorabilirsin.'),
      h('İşaret sözcükleri'),
      table(['', 'Yakın (burada)', 'Uzak (orada)'], [
        ['Tekil', 'this (bu)', 'that (şu / o)'],
        ['Çoğul', 'these (bunlar)', 'those (şunlar / onlar)']
      ]),
      examples([
        ['This is my bag.', 'Bu benim çantam.'],
        ['That car is expensive.', 'Şu araba pahalı.'],
        ['These shoes are new.', 'Bu ayakkabılar yeni.'],
        ['Who are those people?', 'Şu insanlar kim?']
      ]),
      p('Telefonda ya da tanıştırırken de kullanılır: <em>This is Ayşe.</em> (Bu Ayşe. / Ben Ayşe — telefonda.)'),
      h('Soru kelimeleri'),
      table(['Kelime', 'Anlamı', 'Örnek'], [
        ['What', 'Ne', "What's this?"],
        ['Where', 'Nerede / Nereye', 'Where is the station?'],
        ['Who', 'Kim', 'Who is that man?'],
        ['When', 'Ne zaman', 'When is your birthday?'],
        ['Why', 'Neden', 'Why are you sad?'],
        ['How', 'Nasıl', 'How are you?'],
        ['How much / How many', 'Ne kadar / Kaç tane', 'How much is it? How many brothers do you have?'],
        ['Which', 'Hangi(si)', 'Which bag is yours?'],
        ['Whose', 'Kimin', 'Whose phone is this?']
      ]),
      h('Soru sırası'),
      p('Soru kelimesi <strong>en başa</strong> gelir, ardından "be" fiili ya da yardımcı fiil gelir: <strong>Soru kelimesi + be + özne</strong>. <em>Where <u>is</u> the bank?</em> (✗ Where the bank is?)'),
      trNote('Türkçede soru kelimesi cümlenin ortasında durabilir: "Banka <u>nerede</u>?" İngilizcede soru kelimesi her zaman başa gelir: <em><u>Where</u> is the bank?</em>'),
      h('Mini diyalog'),
      dialog([
        ['Zeynep', 'Excuse me, what is this?'],
        ['Seller', "It's a traditional English cake."],
        ['Zeynep', 'How much is it?'],
        ['Seller', 'Three pounds. And these cookies are two pounds.'],
        ['Zeynep', "I'll take this cake and those cookies, please."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['This shoes are nice.', 'These shoes are nice.', 'Çoğul isimle these / those.'],
        ['Where the bank is?', 'Where is the bank?', 'Soruda fiil özneden önce gelir.'],
        ['How many money?', 'How much money?', 'Sayılamayan isimle "how much".'],
        ['Who is this bag?', 'Whose bag is this?', 'Sahiplik "whose" ile sorulur.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Yakın / uzak, tekil / çoğul', text: 'this–these yakın, that–those uzak. İsmin tekil ya da çoğul olmasına göre seç.' },
      { type: 'good', title: 'Soru kelimesi başa', text: 'Wh- soru kelimesi + be / yardımcı fiil + özne: What is your name?' },
      { type: 'bad', title: 'how many / how much karışıklığı', text: 'Sayılabilen çoğul isimle "how many", sayılamayanla ve fiyat sorarken "how much".' }
    ],
    questions: [
      q('İşaret', '___ apples here are fresh.', ['This', 'That', 'These', 'Those'], 2, 'Yakın + çoğul → these.'),
      q('İşaret', 'Look at ___ bird in the sky!', ['this', 'that', 'these', 'those'], 1, 'Uzak + tekil → that.'),
      q('İşaret', '"Şu insanlar kim?" İngilizcesi hangisi?', ['Who is that people?', 'Who are those people?', 'Who are these person?', 'Who is those people?'], 1, '"people" çoğuldur: those people, are.'),
      q('Soru kelimesi', '___ is your birthday? — In May.', ['Where', 'When', 'Who', 'What'], 1, 'Zaman soruluyor → When.'),
      q('Soru kelimesi', '___ is the toilet? — It\'s on the left.', ['Where', 'When', 'Why', 'Who'], 0, 'Yer soruluyor → Where.'),
      q('Soru kelimesi', '___ phone is this? — It\'s Ali\'s.', ['Who', 'Whose', 'Which', 'What'], 1, 'Sahiplik → Whose.'),
      q('Soru kelimesi', '___ brothers do you have?', ['How much', 'How many', 'How', 'What many'], 1, '"brothers" sayılabilir çoğul → How many.'),
      q('Soru kelimesi', '___ is this T-shirt? — £15.', ['How many', 'How much', 'What much', 'How cost'], 1, 'Fiyat sorulurken "How much" kullanılır.'),
      q('Soru sırası', 'Hangi soru doğru?', ['Where your hotel is?', 'Where is your hotel?', 'Your hotel where is?', 'Where hotel is your?'], 1, 'Soru kelimesi + is + özne.'),
      q('Soru kelimesi', '___ are you tired? — Because I work a lot.', ['What', 'How', 'Why', 'When'], 2, '"Because" ile cevap → Why.')
    ]
  },

  // 6 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-a1-07',
    title: "İyelik: my, your ve 's",
    duration: '20 dk',
    description: "İyelik sıfatları, 's ile sahiplik ve aile kelimeleri.",
    deepDive: [
      goal("Bir şeyin kime ait olduğunu söyleyebilir, ailen hakkında kısaca konuşabilirsin."),
      h('İyelik sıfatları'),
      table(['Özne', 'İyelik', 'Örnek'], [
        ['I', 'my', 'my phone (benim telefonum)'],
        ['you', 'your', 'your car (senin / sizin araban)'],
        ['he', 'his', 'his name (onun adı — erkek)'],
        ['she', 'her', 'her bag (onun çantası — kadın)'],
        ['it', 'its', 'its color (onun rengi — nesne / hayvan)'],
        ['we', 'our', 'our house (bizim evimiz)'],
        ['they', 'their', 'their children (onların çocukları)']
      ]),
      p('İyelik sıfatı ismin önüne gelir ve isim tekil ya da çoğul olsa da <strong>değişmez</strong>: <em>my brother, my brothers</em>.'),
      h("'s ile sahiplik"),
      p("Bir kişinin bir şeye sahip olduğunu göstermek için isme <strong>'s</strong> eklenir: <em>Ali's car</em> (Ali'nin arabası), <em>my mother's name</em> (annemin adı). Sonu -s ile biten çoğul isimlerde sadece kesme işareti konur: <em>my parents' house</em> (ailemin evi)."),
      h('Aile kelimeleri'),
      examples([
        ['mother / father → parents', 'anne / baba → ebeveynler'],
        ['brother / sister', 'erkek kardeş, abi / kız kardeş, abla'],
        ['son / daughter', 'oğul / kız evlat'],
        ['husband / wife', 'koca / eş (kadın)'],
        ['grandmother / grandfather', 'büyükanne / büyükbaba'],
        ['uncle / aunt / cousin', 'amca, dayı / teyze, hala / kuzen']
      ]),
      trNote('Türkçede "onun" kelimesi cinsiyet göstermez. İngilizcede erkek için <strong>his</strong>, kadın için <strong>her</strong> seçmen gerekir: <em>Ayşe and <u>her</u> brother</em>, <em>Can and <u>his</u> sister</em>. Ayrıca Türkçedeki "abi / abla" ayrımı yoktur: ikisi de <em>brother / sister</em> olur (gerekirse <em>older brother</em>).'),
      h('Mini diyalog'),
      dialog([
        ['Nora', 'Is this your family?'],
        ['Emre', "Yes. This is my father, and that's my mother."],
        ['Nora', 'Who is the girl?'],
        ['Emre', "That's my sister, Defne. Her husband is from Spain."],
        ['Nora', "And whose dog is that?"],
        ['Emre', "It's my parents' dog. Its name is Pamuk."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['Ayşe and his brother', 'Ayşe and her brother', 'Kadın için "her".'],
        ["it's color", 'its color', "\"it's\" = it is; iyelik \"its\" (kesmesiz)."],
        ['the car of Ali', "Ali's car", "Kişiler için 's daha doğaldır."],
        ['mys books', 'my books', 'İyelik sıfatı çoğul olmaz.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'his / her', text: 'Sahibin cinsiyetine bak: erkekse his, kadınsa her.' },
      { type: 'good', title: "Kişilerde 's", text: "Ali's phone, my sister's room. Çoğulda: my parents' car." },
      { type: 'bad', title: "its / it's karışıklığı", text: "it's = it is. İyelik için kesmesiz \"its\" kullan: The dog wags its tail." }
    ],
    questions: [
      q('İyelik', 'Selin loves ___ job.', ['his', 'her', 'its', 'their'], 1, 'Selin kadın → her.'),
      q('İyelik', 'My brother and I live with ___ parents.', ['my', 'their', 'our', 'your'], 2, '"my brother and I" = we → our.'),
      q('İyelik', 'The cat is eating ___ food.', ["it's", 'its', 'his', 'their'], 1, 'Hayvan / nesne için iyelik → its.'),
      q("'s", '"Mehmet\'in arabası" İngilizcesi hangisi?', ["Mehmet car", "Mehmets' car", "Mehmet's car", 'car Mehmet'], 2, "Kişi + 's: Mehmet's car."),
      q("'s", '"Ailemin evi" (anne ve babam) İngilizcesi hangisi?', ["my parent's house", "my parents' house", 'my parents house', "my parents's house"], 1, "-s ile biten çoğulda sadece kesme işareti: parents'."),
      q('Aile', 'Your father\'s brother is your ___.', ['cousin', 'uncle', 'aunt', 'nephew'], 1, 'Babanın erkek kardeşi = uncle.'),
      q('Aile', 'Your aunt\'s son is your ___.', ['brother', 'uncle', 'cousin', 'grandson'], 2, 'Teyzenin / halanın oğlu = cousin.'),
      q('İyelik', 'Are these ___ keys, Tom?', ['you', 'your', "you're", 'yours'], 1, 'İsimden önce iyelik sıfatı → your keys.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['Her name is Lisa.', 'Their house is big.', 'Murat and her wife are here.', 'Our teacher is nice.'], 2, 'Murat erkek → his wife.'),
      q('İyelik', 'They have a dog. ___ dog is very friendly.', ['There', "They're", 'Their', 'Them'], 2, 'İyelik → Their. (There = orada, They\'re = they are)')
    ]
  },

  // 7 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-a1-08',
    title: 'have got / has got',
    duration: '20 dk',
    description: 'Sahip olmayı anlatma: have got, has got, olumsuz ve soru.',
    deepDive: [
      goal('Sahip olduğun şeyleri, aile üyelerini ve fiziksel özellikleri <strong>have got</strong> ile anlatabilir, soru sorabilirsin.'),
      h('Yapı'),
      table(['Özne', 'Olumlu', 'Olumsuz', 'Soru'], [
        ['I / you / we / they', "I've got a car.", "I haven't got a car.", 'Have you got a car?'],
        ['he / she / it', "She's got a car.", "She hasn't got a car.", 'Has she got a car?']
      ]),
      p('Kısa cevaplar: <em>Yes, I have. / No, I haven\'t.</em> — <em>Yes, she has. / No, she hasn\'t.</em> (Kısa cevapta "got" kullanılmaz.)'),
      h('Ne için kullanılır?'),
      examples([
        ["I've got two brothers.", 'İki erkek kardeşim var. (aile)'],
        ["She's got long hair and blue eyes.", 'Uzun saçları ve mavi gözleri var. (görünüş)'],
        ["We've got a big garden.", 'Büyük bir bahçemiz var. (sahiplik)'],
        ["I've got a headache.", 'Başım ağrıyor. (hastalık)'],
        ["Have you got any money?", 'Hiç paran var mı?']
      ]),
      h('have got mı, have mı?'),
      p('<strong>have got</strong> özellikle İngiliz İngilizcesinde, konuşmada yaygındır. Aynı anlamda <strong>have</strong> de kullanılır (Amerikan İngilizcesinde daha yaygın): <em>I have a car / Do you have a car? / She doesn\'t have a car.</em> İkisi de doğrudur; sadece soru ve olumsuz yapılar farklıdır. Bu yapı Present Simple dersinde ayrıca işlenir.'),
      p('Dikkat: <strong>\'s got</strong> = has got. <em>He\'s got</em> → "He has got", "He is" değil.'),
      trNote('Türkçede sahiplik "var / yok" ile ve iyelik ekiyle anlatılır: "Arabam <u>var</u>". İngilizcede sahip olan kişi özne olur: <em><u>I</u> have got a car</em> (✗ My car is there / There is my car).'),
      h('Mini diyalog'),
      dialog([
        ['Aylin', 'Have you got any pets?'],
        ['Ben', "Yes, I have. I've got a cat. Have you got a pet?"],
        ['Aylin', "No, I haven't. But my sister has got two dogs."],
        ['Ben', 'Wow! Has she got a big house?'],
        ['Aylin', "Yes, she has. It's got a garden, too."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['She have got a car.', 'She has got a car.', 'he / she / it → has.'],
        ['Do you have got a pen?', 'Have you got a pen? / Do you have a pen?', 'İki yapı karıştırılmaz.'],
        ['Yes, I have got.', 'Yes, I have.', 'Kısa cevapta "got" yoktur.'],
        ['My car is there. (Arabam var)', "I've got a car.", 'Sahiplik "have got" ile anlatılır.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: "'s got = has got", text: "He's got a bike = He has got a bike. Bağlamdan \"is\" olmadığını anlarsın." },
      { type: 'good', title: 'İki yapı da doğru', text: '"Have you got…?" ve "Do you have…?" aynı anlamdadır; birini seçip tutarlı kullan.' },
      { type: 'bad', title: 'Yapıları karıştırma', text: '"Do you have got…?" ya da "I don\'t have got…" yanlıştır.' }
    ],
    questions: [
      q('have got', 'My brother ___ a new bike.', ['have got', 'has got', 'is got', 'got has'], 1, 'he → has got.'),
      q('have got', 'We ___ a small flat in the city.', ['has got', "'s got", 'have got', 'are got'], 2, 'we → have got.'),
      q('Olumsuz', 'Doğru olumsuz cümle hangisi?', ["I haven't got a car.", "I don't got a car.", "I hasn't got a car.", "I not have got a car."], 0, 'I → haven\'t got.'),
      q('Soru', '"Kardeşin var mı?" İngilizcesi hangisi?', ['Have you a brother got?', 'Do you have got a brother?', 'Have you got a brother?', 'Has you got a brother?'], 2, 'Soru: Have + özne + got.'),
      q('Kısa cevap', '"Has she got a dog?" — "Yes, ___."', ['she has got', 'she has', "she's", 'she got'], 1, 'Kısa cevapta "got" kullanılmaz: Yes, she has.'),
      q('Anlam', '"She\'s got green eyes." cümlesinde \'s neyin kısaltmasıdır?', ['is', 'has', 'was', 'does'], 1, '"\'s got" = has got.'),
      q('have', '"Do you have a pen?" sorusunun have got ile karşılığı hangisi?', ['Have you got a pen?', 'Do you have got a pen?', 'Are you got a pen?', 'Got you a pen?'], 0, 'İki yapı aynı anlamdadır.'),
      q('Kullanım', '"Başım ağrıyor." İngilizcesi hangisi?', ['My head is ache.', "I've got a headache.", 'I am headache.', 'There is headache.'], 1, 'Hastalıklar "have got" ile söylenir.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['They have got two cars.', 'Has he got a job?', 'She have got long hair.', "I haven't got time."], 2, 'she → has got.'),
      q('Olumsuz', 'Tom ___ any brothers or sisters.', ["haven't got", "hasn't got", "isn't got", "doesn't got"], 1, 'Tom = he → hasn\'t got.')
    ]
  },

  // 8 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-a1-09',
    title: 'there is / there are ve Yer Edatları',
    duration: '25 dk',
    description: 'Bir yerde ne olduğunu anlatma ve in, on, under, next to, between gibi yer edatları.',
    deepDive: [
      goal('Evini, odanı ya da mahalleni anlatabilir, bir şeyin nerede olduğunu yer edatlarıyla söyleyebilirsin.'),
      h('there is / there are'),
      table(['', 'Tekil / Sayılamayan', 'Çoğul'], [
        ['Olumlu', "There's a sofa. / There is some milk.", 'There are two chairs.'],
        ['Olumsuz', "There isn't a garden.", "There aren't any shops."],
        ['Soru', 'Is there a bank near here?', 'Are there any parks?'],
        ['Kısa cevap', "Yes, there is. / No, there isn't.", "Yes, there are. / No, there aren't."]
      ]),
      p('Çoğul olumsuz cümlelerde ve sorularda genellikle <strong>any</strong>, olumlu cümlelerde <strong>some</strong> kullanılır: <em>There are some books. / Are there any books?</em>'),
      h('Yer edatları'),
      table(['Edat', 'Anlamı', 'Örnek'], [
        ['in', 'içinde', 'The keys are in the bag.'],
        ['on', 'üstünde (temas)', 'The phone is on the table.'],
        ['under', 'altında', 'The cat is under the bed.'],
        ['next to', 'yanında', 'The bank is next to the café.'],
        ['between', 'arasında', 'The pharmacy is between the bank and the school.'],
        ['in front of', 'önünde', "There's a car in front of the house."],
        ['behind', 'arkasında', 'The garden is behind the house.'],
        ['opposite', 'karşısında', 'The park is opposite the station.']
      ]),
      trNote('Türkçede "Masanın üstünde bir kitap var" diye yer başta, var sonda söylenir. İngilizcede cümle <strong>There is</strong> ile başlar, yer sona gelir: <em><u>There is</u> a book <u>on the table</u>.</em> "Var" derken öznesiz "have" kullanılmaz: <em>In the room have a window</em> ✗ yanlıştır. Doğrusu <em>There is a window in the room</em> ya da öznesiyle <em>The room has a window</em>.'),
      h('Mini diyalog'),
      dialog([
        ['Tourist', 'Excuse me, is there a supermarket near here?'],
        ['Local', 'Yes, there is. It\'s next to the post office.'],
        ['Tourist', 'Are there any cafés on this street?'],
        ['Local', "No, there aren't, but there's a nice one opposite the park."],
        ['Tourist', 'Thank you very much!']
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['There is two cats.', 'There are two cats.', 'Çoğul → there are.'],
        ['In my room have a bed.', "There's a bed in my room.", '"var" anlamında there is.'],
        ['Is there any shops?', 'Are there any shops?', 'Çoğul soru → Are there.'],
        ['The cat is on the box. (kutunun içinde)', 'The cat is in the box.', 'İçindeyse "in".']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Tekil / çoğul uyumu', text: 'İlk isme bak: There is a… / There are some… / There are two…' },
      { type: 'good', title: 'Olumluda some, soruda any', text: 'There are some eggs. / Are there any eggs? / There aren\'t any eggs.' },
      { type: 'bad', title: '"var" için have kullanma', text: '"In the city have many parks" yanlış; doğrusu "There are many parks in the city".' }
    ],
    questions: [
      q('there is / are', '___ a big window in my bedroom.', ['There are', 'There is', 'It is', 'Have'], 1, 'Tekil isim → There is.'),
      q('there is / are', '___ three bedrooms in the flat.', ['There is', "There's", 'There are', 'They are'], 2, 'Çoğul isim → There are.'),
      q('Soru', '___ any restaurants near the hotel?', ['Is there', 'Are there', 'There are', 'Have there'], 1, 'Çoğul soru → Are there.'),
      q('Olumsuz', "There ___ any milk in the fridge.", ["aren't", "isn't", "don't", "hasn't"], 1, '"milk" sayılamaz → isn\'t.'),
      q('some / any', 'There are ___ apples on the table.', ['any', 'some', 'a', 'an'], 1, 'Olumlu çoğul cümle → some.'),
      q('Yer edatları', 'The cat is sleeping ___ the bed. (yatağın altında)', ['on', 'in', 'under', 'between'], 2, 'altında = under.'),
      q('Yer edatları', 'The bank is ___ the pharmacy and the café.', ['next', 'between', 'opposite', 'behind'], 1, 'İki şeyin arasında → between.'),
      q('Yer edatları', '"Okul parkın karşısında." İngilizcesi hangisi?', ['The school is opposite the park.', 'The school is behind of the park.', 'The school is between the park.', 'The school is next the park.'], 0, 'karşısında = opposite; "next to" ve "in front of" kalıplarında "to / of" unutulmaz.'),
      q('Çeviri', '"Odamda bir bilgisayar var." İngilizcesi hangisi?', ['In my room have a computer.', "There's a computer in my room.", 'My room there is a computer.', 'It is a computer in my room.'], 1, '"var" → There is.'),
      q('Kısa cevap', '"Is there a bus stop here?" — "No, ___."', ["there isn't", "it isn't", "there aren't", "isn't there"], 0, 'Kısa cevap: No, there isn\'t.')
    ]
  },

  // 9 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-a1-04',
    title: 'Present Simple ve Sıklık Zarfları',
    duration: '30 dk',
    description: 'Geniş zaman: alışkanlıklar, rutinler, gerçekler; always, usually, sometimes, never.',
    deepDive: [
      goal('Günlük rutinini ve alışkanlıklarını anlatabilir, başkalarına alışkanlıklarını sorabilir, ne sıklıkla bir şey yaptığını söyleyebilirsin.'),
      h('Ne zaman kullanılır?'),
      examples([
        ['I get up at 7 every day.', 'Her gün 7\'de kalkarım. (rutin)'],
        ['She works in a bank.', 'Bankada çalışır. (kalıcı durum)'],
        ['Water boils at 100°C.', 'Su 100 derecede kaynar. (genel gerçek)'],
        ["I don't like coffee.", 'Kahve sevmem. (zevk)']
      ]),
      h('Yapı'),
      table(['Özne', 'Olumlu', 'Olumsuz', 'Soru'], [
        ['I / you / we / they', 'I work.', "I don't work.", 'Do you work?'],
        ['he / she / it', 'She works.', "She doesn't work.", 'Does she work?']
      ]),
      p('Olumsuz ve soru cümlelerinde <strong>do / does</strong> yardımcı fiili kullanılır ve ana fiil <strong>yalın</strong> kalır: <em>She doesn\'t work</em> (✗ doesn\'t works), <em>Does he live…?</em> (✗ Does he lives…?).'),
      h('3. tekil şahıs (he / she / it) yazım kuralları'),
      table(['Kural', 'Örnek'], [
        ['Çoğu fiil: + s', 'work → works, play → plays'],
        ['-s, -sh, -ch, -x, -o: + es', 'watch → watches, go → goes, do → does'],
        ['Ünsüz + y: y → ies', 'study → studies, fly → flies'],
        ['Düzensiz', 'have → has']
      ]),
      h('Sıklık zarfları'),
      p('<strong>always</strong> (her zaman, %100) → <strong>usually</strong> (genellikle) → <strong>often</strong> (sık sık) → <strong>sometimes</strong> (bazen) → <strong>rarely</strong> (nadiren) → <strong>never</strong> (asla, %0).'),
      p('Yerleri: <strong>ana fiilden önce</strong>, ama <strong>be fiilinden sonra</strong>. <em>I <u>usually</u> walk to work.</em> — <em>She is <u>always</u> late.</em> Ne sıklıkla olduğunu sormak için: <em>How often do you…?</em> Cevap: <em>every day, twice a week, once a month</em>.'),
      trNote('Türkçe geniş zaman ("çalışırım") ile benzerdir, ama İngilizcede "he / she / it" için fiile <strong>-s</strong> eklemeyi unutmamak gerekir. Türkçede olumsuzluk fiile ek olarak gelir ("çalış<u>maz</u>"), İngilizcede ayrı bir yardımcı fiil gelir: <em>He <u>doesn\'t</u> work.</em>'),
      h('Mini diyalog'),
      dialog([
        ['Sara', 'What time do you usually get up?'],
        ['Onur', 'I usually get up at seven. I always have breakfast at home.'],
        ['Sara', 'Does your wife work?'],
        ['Onur', "Yes, she does. She teaches at a school. She never drinks coffee, but I drink three cups a day!"],
        ['Sara', 'How often do you go to the gym?'],
        ['Onur', 'Twice a week, on Tuesdays and Fridays.']
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['She work in a bank.', 'She works in a bank.', 'he / she / it → -s.'],
        ["He doesn't likes tea.", "He doesn't like tea.", 'doesn\'t + yalın fiil.'],
        ['Does she works?', 'Does she work?', 'does + yalın fiil.'],
        ['I go always to the gym.', 'I always go to the gym.', 'Sıklık zarfı ana fiilden önce.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: '-s yalnızca bir kez', text: 'Olumluda fiil -s alır (she works); does kullanınca -s gider (does she work?).' },
      { type: 'good', title: 'Zarfın yeri', text: 'Ana fiilden önce (I often read), be fiilinden sonra (I am often tired).' },
      { type: 'bad', title: 'Çifte -s', text: '"She doesn\'t works" ya da "Does he plays" yanlıştır.' }
    ],
    questions: [
      q('Present Simple', 'She ___ coffee every morning.', ['drink', 'drinks', 'drinking', 'is drink'], 1, 'she → fiil -s alır: drinks.'),
      q('Olumsuz', 'I ___ like fish.', ["don't", "doesn't", "isn't", "aren't"], 0, 'I → don\'t + yalın fiil.'),
      q('Soru', '___ he speak English?', ['Do', 'Does', 'Is', 'Are'], 1, 'he → Does.'),
      q('Yazım', 'Üçüncü tekil kişi için "study" nasıl yazılır?', ['studys', 'studies', 'studyes', 'studied'], 1, 'Ünsüz + y → ies.'),
      q('Yazım', 'My father ___ to work by bus.', ['go', 'gos', 'goes', 'going'], 2, '-o ile biten fiil → goes.'),
      q('Olumsuz', 'Hangi cümle doğru?', ["He doesn't plays tennis.", "He don't play tennis.", "He doesn't play tennis.", 'He not plays tennis.'], 2, 'doesn\'t + yalın fiil.'),
      q('Sıklık', 'Hangi sıra doğru?', ['I drink never coffee.', 'I never drink coffee.', 'Never I drink coffee.', 'I drink coffee never.'], 1, 'Sıklık zarfı ana fiilden önce gelir.'),
      q('Sıklık', 'Hangi sıra doğru?', ['She always is happy.', 'She is always happy.', 'Always she is happy.', 'She is happy always.'], 1, '"be" fiilinden sonra gelir.'),
      q('Soru', '___ do you go swimming? — Twice a week.', ['How much', 'How often', 'When often', 'How many'], 1, 'Sıklık sorusu: How often.'),
      q('Kısa cevap', '"Do your parents live in Ankara?" — "Yes, ___."', ['they live', 'they do', 'they does', "they're"], 1, 'Kısa cevap: Yes, they do.')
    ]
  },

  // 10 ───────────────────────────────────────────────────────────────────────
  {
    id: 'en-a1-10',
    title: 'Present Continuous',
    duration: '25 dk',
    description: 'Şu anda olan şeyleri anlatma ve Present Simple ile farkı.',
    deepDive: [
      goal('Şu anda olan şeyleri anlatabilir, bir fotoğrafı tarif edebilir, "her zaman" ile "şu anda" arasındaki farkı doğru zamanla gösterebilirsin.'),
      h('Yapı: am / is / are + fiil-ing'),
      table(['Özne', 'Olumlu', 'Olumsuz', 'Soru'], [
        ['I', "I'm working.", "I'm not working.", 'Am I working?'],
        ['he / she / it', "She's working.", "She isn't working.", 'Is she working?'],
        ['you / we / they', "They're working.", "They aren't working.", 'Are they working?']
      ]),
      h('-ing yazım kuralları'),
      table(['Kural', 'Örnek'], [
        ['Çoğu fiil: + ing', 'read → reading, play → playing'],
        ['Sessiz -e düşer', 'write → writing, make → making'],
        ['Kısa fiil, ünsüz-ünlü-ünsüz: son harf ikilenir', 'run → running, sit → sitting, swim → swimming'],
        ['-ie → -ying', 'lie → lying, die → dying']
      ]),
      h('Ne zaman kullanılır?'),
      examples([
        ["Look! It's raining.", 'Bak! Yağmur yağıyor. (tam şu an)'],
        ["I'm reading a good book these days.", 'Bu aralar güzel bir kitap okuyorum. (bu dönem)'],
        ["She's wearing a red dress in the photo.", 'Fotoğrafta kırmızı bir elbise giyiyor. (tarif)']
      ]),
      p('İpucu kelimeleri: <strong>now, right now, at the moment, today, Look!, Listen!</strong>'),
      h('Present Simple mı, Present Continuous mı?'),
      table(['Present Simple', 'Present Continuous'], [
        ['Her zaman / genellikle', 'Şu anda / bu aralar'],
        ['I work in an office.', "I'm working at home today."],
        ['He usually drinks tea.', "He's drinking coffee now."]
      ]),
      p('Bazı fiiller "durum" bildirir ve genellikle <strong>-ing almaz</strong>: <em>like, love, hate, want, need, know, understand, believe</em>. <em>I want a coffee now.</em> (✗ I\'m wanting)'),
      trNote('Türkçede "-yor" eki hem şu anı hem alışkanlığı anlatabilir: "Bankada çalış<u>ıyor</u>." İngilizcede kalıcı durum Present Simple ile söylenir: <em>She <u>works</u> in a bank.</em> Present Continuous yalnızca şu an ya da geçici durumlar içindir.'),
      h('Mini diyalog'),
      dialog([
        ['Mum', 'Hi, Deniz! What are you doing?'],
        ['Deniz', "I'm studying for my exam."],
        ['Mum', 'Is your brother studying too?'],
        ['Deniz', "No, he isn't. He's playing games, as usual!"],
        ['Mum', 'Tell him I need him in the kitchen.']
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['She working now.', "She's working now.", 'am / is / are unutulmaz.'],
        ["I'm knowing the answer.", 'I know the answer.', '"know" durum fiilidir, -ing almaz.'],
        ['She is work in a bank.', 'She works in a bank.', 'Kalıcı durum → Present Simple.'],
        ['writeing, runing', 'writing, running', '-ing yazım kuralları.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'İpucu kelimelerine bak', text: 'now, at the moment, Look! → Present Continuous; every day, usually → Present Simple.' },
      { type: 'good', title: 'Durum fiilleri', text: 'like, want, need, know, understand genellikle -ing almaz.' },
      { type: 'bad', title: '"-yor" tuzağı', text: 'Türkçedeki her "-yor" Present Continuous değildir: "Ankara\'da yaşıyorum" (kalıcı) → I live in Ankara.' }
    ],
    questions: [
      q('Yapı', 'Listen! The baby ___.', ['cries', 'is crying', 'crying', 'cry'], 1, '"Listen!" → şu anda: is crying.'),
      q('Yapı', 'We ___ TV at the moment.', ['watch', 'are watching', 'is watching', 'watching'], 1, 'we → are + -ing.'),
      q('Yazım', '"swim" fiilinin -ing hali nedir?', ['swiming', 'swimming', 'swimeing', 'swimmming'], 1, 'Kısa fiil, son harf ikilenir: swimming.'),
      q('Yazım', '"make" fiilinin -ing hali nedir?', ['makeing', 'makking', 'making', 'maked'], 2, 'Sessiz -e düşer: making.'),
      q('Olumsuz', "She ___ today. She's at home.", ["isn't working", "doesn't working", "not working", "aren't working"], 0, 'she → isn\'t + -ing.'),
      q('Soru', '___ you listening to me?', ['Do', 'Is', 'Are', 'Am'], 2, 'you → Are.'),
      q('Simple / Continuous', 'My father ___ in a hospital. He is a doctor.', ['works', 'is working', 'work', 'working'], 0, 'Kalıcı durum (meslek) → Present Simple.'),
      q('Simple / Continuous', 'Hangisi doğru?', ['I am wanting a sandwich.', 'I want a sandwich.', 'I wanting a sandwich.', 'I am want a sandwich.'], 1, '"want" durum fiilidir; -ing almaz.'),
      q('Simple / Continuous', 'He usually ___ to work, but today he ___ the bus.', ['walks / takes', 'is walking / takes', 'walks / is taking', 'walk / is taking'], 2, '"usually" → Simple; "today" (geçici) → Continuous.'),
      q('Çeviri', '"Şu anda ne yapıyorsun?" İngilizcesi hangisi?', ['What do you do now?', 'What are you doing now?', 'What you are doing now?', 'What are you do now?'], 1, 'Şu an → What are you doing?')
    ]
  },

  // 11 ───────────────────────────────────────────────────────────────────────
  {
    id: 'en-a1-11',
    title: "can / can't: Yetenek ve İzin",
    duration: '20 dk',
    description: 'Yetenek, olasılık, izin isteme ve rica etme.',
    deepDive: [
      goal("Neler yapabildiğini ve yapamadığını söyleyebilir, kibarca izin isteyebilir ve rica edebilirsin."),
      h('Yapı'),
      p('<strong>can</strong> her özneyle aynı kalır ve ardından gelen fiil <strong>yalın</strong> olur. -s almaz, "to" almaz.'),
      table(['Olumlu', 'Olumsuz', 'Soru', 'Kısa cevap'], [
        ['I can swim.', "I can't swim. (cannot)", 'Can you swim?', "Yes, I can. / No, I can't."],
        ['She can drive.', "She can't drive.", 'Can she drive?', "Yes, she can. / No, she can't."]
      ]),
      h('Kullanım alanları'),
      examples([
        ['I can speak three languages.', 'Üç dil konuşabilirim. (yetenek)'],
        ["He can't come today. He's ill.", 'Bugün gelemez. Hasta. (olasılık / imkân)'],
        ['Can I open the window?', 'Pencereyi açabilir miyim? (izin isteme)'],
        ['Can you help me, please?', 'Bana yardım edebilir misin? (rica)'],
        ['Could you repeat that, please?', 'Tekrar edebilir misiniz? (daha kibar rica)'],
        ["You can't park here.", 'Buraya park edemezsin. (yasak)']
      ]),
      p('<strong>Could</strong> burada "yapabilir misiniz" anlamında daha kibar bir ricadır. Ayrıca geçmişteki yeteneği anlatır: <em>I could swim when I was five.</em>'),
      p('Telaffuz: olumlu cümlede <em>can</em> genellikle zayıf okunur (/kın/), <em>can\'t</em> ise uzun ve vurgulu okunur (/kaant/). Fark çoğu zaman ünlü sesin uzunluğundan anlaşılır.'),
      trNote('Türkçede yetenek fiile ek olarak eklenir: "yüz<u>ebil</u>irim", "yüz<u>eme</u>m". İngilizcede ayrı bir kelime öne gelir: <em>I <u>can</u> swim</em>, <em>I <u>can\'t</u> swim</em>. Ana fiil hiç değişmez.'),
      h('Mini diyalog'),
      dialog([
        ['Waiter', 'Good evening. Can I help you?'],
        ['Selin', 'Yes, can we sit by the window?'],
        ['Waiter', "Of course. Can I take your coat?"],
        ['Selin', 'Thank you. Could you bring the menu, please?'],
        ['Waiter', "Sure. Sorry, we can't make pizza tonight, the oven is broken."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['She cans swim.', 'She can swim.', 'can -s almaz.'],
        ['I can to drive.', 'I can drive.', 'can sonrası "to" gelmez.'],
        ['Do you can help me?', 'Can you help me?', 'Soruda "do" kullanılmaz.'],
        ['He can plays guitar.', 'He can play guitar.', 'can + yalın fiil.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'can + yalın fiil', text: 'Özne ne olursa olsun: I / she / they can play.' },
      { type: 'good', title: 'Kibar rica: Could you…?', text: 'Yabancılarla ve resmi ortamlarda "Could you…, please?" daha kibar duyulur.' },
      { type: 'bad', title: 'do / to ekleme', text: '"Do you can…?" ve "I can to…" yanlıştır.' }
    ],
    questions: [
      q('can', 'My sister ___ play the piano very well.', ['cans', 'can', 'can to', 'is can'], 1, 'can her özneyle aynıdır.'),
      q('can', 'Hangisi doğru?', ['He can speaks French.', 'He can speak French.', 'He cans speak French.', 'He can to speak French.'], 1, 'can + yalın fiil.'),
      q('Soru', '"Yüzebilir misin?" İngilizcesi hangisi?', ['Do you can swim?', 'Can you swim?', 'You can swim?', 'Can you swimming?'], 1, 'Soru: Can + özne + yalın fiil.'),
      q('Kısa cevap', '"Can your brother drive?" — "No, ___."', ["he doesn't", "he can't", "he isn't", "he cannot drive"], 1, 'Kısa cevap: No, he can\'t.'),
      q('İzin', 'Bir dükkânda kibarca deneme kabinini kullanmak istiyorsun. Hangisi uygun?', ['I use the changing room.', 'Can I use the changing room?', 'Do I can use the changing room?', 'Use the changing room?'], 1, 'İzin isterken: Can I…?'),
      q('Rica', 'En kibar rica hangisi?', ['Help me.', 'Can help me?', 'Could you help me, please?', 'You help me.'], 2, '"Could you…, please?" en kibar seçenektir.'),
      q('Yasak', '"Burada sigara içemezsiniz." İngilizcesi hangisi?', ["You can't smoke here.", "You don't can smoke here.", 'You not smoke here.', "You can't to smoke here."], 0, 'Yasak: can\'t + yalın fiil.'),
      q('Geçmiş', 'When I was six, I ___ read.', ['can', 'could', 'can to', 'coulded'], 1, 'Geçmişteki yetenek: could.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['Can I sit here?', 'They can dance.', 'She can sings.', "We can't stay."], 2, 'can + yalın fiil: She can sing.'),
      q('Anlam', '"I can\'t come to the party." cümlesi ne anlatır?', ['Partiye gelmek istemiyorum.', 'Partiye gelemem.', 'Partiye gelmeliyim.', 'Partiye geleceğim.'], 1, "can't = -emez / -amaz.")
    ]
  },

  // 12 ───────────────────────────────────────────────────────────────────────
  {
    id: 'en-a1-12',
    title: 'Geçmişte To Be: was / were',
    duration: '20 dk',
    description: 'was / were ile geçmişteki durumları, yerleri ve duyguları anlatma.',
    deepDive: [
      goal('Dün, geçen hafta ya da çocukken nerede olduğunu, nasıl hissettiğini ve hava durumunu anlatabilir, geçmişle ilgili sorular sorabilirsin.'),
      h('Yapı'),
      table(['Özne', 'Olumlu', 'Olumsuz', 'Soru'], [
        ['I / he / she / it', 'I was tired.', "I wasn't tired.", 'Was she at home?'],
        ['you / we / they', 'They were happy.', "They weren't happy.", 'Were you at school?']
      ]),
      p('Kısa cevaplar: <em>Yes, I was. / No, I wasn\'t.</em> — <em>Yes, they were. / No, they weren\'t.</em>'),
      h('Geçmiş zaman ifadeleri'),
      p('<strong>yesterday</strong> (dün), <strong>last night / last week / last year</strong> (dün gece / geçen hafta / geçen yıl), <strong>two days ago</strong> (iki gün önce), <strong>in 2010</strong>, <strong>when I was a child</strong> (çocukken).'),
      examples([
        ['I was at home yesterday.', 'Dün evdeydim.'],
        ['The film was really good.', 'Film gerçekten güzeldi.'],
        ["We weren't hungry.", 'Aç değildik.'],
        ['Where were you last night?', 'Dün gece neredeydin?'],
        ['It was cold and rainy last weekend.', 'Geçen hafta sonu hava soğuk ve yağmurluydu.'],
        ['There were a lot of people at the concert.', 'Konserde çok insan vardı.']
      ]),
      p('<strong>there was / there were</strong>, "there is / there are" yapısının geçmiş halidir.'),
      p('Diğer fiillerin geçmiş hali (<em>went, played, saw</em>) A2 seviyesindeki Past Simple dersinde işlenir. was / were yalnızca "be" fiilinin geçmişidir.'),
      trNote('Türkçede geçmiş "-di" ekiyle gösterilir: "evde<u>ydim</u>", "yorgun<u>du</u>". İngilizcede ayrı bir kelime gelir: <em>I <u>was</u> at home</em>, <em>He <u>was</u> tired</em>. "I" ile <strong>was</strong> kullanılır, "you" ise tekil olsa da <strong>were</strong> alır.'),
      h('Mini diyalog'),
      dialog([
        ['Kaan', 'Hi! Where were you yesterday? You weren\'t at work.'],
        ['Lisa', 'I was ill. I was in bed all day.'],
        ['Kaan', 'Oh no! Were you at the doctor\'s?'],
        ['Lisa', 'Yes, I was. It was just a cold. And how was the meeting?'],
        ['Kaan', 'It was long and boring. There were twenty people!']
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['You was late.', 'You were late.', '"you" her zaman "were" alır.'],
        ['I were at home.', 'I was at home.', '"I" ile was.'],
        ['Did you were at school?', 'Were you at school?', '"be" fiilinin sorusunda "did" kullanılmaz.'],
        ['Yesterday I am tired.', 'Yesterday I was tired.', 'Geçmiş zaman ifadesiyle geçmiş zaman kullanılır.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'was / were eşleşmesi', text: 'I, he, she, it → was; you, we, they → were.' },
      { type: 'good', title: 'Soru yapmak kolay', text: 'Tıpkı am / is / are gibi, fiil öznenin önüne geçer: Was it expensive?' },
      { type: 'bad', title: '"did" ekleme', text: '"Did you be…?" ya da "Did she was…?" yanlıştır.' }
    ],
    questions: [
      q('was / were', 'I ___ very tired last night.', ['were', 'was', 'am', 'is'], 1, 'I → was.'),
      q('was / were', 'You ___ late for the lesson yesterday.', ['was', 'were', 'are', 'is'], 1, '"you" → were.'),
      q('was / were', 'The tickets ___ very expensive.', ['was', 'were', 'is', 'be'], 1, '"tickets" çoğul → were.'),
      q('Olumsuz', 'The restaurant ___ open on Monday.', ["weren't", "wasn't", "didn't", "isn't been"], 1, '"the restaurant" = it → wasn\'t.'),
      q('Soru', '___ your parents at the wedding?', ['Was', 'Were', 'Did', 'Are been'], 1, 'Çoğul özne → Were.'),
      q('Soru', 'Hangi soru doğru?', ['Did you were at home?', 'Were you at home?', 'Was you at home?', 'You were at home?'], 1, '"be" sorusunda did kullanılmaz; you → were.'),
      q('Kısa cevap', '"Was the film good?" — "No, it ___."', ["wasn't", "weren't", "didn't", "isn't"], 0, 'it → wasn\'t.'),
      q('there was / were', '___ a lot of cars on the road this morning.', ['There was', 'There were', 'It was', 'They were'], 1, 'Çoğul isim → There were.'),
      q('Çeviri', '"Dün neredeydin?" İngilizcesi hangisi?', ['Where was you yesterday?', 'Where were you yesterday?', 'Where did you were yesterday?', 'Where are you yesterday?'], 1, 'Where + were + you.'),
      q('Zaman', 'Hangi cümle doğru?', ['Last week I am in Paris.', 'Last week I was in Paris.', 'Last week I were in Paris.', 'Last week I be in Paris.'], 1, '"last week" geçmişi gösterir; I → was.')
    ]
  }
];

export const LESSONS = A1_LESSONS;
