# 06 — Phénix Restauration (démo après-sinistre)

Site démo Nextiweb pour une entreprise fictive de **restauration après-sinistre** au Québec : dégâts d'eau, incendie/fumée, moisissures, décontamination, reconstruction.

## Concept visuel

- **Palette** : midnight `#0a0e1a` + orange phénix `#ff5c39` → `#ffb547` + jade électrique `#1fe5b0` + cream `#f3eee2`.
- **Symbolique** : le phénix qui renaît — du sinistre à la livraison.
- **Typographie** : Fraunces (display italique chaleureux), Manrope (sans), JetBrains Mono (UI / data).

## Effets « wow »

- Curseur custom (cercle suiveur + dot) avec mode hover.
- Hero avec particules d'embers animées en canvas (60 fps, dégradés radiaux orange→ambre).
- Mots animés (`brûle`, `coule`, `cède`) qui montent du bas avec effet vague.
- Panneau « dispatch live » glassmorphique : horloge temps réel, compteurs animés, mini-carte SVG.
- Marquee infini avec types de sinistres en gradient phénix.
- Cartes services avec tilt 3D au hover + glow radial qui suit la souris.
- Stats banner avec compteurs animés et fond grille.
- Timeline 6 étapes avec barre de progression au hover.
- **Comparateur avant/après** custom sur 3 réalisations (clip-path animé via `<input range>` invisible).
- FAQ accordéon avec rotation du `+`.
- Bouton flottant d'urgence avec ondes pulsantes.
- Reveal-on-scroll progressif avec stagger.
- Top-strip avec balayage de lumière.

## Pointage Nextiweb

- Section dédiée `#nextiweb-services` avec 3 cards (création site, SEO, marketing) → liens directs vers `nextiweb.ca/creation-site.html`, `/seo.html`, `/marketing-digital.html`.
- CTA « Visiter Nextiweb.ca ».
- Footer credit + badge flottant `Démo / Créé par Nextiweb.ca`.

## Structure

```
06-service-domicile/
├── index.html         # Version FR (canonique)
├── index-en.html      # Version EN
├── css/style.css      # ~1300 lignes, design system complet
├── js/main.js         # Particules, BA slider, counters, tilt, cursor, reveal
├── images/            # (vide — images via Unsplash CDN avec fallbacks)
├── robots.txt
├── sitemap.xml
└── README.md
```

## SEO

- Schema.org `EmergencyService` + `HomeAndConstructionBusiness` + `FAQPage`.
- Meta OG/Twitter complets, canonical, hreflang FR/EN/x-default.
- Aggregate rating, opening hours 24/7, area served, hasOfferCatalog.
- Sitemap.xml + robots.txt.
- Titres et descriptions optimisés pour requêtes locales (Montréal, Laval, Québec).

## Accessibilité

- Skip link, ARIA labels, sémantique HTML5 complète.
- `prefers-reduced-motion` respecté (animations désactivées).
- Focus visible, contraste AA+ sur tous les textes.
- Burger menu accessible clavier.

## Données fictives (démo)

- Nom : **Phénix Restauration** · adresse : 2480 boul. Industriel, Laval QC.
- Téléphone : 514 555-0167 · email : urgence@phenix-restauration.ca.
- RBQ 5841-9203-01 (numéro factice).
- Tous les avis, statistiques et logos d'assureurs sont à titre démonstratif.
