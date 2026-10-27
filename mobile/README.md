# Cubo Fácil para Android

Projeto Android separado do site, preparado com Capacitor 8. O aplicativo abre **https://cubotech.lovable.app** dentro de uma janela Android, com o nome Cubo Fácil e o ícone do cubo mágico.

## O que está incluído

- Projeto nativo em `android/`, pronto para abrir no Android Studio após instalar as dependências.
- Ícones tradicionais e adaptativos para Android.
- Movimentos, montagem contínua, OLL, PLL e animações 3D fornecidos pelo site publicado.
- Apenas permissão de internet; tráfego HTTP e conteúdo misto não são habilitados.

**Importante:** esta versão precisa de internet. Não contém uma cópia offline das aulas. Atualizações publicadas no site passam a aparecer no aplicativo sem gerar outro APK. A configuração `server.url` é descrita pelo Capacitor principalmente para desenvolvimento/live reload; esta versão é um contêiner do site hospedado, não um pacote web offline.

## Preparação no computador

1. Exporte o código do projeto pelo GitHub e baixe-o no computador.
2. Instale Node.js 22 ou superior, Bun e Android Studio compatível com Capacitor 8, usando o JDK compatível fornecido pelo Android Studio (Java 21).
3. No gerenciador de SDK do Android Studio, instale Android SDK 36 e suas ferramentas. A versão mínima do aparelho é Android 7 (API 24), com Android System WebView atualizado.
4. Abra um terminal dentro desta pasta `mobile` e execute:

```sh
bun install --frozen-lockfile
bun run sync
bun run open
```

O último comando abre o projeto Android no Android Studio. Espere a sincronização do Gradle terminar. Não execute o build do site para isso: o aplicativo usa a versão já publicada.

## Testar no aparelho

Conecte um celular Android com depuração USB ativada ou crie um emulador no Android Studio. Selecione o aparelho e pressione **Run**.

Confira abertura do site, navegação nas cinco páginas, botão Voltar do Android, animações, arraste do cubo, orientação da tela e comportamento sem internet. A navegação Voltar usa o comportamento padrão do contêiner Capacitor; precisa ser conferida no aparelho. O projeto ainda não foi compilado nem testado em um aparelho Android neste ambiente.

## Gerar APK para instalação direta

No Android Studio, use a opção **Build → Generate App Bundles or APKs → Build APKs** (o nome pode variar por versão). Para um APK de teste, o arquivo costuma ficar em:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

Esse APK de teste não é uma entrega de produção. Para distribuir uma versão definitiva, use **Generate Signed App Bundle or APK**, escolha **APK**, crie uma chave de assinatura e selecione a variante **release**.

## Publicar na Google Play

1. Confira o identificador provisório `app.cubotech.cubofacil` em `capacitor.config.json` e `android/app/build.gradle`; defina um identificador exclusivo antes da primeira publicação. Se mudar, ajuste também o pacote Java e os nomes correspondentes no projeto Android.
2. Em **Generate Signed App Bundle or APK**, escolha **Android App Bundle (AAB)**, configure a chave de assinatura e gere a variante **release**.
3. Guarde a chave e as senhas fora do repositório, em local seguro; serão necessárias para futuras versões.
4. Use uma conta de desenvolvedor Google Play e preencha a ficha da loja, imagens, classificação etária, segurança dos dados e política de privacidade com informações reais.
5. Faça os testes exigidos pela sua conta e envie o AAB para análise. A Google decide a aprovação; um contêiner de site não garante aceitação. As exigências atuais de SDK e testes devem ser conferidas no Play Console no momento do envio.

O APK/AAB **não foi gerado nem assinado aqui**: este ambiente não fornece Android Studio, JDK e Android SDK. A geração, assinatura e publicação dependem do seu computador e da sua conta Google Play.

## Manutenção

```sh
bun run test     # valida o endereço publicado e as restrições de HTTP
bun run icons    # regenera os ícones a partir de assets/
bun run sync     # sincroniza configuração e recursos Android
```

Não adicione chaves `.jks`/`.keystore`, senhas ou `android/local.properties` ao repositório. As dependências desta versão ficam isoladas do site.