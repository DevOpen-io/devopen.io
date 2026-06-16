# DevOpen Ekip Tanıtım Sitesi — Geliştirici Prompt

## 🎯 Görev Tanımı

Aşağıda detaylı bilgileri verilen **DevOpen** yazılım ekibinin tanıtım sitesini oluştur. Site; ekibin kimliğini, üyelerini, projelerini ve yeteneklerini anlatacak — ama bunu yaparken ziyaretçiyi şaşırtacak, sıradan bir portföy sitesinden tamamen farklı bir deneyim sunacak şekilde tasarlanmalıdır.

**Temel kural:** Site önce kullanılabilir, sonra etkileyici olmalıdır. Animasyonlar ve görsel efektler içeriğin üzerine inşa edilir, içeriğin yerine geçmez. Bir ziyaretçi JavaScript'i devre dışı bıraksa bile siteyi okuyabilmeli; ama açık olduğunda bir deneyim yaşamalıdır.

---

## 🏗️ Teknoloji Yığını

```
HTML5
CSS3 (custom properties, animations, grid, flexbox)
Vanilla JavaScript (ES6+)
Three.js — CDN üzerinden, sadece destekleyici görsel katman olarak
GSAP veya Anime.js — CDN üzerinden, scroll ve sayfa animasyonları için
```

**Framework, build tool, paket yöneticisi kullanılmayacak.** Proje tek bir `index.html` dosyası veya birkaç ayrı dosyadan (HTML + CSS + JS) oluşacak — doğrudan tarayıcıda açılabilecek ve GitHub Pages'e olduğu gibi push'lanabilecek şekilde.

Tüm kütüphaneler CDN üzerinden yüklenecek:
```html
<!-- Three.js -->
<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>

<!-- GSAP (animasyonlar için) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&family=JetBrains+Mono&display=swap" rel="stylesheet">
```

---

## ⚙️ GitHub Pages Deployment Gereksinimleri

Site **GitHub Pages** üzerinde barındırılacak. Vanilla HTML/CSS/JS kullanıldığı için deployment son derece basittir:

- Dosya yapısı:
  ```
  /
  ├── index.html
  ├── style.css
  └── script.js
  ```
- Tüm asset path'leri **relative** olacak (`./style.css`, `./script.js`) — absolute path (`/style.css`) kullanılmayacak
- Build adımı yok — dosyalar doğrudan `main` branch'ına push'lanır
- GitHub repo → Settings → Pages → Branch: `main` → `/root` → Save
- Deploy tamamlandığında site `https://devopen-io.github.io/repo-adı/` adresinde yayında olur
- Fontlar ve kütüphaneler CDN üzerinden geldiği için lokal dosya gerekmez
- Tüm API çağrısı olmayacak; site tamamen statik

---

## 📧 Ekip ve İletişim Bilgileri

- **Org E-posta:** info@devopen.io
- **GitHub Org:** https://github.com/DevOpen-io
- **Toplam Repo:** 9 public repository
- **Üç kurucu da École 42 mezunu** — güçlü C/C++ temeli, algoritmatik düşünce yapısı
- **Ana ekosistem:** Flutter / Dart
- **İstanbul merkezli, açık kaynak odaklı** — tüm projeler MIT lisanslı
- **GDG İstanbul gönüllüsü** (Sena — 3 yıl)

---

## 👥 Ekip Üyeleri

### Eren Gun (Erengun)
- **Rol:** Co-founder, Mobile & Backend Developer
- **GitHub:** https://github.com/erengun
- **GitHub Avatar:** https://avatars.githubusercontent.com/u/70534390?v=4
- **Website:** https://erengun.dev
- **LinkedIn:** https://linkedin.com/in/erengun
- **Eğitim:** École 42 — Bilgisayar Bilimleri
- **Diller:** Dart, Go, JavaScript, C/C++
- **Alanlar:** Mobil geliştirme, açık kaynak, cross-platform
- **Teknolojiler:** Flutter, Riverpod, GoRouter, Hive, Go, Node.js

