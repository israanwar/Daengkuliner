import { useState } from "react";

const dishes = [
  {
    id: "coto",
    name: "Coto Makassar",
    eyebrow: "Hidangan / 01",
    intro: "Semangkuk kuah pekat yang mengajak kita memperhatikan rasa, bahan, dan cerita di balik makan bersama.",
    ingredients: ["Kaldu sapi", "Rempah hangat", "Daun bawang", "Ketupat"],
    texture: "Berkuah, hangat, dan berlapis. Setiap sendok bergerak antara gurih kaldu, potongan daging, dan rempah yang pelan muncul.",
    context: "Di sini, Coto dibaca sebagai pintu masuk untuk mengenal cara sebuah sajian membawa kebiasaan makan dan percakapan ke satu meja.",
  },
  {
    id: "konro",
    name: "Konro",
    eyebrow: "Hidangan / 02",
    intro: "Potongan iga dan bumbu yang dalam menjadi catatan tentang kesabaran, panas, dan rasa yang tinggal lebih lama.",
    ingredients: ["Iga sapi", "Bumbu sangrai", "Asam", "Rempah"],
    texture: "Kaya dan perlahan: daging yang lembut bertemu kuah atau bumbu yang pekat, dengan aroma rempah yang menetap.",
    context: "Konro memberi jalur lain untuk membaca dapur Makassar—dari teknik memasak yang sabar sampai ritual berbagi di meja.",
  },
  {
    id: "pallubasa",
    name: "Pallubasa",
    eyebrow: "Hidangan / 03",
    intro: "Sajian berkuah yang menempatkan kekayaan rasa di tengah, untuk dinikmati dengan perhatian yang tidak terburu-buru.",
    ingredients: ["Kuah sapi", "Kelapa sangrai", "Rempah", "Pelengkap"],
    texture: "Gurih, beraroma sangrai, dan akrab. Teksturnya memberi kedalaman yang berbeda dari satu suapan ke suapan lain.",
    context: "Catatan ini tidak membakukan satu resep; ia mengajak pembaca melihat bagaimana bahan dan cara saji membentuk karakter tiap tempat.",
  },
  {
    id: "pisang-epe",
    name: "Pisang Epe",
    eyebrow: "Hidangan / 04",
    intro: "Pisang yang dipipihkan dan dipanggang: sederhana dalam bentuk, lalu berkembang melalui aroma arang dan pelengkap manis.",
    ingredients: ["Pisang", "Panas arang", "Gula", "Saus pendamping"],
    texture: "Hangat, lembut, dan sedikit berasap. Sisi karamel hadir sebagai kontras pada gigitan yang ringan.",
    context: "Pisang Epe membuka ruang untuk membicarakan momen sore, jajanan jalanan, dan bagaimana rasa bisa melekat pada sebuah suasana.",
  },
];

const tabs = ["Bahan", "Tekstur", "Konteks"];
const assetUrl = (file) => `${import.meta.env.BASE_URL}assets/${file}`;

