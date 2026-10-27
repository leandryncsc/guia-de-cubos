# Guia de Cubos — Cubo Fácil

Site de dicas para montar o cubo mágico 3x3, com notação de movimentos e ilustração animada em 3D de cada movimento e algoritmo.

## Páginas e funcionalidades

### Início (`/`)
- Página de boas-vindas com um cubo 3D que repete a sequência `R U R' U'` em loop.

### Movimentos (`/notacao`)
- Notação de movimentos no mesmo estilo do tutorial da Cubo Velocidade: faces R, L, U, D, F e B.
- Sentido invertido (apóstrofo, ex.: `R'`) e giro duplo (ex.: `R2`).
- Camadas do meio: M, E e S.
- Giro de duas camadas: Rw, Lw, Uw, Fw.
- Giro do cubo inteiro: x, y, z.
- Cada movimento tem um cubo 3D que anima o giro quando pressionado.

### Passo a passo (`/metodo`)
- Montagem completa pelo método de camadas, em 7 etapas:
  1. Cruz branca
  2. Cantos brancos
  3. Segunda camada
  4. Cruz amarela
  5. Face amarela
  6. Posicionar cantos
  7. Posicionar meios — fim!
- Cada etapa continua exatamente de onde a anterior parou (uma única resolução do cubo).
- Mostra o embaralhamento a fazer no cubo físico (amarelo em cima, verde na frente) antes de começar.
- Nos passos 1 e 2 o cubo é visto por baixo, e há botão "Ver baixo / Ver cima" para alternar a vista.
- Dica de execução e algoritmos de cada etapa (ex.: direita/esquerda da segunda camada, Sune).

### OLL (`/oll`)
- Os 57 casos de OLL, agrupados por formato (Sune, H, Pi, T, L, U, peixes, ponto etc.) com o algoritmo de cada caso.
- Cada caso tem um desenho da posição e um botão "Ver 3D" que abre um cubo animado executando o algoritmo.

### PLL (`/pll`)
- Os 21 casos de PLL (Ua, Ub, H, Z, Aa, Ab, E, T, F, Ja, Jb, Ra, Rb, Ga–Gd, V, Y, Na, Nb), agrupados por tipo de permutação.
- Mesmo formato do OLL: desenho do caso + cubo 3D animado do algoritmo.

## Recursos dos cubos 3D
- **Animação de movimentos:** os giros das faces são animados de verdade, peça por peça (não é um vídeo).
- **Arrastar para girar:** em Passo a passo, OLL e PLL dá para rotacionar o cubo em 3D arrastando com o mouse ou o dedo; duplo clique volta à posição inicial.
- **Controles de reprodução:** Reproduzir / Pausar / Repetir em cada cubo.
- **Vista por baixo:** alternância "Ver baixo / Ver cima" para enxergar a face branca nas primeiras etapas.

## Como funciona por baixo
- Os algoritmos são executados por um motor de cubo próprio (`src/lib/cube.ts`), que simula os 54 adesivos do cubo e anima cada movimento.
- Os desenhos dos casos de OLL e PLL são gerados tocando a solução de trás para frente em um cubo resolvido.
- O embaralhamento do Passo a passo é gerado invertendo a resolução completa.

## Desenvolvimento

## Aplicativo Android

A versão Android está preparada em `mobile/`, separada do site, com o ícone do cubo mágico e acesso ao conteúdo publicado. Ela precisa de internet. Consulte [o guia Android](mobile/README.md) para abrir no Android Studio, testar no celular e gerar um APK assinado ou um AAB para a Google Play. A geração e assinatura são feitas no seu computador; nenhum APK foi gerado neste ambiente.

## Desenvolvimento do site

```sh
npm i
npm run dev
```

Testes: `npm run test` (ou `bunx vitest run`).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5f5e8d1c-3631-4b68-b7a0-0f8b59addfd9).
