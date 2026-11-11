/**
 * English B2 curriculum: 12 lessons aligned with CEFR B2.
 * Imported into the database with: npm run content:en-b2
 *
 * Original ids are kept: en-b2-01 Passive, -02 Reported speech, -03 Phrasal verbs,
 * -04 Third conditional + wish. New lessons use en-b2-05..12.
 * Screen order comes from the array order.
 */

import { goal, h, p, table, examples, trNote, dialog, mistakes, q } from './lessonHtml.js';

export const STAGE_ID = 'en-b2';

export const LESSONS = [
  // 1 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-b2-09',
    title: 'Anlatı zamanları ve Past Perfect Continuous',
    duration: '35 dk',
    description: 'Bir hikâyeyi dört geçmiş zamanla katmanlı anlatmak: arka plan, ana olaylar, daha önceki olaylar ve öncesinde süren eylemler.',
    deepDive: [
      goal('Bir hikâyeyi anlatırken <strong>Past Simple, Past Continuous, Past Perfect</strong> ve <strong>Past Perfect Continuous</strong> zamanlarını birlikte kullanarak olayların sırasını ve arka planını net verebilirsin.'),
      h('Dört zamanın görevi'),
      table(['Zaman', 'Görevi', 'Örnek'], [
        ['Past Simple', 'Ana olaylar, sırayla', 'I opened the door and saw a stranger.'],
        ['Past Continuous', 'Arka plan, o an süren eylem', 'It was raining and people were hurrying home.'],
        ['Past Perfect', 'Anlatılan andan <strong>daha önce</strong> bitmiş olay', 'Someone had broken the window.'],
        ['Past Perfect Continuous', 'Anlatılan ana kadar <strong>bir süre devam etmiş</strong> eylem', 'He had been waiting for two hours.']
      ]),
      h('Past Perfect Continuous: yapı'),
      p('<strong>had been + V-ing</strong>: <em>She had been working there for ten years when the company closed.</em> Çoğunlukla <em>for / since / how long</em> ile ya da görünür bir sonucu açıklamak için kullanılır: <em>His eyes were red. He had been crying.</em>'),
      table(['Past Perfect', 'Past Perfect Continuous'], [
        ['Sonuç, tamamlanmış iş: I had written three emails.', 'Süreç, süre: I had been writing emails all morning.'],
        ['Kaç tane? → Past Perfect', 'Ne kadar süre? → Past Perfect Continuous'],
        ['Durum fiilleri burada kalır: I had known him for years.', 'know, believe, own gibi fiillerle kullanılmaz.']
      ]),
      examples([
        ["When I got to the station, the train had already left.", 'İstasyona vardığımda tren çoktan kalkmıştı.'],
        ["The ground was wet. It had been raining all night.", 'Yer ıslaktı. Bütün gece yağmur yağmıştı.'],
        ["We had been driving for six hours when the car broke down.", 'Araba bozulduğunda altı saattir yoldaydık.'],
        ["While I was cooking, the phone rang.", 'Yemek yaparken telefon çaldı.']
      ]),
      trNote('Türkçede "altı saattir yol<u>daydık</u>", "bekliyor<u>du</u>" gibi geçmişte süren durumlar tek bir yapıyla söylenir. İngilizcede "o ana kadar ne kadar süredir" vurgusu varsa <em>had been + -ing</em> gerekir: <em>We <u>had been driving</u> for six hours.</em> (✗ <em>We were driving for six hours when…</em> anlamı bozar.) "-mıştı" ise çoğu zaman Past Perfect\'e karşılık gelir.'),
      h('Mini hikâye'),
      dialog([
        ['Narrator', "It was a cold night and the wind was blowing hard."],
        ['Narrator', "Emre had been working late, so he was exhausted when he got home."],
        ['Narrator', "He found that someone had left the front door open."],
        ['Narrator', "He went inside carefully and turned on the light."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['When I arrived, the film already started.', 'When I arrived, the film had already started.', 'Varıştan önce bitmiş olay → Past Perfect.'],
        ['I had been knowing him for years.', 'I had known him for years.', 'know durum fiilidir; continuous olmaz.'],
        ['She was tired because she was running.', 'She was tired because she had been running.', 'Yorgunluk, öncesinde süren eylemin sonucu.'],
        ['I had been reading three books that summer.', 'I had read three books that summer.', 'Sayı / tamamlanma → Past Perfect.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Arka planı Continuous ile kur', text: 'Hikâyeye "It was raining…" gibi bir sahne cümlesiyle başla, olayları Past Simple ile sırala.' },
      { type: 'good', title: 'Görünen sonuç → had been -ing', text: 'Kırmızı gözler, ıslak zemin gibi sonuçları "had been crying / raining" ile açıkla.' },
      { type: 'bad', title: 'Her cümlede Past Perfect', text: 'Olaylar zaten sırayla anlatılıyorsa Past Simple yeter; Past Perfect yalnızca geriye dönüş içindir.' }
    ],
    questions: [
      q('Past Perfect', 'When we got to the cinema, the film ___.', ['already started', 'had already started', 'has already started', 'was already starting'], 1, 'Varmadan önce bitmiş olay → Past Perfect.'),
      q('Past Perfect Continuous', 'Her eyes were red. She ___.', ['had been crying', 'has cried', 'cried', 'was cry'], 0, 'Görünen sonucu açıklayan, öncesinde süren eylem → had been + -ing.'),
      q('Past Perfect Continuous', 'We ___ for two hours when the bus finally came.', ['waited', 'were waiting', 'had been waiting', 'have been waiting'], 2, 'Bir ana kadar süren eylem + süre → Past Perfect Continuous.'),
      q('Past Continuous', 'While I ___ dinner, the lights went out.', ['cooked', 'was cooking', 'had cooked', 'have cooked'], 1, 'Kesintiye uğrayan arka plan eylemi → Past Continuous.'),
      q('Durum fiili', 'Hangi cümle doğru?', ['I had been knowing her since school.', 'I had known her since school.', 'I was knowing her since school.', 'I have been knew her since school.'], 1, 'know durum fiilidir; continuous yapılmaz.'),
      q('Sonuç / süreç', 'By lunchtime I ___ ten pages of the report.', ['had been writing', 'had written', 'was writing', 'have written'], 1, 'Sayı (ten pages) tamamlanan işi gösterir → Past Perfect.'),
      q('Çeviri', '"Araba bozulduğunda altı saattir yoldaydık." İngilizcesi hangisi?', ['We drove for six hours when the car broke down.', 'We had been driving for six hours when the car broke down.', 'We have driven for six hours when the car broke down.', 'We are driving for six hours when the car broke down.'], 1, '"O ana kadar … saattir" → had been + -ing.'),
      q('Sıra', 'I ___ the email before I realised it was the wrong address.', ['sent', 'had sent', 'was sending', 'have sent'], 1, 'Fark etmeden önce bitmiş eylem → Past Perfect.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['The streets were wet because it had rained.', 'He was tired because he had been working all day.', 'When I arrived, everyone already left.', 'I was reading when she called.'], 2, 'Varıştan önce → everyone had already left.'),
      q('Anlatı', 'It was midnight. The wind ___ and the house was silent.', ['blew', 'had blown', 'was blowing', 'has blown'], 2, 'Sahneyi kuran arka plan → Past Continuous.')
    ]
  },

  // 2 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-b2-08',
    title: 'Future Continuous ve Future Perfect',
    duration: '30 dk',
    description: 'Gelecekte belirli bir anda sürecek ve o ana kadar tamamlanmış olacak eylemler; by, by the time, this time next week.',
    deepDive: [
      goal('Gelecekte belirli bir anda <strong>ne yapıyor olacağını</strong> ve o ana kadar <strong>neyi bitirmiş olacağını</strong> anlatabilir, kibar plan soruları sorabilirsin.'),
      h('İki yapı'),
      table(['Zaman', 'Yapı', 'Anlam', 'Örnek'], [
        ['Future Continuous', 'will be + V-ing', 'Gelecekteki bir anda sürüyor olacak', 'This time tomorrow I\'ll be flying to London.'],
        ['Future Perfect', 'will have + V3', 'Gelecekteki bir ana kadar bitmiş olacak', 'By 2030 I\'ll have finished university.'],
        ['Future Perfect Continuous', 'will have been + V-ing', 'O ana kadar ne kadar süredir sürmüş olacak', 'In May I\'ll have been working here for ten years.']
      ]),
      h('Zaman ifadeleri'),
      p('Future Continuous: <em>this time next week, at 8 tomorrow, in two hours\' time</em>. Future Perfect: <em>by Friday, by the end of the year, by the time you arrive</em> ("-e kadar", "en geç").'),
      examples([
        ["Don't call at nine. We'll be having dinner.", 'Saat dokuzda arama. Yemek yiyor olacağız.'],
        ["By the time you get here, I'll have cooked everything.", 'Sen buraya gelene kadar her şeyi pişirmiş olacağım.'],
        ['Will you be using the car tonight?', 'Bu akşam arabayı kullanacak mısın? (kibar soru)'],
        ["She won't have finished the project by Monday.", 'Pazartesiye kadar projeyi bitirmiş olmayacak.']
      ]),
      h('Kibar soru'),
      p('<em>Will you be + -ing…?</em> karşıdakinin planını merak ettiğimizi, onu bir şey yapmaya zorlamadığımızı gösterir: <em>Will you be going to the shops later?</em> (Gidiyorsan bana da bir şey alır mısın?)'),
      trNote('"-<u>mış olacağım</u>" yapısı Future Perfect\'e birebir karşılık gelir: "Bitir<u>miş olacağım</u>" = <em>I will have finished</em>. "-iyor olacağım" da Future Continuous\'tur. Dikkat: <em>by the time</em> ve <em>when</em> sonrasındaki yan cümlede will kullanılmaz: <em>by the time you <u>arrive</u></em> (✗ <em>will arrive</em>).'),
      h('Mini diyalog'),
      dialog([
        ['Ali', 'Can we meet on Friday at three?'],
        ['Kate', "Sorry, I'll be sitting an exam then."],
        ['Ali', 'What about the evening?'],
        ['Kate', "That's fine. I'll have finished all my exams by then!"]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ["By the time you will arrive, I'll have left.", "By the time you arrive, I'll have left.", 'Zaman yan cümlesinde Present Simple.'],
        ["I'll finish it until Friday.", "I'll have finished it by Friday.", '"-e kadar bitmiş" → by + Future Perfect. until süren durum içindir.'],
        ['This time tomorrow I will lie on a beach.', "This time tomorrow I'll be lying on a beach.", 'Belirli anda sürecek eylem → will be + -ing.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'by = en geç', text: 'by Friday / by the time… gördüğünde Future Perfect\'i düşün.' },
      { type: 'good', title: 'Kibar soru', text: '"Will you be using the printer?" doğrudan istekten daha naziktir.' },
      { type: 'bad', title: 'until ile by\'ı karıştırmak', text: '"I\'ll wait until six" süreç; "I\'ll have finished by six" bitiş noktası.' }
    ],
    questions: [
      q('Future Continuous', "This time next week we ___ on a beach in Bodrum.", ['will lie', 'will be lying', 'will have lain', 'are lie'], 1, 'Belirli anda sürecek eylem → will be + -ing.'),
      q('Future Perfect', "By the end of the year, I ___ 50 books.", ['will read', 'will be reading', 'will have read', 'read'], 2, 'by + sayı → o ana kadar tamamlanmış olacak.'),
      q('Zaman yan cümlesi', "By the time you ___, the film will have started.", ['will arrive', 'arrive', 'will have arrived', 'arriving'], 1, 'by the time sonrasında Present Simple.'),
      q('by / until', "I'll have finished the report ___ Friday.", ['until', 'by', 'since', 'during'], 1, 'Bitiş noktası → by.'),
      q('Kibar soru', 'Hangisi en kibar plan sorusudur?', ['Will you use the car tonight?', 'Will you be using the car tonight?', 'Do you use the car tonight?', 'Have you used the car tonight?'], 1, 'Will you be + -ing karşıdakinin planını sorar, baskı kurmaz.'),
      q('Future Perfect Continuous', "Next month I ___ here for five years.", ['will work', 'will be working', 'will have been working', 'am working'], 2, 'O ana kadar sürmüş olacak süre → will have been + -ing.'),
      q('Çeviri', '"Sen gelene kadar yemeği pişirmiş olacağım." İngilizcesi hangisi?', ["I'll cook dinner until you come.", "I'll have cooked dinner by the time you come.", "I'll be cooking dinner when you will come.", "I cook dinner before you will come."], 1, '"-mış olacağım" = will have + V3; by the time + Present Simple.'),
      q('Olumsuz', "I'm worried. They ___ the work by Monday — they've hardly started.", ['will have finished', "won't have finished", "won't be finishing", 'will finish'], 1, 'Henüz başlamadılarsa pazartesiye kadar bitirmiş olmayacaklar.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ["At 8 p.m. I'll be watching the match.", "She'll have left by then.", "I'll call you when I will get home.", "Will you be coming to the party?"], 2, 'when yan cümlesinde will olmaz: when I get home.'),
      q('Anlam', '"At ten I\'ll be having a meeting." ne anlatır?', ['Toplantı saat onda biter.', 'Saat onda toplantının ortasında olacağım.', 'Saat ondan önce toplantı bitmiş olacak.', 'Saat onda toplantıya karar vereceğim.'], 1, 'Future Continuous o anda süren eylemi anlatır.')
    ]
  },

  // 3 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-b2-12',
    title: 'used to, be used to, get used to ve would',
    duration: '30 dk',
    description: 'Geçmiş alışkanlıklar ile bir şeye alışık olmak / alışmak arasındaki fark ve geçmiş tekrarlarda would.',
    deepDive: [
      goal('<strong>used to + V1</strong>, <strong>be used to + -ing</strong> ve <strong>get used to + -ing</strong> yapılarını karıştırmadan kullanabilir, geçmiş alışkanlıkları <strong>would</strong> ile anlatabilirsin.'),
      h('Üç farklı yapı'),
      table(['Yapı', 'Anlam', 'Örnek'], [
        ['used to + V1', 'Eskiden yapardım (artık değil)', 'I used to smoke.'],
        ['be used to + -ing / isim', 'Alışığım (garip gelmiyor)', "I'm used to getting up early."],
        ['get used to + -ing / isim', 'Alışıyorum / alışacağım (süreç)', "I'm getting used to the cold weather."]
      ]),
      p('<em>be used to</em> ve <em>get used to</em> içindeki <strong>to</strong> bir edattır; arkasından fiil gelecekse <strong>-ing</strong> alır: <em>I\'m used to <u>working</u> at night.</em>'),
      h('would: tekrarlanan geçmiş eylemler'),
      p('Geçmişteki tekrarlanan <strong>eylemler</strong> için <em>would</em> da kullanılabilir, özellikle anılarda: <em>Every summer we would go to my grandparents\' village.</em> Ama <strong>durumlar</strong> için kullanılmaz: <em>I used to have long hair.</em> (✗ <em>I would have long hair.</em>)'),
      examples([
        ["We used to live in İzmir.", "Eskiden İzmir'de yaşardık."],
        ["It took me a year to get used to driving on the left.", 'Soldan araba kullanmaya alışmam bir yılımı aldı.'],
        ["She isn't used to such hot weather.", 'O kadar sıcak havaya alışık değil.'],
        ['Did you use to play football?', 'Eskiden futbol oynar mıydın?']
      ]),
      trNote('Türkçede "eskiden yap<u>ardım</u>" (used to), "alış<u>ığım</u>" (be used to) ve "alış<u>ıyorum</u>" (get used to) tamamen farklı fiillerdir; İngilizcede ise üçü de "used to" içerir. Ayırt etmenin kısa yolu: önünde <strong>be / get</strong> varsa arkası <strong>-ing</strong>, yoksa yalın fiil.'),
      h('Mini diyalog'),
      dialog([
        ['Mert', 'How do you like London?'],
        ['Zeynep', "I love it, but I'm still getting used to the weather."],
        ['Mert', 'And the food?'],
        ['Zeynep', "I'm used to it now. At first I used to miss Turkish breakfast a lot."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ["I'm used to get up early.", "I'm used to getting up early.", 'be used to + -ing.'],
        ['I use to play tennis when I was young.', 'I used to play tennis when I was young.', 'Olumlu cümlede used (geçmiş biçimi).'],
        ["Did you used to live here?", 'Did you use to live here?', 'did varken use (ed yok).'],
        ['When I was a child, I would have a dog.', 'When I was a child, I used to have a dog.', 'Durum için would kullanılmaz.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'be / get gördüysen -ing', text: 'be used to working, get used to living…' },
      { type: 'good', title: 'Anılarda would', text: 'Çocukluk anılarında tekrarlanan eylemler için would anlatımı canlandırır.' },
      { type: 'bad', title: 'Durumlarda would', text: '"I would have a bike" yanlış; have, live, be gibi durumlar için used to.' }
    ],
    questions: [
      q('used to', 'I ___ in Bursa when I was a child, but now I live in İstanbul.', ['am used to live', 'used to live', 'use to living', 'got used to live'], 1, 'Eskiden olup artık olmayan durum → used to + V1.'),
      q('be used to', "I've lived here for years, so I ___ the noise.", ['used to', 'am used to', 'use to', 'would'], 1, 'Alışık olmak → be used to + isim.'),
      q('get used to', 'It took me months to ___ driving on the left.', ['get used to', 'used to', 'be use to', 'would'], 0, 'Alışma süreci → get used to.'),
      q('-ing', "She's used to ___ long hours.", ['work', 'working', 'worked', 'works'], 1, 'be used to + -ing.'),
      q('Soru', '___ play the guitar when you were at school?', ['Did you used to', 'Did you use to', 'Were you used to', 'Used you'], 1, 'did + use to (ed yok).'),
      q('would', 'Hangisinde would kullanılamaz?', ['Every Sunday we ___ go fishing.', 'My grandmother ___ tell us stories.', 'We ___ have a big garden.', 'He ___ bring us sweets every evening.'], 2, 'have a garden bir durumdur; durumlar için would olmaz.'),
      q('Çeviri', '"Erken kalkmaya alışığım." İngilizcesi hangisi?', ['I used to get up early.', "I'm used to getting up early.", "I'm used to get up early.", 'I get used to get up early.'], 1, 'Alışık olmak → be used to + -ing.'),
      q('Anlam', '"I used to drink a lot of coffee." ne demektir?', ['Çok kahve içmeye alışığım.', 'Eskiden çok kahve içerdim (artık değil).', 'Çok kahve içmeye alışıyorum.', 'Çok kahve içmek zorundaydım.'], 1, 'used to + V1 = eskiden yapardım.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ["I'm getting used to my new job.", 'We used to go camping every summer.', "He isn't used to speak English.", "I didn't use to like olives."], 2, 'be used to + -ing → He isn\'t used to speaking English.'),
      q('Süreç', "It was hard at first, but I'm slowly ___ the new software.", ['used to', 'being used to', 'getting used to', 'use to'], 2, 'Şu an süren alışma süreci → getting used to.')
    ]
  },

  // 4 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-b2-01',
    title: 'Passive voice: tüm zamanlar ve modallar',
    duration: '35 dk',
    description: 'Edilgen yapıyı tüm zamanlarda ve modallarla kullanmak; "It is said that…" ve "He is believed to…" yapıları.',
    deepDive: [
      goal('Edilgen yapıyı Present Perfect, Past Continuous ve modallar dahil tüm zamanlarda kurabilir; haber dilindeki <strong>It is said that… / is thought to…</strong> yapılarını anlayıp kullanabilirsin.'),
      h('Hatırlatma'),
      p('<strong>be + V3</strong>. Zamanı <strong>be</strong> taşır, ana fiil hep V3 kalır. Eylemi yapan önemsizse ya da bilinmiyorsa passive tercih edilir; gerekiyorsa <em>by</em> ile söylenir.'),
      h('Tüm zamanlar'),
      table(['Zaman', 'Passive yapı', 'Örnek'], [
        ['Present Simple', 'am / is / are + V3', 'English is spoken here.'],
        ['Present Continuous', 'am / is / are being + V3', 'The road is being repaired.'],
        ['Past Simple', 'was / were + V3', 'The bridge was built in 1973.'],
        ['Past Continuous', 'was / were being + V3', 'I felt I was being watched.'],
        ['Present Perfect', 'has / have been + V3', 'My car has been stolen!'],
        ['Past Perfect', 'had been + V3', 'The tickets had been sold out.'],
        ['Future', 'will be + V3', 'The results will be announced tomorrow.'],
        ['Modal', 'modal + be + V3', 'This form must be signed.'],
        ['Geçmiş modal', 'modal + have been + V3', 'The letter should have been sent yesterday.']
      ]),
      h('Haber dili: It is said that… / is said to…'),
      table(['Yapı', 'Örnek'], [
        ['It is said / believed / thought that + cümle', 'It is believed that the painting is a fake.'],
        ['Özne + is said / believed to + V1', 'The painting is believed to be a fake.'],
        ['Özne + is said to + have + V3 (geçmiş)', 'The thief is thought to have escaped abroad.']
      ]),
      examples([
        ['The new hospital is being built near the airport.', 'Yeni hastane havalimanının yakınında inşa ediliyor.'],
        ['All the cakes had been eaten before we arrived.', 'Biz gelmeden bütün kekler yenmişti.'],
        ['The meeting has been cancelled.', 'Toplantı iptal edildi.'],
        ['He is said to be the richest man in the city.', 'Şehrin en zengin adamı olduğu söyleniyor.']
      ]),
      trNote('Türkçedeki "-<u>ıl</u> / -<u>ın</u>" eki ("yap<u>ıl</u>ıyor", "iptal edil<u>di</u>") passive\'in tam karşılığıdır, ama zamanı İngilizcede <strong>be</strong> taşır: "yapılıyor" = <em>is <u>being</u> done</em>, "yapıldı (sonucu şimdi önemli)" = <em>has <u>been</u> done</em>. "…olduğu söyleniyor / sanılıyor" kalıbı da <em>is said / thought to…</em> ile kurulur.'),
      h('Mini diyalog'),
      dialog([
        ['Reporter', 'Two paintings have been stolen from the museum.'],
        ['Reporter', 'The theft is thought to have happened on Sunday night.'],
        ['Reporter', 'Security cameras are being checked and the staff will be questioned tomorrow.']
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['The house is building now.', 'The house is being built now.', 'Continuous passive: being + V3.'],
        ['The report must finish today.', 'The report must be finished today.', 'Modal passive: modal + be + V3.'],
        ['It is said he to be rich.', 'He is said to be rich. / It is said that he is rich.', 'İki yapıyı karıştırma.'],
        ['My wallet has stolen.', 'My wallet has been stolen.', 'Present Perfect passive: has been + V3.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Zamanı be\'ye yükle', text: 'Önce aktif cümlenin zamanını bul, aynı zamanı be ile kur, ana fiili V3 yap.' },
      { type: 'good', title: 'Resmî yazıda passive', text: 'Raporlarda "Mistakes were made" gibi yapılar kişiden çok olaya odaklanır.' },
      { type: 'bad', title: 'Gereksiz by', text: '"The window was broken by someone" yerine sadece "The window was broken."' }
    ],
    questions: [
      q('Present Continuous', 'The bridge ___ at the moment, so use the other road.', ['is repairing', 'is being repaired', 'has repaired', 'repairs'], 1, 'Şu an yapılmakta → is being + V3.'),
      q('Present Perfect', 'Oh no! My bike ___!', ['has stolen', 'has been stolen', 'is stealing', 'was stealing'], 1, 'Yeni olmuş ve sonucu önemli → has been + V3.'),
      q('Modal', 'All forms ___ in black ink.', ['must complete', 'must be completed', 'must completed', 'must being completed'], 1, 'Modal passive: must be + V3.'),
      q('Past Perfect', 'When we arrived, all the tickets ___.', ['had been sold', 'have been sold', 'were selling', 'had sold'], 0, 'Varıştan önce satılmış → had been + V3.'),
      q('Geçmiş modal', 'The package ___ yesterday, but it is still here.', ['should send', 'should be sent', 'should have been sent', 'should have sent'], 2, 'Geçmişte yapılması gerekirdi (passive) → should have been + V3.'),
      q('is said to', 'The castle ___ over 800 years old.', ['says to be', 'is said to be', 'is said being', 'said to is'], 1, 'Özne + is said to + V1.'),
      q('Geçmiş haber dili', 'The robbers are believed ___ the country last night.', ['to leave', 'to have left', 'leaving', 'have left'], 1, 'Geçmişteki olay → to have + V3.'),
      q('Çeviri', '"Toplantı ertelendi." (haberi şimdi veriyorsun) İngilizcesi hangisi?', ['The meeting has postponed.', 'The meeting has been postponed.', 'The meeting is postponing.', 'The meeting postponed.'], 1, 'Present Perfect passive.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['Dinner is being served.', 'The results will be announced on Monday.', 'The car was repairing when I called.', 'It is thought that prices will rise.'], 2, 'Past Continuous passive → The car was being repaired.'),
      q('It is said that', 'Hangisi "It is believed that she lives in Paris." ile aynı anlamdadır?', ['She believes to live in Paris.', 'She is believed to live in Paris.', 'She is believed to have lived in Paris.', 'She believed living in Paris.'], 1, 'Şimdiki durum → is believed to + V1.')
    ]
  },

  // 5 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-b2-05',
    title: 'have / get something done (ettirgen yapı)',
    duration: '25 dk',
    description: 'Bir işi başkasına yaptırmak ve başımıza gelen olumsuz olayları anlatmak: I had my hair cut, I had my phone stolen.',
    deepDive: [
      goal('Bir işi başkasına yaptırdığını <strong>have / get + nesne + V3</strong> ile anlatabilir; başına gelen olumsuz olayları da bu yapıyla söyleyebilirsin.'),
      h('Yapı'),
      table(['Yapı', 'Anlam', 'Örnek'], [
        ['have + nesne + V3', 'Bir işi başkasına yaptırmak', 'I had my car serviced.'],
        ['get + nesne + V3', 'Aynı anlam, daha günlük', "I'm getting my hair cut tomorrow."],
        ['have + nesne + V3 (olumsuz olay)', 'Başına gelmek', 'She had her bag stolen on the train.']
      ]),
      p('Zaman <strong>have / get</strong> üzerinde değişir: <em>I <u>have</u> my nails done every month. I\'m <u>having</u> the kitchen painted. I\'ve just <u>had</u> my eyes tested. I\'ll <u>get</u> it fixed.</em>'),
      h('Karşılaştır'),
      examples([
        ['I cut my hair.', 'Saçımı (kendim) kestim.'],
        ['I had my hair cut.', 'Saçımı kestirdim.'],
        ['We need to get the roof repaired.', 'Çatıyı tamir ettirmemiz gerekiyor.'],
        ['He had his licence taken away.', 'Ehliyetine el konuldu. (başına geldi)']
      ]),
      trNote('Türkçede bu iş ettirgen ekle yapılır: "kes<u>tir</u>dim", "boya<u>t</u>ıyoruz", "tamir et<u>tir</u>mek". İngilizcede ek yoktur; <strong>have / get + nesne + V3</strong> kullanılır ve <strong>nesne ortada</strong> durur: <em>I had <u>my hair</u> cut</em> (✗ <em>I had cut my hair</em> — bu "saçımı kesmiştim" demektir).'),
      h('Mini diyalog'),
      dialog([
        ['Can', 'Your flat looks different!'],
        ['Elif', "We had the walls painted and got new curtains made."],
        ['Can', 'Nice. I need to get my kitchen done too.'],
        ['Elif', "I'll send you the painter's number."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['I had cut my hair yesterday.', 'I had my hair cut yesterday.', 'Nesne have ile V3 arasına gelir.'],
        ["I'm going to cut my hair at the hairdresser's.", "I'm going to have my hair cut at the hairdresser's.", 'Kuaför kesiyorsa → have it cut.'],
        ['I must repair my car.', 'I must get my car repaired.', 'Kendin tamir etmiyorsan ettirgen yapı.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Nesne ortada', text: 'have + my car + washed. Sıra değişirse anlam değişir.' },
      { type: 'good', title: 'Konuşmada get', text: 'Günlük dilde "get it fixed / get it done" çok yaygındır.' },
      { type: 'bad', title: 'Kendin yapmış gibi anlatmak', text: '"I cut my hair" dersen herkes saçını kendin kestiğini düşünür.' }
    ],
    questions: [
      q('Yapı', 'I ___ at the hairdresser\'s yesterday.', ['cut my hair', 'had my hair cut', 'had cut my hair', 'have my hair cutting'], 1, 'Başkasına yaptırmak → had + nesne + V3.'),
      q('Zaman', "We ___ the house painted next week.", ['are having', 'have had', 'had', 'having'], 0, 'Planlanmış gelecek → are having.'),
      q('Olumsuz olay', 'He ___ on the metro last week.', ['stole his phone', 'had his phone stolen', 'had stolen his phone', 'got stealing his phone'], 1, 'Başına gelen olay → had + nesne + V3.'),
      q('get', 'You should ___ your eyes tested.', ['get', 'make', 'do', 'let'], 0, 'get + nesne + V3 = yaptırmak.'),
      q('Present Perfect', "I've just ___ my car serviced.", ['have', 'had', 'having', 'got to'], 1, 'have + had + nesne + V3.'),
      q('Anlam', '"I had my laptop repaired." ne demektir?', ['Laptopumu (kendim) tamir ettim.', 'Laptopumu tamir ettirdim.', 'Laptopumu tamir etmiştim.', 'Laptopumu tamir etmem gerekti.'], 1, 'have + nesne + V3 = ettirgen.'),
      q('Çeviri', '"Mutfağı yeniletmemiz lazım." İngilizcesi hangisi?', ['We need to renovate the kitchen ourselves.', 'We need to get the kitchen renovated.', 'We need to have renovated the kitchen.', 'We need the kitchen renovating us.'], 1, 'get + nesne + V3.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['She has her nails done every week.', "I'm getting my suit cleaned.", 'They had built their house by a local firm.', 'We had the locks changed.'], 2, 'Doğrusu: They had their house built by a local firm.'),
      q('Soru', '___ your hair cut? It looks great!', ['Have you had', 'Did you have cut', 'Have you cut had', 'Are you had'], 0, 'Present Perfect sorusu: Have you had + nesne + V3?'),
      q('Gelecek', "My printer is broken. I'll ___ tomorrow.", ['fix it', 'get it fixed', 'get fixed it', 'have fixed it'], 1, 'Yaptıracaksam → get it fixed.')
    ]
  },

  // 6 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-b2-02',
    title: 'Reported speech: ileri düzey ve reporting verbs',
    duration: '35 dk',
    description: 'Zaman kaydırmanın istisnaları ve söyleneni özetleyen fiiller: advise, warn, offer, refuse, deny, suggest, admit, accuse.',
    deepDive: [
      goal('Birinin söylediğini sadece <em>said / told</em> ile değil, <strong>advise, warn, refuse, deny, suggest</strong> gibi fiillerle özetleyebilir; zaman kaydırmanın ne zaman gerekmediğini bilirsin.'),
      h('Kısa hatırlatma ve istisnalar'),
      p('B1\'de zaman kaydırmayı gördük (<em>"I\'m tired" → She said she was tired</em>). Söylenen şey <strong>hâlâ doğruysa</strong> kaydırma zorunlu değildir: <em>He said he lives in Ankara.</em> Rapor eden fiil şimdiki zamandaysa da kaydırma olmaz: <em>She says she\'s busy.</em> Ayrıca <em>would, could, should, might</em> ve Past Perfect değişmez.'),
      h('Reporting verbs: yapılarına göre'),
      table(['Yapı', 'Fiiller', 'Örnek'], [
        ['fiil + to V1', 'agree, offer, promise, refuse, threaten', 'He refused to help me.'],
        ['fiil + kişi + to V1', 'advise, ask, encourage, invite, remind, warn, tell', 'She advised me to see a doctor.'],
        ['fiil + -ing', 'admit, deny, recommend, suggest', 'He denied taking the money.'],
        ['fiil + kişi + edat + -ing', 'accuse sb of, blame sb for, congratulate sb on', 'They accused him of lying.'],
        ['fiil + (that) + cümle', 'explain, complain, insist, suggest', 'She suggested that we should leave early.'],
        ['fiil + edat + -ing', 'apologise for, insist on', 'He apologised for being late.']
      ]),
      examples([
        ['"I\'ll carry your bag." → He offered to carry my bag.', 'Çantamı taşımayı teklif etti.'],
        ['"Don\'t touch the wire!" → She warned me not to touch the wire.', 'Kabloya dokunmamam konusunda uyardı.'],
        ['"I didn\'t break it." → He denied breaking it.', 'Kırdığını inkâr etti.'],
        ['"Let\'s take a taxi." → She suggested taking a taxi.', 'Taksiye binmeyi önerdi.']
      ]),
      trNote('Türkçede "önerdi", "inkâr etti", "reddetti" fiillerinden sonra hep "-mayı / -diğini" eki gelir. İngilizcede her fiilin kendi kalıbı vardır: <em>refuse <u>to</u> do</em> ama <em>deny <u>doing</u></em>. Özellikle <strong>suggest</strong> asla <em>suggest me to…</em> şeklinde kullanılmaz: <em>She suggested <u>going</u></em> ya da <em>She suggested <u>that I go</u></em>.'),
      h('Mini diyalog'),
      dialog([
        ['Ayşe', 'What happened at the meeting?'],
        ['Burak', 'The manager accused Tom of losing the client.'],
        ['Ayşe', 'Did Tom admit it?'],
        ['Burak', "No, he denied making any mistake and refused to apologise. Then the manager warned him not to be late again."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['She suggested me to call him.', 'She suggested calling him. / She suggested that I (should) call him.', 'suggest + kişi + to V1 kalıbı yoktur.'],
        ['He denied to steal the car.', 'He denied stealing the car.', 'deny + -ing.'],
        ['They accused him for cheating.', 'They accused him of cheating.', 'accuse sb of + -ing.'],
        ['She advised to me to rest.', 'She advised me to rest.', 'advise + kişi + to V1 (edat yok).']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Fiili kalıbıyla öğren', text: '"refuse to", "deny -ing", "accuse of -ing" şeklinde, kalıbıyla birlikte ezberle.' },
      { type: 'good', title: 'said yerine anlamlı fiil', text: '"He said he was sorry" yerine "He apologised" anlatımı güçlendirir.' },
      { type: 'bad', title: 'suggest me to', text: 'En yaygın hata; suggest + -ing ya da suggest that…' }
    ],
    questions: [
      q('refuse', '"I won\'t lend you my car." → He ___ me his car.', ['refused lending', 'refused to lend', 'denied to lend', 'refused me to lend'], 1, 'refuse + to V1.'),
      q('deny', '"I didn\'t take the money." → She ___ the money.', ['denied taking', 'denied to take', 'refused taking', 'denied that take'], 0, 'deny + -ing.'),
      q('suggest', '"Let\'s go to the cinema." → He ___ to the cinema.', ['suggested us to go', 'suggested going', 'suggested to go', 'suggested we going'], 1, 'suggest + -ing.'),
      q('warn', '"Don\'t swim here." → The lifeguard ___ there.', ['warned us not to swim', 'warned us to not swimming', 'warned not us to swim', 'warned us don\'t swim'], 0, 'warn + kişi + not to V1.'),
      q('accuse', 'They accused the director ___ the money.', ['for stealing', 'of stealing', 'to steal', 'about stealing'], 1, 'accuse sb of + -ing.'),
      q('offer', '"Shall I help you with the boxes?" → She ___ me with the boxes.', ['offered to help', 'offered helping', 'offered me to help', 'suggested me helping'], 0, 'offer + to V1 (kişi araya girmez).'),
      q('advise', '"You should see a lawyer." → My friend ___ a lawyer.', ['advised me seeing', 'advised me to see', 'advised to me see', 'advised that see'], 1, 'advise + kişi + to V1.'),
      q('Zaman kaydırma', '"The Earth goes round the Sun," the teacher said. Hangisi doğaldır?', ['The teacher said the Earth goes round the Sun.', 'The teacher said the Earth had gone round the Sun.', 'The teacher said the Earth will go round the Sun.', 'The teacher said the Earth going round the Sun.'], 0, 'Hâlâ doğru olan bilgi için kaydırma gerekmez.'),
      q('apologise', '"I\'m sorry I\'m late." → He ___ late.', ['apologised to be', 'apologised for being', 'apologised being', 'apologised that be'], 1, 'apologise for + -ing.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['She admitted breaking the vase.', 'He promised to call me.', 'They suggested me to take the train.', 'I reminded him to lock the door.'], 2, 'suggest + kişi + to V1 olmaz: They suggested taking the train.')
    ]
  },

  // 7 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-b2-07',
    title: 'Geçmiş modallar: must have, can\'t have, should have',
    duration: '30 dk',
    description: 'Geçmiş hakkında çıkarım yapmak ve pişmanlık / eleştiri bildirmek: must have, might have, can\'t have, should have, needn\'t have.',
    deepDive: [
      goal('Geçmişte ne olmuş olabileceği hakkında <strong>must / might / can\'t have + V3</strong> ile çıkarım yapabilir; <strong>should have</strong> ile pişmanlığını ya da eleştirini söyleyebilirsin.'),
      h('Çıkarım (deduction)'),
      table(['Yapı', 'Kesinlik', 'Örnek'], [
        ['must have + V3', '%95 eminim: olmuş', "The streets are wet. It must have rained."],
        ['may / might / could have + V3', 'Belki olmuştur', 'She might have missed the bus.'],
        ["can't / couldn't have + V3", '%95 eminim: olmamış', "He can't have seen me. He didn't say hello."]
      ]),
      h('Eleştiri, pişmanlık ve gereksiz iş'),
      table(['Yapı', 'Anlam', 'Örnek'], [
        ['should / ought to have + V3', 'Yapmalıydın (ama yapmadın)', 'You should have told me.'],
        ["shouldn't have + V3", 'Yapmamalıydın (ama yaptın)', "I shouldn't have eaten so much."],
        ["needn't have + V3", 'Gerek yokmuş (ama yaptın)', "You needn't have brought a gift."],
        ["didn't need to + V1", 'Gerek yoktu (yapmadın)', "I didn't need to wait long."],
        ['could have + V3', 'Yapabilirdin / olabilirdi (olmadı)', 'You could have been killed!']
      ]),
      examples([
        ["Ali isn't answering. He must have gone to bed.", 'Ali cevap vermiyor. Yatmış olmalı.'],
        ["I can't find my keys. I might have left them at work.", 'Anahtarlarımı bulamıyorum. İşte unutmuş olabilirim.'],
        ["She can't have finished already — she only started ten minutes ago.", 'Çoktan bitirmiş olamaz, on dakika önce başladı.'],
        ['We should have booked a table.', 'Masa ayırtmalıydık.']
      ]),
      trNote('Türkçe karşılıkları çok nettir: "-<u>mış olmalı</u>" = <em>must have</em>, "-<u>mış olabilir</u>" = <em>might have</em>, "-<u>mış olamaz</u>" = <em>can\'t have</em>, "-<u>malıydın</u>" = <em>should have</em>. Dikkat: "olamaz" için <em>mustn\'t have</em> kullanılmaz; doğru yapı <em>can\'t have</em>\'dir.'),
      h('Mini diyalog'),
      dialog([
        ['Leyla', "Where's Kerem? The meeting started twenty minutes ago."],
        ['Onur', 'He must have got stuck in traffic.'],
        ['Leyla', "He can't have — he lives next door!"],
        ['Onur', "Then he might have forgotten. Someone should have reminded him."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ["He mustn't have seen us.", "He can't have seen us.", 'Olumsuz çıkarım → can\'t have.'],
        ['You should told me.', 'You should have told me.', 'Geçmiş için should have + V3.'],
        ['She must have went home.', 'She must have gone home.', 'have\'den sonra V3.'],
        ['I must have to leave earlier.', 'I should have left earlier.', 'Pişmanlık → should have + V3.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Kanıta göre modal seç', text: 'Güçlü kanıt → must have / can\'t have; zayıf kanıt → might have.' },
      { type: 'good', title: 'Kibar eleştiri', text: '"You could have told me" "You should have told me"dan daha yumuşaktır.' },
      { type: 'bad', title: 'mustn\'t have', text: 'Çıkarımda olumsuz must yoktur; can\'t have kullan.' }
    ],
    questions: [
      q('must have', "The ground is wet. It ___ in the night.", ['must rain', 'must have rained', "can't have rained", 'should have rained'], 1, 'Güçlü kanıt + geçmiş → must have + V3.'),
      q("can't have", "She ___ the email — she hasn't got internet at home.", ['must have read', "can't have read", 'should have read', "mustn't have read"], 1, 'Mantıken imkânsız → can\'t have.'),
      q('might have', "I'm not sure where my phone is. I ___ it in the taxi.", ['might have left', "can't have left", 'should have left', 'must leave'], 0, 'Emin değilim → might have.'),
      q('should have', "I failed the exam. I ___ harder.", ['must have studied', 'should have studied', "needn't have studied", 'might study'], 1, 'Pişmanlık → should have + V3.'),
      q("needn't have", "I ___ so much food — only three people came.", ["needn't have cooked", "didn't need cooking", "can't have cooked", "mustn't have cooked"], 0, 'Yaptım ama gerek yokmuş → needn\'t have + V3.'),
      q("shouldn't have", "I feel sick. I ___ all that cake.", ["shouldn't have eaten", "can't have eaten", "needn't eat", "mustn't eat"], 0, 'Yaptığına pişmanlık → shouldn\'t have.'),
      q('Çeviri', '"Otobüsü kaçırmış olmalı." İngilizcesi hangisi?', ['He must miss the bus.', 'He must have missed the bus.', 'He should have missed the bus.', 'He had to miss the bus.'], 1, '"-mış olmalı" = must have + V3.'),
      q('could have', "You drove too fast. You ___ an accident!", ['could have had', 'must have had', 'should have had', "can't have had"], 0, 'Olabilirdi ama olmadı → could have + V3.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['They must have forgotten.', "He can't have said that.", 'You should have went to the doctor.', 'She might have been ill.'], 2, 'have + V3 → should have gone.'),
      q('Anlam', '"He can\'t have stolen it." ne demektir?', ['Onu çalmamalıydı.', 'Onu çalmış olamaz.', 'Onu çalmak zorunda değildi.', 'Onu çalabilirdi.'], 1, "can't have + V3 = -mış olamaz.")
    ]
  },

  // 8 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-b2-04',
    title: '3. koşul, wish ve if only',
    duration: '35 dk',
    description: 'Geçmişte olmayan durumları hayal etmek ve şimdiki / geçmiş pişmanlıkları wish ile anlatmak.',
    deepDive: [
      goal('Geçmişte gerçekleşmemiş bir durumun sonucunu <strong>3. koşul</strong> ile hayal edebilir; şimdiki ve geçmişteki pişmanlıklarını <strong>wish / if only</strong> ile anlatabilirsin.'),
      h('3. koşul (third conditional)'),
      table(['If cümlesi', 'Ana cümle', 'Örnek'], [
        ['If + had + V3', 'would have + V3', "If I had studied, I would have passed."],
        ['If + hadn\'t + V3', 'could / might have + V3', "If we hadn't missed the train, we might have arrived on time."]
      ]),
      p('İki taraf da <strong>geçmişte olmamış</strong> bir durumu anlatır: <em>If you had told me, I would have helped.</em> (Söylemedin, yardım etmedim.)'),
      h('wish ve if only'),
      table(['Yapı', 'Pişmanlık / dilek', 'Örnek'], [
        ['wish + Past Simple', 'Şimdiki durum keşke farklı olsa', 'I wish I had more free time.'],
        ['wish + were', 'Şimdiki durum (resmî / B2)', 'I wish I were taller.'],
        ['wish + had + V3', 'Geçmişte keşke farklı olsaydı', "I wish I hadn't said that."],
        ['wish + would', 'Başkasının davranışından şikâyet', 'I wish you would stop talking!'],
        ['wish + could', 'Yapamadığım bir şey', 'I wish I could speak Japanese.']
      ]),
      p('<strong>If only</strong> aynı yapılarla kullanılır ama daha duygusaldır: <em>If only I had listened to you!</em>'),
      examples([
        ["If she had left earlier, she wouldn't have missed the flight.", 'Daha erken çıksaydı uçağı kaçırmazdı.'],
        ["I wish I knew the answer.", 'Keşke cevabı bilsem.'],
        ["I wish I had taken that job.", 'Keşke o işi kabul etseydim.'],
        ['If only it would stop raining!', 'Keşke yağmur dursa artık!']
      ]),
      trNote('Türkçede "keşke" + "-sa / -saydı" ayrımı İngilizceyle örtüşür: "Keşke bil<u>sem</u>" = <em>I wish I <u>knew</u></em> (şimdi), "Keşke bil<u>seydim</u>" = <em>I wish I <u>had known</u></em> (geçmiş). Ana cümlede "-<u>ardı</u>" geçmişe aitse 3. koşul gerekir: "Bilseydim söyle<u>rdim</u>" = <em>If I had known, I <u>would have told</u> you.</em>'),
      h('Mini diyalog'),
      dialog([
        ['Seda', "I wish I hadn't sold my flat in 2019."],
        ['Ozan', "Why? Prices have gone up?"],
        ['Seda', "Doubled! If I had kept it, I would have made a lot of money."],
        ['Ozan', "If only we could see the future!"]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['If I would have known, I would have come.', 'If I had known, I would have come.', 'If tarafında would olmaz.'],
        ['I wish I have a car.', 'I wish I had a car.', 'Şimdiki dilek → wish + Past Simple.'],
        ['I wish I didn\'t eat so much yesterday.', "I wish I hadn't eaten so much yesterday.", 'Geçmiş pişmanlık → wish + had + V3.'],
        ['I wish I would be rich.', 'I wish I were rich.', 'Kendi durumun için would değil Past Simple / were.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Bir adım geriye', text: 'wish ile zaman bir adım geri gider: şimdi → Past Simple, geçmiş → Past Perfect.' },
      { type: 'good', title: 'Kısaltmalara dikkat', text: "I'd = I had (If I'd known) ya da I would (I'd have come). Bağlamdan anla." },
      { type: 'bad', title: 'If tarafında would', text: '"If I would have" en yaygın 3. koşul hatasıdır.' }
    ],
    questions: [
      q('3. koşul', 'If I ___ about the party, I would have come.', ['knew', 'had known', 'would know', 'have known'], 1, 'If + had + V3.'),
      q('3. koşul', "If we had taken a taxi, we ___ the train.", ["wouldn't miss", "wouldn't have missed", "hadn't missed", "won't have missed"], 1, 'Ana cümle → would have + V3.'),
      q('wish (şimdi)', "I wish I ___ a bigger flat. This one is too small.", ['have', 'had', 'had had', 'would have'], 1, 'Şimdiki durum → wish + Past Simple.'),
      q('wish (geçmiş)', "I wish I ___ to the doctor earlier.", ['went', 'had gone', 'would go', 'go'], 1, 'Geçmiş pişmanlık → wish + had + V3.'),
      q('wish + would', "It's been raining all week. I wish it ___ stop!", ['will', 'would', 'had', 'can'], 1, 'Değişmesini istediğin bir durumdan şikâyet → wish + would.'),
      q('wish + could', 'I wish I ___ swim. Everyone is in the sea except me.', ['can', 'could', 'would', 'had'], 1, 'Yapamadığım şey → wish + could.'),
      q('Çeviri', '"Keşke ona söylemeseydim." İngilizcesi hangisi?', ["I wish I didn't tell him.", "I wish I hadn't told him.", "I wish I wouldn't tell him.", "I wish I don't tell him."], 1, '"-saydım" geçmiş → wish + had + V3.'),
      q('Anlam', '"If you had asked, I would have helped." ne anlatır?', ['Sordun ve yardım ettim.', 'Sormadın ve yardım etmedim.', 'Sorarsan yardım ederim.', 'Sorsan yardım ederdim (şimdi).'], 1, '3. koşul geçmişte olmamış durumu anlatır.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['If only I had listened to you.', "I wish I were on holiday.", "If he would have seen the sign, he would have stopped.", "If you'd told me, I'd have helped."], 2, 'If tarafında would olmaz → If he had seen the sign.'),
      q('could have', 'If you had trained harder, you ___ the race.', ['could win', 'could have won', 'can have won', 'had won'], 1, 'Olası ama olmamış sonuç → could have + V3.')
    ]
  },

  // 9 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-b2-06',
    title: 'Karışık koşullar ve unless, as long as, provided that',
    duration: '30 dk',
    description: 'Geçmiş ile şimdiyi bağlayan karışık koşul cümleleri ve "if" yerine kullanılan bağlaçlar.',
    deepDive: [
      goal('Geçmişteki bir olayın şimdiki sonucunu ya da şimdiki bir özelliğin geçmişteki etkisini <strong>karışık koşul</strong> ile anlatabilir; <strong>unless, as long as, provided that, in case</strong> bağlaçlarını doğru kullanabilirsin.'),
      h('İki tür karışık koşul'),
      table(['Tür', 'If cümlesi', 'Ana cümle', 'Örnek'], [
        ['Geçmiş → şimdi', 'If + had + V3', 'would + V1 (now)', "If I had taken the job, I would be rich now."],
        ['Şimdi → geçmiş', 'If + Past Simple', 'would have + V3', "If I spoke Italian, I would have understood the film."]
      ]),
      p('Birinci tür en yaygınıdır: geçmişteki bir karar bugünü nasıl değiştirirdi? <em>If I hadn\'t met you, my life would be very different.</em>'),
      h('if yerine kullanılan bağlaçlar'),
      table(['Bağlaç', 'Anlam', 'Örnek'], [
        ['unless', 'if … not (-madıkça)', "We'll be late unless we hurry."],
        ['as long as / provided (that)', 'şartıyla, yeter ki', 'You can borrow it as long as you bring it back.'],
        ['in case', 'ihtimaline karşı', "Take an umbrella in case it rains."],
        ['otherwise', 'yoksa', 'Hurry, otherwise we\'ll miss the bus.'],
        ['suppose / supposing', 'diyelim ki', 'Supposing you lost your job, what would you do?']
      ]),
      examples([
        ["If I hadn't stayed up so late, I wouldn't be so tired now.", 'Bu kadar geç yatmasaydım şimdi bu kadar yorgun olmazdım.'],
        ["If she weren't so shy, she would have spoken to him at the party.", 'Bu kadar utangaç olmasaydı partide onunla konuşurdu.'],
        ["I won't go unless you come with me.", 'Sen gelmezsen gitmem.'],
        ["I'll take some cash in case the card doesn't work.", 'Kart çalışmazsa diye biraz nakit alayım.']
      ]),
      trNote('<strong>in case</strong> ile <strong>if</strong> farklıdır: "Yağmur yağ<u>arsa</u> şemsiye al" (<em>if</em>: yağarsa alırsın) ile "Yağmur yağ<u>ar diye</u> şemsiye al" (<em>in case</em>: şimdi al, belki yağar). <strong>unless</strong> zaten olumsuz anlam taşır; arkasına ikinci bir olumsuzluk koyma: <em>unless you <u>hurry</u></em> (✗ <em>unless you don\'t hurry</em>).'),
      h('Mini diyalog'),
      dialog([
        ['Murat', "If I hadn't changed careers, I'd still be working in a bank."],
        ['Pınar', 'Do you regret it?'],
        ['Murat', "Not at all. I'm happy as long as I'm doing something creative."],
        ['Pınar', "Still, keep your CV updated in case something better comes up."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ["Unless you don't study, you'll fail.", "Unless you study, you'll fail.", 'unless = if not.'],
        ["If I had studied medicine, I would have been a doctor now.", 'If I had studied medicine, I would be a doctor now.', 'Şimdiki sonuç → would + V1.'],
        ["Take a coat if it gets cold.", 'Take a coat in case it gets cold.', 'Önlem → in case.'],
        ['As long as you will be careful, you can go.', 'As long as you are careful, you can go.', 'Koşul tarafında will olmaz.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'now ipucu', text: 'Ana cümlede "now / today" varsa geçmiş koşula rağmen would + V1 kullan.' },
      { type: 'good', title: 'in case = önlem', text: 'Bir şeyi şimdi yapıyorsun çünkü sonra bir şey olabilir.' },
      { type: 'bad', title: 'Çift olumsuz', text: '"unless … not" anlamı tersine çevirir.' }
    ],
    questions: [
      q('Geçmiş → şimdi', "If I had saved money, I ___ a car now.", ['would have', 'would have had', 'had', 'will have'], 0, 'Şimdiki sonuç → would + V1.'),
      q('Şimdi → geçmiş', "If I ___ French, I would have understood what she said.", ['spoke', 'had spoken', 'would speak', 'speak'], 0, 'Kalıcı şimdiki durum → If + Past Simple.'),
      q('unless', "You won't pass ___ you work harder.", ['if', 'unless', 'in case', 'as long'], 1, 'if … not = unless.'),
      q('in case', "Take your phone ___ you get lost.", ['unless', 'in case', 'provided', 'otherwise'], 1, 'Önlem → in case.'),
      q('as long as', "You can use my laptop ___ you're careful with it.", ['unless', 'in case', 'as long as', 'otherwise'], 2, 'Şartıyla → as long as.'),
      q('Karışık', "If she hadn't missed the flight, she ___ in Rome now.", ['would be', 'would have been', 'will be', 'is'], 0, 'Geçmiş neden + şimdiki sonuç.'),
      q('Çeviri', '"Sen de gelmedikçe gitmem." İngilizcesi hangisi?', ["I won't go unless you come too.", "I won't go unless you don't come too.", "I don't go if you come too.", "I won't go in case you come too."], 0, 'unless + olumlu fiil.'),
      q('otherwise', "Leave now, ___ you'll be late.", ['unless', 'otherwise', 'in case', 'provided'], 1, '"Yoksa" → otherwise.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ["If I hadn't eaten so much, I wouldn't feel sick now.", "Unless it doesn't rain, we'll have a picnic.", 'You can stay provided you help with the cleaning.', "Supposing you won the lottery, what would you buy?"], 1, 'Çift olumsuz → Unless it rains, we won\'t have… / If it doesn\'t rain, we\'ll…'),
      q('Anlam', '"If he were more organised, he wouldn\'t have lost the documents." ne anlatır?', ['Dün düzenliydi ama belgeleri kaybetti.', 'Genel olarak düzensiz biri ve bu yüzden belgeleri kaybetti.', 'Düzenli olursa belgeleri kaybetmez.', 'Belgeleri kaybetmedi.'], 1, 'Şimdiki kalıcı özellik → geçmişteki sonuç.')
    ]
  },

  // 10 ───────────────────────────────────────────────────────────────────────
  {
    id: 'en-b2-10',
    title: 'Non-defining relative clauses ve kısaltılmış sıfat cümleleri',
    duration: '30 dk',
    description: 'Virgüllü ek bilgi cümleleri, which ile bütün cümleye atıf, edatlı yapılar ve -ing / V3 ile kısaltma.',
    deepDive: [
      goal('İsme <strong>ek bilgi</strong> veren virgüllü sıfat cümlelerini kurabilir, <em>which</em> ile bütün bir cümleye atıf yapabilir ve sıfat cümlelerini <strong>-ing / V3</strong> ile kısaltabilirsin.'),
      h('Defining ve non-defining'),
      table(['Defining (B1)', 'Non-defining (B2)'], [
        ['Hangi kişi / şey? Bilgi gerekli.', 'Ek bilgi; çıkarılsa cümle yine anlaşılır.'],
        ['Virgül yok', 'Virgüllerle ayrılır'],
        ['that kullanılabilir', '<strong>that kullanılmaz</strong>'],
        ['Zamir atılabilir: the book (that) I read', 'Zamir atılamaz'],
        ['The man who lives next door is a pilot.', 'My father, who is 60, still works.']
      ]),
      h('which ile bütün cümleye atıf'),
      p('<em>which</em> önceki cümlenin tamamını gösterebilir: <em>He didn\'t call me back, <u>which</u> was rude.</em> (Geri aramaması kabaydı.)'),
      h('Edatlı yapılar ve miktar ifadeleri'),
      examples([
        ['The hotel, which we stayed at last year, has closed.', 'Geçen yıl kaldığımız otel kapandı. (günlük dil)'],
        ['The hotel, at which we stayed last year, has closed.', 'Aynı anlam (resmî)'],
        ['I have two brothers, both of whom live abroad.', 'İki erkek kardeşim var, ikisi de yurt dışında yaşıyor.'],
        ['She bought ten books, most of which were novels.', 'On kitap aldı, çoğu romandı.']
      ]),
      h('Kısaltma: -ing ve V3'),
      table(['Uzun', 'Kısa'], [
        ['The woman who is sitting by the window is my aunt.', 'The woman <strong>sitting</strong> by the window is my aunt.'],
        ['Students who want to join should register.', 'Students <strong>wanting</strong> to join should register.'],
        ['The car which was stolen last night was found.', 'The car <strong>stolen</strong> last night was found.']
      ]),
      trNote('Türkçede sıfat cümlesi ismin önüne gelir ve virgül kullanılmaz: "<u>60 yaşındaki</u> babam hâlâ çalışıyor". İngilizcede ek bilgi ismin arkasına virgüllerle eklenir: <em>My father, <u>who is 60</u>, still works.</em> "Pencere kenarında <u>oturan</u> kadın" gibi "-an / -en" sıfat-fiilleri İngilizcedeki kısaltılmış <em>-ing</em> yapısına çok benzer: <em>the woman <u>sitting</u> by the window</em>.'),
      h('Mini diyalog'),
      dialog([
        ['Guide', 'This is the Galata Tower, which was built in 1348.'],
        ['Tourist', 'And the people working up there?'],
        ['Guide', "They work in the restaurant, most of whose customers are tourists — which isn't surprising, given the view!"]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['My sister, that lives in Berlin, is a doctor.', 'My sister, who lives in Berlin, is a doctor.', 'Virgüllü yapıda that olmaz.'],
        ['He failed the exam, what surprised everyone.', 'He failed the exam, which surprised everyone.', 'Cümleye atıf → which.'],
        ['I have two cousins, both of them live in Izmir.', 'I have two cousins, both of whom live in Izmir.', 'Edat / miktar + whom / which.'],
        ['The man stood at the door is my boss.', 'The man standing at the door is my boss.', 'Etken anlam → -ing.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Virgül = which / who', text: 'Virgül koyduysan that kullanma.' },
      { type: 'good', title: 'Kısaltma akıcılık katar', text: '"the people living here" yazıda "the people who live here"dan daha akıcıdır.' },
      { type: 'bad', title: 'what ile atıf', text: '"…, what was strange" yanlış; "…, which was strange".' }
    ],
    questions: [
      q('Non-defining', 'My grandmother, ___ is 90, still drives.', ['that', 'who', 'which', 'whom'], 1, 'Virgüllü yapı + kişi → who.'),
      q('that yasağı', 'Hangi cümle doğru?', ['Istanbul, that is a huge city, has two continents.', 'Istanbul, which is a huge city, spans two continents.', 'Istanbul which is a huge city, spans two continents.', 'Istanbul, what is a huge city, spans two continents.'], 1, 'Virgüllü yapıda which; iki virgül.'),
      q('Cümleye atıf', 'The train was late again, ___ made me miss my meeting.', ['that', 'what', 'which', 'it'], 2, 'Bütün cümleye atıf → which.'),
      q('Miktar + whom', 'I have three sisters, all of ___ are teachers.', ['them', 'who', 'whom', 'which'], 2, 'all of + whom (kişi).'),
      q('Miktar + which', 'He wrote five novels, two of ___ became films.', ['them', 'which', 'that', 'whose'], 1, 'two of + which (nesne).'),
      q('-ing kısaltma', 'The girl ___ next to Ahmet is his sister.', ['sits', 'sitting', 'sat', 'who sitting'], 1, 'who is sitting → sitting.'),
      q('V3 kısaltma', 'The paintings ___ in the fire were very valuable.', ['destroying', 'destroyed', 'which destroyed', 'were destroyed'], 1, 'which were destroyed → destroyed (edilgen).'),
      q('whose', 'Mr Aksoy, ___ son is in my class, is a lawyer.', ['who', 'whose', "who's", 'whom'], 1, 'İyelik → whose.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['The man wearing a hat is my uncle.', 'She passed the exam, which pleased her parents.', 'Ankara, that is the capital, is in central Anatolia.', 'He has two cars, neither of which works.'], 2, 'Virgüllü yapıda that olmaz → Ankara, which is the capital, …'),
      q('Anlam', '"My brother, who lives in London, is coming." Bu cümle ne ima eder?', ['Birden fazla erkek kardeşim var; Londra\'daki geliyor.', 'Bir erkek kardeşim var; o Londra\'da yaşıyor ve geliyor.', 'Erkek kardeşim Londra\'ya taşınıyor.', 'Londra\'da yaşayan herkes geliyor.'], 1, 'Virgüllü yapı ek bilgidir; kardeşi tanımlamaz.')
    ]
  },

  // 11 ───────────────────────────────────────────────────────────────────────
  {
    id: 'en-b2-11',
    title: 'Bağlaçlar: although, despite, however, whereas',
    duration: '30 dk',
    description: 'Zıtlık, amaç, sonuç ve ekleme bağlaçlarıyla daha uzun ve tutarlı cümleler, paragraflar kurmak.',
    deepDive: [
      goal('Fikirleri <strong>zıtlık, sonuç, amaç ve ekleme</strong> bağlaçlarıyla bağlayabilir; özellikle <em>although / despite / however</em> arasındaki dil bilgisi farkını bilirsin.'),
      h('Zıtlık: üç farklı yapı'),
      table(['Bağlaç', 'Arkasından ne gelir?', 'Örnek'], [
        ['although / even though / though', 'Tam cümle (özne + fiil)', 'Although it was raining, we went out.'],
        ['despite / in spite of', 'İsim ya da -ing', 'Despite the rain, we went out. / Despite being tired, …'],
        ['despite the fact that', 'Tam cümle', 'Despite the fact that it was raining, …'],
        ['However, / Nevertheless,', 'Yeni cümlenin başında, virgülle', 'It was raining. However, we went out.'],
        ['whereas / while', 'İki şeyi karşılaştırır', 'I like tea, whereas my wife prefers coffee.']
      ]),
      h('Sonuç, amaç ve ekleme'),
      table(['Görev', 'Bağlaçlar', 'Örnek'], [
        ['Sonuç', 'so, therefore, as a result, consequently', 'Prices rose. As a result, sales fell.'],
        ['Neden', 'because, as, since, due to / because of + isim', 'The flight was cancelled due to fog.'],
        ['Amaç', 'to, in order to, so that + cümle', 'I left early so that I could catch the bus.'],
        ['Ekleme', 'moreover, furthermore, in addition, as well as', 'The flat is cheap. Moreover, it\'s central.']
      ]),
      examples([
        ['Even though he is rich, he lives simply.', 'Zengin olmasına rağmen sade yaşıyor.'],
        ['In spite of feeling ill, she went to work.', 'Hasta hissetmesine rağmen işe gitti.'],
        ['Turkey is hot in summer, whereas England is mild.', 'Türkiye yazın sıcakken İngiltere ılımandır.'],
        ['I wrote it down so that I wouldn\'t forget.', 'Unutmayayım diye not aldım.']
      ]),
      trNote('Türkçede "-masına rağmen" hem cümleyle hem isimle kullanılır. İngilizcede seçim arkadan gelen yapıya bağlıdır: cümle varsa <em>although</em>, isim / -ing varsa <em>despite</em>. <em>despite of</em> diye bir yapı yoktur: <em>despite</em> ya da <em>in spite of</em>. "-dığı için / yüzünden" de aynı ayrımı yapar: <em>because</em> + cümle, <em>because of / due to</em> + isim.'),
      h('Kısa paragraf'),
      dialog([
        ['Essay', 'Working from home has many advantages. For example, it saves commuting time. Moreover, it is often more flexible.'],
        ['Essay', 'However, some people feel isolated. Although technology helps, it cannot fully replace face-to-face contact.'],
        ['Essay', 'Therefore, many companies now prefer a hybrid model.']
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['Despite it was cold, we swam.', 'Although it was cold, we swam. / Despite the cold, we swam.', 'despite + isim / -ing.'],
        ['Despite of the traffic, …', 'Despite the traffic, … / In spite of the traffic, …', 'despite of yoktur.'],
        ['Although it was late, but we continued.', 'Although it was late, we continued.', 'although ile but birlikte kullanılmaz.'],
        ['The match was cancelled because of it rained.', 'The match was cancelled because it rained.', 'Cümle → because; isim → because of.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Arkadan geleni kontrol et', text: 'Fiil varsa although / because; isim varsa despite / because of.' },
      { type: 'good', title: 'Paragraf bağlaçları', text: 'However, Moreover, Therefore cümle başında virgülle kullanılır; yazılı sınavlarda puan kazandırır.' },
      { type: 'bad', title: 'although … but', text: 'Türkçedeki "-masına rağmen … ama" alışkanlığı İngilizcede hatadır.' }
    ],
    questions: [
      q('although / despite', '___ the bad weather, the concert went ahead.', ['Although', 'Despite', 'However', 'Even though'], 1, 'Arkadan isim geliyor → despite.'),
      q('although / despite', '___ he had studied hard, he failed the exam.', ['Despite', 'In spite of', 'Although', 'However'], 2, 'Arkadan tam cümle → although.'),
      q('-ing', 'In spite of ___ tired, she finished the marathon.', ['she was', 'being', 'be', 'was'], 1, 'in spite of + -ing.'),
      q('However', 'The hotel was expensive. ___, the service was excellent.', ['Although', 'Despite', 'However', 'Because'], 2, 'Yeni cümle başında zıtlık → However.'),
      q('whereas', 'My brother loves football, ___ I prefer basketball.', ['whereas', 'despite', 'so that', 'therefore'], 0, 'İki şeyi karşılaştırma → whereas.'),
      q('so that', 'I set two alarms ___ I wouldn\'t oversleep.', ['in order', 'so that', 'because of', 'despite'], 1, 'Amaç + tam cümle → so that.'),
      q('due to', 'The flight was delayed ___ the storm.', ['because', 'due to', 'although', 'so that'], 1, 'Neden + isim → due to / because of.'),
      q('Sonuç', 'Sales fell sharply. ___, the company closed two stores.', ['Moreover', 'However', 'As a result', 'Whereas'], 2, 'Sonuç → As a result.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['Although it was late, we kept working.', 'Despite of the noise, I slept well.', 'She went to work despite feeling ill.', "It was cheap. However, it didn't work."], 1, 'despite of yok → Despite the noise / In spite of the noise.'),
      q('Çeviri', '"Zengin olmasına rağmen mutlu değil." İngilizcesi hangisi?', ["Although he is rich, but he isn't happy.", "Despite he is rich, he isn't happy.", "Even though he is rich, he isn't happy.", "However he is rich, he isn't happy."], 2, 'Tam cümle → even though; but eklenmez.')
    ]
  },

  // 12 ───────────────────────────────────────────────────────────────────────
  {
    id: 'en-b2-03',
    title: 'Phrasal verbs: anlam ve dil bilgisi',
    duration: '35 dk',
    description: 'Günlük ve iş dilinde en sık 30 phrasal verb, ayrılabilen / ayrılamayan yapılar ve üç parçalı fiiller.',
    deepDive: [
      goal('Sık kullanılan phrasal verb\'leri anlamlarıyla tanıyabilir, nesneyi doğru yere koyabilir ve resmî fiiller yerine konuşmada doğal karşılıklarını kullanabilirsin.'),
      h('Üç tür phrasal verb'),
      table(['Tür', 'Kural', 'Örnek'], [
        ['Nesnesiz', 'Nesne almaz', 'The plane took off. My car broke down.'],
        ['Ayrılabilen', 'İsim nesne ortada ya da sonda; <strong>zamir ortada olmak zorunda</strong>', 'Turn off the light. / Turn the light off. / Turn it off. (✗ turn off it)'],
        ['Ayrılamayan', 'Nesne her zaman sonda', 'I\'m looking after my sister. / I\'m looking after her.'],
        ['Üç parçalı', 'fiil + zarf + edat, ayrılmaz', 'I can\'t put up with this noise.']
      ]),
      h('Sık kullanılanlar'),
      table(['Phrasal verb', 'Anlamı', 'Örnek'], [
        ['give up', 'bırakmak, vazgeçmek', 'She gave up smoking.'],
        ['find out', 'öğrenmek, ortaya çıkarmak', 'I found out the truth.'],
        ['look forward to', 'dört gözle beklemek (+ -ing)', 'I look forward to hearing from you.'],
        ['run out of', 'tükenmek, bitmek', "We've run out of milk."],
        ['put off', 'ertelemek', "Don't put off your homework."],
        ['carry on', 'devam etmek', 'Carry on working.'],
        ['turn down', 'reddetmek; sesi kısmak', 'He turned down the offer.'],
        ['come up with', '(fikir) bulmak', 'She came up with a great idea.'],
        ['get on with', 'iyi geçinmek', 'I get on well with my boss.'],
        ['set up', 'kurmak (şirket, sistem)', 'They set up a company in 2020.'],
        ['bring up', 'büyütmek; (konu) açmak', 'She was brought up in Trabzon.'],
        ['look into', 'araştırmak, incelemek', "We'll look into the problem."],
        ['work out', 'çözmek; spor yapmak', "I can't work out this puzzle."],
        ['figure out', 'anlamak, çözmek', "I can't figure out how it works."],
        ['take over', 'devralmak', 'A big firm took over the company.']
      ]),
      h('Resmî fiil ↔ phrasal verb'),
      examples([
        ['postpone → put off', 'The meeting was put off until Monday.'],
        ['investigate → look into', 'The police are looking into it.'],
        ['tolerate → put up with', "I won't put up with this behaviour."],
        ['discover → find out', 'How did you find out?']
      ]),
      trNote('Türkçede tek bir fiil olan "ertelemek, reddetmek, bulmak" İngilizcede iki-üç kelimelik phrasal verb olabilir ve anlamı parçalardan tahmin edilemez: <em>put off</em> "kapatmak" değil "ertelemek"tir. Ayrıca <em>look forward <u>to</u></em> içindeki to edattır: <em>I look forward to <u>seeing</u> you</em> (✗ <em>to see</em>).'),
      h('Mini diyalog'),
      dialog([
        ['Manager', "We've run out of time, so let's put off the budget discussion."],
        ['Deniz', 'Fine. Can someone look into the delivery problem?'],
        ['Manager', "Tom will. He came up with a solution last time."],
        ['Deniz', "Great. I'll carry on with the report, then."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['Turn off it.', 'Turn it off.', 'Zamir ortaya gelir.'],
        ['I look forward to see you.', 'I look forward to seeing you.', 'to burada edat → -ing.'],
        ['I look my sister after.', 'I look after my sister.', 'look after ayrılmaz.'],
        ["We've run out milk.", "We've run out of milk.", 'Üç parçalı fiil: run out of.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Örnek cümleyle öğren', text: 'Phrasal verb\'leri tek başına değil, kendi cümlende kullanarak ezberle.' },
      { type: 'good', title: 'Konuşmada phrasal, yazıda resmî', text: 'Konuşmada "put off", resmî e-postada "postpone" daha uygundur.' },
      { type: 'bad', title: 'Zamiri sona koymak', text: '"pick up it" yanlış; "pick it up".' }
    ],
    questions: [
      q('Anlam', 'The meeting has been ___ until next week.', ['put off', 'put on', 'put up', 'put down'], 0, 'Ertelemek → put off.'),
      q('Zamir', 'The music is too loud. Can you ___?', ['turn down it', 'turn it down', 'turn down', 'it turn down'], 1, 'Ayrılabilen fiilde zamir ortada.'),
      q('look forward to', 'I look forward to ___ from you.', ['hear', 'hearing', 'heard', 'be hearing'], 1, 'look forward to + -ing.'),
      q('run out of', "We've ___ petrol. We need to stop.", ['run out', 'run out of', 'run off', 'run over'], 1, 'Tükenmek → run out of + isim.'),
      q('Anlam', 'She ___ a brilliant idea for the campaign.', ['came up with', 'came across', 'came down with', 'came over'], 0, '(Fikir) bulmak → come up with.'),
      q('Anlam', 'He was offered the job but he ___ it ___.', ['turned / down', 'turned / off', 'put / up', 'took / over'], 0, 'Reddetmek → turn down.'),
      q('Ayrılamayan', 'Hangi cümle doğru?', ['Who looks the children after?', 'Who looks after the children?', 'Who looks after them children?', 'Who looks them after?'], 1, 'look after ayrılmaz; nesne sonda.'),
      q('Resmî ↔ günlük', '"The police are investigating the case." Günlük karşılığı hangisi?', ['looking after', 'looking into', 'looking up', 'looking forward to'], 1, 'investigate = look into.'),
      q('Üç parçalı', "I can't ___ his rude behaviour any longer.", ['put up', 'put up with', 'put with up', 'put off'], 1, 'Katlanmak → put up with.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['She gave up chocolate for Lent.', 'Please pick up it.', 'I found out the answer.', 'We set up a new team.'], 1, 'Zamir ortada olmalı → pick it up.')
    ]
  }
];
