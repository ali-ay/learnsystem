/**
 * AI Uzmanlığı — Aşama 5: Yerel LLM ve altyapı (Ollama, llama.cpp, vLLM, VRAM boyutlandırma,
 * API Gateway, bitirme projesi).
 * Imported with: npm run content:ai-s5
 *
 * Commands target Ollama 0.x, llama.cpp server, vLLM 0.6+ and LiteLLM proxy; image tags in the
 * examples are illustrative and the lessons tell learners to pin versions.
 */

import { goal, h, p, table, code, task, why, mistakes, q, qc } from './lessonHtml.js';

export const STAGE_ID = 'ai-s5';

export const STAGE = {
  trackId: 'ai',
  name: 'Aşama 5: Yerel LLM ve Altyapı — Ollama, vLLM, VRAM, API Gateway',
  shortName: 'Aşama 5: Yerel LLM ve Altyapı',
  color: 'var(--accent-pink)',
  folder: 'ai-s5-local-llm-infra',
  sortOrder: 4
};

export const LESSONS = [
  // 1 ────────────────────────────────────────────────────────────────────────
  {
    id: 'ai-s5-01',
    title: 'Yerel LLM Çalıştırma: Ollama, llama.cpp, GGUF ve Quantization',
    duration: '50 dk',
    description: 'Açık ağırlıklı modeller, model kartı okuma, GGUF formatı, quantization seviyeleri ve Ollama / llama.cpp ile OpenAI uyumlu yerel sunucu.',
    deepDive: [
      goal('Açık ağırlıklı bir modeli kendi makinende ya da şirket sunucusunda <strong>Ollama</strong> veya <strong>llama.cpp</strong> ile çalıştırabilir, <strong>quantization</strong> seviyesini bilinçli seçebilir ve uygulamanı kod değiştirmeden yerel modele bağlayabilirsin.'),
      why('İlanda "yerel (local) LLM" ve "kurumsal veri" birlikte geçiyor. Bankacılık, sağlık, savunma ve kamu gibi alanlarda veri şirket dışına çıkamaz; model şirketin kendi sunucusunda çalışmak zorundadır (KVKK, gizlilik sözleşmeleri, maliyet kontrolü).'),
      h('1. Açık ağırlıklı modeller'),
      table(['Aile', 'Boyutlar', 'Not'], [
        ['Llama (Meta)', '8B, 70B, …', 'En yaygın ekosistem; lisans koşullarını oku'],
        ['Qwen (Alibaba)', '0.5B – 72B', 'Çok dilli, Türkçesi güçlü; kod ve matematik varyantları'],
        ['Mistral / Mixtral', '7B, 8x7B, …', 'Verimli; Mixtral bir MoE modelidir'],
        ['Gemma (Google)', '2B – 27B', 'Küçük boyutlarda iyi performans'],
        ['Embedding modelleri', 'bge-m3, multilingual-e5', 'RAG için ayrı, küçük modeller']
      ]),
      p('Model seçerken <strong>model kartında</strong> şunlara bak: parametre sayısı, bağlam uzunluğu, lisans (ticari kullanım), desteklenen diller, "instruct" / "chat" sürümü olup olmadığı. Sohbet ve RAG için her zaman <em>Instruct</em> sürümünü kullan.'),
      h('2. Quantization: ağırlıkları sıkıştırmak'),
      p('Ağırlıklar normalde 16 bit (FP16 / BF16) saklanır: her parametre 2 bayt. Quantization bunu 8, 5 ya da 4 bite indirir; model küçülür ve hızlanır, kalite biraz düşer.'),
      table(['Seviye', 'Bit / parametre (yaklaşık)', '8B model boyutu', 'Kalite'], [
        ['FP16 / BF16', '16', '~16 GB', 'Referans'],
        ['Q8_0', '~8.5', '~8.5 GB', 'Farkı neredeyse yok'],
        ['Q5_K_M', '~5.7', '~5.7 GB', 'Çok iyi'],
        ['Q4_K_M', '~4.8', '~4.9 GB', 'İyi; en popüler denge noktası'],
        ['Q2 / Q3', '2–3.5', '3–3.5 GB', 'Belirgin kalite kaybı']
      ]),
      p('<strong>GGUF</strong>, llama.cpp ve Ollama\'nın kullandığı tek dosyalık model formatıdır; CPU + GPU karışık çalışmayı destekler. GPU sunucularında (vLLM) ise genelde <strong>AWQ</strong> ya da <strong>GPTQ</strong> ile 4 bitlik modeller ya da FP8 kullanılır.'),
      h('3. Ollama ile başlangıç'),
      code(`
# Kurulum (Linux)
curl -fsSL https://ollama.com/install.sh | sh

ollama pull llama3.1:8b          # varsayılan Q4_K_M
ollama pull qwen2.5:7b-instruct
ollama run llama3.1:8b "Merhaba, kendini tanıt."
ollama ps                        # yüklü modeller ve kullandıkları bellek

# Docker ile
docker run -d --gpus all -p 11434:11434 -v ollama:/root/.ollama --name ollama ollama/ollama`, 'bash'),
      p('Kendi ayarlarınla bir model türetmek için <strong>Modelfile</strong> kullanılır:'),
      code(`
FROM llama3.1:8b
PARAMETER num_ctx 8192
PARAMETER temperature 0.2
SYSTEM """Şirket içi asistansın. Kısa ve kaynaklı yanıt ver."""`, 'modelfile'),
      code(`
ollama create kurumsal-asistan -f Modelfile
ollama run kurumsal-asistan`, 'bash'),
      h('4. Uygulamayı yerel modele bağlamak'),
      p('Ollama ve llama.cpp sunucusu <strong>OpenAI uyumlu</strong> bir API sunar. Aşama 2\'de yazdığın kodda sadece <code>base_url</code> ve model adı değişir:'),
      code(`
from openai import OpenAI

llm = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")  # anahtar kontrol edilmez
resp = llm.chat.completions.create(
    model="llama3.1:8b",
    messages=[{"role": "user", "content": "KVKK nedir? İki cümleyle açıkla."}],
)
print(resp.choices[0].message.content)`, 'python'),
      h('5. llama.cpp sunucusu'),
      code(`
# -ngl 99: tüm katmanları GPU'ya yükle; -c: bağlam uzunluğu
llama-server -m ./models/Qwen2.5-7B-Instruct-Q4_K_M.gguf \\
  -c 8192 -ngl 99 --host 0.0.0.0 --port 8080`, 'bash'),
      p('GPU belleği yetmezse <code>-ngl</code> değerini düşürerek katmanların bir kısmını CPU\'da çalıştırabilirsin; model çalışır ama yavaşlar.'),
      task('Aynı modelin Q4_K_M ve Q8_0 sürümlerini indir. Aşama 3\'teki RAG test setinden 10 soruyu ikisine de sor; yanıt kalitesini, saniyedeki token sayısını ve <code>ollama ps</code> ile bellek kullanımını tabloya yaz.'),
      h('Sık yapılan hatalar'),
      mistakes([
        ['Base (instruct olmayan) modeli sohbet için kullanmak', 'Instruct / chat sürümü', 'Base model talimat takip etmez, metni devam ettirir.'],
        ['Lisansı okumamak', 'Ticari kullanım koşullarını kontrol et', 'Bazı modeller ticari kullanımı kısıtlar.'],
        ['Q2 ile kaliteyi ölçüp "yerel model kötü" demek', 'Q4_K_M ve üstüyle değerlendir', 'Aşırı sıkıştırma kaliteyi belirgin düşürür.'],
        ['Bağlam uzunluğunu varsayılanda bırakmak', 'num_ctx / -c ile ihtiyaca göre ayarla', 'RAG\'de uzun bağlam kesilir, yanıt eksik kalır.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'OpenAI uyumlu arayüz', text: 'Kodunu OpenAI uyumlu istemciyle yaz; bulut ve yerel model arasında geçiş tek satırdır.' },
      { type: 'good', title: 'Türkçeyi test et', text: 'Model seçmeden önce kendi Türkçe sorularınla kısa bir karşılaştırma yap.' },
      { type: 'bad', title: 'En büyük modeli varsaymak', text: 'RAG\'de iyi getirilmiş bağlamla 7–8B modeller çoğu kurumsal soruda yeterlidir.' }
    ],
    questions: [
      q('Kavram', 'Şirketlerin yerel LLM tercih etmesinin en yaygın nedeni hangisidir?', ['Yerel modellerin her zaman daha akıllı olması', 'Verinin şirket dışına çıkmaması (gizlilik, KVKK) ve maliyet kontrolü', 'İnternet bağlantısının olmaması', 'Python gerektirmemesi'], 1, 'Veri egemenliği ve uyumluluk temel nedendir.'),
      q('Quantization', 'Quantization ne yapar?', ['Modeli yeniden eğitir', 'Ağırlıkları daha az bitle saklayarak modeli küçültür ve hızlandırır', 'Bağlam uzunluğunu artırır', 'Embedding üretir'], 1, 'Kalite biraz düşer, bellek ve hız kazanılır.'),
      q('Quantization', '8B parametreli bir modelin FP16 ağırlıkları yaklaşık ne kadar yer kaplar?', ['4 GB', '8 GB', '16 GB', '32 GB'], 2, '8 milyar × 2 bayt = 16 GB.'),
      q('Quantization', 'Kalite ve boyut dengesi için en yaygın tercih edilen GGUF seviyesi hangisidir?', ['Q2_K', 'Q4_K_M', 'FP32', 'Q1'], 1, 'Q4_K_M popüler denge noktasıdır.'),
      q('Format', 'GGUF hangi araçlarla ilişkilidir?', ['vLLM ve TensorRT', 'llama.cpp ve Ollama', 'PostgreSQL', 'FastAPI'], 1, 'GGUF llama.cpp ekosisteminin formatıdır.'),
      q('Model seçimi', 'RAG sohbet uygulaması için hangi model sürümü kullanılmalıdır?', ['Base', 'Instruct / chat', 'Embedding', 'Reward model'], 1, 'Instruct sürümü talimatları takip eder.'),
      qc('Kod', 'Bu kodda yerel Ollama\'ya bağlanmak için bulut koduna göre ne değişti?', 'llm = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")', ['Kütüphane tamamen değişti', 'Sadece base_url (ve sembolik anahtar)', 'Mesaj formatı değişti', 'Python sürümü değişti'], 1, 'OpenAI uyumlu API sayesinde kod aynı kalır.'),
      q('llama.cpp', 'llama-server\'daki -ngl parametresi neyi belirler?', ['Bağlam uzunluğunu', 'GPU\'ya yüklenecek katman sayısını', 'Port numarasını', 'Sıcaklığı'], 1, 'Kalan katmanlar CPU\'da çalışır.'),
      q('Ollama', 'Ollama\'da model ayarlarını (num_ctx, sistem promptu) kalıcı tanımlamak için ne kullanılır?', ['Dockerfile', 'Modelfile', 'requirements.txt', '.env'], 1, 'ollama create ile Modelfile\'dan yeni model türetilir.'),
      q('Hata', 'RAG yanıtları uzun belgelerde yarıda kesiliyor gibi. İlk kontrol?', ['GPU sürücüsü', 'Modelin bağlam uzunluğu ayarı (num_ctx / -c)', 'Python sürümü', 'API anahtarı'], 1, 'Kısa bağlam ayarı promptu keser.')
    ]
  },

  // 2 ────────────────────────────────────────────────────────────────────────
  {
    id: 'ai-s5-02',
    title: 'VRAM Boyutlandırma ve Donanım Seçimi',
    duration: '55 dk',
    description: 'Ağırlık belleği, KV cache, eşzamanlı kullanıcı sayısı, bant genişliği ve token hızı; GPU seçimi ve maliyet hesabı.',
    deepDive: [
      goal('Bir model, bağlam uzunluğu ve kullanıcı sayısı için <strong>ne kadar GPU belleği (VRAM)</strong> gerektiğini hesaplayabilir, uygun GPU\'yu seçebilir ve bu kararı yöneticiye rakamlarla açıklayabilirsin.'),
      why('İlanda "LLM donanım gereksinimleri ve VRAM boyutlandırma" ayrıca belirtilmiş. Yanlış donanım ya gereksiz yüz binlerce liralık yatırım ya da kullanıcı sayısı arttığında çöken bir sistem demektir. Bu hesap mülakatlarda sık sorulur.'),
      h('1. VRAM nereye gider?'),
      table(['Bileşen', 'Hesap', 'Not'], [
        ['Model ağırlıkları', 'parametre sayısı × bayt / parametre', 'FP16 = 2, 8-bit = 1, 4-bit ≈ 0.5–0.6 bayt'],
        ['KV cache', 'token başına KV × toplam token (tüm eşzamanlı istekler)', 'Kullanıcı ve bağlam arttıkça büyür'],
        ['Ek yük', 'CUDA bağlamı, aktivasyonlar', 'Kabaca 1–2 GB ya da %10–20']
      ]),
      h('2. KV cache hesabı'),
      p('Model her ürettiği token için önceki tüm tokenların "key" ve "value" vektörlerini bellekte tutar. Token başına KV belleği:'),
      p('<strong>2 × katman sayısı × KV head sayısı × head boyutu × bayt</strong>'),
      table(['Model', 'Katman', 'KV head', 'Head boyutu', 'Token başına (FP16)', '8K token'], [
        ['Llama 3.1 8B', '32', '8', '128', '128 KB', '1 GB'],
        ['Llama 3.1 70B', '80', '8', '128', '320 KB', '2.5 GB']
      ]),
      p('Bu değerler <code>config.json</code> içindeki <code>num_hidden_layers</code>, <code>num_key_value_heads</code> ve <code>hidden_size / num_attention_heads</code> alanlarından okunur.'),
      h('3. Hesaplayıcı'),
      code(`
def vram_gb(params_b, bytes_per_param, layers, kv_heads, head_dim,
            context_tokens, concurrent, kv_bytes=2, overhead_gb=1.5):
    weights = params_b * 1e9 * bytes_per_param
    kv_per_token = 2 * layers * kv_heads * head_dim * kv_bytes
    kv_total = kv_per_token * context_tokens * concurrent
    return round((weights + kv_total) / 1024**3 + overhead_gb, 1)

# Llama 3.1 8B, FP16, 8K bağlam, 8 eşzamanlı kullanıcı
print(vram_gb(8, 2, 32, 8, 128, 8192, 8))      # ≈ 24.4 GB
# Aynı model 4-bit (AWQ), aynı yük
print(vram_gb(8, 0.55, 32, 8, 128, 8192, 8))   # ≈ 13.6 GB
# Llama 3.1 70B, 4-bit, 8K bağlam, 4 eşzamanlı kullanıcı
print(vram_gb(70, 0.55, 80, 8, 128, 8192, 4))  # ≈ 47.4 GB`, 'python'),
      p('Gerçekte vLLM gibi sunucular KV cache\'i sayfalara böler (PagedAttention) ve her istek bağlamın tamamını kullanmaz; bu hesap <strong>en kötü durum için güvenli bir üst sınır</strong> verir.'),
      h('4. Hız: bant genişliği belirler'),
      p('Token üretimi (decode) çoğunlukla <strong>bellek bant genişliğiyle</strong> sınırlıdır: her token için ağırlıkların tamamı bellekten okunur. Tek kullanıcı için kabaca üst sınır: <strong>bant genişliği ÷ model boyutu</strong>. 1 TB/s bant genişliği ve 5 GB\'lık model → en fazla ~200 token/s; gerçekte bunun yarısı civarı beklenir. Eşzamanlı istekler birlikte işlendiği (batching) için toplam verim kullanıcı sayısıyla artar.'),
      h('5. GPU seçenekleri (kabaca)'),
      table(['Sınıf', 'VRAM', 'Uygun olduğu iş'], [
        ['Tüketici: RTX 4090 / 5090', '24 / 32 GB', 'Geliştirme, küçük ekip, 7–14B modeller'],
        ['İş istasyonu: RTX 6000 Ada, L40S', '48 GB', '4-bit 70B ya da 8–32B modeller, orta ölçekli kullanım'],
        ['Veri merkezi: A100 / H100', '80 GB', 'Yüksek eşzamanlılık, FP16 büyük modeller, çoklu GPU'],
        ['Çoklu GPU (tensor parallel)', '2×, 4×, 8×', 'Tek GPU\'ya sığmayan modeller (70B FP16 ≈ 140 GB)']
      ]),
      p('Karar için: (1) hedef modeli ve kaliteyi belirle, (2) eşzamanlı kullanıcı ve bağlam uzunluğunu tahmin et, (3) VRAM\'i hesapla ve %20 pay bırak, (4) seçilen donanımda gerçek yük testi yap.'),
      task('Şirketinde 200 çalışan olduğunu varsay; yoğun saatte 10 kişi aynı anda soru soruyor, RAG bağlamı 6.000 token. Qwen2.5 7B (28 katman, 4 KV head, head boyutu 128) ve Llama 3.1 70B (4-bit) için gereken VRAM\'i hesaplayıcıyla bul ve bir GPU önerisi yaz.'),
      h('Sık yapılan hatalar'),
      mistakes([
        ['Sadece ağırlıkları hesaplamak', 'Ağırlık + KV cache + ek yük', 'Model sığar ama birkaç kullanıcıda bellek biter.'],
        ['Bağlam uzunluğunu maksimumda bırakmak', 'İhtiyaca göre max-model-len', '128K bağlam KV için devasa bellek ayırır.'],
        ['Sadece VRAM\'e bakıp GPU seçmek', 'Bant genişliğini de karşılaştır', 'Hız bant genişliğine bağlıdır.'],
        ['Hesapla yetinmek', 'Gerçek yük testi', 'Gerçek kullanım kalıpları tahminden farklıdır.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: '%20 pay bırak', text: 'Hesaplanan VRAM\'in üzerine güvenlik payı ekle; bellek bitince sunucu istekleri reddeder ya da çöker.' },
      { type: 'good', title: 'Önce küçük model + iyi RAG', text: 'Çoğu kurumsal senaryoda 7–14B model + kaliteli getirme, 70B\'den daha ekonomiktir.' },
      { type: 'bad', title: '"Model 16 GB, 16 GB GPU yeter"', text: 'KV cache ve ek yük için yer kalmaz; ilk uzun istekte bellek hatası alırsın.' }
    ],
    questions: [
      q('Hesap', '70B parametreli bir modelin FP16 ağırlıkları yaklaşık kaç GB\'dır?', ['35 GB', '70 GB', '140 GB', '280 GB'], 2, '70 milyar × 2 bayt = 140 GB.'),
      q('Hesap', 'Aynı 70B model 4-bit quantize edilirse ağırlıklar yaklaşık ne kadar olur?', ['~10 GB', '~35–40 GB', '~140 GB', '~70 GB'], 1, '~0.5–0.6 bayt / parametre.'),
      q('KV cache', 'KV cache neye bağlı olarak büyür?', ['Sadece model dosyasının boyutuna', 'Toplam token sayısına: bağlam uzunluğu × eşzamanlı istek', 'GPU sıcaklığına', 'Diskteki boş alana'], 1, 'Her token için key/value saklanır.'),
      q('KV cache', 'Token başına KV belleği formülünde hangisi yer almaz?', ['Katman sayısı', 'KV head sayısı', 'Head boyutu', 'Kelime dağarcığı (vocab) boyutu'], 3, 'Formül: 2 × katman × KV head × head boyutu × bayt.'),
      qc('Hesap', 'Llama 3.1 8B için token başına KV belleği (FP16) nedir?', '2 * 32 * 8 * 128 * 2  # bayt', ['32 KB', '64 KB', '128 KB', '1 MB'], 2, '131.072 bayt = 128 KB; 8K token için 1 GB.'),
      q('Hız', 'Tek kullanıcı için token üretim hızını en çok ne sınırlar?', ['CPU çekirdek sayısı', 'GPU bellek bant genişliği', 'Disk hızı', 'Ağ hızı'], 1, 'Her token için ağırlıklar bellekten okunur.'),
      q('Hız', '1 TB/s bant genişliği ve 5 GB\'lık modelde teorik tek kullanıcı üst sınırı yaklaşık kaç token/s\'dir?', ['20', '200', '2.000', '20.000'], 1, '1000 GB/s ÷ 5 GB ≈ 200.'),
      q('Donanım', '70B FP16 model hangi yapılandırmada çalıştırılabilir?', ['Tek RTX 4090 (24 GB)', 'Tek 48 GB GPU', 'İki adet 80 GB GPU ile tensor parallel', 'CPU\'da 16 GB RAM ile hızlıca'], 2, '140 GB ağırlık + KV cache için çoklu GPU gerekir.'),
      q('Pratik', 'vLLM\'de max-model-len değerini gereksiz yüksek bırakmanın etkisi nedir?', ['Model daha akıllı olur', 'KV cache için daha çok bellek ayrılır, eşzamanlı istek kapasitesi düşer', 'Hiçbir etkisi yoktur', 'Ağırlıklar küçülür'], 1, 'Bağlam ihtiyaca göre sınırlanmalıdır.'),
      q('Karar', 'Donanım kararında son adım ne olmalıdır?', ['Hesaba güvenip satın almak', 'Seçilen donanımda gerçekçi yük testi yapmak', 'En pahalı GPU\'yu almak', 'Modeli küçültmek'], 1, 'Gerçek kullanım kalıpları hesabı doğrular ya da düzeltir.')
    ]
  },

  // 3 ────────────────────────────────────────────────────────────────────────
  {
    id: 'ai-s5-03',
    title: 'vLLM ile Üretim Sunumu ve İzleme',
    duration: '50 dk',
    description: 'OpenAI uyumlu vLLM sunucusu, continuous batching, PagedAttention, tensor parallel, Docker Compose, metrikler ve yük testi.',
    deepDive: [
      goal('Bir modeli <strong>vLLM</strong> ile çok kullanıcılı üretim ortamında sunabilir, bellek ve eşzamanlılık ayarlarını yapabilir, <strong>Prometheus metrikleriyle</strong> izleyebilir ve yük testiyle kapasiteyi ölçebilirsin.'),
      why('Ollama tek kullanıcı ve geliştirme için harikadır; onlarca eşzamanlı kullanıcıda ise vLLM gibi sunucular çok daha yüksek toplam verim sağlar. İlandaki altyapı maddelerinin "üretimde çalıştırma" kısmı budur.'),
      h('1. vLLM neden hızlı?'),
      table(['Teknik', 'Ne yapar?'], [
        ['PagedAttention', 'KV cache\'i küçük sayfalara bölerek bellek israfını önler; daha çok eşzamanlı istek sığar'],
        ['Continuous batching', 'Yeni istekler, devam edenlerin bitmesini beklemeden aynı GPU adımına eklenir'],
        ['Tensor parallel', 'Model katmanları birden çok GPU\'ya bölünür'],
        ['Prefix caching', 'Aynı sistem promptu / ortak bağlam tekrar hesaplanmaz']
      ]),
      h('2. Sunucuyu başlatmak'),
      code(`
pip install vllm   # sürümü sabitle; CUDA sürümüyle uyumlu olmalı

vllm serve Qwen/Qwen2.5-7B-Instruct \\
  --max-model-len 8192 \\
  --gpu-memory-utilization 0.90 \\
  --max-num-seqs 32 \\
  --enable-prefix-caching \\
  --api-key "$VLLM_API_KEY" \\
  --port 8000

# İki GPU'ya bölmek için:  --tensor-parallel-size 2
# 4-bit AWQ model için:   vllm serve Qwen/Qwen2.5-32B-Instruct-AWQ ...`, 'bash'),
      table(['Parametre', 'Anlamı'], [
        ['--gpu-memory-utilization', 'GPU belleğinin ne kadarını vLLM alsın (ağırlık + KV cache)'],
        ['--max-model-len', 'İstek başına en uzun bağlam; KV ayırmasını doğrudan etkiler'],
        ['--max-num-seqs', 'Aynı anda işlenecek en fazla istek'],
        ['--tensor-parallel-size', 'Modelin bölüneceği GPU sayısı'],
        ['--api-key', 'Basit erişim anahtarı (asıl yetkilendirme gateway\'de)']
      ]),
      h('3. Docker Compose'),
      code(`
services:
  vllm:
    image: vllm/vllm-openai:v0.6.3        # sürümü sabitle
    command: ["--model", "Qwen/Qwen2.5-7B-Instruct",
              "--max-model-len", "8192",
              "--gpu-memory-utilization", "0.90"]
    ports: ["8000:8000"]
    ipc: host
    volumes:
      - hf-cache:/root/.cache/huggingface
    environment:
      - HUGGING_FACE_HUB_TOKEN=\${HF_TOKEN}
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
volumes:
  hf-cache:`, 'yaml'),
      p('GPU\'nun container içinde görünmesi için sunucuda <strong>NVIDIA sürücüsü</strong> ve <strong>NVIDIA Container Toolkit</strong> kurulu olmalıdır. Kontrol: <code>docker run --rm --gpus all nvidia/cuda:12.4.1-base-ubuntu22.04 nvidia-smi</code>.'),
      h('4. İzleme'),
      p('vLLM <code>/metrics</code> adresinde Prometheus metrikleri yayınlar. Grafana\'da izlenecek temel göstergeler:'),
      table(['Metrik', 'Neden önemli?'], [
        ['Time to first token (TTFT)', 'Kullanıcının ilk kelimeyi ne kadar beklediği'],
        ['Token / saniye (istek başına ve toplam)', 'Akış hızı ve toplam kapasite'],
        ['Bekleyen istek sayısı', 'Kuyruk büyüyorsa kapasite yetmiyor'],
        ['KV cache kullanımı (%)', '%90+ sürekli ise eşzamanlılık sınırına gelinmiş'],
        ['GPU kullanımı ve sıcaklık (nvidia-smi / DCGM)', 'Donanım sağlığı']
      ]),
      h('5. Yük testi'),
      code(`
import asyncio, time
from openai import AsyncOpenAI

client = AsyncOpenAI(base_url="http://localhost:8000/v1", api_key="test")

async def one():
    t0 = time.perf_counter()
    r = await client.chat.completions.create(
        model="Qwen/Qwen2.5-7B-Instruct", max_tokens=256,
        messages=[{"role": "user", "content": "Satın alma sürecini 5 adımda özetle."}])
    return time.perf_counter() - t0, r.usage.completion_tokens

async def main(concurrency=16):
    t0 = time.perf_counter()
    results = await asyncio.gather(*[one() for _ in range(concurrency)])
    total = time.perf_counter() - t0
    tokens = sum(n for _, n in results)
    print(f"{concurrency} istek, {total:.1f} sn, toplam {tokens / total:.0f} token/sn")

asyncio.run(main())`, 'python'),
      task('vLLM\'i bir 7B modelle başlat. Yük testini 1, 4, 16 ve 32 eşzamanlı istekle çalıştır; toplam token/sn ve ortalama yanıt süresini tabloya yaz. Hangi noktadan sonra yanıt süresi kabul edilemez hale geliyor?'),
      h('Sık yapılan hatalar'),
      mistakes([
        ['Docker\'da --ipc=host / ipc: host unutmak', 'Paylaşılan bellek ayarı', 'Çoklu GPU ve büyük batch\'lerde çökmeler olur.'],
        ['Model dosyalarını her başlatmada indirmek', 'Hugging Face önbelleğini volume\'a bağla', 'Gigabaytlarca tekrar indirme, yavaş açılış.'],
        ['Sadece ortalama süreye bakmak', 'p95 / p99 gecikmesini izle', 'Ortalama iyi görünürken kullanıcıların bir kısmı çok bekler.'],
        ['vLLM\'i doğrudan internete açmak', 'Önünde gateway ve kimlik doğrulama', 'Kötüye kullanım ve maliyet riski.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Geliştirmede Ollama, üretimde vLLM', text: 'İkisi de OpenAI uyumlu olduğu için uygulama kodu değişmez.' },
      { type: 'good', title: 'Prefix caching', text: 'RAG\'de uzun sistem promptu her istekte aynıysa prefix caching ilk token süresini düşürür.' },
      { type: 'bad', title: 'Yük testi yapmadan canlıya çıkmak', text: 'Kapasite sınırını kullanıcılar değil sen bulmalısın.' }
    ],
    questions: [
      q('vLLM', 'PagedAttention neyi iyileştirir?', ['Modelin doğruluğunu', 'KV cache bellek kullanımını; daha çok eşzamanlı isteğin sığmasını', 'Disk okuma hızını', 'Tokenizer\'ı'], 1, 'KV cache sayfalara bölünür, israf azalır.'),
      q('vLLM', 'Continuous batching ne demektir?', ['İstekler sırayla tek tek işlenir', 'Yeni istekler devam eden batch\'e beklemeden eklenir', 'Batch boyutu sabittir', 'Sadece gece çalışır'], 1, 'GPU sürekli dolu tutulur, toplam verim artar.'),
      q('Parametre', '--tensor-parallel-size 2 ne yapar?', ['İki model aynı anda çalışır', 'Model iki GPU\'ya bölünür', 'Bağlam iki katına çıkar', 'İki kat quantization yapılır'], 1, 'Tek GPU\'ya sığmayan modeller için.'),
      q('Parametre', '--gpu-memory-utilization 0.90 neyi belirler?', ['GPU sıcaklık sınırını', 'vLLM\'in GPU belleğinin %90\'ını ağırlık ve KV cache için kullanabileceğini', 'CPU kullanımını', 'Token hızını'], 1, 'Kalan bellek diğer süreçlere kalır.'),
      q('Docker', 'Container içinde GPU kullanmak için sunucuda ne kurulu olmalıdır?', ['Sadece Docker', 'NVIDIA sürücüsü ve NVIDIA Container Toolkit', 'CUDA\'nın Windows sürümü', 'Ollama'], 1, 'Toolkit GPU\'yu container\'a aktarır.'),
      q('İzleme', 'Time to first token (TTFT) neyi ölçer?', ['Toplam yanıt süresini', 'Kullanıcının ilk tokenı görene kadar beklediği süreyi', 'Modelin yüklenme süresini', 'Disk gecikmesini'], 1, 'Algılanan hızın en önemli göstergesidir.'),
      q('İzleme', 'Bekleyen istek kuyruğu sürekli büyüyorsa bu ne anlama gelir?', ['Sistem boşta', 'Kapasite yetersiz; ölçekleme ya da optimizasyon gerekiyor', 'Model çok küçük', 'Loglar kapalı'], 1, 'Gelen yük işlenebilenden fazla.'),
      q('Ölçüm', 'Gecikme hedefi koyarken neden p95 değerine bakılır?', ['Ortalamadan daha küçük olduğu için', 'Kullanıcıların %95\'inin yaşadığı en kötü süreyi gösterdiği için', 'Hesaplaması kolay olduğu için', 'GPU sıcaklığını gösterdiği için'], 1, 'Ortalama uç durumları gizler.'),
      q('Optimizasyon', 'Her istekte aynı uzun sistem promptu varsa hangi özellik ilk token süresini düşürür?', ['Tensor parallel', 'Prefix caching', 'Daha düşük sıcaklık', 'Daha yüksek max-model-len'], 1, 'Ortak önek tekrar hesaplanmaz.'),
      q('Güvenlik', 'vLLM sunucusu dış dünyaya nasıl açılmalıdır?', ['Doğrudan, port 8000 ile', 'Önünde kimlik doğrulama ve sınırlama yapan bir API gateway ile', 'FTP ile', 'Hiç açılmamalı, sadece SSH ile kullanılmalı'], 1, 'Gateway erişim, kota ve loglamayı yönetir.')
    ]
  },

  // 4 ────────────────────────────────────────────────────────────────────────
  {
    id: 'ai-s5-04',
    title: 'API Gateway: LiteLLM ile Model Yönetimi',
    duration: '45 dk',
    description: 'Tek uç noktadan birden çok model, sanal API anahtarları, kota ve hız sınırı, yedek model (fallback), maliyet ve kullanım loglama.',
    deepDive: [
      goal('Uygulamalarla modeller arasına bir <strong>LLM gateway</strong> koyabilir; ekip başına anahtar, kota ve hız sınırı tanımlayabilir, bir model çökerse otomatik olarak yedeğe geçen bir yapı kurabilirsin.'),
      why('İlanda "API Gateway" maddesi var. Kurumda birden fazla uygulama (ERP eklentisi, intranet sohbeti, müşteri hizmetleri) ve birden fazla model (yerel vLLM, yedek Ollama, gerekirse bulut) olduğunda, her uygulamanın her modele doğrudan bağlanması yönetilemez hale gelir.'),
      h('1. Gateway ne sağlar?'),
      table(['Özellik', 'Fayda'], [
        ['Tek uç nokta, tek API formatı', 'Uygulamalar model değişikliğinden etkilenmez'],
        ['Sanal anahtarlar', 'Her ekip / uygulama için ayrı anahtar; tek tıkla iptal'],
        ['Kota ve hız sınırı (RPM / TPM)', 'Bir uygulama tüm kapasiteyi tüketemez'],
        ['Yük dengeleme ve fallback', 'Bir model sunucusu çökerse istekler diğerine gider'],
        ['Kullanım ve maliyet logu', 'Hangi ekip ne kadar token harcadı'],
        ['Merkezi koruma', 'Kişisel veri maskeleme, içerik filtreleri tek yerde']
      ]),
      p('<strong>LiteLLM Proxy</strong> bu iş için yaygın, açık kaynaklı bir araçtır. Kong, NGINX gibi genel API gateway\'ler de kullanılabilir; ama token bazlı kota ve model yönlendirme gibi LLM\'e özgü özellikler için ek eklentiler gerekir.'),
      h('2. Yapılandırma'),
      code(`
model_list:
  - model_name: kurumsal-chat                  # uygulamaların gördüğü ad
    litellm_params:
      model: hosted_vllm/Qwen/Qwen2.5-7B-Instruct
      api_base: http://vllm-1:8000/v1
      api_key: os.environ/VLLM_API_KEY
  - model_name: kurumsal-chat                  # aynı ad → yük dengeleme
    litellm_params:
      model: hosted_vllm/Qwen/Qwen2.5-7B-Instruct
      api_base: http://vllm-2:8000/v1
      api_key: os.environ/VLLM_API_KEY
  - model_name: yedek-chat
    litellm_params:
      model: ollama/llama3.1:8b
      api_base: http://ollama:11434

router_settings:
  fallbacks: [{"kurumsal-chat": ["yedek-chat"]}]
  num_retries: 2
  timeout: 60

general_settings:
  master_key: os.environ/LITELLM_MASTER_KEY
  database_url: os.environ/DATABASE_URL       # sanal anahtarlar ve kullanım logu için`, 'yaml'),
      code(`
docker run -d -p 4000:4000 \\
  -v $(pwd)/config.yaml:/app/config.yaml \\
  -e LITELLM_MASTER_KEY -e DATABASE_URL -e VLLM_API_KEY \\
  ghcr.io/berriai/litellm:main-stable --config /app/config.yaml

# Muhasebe ekibi için aylık bütçeli, dakikada 60 istekle sınırlı anahtar
curl -X POST http://localhost:4000/key/generate \\
  -H "Authorization: Bearer $LITELLM_MASTER_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"key_alias": "muhasebe-asistani", "models": ["kurumsal-chat"], "rpm_limit": 60, "max_budget": 50}'`, 'bash'),
      h('3. Uygulama tarafı'),
      code(`
import os
from openai import OpenAI

llm = OpenAI(base_url="http://gateway.sirket.local:4000/v1", api_key=os.environ["TEAM_KEY"])
resp = llm.chat.completions.create(model="kurumsal-chat",
                                   messages=[{"role": "user", "content": "Merhaba"}])`, 'python'),
      p('Uygulama sadece <em>kurumsal-chat</em> adını bilir. Arkada modeli Qwen\'den Llama\'ya değiştirmek, yeni bir GPU sunucusu eklemek ya da bulut yedeği tanımlamak uygulamaya dokunmadan gateway\'de yapılır.'),
      h('4. Mimari'),
      table(['Katman', 'Bileşen'], [
        ['İstemciler', 'ERP eklentisi, intranet sohbeti, mobil uygulama'],
        ['Uygulama servisleri', 'FastAPI: RAG, Text-to-SQL, agent'],
        ['LLM gateway', 'LiteLLM: anahtar, kota, yönlendirme, log'],
        ['Model sunucuları', 'vLLM (birincil), Ollama (yedek), embedding servisi'],
        ['Veri', 'PostgreSQL + pgvector, ERP replikası']
      ]),
      task('LiteLLM\'i iki model tanımıyla (vLLM ya da Ollama) ayağa kaldır. İki sanal anahtar oluştur, birine düşük rpm_limit ver ve sınırı aşınca 429 hatası aldığını göster. Sonra birincil model sunucusunu durdurup isteklerin yedeğe düştüğünü doğrula.'),
      h('Sık yapılan hatalar'),
      mistakes([
        ['Her uygulamaya model sunucusunun adresini vermek', 'Tek gateway adresi', 'Model değişikliği her uygulamada kod değişikliği gerektirir.'],
        ['Tüm ekiplerin tek anahtar kullanması', 'Ekip / uygulama başına sanal anahtar', 'Kim ne kadar kullandı bilinmez, iptal edilemez.'],
        ['Fallback tanımlamamak', 'Yedek model ve yeniden deneme', 'Tek sunucu arızası tüm asistanları durdurur.'],
        ['Gateway\'i kimlik doğrulamasız açmak', 'master key + sanal anahtarlar + iç ağ', 'Kaynaklar yetkisiz kullanılır.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Mantıksal model adları', text: '"kurumsal-chat", "hizli-ozet" gibi adlar kullan; gerçek model adını gateway\'de sakla.' },
      { type: 'good', title: 'Bütçe ve kota baştan', text: 'Yeni bir uygulamaya anahtar verirken rpm ve bütçe sınırını da tanımla.' },
      { type: 'bad', title: 'Gateway\'i tek nokta arızası bırakmak', text: 'Gateway\'i de en az iki kopya ve sağlık kontrolüyle çalıştır.' }
    ],
    questions: [
      q('Kavram', 'LLM gateway\'in temel faydası hangisidir?', ['Modeli daha akıllı yapmak', 'Uygulamalar ile modeller arasında tek uç nokta, anahtar, kota ve yönlendirme yönetimi', 'GPU belleğini artırmak', 'Belgeleri parçalamak'], 1, 'Merkezi yönetim ve soyutlama.'),
      q('Anahtar', 'Ekip başına ayrı sanal anahtar vermenin faydası hangisi değildir?', ['Kullanımı ekip bazında izlemek', 'Tek bir anahtarı diğerlerini etkilemeden iptal etmek', 'Ekip başına kota tanımlamak', 'Model yanıtlarını daha doğru yapmak'], 3, 'Anahtar yönetimi yanıt kalitesini etkilemez.'),
      q('Kota', 'rpm_limit sınırı aşıldığında istemci genelde hangi HTTP kodunu alır?', ['200', '401', '429', '500'], 2, '429 Too Many Requests.'),
      q('Fallback', 'Fallback tanımının amacı nedir?', ['Daha ucuz modeli her zaman kullanmak', 'Birincil model hata verirse isteği yedek modele yönlendirmek', 'Logları silmek', 'Yanıtı iki kez üretmek'], 1, 'Arızaya dayanıklılık.'),
      qc('Yapılandırma', 'Aynı model_name ile iki kayıt tanımlanırsa ne olur?', '- model_name: kurumsal-chat\n  litellm_params: {api_base: http://vllm-1:8000/v1}\n- model_name: kurumsal-chat\n  litellm_params: {api_base: http://vllm-2:8000/v1}', ['Hata verir', 'İstekler iki sunucu arasında dağıtılır (yük dengeleme)', 'Sadece ikincisi kullanılır', 'İkisi aynı isteğe birlikte yanıt verir'], 1, 'Aynı mantıksal ad → yük dengeleme grubu.'),
      q('Soyutlama', 'Uygulamanın "kurumsal-chat" gibi mantıksal bir model adı kullanmasının faydası nedir?', ['Daha kısa kod', 'Arkadaki gerçek modeli uygulamaya dokunmadan değiştirebilmek', 'Daha hızlı ağ', 'Lisans gerektirmemesi'], 1, 'Model değişikliği gateway\'de yapılır.'),
      q('Mimari', 'Tipik kurumsal mimaride gateway hangi iki katman arasında durur?', ['Kullanıcı ile tarayıcı', 'Uygulama servisleri ile model sunucuları', 'Veritabanı ile disk', 'GPU ile CPU'], 1, 'Uygulamalar modele gateway üzerinden ulaşır.'),
      q('Maliyet', 'Token kullanım loglarının kurumdaki en önemli kullanımı hangisidir?', ['Modeli eğitmek', 'Ekip / uygulama bazında maliyet ve kapasite planlaması', 'Şifreleri saklamak', 'Belgeleri indekslemek'], 1, 'Kim ne kadar kullanıyor sorusunun cevabı.'),
      q('Güvenlik', 'Kişisel veri maskeleme gibi kontrolleri gateway\'de yapmanın avantajı nedir?', ['Her uygulamada ayrı ayrı yazmaya gerek kalmaması', 'Modeli hızlandırması', 'GPU gerektirmemesi', 'Bağlamı uzatması'], 0, 'Merkezi kural, tutarlı uygulama.'),
      q('Dayanıklılık', 'Gateway\'in kendisinin arızalanma riskine karşı ne yapılmalıdır?', ['Hiçbir şey; gateway arızalanmaz', 'Birden çok kopya, sağlık kontrolü ve önünde load balancer', 'Gateway\'i kaldırıp doğrudan bağlanmak', 'Sadece mesai saatinde çalıştırmak'], 1, 'Gateway tek nokta arızası olmamalı.')
    ]
  },

  // 5 ────────────────────────────────────────────────────────────────────────
  {
    id: 'ai-s5-05',
    title: 'Bitirme Projesi: Kurum İçi AI Asistanı',
    duration: '90 dk',
    description: 'Tüm aşamaları birleştiren uçtan uca proje: belge RAG + ERP Text-to-SQL + yerel LLM + gateway; mimari, değerlendirme, güvenlik ve portföy sunumu.',
    deepDive: [
      goal('Belgelerden ve ERP verisinden yanıt veren, tamamen şirket içinde çalışan bir AI asistanını <strong>uçtan uca</strong> kurabilir, ölçebilir ve bir mülakatta mimari kararlarını gerekçeleriyle anlatabilirsin.'),
      why('İlanın tek zorunlu maddesi "RAG tabanlı bir uygulamayı geliştirmiş ve çalıştırmış olmak". Bu proje tam olarak o kanıttır: GitHub\'da çalışan kod, mimari şema ve ölçülmüş sonuçlar, sertifikalardan çok daha ikna edicidir.'),
      h('1. Kapsam'),
      table(['Yetenek', 'Aşama', 'Kabul kriteri'], [
        ['Belge soruları (politika, prosedür)', 'Aşama 3', 'Kaynak göstererek yanıt; belgede yoksa "bilmiyorum"'],
        ['Veri soruları (satış, stok)', 'Aşama 4', 'Doğrulanmış salt okunur SQL, sonuç + SQL gösterimi'],
        ['Karma sorular', 'Aşama 4', 'Agent iki aracı birlikte kullanır'],
        ['Yerel model', 'Aşama 5', 'vLLM ya da Ollama, internet erişimi olmadan'],
        ['Gateway', 'Aşama 5', 'Uygulama başına anahtar, kota, fallback'],
        ['Servis ve dağıtım', 'Aşama 1 ve 4', 'FastAPI + Docker Compose, tek komutla ayağa kalkar']
      ]),
      h('2. Docker Compose iskeleti'),
      code(`
services:
  db:
    image: pgvector/pgvector:pg16
    environment: [POSTGRES_PASSWORD=\${DB_PASSWORD}]
    volumes: [pgdata:/var/lib/postgresql/data]

  llm:
    image: vllm/vllm-openai:v0.6.3
    command: ["--model", "Qwen/Qwen2.5-7B-Instruct", "--max-model-len", "8192"]
    ipc: host
    volumes: [hf-cache:/root/.cache/huggingface]
    deploy:
      resources:
        reservations:
          devices: [{driver: nvidia, count: all, capabilities: [gpu]}]

  gateway:
    image: ghcr.io/berriai/litellm:main-stable
    command: ["--config", "/app/config.yaml"]
    volumes: [./gateway/config.yaml:/app/config.yaml]
    environment: [LITELLM_MASTER_KEY, DATABASE_URL]
    depends_on: [llm, db]

  api:
    build: ./api
    environment: [LLM_BASE_URL=http://gateway:4000/v1, LLM_API_KEY, DATABASE_URL, ERP_READONLY_URL]
    ports: ["8080:8000"]
    depends_on: [gateway, db]

volumes:
  pgdata:
  hf-cache:`, 'yaml'),
      h('3. Değerlendirme'),
      table(['Ölçüm', 'Yöntem', 'Hedef örneği'], [
        ['Getirme isabeti', '40 belge sorusu, doğru parça ilk 5\'te mi?', '%85+'],
        ['Yanıt sadakati', 'Yanıt bağlama dayanıyor mu? (LLM-as-judge + elle örneklem)', '%90+'],
        ['SQL doğruluğu', '30 veri sorusu, sonuç karşılaştırma', '%80+'],
        ['Reddetme', 'Belgede olmayan 10 soru, "bilmiyorum" oranı', '%90+'],
        ['Gecikme', 'p95 ilk token ve toplam süre, 10 eşzamanlı kullanıcı', 'İlk token < 2 sn'],
        ['Güvenlik', 'Prompt injection ve yetkisiz veri denemeleri', 'Hepsi engellenir']
      ]),
      h('4. Güvenlik ve uyumluluk kontrol listesi'),
      table(['Konu', 'Kontrol'], [
        ['Veri yerelliği', 'Hiçbir istek dış servise gitmiyor (ağ kuralıyla doğrula)'],
        ['Yetki', 'Belge ve SQL araçları kullanıcının yetkisiyle filtreleniyor'],
        ['Kişisel veri', 'Loglarda TC kimlik, telefon, e-posta maskeleniyor'],
        ['Yazma işlemleri', 'Yok ya da kullanıcı onaylı'],
        ['Denetim', 'Her soru, kaynak ve SQL zaman damgasıyla saklanıyor'],
        ['Sürümler', 'Model, embedding modeli ve kütüphane sürümleri sabit ve kayıtlı']
      ]),
      h('5. Portföy ve mülakat'),
      p('Depoda şunlar olsun: mimari şema, tek komutla kurulum (<code>docker compose up</code>), örnek veri, değerlendirme scripti ve sonuç tablosu, bilinen sınırlamalar. Mülakatta sık gelen sorulara hazırlan:'),
      table(['Soru', 'Cevabında bulunması gerekenler'], [
        ['Neden RAG, neden fine-tuning değil?', 'Güncellik, kaynak gösterme, maliyet; fine-tuning üslup içindir'],
        ['Parça boyutunu nasıl seçtin?', 'Belge yapısı + değerlendirme setinde karşılaştırma'],
        ['Bu sistem için kaç GB VRAM gerekir?', 'Ağırlık + KV cache × eşzamanlılık + pay; rakamla'],
        ['LLM\'in ürettiği SQL\'i nasıl güvenli çalıştırıyorsun?', 'Salt okunur rol, view, sqlglot, LIMIT, timeout'],
        ['Model çökerse ne olur?', 'Gateway fallback, sağlık kontrolü, izleme alarmları'],
        ['Kalitenin düştüğünü nasıl anlarsın?', 'Sabit test seti, düzenli değerlendirme, kullanıcı geri bildirimi']
      ]),
      task('Projeyi kur ve README\'ye değerlendirme tablosunu gerçek sonuçlarınla ekle. Sonra bir arkadaşına 10 dakikalık bir mimari sunum yap; "neden?" sorularına yukarıdaki tablodaki gibi rakam ve gerekçeyle cevap verebildiğini kontrol et.'),
      h('Sık yapılan hatalar'),
      mistakes([
        ['Ölçmeden "çalışıyor" demek', 'Sabit test seti ve sonuç tablosu', 'Mülakatçı ve yönetici rakam ister.'],
        ['Her şeyi tek dev script\'e koymak', 'Ayrı servisler: api, gateway, llm, db', 'Ölçekleme, güncelleme ve hata ayıklama zorlaşır.'],
        ['Gerçek şirket verisini depoya koymak', 'Sentetik ya da anonimleştirilmiş örnek veri', 'Gizlilik ihlali.'],
        ['Sınırlamaları gizlemek', 'Bilinen sınırlamalar bölümü', 'Olgunluk ve dürüstlük göstergesidir.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Küçük başla, ölç, büyüt', text: 'Önce 20 belge ve 3 view ile uçtan uca çalıştır; sonra kapsamı genişlet.' },
      { type: 'good', title: 'Kararlarını yaz', text: 'README\'de "neden pgvector, neden Qwen 7B, neden LiteLLM" bölümleri mülakatın yarısını hazırlar.' },
      { type: 'bad', title: 'Demo\'yu sadece mutlu yolla yapmak', text: 'Belgede olmayan soru ve yetkisiz istek örneklerini de göster.' }
    ],
    questions: [
      q('Mimari', 'Bitirme projesinde uygulama servisi modele nasıl ulaşmalıdır?', ['Doğrudan vLLM portuna', 'Gateway üzerinden, mantıksal model adıyla', 'Bulut API\'sine', 'Veritabanı üzerinden'], 1, 'Anahtar, kota ve fallback gateway\'de yönetilir.'),
      q('Değerlendirme', 'Getirme isabetini ölçmenin doğru yolu hangisidir?', ['Kullanıcı memnuniyet anketi', 'Bilinen sorular için doğru parçanın ilk k sonuç içinde olup olmadığını kontrol etmek', 'Yanıt uzunluğu', 'GPU kullanımı'], 1, 'Recall@k / hit rate.'),
      q('Değerlendirme', 'Belgede olmayan sorular test setine neden eklenir?', ['Seti büyütmek için', 'Modelin uydurmak yerine "bilmiyorum" deme oranını ölçmek için', 'Gecikmeyi artırmak için', 'SQL test etmek için'], 1, 'Reddetme davranışı halüsinasyon kontrolüdür.'),
      q('Güvenlik', 'Veri yerelliği nasıl doğrulanır?', ['Prompt\'a "dışarı gönderme" yazarak', 'Ağ kurallarıyla dış erişimi kapatıp sistemin çalışmaya devam ettiğini göstererek', 'Logları silerek', 'Bulut modeli kullanarak'], 1, 'Çıkış trafiği engellenmiş ortamda test.'),
      q('Güvenlik', 'Denetim (audit) için ne saklanmalıdır?', ['Sadece hata mesajları', 'Soru, kullanılan kaynaklar, çalıştırılan SQL ve zaman damgası (kişisel veri maskeli)', 'GPU sıcaklığı', 'Hiçbir şey'], 1, 'Hangi yanıtın neye dayandığı izlenebilir olmalı.'),
      q('Mülakat', '"Neden fine-tuning değil de RAG?" sorusuna en güçlü cevap hangisidir?', ['RAG daha moda', 'Bilgi sık değişiyor, kaynak gösterilmesi gerekiyor ve indeks güncellemek yeniden eğitmekten ucuz', 'Fine-tuning imkânsız', 'RAG GPU gerektirmez'], 1, 'Güncellik, izlenebilirlik ve maliyet.'),
      q('Mülakat', '"Bu sistem için kaç GB VRAM gerekir?" sorusunun cevabında ne olmalıdır?', ['Sadece model dosyasının boyutu', 'Ağırlık + KV cache (bağlam × eşzamanlı kullanıcı) + ek yük ve güvenlik payı, rakamlarla', '"Ne kadar çok o kadar iyi"', 'CPU çekirdek sayısı'], 1, 'Aşama 5 Ders 2\'deki hesap.'),
      q('Portföy', 'Proje deposunda hangisi bulunmamalıdır?', ['Mimari şema', 'Değerlendirme sonuçları', 'Gerçek şirket müşteri verisi', 'Kurulum talimatı'], 2, 'Sentetik ya da anonim veri kullan.'),
      q('Dağıtım', 'Docker Compose ile servisleri ayırmanın faydası nedir?', ['Daha az dosya', 'Her bileşenin bağımsız güncellenmesi, ölçeklenmesi ve hata ayıklanması', 'GPU gerektirmemesi', 'Python\'u gereksiz kılması'], 1, 'api, gateway, llm, db ayrı servislerdir.'),
      q('Kalite', 'Canlıdaki asistanın kalitesinin zamanla düştüğünü nasıl fark edersin?', ['Fark edilemez', 'Sabit test setini düzenli çalıştırıp sonuçları karşılaştırarak ve kullanıcı geri bildirimini izleyerek', 'GPU sıcaklığından', 'Disk doluluğundan'], 1, 'Regresyon testi ve geri bildirim döngüsü.')
    ]
  }
];
