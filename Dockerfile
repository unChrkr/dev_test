# Usando a imagem oficial do Node.js
FROM node:14

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia todo o código da aplicação para o diretório de trabalho
COPY . .

# Compila o código TypeScript para JavaScript
RUN npm run build

# Expõe a porta 3000 para acesso externo
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