### Zeynep Sena Doğan (Sena-dogan)
- **Rol:** Co-founder, UI/UX Designer & Mobile Developer
- **GitHub:** https://github.com/sena-dogan
- **GitHub Avatar:** https://avatars.githubusercontent.com/u/93337596?v=4
- **LinkedIn:** https://linkedin.com/in/sena-dogan-dev
- **Eğitim:**
  - Yıldız Teknik Üniversitesi — Fizik (2021–devam)
  - École 42 — C/C++ (2021–2023)
  - Anadolu Üniversitesi — Görsel İletişim Tasarımı (2025–devam)
  - QWorld — Kuantum Programlama, QBronze Sertifikası (2025)
- **Diller:** Dart, C/C++, Swift
- **Alanlar:** Mobil geliştirme, UI/UX tasarımı, ürün tasarımı
- **Teknolojiler:** Flutter, Qt 6, SwiftUI, Figma

### Talha Aksoy (TalhaAksoy)
- **Rol:** Co-founder, Front-End Developer
- **GitHub:** https://github.com/talhaaksoy
- **GitHub Avatar:** https://avatars.githubusercontent.com/u/56833887?v=4
- **Website:** https://42saksoy.netlify.app
- **Eğitim:** École 42 İstanbul
- **Diller:** JavaScript, TypeScript, C/C++
- **Alanlar:** Front-end geliştirme, web teknolojileri, sistem programlama
- **Teknolojiler:** HTML, CSS, JavaScript, TypeScript, React

---

## 🚀 Öne Çıkan Projeler

