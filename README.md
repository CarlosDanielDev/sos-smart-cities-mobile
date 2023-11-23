# SOS Smart Cities App

IOS - Only

Requisitos
- XCode
- Node (20)
- Yarn 


Instale as dependencias:

```bash
yarn
```

após instalar as dependencias, execute o pod-install

```bash
cd ios && pod install && cd ..
```

após instalar os pods, execute o seguinte comando para buildar:

```bash
yarn ios --simulator="iPhone 15 Pro Max"
```



## Backend

- Baixe esse [repositório](https://github.com/Pereira277/smart-cities-api)

Baixe a CLI do `nest`:

```bash
npm i -g @nest/cli
```

instale as dependencias:

```bash
yarn
```

execute o seguinte comando para subir o servidor na porta 3000:

```bash
yarn start:dev
```

Volte no aplicativo e teste a aplicação.
