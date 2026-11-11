/**
 * English A2 curriculum: 12 lessons aligned with CEFR A2.
 * Imported into the database with: npm run content:en-a2
 *
 * The four original A2 ids keep their topics (en-a2-01 Past Simple, -02 countable /
 * uncountable, -03 comparison, -04 future) so learners' progress survives; new lessons
 * use en-a2-05..12. Screen order comes from the array order.
 */

import { goal, h, p, table, examples, trNote, dialog, mistakes, q } from './lessonHtml.js';

export const STAGE_ID = 'en-a2';

export const LESSONS = [
  // 1 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-a2-01',
    title: 'Past Simple: Düzenli ve Düzensiz Fiiller',
    duration: '30 dk',
    description: 'Geçmişte bitmiş olayları anlatma, -ed yazımı ve telaffuzu, en sık düzensiz fiiller.',
    deepDive: [
      goal('Dün, geçen hafta ya da yıllar önce ne yaptığını anlatabilir, düzenli fiillerin -ed halini doğru yazıp okuyabilir ve en sık 20 düzensiz fiili kullanabilirsin.'),
      h('Ne zaman kullanılır?'),
      p('Geçmişte başlayıp <strong>bitmiş</strong> olaylar için kullanılır. Genellikle bir zaman ifadesi vardır ya da zaman bağlamdan bellidir: <em>yesterday, last week, in 2015, two days ago, when I was a child</em>.'),
      examples([
        ['I visited my grandparents last weekend.', 'Geçen hafta sonu büyükanne ve büyükbabamı ziyaret ettim.'],
        ['She started her new job in May.', "Yeni işine Mayıs'ta başladı."],
        ['We went to the cinema yesterday.', 'Dün sinemaya gittik.'],
        ['He bought a new phone two days ago.', 'İki gün önce yeni bir telefon aldı.']
      ]),
      h('Düzenli fiiller: -ed'),
      table(['Kural', 'Örnek'], [
        ['Çoğu fiil: + ed', 'work → worked, play → played'],
        ['-e ile biten: + d', 'live → lived, like → liked'],
        ['Ünsüz + y: y → ied', 'study → studied, try → tried (ama play → played)'],
        ['Kısa fiil, ünsüz-ünlü-ünsüz: son harf ikilenir', 'stop → stopped, plan → planned']
      ]),
      h('-ed nasıl okunur?'),
      table(['Ses', 'Ne zaman?', 'Örnek'], [
        ['/t/', 'p, k, s, sh, ch, f seslerinden sonra', 'worked, stopped, watched'],
        ['/d/', 'Ünlülerden ve diğer ünsüzlerden sonra', 'played, lived, called'],
        ['/ɪd/ (ekstra hece)', 't ve d seslerinden sonra', 'wanted, needed, visited']
      ]),
      p('Türk öğrencilerin en sık hatası her -ed\'i ayrı hece olarak okumaktır: <em>worked</em> "vörk-ed" değil "vörkt" diye okunur.'),
      h('En sık düzensiz fiiller'),
      table(['Fiil', 'Geçmiş', 'Fiil', 'Geçmiş'], [
        ['be', 'was / were', 'go', 'went'],
        ['have', 'had', 'do', 'did'],
        ['make', 'made', 'get', 'got'],
        ['see', 'saw', 'come', 'came'],
        ['take', 'took', 'buy', 'bought'],
        ['eat', 'ate', 'drink', 'drank'],
        ['write', 'wrote', 'say', 'said'],
        ['find', 'found', 'give', 'gave'],
        ['know', 'knew', 'think', 'thought'],
        ['leave', 'left', 'meet', 'met']
      ]),
      p('Bu fiillerin geçmiş halleri kuralsızdır ve ezberlenmesi gerekir. Günde 5 fiil ezberleyip cümle içinde kullanmak en etkili yöntemdir.'),
      trNote('Türkçede geçmiş zaman ekini kişiye göre değiştiririz: "git<u>tim</u>, git<u>tin</u>, git<u>ti</u>". İngilizcede Past Simple <strong>her kişi için aynıdır</strong>: <em>I went, you went, she went, they went</em>. Present Simple\'daki -s burada yoktur.'),
      h('Mini diyalog'),
      dialog([
        ['Ela', 'What did you do at the weekend?'],
        ['Mark', 'On Saturday I played football with my friends, and then we had pizza.'],
        ['Ela', 'Nice! And on Sunday?'],
        ['Mark', 'I stayed at home. I watched a film and studied for my exam. What about you?'],
        ['Ela', 'I went to Bursa. I met my cousins and we ate İskender kebab!']
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['I goed to school.', 'I went to school.', 'go düzensizdir: went.'],
        ['He stoped the car.', 'He stopped the car.', 'Ünsüz-ünlü-ünsüz → son harf ikilenir.'],
        ['She studyed English.', 'She studied English.', 'Ünsüz + y → ied.'],
        ['Yesterday I watch TV.', 'Yesterday I watched TV.', 'Geçmiş zaman ifadesi varsa fiil geçmiş olur.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Herkes için tek şekil', text: 'I / you / he / they worked. Kişiye göre değişen bir ek yoktur.' },
      { type: 'good', title: '-ed telaffuzu', text: 'Sadece t ve d ile biten fiillerde -ed ekstra hece olur: wanted, needed. Diğerlerinde olmaz: worked, played.' },
      { type: 'bad', title: 'Düzensiz fiile -ed ekleme', text: '"goed, buyed, eated" yanlış; went, bought, ate.' }
    ],
    questions: [
      q('Düzensiz', 'We ___ to Antalya last summer.', ['go', 'goed', 'went', 'gone'], 2, '"go" düzensizdir: went.'),
      q('Yazım', '"stop" fiilinin geçmiş hali nedir?', ['stoped', 'stopped', 'stopt', 'stopied'], 1, 'Kısa fiil, ünsüz-ünlü-ünsüz → son harf ikilenir: stopped.'),
      q('Yazım', '"study" fiilinin geçmiş hali nedir?', ['studyed', 'studed', 'studied', 'studdied'], 2, 'Ünsüz + y → ied.'),
      q('Düzensiz', 'She ___ a beautiful dress for the wedding.', ['buyed', 'bought', 'brought', 'buys'], 1, '"buy" → bought. (brought, "bring" fiilinin geçmişidir.)'),
      q('Telaffuz', 'Hangi fiilde -ed ayrı bir hece (/ɪd/) olarak okunur?', ['worked', 'played', 'wanted', 'watched'], 2, 't ve d ile biten fiillerde: want → wan-ted.'),
      q('Kullanım', 'Hangi cümle doğru?', ['Yesterday I clean my room.', 'Yesterday I cleaned my room.', 'Yesterday I am cleaning my room.', 'Yesterday I cleans my room.'], 1, '"yesterday" → Past Simple.'),
      q('Düzensiz', 'I ___ my old teacher at the supermarket yesterday.', ['meet', 'meeted', 'met', 'mat'], 2, '"meet" → met.'),
      q('Kişi', 'He ___ me a long message last night.', ['writed', 'wrote', 'writes', 'written'], 1, '"write" → wrote. Past Simple her kişide aynıdır, -s almaz.'),
      q('Çeviri', '"İki yıl önce Londra\'da yaşadım." İngilizcesi hangisi?', ['I lived in London two years ago.', 'I live in London two years ago.', 'I lived in London before two years.', 'I have lived in London two years ago.'], 0, '"... önce" = ago, sondan gelir: two years ago.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['They had a great time.', 'She took a taxi.', 'We eated at a nice restaurant.', 'I thought about you.'], 2, '"eat" düzensizdir: ate.')
    ]
  },

  // 2 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-a2-05',
    title: 'Past Simple: Olumsuz, Soru ve used to',
    duration: '30 dk',
    description: "didn't ve did ile olumsuz ve soru, ago, geçmiş alışkanlıklar için used to.",
    deepDive: [
      goal('Geçmişte yapmadığın şeyleri söyleyebilir, birine geçmişini sorabilir ve eskiden yapıp artık yapmadığın alışkanlıkları <strong>used to</strong> ile anlatabilirsin.'),
      h('Olumsuz ve soru: did'),
      table(['', 'Yapı', 'Örnek'], [
        ['Olumsuz', "özne + didn't + yalın fiil", "I didn't go. She didn't see it."],
        ['Soru', 'Did + özne + yalın fiil?', 'Did you go? Did she see it?'],
        ['Kısa cevap', "Yes, I did. / No, I didn't.", "Did they call? — No, they didn't."],
        ['Wh- soru', 'Soru kelimesi + did + özne + yalın fiil?', 'Where did you go? What did she say?']
      ]),
      p('<strong>did</strong> geçmişi zaten gösterdiği için ana fiil <strong>yalın</strong> kalır: <em>I didn\'t <u>go</u></em> (✗ didn\'t went), <em>Did you <u>see</u>…?</em> (✗ Did you saw…?).'),
      p('Dikkat: "be" fiilinde did kullanılmaz: <em>I wasn\'t at home. Were you tired?</em> (A1 dersindeki was / were).'),
      h('ago: "önce"'),
      p('<strong>ago</strong> zaman ifadesinden <strong>sonra</strong> gelir: <em>three days ago, a week ago, a long time ago</em>. Soru: <em>How long ago did you move here?</em>'),
      h('used to: eskiden … -ırdım'),
      p('Geçmişte düzenli olarak yapılan ama artık yapılmayan alışkanlıklar ya da artık geçerli olmayan durumlar için kullanılır.'),
      table(['', 'Yapı', 'Örnek'], [
        ['Olumlu', 'used to + yalın fiil', 'I used to play basketball.'],
        ['Olumsuz', "didn't use to + yalın fiil", "She didn't use to like coffee."],
        ['Soru', 'Did + özne + use to…?', 'Did you use to live here?']
      ]),
      examples([
        ['I used to walk to school.', 'Eskiden okula yürüyerek giderdim.'],
        ['There used to be a cinema here.', 'Eskiden burada bir sinema vardı.'],
        ['He used to have long hair.', 'Eskiden uzun saçları vardı.']
      ]),
      p('Olumsuz ve soru cümlelerinde <em>use to</em> yazılır, çünkü did zaten geçmişi gösterir.'),
      trNote('Türkçede olumsuzluk ve soru fiile eklenir: "git<u>me</u>dim", "gittin <u>mi</u>?". İngilizcede ayrı bir yardımcı fiil gelir: <em>I <u>didn\'t</u> go</em>, <em><u>Did</u> you go?</em> Türkçedeki "eskiden giderdim" kalıbının karşılığı <strong>used to</strong>\'dur: <em>I used to go</em>.'),
      h('Mini diyalog'),
      dialog([
        ['Can', 'Did you grow up in Istanbul?'],
        ['Mia', "No, I didn't. I grew up in a small town near the sea."],
        ['Can', 'What did you use to do in the summer?'],
        ['Mia', 'I used to swim every day. We didn\'t have a TV, so we played outside a lot.'],
        ['Can', 'When did you move here?'],
        ['Mia', 'About ten years ago.']
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ["I didn't went.", "I didn't go.", "didn't + yalın fiil."],
        ['Did you saw the film?', 'Did you see the film?', 'did + yalın fiil.'],
        ['When you arrived?', 'When did you arrive?', 'Wh- sorusunda did gerekir.'],
        ['I use to play tennis. (eskiden)', 'I used to play tennis.', 'Olumlu cümlede "used to".']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'did varsa fiil yalın', text: "Geçmişi bir kere göster: did / didn't + go, see, buy." },
      { type: 'good', title: 'ago sona gelir', text: 'two years ago, a month ago. "before two years" denmez.' },
      { type: 'bad', title: 'be ile did kullanma', text: '"Did you be tired?" yanlış; "Were you tired?" doğru.' }
    ],
    questions: [
      q('Olumsuz', "We ___ the museum because it was closed.", ["didn't visit", "didn't visited", "don't visited", "not visited"], 0, "didn't + yalın fiil."),
      q('Soru', '___ you enjoy the concert last night?', ['Do', 'Did', 'Were', 'Was'], 1, 'Geçmişte, be dışındaki fiillerde soru: Did.'),
      q('Soru', 'Hangi soru doğru?', ['Where did you went?', 'Where you went?', 'Where did you go?', 'Where went you?'], 2, 'Soru kelimesi + did + özne + yalın fiil.'),
      q('Kısa cevap', '"Did she call you?" — "No, she ___."', ["doesn't", "didn't", "wasn't", "didn't call"], 1, 'Kısa cevap: No, she didn\'t.'),
      q('be / did', 'Hangisi doğru?', ['Did you be at home?', 'Were you at home?', 'Did you were at home?', 'Was you at home?'], 1, '"be" fiilinde did kullanılmaz: Were you…?'),
      q('ago', '"Üç ay önce taşındık." İngilizcesi hangisi?', ['We moved before three months.', 'We moved three months ago.', 'We moved ago three months.', 'We have moved three months ago.'], 1, 'ago sondan gelir: three months ago.'),
      q('used to', 'When I was a child, I ___ afraid of the dark.', ['use to be', 'used to be', 'used to being', 'was used to be'], 1, 'Geçmişteki durum: used to + yalın fiil.'),
      q('used to', 'Hangisi doğru?', ["I didn't used to like vegetables.", "I didn't use to like vegetables.", "I not used to like vegetables.", "I usedn't like vegetables."], 1, "Olumsuzda: didn't use to."),
      q('Anlam', '"There used to be a park here." ne demek?', ['Burada bir park var.', 'Eskiden burada bir park vardı (artık yok).', 'Burada bir park olacak.', 'Burada bir parka alışkınım.'], 1, 'used to = eskiden vardı, artık yok.'),
      q('Wh- soru', '___ did you buy? — A new jacket.', ['Where', 'When', 'What', 'Who'], 2, 'Satın alınan şey soruluyor → What.')
    ]
  },

  // 3 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-a2-06',
    title: 'Past Continuous: when ve while',
    duration: '25 dk',
    description: 'Geçmişte devam eden olaylar, arka plan anlatımı, when / while ile kesilen eylemler.',
    deepDive: [
      goal('Geçmişte belli bir anda ne yaptığını söyleyebilir ve bir hikâyede "bir şey olurken başka bir şey oldu" yapısını kurabilirsin.'),
      h('Yapı: was / were + fiil-ing'),
      table(['Özne', 'Olumlu', 'Olumsuz', 'Soru'], [
        ['I / he / she / it', 'I was working.', "I wasn't working.", 'Was she working?'],
        ['you / we / they', 'They were working.', "They weren't working.", 'Were you working?']
      ]),
      h('Ne zaman kullanılır?'),
      examples([
        ['At 8 o\'clock last night I was having dinner.', 'Dün akşam saat 8\'de akşam yemeği yiyordum. (o anda devam ediyor)'],
        ['It was raining and people were running.', 'Yağmur yağıyordu ve insanlar koşuyordu. (hikâyede arka plan)'],
        ['I was cooking when the phone rang.', 'Telefon çaldığında yemek pişiriyordum. (uzun eylem kesildi)'],
        ['While I was walking home, I saw an accident.', 'Eve yürürken bir kaza gördüm.']
      ]),
      h('when ve while'),
      table(['Bağlaç', 'Genellikle', 'Örnek'], [
        ['when', 'Kısa, ani eylemden önce (Past Simple)', 'I was sleeping <strong>when</strong> the alarm went off.'],
        ['while', 'Uzun, devam eden eylemden önce (Past Continuous)', '<strong>While</strong> I was sleeping, the alarm went off.']
      ]),
      p('Kural kısaca: <strong>uzun arka plan eylemi</strong> Past Continuous, onu <strong>kesen kısa eylem</strong> Past Simple. İki eylem aynı anda sürüyorsa ikisi de Past Continuous olabilir: <em>While I was cooking, my brother was watching TV.</em>'),
      p('Bağlaçlı kısım başta gelirse virgül konur: <em>When the phone rang, I was cooking.</em>'),
      trNote('Türkçede "yemek pişir<u>iyordum</u>" yapısı Past Continuous\'a çok benzer. Fark şudur: Türkçede "telefon çaldı<u>ğında</u>" ya da "yürür<u>ken</u>" gibi ekler kullanılır, İngilizcede bunların yerini ayrı kelimeler alır: <strong>when</strong> ve <strong>while</strong>.'),
      h('Mini diyalog'),
      dialog([
        ['Police officer', 'What were you doing at 10 p.m. yesterday?'],
        ['Burak', 'I was watching a football match at home.'],
        ['Police officer', 'Was anyone with you?'],
        ['Burak', 'Yes, my brother was there. We were eating pizza when we heard a loud noise outside.'],
        ['Police officer', 'What did you do?'],
        ['Burak', 'We looked out of the window. A car was driving away very fast.']
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['I was cook when she called.', 'I was cooking when she called.', 'was / were + -ing.'],
        ['When I was walking, I was seeing a friend.', 'When I was walking, I saw a friend.', 'Kısa, ani eylem Past Simple.'],
        ['While the phone rang, I was sleeping.', 'When the phone rang, I was sleeping.', 'Kısa eylemle "when".'],
        ['They was playing.', 'They were playing.', 'they → were.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Uzun ve kısa eylem', text: 'Uzun arka plan → Past Continuous; araya giren kısa olay → Past Simple.' },
      { type: 'good', title: 'Hikâye anlatırken', text: 'Sahneyi Past Continuous ile kur (It was raining…), olayları Past Simple ile ilerlet (Suddenly a man shouted).' },
      { type: 'bad', title: 'Durum fiilleriyle -ing', text: 'know, want, like gibi fiiller burada da -ing almaz: "I was knowing" değil "I knew".' }
    ],
    questions: [
      q('Yapı', 'At 7 a.m. yesterday I ___ breakfast.', ['had', 'was having', 'were having', 'am having'], 1, 'Belirli bir anda devam eden eylem: was having.'),
      q('Yapı', 'The children ___ in the garden when it started to rain.', ['was playing', 'were playing', 'played', 'are playing'], 1, 'children = they → were playing.'),
      q('Simple / Continuous', 'I ___ a shower when the doorbell ___.', ['had / was ringing', 'was having / rang', 'was having / was ringing', 'have / rang'], 1, 'Uzun eylem Past Continuous, kesen kısa eylem Past Simple.'),
      q('when / while', '___ I was driving, I listened to a podcast.', ['When', 'While', 'During', 'Then'], 1, 'Uzun, devam eden eylemden önce "while" doğaldır.'),
      q('when / while', 'She was reading ___ the lights went out.', ['while', 'during', 'when', 'as long'], 2, 'Kısa, ani eylemden önce "when".'),
      q('Olumsuz', "I ___ attention, so I didn't hear the question.", ["wasn't paying", "weren't paying", "didn't paying", "wasn't pay"], 0, "I → wasn't + -ing."),
      q('Soru', 'What ___ you doing at midnight?', ['was', 'were', 'did', 'are'], 1, 'you → were.'),
      q('Durum fiili', 'Hangisi doğru?', ['I was knowing the answer.', 'I knew the answer.', 'I were knowing the answer.', 'I was know the answer.'], 1, '"know" durum fiilidir, -ing almaz.'),
      q('Çeviri', '"Eve yürürken eski bir arkadaşımı gördüm." İngilizcesi hangisi?', ['While I walked home, I was seeing an old friend.', 'While I was walking home, I saw an old friend.', 'When I was walk home, I saw an old friend.', 'While I was walking home, I was see an old friend.'], 1, 'Uzun eylem: was walking; kısa eylem: saw.'),
      q('Hikâye', 'When we arrived at the park, the sun ___ and the children ___.', ['shone / played', 'was shining / were playing', 'is shining / are playing', 'was shining / was playing'], 1, 'Biz vardığımızda zaten devam eden arka plan → was shining / were playing (children = they).')
    ]
  },

  // 4 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-a2-02',
    title: 'Sayılabilir ve Sayılamaz İsimler: Miktar',
    duration: '25 dk',
    description: 'some / any, much / many / a lot of, a few / a little, how much / how many ve ölçü ifadeleri.',
    deepDive: [
      goal('Alışveriş listesi yapabilir, bir şeyden ne kadar olduğunu sorup söyleyebilir ve sayılamayan isimleri ölçü ifadeleriyle kullanabilirsin.'),
      h('Sayılabilir mi, sayılamaz mı?'),
      table(['Sayılabilir (tekil / çoğul)', 'Sayılamaz (hep tekil)'], [
        ['an apple → three apples', 'water, milk, rice, bread, sugar'],
        ['a chair → chairs', 'money, time, music, weather'],
        ['a suggestion → suggestions', 'information, advice, news, homework, furniture']
      ]),
      p('Sayılamayan isimler <strong>a / an</strong> almaz, çoğul olmaz ve tekil fiil alır: <em>The news <u>is</u> good.</em> <em>Your advice <u>was</u> very useful.</em>'),
      h('Miktar sözcükleri'),
      table(['', 'Sayılabilir (çoğul)', 'Sayılamaz'], [
        ['Olumlu, belirsiz miktar', 'some eggs', 'some milk'],
        ['Olumsuz ve soru', 'any eggs', 'any milk'],
        ['Çok (genelde olumsuz / soru)', 'many eggs', 'much milk'],
        ['Çok (her yerde)', 'a lot of eggs', 'a lot of milk'],
        ['Biraz / birkaç', 'a few eggs', 'a little milk'],
        ['Soru', 'How many eggs?', 'How much milk?']
      ]),
      p('Olumlu cümlelerde <em>much</em> ve <em>many</em> yerine günlük dilde <strong>a lot of</strong> daha doğaldır: <em>I drink a lot of water.</em> (I drink much water kulağa resmi gelir.)'),
      p('Teklif ve ricada soru olsa da <strong>some</strong> kullanılır: <em>Would you like some tea? Can I have some water?</em>'),
      h('Ölçü ve kap ifadeleri'),
      examples([
        ['a cup of tea / a glass of water', 'bir fincan çay / bir bardak su'],
        ['a bottle of milk / a can of cola', 'bir şişe süt / bir kutu kola'],
        ['a slice of bread / a piece of cake', 'bir dilim ekmek / bir parça pasta'],
        ['a kilo of rice / a packet of sugar', 'bir kilo pirinç / bir paket şeker'],
        ['a piece of advice / a piece of information', 'bir tavsiye / bir bilgi']
      ]),
      trNote('Türkçede "bilgi<u>ler</u>", "tavsiye<u>ler</u>", "haber<u>ler</u>", "mobilya<u>lar</u>" diye çoğul yapabiliriz. İngilizcede <em>information, advice, news, furniture</em> sayılamaz: ✗ <em>informations, advices</em>. Tek bir tanesi için <em>a piece of advice</em> denir.'),
      h('Mini diyalog'),
      dialog([
        ['Merve', 'We need to go shopping. How much milk do we have?'],
        ['Jack', "There isn't any milk, and there are only a few eggs."],
        ['Merve', 'OK. How many people are coming to dinner?'],
        ['Jack', 'Six. Let\'s buy a lot of vegetables and some bread.'],
        ['Merve', 'And a little cheese for the salad. Can you give me some advice about the dessert?']
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['She gave me many advices.', 'She gave me a lot of advice.', 'advice sayılamaz.'],
        ['How many money do you have?', 'How much money do you have?', 'money sayılamaz → how much.'],
        ['I have a few time.', 'I have a little time.', 'Sayılamazla "a little".'],
        ['The news are bad.', 'The news is bad.', 'news tekil fiil alır.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'a lot of her zaman güvenli', text: 'Emin değilsen olumlu cümlede "a lot of" kullan; hem sayılabilir hem sayılamaz isimle çalışır.' },
      { type: 'good', title: 'Teklifte some', text: 'Would you like some coffee? Soruda olsa da teklif ve ricada "some".' },
      { type: 'bad', title: 'Türkçe çoğul tuzağı', text: 'informations, advices, furnitures, homeworks yanlıştır.' }
    ],
    questions: [
      q('much / many', 'How ___ sugar do you want in your tea?', ['many', 'much', 'few', 'lot'], 1, 'sugar sayılamaz → How much.'),
      q('much / many', 'There aren\'t ___ people here today.', ['much', 'many', 'a little', 'a lot'], 1, 'people sayılabilir çoğul → many.'),
      q('some / any', 'Is there ___ milk in the fridge?', ['some', 'any', 'many', 'a few'], 1, 'Soru cümlesi (teklif değil) → any.'),
      q('some / any', 'Would you like ___ cake?', ['any', 'some', 'many', 'a few'], 1, 'Teklifte soru olsa da "some".'),
      q('a few / a little', 'I only have ___ minutes. Can we talk later?', ['a little', 'a few', 'much', 'any'], 1, 'minutes sayılabilir → a few.'),
      q('a few / a little', 'Add ___ salt to the soup.', ['a few', 'many', 'a little', 'few of'], 2, 'salt sayılamaz → a little.'),
      q('Sayılamaz', 'Hangisi doğru?', ['She gave me some good advices.', 'She gave me a good advice.', 'She gave me some good advice.', 'She gave me an advice.'], 2, 'advice sayılamaz: some advice / a piece of advice.'),
      q('Tekil fiil', 'The information on this website ___ very useful.', ['are', 'is', 'were', 'be'], 1, 'information sayılamaz → tekil fiil: is.'),
      q('Ölçü', '"Bir dilim ekmek" İngilizcesi hangisi?', ['a bread', 'a slice of bread', 'one breads', 'a bottle of bread'], 1, 'bread sayılamaz: a slice of bread.'),
      q('a lot of', 'En doğal cümle hangisi?', ['I drink much coffee.', 'I drink a lot of coffee.', 'I drink many coffee.', 'I drink a few coffee.'], 1, 'Olumlu cümlede "a lot of" en doğal seçimdir.')
    ]
  },

  // 5 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-a2-07',
    title: 'Nesne ve İyelik Zamirleri: me, him / mine, yours',
    duration: '20 dk',
    description: 'Nesne zamirleri, iyelik zamirleri ve Whose…? soruları.',
    deepDive: [
      goal('İsmi tekrar etmeden kişilerden ve şeylerden söz edebilir, bir şeyin kime ait olduğunu sorup "It\'s mine" gibi kısa cevaplar verebilirsin.'),
      h('Üç zamir ailesi'),
      table(['Özne', 'Nesne', 'İyelik sıfatı', 'İyelik zamiri'], [
        ['I', 'me', 'my book', 'mine'],
        ['you', 'you', 'your book', 'yours'],
        ['he', 'him', 'his book', 'his'],
        ['she', 'her', 'her book', 'hers'],
        ['it', 'it', 'its color', '—'],
        ['we', 'us', 'our book', 'ours'],
        ['they', 'them', 'their book', 'theirs']
      ]),
      h('Nesne zamirleri'),
      p('Fiilden ya da edattan <strong>sonra</strong> gelir: <em>Call <u>me</u>. I love <u>her</u>. Come with <u>us</u>. This gift is for <u>them</u>.</em>'),
      examples([
        ['I know Ahmet. I see him every day.', "Ahmet'i tanıyorum. Onu her gün görüyorum."],
        ['Where are my keys? I can\'t find them.', 'Anahtarlarım nerede? Onları bulamıyorum.'],
        ['Can you help us?', 'Bize yardım edebilir misin?']
      ]),
      h('İyelik zamirleri'),
      p('İsmin <strong>yerine</strong> geçer, yani arkasından isim gelmez: <em>This is my bag → This bag is <u>mine</u>.</em> Sahiplik sorusu: <em>Whose is this? / Whose coat is this?</em>'),
      examples([
        ["Is this pen yours? — Yes, it's mine.", 'Bu kalem senin mi? — Evet, benim.'],
        ['Their house is bigger than ours.', 'Onların evi bizimkinden daha büyük.'],
        ["That's not my phone. Mine is black.", 'O benim telefonum değil. Benimki siyah.']
      ]),
      trNote('Türkçede "onu" ve "onun" cinsiyet göstermez. İngilizcede erkek için <strong>him / his</strong>, kadın için <strong>her / hers</strong> seçmen gerekir. Türkçedeki "benim<u>ki</u>, senin<u>ki</u>" ekinin karşılığı iyelik zamirleridir: <em>mine, yours</em>.'),
      h('Mini diyalog'),
      dialog([
        ['Teacher', 'Whose bag is this on the floor?'],
        ['Oğuz', "It isn't mine. Mine is here. Maybe it's Lucy's."],
        ['Lucy', "Yes, it's mine! Thank you. Can you give it to me?"],
        ['Teacher', 'Here you are. And these books, are they yours?'],
        ['Lucy', "No, they're theirs. Tom and Kerem left them here."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['Call to me.', 'Call me.', '"call" doğrudan nesne alır.'],
        ["It's her's.", "It's hers.", 'İyelik zamirlerinde kesme işareti olmaz.'],
        ["This is mine book.", 'This is my book. / This book is mine.', 'mine isimden önce gelmez.'],
        ['I love she.', 'I love her.', 'Fiilden sonra nesne zamiri.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Fiil ve edattan sonra nesne', text: 'with me, for them, to him; love her, help us.' },
      { type: 'good', title: 'İsim yoksa mine, isim varsa my', text: 'my car / the car is mine.' },
      { type: 'bad', title: 'Kesme işareti', text: "your's, her's, our's yanlış; yours, hers, ours doğru." }
    ],
    questions: [
      q('Nesne', 'I don\'t understand this word. Can you explain it to ___?', ['I', 'my', 'me', 'mine'], 2, 'Edattan sonra nesne zamiri: to me.'),
      q('Nesne', 'Where is Ayşe? I need to talk to ___.', ['she', 'her', 'hers', 'his'], 1, 'Ayşe kadın, nesne → her.'),
      q('Nesne', 'These shoes are nice. I\'ll buy ___.', ['it', 'they', 'them', 'their'], 2, 'shoes çoğul nesne → them.'),
      q('İyelik zamiri', 'This isn\'t your umbrella. It\'s ___.', ['my', 'me', 'mine', 'I'], 2, 'İsim yok → mine.'),
      q('İyelik zamiri', 'Is this car ___?', ['your', 'yours', "your's", 'you'], 1, 'İsim yok, kesme işareti yok → yours.'),
      q('İyelik zamiri', 'Our garden is small, but ___ is huge. (onlarınki)', ['their', 'theirs', 'them', "their's"], 1, 'İsim yerine → theirs.'),
      q('Whose', '___ jacket is this? — It\'s Emre\'s.', ['Who', "Who's", 'Whose', 'Which'], 2, 'Sahiplik sorusu: Whose. ("Who\'s" = who is)'),
      q('Seçim', 'Hangisi doğru?', ['This is mine phone.', 'This phone is my.', 'This phone is mine.', 'This is phone mine.'], 2, 'İyelik zamiri ismin yerine geçer: the phone is mine.'),
      q('Cinsiyet', 'Kerem is my friend. I play football with ___ every week.', ['her', 'his', 'him', 'he'], 2, 'Kerem erkek, nesne → him.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['Give it to us.', 'The blue one is hers.', 'Can you call me later?', 'Is this book your\'s?'], 3, "İyelik zamirinde kesme işareti olmaz: yours.")
    ]
  },

  // 6 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-a2-03',
    title: 'Karşılaştırma ve En Üstünlük',
    duration: '25 dk',
    description: '-er / more, -est / most, düzensiz sıfatlar ve as … as.',
    deepDive: [
      goal('İki şeyi karşılaştırabilir, bir grubun "en"ini söyleyebilir ve iki şeyin eşit olup olmadığını <strong>as … as</strong> ile anlatabilirsin.'),
      h('Kurallar'),
      table(['Sıfat', 'Karşılaştırma', 'En üstünlük'], [
        ['Tek heceli: + er / + est', 'small → smaller than', 'the smallest'],
        ['-e ile biten: + r / + st', 'nice → nicer', 'the nicest'],
        ['Ünsüz-ünlü-ünsüz: ikilenir', 'big → bigger, hot → hotter', 'the biggest, the hottest'],
        ['Ünsüz + y: y → ier / iest', 'happy → happier, easy → easier', 'the happiest, the easiest'],
        ['2+ heceli: more / most', 'expensive → more expensive', 'the most expensive'],
        ['Düzensiz', 'good → better, bad → worse, far → further', 'the best, the worst, the furthest']
      ]),
      examples([
        ['My brother is taller than me.', 'Erkek kardeşim benden uzun.'],
        ['This phone is more expensive than that one.', 'Bu telefon şundan daha pahalı.'],
        ['It\'s the best restaurant in the city.', 'Şehirdeki en iyi restoran.'],
        ['Today is the hottest day of the year.', 'Bugün yılın en sıcak günü.']
      ]),
      p('En üstünlükte genellikle <strong>the</strong> kullanılır ve ardından <em>in</em> (yer / grup) ya da <em>of</em> (zaman / sayı) gelir: <em>the tallest <u>in</u> the class, the best day <u>of</u> my life</em>.'),
      h('as … as: eşitlik'),
      examples([
        ['Ali is as tall as his father.', "Ali babası kadar uzun."],
        ["This film isn't as good as the book.", 'Bu film kitap kadar iyi değil.'],
        ['Come as soon as possible.', 'Mümkün olduğunca çabuk gel.']
      ]),
      p('<em>not as … as</em> genellikle <em>-er than</em>\'dan daha kibar duyulur: <em>He isn\'t as clever as his sister</em> ↔ <em>His sister is cleverer than him</em>.'),
      trNote('Türkçede karşılaştırma "-den daha" ile yapılır ve sıfat değişmez: "Ben<u>den</u> <u>daha</u> uzun". İngilizcede sıfatın kendisi değişir (taller) ve <strong>than</strong> kullanılır. "daha" kelimesini <em>more</em> ile çevirip -er eklemek en sık hatadır: ✗ <em>more taller</em>.'),
      h('Mini diyalog'),
      dialog([
        ['Seda', 'Which hotel should we choose?'],
        ['Paul', 'The Grand is bigger and more comfortable, but it\'s the most expensive one.'],
        ['Seda', 'And the Sea View?'],
        ['Paul', "It's cheaper, and it's closer to the beach. The rooms aren't as big as the Grand's."],
        ['Seda', 'I think the Sea View is the best choice for us.']
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['She is more taller than me.', 'She is taller than me.', 'Ya -er ya more; ikisi birden olmaz.'],
        ['the most big', 'the biggest', 'Tek heceli sıfat -est alır.'],
        ['as tall than', 'as tall as', 'Eşitlikte iki "as".'],
        ['more good / gooder', 'better', 'good düzensizdir.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Hece sayısına bak', text: 'Tek hece → -er / -est; iki ve daha fazla hece → more / most (-y ile bitenler hariç: easier).' },
      { type: 'good', title: 'than me', text: 'Günlük dilde "taller than me" doğaldır; "taller than I am" daha resmidir.' },
      { type: 'bad', title: 'Çift karşılaştırma', text: '"more bigger", "most best" yanlıştır.' }
    ],
    questions: [
      q('Karşılaştırma', 'An elephant is ___ than a horse.', ['big', 'bigger', 'more big', 'biggest'], 1, 'Tek heceli, ünsüz-ünlü-ünsüz → bigger.'),
      q('Karşılaştırma', 'This book is ___ than the last one.', ['interestinger', 'more interesting', 'most interesting', 'interesting'], 1, 'Uzun sıfat → more interesting.'),
      q('-y', 'Today I feel ___ than yesterday.', ['happyer', 'more happy', 'happier', 'happiest'], 2, 'Ünsüz + y → ier.'),
      q('Düzensiz', 'My English is ___ now than last year.', ['gooder', 'more good', 'better', 'best'], 2, 'good → better.'),
      q('En üstünlük', 'Mount Everest is ___ mountain in the world.', ['the higher', 'the highest', 'highest', 'the most high'], 1, 'Tek heceli → the highest.'),
      q('En üstünlük', 'It was ___ day of my life.', ['the worse', 'the baddest', 'the worst', 'worst'], 2, 'bad → worse → the worst.'),
      q('as … as', 'My car isn\'t as fast ___ yours.', ['than', 'as', 'like', 'so'], 1, 'Eşitlik: as … as.'),
      q('Edat', 'She is the youngest ___ her family.', ['of', 'in', 'than', 'from'], 1, 'Grup / yer → in.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['Gold is more expensive than silver.', 'He is the tallest in the team.', 'This test is more easier.', "She isn't as tired as me."], 2, '"easier" zaten karşılaştırmadır; "more" fazla.'),
      q('Çeviri', '"Bu oda o odadan daha küçük." İngilizcesi hangisi?', ['This room is more small than that room.', 'This room is smaller than that room.', 'This room is smaller from that room.', 'This room is small than that room.'], 1, 'small → smaller than.')
    ]
  },

  // 7 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-a2-08',
    title: 'Sıfatlar ve Zarflar: quick / quickly',
    duration: '20 dk',
    description: 'Durum zarfları, düzensiz zarflar, derece zarfları ve look / feel + sıfat.',
    deepDive: [
      goal('Bir işin nasıl yapıldığını zarflarla anlatabilir, sıfat ile zarfı doğru yerde kullanabilir ve <strong>very, really, quite, too</strong> ile derece belirtebilirsin.'),
      h('Sıfat mı, zarf mı?'),
      p('<strong>Sıfat</strong> ismi niteler: <em>a <u>careful</u> driver</em>. <strong>Zarf</strong> fiili niteler, yani işin <em>nasıl</em> yapıldığını söyler: <em>He drives <u>carefully</u>.</em>'),
      table(['Kural', 'Örnek'], [
        ['Çoğu sıfat: + ly', 'quick → quickly, slow → slowly, careful → carefully'],
        ['-y ile biten: y → ily', 'happy → happily, easy → easily'],
        ['-le ile biten: e → y', 'gentle → gently, terrible → terribly'],
        ['Düzensiz', 'good → <strong>well</strong>, fast → fast, hard → hard, late → late, early → early']
      ]),
      p('Dikkat: <em>hardly</em> "neredeyse hiç", <em>lately</em> "son zamanlarda" demektir; <em>hard</em> ve <em>late</em> ile aynı anlamda değildir. <em>I work hard</em> (çok çalışırım) ↔ <em>I hardly work</em> (neredeyse hiç çalışmam).'),
      h('Zarfın yeri'),
      p('Durum zarfı genellikle fiilden sonra, nesne varsa nesneden sonra gelir: <em>She speaks English <u>fluently</u>.</em> (✗ She speaks fluently English.)'),
      h('look, feel, sound, taste, smell + sıfat'),
      p('Bu fiiller bir durumu ya da izlenimi anlatır, bu yüzden arkalarından <strong>sıfat</strong> gelir: <em>You look <u>tired</u>. This soup tastes <u>good</u>. That sounds <u>great</u>!</em>'),
      h('Derece zarfları'),
      table(['Zarf', 'Anlamı', 'Örnek'], [
        ['very / really', 'çok', "It's very cold. I really like it."],
        ['quite', 'oldukça', 'The film was quite long.'],
        ['too', 'fazla (olumsuz anlam)', "It's too expensive. I can't buy it."],
        ['a bit', 'biraz', "I'm a bit tired."]
      ]),
      p('"Çok severim" için <em>very</em> fiilin önüne gelmez: <em>I like it <u>very much</u></em> ya da <em>I <u>really</u> like it</em> (✗ I very like it).'),
      trNote('Türkçede sıfat ve zarf çoğu zaman aynı kelimedir: "<u>hızlı</u> araba" / "<u>hızlı</u> sürüyor". İngilizcede zarf genellikle <strong>-ly</strong> alır: <em>a quick car</em> / <em>he drives quickly</em>. "İyi konuşuyor" da <em>good</em> değil <em>well</em> olur: <em>She speaks English well.</em>'),
      h('Mini diyalog'),
      dialog([
        ['Nil', 'How was your driving test?'],
        ['Adam', 'I think it went well. I drove slowly and carefully.'],
        ['Nil', 'You look really happy!'],
        ['Adam', "I am! But I was a bit nervous at the start. I parked quite badly."],
        ['Nil', "Don't worry. You did it, that's the important thing."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['She speaks English very good.', 'She speaks English very well.', 'Fiili nitelerken good değil well.'],
        ['Drive careful!', 'Drive carefully!', 'Fiili niteleyen zarf -ly alır.'],
        ['I very like pizza.', 'I really like pizza. / I like pizza very much.', '"very" fiili nitelemez.'],
        ['You look tiredly.', 'You look tired.', 'look / feel + sıfat.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Nasıl? → zarf', text: '"Nasıl yapıyor?" sorusunun cevabı zarftır: slowly, well, carefully.' },
      { type: 'good', title: 'too olumsuzdur', text: '"too expensive" = alınamayacak kadar pahalı. Sadece "çok" demek istiyorsan "very".' },
      { type: 'bad', title: 'good / well karışıklığı', text: 'He plays good ✗ → He plays well. Ama: The food is good (sıfat).' }
    ],
    questions: [
      q('Zarf', 'Please speak ___. I can\'t understand you.', ['slow', 'slowly', 'slowlier', 'more slow'], 1, 'Fiili niteleyen zarf: slowly.'),
      q('Düzensiz', 'He plays the guitar very ___.', ['good', 'well', 'goodly', 'better'], 1, 'good → well.'),
      q('Düzensiz', 'She works very ___. She\'s always at the office.', ['hardly', 'hard', 'hardy', 'harder'], 1, '"hard" zarf olarak da hard kalır. hardly = neredeyse hiç.'),
      q('Yazım', '"easy" kelimesinin zarf hali nedir?', ['easyly', 'easily', 'easely', 'easy'], 1, '-y → ily.'),
      q('look + sıfat', 'You look ___. Did you sleep well?', ['tiredly', 'tired', 'tire', 'tiring'], 1, 'look + sıfat.'),
      q('Derece', 'This bag is ___ heavy. I can\'t carry it.', ['very', 'too', 'quite', 'a bit'], 1, 'Yapılamayacak kadar → too.'),
      q('Yer', 'Hangi sıra doğru?', ['She speaks fluently Spanish.', 'She fluently speaks Spanish.', 'She speaks Spanish fluently.', 'Fluently she speaks Spanish.'], 2, 'Zarf nesneden sonra gelir.'),
      q('very much', '"Bu şarkıyı çok seviyorum." İngilizcesi hangisi?', ['I very like this song.', 'I like very this song.', 'I really like this song.', 'I like this song very.'], 2, '"really like" ya da "like … very much".'),
      q('Sıfat / zarf', 'He is a ___ driver. He drives ___.', ['careful / careful', 'carefully / carefully', 'careful / carefully', 'carefully / careful'], 2, 'İsimden önce sıfat, fiilden sonra zarf.'),
      q('Anlam', '"I hardly slept last night." ne demek?', ['Dün gece çok uyudum.', 'Dün gece zor bela, neredeyse hiç uyumadım.', 'Dün gece geç uyudum.', 'Dün gece sert bir yatakta uyudum.'], 1, 'hardly = neredeyse hiç.')
    ]
  },

  // 8 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-a2-04',
    title: 'Gelecek: will, going to ve Present Continuous',
    duration: '30 dk',
    description: 'Ani kararlar, tahminler, sözler, planlar ve kesinleşmiş randevular.',
    deepDive: [
      goal('Geleceğe dair planlarını, tahminlerini ve o anda verdiğin kararları doğru yapıyla anlatabilirsin.'),
      h('Üç yapı'),
      table(['Yapı', 'Ne zaman?', 'Örnek'], [
        ['will + yalın fiil', 'O anda verilen karar, söz, teklif, fikre dayalı tahmin', "I'm thirsty. I'll get some water. / I think it will rain."],
        ['be going to + yalın fiil', 'Önceden yapılmış plan, kanıta dayalı tahmin', "I'm going to visit my aunt this weekend. / Look at those clouds! It's going to rain."],
        ['Present Continuous', 'Kesinleşmiş randevu (saat, yer, kişi belli)', "I'm meeting Ali at 6 tomorrow."]
      ]),
      h('will'),
      examples([
        ["The phone is ringing. — I'll answer it.", 'Telefon çalıyor. — Ben açarım. (ani karar)'],
        ["I'll call you tonight, I promise.", 'Bu akşam seni arayacağım, söz. (söz)'],
        ["I'll help you with your bags.", 'Çantalarına yardım edeyim. (teklif)'],
        ['I think Turkey will win the match.', 'Bence Türkiye maçı kazanacak. (fikir)']
      ]),
      p('Olumsuz: <strong>won\'t</strong> (= will not). Soru: <em>Will you…?</em> Rica: <em>Will you help me?</em>'),
      h('be going to'),
      examples([
        ["We're going to buy a new car next year.", 'Seneye yeni bir araba alacağız. (plan)'],
        ["She isn't going to study medicine.", 'Tıp okumayacak. (karar verilmiş)'],
        ['Be careful! You\'re going to fall!', 'Dikkat et! Düşeceksin! (gözle görülen kanıt)']
      ]),
      h('Hangisini seçmeli?'),
      p('Karar konuşma anında mı verildi? → <strong>will</strong>. Önceden mi düşünülmüştü? → <strong>going to</strong>. Takvime yazılmış bir randevu mu? → <strong>Present Continuous</strong> (en doğal seçenek, ama going to da yanlış olmaz).'),
      trNote('Türkçede hepsi "-ecek" ile söylenir: "Gel<u>eceğim</u>". İngilizcede ne zaman ve nasıl karar verdiğine göre yapı seçilir. Örneğin restoranda garsona sipariş verirken o anda karar verdiğin için <em>I\'ll have the soup</em> denir, <em>I\'m going to have</em> değil.'),
      h('Mini diyalog'),
      dialog([
        ['Kemal', 'What are you doing this weekend?'],
        ['Lily', "I'm meeting my sister on Saturday morning. Then we're going to look for a new flat."],
        ['Kemal', 'Sounds busy! Do you need help?'],
        ['Lily', "Maybe. It's going to be a long day."],
        ['Kemal', "OK, I'll come with you. I'll bring my car."],
        ['Lily', "Thanks! I'll buy you lunch."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['I will to go.', 'I will go.', 'will + yalın fiil.'],
        ["I'm going to went.", "I'm going to go.", 'going to + yalın fiil.'],
        ['(Telefon çalıyor) I am going to answer it.', "I'll answer it.", 'Ani karar → will.'],
        ['She will meets him.', 'She will meet him.', 'will her kişide aynıdır, fiil yalın.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'O an mı, önceden mi?', text: 'Konuşma anında karar → will. Önceden plan → going to.' },
      { type: 'good', title: 'Randevu → Present Continuous', text: "I'm flying to Izmir on Friday. I'm seeing the dentist at 3." },
      { type: 'bad', title: 'to ekleme', text: '"will to" yanlıştır; "going to" kalıbındaki to zaten vardır: going to go.' }
    ],
    questions: [
      q('will', "It's cold in here. — I ___ close the window.", ["'m going to", "'ll", 'close', "'m closing"], 1, 'O anda verilen karar → will.'),
      q('going to', "I've decided. I ___ learn Spanish next year.", ['will', 'am going to', 'learn', 'am learn'], 1, 'Önceden verilmiş karar → going to.'),
      q('Kanıt', "Look at that car! It ___ crash!", ["'s going to", "'ll", 'crashes', 'crash'], 0, 'Gözle görülen kanıt → going to.'),
      q('Randevu', 'I ___ the doctor at 10 tomorrow. It\'s in my calendar.', ['see', "'ll see", "'m seeing", 'saw'], 2, 'Kesinleşmiş randevu → Present Continuous.'),
      q('Söz', "Don't worry, I ___ tell anyone your secret.", ["won't", "don't", "am not going", "willn't"], 0, 'Söz → will; olumsuzu won\'t.'),
      q('Yapı', 'Hangisi doğru?', ['She will to come.', 'She will comes.', 'She will come.', 'She wills come.'], 2, 'will + yalın fiil.'),
      q('Yapı', 'They ___ going to move to Izmir.', ['is', 'are', 'will', 'do'], 1, 'they → are going to.'),
      q('Sipariş', 'Restoranda garsona ne dersin?', ["I'm going to have the fish.", "I'll have the fish.", 'I have the fish yesterday.', 'I will to have the fish.'], 1, 'Siparişte o anda karar verilir → I\'ll have…'),
      q('Tahmin (fikir)', 'I think robots ___ do most jobs in the future.', ['are doing', 'will', 'will do', 'do going to'], 2, 'Fikre dayalı tahmin → will do.'),
      q('Soru', '___ you going to call her?', ['Will', 'Do', 'Are', 'Is'], 2, 'you → Are you going to…?')
    ]
  },

  // 9 ────────────────────────────────────────────────────────────────────────
  {
    id: 'en-a2-09',
    title: "Zorunluluk ve Tavsiye: must, have to, should",
    duration: '25 dk',
    description: "must, have to, mustn't, don't have to ve should ile kurallar ve öneriler.",
    deepDive: [
      goal("Kuralları ve zorunlulukları anlatabilir, yasakla gereksizliği (<strong>mustn't</strong> / <strong>don't have to</strong>) ayırt edebilir ve birine tavsiye verebilirsin."),
      h('Zorunluluk: must ve have to'),
      table(['Yapı', 'Anlamı', 'Örnek'], [
        ['must + yalın fiil', 'Konuşanın hissettiği güçlü zorunluluk, yazılı kurallar', 'I must call my mum. / Passengers must wear seat belts.'],
        ['have to / has to + yalın fiil', 'Dışarıdan gelen zorunluluk (kural, iş, durum)', 'I have to wear a uniform at work. / She has to get up at 5.'],
        ['had to', 'Geçmişteki zorunluluk (must\'ın geçmişi yok)', 'I had to work late yesterday.']
      ]),
      h("En önemli fark: mustn't ≠ don't have to"),
      table(['Yapı', 'Anlamı', 'Örnek'], [
        ["mustn't", 'YASAK: yapma!', "You mustn't smoke here."],
        ["don't / doesn't have to", 'GEREKMİYOR: istersen yaparsın', "You don't have to come. It's optional."]
      ]),
      p('Olumlu halleri benzer anlamdayken olumsuzları tamamen farklıdır. <em>You mustn\'t tell him</em> = Ona söyleme! <em>You don\'t have to tell him</em> = Ona söylemek zorunda değilsin.'),
      h('Tavsiye: should'),
      examples([
        ['You should see a doctor.', 'Bir doktora görünmelisin.'],
        ["You shouldn't eat so much sugar.", 'Bu kadar çok şeker yememelisin.'],
        ['Should I bring anything?', 'Bir şey getireyim mi?'],
        ['I think you should apologise.', 'Bence özür dilemelisin.']
      ]),
      p('<strong>should</strong> must\'tan daha yumuşaktır; zorunluluk değil, öneri bildirir.'),
      p('Soru ve olumsuz: <em>Do you have to…? / She doesn\'t have to…</em> (have to normal bir fiil gibi do / does alır). must ve should ise do almaz: <em>Must I…? Should I…?</em>'),
      trNote('Türkçede hepsi "-meli / zorunda" ile karşılanabilir: "Gitmeli<u>yim</u>", "gitmek <u>zorunda</u>yım". Dikkat edilmesi gereken yer olumsuzdur: "gitme<u>mel</u>isin" (yasak, <em>mustn\'t</em>) ile "gitmek zorunda <u>değil</u>sin" (<em>don\'t have to</em>) arasındaki fark İngilizcede iki ayrı yapıyla gösterilir.'),
      h('Mini diyalog'),
      dialog([
        ['New employee', 'Do I have to wear a suit every day?'],
        ['Manager', "No, you don't have to. Smart clothes are fine. But you must wear your ID card."],
        ['New employee', 'OK. Can I use my phone at my desk?'],
        ['Manager', "Yes, but you mustn't use it in meetings."],
        ['New employee', 'Should I come early on my first day?'],
        ['Manager', 'Yes, you should arrive at 8:30.']
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['I must to go.', 'I must go.', 'must + yalın fiil, "to" yok.'],
        ['She have to work.', 'She has to work.', 'he / she / it → has to.'],
        ["You don't have to smoke here. (yasak anlamında)", "You mustn't smoke here.", 'Yasak → mustn\'t.'],
        ['I musted go yesterday.', 'I had to go yesterday.', "must'ın geçmişi yok; had to."]
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: "Yasak mı, gereksiz mi?", text: "mustn't = yapma. don't have to = gerek yok." },
      { type: 'good', title: 'Tavsiye için should', text: 'Arkadaşına öneride bulunurken must yerine should daha nazik ve doğaldır.' },
      { type: 'bad', title: 'must sonrası to', text: '"must to", "should to" yanlıştır.' }
    ],
    questions: [
      q('Yasak', 'You ___ use your phone during the exam. It\'s forbidden.', ["don't have to", "mustn't", "shouldn't to", "haven't"], 1, 'Yasak → mustn\'t.'),
      q('Gereksiz', "Tomorrow is Sunday, so I ___ get up early.", ["mustn't", "don't have to", "must", "has to"], 1, 'Gerek yok → don\'t have to.'),
      q('have to', 'My brother ___ work on Saturdays.', ['have to', 'has to', 'must to', 'have'], 1, 'he → has to.'),
      q('Geçmiş', 'The bus didn\'t come, so I ___ walk to work.', ['must', 'had to', 'have to', 'musted'], 1, 'Geçmişteki zorunluluk → had to.'),
      q('should', "You look tired. You ___ go to bed early.", ['should', 'should to', 'must to', 'have'], 0, 'Tavsiye → should + yalın fiil.'),
      q('Soru', '___ you have to show your passport at the hotel?', ['Must', 'Do', 'Have', 'Are'], 1, 'have to sorusunda do: Do you have to…?'),
      q('Anlam', '"You don\'t have to pay." ne demek?', ['Ödememelisin, yasak.', 'Ödemek zorunda değilsin.', 'Ödemelisin.', 'Ödeyemezsin.'], 1, "don't have to = gerekli değil."),
      q('Yapı', 'Hangisi doğru?', ['She musts study.', 'She must studies.', 'She must study.', 'She must to study.'], 2, 'must her kişide aynı, fiil yalın.'),
      q('Seçim', 'Bir arkadaşın başı ağrıyor. En doğal tavsiye hangisi?', ['You must to take a painkiller.', 'You should take a painkiller.', 'You have take a painkiller.', "You mustn't take a painkiller."], 1, 'Arkadaşça tavsiye → should.'),
      q('Kural', 'Bir tabelada "Visitors ___ touch the paintings." yazıyor. (yasak)', ['must not', "don't have to", 'should', 'have to'], 0, 'Yazılı yasak → must not.')
    ]
  },

  // 10 ───────────────────────────────────────────────────────────────────────
  {
    id: 'en-a2-10',
    title: "Present Perfect'e Giriş: ever, never, just",
    duration: '30 dk',
    description: 'Deneyimleri anlatma, Have you ever…? soruları, been / gone farkı ve Past Simple ile ilk karşılaştırma.',
    deepDive: [
      goal('Hayatın boyunca yaptığın ya da hiç yapmadığın şeyleri anlatabilir, birine "Hiç … yaptın mı?" diye sorabilir ve yeni olmuş bir şeyi <strong>just</strong> ile söyleyebilirsin.'),
      h('Yapı: have / has + V3 (past participle)'),
      table(['Özne', 'Olumlu', 'Olumsuz', 'Soru'], [
        ['I / you / we / they', "I've visited Rome.", "I haven't visited Rome.", 'Have you visited Rome?'],
        ['he / she / it', "She's visited Rome.", "She hasn't visited Rome.", 'Has she visited Rome?']
      ]),
      p('Düzenli fiillerde V3, Past Simple ile aynıdır (-ed). Düzensizlerde üçüncü hal ayrıca ezberlenir:'),
      table(['Fiil', 'Past Simple', 'V3'], [
        ['be', 'was / were', 'been'],
        ['go', 'went', 'gone / been'],
        ['see', 'saw', 'seen'],
        ['eat', 'ate', 'eaten'],
        ['do', 'did', 'done'],
        ['write', 'wrote', 'written'],
        ['take', 'took', 'taken'],
        ['meet', 'met', 'met']
      ]),
      h('Deneyim: ever ve never'),
      examples([
        ['Have you ever been to London?', "Hiç Londra'ya gittin mi? (hayatın boyunca)"],
        ["Yes, I have. / No, I haven't.", 'Evet. / Hayır.'],
        ["I've never eaten sushi.", 'Hiç suşi yemedim.'],
        ['She has visited ten countries.', 'On ülke gezdi.']
      ]),
      p('<strong>been</strong> ve <strong>gone</strong>: <em>She has <u>been</u> to Paris</em> = Paris\'e gitti ve geri döndü (deneyim). <em>She has <u>gone</u> to Paris</em> = Paris\'e gitti, şu an orada.'),
      h('Yeni olmuş şeyler: just'),
      p('<strong>just</strong> "az önce" demektir, have / has ile V3 arasına gelir: <em>I\'ve <u>just</u> finished my homework. The bus has <u>just</u> left.</em>'),
      h('Past Simple ile fark'),
      p('Ne zaman olduğunu söylüyorsan <strong>Past Simple</strong> kullanılır: <em>I\'ve been to Rome</em> (zaman önemsiz) ama <em>I went to Rome <u>in 2019</u></em>. Sohbet genellikle Present Perfect ile başlar, ayrıntılar Past Simple ile gelir: <em>Have you ever been to Spain? — Yes, I went there last summer.</em> Present Perfect B1 seviyesinde daha ayrıntılı işlenecek.'),
      trNote('Türkçede deneyim de "-di" ile söylenir: "Hiç suşi yedin mi?" İngilizcede hayat boyu deneyimden söz ederken Past Simple değil Present Perfect kullanılır: <em>Have you ever <u>eaten</u> sushi?</em> (✗ Did you ever eat…?)'),
      h('Mini diyalog'),
      dialog([
        ['Pınar', 'Have you ever tried Turkish coffee?'],
        ['Ryan', "No, I haven't. Is it strong?"],
        ['Pınar', "Yes, very! I've just made some. Do you want a cup?"],
        ['Ryan', "Sure. Have you ever been to England?"],
        ['Pınar', "Yes, I have. I went to Manchester two years ago, but I've never been to London."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['Have you ever went to Italy?', 'Have you ever been to Italy?', 'have + V3 (been).'],
        ['I have seen him yesterday.', 'I saw him yesterday.', 'Zaman belirtilince Past Simple.'],
        ['I have never ate octopus.', 'I have never eaten octopus.', 'eat → ate → eaten.'],
        ['She have finished.', 'She has finished.', 'he / she / it → has.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Zaman yoksa Present Perfect', text: 'Hayat boyu deneyim, zaman belirtilmeden: I\'ve been to Japan.' },
      { type: 'good', title: 'Zaman varsa Past Simple', text: 'yesterday, in 2010, last week, ago → Past Simple.' },
      { type: 'bad', title: 'V2 kullanma', text: '"have went", "have ate" yanlış; "have gone / been", "have eaten" doğru.' }
    ],
    questions: [
      q('Yapı', 'I ___ never ___ a horse.', ['have / rode', 'have / ridden', 'has / ridden', 'did / ride'], 1, 'have + V3: ride → rode → ridden.'),
      q('Soru', '___ you ever ___ to Cappadocia?', ['Have / been', 'Did / been', 'Have / went', 'Has / gone'], 0, 'Deneyim sorusu: Have you ever been…?'),
      q('V3', '"write" fiilinin üçüncü hali (V3) nedir?', ['wrote', 'writed', 'written', 'writing'], 2, 'write → wrote → written.'),
      q('has / have', 'My sister ___ visited Japan twice.', ['have', 'has', 'is', 'did'], 1, 'she → has.'),
      q('just', '"Az önce yemek yedim." İngilizcesi hangisi?', ["I've just eaten.", 'I just have eaten.', "I've eaten just.", 'I just eat.'], 0, 'just, have ile V3 arasına gelir.'),
      q('been / gone', "Where's Kaan? — He's ___ to the shop. He'll be back soon.", ['been', 'gone', 'went', 'go'], 1, 'Şu an orada, dönmedi → gone.'),
      q('Past Simple', 'I ___ that film last week.', ['have seen', 'saw', 'have saw', 'seen'], 1, '"last week" → Past Simple.'),
      q('Kısa cevap', '"Have you ever eaten snails?" — "No, I ___."', ["didn't", "haven't", "don't", "haven't eaten ever"], 1, 'Kısa cevap: No, I haven\'t.'),
      q('Seçim', 'Hangi cümle doğru?', ['I have visited Paris in 2018.', 'I visited Paris in 2018.', 'I have visit Paris in 2018.', 'I did visited Paris in 2018.'], 1, 'Belirli zaman (in 2018) → Past Simple.'),
      q('never', 'She has ___ been on a plane. She\'s a bit nervous.', ['ever', 'never', 'just', 'yet'], 1, 'Hiç yapmamış → never.')
    ]
  },

  // 11 ───────────────────────────────────────────────────────────────────────
  {
    id: 'en-a2-11',
    title: 'Fiil + to / -ing ve would like',
    duration: '25 dk',
    description: 'want to, decide to ile enjoy -ing, finish -ing; would like ile kibar istekler ve go + -ing.',
    deepDive: [
      goal('Bir fiilden sonra başka bir fiil kullanırken <strong>to</strong> mu <strong>-ing</strong> mi geleceğini bilir, <strong>would like</strong> ile kibarca istekte bulunabilirsin.'),
      h('Fiil + to + yalın fiil'),
      p('Genellikle niyet, karar ya da geleceğe dönük isteği gösteren fiillerdir: <strong>want, need, decide, hope, plan, learn, promise, try, forget, would like</strong>.'),
      examples([
        ['I want to learn French.', 'Fransızca öğrenmek istiyorum.'],
        ['We decided to stay at home.', 'Evde kalmaya karar verdik.'],
        ['She is learning to drive.', 'Araba kullanmayı öğreniyor.'],
        ["Don't forget to call me.", 'Beni aramayı unutma.']
      ]),
      h('Fiil + -ing'),
      p('Genellikle zevk, alışkanlık ya da bitirmeyi gösteren fiillerdir: <strong>enjoy, finish, stop, mind, practise, spend time, (don\'t) mind</strong>.'),
      examples([
        ['I enjoy cooking.', 'Yemek yapmaktan hoşlanırım.'],
        ['Have you finished reading the book?', 'Kitabı okumayı bitirdin mi?'],
        ["Do you mind opening the window?", 'Pencereyi açar mısınız? (kibar rica)'],
        ['He stopped smoking last year.', 'Geçen yıl sigarayı bıraktı.']
      ]),
      p('<strong>like, love, hate</strong> iki yapıyla da kullanılabilir: <em>I like swimming / I like to swim.</em> Ama <strong>would like</strong> her zaman <strong>to</strong> alır.'),
      h('would like: kibar istek'),
      table(['Yapı', 'Anlamı', 'Örnek'], [
        ["I'd like + isim", '… istiyorum (kibar)', "I'd like a coffee, please."],
        ["I'd like to + fiil", '… yapmak istiyorum', "I'd like to book a table."],
        ['Would you like…?', 'İster misin? (teklif)', 'Would you like some tea? / Would you like to come?']
      ]),
      p('Dikkat: <em>Do you like coffee?</em> = Genel olarak kahve sever misin? <em>Would you like a coffee?</em> = Şimdi bir kahve ister misin?'),
      h('go + -ing: aktiviteler'),
      p('<em>go swimming, go shopping, go running, go skiing, go camping</em>: <em>We went shopping yesterday.</em>'),
      trNote('Türkçede iki fiil yan yana gelince ikinci fiil "-mek / -meyi / -mekten" eki alır: "öğren<u>mek</u> istiyorum", "yap<u>maktan</u> hoşlanırım". İngilizcede hangi kalıbın geleceğini ilk fiil belirler: <em>want <u>to</u> learn</em> ama <em>enjoy <u>doing</u></em>. Bu yüzden kalıplar fiille birlikte ezberlenmelidir.'),
      h('Mini diyalog'),
      dialog([
        ['Waiter', 'Good evening. Would you like to see the menu?'],
        ['Duygu', "Yes, please. And I'd like a glass of water."],
        ['Waiter', 'Of course. Would you like to order now?'],
        ['Duygu', "Not yet, thanks. I need to decide. I really enjoy trying new dishes!"],
        ['Waiter', "Take your time. I'd recommend the lamb."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['I enjoy to read.', 'I enjoy reading.', 'enjoy + -ing.'],
        ['I want going home.', 'I want to go home.', 'want + to.'],
        ["I would like go.", "I'd like to go.", 'would like + to.'],
        ['I like a coffee, please. (sipariş)', "I'd like a coffee, please.", 'İstek için would like.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Kalıbı fiille ezberle', text: 'want to, decide to, hope to · enjoy -ing, finish -ing, mind -ing.' },
      { type: 'good', title: 'Siparişte would like', text: "I'd like… ve Could I have…? kibar istek kalıplarıdır; \"I want\" kaba duyulabilir." },
      { type: 'bad', title: 'like ile would like karışıklığı', text: 'Do you like…? genel zevk sorar; Would you like…? bir teklif sunar.' }
    ],
    questions: [
      q('to / -ing', 'I enjoy ___ in the sea.', ['to swim', 'swimming', 'swim', 'swam'], 1, 'enjoy + -ing.'),
      q('to / -ing', 'We need ___ some bread.', ['buying', 'buy', 'to buy', 'bought'], 2, 'need + to.'),
      q('to / -ing', 'Have you finished ___ the report?', ['to write', 'writing', 'write', 'wrote'], 1, 'finish + -ing.'),
      q('to / -ing', 'She decided ___ a new job.', ['looking for', 'to look for', 'look for', 'looked for'], 1, 'decide + to.'),
      q('would like', "I'd like ___ a table for two, please.", ['book', 'booking', 'to book', 'booked'], 2, 'would like + to.'),
      q('would / do', 'Ev sahibi olarak misafirine çay teklif ediyorsun. Ne dersin?', ['Do you like a tea?', 'Would you like some tea?', 'Are you like tea?', 'You want tea?'], 1, 'Teklif: Would you like…?'),
      q('Anlam', '"Do you like jazz?" ne sorar?', ['Şimdi caz dinlemek ister misin?', 'Genel olarak caz sever misin?', 'Caz çalabilir misin?', 'Caz dinledin mi?'], 1, 'Do you like = genel zevk.'),
      q('go + -ing', 'Let\'s go ___ this weekend. I need new shoes.', ['to shop', 'shopping', 'shop', 'for shopping'], 1, 'go shopping.'),
      q('mind', 'Do you mind ___ the door?', ['to close', 'closing', 'close', 'closed'], 1, 'mind + -ing.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ['I hope to see you soon.', 'He stopped laughing.', 'I want learning Japanese.', "We'd like to stay."], 2, 'want + to: I want to learn Japanese.')
    ]
  },

  // 12 ───────────────────────────────────────────────────────────────────────
  {
    id: 'en-a2-12',
    title: '0. ve 1. Koşul Cümleleri',
    duration: '25 dk',
    description: 'Genel gerçekler için zero conditional, gerçek olasılıklar için first conditional, unless.',
    deepDive: [
      goal('Her zaman doğru olan sonuçları ve gelecekteki gerçek olasılıkları "if" ile anlatabilir, <strong>unless</strong> kullanabilirsin.'),
      h('0. koşul: her zaman doğru'),
      p('<strong>If + Present Simple, Present Simple.</strong> Bilimsel gerçekler, genel kurallar ve alışkanlıklar için kullanılır. <em>if</em> burada <em>when</em> (… -dığında) anlamına yakındır.'),
      examples([
        ['If you heat water to 100°C, it boils.', 'Suyu 100 dereceye ısıtırsan kaynar.'],
        ["If I drink coffee at night, I can't sleep.", 'Gece kahve içersem uyuyamam. (alışkanlık)'],
        ['If you press this button, the machine stops.', 'Bu düğmeye basarsan makine durur.']
      ]),
      h('1. koşul: gerçek ve olası gelecek'),
      p('<strong>If + Present Simple, will + yalın fiil.</strong> Gelecekte gerçekleşmesi mümkün olan bir durum ve onun sonucu.'),
      examples([
        ['If it rains tomorrow, we will stay at home.', 'Yarın yağmur yağarsa evde kalacağız.'],
        ["If you study, you'll pass the exam.", 'Çalışırsan sınavı geçersin.'],
        ["If she doesn't hurry, she'll miss the bus.", 'Acele etmezse otobüsü kaçıracak.'],
        ['What will you do if you lose your job?', 'İşini kaybedersen ne yapacaksın?']
      ]),
      p('<strong>if</strong> kısmında <strong>will kullanılmaz</strong>: <em>If it <u>rains</u></em> (✗ If it will rain). Sonuç kısmında will yerine <em>can, might, should</em> ya da emir de gelebilir: <em>If you\'re tired, go to bed.</em>'),
      h('Virgül ve sıra'),
      p('if kısmı başta ise virgül konur: <em>If you call me, I\'ll come.</em> Sonda ise virgül gerekmez: <em>I\'ll come if you call me.</em>'),
      h('unless = if … not'),
      p('<em>You won\'t pass <u>unless</u> you study.</em> = <em>You won\'t pass <u>if</u> you <u>don\'t</u> study.</em> unless zaten olumsuz anlam taşır, ardından olumsuz fiil gelmez.'),
      trNote('Türkçede koşul fiile eklenen "-se / -sa" ile yapılır: "Yağmur yağar<u>sa</u>". İngilizcede cümle başına <strong>if</strong> gelir ve fiil Present Simple olur. Türkçede "yağar<u>sa</u>" gelecekten söz etse de İngilizcede if kısmına "will" gelmez.'),
      h('Mini diyalog'),
      dialog([
        ['Ahmet', "Are you coming to the picnic on Sunday?"],
        ['Grace', "If the weather is nice, I'll come."],
        ['Ahmet', "And if it rains?"],
        ['Grace', "If it rains, we can watch a film at my place instead."],
        ['Ahmet', "Good idea. I'll bring snacks unless you have some."],
        ['Grace', "Perfect. If you bring snacks, I'll make lemonade."]
      ]),
      h('Sık yapılan hatalar'),
      mistakes([
        ['If it will rain, I will stay home.', 'If it rains, I will stay home.', 'if kısmında will yok.'],
        ['If you will study, you pass.', "If you study, you'll pass.", 'Sonuç kısmında will.'],
        ["Unless you don't hurry, you'll be late.", "Unless you hurry, you'll be late.", 'unless zaten olumsuz.'],
        ['If I will see him, I tell him.', "If I see him, I'll tell him.", 'Yapı: if + present, will + fiil.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'if kısmı şimdiki zamanda', text: 'Gelecekten söz etsen de if kısmı Present Simple: If I find it, I\'ll call you.' },
      { type: 'good', title: 'Gerçek mi, olası mı?', text: 'Her zaman doğruysa 0. koşul (present + present); gelecekteki tek bir durumsa 1. koşul (present + will).' },
      { type: 'bad', title: 'unless + olumsuz', text: '"unless you don\'t" yanlıştır; unless zaten "eğer … -mezsen" demektir.' }
    ],
    questions: [
      q('1. koşul', 'If it ___ tomorrow, we will cancel the trip.', ['will snow', 'snows', 'snowed', 'snowing'], 1, 'if kısmında Present Simple.'),
      q('1. koşul', "If you don't hurry, you ___ the train.", ['miss', 'will miss', 'missed', 'are missing'], 1, 'Sonuç kısmında will + yalın fiil.'),
      q('0. koşul', 'If you mix red and white, you ___ pink.', ['will get', 'get', 'got', 'getting'], 1, 'Her zaman doğru → 0. koşul: Present Simple.'),
      q('0. koşul', 'Plants die if they ___ water.', ["don't get", "won't get", "didn't get", "not get"], 0, 'Genel gerçek, if kısmı Present Simple.'),
      q('unless', "I won't go ___ you come with me.", ['if', 'unless', 'when', 'so'], 1, 'unless = if … not.'),
      q('unless', 'Hangisi doğru?', ["Unless you don't call, I'll wait.", "Unless you call, I'll wait.", "Unless you will call, I'll wait.", "Unless you called, I'll wait."], 1, 'unless zaten olumsuzdur; ardından olumlu Present Simple gelir.'),
      q('Soru', 'What ___ you do if the shop is closed?', ['do', 'will', 'are', 'did'], 1, 'Sonuç kısmının sorusu: What will you do…?'),
      q('Virgül', 'Hangi cümlenin noktalaması doğru?', ["If I see him I'll, tell him.", "If I see him, I'll tell him.", "If, I see him I'll tell him.", "I'll tell him, if, I see him."], 1, 'if kısmı başta → sonuna virgül.'),
      q('Çeviri', '"Erken kalkarsan güneşin doğuşunu görürsün." İngilizcesi hangisi?', ["If you will get up early, you see the sunrise.", "If you get up early, you'll see the sunrise.", "If you got up early, you see the sunrise.", "You'll see the sunrise if you will get up early."], 1, 'if + present, will + yalın fiil.'),
      q('Hata bulma', 'Hangi cümlede hata var?', ["If you're hungry, eat something.", "If it's sunny, we'll go out.", "If she will call, tell her I'm busy.", 'Water freezes if it gets very cold.'], 2, 'if kısmında will yok: If she calls…')
    ]
  }
];
