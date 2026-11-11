/**
 * English B1 curriculum: 12 lessons aligned with CEFR B1.
 * Imported into the database with: npm run content:en-b1
 *
 * Original ids are kept: en-b1-01 Present Perfect, -03 modals, -04 conditionals.
 * en-b1-02 used to be "Present Continuous vs Simple", which is now taught in A1;
 * its id now carries the closely related tense-contrast lesson "Present Perfect vs Past Simple".
 * New lessons use en-b1-05..12. Screen order comes from the array order.
 */

import { goal, h, p, table, examples, trNote, dialog, mistakes, q } from './lessonHtml.js';

export const STAGE_ID = 'en-b1';

export const LESSONS = [
  // 1 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-b1-01',
    title: 'Present Perfect: already, yet, still, since, for',
    duration: '30 dk',
    description: 'Geçmişle şimdiyi bağlayan zaman: yeni tamamlanan işler, süre bildirme ve How long…? soruları.',
    deepDive: [
      goal('Bir işi bitirip bitirmediğini <strong>already / yet / still</strong> ile söyleyebilir, bir durumun ne zamandan beri sürdüğünü <strong>since / for</strong> ile anlatabilir ve <strong>How long…?</strong> sorusunu doğru zamanla sorabilirsin.'),
      h('Hatırlatma: yapı'),
      p('<strong>have / has + V3</strong>: <em>I have finished. She hasn\'t called. Have they arrived?</em> A2\'de bu zamanı deneyimler için (ever / never) kullandık. B1\'de iki yeni kullanım ekliyoruz: <strong>yakın zamanda tamamlanan işler</strong> ve <strong>hâlâ süren durumlar</strong>.'),
      h('1. already, yet, still'),
      table(['Kelime', 'Anlamı', 'Yeri', 'Örnek'], [
        ['already', 'çoktan, zaten (beklenenden erken)', 'have ile V3 arası', "I've already paid the bill."],
        ['yet', 'henüz / daha (olumsuz), … mı? (soru)', 'Cümle sonu', "I haven't paid yet. Have you paid yet?"],
        ['still', 'hâlâ (beklenen olmadı)', "haven't'tan önce", "I still haven't paid."],
        ['just', 'az önce', 'have ile V3 arası', "I've just paid."]
      ]),
      h('2. for ve since: süre'),
      p('Geçmişte başlayıp <strong>şu an da devam eden</strong> durumlar Present Perfect ile anlatılır.'),
      table(['', 'Ne ile kullanılır?', 'Örnek'], [
        ['for', 'Süre (ne kadar zamandır)', 'for three years, for a long time, for ages'],
        ['since', 'Başlangıç noktası (ne zamandan beri)', 'since 2019, since Monday, since I was a child']
      ]),
      examples([
        ["I've lived in Ankara for ten years.", "On yıldır Ankara'da yaşıyorum. (hâlâ yaşıyorum)"],
        ["She's worked here since March.", "Mart'tan beri burada çalışıyor."],
        ["How long have you known Ece? — Since university.", "Ece'yi ne zamandır tanıyorsun? — Üniversiteden beri."],
        ["We haven't seen each other for ages.", 'Uzun zamandır görüşmüyoruz.']
      ]),
      trNote('Türkçede süren durumu şimdiki zamanla söyleriz: "On yıldır Ankara\'da <u>yaşıyorum</u>." İngilizcede bu cümle Present Perfect olur: <em>I <u>have lived</u> in Ankara for ten years.</em> (✗ <em>I am living here for ten years</em>.) Türk öğrencilerin B1\'deki en yaygın hatası budur. "-dır / -den beri" duyduğunda Present Perfect\'i düşün.'),
      h('Amerikan İngilizcesi notu'),
      p('Amerikan İngilizcesinde <em>already / yet / just</em> ile Past Simple de sık duyulur: <em>Did you eat yet? I just ate.</em> Sınavlarda ve İngiliz İngilizcesinde Present Perfect beklenir.'),
      h('Mini diyalog'),
      dialog([
        ['Manager', 'Have you sent the report yet?'],
        ['Selin', "Yes, I've already sent it. But I still haven't received the sales figures."],
        ['Manager', 'Really? Tom has worked on them since Monday.'],
        ['Selin', "I know. I've called him twice, but he hasn't answered yet."],
        ['Manager', "OK, I'll talk to him. How long have you been in this team now?"],
        ['Selin', "For almost two years."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['I am living here since 2015.', "I've lived here since 2015.", 'Süren durum + since → Present Perfect.'],
        ['I live here for five years.', "I've lived here for five years.", 'for + süre → Present Perfect.'],
        ['since three years', 'for three years', 'Süre → for, başlangıç noktası → since.'],
        ["I haven't finished already.", "I haven't finished yet.", 'Olumsuzda yet.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: '"-dır / -den beri" → Present Perfect', text: '"Beş yıldır burada çalışıyorum" = I\'ve worked here for five years.' },
      { type: 'good', title: 'for süre, since başlangıç', text: 'for two weeks / since last Tuesday.' },
      { type: 'bad', title: 'Şimdiki zamanla süre', text: '"I am waiting for an hour" yanlıştır; I\'ve been waiting for an hour (sonraki derslerde).' }
    ],
    questions: [
      q('for / since', "I've known her ___ 2015.", ['for', 'since', 'from', 'ago'], 1, 'Başlangıç noktası → since.'),
      q('for / since', "They've been married ___ twenty years.", ['since', 'for', 'during', 'ago'], 1, 'Süre → for.'),
      q('Zaman', '"Onu üç yıldır tanıyorum." İngilizcesi hangisi?', ["I know him for three years.", "I'm knowing him since three years.", "I've known him for three years.", "I knew him three years."], 2, 'Süren durum + süre → Present Perfect + for. ("-dır" duyunca Present Perfect.)'),
      q('yet', "Has the parcel arrived ___?", ['already', 'yet', 'still', 'since'], 1, 'Soruda cümle sonunda yet.'),
      q('already', "Don't cook. I've ___ eaten.", ['yet', 'already', 'still', 'ever'], 1, 'Beklenenden erken / zaten → already.'),
      q('still', "It's 11 o'clock and he ___ hasn't got up.", ['yet', 'already', 'still', 'just'], 2, 'Beklenen olmadı → still, haven\'t\'tan önce.'),
      q('How long', '___ have you worked for this company?', ['How much', 'How long', 'When', 'Since when long'], 1, 'Süre sorusu: How long have you…?'),
      q('Yer', 'Hangi cümle doğru?', ["I've finished yet my homework.", "I haven't finished my homework yet.", "I haven't yet finished my homework already.", "I already haven't finished my homework."], 1, 'yet olumsuz cümlede sona gelir.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ["She's lived here since she was ten.", "We haven't met for ages.", "I am working here since January.", "Have you seen my keys?"], 2, 'Süren durum + since → I have worked here since January.'),
      q('just', '"Az önce otobüsü kaçırdım." İngilizcesi hangisi?', ["I've just missed the bus.", "I just have missed the bus.", "I've missed just the bus.", "I've missed the bus just."], 0, 'just, have ile V3 arasına gelir.')
    ]
  },

  // 2 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-b1-02',
    title: 'Present Perfect mi, Past Simple mı?',
    duration: '30 dk',
    description: 'Bitmiş ve bitmemiş zaman dilimleri, haber verme ve ayrıntıya geçme, When…? soruları.',
    deepDive: [
      goal('Aynı olayı anlatırken ne zaman Present Perfect, ne zaman Past Simple kullanacağına karar verebilir; bir haberi verip ayrıntısına geçebilirsin.'),
      h('Temel kural'),
      table(['Present Perfect', 'Past Simple'], [
        ['Zaman belirtilmez ya da önemli değildir', 'Belirli, bitmiş bir zaman vardır'],
        ["I've lost my keys. (şu an anahtarım yok)", 'I lost my keys yesterday.'],
        ['Bitmemiş zaman dilimi: today, this week, this year', 'Bitmiş zaman dilimi: yesterday, last week, in 2020'],
        ["I've drunk three coffees today. (gün bitmedi)", 'I drank three coffees yesterday.'],
        ['Sonucu şimdi önemli', 'Sadece geçmişteki olay']
      ]),
      h('Haber ver, sonra ayrıntıya geç'),
      p('Sohbet çoğu zaman Present Perfect ile başlar (ne oldu?), ayrıntılar Past Simple ile gelir (ne zaman, nerede, nasıl?).'),
      examples([
        ["I've broken my arm! — Oh no! How did it happen?", 'Kolumu kırdım! — Olamaz! Nasıl oldu?'],
        ['I fell off my bike last Sunday.', 'Geçen pazar bisikletten düştüm.'],
        ["Have you ever been to Japan? — Yes, I went there in 2018.", "Hiç Japonya'ya gittin mi? — Evet, 2018'de gittim."]
      ]),
      h('When ile soru'),
      p('<strong>When…?</strong> ve <strong>What time…?</strong> belirli bir zaman sorduğu için her zaman Past Simple ile kullanılır: <em>When did you arrive?</em> (✗ When have you arrived?)'),
      h('Ölmüş kişiler ve bitmiş dönemler'),
      p('Hayatta olmayan biri ya da bitmiş bir dönem söz konusuysa Past Simple kullanılır: <em>Atatürk founded the Republic. When I was at school, I played the violin.</em>'),
      trNote('Türkçede iki zaman da "-di" ile söylenir: "Anahtarlarımı kaybet<u>tim</u>". İngilizcede seçim <strong>zamana</strong> bağlıdır: Zaman yoksa ve sonuç şimdi önemliyse <em>I\'ve lost</em>, "dün" gibi bitmiş bir zaman varsa <em>I lost</em>. Cümlede bitmiş bir zaman ifadesi gördüğün anda Present Perfect\'i ele.'),
      h('Mini diyalog'),
      dialog([
        ['Deniz', 'Guess what! I\'ve got a new job!'],
        ['Hannah', 'Congratulations! When did you hear?'],
        ['Deniz', 'They called me this morning. I had the interview last week.'],
        ['Hannah', 'Have you told your boss yet?'],
        ['Deniz', "No, not yet. I've only told you and my parents so far."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['I have seen him yesterday.', 'I saw him yesterday.', 'Bitmiş zaman → Past Simple.'],
        ['When have you arrived?', 'When did you arrive?', 'When → Past Simple.'],
        ['I lost my phone. Can I use yours? (şu an yok)', "I've lost my phone. Can I use yours?", 'Sonuç şimdi önemli → Present Perfect (İngiliz İng.).'],
        ['Shakespeare has written many plays.', 'Shakespeare wrote many plays.', 'Yaşamayan kişi → Past Simple.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Zaman ifadesine bak', text: 'yesterday, last…, ago, in 2010, when → Past Simple. today, this week, ever, never, yet, since, for → genellikle Present Perfect.' },
      { type: 'good', title: 'Haber + ayrıntı', text: "I've passed my test! I took it this morning." },
      { type: 'bad', title: 'Bitmiş zamanla Present Perfect', text: '"I have finished it last night" en sık yapılan hatadır.' }
    ],
    questions: [
      q('Seçim', 'I ___ to the dentist last Friday.', ['have been', 'went', 'have gone', 'go'], 1, '"last Friday" bitmiş zaman → Past Simple.'),
      q('Seçim', "I ___ three emails so far today.", ['wrote', 'have written', 'write', 'was writing'], 1, '"today" bitmemiş zaman, "so far" → Present Perfect.'),
      q('When', '___ did you start learning English?', ['When', 'How long', 'Since when have', 'Have'], 0, 'Belirli zaman sorusu → When + Past Simple.'),
      q('When', 'Hangi soru doğru?', ['When have you finished university?', 'When did you finish university?', 'When you finished university?', 'When have you finish university?'], 1, 'When ile Past Simple.'),
      q('Haber + ayrıntı', '"I\'ve lost my wallet!" — "Where ___ it?"', ['have you lost', 'did you lose', 'do you lose', 'you lost'], 1, 'Ayrıntı (nerede?) → Past Simple.'),
      q('Bitmiş dönem', 'When I was a child, I ___ in a village.', ['have lived', 'lived', 'have been living', 'live'], 1, 'Bitmiş dönem → Past Simple.'),
      q('Kişi', 'Leonardo da Vinci ___ the Mona Lisa.', ['has painted', 'painted', 'has been painting', 'paints'], 1, 'Yaşamayan kişi → Past Simple.'),
      q('Sonuç', '"Ayağımı burktum, yürüyemiyorum." İngilizcesi hangisi?', ["I twisted my ankle yesterday and I can't walk.", "I've twisted my ankle and I can't walk.", "I have twisted my ankle yesterday.", "I twist my ankle and I can't walk."], 1, 'Zaman yok, sonuç şimdi önemli → Present Perfect.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ["She's visited Rome three times.", 'We moved here in 2020.', "I've met him two days ago.", "Have you finished yet?"], 2, '"ago" bitmiş zaman → I met him two days ago.'),
      q('Seçim', "This year we ___ two holidays. (yıl bitmedi)", ['had', 'have had', 'have', 'were having'], 1, 'this year (bitmemiş) → Present Perfect.')
    ]
  },

  // 3 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-b1-05',
    title: 'Present Perfect Continuous',
    duration: '25 dk',
    description: 'Süren eylemler, yakın zamandaki etkinliğin görünen sonucu ve Present Perfect ile farkı.',
    deepDive: [
      goal('Ne zamandan beri bir şey yaptığını anlatabilir, şu anki bir durumu yakın geçmişteki bir etkinlikle açıklayabilir ve Present Perfect ile Present Perfect Continuous arasında seçim yapabilirsin.'),
      h('Yapı: have / has been + fiil-ing'),
      table(['Özne', 'Olumlu', 'Olumsuz', 'Soru'], [
        ['I / you / we / they', "I've been waiting.", "I haven't been waiting.", 'Have you been waiting?'],
        ['he / she / it', "She's been working.", "She hasn't been working.", 'Has she been working?']
      ]),
      h('Kullanım 1: hâlâ süren eylem ve süresi'),
      examples([
        ["I've been waiting for 40 minutes!", '40 dakikadır bekliyorum!'],
        ["How long have you been learning English?", 'Ne zamandır İngilizce öğreniyorsun?'],
        ["It's been raining since this morning.", 'Sabahtan beri yağmur yağıyor.']
      ]),
      h('Kullanım 2: yakın zamandaki etkinliğin görünen sonucu'),
      examples([
        ["You look tired. — I've been running.", 'Yorgun görünüyorsun. — Koşuyordum. (az önce bitti, etkisi görünüyor)'],
        ["Why are your hands dirty? — I've been fixing the car.", 'Ellerin neden kirli? — Arabayı tamir ediyordum.']
      ]),
      h('Present Perfect mi, Continuous mı?'),
      table(['Present Perfect (sonuç, miktar)', 'Present Perfect Continuous (etkinlik, süre)'], [
        ["I've written three emails.", "I've been writing emails all morning."],
        ["She's read the book. (bitti)", "She's been reading the book. (belki bitmedi)"],
        ['Kaç tane / kaç kez → Simple', 'Ne kadar süredir → Continuous']
      ]),
      p('<strong>Durum fiilleri</strong> (know, like, want, believe, own, be…) Continuous yapılmaz: <em>I\'ve known him for years</em> (✗ I\'ve been knowing). <strong>live, work, study</strong> gibi fiillerle iki yapı da kullanılır, anlam neredeyse aynıdır.'),
      trNote('"40 dakikadır bekl<u>iyorum</u>" Türkçede şimdiki zamandır. İngilizcede hem "hâlâ sürüyor" hem "ne zamandır" bilgisi olduğu için <em>I\'ve been waiting for 40 minutes</em> denir. "Sabahtan beri ders çalış<u>ıyorum</u>" → <em>I\'ve been studying since this morning.</em>'),
      h('Mini diyalog'),
      dialog([
        ['Ayla', "Sorry I'm late! Have you been waiting long?"],
        ['Ben', "About twenty minutes. Why are you out of breath?"],
        ['Ayla', "I've been running from the metro. My phone has died, so I couldn't call you."],
        ['Ben', "No problem. I've been reading the menu. I've already chosen my dessert!"]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ["I'm waiting here for an hour.", "I've been waiting here for an hour.", 'Süre + hâlâ sürüyor → Present Perfect Continuous.'],
        ["I've been knowing her since 2010.", "I've known her since 2010.", 'Durum fiili → Simple.'],
        ["I've been drinking four coffees today.", "I've drunk four coffees today.", 'Sayı / miktar → Simple.'],
        ['She has been work all day.', 'She has been working all day.', 'been + -ing.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Ne kadar süre? → Continuous', text: 'How long have you been doing…? Süre vurgusu.' },
      { type: 'good', title: 'Kaç tane? → Simple', text: "I've read 50 pages. I've visited 3 clients." },
      { type: 'bad', title: 'Durum fiilini -ing yapmak', text: 'know, believe, own, want ile Continuous kullanılmaz.' }
    ],
    questions: [
      q('Yapı', "We ___ for the bus for half an hour.", ["are waiting", "have been waiting", "have waiting", "waited since"], 1, 'Süre + hâlâ sürüyor → have been waiting.'),
      q('Yapı', 'How long ___ she been working here?', ['have', 'has', 'is', 'did'], 1, 'she → has.'),
      q('Sonuç', '"Why are your eyes red?" — "I ___."', ["cry", "have been crying", "have cried three times", "am cry"], 1, 'Görünen sonuç, az önceki etkinlik → have been crying.'),
      q('Miktar', "I ___ five kilometres today.", ['have been running', 'have run', 'run', 'am running'], 1, 'Miktar (5 km) → Present Perfect Simple.'),
      q('Durum fiili', 'Hangisi doğru?', ["I've been knowing him for years.", "I've known him for years.", "I know him for years.", "I'm knowing him for years."], 1, '"know" durum fiili → Present Perfect Simple.'),
      q('Seçim', "She ___ the report all morning, but she hasn't finished it.", ['has written', 'has been writing', 'wrote', 'writes'], 1, 'Etkinlik ve süre, iş bitmedi → Continuous.'),
      q('Seçim', "She ___ the report. Here it is.", ['has been writing', 'has written', 'is writing', 'writes'], 1, 'İş bitti, sonuç var → Simple.'),
      q('Çeviri', '"Sabahtan beri yağmur yağıyor." İngilizcesi hangisi?', ["It rains since this morning.", "It's raining since this morning.", "It's been raining since this morning.", "It has rained for this morning."], 2, 'since + süren eylem → has been raining.'),
      q('Soru', '"Ne zamandır gitar çalıyorsun?" İngilizcesi hangisi?', ['How long do you play the guitar?', 'How long have you been playing the guitar?', 'How long are you playing the guitar?', 'Since when you play the guitar?'], 1, 'Süre sorusu: How long have you been…?'),
      q('Hata bulma', 'Hangi cümlede hata var?', ["I've been learning Spanish for a year.", "He's been owning that car since 2015.", "They've been talking for hours.", "Have you been sleeping?"], 1, '"own" durum fiili: He has owned that car since 2015.')
    ]
  },

  // 4 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-b1-06',
    title: 'Past Perfect ve Anlatı Zamanları',
    duration: '30 dk',
    description: 'Geçmişten daha önceki olaylar, by the time / before / after ve bir hikâyeyi dört zamanla anlatmak.',
    deepDive: [
      goal('Geçmişte bir olaydan <strong>daha önce</strong> olanı Past Perfect ile gösterebilir ve Past Simple, Past Continuous ve Past Perfect\'i birlikte kullanarak akıcı bir hikâye anlatabilirsin.'),
      h('Yapı: had + V3'),
      p('Tüm kişiler için aynıdır: <em>I had left, she had left, they hadn\'t left. Had you left?</em> Kısaltma: <strong>I\'d</strong>, <strong>she\'d</strong> (\'d hem had hem would olabilir; ardından V3 geliyorsa had\'dir).'),
      h('Ne zaman kullanılır?'),
      p('İki geçmiş olaydan <strong>daha önce olanı</strong> göstermek için. Zaman çizelgesinde geriye bir adım.'),
      examples([
        ['When I arrived at the station, the train had left.', 'İstasyona vardığımda tren gitmişti. (önce tren gitti, sonra ben vardım)'],
        ['When I arrived at the station, the train left.', 'İstasyona vardığımda tren kalktı. (neredeyse aynı anda)'],
        ["She was nervous because she had never flown before.", 'Gergindi çünkü daha önce hiç uçmamıştı.'],
        ['By the time the police came, the thief had escaped.', 'Polis geldiğinde hırsız çoktan kaçmıştı.']
      ]),
      p('<strong>before / after</strong> zaten sırayı gösterdiği için Past Perfect bazen gerekmez: <em>After I (had) finished, I went home.</em> İkisi de doğrudur. <strong>by the time</strong> ve <strong>already</strong> ile ise Past Perfect çok doğaldır.'),
      h('Anlatı zamanları: hepsi bir arada'),
      table(['Zaman', 'Hikâyedeki görevi', 'Örnek'], [
        ['Past Simple', 'Ana olaylar, sırayla', 'I opened the door and saw a man.'],
        ['Past Continuous', 'Arka plan, süren durum', 'It was raining and a dog was barking.'],
        ['Past Perfect', 'Hikâyeden önceki olaylar', "I realised I'd left my keys inside."],
        ['used to / would', 'Geçmişteki alışkanlıklar', 'We used to meet there every summer.']
      ]),
      trNote('Türkçede bu zaman "-mıştı" ile karşılanır: "Tren git<u>mişti</u>", "Daha önce hiç uç<u>mamıştı</u>". Bu benzerlik işini kolaylaştırır. Tek dikkat noktası: Türkçede "-mıştı" bazen sadece duyulan bilgi ya da uzak geçmiş için de kullanılır. İngilizcede Past Perfect <strong>yalnızca başka bir geçmiş olaydan önce</strong> olanı gösterir.'),
      h('Mini hikâye'),
      dialog([
        ['Narrator', 'It was a cold night and it was snowing heavily.'],
        ['Narrator', 'Emma was driving home from work. She had worked twelve hours and she was exhausted.'],
        ['Narrator', "Suddenly, the car stopped. She looked at the dashboard: she hadn't filled the tank that morning!"],
        ['Narrator', 'She called her brother. By the time he arrived, she had been in the car for an hour.']
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['When I got home, my wife cooked dinner. (yemek hazırdı)', 'When I got home, my wife had cooked dinner.', 'Önce olan → Past Perfect.'],
        ['I had gone to Paris last year. (tek olay)', 'I went to Paris last year.', 'Karşılaştırılacak ikinci bir geçmiş olay yoksa Past Simple.'],
        ['By the time we arrived, the film started.', 'By the time we arrived, the film had started.', 'by the time → Past Perfect.'],
        ['She had went home.', 'She had gone home.', 'had + V3.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Geriye bir adım', text: 'Hikâye Past Simple ile ilerlerken daha önceki olaya dönmek için had + V3.' },
      { type: 'good', title: "'d + V3 = had", text: "She'd left = she had left; she'd leave = she would leave." },
      { type: 'bad', title: 'Gereksiz Past Perfect', text: 'Tek bir geçmiş olayı anlatırken ya da olayları sırayla anlatırken Past Simple yeterlidir.' }
    ],
    questions: [
      q('Past Perfect', 'When we got to the cinema, the film ___. We missed the beginning.', ['started', 'had started', 'has started', 'was start'], 1, 'Film bizden önce başlamıştı → had started.'),
      q('by the time', 'By the time I woke up, everyone ___ breakfast.', ['had', 'has had', 'had had', 'was have'], 2, 'had (yardımcı) + had (V3 of have) → had had.'),
      q('Neden', "I didn't recognise him because he ___ a beard.", ['grew', 'had grown', 'has grown', 'was grown'], 1, 'Sakal daha önce bırakılmıştı → had grown.'),
      q('never before', "It was her first time in London. She ___ there before.", ["hadn't been", "wasn't", "hasn't been", "didn't be"], 0, 'Daha önce hiç → had never / hadn\'t been.'),
      q("'d", '"She\'d already eaten." cümlesindeki \'d neyin kısaltmasıdır?', ['would', 'had', 'did', 'could'], 1, "'d + V3 (eaten) → had."),
      q('Anlatı', 'I ___ along the beach when I ___ a strange light.', ['walked / was seeing', 'was walking / saw', 'had walked / was seeing', 'walk / saw'], 1, 'Arka plan → Past Continuous; ani olay → Past Simple.'),
      q('Seçim', 'Hangi cümle "tren benden ÖNCE gitti" anlamına gelir?', ['When I arrived, the train left.', 'When I arrived, the train had left.', 'When I arrived, the train was leaving.', 'When I had arrived, the train left.'], 1, 'had left = benden önce gitmişti.'),
      q('Gereksiz kullanım', 'Hangisi en doğal?', ['I had visited my aunt last weekend.', 'I visited my aunt last weekend.', 'I have visited my aunt last weekend.', 'I was visiting my aunt last weekend ago.'], 1, 'Tek geçmiş olay → Past Simple.'),
      q('Çeviri', '"Eve vardığımda herkes uyumuştu." İngilizcesi hangisi?', ['When I got home, everyone slept.', 'When I got home, everyone had gone to sleep.', 'When I had got home, everyone slept.', 'When I got home, everyone has slept.'], 1, 'Önce olan (uyumak) → Past Perfect.'),
      q('Yapı', 'Hangisi doğru?', ['They had went out.', 'They had gone out.', 'They have went out.', 'They had go out.'], 1, 'had + V3: go → went → gone.')
    ]
  },

  // 5 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-b1-03',
    title: 'Modal Fiiller: Olasılık ve Çıkarım',
    duration: '30 dk',
    description: 'may, might, could ile olasılık; must ve can\'t ile çıkarım; modal fiillerin genel tekrarı.',
    deepDive: [
      goal('Bir şeyin ne kadar olası olduğunu modal fiillerle derecelendirebilir, kanıta dayanarak "kesin öyle" ya da "olamaz" diyebilir ve A2\'de öğrendiğin zorunluluk modallarıyla çıkarım modallarını ayırt edebilirsin.'),
      h('Olasılık ölçeği'),
      table(['Kesinlik', 'Olumlu', 'Olumsuz'], [
        ['%100 (kanıta göre kesin)', '<strong>must</strong>: He must be at home.', "<strong>can't</strong>: He can't be at home."],
        ['%50 civarı (mümkün)', '<strong>may / might / could</strong>: He might be at home.', '<strong>may not / might not</strong>: He might not be at home.'],
        ['Bilgi', 'He is at home.', "He isn't at home."]
      ]),
      examples([
        ["The lights are on. They must be at home.", 'Işıklar yanıyor. Evde olmalılar. (eminim)'],
        ["She can't be hungry. She's just had lunch.", 'Aç olamaz. Az önce öğle yemeği yedi.'],
        ["Take an umbrella. It might rain later.", 'Şemsiye al. Sonra yağmur yağabilir.'],
        ["I'm not sure, but this could be the right address.", 'Emin değilim ama doğru adres bu olabilir.']
      ]),
      h('Dikkat: must ve mustn\'t çıkarımda simetrik değil'),
      p('Çıkarımda <em>must</em>\'ın olumsuzu <strong>can\'t</strong>\'tır, <em>mustn\'t</em> değil. <em>mustn\'t</em> sadece <strong>yasak</strong> anlamı taşır (A2). <em>He mustn\'t be at home</em> çıkarım olarak yanlıştır; doğrusu <em>He can\'t be at home</em>.'),
      h('could ile can: olasılık'),
      p('Belirli bir durum için <strong>could / might</strong>: <em>The keys could be in the car.</em> Genel olarak mümkün olan için <strong>can</strong>: <em>It can be very cold here in winter.</em> (Kışın burası çok soğuk olabiliyor.)'),
      h('Modal fiillerin genel tekrarı'),
      table(['Anlam', 'Modal'], [
        ['Yetenek', 'can, could (geçmiş)'],
        ['İzin / rica', 'can, could, may (resmi)'],
        ['Zorunluluk', 'must, have to; yasak: mustn\'t; gereksizlik: don\'t have to'],
        ['Tavsiye', 'should, ought to'],
        ['Olasılık', 'may, might, could'],
        ['Çıkarım', 'must (kesin evet), can\'t (kesin hayır)']
      ]),
      p('Hepsinden sonra fiil <strong>yalın</strong> gelir ve modal kişiye göre değişmez. Geçmişe yönelik çıkarım (<em>must have been</em>) B2\'de işlenecek.'),
      trNote('Türkçede olasılık ve çıkarım genellikle "-dır / -malı / -abilir" ekleriyle yapılır: "Evde<u>dir</u> / ev<u>de olmalı</u>" (kesin), "evde <u>olabilir</u>" (mümkün), "evde <u>olamaz</u>" (kesin değil). Bu üç ek sırasıyla <em>must, might / could, can\'t</em> ile eşleşir.'),
      h('Mini diyalog'),
      dialog([
        ['Kerem', "Whose phone is this? It's been ringing for ages."],
        ['Olivia', "It can't be Emma's. Hers is pink."],
        ['Kerem', "It might be Jack's. He was sitting here."],
        ['Olivia', "Look, the screen says 'Mum'. It must be Jack's: his mum always calls at lunchtime!"]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ["He mustn't be at work. (çıkarım)", "He can't be at work.", 'Çıkarımda olumsuz → can\'t.'],
        ['She might comes later.', 'She might come later.', 'Modal + yalın fiil.'],
        ['It may to rain.', 'It may rain.', 'Modaldan sonra to yok.'],
        ['Maybe he must be ill.', 'He might be ill. / Maybe he is ill.', 'maybe ile must çelişir.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Kanıt varsa must / can\'t', text: 'Işıklar açık → must be home. Az önce yedi → can\'t be hungry.' },
      { type: 'good', title: 'Emin değilsen might', text: 'might / may / could ≈ "olabilir".' },
      { type: 'bad', title: "mustn't ile çıkarım", text: "mustn't yalnızca yasaktır; çıkarımın olumsuzu can't." }
    ],
    questions: [
      q('Çıkarım', "She's been working for 14 hours. She ___ be exhausted.", ['must', "can't", 'might not', 'mustn\'t'], 0, 'Kanıta dayalı kesinlik → must.'),
      q('Çıkarım', "That ___ be Ali. He's in Germany this week.", ['must', "can't", 'may', 'should'], 1, 'Kesin değil → can\'t.'),
      q('Olasılık', "I'm not sure where Lisa is. She ___ be in the library.", ['must', "can't", 'might', 'mustn\'t'], 2, 'Emin değil → might.'),
      q('Olumsuz olasılık', "Call before you go. The shop ___ be open on Sundays.", ["can't to", 'might not', 'must not to', "doesn't might"], 1, 'Belki açık değildir → might not.'),
      q('Yapı', 'Hangisi doğru?', ['He might comes.', 'He might to come.', 'He might come.', 'He mights come.'], 2, 'Modal + yalın fiil.'),
      q("mustn't / can't", "Doğru çıkarım cümlesi hangisi?", ["You've just eaten. You mustn't be hungry.", "You've just eaten. You can't be hungry.", "You've just eaten. You don't have to be hungry.", "You've just eaten. You shouldn't be hungry."], 1, "Çıkarımın olumsuzu can't."),
      q('Genel olasılık', 'Driving in the city ___ be very stressful. (genel olarak)', ['can', 'must', "can't", 'mustn\'t'], 0, 'Genel olarak mümkün olan → can.'),
      q('Anlam', '"It could be a virus." ne anlatır?', ['Kesinlikle virüs.', 'Virüs olabilir (olasılık).', 'Virüs olamaz.', 'Virüs olmalı (zorunluluk).'], 1, 'could = olasılık.'),
      q('Tekrar', 'You ___ smoke in the hospital. It\'s forbidden.', ["don't have to", "mustn't", "can't be", 'might not'], 1, 'Yasak → mustn\'t.'),
      q('Çeviri', '"Kapıyı çalan postacı olmalı." İngilizcesi hangisi?', ['That might not be the postman at the door.', 'That must be the postman at the door.', 'That has to the postman at the door.', "That mustn't be the postman at the door."], 1, 'Kesin çıkarım → must be.')
    ]
  },

  // 6 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-b1-04',
    title: '2. Koşul: Hayali Durumlar',
    duration: '30 dk',
    description: 'If + Past Simple, would + fiil; If I were you ile tavsiye; 1. koşulla farkı.',
    deepDive: [
      goal('Gerçek olmayan ya da olasılığı düşük durumları ve sonuçlarını anlatabilir, <strong>If I were you</strong> ile tavsiye verebilir ve 1. koşul ile 2. koşul arasında doğru seçim yapabilirsin.'),
      h('Yapı'),
      p('<strong>If + Past Simple, would + yalın fiil.</strong> Geçmiş zaman kullanılsa da cümle <strong>şimdi ya da gelecek</strong> hakkındadır; geçmiş biçim "gerçek değil" anlamı verir.'),
      examples([
        ['If I had more time, I would learn the piano.', 'Daha fazla zamanım olsa piyano öğrenirdim. (zamanım yok)'],
        ['If she lived closer, we would see her more often.', 'Daha yakında otursa onu daha sık görürdük.'],
        ["What would you do if you won the lottery?", 'Piyangoyu kazansan ne yapardın?'],
        ["If it wasn't so expensive, I'd buy it.", 'Bu kadar pahalı olmasa alırdım.']
      ]),
      p('Sonuç kısmında <em>would</em> yerine <strong>could</strong> (yapabilirdim) ya da <strong>might</strong> (belki yapardım) gelebilir: <em>If I spoke Japanese, I could work in Tokyo.</em>'),
      h('were: herkes için'),
      p('Hayali koşulda <em>be</em> fiili tüm kişilerle <strong>were</strong> olabilir: <em>If I were rich… If he were here…</em> Günlük dilde <em>was</em> da duyulur, ama yazıda ve kalıplarda <em>were</em> tercih edilir.'),
      h('Tavsiye: If I were you'),
      examples([
        ["If I were you, I'd talk to your manager.", 'Senin yerinde olsam müdürünle konuşurdum.'],
        ["I wouldn't buy that car if I were you.", 'Senin yerinde olsam o arabayı almazdım.']
      ]),
      h('1. koşul mu, 2. koşul mu?'),
      table(['1. koşul (gerçek olasılık)', '2. koşul (hayali / düşük olasılık)'], [
        ["If I find a job, I'll move to Izmir. (iş arıyorum, mümkün)", "If I found a job in Japan, I'd move there. (pek olası değil)"],
        ['If + present, will', 'If + past, would'],
        ["If it rains tomorrow, we'll stay in.", "If I were a bird, I'd fly to the sea."]
      ]),
      p('Seçim, konuşanın durumu ne kadar gerçekçi gördüğüne bağlıdır.'),
      trNote('Türkçede bu yapı "-se … -erdi" ile kurulur: "Zamanım ol<u>sa</u> piyano öğren<u>irdim</u>". Eşleşme çok nettir: <strong>-se → Past Simple</strong>, <strong>-erdi → would</strong>. "Senin yerinde olsam" kalıbı da birebir <em>If I were you</em>\'dur.'),
      h('Mini diyalog'),
      dialog([
        ['Murat', "I hate my commute. Two hours every day!"],
        ['Sophie', 'If I were you, I would ask about working from home.'],
        ['Murat', "If my boss agreed, I'd do it tomorrow! But he's very old-fashioned."],
        ['Sophie', "What would you do with the extra time?"],
        ['Murat', "I'd go to the gym, and I might finally finish my book."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['If I would have money, I would travel.', 'If I had money, I would travel.', 'if kısmında would yok.'],
        ['If I am you, I will go.', "If I were you, I'd go.", 'Kalıp: If I were you.'],
        ['If I had a car, I will drive to work.', 'If I had a car, I would drive to work.', 'Past + would.'],
        ["If I knew his number, I'd called him.", "If I knew his number, I'd call him.", 'would + yalın fiil.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: '-se → Past, -erdi → would', text: 'Türkçe eşleşmeyi kullan: "Bilsem söylerdim" = If I knew, I would tell you.' },
      { type: 'good', title: 'Kibar tavsiye', text: "If I were you, I'd… doğrudan \"You should…\" demekten daha yumuşaktır." },
      { type: 'bad', title: 'if kısmında would', text: '"If I would know" yanlıştır; if kısmı Past Simple olur.' }
    ],
    questions: [
      q('Yapı', 'If I ___ more money, I would buy a house.', ['have', 'had', 'would have', 'will have'], 1, 'if kısmında Past Simple.'),
      q('Yapı', 'If she studied harder, she ___ the exam.', ['will pass', 'would pass', 'passed', 'would passed'], 1, 'Sonuç: would + yalın fiil.'),
      q('were', "If I ___ you, I wouldn't do that.", ['am', 'was being', 'were', 'would be'], 2, 'Kalıp: If I were you.'),
      q('Soru', 'What ___ you do if you lost your passport abroad?', ['will', 'would', 'did', 'do'], 1, 'Hayali durum sorusu: What would you do…?'),
      q('could', 'If I spoke French, I ___ apply for that job in Paris.', ['can', 'could', 'will can', 'would can'], 1, 'Yapabilirdim → could.'),
      q('1. mi 2. mi?', 'Ali iş görüşmesine gerçekten gidiyor. Hangisi uygun?', ["If I get the job, I'll buy a car.", "If I got the job, I'd buy a car.", 'If I would get the job, I buy a car.', 'If I get the job, I would bought a car.'], 0, 'Gerçek olasılık → 1. koşul.'),
      q('1. mi 2. mi?', 'Hayal ediyorsun, bir süper gücün yok. Hangisi uygun?', ["If I can fly, I'll visit you every day.", "If I could fly, I'd visit you every day.", "If I fly, I visit you every day.", "If I would fly, I'd visit you."], 1, 'Hayali durum → 2. koşul.'),
      q('Olumsuz', "If the flat ___ so small, we'd stay there.", ["isn't", "wasn't", "won't be", "wouldn't be"], 1, 'if kısmı Past Simple (olumsuz): wasn\'t / weren\'t.'),
      q('Çeviri', '"Adresini bilsem sana söylerdim." İngilizcesi hangisi?', ["If I know her address, I'll tell you.", "If I knew her address, I'd tell you.", "If I would know her address, I told you.", "If I knew her address, I told you."], 1, '-se → knew, -erdi → would tell.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ["If I had time, I'd help you.", "I'd travel more if I didn't have a dog.", "If we would live by the sea, we'd swim every day.", "If he were taller, he could play basketball."], 2, 'if kısmında would yok: If we lived by the sea…')
    ]
  },

  // 7 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-b1-07',
    title: 'Relative Clauses: who, which, that, where, whose',
    duration: '30 dk',
    description: 'Tanımlayıcı sıfat cümleleri, ilgi zamirinin düşürülmesi ve Türkçedeki -an / -dığı yapısıyla karşılaştırma.',
    deepDive: [
      goal('Kişileri, şeyleri ve yerleri bir cümleyle tanımlayabilir (the man who…, the place where…) ve iki kısa cümleyi tek ve akıcı bir cümlede birleştirebilirsin.'),
      h('İlgi zamirleri'),
      table(['Zamir', 'Ne için?', 'Örnek'], [
        ['who', 'İnsanlar', 'The woman who lives next door is a doctor.'],
        ['which', 'Şeyler, hayvanlar', 'The laptop which I bought is very fast.'],
        ['that', 'İnsan ve şey (günlük dilde çok yaygın)', 'The film that we watched was boring.'],
        ['where', 'Yerler', 'This is the café where we first met.'],
        ['whose', 'Sahiplik ("-in … olduğu")', 'That\'s the man whose car was stolen.']
      ]),
      h('Cümle birleştirme'),
      examples([
        ['I have a friend. She speaks five languages. → I have a friend who speaks five languages.', 'Beş dil konuşan bir arkadaşım var.'],
        ['This is the book. I told you about it. → This is the book (that) I told you about.', 'Bu, sana bahsettiğim kitap.'],
        ['The hotel was lovely. We stayed there. → The hotel where we stayed was lovely.', 'Kaldığımız otel çok güzeldi.']
      ]),
      h('Zamiri düşürmek'),
      p('İlgi zamiri cümlenin <strong>nesnesi</strong> ise (ardından yeni bir özne geliyorsa) düşürülebilir: <em>The man (who) I met</em>, <em>the book (that) she wrote</em>. Zamir <strong>özne</strong> ise düşürülemez: <em>The man who called</em> (✗ The man called…).'),
      h('Zamiri tekrar etmeyin'),
      p('İlgi zamiri, yerini aldığı kelimenin yerine geçer; aynı kişi ya da şey için ayrıca he / it kullanılmaz: <em>The car which I bought <u>it</u></em> ✗ → <em>The car which I bought</em>.'),
      p('Not: Virgülle ayrılan, ek bilgi veren cümleler (<em>My brother, who lives in Ankara, …</em>) B2\'de işlenecek. Bu tür cümlelerde <em>that</em> kullanılmaz.'),
      trNote('Türkçede tanımlayıcı cümle ismin <strong>önüne</strong> gelir ve fiil ek alır: "Yan dairede <u>oturan</u> kadın", "<u>Aldığım</u> bilgisayar", "<u>Tanıştığımız</u> kafe". İngilizcede sıra tersine döner: isim önce, sonra ilgi zamiri ve cümle: <em>the woman <u>who lives</u> next door</em>, <em>the laptop <u>that I bought</u></em>, <em>the café <u>where we met</u></em>.'),
      h('Mini diyalog'),
      dialog([
        ['Zehra', "Do you remember the restaurant where we had dinner last year?"],
        ['Nick', "The one that had live music? Yes!"],
        ['Zehra', "The chef who cooked that amazing fish has opened his own place."],
        ['Nick', "Really? Is it the guy whose photo was in the newspaper?"],
        ['Zehra', "That's him. Let's book a table for the weekend that you're free."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['The man which helped me', 'The man who / that helped me', 'İnsan → who / that.'],
        ['The car which I bought it is red.', 'The car (which) I bought is red.', 'Zamir tekrar edilmez.'],
        ['The girl lives here is my cousin.', 'The girl who lives here is my cousin.', 'Özne olan zamir düşürülemez.'],
        ['The city which I was born', 'The city where I was born', 'Yer → where (ya da which … in).']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Emin değilsen that', text: 'Tanımlayıcı cümlelerde that hem insan hem şey için kullanılabilir.' },
      { type: 'good', title: 'Nesneyse düşür', text: 'the film (that) we saw — konuşmada zamir çoğu zaman söylenmez.' },
      { type: 'bad', title: 'Fazladan he / it', text: '"The book that I read it" yanlıştır.' }
    ],
    questions: [
      q('Zamir', 'The woman ___ teaches us English is from Canada.', ['which', 'who', 'where', 'whose'], 1, 'İnsan → who.'),
      q('Zamir', 'I lost the umbrella ___ my mum gave me.', ['who', 'where', 'which', 'whose'], 2, 'Şey → which (ya da that).'),
      q('where', 'This is the hospital ___ I was born.', ['which', 'who', 'where', 'whose'], 2, 'Yer → where.'),
      q('whose', "I met a man ___ son plays for Fenerbahçe.", ['who', "who's", 'whose', 'which'], 2, 'Sahiplik → whose.'),
      q('Düşürme', 'Hangi cümlede ilgi zamiri DÜŞÜRÜLEMEZ?', ['The book that I read was great.', 'The man who lives upstairs is noisy.', 'The film which we watched was long.', 'The people that we met were kind.'], 1, '"who" burada öznedir (who lives); düşürülemez.'),
      q('Tekrar', 'Hangisi doğru?', ['The phone which I bought it is broken.', 'The phone I bought is broken.', 'The phone who I bought is broken.', 'The phone where I bought is broken.'], 1, 'Nesne zamiri düşürülebilir; it tekrar edilmez.'),
      q('Birleştirme', '"I know a girl. Her father is a pilot." tek cümle hali hangisi?', ['I know a girl who father is a pilot.', 'I know a girl whose father is a pilot.', 'I know a girl which father is a pilot.', "I know a girl who's father is a pilot."], 1, 'her father → whose father.'),
      q('Çeviri', '"Dün aradığım adam cevap vermedi." İngilizcesi hangisi?', ["The man who I called him yesterday didn't answer.", "The man I called yesterday didn't answer.", "The man which I called yesterday didn't answer.", "I called the man yesterday who didn't answer him."], 1, 'Nesne zamiri düşmüş, doğru sıra: the man (who) I called…'),
      q('that', 'that hangi cümlede KULLANILAMAZ?', ['The car ___ I drive is old.', 'The teacher ___ helped me was kind.', 'My sister, ___ lives in Bursa, is a nurse.', 'The song ___ you sang was beautiful.'], 2, 'Virgüllü (ek bilgi veren) cümlede that kullanılmaz; who gerekir.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['That\'s the shop where I work.', 'She\'s the person who I trust most.', 'The hotel which we stayed was cheap.', 'The cake that you made is delicious.'], 2, 'Yer için where gerekir: The hotel where we stayed (ya da which we stayed in).')
    ]
  },

  // 8 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-b1-08',
    title: 'Passive Voice\'a Giriş',
    duration: '30 dk',
    description: 'Edilgen çatı: Present Simple ve Past Simple passive, by ile yapan, ne zaman kullanılır.',
    deepDive: [
      goal('Bir işi kimin yaptığı önemli değilse ya da bilinmiyorsa edilgen çatıyı kullanabilir; ürünleri, süreçleri ve tarihi olayları anlatabilirsin.'),
      h('Yapı: be + V3'),
      table(['Zaman', 'Etken (aktif)', 'Edilgen (pasif)'], [
        ['Present Simple', 'They make cars here.', 'Cars <strong>are made</strong> here.'],
        ['Past Simple', 'Someone stole my bike.', 'My bike <strong>was stolen</strong>.'],
        ['Olumsuz', "They don't sell tickets online.", "Tickets <strong>aren't sold</strong> online."],
        ['Soru', 'Did they build it in 1900?', '<strong>Was</strong> it <strong>built</strong> in 1900?']
      ]),
      p('Edilgen cümlede etken cümlenin <strong>nesnesi özne olur</strong>, fiil <strong>be + V3</strong> olur. "be" fiilinin zamanı, cümlenin zamanını gösterir.'),
      h('Ne zaman kullanılır?'),
      examples([
        ['My wallet was stolen. (kim çaldı bilmiyorum)', 'Cüzdanım çalındı.'],
        ['English is spoken all over the world. (kimin konuştuğu önemli değil)', 'İngilizce tüm dünyada konuşulur.'],
        ['The Galata Tower was built in 1348. (tarih, olay önemli)', 'Galata Kulesi 1348\'de inşa edildi.'],
        ['The tea is grown in Rize and packed in our factory. (süreç)', 'Çay Rize\'de yetiştirilir ve fabrikamızda paketlenir.']
      ]),
      h('by ile yapanı belirtmek'),
      p('Yapanı söylemek önemliyse <strong>by</strong> kullanılır: <em>Hamlet was written by Shakespeare.</em> Yapan belirsiz ya da açıksa (people, someone, they) by kullanılmaz: ✗ <em>My bike was stolen by someone.</em>'),
      p('Diğer zamanlar (Present Perfect, Continuous, modal passive: <em>has been sent, is being built, must be done</em>) B2\'de işlenecek.'),
      trNote('Türkçede edilgen çatı fiile <strong>-ıl / -ın</strong> eki getirerek yapılır: "yap<u>ıl</u>ır", "çal<u>ın</u>dı", "inşa ed<u>il</u>di". İngilizce passive buna çok benzer, bu yüzden Türk öğrenciler için mantığı kolaydır. Dikkat edilecek tek şey: İngilizcede ekin yerine <strong>be + V3</strong> gelir ve <em>be</em> zamana göre değişir: is made, was made.'),
      h('Mini diyalog'),
      dialog([
        ['Tour guide', 'This mosque was designed by Mimar Sinan and it was completed in 1557.'],
        ['Tourist', 'Wow. Is it still used today?'],
        ['Tour guide', "Yes, it is. Prayers are held here five times a day."],
        ['Tourist', 'And are photos allowed inside?'],
        ['Tour guide', "Yes, but flash isn't permitted."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['The house built in 1990.', 'The house was built in 1990.', 'be fiili unutulmaz.'],
        ['This bridge was build in 1973.', 'This bridge was built in 1973.', 'be + V3 (built).'],
        ['My phone was stolen by someone.', 'My phone was stolen.', 'Belirsiz yapan için by gereksiz.'],
        ['English speaks in many countries.', 'English is spoken in many countries.', 'Dil kendisi konuşmaz → passive.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Odak eylemde', text: 'Kimin yaptığı önemsizse ya da bilinmiyorsa passive kullan: The office is cleaned every evening.' },
      { type: 'good', title: 'Zamanı be gösterir', text: 'is / are made (şimdi), was / were made (geçmiş).' },
      { type: 'bad', title: 'be fiilini atlamak', text: '"The letter sent yesterday" bir cümle değildir; The letter was sent yesterday.' }
    ],
    questions: [
      q('Present', 'Coffee ___ in Brazil and Colombia.', ['grows', 'is grown', 'was grow', 'is grow'], 1, 'Present passive: is + V3.'),
      q('Past', 'The Eiffel Tower ___ in 1889.', ['built', 'is built', 'was built', 'was build'], 2, 'Geçmiş + passive: was built.'),
      q('Çoğul', 'These cars ___ in Turkey.', ['is made', 'are made', 'made', 'are make'], 1, 'Çoğul özne → are made.'),
      q('Olumsuz', 'Credit cards ___ in this shop.', ["aren't accepted", "don't accepted", "isn't accepted", "aren't accept"], 0, 'Olumsuz passive: aren\'t + V3.'),
      q('Soru', '___ the windows cleaned yesterday?', ['Did', 'Was', 'Were', 'Are'], 2, 'Çoğul + geçmiş → Were.'),
      q('by', 'Hangi cümlede "by …" kullanmak gereksizdir?', ['The song was written by Tarkan.', 'My car was damaged by someone.', 'The book was translated by my teacher.', 'The match was won by Galatasaray.'], 1, 'Belirsiz yapan (someone) söylenmez.'),
      q('Dönüştürme', '"They opened the museum in 2010." cümlesinin passive hali hangisi?', ['The museum opened them in 2010.', 'The museum was opened in 2010.', 'The museum is opened in 2010.', 'The museum was open by them in 2010.'], 1, 'Past Simple → was + V3.'),
      q('Çeviri', '"Bu köprü 1973\'te inşa edildi." İngilizcesi hangisi?', ['This bridge built in 1973.', 'This bridge was built in 1973.', 'This bridge is built in 1973.', 'This bridge was build in 1973.'], 1, '-ıl- → was + V3.'),
      q('Seçim', 'Hangi cümle passive için en uygun bağlamdır?', ['Ali bir mektup yazdı ve kim yazdığı önemli.', 'Cüzdanım çalındı ve kimin çaldığını bilmiyorum.', 'Arkadaşımla sinemaya gittim.', 'Annem her gün yürüyüş yapar.'], 1, 'Yapan bilinmiyor → passive: My wallet was stolen.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['Turkish is spoken in Cyprus.', 'The letters were sent yesterday.', 'The film was directed by Nuri Bilge Ceylan.', 'The pizza delivered at 8 p.m.'], 3, 'be eksik: The pizza was delivered at 8 p.m.')
    ]
  },

  // 9 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-b1-09',
    title: "Reported Speech'e Giriş",
    duration: '30 dk',
    description: 'Dolaylı anlatım: say ve tell, zaman kaydırma, zaman ve yer ifadeleri, dolaylı sorular.',
    deepDive: [
      goal('Birinin söylediğini başkasına aktarabilir, <strong>say</strong> ile <strong>tell</strong>\'i doğru kullanabilir ve basit soruları dolaylı olarak aktarabilirsin.'),
      h('say ve tell'),
      table(['Fiil', 'Kalıp', 'Örnek'], [
        ['say', 'say (that) …', 'She said (that) she was tired.'],
        ['tell', 'tell + kişi + (that) …', 'She told me (that) she was tired.']
      ]),
      p('<strong>tell</strong> mutlaka kime söylendiğini alır: <em>He told <u>me</u></em> (✗ He told that…). <strong>say</strong> kişiyi doğrudan almaz: ✗ <em>He said me</em>; kişi gerekiyorsa <em>said to me</em>.'),
      h('Zaman kaydırma (backshift)'),
      p('Aktarma fiili geçmişteyse (said, told), aktarılan cümlenin zamanı genellikle bir adım geriye kayar.'),
      table(['Doğrudan', 'Dolaylı'], [
        ['"I <strong>am</strong> busy."', 'She said she <strong>was</strong> busy.'],
        ['"I <strong>work</strong> in a bank."', 'He said he <strong>worked</strong> in a bank.'],
        ['"I\'<strong>m leaving</strong>."', 'She said she <strong>was leaving</strong>.'],
        ['"I <strong>will</strong> call you."', 'He said he <strong>would</strong> call me.'],
        ['"I <strong>can</strong> help."', 'She said she <strong>could</strong> help.'],
        ['"I <strong>saw</strong> it." / "I\'ve <strong>seen</strong> it."', 'He said he <strong>had seen</strong> it.']
      ]),
      p('Söylenen şey hâlâ doğruysa kaydırma zorunlu değildir: <em>She said she lives in Izmir.</em> (Hâlâ orada yaşıyor.)'),
      h('Zaman ve yer ifadeleri'),
      p('Bakış açısı değiştiği için bazı ifadeler de değişir: <em>today → that day, tomorrow → the next day, yesterday → the day before, here → there, this → that, now → then</em>. Zamirler de değişir: "I\'ll call <u>you</u>" → He said he would call <u>me</u>.'),
      h('Soruları aktarmak'),
      p('Dolaylı soruda <strong>soru düzeni kalkar</strong> (özne fiilden önce gelir), <strong>do / did kullanılmaz</strong>, soru işareti konmaz.'),
      examples([
        ['"Where do you live?" → She asked me where I lived.', 'Nerede yaşadığımı sordu.'],
        ['"Are you hungry?" → He asked if I was hungry.', 'Aç olup olmadığımı sordu. (evet / hayır sorusu → if / whether)'],
        ['"Did you finish?" → They asked whether I had finished.', 'Bitirip bitirmediğimi sordular.']
      ]),
      trNote('Türkçede aktarma "<u>dedi</u>" ya da "-dığını söyledi" ile yapılır ve zaman çoğu zaman değişmez: "Yorgun olduğunu söyledi." İngilizcede aktarma fiili geçmişteyse aktarılan cümle de geçmişe kayar: <em>She said she <u>was</u> tired</em>. Türkçede "-ıp -madığını sordu" kalıbının karşılığı <strong>if / whether</strong>\'dır.'),
      h('Mini diyalog'),
      dialog([
        ['Ahmet', 'Did you talk to the landlord?'],
        ['Clara', 'Yes. He said he would fix the heating tomorrow.'],
        ['Ahmet', 'Did he tell you what time?'],
        ['Clara', "He said he couldn't come before 10. He also asked if we had paid the rent."],
        ['Ahmet', "Did you tell him that we paid it yesterday?"]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['He said me that he was ill.', 'He told me (that) he was ill.', 'say + kişi değil; tell + kişi.'],
        ['She told that she was busy.', 'She said that she was busy.', 'tell kişi ister.'],
        ['He asked me where did I live.', 'He asked me where I lived.', 'Dolaylı soruda did yok, düz sıra.'],
        ['She asked me am I OK.', 'She asked me if I was OK.', 'Evet / hayır sorusu → if / whether.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'tell someone, say something', text: 'He told me the news. He said it was urgent.' },
      { type: 'good', title: 'Dolaylı soru = düz cümle sırası', text: 'asked where I lived, asked if I was ready.' },
      { type: 'bad', title: 'Soru düzenini korumak', text: '"She asked what was my name" yanlış; "She asked what my name was".' }
    ],
    questions: [
      q('say / tell', 'She ___ me that she was moving to Spain.', ['said', 'told', 'says', 'spoke'], 1, 'Kişi var (me) → told.'),
      q('say / tell', 'He ___ that the meeting was cancelled.', ['told', 'said', 'told to', 'said me'], 1, 'Kişi yok → said.'),
      q('Kaydırma', '"I am tired." → She said she ___ tired.', ['is', 'was', 'were', 'has been'], 1, 'am → was.'),
      q('Kaydırma', '"I will help you." → He said he ___ help me.', ['will', 'would', 'can', 'is going'], 1, 'will → would.'),
      q('Kaydırma', '"I can swim." → She said she ___ swim.', ['can', 'could', 'could to', 'was can'], 1, 'can → could.'),
      q('Zaman ifadesi', '"I\'ll do it tomorrow." → He said he would do it ___.', ['tomorrow', 'the next day', 'yesterday', 'the day before'], 1, 'tomorrow → the next day.'),
      q('Soru', '"Where do you work?" → She asked me ___.', ['where do I work', 'where did I work', 'where I worked', 'where I work did'], 2, 'Dolaylı soruda do / did yok, düz sıra, zaman kayar.'),
      q('Evet / hayır', '"Are you married?" → He asked me ___ married.', ['are you', 'if I was', 'was I', 'that I was'], 1, 'Evet / hayır sorusu → if / whether + düz sıra.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['She told me she was late.', 'He said he liked jazz.', 'They said us that they were ready.', 'I asked her if she was OK.'], 2, 'say + kişi olmaz: They told us…'),
      q('Çeviri', '"Bana nerede yaşadığımı sordu." İngilizcesi hangisi?', ['She asked me where do I live.', 'She asked me where I lived.', 'She said me where I lived.', 'She asked me where did I live.'], 1, 'asked + where + düz sıra + geçmiş.')
    ]
  },

  // 10 ───────────────────────────────────────────────────────────────────────
  {
    id: 'en-b1-10',
    title: 'Gerund ve Infinitive: Anlam Değiştiren Fiiller',
    duration: '30 dk',
    description: 'Edattan sonra -ing, özne olarak -ing, stop / remember / try / forget ile anlam farkı, fiil + kişi + to.',
    deepDive: [
      goal('A2\'deki fiil + to / -ing kalıplarını genişletip edatlardan sonra -ing kullanabilir, <strong>stop, remember, forget, try</strong> fiillerinde anlam farkını ayırt edebilir ve "birinden bir şey yapmasını istemek" kalıbını kurabilirsin.'),
      h('1. Edattan sonra her zaman -ing'),
      examples([
        ["I'm interested in learning Italian.", 'İtalyanca öğrenmekle ilgileniyorum.'],
        ["She's good at solving problems.", 'Problem çözmekte iyidir.'],
        ['Thank you for helping me.', 'Bana yardım ettiğin için teşekkürler.'],
        ["I'm looking forward to seeing you.", 'Seni görmeyi dört gözle bekliyorum.'],
        ['Before leaving, check the windows.', 'Çıkmadan önce pencereleri kontrol et.']
      ]),
      p('Dikkat: <em>look forward <strong>to</strong></em> ve <em>be used <strong>to</strong></em> kalıplarındaki <em>to</em> bir edattır, bu yüzden ardından -ing gelir: ✗ <em>looking forward to see you</em>.'),
      h('2. Özne olarak -ing'),
      p('<em><u>Swimming</u> is good for you. <u>Learning</u> a language takes time.</em> Türkçedeki "Yüz<u>mek</u> sağlıklıdır" yapısının karşılığı.'),
      h('3. Anlamı değişen fiiller'),
      table(['Fiil', '+ -ing', '+ to'], [
        ['stop', 'Bir alışkanlığı bırakmak: <em>He stopped smoking.</em> (sigarayı bıraktı)', 'Başka bir şey yapmak için durmak: <em>He stopped to smoke.</em> (sigara içmek için durdu)'],
        ['remember', 'Geçmişte yapılanı hatırlamak: <em>I remember meeting her.</em>', 'Yapılması gerekeni unutmamak: <em>Remember to lock the door.</em>'],
        ['forget', "Yaşanmış bir şeyi unutmak: <em>I'll never forget visiting Rome.</em>", "Yapmayı unutmak: <em>I forgot to call him.</em>"],
        ['try', 'Sonucu görmek için denemek: <em>Try restarting the computer.</em>', 'Zor bir şeyi yapmaya çalışmak: <em>I tried to open the jar, but I couldn\'t.</em>']
      ]),
      h('4. Fiil + kişi + to'),
      p('<strong>want, ask, tell, advise, expect, would like</strong> fiilleri "birinin bir şey yapmasını" anlatırken <em>kişi + to + fiil</em> alır.'),
      examples([
        ['I want you to come with me.', 'Benimle gelmeni istiyorum.'],
        ['She asked me to close the window.', 'Pencereyi kapatmamı istedi.'],
        ["The doctor told him not to eat sugar.", 'Doktor ona şeker yememesini söyledi.']
      ]),
      trNote('"Gelme<u>ni</u> istiyorum" yapısı Türkçede tek kelimede birleşir. İngilizcede kişi ve fiil ayrılır: <em>I want <u>you to come</u></em>. ✗ <em>I want that you come</em> çok yaygın bir Türk hatasıdır. Olumsuzu: <em>I want you <u>not to</u> come.</em>'),
      h('Mini diyalog'),
      dialog([
        ['Gül', "Did you remember to buy milk?"],
        ['Dan', "Oh no, I forgot to stop at the shop! I'm sorry."],
        ['Gül', "It's OK. Do you remember meeting my cousin Elif?"],
        ['Dan', "Yes, she's the one who's interested in studying in London, right?"],
        ['Gül', "Exactly. She asked me to ask you for advice. She's really looking forward to talking to you."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ["I'm looking forward to see you.", "I'm looking forward to seeing you.", 'Edat to + -ing.'],
        ['I want that you help me.', 'I want you to help me.', 'want + kişi + to.'],
        ['He is good at swim.', 'He is good at swimming.', 'Edattan sonra -ing.'],
        ['Remember locking the door when you leave.', 'Remember to lock the door when you leave.', 'Yapılacak iş → remember to.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Edat gördüğünde -ing', text: 'in, at, of, about, for, without, before, after + -ing.' },
      { type: 'good', title: 'Geçmiş → -ing, gelecek → to', text: 'remember / forget: yaşanmış olan -ing, yapılacak olan to.' },
      { type: 'bad', title: 'want that…', text: '"I want that you…" İngilizcede yoktur; I want you to…' }
    ],
    questions: [
      q('Edat', "I'm tired of ___ the same thing every day.", ['eat', 'to eat', 'eating', 'ate'], 2, 'Edattan (of) sonra -ing.'),
      q('Edat', "We're looking forward to ___ you next week.", ['see', 'seeing', 'saw', 'be seen'], 1, '"look forward to" + -ing.'),
      q('stop', 'He used to smoke, but he ___ last year.', ['stopped to smoke', 'stopped smoking', 'stop smoking', 'stopped smoke'], 1, 'Alışkanlığı bırakmak → stop + -ing.'),
      q('stop', 'We were tired, so we ___ a coffee on the motorway.', ['stopped having', 'stopped to have', 'stop to having', 'stopped have'], 1, 'Bir şey yapmak için durmak → stop + to.'),
      q('remember', 'Please ___ the lights when you leave.', ['remember turning off', 'remember to turn off', 'remember turn off', 'remembering to turn off'], 1, 'Yapılacak iş → remember to.'),
      q('remember', 'I ___ this song when I was a child. It brings back memories.', ['remember to hear', 'remember hearing', 'remember hear', 'am remember hearing'], 1, 'Geçmişte yaşanmış → remember + -ing.'),
      q('try', "The printer isn't working. ___ it off and on again.", ['Try turning', 'Try to turning', 'Trying turn', 'Try turned'], 0, 'Sonucu görmek için deneme → try + -ing.'),
      q('Fiil + kişi + to', '"Annem odamı toplamamı istedi." İngilizcesi hangisi?', ['My mum asked that I tidy my room.', 'My mum asked me to tidy my room.', 'My mum asked me tidying my room.', 'My mum asked to me tidy my room.'], 1, 'ask + kişi + to.'),
      q('Özne', '___ is my favourite way to relax.', ['Read', 'To reading', 'Reading', 'Reads'], 2, 'Özne olarak -ing.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ["She's good at drawing.", 'I want you to be honest.', "Thanks for invite me.", "Don't forget to text me."], 2, 'for (edat) + -ing: Thanks for inviting me.')
    ]
  },

  // 11 ───────────────────────────────────────────────────────────────────────
  {
    id: 'en-b1-11',
    title: 'too / enough ve so / such',
    duration: '25 dk',
    description: 'Fazlalık ve yeterlilik, so ve such ile vurgu, so … that / such … that ile sonuç bildirme.',
    deepDive: [
      goal('Bir şeyin fazla ya da yetersiz olduğunu söyleyebilir, duygularını <strong>so / such</strong> ile vurgulayabilir ve bir durumun sonucunu <strong>so … that</strong> kalıbıyla anlatabilirsin.'),
      h('too: gereğinden fazla'),
      p('<strong>too + sıfat / zarf</strong>, olumsuz bir anlam taşır: bir şey yapılamaz. Kalıp: <em>too + sıfat + (for + kişi) + to + fiil</em>.'),
      examples([
        ["This coffee is too hot to drink.", 'Bu kahve içilemeyecek kadar sıcak.'],
        ["The box was too heavy for me to carry.", 'Kutu benim taşıyamayacağım kadar ağırdı.'],
        ["There are too many people here.", 'Burada çok fazla insan var. (rahatsız edici)'],
        ["I've got too much work.", 'Çok fazla işim var.']
      ]),
      h('enough: yeterli'),
      table(['Kalıp', 'Örnek'], [
        ['sıfat / zarf + <strong>enough</strong>', "Is the room big enough? She didn't run fast enough."],
        ['<strong>enough</strong> + isim', "We don't have enough chairs. Is there enough time?"],
        ['… enough + to + fiil', "He's old enough to drive."]
      ]),
      p('Sıra önemli: sıfattan <strong>sonra</strong>, isimden <strong>önce</strong>. <em>old enough</em> ama <em>enough money</em>.'),
      h('so ve such: vurgu'),
      table(['Kalıp', 'Örnek'], [
        ['<strong>so</strong> + sıfat / zarf', "The film was so boring! She speaks so quickly."],
        ['<strong>such</strong> + (a / an) + sıfat + isim', "It was such a boring film! They're such nice people."],
        ['<strong>so</strong> much / many + isim', 'I have so much homework. There were so many cars.']
      ]),
      h('Sonuç: so … that / such … that'),
      examples([
        ["It was so cold that the lake froze.", 'O kadar soğuktu ki göl dondu.'],
        ["It was such a good book that I read it twice.", 'O kadar iyi bir kitaptı ki iki kez okudum.']
      ]),
      trNote('Türkçede "<u>çok</u> sıcak" ile "içilemeyecek kadar sıcak" arasındaki fark bağlamdan anlaşılır. İngilizcede <strong>very</strong> sadece derece bildirir, <strong>too</strong> ise "fazla, olmuyor" demektir: <em>It\'s very expensive, but I\'ll buy it</em> / <em>It\'s too expensive, I can\'t buy it</em>. "O kadar … ki" kalıbının karşılığı <strong>so … that</strong>\'tır.'),
      h('Mini diyalog'),
      dialog([
        ['Emre', "Let's take this flat. It's such a nice area!"],
        ['Kate', "But the bedroom isn't big enough for our bed."],
        ['Emre', "True. And the kitchen is too small to eat in."],
        ['Kate', "The other flat was so bright that we didn't need lights. Let's go back and see it again."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ["He's enough old to drive.", "He's old enough to drive.", 'enough sıfattan sonra.'],
        ["It's too much hot.", "It's too hot.", 'Sıfatla sadece too.'],
        ['It was so a good film.', 'It was such a good film.', 'a / an + isim varsa such.'],
        ['This is too delicious! (övgü)', 'This is so / really delicious!', 'too olumsuz anlam taşır.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'very ≠ too', text: 'very = çok; too = gereğinden fazla, olmuyor.' },
      { type: 'good', title: 'İsim varsa such', text: 'so beautiful / such a beautiful day.' },
      { type: 'bad', title: 'enough\'un yeri', text: 'enough sıfattan sonra, isimden önce: tall enough, enough time.' }
    ],
    questions: [
      q('too', "I can't reach the shelf. It's ___ high.", ['enough', 'too', 'so much', 'very much'], 1, 'Yapılamıyor → too.'),
      q('enough', "He isn't ___ to watch this film. He's only 10.", ['enough old', 'old enough', 'too old', 'so old'], 1, 'sıfat + enough.'),
      q('enough', "We don't have ___ for a taxi.", ['money enough', 'enough money', 'too money', 'so money'], 1, 'enough + isim.'),
      q('too much / many', 'There are ___ cars in the city centre.', ['too much', 'too many', 'enough', 'so much'], 1, 'cars sayılabilir → too many.'),
      q('so / such', 'It was ___ a beautiful day that we went to the beach.', ['so', 'such', 'too', 'enough'], 1, 'a + sıfat + isim → such.'),
      q('so / such', 'The exam was ___ difficult that nobody passed.', ['such', 'so', 'too', 'enough'], 1, 'Sadece sıfat → so … that.'),
      q('very / too', 'Hangisi doğru bir övgüdür?', ["This cake is too good, I can't eat it.", "This cake is so good!", "This cake is enough good!", "This cake is such good!"], 1, 'Övgü → so / really.'),
      q('Kalıp', '"Bu çanta taşıyamayacağım kadar ağır." İngilizcesi hangisi?', ['This bag is very heavy to carry.', 'This bag is too heavy for me to carry.', 'This bag is heavy enough for me to carry.', 'This bag is so heavy to carry.'], 1, 'too + sıfat + for + kişi + to.'),
      q('Çeviri', '"O kadar yorgundum ki hemen uyudum." İngilizcesi hangisi?', ['I was so tired that I fell asleep immediately.', 'I was such tired that I fell asleep immediately.', 'I was too tired that I fell asleep immediately.', 'I was enough tired to fall asleep immediately.'], 0, 'so + sıfat + that.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ["She's such a kind person.", "Is the water warm enough?", "We have enough time.", "It's so an expensive car."], 3, 'a / an + isim → such: It\'s such an expensive car.')
    ]
  },

  // 12 ───────────────────────────────────────────────────────────────────────
  {
    id: 'en-b1-12',
    title: 'Question Tags ve Dolaylı Sorular',
    duration: '25 dk',
    description: 'Onay soruları (…, isn\'t it?) ve kibar sorular (Could you tell me where…?).',
    deepDive: [
      goal('Konuşmada onay almak için <strong>question tag</strong> kullanabilir ve yabancılara, resmi ortamlarda <strong>dolaylı sorularla</strong> kibarca soru sorabilirsin.'),
      h('Question tags: …, değil mi?'),
      p('Kural: <strong>olumlu cümle → olumsuz tag</strong>, <strong>olumsuz cümle → olumlu tag</strong>. Tag\'de cümledeki yardımcı fiil (be, have, can, will…) tekrarlanır; yardımcı fiil yoksa <strong>do / does / did</strong> kullanılır. Özne zamirle tekrarlanır.'),
      table(['Cümle', 'Tag'], [
        ["It's cold today,", "isn't it?"],
        ["You aren't busy,", 'are you?'],
        ['She can swim,', "can't she?"],
        ["They've finished,", "haven't they?"],
        ['You live near here,', "don't you?"],
        ['He went home,', "didn't he?"],
        ["We'll be late,", "won't we?"]
      ]),
      p('Özel durumlar: <em>I\'m right, <strong>aren\'t I</strong>?</em> · <em>Let\'s go, <strong>shall we</strong>?</em> · <em>Open the door, <strong>will you</strong>?</em> · <em>Nobody called, <strong>did they</strong>?</em> (nobody / never cümleyi olumsuz yapar).'),
      p('Tonlama: tag\'de ses <strong>düşerse</strong> onay bekliyorsun (zaten biliyorsun); <strong>yükselirse</strong> gerçekten soruyorsun.'),
      h('Dolaylı sorular: kibar sorma'),
      p('Doğrudan soru yerine bir giriş ifadesiyle başlamak daha kibardır: <em>Could you tell me…? Do you know…? I was wondering…</em> Bu durumda soru kısmı <strong>düz cümle sırasına</strong> döner ve <strong>do / does / did kullanılmaz</strong>.'),
      table(['Doğrudan', 'Dolaylı'], [
        ['Where is the station?', 'Could you tell me where the station <strong>is</strong>?'],
        ['What time does the bank open?', 'Do you know what time the bank <strong>opens</strong>?'],
        ['Did he call?', 'Do you know <strong>if</strong> he called?'],
        ['How much does it cost?', "I'd like to know how much it <strong>costs</strong>."]
      ]),
      p('Evet / hayır soruları <strong>if / whether</strong> ile bağlanır. Soru işareti, giriş kısmı soruysa konur.'),
      trNote('Türkçede onay için tek bir kalıp vardır: "…, <u>değil mi</u>?" İngilizcede tag cümleye göre değişir; bu yüzden önce yardımcı fiili bul. Dolaylı soruda Türkçedeki "İstasyonun <u>nerede olduğunu</u> söyleyebilir misiniz?" yapısı gibi soru gömülür ve düz cümleye döner: <em>Could you tell me where the station <u>is</u>?</em>'),
      h('Mini diyalog'),
      dialog([
        ['Traveller', 'Excuse me, could you tell me where the nearest pharmacy is?'],
        ['Local', "Sure. It's on the next street, next to the bakery."],
        ['Traveller', 'Thank you. Do you know if it opens on Sundays?'],
        ['Local', "I think it does. You're not from here, are you?"],
        ['Traveller', "No, I'm from Turkey. It's a lovely city, isn't it?"]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ["You like coffee, isn't it?", "You like coffee, don't you?", 'Tag, cümledeki yardımcı fiile uyar.'],
        ["I'm late, am not I?", "I'm late, aren't I?", 'Özel durum: aren\'t I.'],
        ['Could you tell me where is the bank?', 'Could you tell me where the bank is?', 'Dolaylı soruda düz sıra.'],
        ['Do you know what time does it start?', 'Do you know what time it starts?', 'Dolaylı soruda does yok.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Önce yardımcı fiili bul', text: 'is → isn\'t, can → can\'t, yardımcı fiil yoksa do / does / did.' },
      { type: 'good', title: 'Yabancıya dolaylı sor', text: 'Excuse me, could you tell me… / Do you know… daha kibar ve doğal duyulur.' },
      { type: 'bad', title: '"isn\'t it" her yerde', text: 'Türkçedeki "değil mi" gibi sabit bir tag İngilizcede yoktur.' }
    ],
    questions: [
      q('Tag', "It's a beautiful day, ___?", ['is it', "isn't it", "doesn't it", "wasn't it"], 1, 'Olumlu cümle (is) → isn\'t it?'),
      q('Tag', "You don't eat meat, ___?", ['do you', "don't you", 'are you', 'eat you'], 0, 'Olumsuz cümle → olumlu tag.'),
      q('Tag', 'She lives in Ankara, ___?', ["isn't she", "doesn't she", "don't she", "didn't she"], 1, 'Yardımcı fiil yok, Present Simple, she → doesn\'t she?'),
      q('Tag', 'They went to the party, ___?', ["didn't they", "weren't they", "don't they", "haven't they"], 0, 'Past Simple → didn\'t they?'),
      q('Özel', "I'm your best friend, ___?", ["am not I", "aren't I", "isn't I", "don't I"], 1, 'Özel durum: aren\'t I?'),
      q('Özel', "Let's order pizza, ___?", ["don't we", 'shall we', "won't we", "let's not"], 1, "Let's → shall we?"),
      q('Dolaylı', 'Could you tell me where ___?', ['is the post office', 'the post office is', 'does the post office', 'the post office does be'], 1, 'Dolaylı soruda düz sıra.'),
      q('Dolaylı', 'Do you know what time ___?', ['does the film start', 'the film starts', 'starts the film', 'the film does start'], 1, 'Dolaylı soruda does yok.'),
      q('if', '"Is the museum open today?" → "Do you know ___ open today?"', ['is the museum', 'if the museum is', 'that is the museum', 'the museum if is'], 1, 'Evet / hayır sorusu → if + düz sıra.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ["He can drive, can't he?", "Could you tell me how much it costs?", "You're coming, aren't you?", "Do you know where does she work?"], 3, 'Dolaylı soruda does yok: …where she works?')
    ]
  }
];