export function App() {
  const [activeDishId, setActiveDishId] = useState("coto");
  const [activeTab, setActiveTab] = useState("Bahan");
  const [menuOpen, setMenuOpen] = useState(false);
  const activeDish = dishes.find((dish) => dish.id === activeDishId) ?? dishes[0];

  const selectDish = (dishId) => {
    setActiveDishId(dishId);
    setActiveTab("Bahan");
  };

  const tabContent = {
    Bahan: (
      <div className="ingredient-state">
        <img src={assetUrl("dk-spices.png")} alt="Rempah dan bahan segar yang ditata untuk catatan rasa." />
        <ul aria-label={`Bahan yang dibaca pada ${activeDish.name}`}>
          {activeDish.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}
        </ul>
      </div>
    ),
    Tekstur: <p className="tab-copy">{activeDish.texture}</p>,
    Konteks: <p className="tab-copy">{activeDish.context}</p>,
  };

  return (
    <main>
      <a className="skip-link" href="#dish-panel">Langsung ke catatan hidangan</a>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Daengkuliner, kembali ke awal">Daengkuliner</a>
        <p>Atlas rasa Makassar</p>
        <nav className="top-nav" aria-label="Navigasi utama">
          <a href="#catatan">Catatan</a>
          <a href="#tentang">Tentang</a>
          <button type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((isOpen) => !isOpen)}>{menuOpen ? "Tutup" : "Menu"}</button>
        </nav>
        {menuOpen && (
          <div className="menu-popover">
            <a href="#catatan" onClick={() => setMenuOpen(false)}>Catatan hidangan</a>
            <a href="#tentang" onClick={() => setMenuOpen(false)}>Tentang proyek</a>
          </div>
        )}
      </header>

      <section id="top" className="atlas" aria-labelledby="dish-title">
        <aside className="dish-rail" aria-label="Pilih hidangan untuk dijelajahi">
          <p className="rail-label">Rasa berlapis</p>
          <p className="rail-subtitle">Makassar<br />Food Atlas</p>
          <div className="rail-list" role="tablist" aria-label="Daftar hidangan">
            {dishes.map((dish, index) => (
              <button
                type="button"
                key={dish.id}
                role="tab"
                aria-selected={dish.id === activeDishId}
                className={dish.id === activeDishId ? "rail-item is-active" : "rail-item"}
                onClick={() => selectDish(dish.id)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>{dish.name}
              </button>
            ))}
          </div>
          <a href="#catatan" className="rail-link">Jelajahi catatan</a>
        </aside>

        <figure className="atlas-image">
          <img src={assetUrl("dk-atlas-hero.png")} alt="Sajian Coto Makassar, iga berbumbu, ketupat, sambal, dan jeruk nipis dilihat dari atas." />
          <figcaption>Atlas rasa / bahan, tekstur, konteks</figcaption>
        </figure>

        <section id="dish-panel" className="dish-panel" aria-live="polite">
          <p className="eyebrow">{activeDish.eyebrow}</p>
          <h1 id="dish-title">{activeDish.name}</h1>
          <p className="dish-intro">{activeDish.intro}</p>

          <div className="tab-row" role="tablist" aria-label={`Catatan untuk ${activeDish.name}`}>
            {tabs.map((tab) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                className={activeTab === tab ? "tab-button is-active" : "tab-button"}
                key={tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="tab-panel" role="tabpanel">{tabContent[activeTab]}</div>

          <a className="explore-button" href="#catatan">Baca catatan hidangan</a>
          <p className="prototype-note">Pembacaan rasa untuk prototype portofolio; bukan daftar tempat makan atau resep baku.</p>
        </section>
      </section>

      <section id="catatan" className="story-section" aria-labelledby="story-title">
        <div className="story-layout">
          <figure className="story-image">
            <img src={assetUrl("dk-coto.png")} alt="Semangkuk Coto Makassar dengan ketupat di atas meja berwarna terang." />
          </figure>
          <div className="story-copy">
            <p className="eyebrow">Catatan hidangan / 01</p>
            <h2 id="story-title">Memulai dari semangkuk Coto.</h2>
            <p>
              Rasa bisa menjadi cara yang pelan untuk mengenal suatu kota. Mulailah dari apa yang
              ada di mangkuk: aroma, bahan, tekstur, lalu percakapan yang muncul saat makan bersama.
            </p>
            <button className="story-select" type="button" onClick={() => selectDish("coto")}>Lihat Coto di atlas</button>
          </div>
        </div>
      </section>

      <section id="tentang" className="about-section" aria-labelledby="about-title">
        <div>
          <p className="eyebrow">Tentang Daengkuliner</p>
          <h2 id="about-title">Panduan untuk melihat rasa lebih dekat.</h2>
        </div>
        <p>
          Daengkuliner merangkai hidangan sebagai pintu masuk: apa yang menyusunnya, bagaimana
          teksturnya terasa, dan konteks apa yang bisa dipelajari. Seluruh konten di sini adalah
          demonstrasi editorial untuk portofolio, bukan rekomendasi operasional atau ulasan tempat usaha.
        </p>
      </section>

      <footer>
        <span>Daengkuliner</span>
        <span>Atlas rasa Makassar / prototype portfolio</span>
      </footer>
    </main>
  );
}
