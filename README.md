
# Boleto API Backend

Plataforma backend desenvolvida em **Node.js** e **TypeScript**, seguindo padrões de **Clean Architecture** e **Hexagonal Architecture**, garantindo escalabilidade, manutenibilidade e testes robustos.

---

## 🚀 Tecnologias Utilizadas
- **Node.js** (Runtime)
- **TypeScript** (Tipagem estática)
- **Express** (Framework HTTP)
- **Jest** (Testes automatizados)
- **ESLint + Prettier** (Padrões de código)
- **Docker** (Ambiente containerizado)
- **MongoDB / PostgreSQL** (Persistência)

---

## 📂 Estrutura do Projeto
```bash
/src
  /application      # Casos de uso
  /domain           # Entidades, agregados, serviços de domínio
  /infrastructure   # Adapters (DB, APIs externas)
  /interfaces       # Controllers, rotas, DTOs
  /shared           # Configurações, middlewares, utils
/tests
  /unit
  /integration
```

---

## 🔧 Como Rodar o Projeto Localmente
```bash
# Clonar o repositório
git clone https://github.com/sua-org/tuchapps-backend.git

# Entrar no diretório
cd tuchapps-backend

# Instalar dependências
npm install

# Rodar o projeto em desenvolvimento
npm run dev

# Rodar testes
npm run test
```

---

## 🌐 Variáveis de Ambiente
Crie um arquivo **.env** na raiz com as seguintes variáveis:

```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/tuchapps
JWT_SECRET=sua_chave_segura
```

---

## 🛠 Fluxo de Desenvolvimento Git
### **Criando uma nova branch**
```bash
# Atualizar branch principal
git checkout main
git pull origin main

# Criar uma branch para a feature
git checkout -b feature/nome-da-feature
```

### **Commitando mudanças**
Seguir o padrão [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):
```bash
git add .
git commit -m "feat(auth): implementa login com JWT"
```

### **Subindo para o GitHub**
```bash
# Enviar a branch para o repositório remoto
git push origin feature/nome-da-feature
```

### **Abrindo Pull Request (PR)**
1. Acesse o repositório no GitHub.  
2. Crie um **Pull Request** para a branch principal (`main` ou `develop`).  
3. Solicite revisão de código antes do merge.

---

## 🧪 Testes
```bash
# Rodar testes unitários
npm run test:unit

# Rodar testes de integração
npm run test:integration

# Gerar relatório de cobertura
npm run test:coverage
```

---

## 📦 Build para Produção
```bash
npm run build
```
Os arquivos compilados serão gerados no diretório **/dist**.

---

## 📝 Licença
Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.
