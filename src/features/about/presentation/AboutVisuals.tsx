import Image from 'next/image';

export function AboutVisuals() {
  return (
    <>
      {/* BANNER FOTOGRÁFICO FULL-BLEED EDITORIAL */}
      <section className="relative w-full h-[460px] md:h-[580px] bg-surface-container-lowest overflow-hidden">
        <Image
          src="https://lh3.googleusercontent.com/aida/AEtjO1U9r2ZFGuS1BdwYJ13OkYMK0lBhNEuJ7GB5yJ4JmeYVeEZReDKuSofpdSIazeYJbFQoLBvD58G7r5pu6hmT7TejmsKoZoTLT48QC28W_QKVhWr5P_QFZ7fp_xBAWp1JP0uNk74UWr30vLMOMNrDGxG9o3ghAgLEImKjinlQrkmlyWJTM9Ince2PkfJNaOKsDxIZM_L6uDBtDli9slLQ00PHXXWsklqiu_nbCfdAkDbqI1IUR3WAKKvq"
          alt="Bateador en swing pleno nocturno bajo reflectores"
          fill
          className="object-cover object-center filter brightness-75 contrast-125"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/80 via-transparent to-surface-container-lowest/80" />

        <div className="absolute bottom-0 left-0 right-0 max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop pb-12">
          <div className="max-w-xl space-y-3 bg-surface-container-lowest/85 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-surface-container-highest/50 shadow-2xl">
            <span className="font-label-caps text-[10px] uppercase text-secondary tracking-widest">
              Secuencia Cinética
            </span>
            <h4 className="font-headline-md text-[24px] uppercase text-primary leading-tight">
              La Fracción Inmóvil
            </h4>
            <p className="font-body-sm text-[14px] text-on-surface-variant">
              Poder, polvo de tiza en el home plate y el estruendo contenido de un swing completo.
              Documentamos el instante exacto donde la física se convierte en mitología deportiva.
            </p>
          </div>
        </div>
      </section>

      {/* TRAYECTORIA / HITOS EN TERRENO */}
      <section className="w-full py-16 md:py-24 bg-surface">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="font-label-caps text-[11px] uppercase text-secondary tracking-widest block mb-2">
                Cronología Operativa
              </span>
              <h2 className="font-headline-lg text-[32px] md:text-headline-lg uppercase text-primary">
                Nuestra Trayectoria
              </h2>
            </div>
            <span className="font-stat-numeric text-[24px] text-outline hidden md:block">
              2020 — Presente
            </span>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-8 bg-surface-container-low rounded-xl items-center hover:bg-surface-container transition-colors">
              <div className="md:col-span-3">
                <span className="font-stat-numeric text-[32px] text-primary block">2020</span>
                <span className="font-label-caps text-[11px] uppercase text-outline tracking-wider">
                  Génesis Digital
                </span>
              </div>
              <div className="md:col-span-6 space-y-2">
                <h3 className="font-headline-sm text-[20px] uppercase text-primary">
                  El Inicio • Medio Deportivo
                </h3>
                <p className="font-body-md text-on-surface-variant">
                  Nace El Designado con la premisa de brindar una plataforma a jóvenes comunicadores
                  y devolver el análisis analítico y de calidad a las plataformas digitales,
                  cubriendo la LVBP.
                </p>
              </div>
              <div className="md:col-span-3 flex md:justify-end items-center gap-2">
                <span className="px-3 py-1 bg-surface-container text-on-surface font-label-caps text-[10px] uppercase rounded-full border border-surface-container-highest">
                  Fundación
                </span>
                <span className="px-3 py-1 bg-surface-container text-on-surface font-label-caps text-[10px] uppercase rounded-full border border-surface-container-highest">
                  Caracas
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-8 bg-surface-container-low rounded-xl items-center hover:bg-surface-container transition-colors">
              <div className="md:col-span-3">
                <span className="font-stat-numeric text-[32px] text-primary block">
                  2022 — 2023
                </span>
                <span className="font-label-caps text-[11px] uppercase text-outline tracking-wider">
                  Acreditación Mayor
                </span>
              </div>
              <div className="md:col-span-6 space-y-2">
                <h3 className="font-headline-sm text-[20px] uppercase text-primary">
                  Expansión en Diamante
                </h3>
                <p className="font-body-md text-on-surface-variant">
                  Cobertura acreditada presencial en las finales de la LVBP y el histórico diamante
                  de la Serie del Caribe Gran Caracas 2023. Consolidamos reportajes en terreno y
                  entrevistas exclusivas.
                </p>
              </div>
              <div className="md:col-span-3 flex md:justify-end items-center gap-2">
                <span className="px-3 py-1 bg-surface-container text-on-surface font-label-caps text-[10px] uppercase rounded-full border border-surface-container-highest">
                  Serie del Caribe
                </span>
                <span className="px-3 py-1 bg-surface-container text-on-surface font-label-caps text-[10px] uppercase rounded-full border border-surface-container-highest">
                  LVBP
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-8 bg-surface-container-low rounded-xl items-center hover:bg-surface-container transition-colors">
              <div className="md:col-span-3">
                <span className="font-stat-numeric text-[32px] text-primary block">
                  2024 — 2026
                </span>
                <span className="font-label-caps text-[11px] uppercase text-outline tracking-wider">
                  Horizonte Global
                </span>
              </div>
              <div className="md:col-span-6 space-y-2">
                <h3 className="font-headline-sm text-[20px] uppercase text-primary">
                  Proyección Internacional
                </h3>
                <p className="font-body-md text-on-surface-variant">
                  Presencia en certámenes continentales (Serie de las Américas, Serie del Caribe
                  Miami) y consolidación de la red de corresponsales hacia la cobertura de elite del
                  World Baseball Classic.
                </p>
              </div>
              <div className="md:col-span-3 flex md:justify-end items-center gap-2">
                <span className="px-3 py-1 bg-surface-container text-on-surface font-label-caps text-[10px] uppercase rounded-full border border-surface-container-highest">
                  Latam
                </span>
                <span className="px-3 py-1 bg-primary text-on-primary font-label-caps text-[10px] uppercase rounded-full font-bold">
                  En Marcha
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EL EQUIPO Y LA COMUNICACIÓN */}
      <section className="w-full py-16 md:py-24 bg-surface-container-lowest">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="font-label-caps text-[11px] uppercase text-secondary tracking-widest block mb-2">
                Estructura Humana
              </span>
              <h2 className="font-headline-lg text-[32px] md:text-headline-lg uppercase text-primary">
                Nuestra Comunidad de Comunicadores
              </h2>
            </div>
            <p className="font-body-sm text-on-surface-variant max-w-md">
              Jóvenes comunicadores y corresponsales en el terreno, garantizando una cobertura
              fresca e informada en cada rincón del diamante.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 bg-surface-container-low rounded-xl hover:bg-surface-container transition-colors border border-surface-container-highest/40">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-primary text-[24px]">
                    mic_external_on
                  </span>
                  <span className="font-label-caps text-[11px] uppercase text-secondary">
                    Reportería
                  </span>
                </div>
                <h4 className="font-headline-sm text-[18px] uppercase text-primary mb-2">
                  Cobertura a Pie de Campo
                </h4>
                <p className="font-body-sm text-on-surface-variant">
                  Micrófono en mano desde el dugout, entrevistas post-partido y análisis inmediato
                  al caer el out 27.
                </p>
              </div>
              <div className="p-6 bg-surface-container-low rounded-xl hover:bg-surface-container transition-colors border border-surface-container-highest/40">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-primary text-[24px]">
                    analytics
                  </span>
                  <span className="font-label-caps text-[11px] uppercase text-secondary">
                    Análisis
                  </span>
                </div>
                <h4 className="font-headline-sm text-[18px] uppercase text-primary mb-2">
                  Mesa de Redacción & Sabermetría
                </h4>
                <p className="font-body-sm text-on-surface-variant">
                  Estudio detallado de la actualidad beisbolera. Opiniones fundamentadas, debate
                  respetuoso y contexto histórico.
                </p>
              </div>
              <div className="p-6 bg-surface-container-low rounded-xl hover:bg-surface-container transition-colors border border-surface-container-highest/40">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-primary text-[24px]">
                    photo_camera
                  </span>
                  <span className="font-label-caps text-[11px] uppercase text-secondary">
                    Curaduría Visual
                  </span>
                </div>
                <h4 className="font-headline-sm text-[18px] uppercase text-primary mb-2">
                  El Archivo Plástico
                </h4>
                <p className="font-body-sm text-on-surface-variant">
                  Documentación estética de alta resolución, rescatando la narrativa visual y
                  patrimonial de las ligas de invierno.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-surface-container-low rounded-xl overflow-hidden group border border-surface-container-highest/40">
                <div className="w-full aspect-[4/3] overflow-hidden bg-surface-container relative">
                  <Image
                    src="https://lh3.googleusercontent.com/aida/AEtjO1VBquKi0axF3lmdVWjYIKgUG_YYd4DOCOKM7UbCZIYwqZ-wRr547pp3zKn-J3HnnaB0MsKrhaXdIChOUMOPa814T83ihYFrHo0CxB2AwYc4TyE8T7K3s7pW5sspFbLHO71E7LqR9EVGug26kLKoNpiKiTCtkjq8ZhWEI1Wxlyht_uRi7HAAv_zMDpK7ZdcrDmLzWDu7kwj08CM_HViUPcbvyv_9GWW7Bxf4-5apkNfdu2EzvTspELvR-g"
                    alt="Guante vintage y pelota"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="p-5 space-y-1">
                  <span className="font-label-caps text-[10px] uppercase text-secondary">
                    El Oficio y el Cuero
                  </span>
                  <h5 className="font-headline-sm text-[18px] uppercase text-primary">
                    Naturaleza Muerta • Dugout
                  </h5>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-xl overflow-hidden group border border-surface-container-highest/40">
                <div className="w-full aspect-[4/3] overflow-hidden bg-surface-container relative">
                  <Image
                    src="https://lh3.googleusercontent.com/aida/AEtjO1U0VKQ4K0zLXoVUEQnGhCVJBzD0quoCOfE0yTNgOeGYga-KzFSZDHFNNUm5AhNXfQnMfHkQKtxvfkHdzVy4x9j9QHBbC1_I862l_HG651Qm_GAP6HpY4JUO9v06wixTS9ysq74bK0xCzfEY56UZ6yjh8peneDt8vBCZZb5icmW682f8Uh72dUJ3KrN1_3dMK6jNEZas6pOlN19Rmy0G-H3Xi5EmMf3i1ofFiYeG8G2It46Ri7hchFfm"
                    alt="Infielder en doble play"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="p-5 space-y-1">
                  <span className="font-label-caps text-[10px] uppercase text-secondary">
                    Fracción de Segundo
                  </span>
                  <h5 className="font-headline-sm text-[18px] uppercase text-primary">
                    Doble Play Defensivo
                  </h5>
                </div>
              </div>
              <div className="sm:col-span-2 bg-surface-container-low rounded-xl overflow-hidden flex flex-col md:flex-row items-center border border-surface-container-highest/40">
                <div className="w-full md:w-1/2 aspect-[16/9] md:aspect-auto md:h-[200px] overflow-hidden relative">
                  <Image
                    src="https://lh3.googleusercontent.com/aida/AEtjO1UncTNmTPc4gYuzKAYo2lKy3MZ8fXYEXGPx4T7ENsvj7PPD_1GQ8F5VsgSsLxVrVObsxT4lygouOe-FlEY-zml4OOIaI20-DhtWqoBnrqrVIb_wj4bwjEElT3ok4f2vcc-bAW5k7cSG9Z6rPh0l-huMnHZHnGNh-61Kg4vWL1vgUKpSE64W5xTJns2Z92ef_KMun8dJ_y-bX2CQY9LlyUZGiSYZDa9zD2Dd5YFh84hteX2rlYqWLl3dEg"
                    alt="Lanzador en windup"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="w-full md:w-1/2 p-6 sm:p-8 space-y-3">
                  <span className="font-label-caps text-[10px] uppercase text-secondary">
                    Precisión Mecánica
                  </span>
                  <h5 className="font-headline-sm text-[20px] uppercase text-primary">El Windup</h5>
                  <p className="font-body-sm text-[13px] text-on-surface-variant">
                    El instante en que la respiración se detiene y la pelota emprende vuelo hacia el
                    pentágono.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONEXIÓN Y REDES OFICIALES */}
      <section className="w-full py-16 md:py-24 bg-surface border-t border-surface-container-highest/30">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="font-label-caps text-[11px] uppercase text-secondary tracking-widest block">
              Comunidad
            </span>
            <h2 className="font-headline-lg text-[32px] md:text-headline-lg uppercase text-primary">
              Canales Oficiales
            </h2>
            <p className="font-body-md text-on-surface-variant">
              Forma parte de la tertulia diaria y visualiza nuestra cobertura en tiempo real a
              través de nuestras plataformas principales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="https://instagram.com/eldesignadove"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-surface-container-low rounded-xl flex flex-col justify-between hover:bg-surface-container transition-all group border border-surface-container-highest/40 hover:border-outline"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">photo_camera</span>
                </div>
                <div>
                  <span className="font-label-caps text-[10px] uppercase text-outline block mb-1">
                    Canal Principal
                  </span>
                  <h4 className="font-headline-sm text-[18px] uppercase text-primary">Instagram</h4>
                </div>
                <p className="font-body-sm text-[13px] text-on-surface-variant">
                  @eldesignadove — Crónicas diarias, fotos exclusivas y coberturas en historias.
                </p>
              </div>
              <div className="pt-6 flex items-center gap-2 text-primary font-label-caps text-[11px] uppercase">
                <span>Seguir</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </a>

            <a
              href="#"
              className="p-6 bg-surface-container-low rounded-xl flex flex-col justify-between hover:bg-surface-container transition-all group border border-surface-container-highest/40 hover:border-outline"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">tag</span>
                </div>
                <div>
                  <span className="font-label-caps text-[10px] uppercase text-outline block mb-1">
                    Debate & Texto
                  </span>
                  <h4 className="font-headline-sm text-[18px] uppercase text-primary">
                    X / Twitter
                  </h4>
                </div>
                <p className="font-body-sm text-[13px] text-on-surface-variant">
                  @eldesignadove — Análisis táctico, estadísticas contextualizadas y comentarios en
                  vivo.
                </p>
              </div>
              <div className="pt-6 flex items-center gap-2 text-primary font-label-caps text-[11px] uppercase">
                <span>Explorar</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </a>

            <a
              href="#"
              className="p-6 bg-surface-container-low rounded-xl flex flex-col justify-between hover:bg-surface-container transition-all group border border-surface-container-highest/40 hover:border-outline"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">play_circle</span>
                </div>
                <div>
                  <span className="font-label-caps text-[10px] uppercase text-outline block mb-1">
                    Audiovisual
                  </span>
                  <h4 className="font-headline-sm text-[18px] uppercase text-primary">YouTube</h4>
                </div>
                <p className="font-body-sm text-[13px] text-on-surface-variant">
                  Podcast — Análisis profundo, entrevistas exclusivas y debate beisbolero.
                </p>
              </div>
              <div className="pt-6 flex items-center gap-2 text-primary font-label-caps text-[11px] uppercase">
                <span>Suscribir</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </a>

            <a
              href="#"
              className="p-6 bg-surface-container-low rounded-xl flex flex-col justify-between hover:bg-surface-container transition-all group border border-surface-container-highest/40 hover:border-outline"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">forum</span>
                </div>
                <div>
                  <span className="font-label-caps text-[10px] uppercase text-outline block mb-1">
                    Tertulia Radial
                  </span>
                  <h4 className="font-headline-sm text-[18px] uppercase text-primary">Radio Web</h4>
                </div>
                <p className="font-body-sm text-[13px] text-on-surface-variant">
                  Señal Central — Transmisión 24/7 con los mejores análisis y coberturas.
                </p>
              </div>
              <div className="pt-6 flex items-center gap-2 text-primary font-label-caps text-[11px] uppercase">
                <span>Escuchar</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