### Dondurma RSS Reader
- **Repo:** https://github.com/DevOpen-io/dondurma-rss-reader
- **Yıldız:** 4 | **Releases:** 6 (son: v1.0.1 — 30 Mayıs 2026)
- **Açıklama:** Flutter ve Material 3 ile geliştirilmiş açık kaynak RSS/Atom haber okuyucu. Algoritma yok, takip yok — sadece senin akışların.
- **Platform:** Android, iOS, Web, Windows, macOS, Linux
- **Teknolojiler:** Flutter 3.11+, Provider, Hive CE, GoRouter, catppuccin_flutter, Google Fonts
- **Öne Çıkan Özellikler:**
  - 9 tema (Catppuccin Latte, Frappé, Macchiato, Mocha dahil)
  - Tam metin çıkarma (excerpt-only feed'lerden)
  - Uygulama içi tarayıcı + reklam engelleyici (EasyList + AdGuard)
  - OPML içe/dışa aktarım
  - Çevrimdışı önbellekleme, skeleton shimmer yükleme
  - Sessiz saatler ve bildirim özeti modu
  - İngilizce & Türkçe tam lokalizasyon

### SubZilla
- **Repo:** https://github.com/DevOpen-io/SubZilla
- **Demo:** https://subzilla.netlify.app
- **Yıldız:** 3 | **Fork:** 2 | **Releases:** 31 (son: v1.0.0+73 — 11 Mart 2026)
- **Açıklama:** Aylık abonelikleri takip etmek ve bütçeyi kontrol altında tutmak için Flutter uygulaması.
- **Teknolojiler:** Flutter, Riverpod, sqflite, fl_chart, Freezed, easy_localization, Fastlane
- **Öne Çıkan Özellikler:**
  - İnteraktif harcama grafikleri
  - Takvim görünümü
  - Akıllı bildirimler (ödeme öncesi uyarı)
  - Yerel veritabanı (veri cihazda kalır)
  - Dark mode, özel temalar, para birimi ayarları

### Diğer Projeler
- **DumbPosting** — İşverenlerin değerlendirildiği, AI destekli CV oluşturucu içeren platform
- **naisho-secure-sms-app** — Flutter ile E2E şifreli SMS istemcisi
- **PlaceholderAnimation** — Input placeholder animasyonları (TypeScript)

---

## 🖥️ Site Yapısı ve Section Detayları

### Navbar
- Sabit (sticky), frosted glass görünümü: `backdrop-blur` + `bg-background/80`
- Scroll yaptıkça blur ve opaklık artar
- Logo solda, navigasyon linkleri sağda
- Linkler: Hakkımızda · Ekip · Projeler · İletişim (hepsi smooth scroll)
- Mobilde hamburger menü — açılınca tam ekran overlay, linkler stagger animasyonla girer
- Aktif section'a göre nav linki vurgulanır (`IntersectionObserver` ile)

### Section 1: Hero
- Tam ekran, dikey ortalanmış
- Büyük ve güçlü tipografi ile "DevOpen" ismi — masaüstü `text-8xl`, mobil `text-4xl`
- Tagline: *"We build open. We build bold."*
- İkincil açıklama: İstanbul'dan dünyaya açık kaynak yazılım üreten 3 kişilik ekip
- CTA butonu: "Projelerimizi Keşfet" — scroll trigger
- Arka plan: GSAP veya CSS animation ile hafif parçacık/gradient efekti — arka planda kalır, içeriği engellemez
- Scroll göstergesi (aşağı ok, CSS `animation: bounce`)

### Section 2: Hakkımızda
- Sol: Büyük vurgulu başlık + paragraflar
- Sağ: Sayaç kartları — `9 Repo`, `3 Kurucu`, `31+ Release`, `6 Platform` (viewport'a girilince 0'dan sayar)
- Ortak nokta vurgusu: Üçü de École 42 mezunu, üçü de İstanbul'da, üçü de açık kaynak inancıyla çalışıyor
- Arka plan: Statik veya çok hafif animasyonlu geometric pattern (SVG)

### Section 3: Ekip
- 3 kart yan yana (masaüstü), tek kolon (mobil)
- Her kart:
  - GitHub avatar (yuvarlak, `object-cover`)
  - İsim + rol
  - Eğitim bilgisi
  - Kullandığı diller ve alanlar
  - Tech stack — ikonlar için **SVG logolar** kullanılacak (SimpleIcons CDN: `https://cdn.simpleicons.org/{slug}/white`)
  - GitHub ve varsa LinkedIn + website linkleri (SVG ikon ile)
- Kart stili: Glassmorphism (`backdrop-filter: blur()`, hafif border, subtle glow)
- Hover: Hafif 3D tilt (CSS `perspective` + `rotateX`/`rotateY` — `mousemove` event ile JS); mobilde devre dışı
- Arka plan: Her kartın arkasında imleç pozisyonuna göre kayan gradient spotlight (JS `mousemove` + CSS custom property ile)

### Section 4: Projeler
- Dondurma ve SubZilla için büyük showcase kartları
- Her kart:
  - Proje ismi + kısa açıklama
  - Tech stack logoları (SVG — Flutter logosu için `https://cdn.simpleicons.org/flutter`, Dart için `https://cdn.simpleicons.org/dart` vb.)
  - Platform/feature badge'leri
  - Yıldız sayısı (GitHub ikonu yanında)
  - GitHub repo linki + varsa demo linki
- Hover: Kart hafifçe öne çıkar (scale + shadow)
- Diğer projeler: Daha küçük, grid kartlar olarak listelenir

### Section 5: Tech Stack
- Ekibin kullandığı teknolojiler grid halinde
- Her teknoloji: **Resmi SVG logo** + isim
- Logo kaynakları:
  - Flutter: `https://cdn.simpleicons.org/flutter`
  - Dart: `https://cdn.simpleicons.org/dart`
  - React: `https://cdn.simpleicons.org/react`
  - TypeScript: `https://cdn.simpleicons.org/typescript`
  - Go: `https://cdn.simpleicons.org/go`
  - GitHub: `https://cdn.simpleicons.org/github`
  - Android: `https://cdn.simpleicons.org/android`
  - Apple/iOS: `https://cdn.simpleicons.org/apple`
  - Linux: `https://cdn.simpleicons.org/linux`
  - Riverpod: metin badge (özel logosu yok)
  - SQLite: `https://cdn.simpleicons.org/sqlite`
  - Fastlane: `https://cdn.simpleicons.org/fastlane`
- Hover: İkon hafifçe büyür (`transform: scale(1.15)`), isim tooltip olarak çıkar
- Arka plan: Çok hafif, yavaş dönen geometrik şekil (CSS `@keyframes` animation, Three.js değil)

### Section 6: İletişim
- Büyük başlık: "Birlikte çalışalım"
- E-posta: info@devopen.io (tıklanabilir `mailto:` linki)
- GitHub Org linki (GitHub SVG logosu ile)
- Footer: © 2026 DevOpen · MIT Licensed

---

## 🎨 Görsel Kimlik

### Renk Paleti

**Koyu Tema (varsayılan)**
```
--bg-primary:     #0a0a0f
--bg-secondary:   #0f1117
--surface:        #161b27
--accent-orange:  #f97316
--accent-blue:    #3b82f6
--accent-amber:   #f59e0b
--text-primary:   #f8fafc
--text-secondary: #94a3b8
--border:         rgba(255, 255, 255, 0.08)
--glow:           rgba(249, 115, 22, 0.12)
```

**Aydınlık Tema**
```
--bg-primary:     #f8f7f4
--bg-secondary:   #f0ede8
--surface:        #ffffff
--accent-orange:  #ea6c0a
--accent-blue:    #2563eb
--accent-amber:   #d97706
--text-primary:   #0f0e0d
--text-secondary: #6b7280
--border:         rgba(0, 0, 0, 0.08)
--glow:           rgba(234, 108, 10, 0.10)
```

Aydınlık tema kağıt-beyazı değil, hafif sıcak kırık beyaz tonlarında — `#f8f7f4` ve `#f0ede8` — göz yormayan, organik bir his verir. Aksan renkleri aydınlık zeminde kontrastı korumak için biraz koyulaştırılmıştır.

**Tema geçişi:** `<html>` veya `<body>` elementine `data-theme="light"` / `data-theme="dark"` attribute'u ile CSS custom property'ler üzerinden yönetilecek. JavaScript ile toggle, `localStorage`'a kaydedilecek. Kullanıcının sistem tercihi (`prefers-color-scheme`) varsayılan olarak uygulanacak.

### Tipografi
- Başlıklar: `Space Grotesk` veya `Geist` — bold, geometric
- Gövde: `Inter`
- Kod: `JetBrains Mono`
- Fontlar Google Fonts CDN üzerinden yüklenir

### Logo ve İkon Kullanımı
- Teknoloji logoları için **asla emoji kullanılmaz**
- Tüm teknoloji ikonları SimpleIcons (`https://cdn.simpleicons.org/{slug}`) veya Devicon CDN üzerinden SVG olarak yüklenir
- Renk modu: Koyu arka planda beyaz/açık renkli logo versiyonları tercih edilir — SimpleIcons `?color=white` parametresini destekler: `https://cdn.simpleicons.org/flutter/white`
- GitHub avatarları: `https://avatars.githubusercontent.com/u/{USER_ID}?v=4` doğrudan `<img>` olarak kullanılır

### Animasyon Kuralları
- `prefers-reduced-motion: reduce` aktifse tüm animasyonlar anında geçişe döner
- Animasyon süreleri: micro → 150–300ms, normal → 400–600ms, dramatik giriş → 800–1000ms
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease out expo) tercih edilir
- Scroll tetiklemeli animasyonlar: `IntersectionObserver` ile, threshold `0.15`
- Hover efektleri `@media (hover: hover)` ile koşullandırılır — dokunmatik ekranlarda tetiklenmez

