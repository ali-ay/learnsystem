/**
 * AI Uzmanlığı — Aşama 3: RAG uygulamaları (mimari, vektör DB, LangChain, LlamaIndex, değerlendirme).
 * Imported with: npm run content:ai-s3
 *
 * Library code targets LangChain 0.3 / LlamaIndex 0.12-era package layouts; both libraries
 * move fast, so the lessons tell learners to pin versions.
 */

import { goal, h, p, table, code, task, why, mistakes, q, qc } from './lessonHtml.js';

export const STAGE_ID = 'ai-s3';

export const STAGE = {
  trackId: 'ai',
  name: 'Aşama 3: RAG Uygulamaları — Mimari, Vektör DB, LangChain, LlamaIndex',
  shortName: 'Aşama 3: RAG Uygulamaları',
  color: 'var(--accent-amber)',
  folder: 'ai-s3-rag',
  sortOrder: 2
};

export const LESSONS = [
  // 1 ────────────────────────────────────────────────────────────────────────
  {
    id: 'ai-s3-01',
    title: 'RAG Mimarisi: Uçtan Uca Akış',
    duration: '50 dk',
    description: 'İndeksleme ve sorgu hatları, parçalama (chunking), prompt şablonu ve kaynak gösterme; kütüphanesiz minimal RAG.',
    deepDive: [
      goal('Bir RAG sisteminin iki hattını (indeksleme ve sorgu) çizebilir, belgeleri doğru parçalayabilir ve hiçbir framework kullanmadan çalışan minimal bir RAG yazabilirsin.'),
      why('İlanın tek zorunlu maddesi "RAG tabanlı bir uygulamayı geliştirmiş ve çalıştırmış olmak". LangChain ve LlamaIndex bu akışı kolaylaştırır, ama mülakatta ve hata ayıklarken akışın kendisini bilmen beklenir.'),
      h('1. Neden RAG?'),
      p('LLM şirket belgelerini ve güncel veriyi bilmez. Modeli yeniden eğitmek (fine-tuning) pahalıdır, yavaştır ve bilgiyi güncel tutmaz. RAG (Retrieval-Augmented Generation) soru geldiğinde <strong>ilgili belge parçalarını bulur</strong>, prompt\'a ekler ve modelden <strong>bu kaynaklara dayanarak</strong> yanıt ister. Belge güncellenince sadece indeks güncellenir.'),
      h('2. İki hat'),
      table(['İndeksleme (önceden, toplu)', 'Sorgu (her soruda)'], [
        ['1. Yükle: PDF, Word, wiki, e-posta, ERP raporları', '1. Soruyu aynı embedding modeliyle vektöre çevir'],
        ['2. Temizle: üst bilgi, alt bilgi, tekrar eden metinler', '2. En benzer k parçayı getir (gerekirse filtreyle)'],
        ['3. Parçala (chunk) + meta veri ekle (kaynak, sayfa, tarih, departman)', '3. Parçaları prompt şablonuna yerleştir'],
        ['4. Her parçayı vektöre çevir', '4. LLM yanıtı üretir'],
        ['5. Vektör veritabanına yaz', '5. Yanıtla birlikte kaynakları göster']
      ]),
      h('3. Parçalama (chunking)'),
      p('Belge bütün olarak vektörleştirilmez: hem modelin girdi sınırı vardır hem de uzun metnin vektörü "her şeyi biraz" temsil eder. Belgeler anlamlı parçalara bölünür.'),
      table(['Ayar', 'Etkisi', 'Başlangıç değeri'], [
        ['Parça boyutu', 'Küçük → isabetli ama bağlamsız; büyük → bağlamlı ama gürültülü', '300–800 token civarı'],
        ['Örtüşme (overlap)', 'Parça sınırında bölünen cümle kaybolmasın', 'Boyutun %10–20\'si'],
        ['Bölme sınırı', 'Başlık, paragraf, cümle sınırlarına saygı', 'Önce yapıya göre, sonra boyuta göre böl'],
        ['Meta veri', 'Kaynak gösterme ve filtreleme (departman, tarih, yetki)', 'Her parçada kaynak + konum']
      ]),
      h('4. Prompt şablonu'),
      code(`
SYSTEM = """Şirket içi bilgi asistanısın.
Yalnızca aşağıdaki BAĞLAM'daki bilgilere dayanarak yanıt ver.
Bağlamda yanıt yoksa "Bu bilgi belgelerde yok." de.
Her bilginin sonuna kaynağını [dosya, sayfa] biçiminde ekle."""

def build_prompt(question, chunks):
    context = "\\n\\n".join(
        f"[{c['source']}, s.{c['page']}]\\n{c['text']}" for c in chunks
    )
    return [
        {"role": "system", "content": SYSTEM},
        {"role": "user", "content": f"BAĞLAM:\\n{context}\\n\\nSORU: {question}"},
    ]`, 'python'),
      h('5. Kütüphanesiz minimal RAG'),
      code(`
from sentence_transformers import SentenceTransformer
from openai import OpenAI
import numpy as np, os

embedder = SentenceTransformer("BAAI/bge-m3")
llm = OpenAI(base_url=os.environ["LLM_BASE_URL"], api_key=os.environ["LLM_API_KEY"])

def chunk(text, size=800, overlap=120):           # karakter bazlı basit parçalama
    step = size - overlap
    return [text[i:i + size] for i in range(0, len(text), step)]

# --- indeksleme ---
chunks = []
for path in ["satinalma_proseduru.txt", "seyahat_politikasi.txt"]:
    text = open(path, encoding="utf-8").read()
    for i, part in enumerate(chunk(text)):
        chunks.append({"source": path, "page": i + 1, "text": part})
vectors = embedder.encode([c["text"] for c in chunks], normalize_embeddings=True)

# --- sorgu ---
def ask(question, k=4):
    qv = embedder.encode(question, normalize_embeddings=True)
    top = np.argsort(vectors @ qv)[::-1][:k]
    messages = build_prompt(question, [chunks[i] for i in top])
    resp = llm.chat.completions.create(model="llama3.1:8b", temperature=0.1, messages=messages)
    return resp.choices[0].message.content

print(ask("10.000 TL üzeri satın alımlarda kimin onayı gerekir?"))`, 'python'),
      p('Bu 30 satırlık kod RAG\'in özüdür. Gerçek sistemde vektörler bellekte değil bir <strong>vektör veritabanında</strong> durur (sonraki ders), parçalama yapıya duyarlı olur ve arama hibrit hale gelir.'),
      task('Kendi alanından 3–5 belgeyle yukarıdaki minimal RAG\'i çalıştır. 10 soru sor; her yanıtta getirilen parçaları da yazdır. Yanlış yanıtların ne kadarı <em>yanlış parça getirildiği</em> için, ne kadarı <em>doğru parça geldiği halde modelin yanlış yorumladığı</em> için oldu? Bu ayrım, RAG hata ayıklamanın temelidir.'),
      h('Sık yapılan hatalar'),
      mistakes([
        ['Belgeyi tek parça vektörleştirmek', 'Anlamlı parçalara böl', 'Uzun metnin vektörü belirsizleşir, isabet düşer.'],
        ['Meta veri tutmamak', 'Kaynak, sayfa, tarih, yetki bilgisi', 'Kaynak gösterilemez, yetki filtrelenemez.'],
        ['"Bağlamda yoksa söyle" kuralı olmadan prompt', 'Açık reddetme kuralı', 'Model boşluğu kendi bilgisiyle doldurur.'],
        ['Sadece son yanıta bakarak hata ayıklamak', 'Getirilen parçaları da logla', 'Sorunun bulmada mı üretimde mi olduğu anlaşılamaz.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Getirileni logla', text: 'Her soruda hangi parçaların getirildiğini ve skorlarını kaydet; RAG hatalarının çoğu bulma aşamasındadır.' },
      { type: 'good', title: 'Kaynak göster', text: 'Kullanıcı yanıtı doğrulayabilmeli; kaynak gösterimi güveni ve denetlenebilirliği artırır.' },
      { type: 'bad', title: 'Fine-tuning ile bilgi öğretmeye çalışmak', text: 'Sık değişen şirket bilgisi için RAG; fine-tuning üslup ve görev biçimi içindir.' }
    ],
    questions: [
      q('Kavram', 'RAG\'in açılımındaki "Retrieval" adımı ne yapar?', ['Modeli yeniden eğitir', 'Soruyla ilgili belge parçalarını bulur', 'Yanıtı çevirir', 'GPU\'yu hazırlar'], 1, 'Retrieval = ilgili bilgiyi getirme.'),
      q('Kavram', 'Sık güncellenen şirket prosedürleri için hangisi daha uygundur?', ['Modeli her hafta fine-tune etmek', 'RAG ile belgeleri indekslemek', 'Prompt\'a tüm belgeleri her seferinde eklemek', 'Daha büyük model seçmek'], 1, 'RAG\'de belge değişince sadece indeks güncellenir.'),
      q('Akış', 'Hangisi indeksleme hattına aittir, sorgu hattına değil?', ['Soruyu vektöre çevirmek', 'Belgeleri parçalayıp vektör veritabanına yazmak', 'LLM\'den yanıt almak', 'Kaynakları kullanıcıya göstermek'], 1, 'Parçalama ve yazma önceden, toplu olarak yapılır.'),
      q('Parçalama', 'Parçalar arasında örtüşme (overlap) bırakmanın amacı nedir?', ['Depolamayı azaltmak', 'Sınırda bölünen cümle ve bağlamın kaybolmaması', 'Aramayı yavaşlatmak', 'Token maliyetini sıfırlamak'], 1, 'Örtüşme, iki parçaya bölünen bilginin en az birinde bütün kalmasını sağlar.'),
      q('Parçalama', 'Parçalar çok büyük seçilirse ne olur?', ['İsabet artar', 'Vektör çok konuyu karıştırır, gürültü artar ve bağlam penceresi hızla dolar', 'Hiçbir etkisi olmaz', 'Model daha hızlı yanıt verir'], 1, 'Büyük parça birden çok konuyu temsil eder; arama isabeti düşer.'),
      q('Meta veri', 'Parçalara "departman" ve "gizlilik seviyesi" meta verisi eklemek neyi mümkün kılar?', ['Daha hızlı GPU', 'Aramayı yetkiye ve departmana göre filtrelemek', 'Daha kısa yanıtlar', 'Embedding modelini değiştirmek'], 1, 'Meta veri filtresi, kullanıcının görmemesi gereken parçaların getirilmesini engeller.'),
      qc('Kod', 'Bu satır ne yapar?', 'top = np.argsort(vectors @ qv)[::-1][:k]', ['En az benzer k parçayı seçer', 'Benzerliği en yüksek k parçanın indekslerini seçer', 'Vektörleri normalize eder', 'Parçaları siler'], 1, 'Skorlar küçükten büyüğe sıralanır, [::-1] ters çevirir, [:k] ilk k tanesini alır.'),
      q('Prompt', 'RAG sistem promptundaki "Bağlamda yanıt yoksa bunu söyle" kuralının amacı nedir?', ['Yanıtları kısaltmak', 'Modelin boşluğu kendi bilgisiyle doldurup uydurmasını engellemek', 'Token sayısını artırmak', 'Kaynakları gizlemek'], 1, 'Açık reddetme kuralı halüsinasyonu azaltır.'),
      q('Hata ayıklama', 'RAG yanlış yanıt verdi. İlk bakılması gereken şey nedir?', ['GPU sıcaklığı', 'Getirilen parçalarda doğru bilginin olup olmadığı', 'Python sürümü', 'Kullanıcının yazım hataları'], 1, 'Doğru parça getirilmediyse sorun bulma aşamasındadır; LLM\'i değiştirmek çözmez.'),
      q('Kaynak', 'Yanıtla birlikte kaynak göstermenin kurumsal ortamdaki en önemli faydası nedir?', ['Yanıtı uzatmak', 'Kullanıcının yanıtı doğrulayabilmesi ve denetlenebilirlik', 'Daha az token', 'Modelin daha hızlı çalışması'], 1, 'Kaynak gösterimi güveni ve denetimi sağlar.')
    ]
  },

  // 2 ────────────────────────────────────────────────────────────────────────
  {
    id: 'ai-s3-02',
    title: 'Vektör Veritabanları: pgvector, Qdrant, Chroma',
    duration: '50 dk',
    description: 'Yaklaşık en yakın komşu araması, HNSW, mesafe ölçüleri, meta veri filtresi ve pgvector ile uygulama.',
    deepDive: [
      goal('Bir vektör veritabanının ne işe yaradığını açıklayabilir, pgvector ile tablo, indeks ve benzerlik sorgusu yazabilir, proje ihtiyacına göre pgvector, Qdrant, Chroma ve Milvus arasında seçim yapabilirsin.'),
      why('İlanda "vektör veritabanları" tercih sebebi olarak geçiyor. Ayrıca şirketlerin çoğu zaten PostgreSQL kullandığı için pgvector, yeni bir altyapı kurmadan RAG\'e geçmenin en pratik yoludur.'),
      h('1. Ne çözüyor?'),
      p('Milyonlarca vektör arasında soruya en yakın olanları tek tek karşılaştırarak bulmak (brute force) yavaştır. Vektör veritabanları <strong>yaklaşık en yakın komşu (ANN)</strong> indeksleriyle çok küçük bir isabet kaybı karşılığında aramayı büyük ölçüde hızlandırır. En yaygın indeks <strong>HNSW</strong>\'dir (katmanlı bir benzerlik grafiği).'),
      table(['HNSW ayarı', 'Etkisi'], [
        ['m', 'Her düğümün bağlantı sayısı: büyük → daha isabetli, daha çok bellek'],
        ['ef_construction', 'İndeks kurarken arama genişliği: büyük → daha iyi indeks, daha yavaş kurulum'],
        ['ef_search', 'Sorgu anında arama genişliği: büyük → daha isabetli, daha yavaş sorgu']
      ]),
      h('2. Mesafe ölçüleri'),
      p('Embedding modelinin önerdiği ölçüyü kullan; çoğu metin modeli için <strong>kosinüs</strong>. Normalize vektörlerde kosinüs, iç çarpım ve öklid mesafesi aynı sıralamayı verir.'),
      h('3. pgvector ile uygulama'),
      code(`
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE chunks (
  id          bigserial PRIMARY KEY,
  source      text NOT NULL,
  page        int,
  department  text,
  content     text NOT NULL,
  embedding   vector(1024)          -- bge-m3 çıktı boyutu
);

-- Kosinüs mesafesi için HNSW indeksi
CREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops);

-- En yakın 5 parça, sadece satın alma departmanı
SELECT source, page, content, 1 - (embedding <=> $1) AS similarity
FROM chunks
WHERE department = 'satinalma'
ORDER BY embedding <=> $1          -- <=> kosinüs mesafesi
LIMIT 5;`, 'sql'),
      table(['Operatör', 'Anlamı'], [
        ['<code>&lt;=&gt;</code>', 'Kosinüs mesafesi (1 − benzerlik)'],
        ['<code>&lt;-&gt;</code>', 'Öklid (L2) mesafesi'],
        ['<code>&lt;#&gt;</code>', 'Negatif iç çarpım']
      ]),
      p('pgvector\'ün büyük avantajı: vektör araması ile normal SQL (JOIN, WHERE, yetki tabloları, transaction) <strong>aynı sorguda</strong> birleşir. Ayrıca Postgres\'in tam metin araması (<code>tsvector</code>) ile aynı veritabanında hibrit arama kurulabilir.'),
      h('4. Seçenekleri karşılaştır'),
      table(['Araç', 'Güçlü yanı', 'Ne zaman?'], [
        ['pgvector', 'Mevcut PostgreSQL içinde; SQL, yetki ve yedekleme hazır', 'Şirket zaten Postgres kullanıyorsa, milyonlarca vektöre kadar'],
        ['Qdrant', 'Hızlı, güçlü meta veri filtreleri, hibrit arama, Docker ile kolay kurulum', 'Ayrı, ölçeklenebilir bir vektör servisi istendiğinde'],
        ['Chroma', 'Çok kolay başlangıç, gömülü çalışabilir', 'Prototip ve küçük projeler'],
        ['Milvus / Weaviate', 'Çok büyük ölçek, dağıtık kurulum', 'Yüz milyonlarca vektör, büyük ekipler']
      ]),
      code(`
docker run -d --name qdrant -p 6333:6333 \\
  -v qdrant_data:/qdrant/storage qdrant/qdrant`, 'bash'),
      h('5. Üretim için dikkat'),
      p('Belge güncellenince eski parçaları silip yenilerini yazmak için her parçada <strong>belge kimliği ve sürüm</strong> tut. Embedding modeli değişirse tüm koleksiyonu yeniden oluştur. Vektör boyutu × sayı × 4 bayt (float32) ile depolama ihtiyacını önceden hesapla: 1 milyon × 1024 boyut ≈ 4 GB (indeks hariç).'),
      task('Önceki dersteki minimal RAG\'in bellekteki vektörlerini pgvector\'e taşı: Docker ile <code>pgvector/pgvector</code> image\'ını çalıştır, tabloyu ve HNSW indeksini oluştur, parçaları <code>psycopg</code> ile yaz ve sorgu fonksiyonunu SQL\'e çevir. Bir <code>department</code> filtresi ekleyip sonuçların değiştiğini gözlemle.'),
      h('Sık yapılan hatalar'),
      mistakes([
        ['vector(768) tablo, 1024 boyutlu model', 'Boyut model çıktısıyla aynı', 'Ekleme hatası verir ya da yanlış model kullanıldığını gösterir.'],
        ['İndekste kosinüs, sorguda <-> operatörü', 'İndeks ops ile operatör eşleşmeli', 'Eşleşmezse indeks kullanılmaz, sorgu yavaşlar.'],
        ['Belge güncellenince eski parçaları bırakmak', 'Belge kimliğiyle sil + yeniden yaz', 'Eski ve yeni bilgi çelişir.'],
        ['Yetki filtresini LLM\'e bırakmak', 'WHERE ile veritabanında filtrele', 'Model, görmemesi gereken veriyi zaten görmüş olur.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Filtre veritabanında', text: 'Departman, tarih ve yetki filtrelerini vektör sorgusunun WHERE kısmında uygula.' },
      { type: 'good', title: 'Önce mevcut altyapı', text: 'Postgres varsa pgvector ile başla; ölçek ya da özellik gerekince ayrı vektör veritabanına geç.' },
      { type: 'bad', title: 'Modeli sessizce değiştirmek', text: 'Embedding modeli değişince koleksiyonu baştan oluştur; eski ve yeni vektörler karışmamalı.' }
    ],
    questions: [
      q('Kavram', 'Vektör veritabanının temel görevi nedir?', ['Metin üretmek', 'Bir vektöre en yakın vektörleri hızlı bulmak', 'GPU yönetmek', 'PDF okumak'], 1, 'Vektör veritabanları benzerlik aramasını hızlandırır.'),
      q('ANN', 'ANN (yaklaşık en yakın komşu) indekslerinin takası nedir?', ['Daha fazla doğruluk, daha yavaş arama', 'Çok küçük isabet kaybı karşılığında çok daha hızlı arama', 'Daha az bellek, daha fazla hata', 'Hiçbir takas yoktur'], 1, 'ANN, kesin aramaya göre biraz isabetten vazgeçerek hız kazanır.'),
      q('HNSW', 'HNSW\'de ef_search değerini artırmak neye yol açar?', ['Daha hızlı ama daha az isabetli sorgu', 'Daha isabetli ama daha yavaş sorgu', 'Daha küçük indeks', 'Vektör boyutunun artması'], 1, 'Sorgu anında daha geniş arama yapılır.'),
      qc('pgvector', 'Bu sorgudaki <=> operatörü neyi hesaplar?', 'ORDER BY embedding <=> $1 LIMIT 5', ['Öklid mesafesi', 'Kosinüs mesafesi', 'Metin benzerliği', 'Tarih farkı'], 1, 'pgvector\'de <=> kosinüs mesafesidir; küçük değer = daha benzer.'),
      qc('pgvector', 'bge-m3 (1024 boyut) kullanılıyorsa bu sütun nasıl tanımlanmalı?', 'embedding vector(?)', ['vector(768)', 'vector(1024)', 'vector(384)', 'Boyut önemli değil'], 1, 'Sütun boyutu embedding modelinin çıktı boyutuyla aynı olmalıdır.'),
      q('pgvector', 'pgvector\'ün en büyük pratik avantajı nedir?', ['GPU gerektirmesi', 'Vektör aramasını SQL filtreleri, JOIN\'ler ve mevcut Postgres altyapısıyla birleştirmesi', 'Sadece Python ile çalışması', 'Embedding üretmesi'], 1, 'Yeni bir altyapı kurmadan RAG\'e geçilebilir.'),
      q('Seçim', 'Hızlı bir prototip için en kolay başlangıç seçeneği hangisidir?', ['Milvus kümesi', 'Chroma', 'Elle yazılmış C kodu', 'Excel'], 1, 'Chroma birkaç satırla, gömülü olarak çalışabilir.'),
      q('Filtre', 'Kullanıcının yalnızca kendi departmanının belgelerini görmesi nasıl sağlanmalı?', ['Prompt\'a "başka departmanı söyleme" yazmak', 'Vektör sorgusunda WHERE department = ... filtresi uygulamak', 'Daha küçük bir model kullanmak', 'temperature değerini düşürmek'], 1, 'Yetki filtresi veritabanında uygulanmalı; model o veriyi hiç görmemeli.'),
      q('Kapasite', '1 milyon parça, 1024 boyutlu float32 vektörler için ham depolama yaklaşık ne kadardır?', ['4 MB', '400 MB', '4 GB', '400 GB'], 2, '1.000.000 × 1024 × 4 bayt ≈ 4,1 GB (indeks hariç).'),
      q('Bakım', 'Bir belge güncellendiğinde doğru yaklaşım hangisidir?', ['Yeni parçaları eklemek, eskileri bırakmak', 'Belge kimliğine göre eski parçaları silip yenilerini yazmak', 'Tüm veritabanını silmek', 'Hiçbir şey yapmamak'], 1, 'Eski parçalar kalırsa çelişkili bilgi getirilir.')
    ]
  },

  // 3 ────────────────────────────────────────────────────────────────────────
  {
    id: 'ai-s3-03',
    title: 'LangChain ile RAG',
    duration: '55 dk',
    description: 'Loader, text splitter, embedding, vector store, retriever, prompt ve LCEL zinciri; yerel Ollama ile uçtan uca örnek.',
    deepDive: [
      goal('LangChain\'in RAG bileşenlerini tanıyabilir, LCEL ile bir RAG zinciri kurabilir ve bu zinciri yerel bir model ile çalıştırabilirsin.'),
      why('İlan "LangChain, LlamaIndex veya benzeri araçlarla RAG" diyor. LangChain bu alandaki en yaygın framework\'tür; çok sayıda veri kaynağı, vektör veritabanı ve model için hazır bağlayıcıları vardır.'),
      h('1. Bileşenler'),
      table(['Bileşen', 'Görevi', 'Örnek sınıf'], [
        ['Document loader', 'Kaynaktan belge okur', 'PyPDFLoader, TextLoader, WebBaseLoader'],
        ['Text splitter', 'Belgeleri parçalar', 'RecursiveCharacterTextSplitter'],
        ['Embeddings', 'Metni vektöre çevirir', 'OllamaEmbeddings, HuggingFaceEmbeddings'],
        ['Vector store', 'Vektörleri saklar ve arar', 'Chroma, PGVector, Qdrant'],
        ['Retriever', 'Soruya göre parça getirir', 'vectorstore.as_retriever()'],
        ['Prompt + LLM + parser', 'Yanıtı üretir ve metne çevirir', 'ChatPromptTemplate, ChatOllama, StrOutputParser']
      ]),
      p('LangChain paketlere bölünmüştür: <code>langchain-core</code> (temel arayüzler), <code>langchain-text-splitters</code>, entegrasyon paketleri (<code>langchain-ollama</code>, <code>langchain-chroma</code>, <code>langchain-postgres</code>…) ve <code>langchain-community</code>. API sık değiştiği için <strong>sürümleri requirements.txt\'te sabitle</strong>.'),
      h('2. Uçtan uca örnek'),
      code(`
pip install langchain-core langchain-community langchain-text-splitters \\
            langchain-ollama langchain-chroma pypdf`, 'bash'),
      code(`
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama import OllamaEmbeddings, ChatOllama
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# 1) Yükle ve parçala
docs = PyPDFLoader("satinalma_proseduru.pdf").load()          # sayfa başına bir Document
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
chunks = splitter.split_documents(docs)                         # metadata: source, page

# 2) Vektörleştir ve sakla
embeddings = OllamaEmbeddings(model="bge-m3")
store = Chroma.from_documents(chunks, embeddings, persist_directory="./chroma")
retriever = store.as_retriever(search_kwargs={"k": 4})

# 3) Prompt + model
prompt = ChatPromptTemplate.from_messages([
    ("system", "Yalnızca bağlama dayanarak Türkçe yanıt ver. Bağlamda yoksa 'Bu bilgi belgelerde yok.' de."),
    ("human", "Bağlam:\\n{context}\\n\\nSoru: {question}"),
])
llm = ChatOllama(model="llama3.1:8b", temperature=0.1)

def format_docs(docs):
    return "\\n\\n".join(f"[s.{d.metadata.get('page')}] {d.page_content}" for d in docs)

# 4) LCEL zinciri
chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)
print(chain.invoke("Acil satın alımlarda onay süreci nasıl işler?"))`, 'python'),
      h('3. LCEL nasıl okunur?'),
      p('<code>|</code> operatörü bir adımın çıktısını sonrakine aktarır. İlk adımdaki sözlük paralel çalışır: soru hem <code>retriever</code>\'a gider (parçalar <code>format_docs</code> ile metne döner) hem de <code>RunnablePassthrough</code> ile olduğu gibi <code>question</code> alanına geçer. Her zincir <code>invoke</code>, <code>batch</code> ve <code>stream</code> metodlarını destekler.'),
      h('4. Kaynakları yanıtla birlikte döndürmek'),
      p('Kullanıcıya kaynak göstermek için getirilen belgeleri de çıktıda tutmak gerekir. Basit yol: önce <code>retriever.invoke(soru)</code> ile parçaları al, sonra zinciri bu parçalarla çağır ve yanıtla birlikte <code>metadata</code> bilgisini döndür. Böylece hem kaynak listesi hem hata ayıklama için getirilen parçalar elinde olur.'),
      h('5. Ne zaman framework, ne zaman sade kod?'),
      p('LangChain bağlayıcılar ve hızlı prototip için güçlüdür. Ama soyutlama katmanları hata ayıklamayı zorlaştırabilir. Yaygın yaklaşım: yükleme, parçalama ve vektör deposu bağlayıcıları için LangChain\'i kullanmak, akışın kritik kısmını (prompt, filtreleme, yetki) açık ve okunabilir tutmak.'),
      task('Kendi belgelerinle yukarıdaki zinciri kur. Ardından iki iyileştirme ekle: (1) yanıtla birlikte kaynak sayfaları döndür, (2) Chroma yerine önceki derste kurduğun pgvector\'ü <code>langchain-postgres</code> paketindeki PGVector ile kullan. Aynı 10 soruyla iki sürümün yanıtlarını karşılaştır.'),
      h('Sık yapılan hatalar'),
      mistakes([
        ['Eski blog yazısındaki import yolları', 'Güncel paket yapısı + sabit sürüm', 'LangChain modülleri sık taşınır; eski örnekler çalışmaz.'],
        ['Her çalıştırmada tüm belgeleri yeniden vektörleştirmek', 'persist_directory / kalıcı vektör deposu', 'Gereksiz maliyet ve bekleme.'],
        ['chunk_overlap = 0', 'Boyutun %10–20\'si kadar örtüşme', 'Sınırda bölünen bilgi kaybolur.'],
        ['Getirilen belgeleri atmak', 'Yanıtla birlikte kaynakları döndür', 'Kaynak gösterilemez, hata ayıklanamaz.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Sürümleri sabitle', text: 'langchain-* paketlerini requirements.txt\'te sürümüyle yaz; güncellemeyi bilinçli yap.' },
      { type: 'good', title: 'Model sağlayıcıdan bağımsız kal', text: 'ChatOllama yerine ChatOpenAI(base_url=...) ile gateway üzerinden çağırmak, modeli değiştirmeyi kolaylaştırır.' },
      { type: 'bad', title: 'Kara kutu zincir', text: 'Getirilen parçaları ve son prompt\'u loglamadan üretime çıkma.' }
    ],
    questions: [
      q('Bileşen', 'LangChain\'de belgeleri parçalara bölen bileşen hangisidir?', ['Retriever', 'Text splitter', 'Output parser', 'Document loader'], 1, 'RecursiveCharacterTextSplitter gibi text splitter\'lar parçalama yapar.'),
      q('Bileşen', 'Retriever\'ın görevi nedir?', ['PDF okumak', 'Soruya göre ilgili parçaları getirmek', 'Yanıtı metne çevirmek', 'Modeli eğitmek'], 1, 'Retriever, vektör deposunda arama yapıp ilgili belgeleri döndürür.'),
      qc('Splitter', 'Bu ayarlarla her parça yaklaşık ne kadar olur ve komşu parçalar ne kadar örtüşür?', 'RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)', ['1000 token, 150 token', 'En fazla 1000 karakter, 150 karakter örtüşme', '1000 sayfa, 150 sayfa', '1000 kelime, örtüşme yok'], 1, 'Varsayılan uzunluk ölçüsü karakterdir; token bazlı ölçüm ayrıca ayarlanabilir.'),
      qc('LCEL', 'Bu zincirde | operatörü ne yapar?', 'chain = prompt | llm | StrOutputParser()', ['Mantıksal VEYA', 'Bir adımın çıktısını sonraki adıma girdi olarak verir', 'Paralel çalıştırır', 'Hata yakalar'], 1, 'LCEL\'de | adımları birbirine bağlar (pipe).'),
      qc('LCEL', 'RunnablePassthrough() burada ne işe yarar?', '{"context": retriever | format_docs, "question": RunnablePassthrough()}', ['Soruyu siler', 'Girdiyi (soruyu) değiştirmeden question alanına aktarır', 'Belgeleri formatlar', 'Modeli çağırır'], 1, 'Aynı girdi hem retriever\'a gider hem de olduğu gibi prompt\'a aktarılır.'),
      q('Kalıcılık', 'Chroma.from_documents(..., persist_directory="./chroma") kullanmanın faydası nedir?', ['Daha iyi yanıt', 'Vektörler diske yazılır; her çalıştırmada yeniden hesaplanmaz', 'GPU kullanır', 'Belgeleri şifreler'], 1, 'Kalıcı depo, indekslemeyi bir kere yapmayı sağlar.'),
      q('Paketler', 'Bir LangChain örneği "module not found" hatası veriyor. En olası neden nedir?', ['Python bozuk', 'Örnek eski sürüme göre yazılmış; modüller farklı paketlere taşınmış', 'GPU yok', 'Türkçe karakter'], 1, 'LangChain paket yapısı sık değişir; güncel dokümantasyon ve sabit sürüm kullanılmalı.'),
      q('Kaynak', 'Yanıtla birlikte kaynak sayfa numaralarını göstermek için hangi bilgi gerekir?', ['Modelin parametre sayısı', 'Getirilen Document nesnelerinin metadata alanı (source, page)', 'Embedding boyutu', 'temperature'], 1, 'Loader\'ların eklediği metadata kaynak gösterimi için kullanılır.'),
      q('Esneklik', 'Aynı zinciri hem yerel modelle hem gateway üzerinden buluttaki modelle çalıştırmanın kolay yolu hangisidir?', ['Her model için ayrı kod yazmak', 'OpenAI uyumlu istemciyi (ChatOpenAI) base_url ile kullanmak', 'Zinciri silmek', 'Embedding modelini değiştirmek'], 1, 'OpenAI uyumlu uç nokta, sağlayıcıyı tek ayarla değiştirmeyi sağlar.'),
      q('Hata ayıklama', 'Üretimde bir LangChain RAG zincirini izlerken en değerli log hangisidir?', ['Sadece son yanıt', 'Soru, getirilen parçalar (skorlarıyla), son prompt ve yanıt', 'CPU sıcaklığı', 'Kullanıcının IP adresi'], 1, 'Hatanın bulma mı üretim mi kaynaklı olduğunu bu bilgilerle ayırt edersin.')
    ]
  },

  // 4 ────────────────────────────────────────────────────────────────────────
  {
    id: 'ai-s3-04',
    title: 'LlamaIndex ile RAG',
    duration: '50 dk',
    description: 'Document, Node, VectorStoreIndex, query engine, Settings, kalıcı depolama ve LangChain ile karşılaştırma.',
    deepDive: [
      goal('LlamaIndex\'in temel kavramlarını tanıyabilir, birkaç satırla bir belge klasörünü sorgulanabilir hale getirebilir, indeksi kalıcı hale getirebilir ve LangChain ile LlamaIndex arasında bilinçli seçim yapabilirsin.'),
      why('İlanda LangChain ile birlikte açıkça geçiyor. LlamaIndex veri odaklıdır: belge yükleme, parçalama, indeksleme ve sorgulama için güçlü varsayılanlar sunar. Belge ağırlıklı kurumsal RAG projelerinde sık tercih edilir.'),
      h('1. Kavramlar'),
      table(['Kavram', 'Anlamı'], [
        ['Document', 'Bir kaynaktan okunan ham belge (metin + metadata)'],
        ['Node', 'Document\'tan çıkarılan parça; LlamaIndex\'in "chunk" karşılığı'],
        ['Index', 'Node\'ların aranabilir yapısı; en yaygını VectorStoreIndex'],
        ['Retriever', 'Soruya göre Node getirir'],
        ['Query engine', 'Retriever + yanıt üretimi: soru gir, kaynaklı yanıt al'],
        ['Settings', 'Varsayılan LLM, embedding modeli ve parçalama ayarlarının tutulduğu global yapılandırma']
      ]),
      h('2. Uçtan uca örnek'),
      code(`
pip install llama-index-core llama-index-llms-ollama llama-index-embeddings-huggingface`, 'bash'),
      code(`
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.core.node_parser import SentenceSplitter
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

Settings.llm = Ollama(model="llama3.1:8b", request_timeout=120.0, temperature=0.1)
Settings.embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-m3")
Settings.node_parser = SentenceSplitter(chunk_size=512, chunk_overlap=64)

documents = SimpleDirectoryReader("./belgeler").load_data()   # PDF, DOCX, TXT, MD...
index = VectorStoreIndex.from_documents(documents)

query_engine = index.as_query_engine(similarity_top_k=4)
response = query_engine.query("Yurt dışı seyahatlerde günlük harcırah ne kadar?")

print(response)                                # yanıt
for node in response.source_nodes:             # kaynaklar
    print(node.score, node.metadata.get("file_name"), node.text[:80])`, 'python'),
      p('Burada parçalama, vektörleştirme, saklama ve prompt şablonu varsayılanlarla otomatik yapıldı. <code>response.source_nodes</code> kaynak göstermeyi ve hata ayıklamayı kolaylaştırır.'),
      h('3. Kalıcı depolama ve harici vektör DB'),
      code(`
from llama_index.core import StorageContext, load_index_from_storage

index.storage_context.persist(persist_dir="./storage")          # kaydet

storage = StorageContext.from_defaults(persist_dir="./storage")  # sonra yükle
index = load_index_from_storage(storage)`, 'python'),
      p('Üretimde varsayılan bellek içi depo yerine pgvector, Qdrant ya da Chroma gibi bir vektör veritabanı kullanılır; LlamaIndex bunlar için <code>llama-index-vector-stores-*</code> entegrasyon paketleri sunar. Ayrıca prompt şablonlarını Türkçe ve "bağlamda yoksa söyle" kuralıyla özelleştirmek gerekir.'),
      h('4. LangChain mı, LlamaIndex mi?'),
      table(['', 'LangChain', 'LlamaIndex'], [
        ['Odak', 'Genel LLM uygulamaları, zincirler, araçlar, ajanlar', 'Veri yükleme, indeksleme ve sorgulama'],
        ['RAG\'e başlangıç', 'Bileşenleri tek tek birleştirirsin', 'Güçlü varsayılanlarla birkaç satır'],
        ['Kontrol', 'Akış açıkça senin elinde', 'Varsayılanları anlamak ve özelleştirmek gerekir'],
        ['Birlikte', 'İkisi aynı projede birlikte de kullanılabilir', '']
      ]),
      p('Mülakatta "hangisi daha iyi" sorusuna doğru cevap ihtiyaçla başlar: belge ağırlıklı bir arama asistanı için LlamaIndex hızlı sonuç verir; araç çağırma, çok adımlı akışlar ve farklı sistemlerle entegrasyon ağırlıktaysa LangChain (ya da LangGraph) öne çıkar.'),
      task('Aynı belge klasörünü LlamaIndex ile indeksle ve LangChain dersindeki 10 soruyu sor. Her yanıt için kaynak dosya adlarını yazdır. İki framework\'ün doğru kaynağı getirme oranını ve yanıt kalitesini karşılaştıran kısa bir not yaz: hangisinde neyi özelleştirmen gerekti?'),
      h('Sık yapılan hatalar'),
      mistakes([
        ['Settings.embed_model ayarlamamak', 'Embedding modelini açıkça seç', 'Varsayılan model bulut API\'sine gidebilir ya da Türkçede zayıf olabilir.'],
        ['Her açılışta yeniden indekslemek', 'persist + load_index_from_storage ya da vektör DB', 'Büyük belge setlerinde dakikalar ya da saatler kaybedilir.'],
        ['Varsayılan İngilizce prompt şablonu', 'Türkçe, kurallı özel şablon', 'Yanıt dili ve reddetme davranışı tutarsız olur.'],
        ['source_nodes\'a bakmamak', 'Kaynakları logla ve göster', 'Yanlış yanıtın nedeni anlaşılamaz.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Varsayılanları bil', text: 'LlamaIndex\'in parçalama ve prompt varsayılanlarını kontrol et; Türkçe ve kurumsal kurallar için özelleştir.' },
      { type: 'good', title: 'Kaynaklı yanıt', text: 'response.source_nodes ile skorları ve dosya adlarını göster.' },
      { type: 'bad', title: 'Gizli dış çağrılar', text: 'LLM ve embedding modelini açıkça ayarlamazsan varsayılan bir bulut servisine istek gidebilir; şirket verisi için kabul edilemez.' }
    ],
    questions: [
      q('Kavram', 'LlamaIndex\'te "Node" neyi ifade eder?', ['Bir sunucuyu', 'Bir Document\'tan çıkarılan parçayı', 'Bir GPU\'yu', 'Bir kullanıcıyı'], 1, 'Node, LlamaIndex\'in chunk karşılığıdır.'),
      q('Kavram', 'Query engine ne yapar?', ['Sadece belge okur', 'Soru alır; ilgili Node\'ları getirip kaynaklı yanıt üretir', 'Veritabanı yedekler', 'Modeli eğitir'], 1, 'Query engine retriever ve yanıt üretimini birleştirir.'),
      qc('Settings', 'Bu satırın etkisi nedir?', 'Settings.embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-m3")', ['Sadece bu sorgu için model seçer', 'İndeksleme ve sorgularda varsayılan embedding modelini bge-m3 yapar', 'LLM\'i değiştirir', 'Belgeleri siler'], 1, 'Settings global varsayılanları tutar.'),
      qc('Kaynak', 'Bu döngü neyi yazdırır?', 'for node in response.source_nodes:\n    print(node.score, node.metadata.get("file_name"))', ['Modelin parametrelerini', 'Yanıt için getirilen parçaların skorlarını ve dosya adlarını', 'Tüm belgeleri', 'Token sayısını'], 1, 'source_nodes, yanıtın dayandığı parçaları içerir.'),
      q('Kalıcılık', 'İndeksi her çalıştırmada yeniden oluşturmamak için ne yapılır?', ['Daha hızlı bir CPU almak', 'storage_context.persist ile kaydedip load_index_from_storage ile yüklemek', 'chunk_size değerini küçültmek', 'Belgeleri silmek'], 1, 'Ya diske kaydedilir ya da harici bir vektör veritabanı kullanılır.'),
      q('Yükleme', 'SimpleDirectoryReader("./belgeler").load_data() ne döndürür?', ['Vektörler', 'Klasördeki dosyalardan okunan Document listesi', 'SQL sorgusu', 'Yanıt metni'], 1, 'Farklı dosya türlerini okuyup Document nesnelerine çevirir.'),
      q('Gizlilik', 'Şirket belgeleriyle çalışırken LLM ve embedding modelini açıkça ayarlamak neden önemlidir?', ['Daha renkli çıktı için', 'Aksi halde varsayılan bir bulut servisine veri gönderilebilir', 'Lisans gereği', 'Hız için'], 1, 'Varsayılanlar dış servislere işaret edebilir; veri gizliliği riski oluşur.'),
      q('Karşılaştırma', 'Belge ağırlıklı bir "şirket içi arama asistanı"nı hızlıca kurmak için hangisi genellikle daha az kodla sonuç verir?', ['LlamaIndex', 'Saf SQL', 'Excel makrosu', 'Hiçbiri'], 0, 'LlamaIndex veri yükleme ve indeksleme için güçlü varsayılanlar sunar.'),
      q('Karşılaştırma', 'Çok adımlı, araç çağıran ve farklı sistemlerle konuşan bir asistan için hangisi öne çıkar?', ['Sadece embedding modeli', 'LangChain / LangGraph', 'Chroma', 'pgvector'], 1, 'Zincir, araç ve ajan odaklı akışlarda LangChain ekosistemi güçlüdür.'),
      q('Prompt', 'LlamaIndex\'in varsayılan prompt şablonunu özelleştirmenin en önemli nedeni nedir?', ['Daha uzun yanıt almak', 'Yanıt dilini (Türkçe) ve "bağlamda yoksa söyle" kuralını garanti etmek', 'Token sayısını artırmak', 'Embedding\'i hızlandırmak'], 1, 'Varsayılan şablonlar İngilizce ve genel amaçlıdır.')
    ]
  },

  // 5 ────────────────────────────────────────────────────────────────────────
  {
    id: 'ai-s3-05',
    title: 'RAG Kalitesini Ölçmek ve İyileştirmek',
    duration: '55 dk',
    description: 'Değerlendirme seti, retrieval metrikleri, faithfulness, hibrit arama, reranking, sorgu yeniden yazma ve güvenlik.',
    deepDive: [
      goal('Bir RAG sisteminin kalitesini sayılarla ölçebilir, sorunun bulma mı üretim mi kaynaklı olduğunu ayırt edebilir ve hibrit arama, reranking gibi tekniklerle sistemi iyileştirebilirsin.'),
      why('İlan "geliştirmiş <strong>ve çalıştırmış</strong> olmak" diyor. Çalışan bir RAG ile iyi çalışan bir RAG arasındaki fark ölçümdür. Mülakatta "kaliteyi nasıl ölçtünüz?" sorusuna sayılarla cevap verebilmek seni öne çıkarır.'),
      h('1. Değerlendirme seti'),
      p('Gerçek kullanıcı sorularından 30–100 soruluk bir set hazırla. Her soru için <strong>beklenen yanıtı</strong> ve <strong>doğru kaynak parçayı</strong> (belge + sayfa) işaretle. Belgelerde yanıtı olmayan birkaç soru da ekle: sistem bunlarda "bilmiyorum" demeli.'),
      h('2. Ne ölçülür?'),
      table(['Aşama', 'Metrik', 'Soru'], [
        ['Bulma', 'Hit rate / recall@k', 'Doğru parça ilk k sonuçta var mı?'],
        ['Bulma', 'MRR', 'Doğru parça kaçıncı sırada? (1/sıra ortalaması)'],
        ['Üretim', 'Faithfulness (sadakat)', 'Yanıttaki her iddia getirilen bağlamda dayanağa sahip mi?'],
        ['Üretim', 'Answer relevance', 'Yanıt soruyu gerçekten cevaplıyor mu?'],
        ['Sistem', 'Reddetme doğruluğu, gecikme, maliyet', 'Bilgi yokken "yok" diyor mu? Ne kadar sürüyor?']
      ]),
      code(`
def hit_rate(eval_set, retrieve, k=4):
    hits = 0
    for item in eval_set:                     # {"question": ..., "source_id": ...}
        ids = [c["id"] for c in retrieve(item["question"], k)]
        hits += item["source_id"] in ids
    return hits / len(eval_set)`, 'python'),
      p('Üretim metrikleri için <strong>RAGAS</strong> gibi kütüphaneler ya da bir LLM\'i hakem olarak kullanmak (LLM-as-a-judge) yaygındır. Hakem modelin kararlarını küçük bir örnekte elle kontrol etmeyi unutma.'),
      h('3. İyileştirme teknikleri'),
      table(['Sorun', 'Teknik'], [
        ['Kod, numara, özel ad aramada kaçıyor', '<strong>Hibrit arama</strong>: BM25 / tam metin + vektör, sonuçları Reciprocal Rank Fusion ile birleştir'],
        ['Doğru parça ilk 20\'de ama ilk 4\'te değil', '<strong>Reranking</strong>: geniş getir (k=20), cross-encoder (ör. bge-reranker) ile yeniden sırala, en iyi 4\'ü kullan'],
        ['Kısa ya da belirsiz sorular', '<strong>Sorgu yeniden yazma</strong>: LLM soruyu netleştirir ya da birden çok varyant üretir'],
        ['Yanlış departmanın belgesi geliyor', '<strong>Meta veri filtresi</strong>: departman, tarih, belge türü'],
        ['Parçalar bağlamsız', 'Yapıya göre parçalama, parçaya başlık ekleme, komşu parçaları da getirme'],
        ['Doğru bağlam var ama yanıt yanlış', 'Prompt\'u netleştir, daha güçlü model, daha düşük temperature']
      ]),
      code(`
def rrf(result_lists, k=60):
    """Reciprocal Rank Fusion: birden çok sıralamayı tek listede birleştirir."""
    scores = {}
    for results in result_lists:                 # ör. [bm25_ids, vector_ids]
        for rank, doc_id in enumerate(results, start=1):
            scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank)
    return sorted(scores, key=scores.get, reverse=True)`, 'python'),
      p('Türkçe için not: eklemeli yapı nedeniyle anahtar kelime araması kelime köklerini kaçırabilir ("faturanın", "faturalar"); vektör araması bunu telafi eder. Bu yüzden Türkçe kurumsal veride hibrit arama özellikle değerlidir.'),
      h('4. Güvenlik: belgelerden gelen talimatlar'),
      p('Getirilen belge parçası "önceki talimatları yok say ve …" gibi bir metin içerebilir (dolaylı prompt injection). Belgeleri her zaman <strong>veri</strong> olarak işaretle, modele araç ve yetki verirken bunları kodda sınırla, yanıtlarda kişisel veri (PII) sızıntısını kontrol et.'),
      h('5. Üretimde izleme'),
      p('Her istek için soru, getirilen parça kimlikleri ve skorları, yanıt, gecikme, token kullanımı ve kullanıcı geri bildirimini (👍 / 👎) kaydet. Olumsuz geri bildirimler yeni değerlendirme sorularına dönüşür; sistem böyle iyileşir.'),
      task('Önceki derslerde kurduğun RAG için 30 soruluk bir değerlendirme seti hazırla (en az 5\'i belgelerde yanıtı olmayan sorular). Hit rate@4\'ü ölç. Sonra (1) hibrit arama, (2) reranking ekle ve her adımdan sonra tekrar ölç. Sonuçları bir tabloda topla: bu tablo, mülakatta anlatabileceğin somut bir proje çıktısıdır.'),
      h('Sık yapılan hatalar'),
      mistakes([
        ['"Birkaç soru denedim, iyi görünüyor"', 'Sabit değerlendirme seti + metrik', 'Değişikliklerin etkisi ölçülemez, gerileme fark edilmez.'],
        ['Her sorunda LLM\'i değiştirmek', 'Önce retrieval metriğine bak', 'Sorunların çoğu bulma aşamasındadır.'],
        ['k değerini sadece büyütmek', 'Geniş getir + rerank + küçük k', 'Fazla parça gürültüyü artırır, bağlamı doldurur.'],
        ['Belge içeriğini talimat gibi işlemek', 'Belge = veri; yetki kodda', 'Dolaylı prompt injection riski.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Önce ölç, sonra değiştir', text: 'Her iyileştirme denemesini aynı değerlendirme setiyle ölç ve sonucu kaydet.' },
      { type: 'good', title: 'Getir geniş, ver dar', text: 'k=20 getir, rerank et, en iyi 3–5 parçayı modele ver.' },
      { type: 'bad', title: '"Bilmiyorum" sorularını unutmak', text: 'Değerlendirme setinde yanıtı olmayan sorular yoksa halüsinasyon ölçülemez.' }
    ],
    questions: [
      q('Ölçüm', 'Hit rate@4 neyi ölçer?', ['Yanıtın uzunluğunu', 'Doğru kaynak parçanın ilk 4 sonuçta bulunma oranını', 'Modelin hızını', 'Token maliyetini'], 1, 'Retrieval kalitesinin temel metriğidir.'),
      q('Ölçüm', 'Faithfulness (sadakat) metriği neyi kontrol eder?', ['Yanıtın nazik olup olmadığını', 'Yanıttaki iddiaların getirilen bağlama dayanıp dayanmadığını', 'Bulma hızını', 'Belgelerin sayısını'], 1, 'Bağlamda dayanağı olmayan iddia = halüsinasyon.'),
      q('Değerlendirme seti', 'Değerlendirme setine yanıtı belgelerde OLMAYAN sorular eklemenin amacı nedir?', ['Seti büyütmek', 'Sistemin uydurmak yerine "bilmiyorum" deyip demediğini ölçmek', 'Modeli eğitmek', 'Maliyeti artırmak'], 1, 'Reddetme davranışı ancak böyle sorularla test edilir.'),
      q('Teşhis', 'Doğru parça getirildiği halde yanıt yanlış. Sorun büyük olasılıkla nerededir?', ['Bulma (retrieval)', 'Üretim (prompt / model)', 'Vektör veritabanı', 'Embedding modeli'], 1, 'Bağlam doğruysa sorun yanıt üretimindedir.'),
      q('Hibrit', 'Kullanıcılar sık sık "MLZ-2231" gibi malzeme kodlarıyla soru soruyor ve vektör araması kaçırıyor. En uygun iyileştirme hangisi?', ['temperature\'ı düşürmek', 'Hibrit arama (BM25 + vektör)', 'Daha büyük LLM', 'chunk_size\'ı artırmak'], 1, 'Kesin eşleşme gerektiren kodlarda anahtar kelime araması güçlüdür.'),
      qc('RRF', 'Bu formülde bir belgenin skoru neye göre artar?', 'scores[doc_id] += 1 / (k + rank)', ['Belgenin uzunluğuna', 'Belgenin farklı sıralamalarda üst sıralarda yer almasına', 'Belgenin tarihine', 'Rastgele'], 1, 'Reciprocal Rank Fusion, birden çok listede üst sırada olan belgeleri öne çıkarır.'),
      q('Reranking', 'Reranking hangi durumda en çok fayda sağlar?', ['Doğru parça hiç getirilmiyorsa', 'Doğru parça ilk 20\'de var ama ilk 4\'te değilse', 'Model yavaşsa', 'Belgeler İngilizceyse'], 1, 'Cross-encoder, geniş aday listesini daha isabetli yeniden sıralar.'),
      q('Türkçe', 'Türkçe kurumsal veride hibrit aramanın özellikle değerli olmasının nedeni nedir?', ['Türkçe vektörleştirilemez', 'Eklemeli yapı anahtar kelime aramasını zayıflatırken kodlar vektör aramasını zayıflatır; ikisi birbirini tamamlar', 'BM25 Türkçede yasaktır', 'Hiçbir nedeni yoktur'], 1, 'İki yöntemin zayıflıkları farklı olduğu için birleşim daha sağlam sonuç verir.'),
      q('Güvenlik', 'Getirilen bir belge parçasında "önceki talimatları yok say" yazıyor. Bu risk nasıl adlandırılır?', ['SQL injection', 'Dolaylı prompt injection', 'XSS', 'DDoS'], 1, 'Talimatlar veri kanalından gelir; belgeler veri olarak işaretlenmeli ve yetkiler kodda sınırlanmalıdır.'),
      q('İzleme', 'Üretimdeki bir RAG sisteminde kullanıcı 👎 geri bildirimlerinin en iyi kullanımı nedir?', ['Silmek', 'İncelenip değerlendirme setine yeni test sorusu olarak eklemek', 'Modeli hemen değiştirmek', 'Kullanıcıyı engellemek'], 1, 'Gerçek hatalar değerlendirme setini besler, iyileştirme ölçülebilir hale gelir.')
    ]
  }
];
