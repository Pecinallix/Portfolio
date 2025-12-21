# Integração com GitHub

Este portfólio possui integração automática com a API do GitHub para exibir seus repositórios como projetos.

## Como Configurar

### 1. Configure seu Username

Edite o arquivo `app/config/github.ts` e altere o username:

```typescript
export const GITHUB_CONFIG = {
  username: 'seu-username-github', // Coloque seu username aqui
  // ...
};
```

### 2. Personalize a Exibição (Opcional)

#### Selecionar Repositórios Específicos

Se você quiser exibir apenas repositórios específicos:

```typescript
featuredRepos: [
  'meu-projeto-incrivel',
  'outro-projeto-legal',
  'portfolio',
],
```

#### Filtrar por Tópicos/Tags

Para exibir apenas repositórios com tópicos específicos:

```typescript
filterByTopics: [
  'react',
  'typescript',
  'portfolio',
],
```

#### Excluir Repositórios

Para não mostrar certos repositórios:

```typescript
excludeRepos: [
  'seu-username', // README profile
  '.github',
  'repositorio-privado',
  'projeto-antigo',
],
```

#### Limitar Número de Projetos

```typescript
maxProjects: 6, // Exibe no máximo 6 projetos
```

## Como Funciona

1. **Busca Automática**: O componente busca automaticamente seus repositórios públicos do GitHub
2. **Filtragem**: Remove forks, repositórios excluídos e aplica filtros configurados
3. **Ordenação**: Prioriza repositórios em destaque, depois ordena por atualização recente
4. **Tecnologias**: Detecta tecnologias baseado na linguagem principal e nos tópicos do repositório
5. **Links**: Mostra link para o código (GitHub) e demo (se configurado no campo `homepage` do repo)

## Adicionar Demo aos Projetos

Para que seus projetos mostrem o link "Demo", configure o campo `Website` nas configurações do repositório no GitHub.

## Melhorar a Detecção de Tecnologias

### 1. Adicione Tópicos aos Repositórios

No GitHub, vá em Settings > Topics e adicione tags como:
- `react`
- `typescript`
- `nextjs`
- `nodejs`
- `tailwindcss`
- etc.

### 2. Adicione Descrição

Uma boa descrição no GitHub aparecerá automaticamente no card do projeto.

## Exemplo de Repositório Bem Configurado

- ✅ Nome descritivo: `ecommerce-platform`
- ✅ Descrição clara: "Plataforma completa de e-commerce com React e Node.js"
- ✅ Tópicos: `react`, `nodejs`, `typescript`, `ecommerce`
- ✅ Website: `https://meu-projeto.vercel.app`
- ✅ Linguagem principal definida

## Estatísticas Exibidas

Cada projeto mostra:
- ⭐ Número de estrelas
- 🔱 Número de forks
- 🏷️ Tecnologias (linguagem + tópicos)
- 📝 Descrição
- 🔗 Link para código
- 🌐 Link para demo (se disponível)

## Troubleshooting

### Nenhum projeto aparece?

1. Verifique se o username está correto
2. Certifique-se de ter repositórios públicos
3. Verifique os filtros (tópicos, exclusões)
4. Abra o console do navegador para ver erros

### Tecnologias não aparecem?

1. Adicione tópicos aos repositórios no GitHub
2. Certifique-se que a linguagem principal está definida
3. Edite `TOPIC_TO_TECH` em `app/config/github.ts` para adicionar novos mapeamentos

### Rate Limit da API?

A API do GitHub permite 60 requisições por hora sem autenticação. Se precisar de mais, considere adicionar um token de autenticação (não recomendado para frontend público).
