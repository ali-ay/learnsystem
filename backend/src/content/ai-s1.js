/**
 * AI Uzmanlığı — Aşama 1: Altyapı temelleri (Python, Ubuntu, Docker).
 * Imported with: npm run content:ai-s1
 */

import { goal, h, p, table, code, task, why, mistakes, q, qc } from './lessonHtml.js';

export const STAGE_ID = 'ai-s1';

export const STAGE = {
  trackId: 'ai',
  name: 'Aşama 1: Altyapı Temelleri — Python, Ubuntu, Docker',
  shortName: 'Aşama 1: Altyapı Temelleri',
  color: 'var(--color-beginner)',
  folder: 'ai-s1-foundations',
  sortOrder: 0
};

export const LESSONS = [
  // 1 ────────────────────────────────────────────────────────────────────────
  {
    id: 'ai-s1-01',
    title: 'Yapay Zekâ Projeleri İçin Python',
    duration: '45 dk',
    description: 'Sanal ortam, bağımlılık yönetimi, ortam değişkenleri, tip ipuçları, pydantic ve HTTP istekleri.',
    deepDive: [
      goal('Bir AI projesi için temiz bir Python ortamı kurabilir, bağımlılıkları sabitleyebilir, gizli anahtarları koddan ayırabilir ve bir HTTP API\'yi güvenle çağırabilirsin.'),
      why('İlandaki ilk madde Python. LangChain, LlamaIndex, embedding modelleri ve neredeyse tüm LLM araçları Python ile yazılır. Mülakatta "çalışan bir proje" sorulduğunda ilk bakılan şey ortamın tekrar kurulabilir olmasıdır.'),
      h('1. Sanal ortam (venv)'),
      p('Her proje kendi paket sürümlerini kendi klasöründe tutmalıdır. Aksi halde iki proje aynı kütüphanenin farklı sürümlerini isteyince birbirini bozar.'),
      code(`
python3 -m venv .venv          # proje klasöründe sanal ortam oluştur
source .venv/bin/activate      # etkinleştir (Linux / macOS)
pip install --upgrade pip
pip install httpx pydantic python-dotenv
pip freeze > requirements.txt  # sürümleri sabitle
deactivate                     # çık`, 'bash'),
      p('Projeyi başka bir makinede kurmak için <code>pip install -r requirements.txt</code> yeterlidir. Daha modern alternatifler: <strong>uv</strong> (çok hızlı paket yöneticisi) ve <strong>Poetry</strong>. Hangisini seçersen seç, sürümlerin dosyada sabitlenmiş olması şarttır.'),
      h('2. Gizli anahtarlar: .env'),
      p('API anahtarları, veritabanı şifreleri asla koda yazılmaz ve git\'e gönderilmez. Bir <code>.env</code> dosyasında tutulur, <code>.gitignore</code>\'a eklenir.'),
      code(`
# .env  (git'e EKLENMEZ)
LLM_BASE_URL=http://localhost:11434/v1
LLM_API_KEY=local-key
DATABASE_URL=postgresql://app:secret@localhost:5432/erp`, '.env'),
      code(`
import os
from dotenv import load_dotenv

load_dotenv()                       # .env dosyasını okur
base_url = os.environ["LLM_BASE_URL"]   # yoksa hata verir: erken fark edersin
api_key = os.getenv("LLM_API_KEY", "")  # yoksa varsayılan`, 'python'),
      h('3. Tip ipuçları ve pydantic'),
      p('LLM\'den gelen ya da LLM\'e giden veriyi yapılandırmak için <strong>pydantic</strong> neredeyse standarttır. Hatalı veri sessizce geçmez, anlaşılır bir hata verir. LangChain ve LlamaIndex de içeride pydantic kullanır.'),
      code(`
from pydantic import BaseModel, Field

class Invoice(BaseModel):
    invoice_no: str
    customer: str
    total: float = Field(ge=0)       # 0'dan küçük olamaz
    currency: str = "TRY"

data = {"invoice_no": "F-1024", "customer": "Acme", "total": "1250.5"}
inv = Invoice(**data)               # "1250.5" otomatik float'a çevrilir
print(inv.total, inv.model_dump())`, 'python'),
      h('4. HTTP API çağırmak: httpx'),
      p('LLM sunucuları, vektör veritabanları ve ERP servisleri çoğunlukla HTTP üzerinden konuşur. <strong>Zaman aşımı</strong> ve <strong>hata kontrolü</strong> olmadan yapılan istek üretimde ilk sorun çıkaran yerdir.'),
      code(`
import httpx

def get_json(url: str) -> dict:
    with httpx.Client(timeout=30.0) as client:
        r = client.get(url)
        r.raise_for_status()        # 4xx / 5xx ise hata fırlatır
        return r.json()`, 'python'),
      p('Aynı anda çok sayıda istek gerektiğinde (örneğin yüzlerce belgeyi embedding\'e göndermek) <code>httpx.AsyncClient</code> ve <code>asyncio</code> ile eşzamanlı çalışmak süreyi ciddi biçimde kısaltır.'),
      h('5. Loglama'),
      p('<code>print</code> yerine <code>logging</code> kullan. Sunucuda çalışan bir servisin ne yaptığını sonradan ancak loglardan anlayabilirsin.'),
      code(`
import logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("rag")
log.info("İndeksleme başladı: %d belge", 42)`, 'python'),
      task('Bir klasör oluştur, sanal ortam kur, <code>.env</code> dosyasından bir URL oku ve <code>httpx</code> ile herkese açık bir JSON API\'yi çağır. Sonucu bir pydantic modeline dönüştürüp logla. <code>requirements.txt</code> dosyasını oluşturmayı unutma.'),
      h('Sık yapılan hatalar'),
      mistakes([
        ['Paketleri sisteme global kurmak', 'Her projeye ayrı .venv', 'Sürüm çakışmaları ve "bende çalışıyordu" sorunu.'],
        ['API anahtarını koda yazmak', '.env + .gitignore', 'Anahtar git geçmişine girerse sızmış sayılır.'],
        ['Zaman aşımı olmayan HTTP isteği', 'httpx.Client(timeout=30)', 'LLM yanıtı takılırsa servis sonsuza kadar bekler.'],
        ['requirements.txt olmadan teslim', 'pip freeze > requirements.txt', 'Proje başka makinede kurulamaz.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Tekrar kurulabilir ortam', text: 'venv + sabitlenmiş sürümler (requirements.txt veya uv / Poetry kilit dosyası).' },
      { type: 'good', title: 'Veriyi doğrula', text: 'Dışarıdan gelen her veriyi (API, LLM çıktısı, ERP kaydı) pydantic modeliyle doğrula.' },
      { type: 'bad', title: 'Gizli bilgiyi koda gömmek', text: 'Şifre ve anahtarlar ortam değişkenlerinde durur, depoya girmez.' }
    ],
    questions: [
      q('Ortam', 'Python projelerinde sanal ortam (venv) kullanmanın asıl amacı nedir?', ['Kodu daha hızlı çalıştırmak', 'Her projenin paket sürümlerini birbirinden yalıtmak', "Python'u güncellemek", 'GPU kullanımını açmak'], 1, 'venv, projeye özel bir paket klasörü oluşturur; projeler birbirinin bağımlılıklarını bozmaz.'),
      qc('Ortam', 'Bu komutlardan sonra ne oluşur?', 'pip freeze > requirements.txt', ['Kurulu paketlerin sürümleriyle bir liste dosyası', 'Yeni bir sanal ortam', 'Tüm paketlerin güncellenmesi', 'Python kaynak kodunun yedeği'], 0, 'pip freeze kurulu paketleri sürümleriyle yazar; başka makinede pip install -r ile aynı ortam kurulur.'),
      q('Güvenlik', 'Bir LLM API anahtarını nerede tutmalısın?', ['Python dosyasının en üstünde', 'README dosyasında', ".env dosyasında, .gitignore'a eklenmiş olarak", 'requirements.txt içinde'], 2, 'Gizli bilgiler ortam değişkenlerinde tutulur ve depoya gönderilmez.'),
      qc('Ortam', 'LLM_BASE_URL ortam değişkeni tanımlı değilse ne olur?', 'import os\nurl = os.environ["LLM_BASE_URL"]', ['url boş metin olur', 'url None olur', 'KeyError hatası fırlatılır', 'Varsayılan localhost kullanılır'], 2, 'os.environ["X"] yoksa KeyError verir. Varsayılan değer için os.getenv("X", "...") kullanılır.'),
      qc('pydantic', 'Bu kod çalışınca ne olur?', 'class Invoice(BaseModel):\n    total: float = Field(ge=0)\n\nInvoice(total=-5)', ['total 0 olarak kaydedilir', 'ValidationError fırlatılır', 'total 5 olur', 'Hiçbir şey olmaz'], 1, 'ge=0 kuralı -5 değerini reddeder ve anlaşılır bir doğrulama hatası verir.'),
      q('pydantic', 'pydantic\'in AI projelerindeki en yaygın kullanımı hangisidir?', ['Grafik çizmek', 'LLM çıktısını ve API verisini yapılandırıp doğrulamak', 'GPU belleğini yönetmek', 'Docker imajı oluşturmak'], 1, 'Yapılandırılmış LLM çıktısı ve araç çağrısı şemaları genellikle pydantic modelleriyle tanımlanır.'),
      qc('HTTP', 'raise_for_status() satırının görevi nedir?', 'r = client.get(url)\nr.raise_for_status()', ['Yanıtı JSON\'a çevirir', '4xx / 5xx durum kodlarında hata fırlatır', 'İsteği tekrar dener', 'Zaman aşımını ayarlar'], 1, 'Hatalı HTTP yanıtı sessizce işlenmez, istisnaya dönüşür.'),
      q('HTTP', 'Yüzlerce belgeyi bir embedding servisine göndermek gerekiyor. En verimli yaklaşım hangisi?', ['Her belge için yeni bir Python süreci başlatmak', 'httpx.AsyncClient ve asyncio ile eşzamanlı istekler', 'time.sleep ile sırayla göndermek', 'Belgeleri tek bir dev metinde birleştirmek'], 1, 'Ağ beklemesi yoğun işlerde asenkron istekler toplam süreyi ciddi biçimde kısaltır.'),
      q('Loglama', 'Sunucuda çalışan bir RAG servisinde neden print yerine logging tercih edilir?', ['print Python 3\'te kaldırıldı', 'logging seviye, zaman damgası ve yönlendirme (dosya, journald) sağlar', 'logging daha az bellek kullanır', 'print Türkçe karakterleri bozar'], 1, 'Seviyeli ve zaman damgalı loglar, üretimdeki sorunları sonradan incelemeyi mümkün kılar.'),
      q('Araçlar', 'Aşağıdakilerden hangisi bir Python paket ve ortam yöneticisidir?', ['uv', 'nginx', 'systemd', 'pgvector'], 0, 'uv, pip ve venv işlerini çok hızlı yapan modern bir araçtır. Poetry de benzer bir seçenektir.')
    ]
  },

  // 2 ────────────────────────────────────────────────────────────────────────
  {
    id: 'ai-s1-02',
    title: 'Ubuntu Sunucuda Çalışmak',
    duration: '45 dk',
    description: 'Kabuk temelleri, paket yönetimi, kullanıcı ve izinler, SSH, systemd servisleri, loglar ve kaynak izleme.',
    deepDive: [
      goal('Bir Ubuntu sunucuya SSH ile bağlanabilir, paket kurabilir, dosya izinlerini düzenleyebilir, uygulamanı systemd servisi olarak çalıştırabilir ve CPU, RAM, disk ve GPU kullanımını izleyebilirsin.'),
      why('Yerel LLM\'ler ve RAG servisleri neredeyse her zaman Linux (çoğunlukla Ubuntu) sunucularda çalışır. İlandaki "Linux (Ubuntu)" maddesi, servisi kendi başına kurup ayakta tutabilmeni bekler.'),
      h('1. Gezinme ve dosyalar'),
      table(['Komut', 'Ne yapar?'], [
        ['<code>pwd</code>, <code>ls -la</code>, <code>cd</code>', 'Bulunduğun yer, gizli dosyalar dahil liste, dizin değiştirme'],
        ['<code>mkdir -p</code>, <code>cp -r</code>, <code>mv</code>, <code>rm -r</code>', 'Klasör oluşturma, kopyalama, taşıma, silme (rm geri alınamaz)'],
        ['<code>cat</code>, <code>less</code>, <code>tail -f</code>', 'Dosya içeriği, sayfa sayfa okuma, canlı log izleme'],
        ['<code>grep -rn "hata" .</code>', 'Klasörde metin arama'],
        ['<code>nano</code> / <code>vim</code>', 'Terminalde dosya düzenleme']
      ]),
      h('2. Paket yönetimi: apt'),
      code(`
sudo apt update                 # paket listesini yenile
sudo apt upgrade -y             # kurulu paketleri güncelle
sudo apt install -y git curl htop python3-venv
apt list --installed | grep python`, 'bash'),
      h('3. Kullanıcılar ve izinler'),
      p('Linux\'ta her dosyanın bir sahibi, bir grubu ve üç izin seti (sahip / grup / diğerleri; okuma r, yazma w, çalıştırma x) vardır. Servisleri <strong>root olarak değil</strong>, kendi kullanıcısıyla çalıştırmak temel güvenlik kuralıdır.'),
      code(`
sudo adduser ragapp                       # servis için ayrı kullanıcı
sudo chown -R ragapp:ragapp /opt/rag      # sahipliği ver
chmod 600 /opt/rag/.env                   # .env: sadece sahibi okuyup yazabilir
chmod +x run.sh                           # betiğe çalıştırma izni
ls -l /opt/rag/.env                       # -rw------- ragapp ragapp`, 'bash'),
      h('4. SSH ile bağlanmak'),
      code(`
ssh-keygen -t ed25519 -C "ali@laptop"     # kendi bilgisayarında anahtar üret
ssh-copy-id ali@10.0.0.5                  # açık anahtarı sunucuya kopyala
ssh ali@10.0.0.5                          # artık şifresiz bağlan
scp model.gguf ali@10.0.0.5:/opt/models/  # dosya kopyala`, 'bash'),
      p('Sunucuda şifreyle girişi kapatıp sadece anahtarla girişe izin vermek (<code>/etc/ssh/sshd_config</code> içinde <code>PasswordAuthentication no</code>) ve <code>ufw</code> ile yalnızca gereken portları açmak iyi bir başlangıçtır.'),
      h('5. Uygulamayı servis yapmak: systemd'),
      p('Terminali kapatınca duran bir süreç üretim için uygun değildir. <strong>systemd</strong> servisi açılışta başlatır, çökerse yeniden başlatır ve loglarını toplar.'),
      code(`
# /etc/systemd/system/rag-api.service
[Unit]
Description=RAG API
After=network.target

[Service]
User=ragapp
WorkingDirectory=/opt/rag
EnvironmentFile=/opt/rag/.env
ExecStart=/opt/rag/.venv/bin/uvicorn app:app --host 127.0.0.1 --port 8000
Restart=on-failure

[Install]
WantedBy=multi-user.target`, 'rag-api.service'),
      code(`
sudo systemctl daemon-reload
sudo systemctl enable --now rag-api     # açılışta başlat + şimdi başlat
systemctl status rag-api
journalctl -u rag-api -f                 # canlı loglar`, 'bash'),
      h('6. Kaynakları izlemek'),
      table(['Komut', 'Ne gösterir?'], [
        ['<code>htop</code>', 'CPU ve RAM kullanan süreçler'],
        ['<code>free -h</code>', 'Toplam / kullanılan RAM'],
        ['<code>df -h</code>, <code>du -sh *</code>', 'Disk doluluğu, klasör boyutları (model dosyaları çok yer kaplar)'],
        ['<code>nvidia-smi</code>', 'GPU modeli, VRAM kullanımı, sürücü ve CUDA sürümü, GPU kullanan süreçler'],
        ['<code>ss -tlnp</code>', 'Hangi portu hangi süreç dinliyor']
      ]),
      task('Bir Ubuntu sanal makinesinde (ya da WSL / Multipass) ayrı bir kullanıcı oluştur, küçük bir Python HTTP servisini systemd ile çalıştır, <code>journalctl</code> ile loglarını izle ve sunucuyu yeniden başlatınca servisin kendiliğinden açıldığını doğrula.'),
      h('Sık yapılan hatalar'),
      mistakes([
        ['Servisi root ile çalıştırmak', 'User=ragapp', 'Bir açık tüm sunucuyu ele geçirtir.'],
        ['chmod 777', 'Gereken en az izin (ör. 600, 755)', 'Herkese yazma izni vermek güvenlik açığıdır.'],
        ['nohup python app.py &', 'systemd servisi', 'Çökünce yeniden başlamaz, loglar kaybolur.'],
        ['Diski izlememek', 'df -h ile düzenli kontrol', 'Model ve log dosyaları diski doldurunca servis çöker.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Servise özel kullanıcı', text: 'Her uygulama kendi kullanıcısıyla, gereken en az izinle çalışmalı.' },
      { type: 'good', title: 'journalctl ile hata ayıkla', text: 'Servis başlamıyorsa önce: systemctl status, sonra journalctl -u servis -e.' },
      { type: 'bad', title: 'Sunucuda elle düzenleme alışkanlığı', text: 'Kurulum adımlarını bir betikte ya da Dockerfile\'da tut; elle yapılan değişiklik unutulur.' }
    ],
    questions: [
      q('Kabuk', 'Bir log dosyasına eklenen satırları canlı izlemek için hangi komut kullanılır?', ['cat app.log', 'tail -f app.log', 'ls -la app.log', 'rm app.log'], 1, 'tail -f dosyanın sonunu izler ve yeni satırları anında gösterir.'),
      qc('İzinler', 'Bu komuttan sonra .env dosyasını kimler okuyabilir?', 'chmod 600 /opt/rag/.env', ['Herkes', 'Sadece dosyanın sahibi', 'Sahip ve grubu', 'Kimse'], 1, '600 = sahip okuma + yazma, grup ve diğerleri hiçbir izin yok.'),
      q('Güvenlik', 'Bir RAG API servisini hangi kullanıcıyla çalıştırmak doğrudur?', ['root', 'Servise özel, yetkisi sınırlı bir kullanıcı', 'Herkesin kullandığı ortak bir hesap', 'Fark etmez'], 1, 'En az yetki ilkesi: servis ele geçirilse bile zarar sınırlı kalır.'),
      q('Paketler', 'Ubuntu\'da yeni bir paket kurmadan önce genellikle hangi komut çalıştırılır?', ['sudo apt update', 'sudo reboot', 'pip freeze', 'systemctl enable'], 0, 'apt update paket listesini yeniler; böylece güncel sürüm kurulur.'),
      q('SSH', 'Sunucuya şifresiz ve güvenli giriş için önerilen yöntem hangisi?', ['Şifreyi bir dosyaya yazmak', 'SSH anahtar çifti (ssh-keygen + ssh-copy-id)', 'Telnet', 'Root şifresini paylaşmak'], 1, 'Anahtar tabanlı giriş hem daha güvenli hem daha pratiktir.'),
      qc('systemd', 'Servis dosyasındaki bu satır ne sağlar?', 'Restart=on-failure', ['Servis her saat yeniden başlar', 'Servis hata ile kapanırsa systemd onu yeniden başlatır', 'Sunucu her açılışta yeniden başlar', 'Loglar silinir'], 1, 'Çöken servis otomatik olarak yeniden ayağa kaldırılır.'),
      q('systemd', '"systemctl enable --now rag-api" komutu ne yapar?', ['Servisi sadece şimdi başlatır', 'Servisi açılışta başlayacak şekilde ayarlar ve hemen başlatır', 'Servisi siler', 'Servisin loglarını gösterir'], 1, 'enable = açılışta başlat, --now = şimdi de başlat.'),
      q('Loglar', 'rag-api servisinin loglarını görmek için hangi komut kullanılır?', ['journalctl -u rag-api', 'cat /etc/rag-api', 'nvidia-smi', 'apt logs rag-api'], 0, 'systemd servislerinin çıktısı journald\'a gider ve journalctl ile okunur.'),
      q('İzleme', 'Sunucudaki GPU\'nun VRAM kullanımını hangi komut gösterir?', ['free -h', 'df -h', 'nvidia-smi', 'htop'], 2, 'nvidia-smi GPU modeli, VRAM kullanımı ve GPU kullanan süreçleri listeler.'),
      q('İzleme', 'Model dosyaları indirilirken sunucu "No space left on device" hatası verdi. İlk kontrol edilecek komut hangisi?', ['df -h', 'free -h', 'ss -tlnp', 'whoami'], 0, 'df -h disk bölümlerinin doluluk oranını gösterir.')
    ]
  },

  // 3 ────────────────────────────────────────────────────────────────────────
  {
    id: 'ai-s1-03',
    title: 'Docker ile Paketleme ve Çalıştırma',
    duration: '50 dk',
    description: "Image ve container, Dockerfile, katman önbelleği, volume, port, docker compose ve GPU'lu container.",
    deepDive: [
      goal('Bir Python AI servisini Dockerfile ile paketleyebilir, docker compose ile veritabanıyla birlikte ayağa kaldırabilir ve GPU kullanan bir container çalıştırabilirsin.'),
      why('Docker, ilanda açıkça isteniyor. Bir RAG sistemi genellikle birden çok parçadan oluşur: API, vektör veritabanı, LLM sunucusu, gateway. Bunları her ortamda aynı şekilde çalıştırmanın standart yolu container\'lardır.'),
      h('Temel kavramlar'),
      table(['Kavram', 'Açıklama'], [
        ['Image', 'Uygulamanın ve bağımlılıklarının salt okunur paketi (tarif + malzemeler)'],
        ['Container', "Bir image'ın çalışan örneği (pişmiş yemek)"],
        ['Dockerfile', 'Image\'ın nasıl oluşturulacağını anlatan dosya'],
        ['Volume', 'Container silinse de kalan kalıcı veri (veritabanı dosyaları, modeller)'],
        ['Registry', "Image'ların saklandığı yer (Docker Hub, şirket içi registry)"]
      ]),
      h('Python servisi için Dockerfile'),
      code(`
FROM python:3.12-slim

WORKDIR /app

# Önce sadece bağımlılıklar: bu katman önbellekte kalır
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Sonra kod: kod değişince sadece buradan sonrası yeniden oluşturulur
COPY . .

RUN useradd -m appuser
USER appuser

EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]`, 'Dockerfile'),
      p('<strong>Katman sırası önemlidir.</strong> requirements.txt kodu kopyalamadan önce kurulursa, kodda yaptığın her değişiklikte paketler yeniden indirilmez. Ayrıca bir <code>.dockerignore</code> dosyasıyla <code>.venv</code>, <code>.env</code> ve <code>.git</code> image\'a girmemelidir.'),
      code(`
docker build -t rag-api:0.1 .
docker run -d --name rag-api -p 8000:8000 --env-file .env rag-api:0.1
docker ps                      # çalışan container'lar
docker logs -f rag-api         # loglar
docker exec -it rag-api bash   # container içine gir
docker stop rag-api && docker rm rag-api`, 'bash'),
      h('docker compose: birden çok servis'),
      code(`
services:
  db:
    image: pgvector/pgvector:pg16
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: rag
    volumes:
      - pgdata:/var/lib/postgresql/data

  api:
    build: .
    env_file: .env
    environment:
      DATABASE_URL: postgresql://postgres:secret@db:5432/rag
    ports:
      - "8000:8000"
    depends_on:
      - db

volumes:
  pgdata:`, 'compose.yaml'),
      p('Compose içindeki servisler birbirine <strong>servis adıyla</strong> ulaşır: API, veritabanına <code>localhost</code> ile değil <code>db</code> adıyla bağlanır. <code>docker compose up -d</code> hepsini başlatır, <code>docker compose logs -f api</code> tek servisin loglarını gösterir.'),
      h('GPU kullanan container'),
      p('Container\'ın NVIDIA GPU\'yu görebilmesi için sunucuda NVIDIA sürücüsü ve <strong>NVIDIA Container Toolkit</strong> kurulu olmalıdır. Ardından:'),
      code(`
docker run --rm --gpus all nvidia/cuda:12.4.1-base-ubuntu22.04 nvidia-smi`, 'bash'),
      code(`
  llm:
    image: ollama/ollama
    volumes:
      - ollama:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]`, 'compose.yaml (parça)'),
      p('Container içinde <code>nvidia-smi</code> GPU\'yu gösteriyorsa kurulum doğrudur. Yerel LLM aşamasında bu yapıyı Ollama ve vLLM ile kullanacağız.'),
      task('Önceki derste yazdığın Python servisini bir Dockerfile ile paketle. pgvector içeren bir Postgres servisiyle birlikte <code>compose.yaml</code> yaz, <code>docker compose up -d</code> ile başlat ve API\'nin veritabanına <code>db</code> adıyla bağlanabildiğini doğrula. Container\'ı silip tekrar başlattığında verinin volume sayesinde kaldığını gör.'),
      h('Sık yapılan hatalar'),
      mistakes([
        ['COPY . . sonra pip install', 'Önce requirements.txt, sonra kod', 'Her kod değişikliğinde tüm paketler yeniden kurulur.'],
        ['.env dosyasını image içine kopyalamak', '.dockerignore + env_file', 'Image paylaşılınca gizli bilgiler sızar.'],
        ['Compose içinde localhost:5432', 'db:5432 (servis adı)', 'Her container\'ın localhost\'u kendisidir.'],
        ['Veritabanını volume olmadan çalıştırmak', 'Adlandırılmış volume', 'Container silinince tüm veri gider.']
      ])
    ].join('\n'),
    bestPractices: [
      { type: 'good', title: 'Küçük ve güvenli image', text: 'slim tabanlı image, root olmayan kullanıcı, .dockerignore.' },
      { type: 'good', title: 'Sürümü etiketle', text: 'rag-api:0.1 gibi etiketler kullan; "latest" ile neyin çalıştığını bilemezsin.' },
      { type: 'bad', title: 'Container içinde elle değişiklik', text: 'docker exec ile yapılan değişiklik container silinince kaybolur; Dockerfile\'a yaz.' }
    ],
    questions: [
      q('Kavram', 'Image ile container arasındaki ilişki hangisidir?', ['Aynı şeydir', 'Container, bir image\'ın çalışan örneğidir', 'Image, container\'ın logudur', 'Container, image\'ların saklandığı yerdir'], 1, 'Image tarif ve malzemedir; container onun çalışan halidir.'),
      qc('Dockerfile', 'Bu sıralamanın faydası nedir?', 'COPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .', ['Image daha renkli görünür', 'Kod değişince paket kurulumu katmanı önbellekten kullanılır', 'Container daha hızlı kapanır', 'GPU desteği açılır'], 1, 'Bağımlılık katmanı değişmediği sürece yeniden oluşturulmaz; build süresi kısalır.'),
      q('Dockerfile', '.dockerignore dosyasına neden .env eklenir?', ['Build hızlansın diye', 'Gizli bilgiler image içine girmesin diye', 'Python sürümünü sabitlemek için', 'Port açmak için'], 1, 'Image paylaşıldığında içindeki her dosya görülebilir.'),
      qc('Çalıştırma', 'Bu komuttaki -p 8000:8000 ne yapar?', 'docker run -d -p 8000:8000 rag-api:0.1', ['8000 MB bellek ayırır', "Sunucunun 8000 portunu container'ın 8000 portuna bağlar", '8000 saniye sonra durdurur', '8000 numaralı GPU\'yu kullanır'], 1, 'Biçim: -p sunucu_portu:container_portu.'),
      q('Compose', 'compose.yaml içindeki api servisi, db servisindeki Postgres\'e hangi adresle bağlanmalıdır?', ['localhost:5432', '127.0.0.1:5432', 'db:5432', '0.0.0.0:5432'], 2, 'Compose ağı içinde servisler birbirine servis adıyla ulaşır.'),
      q('Volume', 'Postgres container\'ını silip yeniden oluşturduğunda verinin kaybolmaması için ne gerekir?', ['Daha büyük bir image', 'Veri klasörünü bir volume\'a bağlamak', 'Container\'ı root ile çalıştırmak', 'docker logs komutu'], 1, 'Volume, container yaşam döngüsünden bağımsız kalıcı depolamadır.'),
      q('Hata ayıklama', 'Çalışan bir container\'ın içinde komut çalıştırmak için hangisi kullanılır?', ['docker exec -it isim bash', 'docker build', 'docker pull', 'docker compose down'], 0, 'docker exec çalışan container içinde yeni bir süreç başlatır.'),
      q('GPU', 'Bir container\'ın NVIDIA GPU\'yu kullanabilmesi için sunucuda ne kurulu olmalıdır?', ['Sadece Python', 'NVIDIA sürücüsü ve NVIDIA Container Toolkit', 'pgvector', 'nginx'], 1, 'Toolkit, Docker\'ın GPU\'yu container\'a aktarmasını sağlar; çalıştırırken --gpus all kullanılır.'),
      qc('GPU', 'Bu komut ne işe yarar?', 'docker run --rm --gpus all nvidia/cuda:12.4.1-base-ubuntu22.04 nvidia-smi', ['CUDA\'yı sunucuya kurar', "Container'ın GPU'yu görüp göremediğini test eder", 'Modeli GPU\'ya yükler', 'GPU sürücüsünü günceller'], 1, 'Container içinden nvidia-smi çalışıyorsa GPU aktarımı doğru kurulmuştur.'),
      q('İyi uygulama', 'Üretimde image etiketi olarak neden "latest" yerine "rag-api:0.3" gibi bir sürüm tercih edilir?', ['latest etiketi yasaktır', 'Hangi sürümün çalıştığı bilinir ve geri dönmek kolaylaşır', 'Sürüm etiketli image daha küçüktür', 'latest GPU\'yu desteklemez'], 1, 'Sabit etiketler tekrarlanabilir dağıtım ve kolay geri alma sağlar.')
    ]
  }
];
