# ⚠️ Réécriture de l'historique Git — tous les commits → `hello world`

## Ce qui a été fait

L'historique de la branche `main` a été réécrit avec `git filter-branch` afin que
**chaque commit ait pour message `hello world`**.  
Les fichiers du site (HTML, CSS, JS, images) sont **identiques** — seules les
métadonnées des commits (message, hash SHA) ont changé.

Anciens messages → Nouveau message :

| Ancien message                          | Nouveau message |
|-----------------------------------------|-----------------|
| `Initial commit - Site anniversaire Meriem` | `hello world`   |
| `hello world`                           | `hello world` ✓ |

---

## ⚠️ Impact sur les collaborateurs / clones existants

La réécriture change les SHA de **tous** les commits.  
Tout clone ou fork existant aura une **histoire divergente** et ne pourra plus
faire de `git pull` normal.

### Étapes recommandées pour les collaborateurs

**Option A — Re-cloner (la plus simple)**

```bash
# Supprimer l'ancien clone
rm -rf <dossier-du-clone>

# Re-cloner depuis zéro
git clone https://github.com/imed-23/anniversaire.git
```

**Option B — Mettre à jour sans re-cloner**

```bash
git fetch origin
git reset --hard origin/main
# ⚠️  Toute modification locale non poussée sera perdue
```

---

## Commandes utilisées pour la réécriture

```bash
# Réécrire tous les messages de commits sur toutes les branches
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --msg-filter 'echo "hello world"' -- --all

# Force-push de la branche main réécrite
git push --force-with-lease origin main
```

---

## GitHub Pages

Le site reste publié à la même URL :  
`https://imed-23.github.io/anniversaire/`

Le contenu des fichiers (HTML/CSS/JS) est **inchangé** — seuls les messages de
commits ont été modifiés. GitHub Pages continuera à fonctionner normalement.