---

## 📱 Responsive Tasarım

Responsive, masaüstünü küçültmek değildir. Her ekranda aynı içerik, her ekrana özgü bir düzen ve his sunulur.

### Breakpoint Sistemi (CSS media queries)
```
sm:  640px   → Büyük telefon
md:  768px   → Tablet dikey
lg:  1024px  → Tablet yatay / küçük laptop
xl:  1280px  → Standart laptop
2xl: 1536px  → Geniş ekran
```

### Navbar
| Masaüstü | Mobil |
|---|---|
| Yatay menü, tüm linkler görünür | Hamburger ikonu |
| Logo solda, linkler sağda | Logo merkezde |
| Hover'da link altçizgi animasyonu | Açılınca full-screen overlay, stagger giriş |

### Tipografi Ölçeği
| Kullanım | Masaüstü | Tablet | Mobil |
|---|---|---|---|
| Hero başlık | `6–7rem` | `4rem` | `2.5rem` |
| Section başlığı | `3rem` | `2.5rem` | `2rem` |
| Alt başlık | `1.5rem` | `1.25rem` | `1.125rem` |
| Gövde | `1rem` | `1rem` | `0.9rem` |
| Kod | `0.875rem mono` | `0.875rem` | `0.75rem` |

### Ekip Kartları
| Masaüstü | Tablet | Mobil |
|---|---|---|
| 3 kolon grid | 2 kolon (ortaki tam genişlik) | Tek kolon |
| Hover: 3D tilt (CSS perspective + JS) | Hover: scale(1.03) | Tap: glow pulse, tilt yok |
| Mouse spotlight | Sabit gradient | Statik gradient |
| Avatar 96px | 80px | 72px |

