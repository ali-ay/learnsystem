/**
 * AI Uzmanlığı — Aşama 2: LLM temelleri (nasıl çalışır, API ve prompt, embedding).
 * Imported with: npm run content:ai-s2
 */

import { goal, h, p, table, code, task, why, mistakes, q, qc } from './lessonHtml.js';

export const STAGE_ID = 'ai-s2';

export const STAGE = {
  trackId: 'ai',
  name: 'Aşama 2: LLM Temelleri — Model, API ve Embedding',
  shortName: 'Aşama 2: LLM Temelleri',
  color: 'var(--accent-cyan)',
  folder: 'ai-s2-llm-basics',
  sortOrder: 1
};

export const LESSONS = [
  // 1 ────────────────────────────────────────────────────────────────────────
  {
    id: 'ai-s2-01',
    title: 'LLM Nasıl Çalışır?',
    duration: '40 dk',
    description: 'Token, sonraki token tahmini, bağlam penceresi, temperature, halüsinasyon ve model türleri.',
    deepDive: [
      goal('Bir LLM\'in metni nasıl ürettiğini, token ve bağlam penceresinin maliyet ve tasarım üzerindeki etkisini ve modellerin neden "uydurduğunu" açıklayabilirsin.'),
      why('RAG\'in neden gerekli olduğunu, hangi modelin hangi sunucuya sığacağını ve bir yanıtın neden yanlış olduğunu anlamak bu temel kavramlara dayanır. Mülakatlarda sık sorulan konulardır.'),
      h('1. Token'),
      p('LLM\'ler metni kelime kelime değil <strong>token</strong> token işler. Token bir kelime, kelimenin bir parçası ya da noktalama olabilir. İngilizcede ortalama bir token yaklaşık ¾ kelimedir. Türkçe gibi eklemeli dillerde aynı anlam genellikle <strong>daha fazla token</strong> tutar; bu da maliyeti ve bağlam kullanımını artırır.'),
      p('Fiyatlandırma, hız ve sınırlar token üzerinden hesaplanır: girdi (prompt) token\'ları + çıktı (yanıt) token\'ları.'),
      h('2. Sonraki token tahmini'),
      p('Bir LLM temelde şunu yapar: şimdiye kadarki token\'lara bakıp <strong>bir sonraki token için olasılık dağılımı</strong> hesaplar, birini seçer, ekler ve tekrarlar. Bu yüzden model "bilgi tabanına bakmaz", eğitim verisinden öğrendiği kalıpları sürdürür.'),
      h('3. Örnekleme ayarları'),
      table(['Parametre', 'Ne yapar?', 'Ne zaman?'], [
        ['temperature', 'Düşük → tutarlı ve tahmin edilebilir; yüksek → çeşitli ve yaratıcı', 'RAG ve veri çıkarma için düşük (0–0.3)'],
        ['top_p', 'Sadece en olası token\'ların toplam p kadarlık kısmından seçer', 'Genelde temperature ile birlikte biri ayarlanır'],
        ['max_tokens', 'Yanıtın en fazla kaç token olacağı', 'Maliyet ve süre kontrolü']
      ]),
      h('4. Bağlam penceresi (context window)'),
      p('Modelin tek seferde "görebildiği" toplam token sayısıdır: sistem mesajı + sohbet geçmişi + eklenen belgeler + yanıt. Örneğin 8K, 32K, 128K token. Pencere dolunca eski içerik kesilir. Uzun bağlam ayrıca <strong>daha fazla bellek (VRAM)</strong> ve daha yavaş yanıt demektir; bunu yerel LLM aşamasında hesaplayacağız.'),
      h('5. Halüsinasyon'),
      p('Model, bilmediği bir şeyi de akıcı ve kendinden emin biçimde üretebilir. Çünkü amacı "doğru" değil "olası" metin üretmektir. Şirket verisi (ERP kayıtları, iç dokümanlar) modelin eğitiminde yoktur; bu yüzden soru sorulduğunda ya bilmez ya da uydurur. <strong>RAG\'in temel amacı</strong> modele doğru bilgiyi soru anında vermektir.'),
      h('6. Model türleri'),
      table(['Tür', 'Örnek', 'Artı / eksi'], [
        ['Kapalı, API üzerinden', 'Claude, GPT, Gemini', 'Yüksek kalite, kurulum yok / veri dışarı çıkar, kullanım başına ücret'],
        ['Açık ağırlıklı (open weights)', 'Llama, Qwen, Mistral, Gemma ailesi', 'Kendi sunucunda çalışır, veri içeride kalır / donanım ve bakım gerekir'],
        ['Embedding modelleri', 'bge-m3, multilingual-e5', 'Metin üretmez, metni vektöre çevirir (arama için)']
      ]),
      p('Model adındaki <strong>7B, 8B, 70B</strong> parametre sayısını (milyar) gösterir. Parametre sayısı arttıkça kalite genellikle artar, ama gereken bellek de doğrudan artar.'),
      task('Bir tokenizer aracında (örneğin modellerin kendi tokenizer\'ları ya da çevrimiçi token sayaçları) aynı paragrafın Türkçe ve İngilizce hallerinin token sayılarını karşılaştır. Farkı not al: bu fark bağlam penceresine ve maliyete nasıl yansır?'),
      h('Sık yapılan hatalar'),
      mistakes([
        ['"Model şirket verimizi bilir"', 'Bilgiyi RAG ile soru anında ver', 'Model eğitimde görmediği veriyi bilemez.'],
        ['RAG için temperature 1.0', 'temperature 0–0.3', 'Yüksek değer uydurma riskini artırır.'],
        ['Bağlam penceresini sınırsız sanmak', 'Token bütçesi planla', 'Pencere dolunca bilgi kesilir, maliyet ve gecikme artar.'],
        ['Kelime sayısıyla maliyet hesabı', 'Token sayısıyla hesap', 'Türkçede token sayısı kelime sayısından belirgin biçimde fazladır.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Görev için düşük temperature', text: 'Veri çıkarma, sınıflandırma ve RAG yanıtlarında tutarlılık için temperature değerini düşük tut.' },
      { type: 'good', title: 'Token bütçesi', text: 'Sistem mesajı + belgeler + geçmiş + yanıt toplamının bağlam penceresine sığdığından emin ol.' },
      { type: 'bad', title: 'Modelin bilgisine güvenmek', text: 'Güncel ya da şirkete özel bilgi için modelin hafızasına değil, verilen kaynağa dayan.' }
    ],
    questions: [
      q('Token', 'LLM\'ler metni hangi birimle işler?', ['Karakter', 'Cümle', 'Token', 'Paragraf'], 2, 'Metin önce token\'lara bölünür; model token token üretir.'),
      q('Token', 'Aynı anlamdaki metin için Türkçede genellikle ne olur?', ['Daha az token tutar', 'Daha fazla token tutar', 'Token sayısı aynıdır', 'Türkçe tokenleştirilemez'], 1, 'Eklemeli yapı nedeniyle Türkçe genellikle daha fazla token\'a bölünür.'),
      q('Üretim', 'Bir LLM metni nasıl üretir?', ['Veritabanından hazır cevap çeker', 'Her adımda sonraki token için olasılık hesaplayıp seçer', 'İnternette arama yapar', 'Kurallı dilbilgisi motoru kullanır'], 1, 'LLM\'ler otoregresif çalışır: sonraki token tahmini tekrar tekrar yapılır.'),
      q('Parametre', 'Bir RAG asistanının şirket belgelerinden tutarlı yanıt vermesi için temperature nasıl ayarlanmalı?', ['Çok yüksek (1.5)', 'Düşük (0–0.3)', 'Rastgele', 'Fark etmez'], 1, 'Düşük temperature tutarlı ve kaynağa sadık yanıt üretir.'),
      q('Bağlam', 'Bağlam penceresine hangisi dahil değildir?', ['Sistem mesajı', 'Sohbet geçmişi', 'Eklenen belge parçaları', 'Modelin eğitim veri seti'], 3, 'Bağlam penceresi tek istekte modele verilen ve üretilen token\'lardır.'),
      q('Bağlam', 'Bağlam penceresini çok uzun kullanmanın yan etkisi hangisidir?', ['Model küçülür', 'Daha fazla bellek ve daha yavaş yanıt', 'Doğruluk her zaman artar', 'Token maliyeti düşer'], 1, 'Uzun bağlam KV önbelleğini büyütür; VRAM kullanımı ve gecikme artar.'),
      q('Halüsinasyon', 'Halüsinasyonun temel nedeni nedir?', ['Model kasıtlı olarak yalan söyler', 'Model doğru değil, olası metin üretmeye eğitilmiştir', 'GPU hatası', 'İnternet bağlantısı kopar'], 1, 'Model bilmediği konuda da akıcı ve olası görünen metin üretebilir.'),
      q('RAG', 'Şirketin ERP verileri hakkında soru yanıtlayan bir asistan için RAG neden gerekir?', ['Modeli küçültmek için', 'Model bu veriyi eğitimde görmediği için, bilgiyi soru anında vermek gerekir', 'GPU kullanımını kapatmak için', 'Türkçe desteği için'], 1, 'RAG, ilgili veriyi bulup prompt\'a ekleyerek modelin bu bilgiye dayanmasını sağlar.'),
      q('Model', '"Llama 3.1 8B" adındaki 8B neyi gösterir?', ['8 GB dosya boyutu', '8 milyar parametre', '8 bin token bağlam', '8 GPU gerekir'], 1, 'B = billion (milyar) parametre.'),
      q('Model', 'Verinin şirket dışına çıkmaması kesin şartsa hangi seçenek öne çıkar?', ['Herkese açık bir sohbet sitesi', 'Kendi sunucunda çalışan açık ağırlıklı model', 'E-posta ile soru göndermek', 'Embedding modeli olmadan arama'], 1, 'Açık ağırlıklı modeller şirket içi sunucuda çalıştırılabilir; veri içeride kalır.')
    ]
  },

  // 2 ────────────────────────────────────────────────────────────────────────
  {
    id: 'ai-s2-02',
    title: 'LLM API\'leri ve Prompt Tasarımı',
    duration: '50 dk',
    description: 'Mesaj rolleri, sistem promptu, few-shot, yapılandırılmış çıktı, araç çağırma ve OpenAI uyumlu API.',
    deepDive: [
      goal('Bir LLM\'i koddan çağırabilir, iyi bir sistem promptu yazabilir, modelden doğrulanabilir JSON alabilir ve araç çağırma (tool calling) mantığını açıklayabilirsin.'),
      why('RAG, SQL entegrasyonu ve API Gateway; hepsinin merkezinde bir LLM API çağrısı vardır. Ollama, vLLM ve LiteLLM gibi araçlar <strong>OpenAI uyumlu</strong> bir API sunduğu için bu formatı bilmek, aynı kodu bulut ve yerel modellerde çalıştırmanı sağlar.'),
      h('1. Mesaj yapısı'),
      table(['Rol', 'Görevi'], [
        ['system', 'Modelin rolü, kuralları, üslubu ve sınırları'],
        ['user', 'Kullanıcının sorusu ya da görevi'],
        ['assistant', 'Modelin önceki yanıtları (sohbet geçmişi ya da örnek)'],
        ['tool', 'Model adına çalıştırılan bir aracın sonucu']
      ]),
      code(`
import os
from openai import OpenAI

# Aynı kod: Ollama, vLLM, LiteLLM gateway ya da bulut sağlayıcı
client = OpenAI(base_url=os.environ["LLM_BASE_URL"], api_key=os.environ["LLM_API_KEY"])

resp = client.chat.completions.create(
    model="llama3.1:8b",
    temperature=0.2,
    messages=[
        {"role": "system", "content": "Sen bir muhasebe asistanısın. Kısa ve net Türkçe yanıt ver."},
        {"role": "user", "content": "KDV dahil 1.200 TL'nin KDV hariç tutarı nedir? KDV %20."},
    ],
)
print(resp.choices[0].message.content)
print(resp.usage)   # prompt_tokens, completion_tokens`, 'python'),
      h('2. İyi bir sistem promptu'),
      p('Belirsiz istek belirsiz cevap getirir. İyi bir sistem promptu şunları içerir: <strong>rol</strong>, <strong>görev</strong>, <strong>kurallar ve sınırlar</strong>, <strong>çıktı biçimi</strong> ve emin olunmadığında <strong>ne yapılacağı</strong>.'),
      code(`
Sen şirketimizin satın alma asistanısın.
Görevin: kullanıcının sorusunu YALNIZCA verilen belgelere dayanarak yanıtlamak.
Kurallar:
- Belgelerde yoksa "Bu bilgi belgelerde yok." de, tahmin yürütme.
- Tutarları belgede yazdığı gibi, para birimiyle ver.
- Her bilginin sonunda kaynak belge adını [kaynak] biçiminde yaz.
Biçim: en fazla 5 madde.`, 'system prompt'),
      h('3. Few-shot: örnekle öğretmek'),
      p('Beklenen çıktıyı tarif etmek yerine 2–3 örnek göstermek çoğu zaman daha etkilidir. Örnek girdi ve çıktılar <em>user</em> / <em>assistant</em> mesajları olarak eklenir.'),
      h('4. Yapılandırılmış çıktı (JSON)'),
      p('Uygulaman modelin çıktısını işleyecekse serbest metin yerine <strong>şemaya uygun JSON</strong> iste ve bunu pydantic ile doğrula. Birçok sunucu bunu <code>response_format</code> ile destekler; desteklemiyorsa prompt\'ta şemayı ver ve çıktıyı doğrulayıp gerekirse yeniden dene.'),
      code(`
from pydantic import BaseModel

class InvoiceInfo(BaseModel):
    supplier: str
    invoice_no: str
    total: float
    currency: str

raw = resp.choices[0].message.content      # modelden gelen JSON metni
info = InvoiceInfo.model_validate_json(raw) # şemaya uymuyorsa hata fırlatır`, 'python'),
      h('5. Araç çağırma (tool / function calling)'),
      p('Modele kullanabileceği araçları (ad, açıklama, parametre şeması) tanıtırsın. Model gerekirse yanıt yerine "şu aracı şu parametrelerle çağır" der; <strong>aracı senin kodun çalıştırır</strong>, sonucu <em>tool</em> mesajı olarak geri verirsin, model son yanıtı yazar. SQL sorgusu çalıştırmak, ERP\'den stok sormak gibi işler bu yolla yapılır. Model hiçbir şeyi kendisi çalıştırmaz; yetkiyi ve güvenliği senin kodun kontrol eder.'),
      h('6. Akış (streaming) ve maliyet'),
      p('<code>stream=True</code> ile yanıt token token gelir; kullanıcı ilk kelimeyi hemen görür. Her yanıttaki <code>usage</code> alanını loglamak, maliyet ve kapasite planlaması için temel veridir.'),
      task('OpenAI uyumlu bir uç noktaya (yerelde Ollama ya da bir bulut sağlayıcı) bağlanan bir betik yaz. Serbest metin bir fatura açıklamasından tedarikçi, fatura no, tutar ve para birimini JSON olarak çıkar; pydantic ile doğrula, doğrulama başarısız olursa hatayı modele geri verip bir kez yeniden dene.'),
      h('Sık yapılan hatalar'),
      mistakes([
        ['Tek satırlık belirsiz prompt', 'Rol + görev + kurallar + biçim', 'Model ne beklendiğini tahmin etmek zorunda kalır.'],
        ['LLM çıktısını doğrudan json.loads ile kullanmak', 'Şema ile doğrula, hata halinde yeniden dene', 'Eksik ya da hatalı alan sessizce sisteme girer.'],
        ['Modelin SQL\'i kendisinin çalıştırdığını sanmak', 'Aracı kod çalıştırır, yetkiyi kod kontrol eder', 'Güvenlik sınırı her zaman uygulama tarafındadır.'],
        ['Sağlayıcıya özel SDK\'ya kilitlenmek', 'OpenAI uyumlu istemci + base_url', 'Yerel model ya da gateway\'e geçiş tek satır olur.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Belirsizlikte ne yapılacağını söyle', text: '"Bilmiyorsan bilmiyorum de" kuralı halüsinasyonu belirgin biçimde azaltır.' },
      { type: 'good', title: 'usage alanını logla', text: 'Token kullanımı maliyet, kapasite ve gateway kotaları için temel veridir.' },
      { type: 'bad', title: 'Kullanıcı girdisini sistem promptuna gömmek', text: 'Kullanıcı metni user mesajında kalmalı; aksi halde talimatları ezebilir (prompt injection).' }
    ],
    questions: [
      q('Roller', 'Modelin rolü, kuralları ve çıktı biçimi hangi mesajda tanımlanır?', ['user', 'system', 'tool', 'assistant'], 1, 'system mesajı modelin davranış çerçevesini belirler.'),
      qc('API', 'Bu satırda base_url\'in değiştirilebilir olmasının faydası nedir?', 'client = OpenAI(base_url=os.environ["LLM_BASE_URL"], api_key=...)', ['Daha hızlı internet', 'Aynı kod Ollama, vLLM, gateway ya da bulut sağlayıcıyla çalışır', 'GPU kullanımı açılır', 'Token sayısı azalır'], 1, 'Bu araçların çoğu OpenAI uyumlu API sunar; sadece adres değişir.'),
      qc('API', 'resp.usage alanında ne bulunur?', 'resp = client.chat.completions.create(...)\nprint(resp.usage)', ['Modelin parametre sayısı', 'Girdi ve çıktı token sayıları', 'GPU sıcaklığı', 'Kullanıcı adı'], 1, 'usage, prompt_tokens ve completion_tokens gibi değerleri içerir.'),
      q('Prompt', 'RAG asistanında halüsinasyonu azaltmak için sistem promptuna en faydalı kural hangisidir?', ['"Her zaman uzun yanıt ver."', '"Belgelerde yoksa bunu açıkça söyle, tahmin yürütme."', '"Yaratıcı ol."', '"İngilizce yanıt ver."'], 1, 'Modele bilinmeyen durumda ne yapacağını söylemek uydurmayı azaltır.'),
      q('Few-shot', 'Few-shot prompting nedir?', ['Modeli az veriyle yeniden eğitmek', 'Prompt içinde birkaç örnek girdi-çıktı göstermek', 'Kısa yanıt istemek', 'Birden çok model kullanmak'], 1, 'Örnekler, beklenen biçimi ve üslubu tarif etmekten daha etkili öğretebilir.'),
      qc('Yapılandırılmış çıktı', 'Model eksik alanlı bir JSON döndürürse bu satır ne yapar?', 'info = InvoiceInfo.model_validate_json(raw)', ['Eksik alanları uydurur', 'ValidationError fırlatır', 'Boş bir nesne döndürür', 'Modeli yeniden eğitir'], 1, 'pydantic şemaya uymayan veriyi reddeder; uygulama bunu yakalayıp yeniden deneyebilir.'),
      q('Araç çağırma', 'Tool calling akışında SQL sorgusunu kim çalıştırır?', ['LLM\'in kendisi', 'Uygulamanın kodu', 'Veritabanı kendiliğinden', 'Kullanıcı'], 1, 'Model sadece hangi aracın hangi parametrelerle çağrılacağını önerir; çalıştırmak ve yetkilendirmek kodun işidir.'),
      q('Araç çağırma', 'Aracın sonucu modele hangi rolle geri verilir?', ['system', 'user', 'tool', 'developer'], 2, 'Araç sonucu tool mesajı olarak eklenir, ardından model son yanıtı üretir.'),
      q('Akış', 'stream=True kullanmanın kullanıcıya etkisi nedir?', ['Yanıt daha doğru olur', 'İlk kelimeler hemen görünür, bekleme hissi azalır', 'Token maliyeti sıfırlanır', 'Model daha küçük olur'], 1, 'Akışlı yanıtta token\'lar üretildikçe gönderilir.'),
      q('Güvenlik', 'Prompt injection riskini azaltan yaklaşım hangisidir?', ['Kullanıcı metnini sistem promptunun içine eklemek', 'Kullanıcı girdisini user mesajında tutmak ve kritik işlemleri kodda yetkilendirmek', 'temperature değerini yükseltmek', 'Daha uzun sistem promptu yazmak'], 1, 'Talimat ile veri ayrı tutulmalı, yetki kararları modele bırakılmamalıdır.')
    ]
  },

  // 3 ────────────────────────────────────────────────────────────────────────
  {
    id: 'ai-s2-03',
    title: 'Embedding ve Anlamsal Arama',
    duration: '45 dk',
    description: 'Embedding nedir, kosinüs benzerliği, çok dilli modeller, normalizasyon ve anahtar kelime aramasıyla farkı.',
    deepDive: [
      goal('Metni vektöre çevirip anlamca en yakın metinleri bulabilir, Türkçe için uygun embedding modelini seçebilir ve anlamsal arama ile anahtar kelime aramasının güçlü ve zayıf yanlarını açıklayabilirsin.'),
      why('RAG\'in "bulma" (retrieval) kısmı embedding\'lerle çalışır. Yanlış embedding modeli seçmek, en iyi LLM\'i bile işe yaramaz hale getirir: model doğru belgeyi hiç görmez.'),
      h('1. Embedding nedir?'),
      p('Embedding modeli bir metni sabit uzunlukta bir sayı dizisine (<strong>vektör</strong>) çevirir; örneğin 384, 768 ya da 1024 boyutlu. Anlamca benzer metinlerin vektörleri birbirine <strong>yakın</strong> olur. "Fatura ödeme vadesi" ile "faturanın son ödeme tarihi" farklı kelimelerle yazılsa da yakın vektörler üretir.'),
      h('2. Benzerlik ölçüsü'),
      p('En yaygın ölçü <strong>kosinüs benzerliği</strong>dir: iki vektör arasındaki açıya bakar, 1\'e yakınsa çok benzer, 0\'a yakınsa ilgisizdir. Vektörler önceden <strong>normalize</strong> edilirse (uzunluğu 1 yapılırsa) kosinüs benzerliği basit bir iç çarpıma (dot product) dönüşür ve hesap hızlanır.'),
      code(`
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("BAAI/bge-m3")   # çok dilli, Türkçeyi destekler

docs = [
    "Faturaların son ödeme tarihi kesim tarihinden itibaren 30 gündür.",
    "Depodaki stok sayımı her ayın son cuma günü yapılır.",
    "İzin talepleri insan kaynakları portalından girilir.",
]
query = "Faturayı en geç ne zaman ödemeliyim?"

doc_vecs = model.encode(docs, normalize_embeddings=True)
q_vec = model.encode(query, normalize_embeddings=True)

scores = doc_vecs @ q_vec        # normalize edildiği için iç çarpım = kosinüs
best = scores.argmax()
print(docs[best], float(scores[best]))`, 'python'),
      h('3. Model seçimi'),
      table(['Ölçüt', 'Neden önemli?'], [
        ['Dil desteği', 'Türkçe belgeler için çok dilli bir model şart (örneğin bge-m3, multilingual-e5 ailesi). Sadece İngilizce eğitilmiş modeller Türkçede zayıf kalır.'],
        ['Boyut (dimension)', 'Büyük boyut daha iyi ayrım ama daha fazla depolama ve daha yavaş arama demek.'],
        ['Maksimum girdi uzunluğu', 'Uzun parçalar modelin sınırını aşarsa kesilir; parçalama stratejisini etkiler.'],
        ['Çalışma yeri', 'Yerelde (sentence-transformers, Ollama) ya da API üzerinden; veri gizliliği açısından önemli.'],
        ['Kalite ölçümü', 'Genel sıralamalar (ör. MTEB) yol gösterir ama asıl test kendi verin ve kendi sorularındır.']
      ]),
      p('Önemli kural: <strong>belgeleri hangi modelle vektörleştirdiysen soruları da aynı modelle</strong> vektörleştirmelisin. Model değişirse tüm belgelerin yeniden vektörleştirilmesi gerekir. Bazı modeller (örneğin e5 ailesi) sorgu ve belge için "query:" / "passage:" gibi ön ekler bekler; model kartını oku.'),
      h('4. Anlamsal arama mı, anahtar kelime mi?'),
      table(['', 'Anlamsal (vektör)', 'Anahtar kelime (BM25 / tam metin)'], [
        ['Güçlü yanı', 'Eş anlamlıları ve farklı ifadeleri yakalar', 'Kodları, ürün numaralarını, özel adları tam yakalar'],
        ['Zayıf yanı', '"STK-00451" gibi kodlarda ve kesin eşleşmede zayıf', 'Farklı kelimelerle sorulan soruyu kaçırır'],
        ['Örnek', '"ödeme süresi" ↔ "vade"', '"Fatura F-2024-0912"']
      ]),
      p('Kurumsal veride (ERP kodları, cari kodlar, malzeme numaraları) ikisinin birleşimi olan <strong>hibrit arama</strong> genellikle en iyi sonucu verir. Bunu RAG aşamasında uygulayacağız.'),
      task('Kendi alanından (örneğin şirket prosedürleri) 20 kısa paragraf ve 10 soru hazırla. İki farklı embedding modeliyle her sorunun en iyi 3 sonucunu bul ve doğru paragrafın kaç soruda ilk 3\'e girdiğini say. Bu basit ölçüm, ileride RAG değerlendirmesinin temelini oluşturacak.'),
      h('Sık yapılan hatalar'),
      mistakes([
        ['Türkçe veri için sadece İngilizce embedding modeli', 'Çok dilli model', 'Doğru belge bulunamaz, LLM ne kadar iyi olursa olsun yanıt yanlış olur.'],
        ['Belgeleri A, soruları B modeliyle vektörleştirmek', 'İkisi için aynı model', 'Farklı modellerin vektör uzayları karşılaştırılamaz.'],
        ['Ürün kodlarını sadece vektörle aramak', 'Hibrit arama', 'Kod ve numaralarda anahtar kelime araması daha güvenilirdir.'],
        ['Model kartındaki ön ek talimatını atlamak', 'query: / passage: kurallarına uy', 'Bazı modellerde kalite belirgin biçimde düşer.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Kendi verinle ölç', text: 'Genel sıralamalar yol gösterir; karar için kendi belgelerin ve kendi sorularınla küçük bir test seti kur.' },
      { type: 'good', title: 'Normalize et', text: 'Normalize vektörlerde kosinüs benzerliği iç çarpıma dönüşür; hızlı ve tutarlıdır.' },
      { type: 'bad', title: 'Modeli değiştirip eski vektörleri tutmak', text: 'Embedding modeli değişince tüm belgeler yeniden vektörleştirilmelidir.' }
    ],
    questions: [
      q('Kavram', 'Embedding modeli ne üretir?', ['Yeni bir metin', 'Metni temsil eden sabit uzunlukta bir sayı vektörü', 'SQL sorgusu', 'Bir resim'], 1, 'Embedding, metnin anlamını sayısal bir vektörle temsil eder.'),
      q('Kavram', 'Anlamca benzer iki cümlenin vektörleri için ne beklenir?', ['Birbirinden çok uzak olur', 'Birbirine yakın olur', 'Aynı uzunlukta metin olur', 'Hiçbir ilişki yoktur'], 1, 'Embedding uzayında anlamca benzer metinler yakın konumlanır.'),
      q('Benzerlik', 'Kosinüs benzerliği 1\'e yakınsa bu ne anlama gelir?', ['Metinler ilgisizdir', 'Metinler çok benzerdir', 'Metinler zıt anlamlıdır', 'Hesap hatası vardır'], 1, '1 = aynı yön (çok benzer), 0 = ilgisiz.'),
      qc('Benzerlik', 'Burada iç çarpım neden kosinüs benzerliğine eşittir?', 'doc_vecs = model.encode(docs, normalize_embeddings=True)\nscores = doc_vecs @ q_vec', ['Model öyle tasarlandığı için', 'Vektörler normalize edildiği (uzunluğu 1 olduğu) için', 'GPU kullanıldığı için', 'Eşit değildir'], 1, 'Uzunluğu 1 olan vektörlerde iç çarpım doğrudan kosinüs benzerliğidir.'),
      q('Model seçimi', 'Türkçe şirket belgeleri için embedding modeli seçerken ilk ölçüt hangisi olmalı?', ['En büyük dosya boyutu', 'Türkçeyi destekleyen çok dilli model olması', 'En yeni çıkmış olması', 'En kısa adı olması'], 1, 'Dili iyi temsil etmeyen model doğru belgeyi bulamaz.'),
      q('Tutarlılık', 'Belgeler bge-m3 ile vektörleştirildi. Kullanıcı soruları hangi modelle vektörleştirilmeli?', ['Herhangi bir embedding modeliyle', 'Aynı model, bge-m3 ile', 'LLM\'in kendisiyle', 'Vektörleştirmeye gerek yok'], 1, 'Farklı modellerin vektör uzayları birbirine uymaz.'),
      q('Hibrit', '"STK-00451 kodlu malzemenin stoğu" gibi bir sorguda saf vektör aramanın zayıflığı nedir?', ['Çok yavaş çalışır', 'Kod ve numaralar gibi kesin eşleşmelerde güvenilmezdir', 'Türkçe karakterleri silmesi', 'Hiçbir zayıflığı yoktur'], 1, 'Kodlar için anahtar kelime araması daha güvenilirdir; hibrit arama ikisini birleştirir.'),
      q('Hibrit', 'Hibrit arama nedir?', ['İki farklı LLM\'i birlikte kullanmak', 'Anahtar kelime (BM25) ve vektör aramasının sonuçlarını birleştirmek', 'Hem CPU hem GPU kullanmak', 'Türkçe ve İngilizce aramak'], 1, 'Hibrit arama iki yöntemin güçlü yanlarını bir araya getirir.'),
      q('Model kartı', 'Bazı embedding modelleri "query:" ve "passage:" ön eklerini neden ister?', ['Lisans gereği', 'Model sorgu ve belgeyi bu ön eklerle ayırt edecek şekilde eğitildiği için', 'Token tasarrufu için', 'Türkçe için'], 1, 'Talimata uyulmazsa arama kalitesi düşer.'),
      q('Ölçüm', 'İki embedding modelinden hangisinin senin verinde daha iyi olduğunu anlamanın en güvenilir yolu nedir?', ['Daha popüler olanı seçmek', 'Kendi soru-belge setinle doğru belgenin ilk k sonuçta kaç kez çıktığını ölçmek', 'Daha büyük olanı seçmek', 'Rastgele seçmek'], 1, 'Kendi verinle yapılan küçük bir değerlendirme, genel sıralamalardan daha belirleyicidir.')
    ]
  }
];