### Projeler
| Masaüstü | Tablet | Mobil |
|---|---|---|
| 2 büyük kart yan yana | Tek kolon | Tek kolon |
| Hover: öne çıkma (scale + shadow) | Aynı | Tap: border glow |
| Badge'ler tek satır | Wrap eder | Küçülür, wrap eder |

### Tech Stack Grid
| Masaüstü | Tablet | Mobil |
|---|---|---|
| 6 kolon grid | 4 kolon | 3 kolon |
| İkon + isim altında | Aynı | İkon + isim küçük |

### Animasyonlar — Mobil Davranış
| Efekt | Masaüstü | Mobil |
|---|---|---|
| Mouse parallax | `mousemove` event ile X/Y takibi | Scroll-based parallax (`scroll` event) |
| 3D tilt (kartlar) | CSS `perspective` + JS `mousemove` | Devre dışı |
| Stagger gecikmesi | 80ms | 60ms |
| Hover efektleri | Tam aktif | `@media (hover: hover)` ile koşullu |
| Glassmorphism blur | `backdrop-filter: blur(24px)` | `backdrop-filter: blur(12px)` |

### Spacing
- Masaüstü section padding: `8rem` dikey, `2rem` yatay
- Tablet: `6rem` dikey, `1.5rem` yatay
- Mobil: `4rem` dikey, `1rem` yatay
- Container max-width: `1280px`, `margin: 0 auto`
- Mobilde yatay scroll **kesinlikle yok**
- Touch target minimum: 44×44px

### `prefers-reduced-motion`
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🔗 Tüm Linkler

- GitHub Org: https://github.com/DevOpen-io
- Eren GitHub: https://github.com/erengun — Website: https://erengun.dev — LinkedIn: https://linkedin.com/in/erengun
- Sena GitHub: https://github.com/sena-dogan — LinkedIn: https://linkedin.com/in/sena-dogan-dev
- Talha GitHub: https://github.com/talhaaksoy — Website: https://42saksoy.netlify.app
- Dondurma RSS Reader: https://github.com/DevOpen-io/dondurma-rss-reader
- SubZilla: https://github.com/DevOpen-io/SubZilla — Demo: https://subzilla.netlify.app
- İletişim: info@devopen.io
- Noto Emoji Animation: https://googlefonts.github.io/noto-emoji-animation/
- SimpleIcons CDN: https://cdn.simpleicons.org/{slug}/white

---

*Prompt by Claude — DevOpen Team Portfolio Site, June 2026*
